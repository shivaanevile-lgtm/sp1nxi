// GET /api/refresh?league=PL&token=...&budget=40
//
// Pulls squads + per-season stats from API-Football and writes them into
// KV in the shape the game expects. This is the ONLY place that spends
// API quota. The free tier is 100 requests a day, and a full league costs
// roughly 1 (teams) + 2 per club (paged players) ≈ 41, so refresh one
// league a day and the whole app stays inside the free tier.
//
// It resumes where it left off: each run processes clubs that are missing
// or stale until `budget` requests are used, then records a cursor.
//
// Bindings: SQUADS (KV), API_FOOTBALL_KEY (secret), REFRESH_TOKEN (secret)
// Cron: Pages has no scheduled triggers, so hit this URL daily from any
// free cron service (cron-job.org, GitHub Actions, a phone shortcut).

const LEAGUE_IDS = { PL: 39, LL: 140, BL: 78, SA: 135, L1: 61 };
const STALE_MS = 20 * 60 * 60 * 1000;   // refresh a club at most once a day
const API = 'https://v3.football.api-sports.io';

const json = (o, s = 200) =>
  new Response(JSON.stringify(o, null, 2), { status: s, headers: { 'content-type': 'application/json' } });

// Free plan allows 10 requests/minute. Waiting between calls costs nothing —
// Workers only meter active CPU time, and time spent awaiting is free even
// on the Free plan — so pace conservatively at 9/minute.
const PACE_MS = 6600;
const sleep = ms => new Promise(res => setTimeout(res, ms));

async function call(env, path, counter) {
  if (counter.used > 0) await sleep(PACE_MS);
  counter.used++;
  const r = await fetch(API + path, { headers: { 'x-apisports-key': env.API_FOOTBALL_KEY } });
  if (!r.ok) throw new Error(`api-football ${r.status} on ${path}`);
  const j = await r.json();
  if (j.errors && Object.keys(j.errors).length) throw new Error(JSON.stringify(j.errors));
  return j;
}

// Flatten API-Football's nested statistics into the flat block the
// rating formula in app.js reads. Sums across competitions for the season.
function flatten(entry) {
  const p = entry.player;
  const acc = {
    appearances: 0, minutes: 0, goals: 0, assists: 0, dribbles: 0, passes: 0,
    tackles: 0, interceptions: 0, blocks: 0, saves: 0, penaltiesSaved: 0, conceded: 0, cleanSheets: 0,
    _accSum: 0, _accN: 0
  };
  let position = 'Midfielder';
  for (const s of entry.statistics || []) {
    if (s.games?.position) position = s.games.position;
    acc.appearances += s.games?.appearences || 0;
    acc.minutes += s.games?.minutes || 0;
    acc.goals += s.goals?.total || 0;
    acc.assists += s.goals?.assists || 0;
    acc.saves += s.goals?.saves || 0;
    acc.conceded += s.goals?.conceded || 0;
    acc.dribbles += s.dribbles?.success || 0;
    acc.passes += s.passes?.total || 0;
    acc.tackles += s.tackles?.total || 0;
    acc.interceptions += s.tackles?.interceptions || 0;
    acc.blocks += s.tackles?.blocks || 0;
    acc.penaltiesSaved += s.penalty?.saved || 0;
    if (s.passes?.accuracy) { acc._accSum += Number(s.passes.accuracy) || 0; acc._accN++; }
  }
  const passAccuracy = acc._accN ? Math.round(acc._accSum / acc._accN) : 75;
  delete acc._accSum; delete acc._accN;
  return {
    id: String(p.id), name: p.name, number: entry.statistics?.[0]?.games?.number || 0,
    position,
    stats: { ...acc, passAccuracy, cleanSheets: 0 }   // clean sheets filled below
  };
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.REFRESH_TOKEN || url.searchParams.get('token') !== env.REFRESH_TOKEN) {
    return json({ error: 'unauthorized' }, 401);
  }
  if (!env.API_FOOTBALL_KEY) return json({ error: 'API_FOOTBALL_KEY not set' }, 500);

  const leagueKey = url.searchParams.get('league');
  const leagueId = LEAGUE_IDS[leagueKey];
  if (!leagueId) return json({ error: 'league must be one of ' + Object.keys(LEAGUE_IDS) }, 400);

  const season = Number(url.searchParams.get('season')) || new Date().getFullYear() - (new Date().getMonth() < 6 ? 1 : 0);
  // Free Workers cap subrequests at 50 per invocation, so keep budget under that
  // regardless of what's asked for.
  const budget = Math.min(Number(url.searchParams.get('budget')) || 20, 45);
  const counter = { used: 0 };
  const report = { league: leagueKey, season, done: [], skipped: [], errors: [] };

  try {
    // 1. team list (cached for a week — it barely changes)
    let teams = await env.SQUADS.get(`teams:${leagueKey}:${season}`, 'json');
    if (!teams) {
      const t = await call(env, `/teams?league=${leagueId}&season=${season}`, counter);
      teams = t.response.map(x => ({ id: x.team.id, name: x.team.name }));
      await env.SQUADS.put(`teams:${leagueKey}:${season}`, JSON.stringify(teams), { expirationTtl: 604800 });
    }

    for (const team of teams) {
      if (counter.used + 2 > budget) { report.skipped.push(team.name); continue; }
      const key = `squad:${leagueKey}:${team.name}`;
      const meta = await env.SQUADS.get(key + ':meta', 'json');
      if (meta && Date.now() - meta.at < STALE_MS) { report.skipped.push(team.name); continue; }

      try {
        const players = [];
        let page = 1, total = 1;
        while (page <= total && counter.used < budget) {
          const r = await call(env, `/players?team=${team.id}&season=${season}&page=${page}`, counter);
          total = r.paging?.total || 1;
          r.response.forEach(e => players.push(flatten(e)));
          page++;
        }
        if (players.length < 14) { report.errors.push(`${team.name}: only ${players.length} players`); continue; }

        // API-Football doesn't return clean sheets on /players, but it does
        // return goals conceded for anyone on the pitch. Concessions are
        // close enough to Poisson, so P(clean sheet) = e^(-goals per match).
        players.forEach(p => {
          const apps = p.stats.appearances || 0;
          if (!apps) return;
          if (p.position === 'Goalkeeper') {
            p.stats.cleanSheets = Math.round(apps * Math.exp(-p.stats.conceded / apps));
          } else if (p.position === 'Defender') {
            const gk = players.find(x => x.position === 'Goalkeeper' && x.stats.appearances);
            const rate = gk ? gk.stats.conceded / gk.stats.appearances : 1.4;
            p.stats.cleanSheets = Math.round(apps * Math.exp(-rate));
          }
        });

        await env.SQUADS.put(key, JSON.stringify({ club: team.name, season, squad: players }));
        await env.SQUADS.put(key + ':meta', JSON.stringify({ at: Date.now(), n: players.length }));
        report.done.push(team.name);
      } catch (e) {
        report.errors.push(`${team.name}: ${e.message}`);
      }
    }
  } catch (e) {
    report.errors.push(e.message);
  }

  report.requestsUsed = counter.used;
  return json(report);
}
