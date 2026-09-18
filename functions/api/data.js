// GET /api/data?league=PL&club=Arsenal
// Serves squads straight out of KV. Never calls API-Football — filling KV
// is /api/refresh's job. If a club isn't cached yet this 404s and the
// client falls back to its built-in demo squad, so the game always runs.
//
// Bindings: SQUADS (KV namespace)

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const league = url.searchParams.get('league');
  const club = url.searchParams.get('club');
  if (!league || !club) {
    return new Response(JSON.stringify({ error: 'league and club are required' }), {
      status: 400, headers: { 'content-type': 'application/json' }
    });
  }
  if (!env.SQUADS) {
    return new Response(JSON.stringify({ error: 'cache not configured' }), {
      status: 503, headers: { 'content-type': 'application/json' }
    });
  }

  const key = `squad:${league}:${club}`;
  const cached = await env.SQUADS.get(key);
  if (!cached) {
    return new Response(JSON.stringify({ error: 'not cached yet', key }), {
      status: 404, headers: { 'content-type': 'application/json' }
    });
  }

  return new Response(cached, {
    headers: {
      'content-type': 'application/json',
      // squads change once a day at most; let the edge hold them
      'cache-control': 'public, max-age=3600'
    }
  });
}
