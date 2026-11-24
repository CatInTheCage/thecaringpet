#!/usr/bin/env node
// 图片优化 (P1) — 批量把 public/images 下的 JPG/PNG 转成 WebP 并重写引用。
//
// 背景: todo 排期待办「图片压缩 + 输出 WebP」; 首页/文章 hero 图是最大头。
// 全站 <img> 均为直链 public 路径, Astro 静态输出直接拷贝, 无构建期图片管线,
// 所以用脚本离线转换 + 引用重写, 一次到位。
//
// 用法:
//   node scripts/optimize-images.mjs            # dry-run: 只列体积对比, 不改文件
//   node scripts/optimize-images.mjs --apply    # 转换 + 重写 src/ 与 content 里的引用
//
// 排除项(动了会出事):
//   - public/images/pins-upload/   (Pinterest API 引用 live .jpg URL)
//   - public/images/logo-*.png/svg, bowl-logo.png, footer-mascot.jpg (尺寸已定死/极小)
//   - public/images/checklist/   (scripts/checklist-pdf.html 旧 PDF 生成器引用 cover.jpg)
//   - public/favicon.*, public/images/pins/ (源 PNG)
//   - 其它非图片文件不动
//
// 依赖: python3 + Pillow (本机已有, favicon 生成用过)。校验: pillow 是否带 webp 支持。

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMG_DIR = path.join(ROOT, 'public', 'images');
const APPLY = process.argv.includes('--apply');

// ---- Pillow webp 支持检测 ----
try {
	const support = execFileSync('python3', ['-c', 'from PIL import Image, features; print(features.check("webp"))'], { encoding: 'utf8' }).trim();
	if (support !== 'True') throw new Error('Pillow 无 webp 支持');
} catch (e) {
	console.error('✗ 需要 python3 + Pillow(webp):', e.message);
	process.exit(1);
}

// ---- 收集待转换图片 ----
const EXCLUDE_DIRS = new Set(['pins-upload', 'pins', 'checklist']);
const EXCLUDE_FILES = new Set(['bowl-logo.png', 'footer-mascot.jpg', 'logo-horizontal.png', 'logo-mark.png', 'logo-horizontal.svg', 'logo-mark.svg']);
const candidates = [];
(function walk(dir) {
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, e.name);
		if (e.isDirectory()) {
			if (!EXCLUDE_DIRS.has(e.name)) walk(full);
		} else if (/\.(jpe?g|png)$/i.test(e.name) && !EXCLUDE_FILES.has(e.name) && !existsSync(full.replace(/\.(jpe?g|png)$/i, '.webp'))) {
			candidates.push(full);
		}
	}
})(IMG_DIR);

if (!candidates.length) {
	console.log('没有待转换的图片(可能已全部转换过)。');
	process.exit(0);
}

// ---- dry-run 阶段: 转一份到临时目录量体积 ----
const tmpDir = '/tmp/optimize-images-preview';
execFileSync('mkdir', ['-p', tmpDir]);
let totalOrig = 0, totalWebp = 0;
const plan = [];
for (const f of candidates) {
	const tmp = path.join(tmpDir, path.basename(f).replace(/\.(jpe?g|png)$/i, '.webp'));
	execFileSync('python3', ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(f)})
im = im.convert('RGB') if im.mode in ('RGBA','P','LA') else im
im.save(${JSON.stringify(tmp)}, 'WEBP', quality=82, method=6)
`], { stdio: 'pipe' });
	const o = statSync(f).size, w = statSync(tmp).size;
	totalOrig += o; totalWebp += w;
	plan.push({ f, webp: f.replace(/\.(jpe?g|png)$/i, '.webp'), o, w });
}

console.log(`共 ${plan.length} 张: ${(totalOrig / 1024).toFixed(0)} KB → 预计 ${(totalWebp / 1024).toFixed(0)} KB (省 ${(100 * (1 - totalWebp / totalOrig)).toFixed(1)}%)\n`);
for (const p of plan.sort((a, b) => b.o - a.o).slice(0, 15)) {
	console.log(`  ${(p.o / 1024).toFixed(0).padStart(6)}KB → ${(p.w / 1024).toFixed(0).padStart(5)}KB  ${path.relative(ROOT, p.f)}`);
}
if (plan.length > 15) console.log(`  … 其余 ${plan.length - 15} 张`);

if (!APPLY) {
	console.log('\n(dry-run, 未改任何文件。确认后加 --apply)');
	process.exit(0);
}

// ---- apply 阶段 ----
// 1) 移动临时产物到位 (临时目录里只放了 basename)
for (const p of plan) execFileSync('mv', [path.join(tmpDir, path.basename(p.webp)), p.webp]);
// 2) 重写引用: src/ 下 .astro/.md/.mdx/.ts 中指向被转换文件的 .jpg/.png 路径 → .webp
const refFiles = [];
(function walkSrc(dir) {
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, e.name);
		if (e.isDirectory()) walkSrc(full);
		else if (/\.(astro|md|mdx|ts|js|css)$/.test(e.name)) refFiles.push(full);
	}
})(path.join(ROOT, 'src'));

const relSet = new Map(plan.map((p) => ['/' + path.relative(path.join(ROOT, 'public'), p.f).replace(/\\/g, '/'), '/' + path.relative(path.join(ROOT, 'public'), p.webp).replace(/\\/g, '/')]));
let touched = 0;
for (const rf of refFiles) {
	let text = readFileSync(rf, 'utf8');
	const orig = text;
	for (const [from, to] of relSet) {
		text = text.split(from).join(to); // 同时命中带引号/不带引号场景
	}
	if (text !== orig) { writeFileSync(rf, text); touched++; }
}
// 3) 删除已被替换的源图
for (const p of plan) execFileSync('rm', [p.f]);

console.log(`\n✓ 已转换 ${plan.length} 张、重写 ${touched} 个源文件引用、删除原图。`);
console.log('  下一步: npm run build 验证, 并检查 pin-queue.json 未受影响(本就排除)。');
