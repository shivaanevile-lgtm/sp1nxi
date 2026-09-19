// POST /api/room — online room state, held in KV.
// Bindings: ROOMS (KV namespace)
//
// Rooms are tiny and short-lived, so KV + 2s polling is enough and keeps
// this a pure Pages project. If you later want live presence (a "they're
// building" ticker, chat), move this to a Durable Object in a separate
// aajsjsn Worker and bind it here — the client contract below stays the same.

const TTL = 60 * 60 * 6;                 // rooms expire after six hours
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ';   // no I or O

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });

const newCode = () =>
  Array.from({ length: 4 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');

export async function onRequestPost({ request, env }) {
  if (!env.ROOMS) return json({ ok: false, error: 'no-kv' }, 500);

  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'bad-json' }, 400); }
  const { action, code } = body;

  const read = async c => {
    const raw = await env.ROOMS.get('room:' + c);
    return raw ? JSON.parse(raw) : null;
  };
  const write = (c, state) =>
    env.ROOMS.put('room:' + c, JSON.stringify(state), { expirationTtl: TTL });

  if (action === 'create') {
    let c;
    for (let i = 0; i < 6; i++) { c = newCode(); if (!(await read(c))) break; }
    const state = { league: body.league || null, players: 1, squads: [null, null], created: Date.now() };
    await write(c, state);
    return json({ ok: true, code: c, state });
  }

  if (!code) return json({ ok: false, error: 'no-code' }, 400);
  const state = await read(code);
  if (!state) return json({ ok: false, error: 'not-found' }, 404);

  if (action === 'state') return json({ ok: true, state });

  if (action === 'join') {
    if (state.players < 2) { state.players = 2; await write(code, state); }
    return json({ ok: true, state });
  }

  if (action === 'league') {           // host picks the league after opening the room
    state.league = body.league;
    await write(code, state);
    return json({ ok: true, state });
  }

  if (action === 'submit') {
    const seat = body.seat === 1 ? 1 : 0;
    state.squads[seat] = body.squad;
    await write(code, state);
    return json({ ok: true, state });
  }

  return json({ ok: false, error: 'unknown-action' }, 400);
}
