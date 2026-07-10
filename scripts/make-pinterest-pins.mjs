// 生成 Pinterest 竖版 Pin 图（1000×1500）
// 全屏 hero 图 + 深色渐变蒙层 + 居中标题大字 + 网址水印
// 用法: node scripts/make-pinterest-pins.mjs

import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, 'public', 'images');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'pins');

const W = 1000;
const H = 1500;

// 每篇文章: hero 图 + 标题(可手动换行用 |)
const PINS = [
  { img: 'best-automatic-cat-feeders-2026.jpg', title: 'Best Automatic|Cat Feeders|of 2026', file: 'pin-best-automatic-cat-feeders.png' },
  { img: 'best-ceramic-cat-bowls-2026.jpg', title: 'Best Ceramic|Cat Bowls|of 2026', file: 'pin-best-ceramic-cat-bowls.png' },
  { img: 'best-lick-mats-hero.jpg', title: 'Best Lick Mats|for Dogs', file: 'pin-best-lick-mats.png' },
  { img: 'best-puzzle-feeders-hero.jpg', title: 'Best Puzzle Feeders|for Anxious Dogs', file: 'pin-best-puzzle-feeders.png' },
  { img: 'slow-feeder-bowls.jpg', title: 'Best Slow Feeder|Dog Bowls|of 2026', file: 'pin-best-slow-feeder-dog-bowls.png' },
  { img: 'large-dog-slow-feeder-hero.jpg', title: 'Best Slow Feeder|for Large Dogs', file: 'pin-best-slow-feeder-large-dogs.png' },
  { img: 'cat-body-language-hero.jpg', title: 'How to Read|Cat Body|Language', file: 'pin-cat-body-language.png' },
  { img: 'ceramic-vs-plastic-hero.jpg', title: 'Ceramic vs Plastic|Slow Feeder:|Which Is Safer?', file: 'pin-ceramic-vs-plastic.png' },
  { img: 'how-to-clean-slow-feeder-hero.jpg', title: 'How to Clean a|Slow Feeder Bowl', file: 'pin-how-to-clean.png' },
  { img: 'new-cat-owner-checklist-hero.jpg', title: 'New Cat Owner|Checklist:|First 30 Days', file: 'pin-new-cat-checklist.png' },
  { img: 'new-puppy-essentials-checklist-hero.jpg', title: 'New Puppy|Essentials|Checklist', file: 'pin-new-puppy-checklist.png' },
  { img: 'slow-feeder-size-guide-hero.jpg', title: 'Slow Feeder|Bowl Size|Guide', file: 'pin-slow-feeder-size.png' },
  { img: 'why-dog-eats-fast-hero.jpg', title: 'Why Does My Dog|Eat So Fast?', file: 'pin-why-dog-eats-fast.png' },
];

// 把标题文字按 | 分行，生成 SVG 蒙层 + 文字
function buildOverlay(title) {
  const lines = title.split('|');
  // 自适应字号：行越多字越小
  const fontSize = lines.length >= 3 ? 78 : (lines.length === 2 ? 86 : 92);
  const lineH = fontSize * 1.18;
  const blockH = lines.length * lineH;
  const startY = (H - blockH) / 2 + fontSize; // 居中起点

  const lineEls = lines.map((ln, i) => {
    const y = startY + i * lineH;
    return `<text x="${W/2}" y="${y}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff" text-anchor="middle" style="letter-spacing:-1px;">${escapeXml(ln)}</text>`;
  }).join('');

  // 蒙层：上下两段深色渐变 + 中部半透明黑，保证白字在任何背景上都清晰
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.55"/>
        <stop offset="35%" stop-color="#000000" stop-opacity="0.25"/>
        <stop offset="65%" stop-color="#000000" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.62"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${lineEls}
    <text x="${W/2}" y="${H - 48}" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="600" fill="#C86B4A" text-anchor="middle" style="letter-spacing:2px;">THECARINGPET.COM</text>
  </svg>`;
}

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, c => ({ '<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;' }[c]));
}

async function makeOne(pin) {
  const srcPath = path.join(IMG_DIR, pin.img);
  const outPath = path.join(OUT_DIR, pin.file);
  const overlay = Buffer.from(buildOverlay(pin.title));

  await sharp(srcPath)
    .resize(W, H, { fit: 'cover', position: 'attention' }) // attention 智能裁剪到主体
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toFile(outPath);

  console.log('✓', pin.file);
}

(async () => {
  await mkdir(OUT_DIR, { recursive: true });
  for (const pin of PINS) {
    try { await makeOne(pin); }
    catch (e) { console.error('✗', pin.file, '—', e.message); }
  }
  console.log('\n完成。输出目录:', OUT_DIR);
})();
