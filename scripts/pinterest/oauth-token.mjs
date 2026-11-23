#!/usr/bin/env node
// Pinterest OAuth — 换取带写权限(pins:write/boards:write)的 user token。
// 控制台快速生成器只发读权限,写权限必须走一次浏览器授权。
//
// 前置: app 设置里(developers.pinterest.com/apps → 本 app → Configure/设置)
//       Redirect URI 填: http://localhost:8080/callback
//
// 用法: node scripts/pinterest/oauth-token.mjs
//   → 打开浏览器授权页 → 你点"允许" → 本地 8080 收到 code → 自动换 token →
//     写入 ~/.config/thecaringpet/pinterest-token (覆盖旧的只读 token)

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, chmodSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { exec, spawnSync } from 'node:child_process';
import net from 'node:net';

// —— 代理引导: NODE_USE_ENV_PROXY 必须在进程启动前生效 ——
// 探测顺序: 本机 7890(ApexCore) 开着→带代理重启自己; 否则直连。
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

const CFG = path.join(homedir(), '.config', 'thecaringpet', 'pinterest-app.json');
const OUT = path.join(homedir(), '.config', 'thecaringpet', 'pinterest-token');
const REDIRECT = 'http://localhost:8080/callback';
const SCOPES = 'boards:read boards:write pins:read pins:write user_accounts:read';

// 网络代理由顶部引导段决定(7890 开→走代理, 否则直连), 这里不再重复设置

const { app_id, app_secret } = JSON.parse(readFileSync(CFG, 'utf8'));
const state = Math.random().toString(36).slice(2) + Date.now().toString(36);

const authUrl = 'https://www.pinterest.com/oauth/?' + new URLSearchParams({
	consumer_id: app_id,
	redirect_uri: REDIRECT,
	response_type: 'code',
	scope: SCOPES,
	state,
});

let codeResolve;
const codePromise = new Promise(r => { codeResolve = r; });

const server = createServer((req, res) => {
	const u = new URL(req.url, REDIRECT);
	if (u.pathname !== '/callback') { res.writeHead(404).end(); return; }
	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
	const code = u.searchParams.get('code');
	const err = u.searchParams.get('error');
	if (err || !code) {
		res.end('授权失败: ' + (err ?? '无 code'));
		codeResolve(null);
	} else {
		res.end('✅ 授权成功! 回到终端即可, 这个页面可以关掉。');
		codeResolve(code);
	}
	setTimeout(() => server.close(), 500);
});

server.listen(8080, () => {
	console.log('打开浏览器授权页…');
	console.log('(若浏览器没自动打开, 手动访问下面这个 URL):\n');
	console.log(authUrl + '\n');
	exec(`open "${authUrl}"`);
});

const code = await Promise.race([
	codePromise,
	new Promise(r => setTimeout(() => r(null), 180_000)),
]);
server.close();
if (!code) { console.error('✗ 180 秒内未收到授权回调, 重跑本脚本。'); process.exit(1); }

// —— 换 token (Basic auth) ——
const basic = Buffer.from(`${app_id}:${app_secret}`).toString('base64');
const res = await fetch('https://api.pinterest.com/v5/oauth/token', {
	method: 'POST',
	headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
	body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT }),
});
const data = await res.json().catch(() => ({}));
if (!res.ok || !data.access_token) {
	console.error('✗ token 交换失败:', res.status, JSON.stringify(data).slice(0, 400));
	process.exit(1);
}

writeFileSync(OUT, data.access_token + '\n');
chmodSync(OUT, 0o600);
console.log(`✅ token 已写入 ${OUT} (scope: ${data.scope ?? '见 app 配置'}, 剩余有效信息见响应)`);
console.log('下一步: node scripts/pinterest/publish-pins.mjs --dry');
