// GSC 快照读取（Trends 降级 + 分析层佐证用）。
// 快照格式（2026-11-23 实测）：content-ideas/gsc/<date>/查询数.csv
// 列：热门查询, 点击次数, 展示, 点击率, 排名（含引号、可能引号内换行）
// 注意：查询表无 page 列，不能与网页.csv 逐行关联；单快照不能计算"上升"。
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// 标准 CSV 解析：支持双引号包裹、双引号转义（""）、引号内换行与逗号
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((f) => f !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); if (row.some((f) => f !== '')) rows.push(row); }
  return rows;
}

function num(s) {
  if (s == null) return null;
  const n = Number(String(s).replace(/[,%\s]/g, ''));
  return Number.isFinite(n) ? n : null;
}

export async function findLatestGscDir(gscRoot) {
  try {
    const entries = await readdir(gscRoot, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(e.name)).map((e) => e.name).sort();
    if (!dirs.length) return null;
    return { date: dirs[dirs.length - 1], dir: path.join(gscRoot, dirs[dirs.length - 1]) };
  } catch { return null; }
}

export async function loadQueries(dir) {
  const text = await readFile(path.join(dir, '查询数.csv'), 'utf8');
  const rows = parseCsv(text.replace(/^﻿/, ''));
  if (!rows.length) return [];
  const header = rows[0];
  const qi = header.findIndex((h) => /热门查询|query/i.test(h));
  const out = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (qi < 0 || !r[qi]) continue;
    out.push({
      query: r[qi],
      clicks: num(r[1]),
      impressions: num(r[2]),
      ctr: r[3] || null,
      position: num(r[4]),
      row: i + 1, // CSV 行号（含表头），用于 raw_ref 溯源
    });
  }
  return out;
}

// 按词项匹配相关查询（所有词都命中才算，顺序不限； impressions 降序）
export function searchQueries(queries, term, { limit = 10 } = {}) {
  const words = term.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
  if (!words.length) return [];
  return queries
    .filter((q) => {
      const s = q.query.toLowerCase();
      return words.every((w) => s.includes(w));
    })
    .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
    .slice(0, limit);
}
