#!/usr/bin/env node
// Tiny webbridge client: `node scripts/wb.mjs '{"action":"...","args":{...},"session":"..."}'`
// Reads one JSON payload from argv, POSTs it to the Kimi WebBridge daemon, prints the response.
const payload = process.argv[2];
if (!payload) {
	console.error('usage: node scripts/wb.mjs \'{"action":"...","args":{...},"session":"..."}\'');
	process.exit(1);
}
try {
	const body = JSON.parse(payload);
	const res = await fetch('http://127.0.0.1:10086/command', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	const text = await res.text();
	// Truncate huge responses so they don't blow up the caller's context.
	console.log(text.length > 100000 ? text.slice(0, 100000) + '\n...[truncated]' : text);
} catch (err) {
	console.error('WEBBRIDGE_ERROR', err.message);
	process.exit(1);
}
