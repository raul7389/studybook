// v8 — clave en el servidor (ANTHROPIC_API_KEY) protegida con PIN (APP_PIN); acepta también la clave del usuario
const https = require('https');

const ALLOWED_MODELS = /^claude-(haiku|sonnet|opus)-/;

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key, X-App-Pin',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
  const json = (statusCode, obj) => ({ statusCode, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(obj) });
  const cleanKey = (k) => String(k || '').replace(/[\s"'“”‘’]/g, '');
  const serverKey = cleanKey(process.env.ANTHROPIC_API_KEY);
  const appPin = process.env.APP_PIN || '';

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: cors, body: '' };
  // La app pregunta qué modo hay disponible (nunca devuelve la clave)
  const keyLooksOk = /^sk-ant-[a-z]+[0-9]*-[A-Za-z0-9_-]{20,}$/.test(serverKey);
  if (event.httpMethod === 'GET') return json(200, { serverKey: !!serverKey, keyFormatOk: keyLooksOk, pin: !!appPin, sync: !!appPin });
  if (event.httpMethod !== 'POST') return json(405, { error: { message: 'Method Not Allowed' } });

  const h = event.headers || {}; // Netlify pasa los encabezados en minúsculas
  const userKey = cleanKey(h['x-api-key']);
  const pinOk = !appPin || (h['x-app-pin'] || '') === appPin;
  if (!userKey && serverKey && !pinOk) return json(401, { error: { message: 'PIN incorrecto o falta el PIN' } });
  if (!userKey && !serverKey) return json(400, { error: { message: 'Falta la API Key: configúrala en Netlify o en Config' } });

  const bodyData = event.body || '';
  try {
    const b = JSON.parse(bodyData);
    if (!ALLOWED_MODELS.test(b.model || '')) return json(400, { error: { message: 'Modelo no permitido' } });
    if ((b.max_tokens || 0) > 4096) return json(400, { error: { message: 'max_tokens demasiado alto' } });
  } catch (e) {
    return json(400, { error: { message: 'JSON inválido' } });
  }

  const send = (apiKey, bearer = false) => new Promise((resolve) => {
    if (!/^[\x21-\x7e]+$/.test(apiKey)) return resolve({ status: 400, data: JSON.stringify({ error: { message: 'La clave tiene caracteres no válidos (tildes, espacios o comillas). Vuelve a ponerla en Netlify.' } }) });
    let req;
    try { req = https.request({
      hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyData), 'anthropic-version': '2023-06-01' }, bearer ? { Authorization: 'Bearer ' + apiKey } : { 'x-api-key': apiKey }),
    }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    } catch (err) { return resolve({ status: 400, data: JSON.stringify({ error: { message: 'Clave no válida: ' + err.message } }) }); }
    req.setTimeout(9000, () => { req.destroy(); resolve({ status: 504, data: JSON.stringify({ error: { message: 'La IA tardó demasiado (límite de 10 s de Netlify). Inténtalo de nuevo.' } }) }); });
    req.on('error', (err) => resolve({ status: 502, data: JSON.stringify({ error: { message: 'Error de conexión con Anthropic: ' + err.message } }) }));
    req.write(bodyData);
    req.end();
  });

  const tag = (r, via) => { try { const o = JSON.parse(r.data); if (r.status >= 400) o.via = via; return JSON.stringify(o); } catch (e) { return r.data; } };
  let via = userKey ? 'user' : 'server';
  // Claves nuevas de la consola (sk-ant-usr-, sk-ant-svc-): si x-api-key falla, probar como Bearer
  const call = async (k) => { let x = await send(k); if (x.status === 401 && /^sk-ant-(usr|svc)-/.test(k)) { const y = await send(k, true); if (y.status !== 401) return y; } return x; };
  let r = await call(userKey || serverKey);
  // Si la clave del dispositivo es inválida y hay una clave en el servidor (con PIN correcto), reintentar con esa
  if (r.status === 401 && userKey && serverKey && pinOk) { r = await call(serverKey); via = 'server'; }
  return { statusCode: r.status, headers: { ...cors, 'Content-Type': 'application/json' }, body: tag(r, via) };
};
