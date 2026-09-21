// POST /api/room — online room state.
//
// Storage: D1 (binding "DB") if it's connected — reads always see the
// latest write, so both phones stay in step. Otherwise falls back to KV
// (binding "ROOMS"), which works but can serve an old copy for a while.
//
// Each player's squad is stored separately, so two players locking in at
// the same moment can never overwrite each other. When the second squad
// arrives the server sets one shared kick-off time a few seconds ahead,
// and both phones count down to it.

const TTL = 60 * 60 * 6;                        // rooms expire after six hours
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ';    // no I or O
const KICKOFF_DELAY = 4000;                     // ms from "both in" to kick-off

let STORE_KIND = '';
const json = (obj, status = 200) =>
  new Response(JSON.stringify({ ...obj, now: Date.now(), store: STORE_KIND }),
    { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const newCode = () => Array.from({ length: 4 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
const parse = s => { try { return s ? JSON.parse(s) : null; } catch { return null; } };

/* ---- D1 ---- */
let tableReady = false;
function d1Store(db) {
  const ensure = async () => {
    if (tableReady) return;
    await db.prepare(`CREATE TABLE IF NOT EXISTS rooms (
      code TEXT PRIMARY KEY, league TEXT, players INTEGER, s0 TEXT, s1 TEXT, kickoff INTEGER, created INTEGER, p0 TEXT, p1 TEXT)`).run();
    // tables made by the previous version lack the draft-progress columns
    for (const col of ['p0', 'p1']) { try { await db.prepare(`ALTER TABLE rooms ADD COLUMN ${col} TEXT`).run(); } catch (e) { /* already there */ } }
    tableReady = true;
  };
  return {
    async read(code) {
      await ensure();
      const r = await db.prepare('SELECT * FROM rooms WHERE code = ?').bind(code).first();
      if (!r) return null;
      return { league: r.league, players: r.players, squads: [parse(r.s0), parse(r.s1)], progress: [parse(r.p0), parse(r.p1)], kickoff: r.kickoff || null, created: r.created };
    },
    async create(code, league) {
      await ensure();
      await db.prepare('DELETE FROM rooms WHERE created < ?').bind(Date.now() - TTL * 1000).run();
      await db.prepare('INSERT INTO rooms (code, league, players, created) VALUES (?, ?, 1, ?)').bind(code, league, Date.now()).run();
    },
    join: code => db.prepare('UPDATE rooms SET players = 2 WHERE code = ?').bind(code).run(),
    setLeague: (code, league) => db.prepare('UPDATE rooms SET league = ? WHERE code = ?').bind(league, code).run(),
    setSquad: (code, seat, squad) => db.prepare(`UPDATE rooms SET s${seat} = ? WHERE code = ?`).bind(JSON.stringify(squad), code).run(),
    setProgress: (code, seat, squad) => db.prepare(`UPDATE rooms SET p${seat} = ? WHERE code = ?`).bind(JSON.stringify(squad), code).run(),
    // only the first caller's time sticks, so both phones get the same one
    setKickoff: (code, t) => db.prepare('UPDATE rooms SET kickoff = ? WHERE code = ? AND kickoff IS NULL').bind(t, code).run()
  };
}

/* ---- KV fallback ---- */
function kvStore(kv) {
  const get = k => kv.get(k, { cacheTtl: 30 }).then(parse);
  const put = (k, v) => kv.put(k, JSON.stringify(v), { expirationTtl: TTL });
  return {
    async read(code) {
      const meta = await get('room:' + code);
      if (!meta) return null;
      const [s0, s1, p0, p1] = await Promise.all(['s0', 's1', 'p0', 'p1'].map(k => get(`room:${code}:${k}`)));
      // older rooms kept squads inside the main record
      const old = meta.squads || [null, null];
      return { league: meta.league, players: meta.players, squads: [s0 || old[0], s1 || old[1]], progress: [p0, p1], kickoff: meta.kickoff || null, created: meta.created };
    },
    create: (code, league) => put('room:' + code, { league, players: 1, created: Date.now() }),
    async join(code) { const m = await get('room:' + code); if (m && m.players < 2) { m.players = 2; await put('room:' + code, m); } },
    async setLeague(code, league) { const m = await get('room:' + code); if (m) { m.league = league; await put('room:' + code, m); } },
    setSquad: (code, seat, squad) => put(`room:${code}:s${seat}`, squad),
    setProgress: (code, seat, squad) => put(`room:${code}:p${seat}`, squad),
    async setKickoff(code, t) { const m = await get('room:' + code); if (m && !m.kickoff) { m.kickoff = t; await put('room:' + code, m); } }
  };
}

export async function onRequestPost(ctx) {
  try { return await handle(ctx); }
  catch (e) { return json({ ok: false, error: 'server: ' + String(e && e.message || e).slice(0, 120) }, 500); }
}

async function handle({ request, env }) {
  const store = env.DB ? d1Store(env.DB) : env.ROOMS ? kvStore(env.ROOMS) : null;
  STORE_KIND = env.DB ? 'd1' : env.ROOMS ? 'kv' : 'none';
  if (!store) return json({ ok: false, error: 'no-storage' }, 500);

  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'bad-json' }, 400); }
  const { action, code } = body;

  if (action === 'create') {
    let c;
    for (let i = 0; i < 6; i++) { c = newCode(); if (!(await store.read(c))) break; }
    await store.create(c, body.league || null);
    return json({ ok: true, code: c, state: await store.read(c), store: env.DB ? 'd1' : 'kv' });
  }

  if (!code) return json({ ok: false, error: 'no-code' }, 400);
  let state = await store.read(code);
  if (!state) return json({ ok: false, error: 'not-found' }, 404);

  if (action === 'state') return json({ ok: true, state });
  // A third person in (e.g. scanning the room QR late) becomes a spectator.
  if (action === 'join') {
    if (state.players >= 2) return json({ ok: true, full: true, state });
    await store.join(code);
    return json({ ok: true, state: await store.read(code) });
  }
  if (action === 'progress') {
    await store.setProgress(code, body.seat === 1 ? 1 : 0, body.squad);
    return json({ ok: true });
  }
  if (action === 'league') { await store.setLeague(code, body.league); return json({ ok: true, state: await store.read(code) }); }

  if (action === 'submit') {
    const seat = body.seat === 1 ? 1 : 0;
    await store.setSquad(code, seat, body.squad);
    state = await store.read(code);
    state.squads[seat] = body.squad;          // we know what we just wrote
    if (state.squads[0] && state.squads[1] && !state.kickoff) {
      await store.setKickoff(code, Date.now() + KICKOFF_DELAY);
      const fresh = await store.read(code);
      state.kickoff = (fresh && fresh.kickoff) || Date.now() + KICKOFF_DELAY;
    }
    return json({ ok: true, state });
  }

  return json({ ok: false, error: 'unknown-action' }, 400);
}
