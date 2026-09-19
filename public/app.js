/* Sp1nXI — spin a formation, spin a club, build an XI, play the match. */

/* ------------------------------------------------------------------ *
 * 1. LEAGUES & CLUBS
 * Club colours are the real kit colours; they drive the whole theme
 * once a club is spun. `tier` only seeds the demo squads.
 * ------------------------------------------------------------------ */
const LEAGUES = {
  PL: { id: 39, name: 'Premier League', country: 'England', tint: '#3D195B', clubs: [
    ['Arsenal','#EF0107','#023474',1],['Aston Villa','#95BFE5','#670E36',3],
    ['Bournemouth','#DA291C','#000000',4],['Brentford','#E30613','#140E0C',4],
    ['Brighton','#0057B8','#FFCD00',3],['Chelsea','#034694','#001489',2],
    ['Crystal Palace','#1B458F','#C4122E',4],['Everton','#003399','#FFFFFF',4],
    ['Fulham','#000000','#CC0000',4],['Ipswich Town','#3A64A3','#DE2C37',5],
    ['Leicester City','#003090','#FDBE11',5],['Liverpool','#C8102E','#00B2A9',1],
    ['Manchester City','#6CABDD','#1C2C5B',1],['Manchester United','#DA291C','#000000',2],
    ['Newcastle','#241F20','#41B6E6',2],['Nottingham Forest','#DD0000','#000000',4],
    ['Southampton','#D71920','#130C0E',5],['Tottenham','#132257','#FFFFFF',2],
    ['West Ham','#7A263A','#1BB1E7',4],['Wolves','#FDB913','#231F20',4]] },
  UCL: { id: 2, name: 'Champions League', country: 'Europe', tint: '#0A0F24', clubs: [
    ['Real Madrid','#FEBE10','#00529F',1],['Manchester City','#6CABDD','#1C2C5B',1],
    ['Bayern München','#DC052D','#0066B2',1],['Paris Saint-Germain','#004170','#DA291C',1],
    ['Liverpool','#C8102E','#00B2A9',1],['Barcelona','#A50044','#004D98',1],
    ['Arsenal','#EF0107','#023474',1],['Inter','#0068A8','#000000',1],
    ['Borussia Dortmund','#FDE100','#000000',2],['Atlético Madrid','#CB3524','#262E62',2],
    ['Napoli','#12A0D7','#003D7C',2],['Manchester United','#DA291C','#000000',2],
    ['Villarreal','#FFE667','#005187',2],['RB Leipzig','#DD0741','#001F47',2],
    ['Sporting CP','#00693E','#FFFFFF',2],['Porto','#003C7D','#FFFFFF',2],
    ['Club Brugge','#0069B4','#000000',3],['Galatasaray','#FFA500','#A90432',3],
    ['PSV Eindhoven','#ED1C24','#FFFFFF',3],['Shakhtar Donetsk','#FF6600','#000000',3],
    ['Aston Villa','#95BFE5','#670E36',3],['Roma','#8E1F2F','#F0BC42',3],
    ['Real Betis','#00954C','#FFFFFF',3],['Feyenoord','#ED1C24','#00693E',3],
    ['Stuttgart','#E32219','#FFFFFF',4],['Lille','#D6001C','#003A70',4],
    ['Lens','#FFED00','#D6001C',4],['Como','#0066B3','#003087',4],
    ['Fenerbahçe','#FFED00','#00205B',4],
    ['AEK Athens','#FFD700','#000000',5],['Bodø/Glimt','#FFD700','#111111',5],
    ['LASK','#000000','#FFFFFF',5],['Sabah','#003876','#FFD700',5],
    ['Slavia Praha','#B90000','#FFFFFF',5],['Slovan Bratislava','#00539B','#FFFFFF',5],
    ['Viking FK','#000000','#FFFFFF',5]
  ] },
};

// Kit colours for clubs that can show up via live data (promotions,
// newly arrived sides) but weren't in a hardcoded list — plus whatever's
// already known from the static LEAGUES table below. A club with no entry
// anywhere gets DEFAULT_KIT so nothing breaks visually.
const DEFAULT_KIT = ['#5B6B7A', '#1B222B'];
const EXTRA_KITS = {
  'Coventry City': ['#78C4E0', '#211D1B'],
  'Hull City': ['#F18A00', '#0B0B0B'],
  'Leeds United': ['#FFFFFF', '#1D428A'],
  'Sunderland': ['#EB172B', '#211E1F'],
  'Burnley': ['#6C1D45', '#99D6EA'],
  'Leicester City': ['#003090', '#FDBE11'],
  'Southampton': ['#D71920', '#130C0E'],
  'West Ham': ['#7A263A', '#1BB1E7'],
  'Wolves': ['#FDB913', '#231F20'],
  'Ipswich Town': ['#3A64A3', '#DE2C37']
};
function kitFor(name) {
  const pl = LEAGUES.PL.clubs.find(c => c[0] === name);
  if (pl) return [pl[1], pl[2]];
  if (EXTRA_KITS[name]) return EXTRA_KITS[name];
  return DEFAULT_KIT;
}

// Live club data (Premier League only, via FPL) is fetched once per
// session and cached here. Club MEMBERSHIP (which 20 teams are actually
// in the Prem right now) comes from this — promotion/relegation just
// resolves itself. But it is NOT the rating source for curated players;
// see loadPLNameIndex below for how it's actually used.
let livePLCache = null;
async function loadLivePL() {
  if (livePLCache) return livePLCache;
  try {
    const r = await fetch('/api/fpl');
    if (r.ok) {
      const j = await r.json();
      if (j.clubs && j.squads) { livePLCache = j; return j; }
    }
  } catch (e) { /* fall through to static/demo below */ }
  return null;
}
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');

// name -> current club, built once from the live feed. This is the ONLY
// thing FPL is used for on curated players: confirming someone hasn't
// quietly left the Premier League or moved to a different club since the
// curated file was written. Hand-set ratings always win when a player is
// still confirmed present — FPL's price never overrides them.
let plNameIndexCache = null;
async function loadPLNameIndex() {
  if (plNameIndexCache) return plNameIndexCache;
  const live = await loadLivePL();
  const idx = new Map();
  if (live) {
    for (const [club, players] of Object.entries(live.squads)) {
      for (const p of players) idx.set(norm(p.name), club);
    }
  }
  plNameIndexCache = idx;
  return idx;
}

// Resolves a league's club list — live for PL, static for everything else.
// Every club comes back in the same {name, home, away, tier} shape the
// rest of the game already expects.
async function getLeagueClubs(leagueKey) {
  if (leagueKey === 'PL') {
    const live = await loadLivePL();
    if (live) return live.clubs.map(c => {
      const [home, away] = kitFor(c.name);
      return { name: c.name, home, away, tier: c.tier };
    });
  }
  return LEAGUES[leagueKey].clubs.map(c => ({ name: c[0], home: c[1], away: c[2], tier: c[3] }));
}

// The traditional "big" clubs per league — spun for more often than a
// flat random pick would give them. Leagues not listed here spin flat.
// Extend this as more leagues get curated data.
const TOP_CLUBS = {
  // The traditional "big 6" — weighted so this group comes up ~65% of the
  // time across a 20-club pool (solve 6w/(6w+14)=0.65 → w≈4.33).
  PL: ['Arsenal', 'Liverpool', 'Manchester City', 'Chelsea', 'Manchester United', 'Tottenham'],
  // Clubs in this season's 36-team field with 2+ European Cup/Champions
  // League titles — weighted so this group comes up ~65% of the time
  // (solve 7w/(7w+29)=0.65 → w≈7.69). Everyone else, debutants included,
  // still shows up — just far less often, same as a real UCL night.
  UCL: ['Real Madrid', 'Bayern München', 'Liverpool', 'Barcelona',
    'Manchester United', 'Inter', 'Porto']
};
// weight: a top club is this many times more likely than a normal one
const TOP_CLUB_WEIGHT = { PL: 4.33, UCL: 7.69 };
function weightedClubIndex(clubs, leagueKey) {
  const top = new Set(TOP_CLUBS[leagueKey] || []);
  if (!top.size) return Math.floor(Math.random() * clubs.length);
  const w = TOP_CLUB_WEIGHT[leagueKey] || 3;
  const weights = clubs.map(c => top.has(c.name) ? w : 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < clubs.length; i++) { r -= weights[i]; if (r <= 0) return i; }
  return clubs.length - 1;
}

/* ------------------------------------------------------------------ *
 * 2. FORMATIONS — every slot carries a role, a rating group and a
 * pitch coordinate (x/y in %, own goal at the bottom).
 * ------------------------------------------------------------------ */
const GROUP = { GK:'GK', DEF:'DEF', DM:'MID', CM:'MID', LM:'MID', RM:'MID',
  CAM:'ATT_MID', LW:'ATT_MID', RW:'ATT_MID', ST:'FWD' };

/* API-Football only reports four position categories, so each slot
   declares which of them can fill it. */
const ELIGIBLE = {
  GK:['Goalkeeper'], DEF:['Defender'], MID:['Midfielder'],
  ATT_MID:['Midfielder','Attacker'], FWD:['Attacker']
};

function line(roles, y) {
  const n = roles.length;
  return roles.map((role, i) => ({ role, y, x: (100 / (n + 1)) * (i + 1) }));
}

const FORMATIONS = {
  '4-4-2':  [...line(['GK'],90), ...line(['DEF','DEF','DEF','DEF'],72), ...line(['LM','CM','CM','RM'],48), ...line(['ST','ST'],22)],
  '4-3-3':  [...line(['GK'],90), ...line(['DEF','DEF','DEF','DEF'],72), ...line(['CM','DM','CM'],50), ...line(['LW','ST','RW'],22)],
  '4-2-3-1':[...line(['GK'],90), ...line(['DEF','DEF','DEF','DEF'],73), ...line(['DM','DM'],56), ...line(['LW','CAM','RW'],36), ...line(['ST'],17)],
  '4-5-1':  [...line(['GK'],90), ...line(['DEF','DEF','DEF','DEF'],73), ...line(['LM','CM','DM','CM','RM'],50), ...line(['ST'],22)],
  '3-5-2':  [...line(['GK'],90), ...line(['DEF','DEF','DEF'],74), ...line(['LM','CM','DM','CM','RM'],50), ...line(['ST','ST'],22)],
  '3-4-3':  [...line(['GK'],90), ...line(['DEF','DEF','DEF'],74), ...line(['LM','CM','CM','RM'],50), ...line(['LW','ST','RW'],22)],
  '5-3-2':  [...line(['GK'],90), ...line(['DEF','DEF','DEF','DEF','DEF'],74), ...line(['CM','DM','CM'],50), ...line(['ST','ST'],23)],
  '5-4-1':  [...line(['GK'],90), ...line(['DEF','DEF','DEF','DEF','DEF'],75), ...line(['LM','CM','CM','RM'],52), ...line(['ST'],24)]
};
const FORMATION_NAMES = Object.keys(FORMATIONS);

/* How much each line contributes to the three phase ratings. */
const PHASE_WEIGHT = {
  GK:      { att:0.02, mid:0.04, def:0.26 },
  DEF:     { att:0.06, mid:0.14, def:0.50 },
  MID:     { att:0.24, mid:0.52, def:0.20 },
  ATT_MID: { att:0.34, mid:0.24, def:0.03 },
  FWD:     { att:0.42, mid:0.06, def:0.01 }
};

/* ------------------------------------------------------------------ *
 * 3. PLAYER RATING — one number per player from API-Football's
 * per-season statistics block, weighted by the slot's group.
 * Every component is scaled per-90 then flattened with a soft curve so
 * one freak season can't produce a 99.
 * ------------------------------------------------------------------ */
const curve = (v, mid) => 100 * (v / (v + mid));      // diminishing returns
const per90 = (v, mins) => (v || 0) * 90 / Math.max(mins || 0, 270);

function ratePlayer(p, group) {
  const s = p.stats || {};
  const mins = s.minutes || 0;
  const g = per90(s.goals, mins), a = per90(s.assists, mins);
  const drib = per90(s.dribbles, mins), pass = per90(s.passes, mins);
  const acc = (s.passAccuracy || 70) / 100;
  const tk = per90(s.tackles, mins), inter = per90(s.interceptions, mins), blk = per90(s.blocks, mins);
  const cs = (s.cleanSheets || 0) / Math.max(s.appearances || 1, 1);
  const saves = per90(s.saves, mins), pens = s.penaltiesSaved || 0;

  let r;
  switch (group) {
    case 'FWD':      // goals and assists
      r = 0.68 * curve(g, 0.45) + 0.32 * curve(a, 0.30); break;
    case 'ATT_MID':  // goals, assists, dribbles completed
      r = 0.40 * curve(g, 0.35) + 0.34 * curve(a, 0.28) + 0.26 * curve(drib, 1.8); break;
    case 'MID':      // passes completed and pass accuracy
      r = 0.58 * curve(pass, 42) + 0.28 * (100 * Math.max(0, acc - 0.55) / 0.40)
        + 0.14 * curve(tk + inter, 3.0); break;
    case 'DEF':      // clean sheets and defensive actions
      r = 0.42 * (100 * Math.min(cs / 0.42, 1))
        + 0.44 * curve(tk + inter + blk, 4.4) + 0.14 * curve(pass, 45); break;
    case 'GK':       // saves, penalty saves, clean sheets
      r = 0.44 * curve(saves, 2.9) + 0.44 * (100 * Math.min(cs / 0.42, 1))
        + 0.12 * curve(pens, 0.9); break;
    default: r = 50;
  }
  // Minutes played is the confidence term: pull thin samples to the mean.
  const trust = Math.min(1, mins / 1200);
  r = r * trust + 46 * (1 - trust);
  return Math.max(28, Math.min(99, Math.round(r * 0.82 + 17)));
}

/* Squad strength: formation-weighted phase ratings plus an overall. */
function rateSquad(xi) {
  const phase = { att:0, mid:0, def:0 }, wsum = { att:0, mid:0, def:0 };
  xi.forEach(slot => {
    const w = PHASE_WEIGHT[GROUP[slot.role]];
    for (const k of ['att','mid','def']) { phase[k] += slot.player.rating * w[k]; wsum[k] += w[k]; }
  });
  for (const k of ['att','mid','def']) phase[k] = phase[k] / wsum[k];
  const overall = (phase.att * 0.34 + phase.mid * 0.31 + phase.def * 0.35);
  return { ...phase, overall: Math.round(overall * 10) / 10 };
}

/* ------------------------------------------------------------------ *
 * 4. DATA LAYER
 * Live mode: GET /api/data?league=PL&club=Arsenal — the Pages Function
 * serves whatever is in KV (filled by /api/refresh on a schedule).
 * Demo mode: deterministic stub squads so the whole game works with
 * zero API calls while the flow is being built.
 * ------------------------------------------------------------------ */
const FIRST = ['Luca','Mateo','Youssef','Ibrahim','Tomas','Jonas','Andrea','Kai','Elias','Nico',
  'Rafael','Dimitri','Ousmane','Marek','Bruno','Leon','Diogo','Sacha','Amir','Viktor','Noah',
  'Emre','Joaquin','Finn','Hugo','Malik','Teodor','Samu','Arne','Ruben','Idrissa','Pavel'];
const LAST = ['Marchetti','Okafor','Lindqvist','Baptiste','Velasco','Hartmann','Dembowski','Sorrentino',
  'Traoré','Kovacic','Ferreira','Nakamura','Bergström','Castellanos','Ademola','Weiss','Puig',
  'Halversen','Cissé','Moretti','Vandenberg','Kalinic','Duarte','Ozdemir','Aranda','Novak',
  'Mbaye','Lundgren','Rossi','Fischer','Delacroix','Ivanov','Zielinski','Baptista'];

function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
}

function demoSquad(clubName, tier) {
  const rnd = seeded(clubName);
  const q = 1.28 - (Number(tier) - 1) * 0.13;   // tier 1 clubs get better stats
  const shape = [['Goalkeeper',3],['Defender',8],['Midfielder',8],['Attacker',6]];
  const squad = []; let n = 1;
  shape.forEach(([pos, count]) => {
    for (let i = 0; i < count; i++) {
      const starter = i < (pos === 'Goalkeeper' ? 1 : pos === 'Defender' ? 5 : 4);
      const f = starter ? 1 : 0.52;
      const apps = Math.round((starter ? 22 + rnd() * 14 : 8 + rnd() * 13));
      const mins = Math.round(apps * (starter ? 74 + rnd() * 16 : 34 + rnd() * 25));
      const csRate = 0.10 + rnd() * 0.22 * q;
      squad.push({
        id: clubName + '-' + n,
        name: FIRST[Math.floor(rnd() * FIRST.length)] + ' ' + LAST[Math.floor(rnd() * LAST.length)],
        number: n++, position: pos,
        stats: {
          appearances: apps, minutes: mins,
          goals: pos === 'Attacker' ? Math.round(rnd() * 17 * q * f)
               : pos === 'Midfielder' ? Math.round(rnd() * 8 * q * f)
               : pos === 'Defender' ? Math.round(rnd() * 3 * f) : 0,
          assists: pos === 'Goalkeeper' ? 0 : Math.round(rnd() * 9 * q * f),
          dribbles: Math.round(rnd() * 55 * q * f),
          passes: Math.round(mins / 90 * (pos === 'Midfielder' ? 46 : pos === 'Defender' ? 44 : 22) * (0.7 + rnd() * 0.7 * q)),
          passAccuracy: Math.round(70 + rnd() * 20 * q),
          tackles: Math.round(mins / 90 * (pos === 'Defender' || pos === 'Midfielder' ? 1.9 : 0.7) * (0.6 + rnd())),
          interceptions: Math.round(mins / 90 * (pos === 'Defender' ? 1.5 : 0.7) * (0.6 + rnd())),
          blocks: Math.round(mins / 90 * (pos === 'Defender' ? 1.1 : 0.3) * (0.6 + rnd())),
          cleanSheets: Math.round(apps * csRate),
          saves: pos === 'Goalkeeper' ? Math.round(mins / 90 * (2.2 + rnd() * 1.6)) : 0,
          penaltiesSaved: pos === 'Goalkeeper' ? Math.round(rnd() * 1.6) : 0
        }
      });
    }
  });
  return squad;
}

// Curated real rosters — hand-set ratings, no API, no stats crunching.
// Only leagues listed here have a file; others fall through to the
// KV/API path and finally to the demo generator.
const CURATED_LEAGUES = { PL: '/data/pl.json', UCL: '/data/ucl.json' };
const curatedCache = new Map();
async function loadCurated(leagueKey) {
  if (!CURATED_LEAGUES[leagueKey]) return null;
  if (curatedCache.has(leagueKey)) return curatedCache.get(leagueKey);
  let data = null;
  // Self-contained preview builds inline the JSON as window.__CURATED_DATA__
  // since a single-file artifact can't fetch a sibling /data/*.json — the
  // real deployment never sets this global, so it always takes the fetch path.
  if (typeof window !== 'undefined' && window.__CURATED_DATA__ && window.__CURATED_DATA__[leagueKey]) {
    data = window.__CURATED_DATA__[leagueKey];
  } else {
    try {
      const r = await fetch(CURATED_LEAGUES[leagueKey]);
      if (r.ok) data = await r.json();
    } catch (e) { /* fall through */ }
  }
  curatedCache.set(leagueKey, data);
  return data;
}
// A curated player already carries a hand-set rating; a stats-based one
// (API/demo) needs it computed. Everywhere a player is rated, go through this.
const getRating = (player, grp) =>
  typeof player.rating === 'number' ? player.rating : ratePlayer(player, grp);

const cache = new Map();
async function getSquad(leagueKey, club) {
  const key = leagueKey + '|' + club.name;
  if (cache.has(key)) return cache.get(key);
  let squad = null;

  // PL: hand-set curated ratings are primary. FPL only confirms a player
  // is still at this club — anyone it shows as gone or moved elsewhere
  // gets dropped, but the rating on anyone who stays is always ours, not
  // FPL's price. Only if that filtering leaves a club too thin does the
  // live FPL squad (with its own price-based rating) step in to fill it.
  if (leagueKey === 'PL') {
    const curatedPL = await loadCurated('PL');
    const curatedSquad = curatedPL && curatedPL[club.name];
    let confirmed = null;
    if (curatedSquad && curatedSquad.length) {
      const idx = await loadPLNameIndex();
      confirmed = idx.size
        ? curatedSquad.filter(p => idx.get(norm(p.name)) === club.name)
        : curatedSquad; // live feed unreachable — trust the curated file as-is
    }
    // A squad can clear the total-count bar while still missing an entire
    // position group (e.g. both curated goalkeepers filtered out) — check
    // coverage per group, not just the total, and top up from the live
    // squad for whichever groups actually came up short.
    if (confirmed && confirmed.length >= 8) {
      const need = { GK: 1, DEF: 3, MID: 3, FWD: 2 };
      const have = g => confirmed.filter(p => ELIGIBLE[g].includes(p.position)).length;
      const short = Object.keys(need).filter(g => have(g) < need[g]);
      if (short.length) {
        const live = await loadLivePL();
        const pool = live && live.squads[club.name] || [];
        const known = new Set(confirmed.map(p => norm(p.name)));
        short.forEach(g => {
          pool.filter(p => ELIGIBLE[g].includes(p.position) && !known.has(norm(p.name)))
            .forEach(p => { confirmed.push(p); known.add(norm(p.name)); });
        });
      }
      squad = confirmed;
    }
    if (!squad) {
      const live = await loadLivePL();
      if (live && live.squads[club.name] && live.squads[club.name].length >= 10) {
        squad = live.squads[club.name];
      }
    }
  }

  const curated = squad ? null : await loadCurated(leagueKey);
  if (!squad && curated && curated[club.name] && curated[club.name].length >= 10) {
    squad = curated[club.name];
  }
  if (!squad) {
    try {
      const r = await fetch(`/api/data?league=${leagueKey}&club=${encodeURIComponent(club.name)}`);
      if (r.ok) { const j = await r.json(); if (j.squad && j.squad.length >= 14) squad = j.squad; }
    } catch (e) { /* offline or no key yet */ }
  }
  if (!squad) squad = demoSquad(club.name, club.tier);
  cache.set(key, squad);
  return squad;
}

/* ------------------------------------------------------------------ *
 * 5. MATCH SIMULATION
 * ------------------------------------------------------------------ */
function poisson(lambda, rnd) {
  let L = Math.exp(-lambda), k = 0, p = 1;
  do { k++; p *= rnd(); } while (p > L);
  return k - 1;
}

function simulate(A, B) {
  const rnd = Math.random;
  const xgA = Math.max(0.18, 1.34 * Math.pow(A.strength.att / B.strength.def, 2.1));
  const xgB = Math.max(0.18, 1.18 * Math.pow(B.strength.att / A.strength.def, 2.1));
  const gA = Math.min(7, poisson(xgA, rnd)), gB = Math.min(7, poisson(xgB, rnd));

  const mins = new Set();
  const nextMin = () => { let m; do { m = 3 + Math.floor(rnd() * 89); } while (mins.has(m)); mins.add(m); return m; };
  const events = [];

  const scorerFor = squad => {
    const pool = squad.xi.filter(s => GROUP[s.role] !== 'GK').map(s => {
      const grp = GROUP[s.role];
      const w = grp === 'FWD' ? 5.0 : grp === 'ATT_MID' ? 3.4 : grp === 'MID' ? 1.5 : 0.6;
      return { slot: s, w: w * (0.5 + s.player.rating / 100) };
    });
    const total = pool.reduce((t, x) => t + x.w, 0);
    let r = rnd() * total;
    for (const x of pool) { r -= x.w; if (r <= 0) return x.slot; }
    return pool[0].slot;
  };

  const push = (side, squad, n, type) => {
    for (let i = 0; i < n; i++) {
      const s = scorerFor(squad);
      events.push({ side, min: nextMin(), type, player: s.player.name });
    }
  };
  push('home', A, gA, 'goal');
  push('away', B, gB, 'goal');
  // a couple of cards for texture
  [['home', A], ['away', B]].forEach(([side, sq]) => {
    const n = rnd() < 0.55 ? 1 : rnd() < 0.3 ? 2 : 0;
    for (let i = 0; i < n; i++) {
      const s = sq.xi[Math.floor(rnd() * 11)];
      events.push({ side, min: nextMin(), type: 'card', player: s.player.name });
    }
  });
  events.sort((a, b) => a.min - b.min);

  const share = A.strength.mid / (A.strength.mid + B.strength.mid);
  const poss = Math.round(38 + share * 24);
  const stats = [
    ['Possession', poss + '%', (100 - poss) + '%', poss, 100 - poss],
    ['Expected goals', xgA.toFixed(2), xgB.toFixed(2), xgA, xgB],
    ['Shots', 6 + Math.round(xgA * 5 + rnd() * 4), 6 + Math.round(xgB * 5 + rnd() * 4)],
    ['Shots on target', Math.max(gA, 1 + Math.round(xgA * 2)), Math.max(gB, 1 + Math.round(xgB * 2))],
    ['Pass accuracy', Math.round(72 + A.strength.mid / 6) + '%', Math.round(72 + B.strength.mid / 6) + '%',
      72 + A.strength.mid / 6, 72 + B.strength.mid / 6]
  ].map(row => {
    const a = row[3] !== undefined ? row[3] : row[1], b = row[4] !== undefined ? row[4] : row[2];
    return { label: row[0], a: row[1], b: row[2], wa: a, wb: b };
  });

  return { gA, gB, events, stats, xgA, xgB };
}

/* League prediction: rank the built XI against every club in the
   league, using each club's own best available XI in that formation. */
async function predictTable(leagueKey, squads) {
  const rows = [];
  for (const club of S.leagueClubs) {
    const sq = await getSquad(leagueKey, club);
    const best = g => {
      const cands = sq.filter(p => ELIGIBLE[g].includes(p.position))
        .map(p => getRating(p, g)).sort((x, y) => y - x);
      return cands.slice(0, g === 'GK' ? 1 : 4);
    };
    const avg = a => a.reduce((t, v) => t + v, 0) / Math.max(a.length, 1);
    const strength = 0.34 * avg(best('FWD').concat(best('ATT_MID')))
                   + 0.31 * avg(best('MID')) + 0.35 * avg(best('DEF').concat(best('GK')));
    rows.push({ name: club.name, strength: Math.round(strength * 10) / 10, real: true });
  }
  squads.forEach(s => rows.push({ name: s.label, strength: s.strength.overall, mine: true }));
  rows.sort((a, b) => b.strength - a.strength);
  const top = rows[0].strength, bot = rows[rows.length - 1].strength;
  rows.forEach((r, i) => {
    const t = (r.strength - bot) / Math.max(top - bot, 0.01);
    r.pts = Math.round(30 + t * 62);
    r.pos = i + 1;
  });
  return rows;
}

/* ------------------------------------------------------------------ *
 * 6. STATE + SHELL
 * ------------------------------------------------------------------ */
const app = document.getElementById('app');
const crumb = document.getElementById('crumb');
const S = { mode:null, leagueKey:null, players:[], turn:0, room:null, poll:null };

const el = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
function toast(msg) {
  const t = el(`<div class="toast">${esc(msg)}</div>`);
  document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
}
function readable(hex) {
  const n = parseInt(hex.slice(1), 16);
  const L = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return L > 0.62 ? '#241F19' : '#FFFFFF';
}
function theme(club) {
  const r = document.documentElement.style;
  if (!club) { r.setProperty('--club-a', '#E4762B'); r.setProperty('--club-b', '#241F19'); r.setProperty('--club-ink', '#fff'); return; }
  r.setProperty('--club-a', club.home);
  r.setProperty('--club-b', club.away === '#FFFFFF' ? '#241F19' : club.away);
  r.setProperty('--club-ink', readable(club.home));
}
const me = () => S.players[S.turn];
const sleep = ms => new Promise(res => setTimeout(res, ms));

function setCrumb(txt) { crumb.textContent = txt || ''; }
function setLeagueTheme(leagueKey) {
  const on = leagueKey === 'UCL';
  document.body.classList.toggle('ucl-mode', on);
  const stars = document.getElementById('anthemStars');
  if (stars) stars.style.display = on ? 'block' : 'none';
}
function show(node) { app.replaceChildren(node); window.scrollTo({ top: 0 }); }

/* ------------------------------------------------------------------ *
 * 7. SCREENS
 * ------------------------------------------------------------------ */
function screenMode() {
  theme(null); setCrumb(''); setLeagueTheme(null);
  const v = el(`<section>
    <h1>Spin it. Build it. Play it.</h1>
    <p>Premier League or Champions League night. Spin a formation, then eleven times over spin a club and fill a shirt — two rerolls a slot — then watch the match.</p>
    <button class="btn primary" data-m="ai">Play the AI<span class="sub">Instant opponent, builds its own XI</span></button>
    <button class="btn" data-m="pass">Pass and play<span class="sub">Two of you, one phone</span></button>
    <button class="btn ghost" data-m="host">Start an online room<span class="sub">Share a four-letter code</span></button>
    <button class="btn ghost" data-m="join">Join with a code</button>
  </section>`);
  v.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    S.mode = b.dataset.m;
    if (b.dataset.m === 'join') return screenJoin();
    screenLeague();
  });
  show(v);
}

function screenJoin() {
  const v = el(`<section>
    <h2>Join a room</h2>
    <p>Type the code your opponent sent you.</p>
    <input id="code" inputmode="latin" autocapitalize="characters" maxlength="4"
      style="width:100%;padding:14px;font-size:2rem;text-align:center;letter-spacing:.3em;
      border-radius:12px;border:1px solid var(--line);background:#fff;font-family:'Bricolage Grotesque';font-weight:800">
    <button class="btn primary" id="go">Join room</button>
    <button class="btn ghost" id="back">Back</button>
  </section>`);
  v.querySelector('#back').onclick = screenMode;
  v.querySelector('#go').onclick = async () => {
    const code = v.querySelector('#code').value.trim().toUpperCase();
    if (code.length !== 4) return toast('Codes are four letters.');
    const r = await api({ action:'join', code });
    if (!r || !r.ok) return toast('No room with that code.');
    S.mode = 'online'; S.room = { code, seat: 1 }; S.leagueKey = r.state.league;
    if (S.leagueKey) setLeagueTheme(S.leagueKey);
    if (!S.leagueKey) { S.mode='online'; return screenWait('Waiting for the host to pick a league.', async st => {
        if (st.league) { S.leagueKey = st.league; setLeagueTheme(st.league); S.leagueClubs = await getLeagueClubs(st.league); startTurns(); } }); }
    S.leagueClubs = await getLeagueClubs(S.leagueKey);
    startTurns();
  };
  show(v);
}

function screenLeague() {
  const v = el(`<section>
    <h2>Pick a league</h2>
    <p>Both squads come out of the same league, so the table at the end means something.</p>
    <div class="leagues"></div>
    <button class="btn ghost" id="back">Back</button>
  </section>`);
  const wrap = v.querySelector('.leagues');
  Object.entries(LEAGUES).forEach(([k, L]) => {
    const b = el(`<button class="league-btn"><span class="flagdot" style="background:${L.tint}"></span>
      <span><b>${esc(L.name)}</b><small>${esc(L.country)} · ${L.clubs.length} clubs</small></span></button>`);
    b.onclick = async () => {
      S.leagueKey = k;
      setLeagueTheme(k);
      S.leagueClubs = await getLeagueClubs(k);
      if (S.mode === 'host') {
        const r = await api({ action:'create', league:k });
        if (!r || !r.ok) return toast('Could not open a room. Check your connection.');
        S.mode = 'online'; S.room = { code:r.code, seat:0 };
        return screenRoomCode();
      }
      startTurns();
    };
    wrap.appendChild(b);
  });
  v.querySelector('#back').onclick = screenMode;
  show(v);
}

function screenRoomCode() {
  const v = el(`<section>
    <h2>Room open</h2>
    <p>Send this code to your opponent. The game starts as soon as they join.</p>
    <div class="card"><div class="code">${S.room.code}</div></div>
    <button class="btn ghost" id="copy">Copy code</button>
    <p><small>Waiting for a second player…</small></p>
  </section>`);
  v.querySelector('#copy').onclick = () => { navigator.clipboard?.writeText(S.room.code); toast('Code copied'); };
  show(v);
  poll(st => { if (st.players >= 2) { stopPoll(); startTurns(); } });
}

function screenWait(msg, onState) {
  show(el(`<section><h2>Hold on</h2><p>${esc(msg)}</p>
    <div class="bar"><i style="width:40%"></i></div></section>`));
  poll(st => onState(st));
}

/* --- turn orchestration ------------------------------------------- */
function startTurns() {
  stopPoll();
  if (!S.players.length) {
    if (S.mode === 'ai') S.players = [mkPlayer('You'), mkPlayer('The AI', true)];
    else if (S.mode === 'pass') S.players = [mkPlayer('Player 1'), mkPlayer('Player 2')];
    else S.players = [mkPlayer(S.room.seat === 0 ? 'You' : 'Host'), mkPlayer(S.room.seat === 0 ? 'Opponent' : 'You')];
    S.turn = S.mode === 'online' ? S.room.seat : 0;
  }
  screenFormationSpin();
}
const mkPlayer = (label, ai=false) => ({ label, ai, formation:null, club:null, squad:null, xi:null, strength:null });

function nextAfterBuild() {
  const p = me();
  p.strength = rateSquad(p.xi);
  p.badge = badgeOf(p);
  if (S.mode === 'online') return publishSquad();
  if (S.mode === 'ai') {
    const ai = S.players[1];
    if (!ai.xi) { screenAIBuild(() => screenResult()); return; }
  }
  if (S.turn === 0 && S.mode === 'pass') { S.turn = 1; return screenHandover(); }
  screenResult();
}

function screenHandover() {
  theme(null);
  const v = el(`<section><h2>Pass the phone</h2>
    <p>${esc(S.players[1].label)} builds next. No peeking at what just got picked.</p>
    <button class="btn primary" id="go">I'm ${esc(S.players[1].label)}</button></section>`);
  v.querySelector('#go').onclick = screenFormationSpin;
  show(v);
}

/* --- the reel ------------------------------------------------------ */
function reel(box, items, targetIdx, render) {
  const track = box.querySelector('.reel-track');
  const loops = 4, n = items.length;
  track.style.transition = 'none'; track.style.transform = 'translateY(0)';
  track.replaceChildren();
  for (let l = 0; l <= loops; l++) items.forEach(it => track.appendChild(el(`<div class="reel-item">${render(it)}</div>`)));
  // Item height is set in CSS (96px normally, 76px under the small-screen
  // media query) — read it from the actual rendered element instead of
  // hardcoding a number, so the stop position lines up on every screen size.
  const itemHeight = track.firstElementChild.getBoundingClientRect().height;
  const stopAt = loops * n + targetIdx;
  box.classList.add('spinning');
  return new Promise(res => {
    requestAnimationFrame(() => {
      track.style.transition = '';
      track.style.transform = `translateY(-${stopAt * itemHeight}px)`;
      setTimeout(() => { box.classList.remove('spinning'); res(); }, 2500);
    });
  });
}

function screenFormationSpin() {
  const p = me(); theme(null);
  setCrumb(`${p.label} · formation`);
  const v = el(`<section>
    <h2>Your formation</h2>
    <p>Whatever lands is what you play. The shape decides which positions you have to fill.</p>
    <div class="reel"><div class="reel-track"><div class="reel-item">4-4-2</div></div></div>
    <button class="btn primary" id="spin">Spin the formation</button>
  </section>`);
  const box = v.querySelector('.reel'), btn = v.querySelector('#spin');
  btn.onclick = async () => {
    btn.disabled = true; btn.textContent = 'Spinning…';
    const idx = Math.floor(Math.random() * FORMATION_NAMES.length);
    await reel(box, FORMATION_NAMES, idx, f => f);
    p.formation = FORMATION_NAMES[idx];
    btn.disabled = false; btn.textContent = `Build your ${p.formation}`;
    btn.onclick = screenBuild;
  };
  show(v);
}

/* --- the build loop -------------------------------------------------
 * Eleven rounds. Each round: spin a club from the league, choose which
 * position to spend it on, take the player you're given or reroll twice.
 * The XI ends up spread across eleven clubs, not one squad.
 * ------------------------------------------------------------------ */
function screenBuild() {
  const p = me();
  theme(null);
  p.xi = FORMATIONS[p.formation].map(s => ({ ...s, player:null, rerolls:2 }));

  const clubs = S.leagueClubs;
  const usedClubs = new Set(), usedPlayers = new Set();
  let club = null, slotIdx = -1, busy = false;

  const v = el(`<section>
    <div class="card club" id="clubcard" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <span><b id="clubname">No club yet</b><br><small id="count">0 of 11 picked</small></span>
        <span style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.5rem" id="avg">—</span>
      </div>
    </div>
    <div class="reel"><div class="reel-track"><div class="reel-item">${esc(LEAGUES[S.leagueKey].name)}</div></div></div>
    <p id="hint">Spin for a club, then decide which shirt to spend it on.</p>
    <div class="pitch"><div class="markings">
      <div style="left:20%;right:20%;top:-1px;height:12%;border-top:none"></div>
      <div style="left:20%;right:20%;bottom:-1px;height:12%;border-bottom:none"></div>
      <div style="left:-1px;right:-1px;top:50%;height:0"></div>
      <div style="left:35%;right:35%;top:43.5%;height:13%;border-radius:50%"></div>
    </div></div>
    <div class="picker" id="picker"></div>
    <div class="actionbar"><button class="btn primary" id="act">Spin for a club</button></div>
  </section>`);

  const pitch = v.querySelector('.pitch'), picker = v.querySelector('#picker');
  const act = v.querySelector('#act'), hint = v.querySelector('#hint');
  const box = v.querySelector('.reel');

  const filled = () => p.xi.filter(s => s.player).length;

  function paint() {
    pitch.querySelectorAll('.slot').forEach(n => n.remove());
    p.xi.forEach((s, i) => {
      const c = s.player && s.player.club;
      const style = c
        ? `left:${s.x}%;top:${s.y}%;background:linear-gradient(150deg,${c.home},${c.away === '#FFFFFF' ? '#241F19' : c.away});
           border-color:${c.home};color:${readable(c.home)}`
        : `left:${s.x}%;top:${s.y}%`;
      const n = el(`<button class="slot ${s.player ? 'filled' : ''} ${slotIdx === i ? 'active' : ''}" style="${style}">
        <span class="role">${s.role}</span>
        ${s.player ? `<span class="nm">${esc(s.player.name.split(' ').slice(-1)[0])}</span>
          <span class="rt">${s.player.rating}</span>` : ''}
      </button>`);
      n.onclick = () => pickSlot(i);
      pitch.appendChild(n);
    });
    v.querySelector('#count').textContent = `${filled()} of 11 picked`;
    const rated = p.xi.filter(s => s.player);
    v.querySelector('#avg').textContent = rated.length
      ? Math.round(rated.reduce((t, s) => t + s.player.rating, 0) / rated.length) : '—';
  }

  async function spin() {
    if (busy) return;
    busy = true; act.disabled = true; act.textContent = 'Spinning…';
    picker.replaceChildren();
    const pool = clubs.filter(c => !usedClubs.has(c.name));
    const idx = weightedClubIndex(pool, S.leagueKey);
    await reel(box, pool, idx, c =>
      `<span class="swatch" style="background:${c.home};box-shadow:inset 0 0 0 3px ${c.away}"></span>${esc(c.name)}`);
    club = pool[idx];
    usedClubs.add(club.name);
    theme(club);
    club.squad = await getSquad(S.leagueKey, club);
    v.querySelector('#clubname').textContent = club.name;
    hint.textContent = 'Tap the shirt you want a ' + club.name + ' player in.';
    act.classList.add('hide');
    busy = false; act.disabled = false;
    paint();
  }

  function draw(i, c) {
    const s = p.xi[i], grp = GROUP[s.role];
    const taken = new Set(usedPlayers);
    if (s.player) taken.delete(s.player.id);
    const pool = c.squad.filter(pl => ELIGIBLE[grp].includes(pl.position) && !taken.has(pl.id));
    if (!pool.length) return null;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return { ...pick, rating: getRating(pick, grp), club: c };
  }

  function pickSlot(i) {
    if (busy) return;
    if (!club) { toast('Spin for a club first.'); return; }
    if (p.xi[i].player) { toast('That shirt is taken.'); return; }
    slotIdx = i;
    const pl = draw(i, club);
    if (!pl) { slotIdx = -1; return toast(`${club.name} has nobody for that position.`); }
    p.xi[i].player = pl; usedPlayers.add(pl.id);
    paint(); renderPick(i);
    pitch.querySelectorAll('.slot')[i].classList.add('pulse');
  }

  function renderPick(i) {
    const s = p.xi[i], pl = s.player, st = pl.stats, grp = GROUP[s.role];
    const line = !st ? `${pl.position} · rated ${pl.rating}`
      : grp === 'GK' ? `${st.saves} saves · ${st.cleanSheets} clean sheets`
      : grp === 'DEF' ? `${st.cleanSheets} clean sheets · ${st.tackles + st.interceptions + st.blocks} defensive actions`
      : grp === 'MID' ? `${st.passes} passes · ${st.passAccuracy}% accuracy`
      : `${st.goals} goals · ${st.assists} assists${grp === 'ATT_MID' ? ` · ${st.dribbles} dribbles` : ''}`;
    const card = el(`<div>
      <div class="plyr">
        <span class="num" style="background:${pl.club.home};color:${readable(pl.club.home)}">${pl.number}</span>
        <span class="meta"><b>${esc(pl.name)}</b><small>${s.role} · ${esc(pl.club.name)}${st ? ` · ${st.appearances} apps` : ''}</small></span>
        <span class="rating">${pl.rating}</span>
      </div>
      <small style="display:block;padding:6px 2px">${esc(line)}</small>
      <button class="btn ghost sm" id="rr">Reroll (${s.rerolls} left)</button>
    </div>`);
    const rr = card.querySelector('#rr');
    if (!s.rerolls) { rr.disabled = true; rr.textContent = 'No rerolls left'; }
    rr.onclick = () => {
      if (!s.rerolls) return;
      const np = draw(i, pl.club); if (!np) return toast('Nobody else to try.');
      usedPlayers.delete(s.player.id);
      s.rerolls--; s.player = np; usedPlayers.add(np.id);
      paint(); renderPick(i);
      pitch.querySelectorAll('.slot')[i].classList.add('pulse');
    };
    picker.replaceChildren(card);

    slotIdx = -1;
    club = null;                       // one club, one shirt — spin again for the next
    v.querySelector('#clubname').textContent = pl.club.name + ' — done';
    act.classList.remove('hide');
    if (filled() === 11) {
      hint.textContent = 'Eleven shirts, eleven clubs. Reroll this one or take it as it is.';
      act.textContent = 'Confirm this XI';
      act.onclick = () => { picker.replaceChildren(); nextAfterBuild(); };
    } else {
      hint.textContent = `${11 - filled()} to go. Spinning again keeps this pick.`;
      act.textContent = 'Spin for the next club';
      act.onclick = spin;
    }
  }

  act.onclick = spin;
  setCrumb(`${p.label} · ${p.formation}`);
  show(v); paint();
}

/* --- the AI opponent ---------------------------------------------- */
async function buildAI(ai, onSlot) {
  const clubs = S.leagueClubs;
  ai.formation = FORMATION_NAMES[Math.floor(Math.random() * FORMATION_NAMES.length)];
  const pool = clubs.slice().sort(() => Math.random() - 0.5);
  const usedPlayers = new Set();
  ai.xi = [];
  const slots = FORMATIONS[ai.formation];
  if (onSlot) await onSlot({ phase: 'formation', formation: ai.formation });
  for (let i = 0; i < slots.length; i++) {
    const s = slots[i], grp = GROUP[s.role];
    const club = pool[i % pool.length];
    club.squad = club.squad || await getSquad(S.leagueKey, club);
    const cands = club.squad.filter(pl => ELIGIBLE[grp].includes(pl.position) && !usedPlayers.has(pl.id))
      .map(pl => ({ ...pl, rating: getRating(pl, grp), club }))
      .sort((a, b) => b.rating - a.rating);
    // the AI gets rerolls too, so it lands on a good one rather than the best one
    const pick = cands[Math.min(cands.length - 1, Math.floor(Math.random() * 3))];
    usedPlayers.add(pick.id);
    const slot = { ...s, player: pick, rerolls: 0 };
    ai.xi.push(slot);
    if (onSlot) await onSlot({ phase: 'slot', index: i, total: slots.length, slot });
  }
  ai.strength = rateSquad(ai.xi);
  ai.badge = badgeOf(ai);
}

/* The colour a side wears: the club of its best player. */
function badgeOf(p) {
  const best = p.xi.slice().sort((a, b) => b.player.rating - a.player.rating)[0];
  return best.player.club;
}

/* --- watching the AI build, shirt by shirt -------------------------- */
function screenAIBuild(done) {
  theme(null);
  setCrumb('The AI · building');
  const v = el(`<section>
    <h2>The AI is building its XI</h2>
    <p id="aihint">Spinning up a squad…</p>
    <div class="pitch" id="aipitch"><div class="markings">
      <div style="left:20%;right:20%;top:-1px;height:12%;border-top:none"></div>
      <div style="left:20%;right:20%;bottom:-1px;height:12%;border-bottom:none"></div>
      <div style="left:-1px;right:-1px;top:50%;height:0"></div>
      <div style="left:35%;right:35%;top:43.5%;height:13%;border-radius:50%"></div>
    </div></div>
  </section>`);
  const pitch = v.querySelector('#aipitch'), hint = v.querySelector('#aihint');
  show(v);

  const ai = S.players[1];
  buildAI(ai, async ({ phase, formation, slot, index, total }) => {
    if (phase === 'formation') { hint.textContent = `Formation: ${formation}`; await sleep(450); return; }
    const c = slot.player.club;
    const n = el(`<div class="slot filled pulse" style="left:${slot.x}%;top:${slot.y}%;
      background:linear-gradient(150deg,${c.home},${c.away === '#FFFFFF' ? '#241F19' : c.away});
      border-color:${c.home};color:${readable(c.home)}">
      <span class="role">${slot.role}</span>
      <span class="nm">${esc(slot.player.name.split(' ').slice(-1)[0])}</span>
      <span class="rt">${slot.player.rating}</span>
    </div>`);
    pitch.appendChild(n);
    hint.textContent = `${index + 1} of ${total} picked — ${esc(c.name)}`;
    await sleep(260);
  }).then(() => { hint.textContent = 'Squad locked in.'; setTimeout(done, 500); });
}

/* --- result: match sheet first, table is a separate reveal --------- */
function screenResult() {
  stopPoll();
  const [A, B] = S.players;
  const m = simulate(A, B);
  document.documentElement.style.setProperty('--club-b2', B.badge.home);
  document.documentElement.style.setProperty('--club-a', A.badge.home);
  setCrumb('Full time');

  const evRows = m.events.map(e => e.side === 'home'
    ? `<div class="ev"><span class="min">${e.min}'</span><span>${e.type === 'goal' ? '⚽' : '🟨'} ${esc(e.player)}</span></div>`
    : `<div class="ev away"><span>${esc(e.player)} ${e.type === 'goal' ? '⚽' : '🟨'}</span><span class="min">${e.min}'</span></div>`
  ).join('') || '<small>Nothing much happened. It was that kind of game.</small>';

  const statRows = m.stats.map(s => {
    const t = s.wa + s.wb || 1;
    return `<div class="stat"><b>${s.a}</b>
      <span><span class="lbl">${esc(s.label)}</span>
      <span class="sbar"><span style="width:${(s.wa / t) * 100}%"></span><span style="width:${(s.wb / t) * 100}%"></span></span></span>
      <b>${s.b}</b></div>`;
  }).join('');

  const verdict = m.gA === m.gB ? 'Honours even.'
    : `${esc((m.gA > m.gB ? A : B).label)} takes it.`;

  const v = el(`<section>
    <h2>${verdict}</h2>
    <div class="sheet">
      <div class="score">
        <div class="side">${esc(A.label)}<br><small style="opacity:.8">${esc(A.formation)}</small></div>
        <div class="nums">${m.gA} – ${m.gB}</div>
        <div class="side">${esc(B.label)}<br><small style="opacity:.8">${esc(B.formation)}</small></div>
      </div>
      <div class="events">${evRows}</div>
      ${statRows}
    </div>
    <div class="card">
      <h3>Squad strength</h3>
      ${[A, B].map(p => `<div style="margin:10px 0">
        <div style="display:flex;justify-content:space-between"><b>${esc(p.label)} · ${esc(p.formation)}</b><b>${p.strength.overall}</b></div>
        <div class="bar"><i style="width:${p.strength.overall}%;background:${p.badge.home}"></i></div>
        <small>Attack ${Math.round(p.strength.att)} · Midfield ${Math.round(p.strength.mid)} · Defence ${Math.round(p.strength.def)}</small>
      </div>`).join('')}
    </div>
    <button class="btn primary" id="totable">See the predicted table</button>
    <button class="btn ghost" id="xi">See both line-ups</button>
    <button class="btn ghost" id="again">Play again</button>
  </section>`);
  v.querySelector('#totable').onclick = () => screenTable(A, B);
  v.querySelector('#xi').onclick = () => screenLineups(A, B);
  v.querySelector('#again').onclick = () => { S.players = []; S.turn = 0; S.room = null; screenMode(); };
  show(v);
}

/* --- the predicted table: a separate screen, rows reveal in turn --- */
async function screenTable(A, B) {
  setCrumb('Predicted table');
  const v = el(`<section>
    <h2>Where they'd finish</h2>
    <p><small>Both XIs ranked against every squad in ${esc(LEAGUES[S.leagueKey].name)}.</small></p>
    <table class="tbl" id="tbl"><tr><th>#</th><th>Squad</th><th>Rating</th><th>Pts</th></tr></table>
    <button class="btn ghost" id="back">Back to the scoresheet</button>
  </section>`);
  v.querySelector('#back').onclick = () => screenResult();
  show(v);

  const tbl = v.querySelector('#tbl');
  const rows = await predictTable(S.leagueKey, [
    { label: `${A.label}'s XI`, strength: A.strength },
    { label: `${B.label}'s XI`, strength: B.strength }
  ]);
  for (const r of rows) {
    const tr = el(`<tr class="${r.mine ? 'me' : ''}" style="opacity:0;transform:translateY(6px);
      transition:opacity .32s ease,transform .32s ease">
      <td>${r.pos}</td><td>${esc(r.name)}</td><td>${r.strength}</td><td>${r.pts}</td></tr>`);
    tbl.appendChild(tr);
    requestAnimationFrame(() => { tr.style.opacity = 1; tr.style.transform = 'translateY(0)'; });
    await sleep(65);
  }
}

/* --- line-ups: a real pitch, one team at a time -------------------- */
function screenLineups(A, B) {
  setCrumb('Line-ups');
  let active = A;
  const v = el(`<section>
    <h2>Line-ups</h2>
    <div class="row">
      <button class="btn sm ghost" id="tabA" style="flex:1">${esc(A.label)}</button>
      <button class="btn sm ghost" id="tabB" style="flex:1">${esc(B.label)}</button>
    </div>
    <div class="pitch" id="lupitch"><div class="markings">
      <div style="left:20%;right:20%;top:-1px;height:12%;border-top:none"></div>
      <div style="left:20%;right:20%;bottom:-1px;height:12%;border-bottom:none"></div>
      <div style="left:-1px;right:-1px;top:50%;height:0"></div>
      <div style="left:35%;right:35%;top:43.5%;height:13%;border-radius:50%"></div>
    </div></div>
    <button class="btn ghost" id="back">Back to the scoresheet</button>
  </section>`);
  const pitch = v.querySelector('#lupitch');
  function paint() {
    pitch.querySelectorAll('.slot').forEach(n => n.remove());
    active.xi.forEach(s => {
      const c = s.player.club;
      const n = el(`<div class="slot filled" style="left:${s.x}%;top:${s.y}%;
        background:linear-gradient(150deg,${c.home},${c.away === '#FFFFFF' ? '#241F19' : c.away});
        border-color:${c.home};color:${readable(c.home)}">
        <span class="role">${s.role}</span>
        <span class="nm">${esc(s.player.name.split(' ').slice(-1)[0])}</span>
        <span class="rt">${s.player.rating}</span>
      </div>`);
      pitch.appendChild(n);
    });
    v.querySelector('#tabA').className = 'btn sm ' + (active === A ? 'primary' : 'ghost');
    v.querySelector('#tabB').className = 'btn sm ' + (active === B ? 'primary' : 'ghost');
  }
  v.querySelector('#tabA').onclick = () => { active = A; paint(); };
  v.querySelector('#tabB').onclick = () => { active = B; paint(); };
  v.querySelector('#back').onclick = () => screenResult();
  show(v); paint();
}

/* ------------------------------------------------------------------ *
 * 8. ONLINE ROOMS — KV-backed room state, polled.
 * ------------------------------------------------------------------ */
async function api(body) {
  try {
    const r = await fetch('/api/room', { method:'POST', headers:{ 'content-type':'application/json' },
      body: JSON.stringify(body) });
    return await r.json();
  } catch (e) { return null; }
}
function poll(cb) {
  stopPoll();
  S.poll = setInterval(async () => {
    const r = await api({ action:'state', code:S.room.code });
    if (r && r.ok) cb(r.state);
  }, 2000);
}
function stopPoll() { if (S.poll) clearInterval(S.poll); S.poll = null; }

async function publishSquad() {
  const p = me();
  const payload = { label:p.label, formation:p.formation, badge:p.badge, strength:p.strength,
    xi: p.xi.map(s => ({ role:s.role, x:s.x, y:s.y, player:{
      name:s.player.name, number:s.player.number, rating:s.player.rating,
      club:{ name:s.player.club.name, home:s.player.club.home, away:s.player.club.away } } })) };
  await api({ action:'submit', code:S.room.code, seat:S.room.seat, squad:payload });
  screenWait('Squad sent. Waiting for your opponent to finish theirs.', st => {
    const other = st.squads[S.room.seat === 0 ? 1 : 0];
    if (!other) return;
    stopPoll();
    const opp = S.players[S.room.seat === 0 ? 1 : 0];
    Object.assign(opp, other);
    screenResult();
  });
}

/* ------------------------------------------------------------------ */
screenMode();
