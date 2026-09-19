// GET /api/debug — TEMPORARY. Reports whether secrets/bindings are reaching
// the deployed Functions environment, without ever revealing their values.
// Delete this file once REFRESH_TOKEN / API_FOOTBALL_KEY are confirmed working.

export async function onRequestGet({ env }) {
  const report = {
    hasApiKey: typeof env.API_FOOTBALL_KEY === 'string' && env.API_FOOTBALL_KEY.length > 0,
    apiKeyLength: env.API_FOOTBALL_KEY ? env.API_FOOTBALL_KEY.length : 0,
    hasRefreshToken: typeof env.REFRESH_TOKEN === 'string' && env.REFRESH_TOKEN.length > 0,
    refreshTokenLength: env.REFRESH_TOKEN ? env.REFRESH_TOKEN.length : 0,
    hasSquadsKV: !!env.SQUADS,
    hasRoomsKV: !!env.ROOMS
  };
  return new Response(JSON.stringify(report, null, 2), {
    headers: { 'content-type': 'application/json' }
  });
}
