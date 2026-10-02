// Sp1nXI Worker entry. Routes /api/* to the handlers in functions/api and
// serves everything else (index.html, app.js, data/*) from static assets.

import * as room from '../functions/api/room.js';
import * as fpl from '../functions/api/fpl.js';
import * as data from '../functions/api/data.js';
import * as refresh from '../functions/api/refresh.js';

const routes = {
  '/api/room': room,
  '/api/fpl': fpl,
  '/api/data': data,
  '/api/refresh': refresh,
};

const METHOD_KEY = { GET: 'onRequestGet', POST: 'onRequestPost' };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const mod = routes[url.pathname.replace(/\/$/, '')];
    if (mod) {
      const handler = mod[METHOD_KEY[request.method]] || mod.onRequest;
      if (!handler) {
        return new Response('Method not allowed', { status: 405 });
      }
      return handler({ request, env, ctx, params: {}, waitUntil: ctx.waitUntil.bind(ctx) });
    }
    return env.ASSETS.fetch(request);
  },
};
