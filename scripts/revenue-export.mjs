#!/usr/bin/env node
// 每周复盘数据装配 (P0) — 一键拉齐 GSC 页面/查询数据 + GA4 页面级 amazon_click，
// 落盘格式与手工 GSC 导出完全一致（gsc.mjs / pain-radar 可直接读），并打印
// revenue-log.csv 待填行（Amazon 面板无 API，留空由人工读数后补）。
//
// 前置(一次性,免费):
//   1. Google Cloud Console 建 OAuth 客户端（桌面应用）:
//      https://console.cloud.google.com/apis/credentials — 启用 "Search Console API"
//      与 "Google Analytics Data API"（都不计费）
//   2. 下载 client_secret JSON 放到:
//      ~/.config/thecaringpet/google-oauth-app.json
//   3. 首次运行会在浏览器弹授权页（同一账号需同时有 GSC 和 GA4 权限）,
//      点 Allow 后 token 存 ~/.config/thecaringpet/google-revenue-token.json
//
// 用法:
//   node scripts/revenue-export.mjs                          # 上个自然周 (周一~周日)
//   node scripts/revenue-export.mjs --start 2026-11-23 --end 2026-11-29
//   node scripts/revenue-export.mjs --property 123456789     # GA4 数字 property ID
//      (不带 --property 时自动列出账号下 GA4 资产,选 thecaringpet.com 那个)
//
// 口径纪律: GSC 与 GA4 用同一日期窗口输出; Amazon 字段只留空位,不与其他窗口拼数。

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { spawnSync as spawn, spawnSync } from 'node:child_process';
import net from 'node:net';

// —— 代理引导: 与 publish-pins.mjs 同一约定 ——
async function portOpen(port) {
	return new Promise((r) => {
		const s = net.connect({ host: '127.0.0.1', port, timeout: 800 });
		s.on('connect', () => { s.destroy(); r(true); });
		s.on('error', () => r(false));
		s.on('timeout', () => { s.destroy(); r(false); });
	});
}
if (process.env.REVENUE_PROXY_BOOTSTRAPPED !== '1') {
	const useProxy = await portOpen(7890);
	const env = { ...process.env, REVENUE_PROXY_BOOTSTRAPPED: '1' };
	if (useProxy) {
		env.NODE_USE_ENV_PROXY = '1';
		env.HTTPS_PROXY = 'http://127.0.0.1:7890';
		env.HTTP_PROXY = 'http://127.0.0.1:7890';
	}
	const r = spawnSync(process.execPath, process.argv.slice(1), { env, stdio: 'inherit' });
	process.exit(r.status ?? 0);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_DIR = path.join(homedir(), '.config', 'thecaringpet');
const APP_FILE = path.join(CONFIG_DIR, 'google-oauth-app.json');
const TOKEN_FILE = path.join(CONFIG_DIR, 'google-revenue-token.json');
const GSC_SITE = 'https://thecaringpet.com/';
const SLOW_FEEDER_PAGES = [
	'/blog/best-slow-feeder-dog-bowls/',
	'/blog/best-slow-feeder-for-large-dogs/',
	'/blog/slow-feeder-bowl-size-guide/',
	'/blog/ceramic-vs-plastic-slow-feeder/',
];
// revenue-log.csv 列顺序
const LOG_HEADER =
	'review_date,period_start,period_end,gsc_clicks,slow_feeder_clicks,ga4_amazon_clicks,pinterest_sessions,pinterest_amazon_clicks,amazon_clicks,ordered_items,shipped_items,earnings_usd,pins_published,notes';

const argv = process.argv.slice(2);
const argVal = (name) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : null);

function die(msg) {
	console.error('✗', msg);
	process.exit(1);
}
function pad(n) { return String(n).padStart(2, '0'); }
function iso(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }

// 默认窗口 = 上个完整自然周(周一~周日, 本机时区)
function defaultWindow() {
	const now = new Date();
	const dow = (now.getDay() + 6) % 7; // 周一=0
	const monday = new Date(now);
	monday.setDate(now.getDate() - dow - 7);
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);
	return { start: iso(monday), end: iso(sunday) };
}
const START = argVal('--start') ?? defaultWindow().start;
const END = argVal('--end') ?? defaultWindow().end;
if (!/^\d{4}-\d{2}-\d{2}$/.test(START) || !/^\d{4}-\d{2}-\d{2}$/.test(END)) die('--start/--end 须为 YYYY-MM-DD');

// ---- OAuth 应用凭据 ----
if (!existsSync(APP_FILE)) {
	die(
		`缺少 OAuth 客户端凭据: ${APP_FILE}\n` +
		'  1. https://console.cloud.google.com/apis/credentials → 创建 OAuth 客户端(桌面应用)\n' +
		'  2. 启用 API: Search Console API + Google Analytics Data API\n' +
		'  3. 下载 JSON 放到上述路径 (内容含 client_id / client_secret 即可)'
	);
}
const appRaw = JSON.parse(readFileSync(APP_FILE, 'utf8'));
const clientId = appRaw.client_id ?? appRaw.installed?.client_id;
const clientSecret = appRaw.client_secret ?? appRaw.installed?.client_secret;
if (!clientId || !clientSecret) die('凭据 JSON 里找不到 client_id/client_secret');

const SCOPES = [
	'https://www.googleapis.com/auth/webmasters.readonly',
	'https://www.googleapis.com/auth/analytics.readonly',
];

const { OAuth2Client } = await import('google-auth-library');
const oauth = new OAuth2Client({ clientId, clientSecret, redirectUri: 'http://127.0.0.1:47523/oauth/callback' });

// ---- token: 读盘/刷新/首次授权 ----
async function authorize() {
	if (existsSync(TOKEN_FILE)) {
		const t = JSON.parse(readFileSync(TOKEN_FILE, 'utf8'));
		oauth.setCredentials(t);
		try {
			await oauth.getAccessToken(); // 过期会自动 refresh 并写回
			writeFileSync(TOKEN_FILE, JSON.stringify(oauth.credentials, null, 2), { mode: 0o600 });
			return;
		} catch (e) {
			console.log('token 刷新失败,重新走授权:', e.message);
		}
	}
	const url = oauth.generateAuthUrl({ access_type: 'offline', scope: SCOPES, prompt: 'consent' });
	console.log('\n请在浏览器完成授权 (同一 Google 账号需有 GSC + GA4 权限):\n');
	console.log(' ', url, '\n');
	const code = await new Promise((resolve, reject) => {
		const srv = http.createServer((req, res) => {
			const u = new URL(req.url, 'http://127.0.0.1:47523');
			if (u.pathname !== '/oauth/callback') return;
			const c = u.searchParams.get('code');
			res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
			res.end(c ? '授权成功,可回到终端。' : '授权失败(无 code)。');
			srv.close();
			c ? resolve(c) : reject(new Error('callback 无 code'));
		});
		srv.on('error', reject);
		srv.listen(47523, '127.0.0.1');
		setTimeout(() => { srv.close(); reject(new Error('等待授权超时(120s)')); }, 120_000);
		spawn('open', [url], { stdio: 'ignore' });
	});
	const { tokens } = await oauth.getToken(code);
	oauth.setCredentials(tokens);
	writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2), { mode: 0o600 });
	console.log('✓ token 已保存:', TOKEN_FILE);
}

await authorize();

// ---- GSC ----
const searchconsole = (await import('@googleapis/searchconsole')).searchconsole({ version: 'v1', auth: oauth });
async function gscQuery(dimensions, rowLimit) {
	const res = await searchconsole.searchanalytics.query({
		siteUrl: GSC_SITE,
		requestBody: { startDate: START, endDate: END, dimensions, rowLimit },
	});
	return res.data.rows ?? [];
}
const pct = (c, i) => (i ? `${((c / i) * 100).toFixed(2)}%` : '0%');
const num = (v) => Math.round(Number(v) ?? 0);

console.log(`\n══ GSC ${START} ~ ${END} ══`);
const pageRows = await gscQuery(['page'], 500);
const queryRows = await gscQuery(['query'], 500);
if (!pageRows.length) console.log('⚠ GSC 无数据 (新站小样本常见,或窗口内无展示)');

// 落盘: 与手工导出同名同列, gsc.mjs / 复盘表可直接读
const outDir = path.join(ROOT, 'content-ideas', 'gsc', iso(new Date()));
mkdirSync(outDir, { recursive: true });
const csvCell = (s) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
writeFileSync(
	path.join(outDir, '网页.csv'),
	['排名靠前的网页,点击次数,展示,点击率,排名',
		...pageRows.map((r) => [csvCell(r.keys[0]), num(r.clicks), num(r.impressions), pct(r.clicks, r.impressions), r.position?.toFixed(2)].join(','))].join('\n')
);
writeFileSync(
	path.join(outDir, '查询数.csv'),
	['热门查询,点击次数,展示,点击率,排名',
		...queryRows.map((r) => [csvCell(r.keys[0]), num(r.clicks), num(r.impressions), pct(r.clicks, r.impressions), r.position?.toFixed(2)].join(','))].join('\n')
);
const totalClicks = pageRows.reduce((s, r) => s + num(r.clicks), 0);
const sfClicks = pageRows
	.filter((r) => SLOW_FEEDER_PAGES.some((p) => r.keys[0].endsWith(p)))
	.reduce((s, r) => s + num(r.clicks), 0);
console.log(`✓ 已写入 ${outDir} (网页.csv ${pageRows.length} 行 / 查询数.csv ${queryRows.length} 行)`);
console.log(`  全站点击 ${totalClicks} | slow-feeder 核心 4 页点击 ${sfClicks}`);

// ---- GA4: 页面级 amazon_click ----
const analyticsdata = (await import('@googleapis/analyticsdata')).analyticsdata({ version: 'v1beta', auth: oauth });
let ga4Property = argVal('--property');
if (!ga4Property) {
	const admin = (await import('@googleapis/analyticsadmin')).analyticsadmin({ version: 'v1beta', auth: oauth });
	const accts = await admin.accounts.list();
	const props = [];
	for (const a of accts.data.accounts ?? []) {
		const p = await admin.properties.list({ filter: `parent:${a.name}` });
		props.push(...(p.data.properties ?? []));
	}
	if (!props.length) die('该账号下没有 GA4 资产');
	const match = props.find((p) => p.displayName?.includes('thecaringpet') || p.displayName?.includes('Caring Pet'));
	const chosen = match ?? props[0];
	if (props.length > 1 && !match) {
		console.log('\n⚠ 账号下有多个 GA4 资产,自动选了第一个; 建议用 --property 指定:');
		for (const p of props) console.log(`  ${p.name.replace('properties/', '')}  ${p.displayName}`);
	}
	ga4Property = chosen.name.replace('properties/', '');
}
const ga4 = await analyticsdata.properties.runReport({
	name: `properties/${ga4Property}`,
	requestBody: {
		dateRanges: [{ startDate: START, endDate: END }],
		dimensions: [{ name: 'pagePath' }],
		metrics: [{ name: 'eventCount' }],
		dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'amazon_click' } } },
		orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
		limit: 250,
	},
});
const gaRows = ga4.data.rows ?? [];
const gaTotal = gaRows.reduce((s, r) => s + num(r.metricValues[0].value), 0);
const gaSf = gaRows
	.filter((r) => SLOW_FEEDER_PAGES.some((p) => r.dimensionValues[0].value === p))
	.reduce((s, r) => s + num(r.metricValues[0].value), 0);
const gaSfJson = path.join(outDir, 'ga4-amazon-clicks.json');
writeFileSync(gaSfJson, JSON.stringify({ property: ga4Property, window: [START, END], total: gaTotal, slow_feeder: gaSf, by_page: gaRows.map((r) => ({ page: r.dimensionValues[0].value, clicks: num(r.metricValues[0].value) })) }, null, 2));
console.log(`\n══ GA4 (property ${ga4Property}, ${START} ~ ${END}) ══`);
console.log(`✓ amazon_click 全站 ${gaTotal} | slow-feeder 核心 4 页 ${gaSf} → ${gaSfJson}`);

// ---- revenue-log.csv 待填行 ----
console.log(`\n══ revenue-log.csv 行 (${END} 复盘时追加) ══`);
console.log(LOG_HEADER);
console.log(
	[iso(new Date()), START, END, totalClicks, sfClicks, gaTotal, '', '', '', '', '', '', '', 'pins=本周已发布数; Amazon 4 列人工读面板后补齐']
		.map((v) => csvCell(String(v)))
		.join(',')
);
console.log('\n提示: pinterest_sessions / pinterest_amazon_clicks 在 GA4 里按 session source=pinterest 另查(或下版脚本补); Amazon 面板为全站汇总口径。');
