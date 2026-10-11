// Cloudflare Worker CORS proxy for JilFlix
export default {
  async fetch(req) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const target = new URL(req.url).searchParams.get('url');
    if (!target || !target.startsWith('https://api.chamindu.site/')) {
      return new Response('Bad request', { status: 400, headers: cors });
    }
    const r = await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const h = new Headers(r.headers);
    Object.entries(cors).forEach(([k, v]) => h.set(k, v));
    return new Response(r.body, { status: r.status, headers: h });
  }
};
