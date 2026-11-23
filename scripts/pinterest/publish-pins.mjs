#!/usr/bin/env node
// Pinterest Pin 自动发布 (API v5) — 替代 webbridge 浏览器方案(已被 Pinterest 软封锁,见 pinterest-automation-soft-block 记忆)
//
// 前置(一次性):
//   1. developers.pinterest.com 建 app(app_id/secret 存 ~/.config/thecaringpet/pinterest-app.json)
//   2. 走 OAuth 拿带写权限的 user token(pins:write/boards:write) —— 控制台快速生成器只发读权限
//      token 存 ~/.config/thecaringpet/pinterest-token (chmod 600, 不进 git)
//      scopes: boards:read boards:write pins:read pins:write user_accounts:read
//
// 用法:
//   node scripts/pinterest/publish-pins.mjs --dry      # 验证 token + boards, 列出将发布的 Pin
//   node scripts/pinterest/publish-pins.mjs            # 发布队列前 3 个 pending
//   node scripts/pinterest/publish-pins.mjs --max 5    # 本次发 5 个
//   node scripts/pinterest/publish-pins.mjs --pin recall-checker [--pin cat-age-chart]
//
// 状态: content-ideas/pinterest-state.json (gitignored) — published/failed 记录,幂等可重跑。
// 队列: scripts/pinterest/pin-queue.json — 图片须已部署到线上 (build 后 push)。

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import net from 'node:net';

// —— 代理引导: 本机 7890(ApexCore) 开着→带代理重启自己(NODE_USE_ENV_PROXY 须启动前生效); 否则直连 ——
async function portOpen(port) {
	return new Promise(r => {
		const s = net.connect({ host: '127.0.0.1', port, timeout: 800 });
		s.on('connect', () => { s.destroy(); r(true); });
		s.on('error', () => r(false));
		s.on('timeout', () => { s.destroy(); r(false); });
	});
}
if (process.env.PIN_PROXY_BOOTSTRAPPED !== '1') {
	const useProxy = await portOpen(7890);
	const env = { ...process.env, PIN_PROXY_BOOTSTRAPPED: '1' };
	if (useProxy) {
		env.NODE_USE_ENV_PROXY = '1';
		env.HTTPS_PROXY = 'http://127.0.0.1:7890';
		env.HTTP_PROXY = 'http://127.0.0.1:7890';
	}
	const r = spawnSync(process.execPath, process.argv.slice(1), { env, stdio: 'inherit' });
	process.exit(r.status ?? 0);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const QUEUE_FILE = path.join(ROOT, 'scripts', 'pinterest', 'pin-queue.json');
const STATE_FILE = path.join(ROOT, 'content-ideas', 'pinterest-state.json');
const TOKEN_FILE = path.join(homedir(), '.config', 'thecaringpet', 'pinterest-token');
const IMG_BASE = 'https://thecaringpet.com/images/pins-upload/';
const API = 'https://api.pinterest.com/v5';

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const pinFilter = argv.flatMap((a, i) => (a === '--pin' ? [argv[i + 1]] : [])).filter(Boolean);
const maxArg = argv.includes('--max') ? parseInt(argv[argv.indexOf('--max') + 1], 10) : 3;

function die(msg) {
	console.error('✗', msg);
	process.exit(1);
}

// 统一错误摘要(网络错误等无 status/body 的异常也能安全打印)
function errSummary(e) {
	return `${e.status ?? 'ERR'} ${JSON.stringify(e.body ?? e.message ?? String(e)).slice(0, 400)}`;
}

// ---- token ----
if (!existsSync(TOKEN_FILE)) {
	die(`token 文件不存在: ${TOKEN_FILE}\n  按本文件头部注释做一次性设置。`);
}
const TOKEN = readFileSync(TOKEN_FILE, 'utf8').trim();
if (!TOKEN) die('token 文件为空');

const headers = {
	Authorization: `Bearer ${TOKEN}`,
	'Content-Type': 'application/json',
};

async function api(method, endpoint, body) {
	let res;
	try {
		res = await fetch(API + endpoint, {
			method,
			headers,
			body: body === undefined ? undefined : JSON.stringify(body),
		});
	} catch (e) {
		die(`网络请求失败 (${method} ${endpoint}): ${e.message}`);
	}
	if (res.status === 401) die('token 无效或过期(401) — 重新走 OAuth 生成 token。');
	if (res.status === 403 && /scope|permission/i.test(await res.clone().text().catch(() => ''))) {
		die('token 权限不足(403,缺写 scope) — 重新走 OAuth 勾选 pins:write boards:write。');
	}
	if (res.status === 429) {
		const wait = res.headers.get('x-pinterest-ratelimit-reset') ?? '60';
		die(`触发限流(429), reset in ~${wait}s — 稍后重跑本脚本即可。`);
	}
	const text = await res.text();
	let json;
	try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text.slice(0, 500) }; }
	if (!res.ok) {
		const err = new Error(`${method} ${endpoint} → ${res.status}`);
		err.status = res.status;
		err.body = json;
		throw err;
	}
	return json;
}

// ---- queue & state ----
const queue = JSON.parse(readFileSync(QUEUE_FILE, 'utf8'));
mkdirSync(path.dirname(STATE_FILE), { recursive: true });
const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : { published: {}, failed: {} };

const doneIds = new Set([...Object.keys(state.published), ...Object.keys(state.failed)]);
let pending = queue.pins.filter(p => !doneIds.has(p.id));
if (pinFilter.length) pending = pending.filter(p => pinFilter.includes(p.id));
pending = pending.slice(0, maxArg);

if (!pending.length) {
	console.log('队列里没有待发布的 Pin — 全部已发布或已失败。检查', STATE_FILE);
	process.exit(0);
}

// ---- validate token & account ----
const me = await api('GET', '/user_account').catch(e => die(`账号验证失败: ${errSummary(e)}`));
console.log(`账号: ${me.username ?? JSON.stringify(me).slice(0, 120)}`);

// ---- ensure boards ----
const boardList = await api('GET', '/boards?page_size=250').catch(e => {
	console.error(`⚠ 读取 boards 失败(缺 boards:read?): ${errSummary(e)}`);
	return { items: [] };
});
const boardsByName = new Map((boardList.items ?? []).map(b => [b.name, b.id]));
for (const b of queue.boards) {
	if (!boardsByName.has(b.name)) {
		if (DRY) { console.log(`[dry] 将创建 board: ${b.name}`); continue; }
		const created = await api('POST', '/boards', { name: b.name, description: b.description })
			.catch(e => { console.error(`✗ 创建 board 失败 "${b.name}": ${errSummary(e)}`); return null; });
		if (created) { boardsByName.set(b.name, created.id); console.log(`✓ board 已创建: ${b.name}`); }
	}
}

console.log(`待发布 ${pending.length} 个:\n`);
for (const p of pending) {
	const boardId = boardsByName.get(p.board);
	console.log(`  [${p.id}] ${p.title.slice(0, 60)}`);
	console.log(`          img: ${IMG_BASE + p.file}`);
	console.log(`          → ${p.link}  @${p.board} (board ${boardId ? 'OK' : '缺失/未读!'})`);
}
if (DRY) {
	console.log('\n[dry] 未实际发布。去掉 --dry 运行以发布。');
	process.exit(0);
}

// ---- publish ----
let trialBlocked = false;
for (const p of pending) {
	const boardId = boardsByName.get(p.board);
	if (!boardId) {
		console.error(`✗ [${p.id}] board "${p.board}" 不存在(或无 boards:write 建不了), 跳过`);
		continue;
	}
	const body = {
		board_id: boardId,
		title: p.title,
		description: p.description,
		link: p.link,
		media_source: { source_type: 'image_url', url: IMG_BASE + p.file },
	};
	try {
		const pin = await api('POST', '/pins', body);
		state.published[p.id] = { pinId: pin.id, url: pin.link ?? p.link, board: p.board, publishedAt: new Date().toISOString() };
		console.log(`✓ 已发布 [${p.id}] pinId=${pin.id}`);
	} catch (e) {
		// Trial 权限(403 code 29): 不记失败、中止本次——Standard 批准后定时任务自动重试
		if (e.status === 403 && /Trial access/i.test(JSON.stringify(e.body ?? {}))) {
			console.error(`⏸ [${p.id}] app 仍为 Trial 权限(403 code 29) — 未记为失败, Standard 批准后重跑即自动发布。`);
			trialBlocked = true;
			break;
		}
		// schema 类错误(如 media_source 字段不匹配)时把响应原文打出来,便于对照 v5 文档修正
		state.failed[p.id] = { error: errSummary(e), at: new Date().toISOString() };
		console.error(`✗ [${p.id}] ${errSummary(e)}`);
	}
}

writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
const pubN = Object.keys(state.published).length;
const failN = Object.keys(state.failed).length;
console.log(`\n完成: 累计已发 ${pubN} / 失败 ${failN} / 队列剩余 ${queue.pins.length - pubN - failN}`);
console.log('失败条目修复后用 --pin <id> 单独重跑。');
