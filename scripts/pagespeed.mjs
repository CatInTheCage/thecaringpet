#!/usr/bin/env node
// PageSpeed Insights 检查 (P1) — todo 排期待办「PSI 移动端 ≥90 分」的月度验证工具。
// 免费 API 无需 key; 只取 performance 分数 + 前 3 条诊断, 不存历史(对比靠 revenue-log 复盘记录)。
//
// 用法:
//   node scripts/pagespeed.mjs                 # 核心 URL 列表, 移动端
//   node scripts/pagespeed.mjs --desktop       # 桌面端
//   node scripts/pagespeed.mjs --url /blog/best-slow-feeder-dog-bowls/  # 追加单页
//
// 网络: 本机走 7890 代理(与 publish-pins.mjs 同一 bootstrap 约定)。

import net from 'node:net';
import { spawnSync } from 'node:child_process';

async function portOpen(port) {
	return new Promise((r) => {
		const s = net.connect({ host: '127.0.0.1', port, timeout: 800 });
		s.on('connect', () => { s.destroy(); r(true); });
		s.on('error', () => r(false));
		s.on('timeout', () => { s.destroy(); r(false); });
	});
}
if (process.env.PSI_PROXY_BOOTSTRAPPED !== '1') {
	const useProxy = await portOpen(7890);
	const env = { ...process.env, PSI_PROXY_BOOTSTRAPPED: '1' };
	if (useProxy) {
		env.NODE_USE_ENV_PROXY = '1';
		env.HTTPS_PROXY = 'http://127.0.0.1:7890';
		env.HTTP_PROXY = 'http://127.0.0.1:7890';
	}
	const r = spawnSync(process.execPath, process.argv.slice(1), { env, stdio: 'inherit' });
	process.exit(r.status ?? 0);
}

const BASE = 'https://thecaringpet.com';
const CORE_URLS = [
	'/',
	'/blog/best-slow-feeder-dog-bowls/',
	'/blog/best-slow-feeder-for-large-dogs/',
	'/blog/slow-feeder-bowl-size-guide/',
	'/blog/ceramic-vs-plastic-slow-feeder/',
	'/tools/pet-recall-checker/',
	'/tools/pet-toxin-lookup/',
];

const argv = process.argv.slice(2);
const STRATEGY = argv.includes('--desktop') ? 'desktop' : 'mobile';
const extra = argv.flatMap((a, i) => (a === '--url' ? [argv[i + 1]] : [])).filter(Boolean);
const urls = [...new Set([...CORE_URLS, ...extra])];

console.log(`PSI ${STRATEGY} × ${urls.length} URL\n`);
const rows = [];
for (const u of urls) {
	const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(BASE + u)}&strategy=${STRATEGY}&category=performance`;
	try {
		const res = await fetch(api);
		if (!res.ok) {
			const body = await res.text();
			throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
		}
		const data = await res.json();
		const score = Math.round((data.lighthouseResult?.categories?.performance?.score ?? 0) * 100);
		const audits = data.lighthouseResult?.audits ?? {};
		const opps = Object.values(audits)
			.filter((a) => a.details?.type === 'opportunity' && a.numericValue > 100)
			.sort((a, b) => b.numericValue - a.numericValue)
			.slice(0, 3)
			.map((a) => `${a.title} (${(a.numericValue / 1000).toFixed(1)}s)`);
		rows.push({ u, score, opps });
		console.log(`${String(score).padStart(3)}  ${u}`);
		for (const o of opps) console.log(`      ↳ ${o}`);
	} catch (e) {
		rows.push({ u, score: null, opps: [], err: e.message });
		console.log(`ERR   ${u} — ${e.message}`);
	}
}

const ok = rows.filter((r) => r.score !== null);
if (ok.length) {
	const below = ok.filter((r) => r.score < 90);
	console.log(`\n≥90 分: ${ok.length - below.length}/${ok.length}` + (below.length ? ` | 未达标: ${below.map((r) => r.u).join(', ')}` : ' ✓'));
}
