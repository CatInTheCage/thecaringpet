#!/usr/bin/env node
// 核心 Pin UTM 审计 (90 天计划 11-29 到期项) — 校验 pin-queue.json 中核心 slow-feeder Pin:
//   utm_source=pinterest&utm_medium=organic_social&utm_campaign=slow_feeder_90d&utm_content=<pin-id>
// 用法:
//   node scripts/audit-pin-utm.mjs        # 只报告缺失/错误的
//   node scripts/audit-pin-utm.mjs --fix  # 自动补齐缺失参数(保留已有 utm, utm_content 强制=pin id)
// 幂等: 重复 --fix 不会产生重复参数。

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QUEUE_FILE = path.join(ROOT, 'scripts', 'pinterest', 'pin-queue.json');
const FIX = process.argv.includes('--fix');

const REQUIRED = { utm_source: 'pinterest', utm_medium: 'organic_social', utm_campaign: 'slow_feeder_90d' };
const REQUIRED_GENERIC = { utm_source: 'pinterest', utm_medium: 'organic_social' };
// 90 天计划只压 slow-feeder 簇: campaign 仅强制于核心 4 页, 其它 Pin 只要求 source/medium
const CORE_SLOW_FEEDER = [
	'/blog/best-slow-feeder-dog-bowls/',
	'/blog/best-slow-feeder-for-large-dogs/',
	'/blog/slow-feeder-bowl-size-guide/',
	'/blog/ceramic-vs-plastic-slow-feeder/',
];

const queue = JSON.parse(readFileSync(QUEUE_FILE, 'utf8'));
const pins = queue.pins ?? queue; // 兼容 {pins:[...]} 或裸数组

let problems = 0;
let changed = 0;
for (const pin of pins) {
	if (!pin.link || !pin.id) continue;
	let u;
	try { u = new URL(pin.link); } catch { console.log(`✗ ${pin.id}: link 不是合法 URL → ${pin.link}`); problems++; continue; }
	const isCore = CORE_SLOW_FEEDER.some((p) => u.pathname === p);
	const required = isCore ? REQUIRED : REQUIRED_GENERIC;
	const issues = [];
	for (const [k, v] of Object.entries(required)) {
		if (u.searchParams.get(k) !== v) issues.push(`${k}=${u.searchParams.get(k) ?? '(缺失)'}`);
	}
	if (u.searchParams.get('utm_content') !== pin.id) issues.push(`utm_content=${u.searchParams.get('utm_content') ?? '(缺失)'} (应为 ${pin.id})`);
	if (!issues.length) continue;
	problems++;
	if (FIX) {
		for (const [k, v] of Object.entries(required)) u.searchParams.set(k, v);
		u.searchParams.set('utm_content', pin.id);
		pin.link = u.toString();
		changed++;
		console.log(`✎ ${pin.id}: ${issues.join('; ')} → 已修正`);
	} else {
		console.log(`✗ ${pin.id}: ${issues.join('; ')}`);
		console.log(`    ${pin.link}`);
	}
}

if (FIX && changed) writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2) + '\n');
console.log(problems ? `\n${problems} 个 Pin 需修正${FIX ? `, 已改 ${changed} 个并写回 ${QUEUE_FILE}` : '(加 --fix 修正)'}。` : `\n✓ 全部 ${pins.length} 个 Pin 的 UTM 合规。`);
process.exit(problems && !FIX ? 1 : 0);
