// 共享运行时：日期、spawn 收集器、CA 证书、原子写 JSON、统一 schema 构造。
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

export const SCHEMA_VERSION = 'pain-radar.raw.v1';

export function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function nowIso() { return new Date().toISOString(); }

export async function ensureDir(dir) { await mkdir(dir, { recursive: true }); }

export async function writeJsonAtomic(file, data) {
  await ensureDir(path.dirname(file));
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  await writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await rename(tmp, file);
}

export async function readJsonSafe(file) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch { return null; }
}

// spawn 收集器：返回 { code, stdout, stderr, timedOut }（沿用 trending-radar-social.mjs 模式）
export function run(cmd, args, { cwd, timeoutMs = 60000, env } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const t = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeoutMs);
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { stderr += d; });
    child.on('error', (e) => { clearTimeout(t); resolve({ code: -1, stdout, stderr: String(e), timedOut }); });
    child.on('close', (code) => { clearTimeout(t); resolve({ code, stdout, stderr, timedOut }); });
  });
}

// macOS Python.org 框架 Python 不带 CA 根证书，last30days 的 HTTPS 调用需要 certifi。
let _certFile = null;
export async function resolveCertFile() {
  if (_certFile !== null) return _certFile;
  if (process.env.SSL_CERT_FILE) { _certFile = process.env.SSL_CERT_FILE; return _certFile; }
  const r = await run('python3', ['-c', 'import certifi; print(certifi.where())'], { timeoutMs: 15000 });
  _certFile = r.code === 0 ? r.stdout.trim() : '';
  return _certFile;
}

// === 统一 schema 构造 ===
// run 状态：ok | partial | empty | error | skipped
export function makeRun(id, query) {
  return {
    id,
    query,
    started_at: nowIso(),
    duration_ms: 0,
    status: 'ok',
    items: [],
    errors: [],
  };
}

export function finishRun(run_, startedMs) {
  run_.duration_ms = Date.now() - startedMs;
  if (run_.status === 'ok' && !run_.items.length) run_.status = run_.errors.length ? 'error' : 'empty';
  if (run_.status === 'ok' && run_.errors.length) run_.status = 'partial';
  return run_;
}

export function makeError(code, message, extra = {}) {
  return {
    code,
    message: String(message).slice(0, 500),
    timestamp: nowIso(),
    retryable: false,
    ...extra,
  };
}

// item 构造：kind 见各 source；quotes[].raw_ref 指向 source/ 下的原始文件 + JSON pointer。
export function makeItem({ kind, title, url, body_excerpt = null, body_kind = null, quotes = [], engagement = {}, published_at = null, metadata = {}, raw_ref = null }) {
  return {
    kind,
    title: title || null,
    url: url || null,
    body_excerpt,
    body_kind,
    quotes,
    engagement,
    published_at,
    metadata,
    raw_ref,
  };
}

export function makeQuote({ text, kind, url, engagement = {}, raw_ref = null, published_at = null }) {
  return { text, kind, url, engagement, raw_ref, published_at };
}

export function makeEnvelope(platform) {
  return {
    schema_version: SCHEMA_VERSION,
    platform,
    collected_at: nowIso(),
    target_min_items: 10,
    runs: [],
    errors: [],
  };
}
