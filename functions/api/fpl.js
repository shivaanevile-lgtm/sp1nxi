// GET /api/fpl — live Premier League clubs + squads, sourced entirely from
// the official Fantasy Premier League API (fantasy.premierleague.com).
// No key, no auth, no rate limit — and because it's live, promotion,
// relegation and transfers all resolve themselves with zero maintenance.
//
// Response shape matches what the game already expects from a curated
// league file: { clubs: [{name, tier}], squads: { clubName: [players] } }

const FPL_BASE = 'https://fantasy.premierleague.com/api';
// FPL's own position labels -> the four categories the game uses everywhere.
const POSITION_MAP = { 'Goalkeeper': 'Goalkeeper', 'Defender': 'Defender',
  'Midfielder': 'Midfielder', 'Forward': 'Attacker' };

// A player's FPL price (now_cost, in £0.1m units) is the closest thing to a
// single "how good is this player" number the API offers, so it's the basis
// for rating. Prices bunch heavily at the cheap end — most squad players
// sit around £4.5-6.0m — so a straight linear map crushes that whole bulk
// into the 30s-40s. A square-root curve lifts the middle: an ordinary
// squad player lands in the 50s-60s, a good regular in the 70s, and only
// genuine stars (£12m+) reach the 90s.
function ratingFromCost(cost) {
  const frac = Math.max(0, Math.min(1, (cost - 38) / (150 - 38)));
  const r = 38 + 58 * Math.sqrt(frac);
  return Math.max(35, Math.min(98, Math.round(r)));
}

export async function onRequestGet() {
  try {
    const res = await fetch(FPL_BASE + '/bootstrap-static/', {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; Sp1nXI/1.0)' }
    });
    if (!res.ok) throw new Error('FPL responded ' + res.status);
    const data = await res.json();

    const teamNames = {};
    data.teams.forEach(t => { teamNames[t.id] = t.name; });

    // Bucket clubs into tiers 1-5 by FPL's own strength rating, for the
    // demo-squad fallback's difficulty curve — real squads ignore tier.
    const strengths = data.teams
      .map(t => ({ id: t.id, s: (t.strength_overall_home + t.strength_overall_away) / 2 }))
      .sort((a, b) => b.s - a.s);
    const tierOf = {};
    strengths.forEach((t, i) => { tierOf[t.id] = Math.min(5, Math.floor(i / 4) + 1); });

    const elementType = {};
    data.element_types.forEach(et => { elementType[et.id] = et.singular_name; });

    const squads = {};
    data.teams.forEach(t => { squads[t.name] = []; });

    data.elements.forEach(el => {
      const clubName = teamNames[el.team];
      const rawPos = elementType[el.element_type];
      const position = POSITION_MAP[rawPos];
      if (!clubName || !position) return; // skip managers/unknown types
      squads[clubName].push({
        id: 'fpl-' + el.id,
        name: (el.first_name && el.second_name)
          ? `${el.first_name} ${el.second_name}` : el.web_name,
        number: el.squad_number || 0,
        position,
        rating: ratingFromCost(el.now_cost)
      });
    });

    const clubs = data.teams.map(t => ({ name: t.name, tier: tierOf[t.id] }));

    return new Response(JSON.stringify({ clubs, squads }), {
      headers: {
        'content-type': 'application/json',
        // FPL data changes at most a few times a day; let the edge hold it briefly
        'cache-control': 'public, max-age=900'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'fpl-fetch-failed', message: e.message }), {
      status: 502, headers: { 'content-type': 'application/json' }
    });
  }
}
