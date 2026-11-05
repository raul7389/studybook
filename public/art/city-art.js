// ═══ CITY ART — ilustraciones de monumentos (canvas, sin imágenes externas) ═══
// Cada edificio: { w: ancho en unidades, h: alto en unidades, d: función de dibujo }
// d(c, x, g, s, t, r): x = borde izquierdo, g = línea del suelo, s = px por unidad,
// t = tiempo en segundos (animación), r = aleatorio con semilla (ventanas estables).
const CityArt = (() => {
  const K = {
    stone:'#e6d6b4', stoneD:'#bfa983', stoneDD:'#8f7a58',
    marble:'#f2ede2', marbleD:'#cbc2ae',
    white:'#f4f0e7', whiteD:'#d3ccbd',
    brick:'#a9533b', brickD:'#7c3a28',
    slate:'#4d5c76', slateD:'#36425a',
    roof:'#bf4b30', roofD:'#8f3522',
    iron:'#8b6a4c', ironD:'#5c4532',
    gold:'#e8b84a', lit:'#ffd27a', litW:'#ffe9b0', dim:'#4a5878', dark:'#1b2335',
    green:'#4f9a60', greenD:'#356f43', water:'#245e93', waterL:'#5fa3d8', wood:'#6b4a30',
  };
  const seeded = (n) => { let x = (n * 9301 + 49297) % 233280; return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; }; };
  const hash = (str) => { let h = 7; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 100000; return h; };

  // ── primitivas ──
  const R = (c, x, y, w, h, f) => { c.fillStyle = f; c.fillRect(x, y, w, h); };
  const P = (c, pts, f) => { c.fillStyle = f; c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.closePath(); c.fill(); };
  const O = (c, x, y, r, f) => { c.fillStyle = f; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); };
  const E = (c, x, y, rx, ry, f) => { c.fillStyle = f; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fill(); };
  const L = (c, x1, y1, x2, y2, col, lw = 1) => { c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); };
  // arco de medio punto: x izq, yb base, w ancho, h alto total
  const A = (c, x, yb, w, h, f) => { const r = w / 2, top = yb - h + r; c.fillStyle = f; c.beginPath(); c.moveTo(x, yb); c.lineTo(x, top); c.arc(x + r, top, r, Math.PI, 0); c.lineTo(x + w, yb); c.closePath(); c.fill(); };
  // arco apuntado (gótico)
  const G = (c, x, yb, w, h, f) => { const sh = Math.min(h * 0.45, w * 1.1), top = yb - h; c.fillStyle = f; c.beginPath(); c.moveTo(x, yb); c.lineTo(x, top + sh); c.quadraticCurveTo(x, top + sh * 0.25, x + w / 2, top); c.quadraticCurveTo(x + w, top + sh * 0.25, x + w, top + sh); c.lineTo(x + w, yb); c.closePath(); c.fill(); };
  const win = (r, p = 0.62) => (r() < p ? K.lit : K.dim);
  // rejilla de ventanas rectangulares
  const grid = (c, x, y, w, h, cols, rows, r, opt = {}) => {
    const cw = w / cols, ch = h / rows, ww = cw * (opt.fw || 0.42), wh = ch * (opt.fh || 0.55);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const wx = x + i * cw + (cw - ww) / 2, wy = y + j * ch + (ch - wh) / 2;
      if (opt.arch) A(c, wx, wy + wh, ww, wh, win(r, opt.p)); else R(c, wx, wy, ww, wh, win(r, opt.p));
    }
  };
  // almenas
  const crenel = (c, x, y, w, s, f) => { const n = Math.max(3, Math.round(w / (s * 0.28))), mw = w / (n * 2 - 1); for (let i = 0; i < n; i++) R(c, x + i * mw * 2, y - s * 0.16, mw, s * 0.16, f); };
  // sombra lateral para dar volumen
  const side = (c, x, y, w, h, a = 0.22) => R(c, x + w * 0.82, y, w * 0.18, h, `rgba(0,0,0,${a})`);
  const cone = (c, cx, yb, w, h, f, fD) => { P(c, [cx - w / 2, yb, cx, yb - h, cx + w / 2, yb], f); P(c, [cx, yb - h, cx + w / 2, yb, cx + w * 0.12, yb], fD || 'rgba(0,0,0,0.25)'); };
  const water = (c, x, y, w, h, t) => {
    R(c, x, y, w, h, K.water);
    c.strokeStyle = 'rgba(160,210,255,0.55)'; c.lineWidth = 1;
    for (let j = 0; j < 3; j++) { c.beginPath(); for (let i = 0; i <= w; i += 3) { const yy = y + h * (0.25 + j * 0.28) + Math.sin(i * 0.25 + t * 2 + j) * 1; i ? c.lineTo(x + i, yy) : c.moveTo(x + i, yy); } c.stroke(); }
  };
  const smoke = (c, x, y, s, t) => { for (let k = 0; k < 4; k++) { const p = (t * 0.35 + k / 4) % 1; O(c, x + p * s * 0.9 + Math.sin(p * 6) * 2, y - p * s * 1.6, s * (0.12 + p * 0.22), `rgba(200,205,215,${0.45 * (1 - p)})`); } };
  const tree = (c, x, g, s, round = true) => {
    R(c, x - s * 0.05, g - s * 0.5, s * 0.1, s * 0.5, K.wood);
    if (round) { O(c, x, g - s * 0.75, s * 0.38, K.greenD); O(c, x - s * 0.1, g - s * 0.85, s * 0.26, K.green); }
    else P(c, [x - s * 0.18, g - s * 0.3, x, g - s * 1.7, x + s * 0.18, g - s * 0.3], '#2f5d3a'); // ciprés
  };
  const columns = (c, x, yb, w, h, n, col, colD) => {
    const gap = w / n, cw = gap * 0.46;
    for (let i = 0; i < n; i++) { const cx = x + i * gap + (gap - cw) / 2; R(c, cx, yb - h, cw, h, col); R(c, cx + cw * 0.65, yb - h, cw * 0.35, h, colD); R(c, cx - cw * 0.15, yb - h, cw * 1.3, h * 0.06, col); }
  };
  const pediment = (c, x, y, w, h, f, fD) => { P(c, [x, y, x + w / 2, y - h, x + w, y], f); P(c, [x + w * 0.12, y - h * 0.1, x + w / 2, y - h * 0.82, x + w * 0.88, y - h * 0.1], fD); };
  const shop = (c, x, g, s, r, o) => {
    // casa-tienda genérica de 2 pisos con toldo
    const W = o.w * s, H = o.h * s;
    R(c, x, g - H, W, H, o.wall); side(c, x, g - H, W, H, 0.15);
    P(c, [x - s * 0.08, g - H, x + W / 2, g - H - s * (o.roofH || 0.8), x + W + s * 0.08, g - H], o.roof || K.roof);
    grid(c, x + s * 0.1, g - H + s * 0.15, W - s * 0.2, H * 0.42, o.cols || 2, 1, r, { fw: 0.5, fh: 0.7 });
    // escaparate iluminado
    R(c, x + s * 0.15, g - H * 0.42, W - s * 0.3, H * 0.42, K.dark);
    R(c, x + s * 0.22, g - H * 0.38, W * 0.55, H * 0.3, K.litW);
    R(c, x + W * 0.7, g - H * 0.38, W * 0.18, H * 0.38, K.wood);
    // toldo a rayas
    const aw = W - s * 0.1, n = 6, ay = g - H * 0.5;
    for (let i = 0; i < n; i++) P(c, [x + s * 0.05 + i * aw / n, ay, x + s * 0.05 + (i + 1) * aw / n, ay, x + s * 0.05 + (i + 1) * aw / n + s * 0.06, ay + s * 0.45, x + s * 0.05 + i * aw / n + s * 0.06, ay + s * 0.45], o.awn[i % o.awn.length]);
    if (o.sign) o.sign(c, x, g, s, W, H);
  };

  const B = {
    // ── FRANCIA ──
    eiffel: { w: 3, h: 8, d(c, x, g, s, t) {
      const W = 3 * s, cx = x + W / 2, top = g - 8 * s;
      const path = () => { c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(cx - 0.45 * s, g - 3.3 * s, cx - 0.1 * s, top + 0.7 * s); c.lineTo(cx - 0.04 * s, top); c.lineTo(cx + 0.04 * s, top); c.lineTo(cx + 0.1 * s, top + 0.7 * s); c.quadraticCurveTo(cx + 0.45 * s, g - 3.3 * s, x + W, g); c.lineTo(x + W - 0.55 * s, g); c.lineTo(cx + 0.62 * s, g - 1.25 * s); c.quadraticCurveTo(cx, g - 2.15 * s, cx - 0.62 * s, g - 1.25 * s); c.lineTo(x + 0.55 * s, g); c.closePath(); };
      path(); c.fillStyle = K.iron; c.fill();
      c.save(); path(); c.clip(); c.strokeStyle = K.ironD; c.lineWidth = Math.max(0.6, s * 0.05);
      for (let i = -12; i < 12; i++) { const yy = g - i * s * 0.55; c.beginPath(); c.moveTo(x - s, yy); c.lineTo(x + W + s, yy - 3 * s); c.moveTo(x - s, yy - 3 * s); c.lineTo(x + W + s, yy); c.stroke(); }
      R(c, cx + 0.05 * s, top, W, 8 * s, 'rgba(0,0,0,0.18)'); c.restore();
      R(c, cx - 0.95 * s, g - 2.35 * s, 1.9 * s, 0.22 * s, K.ironD); R(c, cx - 0.95 * s, g - 2.35 * s, 1.9 * s, 0.06 * s, K.gold);
      R(c, cx - 0.5 * s, g - 4.6 * s, 1.0 * s, 0.18 * s, K.ironD); R(c, cx - 0.5 * s, g - 4.6 * s, 1.0 * s, 0.05 * s, K.gold);
      R(c, cx - 0.22 * s, g - 7.1 * s, 0.44 * s, 0.22 * s, K.ironD);
      O(c, cx, top + s * 0.05, s * (0.12 + 0.05 * Math.sin(t * 4)), 'rgba(255,220,130,0.9)');
    } },
    louvre: { w: 4.2, h: 2.8, d(c, x, g, s, t, r) {
      const W = 4.2 * s;
      R(c, x, g - 2.1 * s, W, 2.1 * s, K.stone); P(c, [x, g - 2.1 * s, x + 0.3 * s, g - 2.7 * s, x + W - 0.3 * s, g - 2.7 * s, x + W, g - 2.1 * s], K.slate);
      grid(c, x + 0.1 * s, g - 2 * s, W - 0.2 * s, 1.6 * s, 9, 2, r, { arch: true, p: 0.5 });
      const pw = 2.5 * s, px = x + (W - pw) / 2, ph = 1.75 * s;
      P(c, [px, g, px + pw / 2, g - ph, px + pw, g], 'rgba(150,200,240,0.85)');
      P(c, [px + pw / 2, g - ph, px + pw, g, px + pw / 2, g], 'rgba(90,140,190,0.85)');
      c.save(); c.beginPath(); c.moveTo(px, g); c.lineTo(px + pw / 2, g - ph); c.lineTo(px + pw, g); c.closePath(); c.clip();
      c.strokeStyle = 'rgba(255,240,200,0.7)'; c.lineWidth = 0.7;
      for (let i = 1; i < 8; i++) { const yy = g - ph * i / 8; L(c, px, yy, px + pw, yy, c.strokeStyle, 0.7); }
      for (let i = -8; i <= 8; i++) L(c, px + pw / 2 + i * pw / 16, g, px + pw / 2, g - ph, 'rgba(255,240,200,0.45)', 0.6);
      c.restore(); R(c, px + pw * 0.42, g - 0.35 * s, pw * 0.16, 0.35 * s, K.litW);
    } },
    bakery: { w: 2.2, h: 3, d(c, x, g, s, t, r) {
      shop(c, x, g, s, r, { w: 2.2, h: 2.6, wall: '#efe4cf', roof: K.slate, roofH: 0.6, awn: ['#2a5bb5', '#f4f0e7'],
        sign: (c, x, g, s, W) => { for (let i = 0; i < 3; i++) { c.strokeStyle = K.gold; c.lineWidth = s * 0.12; c.beginPath(); c.arc(x + s * 0.5 + i * s * 0.32, g - s * 0.6, s * 0.12, Math.PI * 0.1, Math.PI * 0.9); c.stroke(); } } });
    } },
    vineyard: { w: 3.6, h: 2.6, d(c, x, g, s, t, r) {
      const W = 3.6 * s;
      c.fillStyle = '#6f8a3c'; c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(x + W * 0.45, g - 2.2 * s, x + W, g - 0.5 * s); c.lineTo(x + W, g); c.closePath(); c.fill();
      for (let j = 0; j < 5; j++) for (let i = 0; i < 12; i++) { const u = (i + 0.5) / 12, yy = g - (1.9 * s) * Math.sin(Math.PI * Math.min(1, u * 1.1)) * (0.15 + j * 0.17); O(c, x + u * W, yy, s * 0.09, j % 2 ? '#3d6b2a' : '#7d2f5a'); }
      R(c, x + 2.3 * s, g - 1.1 * s, 0.9 * s, 0.75 * s, K.stone); P(c, [x + 2.2 * s, g - 1.1 * s, x + 2.75 * s, g - 1.55 * s, x + 3.3 * s, g - 1.1 * s], K.roof);
      R(c, x + 2.45 * s, g - 0.95 * s, 0.18 * s, 0.22 * s, win(r)); R(c, x + 2.9 * s, g - 0.95 * s, 0.18 * s, 0.22 * s, win(r));
      tree(c, x + 0.35 * s, g, s, false); tree(c, x + 3.45 * s, g, s * 0.8, false);
    } },
    palace: { w: 5, h: 2.7, d(c, x, g, s, t, r) {
      const W = 5 * s;
      R(c, x, g - 2.1 * s, W, 2.1 * s, '#eadfc4'); R(c, x + 1.8 * s, g - 2.45 * s, 1.4 * s, 2.45 * s, '#f1e7cf');
      R(c, x, g - 2.35 * s, W, 0.25 * s, '#d8caa8');
      for (let i = 0; i < 16; i++) R(c, x + i * W / 16 + s * 0.08, g - 2.55 * s, s * 0.06, s * 0.2, '#d8caa8');
      for (let i = 0; i < 5; i++) R(c, x + 1.85 * s + i * 0.3 * s, g - 2.75 * s, s * 0.08, s * 0.25, K.gold);
      grid(c, x + 0.1 * s, g - 2.05 * s, W - 0.2 * s, 1.9 * s, 15, 2, r, { arch: true, fw: 0.5, fh: 0.7, p: 0.7 });
      R(c, x, g - 0.12 * s, W, 0.12 * s, '#cdbd98'); R(c, x + 2.35 * s, g - 0.6 * s, 0.3 * s, 0.5 * s, K.gold);
    } },
    // ── ESPAÑA ──
    castle: { w: 3.8, h: 5, d(c, x, g, s, t, r) {
      const W = 3.8 * s;
      R(c, x, g - 2 * s, W, 2 * s, K.stone); crenel(c, x, g - 2 * s, W, s, K.stone);
      R(c, x + 1.2 * s, g - 3.6 * s, 1.5 * s, 1.6 * s, '#efe2c4'); crenel(c, x + 1.2 * s, g - 3.6 * s, 1.5 * s, s, '#efe2c4'); side(c, x + 1.2 * s, g - 3.6 * s, 1.5 * s, 1.6 * s);
      const tw = (cx, h, w) => { R(c, cx - w / 2, g - h, w, h, '#f3e8cf'); side(c, cx - w / 2, g - h, w, h); cone(c, cx, g - h, w * 1.25, w * 1.6, K.slate, K.slateD); R(c, cx - w * 0.12, g - h + w * 0.4, w * 0.24, w * 0.35, win(r)); };
      tw(x + 0.35 * s, 2.7 * s, 0.6 * s); tw(x + 3.45 * s, 2.7 * s, 0.6 * s); tw(x + 1.95 * s, 4.1 * s, 0.75 * s); tw(x + 1.25 * s, 3.4 * s, 0.45 * s); tw(x + 2.65 * s, 3.4 * s, 0.45 * s);
      A(c, x + 1.65 * s, g, 0.6 * s, 0.95 * s, K.dark);
      grid(c, x + 0.7 * s, g - 1.7 * s, 2.4 * s, 0.6 * s, 4, 1, r, { arch: true });
    } },
    flamenco: { w: 2.6, h: 3, d(c, x, g, s, t, r) {
      const W = 2.6 * s;
      R(c, x, g - 2.6 * s, W, 2.6 * s, K.white); side(c, x, g - 2.6 * s, W, 2.6 * s, 0.12);
      P(c, [x - 0.1 * s, g - 2.6 * s, x + W / 2, g - 3.1 * s, x + W + 0.1 * s, g - 2.6 * s], K.roof);
      A(c, x + 0.7 * s, g, 1.2 * s, 1.5 * s, '#7a1020'); A(c, x + 0.85 * s, g, 0.9 * s, 1.2 * s, K.litW);
      P(c, [x + 0.85 * s, g - 1.2 * s, x + 1.3 * s, g - 1.2 * s, x + 0.95 * s, g], '#b3152b'); P(c, [x + 1.75 * s, g - 1.2 * s, x + 1.3 * s, g - 1.2 * s, x + 1.65 * s, g], '#b3152b');
      for (const wx of [0.3, 1.9]) { R(c, x + wx * s, g - 2.3 * s, 0.4 * s, 0.5 * s, win(r)); R(c, x + (wx - 0.08) * s, g - 1.8 * s, 0.56 * s, 0.06 * s, '#222'); for (let i = 0; i < 3; i++) O(c, x + (wx + 0.05 + i * 0.15) * s, g - 1.86 * s, s * 0.07, i % 2 ? '#e0304a' : '#f06292'); }
      R(c, x + 0.8 * s, g - 2.45 * s, 1 * s, 0.25 * s, '#b3152b');
    } },
    bull: { w: 4.2, h: 2.6, d(c, x, g, s, t, r) {
      const W = 4.2 * s, cx = x + W / 2;
      R(c, x, g - 1.9 * s, W, 1.9 * s, K.white); E(c, cx, g - 1.9 * s, W / 2, 0.45 * s, '#c58a3a'); E(c, cx, g - 1.85 * s, W / 2 - 0.25 * s, 0.32 * s, '#e3b866');
      R(c, x, g - 1.95 * s, W, 0.12 * s, '#b0302a');
      for (let i = 0; i < 9; i++) A(c, x + 0.15 * s + i * 0.44 * s, g - 0.95 * s, 0.26 * s, 0.6 * s, '#8a5a2a');
      for (let i = 0; i < 5; i++) A(c, x + 0.4 * s + i * 0.8 * s, g, 0.4 * s, 0.75 * s, i === 2 ? K.litW : '#6b3f1c');
      R(c, x, g - 0.18 * s, W, 0.18 * s, '#c58a3a'); side(c, x, g - 1.9 * s, W, 1.9 * s, 0.12);
      for (const fx of [0.3, 3.9]) { L(c, x + fx * s, g - 2.3 * s, x + fx * s, g - 1.9 * s, '#555', 1); R(c, x + fx * s, g - 2.3 * s, 0.3 * s, 0.18 * s, '#c8102e'); }
    } },
    cathedral: { w: 3.6, h: 8, d(c, x, g, s, t, r) { // Sagrada Família
      const W = 3.6 * s;
      R(c, x + 0.2 * s, g - 2.2 * s, W - 0.4 * s, 2.2 * s, '#d8c19a'); side(c, x + 0.2 * s, g - 2.2 * s, W - 0.4 * s, 2.2 * s);
      for (let i = 0; i < 3; i++) G(c, x + 0.55 * s + i * 0.95 * s, g, 0.6 * s, 1.5 * s, i === 1 ? K.litW : '#5c4a33');
      const spire = (cx, h, w) => {
        c.fillStyle = '#d1b68b'; c.beginPath(); c.moveTo(cx - w / 2, g - 1.8 * s); c.lineTo(cx - w / 2, g - h * 0.55); c.quadraticCurveTo(cx - w * 0.45, g - h * 0.93, cx, g - h); c.quadraticCurveTo(cx + w * 0.45, g - h * 0.93, cx + w / 2, g - h * 0.55); c.lineTo(cx + w / 2, g - 1.8 * s); c.closePath(); c.fill();
        R(c, cx + w * 0.15, g - h * 0.9, w * 0.35, h * 0.9 - 1.8 * s, 'rgba(0,0,0,0.16)');
        for (let k = 0; k < 9; k++) O(c, cx + (k % 2 ? 0.1 : -0.1) * w, g - 2.1 * s - k * (h - 2.6 * s) / 9, Math.max(0.6, w * 0.07), '#6e5a3e');
        O(c, cx, g - h - s * 0.08, s * 0.14, ['#e2453a', '#f2b632', '#4caf50', '#2e86de'][Math.round(h) % 4]); O(c, cx, g - h - s * 0.08, s * 0.06, '#fff');
      };
      spire(x + 0.7 * s, 6.4 * s, 0.5 * s); spire(x + 1.4 * s, 7.6 * s, 0.55 * s); spire(x + 2.2 * s, 7.6 * s, 0.55 * s); spire(x + 2.9 * s, 6.4 * s, 0.5 * s);
    } },
    plaza: { w: 4, h: 3.3, d(c, x, g, s, t, r) {
      const W = 4 * s;
      R(c, x, g - 2.8 * s, W, 2.8 * s, '#c96b42'); side(c, x, g - 2.8 * s, W, 2.8 * s, 0.15);
      R(c, x, g - 2.95 * s, W, 0.15 * s, K.slate);
      for (const tx of [0, 3.4]) { R(c, x + tx * s, g - 3.2 * s, 0.6 * s, 3.2 * s, '#b75e38'); cone(c, x + (tx + 0.3) * s, g - 3.2 * s, 0.75 * s, 1.0 * s, K.slate, K.slateD); }
      grid(c, x + 0.6 * s, g - 2.7 * s, 2.8 * s, 1.6 * s, 6, 3, r, { p: 0.65 });
      for (let i = 0; i < 7; i++) A(c, x + 0.1 * s + i * 0.56 * s, g, 0.4 * s, 0.8 * s, i % 3 === 1 ? K.litW : '#5a2f1c');
      R(c, x, g - 0.95 * s, W, 0.08 * s, '#e3c9a0');
    } },
    // ── ITALIA ──
    colosseum: { w: 4.4, h: 3.8, d(c, x, g, s, t, r) {
      const W = 4.4 * s;
      P(c, [x, g, x, g - 3.8 * s, x + W * 0.55, g - 3.8 * s, x + W * 0.62, g - 3.35 * s, x + W * 0.74, g - 3.15 * s, x + W * 0.86, g - 2.7 * s, x + W, g - 2.55 * s, x + W, g], '#d6b585');
      const topAt = (u) => (u < 0.55 ? 3.8 : u < 0.62 ? 3.35 : u < 0.74 ? 3.15 : u < 0.86 ? 2.7 : 2.55) * s;
      const n = 9, aw = W / n;
      [[0, 1.05], [1.1, 1.0], [2.15, 0.85]].forEach(([y0, h], j) => {
        L(c, x, g - y0 * s, x + W, g - y0 * s, '#b8956a', Math.max(1, s * 0.08));
        for (let i = 0; i < n; i++) { const u = (i + 0.5) / n; if (topAt(u) > (y0 + h + 0.1) * s) A(c, x + i * aw + aw * 0.2, g - y0 * s - s * 0.05, aw * 0.6, h * s * 0.8, j === 0 && r() < 0.3 ? '#7b5735' : '#4a3424'); }
      });
      for (let i = 0; i < n; i++) { const u = (i + 0.5) / n; if (topAt(u) > 3.5 * s) R(c, x + i * aw + aw * 0.35, g - 3.5 * s, aw * 0.3, 0.3 * s, '#9c7a52'); }
      R(c, x + W * 0.55, g - 3.8 * s, W * 0.45, 3.8 * s, 'rgba(0,0,0,0.12)');
    } },
    tower: { w: 2.4, h: 6.6, d(c, x, g, s, t, r) { // Pisa
      const cx = x + 1.2 * s, w = 1.1 * s;
      c.save(); c.translate(cx, g); c.rotate(0.085);
      const gr = c.createLinearGradient(-w / 2, 0, w / 2, 0); gr.addColorStop(0, K.marble); gr.addColorStop(0.6, '#e6dfd0'); gr.addColorStop(1, K.marbleD);
      R(c, -w / 2, -5.6 * s, w, 5.6 * s, gr);
      for (let k = 0; k < 7; k++) { const y0 = -k * 0.8 * s; L(c, -w / 2, y0 - 0.8 * s, w / 2, y0 - 0.8 * s, '#bdb3a0', 1); for (let i = 0; i < 4; i++) A(c, -w / 2 + w * (0.08 + i * 0.24), y0 - 0.06 * s, w * 0.14, 0.55 * s, k === 0 ? '#8d95a8' : '#9aa3b5'); }
      R(c, -w * 0.38, -6.3 * s, w * 0.76, 0.7 * s, gr); for (let i = 0; i < 3; i++) A(c, -w * 0.3 + i * w * 0.22, -5.68 * s, w * 0.13, 0.45 * s, '#9aa3b5');
      R(c, -w * 0.42, -6.38 * s, w * 0.84, 0.1 * s, K.marbleD);
      c.restore();
    } },
    gondola: { w: 3.4, h: 3, d(c, x, g, s, t, r) {
      const W = 3.4 * s;
      R(c, x, g - 3 * s, W, 2.2 * s, '#d98b7a'); side(c, x, g - 3 * s, W, 2.2 * s, 0.12);
      for (let i = 0; i < 4; i++) { G(c, x + 0.3 * s + i * 0.75 * s, g - 1.75 * s, 0.35 * s, 0.75 * s, win(r)); G(c, x + 0.3 * s + i * 0.75 * s, g - 0.95 * s, 0.35 * s, 0.6 * s, win(r, 0.4)); }
      R(c, x, g - 3.05 * s, W, 0.1 * s, '#efe6d6');
      water(c, x, g - 0.8 * s, W, 0.8 * s, t);
      const bx = x + 0.5 * s + Math.sin(t * 0.6) * 0.25 * s, by = g - 0.45 * s;
      c.fillStyle = '#111'; c.beginPath(); c.moveTo(bx, by - 0.25 * s); c.quadraticCurveTo(bx + 1.2 * s, by + 0.15 * s, bx + 2.4 * s, by - 0.35 * s); c.lineTo(bx + 2.3 * s, by - 0.15 * s); c.quadraticCurveTo(bx + 1.2 * s, by + 0.3 * s, bx + 0.1 * s, by - 0.05 * s); c.closePath(); c.fill();
      R(c, bx + 2.3 * s, by - 0.55 * s, 0.06 * s, 0.25 * s, '#ccc');
      const gx = bx + 1.6 * s; R(c, gx, by - 0.95 * s, 0.18 * s, 0.6 * s, '#f4f0e7'); for (let k = 0; k < 3; k++) R(c, gx, by - 0.85 * s + k * 0.18 * s, 0.18 * s, 0.07 * s, '#b0182b'); O(c, gx + 0.09 * s, by - 1.05 * s, 0.1 * s, '#e0b48a'); R(c, gx - 0.04 * s, by - 1.18 * s, 0.26 * s, 0.05 * s, '#e8c75a');
      L(c, gx + 0.2 * s, by - 0.9 * s, gx + 0.7 * s, by + 0.2 * s, K.wood, Math.max(1, s * 0.05));
    } },
    pizzeria: { w: 2.2, h: 3, d(c, x, g, s, t, r) {
      R(c, x + 1.6 * s, g - 3.2 * s, 0.25 * s, 0.6 * s, K.brick); smoke(c, x + 1.72 * s, g - 3.2 * s, s, t);
      shop(c, x, g, s, r, { w: 2.2, h: 2.6, wall: '#e3a05e', roofH: 0.5, awn: ['#1f8a4c', '#f4f0e7', '#c8102e'],
        sign: (c, x, g, s) => { O(c, x + 0.75 * s, g - 0.6 * s, s * 0.32, '#f2c14e'); O(c, x + 0.75 * s, g - 0.6 * s, s * 0.26, '#e0662e'); for (let k = 0; k < 4; k++) O(c, x + (0.65 + (k % 2) * 0.2) * s, g - (0.5 + (k > 1) * 0.2) * s, s * 0.04, '#7a1a10'); } });
    } },
    forum: { w: 3.6, h: 3, d(c, x, g, s) {
      R(c, x, g - 2.6 * s, 1.5 * s, 2.6 * s, '#dcc59a'); A(c, x + 0.4 * s, g, 0.7 * s, 1.6 * s, '#4a3424'); R(c, x - 0.05 * s, g - 2.75 * s, 1.6 * s, 0.25 * s, '#cbb183'); side(c, x, g - 2.6 * s, 1.5 * s, 2.6 * s);
      R(c, x + 0.2 * s, g - 2.35 * s, 1.1 * s, 0.25 * s, '#c4a875');
      columns(c, x + 1.8 * s, g, 1.5 * s, 2.5 * s, 3, '#e3cfa4', '#bfa57a'); R(c, x + 1.8 * s, g - 2.8 * s, 1.5 * s, 0.3 * s, '#d4bb8c');
      R(c, x + 3.35 * s, g - 1.1 * s, 0.22 * s, 1.1 * s, '#e3cfa4'); P(c, [x + 3.33 * s, g - 1.1 * s, x + 3.45 * s, g - 1.3 * s, x + 3.59 * s, g - 1.05 * s], '#e3cfa4');
      R(c, x + 2.2 * s, g - 0.22 * s, 0.9 * s, 0.22 * s, '#cdb68a');
    } },
    // ── ALEMANIA ──
    castle2: { w: 3.2, h: 6.6, d(c, x, g, s, t, r) { // Neuschwanstein
      const W = 3.2 * s;
      R(c, x + 0.3 * s, g - 2.6 * s, 2.6 * s, 2.6 * s, K.white); side(c, x + 0.3 * s, g - 2.6 * s, 2.6 * s, 2.6 * s, 0.15);
      P(c, [x + 0.3 * s, g - 2.6 * s, x + 1.6 * s, g - 3.4 * s, x + 2.9 * s, g - 2.6 * s], K.slate);
      grid(c, x + 0.4 * s, g - 2.5 * s, 2.4 * s, 1.8 * s, 5, 2, r, { arch: true });
      const tw = (cx, h, w) => { R(c, cx - w / 2, g - h, w, h, '#f6f2ea'); R(c, cx + w * 0.15, g - h, w * 0.35, h, 'rgba(0,0,0,0.12)'); cone(c, cx, g - h, w * 1.2, w * 2.4, '#4a6f9a', '#36557a'); R(c, cx - w * 0.15, g - h + w * 0.5, w * 0.3, w * 0.45, win(r)); };
      tw(x + 0.35 * s, 3.4 * s, 0.45 * s); tw(x + 2.85 * s, 3.6 * s, 0.5 * s); tw(x + 1.1 * s, 4.1 * s, 0.4 * s); tw(x + 2.2 * s, 5.0 * s, 0.6 * s); tw(x + 1.65 * s, 3.8 * s, 0.35 * s);
      A(c, x + 1.35 * s, g, 0.5 * s, 0.8 * s, K.dark);
    } },
    brewery: { w: 3, h: 3.2, d(c, x, g, s, t, r) {
      const W = 3 * s;
      R(c, x, g - 2.4 * s, W, 2.4 * s, K.brick); side(c, x, g - 2.4 * s, W, 2.4 * s);
      P(c, [x - 0.1 * s, g - 2.4 * s, x + W / 2, g - 3.2 * s, x + W + 0.1 * s, g - 2.4 * s], K.roofD);
      grid(c, x + 0.2 * s, g - 2.3 * s, W - 0.4 * s, 1.0 * s, 4, 1, r, { arch: true, fw: 0.5, fh: 0.8 });
      A(c, x + 1.15 * s, g, 0.7 * s, 1.1 * s, K.litW);
      O(c, x + 1.5 * s, g - 2.75 * s, 0.22 * s, K.gold);
      for (let k = 0; k < 3; k++) { const bx = x + (0.15 + (k === 2 ? 0.25 : k * 0.5)) * s, by = g - (k === 2 ? 0.95 : 0.45) * s; R(c, bx, by, 0.45 * s, 0.45 * s, '#8a5a2e'); R(c, bx, by + 0.08 * s, 0.45 * s, 0.05 * s, '#3b2a1a'); R(c, bx, by + 0.32 * s, 0.45 * s, 0.05 * s, '#3b2a1a'); }
    } },
    cathedral2: { w: 3.2, h: 8, d(c, x, g, s, t, r) { // Kölner Dom
      const W = 3.2 * s, st = '#77747a', stD = '#5c5a60';
      R(c, x + 0.9 * s, g - 3.6 * s, 1.4 * s, 3.6 * s, st); G(c, x + 1.2 * s, g - 1.3 * s, 0.8 * s, 2.0 * s, K.lit); O(c, x + 1.6 * s, g - 3.0 * s, 0.32 * s, '#c47a3a'); O(c, x + 1.6 * s, g - 3.0 * s, 0.2 * s, K.lit);
      G(c, x + 1.3 * s, g, 0.6 * s, 1.1 * s, K.dark);
      for (const tx of [0, 2.2]) {
        const tx0 = x + tx * s;
        R(c, tx0, g - 5.0 * s, 1.0 * s, 5.0 * s, st); R(c, tx0 + 0.7 * s, g - 5 * s, 0.3 * s, 5 * s, stD);
        for (let k = 0; k < 3; k++) G(c, tx0 + 0.3 * s, g - 0.6 * s - k * 1.5 * s, 0.4 * s, 1.0 * s, k === 0 ? K.dark : win(r, 0.5));
        P(c, [tx0 - 0.05 * s, g - 5 * s, tx0 + 0.5 * s, g - 8 * s, tx0 + 1.05 * s, g - 5 * s], st); P(c, [tx0 + 0.5 * s, g - 8 * s, tx0 + 1.05 * s, g - 5 * s, tx0 + 0.6 * s, g - 5 * s], stD);
        for (let k = 1; k < 6; k++) { const yy = g - 5 * s - k * 0.5 * s, half = 0.55 * s * (1 - k / 6); L(c, tx0 + 0.5 * s - half, yy, tx0 + 0.5 * s - half - 0.08 * s, yy - 0.12 * s, stD, 1); L(c, tx0 + 0.5 * s + half, yy, tx0 + 0.5 * s + half + 0.08 * s, yy - 0.12 * s, stD, 1); }
        O(c, tx0 + 0.5 * s, g - 8.05 * s, 0.07 * s, K.gold);
      }
    } },
    market: { w: 2.8, h: 3.8, d(c, x, g, s, t, r) { // casa con entramado + puesto
      const W = 2.8 * s, H = 2.8 * s, beam = '#4a2f1d';
      R(c, x, g - H, W, H, '#f3ead6'); side(c, x, g - H, W, H, 0.12);
      P(c, [x - 0.1 * s, g - H, x + W / 2, g - H - 1.0 * s, x + W + 0.1 * s, g - H], K.roof);
      [0, 0.95, 1.9].forEach(y0 => L(c, x, g - H + y0 * s, x + W, g - H + y0 * s, beam, Math.max(1, s * 0.1)));
      for (let i = 0; i <= 4; i++) L(c, x + i * W / 4, g - H, x + i * W / 4, g - H + 1.9 * s, beam, Math.max(1, s * 0.1));
      for (let i = 0; i < 4; i++) { L(c, x + i * W / 4, g - H + 0.95 * s, x + (i + 1) * W / 4, g - H + 1.9 * s, beam, Math.max(1, s * 0.07)); R(c, x + i * W / 4 + 0.2 * s, g - H + 0.2 * s, 0.3 * s, 0.5 * s, win(r)); }
      R(c, x + 0.3 * s, g - 0.9 * s, W - 0.6 * s, 0.4 * s, K.wood);
      for (let i = 0; i < 6; i++) P(c, [x + 0.2 * s + i * 0.4 * s, g - 1.3 * s, x + 0.6 * s + i * 0.4 * s, g - 1.3 * s, x + 0.6 * s + i * 0.4 * s, g - 1.0 * s, x + 0.2 * s + i * 0.4 * s, g - 1.0 * s], i % 2 ? '#f4f0e7' : '#d33c2e');
      for (let i = 0; i < 4; i++) { E(c, x + 0.6 * s + i * 0.5 * s, g - 0.95 * s, 0.2 * s, 0.1 * s, '#f2c14e'); E(c, x + 0.6 * s + i * 0.5 * s, g - 0.98 * s, 0.2 * s, 0.05 * s, '#f7d77a'); }
    } },
    factory: { w: 3.6, h: 4.2, d(c, x, g, s, t, r) {
      const W = 3.6 * s;
      R(c, x, g - 1.9 * s, W, 1.9 * s, '#9a4f37'); side(c, x, g - 1.9 * s, W, 1.9 * s);
      for (let i = 0; i < 4; i++) P(c, [x + i * 0.9 * s, g - 1.9 * s, x + i * 0.9 * s, g - 2.5 * s, x + (i + 1) * 0.9 * s, g - 1.9 * s], i % 2 ? K.slate : K.slateD);
      for (let i = 0; i < 4; i++) R(c, x + i * 0.9 * s + 0.05 * s, g - 2.4 * s, 0.12 * s, 0.45 * s, K.lit);
      grid(c, x + 0.1 * s, g - 1.7 * s, W - 0.2 * s, 1.1 * s, 6, 2, r, { fw: 0.6, p: 0.7 });
      for (const cx of [0.5, 2.9]) { R(c, x + cx * s, g - 4.2 * s, 0.32 * s, 2.3 * s, K.brickD); R(c, x + cx * s, g - 4.0 * s, 0.32 * s, 0.08 * s, '#e8e0d0'); smoke(c, x + (cx + 0.16) * s, g - 4.2 * s, s, t + cx); }
      R(c, x + 1.5 * s, g - 0.7 * s, 0.7 * s, 0.7 * s, '#2c2c34');
    } },
    // ── REINO UNIDO ──
    bigben: { w: 2.4, h: 8.4, d(c, x, g, s, t, r) {
      const W = 2.4 * s, cx = x + W / 2, bw = 1.1 * s, sto = '#d9c08a', stoD = '#b39a66';
      R(c, x, g - 2.3 * s, W, 2.3 * s, sto); grid(c, x + 0.05 * s, g - 2.2 * s, W - 0.1 * s, 2 * s, 6, 3, r, { arch: true, fw: 0.45, p: 0.55 }); crenel(c, x, g - 2.3 * s, W, s * 0.7, sto);
      R(c, cx - bw / 2, g - 5.8 * s, bw, 5.8 * s, sto); R(c, cx + bw * 0.25, g - 5.8 * s, bw * 0.25, 5.8 * s, stoD);
      for (let i = 1; i < 4; i++) L(c, cx - bw / 2 + i * bw / 4, g - 5.6 * s, cx - bw / 2 + i * bw / 4, g - 2.4 * s, stoD, 1);
      R(c, cx - 0.65 * s, g - 7.0 * s, 1.3 * s, 1.25 * s, sto); R(c, cx + 0.3 * s, g - 7.0 * s, 0.35 * s, 1.25 * s, stoD);
      O(c, cx, g - 6.38 * s, 0.48 * s, K.gold); O(c, cx, g - 6.38 * s, 0.42 * s, '#fff8e6');
      const ang = (t / 60) * Math.PI * 2; L(c, cx, g - 6.38 * s, cx + Math.sin(ang) * 0.32 * s, g - 6.38 * s - Math.cos(ang) * 0.32 * s, '#222', Math.max(1, s * 0.06)); L(c, cx, g - 6.38 * s, cx + Math.sin(ang / 12) * 0.22 * s, g - 6.38 * s - Math.cos(ang / 12) * 0.22 * s, '#222', Math.max(1, s * 0.08));
      R(c, cx - 0.55 * s, g - 7.55 * s, 1.1 * s, 0.55 * s, sto); for (let i = 0; i < 3; i++) A(c, cx - 0.45 * s + i * 0.33 * s, g - 7.05 * s, 0.22 * s, 0.4 * s, '#3a3020');
      P(c, [cx - 0.6 * s, g - 7.55 * s, cx, g - 8.4 * s, cx + 0.6 * s, g - 7.55 * s], '#3d4a5a'); P(c, [cx, g - 8.4 * s, cx + 0.6 * s, g - 7.55 * s, cx + 0.15 * s, g - 7.55 * s], '#2b3542');
      for (const px of [-0.6, 0.6]) P(c, [cx + px * s - 0.08 * s, g - 7.55 * s, cx + px * s, g - 8.0 * s, cx + px * s + 0.08 * s, g - 7.55 * s], K.gold);
      O(c, cx, g - 8.45 * s, 0.06 * s, K.gold);
    } },
    palace2: { w: 5, h: 2.8, d(c, x, g, s, t, r) { // Buckingham
      const W = 5 * s, st = '#e2dccb';
      R(c, x, g - 2.2 * s, W, 2.2 * s, st); R(c, x, g - 2.35 * s, W, 0.15 * s, '#cfc7b2');
      R(c, x + 1.7 * s, g - 2.5 * s, 1.6 * s, 2.5 * s, '#ece6d6');
      grid(c, x + 0.1 * s, g - 2.1 * s, W - 0.2 * s, 1.9 * s, 14, 3, r, { fw: 0.45, fh: 0.6, p: 0.55 });
      columns(c, x + 1.8 * s, g - 0.9 * s, 1.4 * s, 1.3 * s, 4, '#f6f2e8', '#d6cfbf');
      pediment(c, x + 1.7 * s, g - 2.2 * s, 1.6 * s, 0.3 * s, '#ece6d6', '#d6cfbf');
      R(c, x + 1.75 * s, g - 0.95 * s, 1.5 * s, 0.08 * s, '#b0182b');
      L(c, x + 2.5 * s, g - 2.5 * s, x + 2.5 * s, g - 3.0 * s, '#777', 1); R(c, x + 2.5 * s, g - 3.0 * s, 0.35 * s, 0.22 * s, '#c8102e'); R(c, x + 2.5 * s, g - 3.0 * s, 0.17 * s, 0.11 * s, K.gold);
      R(c, x, g - 0.1 * s, W, 0.1 * s, '#c9c0aa');
    } },
    pub: { w: 2.2, h: 3, d(c, x, g, s, t, r) {
      const W = 2.2 * s;
      R(c, x, g - 2.6 * s, W, 1.5 * s, K.brick); grid(c, x + 0.1 * s, g - 2.5 * s, W - 0.2 * s, 1.2 * s, 2, 1, r, { fw: 0.5, fh: 0.7 });
      P(c, [x - 0.1 * s, g - 2.6 * s, x + W / 2, g - 3.1 * s, x + W + 0.1 * s, g - 2.6 * s], K.slateD);
      R(c, x + 1.6 * s, g - 3.3 * s, 0.25 * s, 0.5 * s, K.brickD);
      R(c, x, g - 1.1 * s, W, 1.1 * s, '#1f4d35'); R(c, x, g - 1.2 * s, W, 0.14 * s, '#173a28'); R(c, x + 0.1 * s, g - 1.18 * s, W - 0.2 * s, 0.1 * s, K.gold);
      R(c, x + 0.15 * s, g - 0.95 * s, 1.0 * s, 0.6 * s, K.lit); L(c, x + 0.65 * s, g - 0.95 * s, x + 0.65 * s, g - 0.35 * s, '#173a28', 1);
      R(c, x + 1.4 * s, g - 0.9 * s, 0.5 * s, 0.9 * s, '#3a2516');
      L(c, x + W, g - 1.7 * s, x + W + 0.35 * s, g - 1.7 * s, '#222', 1); O(c, x + W + 0.3 * s, g - 1.45 * s, 0.22 * s, K.gold); O(c, x + W + 0.3 * s, g - 1.45 * s, 0.17 * s, '#7a1020');
    } },
    university: { w: 3.2, h: 4.4, d(c, x, g, s, t, r) { // Radcliffe Camera
      const W = 3.2 * s, cx = x + W / 2, st = '#e2c98f', stD = '#bfa265';
      R(c, x + 0.2 * s, g - 1.2 * s, W - 0.4 * s, 1.2 * s, '#d4b97c'); for (let i = 0; i < 6; i++) A(c, x + 0.35 * s + i * 0.42 * s, g, 0.24 * s, 0.7 * s, i % 2 ? K.dark : win(r));
      R(c, x + 0.3 * s, g - 2.6 * s, W - 0.6 * s, 1.4 * s, st); columns(c, x + 0.3 * s, g - 1.2 * s, W - 0.6 * s, 1.4 * s, 8, '#f0dca8', stD);
      R(c, x + 0.25 * s, g - 2.75 * s, W - 0.5 * s, 0.15 * s, stD);
      R(c, cx - 0.95 * s, g - 3.2 * s, 1.9 * s, 0.45 * s, st); grid(c, cx - 0.9 * s, g - 3.2 * s, 1.8 * s, 0.45 * s, 6, 1, r, { arch: true, p: 0.5 });
      c.fillStyle = '#7f8c99'; c.beginPath(); c.ellipse(cx, g - 3.2 * s, 0.95 * s, 0.95 * s, 0, Math.PI, 0); c.fill();
      for (let i = -3; i <= 3; i++) L(c, cx + i * 0.27 * s, g - 3.2 * s, cx + i * 0.06 * s, g - 4.1 * s, '#5f6b77', 1);
      R(c, cx - 0.15 * s, g - 4.4 * s, 0.3 * s, 0.35 * s, st); O(c, cx, g - 4.45 * s, 0.08 * s, K.gold);
    } },
    tower2: { w: 3, h: 4.4, d(c, x, g, s, t, r) { // Torre de Londres
      const W = 3 * s, st = '#e9e2d0';
      R(c, x + 0.3 * s, g - 3.4 * s, W - 0.6 * s, 3.4 * s, st); side(c, x + 0.3 * s, g - 3.4 * s, W - 0.6 * s, 3.4 * s, 0.14); crenel(c, x + 0.3 * s, g - 3.4 * s, W - 0.6 * s, s * 0.8, st);
      grid(c, x + 0.5 * s, g - 3.2 * s, W - 1 * s, 2.4 * s, 4, 3, r, { arch: true, fw: 0.35 });
      for (const tx of [0.15, 2.45]) { R(c, x + tx * s, g - 3.9 * s, 0.4 * s, 3.9 * s, st); R(c, x + (tx + 0.28) * s, g - 3.9 * s, 0.12 * s, 3.9 * s, 'rgba(0,0,0,0.14)'); c.fillStyle = '#6d7a85'; c.beginPath(); c.ellipse(x + (tx + 0.2) * s, g - 3.9 * s, 0.24 * s, 0.38 * s, 0, Math.PI, 0); c.fill(); L(c, x + (tx + 0.2) * s, g - 4.28 * s, x + (tx + 0.2) * s, g - 4.5 * s, K.gold, 1); }
      A(c, x + 1.25 * s, g, 0.5 * s, 0.8 * s, K.dark);
    } },
    // ── GRECIA ──
    parthenon: { w: 4.6, h: 3.4, d(c, x, g, s) {
      const W = 4.6 * s, st = '#eee2c8', stD = '#cbb991';
      R(c, x, g - 0.15 * s, W, 0.15 * s, stD); R(c, x + 0.1 * s, g - 0.3 * s, W - 0.2 * s, 0.15 * s, '#ddd0b0'); R(c, x + 0.2 * s, g - 0.45 * s, W - 0.4 * s, 0.15 * s, st);
      R(c, x + 0.3 * s, g - 2.45 * s, W - 0.6 * s, 2.0 * s, '#8a7a60');
      columns(c, x + 0.25 * s, g - 0.45 * s, W - 0.5 * s, 2.0 * s, 8, st, stD);
      R(c, x + 0.15 * s, g - 2.8 * s, W - 0.3 * s, 0.35 * s, st); for (let i = 0; i < 16; i++) R(c, x + 0.25 * s + i * (W - 0.5 * s) / 16, g - 2.72 * s, 0.06 * s, 0.2 * s, stD);
      pediment(c, x + 0.15 * s, g - 2.8 * s, W - 0.3 * s, 0.6 * s, st, '#e2d4b4');
    } },
    temple: { w: 3.2, h: 3.2, d(c, x, g, s) { // templo de Poseidón (Sunión)
      const W = 3.2 * s, st = '#e8cf9a', stD = '#c3a86f';
      R(c, x, g - 0.2 * s, W, 0.2 * s, stD); R(c, x + 0.1 * s, g - 0.35 * s, W - 0.2 * s, 0.15 * s, st);
      columns(c, x + 0.2 * s, g - 0.35 * s, W - 0.4 * s, 2.2 * s, 6, st, stD);
      R(c, x + 0.1 * s, g - 2.85 * s, W * 0.7, 0.3 * s, st); R(c, x + 0.1 * s + W * 0.7, g - 2.75 * s, W * 0.18, 0.2 * s, st);
    } },
    agora: { w: 4.2, h: 2.8, d(c, x, g, s) { // stoa
      const W = 4.2 * s, st = '#efe3c9', stD = '#cbb991';
      R(c, x, g - 0.18 * s, W, 0.18 * s, stD); R(c, x + 0.2 * s, g - 2.1 * s, W - 0.4 * s, 1.9 * s, '#a08b68');
      for (let i = 0; i < 4; i++) R(c, x + 0.5 * s + i * 0.9 * s, g - 1.2 * s, 0.4 * s, 1.0 * s, '#3a2c1d');
      columns(c, x + 0.1 * s, g - 0.18 * s, W - 0.2 * s, 1.95 * s, 9, st, stD);
      R(c, x, g - 2.4 * s, W, 0.3 * s, st); P(c, [x - 0.1 * s, g - 2.4 * s, x + 0.4 * s, g - 2.8 * s, x + W - 0.4 * s, g - 2.8 * s, x + W + 0.1 * s, g - 2.4 * s], K.roof);
    } },
    port: { w: 3.6, h: 4.2, d(c, x, g, s, t) {
      const W = 3.6 * s;
      water(c, x, g - 0.6 * s, W, 0.6 * s, t);
      R(c, x, g - 0.75 * s, 1.6 * s, 0.2 * s, K.wood); for (let i = 0; i < 4; i++) R(c, x + 0.1 * s + i * 0.45 * s, g - 0.6 * s, 0.08 * s, 0.6 * s, '#4a3220');
      const lx = x + 2.7 * s; R(c, lx - 0.4 * s, g - 0.8 * s, 0.8 * s, 0.8 * s, '#8c8f96');
      P(c, [lx - 0.32 * s, g - 0.8 * s, lx - 0.2 * s, g - 3.5 * s, lx + 0.2 * s, g - 3.5 * s, lx + 0.32 * s, g - 0.8 * s], K.white);
      for (let k = 0; k < 3; k++) P(c, [lx - 0.3 * s + k * 0.03 * s, g - 1.2 * s - k * 0.8 * s, lx - 0.27 * s + k * 0.03 * s, g - 1.6 * s - k * 0.8 * s, lx + 0.27 * s - k * 0.03 * s, g - 1.6 * s - k * 0.8 * s, lx + 0.3 * s - k * 0.03 * s, g - 1.2 * s - k * 0.8 * s], '#c8102e');
      R(c, lx - 0.22 * s, g - 3.85 * s, 0.44 * s, 0.35 * s, K.lit); P(c, [lx - 0.28 * s, g - 3.85 * s, lx, g - 4.2 * s, lx + 0.28 * s, g - 3.85 * s], '#c8102e');
      const ang = t * 1.5; c.fillStyle = 'rgba(255,230,150,0.18)'; c.beginPath(); c.moveTo(lx, g - 3.68 * s); c.lineTo(lx + Math.cos(ang) * 3 * s, g - 3.68 * s + Math.sin(ang) * 0.6 * s - 0.4 * s); c.lineTo(lx + Math.cos(ang) * 3 * s, g - 3.68 * s + Math.sin(ang) * 0.6 * s + 0.4 * s); c.closePath(); c.fill();
      const bx = x + 0.6 * s + Math.sin(t * 0.8) * 0.1 * s; P(c, [bx, g - 0.55 * s, bx + 1.1 * s, g - 0.55 * s, bx + 0.9 * s, g - 0.25 * s, bx + 0.15 * s, g - 0.25 * s], '#1e6fb5'); R(c, bx + 0.35 * s, g - 0.85 * s, 0.4 * s, 0.3 * s, K.white);
    } },
    statue: { w: 1.8, h: 4.2, d(c, x, g, s) {
      const cx = x + 0.9 * s, st = '#f0ebe0', stD = '#c9c1af';
      R(c, x, g - 0.3 * s, 1.8 * s, 0.3 * s, '#bdb3a0'); R(c, x + 0.25 * s, g - 1.7 * s, 1.3 * s, 1.4 * s, '#e3dccd'); R(c, x + 1.2 * s, g - 1.7 * s, 0.35 * s, 1.4 * s, '#cfc6b3'); R(c, x + 0.15 * s, g - 1.85 * s, 1.5 * s, 0.15 * s, stD);
      c.fillStyle = st; c.beginPath(); c.moveTo(cx - 0.3 * s, g - 1.85 * s); c.lineTo(cx - 0.25 * s, g - 3.2 * s); c.quadraticCurveTo(cx, g - 3.4 * s, cx + 0.25 * s, g - 3.2 * s); c.lineTo(cx + 0.35 * s, g - 1.85 * s); c.closePath(); c.fill();
      R(c, cx + 0.05 * s, g - 3.25 * s, 0.25 * s, 1.4 * s, 'rgba(0,0,0,0.1)');
      O(c, cx, g - 3.55 * s, 0.24 * s, st);
      L(c, cx + 0.2 * s, g - 3.15 * s, cx + 0.55 * s, g - 3.95 * s, st, Math.max(2, s * 0.16)); O(c, cx + 0.58 * s, g - 4.0 * s, 0.1 * s, st);
      L(c, cx - 0.22 * s, g - 3.1 * s, cx - 0.45 * s, g - 2.5 * s, st, Math.max(2, s * 0.15));
      for (let k = 0; k < 4; k++) L(c, cx - 0.2 * s + k * 0.13 * s, g - 2.9 * s, cx - 0.22 * s + k * 0.15 * s, g - 1.9 * s, stD, 1);
    } },
    // ── PORTUGAL ──
    tower3: { w: 2.8, h: 4.8, d(c, x, g, s, t, r) { // Torre de Belém
      const W = 2.8 * s, st = '#efe6d2', stD = '#cfc3a6';
      water(c, x, g - 0.35 * s, W, 0.35 * s, t);
      R(c, x + 0.1 * s, g - 1.7 * s, W - 0.2 * s, 1.35 * s, st); side(c, x + 0.1 * s, g - 1.7 * s, W - 0.2 * s, 1.35 * s, 0.14);
      for (let i = 0; i < 8; i++) { const bx = x + 0.15 * s + i * 0.32 * s; A(c, bx, g - 1.7 * s, 0.2 * s, 0.25 * s, st); O(c, bx + 0.1 * s, g - 1.8 * s, 0.05 * s, '#2a7a3a'); }
      R(c, x + 0.7 * s, g - 4.2 * s, 1.4 * s, 2.5 * s, st); R(c, x + 1.75 * s, g - 4.2 * s, 0.35 * s, 2.5 * s, 'rgba(0,0,0,0.13)');
      R(c, x + 0.6 * s, g - 3.05 * s, 1.6 * s, 0.1 * s, stD); for (let i = 0; i < 6; i++) R(c, x + 0.65 * s + i * 0.27 * s, g - 3.2 * s, 0.05 * s, 0.15 * s, stD);
      A(c, x + 1.15 * s, g - 2.2 * s, 0.5 * s, 0.6 * s, win(r)); A(c, x + 1.0 * s, g - 3.3 * s, 0.3 * s, 0.4 * s, win(r)); A(c, x + 1.5 * s, g - 3.3 * s, 0.3 * s, 0.4 * s, win(r));
      crenel(c, x + 0.7 * s, g - 4.2 * s, 1.4 * s, s * 0.7, st);
      for (const tx of [0.6, 2.0]) { R(c, x + tx * s, g - 4.5 * s, 0.22 * s, 0.4 * s, st); c.fillStyle = stD; c.beginPath(); c.ellipse(x + (tx + 0.11) * s, g - 4.5 * s, 0.13 * s, 0.2 * s, 0, Math.PI, 0); c.fill(); }
      for (const tx of [0.15, 2.45]) { R(c, x + tx * s, g - 2.0 * s, 0.2 * s, 0.35 * s, st); c.fillStyle = stD; c.beginPath(); c.ellipse(x + (tx + 0.1) * s, g - 2.0 * s, 0.12 * s, 0.18 * s, 0, Math.PI, 0); c.fill(); }
    } },
    monastery: { w: 4.6, h: 4, d(c, x, g, s, t, r) { // Jerónimos
      const W = 4.6 * s, st = '#ede3cf', stD = '#cdbf9f';
      R(c, x, g - 2.2 * s, 3.4 * s, 2.2 * s, st); R(c, x, g - 2.3 * s, 3.4 * s, 0.1 * s, stD);
      for (let i = 0; i < 6; i++) { G(c, x + 0.2 * s + i * 0.55 * s, g - 1.25 * s, 0.25 * s, 0.75 * s, win(r, 0.55)); A(c, x + 0.2 * s + i * 0.55 * s, g, 0.3 * s, 0.7 * s, '#7a6a52'); }
      for (let i = 0; i < 14; i++) P(c, [x + i * 0.243 * s, g - 2.3 * s, x + (i + 0.5) * 0.243 * s, g - 2.5 * s, x + (i + 1) * 0.243 * s, g - 2.3 * s], stD);
      R(c, x + 3.4 * s, g - 3.4 * s, 1.2 * s, 3.4 * s, st); R(c, x + 4.25 * s, g - 3.4 * s, 0.35 * s, 3.4 * s, 'rgba(0,0,0,0.13)');
      G(c, x + 3.7 * s, g, 0.6 * s, 1.5 * s, K.dark); for (let k = 0; k < 6; k++) R(c, x + 3.55 * s, g - 1.7 * s - k * 0.15 * s, 0.9 * s, 0.05 * s, stD);
      c.fillStyle = '#b9ad94'; c.beginPath(); c.ellipse(x + 4.0 * s, g - 3.4 * s, 0.55 * s, 0.55 * s, 0, Math.PI, 0); c.fill(); R(c, x + 3.95 * s, g - 4.1 * s, 0.1 * s, 0.2 * s, K.gold);
    } },
    azulejo: { w: 2.4, h: 3.8, d(c, x, g, s, t, r) {
      const W = 2.4 * s, H = 3.3 * s;
      R(c, x, g - H, W, H, '#f4f6fb');
      for (let j = 0; j < Math.floor(H / (0.3 * s)); j++) for (let i = 0; i < 8; i++) { const tx = x + i * W / 8, ty = g - H + j * 0.3 * s; P(c, [tx + W / 16, ty + 0.03 * s, tx + W / 8 - 0.03 * s, ty + 0.15 * s, tx + W / 16, ty + 0.27 * s, tx + 0.03 * s, ty + 0.15 * s], (i + j) % 2 ? '#2b5fb0' : '#7aa5e0'); }
      P(c, [x - 0.1 * s, g - H, x + W / 2, g - H - 0.5 * s, x + W + 0.1 * s, g - H], K.roof);
      for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) { const wx = x + 0.35 * s + i * 1.1 * s, wy = g - H + 0.3 * s + j * 1.0 * s; R(c, wx - 0.06 * s, wy - 0.06 * s, 0.72 * s, 0.72 * s, K.white); R(c, wx, wy, 0.6 * s, j === 2 && i === 0 ? 0.66 * s : 0.6 * s, j === 2 && i === 0 ? '#5a3a24' : win(r)); if (j < 2) { R(c, wx - 0.1 * s, wy + 0.6 * s, 0.8 * s, 0.05 * s, '#222'); for (let k = 0; k < 5; k++) L(c, wx - 0.08 * s + k * 0.19 * s, wy + 0.6 * s, wx - 0.08 * s + k * 0.19 * s, wy + 0.82 * s, '#222', 1); } }
    } },
    fado: { w: 2.2, h: 3.4, d(c, x, g, s, t, r) {
      const W = 2.2 * s, H = 2.9 * s;
      R(c, x, g - H, W, H, '#f2c34a'); side(c, x, g - H, W, H, 0.14);
      P(c, [x - 0.1 * s, g - H, x + W / 2, g - H - 0.5 * s, x + W + 0.1 * s, g - H], K.roof);
      for (let i = 0; i < 2; i++) { R(c, x + 0.3 * s + i * 1.0 * s, g - H + 0.3 * s, 0.6 * s, 0.7 * s, win(r)); R(c, x + 0.2 * s + i * 1.0 * s, g - H + 1.0 * s, 0.8 * s, 0.06 * s, K.white); }
      A(c, x + 0.25 * s, g, 0.7 * s, 1.3 * s, K.litW); R(c, x + 1.2 * s, g - 1.25 * s, 0.7 * s, 0.7 * s, win(r, 0.8));
      const gx = x + 1.55 * s, gy = g - 1.9 * s; L(c, x + 1.1 * s, gy - 0.1 * s, x + 1.9 * s, gy - 0.1 * s, '#222', 1);
      O(c, gx, gy + 0.25 * s, 0.2 * s, '#c8873a'); O(c, gx, gy + 0.05 * s, 0.14 * s, '#c8873a'); O(c, gx, gy + 0.2 * s, 0.05 * s, '#3a2516'); R(c, gx - 0.03 * s, gy - 0.4 * s, 0.06 * s, 0.35 * s, '#3a2516');
      O(c, x + 0.6 * s, g - 1.6 * s, 0.1 * s, `rgba(255,210,122,${0.75 + 0.25 * Math.sin(t * 5)})`);
    } },
    ship: { w: 3.6, h: 4.4, d(c, x, g, s, t) { // carabela
      const W = 3.6 * s, bob = Math.sin(t * 1.2) * 0.08 * s;
      water(c, x, g - 0.5 * s, W, 0.5 * s, t);
      c.save(); c.translate(0, bob);
      c.fillStyle = '#6b4226'; c.beginPath(); c.moveTo(x + 0.1 * s, g - 1.4 * s); c.lineTo(x + 0.9 * s, g - 1.1 * s); c.lineTo(x + 3.2 * s, g - 1.1 * s); c.lineTo(x + 3.5 * s, g - 1.5 * s); c.quadraticCurveTo(x + 3.0 * s, g - 0.25 * s, x + 1.8 * s, g - 0.3 * s); c.quadraticCurveTo(x + 0.5 * s, g - 0.4 * s, x + 0.1 * s, g - 1.4 * s); c.closePath(); c.fill();
      R(c, x + 0.6 * s, g - 0.85 * s, 2.6 * s, 0.07 * s, '#3b2414'); R(c, x + 0.15 * s, g - 1.75 * s, 0.8 * s, 0.4 * s, '#7a4e2e');
      for (const [mx, mh, sw] of [[1.4, 3.3, 1.2], [2.5, 2.6, 0.9]]) { const bx = x + mx * s; L(c, bx, g - 1.1 * s, bx, g - (1.1 + mh) * s, '#3b2414', Math.max(1, s * 0.07));
        P(c, [bx - sw * 0.15 * s, g - (1.1 + mh * 0.95) * s, bx + sw * s, g - 1.35 * s, bx - sw * 0.15 * s, g - 1.35 * s], '#f4ecd8');
        const cxs = bx + sw * 0.25 * s, cys = g - (1.1 + mh * 0.4) * s, cs = sw * 0.18 * s; R(c, cxs - cs, cys - cs * 0.25, cs * 2, cs * 0.5, '#c8102e'); R(c, cxs - cs * 0.25, cys - cs, cs * 0.5, cs * 2, '#c8102e'); }
      c.restore();
    } },
    // ── PAÍSES BAJOS ──
    windmill: { w: 2.6, h: 5.4, d(c, x, g, s, t, r) {
      const cx = x + 1.3 * s;
      R(c, x + 0.3 * s, g - 1.0 * s, 2.0 * s, 1.0 * s, K.brick); R(c, x + 0.2 * s, g - 1.1 * s, 2.2 * s, 0.12 * s, '#e8e0cf');
      P(c, [cx - 0.75 * s, g - 1.1 * s, cx - 0.45 * s, g - 3.8 * s, cx + 0.45 * s, g - 3.8 * s, cx + 0.75 * s, g - 1.1 * s], '#3f5a46'); P(c, [cx + 0.1 * s, g - 3.8 * s, cx + 0.45 * s, g - 3.8 * s, cx + 0.75 * s, g - 1.1 * s, cx + 0.2 * s, g - 1.1 * s], '#2f4636');
      A(c, cx - 0.2 * s, g, 0.4 * s, 0.7 * s, K.litW); R(c, cx - 0.15 * s, g - 2.6 * s, 0.3 * s, 0.35 * s, win(r));
      c.fillStyle = '#5a3a24'; c.beginPath(); c.ellipse(cx, g - 3.8 * s, 0.5 * s, 0.4 * s, 0, Math.PI, 0); c.fill();
      const hy = g - 3.85 * s, len = 2.2 * s, a0 = t * 0.9;
      for (let k = 0; k < 4; k++) { const a = a0 + k * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
        L(c, cx, hy, cx + ca * len, hy + sa * len, '#3b2414', Math.max(1, s * 0.07));
        c.fillStyle = 'rgba(245,240,225,0.9)'; c.beginPath(); c.moveTo(cx + ca * len * 0.25, hy + sa * len * 0.25); c.lineTo(cx + ca * len, hy + sa * len); c.lineTo(cx + ca * len + px * 0.32 * s, hy + sa * len + py * 0.32 * s); c.lineTo(cx + ca * len * 0.25 + px * 0.32 * s, hy + sa * len * 0.25 + py * 0.32 * s); c.closePath(); c.fill();
        for (let j = 1; j < 5; j++) { const u = 0.25 + j * 0.15; L(c, cx + ca * len * u, hy + sa * len * u, cx + ca * len * u + px * 0.32 * s, hy + sa * len * u + py * 0.32 * s, '#8a7a60', 0.7); } }
      O(c, cx, hy, 0.12 * s, '#3b2414');
    } },
    tulips: { w: 3.4, h: 1.6, d(c, x, g, s, t) {
      const W = 3.4 * s; R(c, x, g - 0.5 * s, W, 0.5 * s, '#3c7a3a');
      const cols = ['#e2453a', '#f2c14e', '#ec6aa0', '#f4f0e7', '#9b59b6'];
      for (let j = 0; j < 4; j++) for (let i = 0; i < 11; i++) { const tx = x + 0.15 * s + i * 0.3 * s + (j % 2) * 0.15 * s, ty = g - 0.1 * s - j * 0.13 * s + Math.sin(t * 2 + i) * 0.02 * s, sz = s * (0.09 + j * 0.02); L(c, tx, ty, tx, ty - sz * 2, '#2e5d2a', 1); P(c, [tx - sz, ty - sz * 2, tx - sz, ty - sz * 3.3, tx, ty - sz * 2.6, tx + sz, ty - sz * 3.3, tx + sz, ty - sz * 2], cols[j % cols.length]); }
      for (let i = 0; i < 9; i++) R(c, x + i * 0.42 * s, g - 0.95 * s, 0.06 * s, 0.4 * s, '#e8e0cf'); R(c, x, g - 0.9 * s, W, 0.05 * s, '#e8e0cf');
    } },
    canal: { w: 3.6, h: 4.4, d(c, x, g, s, t, r) {
      const W = 3.6 * s, cols = ['#7c3a28', '#3b2f2a', '#e6dcc6', '#2f4a63'];
      for (let i = 0; i < 4; i++) { const hx = x + i * 0.9 * s, hh = (3.0 + (i % 2) * 0.5) * s, hy = g - 0.7 * s;
        R(c, hx, hy - hh, 0.9 * s, hh, cols[i]);
        if (i % 2) P(c, [hx, hy - hh, hx + 0.45 * s, hy - hh - 0.7 * s, hx + 0.9 * s, hy - hh], cols[i]); else { R(c, hx + 0.15 * s, hy - hh - 0.3 * s, 0.6 * s, 0.3 * s, cols[i]); R(c, hx + 0.3 * s, hy - hh - 0.6 * s, 0.3 * s, 0.3 * s, cols[i]); }
        R(c, hx + 0.4 * s, hy - hh - 0.1 * s, 0.1 * s, 0.15 * s, '#f4f0e7');
        grid(c, hx + 0.05 * s, hy - hh + 0.15 * s, 0.8 * s, hh - 0.3 * s, 2, 4, r, { fw: 0.55, fh: 0.6 });
        R(c, hx + 0.88 * s, hy - hh, 0.02 * s, hh, 'rgba(0,0,0,0.4)'); }
      R(c, x, g - 0.75 * s, W, 0.08 * s, '#5a5a5a');
      water(c, x, g - 0.7 * s, W, 0.7 * s, t);
      const bx = x + ((t * 0.15) % 1) * (W + 1.2 * s) - 1.2 * s; c.save(); c.beginPath(); c.rect(x, g - 1.5 * s, W, 1.5 * s); c.clip(); P(c, [bx, g - 0.5 * s, bx + 1.1 * s, g - 0.5 * s, bx + 0.95 * s, g - 0.25 * s, bx + 0.1 * s, g - 0.25 * s], '#c8102e'); R(c, bx + 0.3 * s, g - 0.7 * s, 0.5 * s, 0.2 * s, 'rgba(200,230,255,0.8)'); c.restore();
    } },
    museum: { w: 4.6, h: 4.6, d(c, x, g, s, t, r) { // Rijksmuseum
      const W = 4.6 * s, br = '#a5523a';
      R(c, x, g - 2.6 * s, W, 2.6 * s, br); side(c, x, g - 2.6 * s, W, 2.6 * s, 0.14);
      P(c, [x, g - 2.6 * s, x + 0.3 * s, g - 3.1 * s, x + W - 0.3 * s, g - 3.1 * s, x + W, g - 2.6 * s], K.slateD);
      grid(c, x + 0.1 * s, g - 2.5 * s, W - 0.2 * s, 1.6 * s, 10, 2, r, { arch: true, fw: 0.5 });
      for (const tx of [1.2, 2.8]) { R(c, x + tx * s, g - 3.6 * s, 0.6 * s, 3.6 * s, '#b45d42'); R(c, x + (tx + 0.42) * s, g - 3.6 * s, 0.18 * s, 3.6 * s, 'rgba(0,0,0,0.14)'); P(c, [x + (tx - 0.05) * s, g - 3.6 * s, x + (tx + 0.3) * s, g - 4.6 * s, x + (tx + 0.65) * s, g - 3.6 * s], K.slate); O(c, x + (tx + 0.3) * s, g - 4.65 * s, 0.06 * s, K.gold); R(c, x + (tx + 0.18) * s, g - 3.3 * s, 0.24 * s, 0.4 * s, win(r)); }
      A(c, x + 1.9 * s, g, 0.8 * s, 1.0 * s, K.litW); R(c, x, g - 2.7 * s, W, 0.08 * s, '#e3c9a0');
    } },
    bike: { w: 2.8, h: 3.2, d(c, x, g, s, t) {
      R(c, x, g - 0.12 * s, 2.8 * s, 0.12 * s, '#b0312a');
      const bike = (bx, col) => { const wr = 0.32 * s, y0 = g - wr - 0.12 * s; c.strokeStyle = '#222'; c.lineWidth = Math.max(1, s * 0.06); c.beginPath(); c.arc(bx, y0, wr, 0, Math.PI * 2); c.stroke(); c.beginPath(); c.arc(bx + 0.9 * s, y0, wr, 0, Math.PI * 2); c.stroke();
        c.strokeStyle = col; c.lineWidth = Math.max(1, s * 0.07); c.beginPath(); c.moveTo(bx, y0); c.lineTo(bx + 0.35 * s, y0 - 0.45 * s); c.lineTo(bx + 0.8 * s, y0 - 0.45 * s); c.lineTo(bx + 0.9 * s, y0); c.moveTo(bx + 0.35 * s, y0 - 0.45 * s); c.lineTo(bx + 0.45 * s, y0); c.lineTo(bx + 0.8 * s, y0 - 0.45 * s); c.stroke();
        L(c, bx + 0.3 * s, y0 - 0.45 * s, bx + 0.28 * s, y0 - 0.6 * s, '#222', Math.max(1, s * 0.07)); L(c, bx + 0.78 * s, y0 - 0.45 * s, bx + 0.75 * s, y0 - 0.65 * s, '#222', Math.max(1, s * 0.06)); };
      bike(x + 0.35 * s, '#1f6fd0'); bike(x + 1.5 * s, '#e0662e');
      const lx = x + 2.55 * s; L(c, lx, g, lx, g - 3.0 * s, '#2b2b2b', Math.max(1.5, s * 0.08)); L(c, lx, g - 3.0 * s, lx - 0.3 * s, g - 3.0 * s, '#2b2b2b', Math.max(1.5, s * 0.08));
      O(c, lx - 0.3 * s, g - 2.9 * s, 0.12 * s, K.litW); O(c, lx - 0.3 * s, g - 2.9 * s, 0.4 * s, 'rgba(255,220,140,0.15)');
    } },
  };

  // ── banderas (ondean) ──
  const FLAGS = {
    spain: (u, v) => (v < 0.25 || v > 0.75 ? '#c60b1e' : '#ffc400'),
    france: (u) => (u < 1 / 3 ? '#0055a4' : u < 2 / 3 ? '#ffffff' : '#ef4135'),
    italy: (u) => (u < 1 / 3 ? '#009246' : u < 2 / 3 ? '#ffffff' : '#ce2b37'),
    germany: (u, v) => (v < 1 / 3 ? '#111111' : v < 2 / 3 ? '#dd0000' : '#ffce00'),
    netherlands: (u, v) => (v < 1 / 3 ? '#ae1c28' : v < 2 / 3 ? '#ffffff' : '#21468b'),
    portugal: (u, v) => { const dx = (u - 0.4) * 1.5, dy = v - 0.5; if (dx * dx + dy * dy < 0.035) return '#ffd700'; return u < 0.4 ? '#006600' : '#ff0000'; },
    greece: (u, v) => { if (u < 0.4 && v < 5 / 9) return Math.abs(u - 0.2) < 0.045 || Math.abs(v - 5 / 18) < 0.06 ? '#ffffff' : '#0d5eaf'; return Math.floor(v * 9) % 2 ? '#ffffff' : '#0d5eaf'; },
    uk: (u, v) => { const X = u * 2 - 1, Y = (v * 2 - 1) * 0.5; if (Math.abs(X) < 0.1 || Math.abs(Y) < 0.1) return '#c8102e'; if (Math.abs(X) < 0.17 || Math.abs(Y) < 0.17) return '#ffffff'; const d1 = Math.abs(Y - X * 0.5), d2 = Math.abs(Y + X * 0.5); if (Math.min(d1, d2) < 0.05) return '#c8102e'; if (Math.min(d1, d2) < 0.11) return '#ffffff'; return '#012169'; },
  };
  function flag(c, id, x, y, w, h, t) {
    const fn = FLAGS[id]; if (!fn) return; const step = 2;
    for (let i = 0; i < w; i += step) { const dy = Math.sin(t * 3 - i * 0.25) * (i / w) * h * 0.12;
      for (let j = 0; j < h; j += step) { c.fillStyle = fn(i / w, j / h); c.fillRect(x + i, y + j + dy, step + 0.3, step + 0.3); } }
    c.fillStyle = 'rgba(0,0,0,0.08)'; for (let i = 0; i < w; i += 6) c.fillRect(x + i, y, 2, h);
  }

  const spec = (id) => B[id] || null;

  // ── niveles: 1 = en construcción, 2 = terminado, 3 = lujo ──
  function drawLevel(c, d, id, x, g, s, t, lvl) {
    const W = d.w * s, Hh = d.h * s, r = seeded(hash(id));
    if (lvl >= 3) { // halo dorado detrás
      const gl = c.createRadialGradient(x + W / 2, g - Hh * 0.45, 2, x + W / 2, g - Hh * 0.45, Math.max(W, Hh) * 0.75);
      gl.addColorStop(0, 'rgba(255,214,120,0.35)'); gl.addColorStop(1, 'rgba(255,214,120,0)');
      c.fillStyle = gl; c.fillRect(x - W * 0.4, g - Hh * 1.3, W * 1.8, Hh * 1.3);
    }
    if (lvl <= 1) {
      const cut = g - Hh * 0.5;
      c.save(); c.beginPath(); c.rect(x - s, cut, W + 2 * s, g - cut + 2); c.clip(); d.d(c, x, g, s, t, r); c.restore();
      // silueta de lo que falta
      c.save(); c.beginPath(); c.rect(x - s, g - Hh - s, W + 2 * s, Hh * 0.5 + s); c.clip(); c.globalAlpha = 0.13; d.d(c, x, g, s, t, seeded(hash(id))); c.restore();
      // andamios
      const top = g - Hh * 0.62, wood = '#c98a3c', lw = Math.max(1, s * 0.07);
      const n = Math.max(2, Math.round(d.w / 0.7));
      for (let i = 0; i <= n; i++) L(c, x + W * i / n, g, x + W * i / n, top, wood, lw);
      for (let y = g - s * 0.6; y > top; y -= s * 0.7) { L(c, x - s * 0.05, y, x + W + s * 0.05, y, wood, lw * 1.4); }
      for (let i = 0; i < n; i++) L(c, x + W * i / n, g - s * 0.6, x + W * (i + 1) / n, Math.max(top, g - s * 1.3), 'rgba(201,138,60,0.7)', lw * 0.7);
      // grúa
      const cx = x + W + s * 0.15, ct = g - Math.max(Hh * 0.85, 3 * s);
      L(c, cx, g, cx, ct, '#f2b632', Math.max(1.2, s * 0.1));
      for (let y = g; y > ct; y -= s * 0.35) L(c, cx - s * 0.08, y, cx + s * 0.08, y - s * 0.35, '#c98f16', 0.8);
      L(c, cx - W * 0.7, ct, cx + s * 0.6, ct, '#f2b632', Math.max(1.2, s * 0.09));
      const hx = cx - W * 0.45 + Math.sin(t * 0.7) * s * 0.3, hy = ct + s * 1.2 + Math.sin(t * 1.1) * s * 0.2;
      L(c, hx, ct, hx, hy, '#ccc', 0.8); R(c, hx - s * 0.18, hy, s * 0.36, s * 0.2, '#8c5a2b');
      // cono naranja
      P(c, [x + W * 0.1, g, x + W * 0.1 + s * 0.12, g - s * 0.35, x + W * 0.1 + s * 0.24, g], '#ff7a1a');
      R(c, x + W * 0.1 + s * 0.06, g - s * 0.2, s * 0.12, s * 0.05, '#fff');
      return;
    }
    d.d(c, x, g, s, t, r);
    if (lvl >= 3) {
      // guirnalda de luces
      const yy = g - Hh * 0.32, sag = s * 0.25, nb = Math.max(6, Math.round(d.w * 3));
      c.strokeStyle = 'rgba(40,30,20,0.8)'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, yy); c.quadraticCurveTo(x + W / 2, yy + sag * 2, x + W, yy); c.stroke();
      const cols = ['#ffd27a', '#ff6b6b', '#7ee8fa', '#b8f27c'];
      for (let i = 1; i < nb; i++) { const u = i / nb, bx = x + W * u, by = yy + sag * 2 * 2 * u * (1 - u); const on = Math.sin(t * 4 + i) > -0.3; O(c, bx, by + 1.5, Math.max(1.3, s * 0.08), on ? cols[i % 4] : 'rgba(120,110,90,0.6)'); }
      // destellos
      for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1, sx = x + W * (0.2 + 0.3 * k), sy = g - Hh * (0.75 + 0.2 * ph); const a = Math.sin(ph * Math.PI); c.fillStyle = `rgba(255,240,180,${a})`; const z = s * 0.12 * a + 0.5; P(c, [sx, sy - z * 2, sx + z * 0.5, sy, sx, sy + z * 2, sx - z * 0.5, sy], c.fillStyle); P(c, [sx - z * 2, sy, sx, sy - z * 0.5, sx + z * 2, sy, sx, sy + z * 0.5], c.fillStyle); }
      // gente paseando
      const ppl = ['#e2453a', '#2e86de', '#f2b632', '#9b59b6'];
      for (let k = 0; k < 3; k++) { const px = x + ((t * 0.08 * (k % 2 ? 1 : -1) + 0.2 + k * 0.33) % 1 + 1) % 1 * W, ph = s * 0.42; R(c, px - ph * 0.12, g - ph * 0.75, ph * 0.24, ph * 0.5, ppl[k]); O(c, px, g - ph * 0.88, ph * 0.13, '#e0b48a'); L(c, px - ph * 0.06, g - ph * 0.27, px - ph * 0.08, g, '#222', 1); L(c, px + ph * 0.06, g - ph * 0.27, px + ph * 0.08, g, '#222', 1); }
    }
  }
  const norm = (it) => (typeof it === 'string' ? { id: it, lvl: 2 } : { id: it.id, lvl: it.lvl || 2 });
  const mix = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };

  // ── escena completa del país ──
  function scene(c, W, H, ids, country, t, opts = {}) {
    const groundY = Math.round(H * 0.84);
    const sky = c.createLinearGradient(0, 0, 0, groundY);
    sky.addColorStop(0, '#070b1f'); sky.addColorStop(0.55, '#15204a'); sky.addColorStop(1, country ? mix(country.color, 0.55) : '#24345e');
    c.fillStyle = sky; c.fillRect(0, 0, W, H);
    const rs = seeded(42);
    for (let i = 0; i < 70; i++) { const sx = rs() * W, sy = rs() * groundY * 0.6, tw = 0.35 + 0.5 * Math.abs(Math.sin(t * 1.3 + i)); c.fillStyle = `rgba(220,230,255,${tw})`; c.fillRect(sx, sy, 1.2, 1.2); }
    O(c, W * 0.86, H * 0.14, H * 0.055, '#f4f1e1'); O(c, W * 0.86 + H * 0.02, H * 0.14 - H * 0.01, H * 0.05, '#0d1430');
    // colinas lejanas
    c.fillStyle = 'rgba(20,30,60,0.85)'; c.beginPath(); c.moveTo(0, groundY);
    for (let i = 0; i <= W; i += 8) c.lineTo(i, groundY - H * 0.1 - Math.sin(i * 0.02) * H * 0.04 - Math.sin(i * 0.053 + 1) * H * 0.03);
    c.lineTo(W, groundY); c.closePath(); c.fill();
    // edificios: el más alto al centro
    const defs = ids.map(norm).map((it) => ({ ...it, ...spec(it.id) })).filter((d) => d.d);
    const sorted = [...defs].sort((a, b) => b.h - a.h), order = [];
    sorted.forEach((d, i) => (i % 2 ? order.unshift(d) : order.push(d)));
    const gap = 0.35, padX = W * 0.04, flagRoom = W * 0.1;
    const units = order.reduce((a, d) => a + d.w, 0) + gap * Math.max(0, order.length - 1);
    const maxH = order.reduce((a, d) => Math.max(a, d.h), 1);
    const s = Math.max(4, Math.min((W - padX * 2 - flagRoom) / Math.max(units, 6), (groundY - H * 0.07) / maxH));
    let x = padX + (W - padX * 2 - flagRoom - units * s) / 2;
    order.forEach((d) => {
      c.fillStyle = 'rgba(0,0,0,0.25)'; c.beginPath(); c.ellipse(x + d.w * s / 2, groundY, d.w * s * 0.55, s * 0.18, 0, 0, Math.PI * 2); c.fill();
      c.save(); drawLevel(c, d, d.id, x, groundY, s, t, d.lvl); c.restore();
      x += (d.w + gap) * s;
    });
    // suelo, acera y farolas
    R(c, 0, groundY, W, H - groundY, '#18202f'); R(c, 0, groundY, W, 2, '#3a4660');
    for (let i = 0; i < W; i += 26) R(c, i + 6, groundY + (H - groundY) * 0.55, 12, 2, 'rgba(240,220,150,0.35)');
    if (opts.fireworks) fireworks(c, W, groundY, t);
    if (country) {
      const fw = Math.min(34, flagRoom - 8), fx = W - fw - 6, fh = Math.min(H * 0.32, 60);
      L(c, fx, groundY, fx, groundY - fh, '#c9ced8', 2); O(c, fx, groundY - fh - 2, 2.5, K.gold);
      flag(c, country.id, fx + 1, groundY - fh, fw, Math.round(fw * 0.62), t);
    }
  }

  function fireworks(c, W, gy, t) {
    const cols = ['#ffd27a', '#ff6b6b', '#7ee8fa', '#b8f27c', '#f5a3ff'];
    for (let k = 0; k < 4; k++) {
      const per = 2.4, ph = ((t + k * 0.63) % per) / per, rs = seeded(k * 13 + Math.floor((t + k * 0.63) / per));
      const cx = W * (0.15 + 0.7 * rs()), cy = gy * (0.15 + 0.3 * rs()), col = cols[Math.floor(rs() * cols.length)];
      if (ph < 0.25) { const y = gy - (gy - cy) * (ph / 0.25); O(c, cx, y, 1.5, col); continue; }
      const e = (ph - 0.25) / 0.75, rad = 8 + e * 38, a = 1 - e;
      for (let i = 0; i < 18; i++) { const an = i / 18 * Math.PI * 2; c.fillStyle = col; c.globalAlpha = a; c.fillRect(cx + Math.cos(an) * rad, cy + Math.sin(an) * rad + e * e * 10, 2, 2); }
      c.globalAlpha = 1;
    }
  }

  // ── miniatura de un edificio (tienda y casillas) ──
  function thumb(c, size, id, country, t = 0, lvl = 2) {
    const d = spec(id); c.clearRect(0, 0, size, size); if (!d) return;
    const bg = c.createLinearGradient(0, 0, 0, size); bg.addColorStop(0, '#0e1530'); bg.addColorStop(1, country ? mix(country.color, 0.45) : '#24345e');
    c.fillStyle = bg; c.beginPath(); c.roundRect ? c.roundRect(0, 0, size, size, size * 0.18) : c.rect(0, 0, size, size); c.fill();
    const g = size * 0.9, s = Math.min((size * 0.84) / d.w, (size * 0.8) / d.h);
    c.save(); c.beginPath(); c.roundRect ? c.roundRect(0, 0, size, size, size * 0.18) : c.rect(0, 0, size, size); c.clip();
    R(c, 0, g, size, size - g, '#18202f');
    drawLevel(c, d, id, (size - d.w * s) / 2, g, s, t, lvl); c.restore();
  }

  const H = { K, R, P, O, E, L, A, G, win, grid, crenel, side, cone, water, smoke, tree, columns, pediment, shop, seeded, hash };
  return { B, H, FLAGS, spec, scene, thumb, flag, get ids() { return Object.keys(B); } };
})();
