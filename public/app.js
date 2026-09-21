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
  WC: { id: 1, name: 'World Cup', country: 'World', tint: '#0B3D2E', clubs: [
    ['Argentina','#75AADB','#FFFFFF',1],['France','#002654','#ED2939',1],['Brazil','#FFDF00','#009C3B',1],['England','#FFFFFF','#CF081F',1],['Spain','#C60B1E','#FFC400',1],['Portugal','#FF0000','#006600',1],['Germany','#000000','#DD0000',1],['Netherlands','#FF6600','#154D8A',1],['Belgium','#000000','#FDDA24',2],['Croatia','#FF0000','#FFFFFF',2],['Uruguay','#5FA8D3','#FFFFFF',2],['Morocco','#C1272D','#006233',2],['Colombia','#FCD116','#003893',2],['Japan','#000080','#FFFFFF',2],['USA','#B22234','#3C3B6E',2],['Mexico','#006847','#CE1126',2],['Switzerland','#FF0000','#FFFFFF',3],['Senegal','#00853F','#FDEF42',3],['Canada','#FF0000','#FFFFFF',3],['South Korea','#CD2E3A','#0047A0',3]
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
const CURATED_LEAGUES = { PL: '/data/pl.json', UCL: '/data/ucl.json', WC: '/data/wc.json' };
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
  if (!squad && curated && curated[club.name] && curated[club.name].length >= 8) {
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

const GOAL_CORNERS = ['top right corner', 'top left corner', 'bottom right corner', 'bottom left corner', 'straight down the middle'];
// How a goal happened — most are open play, a smaller share are penalties
// or direct free-kicks — and a FotMob-style description of the finish.
function describeGoal() {
  const r = Math.random();
  const method = r < 0.11 ? 'penalty' : r < 0.19 ? 'freekick' : 'open';
  const corner = GOAL_CORNERS[Math.floor(Math.random() * GOAL_CORNERS.length)];
  if (method === 'penalty') return { method, desc: 'scores from the penalty spot' };
  if (method === 'freekick') return { method, desc: `scores, ${corner}, direct free-kick from outside the box` };
  const origin = Math.random() < 0.32 ? 'from outside the box' : 'from inside the box';
  return { method, desc: `scores, ${corner}, ${origin}` };
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
      const ev = { side, min: nextMin(), type, player: s.player.name };
      if (type === 'goal') Object.assign(ev, describeGoal());
      events.push(ev);
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
  const clubs = S.leagueClubs || [];
  for (const club of clubs) {
    try {
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
    } catch (e) { /* one club failing shouldn't blank the whole table — skip it */ }
  }
  // These two never depend on club data, so they show up even if every
  // real club above failed or the league's club list wasn't available.
  squads.forEach(s => rows.push({ name: s.label, strength: s.strength.overall, mine: true }));
  if (!rows.length) return rows;
  rows.sort((a, b) => b.strength - a.strength);
  const top = rows[0].strength, bot = rows[rows.length - 1].strength;
  // UCL's league phase is 8 games per club, not a full 38-game season —
  // points need to scale to whichever the actual competition plays, or a
  // UCL table would show Premier-League-sized numbers for an 8-game phase.
  const games = leagueKey === 'UCL' ? 8 : leagueKey === 'WC' ? 3 : 38;
  const ppgMin = 0.4, ppgMax = leagueKey === 'WC' ? 3.0 : 2.5; // WC: 3 games, so max is a clean 9 points
  rows.forEach((r, i) => {
    const t = (r.strength - bot) / Math.max(top - bot, 0.01);
    r.pts = Math.round((ppgMin + t * (ppgMax - ppgMin)) * games);
    r.pos = i + 1;
  });
  return rows;
}

// Real 2026 World Cup groups, for the nations we actually have curated —
// used to show the one or two groups that matter to this match instead of
// a flat, unrealistic 20-nation table (the real tournament has no such
// combined table; it's always groups of 4).
const WC_GROUPS = {
  Mexico: 'A', 'South Korea': 'A',
  Canada: 'B', Switzerland: 'B',
  Brazil: 'C', Morocco: 'C',
  USA: 'D',
  Germany: 'E',
  Netherlands: 'F', Japan: 'F',
  Belgium: 'G',
  Spain: 'H', Uruguay: 'H',
  France: 'I', Senegal: 'I',
  Argentina: 'J',
  Portugal: 'K', Colombia: 'K',
  England: 'L', Croatia: 'L'
};
// Each non-curated nation appears in exactly one group. Strengths are
// estimates — these teams have no real squads here, so they never spin.
const WC_GROUP_FILLERS = {
  A: [{name:'Qatar', strength:68}, {name:'Haiti', strength:62}],
  B: [{name:'Australia', strength:71}, {name:'Curaçao', strength:61}],
  C: [{name:'Scotland', strength:71}, {name:'Cape Verde', strength:65}],
  D: [{name:'Paraguay', strength:71}, {name:'Iran', strength:70}, {name:'New Zealand', strength:62}],
  E: [{name:'Ivory Coast', strength:72}, {name:'Ecuador', strength:72}, {name:'Jamaica', strength:63}],
  F: [{name:'Tunisia', strength:68}, {name:'Sweden', strength:72}],
  G: [{name:'Egypt', strength:71}, {name:'Norway', strength:74}, {name:'Iraq', strength:65}],
  H: [{name:'Saudi Arabia', strength:67}, {name:'South Africa', strength:66}],
  I: [{name:'Turkey', strength:73}, {name:'DR Congo', strength:67}],
  J: [{name:'Austria', strength:73}, {name:'Algeria', strength:70}, {name:'Jordan', strength:65}],
  K: [{name:'Uzbekistan', strength:66}, {name:'Czechia', strength:70}],
  L: [{name:'Ghana', strength:69}, {name:'Panama', strength:66}]
};
// Which real nation an XI "represents" — whichever nation contributed the
// most players to it, since a built XI is a cross-nation squad, not one
// team, but still needs a group to be shown against.
function representedNation(p) {
  const counts = {};
  p.xi.forEach(s => { const n = s.player.club.name; counts[n] = (counts[n] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

/* ------------------------------------------------------------------ *
 * 6. STATE + SHELL
 * ------------------------------------------------------------------ */
const app = document.getElementById('app');
const crumb = document.getElementById('crumb');
const S = { mode:null, leagueKey:null, players:[], turn:0, room:null, poll:null, lastMatch:null };

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
  document.body.classList.toggle('ucl-mode', leagueKey === 'UCL');
  document.body.classList.toggle('pl-mode', leagueKey === 'PL');
  const stars = document.getElementById('anthemStars');
  if (stars) stars.style.display = leagueKey === 'UCL' ? 'block' : 'none';
}
function show(node) { app.replaceChildren(node); window.scrollTo({ top: 0 }); }

/* ------------------------------------------------------------------ *
 * 7. SCREENS
 * ------------------------------------------------------------------ */
function screenMode() {
  theme(null); setCrumb(''); setLeagueTheme(null);
  const v = el(`<section>
    <h1>Spin it. Build it. Play it.</h1>
    <p>Premier League, Champions League night, or the World Cup. Spin a formation, then spin your way through eleven shirts — five rerolls for the whole XI — then watch the match.</p>
    <button class="btn primary" data-m="ai">Play the AI<span class="sub">Instant opponent, builds its own XI</span></button>
    <button class="btn" data-m="pass">Pass and play<span class="sub">Two of you, one phone</span></button>
    <button class="btn ghost" data-m="host">Start an online room<span class="sub">Share a four-letter code</span></button>
    <button class="btn ghost" data-m="join">Join with a code</button>
    <button class="btn ghost" id="howto">How to play</button>
  </section>`);
  v.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    S.mode = b.dataset.m;
    if (b.dataset.m === 'join') return screenJoin();
    screenLeague();
  });
  v.querySelector('#howto').onclick = screenTutorial;
  show(v);
}

/* --- how to play ----------------------------------------------------
 * A walk-through rather than a wall of text — the same pitch and slot
 * styling the real build screen uses, so it looks like the game rather
 * than a manual bolted on top of it. */
function screenTutorial() {
  theme(null); setCrumb('How to play');
  const v = el(`<section>
    <h1>How Sp1nXI works</h1>

    <div class="card">
      <h3>1 · Spin a formation</h3>
      <p>Whatever lands is what you play — 4-4-2 through 5-4-1. It decides
      which shirts you need to fill: how many defenders, how many strikers.</p>
    </div>

    <div class="card">
      <h3>2 · One shirt, one club</h3>
      <p>Tap an empty shirt, then spin for a club. You're handed a random
      player from that club who fits the position — reroll up to twice if
      you don't like who you got, or take it and move to the next shirt.</p>
      <div class="pitch" style="aspect-ratio:68/40;margin-top:10px">
        <div class="markings"><div style="left:35%;right:35%;top:38%;height:24%;border-radius:50%"></div></div>
        <div class="slot filled" style="left:30%;top:50%;background:linear-gradient(150deg,#E4762B,#241F19)">
          <span class="role">ST</span><span class="nm">Haaland</span><span class="rt">96</span>
        </div>
        <div class="slot" style="left:70%;top:50%"><span class="role">ST</span></div>
      </div>
      <p style="margin-top:10px"><small>Eleven shirts, up to eleven different clubs — your XI ends up a
      patchwork, not one squad.</small></p>
    </div>

    <div class="card">
      <h3>3 · Some clubs come up more</h3>
      <p>The spin leans toward pedigree — the Premier League's big six, or
      in the Champions League, clubs who've actually won it more than once —
      about 65% of the time. Everyone else still shows up, just less often.</p>
    </div>

    <div class="card">
      <h3>4 · Kick-off</h3>
      <p>Once both XIs are built, the match plays out from squad strength —
      attack, midfield and defence — into a scoreline, scorers and a
      FotMob-style sheet. Then see where both squads would finish if they
      played a full season in that league.</p>
    </div>

    <div class="card">
      <h3>Three ways to play</h3>
      <p><b>Play the AI</b> — it builds its own XI right in front of you, shirt
      by shirt, same as you do.<br>
      <b>Pass and play</b> — hand the phone over between builds, no peeking.<br>
      <b>Online room</b> — share a four-letter code, build separately, same match.</p>
    </div>

    <button class="btn primary" id="done">Let's play</button>
  </section>`);
  v.querySelector('#done').onclick = screenMode;
  show(v);
}

// Ask the player for a nickname before they start building — stored
// locally and included in the squad payload so the opponent sees it.
function screenNickname(label, onDone) {
  const v = el(`<section>
    <h2>What's your name?</h2>
    <p>Your opponent will see this next to your team.</p>
    <input id="nick" maxlength="20" placeholder="${esc(label)}"
      style="width:100%;padding:14px;font-size:1.3rem;text-align:center;
      border-radius:12px;border:1px solid var(--line);background:#fff;
      font-family:'Bricolage Grotesque';font-weight:700">
    <button class="btn primary" id="go">Let's go</button>
  </section>`);
  const inp = v.querySelector('#nick');
  const proceed = () => { onDone(inp.value.trim() || label); };
  v.querySelector('#go').onclick = proceed;
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') proceed(); });
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
    <p>Send this code to your opponent. Both of you will build at the same time.</p>
    <div class="card"><div class="code">${S.room.code}</div></div>
    <button class="btn ghost" id="copy">Copy code</button>
    <p id="roomstatus"><small>Waiting for your opponent to join…</small></p>
  </section>`);
  v.querySelector('#copy').onclick = () => { navigator.clipboard?.writeText(S.room.code); toast('Code copied'); };
  show(v);
  poll(st => {
    if (st.players >= 2) {
      stopPoll();
      v.querySelector('#roomstatus').innerHTML = '<small>Opponent joined — building now!</small>';
      setTimeout(() => startTurns(), 600);
    }
  });
}

function screenWait(msg, onState) {
  show(el(`<section><h2>Hold on</h2><p>${esc(msg)}</p>
    <div class="bar"><i style="width:40%"></i></div></section>`));
  poll(st => onState(st));
}

/* --- turn orchestration ------------------------------------------- */
function startTurns() {
  stopPoll();
  if (S.mode === 'ai') {
    if (!S.players.length) S.players = [mkPlayer('You'), mkPlayer('The AI', true)];
    S.turn = 0;
    return screenFormationSpin();
  }
  if (S.mode === 'pass') {
    if (!S.players.length) S.players = [mkPlayer('Player 1'), mkPlayer('Player 2')];
    S.turn = 0;
    return screenFormationSpin();
  }
  // Online: both players build at the same time and independently.
  // S.players[0] is always seat-0 (host), S.players[1] always seat-1.
  // S.turn = our own seat so that me() always points to ourselves.
  if (!S.players.length) {
    S.players = [mkPlayer('Host'), mkPlayer('Challenger')];
  }
  S.turn = S.room.seat;
  const myDefault = S.room.seat === 0 ? 'Host' : 'Challenger';
  screenNickname(myDefault, name => { me().label = name; screenFormationSpin(); });
}
const mkPlayer = (label, ai=false) => ({ label, ai, formation:null, club:null, squad:null, xi:null, strength:null });

function nextAfterBuild() {
  const p = me();
  p.strength = rateSquad(p.xi);
  p.badge = badgeOf(p);
  if (S.mode === 'online') return publishSquad();
  if (S.mode === 'ai') {
    const ai = S.players[1];
    if (!ai.xi) { screenAIBuild(() => startMatch(S.players[0], S.players[1])); return; }
  }
  if (S.turn === 0 && S.mode === 'pass') { S.turn = 1; return screenHandover(); }
  startMatch(S.players[0], S.players[1]);
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
  p.xi = FORMATIONS[p.formation].map(s => ({ ...s, player: null }));
  p.rerollsLeft = 5; // whole-XI budget — a reroll discards the spun club, not a single player

  const clubs = S.leagueClubs;
  const usedClubs = new Set(), usedPlayers = new Set();
  let club = null, busy = false;

  const v = el(`<section>
    <div class="card club" id="clubcard" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <span><b id="clubname">No club yet</b><br><small id="count">0 of 11 picked</small></span>
        <span style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.5rem" id="avg">—</span>
      </div>
    </div>
    <div class="reel"><div class="reel-track"><div class="reel-item">${esc(LEAGUES[S.leagueKey].name)}</div></div></div>
    <p id="hint">Spin for a club — then pick who you want from it and which shirt they take.</p>
    <div class="pitch"><div class="markings">
      <div style="left:20%;right:20%;top:-1px;height:12%;border-top:none"></div>
      <div style="left:20%;right:20%;bottom:-1px;height:12%;border-bottom:none"></div>
      <div style="left:-1px;right:-1px;top:50%;height:0"></div>
      <div style="left:35%;right:35%;top:43.5%;height:13%;border-radius:50%"></div>
    </div></div>
    <div class="picker" id="picker"></div>
    <div class="actionbar" id="actbar">
      <div class="row">
        <button class="btn primary" id="act" style="flex:1;width:auto">Spin for a club</button>
        <button class="btn ghost sm" id="rr" style="flex:0 0 auto;width:auto;white-space:nowrap">Reroll club (5)</button>
      </div>
    </div>
  </section>`);

  const pitch = v.querySelector('.pitch'), picker = v.querySelector('#picker');
  const act = v.querySelector('#act'), rr = v.querySelector('#rr'), hint = v.querySelector('#hint');
  const box = v.querySelector('.reel');

  const filled = () => p.xi.filter(s => s.player).length;
  const openGroups = () => ['GK', 'DEF', 'MID', 'ATT_MID', 'FWD'].filter(g => p.xi.some(s => !s.player && GROUP[s.role] === g));

  function paint() {
    pitch.querySelectorAll('.slot').forEach(n => n.remove());
    p.xi.forEach(s => {
      const c = s.player && s.player.club;
      const style = c
        ? `left:${s.x}%;top:${s.y}%;background:linear-gradient(150deg,${c.home},${c.away === '#FFFFFF' ? '#241F19' : c.away});
           border-color:${c.home};color:${readable(c.home)}`
        : `left:${s.x}%;top:${s.y}%`;
      const n = el(`<div class="slot ${s.player ? 'filled' : ''}" style="${style}">
        <span class="role">${s.role}</span>
        ${s.player ? `<span class="nm">${esc(s.player.name.split(' ').slice(-1)[0])}</span>
          <span class="rt">${s.player.rating}</span>` : ''}
      </div>`);
      pitch.appendChild(n);
    });
    v.querySelector('#count').textContent = `${filled()} of 11 picked`;
    const rated = p.xi.filter(s => s.player);
    v.querySelector('#avg').textContent = rated.length
      ? Math.round(rated.reduce((t, s) => t + s.player.rating, 0) / rated.length) : '—';
    rr.textContent = `Reroll club (${p.rerollsLeft})`;
    rr.disabled = !club || p.rerollsLeft <= 0;
  }

  function groupLabel(g) {
    return { GK: 'Goalkeeper', DEF: 'Defenders', MID: 'Midfielders', ATT_MID: 'Attacking mid / wide', FWD: 'Forwards' }[g];
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
    act.classList.add('hide');
    busy = false; act.disabled = false;
    renderChoices();
    paint();
  }

  function renderChoices() {
    picker.replaceChildren();
    const groups = openGroups();
    let any = false;
    groups.forEach(g => {
      const taken = usedPlayers;
      const cands = club.squad
        .filter(pl => ELIGIBLE[g].includes(pl.position) && !taken.has(pl.id))
        .map(pl => ({ ...pl, rating: getRating(pl, g) }))
        .sort((a, b) => b.rating - a.rating);
      if (!cands.length) return;
      any = true;
      const section = el(`<div style="margin-bottom:10px"><h3 style="margin:0 0 6px">${groupLabel(g)}</h3></div>`);
      cands.forEach(pl => {
        const row = el(`<div class="plyr" style="margin-bottom:6px;cursor:pointer">
          <span class="num" style="background:${club.home};color:${readable(club.home)}">${pl.number}</span>
          <span class="meta"><b>${esc(pl.name)}</b><small>${esc(pl.position)}${pl.clubName ? ' · ' + esc(pl.clubName) : ''}</small></span>
          <span class="rating">${pl.rating}</span>
        </div>`);
        row.onclick = () => choose(g, pl);
        section.appendChild(row);
      });
      picker.appendChild(section);
    });
    if (!any) {
      picker.appendChild(el(`<p><small>No eligible players from ${esc(club.name)} for your remaining shirts — spin again.</small></p>`));
      hint.textContent = 'Nobody there fits what you still need.';
      act.classList.remove('hide'); act.textContent = 'Spin for the next club'; act.onclick = spin;
      club = null; paint();
    } else {
      hint.textContent = `Pick a player from ${club.name} — they'll take the matching shirt.`;
    }
  }

  function choose(group, pl) {
    if (busy) return;
    const slot = p.xi.find(s => !s.player && GROUP[s.role] === group);
    if (!slot) return; // shouldn't happen, group only offered if an open shirt exists
    slot.player = { ...pl, club };
    usedPlayers.add(pl.id);
    club = null;
    picker.replaceChildren();
    paint();
    if (filled() === 11) {
      hint.textContent = 'Eleven shirts, eleven clubs.';
      act.classList.remove('hide');
      act.textContent = 'Confirm this XI';
      act.onclick = () => nextAfterBuild();
    } else {
      hint.textContent = `${11 - filled()} to go.`;
      act.classList.remove('hide');
      act.textContent = 'Spin for the next club';
      act.onclick = spin;
    }
  }

  rr.onclick = () => {
    if (!club || p.rerollsLeft <= 0) return;
    p.rerollsLeft--;
    club = null;
    picker.replaceChildren();
    hint.textContent = `${11 - filled()} to go. Spin for another club.`;
    act.classList.remove('hide'); act.textContent = 'Spin for the next club'; act.onclick = spin;
    paint();
  };

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
    // Weighted toward the best available rather than a flat random pick
    // among the top 3 — a human naturally gravitates to the highest
    // rating in the list, so a uniform pick here made the AI
    // systematically weaker than what a person would draft.
    const r = Math.random();
    const idx = r < 0.65 ? 0 : r < 0.9 ? 1 : 2;
    const pick = cands[Math.min(idx, cands.length - 1)];
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
/* --- kick-off: simulate once, then watch it play out on a tactics
 * board before the scoresheet — ball wandering, events highlighted on
 * the actual player who caused them, both XIs shown as a real formation
 * shape rather than a flat list. */
function startMatch(A, B) {
  const m = simulate(A, B);
  screenMatchSim(A, B, m);
}

const PITCH_HALF_MARKINGS = `<div class="markings">
  <div style="left:20%;right:20%;top:-1px;height:9%;border-top:none"></div>
  <div style="left:20%;right:20%;bottom:-1px;height:9%;border-bottom:none"></div>
  <div style="left:-1px;right:-1px;top:50%;height:0"></div>
  <div style="left:32%;right:32%;top:44%;height:12%;border-radius:50%"></div>
</div>`;

// Both teams' own build coordinates put the GK near y=90 and the front
// line near y=17 — fine for one team alone. For a full two-team pitch,
// both teams' shapes are built around a SHARED "engagement line" (a
// single Y value both sides react to) instead of being locked into their
// own half — a defending team genuinely pushes up past halfway to press
// when the game is being played in the attacking third, the same way a
// real team's block does, rather than staying pinned deep the whole
// match. engagement runs 4 (deep in the isTop side's own box) to 96
// (deep in the non-isTop side's own box), same scale as pitch Y.
function formationY(slot, isTop, engagement) {
  const roleAdvance = (90 - slot.y) / (90 - 17); // 0 = GK, 1 = most advanced
  // GK barely moves — pinned to within 8% of their own goal line regardless
  // of where the engagement line is. Everyone else spreads out around it.
  if (roleAdvance < 0.08) {
    const goalLine = isTop ? 6 : 94;
    return Math.max(3, Math.min(97, goalLine + (isTop ? 1 : -1) * (Math.random() * 3)));
  }
  const dir = isTop ? 1 : -1;
  const span = 24; // tighter spread — reduces clustering at extremes
  return Math.max(6, Math.min(94, engagement + dir * (roleAdvance - 0.5) * span * 2));
}

async function screenMatchSim(A, B, m) {
  theme(null);
  document.documentElement.style.setProperty('--club-a', A.badge.home);
  document.documentElement.style.setProperty('--club-b2', B.badge.home);
  setCrumb('Kick-off');

  // Coordinates used throughout: L = along the pitch (0 = home goal on the
  // left, 100 = away goal on the right), W = across it (0 = top touchline).
  // Home attacks left→right, away right→left, like a broadcast/EA sim view.
  const isGK = s => s.role === 'GK';
  const rating = s => (typeof s.player.rating === 'number' ? s.player.rating : 0);
  const captainOf = team => team.xi.slice().sort((a, b) => rating(b) - rating(a))[0];
  const capA = captainOf(A), capB = captainOf(B);
  const shirt = (s, i) => (s.player.number != null ? s.player.number : i + 1);

  const listHTML = (team, side, cap) => team.xi.map((s, i) => `
    <div class="ms-row" data-side="${side}" data-name="${esc(s.player.name)}">
      <span class="ms-num">${esc(String(shirt(s, i)))}</span>
      <span class="ms-name">${esc(s.player.name)}${s === cap ? ' <span class="ms-cap">C</span>' : ''}<span class="ms-tag"></span></span>
      <span class="ms-fit"><i></i></span>
    </div>`).join('');

  const v = el(`<section class="ms">
    <style>
      .ms .ms-board{display:grid;grid-template-columns:1fr;gap:10px;margin-top:10px}
      .ms .ms-lists{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      @media (min-width:760px){
        .ms .ms-board{grid-template-columns:190px 1fr 190px;align-items:start}
        .ms .ms-lists{display:contents}
        .ms .ms-listA{order:-1}
      }
      .ms .hpitch{position:relative;width:100%;aspect-ratio:105/68;border-radius:12px;overflow:hidden;
        background:repeating-linear-gradient(90deg,rgba(255,255,255,.045) 0 5%,rgba(0,0,0,.05) 5% 10%),
                   linear-gradient(160deg,#2E2822,#15120F);border:1px solid rgba(255,255,255,.12)}
      body.ucl-mode .ms .hpitch{background:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 5%,rgba(0,0,0,.06) 5% 10%),linear-gradient(160deg,#123A8C,#0A1F55)}
      body.pl-mode .ms .hpitch{background:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 5%,rgba(0,0,0,.06) 5% 10%),linear-gradient(160deg,#3D1454,#1E0A2B)}
      .ms .hm{position:absolute;border:1.5px solid rgba(255,255,255,.3)}
      .ms .dot{position:absolute;width:19px;height:19px;border-radius:50%;transform:translate(-50%,-50%);
        display:flex;align-items:center;justify-content:center;font:700 9px/1 system-ui,sans-serif;
        box-shadow:0 0 0 1.5px rgba(255,255,255,.55),0 1px 3px rgba(0,0,0,.4);
        transition:left .6s ease-out,top .6s ease-out;z-index:3}
      .ms #ball{position:absolute;width:9px;height:9px;border-radius:50%;background:#fff;z-index:6;
        transform:translate(-50%,-50%);box-shadow:0 0 6px rgba(255,255,255,.8);transition:left .8s ease-out,top .8s ease-out}
      .ms .ms-list{background:rgba(0,0,0,.18);border-radius:12px;padding:8px 10px}
      .ms .ms-list h4{margin:0 0 6px;font-size:.78rem;opacity:.8}
      .ms .ms-row{display:grid;grid-template-columns:22px 1fr 34px;align-items:center;gap:6px;font-size:.78rem;padding:2px 0}
      .ms .ms-num{font-weight:800;text-align:right;opacity:.85}
      .ms .ms-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ms .ms-cap{display:inline-block;font-size:.6rem;font-weight:800;padding:0 3px;border-radius:3px;background:#fff;color:#111;margin-left:2px}
      .ms .ms-fit{height:4px;border-radius:2px;background:rgba(255,255,255,.15);overflow:hidden}
      .ms .ms-fit i{display:block;height:100%;width:100%;background:#22D3EE;transition:width 1s linear}
    </style>
    <div class="sheet" style="padding:14px 16px;display:flex;justify-content:space-between;align-items:center;
      background:linear-gradient(100deg,var(--club-a) 0%,var(--club-a) 48%,var(--club-b2,#241F19) 52%);border-radius:14px">
      <b style="flex:1;color:${readable(A.badge.home)}">${esc(A.label)}</b>
      <div style="text-align:center;background:rgba(0,0,0,.32);border-radius:10px;padding:4px 12px">
        <div id="score" style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.6rem;color:#fff">0 – 0</div>
        <div id="clock" style="font-size:.85rem;opacity:.95;color:#fff;font-variant-numeric:tabular-nums">00:00</div>
      </div>
      <b style="flex:1;text-align:right;color:${readable(B.badge.home)}">${esc(B.label)}</b>
    </div>
    <div class="ms-board">
      <div class="hpitch" id="matchpitch">
        <div class="hm" style="left:50%;top:-2px;bottom:-2px;width:0"></div>
        <div class="hm" style="left:50%;top:50%;width:17%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%)"></div>
        <div class="hm" style="left:-2px;top:21%;width:16%;height:58%"></div>
        <div class="hm" style="right:-2px;top:21%;width:16%;height:58%"></div>
        <div class="hm" style="left:-2px;top:37%;width:5.5%;height:26%"></div>
        <div class="hm" style="right:-2px;top:37%;width:5.5%;height:26%"></div>
        <div id="ball" style="left:50%;top:50%"></div>
      </div>
      <div class="ms-lists">
        <div class="ms-list ms-listA"><h4>${esc(A.label)} · Starting XI</h4>${listHTML(A, 'home', capA)}</div>
        <div class="ms-list"><h4>${esc(B.label)} · Starting XI</h4>${listHTML(B, 'away', capB)}</div>
      </div>
    </div>
    <p id="commentary" style="min-height:1.4em;text-align:center;margin-top:10px"><small>Kicking off…</small></p>
    <button class="btn ghost" id="skip">Skip to full time</button>
  </section>`);

  const pitch = v.querySelector('#matchpitch'), ball = v.querySelector('#ball');
  const clock = v.querySelector('#clock'), commentary = v.querySelector('#commentary'), scoreEl = v.querySelector('#score');
  let scoreA = 0, scoreB = 0;
  const teams = { home: A, away: B };

  // One entry per player: the slot, the dot, a lane across the pitch, how
  // advanced their role is, a random wander phase, and how fast they tire.
  const players = [];
  [['home', A], ['away', B]].forEach(([side, team]) => {
    team.xi.forEach((s, i) => {
      const gk = isGK(s);
      const fill = gk ? (team.badge.away && team.badge.away !== team.badge.home ? team.badge.away : '#F472B6') : team.badge.home;
      const dot = el(`<div class="dot" style="background:${fill};color:${readable(fill)}">${esc(String(shirt(s, i)))}</div>`);
      pitch.appendChild(dot);
      const lane = side === 'home' ? s.x : 100 - s.x;
      const adv = Math.max(0, Math.min(1, (90 - s.y) / (90 - 17)));
      const row = v.querySelector(`.ms-row[data-side="${side}"][data-name="${CSS.escape(s.player.name)}"]`);
      players.push({ side, slot: s, gk, dot, lane, adv, ph: Math.random() * 6.28, ph2: Math.random() * 6.28,
        drain: gk ? 6 + Math.random() * 6 : 18 + Math.random() * 20, row });
    });
  });
  const key = p => p.side + '|' + p.slot.player.name;
  const place = (elm, L, W) => { elm.style.left = L + '%'; elm.style.top = W + '%'; };

  let bL = 50, bW = 50, poss = null, carrier = null;
  let skipped = false;

  // The heart of it: both teams as one compact block around the ball.
  // The side in possession stretches up to ~36% of the pitch; the side
  // without it sits tighter, just goal-side of the ball. Keepers stay home.
  function targetFor(p) {
    const t = performance.now();
    if (p.gk) {
      const L = p.side === 'home' ? 4.5 : 95.5;
      return [L, 50 + (bW - 50) * 0.18 + Math.sin(t / 1900 + p.ph) * 1.2];
    }
    const home = p.side === 'home';
    const hasBall = poss === p.side, neutral = poss === null;
    const behind = neutral ? 20 : hasBall ? 28 : 14;
    const depth = hasBall ? 36 : 32;
    let back = home ? bL - behind : bL + behind;
    back = home ? Math.max(12, Math.min(62, back)) : Math.max(38, Math.min(88, back));
    let L = home ? back + p.adv * depth : back - p.adv * depth;
    let W = 50 + (p.lane - 50) * 0.8 + (bW - 50) * 0.25;
    // small, constant shuffle — never still, never a big lurch
    L += Math.sin(t / 1300 + p.ph) * 1.8;
    W += Math.cos(t / 1550 + p.ph2) * 2.2;
    return [Math.max(3, Math.min(97, L)), Math.max(4, Math.min(96, W))];
  }
  function tick() {
    players.forEach(p => {
      if (carrier && key(p) === carrier) { place(p.dot, bL, bW); return; }
      const [L, W] = targetFor(p);
      place(p.dot, L, W);
    });
  }
  tick();
  const moveT = setInterval(tick, 380);

  // Real time → match clock. The whole 90 plays in about a minute, and
  // the clock ticks every frame as mm:ss so it never sits still or jumps.
  const REAL_MS = 60000;
  const t0 = performance.now();
  let stoppage = 1 + Math.floor(Math.random() * 5), finished = false;
  const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  function clockTick() {
    if (skipped || finished) return;
    const frac = (performance.now() - t0) / REAL_MS;
    const secs = Math.min(frac, 1) * 90 * 60;
    clock.textContent = frac < 1 ? fmt(secs) : `90:00 +${stoppage}`;
    players.forEach(p => { if (p.row) p.row.querySelector('.ms-fit i').style.width = Math.max(30, 100 - p.drain * Math.min(frac, 1)) + '%'; });
    requestAnimationFrame(clockTick);
  }
  requestAnimationFrame(clockTick);

  const stop = () => { clearInterval(moveT); };
  v.querySelector('#skip').onclick = () => { skipped = true; stop(); screenResult(A, B, m); };
  show(v);

  const pickDot = (side, withGK) => {
    const pool = players.filter(p => p.side === side && (withGK || !p.gk));
    return pool[Math.floor(Math.random() * pool.length)];
  };
  const byName = (side, name) => players.find(p => p.side === side && p.slot.player.name === name);
  const goalL = side => side === 'home' ? 100 : 0;
  const advanceTo = (side, amt) => bL + (goalL(side) - bL) * amt;
  const clampW = w => Math.max(5, Math.min(95, w));

  // Move the ball; whoever receives it carries it. Travel time scales
  // with distance, then a short beat for the touch before the next action.
  async function ballTo(L, W, p, caption, hold) {
    if (skipped) return;
    const d = Math.hypot(L - bL, W - bW);
    const dur = Math.max(0.45, Math.min(1.2, d / 45));
    ball.style.transitionDuration = dur + 's';
    bL = L; bW = W;
    if (p) { poss = p.side; carrier = key(p); p.dot.style.transitionDuration = dur + 's'; }
    else carrier = null;
    place(ball, L, W); tick();
    await sleep(dur * 1000 + 180 + Math.random() * 220);
    if (p) p.dot.style.transitionDuration = '';
    if (caption) { commentary.innerHTML = caption; await sleep(hold || 700); }
  }
  const tagRow = (p, txt) => { if (p && p.row) p.row.querySelector('.ms-tag').textContent += ' ' + txt; };

  const events = m.events.slice().sort((a, b) => a.min - b.min);
  const CHAINS = 14, used = new Set();
  commentary.innerHTML = 'Kick-off.';
  await ballTo(50, 50, pickDot('home'), null);

  for (let c = 0; c < CHAINS; c++) {
    if (skipped) return;
    const slotEnd = t0 + REAL_MS * (c + 1) / CHAINS;
    const chainMin = Math.round(((c + 0.5) / CHAINS) * 90);
    const ev = events.find(e => !used.has(e) && e.min <= chainMin + 5); // overdue events still get played

    if (ev) {
      used.add(ev);
      const side = ev.side, team = teams[side];
      const scorer = byName(side, ev.player) || pickDot(side);
      const shotW = 44 + Math.random() * 12;
      if (ev.type === 'goal') {
        if (ev.method === 'penalty') {
          await ballTo(advanceTo(side, 0.6), clampW(30 + Math.random() * 40), pickDot(side));
          await ballTo(side === 'home' ? 88.5 : 11.5, 50, scorer, `Penalty to ${esc(team.label)}!`, 900);
        } else if (ev.method === 'freekick') {
          await ballTo(advanceTo(side, 0.5), clampW(30 + Math.random() * 40), pickDot(side));
          await ballTo(side === 'home' ? 76 : 24, clampW(35 + Math.random() * 30), scorer, 'Free-kick, dangerous position…', 800);
        } else {
          commentary.innerHTML = `${esc(team.label)} build an attack…`;
          for (let i = 0; i < 3; i++) await ballTo(advanceTo(side, 0.28), clampW(scorer.lane + (Math.random() * 40 - 20)), pickDot(side));
          await ballTo(advanceTo(side, 0.45), clampW(40 + Math.random() * 20), scorer, `${esc(ev.player)} takes it on…`, 450);
        }
        await ballTo(side === 'home' ? 99.5 : 0.5, shotW, null, `⚽ <b>${esc(ev.player)}</b> ${esc(ev.desc)}!`, 1300);
        if (side === 'home') scoreA++; else scoreB++;
        scoreEl.textContent = `${scoreA} – ${scoreB}`;
        tagRow(scorer, '⚽');
        poss = null;
        const restart = side === 'home' ? 'away' : 'home';
        await ballTo(50, 50, pickDot(restart), `Kick-off, ${esc(teams[restart].label)} to restart.`, 600);
      } else {
        const other = side === 'home' ? 'away' : 'home';
        await ballTo(advanceTo(other, 0.3), clampW(20 + Math.random() * 60), pickDot(other));
        await ballTo(bL + (Math.random() * 8 - 4), clampW(bW + (Math.random() * 16 - 8)), scorer,
          `🟨 <b>${esc(ev.player)}</b> booked for a foul`, 900);
        tagRow(scorer, '🟨');
        await ballTo(bL, bW, pickDot(other));
      }
    } else {
      const side = Math.random() < (m.xgA / ((m.xgA + m.xgB) || 1)) ? 'home' : 'away';
      const other = side === 'home' ? 'away' : 'home';
      const passes = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < passes; i++) {
        const p = pickDot(side);
        const fwd = Math.random() < 0.25 ? -0.12 : 0.12 + Math.random() * 0.14; // not every pass goes forward
        await ballTo(Math.max(6, Math.min(94, advanceTo(side, fwd))), clampW(p.lane + (Math.random() * 24 - 12)), p);
      }
      const o = Math.random();
      if (o < 0.13) {
        await ballTo(side === 'home' ? 99 : 1, 44 + Math.random() * 12, null, '🧤 Saved by the keeper', 600);
        const gk = players.find(p => p.side === other && p.gk);
        await ballTo(side === 'home' ? 95 : 5, 50, gk);
        await ballTo(50 + (Math.random() * 20 - 10), clampW(20 + Math.random() * 60), pickDot(other));
      } else if (o < 0.22) {
        await ballTo(side === 'home' ? 100 : 0, Math.random() < 0.5 ? 36 : 64, null, '🥅 Off target — goal kick', 600);
        const gk = players.find(p => p.side === other && p.gk);
        await ballTo(side === 'home' ? 94 : 6, 50, gk);
        await ballTo(50, clampW(25 + Math.random() * 50), pickDot(other));
      } else if (o < 0.32) {
        const cw = Math.random() < 0.5 ? 1 : 99;
        await ballTo(side === 'home' ? 99.5 : 0.5, cw, pickDot(side), '🚩 Corner', 550);
        await ballTo(side === 'home' ? 91 : 9, clampW(40 + Math.random() * 20), null, 'Swung into the box…', 500);
        await ballTo(side === 'home' ? 75 : 25, clampW(30 + Math.random() * 40), pickDot(other), 'Headed clear.', 450);
      } else if (o < 0.45) {
        await ballTo(bL + (side === 'home' ? -3 : 3), bW, pickDot(other), '🛡️ Won back in midfield', 450);
      } else {
        await ballTo(bL, clampW(bW + (Math.random() * 30 - 15)), pickDot(other)); // loose pass, possession turns over
      }
    }
    // Keep the play in step with the clock: if this spell finished early,
    // keep the ball moving around at the back until its slot is up.
    while (!skipped && performance.now() < slotEnd - 900) {
      const p = pickDot(poss || 'home');
      await ballTo(Math.max(8, Math.min(92, bL + (Math.random() * 16 - 8))), clampW(p.lane + (Math.random() * 20 - 10)), p);
    }
    if (performance.now() < slotEnd) await sleep(slotEnd - performance.now());
  }

  if (skipped) return;
  // Any goal that never found a spell (several close together) still
  // goes in before the whistle, so the board always matches the result.
  for (const ev of events.filter(e => !used.has(e) && e.type === 'goal')) {
    if (skipped) return;
    const scorer = byName(ev.side, ev.player) || pickDot(ev.side);
    await ballTo(advanceTo(ev.side, 0.6), clampW(35 + Math.random() * 30), scorer);
    await ballTo(ev.side === 'home' ? 99.5 : 0.5, 44 + Math.random() * 12, null, `⚽ <b>${esc(ev.player)}</b> ${esc(ev.desc)}!`, 1200);
    if (ev.side === 'home') scoreA++; else scoreB++;
    scoreEl.textContent = `${scoreA} – ${scoreB}`;
    tagRow(scorer, '⚽');
  }
  // stoppage time plays out on the clock before the whistle
  await sleep(1500);
  finished = true; stop();
  clock.textContent = 'FT';
  commentary.innerHTML = '<b>Full time.</b>';
  await sleep(900);
  if (!skipped) screenResult(A, B, m);
}


/* --- shareable result card — drawn on a canvas, shared or downloaded
 * as an image so a result can leave the app. */
async function shareResultCard(A, B, m) {
  toast('Building your card…');
  if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }

  const W = 1080, H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const rr = (x, y, w, h, r) => {
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
    else { ctx.beginPath(); ctx.rect(x, y, w, h); }
  };

  // base
  ctx.fillStyle = '#F6EFE2'; ctx.fillRect(0, 0, W, H);

  // header band — diagonal club-colour split, like the in-app scoresheet
  const bandH = 430;
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, A.badge.home); grad.addColorStop(0.48, A.badge.home);
  grad.addColorStop(0.52, B.badge.home === '#FFFFFF' ? '#241F19' : B.badge.home);
  grad.addColorStop(1, B.badge.home === '#FFFFFF' ? '#241F19' : B.badge.home);
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, bandH);

  ctx.fillStyle = 'rgba(255,255,255,.92)';
  ctx.font = "800 40px 'Bricolage Grotesque', sans-serif";
  ctx.textAlign = 'left';
  ctx.fillText('Sp1n', 56, 84);
  ctx.fillStyle = '#E4762B';
  ctx.fillText('XI', 56 + ctx.measureText('Sp1n').width, 84);

  ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
  ctx.font = "700 34px Archivo, sans-serif";
  wrapText(ctx, A.label, W * 0.27, 190, 380, 38);
  wrapText(ctx, B.label, W * 0.73, 190, 380, 38);
  ctx.font = "500 22px Archivo, sans-serif"; ctx.globalAlpha = .85;
  ctx.fillText(A.formation, W * 0.27, 230);
  ctx.fillText(B.formation, W * 0.73, 230);
  ctx.globalAlpha = 1;

  ctx.font = "800 130px 'Bricolage Grotesque', sans-serif";
  ctx.fillText(`${m.gA} – ${m.gB}`, W / 2, 350);

  ctx.font = "600 24px Archivo, sans-serif"; ctx.globalAlpha = .8;
  ctx.fillText(esc_(LEAGUES[S.leagueKey].name), W / 2, 400);
  ctx.globalAlpha = 1;

  // scorers
  let y = bandH + 70;
  ctx.textAlign = 'left'; ctx.fillStyle = '#241F19';
  ctx.font = "800 30px 'Bricolage Grotesque', sans-serif";
  ctx.fillText('Scorers', 56, y);
  y += 46;
  const goals = m.events.filter(e => e.type === 'goal');
  ctx.font = "500 26px Archivo, sans-serif";
  if (!goals.length) { ctx.fillStyle = '#6B6055'; ctx.fillText('Goalless.', 56, y); y += 40; }
  goals.forEach(g => {
    ctx.fillStyle = '#241F19';
    const line = `⚽ ${g.player} ${g.min}' — ${g.side === 'home' ? A.label : B.label}`;
    ctx.fillText(line, 56, y);
    y += 42;
  });

  // squad strength
  y += 30;
  ctx.font = "800 30px 'Bricolage Grotesque', sans-serif";
  ctx.fillText('Squad strength', 56, y);
  y += 20;
  [A, B].forEach(p => {
    y += 46;
    ctx.font = "700 26px Archivo, sans-serif"; ctx.fillStyle = '#241F19';
    ctx.fillText(`${p.label} — ${p.strength.overall}`, 56, y);
    y += 16;
    ctx.fillStyle = '#DCCFB8'; rr(56, y, W - 112, 18, 9); ctx.fill();
    ctx.fillStyle = p.badge.home; rr(56, y, (W - 112) * (p.strength.overall / 100), 18, 9); ctx.fill();
    y += 40;
    ctx.font = "400 20px Archivo, sans-serif"; ctx.fillStyle = '#6B6055';
    ctx.fillText(`Attack ${Math.round(p.strength.att)} · Midfield ${Math.round(p.strength.mid)} · Defence ${Math.round(p.strength.def)}`, 56, y);
  });

  ctx.textAlign = 'center'; ctx.font = "500 22px Archivo, sans-serif"; ctx.fillStyle = '#6B6055';
  ctx.fillText('Built with Sp1nXI', W / 2, H - 40);

  canvas.toBlob(async blob => {
    if (!blob) { toast('Could not build the image.'); return; }
    const file = new File([blob], 'sp1nxi-result.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Sp1nXI result', text: `${A.label} ${m.gA}-${m.gB} ${B.label}` });
        return;
      } catch (e) { /* user cancelled or share failed — fall through to download */ }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sp1nxi-result.png';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('Image saved.');
  }, 'image/png');
}
function wrapText(ctx, text, x, y, maxW, lh) {
  const words = text.split(' ');
  let line = '', lines = [];
  words.forEach(w => {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  });
  lines.push(line);
  const startY = y - (lines.length - 1) * lh / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lh));
}
const esc_ = s => String(s); // canvas text needs no HTML escaping

function screenResult(A, B, m) {
  stopPoll();
  S.lastMatch = { A, B, m, bracket: null, autoShown: false };
  document.documentElement.style.setProperty('--club-b2', B.badge.home);
  document.documentElement.style.setProperty('--club-a', A.badge.home);
  setCrumb('Full time');

  const evRows = m.events.map(e => {
    const icon = e.type === 'goal' ? '⚽' : '🟨';
    const label = e.type === 'goal'
      ? `${esc(e.player)} ${esc(e.desc)}`
      : esc(e.player);
    return e.side === 'home'
      ? `<div class="ev"><span class="min">${e.min}'</span><span>${icon} ${label}</span></div>`
      : `<div class="ev away"><span>${label} ${icon}</span><span class="min">${e.min}'</span></div>`;
  }).join('') || '<small>Nothing much happened. It was that kind of game.</small>';

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
        <div class="side" style="color:${readable(A.badge.home)}">${esc(A.label)}<br><small style="opacity:.8">${esc(A.formation)}</small></div>
        <div class="nums" style="color:#fff;background:rgba(0,0,0,.32);border-radius:10px;padding:2px 10px">${m.gA} – ${m.gB}</div>
        <div class="side" style="color:${readable(B.badge.home)}">${esc(B.label)}<br><small style="opacity:.8">${esc(B.formation)}</small></div>
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
    <button class="btn ghost" id="share">Share this result</button>
    <button class="btn ghost" id="again">Play again</button>
  </section>`);
  v.querySelector('#totable').onclick = () => { clearTimeout(autoT); S.lastMatch.autoShown = true; slideToTable(A, B, v); };
  v.querySelector('#xi').onclick = () => { clearTimeout(autoT); screenLineups(A, B); };
  v.querySelector('#share').onclick = () => { clearTimeout(autoT); shareResultCard(A, B, m); };
  v.querySelector('#again').onclick = () => { clearTimeout(autoT); S.players = []; S.turn = 0; S.room = null; screenMode(); };
  show(v);
  // One-time auto-advance only — navigating back to the scoresheet
  // after visiting the table never re-triggers it.
  let autoT = null;
  if (!S.lastMatch.autoShown) {
    autoT = setTimeout(() => {
      if (!S.lastMatch.autoShown) {
        S.lastMatch.autoShown = true;
        slideToTable(A, B, v);
      }
    }, 7000);
  }
}

function slideToTable(A, B, fromEl) {
  if (fromEl) {
    fromEl.style.transition = 'opacity .35s ease, transform .35s ease';
    fromEl.style.opacity = '0';
    fromEl.style.transform = 'translateY(-18px)';
  }
  setTimeout(() => screenTable(A, B), fromEl ? 340 : 0);
}

/* --- the predicted table: a separate screen, rows reveal in turn --- */
/* --- UCL only: knockout bracket from the league-phase table --------
 * Top 16 by rating seed into the Round of 16 (1v16, 2v15, ...), and
 * winners advance through quarters, semis, and the final. Both built
 * XIs are guaranteed a place in the field even if their rating didn't
 * technically crack the top 16, since the point is seeing how far YOUR
 * team goes, not a strict simulation of the other 34 clubs. */
function knockoutOutcome(sa, sb) {
  const pa = 1 / (1 + Math.pow(10, -(sa - sb) / 12));
  return Math.random() < pa; // true = side A wins
}

async function screenKnockout(A, B, tableRows) {
  setCrumb('Knockout stage');
  // Reuse the saved draw so revisits show the same bracket — but only if
  // it's in the shape this league needs; otherwise draw it fresh.
  const cached = S.lastMatch && S.lastMatch.bracket;
  if (cached && (cached.isUCL ? cached.mainRounds : cached.rounds)) {
    return renderKnockout(A, B, cached).catch(e => knockoutError(A, B, e));
  }

  const sorted = tableRows.slice().sort((a, b) => b.strength - a.strength);
  const isUCL = S.leagueKey === 'UCL';
  let data;

  if (isUCL) {
    const top8    = sorted.slice(0,  8);
    const playoff = sorted.slice(8, 24);
    const missed  = sorted.slice(24).filter(r => r.mine);
    const playoffMatches = [];
    for (let i = 0; i < 8; i++) {
      const x = playoff[i], y = playoff[15 - i];
      playoffMatches.push({ x, y, winner: knockoutOutcome(x.strength, y.strength) ? x : y });
    }
    const pw = playoffMatches.map(m => m.winner).sort((a, b) => a.strength - b.strength);
    const r16 = [];
    for (let i = 0; i < 8; i++) r16.push(top8[i], pw[i]);
    const mainRounds = [];
    let cur = r16;
    for (const _ of ['Round of 16','Quarter-finals','Semi-finals','Final']) {
      const ms = [];
      for (let i = 0; i < cur.length; i += 2) {
        const x = cur[i], y = cur[i+1];
        ms.push({ x, y, winner: knockoutOutcome(x.strength, y.strength) ? x : y });
      }
      mainRounds.push(ms); cur = ms.map(m => m.winner);
    }
    data = { isUCL: true, top8, playoffMatches, mainRounds, champ: cur[0], missed };
  } else {
    const field  = sorted.slice(0, 16);
    const missed = sorted.slice(16).filter(r => r.mine);
    const SEEDS  = [0,15,7,8,3,12,4,11,1,14,6,9,2,13,5,10];
    const seeded = SEEDS.map(i => field[i] || field[field.length-1]);
    const rnames = S.leagueKey === 'WC'
      ? ['Round of 32','Quarter-finals','Semi-finals','Final']
      : ['Round of 16','Quarter-finals','Semi-finals','Final'];
    const rounds = [];
    let cur = seeded;
    for (const _ of rnames) {
      const ms = [];
      for (let i = 0; i < cur.length; i += 2) {
        const x = cur[i], y = cur[i+1];
        ms.push({ x, y, winner: knockoutOutcome(x.strength, y.strength) ? x : y });
      }
      rounds.push(ms); cur = ms.map(m => m.winner);
    }
    data = { isUCL: false, rounds, rnames, champ: cur[0], missed };
  }

  if (S.lastMatch) S.lastMatch.bracket = data;
  return renderKnockout(A, B, data).catch(e => knockoutError(A, B, e));
}

// If anything goes wrong drawing the bracket, say so on screen instead
// of leaving a blank page.
function knockoutError(A, B, e) {
  if (S.lastMatch) S.lastMatch.bracket = null;
  const v = el(`<section><h2>Knockout stage</h2>
    <p><small>Couldn't draw the bracket: ${esc(String(e && e.message || e))}</small></p>
    <button class="btn ghost" id="back">Back to the table</button></section>`);
  v.querySelector('#back').onclick = () => screenTable(A, B);
  show(v);
}

async function renderKnockout(A, B, data) {
  const { champ, missed, isUCL } = data;
  const winnerLabel = S.leagueKey === 'WC' ? 'World Champions' : 'Champions';

  if (isUCL) {
    const { top8, playoffMatches, mainRounds } = data;
    const myInPlayoff = playoffMatches.some(m => m.x.mine || m.y.mine);
    const myInTop8 = top8.some(r => r.mine);
    const v = el(`<section>
      <h2>Knockout stage</h2>
      ${missed.map(r => `<p><small>⚠️ ${esc(r.name)} finished 25th or lower — eliminated at the league phase.</small></p>`).join('')}
      ${myInPlayoff ? '<p><small>🔶 Your XI is in the playoff round — win to reach the Round of 16.</small></p>' : ''}
      ${myInTop8 ? '<p><small>✅ Your XI qualified directly for the Round of 16.</small></p>' : ''}
      <h3 style="margin-top:14px">Knockout playoff round</h3>
      <p><small>9th–24th · 9 v 24, 10 v 23 … 16 v 17</small></p>
      <div id="playoff-wrap"></div>
      <h3 style="margin-top:18px">Round of 16 onwards</h3>
      <p><small>Top 8 direct + 8 playoff winners</small></p>
      <div id="main-wrap"></div>
      <div class="card" id="champCard" style="text-align:center;opacity:0;transition:opacity .4s ease;margin-top:14px">
        <h3>${winnerLabel}</h3>
        <p style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.5rem">${champ.mine ? '🏆 ' : ''}${esc(champ.name)}</p>
      </div>
      <button class="btn ghost" id="back" style="margin-top:10px">Back to the table</button>
    </section>`);
    v.querySelector('#back').onclick = () => screenTable(A, B);
    show(v);
    const pb = await drawBracket([playoffMatches]);
    v.querySelector('#playoff-wrap').appendChild(pb.wrap); await pb.reveal();
    const mb = await drawBracket(mainRounds);
    v.querySelector('#main-wrap').appendChild(mb.wrap); await mb.reveal();
    v.querySelector('#champCard').style.opacity = 1;
  } else {
    const { rounds, rnames } = data;
    const v = el(`<section>
      <h2>Knockout stage</h2>
      ${missed.map(r => `<p><small>⚠️ ${esc(r.name)} didn't qualify for the knockout round.</small></p>`).join('')}
      <div id="bkt-wrap"></div>
      <div class="card" id="champCard" style="text-align:center;opacity:0;transition:opacity .4s ease;margin-top:14px">
        <h3>${winnerLabel}</h3>
        <p style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.5rem">${champ.mine ? '🏆 ' : ''}${esc(champ.name)}</p>
      </div>
      <button class="btn ghost" id="back" style="margin-top:10px">Back to the table</button>
    </section>`);
    v.querySelector('#back').onclick = () => screenTable(A, B);
    show(v);
    const bkt = await drawBracket(rounds);
    v.querySelector('#bkt-wrap').appendChild(bkt.wrap); await bkt.reveal();
    v.querySelector('#champCard').style.opacity = 1;
  }
}


// Shared helper — renders a set of bracket rounds into a scrollable
// visual bracket with SVG connector lines.
async function drawBracket(rounds, backFn) {
  const wrap = el(`<div style="overflow-x:auto;margin:0 -16px;padding:4px 16px">
    <div class="bracket" id="bkt" style="position:relative;display:flex;gap:30px;min-height:240px"></div>
  </div>`);
  const bracket = wrap.querySelector('#bkt');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('style', 'position:absolute;top:0;left:0;pointer-events:none;overflow:visible');
  bracket.appendChild(svg);
  const matchBoxes = [];
  rounds.forEach((matches, r) => {
    const col = el(`<div class="bround" style="display:flex;flex-direction:column;justify-content:space-around;
      gap:16px;min-width:152px;flex:none;opacity:0;transition:opacity .4s ease"></div>`);
    matches.forEach(mt => {
      const box = el(`<div class="card bmatch" style="padding:8px 10px;margin:0;font-size:.8rem;
        ${(mt.x.mine || mt.y.mine) ? 'border-color:var(--orange)' : ''}">
        <div style="padding:2px 0;${mt.winner === mt.x ? 'font-weight:700' : 'opacity:.6'}">
          ${mt.x.mine ? '🔶 ' : ''}${esc(mt.x.name)}</div>
        <div style="padding:2px 0;${mt.winner === mt.y ? 'font-weight:700' : 'opacity:.6'}">
          ${mt.y.mine ? '🔶 ' : ''}${esc(mt.y.name)}</div>
      </div>`);
      col.appendChild(box);
      matchBoxes.push({ round: r, mt, el: box });
    });
    bracket.appendChild(col);
  });
  return { wrap, bracket, svg, matchBoxes,
    async reveal() {
      const cols = bracket.querySelectorAll('.bround');
      for (const col of cols) { col.style.opacity = 1; await sleep(220); }
      await sleep(80);
      const wr = bracket.getBoundingClientRect();
      svg.setAttribute('width', bracket.scrollWidth); svg.setAttribute('height', bracket.scrollHeight);
      const cx = box => { const r = box.getBoundingClientRect();
        return { x: r.left - wr.left + r.width, y: r.top - wr.top + r.height / 2 }; };
      for (let r = 0; r < rounds.length - 1; r++) {
        rounds[r].forEach((mt, i) => {
          const from = cx(matchBoxes.find(b => b.round === r && b.mt === mt).el);
          const toBox = matchBoxes.find(b => b.round === r+1 && b.mt === rounds[r+1][Math.floor(i/2)]).el;
          const to = { x: toBox.getBoundingClientRect().left - wr.left, y: cx(toBox).y };
          const mid = (from.x + to.x) / 2;
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', `M${from.x},${from.y} H${mid} V${to.y} H${to.x}`);
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', document.body.classList.contains('ucl-mode') ? 'rgba(255,255,255,.28)' : 'var(--line)');
          path.setAttribute('stroke-width', '1.5');
          svg.appendChild(path);
        });
      }
    }
  };
}


async function screenTable(A, B) {
  setCrumb(S.leagueKey === 'WC' ? 'Group stage' : 'Predicted table');
  if (S.leagueKey === 'WC') return screenGroupTable(A, B);

  const legend = S.leagueKey === 'UCL'
    ? `<p style="display:flex;gap:14px;flex-wrap:wrap;margin:8px 0 0">
        <small><span style="display:inline-block;width:10px;height:10px;background:#22C55E;border-radius:2px;margin-right:4px"></span>Straight to Round of 16</small>
        <small><span style="display:inline-block;width:10px;height:10px;background:#3B82F6;border-radius:2px;margin-right:4px"></span>Knockout playoff round</small>
       </p>`
    : `<p style="display:flex;gap:14px;flex-wrap:wrap;margin:8px 0 0">
        <small><span style="display:inline-block;width:10px;height:10px;background:#22C55E;border-radius:2px;margin-right:4px"></span>Champions League</small>
        <small><span style="display:inline-block;width:10px;height:10px;background:#3B82F6;border-radius:2px;margin-right:4px"></span>Europa League</small>
        <small><span style="display:inline-block;width:10px;height:10px;background:#E5484D;border-radius:2px;margin-right:4px"></span>Relegation</small>
       </p>`;
  const v = el(`<section>
    <h2>Where they'd finish</h2>
    <p><small>Both XIs ranked against every squad in ${esc(LEAGUES[S.leagueKey].name)}.</small></p>
    <p id="diag"><small>Building table…</small></p>
    <table class="tbl" id="tbl"><tr><th>#</th><th>Squad</th><th>Rating</th><th>Pts</th></tr></table>
    ${legend}
    <button class="btn ghost" id="back" style="margin-top:14px">Back to the scoresheet</button>
  </section>`);
  v.querySelector('#back').onclick = () => screenResult(A, B, S.lastMatch.m);
  show(v);

  const tbl = v.querySelector('#tbl');
  const diag = v.querySelector('#diag');
  try {
    const rows = await predictTable(S.leagueKey, [
      { label: `${A.label}'s XI`, strength: A.strength },
      { label: `${B.label}'s XI`, strength: B.strength }
    ]);
    diag.innerHTML = `<small>Found ${rows.length} rows.</small>`;
    for (const r of rows) {
      const tr = document.createElement('tr');
      if (r.mine) tr.className = 'me';
      tr.style.opacity = '0'; tr.style.transform = 'translateY(6px)';
      tr.style.transition = 'opacity .32s ease,transform .32s ease';
      const cells = [r.pos, r.name, r.strength, r.pts];
      cells.forEach((val, i) => {
        const td = document.createElement('td');
        td.textContent = val === undefined ? '' : String(val);
        if (i === 0) {
          const color = rowColor(r.pos, rows.length, S.leagueKey);
          if (color) { td.style.borderLeft = `4px solid ${color}`; td.style.paddingLeft = '8px'; }
        }
        tr.appendChild(td);
      });
      tbl.appendChild(tr);
      requestAnimationFrame(() => { tr.style.opacity = '1'; tr.style.transform = 'translateY(0)'; });
      await sleep(65);
    }
    diag.remove();
    if (rows.length && S.leagueKey === 'UCL') {
      v.insertAdjacentHTML('beforeend', '<button class="btn primary" id="toko" style="margin-top:14px">See the knockout bracket</button>');
      v.querySelector('#toko').onclick = () => screenKnockout(A, B, rows);
    }
  } catch (e) {
    diag.innerHTML = `<small>Table error: ${esc(String(e && e.stack || e))}</small>`;
  }
}

/* World Cup: the real tournament has no single combined table — just
 * groups of 4, three games each. Show the one or two groups that
 * actually matter here (each XI's group, by whichever nation supplied
 * most of its players) instead of a flat, unrealistic ranking. */
async function screenGroupTable(A, B) {
  const v = el(`<section>
    <h2>Group stage</h2>
    <p id="diag"><small>Building group table…</small></p>
    <div id="groups"></div>
    <p style="display:flex;gap:14px;flex-wrap:wrap;margin:8px 0 0">
      <small><span style="display:inline-block;width:10px;height:10px;background:#22C55E;border-radius:2px;margin-right:4px"></span>Advances from group</small>
    </p>
    <button class="btn primary" id="toko" style="margin-top:14px">See the knockout bracket</button>
    <button class="btn ghost" id="back" style="margin-top:10px">Back to the scoresheet</button>
  </section>`);
  v.querySelector('#back').onclick = () => screenResult(A, B, S.lastMatch.m);
  show(v);
  const diag = v.querySelector('#diag'), groupsEl = v.querySelector('#groups');
  let rows;
  try {
    rows = await predictTable('WC', [
      { label: `${A.label}'s XI`, strength: A.strength },
      { label: `${B.label}'s XI`, strength: B.strength }
    ]);
  } catch (e) {
    diag.innerHTML = `<small>Table error: ${esc(String(e && e.stack || e))}</small>`;
    return;
  }
  diag.remove();

  const labelA = `${A.label}'s XI`, labelB = `${B.label}'s XI`;
  const repA = representedNation(A), repB = representedNation(B);
  const gA = WC_GROUPS[repA] || '?', gB = WC_GROUPS[repB] || '?';
  rows.forEach(r => {
    if (r.mine) r.group = r.name === labelA ? gA : gB;
    else r.group = WC_GROUPS[r.name] || null;
  });

  const needed = gA === gB ? [gA] : [gA, gB];
  for (const letter of needed) {
    const curated = rows.filter(r => r.group === letter).sort((a, b) => b.strength - a.strength);
    const fillers = (WC_GROUP_FILLERS[letter] || []).slice(0, Math.max(0, 4 - curated.length))
      .map(f => ({ ...f, pts: Math.round(f.strength * 0.18 - 9) }));
    const members = [...curated, ...fillers].sort((a, b) => b.strength - a.strength);
    const card = el('<div class="card"><h3>Group ' + letter + '</h3><table class="tbl"><tr><th>#</th><th>Squad</th><th>Rating</th><th>Pts</th></tr></table></div>');
    groupsEl.appendChild(card);
    const t = card.querySelector('table');
    members.forEach((r, i) => {
      const tr = document.createElement('tr');
      if (r.mine) tr.className = 'me';
      [i + 1, r.name, r.strength, r.pts || 0].forEach((val, ci) => {
        const td = document.createElement('td');
        td.textContent = String(val);
        if (ci === 0 && i < 2) { td.style.borderLeft = '4px solid #22C55E'; td.style.paddingLeft = '8px'; }
        tr.appendChild(td);
      });
      t.appendChild(tr);
    });
  }
  v.querySelector('#toko').onclick = () => {
    const seen = new Set(rows.map(r => r.name));
    const fill = [];
    Object.values(WC_GROUP_FILLERS).flat().forEach(f => {
      if (!seen.has(f.name)) { seen.add(f.name); fill.push({ name: f.name, strength: f.strength }); }
    });
    try { screenKnockout(A, B, [...rows, ...fill]); } catch (e) { knockoutError(A, B, e); }
  };
}

// Left-edge status colour for a table row — mirrors how real league and
// UCL tables mark qualification/relegation zones.
function rowColor(pos, total, leagueKey) {
  if (leagueKey === 'UCL') {
    if (pos <= 8) return '#22C55E';   // straight to Round of 16
    if (pos <= 24) return '#3B82F6';  // knockout playoff round
    return null;                      // eliminated
  }
  if (pos <= 4) return '#22C55E';     // Champions League
  if (pos === 5) return '#3B82F6';    // Europa League
  if (pos > total - 3) return '#E5484D'; // relegation, bottom 3
  return null;
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
  v.querySelector('#back').onclick = () => screenResult(A, B, S.lastMatch.m);
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
  }, 1000);
}
function stopPoll() { if (S.poll) clearInterval(S.poll); S.poll = null; }

async function publishSquad() {
  const p = me();
  const payload = {
    label: p.label, formation: p.formation,
    badge: { home: p.badge.home, away: p.badge.away, name: p.badge.name },
    strength: p.strength,
    xi: p.xi.map(s => ({ role:s.role, x:s.x, y:s.y, player:{
      name:s.player.name, number:s.player.number, rating:s.player.rating,
      club:{ name:s.player.club.name, home:s.player.club.home, away:s.player.club.away } } }))
  };

  // Show the waiting screen — no internal poll inside screenWait here,
  // we manage one clean poll ourselves below so they can't fight.
  show(el(`<section><h2>Squad locked in</h2>
    <p>Waiting for your opponent to finish building their XI…</p>
    <div class="bar"><i style="width:40%"></i></div></section>`));

  const submitRes = await api({ action:'submit', code:S.room.code, seat:S.room.seat, squad:payload });
  if (!submitRes || !submitRes.ok) { toast('Submit failed — check your connection.'); return; }

  function tryAdvance(st) {
    if (!st || !st.squads) return false;
    const otherSeat = S.room.seat === 0 ? 1 : 0;
    const other = st.squads[otherSeat];
    if (!other || !other.xi || !other.xi.length) return false;
    stopPoll();
    const opp = S.players[otherSeat];
    opp.label     = other.label     || opp.label;
    opp.formation = other.formation;
    opp.badge     = other.badge     || { home:'#888', away:'#fff', name:'' };
    opp.strength  = other.strength;
    opp.xi        = other.xi.map(s => ({
      ...s, player: { ...s.player,
        club: s.player.club || { name:'', home:'#888', away:'#fff' }
      }
    }));
    // Always match: seat-0 as home (players[0]) vs seat-1 as away (players[1])
    startMatch(S.players[0], S.players[1]);
    return true;
  }

  // If the opponent already submitted before we did, their squad is
  // already in the response — no need to poll at all.
  if (tryAdvance(submitRes.state)) return;

  // Otherwise poll every 1.5s until their squad arrives.
  S.poll = setInterval(async () => {
    const r = await api({ action:'state', code:S.room.code });
    if (r && r.ok) tryAdvance(r.state);
  }, 1500);
}

/* ------------------------------------------------------------------ */
screenMode();
