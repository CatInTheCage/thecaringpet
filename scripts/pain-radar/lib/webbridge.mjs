// kimi-webbridge 共享客户端（daemon 127.0.0.1:10086）。
// 用法：const wb = createWebbridge('tcp-pain-radar'); await wb.ensureDaemon(); ...
const DAEMON = 'http://127.0.0.1:10086/command';

export function createWebbridge(session) {
  async function cmd(action, args = {}, { timeoutMs = 45000 } = {}) {
    const body = JSON.stringify({ action, args, session });
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(DAEMON, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: ctrl.signal,
      });
      clearTimeout(t);
      const j = await res.json();
      if (!j.ok) return { error: (j.error && j.error.message) || JSON.stringify(j).slice(0, 200), code: j.error && j.error.code };
      return j.data;
    } catch (e) {
      clearTimeout(t);
      return { error: e.name === 'AbortError' ? `daemon 超时 ${timeoutMs / 1000}s` : (e.message || String(e)) };
    }
  }

  async function ensureDaemon() {
    const r = await cmd('list_tabs', {});
    if (r.error) {
      console.error('❌ 连不上 Kimi WebBridge daemon。请先启动：~/.kimi-webbridge/bin/kimi-webbridge start');
      console.error('   并确保浏览器开着、WebBridge 扩展已连接。');
      throw new Error(`webbridge 不可用: ${r.error}`);
    }
    return true;
  }

  async function navigate(url, { newTab = false, groupTitle } = {}) {
    const args = { url, newTab };
    if (groupTitle) args.group_title = groupTitle;
    return cmd('navigate', args, { timeoutMs: 60000 });
  }

  // evaluate 并解析 JSON 返回值。页面 JS 必须返回紧凑 JSON.stringify(...)。
  // 导航后偶发 "Detached while handling command"，重试一次。
  async function evalJson(code, { timeoutMs = 60000, retries = 1 } = {}) {
    let last = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
      const r = await cmd('evaluate', { code }, { timeoutMs });
      if (!r.error) {
        if (typeof r.value !== 'string') return { error: `evaluate 返回非字符串: ${r.type}` };
        try { return { value: JSON.parse(r.value) }; } catch {
          return { error: `evaluate 返回不可解析 JSON（前 200 字符）: ${r.value.slice(0, 200)}` };
        }
      }
      last = r;
      if (/Detached/i.test(r.error) && attempt < retries) {
        await new Promise((res) => setTimeout(res, 2500));
        continue;
      }
      break;
    }
    return { error: last ? last.error : 'unknown evaluate error' };
  }

  async function network(cmdName, extra = {}) {
    return cmd('network', { cmd: cmdName, ...extra });
  }

  async function closeSession() { return cmd('close_session', {}); }

  return { cmd, ensureDaemon, navigate, evalJson, network, closeSession, session };
}
