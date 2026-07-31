// 雷达报告合并 helper — trending-radar-browser.mjs 与 trending-radar-social.mjs 共用。
// 约定：每个写入方把输出包在自己的 begin/end HTML 注释标记里；
// 同日重跑时有界替换自己的块（幂等），首次运行则插到"下一步行动建议"之前。
// 注意运行顺序：trending-radar.mjs 会全量覆盖当天报告，必须先跑。

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ACTION_MARKER = '---\n\n## 下一步行动建议';

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 把一个 markdown 块合并进 content-ideas/radar-<stamp>.md。
 * @param {object} opts
 * @param {string} opts.outDir      content-ideas 目录
 * @param {string} opts.block       完整块（含 begin/end 标记）
 * @param {string} opts.beginMarker 块起始 HTML 注释（精确字符串）
 * @param {string} opts.endMarker   块结束 HTML 注释（精确字符串）
 * @param {string} opts.stamp       YYYY-MM-DD
 * @returns {{ file: string, action: 'replaced'|'inserted'|'appended'|'created' }}
 */
export async function mergeIntoRadar({ outDir, block, beginMarker, endMarker, stamp }) {
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `radar-${stamp}.md`);

  let existing = '';
  try { existing = await readFile(outFile, 'utf8'); } catch { /* 不存在 */ }

  if (!existing) {
    await writeFile(outFile, `# 热点扫描报告 ${stamp}\n\n${block}\n`, 'utf8');
    return { file: outFile, action: 'created' };
  }

  if (existing.includes(beginMarker)) {
    const re = new RegExp(`${escapeRe(beginMarker)}[\\s\\S]*?${escapeRe(endMarker)}`);
    await writeFile(outFile, existing.replace(re, block), 'utf8');
    return { file: outFile, action: 'replaced' };
  }

  if (existing.includes(ACTION_MARKER)) {
    await writeFile(outFile, existing.replace(ACTION_MARKER, `${block}\n\n${ACTION_MARKER}`), 'utf8');
    return { file: outFile, action: 'inserted' };
  }

  await writeFile(outFile, `${existing.trimEnd()}\n\n${block}\n`, 'utf8');
  return { file: outFile, action: 'appended' };
}
