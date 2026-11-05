// Sincronización teléfono ↔ PC con Netlify Blobs. Protegida con APP_PIN.
import { getStore } from '@netlify/blobs';

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
});

export default async (req) => {
  const appPin = (globalThis.Netlify && Netlify.env.get('APP_PIN')) || process.env.APP_PIN || '';
  if (!appPin) return json({ error: 'Configura APP_PIN en Netlify para sincronizar' }, 403);
  if ((req.headers.get('x-app-pin') || '') !== appPin) return json({ error: 'PIN incorrecto' }, 401);

  const key = new URL(req.url).searchParams.get('key') || 'state';
  if (!['state', 'books', 'ping'].includes(key)) return json({ error: 'Clave no válida' }, 400);
  if (key === 'ping') return json({ ok: true });

  const store = getStore({ name: 'studyquest', consistency: 'strong' });
  if (req.method === 'GET') return json((await store.get(key, { type: 'json' })) || null);
  if (req.method === 'PUT') {
    const body = await req.text();
    if (body.length > 4.5e6) return json({ error: 'Demasiado grande' }, 413);
    let obj; try { obj = JSON.parse(body); } catch { return json({ error: 'JSON inválido' }, 400); }
    await store.setJSON(key, obj);
    return json({ ok: true });
  }
  return json({ error: 'Método no permitido' }, 405);
};

export const config = { path: '/api/sync' };
