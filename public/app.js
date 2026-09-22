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
  // All-time great sides — real squads, real shirt numbers, from that season.
  LEG: { id: 0, name: 'Legends', country: 'All-time greats', tint: '#B8892B', clubs: [
    ['Barcelona 2010–11','#A50044','#004D98',1],['Brazil 2002','#FFDF00','#009C3B',1],
    ['Man United 1998–99','#DA291C','#000000',1],['Arsenal 2003–04','#EF0107','#023474',1],
    ['Real Madrid 2016–17','#FFFFFF','#00529F',1],['Spain 2010','#C60B1E','#FFC400',1],
    ['Germany 2014','#FFFFFF','#000000',1],['France 1998','#002654','#ED2939',1],
    ['Italy 2006','#0066CC','#FFFFFF',1],['Bayern 2012–13','#DC052D','#0066B2',1],
    ['Chelsea 2004–05','#034694','#FFFFFF',1],['Liverpool 2019–20','#C8102E','#00B2A9',1],
    ['Man City 2017–18','#6CABDD','#1C2C5B',1],['Inter 2009–10','#0068A8','#000000',1],
    ['AC Milan 2006–07','#FB090B','#000000',1],
    ['Real Madrid 2013–14','#FFFFFF','#00529F',1],
    ['Barcelona 2014–15','#A50044','#004D98',1],
    ['Brazil 1970','#FFDF00','#009C3B',1],
    ['Argentina 1986','#75AADB','#FFFFFF',1],
    ['Argentina 2022','#75AADB','#FFFFFF',1],
    ['Man United 2007–08','#DA291C','#000000',1],
    ['Liverpool 2004–05','#C8102E','#FFFFFF',1],
    ['Arsenal 2005–06','#9C1C2E','#FFFFFF',1],
    ['Tottenham 2018–19','#FFFFFF','#132257',1],
    ['Tottenham 2016–17','#FFFFFF','#132257',1]
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
const CURATED_LEAGUES = { PL: '/data/pl.json', UCL: '/data/ucl.json', WC: '/data/wc.json', LEG: '/data/leg.json' };
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
// Same seed → same sequence on every device, so an online match plays out
// identically on both phones.
function seededRng(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function describeGoal(rand = Math.random) {
  const r = rand();
  const method = r < 0.11 ? 'penalty' : r < 0.19 ? 'freekick' : 'open';
  const corner = GOAL_CORNERS[Math.floor(rand() * GOAL_CORNERS.length)];
  if (method === 'penalty') return { method, desc: 'scores from the penalty spot' };
  if (method === 'freekick') return { method, desc: `scores, ${corner}, direct free-kick from outside the box` };
  const origin = rand() < 0.32 ? 'from outside the box' : 'from inside the box';
  return { method, desc: `scores, ${corner}, ${origin}` };
}

// Rivalries: each side drafts only from its own history.
const RIVALRIES = [
  { id: 'nld', name: 'North London derby', sides: [
    { label: 'Arsenal', color: '#EF0107', clubs: ['Arsenal 2003–04', 'Arsenal 2005–06'] },
    { label: 'Tottenham', color: '#132257', clubs: ['Tottenham 2018–19', 'Tottenham 2016–17'] }] },
  { id: 'clasico', name: 'El Clásico', sides: [
    { label: 'Real Madrid', color: '#FEBE10', clubs: ['Real Madrid 2016–17', 'Real Madrid 2013–14'] },
    { label: 'Barcelona', color: '#A50044', clubs: ['Barcelona 2010–11', 'Barcelona 2014–15'] }] },
  { id: 'sa', name: 'Argentina v Brazil', sides: [
    { label: 'Argentina', color: '#75AADB', clubs: ['Argentina 2022', 'Argentina 1986'] },
    { label: 'Brazil', color: '#FFDF00', clubs: ['Brazil 2002', 'Brazil 1970'] }] },
  { id: 'nwd', name: 'North West derby', sides: [
    { label: 'Man United', color: '#DA291C', clubs: ['Man United 1998–99', 'Man United 2007–08'] },
    { label: 'Liverpool', color: '#C8102E', clubs: ['Liverpool 2019–20', 'Liverpool 2004–05'] }] },
  { id: 'milan', name: 'Derby della Madonnina', sides: [
    { label: 'AC Milan', color: '#FB090B', clubs: ['AC Milan 2006–07'] },
    { label: 'Inter', color: '#0068A8', clubs: ['Inter 2009–10'] }] }
];
const rivalry = () => RIVALRIES.find(r => r.id === S.rivalry) || null;
// Which clubs this player can spin: their side of the rivalry, or the whole league.
const clubsFor = i => { const r = rivalry(); return r ? (S.leagueClubs || []).filter(c => r.sides[i].clubs.includes(c.name)) : S.leagueClubs; };
// A league "token" travels to the room: 'PL', 'WC' … or 'RIV:clasico'.
const leagueToken = () => S.rivalry ? 'RIV:' + S.rivalry : S.leagueKey;
async function useLeague(tok) {
  if (tok && String(tok).startsWith('RIV:')) { S.rivalry = tok.slice(4); S.leagueKey = 'LEG'; }
  else { S.rivalry = null; S.leagueKey = tok; }
  if (S.leagueKey) { setLeagueTheme(S.leagueKey); S.leagueClubs = await getLeagueClubs(S.leagueKey); }
}

// Real elite referees, matched to the competition.
const REFEREES = {
  PL: [['Michael Oliver', 'ENG'], ['Anthony Taylor', 'ENG'], ['Simon Hooper', 'ENG'], ['Chris Kavanagh', 'ENG'], ['Paul Tierney', 'ENG'],
       ['Stuart Attwell', 'ENG'], ['Craig Pawson', 'ENG'], ['Andy Madley', 'ENG'], ['Jarred Gillett', 'AUS'], ['Robert Jones', 'ENG']],
  EU: [['Szymon Marciniak', 'POL'], ['Clément Turpin', 'FRA'], ['François Letexier', 'FRA'], ['Slavko Vinčić', 'SVN'], ['Danny Makkelie', 'NED'],
       ['Michael Oliver', 'ENG'], ['Anthony Taylor', 'ENG'], ['István Kovács', 'ROU'], ['Davide Massa', 'ITA'], ['Felix Zwayer', 'GER'], ['Jesús Gil Manzano', 'ESP']],
  WC: [['Szymon Marciniak', 'POL'], ['Facundo Tello', 'ARG'], ['Wilton Sampaio', 'BRA'], ['Ismail Elfath', 'USA'], ['Clément Turpin', 'FRA'],
       ['Danny Makkelie', 'NED'], ['Michael Oliver', 'ENG'], ['Mustapha Ghorbal', 'ALG'], ['Abdulrahman Al-Jassim', 'QAT'], ['Slavko Vinčić', 'SVN']]
};

// Match-day conditions. Each nudges the numbers a little, and shows on the
// tactics board.
const WEATHER = {
  clear: { icon: '☀️', label: 'Clear', line: 'Perfect conditions for football.' },
  rain:  { icon: '🌧️', label: 'Rain', line: 'Rain lashing down — the ball is skidding off the surface.' },
  snow:  { icon: '❄️', label: 'Snow', line: "Snow falling — it's the orange ball tonight." },
  heavy: { icon: '🟫', label: 'Heavy pitch', line: 'A heavy, cut-up pitch — hard going for everyone.' },
  wind:  { icon: '💨', label: 'Windy', line: 'A swirling wind — long balls are a lottery.' }
};

// Expected goals over 90 minutes for these two XIs in these conditions.
function xgFor(A, B, weather, wind) {
  let xgA = Math.max(0.18, 1.34 * Math.pow(A.strength.att / B.strength.def, 2.1));
  let xgB = Math.max(0.18, 1.18 * Math.pow(B.strength.att / A.strength.def, 2.1));
  if (weather === 'rain') { xgA *= 1.08; xgB *= 1.08; }            // skiddy — more chances
  if (weather === 'snow') { xgA *= 0.85; xgB *= 0.85; }            // fewer clean chances
  if (weather === 'heavy') {                                        // a leveller: quality counts for less
    const avg = (xgA + xgB) / 2; xgA = (xgA * 0.75 + avg * 0.25) * 0.9; xgB = (xgB * 0.75 + avg * 0.25) * 0.9;
  }
  if (wind) { xgA *= wind[0]; xgB *= wind[1]; }                     // anything can happen
  return [xgA, xgB];
}
// Who scores: strikers most, defenders rarely, never the keeper.
const makeScorer = rnd => squad => {
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

function simulate(A, B, seed) {
  const rnd = seed ? seededRng(seed) : Math.random;
  const wr = rnd();
  const weather = wr < 0.55 ? 'clear' : wr < 0.75 ? 'rain' : wr < 0.83 ? 'snow' : wr < 0.93 ? 'heavy' : 'wind';
  const wind = weather === 'wind' ? [0.85 + rnd() * 0.3, 0.85 + rnd() * 0.3] : null;
  const [xgA, xgB] = xgFor(A, B, weather, wind);
  const gA = Math.min(7, poisson(xgA, rnd)), gB = Math.min(7, poisson(xgB, rnd));

  const mins = new Set();
  const nextMin = () => { let m; do { m = 3 + Math.floor(rnd() * 89); } while (mins.has(m)); mins.add(m); return m; };
  const events = [];

  const scorerFor = makeScorer(rnd);

  const push = (side, squad, n, type) => {
    for (let i = 0; i < n; i++) {
      const s = scorerFor(squad);
      const ev = { side, min: nextMin(), type, player: s.player.name };
      if (type === 'goal') Object.assign(ev, describeGoal(rnd));
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
  // VAR: some goals get a check and stand; now and then a goal is ruled out.
  const VAR_WHY = [['offside', 'Checking a possible offside'], ['handball', 'Possible handball in the build-up'], ['foul', 'Checking for a foul in the build-up']];
  events.forEach(e => { if (e.type === 'goal' && e.method !== 'penalty' && rnd() < 0.15) e.var = VAR_WHY[Math.floor(rnd() * 3)][0]; });
  if (rnd() < 0.3) {
    const side = rnd() < xgA / (xgA + xgB) ? 'home' : 'away';
    const s = scorerFor(side === 'home' ? A : B);
    events.push({ side, min: nextMin(), type: 'noGoal', player: s.player.name, reason: VAR_WHY[Math.floor(rnd() * 3)][0] });
  }
  events.sort((a, b) => a.min - b.min);
  const refs = REFEREES[S.leagueKey === 'PL' ? 'PL' : S.leagueKey === 'WC' ? 'WC' : 'EU'];
  const referee = refs[Math.floor(rnd() * refs.length)];

  // Level after 90? Two 15-minute halves of extra time (tired legs, fewer
  // chances), and if it's still level — penalties.
  let fa = gA, fb = gB, pens = null;
  const et = gA === gB;
  if (et) {
    const ea = Math.min(3, poisson(xgA * 0.3, rnd)), eb = Math.min(3, poisson(xgB * 0.3, rnd));
    [['home', A, ea], ['away', B, eb]].forEach(([side, sq, n]) => {
      for (let i = 0; i < n; i++) {
        const ev = { side, min: 91 + Math.floor(rnd() * 29), type: 'goal', player: scorerFor(sq).player.name, et: true };
        Object.assign(ev, describeGoal(rnd));
        events.push(ev);
      }
    });
    fa += ea; fb += eb;
    events.sort((a, b) => (a.et ? 1 : 0) - (b.et ? 1 : 0) || a.min - b.min);
    if (fa === fb) {
      const so = shootout(A, B, seed ? seededRng(seed + '|pens') : Math.random);
      pens = { a: so.a, b: so.b, kicks: so.kicks };
    }
  }

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

  const winSide = fa > fb ? 'home' : fa < fb ? 'away' : pens ? (pens.a > pens.b ? 'home' : 'away') : null;
  return { gA: fa, gB: fb, ft: { a: gA, b: gB }, et, pens, winSide, events, stats, xgA, xgB, weather, wind, referee, seed: seed || null, subs: [] };
}

/* ------------------------------------------------------------------ *
 * SUBSTITUTIONS
 * Only at half-time, at the end of 90 minutes (before extra time) and at
 * 105 minutes — five changes at most. Everything that already happened
 * stays; everything after the break is played again with the new XIs.
 * ------------------------------------------------------------------ */
const MAX_SUBS = 5;
// Seven subs from the clubs this XI was drafted from: 1 keeper, 2 each of
// defenders, midfielders and attackers. Real squad players, never invented.
async function ensureBench(team, other) {
  if (team.bench) return team.bench;
  const inXI = new Set([...team.xi, ...(other ? other.xi : [])].map(s => norm(s.player.name)));
  (other && other.bench || []).forEach(b => inXI.add(norm(b.name)));
  const clubs = [];
  team.xi.forEach(s => { const cl = s.player.club; if (cl && cl.name && !clubs.some(x => x.name === cl.name)) clubs.push(cl); });
  const pool = [];
  for (const cl of clubs) {
    let squad = cl.squad;
    if (!squad) { try { squad = await getSquad(S.leagueKey, cl); } catch (e) { squad = []; } }
    (squad || []).forEach(pl => {
      if (inXI.has(norm(pl.name)) || pool.some(x => norm(x.name) === norm(pl.name))) return;
      pool.push({ name: pl.name, number: pl.number, rating: pl.rating, position: pl.position,
        club: { name: cl.name, home: cl.home, away: cl.away } });
    });
  }
  const take = (pos, n) => pool.filter(p => pos.includes(p.position)).sort((a, b) => b.rating - a.rating).slice(0, n);
  team.bench = [...take(['Goalkeeper'], 1), ...take(['Defender'], 2), ...take(['Midfielder'], 2), ...take(['Attacker'], 2)];
  return team.bench;
}
// Bench players who can fill this shirt.
const subsFor = (team, slot) => (team.bench || []).filter(b => ELIGIBLE[GROUP[slot.role]].includes(b.position));
function applySub(team, side, slotIdx, onName, min, m) {
  const i = (team.bench || []).findIndex(b => b.name === onName);
  if (i < 0 || (team.subsMade || 0) >= MAX_SUBS) return null;
  const slot = team.xi[slotIdx], incoming = team.bench[i];
  team.bench.splice(i, 1);
  team.xi[slotIdx] = { ...slot, player: { ...incoming, rating: getRating(incoming, GROUP[slot.role]) } };
  team.subsMade = (team.subsMade || 0) + 1;
  team.strength = rateSquad(team.xi);
  const rec = { side, min, off: slot.player.name, on: incoming.name, slot: slotIdx };
  m.subs.push(rec);
  return rec;
}
// The computer's changes: freshen up the weakest outfield spots.
function autoSubs(team, fromMin, rng) {
  const want = fromMin === 45 ? (rng() < 0.5 ? 1 : 0) : fromMin === 90 ? 1 + (rng() < 0.5 ? 1 : 0) : (rng() < 0.5 ? 1 : 0);
  const out = [];
  const bench = (team.bench || []).slice();
  const order = team.xi.map((s, i) => ({ s, i })).filter(x => GROUP[x.s.role] !== 'GK').sort((a, b) => a.s.player.rating - b.s.player.rating);
  for (const { s, i } of order) {
    if (out.length >= Math.min(want, MAX_SUBS - (team.subsMade || 0))) break;
    const cand = bench.filter(b => ELIGIBLE[GROUP[s.role]].includes(b.position) && getRating(b, GROUP[s.role]) >= s.player.rating - 3)
      .sort((a, b) => b.rating - a.rating)[0];
    if (!cand) continue;
    bench.splice(bench.indexOf(cand), 1);
    out.push({ slot: i, on: cand.name });
  }
  return out;
}

// Play the rest of the match again from a break, with whoever is on now.
// Events already seen are kept exactly as they were.
function resimulate(m, A, B, fromMin, tag) {
  const rnd = m.seed ? seededRng(`${m.seed}|resim|${fromMin}|${tag}`) : Math.random;
  const keep = m.events.filter(e => fromMin === 45 ? (!e.et && e.min <= 45) : fromMin === 90 ? !e.et : (!e.et || e.min <= 105));
  const [xa, xb] = xgFor(A, B, m.weather, m.wind);
  const fresh = t => 1 + 0.03 * (t.subsMade || 0);          // fresh legs help a little
  const scorer = makeScorer(rnd);
  const usedMins = new Set(keep.map(e => e.min));
  const minIn = (lo, hi) => { let x, n = 0; do { x = lo + Math.floor(rnd() * (hi - lo + 1)); } while (usedMins.has(x) && ++n < 60); usedMins.add(x); return x; };
  const events = keep.slice();
  const addGoals = (side, team, n, lo, hi, et) => {
    for (let i = 0; i < n; i++) {
      const ev = { side, min: minIn(lo, hi), type: 'goal', player: scorer(team).player.name };
      Object.assign(ev, describeGoal(rnd));
      if (et) ev.et = true; else if (ev.method !== 'penalty' && rnd() < 0.15) ev.var = ['offside', 'handball', 'foul'][Math.floor(rnd() * 3)];
      events.push(ev);
    }
  };
  if (fromMin === 45) {
    addGoals('home', A, Math.min(5, poisson(xa * 0.5 * fresh(A), rnd)), 46, 90);
    addGoals('away', B, Math.min(5, poisson(xb * 0.5 * fresh(B), rnd)), 46, 90);
    [['home', A], ['away', B]].forEach(([side, t]) => {
      if (rnd() < 0.4) events.push({ side, min: minIn(46, 90), type: 'card', player: t.xi[1 + Math.floor(rnd() * 10)].player.name });
    });
    if (rnd() < 0.15) {
      const side = rnd() < xa / (xa + xb) ? 'home' : 'away';
      events.push({ side, min: minIn(46, 90), type: 'noGoal', player: scorer(side === 'home' ? A : B).player.name, reason: ['offside', 'handball', 'foul'][Math.floor(rnd() * 3)] });
    }
  }
  const count = (side, pred) => events.filter(e => e.type === 'goal' && e.side === side && pred(e)).length;
  const ftA = count('home', e => !e.et), ftB = count('away', e => !e.et);
  let pens = null;
  const et = ftA === ftB;
  if (et) {
    if (fromMin <= 90) {
      addGoals('home', A, Math.min(3, poisson(xa * 0.3 * fresh(A), rnd)), 91, 119, true);
      addGoals('away', B, Math.min(3, poisson(xb * 0.3 * fresh(B), rnd)), 91, 119, true);
    } else {
      addGoals('home', A, Math.min(2, poisson(xa * 0.15 * fresh(A), rnd)), 106, 119, true);
      addGoals('away', B, Math.min(2, poisson(xb * 0.15 * fresh(B), rnd)), 106, 119, true);
    }
  }
  const gA = count('home', () => true), gB = count('away', () => true);
  if (et && gA === gB) {
    const so = shootout(A, B, m.seed ? seededRng(`${m.seed}|pens|${fromMin}|${tag}`) : Math.random);
    pens = { a: so.a, b: so.b, kicks: so.kicks };
  }
  events.sort((a, b) => (a.et ? 1 : 0) - (b.et ? 1 : 0) || a.min - b.min);
  const winSide = gA > gB ? 'home' : gA < gB ? 'away' : pens ? (pens.a > pens.b ? 'home' : 'away') : null;
  Object.assign(m, { gA, gB, ft: { a: ftA, b: ftB }, et, pens, winSide, events });
  delete m.ratings; delete m.pundit;
  return m;
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
  const games = leagueKey === 'UCL' ? 8 : leagueKey === 'WC' ? 3 : leagueKey === 'LEG' ? 16 : 38;
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
const S = { mode:null, leagueKey:null, players:[], turn:0, room:null, poll:null, lastMatch:null, penaltyOnly:false };

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
    <p>Premier League, Champions League night, the World Cup, or the all-time Legends. Spin a formation, then spin your way through eleven shirts — five rerolls for the whole XI — then watch the match.</p>
    <button class="btn primary" data-m="ai">Play the AI<span class="sub">Instant opponent, builds its own XI</span></button>
    <button class="btn" data-m="pass">Pass and play<span class="sub">Two of you, one phone</span></button>
    <button class="btn ghost" data-m="host">Start an online room<span class="sub">Share a four-letter code</span></button>
    <button class="btn ghost" data-m="join">Join with a code</button>
    <div class="row" style="display:flex;gap:8px">
      <button class="btn ghost" id="quiz" style="flex:1;width:auto">🧠 Guess the XI<span class="sub">Name the players</span></button>
      <button class="btn ghost" id="nameteam" style="flex:1;width:auto">🔎 Name the team<span class="sub">Spot the side</span></button>
    </div>
    <div class="row" style="display:flex;gap:8px">
      <button class="btn ghost" id="hof" style="flex:1;width:auto">🏆 Hall of fame</button>
      <button class="btn ghost" id="h2h" style="flex:1;width:auto">🤝 Head-to-head</button>
    </div>
    <button class="btn ghost" id="pens">🥅 Penalty Shootout<span class="sub">Skip straight to spot-kicks — vs AI, pass and play, or a room code</span></button>
    <button class="btn ghost" id="howto">How to play</button>
  </section>`);
  v.querySelector('#hof').onclick = screenHallOfFame;
  v.querySelector('#quiz').onclick = () => screenQuiz();
  v.querySelector('#nameteam').onclick = () => screenNameTeam();
  v.querySelector('#h2h').onclick = screenH2H;
  v.querySelector('#pens').onclick = screenPenaltyMode;
  v.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    S.penaltyOnly = false;
    S.mode = b.dataset.m;
    if (b.dataset.m === 'join') return screenJoin();
    screenLeague();
  });
  v.querySelector('#howto').onclick = screenTutorial;
  show(v);
}

/* --- penalty shootout mode: same code system and squad-build flow as a
 * full match, just no 90 minutes first — build (or auto-fill) an XI on
 * each side, then go straight to the spot-kicks. */
function screenPenaltyMode() {
  theme(null); setCrumb('Penalty Shootout');
  const v = el(`<section>
    <h1>🥅 Penalty Shootout</h1>
    <p>Spin a quick XI each — or skip that too — then it's straight to the spot: tap to aim, tap to guess the save.</p>
    <button class="btn primary" data-m="ai">Play the AI<span class="sub">You build an XI, the AI builds its own</span></button>
    <button class="btn" data-m="pass">Pass and play<span class="sub">Two of you, one phone</span></button>
    <button class="btn ghost" data-m="host">Start an online room<span class="sub">Share a four-letter code</span></button>
    <button class="btn ghost" data-m="join">Join with a code</button>
    <button class="btn ghost" id="simulate">⚡ Simulate a shootout<span class="sub">Two random XIs, straight to the final score</span></button>
    <button class="btn ghost" id="back">Back</button>
  </section>`);
  v.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
    S.penaltyOnly = true;
    S.mode = b.dataset.m;
    if (b.dataset.m === 'join') return screenJoin();
    screenLeague();
  });
  v.querySelector('#simulate').onclick = () => simulatePenaltyShootout();
  v.querySelector('#back').onclick = screenMode;
  show(v);
}

// Two instantly-built random XIs, straight to a shootout result — no
// spinning, no taps, just the outcome.
async function simulatePenaltyShootout() {
  theme(null); setCrumb('Penalty Shootout');
  show(el('<section><h2>Simulating…</h2><p>Building two random XIs…</p></section>'));
  const keys = Object.keys(LEAGUES);
  const leagueKey = keys[Math.floor(Math.random() * keys.length)];
  await useLeague(leagueKey);
  const A = mkPlayer('Side A'), B = mkPlayer('Side B');
  await buildAI(A, async () => {});
  await buildAI(B, async () => {});
  const so = shootout(A, B, Math.random);
  const win = so.a > so.b ? A : B;
  const v = el(`<section>
    <h2>${esc(win.label)} win it!</h2>
    <p style="text-align:center"><small>${esc(A.label)} ${so.a}–${so.b} ${esc(B.label)} on penalties.</small></p>
    <div class="card" style="text-align:center">
      <div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:2.4rem">${so.a} – ${so.b}</div>
    </div>
    <button class="btn primary" id="again">Simulate another</button>
    <button class="btn ghost" id="home">Home</button>
  </section>`);
  v.querySelector('#again').onclick = () => simulatePenaltyShootout();
  v.querySelector('#home').onclick = screenMode;
  show(v);
}

// The shootout-only match: builds finish as normal, then this runs
// instead of a 90-minute simulation. Online/spectate stay on the same
// seeded, non-interactive plan a full match's penalties would use (no
// real-time tap syncing between two devices yet) — vs AI and pass and
// play are fully interactive.
function startPenaltyOnly(A, B, seed) {
  setCrumb('Penalty Shootout');
  const m = { seed, gA: 0, gB: 0, ft: { a: 0, b: 0 }, et: true, pens: null, penaltyOnly: true };
  const humanSide = side => S.mode === 'online' ? side === (S.room && S.room.seat === 1 ? 'away' : 'home')
    : S.mode === 'spectate' ? false
    : S.mode === 'ai' ? side === 'home' : true;
  screenPenalties(A, B, m, (a, b) => screenPenaltyOnlyResult(A, B, a, b, m), humanSide);
}

function screenPenaltyOnlyResult(A, B, a, b, m) {
  setCrumb('Penalty Shootout');
  m.gA = a; m.gB = b; m.winSide = a > b ? 'home' : 'away';
  const win = a > b ? A : B;
  const h2h = recordH2H(A, B, m);
  const v = el(`<section>
    <h2>${esc(win.label)} win it!</h2>
    <p style="text-align:center"><small>${esc(A.label)} ${a}–${b} ${esc(B.label)} on penalties.</small></p>
    <div class="card" style="text-align:center">
      <div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:2.4rem">${a} – ${b}</div>
    </div>
    ${h2h ? `<div class="card"><h3>Head-to-head vs ${esc(h2h.name)}</h3><p style="margin:0">${h2hLine(h2h)}</p></div>` : ''}
    <button class="btn primary" id="again">Another shootout</button>
    <button class="btn ghost" id="home">Home</button>
  </section>`);
  v.querySelector('#again').onclick = () => { S.penaltyOnly = true; screenLeague(); };
  v.querySelector('#home').onclick = () => { S.penaltyOnly = false; screenMode(); };
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
  v.querySelector('#go').onclick = () => joinRoom(v.querySelector('#code').value.trim().toUpperCase());
  show(v);
}

// Join a room by code — from the join screen, or straight from a scanned
// QR code / invite link (?join=CODE).
async function joinRoom(code) {
  if (code.length !== 4) return toast('Codes are four letters.');
  const r0 = await api({ action:'state', code });
  if (!r0 || !r0.ok) return toast('No room with that code.');
  if (r0.state.players >= 2) { toast('That room is full — watching instead.'); return screenSpectate(code); }
  screenNickname('Challenger', async name => {
    const r = await api({ action:'join', code, name });
    if (!r || !r.ok) return toast('No room with that code.');
    if (r.full) { toast('That room just filled up — watching instead.'); return screenSpectate(code); }
    S.mode = 'online'; S.room = { code, seat: 1, joinId: r.joinId }; S.myName = name;
    S.players = [];
    await useLeague(r.state.league);
    screenLobbyWait();
  });
}

// The joiner's lobby: in the room, waiting for the host to press Start.
function screenLobbyWait() {
  setCrumb(`Room ${S.room.code}`);
  const r = rivalry();
  const v = el(`<section><h2>You're in!</h2>
    <p>Room <b>${esc(S.room.code)}</b> · ${esc(r ? r.name : (LEAGUES[S.leagueKey] || {}).name || '')}${r ? ` — you're <b>${esc(r.sides[1].label)}</b>` : ''}</p>
    <div class="card" style="text-align:center"><div class="bar"><i style="width:40%;animation:pmcount 2s ease-in-out infinite alternate"></i></div>
      <p style="margin:10px 0 0">Waiting for the host to start the match…</p></div>
    <button class="btn ghost" id="leave">Leave room</button></section>`);
  v.querySelector('#leave').onclick = () => { stopPoll(); S.room = null; S.mode = null; screenMode(); };
  show(v);
  poll(st => {
    if (st.joinId !== S.room.joinId) {            // the host removed us
      stopPoll(); toast('The host removed you from the room.'); S.room = null; S.mode = null; return screenMode();
    }
    if (st.started) { stopPoll(); startTurns(); }
  });
}

async function afterLeaguePicked() {
  if (S.mode === 'host') {
    const r = await api({ action:'create', league: leagueToken() });
    if (!r || !r.ok) return toast('Could not open a room. Check your connection.');
    S.mode = 'online'; S.room = { code:r.code, seat:0, hostKey:r.hostKey };
    return screenRoomCode();
  }
  startTurns();
}

function screenRivalry() {
  setCrumb('Rivalry');
  const v = el(`<section><h2>Pick a rivalry</h2>
    <p>${S.mode === 'ai' ? "You take the first side, the AI the second." : 'Player 1 takes the first side, player 2 the second.'}
      Each side spins only its own famous squads.</p>
    <div id="rivs"></div><button class="btn ghost" id="back">Back</button></section>`);
  RIVALRIES.forEach(r => {
    const b = el(`<button class="league-btn"><span class="flagdot" style="background:linear-gradient(90deg,${r.sides[0].color} 50%,${r.sides[1].color} 50%)"></span>
      <span><b>${esc(r.name)}</b><small>${esc(r.sides[0].label)} v ${esc(r.sides[1].label)} · ${[...r.sides[0].clubs, ...r.sides[1].clubs].map(c => c.replace(/^.* /, '')).join(', ')}</small></span></button>`);
    b.onclick = async () => { await useLeague('RIV:' + r.id); afterLeaguePicked(); };
    v.querySelector('#rivs').appendChild(b);
  });
  v.querySelector('#back').onclick = screenLeague;
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
    b.onclick = async () => { await useLeague(k); afterLeaguePicked(); };
    wrap.appendChild(b);
  });
  const rb = el(`<button class="league-btn"><span class="flagdot" style="background:linear-gradient(90deg,#EF0107 50%,#132257 50%)"></span>
    <span><b>⚔️ Rivalry</b><small>Real rivalries · each side drafts from its own history</small></span></button>`);
  rb.onclick = screenRivalry;
  wrap.appendChild(rb);
  v.querySelector('#back').onclick = screenMode;
  show(v);
}

// Spectator link + QR: opens the room in watch-only mode.
const watchLink = code => `${location.origin}${location.pathname}?watch=${code}`;
function showWatchQR(box, code) {
  box.innerHTML = `<div class="card" style="text-align:center">${qrSVG(watchLink(code), 200)}
    <p style="margin:8px 0 0"><small>Friends scan this to watch the draft and the match live.</small></p></div>`;
}

/* --- spectator prediction game ------------------------------------ *
 * Exact score = 3 points, right result = 1. Predictions lock at kick-off,
 * and nobody sees anyone else's numbers until then. */
const predPoints = (p, gA, gB) => (p.h === gA && p.a === gB) ? 3 : Math.sign(p.h - p.a) === Math.sign(gA - gB) ? 1 : 0;
async function fillPredictions(box, m, A, B) {
  const r = await api({ action:'state', code:S.room.code });
  const preds = (r && r.ok && r.state.preds || []).filter(p => p.h != null);
  if (!preds.length) return;
  const me = store.get('sp1nxi-name', '');
  const rows = preds.map(p => ({ ...p, pts: predPoints(p, m.gA, m.gB) })).sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name));
  box.innerHTML = `<div class="card"><h3>🔮 Prediction leaderboard</h3>
    <p style="margin:0 0 6px"><small>Exact score 3 pts · right result 1 pt · final ${m.gA}–${m.gB}</small></p>
    ${rows.map((p, i) => `<div style="display:flex;gap:10px;align-items:center;padding:4px 0;${p.name === me ? 'font-weight:800' : ''}">
      <span style="min-width:1.4em">${i === 0 && p.pts ? '🥇' : i + 1}</span><span style="flex:1">${esc(p.name)}</span>
      <small>${p.h}–${p.a}</small><b style="min-width:3.2em;text-align:right">${p.pts} pt${p.pts === 1 ? '' : 's'}</b></div>`).join('')}</div>`;
}

// Watch a room: both XIs fill in live, then the same match plays out.
function screenSpectate(code) {
  S.mode = 'spectate'; S.room = { code, seat: -1 }; S.players = [];
  theme(null); setCrumb(`Watching ${code}`);
  const v = el(`<section><h2>Watching room ${esc(code)}</h2>
    <p id="spstat"><small>Connecting…</small></p>
    <div class="card" id="predcard">
      <h3>🔮 Predict the score</h3>
      <p style="margin:0 0 8px"><small>Exact score 3 pts · right result 1 pt. Locks at kick-off.</small></p>
      <input id="pname" maxlength="16" placeholder="Your name" style="width:100%;padding:10px;border-radius:10px;border:1px solid var(--line);margin-bottom:8px">
      <div style="display:flex;align-items:center;justify-content:center;gap:10px">
        <span id="plh" style="flex:1;text-align:right;font-weight:700">Host</span>
        <input id="ph" type="number" min="0" max="15" value="1" inputmode="numeric" style="width:3.2em;padding:8px;font-size:1.3rem;text-align:center;border-radius:10px;border:1px solid var(--line)">
        <b>–</b>
        <input id="pa" type="number" min="0" max="15" value="1" inputmode="numeric" style="width:3.2em;padding:8px;font-size:1.3rem;text-align:center;border-radius:10px;border:1px solid var(--line)">
        <span id="pla" style="flex:1;font-weight:700">Challenger</span>
      </div>
      <button class="btn primary" id="psend" style="margin-top:10px">Lock in prediction</button>
      <p id="plist" style="margin:6px 0 0"><small></small></p>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px" id="spcols"></div>
    <button class="btn ghost" id="back">Stop watching</button></section>`);
  v.querySelector('#back').onclick = () => { stopPoll(); S.mode = null; S.room = null; screenMode(); };
  const pname = v.querySelector('#pname');
  pname.value = store.get('sp1nxi-name', '');
  let myPred = null, closed = false;
  v.querySelector('#psend').onclick = async () => {
    const name = pname.value.trim();
    if (!name) return toast('Add your name first.');
    const h = Math.max(0, Math.min(15, parseInt(v.querySelector('#ph').value, 10) || 0));
    const a = Math.max(0, Math.min(15, parseInt(v.querySelector('#pa').value, 10) || 0));
    store.set('sp1nxi-name', name);
    const r = await api({ action:'predict', code, name, h, a });
    if (r && r.ok) { myPred = { h, a }; toast(`Locked in: ${h}–${a}`); v.querySelector('#psend').textContent = `Locked in ${h}–${a} · tap to change`; }
    else toast(r && r.error === 'closed' ? 'Too late — predictions closed at kick-off.' : "Couldn't save that — try again.");
  };
  show(v);
  const col = (sq, fallback) => {
    const done = sq && sq.final, xi = (sq && sq.xi) || [];
    const n = xi.filter(s => s.player).length;
    return `<div class="card" style="padding:10px 12px"><b>${esc((sq && sq.label) || fallback)}</b><br>
      <small>${sq && sq.formation ? esc(sq.formation) : 'picking a formation…'} · ${done ? '✅ locked in' : `${n}/11`}</small>
      ${xi.map(s => `<div style="display:flex;gap:6px;font-size:.8rem;padding:2px 0;${s.player ? '' : 'opacity:.4'}">
        <b style="min-width:2.4em">${s.role}</b><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.player ? esc(s.player.name) : '—'}</span></div>`).join('')}</div>`;
  };
  let started = false;
  const tick = async () => {
    if (started || !document.body.contains(v)) return stopPoll();
    const r = await api({ action:'state', code });
    if (!r || !r.ok) { v.querySelector('#spstat').innerHTML = `<small>${r && r.error === 'not-found' ? 'Looking for the room…' : 'Reconnecting…'}</small>`; return; }
    const st = r.state, prog = st.progress || [null, null];
    const view = i => st.squads[i] ? { ...st.squads[i], final: true } : prog[i];
    v.querySelector('#spcols').innerHTML = col(view(0), 'Host') + col(view(1), st.players > 1 ? 'Challenger' : 'Waiting for a player…');
    const lab = i => (st.squads[i] || prog[i] || {}).label;
    if (lab(0)) v.querySelector('#plh').textContent = lab(0);
    if (lab(1)) v.querySelector('#pla').textContent = lab(1);
    const preds = st.preds || [];
    v.querySelector('#plist').innerHTML = `<small>${preds.length ? `Predictions in: ${preds.map(p => esc(p.name)).join(', ')}` : 'No predictions yet — be the first.'}</small>`;
    if (!closed && st.kickoff && (r.now || Date.now()) >= st.kickoff - 1500) {
      closed = true;
      v.querySelector('#psend').disabled = true;
      v.querySelector('#psend').textContent = myPred ? `Your prediction: ${myPred.h}–${myPred.a}` : 'Predictions closed';
    }
    v.querySelector('#spstat').innerHTML = `<small>${st.squads[0] && st.squads[1] ? 'Both squads in — kick-off!' : 'The draft is live.'}</small>`;
    if (st.squads[0] && st.squads[1]) {
      started = true; stopPoll();
      await useLeague(st.league);
      const A = hydrateSquad(st.squads[0], 'Host'), B = hydrateSquad(st.squads[1], 'Challenger');
      S.players = [A, B];
      const offset = (r.now || Date.now()) - Date.now();
      const kickAt = st.kickoff ? st.kickoff - offset : Date.now();
      setTimeout(() => startMatch(A, B, matchSeed(code, A, B), rigFromState(st)), Math.max(0, kickAt - Date.now()));
    }
  };
  tick();
  S.poll = setInterval(tick, 1500);
}

// A link that drops whoever opens it straight into this room.
const joinLink = code => `${location.origin}${location.pathname}?join=${code}`;

function screenRoomCode() {
  const link = joinLink(S.room.code);
  const v = el(`<section>
    <h2>Room open</h2>
    <p>Get your opponent to scan this with their phone camera, or send them the code. Once they're in, you choose when to start.</p>
    <div class="card" style="text-align:center">
      ${qrSVG(link, 220)}
      <p style="margin:10px 0 4px"><small>Scan to join</small></p>
      <div class="code">${S.room.code}</div>
    </div>
    <button class="btn primary" id="share">Share invite link</button>
    <button class="btn ghost" id="copy">Copy code</button>
    <p id="roomstatus"><small>Waiting for your opponent to join…</small></p>
    <p><small>Anyone who scans after your opponent joins will watch instead of play.</small></p>
  </section>`);
  v.querySelector('#copy').onclick = () => { navigator.clipboard?.writeText(S.room.code); toast('Code copied'); };
  v.querySelector('#share').onclick = async () => {
    const text = `Join my Sp1nXI room — code ${S.room.code}`;
    if (navigator.share) { try { await navigator.share({ title: 'Sp1nXI', text, url: link }); return; } catch (e) { /* cancelled */ } }
    navigator.clipboard?.writeText(link); toast('Invite link copied');
  };
  show(v);
  // Host's lobby: nothing starts until you press Start — and you can
  // remove whoever joined before then.
  const status = v.querySelector('#roomstatus');
  let shownId = null;
  const render = st => {
    if (st.players >= 2 && st.joinId) {
      if (shownId === st.joinId) return;
      shownId = st.joinId;
      status.innerHTML = `<div class="card" style="display:flex;align-items:center;gap:10px">
        <span style="flex:1">✅ <b>${esc(st.joinName || 'A player')}</b> has joined</span>
        <button class="btn ghost" id="kick" style="width:auto;margin:0">Remove</button></div>
        <button class="btn primary" id="start">Start the match</button>`;
      status.querySelector('#start').onclick = async () => {
        const r = await api({ action:'start', code:S.room.code, hostKey:S.room.hostKey });
        if (!r || !r.ok) return toast(r && r.error === 'no-opponent' ? 'Your opponent left.' : "Couldn't start — try again.");
        stopPoll(); startTurns();
      };
      status.querySelector('#kick').onclick = async () => {
        const r = await api({ action:'kick', code:S.room.code, hostKey:S.room.hostKey });
        if (r && r.ok) { toast(`${st.joinName || 'Player'} removed.`); shownId = null; render(r.state); }
        else toast("Couldn't remove them — try again.");
      };
    } else if (shownId !== 'none') {
      shownId = 'none';
      status.innerHTML = '<small>Waiting for your opponent to join…</small>';
    }
  };
  poll(render);
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
  if (S.myName && S.room.seat === 1) { me().label = S.myName; return screenFormationSpin(); }   // gave it when joining
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
    let idx = Math.floor(Math.random() * FORMATION_NAMES.length);
    if (S.admin && S.admin.forceFormation) { idx = Math.max(0, FORMATION_NAMES.indexOf(S.admin.forceFormation)); S.admin.forceFormation = null; }
    await reel(box, FORMATION_NAMES, idx, f => f);
    p.formation = FORMATION_NAMES[idx];
    btn.disabled = false; btn.textContent = `Build your ${p.formation}`;
    btn.onclick = () => { clearTimeout(autoT); screenBuild(); };
    if (S.mode === 'online') autoT = setTimeout(() => { if (document.body.contains(v)) screenBuild(); }, 10000);
  };
  let autoT = null;
  // online: spin for them if they sit on it for 10 seconds
  if (S.mode === 'online') autoT = setTimeout(() => { if (document.body.contains(v) && !btn.disabled && !p.formation) btn.onclick(); }, 10000);
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

  const clubs = clubsFor(S.turn);
  const usedClubs = new Set(), usedPlayers = new Set();
  let club = null, busy = false;

  const v = el(`<section>
    <div class="card club" id="clubcard" style="padding:12px 14px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <span><b id="clubname">No club yet</b><br><small id="count">0 of 11 picked</small></span>
        <span style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.5rem" id="avg">—</span>
      </div>
      ${S.mode === 'online' ? `<div id="dclock" style="display:flex;align-items:center;gap:8px;margin-top:8px">
        <div class="bar" style="flex:1;margin:0"><i id="dclockbar" style="width:100%;transition:width .2s linear"></i></div>
        <b id="dclocknum" style="min-width:2.4em;text-align:right;font-variant-numeric:tabular-nums">10s</b></div>` : ''}
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

  // Online only: 10 seconds for every action. Run out and it's done for
  // you — spin, take the best player on offer, or confirm the XI.
  const timed = S.mode === 'online';
  let clockT = null;
  function stopClock() { if (clockT) clearInterval(clockT); clockT = null; }
  function armClock() {
    if (!timed) return;
    stopClock();
    const end = Date.now() + 10000;
    const bar = v.querySelector('#dclockbar'), num = v.querySelector('#dclocknum');
    clockT = setInterval(() => {
      if (!document.body.contains(v)) return stopClock();
      if (busy) return;
      const left = Math.max(0, end - Date.now());
      bar.style.width = (left / 100) + '%';
      bar.style.background = left < 3000 ? '#E5484D' : '';
      num.textContent = Math.ceil(left / 1000) + 's';
      if (left > 0) return;
      stopClock();
      if (club) {                                   // take the best player on offer
        let best = null;
        openGroups().forEach(g => club.squad
          .filter(pl => ELIGIBLE[g].includes(pl.position) && !usedPlayers.has(pl.id) && !p.xi.some(s => s.player && norm(s.player.name) === norm(pl.name)))
          .forEach(pl => { const r = getRating(pl, g); if (!best || r > best.r) best = { g, pl: { ...pl, rating: r }, r }; }));
        if (best) { toast(`Time! ${best.pl.name} picked for you.`); choose(best.g, best.pl); }
      } else if (filled() === 11) { toast('Time! XI confirmed.'); nextAfterBuild(); }
      else { toast('Time! Spinning for you.'); spin(); }
    }, 100);
  }

  function groupLabel(g) {
    return { GK: 'Goalkeeper', DEF: 'Defenders', MID: 'Midfielders', ATT_MID: 'Attacking mid / wide', FWD: 'Forwards' }[g];
  }

  async function spin() {
    if (busy) return;
    busy = true; act.disabled = true; act.textContent = 'Spinning…';
    picker.replaceChildren();
    // in a rivalry a side only has a couple of squads, so they can come up again
    const pool = S.rivalry ? clubs.slice() : clubs.filter(c => !usedClubs.has(c.name));
    let idx = weightedClubIndex(pool, S.leagueKey);
    if (S.admin && S.admin.forceClub) {           // admin: this spin lands where you said
      const f = pool.findIndex(c => c.name === S.admin.forceClub);
      if (f >= 0) idx = f;
      S.admin.forceClub = null;
    }
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
    armClock();
  }

  function renderChoices() {
    picker.replaceChildren();
    const groups = openGroups();
    let any = false;
    groups.forEach(g => {
      const taken = usedPlayers;
      const cands = club.squad
        .filter(pl => ELIGIBLE[g].includes(pl.position) && !taken.has(pl.id) && !p.xi.some(s => s.player && norm(s.player.name) === norm(pl.name)))
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
      act.onclick = () => { stopClock(); nextAfterBuild(); };
    } else {
      hint.textContent = `${11 - filled()} to go.`;
      act.classList.remove('hide');
      act.textContent = 'Spin for the next club';
      act.onclick = spin;
    }
    publishProgress();
    armClock();
  }

  rr.onclick = () => {
    if (!club || p.rerollsLeft <= 0) return;
    p.rerollsLeft--;
    club = null;
    picker.replaceChildren();
    hint.textContent = `${11 - filled()} to go. Spin for another club.`;
    act.classList.remove('hide'); act.textContent = 'Spin for the next club'; act.onclick = spin;
    paint();
    armClock();
  };

  act.onclick = spin;
  setCrumb(`${p.label} · ${p.formation}`);
  show(v); paint();
  publishProgress();
  armClock();
}

/* --- the AI opponent ---------------------------------------------- */
async function buildAI(ai, onSlot) {
  const side = S.players.indexOf(ai);
  const clubs = clubsFor(side >= 0 ? side : 1);
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
    const cands = club.squad.filter(pl => ELIGIBLE[grp].includes(pl.position) && !usedPlayers.has(pl.id) && !ai.xi.some(s => norm(s.player.name) === norm(pl.name)))
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
function startMatch(A, B, seed, roomRig) {
  if (S.penaltyOnly) return startPenaltyOnly(A, B, seed);
  const m = simulate(A, B, seed);
  if (roomRig) applyRig(m, A, B, roomRig);
  else if (S.mode !== 'online' && S.mode !== 'spectate' && S.admin && S.admin.rig) { applyRig(m, A, B, rigBySeat(S.admin.rig)); S.admin.rig = null; }
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

// Broadcast-style line-ups before kick-off: both XIs, formations, the
// weather and the referee. Runs for a few seconds (same length on every
// phone in an online game), or tap to go straight to kick-off.
function screenPrematch(A, B, m, opts, go) {
  theme(null); setCrumb(opts.crumb || 'Line-ups');
  const title = opts.crumb || (LEAGUES[S.leagueKey] || {}).name || 'Match day';
  const ref = m.referee ? `${(NATIONS[m.referee[1]] || ['', ''])[1]} ${esc(m.referee[0])}` : '';
  const list = (t, side) => t.xi.map((s, i) => `
    <div class="pm-row" style="animation-delay:${0.35 + i * 0.07}s;${side === 'away' ? 'flex-direction:row-reverse;text-align:right' : ''}">
      <span class="pm-num" style="background:${t.badge.home};color:${readable(t.badge.home)}">${esc(String(s.player.number ?? ''))}</span>
      <span class="pm-nm">${esc(s.player.name)}</span><span class="pm-rl">${s.role}</span></div>`).join('');
  const v = el(`<section class="pm">
    <style>
      .pm .pm-card{background:linear-gradient(160deg,#101725,#1B2437 60%,#111827);color:#fff;border-radius:16px;overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,.25)}
      .pm .pm-top{display:flex;align-items:center;gap:8px;padding:10px 14px;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;opacity:.9}
      .pm .pm-live{background:#E5484D;color:#fff;font-weight:800;padding:2px 8px;border-radius:4px;animation:pmblink 1.2s infinite}
      @keyframes pmblink{50%{opacity:.55}}
      .pm .pm-teams{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:6px 14px 12px}
      .pm .pm-team{font-family:'Bricolage Grotesque';font-weight:800;font-size:1.15rem;line-height:1.1}
      .pm .pm-team small{display:block;font-family:inherit;font-weight:500;font-size:.75rem;color:#9FB0CC}
      .pm .pm-bar{height:4px;border-radius:2px;margin-top:6px}
      .pm .pm-meta{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;font-size:.8rem;color:#C9D4E8;padding:8px 14px;
        background:rgba(255,255,255,.05);border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08)}
      .pm .pm-cols{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px 12px;padding:10px 12px 14px}
      .pm .pm-row{display:flex;align-items:center;gap:7px;padding:3px 0;opacity:0;transform:translateY(6px);animation:pmin .35s ease forwards}
      @keyframes pmin{to{opacity:1;transform:none}}
      .pm .pm-num{flex:none;min-width:24px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.72rem}
      .pm .pm-nm{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:.82rem}
      .pm .pm-rl{flex:none;font-size:.62rem;color:#8193B2}
      .pm .pm-count{height:3px;background:rgba(255,255,255,.12)}
      .pm .pm-count i{display:block;height:100%;width:0;background:#E4762B;animation:pmcount 7s linear forwards}
      @keyframes pmcount{to{width:100%}}
    </style>
    <div class="pm-card">
      <div class="pm-top"><span class="pm-live">Live</span><span>${esc(title)}</span></div>
      <div class="pm-teams">
        <div class="pm-team">${esc(A.label)}<small>${esc(A.formation || '')}</small><div class="pm-bar" style="background:${A.badge.home}"></div></div>
        <div style="padding:0 10px;font-weight:800;color:#9FB0CC">v</div>
        <div class="pm-team" style="text-align:right">${esc(B.label)}<small>${esc(B.formation || '')}</small><div class="pm-bar" style="background:${B.badge.home}"></div></div>
      </div>
      <div class="pm-meta">
        ${m.weather ? `<span>${WEATHER[m.weather].icon} ${WEATHER[m.weather].label}</span>` : ''}
        ${ref ? `<span>Referee: ${ref}</span>` : ''}
      </div>
      <div class="pm-cols"><div>${list(A, 'home')}</div><div>${list(B, 'away')}</div></div>
      <div class="pm-count"><i></i></div>
    </div>
    <button class="btn primary" id="pmgo" style="margin-top:12px">Kick off</button>
  </section>`);
  let gone = false;
  const next = () => { if (gone || !document.body.contains(v)) return; gone = true; go(); };
  v.querySelector('#pmgo').onclick = next;
  show(v);
  setTimeout(next, 7000);
}

async function screenMatchSim(A, B, m, opts = {}) {
  if (!opts.introDone) return screenPrematch(A, B, m, opts, () => screenMatchSim(A, B, m, { ...opts, introDone: true }));
  // Subs change the XI for this match only — the drafted XI comes back after.
  await ensureBench(A, B); await ensureBench(B, A);
  // Nobody can be in both squads: drop anyone who's in the other XI, and a
  // player on both benches stays with the home side (same rule on every phone).
  const inXI = t => new Set(t.xi.map(s => norm(s.player.name)));
  A.bench = A.bench.filter(b => !inXI(B).has(norm(b.name)));
  B.bench = B.bench.filter(b => !inXI(A).has(norm(b.name)) && !A.bench.some(x => norm(x.name) === norm(b.name)));
  const orig = [A, B].map(t => ({ t, xi: t.xi.slice(), bench: t.bench.slice(), strength: t.strength }));
  A.subsMade = 0; B.subsMade = 0;
  if (!m.subs) m.subs = [];
  const shared = S.mode === 'online' || S.mode === 'spectate';
  // Online knockout ties aren't shared between phones, so no subs there
  // (that keeps both players' brackets identical).
  const subsOn = !(shared && opts.onDone);
  theme(null);
  document.documentElement.style.setProperty('--club-a', A.badge.home);
  document.documentElement.style.setProperty('--club-b2', B.badge.home);
  setCrumb(opts.crumb || 'Kick-off');

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
      .ms .wx{position:absolute;inset:0;pointer-events:none;z-index:5}
      .ms .wx-rain{background-image:repeating-linear-gradient(105deg,rgba(190,215,255,.35) 0 1px,transparent 1px 14px);
        background-size:40px 40px;animation:wxfall .35s linear infinite}
      .ms .wx-snow{background-image:radial-gradient(circle,rgba(255,255,255,.9) 1.2px,transparent 1.8px),
        radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 1.6px);
        background-size:34px 34px,21px 21px;background-position:0 0,10px 12px;animation:wxsnow 3s linear infinite}
      .ms .wx-heavy{background:radial-gradient(ellipse 14% 20% at 10% 50%,rgba(92,64,36,.55),transparent 70%),
        radial-gradient(ellipse 14% 20% at 90% 50%,rgba(92,64,36,.55),transparent 70%),
        radial-gradient(ellipse 10% 30% at 50% 50%,rgba(92,64,36,.4),transparent 70%),rgba(70,50,30,.18)}
      .ms .wx-wind{background-image:repeating-linear-gradient(0deg,transparent 0 22px,rgba(255,255,255,.14) 22px 23px);
        background-size:120px 60px;animation:wxwind 1.2s linear infinite;
        -webkit-mask-image:repeating-linear-gradient(90deg,#000 0 60px,transparent 60px 120px);mask-image:repeating-linear-gradient(90deg,#000 0 60px,transparent 60px 120px)}
      .ms .var-ban{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.9);z-index:9;opacity:0;
        background:rgba(10,10,20,.88);color:#fff;border:2px solid #7C5CFF;border-radius:12px;padding:10px 18px;text-align:center;
        font-weight:800;letter-spacing:.06em;transition:opacity .25s,transform .25s;pointer-events:none}
      .ms .var-ban.on{opacity:1;transform:translate(-50%,-50%) scale(1);animation:varpulse 1s ease-in-out infinite}
      .ms .var-ban small{display:block;font-weight:500;letter-spacing:0;opacity:.85;margin-top:2px}
      @keyframes varpulse{50%{box-shadow:0 0 0 6px rgba(124,92,255,.35)}}
      .ms .wx-tag{position:absolute;left:8px;top:6px;z-index:7;font-size:.72rem;background:rgba(0,0,0,.45);color:#fff;padding:2px 8px;border-radius:10px}
      @keyframes wxfall{to{background-position:-10px 40px}}
      @keyframes wxsnow{to{background-position:8px 34px,-6px 33px}}
      @keyframes wxwind{to{background-position:120px 0}}
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
        ${m.weather && m.weather !== 'clear' ? `<div class="wx wx-${m.weather}"></div>` : ''}
        <div class="var-ban" id="varban"></div>
        ${m.weather ? `<span class="wx-tag">${WEATHER[m.weather].icon} ${WEATHER[m.weather].label}</span>` : ''}
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
      players.push({ side, idx: i, slot: s, gk, dot, lane, adv, ph: Math.random() * 6.28, ph2: Math.random() * 6.28,
        drain: gk ? 6 + Math.random() * 6 : 18 + Math.random() * 20, row, subAt: 0 });
    });
  });
  const key = p => p.side + '|' + p.slot.player.name;
  const place = (elm, L, W) => { elm.style.left = L + '%'; elm.style.top = W + '%'; };

  let bL = 50, bW = 50, poss = null, carrier = null;
  let skipped = false, lineUp = true;   // lineUp: both teams in their own half for a kick-off

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
    if (lineUp) {   // kick-off shape: each side in its own half, spread across the pitch
      const L = home ? 7 + p.adv * 41 : 93 - p.adv * 41;
      return [L + Math.sin(t / 1300 + p.ph) * 0.6, 50 + (p.lane - 50) * 0.9 + Math.cos(t / 1550 + p.ph2) * 0.8];
    }
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
  // Walk-out: both teams come out of the tunnel together, then take their places.
  players.forEach((p, i) => { p.dot.style.transition = 'none'; place(p.dot, 47 + (i % 11) * 0.6 + (p.side === 'home' ? -2 : 2), 108); });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    players.forEach(p => { p.dot.style.transition = ''; p.dot.style.transitionDuration = (2.2 + Math.random() * 0.8) + 's'; });
    tick();
    setTimeout(() => players.forEach(p => { p.dot.style.transitionDuration = ''; }), 3200);
  }));
  const moveT = setInterval(tick, 380);

  // Two halves of ~30 real seconds. The clock runs to 45:00, then counts
  // added time (45+1 … 45+N) while the half's last spell plays out; the
  // ref blows for half-time, both sides reset to their shapes, and the
  // second half kicks off from the centre. Same again up to 90+N.
  // Periods: two 45-minute halves, then (if it's level) two 15-minute
  // halves of extra time. Each gets enough real time for its events to land
  // on (or right by) their minute; the clock shows added time at the end of
  // each, the ref blows, and the next period kicks off from the centre.
  const COST = e => e.type === 'goal' ? (e.var ? 13000 : 9000) : e.type === 'noGoal' ? 13000 : 3500;
  const periodOf = e => e.et ? (e.min <= 105 ? 2 : 3) : e.min <= 45 ? 0 : 1;
  const crng = m.seed ? seededRng(m.seed + '|clock') : Math.random;
  const PERIODS = [
    { base: 0, len: 45, min: 30000, added: 1 + Math.floor(crng() * 4) },
    { base: 45, len: 45, min: 30000, added: 2 + Math.floor(crng() * 5) },
    ...(m.et ? [{ base: 90, len: 15, min: 12000, added: Math.floor(crng() * 2) },
                { base: 105, len: 15, min: 12000, added: 1 + Math.floor(crng() * 3) }] : [])
  ];
  PERIODS.forEach((P, i) => { P.ms = Math.max(P.min, m.events.filter(e => periodOf(e) === i).reduce((t, e) => t + COST(e), 0) + (i < 2 ? 9000 : 5000)); });
  let pi = 0, halfStart = performance.now(), phase = 'play', finished = false;
  let HALF_MS = PERIODS[0].ms, PER_MIN = HALF_MS / PERIODS[0].len;
  const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  function clockText() {
    if (phase !== 'play') return phase;
    const P = PERIODS[pi], el = performance.now() - halfStart;
    if (el < HALF_MS) return fmt(P.base * 60 + (el / HALF_MS) * P.len * 60);
    return `${P.base + P.len}:00${P.added ? ` +${Math.min(P.added, 1 + Math.floor((el - HALF_MS) / PER_MIN))}` : ''}`;
  }
  let nowFrac = 0;
  const fitOf = p => Math.round(Math.max(18, 100 - p.drain * Math.max(0, nowFrac - p.subAt)));
  function clockTick() {
    if (skipped || finished) return;
    clock.textContent = clockText();
    const P = PERIODS[pi], el = phase === 'play' ? Math.min(HALF_MS, performance.now() - halfStart) : HALF_MS;
    const frac = (P.base + (el / HALF_MS) * P.len) / 90;   // > 1 in extra time: legs really go
    nowFrac = frac;
    players.forEach(p => { if (p.row) p.row.querySelector('.ms-fit i').style.width = fitOf(p) + '%'; });
    requestAnimationFrame(clockTick);
  }
  requestAnimationFrame(clockTick);

  const stop = () => { clearInterval(moveT); };
  // Where the match hands off to: the scoresheet normally, or back into a
  // knockout run when this is one of your ties.
  const finishMatch = () => {
    SFX.crowdStop();
    playerRatings(A, B, m);
    orig.forEach(o => { o.t.xi = o.xi; o.t.bench = o.bench; o.t.strength = o.strength; o.t.subsMade = 0; });
    const done = () => { if (opts.onDone) opts.onDone(m); else screenResult(A, B, m); };
    if (m.pens) screenPenalties(A, B, m, done, humanSide); else done();
  };
  v.querySelector('#skip').onclick = () => { skipped = true; stop(); finishMatch(); };
  if (shared && !opts.onDone) v.querySelector('#skip').remove();   // the shared head-to-head can't be skipped
  show(v);

  const pickDot = (side, withGK) => {
    const pool = players.filter(p => p.side === side && (withGK || !p.gk) && !p.sentOff);
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
    const dur = Math.max(0.45, Math.min(1.2, d / 45)) * (m.weather === 'heavy' || m.weather === 'snow' ? 1.18 : 1);
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

  let events = m.events.slice().sort((a, b) => (a.et ? 1 : 0) - (b.et ? 1 : 0) || a.min - b.min);
  const used = new Set();
  const varBan = v.querySelector('#varban');
  const VAR_TEXT = { offside: 'Checking a possible offside', handball: 'Possible handball in the build-up', foul: 'Checking for a foul in the build-up' };
  const VAR_OUT = { offside: 'Offside', handball: 'Handball', foul: 'Foul in the build-up' };

  // Everyone back into shape, ball on the spot, whistle, off we go.
  async function kickOff(side, caption) {
    lineUp = true; poss = null; carrier = null;
    ball.style.transitionDuration = '0.9s'; bL = 50; bW = 50; place(ball, 50, 50); tick();
    if (caption) commentary.innerHTML = caption;
    await sleep(1300);
    if (skipped) return;
    SFX.whistle(1);
    const taker = players.filter(p => p.side === side && !p.gk).sort((a, b) => b.adv - a.adv)[0];
    await ballTo(50, 50, taker);
    lineUp = false;
    const deep = players.filter(p => p.side === side && !p.gk && p.adv < 0.6);
    await ballTo(side === 'home' ? 40 : 60, clampW(35 + Math.random() * 30), deep[Math.floor(Math.random() * deep.length)] || taker);
  }

  // The tense bit: freeze, banner, wait… then the call.
  async function varCheck(reason, ruledOut) {
    commentary.innerHTML = '📺 VAR is taking a look…';
    varBan.innerHTML = `📺 VAR CHECK<small>${VAR_TEXT[reason]}</small>`;
    varBan.classList.add('on');
    await sleep(2400 + Math.random() * 1000);
    if (skipped) return;
    varBan.classList.remove('on');
    await sleep(200);
    varBan.innerHTML = ruledOut ? `❌ NO GOAL<small>${VAR_OUT[reason]}</small>` : '✅ GOAL STANDS';
    varBan.classList.add('on');
    varBan.style.animation = 'none';
    await sleep(1500);
    varBan.classList.remove('on'); varBan.style.animation = '';
  }

  async function buildUpTo(side, scorer, ev) {
    const team = teams[side];
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
  }

  async function playEvent(ev) {
    used.add(ev);
    const side = ev.side, other = side === 'home' ? 'away' : 'home';
    const scorer = byName(side, ev.player) || pickDot(side);
    if (ev.type === 'goal') {
      await buildUpTo(side, scorer, ev);
      if (ev.var) {
        await ballTo(side === 'home' ? 99.5 : 0.5, 44 + Math.random() * 12, null, `⚽ <b>${esc(ev.player)}</b> ${esc(ev.desc)}… but wait!`, 900);
        SFX.roar(0.5);
        await varCheck(ev.var, false);
      } else {
        await ballTo(side === 'home' ? 99.5 : 0.5, 44 + Math.random() * 12, null, `⚽ <b>${esc(ev.player)}</b> ${esc(ev.desc)}!`, 1300);
      }
      if (side === 'home') scoreA++; else scoreB++;
      scoreEl.textContent = `${scoreA} – ${scoreB}`;
      tagRow(scorer, '⚽'); SFX.roar();
      await kickOff(other, `Kick-off, ${esc(teams[other].label)} to restart.`);
    } else if (ev.type === 'red') {
      await ballTo(advanceTo(other, 0.3), clampW(20 + Math.random() * 60), pickDot(other));
      await ballTo(bL + (Math.random() * 8 - 4), clampW(bW + (Math.random() * 16 - 8)), scorer,
        `🟥 <b>${esc(ev.player)}</b> is sent off!`, 1400);
      SFX.whistle(2); SFX.groan();
      tagRow(scorer, '🟥');
      scorer.sentOff = true; scorer.dot.style.opacity = '0';
      if (carrier === key(scorer)) carrier = null;
      await ballTo(bL, bW, pickDot(other), `${esc(teams[side].label)} are down to ten.`, 700);
    } else if (ev.type === 'noGoal') {
      await buildUpTo(side, scorer, { method: 'open', player: ev.player });
      await ballTo(side === 'home' ? 99.5 : 0.5, 44 + Math.random() * 12, null, `⚽ <b>${esc(ev.player)}</b> puts it in!`, 700);
      SFX.roar(0.8);
      await varCheck(ev.reason, true);
      SFX.groan();
      commentary.innerHTML = `❌ Goal ruled out — ${VAR_OUT[ev.reason].toLowerCase()}. ${esc(teams[other].label)} restart.`;
      const gk = players.find(p => p.side === other && p.gk);
      await ballTo(side === 'home' ? 90 : 10, 50, gk, null);
      await ballTo(50, clampW(25 + Math.random() * 50), pickDot(other));
    } else {
      await ballTo(advanceTo(other, 0.3), clampW(20 + Math.random() * 60), pickDot(other));
      await ballTo(bL + (Math.random() * 8 - 4), clampW(bW + (Math.random() * 16 - 8)), scorer,
        `🟨 <b>${esc(ev.player)}</b> booked for a foul`, 900);
      tagRow(scorer, '🟨'); SFX.whistle(1);
      await ballTo(bL, bW, pickDot(other));
    }
  }

  async function playFiller() {
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
  // keep the ball moving about until a moment in time
  async function passAboutUntil(t) {
    while (!skipped && performance.now() < t) {
      const p = pickDot(poss || 'home');
      await ballTo(Math.max(8, Math.min(92, bL + (Math.random() * 16 - 8))), clampW(p.lane + (Math.random() * 20 - 10)), p);
    }
  }

  SFX.crowdStart();
  commentary.innerHTML = 'The teams walk out…';
  await sleep(2600);
  await kickOff('home', m.weather ? `${WEATHER[m.weather].icon} ${esc(WEATHER[m.weather].line)}` : 'Teams are out…');
  commentary.innerHTML = 'And we\'re under way!';

  // How long before an event's minute its build-up has to start.
  const LEAD = e => e.type === 'card' ? 1500 : e.method === 'penalty' || e.method === 'freekick' ? 3500 : 5500;
  async function fillUntil(t) {
    while (!skipped && performance.now() < t - 4500) await playFiller();
    await passAboutUntil(t);
  }
  // A break in play: whistle, both teams back into shape, a pause.
  async function breakInPlay(label, text, ms, blasts) {
    phase = label;
    SFX.whistle(blasts, true);
    lineUp = true; poss = null; carrier = null;
    ball.style.transitionDuration = '0.9s'; bL = 50; bW = 50; place(ball, 50, 50); tick();
    commentary.innerHTML = text;
    await sleep(ms);
  }
  // Swap a dot and its line-up row over to the new player.
  function showSub(side, rec) {
    const p = players.find(x => x.side === side && x.idx === rec.slot);
    const t = teams[side];
    if (!p) return;
    p.slot = t.xi[rec.slot];
    p.subAt = nowFrac;
    p.dot.textContent = String(p.slot.player.number ?? rec.slot + 1);
    if (p.row) {
      p.row.querySelector('.ms-num').textContent = String(p.slot.player.number ?? '');
      p.row.querySelector('.ms-name').innerHTML = `${esc(p.slot.player.name)} <span style="color:#22C55E">🔼</span><span class="ms-tag"></span>`;
    }
  }
  // Who picks their own subs: you (and in pass-and-play, both of you).
  // The AI and club sides in the knockouts make their own changes.
  const lmT = S.lastMatch || {};
  const yours = S.mode === 'ai' ? [lmT.A] : [lmT.A, lmT.B];
  const humanSide = side => S.mode === 'online' ? side === (S.room && S.room.seat === 1 ? 'away' : 'home')
    : S.mode === 'spectate' ? false
    : opts.onDone ? yours.includes(teams[side])
    : S.mode === 'ai' ? side === 'home' : true;
  const BREAK_NAME = { 45: 'Half-time', 90: 'End of 90 minutes', 105: 'Half-time in extra time' };
  async function subsWindow(fromMin) {
    if (skipped) return;
    const min = fromMin === 45 ? 46 : fromMin === 90 ? 91 : 106;

    // Admin changes now register mid-match too: whatever's been saved in the
    // admin panel since kickoff gets folded into the game at the next break,
    // instead of waiting for an entirely new match. The final score itself
    // still can't be rewritten retroactively (you already watched those
    // goals go in), but forced VAR drama, red cards and snow can still land.
    if (S.mode !== 'online' && S.mode !== 'spectate' && S.admin) {
      const live = rigBySeat(S.admin.rig);
      if (live && (live.var || live.red || live.snow)) {
        const rnd = m.seed ? seededRng(`${m.seed}|adminlive|${fromMin}`) : Math.random;
        const scorer = makeScorer(rnd);
        const usedMins = new Set(m.events.map(e => e.min));
        const minIn = (lo, hi) => { let x, n = 0; do { x = lo + Math.floor(rnd() * (hi - lo + 1)); } while (usedMins.has(x) && ++n < 60); usedMins.add(x); return x; };
        const teamOf = side => side === 'home' ? A : B;
        if (live.var) {
          const side = rnd() < 0.5 ? 'home' : 'away';
          m.events.push({ side, min: minIn(min, min + 34), type: 'noGoal', player: scorer(teamOf(side)).player.name, reason: ['offside', 'handball', 'foul'][Math.floor(rnd() * 3)] });
        }
        if (live.red) {
          const t = teamOf(live.red), outfield = t.xi.filter(s => GROUP[s.role] !== 'GK');
          m.events.push({ side: live.red, min: minIn(min, min + 34), type: 'red', player: outfield[Math.floor(rnd() * outfield.length)].player.name });
        }
        if (live.snow) {
          m.weather = 'snow';
          const pitchEl = v.querySelector('#matchpitch');
          if (pitchEl && !pitchEl.querySelector('.wx')) {
            pitchEl.insertAdjacentHTML('beforeend', `<div class="wx wx-snow"></div><span class="wx-tag">${WEATHER.snow.icon} ${WEATHER.snow.label}</span>`);
          }
        }
        m.events.sort((a, b) => (a.et ? 1 : 0) - (b.et ? 1 : 0) || a.min - b.min);
        events = m.events.slice();
        S.admin.rig.var = S.admin.rig.red = S.admin.rig.snow = false;
        if (!S.admin.rig.fixed) S.admin.rig = null;
        toast('⚙️ Admin change applied to the rest of this match.');
      }
    }

    if (!subsOn) return;
    const changes = { home: [], away: [] };
    if (shared) {
      const mine = S.mode === 'online' ? (S.room.seat === 1 ? 'away' : 'home') : null;
      if (mine) {
        commentary.innerHTML = '🔁 Substitutions — make your changes.';
        changes[mine] = await subsPanel(teams[mine], BREAK_NAME[fromMin], 20);
        api({ action: 'subs', code: S.room.code, seat: S.room.seat, win: fromMin, subs: changes[mine] });
      }
      commentary.innerHTML = mine ? '⏳ Waiting for your opponent\'s changes…' : '⏳ The managers are making their changes…';
      const need = mine ? [mine === 'home' ? 'away' : 'home'] : ['home', 'away'];
      const until = Date.now() + 45000;
      while (need.length && Date.now() < until && !skipped) {
        const r = await api({ action: 'state', code: S.room.code });
        const got = r && r.ok && r.state.subs || {};
        for (const side of need.slice()) {
          const k = `${side === 'home' ? 0 : 1}|${fromMin}`;
          if (got[k]) { changes[side] = got[k]; need.splice(need.indexOf(side), 1); }
        }
        if (need.length) await sleep(900);
      }
    } else {
      const aiRng = m.seed ? seededRng(`${m.seed}|aisubs|${fromMin}`) : Math.random;
      for (const side of ['home', 'away']) {
        if (humanSide(side)) {
          commentary.innerHTML = `🔁 ${esc(teams[side].label)} — substitutions.`;
          changes[side] = await subsPanel(teams[side], BREAK_NAME[fromMin], null,
            S.mode === 'pass' && side === 'away' ? `Pass the phone to ${teams.away.label}` : '');
        } else changes[side] = autoSubs(teams[side], fromMin, aiRng);
      }
    }
    let made = 0;
    for (const side of ['home', 'away']) for (const ch of changes[side] || []) {
      const rec = applySub(teams[side], side, ch.slot, ch.on, min, m);
      if (rec) { showSub(side, rec); made++; }
    }
    if (!made) return;
    commentary.innerHTML = `🔁 ${m.subs.filter(s => s.min === min).map(s => `${esc(s.on)} on for ${esc(s.off)}`).join(' · ')}`;
    if (!m.rig) resimulate(m, A, B, fromMin, JSON.stringify(changes));
    events = m.events.slice().sort((a, b) => (a.et ? 1 : 0) - (b.et ? 1 : 0) || a.min - b.min);
    // the replay may have changed whether there's extra time
    if (m.et && PERIODS.length === 2) PERIODS.push({ base: 90, len: 15, min: 12000, added: Math.floor(crng() * 2) },
      { base: 105, len: 15, min: 12000, added: 1 + Math.floor(crng() * 3) });
    if (!m.et && PERIODS.length > 2) PERIODS.length = 2;
    PERIODS.forEach((P, i) => { if (i > pi) P.ms = Math.max(P.min, events.filter(e => periodOf(e) === i).reduce((t, e) => t + COST(e), 0) + (i < 2 ? 9000 : 5000)); });
    await sleep(1600);
  }

  // The panel: tap a player to take off, then who comes on. Pending changes
  // only apply when confirmed. A timer (online) confirms automatically.
  function subsPanel(team, title, seconds, note) {
    return new Promise(resolve => {
      const bench = (team.bench || []).slice();
      const pending = [];                         // {slot, on}
      let pick = null;
      const left = () => MAX_SUBS - (team.subsMade || 0) - pending.length;
      const ov = el(`<div style="position:fixed;inset:0;z-index:60;background:rgba(10,8,6,.62);display:flex;align-items:flex-end;justify-content:center">
        <div style="background:var(--cream);color:var(--ink);width:100%;max-width:560px;max-height:88vh;overflow:auto;border-radius:18px 18px 0 0;padding:16px 16px 20px">
          ${note ? `<p style="margin:0 0 6px;font-weight:800;color:var(--orange)">📱 ${esc(note)}</p>` : ''}
          <h3 style="margin:0">🔁 ${esc(title)} — ${esc(team.label)}</h3>
          <p style="margin:4px 0 8px"><small id="sp-left"></small></p>
          ${seconds ? `<div class="bar" style="margin:0 0 10px"><i id="sp-t" style="width:100%;transition:width .2s linear"></i></div>` : ''}
          <div id="sp-xi"></div>
          <div id="sp-bench" style="margin-top:8px"></div>
          <div id="sp-pend" style="margin:8px 0"></div>
          <button class="btn primary" id="sp-ok">No changes</button>
          <button class="btn ghost" id="sp-undo" style="display:none">Undo last change</button>
        </div></div>`);
      const fitFor = idx => { const p = players.find(x => x.side === (team === A ? 'home' : 'away') && x.idx === idx); return p ? fitOf(p) : 100; };
      const draw = () => {
        ov.querySelector('#sp-left').textContent = `${MAX_SUBS - left()} of ${MAX_SUBS} subs used · ${left() > 0 ? 'tap a player to take off' : 'no subs left'}`;
        ov.querySelector('#sp-xi').innerHTML = team.xi.map((s, i) => {
          const ch = pending.find(x => x.slot === i), fit = fitFor(i);
          return `<div class="sp-row" data-i="${i}" style="display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:10px;margin:2px 0;
            cursor:${ch || !left() ? 'default' : 'pointer'};background:${pick === i ? 'rgba(228,118,43,.18)' : 'transparent'};${ch ? 'opacity:.55' : ''}">
            <b style="min-width:24px;text-align:right">${esc(String(s.player.number ?? ''))}</b>
            <span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s.player.name)}${ch ? ` → <b>${esc(ch.on)}</b>` : ''}</span>
            <small style="min-width:2.6em">${s.role}</small>
            <span style="min-width:3.2em;text-align:right;font-size:.8rem;color:${fit < 45 ? '#E5484D' : fit < 70 ? '#E08A0B' : '#16A34A'}">${fit}%</span>
            <b style="min-width:2em;text-align:right">${s.player.rating}</b></div>`;
        }).join('');
        ov.querySelectorAll('.sp-row').forEach(r => r.onclick = () => {
          const i = +r.dataset.i;
          if (pending.some(x => x.slot === i) || !left()) return;
          pick = pick === i ? null : i; draw();
        });
        const bx = ov.querySelector('#sp-bench');
        if (pick == null) bx.innerHTML = bench.length ? `<small>Bench: ${bench.map(b => esc(b.name)).join(', ')}</small>` : '<small>No one left on the bench.</small>';
        else {
          const s = team.xi[pick], opts2 = bench.filter(b => ELIGIBLE[GROUP[s.role]].includes(b.position));
          bx.innerHTML = `<small>Bring on for ${esc(s.player.name)} (${s.role}):</small>` + (opts2.length ? opts2.map(b =>
            `<div class="sp-on" data-n="${esc(b.name)}" style="display:flex;gap:8px;align-items:center;padding:8px;border:1px solid var(--line);border-radius:10px;margin:4px 0;cursor:pointer">
              <span style="color:#16A34A">🔼</span><span style="flex:1">${esc(b.name)}</span><small>${esc(b.position)}</small><b>${getRating(b, GROUP[s.role])}</b></div>`).join('')
            : '<p><small>Nobody on the bench can play there.</small></p>');
          bx.querySelectorAll('.sp-on').forEach(o => o.onclick = () => {
            const b = bench.find(x => x.name === o.dataset.n);
            bench.splice(bench.indexOf(b), 1);
            pending.push({ slot: pick, on: b.name, _b: b });
            pick = null; draw();
          });
        }
        ov.querySelector('#sp-pend').innerHTML = pending.map(x => `<div style="font-size:.85rem">🔼 ${esc(x.on)} &nbsp;🔽 ${esc(team.xi[x.slot].player.name)}</div>`).join('');
        ov.querySelector('#sp-ok').textContent = pending.length ? `Confirm ${pending.length} change${pending.length > 1 ? 's' : ''}` : 'No changes';
        ov.querySelector('#sp-undo').style.display = pending.length ? '' : 'none';
      };
      let done = false, tt = null;
      const finish = () => { if (done) return; done = true; clearInterval(tt); ov.remove(); resolve(pending.map(x => ({ slot: x.slot, on: x.on }))); };
      ov.querySelector('#sp-ok').onclick = finish;
      ov.querySelector('#sp-undo').onclick = () => { const x = pending.pop(); if (x) bench.push(x._b); draw(); };
      if (seconds) {
        const end = Date.now() + seconds * 1000;
        tt = setInterval(() => {
          const l = Math.max(0, end - Date.now());
          const bar = ov.querySelector('#sp-t'); if (bar) bar.style.width = (l / (seconds * 10)) + '%';
          if (!l || skipped) finish();
        }, 200);
      }
      draw();
      document.body.appendChild(ov);
    });
  }

  const KICKERS = ['home', 'away', 'home', 'away'];
  for (let i = 0; i < PERIODS.length; i++) {
    const P = PERIODS[i];
    if (i > 0) {
      pi = i; HALF_MS = P.ms; PER_MIN = HALF_MS / P.len;
      phase = 'play'; halfStart = performance.now();
      const who = teams[KICKERS[i]].label;
      await kickOff(KICKERS[i], i === 1 ? `Second half — ${esc(who)} get us going.`
        : i === 2 ? `Extra time is under way — ${esc(who)} kick off.` : `Last 15 minutes of extra time — ${esc(who)} restart.`);
      commentary.innerHTML = i === 1 ? 'Second half under way.' : i === 2 ? 'Extra time — 30 more minutes.' : 'The final 15 minutes.';
    }
    for (const ev of events.filter(e => periodOf(e) === i)) {
      if (skipped) return;
      await fillUntil(halfStart + ((Math.min(ev.min, P.base + P.len) - P.base) / P.len) * HALF_MS - LEAD(ev));
      await playEvent(ev);
    }
    await fillUntil(halfStart + HALF_MS);
    await passAboutUntil(halfStart + HALF_MS + Math.min(P.added, 3) * PER_MIN);   // added time
    if (skipped) return;
    if (i === 0) { await breakInPlay('HT', `<b>Half-time.</b> ${esc(A.label)} ${scoreA}–${scoreB} ${esc(B.label)}`, 2500, 2); await subsWindow(45); }
    else if (i === 1 && m.et) { await breakInPlay('FT', `<b>Full time — ${scoreA}–${scoreB}, all square.</b> We're going to extra time!`, 2800, 3); await subsWindow(90); }
    else if (i === 2) { await breakInPlay('ET HT', `Half-time in extra time. ${esc(A.label)} ${scoreA}–${scoreB} ${esc(B.label)} — the teams change ends.`, 2000, 2); await subsWindow(105); }
    if (skipped) return;
  }

  if (skipped) return;
  finished = true; stop();
  clock.textContent = m.et ? 'AET' : 'FT';
  commentary.innerHTML = m.pens ? `<b>Still level after 120 minutes — it's going to penalties!</b>`
    : m.et ? '<b>Full time after extra time.</b>' : '<b>Full time.</b>';
  SFX.whistle(3, true);
  await sleep(m.pens ? 2400 : 1700);
  if (!skipped) finishMatch();
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

  ctx.fillStyle = readable(A.badge.home);
  ctx.font = "800 40px 'Bricolage Grotesque', sans-serif";
  ctx.textAlign = 'left';
  ctx.fillText('Sp1n', 56, 84);
  ctx.fillStyle = '#E4762B';
  ctx.fillText('XI', 56 + ctx.measureText('Sp1n').width, 84);

  // text colour per side, so white/yellow kits stay readable
  const inkA = readable(A.badge.home), inkB = readable(B.badge.home === '#FFFFFF' ? '#241F19' : B.badge.home);
  ctx.textAlign = 'center';
  ctx.font = "700 34px Archivo, sans-serif";
  ctx.fillStyle = inkA; wrapText(ctx, A.label, W * 0.27, 190, 380, 38);
  ctx.fillStyle = inkB; wrapText(ctx, B.label, W * 0.73, 190, 380, 38);
  ctx.font = "500 22px Archivo, sans-serif"; ctx.globalAlpha = .85;
  ctx.fillStyle = inkA; ctx.fillText(A.formation, W * 0.27, 230);
  ctx.fillStyle = inkB; ctx.fillText(B.formation, W * 0.73, 230);
  ctx.globalAlpha = 1;

  ctx.font = "800 130px 'Bricolage Grotesque', sans-serif";
  const sw = ctx.measureText(`${m.gA} – ${m.gB}`).width + 70;
  ctx.fillStyle = 'rgba(0,0,0,.32)'; rr(W / 2 - sw / 2, 250, sw, 130, 22); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillText(`${m.gA} – ${m.gB}`, W / 2, 360);

  ctx.font = "600 24px Archivo, sans-serif";
  const lname = esc_(LEAGUES[S.leagueKey].name) + (m.pens ? ` · AET · ${m.pens.a}–${m.pens.b} pens` : m.et ? ' · AET' : ''), lw = ctx.measureText(lname).width + 36;
  ctx.fillStyle = 'rgba(0,0,0,.32)'; rr(W / 2 - lw / 2, 388, lw, 34, 17); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillText(lname, W / 2, 413);

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

  // player of the match
  const pr = playerRatings(A, B, m), mo = pr.motm;
  y += 24;
  ctx.font = "800 30px 'Bricolage Grotesque', sans-serif"; ctx.fillStyle = '#241F19';
  ctx.fillText('Player of the match', 56, y);
  y += 50;
  ctx.fillStyle = ratingColor(mo.r); rr(56, y - 32, 84, 44, 8); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = "800 26px Archivo, sans-serif"; ctx.textAlign = 'center';
  ctx.fillText(mo.r.toFixed(1), 98, y - 1);
  ctx.textAlign = 'left'; ctx.fillStyle = '#241F19'; ctx.font = "600 26px Archivo, sans-serif";
  ctx.fillText(`${mo.name} — ${(mo.side === 'home' ? A : B).label}`, 158, y);
  y += 30;

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
  SFX.crowdStop();
  if (!S.lastMatch || S.lastMatch.m !== m) S.lastMatch = { A, B, m, ko: null, autoShown: false };
  hofSave(A, B, m);
  const h2h = recordH2H(A, B, m) || (S.mode === 'online' && S.room
    ? store.get('sp1nxi-h2h', {})[(S.room.seat === 0 ? B : A).label.trim().toLowerCase()] : null);
  document.documentElement.style.setProperty('--club-b2', B.badge.home);
  document.documentElement.style.setProperty('--club-a', A.badge.home);
  setCrumb('Full time');

  const allEv = [...m.events, ...(m.subs || []).map(s => ({ type: 'sub', side: s.side, min: s.min, player: s.on, off: s.off, et: s.min > 90 }))]
    .sort((a, b) => (a.et ? 1 : 0) - (b.et ? 1 : 0) || a.min - b.min || (a.type === 'sub') - (b.type === 'sub'));
  const evRows = allEv.map(e => {
    const icon = e.type === 'goal' ? '⚽' : e.type === 'noGoal' ? '🚫' : e.type === 'sub' ? '🔁' : e.type === 'red' ? '🟥' : '🟨';
    const why = { offside: 'offside', handball: 'handball', foul: 'foul in the build-up' };
    const label = e.type === 'goal'
      ? `${esc(e.player)} ${esc(e.desc)}${e.var ? ' <small>(📺 VAR checked — stands)</small>' : ''}`
      : e.type === 'noGoal' ? `${esc(e.player)} — goal ruled out by VAR <small>(${why[e.reason]})</small>`
      : e.type === 'sub' ? `${esc(e.player)} <small>on for ${esc(e.off)}</small>`
      : e.type === 'red' ? `${esc(e.player)} <small>sent off</small>`
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

  const winner = m.winSide ? (m.winSide === 'home' ? A : B) : null;
  const verdict = !winner ? 'Honours even.'
    : m.pens ? `${esc(winner.label)} win it on penalties!` : m.et ? `${esc(winner.label)} win it in extra time.` : `${esc(winner.label)} takes it.`;
  const extra = m.pens ? `After extra time · ${esc(winner.label)} win ${Math.max(m.pens.a, m.pens.b)}–${Math.min(m.pens.a, m.pens.b)} on penalties`
    : m.et ? 'After extra time' : '';

  const v = el(`<section>
    <h2>${verdict}</h2>
    ${extra ? `<p style="margin:-4px 0 8px"><span style="display:inline-block;background:var(--ink);color:var(--cream);font-size:.78rem;font-weight:700;
      padding:3px 10px;border-radius:999px">${extra}</span></p>` : ''}
    <div class="sheet">
      <div class="score">
        <div class="side" style="color:${readable(A.badge.home)}">${esc(A.label)}<br><small style="opacity:.8">${esc(A.formation)}</small></div>
        <div class="nums" style="color:#fff;background:rgba(0,0,0,.32);border-radius:10px;padding:2px 10px">${m.gA} – ${m.gB}</div>
        <div class="side" style="color:${readable(B.badge.home)}">${esc(B.label)}<br><small style="opacity:.8">${esc(B.formation)}</small></div>
      </div>
      <div class="events">${evRows}</div>
      ${statRows}
    </div>
    ${(() => {
      const pr = playerRatings(A, B, m), mo = pr.motm;
      const col = (side, t) => `<div><small style="opacity:.75">${esc(t.label)}</small>${pr[side].map(p =>
        `<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;padding:3px 0;font-size:.85rem">
          <span style="min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(p.name)}${p.goals ? ' ' + '⚽'.repeat(p.goals) : ''}</span>${ratingChip(p.r)}</div>`).join('')}</div>`;
      return `${m.weather ? `<p style="text-align:center;margin:6px 0"><small>${WEATHER[m.weather].icon} ${WEATHER[m.weather].label}</small></p>` : ''}
        <div class="card"><h3>🎙️ Pundit's verdict</h3><p style="margin:0;line-height:1.5">${esc(punditReport(A, B, m))}</p></div>
        ${S.room && (S.mode === 'online' || S.mode === 'spectate') ? '<div id="predbox"></div>' : ''}
        ${h2h ? `<div class="card"><h3>Head-to-head vs ${esc(h2h.name)}</h3><p style="margin:0">${h2hLine(h2h)}</p></div>` : ''}
        <div class="card"><h3>Player of the match</h3>
        <div style="display:flex;align-items:center;gap:12px">${ratingChip(mo.r, true)}
          <div><b>${esc(mo.name)}</b><br><small>${esc((mo.side === 'home' ? A : B).label)}${mo.goals ? ` · ${mo.goals} goal${mo.goals > 1 ? 's' : ''}` : ''}</small></div></div></div>
        <div class="card"><h3>Player ratings</h3>
          <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 14px">${col('home', A)}${col('away', B)}</div></div>`;
    })()}
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
  if (S.rivalry) { v.querySelector('#totable').remove(); S.lastMatch.autoShown = true; }   // a rivalry is one big game — no table
  v.querySelector('#xi').onclick = () => { clearTimeout(autoT); screenLineups(A, B); };
  v.querySelector('#share').onclick = () => { clearTimeout(autoT); shareResultCard(A, B, m); };
  v.querySelector('#again').onclick = () => { clearTimeout(autoT); S.players = []; S.turn = 0; S.room = null; screenMode(); };
  show(v);
  if (v.querySelector('#predbox')) fillPredictions(v.querySelector('#predbox'), m, A, B);
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
function knockoutOutcome(sa, sb, rng = Math.random) {
  const pa = 1 / (1 + Math.pow(10, -(sa - sb) / 12));
  return rng() < pa; // true = side A wins
}
// In online games (and for spectators) every tie gets its own seed, built
// from the match everyone watched plus the tie itself — so each phone draws
// the identical bracket, in any order, whether ties are played or simulated.
const koSeed = (k, x, y) => { const s = S.lastMatch && S.lastMatch.m && S.lastMatch.m.seed; return s ? `${s}|ko|${k}|${x.name}|${y.name}` : null; };
const koRng = (k, x, y) => { const s = koSeed(k, x, y); return s ? seededRng(s) : Math.random; };

/* --- knockout: instant simulation, or play your own run ------------- */
// Resolve a tie instantly with a believable scoreline (and sometimes pens).
function resolveTie(x, y, rng = Math.random) {
  const xWins = knockoutOutcome(x.strength, y.strength, rng);
  const pens = rng() < 0.16;
  let w, l;
  if (pens) { w = l = Math.floor(rng() * 3); }
  else { l = [0, 0, 0, 1, 1, 2][Math.floor(rng() * 6)]; w = l + 1 + (rng() < 0.35 ? 1 : 0); }
  const mt = { x, y, winner: xWins ? x : y, sx: xWins ? w : l, sy: xWins ? l : w };
  if (pens) {
    const a = 3 + Math.floor(rng() * 3), b = Math.max(0, a - 1 - Math.floor(rng() * 2));
    mt.px = xWins ? a : b; mt.py = xWins ? b : a;
  }
  return mt;
}

// Who's in the knockout rounds, and the first round's pairings.
function knockoutField(tableRows) {
  const sorted = tableRows.slice().sort((a, b) => b.strength - a.strength);
  if (S.leagueKey === 'UCL') {
    // 1–8 straight to the Round of 16; 9–24 play a playoff (9v24 … 16v17)
    const top8 = sorted.slice(0, 8), playoff = sorted.slice(8, 24);
    const first = [];
    for (let i = 0; i < 8; i++) first.push([playoff[i], playoff[15 - i]]);
    return { isUCL: true, top8, first, missed: sorted.slice(24).filter(r => r.mine),
      names: ['Knockout playoff', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'] };
  }
  const field = sorted.slice(0, 16);
  const SEEDS = [0, 15, 7, 8, 3, 12, 4, 11, 1, 14, 6, 9, 2, 13, 5, 10];
  const seeded = SEEDS.map(i => field[i]).filter(Boolean);
  const first = [];
  for (let i = 0; i + 1 < seeded.length; i += 2) first.push([seeded[i], seeded[i + 1]]);
  return { isUCL: false, top8: [], first, missed: sorted.slice(16).filter(r => r.mine),
    names: ['Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'] };
}
// Winners of stage k meet in stage k+1. In the UCL, the top 8 come in at
// the Round of 16: 1st plays the winner of 16 v 17, 2nd the winner of 15 v 18…
function nextPairs(st, k) {
  const winners = st.stages[k].map(mt => mt.winner);
  if (st.isUCL && k === 0) return st.top8.map((t, i) => [t, winners[7 - i]]);
  const out = [];
  for (let i = 0; i + 1 < winners.length; i += 2) out.push([winners[i], winners[i + 1]]);
  return out;
}
// Ties with one of your XIs wait to be played; everything else resolves now.
const makeStage = (pairs, k) => pairs.map(([x, y]) => (x.mine || y.mine) ? { x, y, winner: null } : resolveTie(x, y, koRng(k, x, y)));

// One of your ties decided without watching it. In a shared (online) game
// this runs the very same seeded match + shootout the board would have
// shown, so "Simulate" and "Play" can never give different answers.
async function decideTie(A, B, mt, k) {
  const seed = koSeed(k, mt.x, mt.y);
  if (!seed) return resolveTie(mt.x, mt.y);
  const home = await teamForRow(A, B, mt.x), away = await teamForRow(A, B, mt.y);
  if (!home || !away) return resolveTie(mt.x, mt.y, seededRng(seed));
  const m = simulate(home, away, seed);
  const out = { x: mt.x, y: mt.y, sx: m.gA, sy: m.gB };
  if (m.pens) { out.px = m.pens.a; out.py = m.pens.b; }
  out.winner = (m.gA > m.gB || (out.px != null && out.px > out.py)) ? mt.x : mt.y;
  return out;
}
async function simulateAll(A, B, st) {
  if (!st.stages.length) st.stages.push(makeStage(st.first, 0));
  for (;;) {
    const k = st.stages.length - 1;
    for (let i = 0; i < st.stages[k].length; i++) if (!st.stages[k][i].winner) st.stages[k][i] = await decideTie(A, B, st.stages[k][i], k);
    if (st.stages.length >= st.names.length) break;
    st.stages.push(makeStage(nextPairs(st, k), k + 1));
  }
  st.champ = st.stages[st.stages.length - 1][0].winner;
}
const mineInField = st => st.first.flat().concat(st.top8).filter(r => r && r.mine);

async function screenKnockout(A, B, tableRows) {
  setCrumb('Knockout stage');
  const lm = S.lastMatch || (S.lastMatch = { A, B });
  if (lm.ko && lm.ko.champ) return renderKnockout(A, B, lm.ko).catch(e => knockoutError(A, B, e));
  if (lm.ko) return screenRun(A, B);

  const st = knockoutField(tableRows);
  st.stages = [];
  if (!mineInField(st).length) {
    await simulateAll(A, B, st); lm.ko = st;
    return renderKnockout(A, B, st).catch(e => knockoutError(A, B, e));
  }
  const v = el(`<section>
    <h2>Knockout stage</h2>
    <p>You're through. How do you want to play it?</p>
    <button class="btn primary" id="play">Play your run<span class="sub">Each of your ties on the tactics board, penalties if it's level</span></button>
    <button class="btn" id="sim">Simulate instantly<span class="sub">See the whole bracket right away</span></button>
    <button class="btn ghost" id="back">Back to the table</button>
  </section>`);
  v.querySelector('#play').onclick = () => { st.stages.push(makeStage(st.first, 0)); lm.ko = st; screenRun(A, B); };
  v.querySelector('#sim').onclick = async () => { await simulateAll(A, B, st); lm.ko = st; renderKnockout(A, B, st).catch(e => knockoutError(A, B, e)); };
  v.querySelector('#back').onclick = () => screenTable(A, B);
  show(v);
}

// The in-between screen of a run: last result, the bracket so far, and
// whatever comes next (your next tie, the next round, or the rest).
function screenRun(A, B) {
  setCrumb('Knockout stage');
  const st = S.lastMatch.ko;
  const k = st.stages.length - 1, cur = st.stages[k];
  const pending = cur.filter(mt => !mt.winner);
  const lost = r => st.stages.some(s => s.some(mt => mt.winner && (mt.x === r || mt.y === r) && mt.winner !== r));
  const alive = mineInField(st).filter(r => !lost(r));
  const acts = [];
  let note = st.note || '';
  if (!note && st.isUCL && k === 0 && st.top8.some(r => r.mine)) note = '✅ Top-8 finish — straight into the Round of 16.';

  if (pending.length) {
    const mt = pending[0];
    acts.push({ label: `Kick off · ${st.names[k]}`, sub: `${mt.x.name} v ${mt.y.name}`, primary: true, fn: () => playTie(A, B, mt, st.names[k], k) });
    acts.push({ label: 'Simulate the rest instantly', fn: async () => { await simulateAll(A, B, st); renderKnockout(A, B, st).catch(e => knockoutError(A, B, e)); } });
  } else if (k === st.names.length - 1) {
    st.champ = cur[0].winner;
    if (st.champ.mine) SFX.roar(1.2);
  } else if (alive.length) {
    acts.push({ label: `On to the ${st.names[k + 1]}`, primary: true, fn: () => { st.stages.push(makeStage(nextPairs(st, k), k + 1)); st.note = ''; screenRun(A, B); } });
  } else {
    acts.push({ label: 'See how the rest plays out', primary: true, fn: async () => { await simulateAll(A, B, st); renderKnockout(A, B, st).catch(e => knockoutError(A, B, e)); } });
  }
  return renderKnockout(A, B, st, { note, actions: acts }).catch(e => knockoutError(A, B, e));
}

// A named club's own best XI, so an opponent can play on the board.
const clubXICache = new Map();
async function buildClubXI(name) {
  const key = S.leagueKey + '|' + name;
  if (clubXICache.has(key)) return clubXICache.get(key);
  const club = (S.leagueClubs || []).find(c => c.name === name);
  let team = null;
  if (club) {
    const squad = club.squad || await getSquad(S.leagueKey, club);
    for (const f of ['4-3-3', '4-2-3-1', '4-4-2', '3-5-2', '4-5-1', '3-4-3', '5-3-2', '5-4-1']) {
      const used = new Set(), xi = [];
      for (const s of FORMATIONS[f]) {
        const grp = GROUP[s.role];
        const pick = squad.filter(pl => ELIGIBLE[grp].includes(pl.position) && !used.has(pl.id))
          .map(pl => ({ ...pl, rating: getRating(pl, grp), club })).sort((a, b) => b.rating - a.rating)[0];
        if (!pick) break;
        used.add(pick.id); xi.push({ ...s, player: pick, rerolls: 0 });
      }
      if (xi.length === 11) { team = { label: club.name, formation: f, xi, strength: rateSquad(xi), badge: club }; break; }
    }
  }
  clubXICache.set(key, team);
  return team;
}
async function teamForRow(A, B, row) {
  if (row.mine) return row.name === `${B.label}'s XI` ? B : A;
  return buildClubXI(row.name);
}

async function playTie(A, B, mt, stageName, k) {
  const st = S.lastMatch.ko;
  const seed = koSeed(k, mt.x, mt.y);
  const home = await teamForRow(A, B, mt.x), away = await teamForRow(A, B, mt.y);
  if (!home || !away) {
    Object.assign(mt, resolveTie(mt.x, mt.y, seed ? seededRng(seed) : Math.random));
    st.note = `No real squad on file for ${esc((home ? mt.y : mt.x).name)}, so that tie was simulated: ${esc(mt.x.name)} ${mt.sx}–${mt.sy} ${esc(mt.y.name)}.`;
    return screenRun(A, B);
  }
  const m = simulate(home, away, seed || undefined);
  screenMatchSim(home, away, m, { crumb: stageName, onDone: () => {
    const finish = (px, py) => {
      mt.sx = m.gA; mt.sy = m.gB;
      const pens = px != null;
      if (pens) { mt.px = px; mt.py = py; }
      mt.winner = (m.gA > m.gB || (pens && px > py)) ? mt.x : mt.y;
      const winTeam = mt.winner === mt.x ? home : away;
      const scorers = m.events.filter(e => e.type === 'goal').map(e => `${esc(e.player)} ${e.min}'`).join(', ');
      const through = mt.winner.mine ? `✅ ${esc(winTeam.label)} go through.` : `❌ Knocked out by ${esc(winTeam.label)}.`;
      st.note = `<b>${esc(stageName)}</b> · ${esc(home.label)} ${m.gA}–${m.gB} ${esc(away.label)}${m.et ? ' (aet)' : ''}${pens ? ` · ${px}–${py} on penalties` : ''}
        ${scorers ? `<br><small>⚽ ${scorers}</small>` : ''}<br>${through}`;
      screenRun(A, B);
    };
    finish(m.pens ? m.pens.a : null, m.pens ? m.pens.b : null);   // extra time + pens already played on the board
  } });
}

/* --- penalty shootout ------------------------------------------------ */
// The whole shootout, kick by kick: five each, then sudden death.
function shootout(H, Aw, rng) {
  const rating = s => (typeof s.player.rating === 'number' ? s.player.rating : 75);
  const order = { FWD: 0, ATT_MID: 1, MID: 2, DEF: 3 };
  const takers = t => t.xi.filter(s => GROUP[s.role] !== 'GK')
    .sort((a, b) => (order[GROUP[a.role]] - order[GROUP[b.role]]) || (rating(b) - rating(a)));
  const keeper = t => t.xi.find(s => GROUP[s.role] === 'GK') || t.xi[0];
  const T = { home: { t: takers(H), gk: keeper(H), k: [] }, away: { t: takers(Aw), gk: keeper(Aw), k: [] } };
  const sum = s => T[s].k.filter(Boolean).length;
  const decided = () => {
    const a = sum('home'), b = sum('away'), na = T.home.k.length, nb = T.away.k.length;
    if (na <= 5 && nb <= 5 && (na < 5 || nb < 5)) return a + (5 - na) < b || b + (5 - nb) < a;
    return na === nb && a !== b;
  };
  const kicks = [];
  while (!decided() && kicks.length < 60) {
    const side = T.home.k.length <= T.away.k.length ? 'home' : 'away', other = side === 'home' ? 'away' : 'home';
    const taker = T[side].t[T[side].k.length % T[side].t.length];
    const p = Math.max(0.6, Math.min(0.9, 0.76 + (rating(taker) - rating(T[other].gk)) * 0.005));
    const scored = rng() < p, saved = rng() < 0.6;
    T[side].k.push(scored);
    kicks.push({ side, taker, scored, saved });
  }
  return { kicks, a: sum('home'), b: sum('away') };
}

function screenPenalties(H, Aw, m, onDone, humanSideOuter) {
  setCrumb('Penalties');
  const rating = s => (typeof s.player.rating === 'number' ? s.player.rating : 75);
  const order = { FWD: 0, ATT_MID: 1, MID: 2, DEF: 3 };
  const takers = t => t.xi.filter(s => GROUP[s.role] !== 'GK')
    .sort((a, b) => (order[GROUP[a.role]] - order[GROUP[b.role]]) || (rating(b) - rating(a)));
  const keeper = t => t.xi.find(s => GROUP[s.role] === 'GK') || t.xi[0];
  const T = { home: { team: H, takers: takers(H), gk: keeper(H), kicks: [] }, away: { team: Aw, takers: takers(Aw), gk: keeper(Aw), kicks: [] } };

  const v = el(`<section>
    <h2>Penalties</h2>
    <p><small>${m.penaltyOnly ? 'Straight to the spot — no messing about.' : `${esc(H.label)} ${m.gA}–${m.gB} ${esc(Aw.label)} after ${m.et ? 'extra time' : '90 minutes'}.`}</small></p>
    <div class="card" style="text-align:center">
      <div id="pscore" style="font-family:'Bricolage Grotesque';font-weight:800;font-size:2.4rem">0 – 0</div>
      ${['home', 'away'].map(s => `<div style="display:flex;align-items:center;gap:10px;margin-top:10px">
        <b style="flex:0 0 38%;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(T[s].team.label)}</b>
        <div id="pk-${s}" style="display:flex;gap:6px;flex-wrap:wrap"></div></div>`).join('')}
    </div>
    <p id="pcomm" style="text-align:center;min-height:2.8em"></p>

    <div id="pgoal-wrap" style="display:none;margin:14px 0">
      <p id="pgoal-status" style="text-align:center;font-weight:700;margin:0 0 8px"></p>
      <div id="pgoal-field" style="position:relative;width:100%;max-width:340px;margin:0 auto;aspect-ratio:4/3;
        border-radius:var(--r);overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,.15);
        background:linear-gradient(#dff0e3,#dff0e3 62%,#5fa86b 62%,#5fa86b)">
        <div id="pgoal-box" style="position:absolute;left:8%;right:8%;top:10%;height:52%;border:6px solid #fff;border-bottom:none;
          background:repeating-linear-gradient(0deg, rgba(255,255,255,.35) 0 1px, transparent 1px 14px),
          repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 1px, transparent 1px 14px);cursor:crosshair;touch-action:none"></div>
        <div id="pgoal-keeper" style="position:absolute;width:13%;aspect-ratio:1/1.5;left:50%;top:68%;transform:translate(-50%,-50%);
          transition:left .45s cubic-bezier(.2,.7,.3,1),top .45s cubic-bezier(.2,.7,.3,1),transform .45s;
          filter:drop-shadow(0 3px 3px rgba(0,0,0,.3))">
          <svg viewBox="0 0 60 90" style="width:100%;height:100%;overflow:visible">
            <path d="M30 55 L18 88" style="stroke:var(--ink);stroke-width:6;fill:none;stroke-linecap:round"/>
            <path d="M30 55 L42 88" style="stroke:var(--ink);stroke-width:6;fill:none;stroke-linecap:round"/>
            <path d="M30 30 L8 14" style="stroke:var(--ink);stroke-width:6;fill:none;stroke-linecap:round"/>
            <path d="M30 30 L52 14" style="stroke:var(--ink);stroke-width:6;fill:none;stroke-linecap:round"/>
            <rect x="18" y="26" width="24" height="32" rx="7" style="fill:var(--orange);stroke:var(--ink);stroke-width:4"/>
            <circle cx="30" cy="14" r="11" style="fill:#e8b98a;stroke:var(--ink);stroke-width:4"/>
          </svg>
        </div>
        <div id="pgoal-ball" style="position:absolute;width:9%;aspect-ratio:1/1;left:50%;bottom:-6%;transform:translate(-50%,0);
          font-size:1.3rem;transition:left 1s cubic-bezier(.3,.55,.25,1),top 1s cubic-bezier(.3,.55,.25,1),bottom 1s cubic-bezier(.3,.55,.25,1)">⚽</div>
      </div>
      <button class="btn primary" id="pgoal-confirm" disabled style="max-width:340px;margin:10px auto 0">Confirm</button>
    </div>
    <div id="pgoal-pass" style="display:none;position:fixed;inset:0;background:rgba(36,31,25,.75);
      align-items:center;justify-content:center;z-index:60;padding:20px">
      <div class="card" style="text-align:center;max-width:300px">
        <h3>Pass the phone</h3>
        <p id="pgoal-pass-sub" style="margin:6px 0 16px"></p>
        <button class="btn primary" id="pgoal-pass-go">Continue</button>
      </div>
    </div>

    <div id="pend"></div>
    <button class="btn ghost" id="pskip">Skip to the result</button>
  </section>`);
  show(v);
  const circle = () => el('<span style="width:20px;height:20px;border-radius:50%;border:2px solid var(--line,#ccc);display:inline-block"></span>');
  ['home', 'away'].forEach(s => { for (let i = 0; i < 5; i++) v.querySelector('#pk-' + s).appendChild(circle()); });
  const comm = v.querySelector('#pcomm'), pscore = v.querySelector('#pscore');
  // decide every kick up front (seeded in shared games), then animate it —
  // this is also what "skip" and online/spectate games fall back to
  const plan = (m.pens && m.pens.kicks) || shootout(H, Aw, m.seed ? seededRng(m.seed + '|pens') : Math.random).kicks;
  let fast = false;
  v.querySelector('#pskip').onclick = () => { fast = true; };
  const wait = ms => fast ? Promise.resolve() : sleep(ms);
  const sum = s => T[s].kicks.filter(Boolean).length;
  const decided = () => {
    const a = sum('home'), b = sum('away'), na = T.home.kicks.length, nb = T.away.kicks.length;
    if (na <= 5 && nb <= 5 && (na < 5 || nb < 5)) return a + (5 - na) < b || b + (5 - nb) < a;
    return na === nb && a !== b;
  };

  /* -- interactive taking: local pass-and-play and vs-AI kicks are played
     out by tapping the goal, instead of purely simulated. Online/spectate
     games stay on the seeded plan above so both phones see the same result. */
  // Online/spectate always stay on the seeded plan below (no real-time tap
  // syncing between two devices yet). Everywhere else, defer to the same
  // "is this actually your team" check the live match screen used — so a
  // knockout-run tie where you're drawn away still gets the interactive goal.
  const humanSide = side => (S.mode === 'online' || S.mode === 'spectate') ? false
    : humanSideOuter ? humanSideOuter(side)
    : S.mode === 'pass' ? true : S.mode === 'ai' ? side === 'home' : false;

  const gWrap = v.querySelector('#pgoal-wrap'), gStatus = v.querySelector('#pgoal-status'),
    gBox = v.querySelector('#pgoal-box'), gKeeper = v.querySelector('#pgoal-keeper'),
    gBall = v.querySelector('#pgoal-ball'), gConfirm = v.querySelector('#pgoal-confirm'),
    gPass = v.querySelector('#pgoal-pass'), gPassSub = v.querySelector('#pgoal-pass-sub'),
    gPassGo = v.querySelector('#pgoal-pass-go');

  function moveKeeper(x, y) {
    const deg = Math.max(-38, Math.min(38, (x - 50) / 50 * 38));
    gKeeper.style.left = x + '%'; gKeeper.style.top = y + '%';
    gKeeper.style.transform = `translate(-50%,-50%) rotate(${deg}deg)`;
  }
  function resetPitch() {
    moveKeeper(50, 68);
    gBall.style.left = '50%'; gBall.style.bottom = '-6%'; gBall.style.top = '';
    gBox.querySelectorAll('.pmark').forEach(mk => mk.remove());
  }
  function markAt(x, y, color) {
    gBox.querySelectorAll('.pmark').forEach(mk => mk.remove());
    const d = el(`<div class="pmark" style="position:absolute;width:24px;height:24px;border-radius:50%;
      transform:translate(-50%,-50%);border:3px solid ${color};background:${color}33;pointer-events:none"></div>`);
    d.style.left = x + '%'; d.style.top = y + '%';
    gBox.appendChild(d);
  }
  function pointFromEvent(e) {
    const r = gBox.getBoundingClientRect();
    const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    return { x: Math.max(4, Math.min(96, cx / r.width * 100)), y: Math.max(4, Math.min(96, cy / r.height * 100)) };
  }
  function passOver(msg) {
    return new Promise(res => {
      gPassSub.textContent = msg;
      gPass.style.display = 'flex';
      gPassGo.onclick = () => { gPass.style.display = 'none'; res(); };
    });
  }
  function humanTap(promptText) {
    return new Promise(res => {
      resetPitch();
      gStatus.textContent = promptText;
      gConfirm.disabled = true;
      let pt = null;
      const onDown = e => {
        e.preventDefault();
        pt = pointFromEvent(e);
        markAt(pt.x, pt.y, 'var(--orange)');
        gConfirm.disabled = false;
      };
      gBox.addEventListener('pointerdown', onDown);
      gConfirm.onclick = () => {
        if (!pt) return;
        gBox.removeEventListener('pointerdown', onDown);
        res(pt);
      };
    });
  }
  function aiTap(spreadX, spreadY) {
    const zones = [[22, 30], [50, 25], [78, 30], [22, 60], [50, 55], [78, 60]];
    const base = zones[Math.floor(Math.random() * zones.length)];
    return {
      x: Math.max(4, Math.min(96, base[0] + (Math.random() * spreadX - spreadX / 2))),
      y: Math.max(4, Math.min(96, base[1] + (Math.random() * spreadY - spreadY / 2)))
    };
  }
  async function interactiveKick(taker, gk, shooterHuman, keeperHuman) {
    gWrap.style.display = 'block';
    let shot;
    if (shooterHuman) {
      shot = await humanTap(`${taker.player.name}: tap where you want to shoot`);
    } else {
      resetPitch();
      gStatus.textContent = `${taker.player.name} is placing the ball…`;
      gConfirm.disabled = true;
      await sleep(500);
      shot = aiTap(14, 10);
    }
    resetPitch();   // clears the shot marker — the keeper always guesses blind
    if (shooterHuman && keeperHuman) await passOver(`Hand the phone over — ${gk.player.name} is in goal.`);
    let save;
    if (keeperHuman) {
      save = await humanTap(`${gk.player.name}: tap where you want to dive`);
    } else {
      gStatus.textContent = `${gk.player.name} is watching the run-up…`;
      gConfirm.disabled = true;
      await sleep(500);
      save = aiTap(16, 12);
    }
    moveKeeper(save.x, save.y);
    gBall.style.left = shot.x + '%'; gBall.style.top = shot.y + '%'; gBall.style.bottom = '';
    const dx = shot.x - save.x, dy = shot.y - save.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // a sharper keeper covers a little more ground — the dive doesn't have to land exactly on the shot
    const tol = Math.max(16, Math.min(32, 24 + (rating(gk) - 75) * 0.15));
    await sleep(550);
    gWrap.style.display = 'none';
    return { scored: dist > tol };
  }

  (async () => {
    while (!decided()) {
      const side = T.home.kicks.length <= T.away.kicks.length ? 'home' : 'away';
      const other = side === 'home' ? 'away' : 'home';
      const n = T[side].kicks.length;
      const kick = plan[T.home.kicks.length + T.away.kicks.length];
      const taker = kick.taker;
      comm.innerHTML = `<b>${esc(taker.player.name)}</b> steps up…`;
      if (!fast) SFX.whistle(1);
      await wait(1100);

      let scored, saved;
      const shooterHuman = humanSide(side), keeperHuman = humanSide(other);
      if (!fast && (shooterHuman || keeperHuman)) {
        const res = await interactiveKick(taker, T[other].gk, shooterHuman, keeperHuman);
        scored = res.scored; saved = !res.scored;
      } else {
        scored = kick.scored; saved = kick.saved;
      }

      if (!fast) SFX.thump();
      T[side].kicks.push(scored);
      const row = v.querySelector('#pk-' + side);
      if (n >= 5) { row.appendChild(circle()); }
      const c = row.children[n];
      c.style.background = scored ? '#22C55E' : '#E5484D';
      c.style.borderColor = scored ? '#22C55E' : '#E5484D';
      pscore.textContent = `${sum('home')} – ${sum('away')}`;
      comm.innerHTML = scored ? `⚽ <b>${esc(taker.player.name)}</b> scores!`
        : saved ? `🧤 Saved by <b>${esc(T[other].gk.player.name)}</b>!` : `❌ <b>${esc(taker.player.name)}</b> misses!`;
      if (!fast) { if (scored) SFX.roar(0.55); else SFX.groan(); }
      await wait(1200);
    }
    const a = sum('home'), b = sum('away');
    const win = a > b ? H : Aw;
    if (!fast) SFX.roar(1);
    comm.innerHTML = `<b>${esc(win.label)}</b> win ${Math.max(a, b)}–${Math.min(a, b)} on penalties.`;
    v.querySelector('#pskip').remove();
    const go = el('<button class="btn primary">Continue</button>');
    go.onclick = () => onDone(a, b);
    v.querySelector('#pend').appendChild(go);
  })();
}

function knockoutError(A, B, e) {
  if (S.lastMatch) S.lastMatch.ko = null;
  const v = el(`<section><h2>Knockout stage</h2>
    <p><small>Couldn't draw the bracket: ${esc(String(e && e.message || e))}</small></p>
    <button class="btn ghost" id="back">Back to the table</button></section>`);
  v.querySelector('#back').onclick = () => screenTable(A, B);
  show(v);
}

// Draws the bracket (complete or part-played), plus any note and actions.
async function renderKnockout(A, B, st, opts = {}) {
  const done = !!st.champ;
  const winnerLabel = S.leagueKey === 'WC' ? 'World Champions' : 'Champions';
  const v = el(`<section>
    <h2>${done ? 'Knockout stage' : 'Your knockout run'}</h2>
    ${st.missed.map(r => `<p><small>⚠️ ${esc(r.name)} didn't make the knockout rounds.</small></p>`).join('')}
    ${opts.note ? `<div class="card" style="margin-bottom:10px">${opts.note}</div>` : ''}
    <div id="acts"></div>
    ${done ? `<div class="card" id="champCard" style="text-align:center;opacity:0;transition:opacity .4s ease">
      <h3>${winnerLabel}</h3>
      <p style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.5rem">${st.champ.mine ? '🏆 ' : ''}${esc(st.champ.name)}</p></div>` : ''}
    ${st.isUCL ? `<h3 style="margin-top:14px">Knockout playoff round</h3><p><small>9th–24th · 9 v 24, 10 v 23 … 16 v 17</small></p>
      <div id="w1"></div><h3 style="margin-top:18px">Round of 16 onwards</h3><p><small>Top 8 + 8 playoff winners</small></p>` : ''}
    <div id="w2"></div>
    <button class="btn ghost" id="back" style="margin-top:10px">Back to the table</button>
  </section>`);
  v.querySelector('#back').onclick = () => screenTable(A, B);
  (opts.actions || []).forEach(a => {
    const b = el(`<button class="btn ${a.primary ? 'primary' : 'ghost'}">${esc(a.label)}${a.sub ? `<span class="sub">${esc(a.sub)}</span>` : ''}</button>`);
    b.onclick = a.fn;
    v.querySelector('#acts').appendChild(b);
  });
  show(v);
  const main = st.isUCL ? st.stages.slice(1) : st.stages;
  const mainNames = st.isUCL ? st.names.slice(1) : st.names;
  if (st.isUCL && st.stages[0]) {
    const pb = await drawBracket([st.stages[0]], [st.names[0]]);
    v.querySelector('#w1').appendChild(pb.wrap); await pb.reveal();
  }
  if (main.length) {
    const mb = await drawBracket(main, mainNames);
    v.querySelector('#w2').appendChild(mb.wrap); await mb.reveal();
  }
  const cc = v.querySelector('#champCard');
  if (cc) cc.style.opacity = 1;
  if (done) hofKnockout(A, B, st);
}

// Shared helper — renders bracket rounds into a scrollable visual bracket
// with SVG connector lines, a label over each round and scores per tie.
async function drawBracket(rounds, names = []) {
  const wrap = el(`<div style="overflow-x:auto;margin:0 -16px;padding:4px 16px">
    <div class="bracket" id="bkt" style="position:relative;display:flex;gap:30px;min-height:240px;padding-top:22px"></div>
  </div>`);
  const bracket = wrap.querySelector('#bkt');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('style', 'position:absolute;top:0;left:0;pointer-events:none;overflow:visible');
  bracket.appendChild(svg);
  const matchBoxes = [];
  const line = (mt, t, score, pen) => {
    const style = !mt.winner ? '' : mt.winner === t ? 'font-weight:700' : 'opacity:.6';
    const sc = score == null ? '' : `${score}${pen != null ? ` <small>(${pen})</small>` : ''}`;
    return `<div style="display:flex;justify-content:space-between;gap:8px;padding:2px 0;${style}">
      <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.mine ? '🔶 ' : ''}${esc(t.name)}</span><span>${sc}</span></div>`;
  };
  rounds.forEach((matches, r) => {
    const col = el(`<div class="bround" style="position:relative;display:flex;flex-direction:column;justify-content:space-around;
      gap:16px;min-width:164px;flex:none;opacity:0;transition:opacity .4s ease">
      ${names[r] ? `<div style="position:absolute;top:-20px;left:0;right:0;text-align:center;font-size:.7rem;opacity:.7">${esc(names[r])}</div>` : ''}</div>`);
    matches.forEach(mt => {
      const box = el(`<div class="card bmatch" style="padding:8px 10px;margin:0;font-size:.8rem;
        ${(mt.x.mine || mt.y.mine) ? 'border-color:var(--orange)' : ''}">
        ${line(mt, mt.x, mt.sx, mt.px)}${line(mt, mt.y, mt.sy, mt.py)}</div>`);
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
          const fromB = matchBoxes.find(b => b.round === r && b.mt === mt);
          const toB = matchBoxes.find(b => b.round === r + 1 && b.mt === rounds[r + 1][Math.floor(i / 2)]);
          if (!fromB || !toB) return;
          const from = cx(fromB.el);
          const to = { x: toB.el.getBoundingClientRect().left - wr.left, y: cx(toB.el).y };
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

  const legend = S.leagueKey === 'LEG'
    ? `<p style="display:flex;gap:14px;flex-wrap:wrap;margin:8px 0 0">
        <small><span style="display:inline-block;width:10px;height:10px;background:#22C55E;border-radius:2px;margin-right:4px"></span>Top 16 into the knockout rounds</small>
       </p>`
    : S.leagueKey === 'UCL'
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
    if (rows.length && (S.leagueKey === 'UCL' || S.leagueKey === 'LEG')) {
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
  if (leagueKey === 'LEG') return pos <= 16 ? '#22C55E' : null; // top 16 into the knockout
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

// A squad as sent to the server (players may still be empty mid-draft).
function squadPayload(p) {
  return {
    label: p.label, formation: p.formation, deviceId: deviceId(),
    badge: p.badge ? { home: p.badge.home, away: p.badge.away, name: p.badge.name } : null,
    strength: p.strength,
    bench: (p.bench || []).map(b => ({ name:b.name, number:b.number, rating:b.rating, position:b.position,
      club: b.club ? { name:b.club.name, home:b.club.home, away:b.club.away } : null })),
    xi: (p.xi || []).map(s => ({ role:s.role, x:s.x, y:s.y, player: s.player ? {
      name:s.player.name, number:s.player.number, rating:s.player.rating,
      club:{ name:s.player.club.name, home:s.player.club.home, away:s.player.club.away } } : null }))
  };
}
// Rebuild a squad exactly as the server holds it — everyone (both players
// and any spectators) goes through this, so they all simulate the same match.
function hydrateSquad(sq, fallbackLabel) {
  return {
    label: sq.label || fallbackLabel, formation: sq.formation, strength: sq.strength, deviceId: sq.deviceId || null,
    badge: sq.badge || { home:'#888', away:'#fff', name:'' },
    bench: sq.bench || [],
    xi: sq.xi.map(s => ({ ...s, player: { ...s.player, club: s.player.club || { name:'', home:'#888', away:'#fff' } } }))
  };
}
// Seed from things every device agrees on — never from timing.
const matchSeed = (code, A, B) =>
  `${code}|${A.label}|${B.label}|${A.xi.map(s => s.player.name).join(',')}|${B.xi.map(s => s.player.name).join(',')}`;

// Mid-draft updates, so spectators can watch the XI fill up.
function publishProgress() {
  if (S.mode !== 'online' || !S.room) return;
  api({ action:'progress', code:S.room.code, seat:S.room.seat, squad: squadPayload(me()) });
}

async function publishSquad() {
  const p = me();
  await ensureBench(p);
  if (S.admin && S.admin.rig) await pushRig();
  const payload = squadPayload(p);

  // Show the waiting screen — no internal poll inside screenWait here,
  // we manage one clean poll ourselves below so they can't fight.
  const wv = el(`<section><h2>Squad locked in</h2>
    <p>Waiting for your opponent to finish building their XI…</p>
    <div class="bar"><i style="width:40%"></i></div>
    <p id="netstat" style="margin-top:12px"><small>Saving your squad…</small></p>
    <button class="btn ghost" id="watchqr">👀 Let friends watch</button><div id="watchbox"></div></section>`);
  wv.querySelector('#watchqr').onclick = () => showWatchQR(wv.querySelector('#watchbox'), S.room.code);
  show(wv);
  const statusEl = wv.querySelector('#netstat');
  const t0 = Date.now();
  let saved = false, lastErr = '', storeKind = '';
  const setStatus = () => {
    const secs = Math.round((Date.now() - t0) / 1000);
    let msg = saved ? `✅ Your squad is saved to room ${esc(room.code)}. Checking for your opponent… (${secs}s)`
                    : `⏳ Saving your squad… ${lastErr ? `<br>Last try failed: ${esc(lastErr)} — retrying.` : ''}`;
    if (saved && storeKind === 'kv' && secs > 15)
      msg += '<br>The room server can take up to a minute to sync. Connecting the D1 database makes it instant.';
    statusEl.innerHTML = `<small>${msg}</small>`;
  };

  // Keep trying until the save goes through, and re-save every so often:
  // cheap, harmless if it's already there, and it repairs a squad that got
  // lost on the server (e.g. both players locking in at the same moment).
  const room = { ...S.room };   // this match's room, even if a new one opens later
  const submit = async () => {
    const r = await api({ action:'submit', code:room.code, seat:room.seat, squad:payload });
    if (r && r.ok) { saved = true; lastErr = ''; if (r.store) storeKind = r.store; }
    else lastErr = r ? (r.error || 'server error') : 'no connection';
    setStatus();
    return r;
  };
  const submitRes = await submit();


  let started = false;
  function tryAdvance(r) {
    const st = r && r.state;
    if (started || !st || !st.squads || !st.squads[0] || !st.squads[1]) return;
    started = true;
    stopPoll();
    // Keep our squad on the server for a little while after we start, in
    // case the opponent's phone is still checking and an older server
    // setup dropped it — otherwise they'd be left waiting forever.
    let keep = 0;
    const keepT = setInterval(() => { if (++keep > 12) return clearInterval(keepT); submit(); }, 2500);
    const A = hydrateSquad(st.squads[0], S.players[0].label), B = hydrateSquad(st.squads[1], S.players[1].label);
    S.players[0] = { ...S.players[0], ...A }; S.players[1] = { ...S.players[1], ...B };
    const seed = matchSeed(room.code, A, B);
    // Server time → this phone's clock, so both count down to the same moment.
    const offset = (r.now || Date.now()) - Date.now();
    const kickAt = st.kickoff ? st.kickoff - offset : Date.now();
    const v = el(`<section><h2>Both squads are in</h2>
      <p>${esc(A.label)} v ${esc(B.label)}</p>
      <div class="card" style="text-align:center"><div class="code" id="count">…</div><small>Kick-off</small></div></section>`);
    show(v);
    const tick = () => {
      const left = Math.ceil((kickAt - Date.now()) / 1000);
      if (left <= 0) { if (S.admin) S.admin.rig = null; return startMatch(A, B, seed, rigFromState(st)); }
      v.querySelector('#count').textContent = left;
      setTimeout(tick, 200);
    };
    tick();
  }

  if (submitRes && submitRes.ok) tryAdvance(submitRes);
  if (started) return;
  let n = 0, missing = 0;
  S.poll = setInterval(async () => {
    n++;
    if (!saved || n % 8 === 0) { const r = await submit(); if (r && r.ok) { tryAdvance(r); return; } }
    const r = await api({ action:'state', code:room.code });
    if (r && r.store) storeKind = r.store;
    // A brand-new room can briefly look "not found" while the server syncs,
    // so only give up on it after a long unbroken run of misses.
    if (r && r.error === 'not-found') {
      missing = missing || Date.now();
      if (Date.now() - missing > 90000) { statusEl.innerHTML = '<small>❌ This room has expired or the code is wrong. Start a new room.</small>'; return stopPoll(); }
    } else if (r && r.ok) missing = 0;
    setStatus();
    tryAdvance(r);
  }, 1000);
}

/* ------------------------------------------------------------------ *
 * SOUND — all synthesised with Web Audio (no audio files): crowd bed,
 * referee's whistle, goal roar, ball strike, groan. Mute persists.
 * ------------------------------------------------------------------ */
const SFX = (() => {
  let ctx = null, muted = false, crowd = null;
  try { muted = localStorage.getItem('sp1nxi-muted') === '1'; } catch (e) {}
  const ac = () => {
    if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  const noiseBuf = (c, secs) => {
    const b = c.createBuffer(1, Math.floor(c.sampleRate * secs), c.sampleRate), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    return b;
  };
  function whistle(n = 1, long = false) {
    if (muted) return; const c = ac(); if (!c) return;
    let t = c.currentTime + 0.02;
    for (let i = 0; i < n; i++) {
      const dur = long && i === n - 1 ? 0.9 : 0.28;
      const o = c.createOscillator(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
      o.frequency.value = 2900; lfo.frequency.value = 38; lg.gain.value = 180;
      lfo.connect(lg); lg.connect(o.frequency);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.setValueAtTime(0.12, t + dur - 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t); lfo.start(t); o.stop(t + dur + 0.02); lfo.stop(t + dur + 0.02);
      t += dur + 0.14;
    }
  }
  function crowdStart() {
    if (muted || crowd) return; const c = ac(); if (!c) return;
    const src = c.createBufferSource(); src.buffer = noiseBuf(c, 4); src.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 700; bp.Q.value = 0.6;
    const g = c.createGain(); g.gain.setValueAtTime(0, c.currentTime); g.gain.linearRampToValueAtTime(0.08, c.currentTime + 1.5);
    const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = 0.13; lg.gain.value = 0.025;
    lfo.connect(lg); lg.connect(g.gain);
    src.connect(bp); bp.connect(g); g.connect(c.destination); src.start(); lfo.start();
    crowd = { src, g, lfo };
  }
  function crowdStop() {
    if (!crowd || !ctx) return;
    const { src, g, lfo } = crowd; crowd = null;
    const t = ctx.currentTime;
    g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(0, t + 1.2);
    src.stop(t + 1.3); lfo.stop(t + 1.3);
  }
  function roar(level = 1) {
    if (muted) return; const c = ac(); if (!c) return;
    const t = c.currentTime, src = c.createBufferSource(); src.buffer = noiseBuf(c, 3.4);
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.7;
    bp.frequency.setValueAtTime(450, t); bp.frequency.linearRampToValueAtTime(1100, t + 0.5); bp.frequency.linearRampToValueAtTime(700, t + 3);
    const g = c.createGain(); g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.35 * level, t + 0.35); g.gain.linearRampToValueAtTime(0, t + 3.2);
    src.connect(bp); bp.connect(g); g.connect(c.destination); src.start(t); src.stop(t + 3.4);
  }
  function thump() {
    if (muted) return; const c = ac(); if (!c) return;
    const t = c.currentTime, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(50, t + 0.12);
    g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.16);
  }
  function groan() {
    if (muted) return; const c = ac(); if (!c) return;
    const t = c.currentTime, src = c.createBufferSource(); src.buffer = noiseBuf(c, 1.4);
    const lp = c.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(900, t); lp.frequency.linearRampToValueAtTime(250, t + 1.2);
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.18, t + 0.15); g.gain.linearRampToValueAtTime(0, t + 1.3);
    src.connect(lp); lp.connect(g); g.connect(c.destination); src.start(t); src.stop(t + 1.4);
  }
  function setMuted(v) {
    muted = v;
    try { localStorage.setItem('sp1nxi-muted', v ? '1' : '0'); } catch (e) {}
    if (v) crowdStop();
  }
  return { whistle, crowdStart, crowdStop, roar, thump, groan, setMuted, get muted() { return muted; } };
})();

// Dark mode: a charcoal version of the cream theme (World Cup, menus,
// quiz…). The Premier League and Champions League keep their own looks.
(function darkModeStyles() {
  const css = `
  body.dark-mode:not(.pl-mode):not(.ucl-mode){
    --cream:#15120F; --cream-2:#221D18; --ink:#F3ECE0; --ink-soft:#A99D8D; --line:#3A322A;
    background:radial-gradient(ellipse at 50% -10%,rgba(228,118,43,.10),transparent 55%),#15120F;color:#F3ECE0}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .top{background:#15120F}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .brand{color:#F3ECE0}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) h1,body.dark-mode:not(.pl-mode):not(.ucl-mode) h2,
  body.dark-mode:not(.pl-mode):not(.ucl-mode) h3{color:#FFF6EA}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .plyr,body.dark-mode:not(.pl-mode):not(.ucl-mode) .sheet,
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .league-btn[aria-pressed="true"],
  body.dark-mode:not(.pl-mode):not(.ucl-mode) tr.me td{background:#2A241E}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .reel{background:#221D18}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .reel::after{background:linear-gradient(#221D18,rgba(34,29,24,0) 28%,rgba(34,29,24,0) 72%,#221D18)}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .btn{background:#2A241E;color:#F3ECE0;border-color:#40372E}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .btn.primary{background:var(--orange);border-color:var(--orange);color:#fff}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .btn.ghost{background:transparent}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) input{background:#2A241E !important;color:#F3ECE0;border-color:#40372E}
  body.dark-mode:not(.pl-mode):not(.ucl-mode) .foot{color:#7D7265}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  try { if (JSON.parse(localStorage.getItem('sp1nxi-dark'))) document.body.classList.add('dark-mode'); } catch (e) {}
})();

// Mute toggle, top-right next to the page label.
(function addMuteButton() {
  const hdr = document.querySelector('header.top'), cr = document.getElementById('crumb');
  if (!hdr || !cr) return;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;align-items:center;gap:6px';
  cr.replaceWith(box); box.appendChild(cr);
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Sound on/off');
  b.style.cssText = 'background:none;border:0;font-size:1.1rem;cursor:pointer;padding:4px;line-height:1';
  const paint = () => { b.textContent = SFX.muted ? '🔇' : '🔊'; };
  paint();
  b.onclick = () => { SFX.setMuted(!SFX.muted); paint(); if (!SFX.muted && document.querySelector('.ms')) SFX.crowdStart(); };
  const d = b.cloneNode();
  d.setAttribute('aria-label', 'Dark mode on/off');
  const paintD = () => { d.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙'; };
  paintD();
  d.onclick = () => {
    const on = document.body.classList.toggle('dark-mode');
    store.set('sp1nxi-dark', on); paintD();
    if (document.body.classList.contains('pl-mode') || document.body.classList.contains('ucl-mode'))
      toast(on ? 'Dark mode on — it shows on the World Cup, menus and quizzes.' : 'Dark mode off.');
  };
  box.appendChild(d);
  box.appendChild(b);
})();

/* --- player ratings out of 10 + player of the match ----------------- */
function playerRatings(A, B, m) {
  if (m.ratings) return m.ratings;
  const out = {};
  const rand = m.seed ? seededRng(m.seed + '|ratings') : Math.random;
  [['home', A, m.gA, m.gB], ['away', B, m.gB, m.gA]].forEach(([side, t, gf, ga]) => {
    out[side] = t.xi.map(s => {
      const grp = GROUP[s.role], nm = s.player.name;
      const goals = m.events.filter(e => e.side === side && e.type === 'goal' && e.player === nm).length;
      const cards = m.events.filter(e => e.side === side && e.type === 'card' && e.player === nm).length
        + 3.5 * m.events.filter(e => e.side === side && e.type === 'red' && e.player === nm).length;
      let r = 6.3 + ((s.player.rating || 75) - 80) * 0.03 + (gf > ga ? 0.45 : gf < ga ? -0.35 : 0.05) + (rand() * 0.8 - 0.4);
      r += goals * 1.1 - cards * 0.4;
      if (grp === 'GK' || grp === 'DEF') r += ga === 0 ? (grp === 'GK' ? 0.9 : 0.6) : -0.18 * ga;
      if (grp === 'MID') r += 0.1 * gf;
      return { name: nm, number: s.player.number, grp, r: Math.round(Math.max(4.8, Math.min(10, r)) * 10) / 10, goals, cards };
    });
  });
  let motm = null;
  ['home', 'away'].forEach(side => out[side].forEach(p => { if (!motm || p.r > motm.r) motm = { ...p, side }; }));
  out.motm = motm;
  m.ratings = out;
  return out;
}
const ratingColor = r => r >= 9 ? '#2563EB' : r >= 8 ? '#16A34A' : r >= 7 ? '#65A30D' : r >= 6 ? '#E08A0B' : '#E5484D';
const ratingChip = (r, big) => `<span style="display:inline-block;min-width:${big ? 46 : 34}px;text-align:center;padding:${big ? '6px 8px' : '2px 6px'};
  border-radius:6px;background:${ratingColor(r)};color:#fff;font-weight:800;font-size:${big ? '1.1rem' : '.78rem'}">${r.toFixed(1)}</span>`;

/* ------------------------------------------------------------------ *
 * PUNDIT — a short TV-style match report built from what actually
 * happened: the result, the story of the goals, standout players, cards,
 * the weather and whether the scoreline was fair. Seeded like the match
 * so both phones in an online game read the same words.
 * ------------------------------------------------------------------ */
function punditReport(A, B, m) {
  if (m.pundit) return m.pundit;
  const rand = m.seed ? seededRng(m.seed + '|pundit') : Math.random;
  const pick = arr => arr[Math.floor(rand() * arr.length)];
  const nameOf = side => (side === 'home' ? A : B).label;
  const goals = m.events.filter(e => e.type === 'goal').sort((a, b) => a.min - b.min);
  const cards = m.events.filter(e => e.type === 'card');
  const draw = m.gA === m.gB, winSide = m.gA > m.gB ? 'home' : 'away', loseSide = winSide === 'home' ? 'away' : 'home';
  const W = draw ? null : nameOf(winSide), L = draw ? null : nameOf(loseSide);
  const margin = Math.abs(m.gA - m.gB), total = m.gA + m.gB;
  const out = [];

  // did the winners have to come from behind?
  let h = 0, a = 0, trailed = false;
  goals.forEach(g => { if (g.side === 'home') h++; else a++; if (!draw && (winSide === 'home' ? h < a : a < h)) trailed = true; });
  const last = goals[goals.length - 1];
  const lateWinner = !draw && margin === 1 && last && last.side === winSide && last.min >= 84;

  const pW = m.winSide ? nameOf(m.winSide) : null, pL = m.winSide ? nameOf(m.winSide === 'home' ? 'away' : 'home') : null;
  if (m.pens) out.push(pick([
    `120 minutes couldn't separate them, so it came down to the lottery — and ${pW} held their nerve to win ${Math.max(m.pens.a, m.pens.b)}–${Math.min(m.pens.a, m.pens.b)} on penalties.`,
    `Heartbreak for ${pL}. ${m.gA}–${m.gB} after extra time, and ${pW} win it from the spot.`]));
  else if (m.et) {
    const etw = goals.filter(g => g.et && g.side === m.winSide).pop();
    out.push(pick([
      `Level after 90, but ${pW} found something extra${etw ? ` — ${etw.player} the hero in the ${etw.min}th minute` : ''}.`,
      `It took extra time, but ${pW} got there in the end. ${pL} simply ran out of legs.`]));
  }
  else if (draw && total === 0) out.push(pick([
    `A goalless stalemate between ${nameOf('home')} and ${nameOf('away')} — two defences that simply wouldn't blink.`,
    `Nil-nil. You won't see this one on the highlights reel, but tactically it was a proper chess match.`]));
  else if (draw) out.push(pick([
    `${m.gA}–${m.gB}, and honestly neither side will be happy with a point after that.`,
    `Honours even at ${m.gA}–${m.gB} — end to end, and a fair result in the end.`]));
  else if (margin >= 3) out.push(pick([
    `That was a hammering. ${W} were ruthless, ${L} were nowhere — ${Math.max(m.gA, m.gB)}–${Math.min(m.gA, m.gB)} flatters nobody.`,
    `A statement win from ${W}. ${L} will want to watch that one back through their fingers.`]));
  else if (lateWinner) out.push(pick([
    `Drama right at the death! ${last.player} pops up in the ${last.min}th minute to win it for ${W}.`,
    `Just when it looked settled, ${last.player} strikes on ${last.min} minutes — ${W} snatch it late.`]));
  else if (trailed) out.push(pick([
    `What a response from ${W}. They went behind and came roaring back to win ${Math.max(m.gA, m.gB)}–${Math.min(m.gA, m.gB)}.`,
    `Character, that. ${W} fell behind and turned it round — that's what good teams do.`]));
  else if (margin === 2) out.push(pick([
    `A comfortable day's work for ${W} — ${L} never really laid a glove on them.`,
    `Job done for ${W}. Two goals to the good and rarely in any trouble.`]));
  else out.push(pick([
    `A tight one, but ${W} just about deserved it against a stubborn ${L} side.`,
    `${W} edge it. Not always pretty, but they got the job done.`]));

  // standout scorers
  const tally = {};
  goals.forEach(g => { tally[g.player] = (tally[g.player] || 0) + 1; });
  const top = Object.entries(tally).sort((x, y) => y[1] - x[1])[0];
  if (top && top[1] >= 3) out.push(`And take a bow, ${top[0]} — a hat-trick. The match ball is going home with him.`);
  else if (top && top[1] === 2) out.push(pick([`${top[0]} with a brace — he looked sharp every time he got near the box.`,
    `Two for ${top[0]}. When he's in this mood, defenders just can't live with him.`]));
  else if (goals.length && !lateWinner) {
    const g = goals[0], how = g.method === 'penalty' ? 'from the penalty spot' : g.desc.replace(/^scores,?\s*/, '');
    out.push(`${g.player} opened the scoring on ${g.min} minutes — ${how}.`);
  }

  // was the result fair?
  const xgW = winSide === 'home' ? m.xgA : m.xgB, xgL = winSide === 'home' ? m.xgB : m.xgA;
  if (!draw && xgL - xgW > 0.4) out.push(`Mind you, ${L} created the better chances — a real smash-and-grab from ${W}.`);
  else if (draw && !m.pens && Math.abs(m.xgA - m.xgB) > 0.6) out.push(`${m.xgA > m.xgB ? nameOf('home') : nameOf('away')} will feel they left two points out there on the chances they had.`);

  const chalked = m.events.find(e => e.type === 'noGoal');
  if (chalked) out.push(pick([`VAR had its say too — ${chalked.player}'s goal was chalked off${chalked.reason === 'offside' ? ' for offside' : ''}. Big moment.`,
    `Spare a thought for ${chalked.player}: wheeled away celebrating, then VAR took it off him.`]));
  if (cards.length >= 3) out.push(pick([`${cards.length} bookings — the referee's arm got a workout tonight.`, `Feisty, too: ${cards.length} yellow cards and plenty of needle.`]));
  if (m.weather && m.weather !== 'clear') out.push({
    rain: 'The rain made it a slippery, scrappy night — mistakes were always coming.',
    snow: 'Credit to both sets of players for making a game of it in the snow.',
    heavy: 'That pitch was like a ploughed field — it took a lot out of the legs.',
    wind: 'The wind played havoc with anything in the air.' }[m.weather]);

  const mo = playerRatings(A, B, m).motm;
  out.push(`My player of the match? ${mo.name} — ${mo.goals >= 2 ? 'the goals say it all' : mo.r >= 8.5 ? 'outstanding from start to finish'
    : mo.goals ? 'took his goal brilliantly and never stopped working' : mo.grp === 'GK' || mo.grp === 'DEF' ? 'an absolute rock at the back' : 'quietly excellent all game'}.`);
  m.pundit = out.join(' ');
  return m.pundit;
}

/* ------------------------------------------------------------------ *
 * SAVED ON THIS PHONE — head-to-head records and the hall of fame.
 * ------------------------------------------------------------------ */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

// A random ID generated once per device/browser and kept in localStorage —
// this is what head-to-head is now keyed on, instead of the nickname
// someone happened to type in that game.
function deviceId() {
  let id = store.get('sp1nxi-device', null);
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : 'd-' + Math.random().toString(36).slice(2) + Date.now().toString(36));
    store.set('sp1nxi-device', id);
  }
  return id;
}

// Head-to-head: your online record against each opponent DEVICE (falls
// back to their nickname for older matches recorded before this existed).
function recordH2H(A, B, m) {
  if (S.mode !== 'online' || !S.room || m.h2hDone) return null;
  m.h2hDone = true;
  const mine = S.room.seat === 0 ? 'home' : 'away';
  const oppTeam = mine === 'home' ? B : A;
  const opp = oppTeam.label, gf = mine === 'home' ? m.gA : m.gB, ga = mine === 'home' ? m.gB : m.gA;
  const won = m.winSide ? m.winSide === mine : gf > ga, lost = m.winSide ? m.winSide !== mine : gf < ga;
  const all = store.get('sp1nxi-h2h', {});
  const key = oppTeam.deviceId ? ('dev:' + oppTeam.deviceId) : ('name:' + opp.trim().toLowerCase());
  const r = all[key] || { name: opp, w: 0, d: 0, l: 0, gf: 0, ga: 0, best: null };
  r.name = opp; r.gf += gf; r.ga += ga;
  if (won) r.w++; else if (lost) r.l++; else r.d++;
  if (gf > ga && (!r.best || gf - ga > r.best.gf - r.best.ga || (gf - ga === r.best.gf - r.best.ga && gf > r.best.gf)))
    r.best = { gf, ga, date: Date.now() };
  all[key] = r;
  store.set('sp1nxi-h2h', all);
  return r;
}
const h2hLine = r => `${r.w}W ${r.d}D ${r.l}L${r.best ? ` · biggest win ${r.best.gf}–${r.best.ga}` : ''}`;

function screenH2H() {
  theme(null); setCrumb('Head-to-head');
  const rows = Object.values(store.get('sp1nxi-h2h', {})).sort((a, b) => (b.w + b.d + b.l) - (a.w + a.d + a.l));
  const v = el(`<section><h2>Head-to-head</h2>
    <p><small>Your online results against each friend, saved on this phone.</small></p>
    ${rows.length ? rows.map(r => `<div class="card" style="padding:12px 14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline"><b>vs ${esc(r.name)}</b>
          <small>${r.w + r.d + r.l} played · goals ${r.gf}–${r.ga}</small></div>
        <div style="margin-top:6px">${h2hLine(r)}</div></div>`).join('')
      : '<div class="card"><small>No online matches yet. Start a room and play a friend.</small></div>'}
    <button class="btn ghost" id="back">Back</button></section>`);
  v.querySelector('#back').onclick = screenMode;
  show(v);
}

// Hall of fame: every XI you build, with its rating and how far it went.
const TROPHY = { 5: '🏆 Champions', 4: '🥈 Runners-up', 3: 'Semi-finals', 2: 'Quarter-finals', 1: 'Knockout rounds' };
function hofSave(A, B, m) {
  if (m.hofIds || S.mode === 'spectate') return;
  m.hofIds = {};
  const human = S.mode === 'ai' ? ['home'] : S.mode === 'online' ? [S.room && S.room.seat === 1 ? 'away' : 'home'] : ['home', 'away'];
  const all = store.get('sp1nxi-hof', []);
  human.forEach(side => {
    const t = side === 'home' ? A : B, o = side === 'home' ? B : A;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    m.hofIds[side] = id;
    all.push({ id, date: Date.now(), league: S.leagueKey, label: t.label, formation: t.formation,
      rating: Math.round(t.strength.overall), att: Math.round(t.strength.att), mid: Math.round(t.strength.mid), def: Math.round(t.strength.def),
      badge: { home: t.badge.home, away: t.badge.away },
      xi: t.xi.map(s => ({ role: s.role, x: s.x, y: s.y, name: s.player.name, number: s.player.number, rating: s.player.rating })),
      vs: o.label, gf: side === 'home' ? m.gA : m.gB, ga: side === 'home' ? m.gB : m.gA, trophy: 0 });
  });
  // keep it tidy: the best 40 by trophy then rating
  all.sort((a, b) => (b.trophy - a.trophy) || (b.rating - a.rating));
  store.set('sp1nxi-hof', all.slice(0, 40));
}
// After a knockout finishes, stamp how far each of your XIs went.
function hofKnockout(A, B, st) {
  const lm = S.lastMatch;
  if (!lm || !lm.m || !lm.m.hofIds || st.hofDone) return;
  st.hofDone = true;
  const all = store.get('sp1nxi-hof', []);
  mineInField(st).forEach(row => {
    const side = row.name === `${B.label}'s XI` ? 'away' : 'home';
    const e = all.find(x => x.id === lm.m.hofIds[side]);
    if (!e) return;
    let reached = -1;
    st.stages.forEach((s, k) => { if (s.some(mt => mt.x === row || mt.y === row)) reached = k; });
    const fromEnd = st.names.length - 1 - reached;   // 0 = final, 1 = semis …
    const rank = reached < 0 ? 0 : st.champ === row ? 5 : fromEnd === 0 ? 4 : fromEnd === 1 ? 3 : fromEnd === 2 ? 2 : 1;
    e.trophy = Math.max(e.trophy, rank);
  });
  store.set('sp1nxi-hof', all);
}
const hofScore = e => e.trophy * 100 + (e.gf - e.ga) * 3 + e.rating / 100;

function screenHallOfFame() {
  theme(null); setCrumb('Hall of fame');
  const all = store.get('sp1nxi-hof', []);
  const byRating = all.slice().sort((a, b) => b.rating - a.rating);
  const best = all.slice().sort((a, b) => hofScore(b) - hofScore(a))[0];
  const res = e => `${e.gf}–${e.ga} vs ${esc(e.vs)}${e.trophy ? ` · ${TROPHY[e.trophy]}` : ''}`;
  const row = (e, tag) => `<div class="card hof" data-id="${e.id}" style="padding:12px 14px;cursor:pointer;display:flex;gap:12px;align-items:center">
      <span style="font-family:'Bricolage Grotesque';font-weight:800;font-size:1.6rem;min-width:44px;text-align:center">${e.rating}</span>
      <span style="flex:1;min-width:0">${tag ? `<small style="color:var(--orange);font-weight:700">${tag}</small><br>` : ''}
        <b>${esc(e.label)}</b> <small>· ${esc(e.formation)} · ${esc((LEAGUES[e.league] || {}).name || '')}</small><br>
        <small>${res(e)}</small></span></div>`;
  const v = el(`<section><h2>Hall of fame</h2>
    <p><small>Your XIs, saved on this phone. Tap one to see it or share it.</small></p>
    ${all.length ? `${best ? row(best, 'BEST RESULT') : ''}${row(byRating[0], 'HIGHEST RATED')}
      <h3 style="margin-top:16px">All squads</h3>${byRating.map(e => row(e)).join('')}`
      : '<div class="card"><small>Build an XI and play a match — it lands here.</small></div>'}
    <button class="btn ghost" id="back">Back</button></section>`);
  v.querySelectorAll('.hof').forEach(n => n.onclick = () => screenHofEntry(n.dataset.id));
  v.querySelector('#back').onclick = screenMode;
  show(v);
}

function screenHofEntry(id) {
  const e = store.get('sp1nxi-hof', []).find(x => x.id === id);
  if (!e) return screenHallOfFame();
  setCrumb('Hall of fame');
  const v = el(`<section><h2>${esc(e.label)}</h2>
    <p><small>${esc(e.formation)} · ${esc((LEAGUES[e.league] || {}).name || '')} · ${new Date(e.date).toLocaleDateString()}</small></p>
    <div class="card" style="display:flex;justify-content:space-around;text-align:center">
      <div><b style="font-size:1.6rem">${e.rating}</b><br><small>Rating</small></div>
      <div><b style="font-size:1.6rem">${e.gf}–${e.ga}</b><br><small>vs ${esc(e.vs)}</small></div>
      <div><b style="font-size:1.1rem">${e.trophy ? TROPHY[e.trophy] : '—'}</b><br><small>Knockouts</small></div></div>
    <div class="card">${e.xi.map(s => `<div style="display:flex;gap:10px;padding:3px 0">
      <b style="min-width:26px;text-align:right">${s.number ?? ''}</b><span style="flex:1">${esc(s.name)}</span>
      <small style="opacity:.7">${s.role}</small><b>${s.rating}</b></div>`).join('')}</div>
    <button class="btn primary" id="share">Share this XI</button>
    <button class="btn ghost" id="del">Remove from hall of fame</button>
    <button class="btn ghost" id="back">Back</button></section>`);
  v.querySelector('#share').onclick = () => shareHofCard(e);
  v.querySelector('#del').onclick = () => { store.set('sp1nxi-hof', store.get('sp1nxi-hof', []).filter(x => x.id !== id)); screenHallOfFame(); };
  v.querySelector('#back').onclick = screenHallOfFame;
  show(v);
}

// Share image: the XI on a pitch, rating, result and trophy.
async function shareHofCard(e) {
  const W = 1080, H = 1350, cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); };
  ctx.fillStyle = '#F4EDE2'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = e.badge.home; ctx.fillRect(0, 0, W, 250);
  const ink = readable(e.badge.home);
  ctx.fillStyle = ink; ctx.textAlign = 'left';
  ctx.font = "800 40px 'Bricolage Grotesque', sans-serif"; ctx.fillText('Sp1nXI · Hall of fame', 56, 80);
  ctx.font = "800 64px 'Bricolage Grotesque', sans-serif"; ctx.fillText(e.label, 56, 170);
  ctx.font = "500 28px Archivo, sans-serif";
  ctx.fillText(`${e.formation} · ${(LEAGUES[e.league] || {}).name || ''}`, 56, 215);
  ctx.textAlign = 'right'; ctx.font = "800 120px 'Bricolage Grotesque', sans-serif"; ctx.fillText(String(e.rating), W - 56, 190);
  // pitch
  const px = 90, py = 290, pw = W - 180, ph = 760;
  ctx.fillStyle = '#2E6B3A'; rr(px, py, pw, ph, 24); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3;
  ctx.strokeRect(px + 20, py + 20, pw - 40, ph - 40);
  ctx.beginPath(); ctx.moveTo(px + 20, py + ph / 2); ctx.lineTo(px + pw - 20, py + ph / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(px + pw / 2, py + ph / 2, 80, 0, Math.PI * 2); ctx.stroke();
  e.xi.forEach(s => {
    const x = px + 20 + (s.x / 100) * (pw - 40), y = py + 20 + (s.y / 100) * (ph - 40);
    ctx.fillStyle = e.badge.home; ctx.beginPath(); ctx.arc(x, y, 32, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.font = "800 26px Archivo, sans-serif";
    ctx.fillText(String(s.number ?? ''), x, y + 9);
    ctx.fillStyle = '#fff'; ctx.font = "600 22px Archivo, sans-serif";
    const parts = s.name.split(' ');
    const nm = s.name.length <= 12 ? s.name : parts.length > 2 && parts[parts.length - 2].length <= 3 ? parts.slice(-2).join(' ') : parts[parts.length - 1];
    ctx.fillText(nm.length > 12 ? nm.slice(0, 11) + '…' : nm, x, y + 60);
  });
  // result + trophy
  ctx.textAlign = 'center'; ctx.fillStyle = '#241F19';
  ctx.font = "800 44px 'Bricolage Grotesque', sans-serif";
  ctx.fillText(`${e.gf}–${e.ga} vs ${e.vs}`, W / 2, 1130);
  ctx.font = "600 34px Archivo, sans-serif";
  ctx.fillText(e.trophy ? TROPHY[e.trophy] : `Attack ${e.att} · Midfield ${e.mid} · Defence ${e.def}`, W / 2, 1190);
  ctx.font = "500 24px Archivo, sans-serif"; ctx.fillStyle = '#6B6258';
  ctx.fillText('Built with Sp1nXI', W / 2, 1300);
  cv.toBlob(async blob => {
    const file = new File([blob], 'sp1nxi-xi.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: 'My Sp1nXI' }); return; } catch (err) {} }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'sp1nxi-xi.png'; a.click();
  }, 'image/png');
}

/* ------------------------------------------------------------------ *
 * GUESS THE XI — famous club line-ups, shown as a formation where each
 * shirt only tells you the player's country. Type names to fill it in.
 * Line-ups are real (mostly the side that started a famous final);
 * lines run keeper → attack, and left → right as the team attacks up.
 * ------------------------------------------------------------------ */
const NATIONS = {
  ARG: ['Argentina', '🇦🇷'], AUS: ['Australia', '🇦🇺'], AUT: ['Austria', '🇦🇹'], BEL: ['Belgium', '🇧🇪'], BRA: ['Brazil', '🇧🇷'],
  CIV: ['Ivory Coast', '🇨🇮'], CMR: ['Cameroon', '🇨🇲'], CRC: ['Costa Rica', '🇨🇷'], CRO: ['Croatia', '🇭🇷'], CZE: ['Czechia', '🇨🇿'],
  DEN: ['Denmark', '🇩🇰'], EGY: ['Egypt', '🇪🇬'], ENG: ['England', '🏴\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}'],
  ESP: ['Spain', '🇪🇸'], FIN: ['Finland', '🇫🇮'], FRA: ['France', '🇫🇷'], GER: ['Germany', '🇩🇪'], IRL: ['Ireland', '🇮🇪'],
  ISL: ['Iceland', '🇮🇸'], ITA: ['Italy', '🇮🇹'], MKD: ['North Macedonia', '🇲🇰'], MLI: ['Mali', '🇲🇱'], NED: ['Netherlands', '🇳🇱'],
  NOR: ['Norway', '🇳🇴'], POL: ['Poland', '🇵🇱'], POR: ['Portugal', '🇵🇹'], ROU: ['Romania', '🇷🇴'],
  SCO: ['Scotland', '🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}'], SEN: ['Senegal', '🇸🇳'], SRB: ['Serbia', '🇷🇸'],
  SWE: ['Sweden', '🇸🇪'], SVN: ['Slovenia', '🇸🇮'], USA: ['USA', '🇺🇸'], ALG: ['Algeria', '🇩🇿'], QAT: ['Qatar', '🇶🇦'], TTO: ['Trinidad & Tobago', '🇹🇹'], URU: ['Uruguay', '🇺🇾'],
  WAL: ['Wales', '🏴\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}']
};
// [name, nation, extra accepted answers]
const QUIZ_XIS = [
  { team: 'Barcelona 2014–15', note: 'Champions League final, Berlin', shape: '4-3-3', color: '#A50044', lines: [
    [['Marc-André ter Stegen', 'GER', ['ter stegen']]],
    [['Jordi Alba', 'ESP'], ['Gerard Piqué', 'ESP'], ['Javier Mascherano', 'ARG'], ['Dani Alves', 'BRA']],
    [['Andrés Iniesta', 'ESP'], ['Sergio Busquets', 'ESP'], ['Ivan Rakitić', 'CRO']],
    [['Neymar', 'BRA', ['neymar jr', 'ney']], ['Luis Suárez', 'URU'], ['Lionel Messi', 'ARG']] ] },
  { team: 'Barcelona 2010–11', note: 'Champions League final, Wembley', shape: '4-3-3', color: '#A50044', lines: [
    [['Víctor Valdés', 'ESP']],
    [['Éric Abidal', 'FRA'], ['Javier Mascherano', 'ARG'], ['Gerard Piqué', 'ESP'], ['Dani Alves', 'BRA']],
    [['Andrés Iniesta', 'ESP'], ['Sergio Busquets', 'ESP'], ['Xavi', 'ESP', ['xavi hernandez']]],
    [['David Villa', 'ESP'], ['Lionel Messi', 'ARG'], ['Pedro', 'ESP']] ] },
  { team: 'Barcelona 2008–09', note: 'Champions League final, Rome', shape: '4-3-3', color: '#A50044', lines: [
    [['Víctor Valdés', 'ESP']],
    [['Sylvinho', 'BRA'], ['Yaya Touré', 'CIV', ['yaya']], ['Gerard Piqué', 'ESP'], ['Carles Puyol', 'ESP']],
    [['Andrés Iniesta', 'ESP'], ['Sergio Busquets', 'ESP'], ['Xavi', 'ESP', ['xavi hernandez']]],
    [['Thierry Henry', 'FRA'], ['Lionel Messi', 'ARG'], ["Samuel Eto'o", 'CMR', ['etoo']]] ] },
  { team: 'Man United 1998–99', note: 'The treble season', shape: '4-4-2', color: '#DA291C', lines: [
    [['Peter Schmeichel', 'DEN']],
    [['Denis Irwin', 'IRL'], ['Ronny Johnsen', 'NOR'], ['Jaap Stam', 'NED'], ['Gary Neville', 'ENG']],
    [['Ryan Giggs', 'WAL'], ['Paul Scholes', 'ENG'], ['Roy Keane', 'IRL'], ['David Beckham', 'ENG']],
    [['Andy Cole', 'ENG', ['andrew cole']], ['Dwight Yorke', 'TTO']] ] },
  { team: 'Man United 2007–08', note: 'Champions League final, Moscow', shape: '4-4-2', color: '#DA291C', lines: [
    [['Edwin van der Sar', 'NED']],
    [['Patrice Evra', 'FRA'], ['Nemanja Vidić', 'SRB'], ['Rio Ferdinand', 'ENG'], ['Wes Brown', 'ENG']],
    [['Cristiano Ronaldo', 'POR', ['ronaldo', 'cr7']], ['Michael Carrick', 'ENG'], ['Paul Scholes', 'ENG'], ['Owen Hargreaves', 'ENG']],
    [['Carlos Tevez', 'ARG'], ['Wayne Rooney', 'ENG']] ] },
  { team: 'Arsenal 2003–04', note: 'The Invincibles', shape: '4-4-2', color: '#EF0107', lines: [
    [['Jens Lehmann', 'GER']],
    [['Ashley Cole', 'ENG'], ['Sol Campbell', 'ENG'], ['Kolo Touré', 'CIV', ['kolo']], ['Lauren', 'CMR']],
    [['Robert Pires', 'FRA'], ['Gilberto Silva', 'BRA', ['gilberto']], ['Patrick Vieira', 'FRA'], ['Freddie Ljungberg', 'SWE']],
    [['Thierry Henry', 'FRA'], ['Dennis Bergkamp', 'NED']] ] },
  { team: 'Liverpool 2004–05', note: 'Champions League final, Istanbul', shape: '4-4-1-1', color: '#C8102E', lines: [
    [['Jerzy Dudek', 'POL']],
    [['Djimi Traoré', 'MLI'], ['Sami Hyypiä', 'FIN'], ['Jamie Carragher', 'ENG'], ['Steve Finnan', 'IRL']],
    [['John Arne Riise', 'NOR', ['riise']], ['Xabi Alonso', 'ESP', ['alonso']], ['Steven Gerrard', 'ENG'], ['Luis García', 'ESP', ['luis garcia']]],
    [['Harry Kewell', 'AUS']],
    [['Milan Baroš', 'CZE']] ] },
  { team: 'Liverpool 2019–20', note: 'Premier League champions', shape: '4-3-3', color: '#C8102E', lines: [
    [['Alisson', 'BRA', ['alisson becker']]],
    [['Andrew Robertson', 'SCO', ['andy robertson', 'robbo']], ['Virgil van Dijk', 'NED', ['vvd']], ['Joe Gomez', 'ENG'], ['Trent Alexander-Arnold', 'ENG', ['trent', 'taa']]],
    [['Georginio Wijnaldum', 'NED', ['gini']], ['Fabinho', 'BRA'], ['Jordan Henderson', 'ENG', ['hendo']]],
    [['Sadio Mané', 'SEN'], ['Roberto Firmino', 'BRA', ['bobby']], ['Mohamed Salah', 'EGY', ['mo salah']]] ] },
  { team: 'Real Madrid 2016–17', note: 'Champions League final, Cardiff', shape: '4-4-2 diamond', color: '#FEBE10', lines: [
    [['Keylor Navas', 'CRC']],
    [['Marcelo', 'BRA'], ['Sergio Ramos', 'ESP'], ['Raphaël Varane', 'FRA'], ['Dani Carvajal', 'ESP']],
    [['Toni Kroos', 'GER'], ['Casemiro', 'BRA'], ['Luka Modrić', 'CRO']],
    [['Isco', 'ESP']],
    [['Cristiano Ronaldo', 'POR', ['ronaldo', 'cr7']], ['Karim Benzema', 'FRA']] ] },
  { team: 'Bayern 2012–13', note: 'Champions League final, Wembley', shape: '4-2-3-1', color: '#DC052D', lines: [
    [['Manuel Neuer', 'GER']],
    [['David Alaba', 'AUT'], ['Dante', 'BRA'], ['Jérôme Boateng', 'GER'], ['Philipp Lahm', 'GER']],
    [['Bastian Schweinsteiger', 'GER', ['schweini']], ['Javi Martínez', 'ESP']],
    [['Franck Ribéry', 'FRA'], ['Thomas Müller', 'GER'], ['Arjen Robben', 'NED']],
    [['Mario Mandžukić', 'CRO']] ] },
  { team: 'Chelsea 2004–05', note: "Mourinho's first title", shape: '4-3-3', color: '#034694', lines: [
    [['Petr Čech', 'CZE']],
    [['William Gallas', 'FRA'], ['John Terry', 'ENG'], ['Ricardo Carvalho', 'POR'], ['Paulo Ferreira', 'POR']],
    [['Frank Lampard', 'ENG'], ['Claude Makélélé', 'FRA'], ['Eiður Guðjohnsen', 'ISL', ['gudjohnsen', 'eidur']]],
    [['Arjen Robben', 'NED'], ['Didier Drogba', 'CIV'], ['Damien Duff', 'IRL']] ] },
  { team: 'Man City 2017–18', note: 'The Centurions', shape: '4-3-3', color: '#6CABDD', lines: [
    [['Ederson', 'BRA']],
    [['Fabian Delph', 'ENG'], ['Nicolás Otamendi', 'ARG'], ['John Stones', 'ENG'], ['Kyle Walker', 'ENG']],
    [['David Silva', 'ESP'], ['Fernandinho', 'BRA'], ['Kevin De Bruyne', 'BEL', ['kdb']]],
    [['Leroy Sané', 'GER'], ['Sergio Agüero', 'ARG', ['kun']], ['Raheem Sterling', 'ENG']] ] },
  { team: 'Inter 2009–10', note: 'Champions League final, Madrid', shape: '4-2-3-1', color: '#0068A8', lines: [
    [['Júlio César', 'BRA']],
    [['Cristian Chivu', 'ROU'], ['Walter Samuel', 'ARG'], ['Lúcio', 'BRA'], ['Maicon', 'BRA']],
    [['Esteban Cambiasso', 'ARG'], ['Javier Zanetti', 'ARG']],
    [['Goran Pandev', 'MKD'], ['Wesley Sneijder', 'NED'], ["Samuel Eto'o", 'CMR', ['etoo']]],
    [['Diego Milito', 'ARG']] ] },
  { team: 'AC Milan 2006–07', note: 'Champions League final, Athens', shape: '4-3-2-1', color: '#FB090B', lines: [
    [['Dida', 'BRA']],
    [['Marek Jankulovski', 'CZE'], ['Paolo Maldini', 'ITA'], ['Alessandro Nesta', 'ITA'], ['Massimo Oddo', 'ITA']],
    [['Massimo Ambrosini', 'ITA'], ['Andrea Pirlo', 'ITA'], ['Gennaro Gattuso', 'ITA']],
    [['Clarence Seedorf', 'NED'], ['Kaká', 'BRA']],
    [['Filippo Inzaghi', 'ITA', ['pippo']]] ] }
];

// Where each shirt sits on the pitch: keeper at the bottom, lines up to attack.
function quizSpots(q) {
  const n = q.lines.length, spots = [];
  q.lines.forEach((line, li) => line.forEach((pl, pi) => {
    spots.push({ pl, x: (100 / (line.length + 1)) * (pi + 1), y: 88 - li * (76 / (n - 1)),
      w: Math.min(24, 100 / (line.length + 1) - 1.5), id: spots.length });
  }));
  return spots;
}
const QUIZ_PITCH = `<div class="markings">
  <div style="left:20%;right:20%;top:-1px;height:12%;border-top:none"></div>
  <div style="left:20%;right:20%;bottom:-1px;height:12%;border-bottom:none"></div>
  <div style="left:-1px;right:-1px;top:50%;height:0"></div>
  <div style="left:35%;right:35%;top:43.5%;height:13%;border-radius:50%"></div></div>`;
const flagSpot = s => {
  const [cname, flag] = NATIONS[s.pl[1]] || [s.pl[1], '🏳️'];
  return el(`<div style="position:absolute;left:${s.x}%;top:${s.y}%;transform:translate(-50%,-50%);text-align:center;width:${s.w}%;
    transition:transform .25s">
    <div style="font-size:1.7rem;line-height:1">${flag}</div>
    <div class="qn" style="font-size:.66rem;font-weight:700;color:#fff;background:rgba(0,0,0,.45);border-radius:6px;padding:2px 4px;margin-top:2px;
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(cname)}</div></div>`);
};

// Surname for tight labels, keeping particles: "van der Sar", "ter Stegen", "De Bruyne".
function shortName(nm) {
  if (nm.length <= 11) return nm;
  const w = nm.split(' ');
  let i = w.length - 1;
  while (i > 0 && (/^[a-z]/.test(w[i - 1]) || /^(De|Van|Di|Da|Le|La)$/.test(w[i - 1]))) i--;
  return w.slice(i).join(' ');
}

/* --- NAME THE TEAM: the reverse quiz. A line-up of flags, four famous
 * sides to choose from. Streak counts until your first wrong answer. */
function screenNameTeam(streak = 0, lastTeam) {
  theme(null); setCrumb('Name the team'); setLeagueTheme(null);
  const pool = QUIZ_XIS.filter(q => q.team !== lastTeam);
  const q = pool[Math.floor(Math.random() * pool.length)];
  // three wrong answers — same club in another season when we have one (harder)
  const others = QUIZ_XIS.filter(x => x !== q).sort(() => Math.random() - 0.5);
  const club = t => t.team.replace(/\s+\d{4}.*$/, '');
  const near = others.filter(x => club(x) === club(q));
  const opts = [q, ...near.slice(0, 1), ...others.filter(x => !near.slice(0, 1).includes(x))].slice(0, 4).sort(() => Math.random() - 0.5);
  const best = store.get('sp1nxi-nameteam-best', 0);
  const v = el(`<section>
    <h2>Name the team</h2>
    <div class="card" style="display:flex;align-items:center;gap:12px;padding:12px 14px">
      <div style="flex:1"><b>Which famous side is this?</b><br><small>${esc(q.shape)} · every shirt shows the player's country</small></div>
      <div style="text-align:right"><b style="font-family:'Bricolage Grotesque';font-size:1.5rem">🔥 ${streak}</b><br><small>best ${best}</small></div>
    </div>
    <div class="pitch" style="position:relative">${QUIZ_PITCH}</div>
    <div id="nopts"></div>
    <button class="btn ghost" id="nback">Back</button>
  </section>`);
  const pitch = v.querySelector('.pitch');
  quizSpots(q).forEach(s => pitch.appendChild(flagSpot(s)));
  const box = v.querySelector('#nopts');
  opts.forEach(o => {
    const b = el(`<button class="btn">${esc(o.team)}<span class="sub">${esc(o.note)}</span></button>`);
    b.onclick = () => {
      box.querySelectorAll('button').forEach(x => { x.disabled = true; });
      const right = o === q;
      b.style.background = right ? '#16A34A' : '#E5484D'; b.style.color = '#fff'; b.style.borderColor = 'transparent';
      if (!right) {
        const correct = [...box.children][opts.indexOf(q)];
        correct.style.background = '#16A34A'; correct.style.color = '#fff'; correct.style.borderColor = 'transparent';
      }
      const s = right ? streak + 1 : 0;
      if (s > best) store.set('sp1nxi-nameteam-best', s);
      if (right) SFX.roar(0.5); else SFX.groan();
      // show who they were
      pitch.querySelectorAll('.qn').forEach((n, i) => {
        n.textContent = shortName(quizSpots(q)[i].pl[0]);
        n.style.background = right ? '#16A34A' : 'rgba(0,0,0,.6)';
      });
      const next = el(`<button class="btn primary">${right ? `Next (streak ${s})` : 'Try another'}</button>`);
      next.onclick = () => screenNameTeam(s, q.team);
      box.appendChild(next);
    };
    box.appendChild(b);
  });
  v.querySelector('#nback').onclick = screenMode;
  show(v);
}

// Lower-case, strip accents and punctuation, keep word gaps.
const qnorm = s => s.toLowerCase().replace(/ð/g, 'd').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ı/g, 'i')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-'’.]/g, ' ').replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
const lev = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
// Accept the full name, any ending of it ("messi", "van dijk"), nicknames,
// and one typo on longer answers.
function quizAnswers([name, , extra = []]) {
  const words = qnorm(name).split(' ');
  const out = new Set([qnorm(name), ...extra.map(qnorm)]);
  for (let i = 1; i < words.length; i++) out.add(words.slice(i).join(' '));
  return [...out];
}
const quizMatch = (guess, player) => {
  const g = qnorm(guess);
  if (!g) return false;
  return quizAnswers(player).some(a => a === g || (a.length >= 5 && lev(a, g) <= 1));
};

function screenQuiz(lastTeam) {
  theme(null); setCrumb('Guess the XI'); setLeagueTheme(null);
  const pool = QUIZ_XIS.filter(q => q.team !== lastTeam);
  const q = pool[Math.floor(Math.random() * pool.length)];
  const found = new Set();
  let hints = 3;
  const spots = quizSpots(q);
  const v = el(`<section>
    <h2>Guess the XI</h2>
    <div class="card" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-left:6px solid ${q.color}">
      <div style="flex:1"><b>${esc(q.team)}</b><br><small>${esc(q.note)} · ${esc(q.shape)}</small></div>
      <b id="qscore" style="font-family:'Bricolage Grotesque';font-size:1.5rem">0/11</b>
    </div>
    <div class="pitch" id="qpitch" style="position:relative">${QUIZ_PITCH}</div>
    <div style="display:flex;gap:8px;margin-top:10px">
      <input id="qin" placeholder="Type a player's name" autocomplete="off" autocapitalize="words"
        style="flex:1;padding:12px;border-radius:12px;border:1px solid var(--line);font-size:1rem">
      <button class="btn primary" id="qgo" style="width:auto;margin:0">Guess</button>
    </div>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn ghost" id="qhint" style="flex:1;width:auto">💡 Hint (3)</button>
      <button class="btn ghost" id="qgive" style="flex:1;width:auto">Give up</button>
    </div>
    <button class="btn ghost" id="qnext">Next team</button>
    <button class="btn ghost" id="qback">Back</button>
  </section>`);
  const pitch = v.querySelector('#qpitch'), input = v.querySelector('#qin');
  spots.forEach(s => { s.el = flagSpot(s); pitch.appendChild(s.el); });
  const reveal = (s, how) => {
    const box = s.el.querySelector('.qn');
    // short form so a back four fits: "Piqué", "van Dijk", "ter Stegen"
    box.textContent = shortName(s.pl[0]);
    box.title = s.pl[0];
    box.style.background = how === 'given' ? 'rgba(229,72,77,.85)' : '#16A34A';
    s.el.style.transform = 'translate(-50%,-50%) scale(1.12)';
    setTimeout(() => { s.el.style.transform = 'translate(-50%,-50%)'; }, 250);
  };
  const score = () => { v.querySelector('#qscore').textContent = `${found.size}/11`; };
  const finish = msg => {
    input.disabled = true; v.querySelector('#qgo').disabled = true; v.querySelector('#qhint').disabled = true;
    v.querySelector('#qgive').disabled = true;
    const best = store.get('sp1nxi-quiz', {});
    if (!best[q.team] || found.size > best[q.team]) { best[q.team] = found.size; store.set('sp1nxi-quiz', best); }
    toast(msg);
  };
  const guess = () => {
    const g = input.value;
    if (!g.trim()) return;
    const hit = spots.find(s => !found.has(s.id) && quizMatch(g, s.pl));
    if (hit) {
      found.add(hit.id); reveal(hit); score(); input.value = '';
      if (found.size === 11) { SFX.roar(0.8); finish('🏆 Full XI! Brilliant.'); }
    } else {
      const again = spots.find(s => found.has(s.id) && quizMatch(g, s.pl));
      toast(again ? 'Already got that one.' : 'Not in this XI.');
      input.style.borderColor = '#E5484D'; setTimeout(() => { input.style.borderColor = ''; }, 600);
    }
    input.focus();
  };
  v.querySelector('#qgo').onclick = guess;
  input.onkeydown = e => { if (e.key === 'Enter') guess(); };
  v.querySelector('#qhint').onclick = () => {
    const left = spots.filter(s => !found.has(s.id) && !s.hinted);
    if (!hints || !left.length) return;
    const s = left[Math.floor(Math.random() * left.length)];
    s.hinted = true; hints--;
    const initials = s.pl[0].split(' ').map(w => w[0] + '…').join(' ');
    s.el.querySelector('.qn').textContent = initials;
    v.querySelector('#qhint').textContent = `💡 Hint (${hints})`;
  };
  v.querySelector('#qgive').onclick = () => {
    spots.filter(s => !found.has(s.id)).forEach(s => reveal(s, 'given'));
    finish(`You got ${found.size} of 11.`);
  };
  v.querySelector('#qnext').onclick = () => screenQuiz(q.team);
  v.querySelector('#qback').onclick = screenMode;
  show(v);
}

/* ------------------------------------------------------------------ *
 * ADMIN — tap the Sp1nXI logo five times, enter the PIN (checked by the
 * server against the ADMIN_PIN secret in Cloudflare — it's not in this
 * file). Force the next spin, fix the next match, force events.
 * ------------------------------------------------------------------ */
(function adminTaps() {
  const logo = document.querySelector('header.top .brand') || document.querySelector('.brand');
  if (!logo) return;
  let taps = [];
  logo.addEventListener('click', e => {
    const now = Date.now();
    taps = taps.filter(t => now - t < 2500); taps.push(now);
    if (taps.length >= 5) { taps = []; e.preventDefault(); openAdmin(); }
  }, true);
})();

async function openAdmin() {
  if (!S.admin) {
    let saved = null;
    try { saved = localStorage.getItem('sp1nxi-adm'); } catch (e) {}
    if (saved) {
      const r = await api({ action: 'admin', pin: saved });
      if (r && r.ok) S.admin = { pin: saved };
    }
  }
  if (S.admin) return adminPanel();
  const ov = el(`<div style="position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:20px">
    <div style="background:#15120F;color:#F3ECE0;border-radius:16px;padding:18px;width:100%;max-width:340px;text-align:center">
      <h3 style="margin:0 0 10px;color:#fff">🔒 Admin</h3>
      <input id="apin" type="password" inputmode="numeric" autocomplete="off" placeholder="PIN"
        style="width:100%;padding:12px;font-size:1.3rem;text-align:center;border-radius:10px;border:1px solid #40372E;background:#221D18;color:#fff">
      <button class="btn primary" id="ago" style="margin-top:10px">Unlock</button>
      <button class="btn ghost" id="ax" style="color:#F3ECE0">Cancel</button></div></div>`);
  document.body.appendChild(ov);
  const inp = ov.querySelector('#apin'); inp.focus();
  const go = async () => {
    const r = await api({ action: 'admin', pin: inp.value.trim() });
    if (r && r.ok) {
      S.admin = { pin: inp.value.trim() };
      try { localStorage.setItem('sp1nxi-adm', S.admin.pin); } catch (e) {}
      ov.remove(); adminPanel();
    } else { toast(r && r.error === 'no-pin-set' ? 'No ADMIN_PIN is set in Cloudflare yet.' : 'Wrong PIN.'); inp.value = ''; }
  };
  ov.querySelector('#ago').onclick = go;
  inp.onkeydown = e => { if (e.key === 'Enter') go(); };
  ov.querySelector('#ax').onclick = () => ov.remove();
}

// Which side is "me" for a rig: my seat online, otherwise the home XI.
const mySideForRig = () => S.mode === 'online' && S.room ? (S.room.seat === 1 ? 'away' : 'home') : 'home';

function adminPanel() {
  const a = S.admin, rig = a.rig || {};
  const clubs = S.rivalry ? clubsFor(S.turn || 0) : (S.leagueClubs || []);
  const myXI = (S.players && me() && me().xi || []).filter(s => s.player);
  const ov = el(`<div style="position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center">
    <div style="background:#15120F;color:#F3ECE0;width:100%;max-width:560px;max-height:90vh;overflow:auto;border-radius:18px 18px 0 0;padding:16px 16px 22px">
      <style>.adm h4{margin:14px 0 6px;color:#E4762B;font-size:.85rem;letter-spacing:.06em;text-transform:uppercase}
        .adm select,.adm input[type=number]{padding:9px;border-radius:9px;border:1px solid #40372E;background:#221D18;color:#fff;font-size:1rem}
        .adm label{display:flex;align-items:center;gap:8px;padding:5px 0}
        .adm .chip{display:inline-block;padding:5px 9px;border-radius:999px;border:1px solid #40372E;margin:3px;font-size:.8rem;cursor:pointer}
        .adm .chip.on{background:#E4762B;border-color:#E4762B;color:#fff}</style>
      <div class="adm">
        <h3 style="margin:0;color:#fff">🛠️ Admin</h3>
        <p style="margin:4px 0 0"><small style="color:#A99D8D">The spin and scoreline apply to your next match. VAR/red card/snow now also land in a match already in progress, from the next break onward.</small></p>

        <h4>Force the spin</h4>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <select id="fclub" style="flex:2;min-width:0"><option value="">Next club: random</option>
            ${clubs.map(cl => `<option ${a.forceClub === cl.name ? 'selected' : ''}>${esc(cl.name)}</option>`).join('')}</select>
          <select id="fform" style="flex:1;min-width:0"><option value="">Formation: random</option>
            ${FORMATION_NAMES.map(f => `<option ${a.forceFormation === f ? 'selected' : ''}>${f}</option>`).join('')}</select>
        </div>
        ${clubs.length ? '' : '<p><small style="color:#A99D8D">Pick a league first to choose a club.</small></p>'}

        <h4>Rig the next match</h4>
        <label><input type="checkbox" id="ron" ${a.rig ? 'checked' : ''}> Fix the result</label>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="flex:1">You</span><input type="number" id="rme" min="0" max="9" value="${rig.me ?? 2}" style="width:4em;text-align:center">
          <b>–</b><input type="number" id="rthem" min="0" max="9" value="${rig.them ?? 1}" style="width:4em;text-align:center"><span style="flex:1;text-align:right">Them</span>
        </div>
        <p style="margin:2px 0 8px"><small style="color:#A99D8D">If that scoreline is level, the shootout plays out for real — either side can win it.</small></p>
        <p style="margin:6px 0 2px"><small style="color:#A99D8D">Your scorers (tap in order — optional):</small></p>
        <div id="rsc">${myXI.length ? myXI.filter(s => GROUP[s.role] !== 'GK').map(s =>
          `<span class="chip ${(rig.scorers || []).includes(s.player.name) ? 'on' : ''}" data-n="${esc(s.player.name)}">${esc(s.player.name)}</span>`).join('')
          : '<small style="color:#A99D8D">Build your XI first to pick scorers — otherwise they’re random.</small>'}</div>

        <h4>Force events</h4>
        <label><input type="checkbox" id="evar" ${rig.var ? 'checked' : ''}> 📺 VAR drama (a goal ruled out)</label>
        <label><input type="checkbox" id="ered" ${rig.red ? 'checked' : ''}> 🟥 Red card for
          <select id="eredside"><option value="them" ${rig.red !== 'me' ? 'selected' : ''}>them</option><option value="me" ${rig.red === 'me' ? 'selected' : ''}>you</option></select></label>
        <label><input type="checkbox" id="esnow" ${rig.snow ? 'checked' : ''}> ❄️ Snow</label>

        <button class="btn primary" id="asave" style="margin-top:12px">Save</button>
        <button class="btn ghost" id="aclear" style="color:#F3ECE0">Clear everything</button>
        <button class="btn ghost" id="aout" style="color:#A99D8D">Lock admin on this phone</button>
      </div></div></div>`);
  const scorers = (rig.scorers || []).slice();
  ov.querySelectorAll('#rsc .chip').forEach(ch => ch.onclick = () => {
    const n = ch.dataset.n, i = scorers.indexOf(n);
    if (i >= 0) scorers.splice(i, 1); else scorers.push(n);
    ch.classList.toggle('on', scorers.includes(n));
  });
  ov.querySelector('#asave').onclick = async () => {
    a.forceClub = ov.querySelector('#fclub').value || null;
    a.forceFormation = ov.querySelector('#fform').value || null;
    const fixed = ov.querySelector('#ron').checked;
    const ev = { var: ov.querySelector('#evar').checked, red: ov.querySelector('#ered').checked ? ov.querySelector('#eredside').value : null, snow: ov.querySelector('#esnow').checked };
    a.rig = (fixed || ev.var || ev.red || ev.snow) ? {
      fixed, me: Math.max(0, Math.min(9, +ov.querySelector('#rme').value || 0)), them: Math.max(0, Math.min(9, +ov.querySelector('#rthem').value || 0)),
      scorers: scorers.slice(), ...ev } : null;
    await pushRig();
    ov.remove(); toast('Saved.');
  };
  ov.querySelector('#aclear').onclick = async () => { a.forceClub = a.forceFormation = null; a.rig = null; await pushRig(); ov.remove(); toast('Cleared.'); };
  ov.querySelector('#aout').onclick = () => { try { localStorage.removeItem('sp1nxi-adm'); } catch (e) {} S.admin = null; ov.remove(); toast('Admin locked.'); };
  ov.onclick = e => { if (e.target === ov) ov.remove(); };
  document.body.appendChild(ov);
}

// Online: the rig goes to the room (both phones need it to play the same
// match). It's stored by seat, so "you" means you on either phone.
function rigBySeat(r) {
  if (!r) return null;
  const mine = mySideForRig(), theirs = mine === 'home' ? 'away' : 'home';
  const out = { var: r.var, snow: r.snow, red: r.red ? (r.red === 'me' ? mine : theirs) : null };
  if (r.fixed) Object.assign(out, { fixed: true, [mine]: r.me, [theirs]: r.them, scorers: { [mine]: r.scorers || [] } });
  return out;
}
async function pushRig() {
  if (S.mode === 'online' && S.room && S.admin) await api({ action: 'rig', code: S.room.code, pin: S.admin.pin, rig: rigBySeat(S.admin.rig) });
}
const rigFromState = st => { try { return st && st.x ? JSON.parse(decodeURIComponent(escape(atob(st.x)))) : null; } catch (e) { return null; } };

// Rewrite a freshly simulated match to the rigged result. It still plays
// out naturally on the board, with scorers, minutes and a real shootout.
function applyRig(m, A, B, rig) {
  if (!rig) return m;
  const rnd = m.seed ? seededRng(m.seed + '|rig') : Math.random;
  const scorer = makeScorer(rnd);
  let events = m.events.slice();
  const usedMins = new Set(events.map(e => e.min));
  const minIn = (lo, hi) => { let x, n = 0; do { x = lo + Math.floor(rnd() * (hi - lo + 1)); } while (usedMins.has(x) && ++n < 80); usedMins.add(x); return x; };
  const teamOf = side => side === 'home' ? A : B;
  if (rig.fixed) {
    events = events.filter(e => e.type !== 'goal');
    usedMins.clear(); events.forEach(e => usedMins.add(e.min));
    ['home', 'away'].forEach(side => {
      const names = (rig.scorers && rig.scorers[side]) || [];
      for (let i = 0; i < (rig[side] || 0); i++) {
        const name = names.length ? names[i % names.length] : scorer(teamOf(side)).player.name;
        const ev = { side, min: minIn(4, 89), type: 'goal', player: name };
        Object.assign(ev, describeGoal(rnd));
        events.push(ev);
      }
    });
  }
  if (rig.var && !events.some(e => e.type === 'noGoal')) {
    const side = rnd() < 0.5 ? 'home' : 'away';
    events.push({ side, min: minIn(15, 85), type: 'noGoal', player: scorer(teamOf(side)).player.name, reason: ['offside', 'handball', 'foul'][Math.floor(rnd() * 3)] });
  }
  if (rig.red) {
    const t = teamOf(rig.red), outfield = t.xi.filter(s => GROUP[s.role] !== 'GK');
    events.push({ side: rig.red, min: minIn(20, 80), type: 'red', player: outfield[Math.floor(rnd() * outfield.length)].player.name });
  }
  if (rig.snow) m.weather = 'snow';
  events.sort((x, y) => x.min - y.min);
  m.events = events;
  if (rig.fixed) {
    m.gA = rig.home || 0; m.gB = rig.away || 0; m.ft = { a: m.gA, b: m.gB };
    m.et = m.gA === m.gB; m.pens = null;
    if (m.et) {                                   // level: a real, unbiased shootout — either side can win it
      const so = shootout(A, B, m.seed ? seededRng(`${m.seed}|rigpens`) : Math.random);
      m.pens = { a: so.a, b: so.b, kicks: so.kicks };
    }
    m.winSide = m.gA > m.gB ? 'home' : m.gA < m.gB ? 'away' : m.pens ? (m.pens.a > m.pens.b ? 'home' : 'away') : null;
    m.rig = true;
    const sot = m.stats.find(s => s.label === 'Shots on target');
    if (sot) { sot.a = Math.max(+sot.a || 0, m.gA); sot.b = Math.max(+sot.b || 0, m.gB); }
  }
  delete m.ratings; delete m.pundit;
  return m;
}

/* QR encoder — Kazuhiko Arase's QRCode for JavaScript (MIT licence,
 * http://www.d-project.com/), bundled inline so no extra file or CDN is
 * needed. "QR Code" is a registered trademark of DENSO WAVE INCORPORATED. */
const QRCodeLib = (() => {
  const defs = {
  'QRMode': function (module, exports, require) {
module.exports = {
    MODE_NUMBER :       1 << 0,
    MODE_ALPHA_NUM :    1 << 1,
    MODE_8BIT_BYTE :    1 << 2,
    MODE_KANJI :        1 << 3
};

  },
  'QRMath': function (module, exports, require) {
var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;

  },
  'QRPolynomial': function (module, exports, require) {
var QRMath = require('./QRMath');

function QRPolynomial(num, shift) {
	if (num.length === undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] === 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var x = 0; x < e.getLength(); x++) {
			num[x] ^= QRMath.gexp(QRMath.glog(e.get(x) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;

  },
  'QRErrorCorrectLevel': function (module, exports, require) {
module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};


  },
  'QRRSBlock': function (module, exports, require) {
var QRErrorCorrectLevel = require('./QRErrorCorrectLevel');

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock === undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = [];
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
};

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case QRErrorCorrectLevel.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case QRErrorCorrectLevel.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case QRErrorCorrectLevel.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case QRErrorCorrectLevel.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
};

module.exports = QRRSBlock;

  },
  'QRBitBuffer': function (module, exports, require) {
function QRBitBuffer() {
	this.buffer = [];
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;

  },
  'QRMaskPattern': function (module, exports, require) {
module.exports = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

  },
  'QRUtil': function (module, exports, require) {
var QRMode = require('./QRMode');
var QRPolynomial = require('./QRPolynomial');
var QRMath = require('./QRMath');
var QRMaskPattern = require('./QRMaskPattern');

var QRUtil = {

    PATTERN_POSITION_TABLE : [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],        
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)    | (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );    
        }
        return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );    
        }
        return (data << 12) | d;
    },

    getBCHDigit : function(data) {

        var digit = 0;

        while (data !== 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition : function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
        
        switch (maskPattern) {
            
        case QRMaskPattern.PATTERN000 : return (i + j) % 2 === 0;
        case QRMaskPattern.PATTERN001 : return i % 2 === 0;
        case QRMaskPattern.PATTERN010 : return j % 3 === 0;
        case QRMaskPattern.PATTERN011 : return (i + j) % 3 === 0;
        case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 === 0;
        case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 === 0;
        case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 === 0;
        case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 === 0;

        default :
            throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

        var a = new QRPolynomial([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
        }

        return a;
    },

    getLengthInBits : function(mode, type) {

        if (1 <= type && type < 10) {

            // 1 - 9

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 10;
            case QRMode.MODE_ALPHA_NUM  : return 9;
            case QRMode.MODE_8BIT_BYTE  : return 8;
            case QRMode.MODE_KANJI      : return 8;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 27) {

            // 10 - 26

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 12;
            case QRMode.MODE_ALPHA_NUM  : return 11;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 10;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 41) {

            // 27 - 40

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 14;
            case QRMode.MODE_ALPHA_NUM  : return 13;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 12;
            default :
                throw new Error("mode:" + mode);
            }

        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint : function(qrCode) {
        
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        var row = 0; 
        var col = 0;

        
        // LEVEL1
        
        for (row = 0; row < moduleCount; row++) {

            for (col = 0; col < moduleCount; col++) {

                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {

                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {

                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r === 0 && c === 0) {
                            continue;
                        }

                        if (dark === qrCode.isDark(row + r, col + c) ) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += (3 + sameCount - 5);
                }
            }
        }

        // LEVEL2

        for (row = 0; row < moduleCount - 1; row++) {
            for (col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row,     col    ) ) count++;
                if (qrCode.isDark(row + 1, col    ) ) count++;
                if (qrCode.isDark(row,     col + 1) ) count++;
                if (qrCode.isDark(row + 1, col + 1) ) count++;
                if (count === 0 || count === 4) {
                    lostPoint += 3;
                }
            }
        }

        // LEVEL3

        for (row = 0; row < moduleCount; row++) {
            for (col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col) && 
                        !qrCode.isDark(row, col + 1) && 
                         qrCode.isDark(row, col + 2) && 
                         qrCode.isDark(row, col + 3) && 
                         qrCode.isDark(row, col + 4) && 
                        !qrCode.isDark(row, col + 5) && 
                         qrCode.isDark(row, col + 6) ) {
                    lostPoint += 40;
                }
            }
        }

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col) &&
                        !qrCode.isDark(row + 1, col) &&
                         qrCode.isDark(row + 2, col) &&
                         qrCode.isDark(row + 3, col) &&
                         qrCode.isDark(row + 4, col) &&
                        !qrCode.isDark(row + 5, col) &&
                         qrCode.isDark(row + 6, col) ) {
                    lostPoint += 40;
                }
            }
        }

        // LEVEL4
        
        var darkCount = 0;

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col) ) {
                    darkCount++;
                }
            }
        }
        
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;       
    }

};

module.exports = QRUtil;

  },
  'QR8bitByte': function (module, exports, require) {
var QRMode = require('./QRMode');

function QR8bitByte(data) {
	this.mode = QRMode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function() {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;

  },
  'index': function (module, exports, require) {
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of 
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
// Modified to work in node for this project (and some refactoring)
//---------------------------------------------------------------------

var QR8bitByte = require('./QR8bitByte');
var QRUtil = require('./QRUtil');
var QRPolynomial = require('./QRPolynomial');
var QRRSBlock = require('./QRRSBlock');
var QRBitBuffer = require('./QRBitBuffer');

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

QRCode.prototype = {
	
	addData : function(data) {
		var newData = new QR8bitByte(data);
		this.dataList.push(newData);
		this.dataCache = null;
	},
	
	isDark : function(row, col) {
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(row + "," + col);
		}
		return this.modules[row][col];
	},

	getModuleCount : function() {
		return this.moduleCount;
	},
	
	make : function() {
		// Calculate automatically typeNumber if provided is < 1
		if (this.typeNumber < 1 ){
			var typeNumber = 1;
			for (typeNumber = 1; typeNumber < 40; typeNumber++) {
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

				var buffer = new QRBitBuffer();
				var totalDataCount = 0;
				for (var i = 0; i < rsBlocks.length; i++) {
					totalDataCount += rsBlocks[i].dataCount;
				}

				for (var x = 0; x < this.dataList.length; x++) {
					var data = this.dataList[x];
					buffer.put(data.mode, 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
					data.write(buffer);
				}
				if (buffer.getLengthInBits() <= totalDataCount * 8)
					break;
			}
			this.typeNumber = typeNumber;
		}
		this.makeImpl(false, this.getBestMaskPattern() );
	},
	
	makeImpl : function(test, maskPattern) {
		
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		
		for (var row = 0; row < this.moduleCount; row++) {
			
			this.modules[row] = new Array(this.moduleCount);
			
			for (var col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;//(col + row) % 3;
			}
		}
	
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		this.setupPositionAdjustPattern();
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}
	
		if (this.dataCache === null) {
			this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
	
		this.mapData(this.dataCache, maskPattern);
	},

	setupPositionProbePattern : function(row, col)  {
		
		for (var r = -1; r <= 7; r++) {
			
			if (row + r <= -1 || this.moduleCount <= row + r) continue;
			
			for (var c = -1; c <= 7; c++) {
				
				if (col + c <= -1 || this.moduleCount <= col + c) continue;
				
				if ( (0 <= r && r <= 6 && (c === 0 || c === 6) ) || 
                     (0 <= c && c <= 6 && (r === 0 || r === 6) ) || 
                     (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
					this.modules[row + r][col + c] = true;
				} else {
					this.modules[row + r][col + c] = false;
				}
			}		
		}		
	},
	
	getBestMaskPattern : function() {
	
		var minLostPoint = 0;
		var pattern = 0;
	
		for (var i = 0; i < 8; i++) {
			
			this.makeImpl(true, i);
	
			var lostPoint = QRUtil.getLostPoint(this);
	
			if (i === 0 || minLostPoint >  lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
	
		return pattern;
	},
	
	createMovieClip : function(target_mc, instance_name, depth) {
	
		var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
		var cs = 1;
	
		this.make();

		for (var row = 0; row < this.modules.length; row++) {
			
			var y = row * cs;
			
			for (var col = 0; col < this.modules[row].length; col++) {
	
				var x = col * cs;
				var dark = this.modules[row][col];
			
				if (dark) {
					qr_mc.beginFill(0, 100);
					qr_mc.moveTo(x, y);
					qr_mc.lineTo(x + cs, y);
					qr_mc.lineTo(x + cs, y + cs);
					qr_mc.lineTo(x, y + cs);
					qr_mc.endFill();
				}
			}
		}
		
		return qr_mc;
	},

	setupTimingPattern : function() {
		
		for (var r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] !== null) {
				continue;
			}
			this.modules[r][6] = (r % 2 === 0);
		}
	
		for (var c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] !== null) {
				continue;
			}
			this.modules[6][c] = (c % 2 === 0);
		}
	},
	
	setupPositionAdjustPattern : function() {
	
		var pos = QRUtil.getPatternPosition(this.typeNumber);
		
		for (var i = 0; i < pos.length; i++) {
		
			for (var j = 0; j < pos.length; j++) {
			
				var row = pos[i];
				var col = pos[j];
				
				if (this.modules[row][col] !== null) {
					continue;
				}
				
				for (var r = -2; r <= 2; r++) {
				
					for (var c = -2; c <= 2; c++) {
					
						if (Math.abs(r) === 2 || 
                            Math.abs(c) === 2 ||
                            (r === 0 && c === 0) ) {
							this.modules[row + r][col + c] = true;
						} else {
							this.modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	},
	
	setupTypeNumber : function(test) {
	
		var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        var mod;
	
		for (var i = 0; i < 18; i++) {
			mod = (!test && ( (bits >> i) & 1) === 1);
			this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
		}
	
		for (var x = 0; x < 18; x++) {
			mod = (!test && ( (bits >> x) & 1) === 1);
			this.modules[x % 3 + this.moduleCount - 8 - 3][Math.floor(x / 3)] = mod;
		}
	},
	
	setupTypeInfo : function(test, maskPattern) {
	
		var data = (this.errorCorrectLevel << 3) | maskPattern;
		var bits = QRUtil.getBCHTypeInfo(data);
        var mod;
	
		// vertical		
		for (var v = 0; v < 15; v++) {
	
			mod = (!test && ( (bits >> v) & 1) === 1);
	
			if (v < 6) {
				this.modules[v][8] = mod;
			} else if (v < 8) {
				this.modules[v + 1][8] = mod;
			} else {
				this.modules[this.moduleCount - 15 + v][8] = mod;
			}
		}
	
		// horizontal
		for (var h = 0; h < 15; h++) {
	
			mod = (!test && ( (bits >> h) & 1) === 1);
			
			if (h < 8) {
				this.modules[8][this.moduleCount - h - 1] = mod;
			} else if (h < 9) {
				this.modules[8][15 - h - 1 + 1] = mod;
			} else {
				this.modules[8][15 - h - 1] = mod;
			}
		}
	
		// fixed module
		this.modules[this.moduleCount - 8][8] = (!test);
	
	},
	
	mapData : function(data, maskPattern) {
		
		var inc = -1;
		var row = this.moduleCount - 1;
		var bitIndex = 7;
		var byteIndex = 0;
		
		for (var col = this.moduleCount - 1; col > 0; col -= 2) {
	
			if (col === 6) col--;
	
			while (true) {
	
				for (var c = 0; c < 2; c++) {
					
					if (this.modules[row][col - c] === null) {
						
						var dark = false;
	
						if (byteIndex < data.length) {
							dark = ( ( (data[byteIndex] >>> bitIndex) & 1) === 1);
						}
	
						var mask = QRUtil.getMask(maskPattern, row, col - c);
	
						if (mask) {
							dark = !dark;
						}
						
						this.modules[row][col - c] = dark;
						bitIndex--;
	
						if (bitIndex === -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
								
				row += inc;
	
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
		
	}

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new QRBitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var x = 0; x < rsBlocks.length; x++) {
		totalDataCount += rsBlocks[x].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. (" + 
            buffer.getLengthInBits() + 
            ">" +  
            totalDataCount * 8 + 
            ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 !== 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var x = 0; x < ecdata[r].length; x++) {
            var modIndex = x + modPoly.getLength() - ecdata[r].length;
			ecdata[r][x] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var y = 0; y < rsBlocks.length; y++) {
		totalCodeCount += rsBlocks[y].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var z = 0; z < maxDcCount; z++) {
		for (var s = 0; s < rsBlocks.length; s++) {
			if (z < dcdata[s].length) {
				data[index++] = dcdata[s][z];
			}
		}
	}

	for (var xx = 0; xx < maxEcCount; xx++) {
		for (var t = 0; t < rsBlocks.length; t++) {
			if (xx < ecdata[t].length) {
				data[index++] = ecdata[t][xx];
			}
		}
	}

	return data;

};

module.exports = QRCode;

  }
  };
  const cache = {};
  const req = name => {
    name = name.replace('./', '');
    if (cache[name]) return cache[name].exports;
    const module = cache[name] = { exports: {} };
    defs[name](module, module.exports, req);
    return module.exports;
  };
  return { QRCode: req('index'), ECL: req('QRErrorCorrectLevel') };
})();

// Text → crisp SVG QR code (dark modules on white, with a quiet zone).
function qrSVG(text, size = 220) {
  const qr = new QRCodeLib.QRCode(-1, QRCodeLib.ECL.M);
  qr.addData(text); qr.make();
  const n = qr.getModuleCount(), q = 4, total = n + q * 2;
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + q},${r + q}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${size}" height="${size}" shape-rendering="crispEdges" style="display:block;margin:0 auto;background:#fff;border-radius:10px"><path d="${d}" fill="#111"/></svg>`;
}

/* ------------------------------------------------------------------ */
// Opened from a scanned QR code or invite link? Go straight into that room.
(function start() {
  const params = new URLSearchParams(location.search);
  const code = (params.get('join') || '').trim().toUpperCase();
  const watch = (params.get('watch') || '').trim().toUpperCase();
  screenMode();
  if (watch) { try { history.replaceState(null, '', location.pathname); } catch (e) {} return screenSpectate(watch); }
  if (code) {
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
    toast(`Joining room ${code}…`);
    joinRoom(code);
  }
})();
