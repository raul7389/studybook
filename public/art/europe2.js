// ═══ EUROPA 2 — Suiza, Austria, Bélgica, Irlanda, Noruega, Rusia ═══
(() => {
  const { K, R, P, O, E, L, A, G, win, grid, crenel, side, cone, water, smoke, tree, columns, pediment, shop } = CityArt.H;
  const onion = (c, cx, yb, w, h, f, fD) => { // cúpula de cebolla
    c.fillStyle = f; c.beginPath(); c.moveTo(cx - w * 0.32, yb);
    c.bezierCurveTo(cx - w * 0.75, yb - h * 0.35, cx - w * 0.5, yb - h * 0.72, cx, yb - h);
    c.bezierCurveTo(cx + w * 0.5, yb - h * 0.72, cx + w * 0.75, yb - h * 0.35, cx + w * 0.32, yb); c.closePath(); c.fill();
    if (fD) { c.fillStyle = fD; c.beginPath(); c.moveTo(cx, yb); c.lineTo(cx + w * 0.32, yb); c.bezierCurveTo(cx + w * 0.75, yb - h * 0.35, cx + w * 0.5, yb - h * 0.72, cx, yb - h); c.bezierCurveTo(cx + w * 0.2, yb - h * 0.6, cx + w * 0.25, yb - h * 0.3, cx, yb); c.fill(); }
  };
  const stripedOnion = (c, cx, yb, w, h, a, b) => {
    c.save(); onion(c, cx, yb, w, h, a); c.clip();
    for (let i = -6; i < 6; i++) { c.fillStyle = b; c.beginPath(); const x0 = cx + i * w * 0.22; c.moveTo(x0, yb + 2); c.quadraticCurveTo(x0 + w * 0.5, yb - h * 0.5, cx + i * w * 0.05, yb - h); c.lineTo(cx + i * w * 0.05 + w * 0.08, yb - h); c.quadraticCurveTo(x0 + w * 0.58, yb - h * 0.5, x0 + w * 0.11, yb + 2); c.fill(); }
    c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(cx + w * 0.05, yb - h, w, h); c.restore();
  };
  const cross = (c, cx, y, s, col = K.gold) => { L(c, cx, y, cx, y - s * 0.35, col, Math.max(1, s * 0.05)); L(c, cx - s * 0.1, y - s * 0.24, cx + s * 0.1, y - s * 0.24, col, Math.max(1, s * 0.05)); };
  const person = (c, x, g, s, col) => { R(c, x - s * 0.06, g - s * 0.32, s * 0.12, s * 0.22, col); O(c, x, g - s * 0.38, s * 0.06, '#e0b48a'); L(c, x - s * 0.03, g - s * 0.1, x - s * 0.04, g, '#222', 1); L(c, x + s * 0.03, g - s * 0.1, x + s * 0.04, g, '#222', 1); };

  Object.assign(CityArt.B, {
    // ── SUIZA ──
    ch_matterhorn: { w: 4.2, h: 6.4, d(c, x, g, s, t) {
      const W = 4.2 * s;
      P(c, [x, g, x + 0.9 * s, g - 2.6 * s, x + 1.5 * s, g - 2.2 * s, x + 2.6 * s, g - 6.4 * s, x + 3.0 * s, g - 5.2 * s, x + 3.6 * s, g - 3.4 * s, x + 4.0 * s, g - 1.6 * s, x + W, g - 0.3 * s, x + W, g], '#6d7787');
      P(c, [x + 2.6 * s, g - 6.4 * s, x + 3.0 * s, g - 5.2 * s, x + 3.6 * s, g - 3.4 * s, x + 4.0 * s, g - 1.6 * s, x + W, g - 0.3 * s, x + W, g, x + 2.9 * s, g], '#4f5868');
      P(c, [x + 2.6 * s, g - 6.4 * s, x + 2.15 * s, g - 4.9 * s, x + 2.4 * s, g - 5.1 * s, x + 2.6 * s, g - 4.6 * s, x + 2.85 * s, g - 5.0 * s, x + 3.0 * s, g - 5.2 * s], '#f4f6fb');
      P(c, [x + 0.9 * s, g - 2.6 * s, x + 0.6 * s, g - 1.9 * s, x + 1.0 * s, g - 2.1 * s, x + 1.3 * s, g - 1.9 * s, x + 1.5 * s, g - 2.2 * s], '#e8ecf3');
      P(c, [x, g, x + 0.3 * s, g - 0.9 * s, x + 1.2 * s, g - 1.2 * s, x + 2.2 * s, g - 0.7 * s, x + 3.3 * s, g - 1.1 * s, x + W, g - 0.6 * s, x + W, g], K.greenD);
      for (let i = 0; i < 6; i++) { const tx = x + (0.3 + i * 0.7) * s; P(c, [tx - 0.15 * s, g, tx, g - 0.8 * s, tx + 0.15 * s, g], '#2f5d3a'); }
      O(c, x + 0.7 * s + ((t * 0.08) % 1) * W * 0.4, g - 4.6 * s, 0.25 * s, 'rgba(255,255,255,0.18)');
    } },
    ch_chalet: { w: 2.8, h: 3.2, d(c, x, g, s, t, r) {
      const W = 2.8 * s;
      R(c, x + 0.2 * s, g - 1.0 * s, W - 0.4 * s, 1.0 * s, '#bfb6a6'); R(c, x + 0.2 * s, g - 2.4 * s, W - 0.4 * s, 1.4 * s, '#8a5a32'); side(c, x + 0.2 * s, g - 2.4 * s, W - 0.4 * s, 2.4 * s, 0.18);
      for (let i = 0; i < 6; i++) L(c, x + 0.2 * s, g - 2.4 * s + i * 0.24 * s, x + W - 0.2 * s, g - 2.4 * s + i * 0.24 * s, '#6e4526', 0.8);
      P(c, [x - 0.15 * s, g - 2.35 * s, x + W / 2, g - 3.2 * s, x + W + 0.15 * s, g - 2.35 * s], '#5a3a22'); P(c, [x + 0.05 * s, g - 2.45 * s, x + W / 2, g - 3.05 * s, x + W - 0.05 * s, g - 2.45 * s], '#f4f6fb');
      R(c, x + 0.1 * s, g - 1.65 * s, W - 0.2 * s, 0.12 * s, '#6e4526'); for (let i = 0; i < 10; i++) R(c, x + 0.15 * s + i * 0.26 * s, g - 1.55 * s, 0.06 * s, 0.35 * s, '#6e4526');
      for (const wx of [0.5, 1.75]) { R(c, x + wx * s, g - 2.25 * s, 0.5 * s, 0.45 * s, win(r)); for (let k = 0; k < 4; k++) O(c, x + (wx + 0.06 + k * 0.13) * s, g - 1.72 * s, 0.07 * s, k % 2 ? '#e2453a' : '#f06292'); }
      R(c, x + 1.15 * s, g - 0.9 * s, 0.5 * s, 0.9 * s, '#4a2f1d'); R(c, x + 0.4 * s, g - 0.75 * s, 0.4 * s, 0.35 * s, win(r)); R(c, x + 2.0 * s, g - 0.75 * s, 0.4 * s, 0.35 * s, win(r));
      for (let k = 0; k < 4; k++) R(c, x + 2.3 * s + (k % 2) * 0.22 * s, g - 0.25 * s - Math.floor(k / 2) * 0.2 * s, 0.2 * s, 0.18 * s, '#a0743e');
    } },
    ch_clock: { w: 2.2, h: 6, d(c, x, g, s, t, r) { // Zytglogge
      const W = 2.2 * s, cx = x + W / 2, st = '#d9c7a1', stD = '#b8a37a';
      R(c, x + 0.35 * s, g - 4.6 * s, 1.5 * s, 4.6 * s, st); R(c, x + 1.45 * s, g - 4.6 * s, 0.4 * s, 4.6 * s, 'rgba(0,0,0,0.15)');
      A(c, cx - 0.4 * s, g, 0.8 * s, 1.1 * s, K.dark);
      R(c, cx - 0.62 * s, g - 3.0 * s, 1.24 * s, 1.24 * s, '#2a3f7a'); O(c, cx, g - 2.38 * s, 0.5 * s, K.gold); O(c, cx, g - 2.38 * s, 0.42 * s, '#1f2f5e');
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; O(c, cx + Math.cos(a) * 0.35 * s, g - 2.38 * s + Math.sin(a) * 0.35 * s, 0.035 * s, K.gold); }
      const ang = (t / 60) * Math.PI * 2; L(c, cx, g - 2.38 * s, cx + Math.sin(ang) * 0.3 * s, g - 2.38 * s - Math.cos(ang) * 0.3 * s, K.gold, Math.max(1, s * 0.05)); L(c, cx, g - 2.38 * s, cx + Math.sin(ang / 12) * 0.2 * s, g - 2.38 * s - Math.cos(ang / 12) * 0.2 * s, K.gold, Math.max(1, s * 0.07));
      R(c, cx - 0.2 * s, g - 3.7 * s, 0.4 * s, 0.5 * s, win(r)); R(c, cx - 0.2 * s, g - 1.6 * s, 0.4 * s, 0.35 * s, win(r));
      P(c, [x + 0.2 * s, g - 4.6 * s, cx, g - 5.5 * s, x + W - 0.2 * s, g - 4.6 * s], K.roof); P(c, [cx, g - 5.5 * s, x + W - 0.2 * s, g - 4.6 * s, cx + 0.1 * s, g - 4.6 * s], K.roofD);
      R(c, cx - 0.12 * s, g - 5.85 * s, 0.24 * s, 0.4 * s, '#3d4a5a'); P(c, [cx - 0.16 * s, g - 5.85 * s, cx, g - 6.0 * s, cx + 0.16 * s, g - 5.85 * s], '#3d4a5a'); O(c, cx, g - 6.0 * s, 0.05 * s, K.gold);
      R(c, x, g - 1.4 * s, 0.35 * s, 1.4 * s, stD); R(c, x + W - 0.35 * s, g - 1.4 * s, 0.35 * s, 1.4 * s, stD);
    } },
    ch_cablecar: { w: 4, h: 5, d(c, x, g, s, t) {
      const W = 4 * s;
      P(c, [x, g, x + 0.6 * s, g - 2.5 * s, x + 1.3 * s, g - 3.6 * s, x + 2.2 * s, g - 4.4 * s, x + 2.9 * s, g - 3.8 * s, x + 3.6 * s, g - 2.6 * s, x + W, g - 1.0 * s, x + W, g], '#7d8796');
      P(c, [x + 1.3 * s, g - 3.6 * s, x + 2.2 * s, g - 4.4 * s, x + 2.9 * s, g - 3.8 * s, x + 2.5 * s, g - 3.6 * s, x + 2.1 * s, g - 3.85 * s, x + 1.7 * s, g - 3.4 * s], '#f4f6fb');
      P(c, [x, g, x + 0.4 * s, g - 1.0 * s, x + 1.8 * s, g - 1.3 * s, x + 3.0 * s, g - 0.8 * s, x + W, g - 1.1 * s, x + W, g], K.greenD);
      const ax = x + 0.3 * s, ay = g - 0.9 * s, bx = x + 3.6 * s, by = g - 4.3 * s;
      R(c, ax - 0.25 * s, ay, 0.5 * s, 0.9 * s, '#8c8f96'); R(c, bx - 0.3 * s, by, 0.6 * s, 0.6 * s, '#8c8f96'); P(c, [bx - 0.4 * s, by, bx, by - 0.3 * s, bx + 0.4 * s, by], K.roof);
      L(c, ax, ay, bx, by, '#2b2b2b', 1); L(c, ax, ay + 0.15 * s, bx, by + 0.15 * s, '#2b2b2b', 0.8);
      const u = (Math.sin(t * 0.35) + 1) / 2, cx = ax + (bx - ax) * u, cy = ay + (by - ay) * u;
      L(c, cx, cy, cx, cy + 0.35 * s, '#222', 1);
      R(c, cx - 0.35 * s, cy + 0.35 * s, 0.7 * s, 0.55 * s, '#d8102e'); R(c, cx - 0.28 * s, cy + 0.43 * s, 0.56 * s, 0.22 * s, '#bfe3ff'); R(c, cx - 0.35 * s, cy + 0.82 * s, 0.7 * s, 0.08 * s, '#a50d24');
      for (let i = 0; i < 3; i++) { const pu = 0.25 + i * 0.25, px = ax + (bx - ax) * pu, py = ay + (by - ay) * pu; L(c, px, py, px, py + 1.2 * s, '#555', Math.max(1, s * 0.05)); }
    } },
    ch_cheese: { w: 2.6, h: 3, d(c, x, g, s, t, r) {
      shop(c, x, g, s, r, { w: 2.6, h: 2.5, wall: '#f1e6cf', roof: '#5a3a22', roofH: 0.6, awn: ['#d8102e', '#f4f0e7'],
        sign: (c, x, g, s, W) => { P(c, [x + 0.25 * s, g - 0.25 * s, x + 1.2 * s, g - 0.25 * s, x + 1.2 * s, g - 0.75 * s], '#f2c14e'); P(c, [x + 0.25 * s, g - 0.25 * s, x + 1.2 * s, g - 0.75 * s, x + 1.2 * s, g - 0.25 * s], '#e3ad2c'); for (let k = 0; k < 4; k++) O(c, x + (0.6 + k * 0.15) * s, g - (0.35 + (k % 2) * 0.12) * s, 0.04 * s, '#c48f20'); } });
      R(c, x + 1.05 * s, g - 2.35 * s, 0.5 * s, 0.32 * s, '#d8102e'); R(c, x + 1.27 * s, g - 2.32 * s, 0.06 * s, 0.26 * s, '#fff'); R(c, x + 1.18 * s, g - 2.22 * s, 0.24 * s, 0.06 * s, '#fff');
    } },
    // ── AUSTRIA ──
    at_opera: { w: 4.6, h: 3.6, d(c, x, g, s, t, r) {
      const W = 4.6 * s, st = '#e4d6b8', stD = '#c2b08a';
      R(c, x, g - 2.4 * s, W, 2.4 * s, st); side(c, x, g - 2.4 * s, W, 2.4 * s, 0.12);
      for (let i = 0; i < 5; i++) A(c, x + 1.0 * s + i * 0.55 * s, g, 0.38 * s, 0.9 * s, i === 2 ? K.litW : K.lit);
      R(c, x + 0.9 * s, g - 1.0 * s, 2.8 * s, 0.1 * s, stD);
      for (let i = 0; i < 5; i++) A(c, x + 1.0 * s + i * 0.55 * s, g - 1.15 * s, 0.38 * s, 0.85 * s, win(r, 0.8));
      grid(c, x + 0.1 * s, g - 2.3 * s, 0.75 * s, 2.1 * s, 1, 3, r, { arch: true }); grid(c, x + W - 0.85 * s, g - 2.3 * s, 0.75 * s, 2.1 * s, 1, 3, r, { arch: true });
      R(c, x, g - 2.55 * s, W, 0.15 * s, stD);
      c.fillStyle = '#5f8f7a'; c.beginPath(); c.moveTo(x + 0.8 * s, g - 2.55 * s); c.lineTo(x + 1.1 * s, g - 3.4 * s); c.lineTo(x + W - 1.1 * s, g - 3.4 * s); c.lineTo(x + W - 0.8 * s, g - 2.55 * s); c.closePath(); c.fill();
      R(c, x + 1.1 * s, g - 3.45 * s, W - 2.2 * s, 0.08 * s, K.gold);
      for (const px of [1.5, 3.1]) { R(c, x + px * s, g - 3.6 * s, 0.08 * s, 0.25 * s, K.gold); L(c, x + px * s, g - 3.6 * s, x + (px + 0.25) * s, g - 3.5 * s, K.gold, 1); }
    } },
    at_schonbrunn: { w: 5, h: 2.9, d(c, x, g, s, t, r) {
      const W = 5 * s, yl = '#f2c14e', ylD = '#d9a733';
      R(c, x, g - 2.2 * s, W, 2.2 * s, yl); R(c, x + 1.6 * s, g - 2.5 * s, 1.8 * s, 2.5 * s, '#f5c95e'); side(c, x, g - 2.2 * s, W, 2.2 * s, 0.1);
      grid(c, x + 0.1 * s, g - 2.1 * s, W - 0.2 * s, 1.95 * s, 15, 3, r, { fw: 0.45, fh: 0.6, p: 0.6 });
      R(c, x, g - 2.32 * s, W, 0.12 * s, '#f4f0e7'); R(c, x + 1.6 * s, g - 2.6 * s, 1.8 * s, 0.12 * s, '#f4f0e7');
      for (let i = 0; i < 5; i++) R(c, x + 1.75 * s + i * 0.36 * s, g - 2.5 * s, 0.1 * s, 1.9 * s, ylD);
      P(c, [x + 2.0 * s, g, x + 2.2 * s, g - 0.35 * s, x + 2.8 * s, g - 0.35 * s, x + 3.0 * s, g], '#e7dcc4'); L(c, x + 1.6 * s, g - 0.6 * s, x + 2.2 * s, g - 0.35 * s, '#8a7a60', 1); L(c, x + 3.4 * s, g - 0.6 * s, x + 2.8 * s, g - 0.35 * s, '#8a7a60', 1);
      for (let i = 0; i < 5; i++) { E(c, x + (0.3 + i * 1.1) * s, g + 0.02 * s, 0.25 * s, 0.1 * s, '#356f43'); }
    } },
    at_stephansdom: { w: 3.6, h: 8.2, d(c, x, g, s, t, r) {
      const W = 3.6 * s, st = '#c9b88f', stD = '#a3926a';
      R(c, x, g - 2.6 * s, W, 2.6 * s, st); side(c, x, g - 2.6 * s, W, 2.6 * s, 0.14);
      c.save(); c.beginPath(); c.moveTo(x - 0.05 * s, g - 2.6 * s); c.lineTo(x + 1.0 * s, g - 4.3 * s); c.lineTo(x + W + 0.05 * s, g - 2.6 * s); c.closePath(); c.clip();
      for (let j = 0; j < 9; j++) for (let i = 0; i < 12; i++) { const zx = x + i * 0.3 * s + (j % 2) * 0.15 * s, zy = g - 2.6 * s - j * 0.2 * s; P(c, [zx, zy, zx + 0.15 * s, zy - 0.2 * s, zx + 0.3 * s, zy], (i + j) % 3 === 0 ? '#e8c33a' : (i + j) % 3 === 1 ? '#2f7d5a' : '#1f3e6e'); }
      c.restore();
      for (let i = 0; i < 3; i++) G(c, x + 1.6 * s + i * 0.55 * s, g - 0.4 * s, 0.32 * s, 1.5 * s, win(r, 0.6));
      G(c, x + 0.3 * s, g, 0.6 * s, 1.3 * s, K.dark);
      const tx = x + 0.4 * s, tw = 1.2 * s; R(c, tx, g - 4.6 * s, tw, 4.6 * s, st); R(c, tx + tw * 0.65, g - 4.6 * s, tw * 0.35, 4.6 * s, stD);
      for (let k = 0; k < 3; k++) G(c, tx + 0.4 * s, g - 2.9 * s - k * 0.6 * s, 0.4 * s, 0.5 * s, '#3a3020');
      P(c, [tx - 0.05 * s, g - 4.6 * s, tx + tw / 2, g - 8.2 * s, tx + tw + 0.05 * s, g - 4.6 * s], st); P(c, [tx + tw / 2, g - 8.2 * s, tx + tw + 0.05 * s, g - 4.6 * s, tx + tw * 0.6, g - 4.6 * s], stD);
      for (let k = 1; k < 7; k++) { const yy = g - 4.6 * s - k * 0.5 * s, half = (tw / 2 + 0.05 * s) * (1 - k / 7.2); L(c, tx + tw / 2 - half, yy, tx + tw / 2 - half - 0.08 * s, yy - 0.12 * s, stD, 1); L(c, tx + tw / 2 + half, yy, tx + tw / 2 + half + 0.08 * s, yy - 0.12 * s, stD, 1); }
      O(c, tx + tw / 2, g - 8.25 * s, 0.07 * s, K.gold);
    } },
    at_cafe: { w: 2.6, h: 3, d(c, x, g, s, t, r) {
      shop(c, x, g, s, r, { w: 2.6, h: 2.6, wall: '#efe4cf', roof: '#3d4a5a', roofH: 0.5, awn: ['#7a1020', '#d8a24a'],
        sign: (c, x, g, s) => { R(c, x + 0.5 * s, g - 0.55 * s, 0.32 * s, 0.25 * s, '#fff'); R(c, x + 0.82 * s, g - 0.5 * s, 0.08 * s, 0.12 * s, '#fff'); for (let k = 0; k < 3; k++) { const p = (t * 0.5 + k / 3) % 1; O(c, x + (0.6 + k * 0.08) * s + Math.sin(p * 6) * 0.03 * s, g - (0.65 + p * 0.4) * s, 0.04 * s, `rgba(255,255,255,${0.6 * (1 - p)})`); } } });
      for (const tx of [0.3, 2.1]) { R(c, x + tx * s, g - 0.45 * s, 0.35 * s, 0.05 * s, '#e8e0d0'); L(c, x + (tx + 0.17) * s, g - 0.42 * s, x + (tx + 0.17) * s, g, '#444', 1); }
    } },
    at_riesenrad: { w: 4, h: 4.6, d(c, x, g, s, t) {
      const W = 4 * s, cx = x + W / 2, cy = g - 2.4 * s, rad = 1.9 * s;
      L(c, cx - 1.0 * s, g, cx, cy, '#8f2a20', Math.max(1.5, s * 0.1)); L(c, cx + 1.0 * s, g, cx, cy, '#8f2a20', Math.max(1.5, s * 0.1));
      c.strokeStyle = '#b8372a'; c.lineWidth = Math.max(1.2, s * 0.08); c.beginPath(); c.arc(cx, cy, rad, 0, Math.PI * 2); c.stroke();
      c.lineWidth = 0.8; c.beginPath(); c.arc(cx, cy, rad * 0.93, 0, Math.PI * 2); c.stroke();
      const a0 = t * 0.18, n = 15;
      for (let i = 0; i < n; i++) { const a = a0 + i / n * Math.PI * 2; L(c, cx, cy, cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, 'rgba(184,55,42,0.65)', 0.7); }
      for (let i = 0; i < n; i++) { const a = a0 + i / n * Math.PI * 2, gx = cx + Math.cos(a) * rad, gy = cy + Math.sin(a) * rad; L(c, gx, gy, gx, gy + 0.12 * s, '#333', 0.8); R(c, gx - 0.17 * s, gy + 0.12 * s, 0.34 * s, 0.24 * s, i % 3 ? '#c8102e' : '#f4f0e7'); R(c, gx - 0.12 * s, gy + 0.16 * s, 0.24 * s, 0.08 * s, K.lit); }
      O(c, cx, cy, 0.18 * s, '#8f2a20');
      R(c, cx - 0.8 * s, g - 0.45 * s, 1.6 * s, 0.45 * s, '#e6d6b4'); P(c, [cx - 0.9 * s, g - 0.45 * s, cx, g - 0.75 * s, cx + 0.9 * s, g - 0.45 * s], K.roof);
    } },
    // ── BÉLGICA ──
    be_atomium: { w: 3.6, h: 6.4, d(c, x, g, s, t) {
      const cx = x + 1.8 * s, cy = g - 3.6 * s, d = 1.35 * s;
      const pts = [[0, -1.35], [0, 1.35], [-1.1, -0.55], [1.1, -0.55], [-1.1, 0.55], [1.1, 0.55], [0, 0], [-0.45, -0.2], [0.45, 0.2]].map(([a, b]) => [cx + a * s * 0.95, cy + b * d / 1.35 * 1.35]);
      const tube = (a, b) => L(c, pts[a][0], pts[a][1], pts[b][0], pts[b][1], '#aab4c2', Math.max(2, s * 0.17));
      [[0, 2], [0, 3], [1, 4], [1, 5], [2, 4], [3, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [7, 6], [8, 6], [2, 7], [5, 8]].forEach(([a, b]) => tube(a, b));
      L(c, pts[1][0], pts[1][1], cx - 0.9 * s, g, '#8c96a4', Math.max(2, s * 0.2)); L(c, pts[1][0], pts[1][1], cx + 0.9 * s, g, '#8c96a4', Math.max(2, s * 0.2)); L(c, pts[1][0], pts[1][1], cx, g, '#8c96a4', Math.max(2, s * 0.22));
      pts.forEach(([px, py], i) => {
        const gr = c.createRadialGradient(px - 0.15 * s, py - 0.15 * s, 1, px, py, 0.42 * s); gr.addColorStop(0, '#f4f7fb'); gr.addColorStop(0.6, '#b9c3d1'); gr.addColorStop(1, '#7d8898');
        O(c, px, py, 0.42 * s, gr);
        if (i < 7) for (let k = 0; k < 3; k++) O(c, px - 0.18 * s + k * 0.18 * s, py, 0.05 * s, Math.sin(t * 2 + i + k) > 0 ? K.lit : '#6a7486');
      });
    } },
    be_grandplace: { w: 3.8, h: 7.6, d(c, x, g, s, t, r) { // Ayuntamiento
      const W = 3.8 * s, st = '#cdb98e', stD = '#a8946a';
      R(c, x, g - 2.6 * s, W, 2.6 * s, st); side(c, x, g - 2.6 * s, W, 2.6 * s, 0.12);
      for (let i = 0; i < 7; i++) A(c, x + 0.15 * s + i * 0.52 * s, g, 0.32 * s, 0.8 * s, i === 3 ? K.dark : '#5a4a32');
      grid(c, x + 0.1 * s, g - 2.45 * s, W - 0.2 * s, 1.5 * s, 8, 2, r, { arch: true, fw: 0.45 });
      R(c, x, g - 2.75 * s, W, 0.15 * s, stD); for (let i = 0; i < 12; i++) P(c, [x + i * W / 12, g - 2.75 * s, x + (i + 0.5) * W / 12, g - 3.05 * s, x + (i + 1) * W / 12, g - 2.75 * s], stD);
      P(c, [x + 0.1 * s, g - 2.75 * s, x + 0.5 * s, g - 3.6 * s, x + W - 0.5 * s, g - 3.6 * s, x + W - 0.1 * s, g - 2.75 * s], '#5b6878');
      const tx = x + 1.5 * s, tw = 0.8 * s;
      R(c, tx, g - 5.2 * s, tw, 2.6 * s, st); R(c, tx + tw * 0.65, g - 5.2 * s, tw * 0.35, 2.6 * s, stD);
      for (let k = 0; k < 3; k++) G(c, tx + 0.25 * s, g - 3.0 * s - k * 0.75 * s, 0.3 * s, 0.55 * s, win(r));
      R(c, tx + 0.08 * s, g - 6.2 * s, tw - 0.16 * s, 1.0 * s, st); G(c, tx + 0.25 * s, g - 5.4 * s, 0.3 * s, 0.6 * s, '#3a3020');
      P(c, [tx + 0.05 * s, g - 6.2 * s, tx + tw / 2, g - 7.4 * s, tx + tw - 0.05 * s, g - 6.2 * s], stD);
      R(c, tx + tw / 2 - 0.04 * s, g - 7.6 * s, 0.08 * s, 0.25 * s, K.gold); O(c, tx + tw / 2, g - 7.65 * s, 0.06 * s, K.gold);
      for (const px of [0.2, 3.6]) { R(c, x + px * s - 0.08 * s, g - 3.7 * s, 0.16 * s, 1.0 * s, st); P(c, [x + px * s - 0.1 * s, g - 3.7 * s, x + px * s, g - 4.0 * s, x + px * s + 0.1 * s, g - 3.7 * s], stD); }
    } },
    be_belfry: { w: 2.6, h: 7.4, d(c, x, g, s, t, r) {
      const W = 2.6 * s, cx = x + W / 2, br = '#a3653e', brD = '#7d4a2c';
      R(c, x, g - 2.2 * s, W, 2.2 * s, br); side(c, x, g - 2.2 * s, W, 2.2 * s, 0.15); crenel(c, x, g - 2.2 * s, W, s * 0.8, br);
      A(c, cx - 0.35 * s, g, 0.7 * s, 1.1 * s, K.dark); grid(c, x + 0.1 * s, g - 2.1 * s, W - 0.2 * s, 0.9 * s, 4, 1, r, { arch: true });
      const tw = 1.4 * s; R(c, cx - tw / 2, g - 5.0 * s, tw, 2.8 * s, br); R(c, cx + tw * 0.2, g - 5.0 * s, tw * 0.3, 2.8 * s, brD);
      for (let k = 0; k < 2; k++) G(c, cx - 0.2 * s, g - 2.6 * s - k * 1.1 * s, 0.4 * s, 0.8 * s, win(r));
      crenel(c, cx - tw / 2, g - 5.0 * s, tw, s * 0.7, br);
      R(c, cx - 0.5 * s, g - 6.4 * s, 1.0 * s, 1.4 * s, '#b07246'); R(c, cx + 0.2 * s, g - 6.4 * s, 0.3 * s, 1.4 * s, brD);
      O(c, cx, g - 6.0 * s, 0.25 * s, K.gold); O(c, cx, g - 6.0 * s, 0.2 * s, '#fff8e6'); G(c, cx - 0.15 * s, g - 5.1 * s, 0.3 * s, 0.5 * s, '#3a2516');
      for (const ox of [-0.5, 0.5]) { R(c, cx + ox * s - 0.06 * s, g - 6.6 * s, 0.12 * s, 0.25 * s, br); }
      P(c, [cx - 0.35 * s, g - 6.4 * s, cx, g - 7.3 * s, cx + 0.35 * s, g - 6.4 * s], '#4f5d6b'); O(c, cx, g - 7.35 * s, 0.06 * s, K.gold);
    } },
    be_chocolate: { w: 2.4, h: 3.2, d(c, x, g, s, t, r) {
      shop(c, x, g, s, r, { w: 2.4, h: 2.6, wall: '#5a3422', roof: '#3a2216', roofH: 0.6, awn: ['#e8b84a', '#5a3422'],
        sign: (c, x, g, s) => { for (let k = 0; k < 3; k++) { R(c, x + (0.3 + k * 0.28) * s, g - 0.55 * s, 0.22 * s, 0.3 * s, '#6b3a1e'); L(c, x + (0.3 + k * 0.28) * s, g - 0.4 * s, x + (0.52 + k * 0.28) * s, g - 0.4 * s, '#8b5a32', 1); } O(c, x + 0.5 * s, g - 0.7 * s, 0.08 * s, '#e0662e'); } });
      P(c, [x + 0.6 * s, g - 2.6 * s, x + 0.6 * s, g - 3.2 * s, x + 1.8 * s, g - 3.2 * s, x + 1.8 * s, g - 2.6 * s], '#5a3422'); for (let k = 0; k < 3; k++) P(c, [x + (0.6 + k * 0.4) * s, g - 3.2 * s, x + (0.8 + k * 0.4) * s, g - 3.4 * s, x + (1.0 + k * 0.4) * s, g - 3.2 * s], '#5a3422');
      R(c, x + 0.9 * s, g - 3.0 * s, 0.6 * s, 0.3 * s, win(r));
    } },
    be_bruges: { w: 3.8, h: 4.4, d(c, x, g, s, t, r) {
      const W = 3.8 * s, cols = ['#9a4f37', '#c9b88f', '#7c3a28', '#d6a45a'];
      for (let i = 0; i < 4; i++) { const hx = x + i * 0.95 * s, hh = (2.6 + (i % 2) * 0.6) * s, hy = g - 0.7 * s;
        R(c, hx, hy - hh, 0.95 * s, hh, cols[i]);
        for (let k = 0; k < 4; k++) R(c, hx + 0.12 * s + k * 0.09 * s, hy - hh - (k + 1) * 0.18 * s, 0.95 * s - 0.24 * s - k * 0.18 * s, 0.18 * s, cols[i]);
        grid(c, hx + 0.08 * s, hy - hh + 0.2 * s, 0.8 * s, hh - 0.35 * s, 2, 3, r, { fw: 0.5, fh: 0.6, arch: true });
        R(c, hx + 0.92 * s, hy - hh, 0.03 * s, hh, 'rgba(0,0,0,0.35)'); }
      water(c, x, g - 0.7 * s, W, 0.7 * s, t);
      c.fillStyle = '#b9a98a'; c.beginPath(); c.moveTo(x + 2.4 * s, g - 0.7 * s); c.arc(x + 3.0 * s, g - 0.7 * s, 0.6 * s, Math.PI, 0); c.lineTo(x + 3.6 * s, g - 0.95 * s); c.lineTo(x + 2.4 * s, g - 0.95 * s); c.closePath(); c.fill();
      c.fillStyle = K.water; c.beginPath(); c.arc(x + 3.0 * s, g - 0.7 * s, 0.42 * s, Math.PI, 0); c.fill();
      const sx = x + 0.4 * s + Math.sin(t * 0.5) * 0.4 * s; E(c, sx, g - 0.35 * s, 0.2 * s, 0.1 * s, '#fff'); L(c, sx + 0.15 * s, g - 0.4 * s, sx + 0.18 * s, g - 0.62 * s, '#fff', Math.max(1, s * 0.05)); O(c, sx + 0.2 * s, g - 0.64 * s, 0.05 * s, '#fff');
    } },
    // ── IRLANDA ──
    ie_moher: { w: 4.6, h: 3.6, d(c, x, g, s, t) {
      const W = 4.6 * s;
      water(c, x, g - 0.6 * s, W, 0.6 * s, t);
      P(c, [x + 0.6 * s, g - 0.6 * s, x + 0.7 * s, g - 2.6 * s, x + 1.8 * s, g - 2.9 * s, x + 3.0 * s, g - 3.3 * s, x + W, g - 3.4 * s, x + W, g - 0.6 * s], '#5d5a55');
      for (let k = 0; k < 7; k++) L(c, x + 0.65 * s, g - 0.9 * s - k * 0.3 * s, x + W, g - 1.0 * s - k * 0.36 * s, 'rgba(30,28,25,0.45)', 1);
      for (let i = 0; i < 5; i++) L(c, x + (1.2 + i * 0.7) * s, g - 0.6 * s, x + (1.25 + i * 0.7) * s, g - 2.8 * s - i * 0.1 * s, 'rgba(30,28,25,0.35)', 1);
      P(c, [x + 0.7 * s, g - 2.6 * s, x + 0.65 * s, g - 2.8 * s, x + 1.8 * s, g - 3.1 * s, x + 3.0 * s, g - 3.5 * s, x + W, g - 3.6 * s, x + W, g - 3.4 * s, x + 3.0 * s, g - 3.3 * s, x + 1.8 * s, g - 2.9 * s], '#4f9a60');
      P(c, [x, g - 0.6 * s, x + 0.15 * s, g - 1.5 * s, x + 0.45 * s, g - 1.6 * s, x + 0.55 * s, g - 0.6 * s], '#4a4743');
      const bx = x + 3.7 * s; R(c, bx, g - 4.0 * s, 0.35 * s, 0.6 * s, '#b4ab9a'); crenel(c, bx, g - 4.0 * s, 0.35 * s, s * 0.5, '#b4ab9a'); R(c, bx + 0.12 * s, g - 3.85 * s, 0.1 * s, 0.15 * s, '#3a3020');
      for (let k = 0; k < 3; k++) { const p = (t * 0.3 + k / 3) % 1; O(c, x + (0.2 + p * 0.5) * s, g - 0.6 * s - p * 0.4 * s, 0.08 * s * (1 - p) + 0.5, `rgba(255,255,255,${0.7 * (1 - p)})`); }
    } },
    ie_castle: { w: 2.8, h: 4.4, d(c, x, g, s, t, r) { // Blarney
      const W = 2.8 * s, st = '#9c978c', stD = '#7a766c';
      R(c, x + 0.2 * s, g - 3.8 * s, 1.6 * s, 3.8 * s, st); R(c, x + 1.4 * s, g - 3.8 * s, 0.4 * s, 3.8 * s, stD); crenel(c, x + 0.2 * s, g - 3.8 * s, 1.6 * s, s, st);
      R(c, x + 1.8 * s, g - 3.2 * s, 0.8 * s, 3.2 * s, '#8f8a80'); crenel(c, x + 1.8 * s, g - 3.2 * s, 0.8 * s, s * 0.7, '#8f8a80');
      for (let k = 0; k < 4; k++) { R(c, x + 0.55 * s, g - 3.4 * s + k * 0.8 * s, 0.22 * s, 0.32 * s, win(r, 0.5)); R(c, x + 1.1 * s, g - 3.4 * s + k * 0.8 * s, 0.22 * s, 0.32 * s, win(r, 0.5)); }
      for (let k = 0; k < 3; k++) R(c, x + 2.1 * s, g - 2.8 * s + k * 0.8 * s, 0.2 * s, 0.3 * s, win(r, 0.5));
      for (let i = 0; i < 7; i++) R(c, x + 0.25 * s + i * 0.22 * s, g - 3.95 * s, 0.1 * s, 0.12 * s, stD);
      A(c, x + 0.75 * s, g, 0.5 * s, 0.75 * s, K.dark);
      for (let k = 0; k < 4; k++) O(c, x + (0.25 + k * 0.15) * s, g - (0.4 + (k % 2) * 0.5) * s, 0.2 * s, '#3d7a3a');
      tree(c, x + 2.7 * s, g, s * 0.7);
    } },
    ie_roundtower: { w: 2.2, h: 6.4, d(c, x, g, s, t, r) {
      const W = 2.2 * s, cx = x + 0.85 * s, tw = 0.8 * s, st = '#b0a998';
      R(c, cx - tw / 2, g - 5.2 * s, tw, 5.2 * s, st); R(c, cx + tw * 0.15, g - 5.2 * s, tw * 0.35, 5.2 * s, 'rgba(0,0,0,0.18)');
      for (let k = 0; k < 14; k++) L(c, cx - tw / 2, g - 0.37 * s * k, cx + tw / 2, g - 0.37 * s * k, 'rgba(90,85,75,0.4)', 0.7);
      A(c, cx - 0.12 * s, g - 2.0 * s, 0.24 * s, 0.5 * s, K.dark);
      for (let k = 0; k < 4; k++) R(c, cx - 0.1 * s + (k % 2 ? 0.15 * s : -0.15 * s), g - 4.9 * s, 0.1 * s, 0.25 * s, K.dark);
      P(c, [cx - tw / 2 - 0.05 * s, g - 5.2 * s, cx, g - 6.4 * s, cx + tw / 2 + 0.05 * s, g - 5.2 * s], '#8a8476'); P(c, [cx, g - 6.4 * s, cx + tw / 2 + 0.05 * s, g - 5.2 * s, cx + 0.1 * s, g - 5.2 * s], '#6f6a5e');
      // cruz celta
      const kx = x + 1.8 * s; R(c, kx - 0.07 * s, g - 1.4 * s, 0.14 * s, 1.4 * s, '#9c978c'); R(c, kx - 0.35 * s, g - 1.15 * s, 0.7 * s, 0.14 * s, '#9c978c');
      c.strokeStyle = '#9c978c'; c.lineWidth = Math.max(1, s * 0.06); c.beginPath(); c.arc(kx, g - 1.08 * s, 0.2 * s, 0, Math.PI * 2); c.stroke();
      R(c, kx - 0.15 * s, g - 0.15 * s, 0.3 * s, 0.15 * s, '#7a766c');
    } },
    ie_cottage: { w: 3, h: 2.6, d(c, x, g, s, t, r) {
      const W = 3 * s;
      R(c, x + 0.1 * s, g - 1.5 * s, W - 0.2 * s, 1.5 * s, '#f4f1e8'); side(c, x + 0.1 * s, g - 1.5 * s, W - 0.2 * s, 1.5 * s, 0.1);
      c.fillStyle = '#c9a75a'; c.beginPath(); c.moveTo(x - 0.1 * s, g - 1.4 * s); c.quadraticCurveTo(x + 0.1 * s, g - 2.3 * s, x + 0.6 * s, g - 2.45 * s); c.lineTo(x + W - 0.6 * s, g - 2.45 * s); c.quadraticCurveTo(x + W - 0.1 * s, g - 2.3 * s, x + W + 0.1 * s, g - 1.4 * s); c.closePath(); c.fill();
      for (let i = 0; i < 12; i++) L(c, x + 0.1 * s + i * 0.24 * s, g - 2.35 * s, x + i * 0.24 * s, g - 1.45 * s, '#a8873e', 0.7);
      R(c, x + 0.4 * s, g - 2.6 * s, 0.25 * s, 0.4 * s, '#d8d2c4'); smoke(c, x + 0.52 * s, g - 2.6 * s, s * 0.7, t);
      R(c, x + 1.3 * s, g - 1.0 * s, 0.45 * s, 1.0 * s, '#c8102e'); R(c, x + 0.45 * s, g - 1.05 * s, 0.45 * s, 0.4 * s, win(r, 0.8)); R(c, x + 2.1 * s, g - 1.05 * s, 0.45 * s, 0.4 * s, win(r, 0.8));
      for (let i = 0; i < 8; i++) O(c, x + (0.1 + i * 0.4) * s, g - 0.1 * s, 0.15 * s, '#3d7a3a');
      for (let i = 0; i < 6; i++) R(c, x + (i * 0.5) * s, g - 0.3 * s, 0.35 * s, 0.3 * s, '#8f8a80');
    } },
    ie_pub: { w: 2.4, h: 3, d(c, x, g, s, t, r) {
      const W = 2.4 * s;
      R(c, x, g - 2.5 * s, W, 1.4 * s, '#f4efe4'); grid(c, x + 0.1 * s, g - 2.4 * s, W - 0.2 * s, 1.2 * s, 2, 1, r, { fw: 0.5, fh: 0.7 });
      P(c, [x - 0.1 * s, g - 2.5 * s, x + W / 2, g - 3.0 * s, x + W + 0.1 * s, g - 2.5 * s], K.slateD);
      R(c, x, g - 1.1 * s, W, 1.1 * s, '#0f6b3a'); R(c, x, g - 1.22 * s, W, 0.16 * s, '#0a4f2a'); R(c, x + 0.1 * s, g - 1.2 * s, W - 0.2 * s, 0.11 * s, K.gold);
      R(c, x + 0.15 * s, g - 0.95 * s, 1.0 * s, 0.6 * s, K.lit); L(c, x + 0.65 * s, g - 0.95 * s, x + 0.65 * s, g - 0.35 * s, '#0a4f2a', 1);
      R(c, x + 1.45 * s, g - 0.9 * s, 0.55 * s, 0.9 * s, '#c8102e');
      const sx = x + W + 0.32 * s, sy = g - 1.75 * s; L(c, x + W, sy - 0.25 * s, sx + 0.1 * s, sy - 0.25 * s, '#222', 1);
      // trébol
      for (const [dx, dy] of [[0, -0.12], [-0.11, 0.03], [0.11, 0.03]]) O(c, sx + dx * s, sy + dy * s, 0.1 * s, '#2fa34a'); L(c, sx, sy + 0.05 * s, sx + 0.06 * s, sy + 0.28 * s, '#2fa34a', Math.max(1, s * 0.05));
    } },
    // ── NORUEGA ──
    no_fjord: { w: 4.8, h: 4.6, d(c, x, g, s, t) {
      const W = 4.8 * s;
      P(c, [x, g - 0.8 * s, x + 0.1 * s, g - 2.6 * s, x + 0.25 * s, g - 3.9 * s, x + 0.6 * s, g - 4.6 * s, x + 1.4 * s, g - 3.4 * s, x + 1.8 * s, g - 1.6 * s, x + 2.0 * s, g - 0.8 * s], '#4d5a52');
      P(c, [x + 2.8 * s, g - 0.8 * s, x + 3.1 * s, g - 2.2 * s, x + 3.6 * s, g - 4.0 * s, x + 4.2 * s, g - 4.4 * s, x + 4.6 * s, g - 3.6 * s, x + W, g - 2.4 * s, x + W, g - 0.8 * s], '#3c4740');
      P(c, [x + 0.6 * s, g - 4.6 * s, x + 0.35 * s, g - 4.15 * s, x + 0.8 * s, g - 4.25 * s, x + 1.05 * s, g - 3.95 * s], '#f4f6fb'); P(c, [x + 4.2 * s, g - 4.4 * s, x + 3.85 * s, g - 3.95 * s, x + 4.3 * s, g - 4.05 * s, x + 4.6 * s, g - 3.85 * s], '#f4f6fb');
      for (let i = 0; i < 6; i++) { P(c, [x + (0.2 + i * 0.25) * s, g - 0.8 * s, x + (0.32 + i * 0.25) * s, g - (1.4 + (i % 2) * 0.3) * s, x + (0.44 + i * 0.25) * s, g - 0.8 * s], '#2f5d3a'); P(c, [x + (3.0 + i * 0.3) * s, g - 0.8 * s, x + (3.12 + i * 0.3) * s, g - (1.3 + (i % 2) * 0.3) * s, x + (3.24 + i * 0.3) * s, g - 0.8 * s], '#2f5d3a'); }
      // cascada
      const wx = x + 1.55 * s; for (let k = 0; k < 6; k++) { const yy = g - 3.2 * s + ((t * 1.5 * s + k * 0.4 * s) % (2.4 * s)); R(c, wx, yy, 0.09 * s, 0.2 * s, 'rgba(230,245,255,0.85)'); } R(c, wx, g - 3.2 * s, 0.09 * s, 2.4 * s, 'rgba(200,230,255,0.35)');
      water(c, x, g - 0.8 * s, W, 0.8 * s, t);
      const bx = x + 2.0 * s + Math.sin(t * 0.4) * 0.3 * s; P(c, [bx, g - 0.55 * s, bx + 0.9 * s, g - 0.55 * s, bx + 0.75 * s, g - 0.3 * s, bx + 0.1 * s, g - 0.3 * s], '#f4f6fb'); R(c, bx + 0.3 * s, g - 0.78 * s, 0.35 * s, 0.23 * s, '#c8102e');
    } },
    no_stavechurch: { w: 2.8, h: 5.4, d(c, x, g, s, t, r) {
      const W = 2.8 * s, cx = x + W / 2, wood = '#5a3620', woodD = '#3e2414';
      const tier = (y, w, h, rh) => { R(c, cx - w / 2, y - h, w, h, wood); R(c, cx + w * 0.2, y - h, w * 0.3, h, woodD); P(c, [cx - w / 2 - 0.15 * s, y - h, cx, y - h - rh, cx + w / 2 + 0.15 * s, y - h], '#2b1a10');
        for (let i = 0; i < Math.floor(w / (0.18 * s)); i++) L(c, cx - w / 2 + i * 0.18 * s, y - h, cx - w / 2 + i * 0.18 * s + 0.05 * s, y - h - rh * 0.4, 'rgba(90,60,40,0.7)', 0.6); };
      tier(g, 2.6 * s, 1.0 * s, 0.6 * s); tier(g - 1.6 * s, 1.8 * s, 0.7 * s, 0.6 * s); tier(g - 2.9 * s, 1.1 * s, 0.6 * s, 0.6 * s);
      R(c, cx - 0.2 * s, g - 4.6 * s, 0.4 * s, 0.4 * s, wood); P(c, [cx - 0.3 * s, g - 4.6 * s, cx, g - 5.4 * s, cx + 0.3 * s, g - 4.6 * s], '#2b1a10');
      for (const [y, w] of [[g - 2.2 * s, 1.8], [g - 3.5 * s, 1.1], [g - 4.1 * s, 0.6]]) { for (const sd of [-1, 1]) { const ex = cx + sd * (w / 2 + 0.15) * s; L(c, ex, y + 0.0 * s, ex + sd * 0.15 * s, y - 0.3 * s, woodD, Math.max(1, s * 0.06)); O(c, ex + sd * 0.17 * s, y - 0.33 * s, 0.06 * s, woodD); } }
      A(c, cx - 0.25 * s, g, 0.5 * s, 0.8 * s, '#c98a3c'); R(c, x + 0.4 * s, g - 0.75 * s, 0.25 * s, 0.35 * s, win(r)); R(c, x + W - 0.65 * s, g - 0.75 * s, 0.25 * s, 0.35 * s, win(r));
      cross(c, cx, g - 5.35 * s, s, '#c9a24a');
    } },
    no_bryggen: { w: 4, h: 3.8, d(c, x, g, s, t, r) {
      const W = 4 * s, cols = ['#c8432e', '#e8b84a', '#f4efe4', '#a5523a', '#e8b84a'];
      for (let i = 0; i < 5; i++) { const hx = x + i * 0.8 * s, hh = (2.4 + (i % 2) * 0.3) * s;
        R(c, hx, g - hh, 0.8 * s, hh, cols[i]); for (let k = 0; k < 6; k++) L(c, hx + k * 0.14 * s, g - hh, hx + k * 0.14 * s, g, 'rgba(0,0,0,0.12)', 0.6);
        P(c, [hx - 0.02 * s, g - hh, hx + 0.4 * s, g - hh - 0.9 * s, hx + 0.82 * s, g - hh], i % 2 ? '#3a2b22' : '#5a3a22');
        R(c, hx + 0.25 * s, g - hh - 0.35 * s, 0.3 * s, 0.25 * s, win(r));
        grid(c, hx + 0.05 * s, g - hh + 0.15 * s, 0.7 * s, hh - 1.0 * s, 2, 2, r, { fw: 0.5, fh: 0.6 });
        R(c, hx + 0.25 * s, g - 0.75 * s, 0.3 * s, 0.75 * s, '#3a2516');
        R(c, hx + 0.78 * s, g - hh, 0.02 * s, hh, 'rgba(0,0,0,0.4)'); }
      R(c, x, g - 0.1 * s, W, 0.1 * s, '#6b4a30');
    } },
    no_viking: { w: 4, h: 3.6, d(c, x, g, s, t) {
      const W = 4 * s, bob = Math.sin(t * 1.1) * 0.08 * s;
      water(c, x, g - 0.5 * s, W, 0.5 * s, t);
      c.save(); c.translate(0, bob);
      c.fillStyle = '#7a4a26'; c.beginPath(); c.moveTo(x + 0.15 * s, g - 1.8 * s); c.quadraticCurveTo(x + 0.4 * s, g - 0.4 * s, x + 2.0 * s, g - 0.35 * s); c.quadraticCurveTo(x + 3.6 * s, g - 0.4 * s, x + 3.85 * s, g - 1.8 * s); c.lineTo(x + 3.55 * s, g - 1.0 * s); c.lineTo(x + 0.45 * s, g - 1.0 * s); c.closePath(); c.fill();
      O(c, x + 0.15 * s, g - 1.9 * s, 0.14 * s, '#7a4a26'); O(c, x + 3.85 * s, g - 1.9 * s, 0.14 * s, '#7a4a26');
      for (let k = 0; k < 3; k++) L(c, x + 0.5 * s, g - 0.85 * s + k * 0.15 * s, x + 3.5 * s, g - 0.85 * s + k * 0.15 * s, '#5a3418', 0.8);
      for (let i = 0; i < 7; i++) { const sx = x + (0.75 + i * 0.42) * s; O(c, sx, g - 1.05 * s, 0.17 * s, i % 2 ? '#c8102e' : '#e8b84a'); O(c, sx, g - 1.05 * s, 0.06 * s, '#5a5a5a'); }
      const mx = x + 2.0 * s; L(c, mx, g - 1.0 * s, mx, g - 3.5 * s, '#4a2f1d', Math.max(1, s * 0.08));
      R(c, mx - 0.9 * s, g - 3.2 * s, 1.8 * s, 1.7 * s, '#f4ecd8'); for (let i = 0; i < 4; i++) if (i % 2) R(c, mx - 0.9 * s + i * 0.45 * s, g - 3.2 * s, 0.45 * s, 1.7 * s, '#c8102e');
      L(c, mx - 1.0 * s, g - 3.2 * s, mx + 1.0 * s, g - 3.2 * s, '#4a2f1d', Math.max(1, s * 0.07));
      c.restore();
    } },
    no_cabin: { w: 3.6, h: 4.6, d(c, x, g, s, t, r) {
      const W = 3.6 * s;
      // aurora boreal ondulante
      for (let b = 0; b < 3; b++) {
        c.beginPath(); const y0 = g - (3.4 + b * 0.35) * s;
        for (let i = 0; i <= 30; i++) { const u = i / 30, xx = x - 0.2 * s + u * (W + 0.4 * s), yy = y0 + Math.sin(u * 5 + t * 0.8 + b) * 0.3 * s; i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); }
        for (let i = 30; i >= 0; i--) { const u = i / 30, xx = x - 0.2 * s + u * (W + 0.4 * s), yy = y0 + Math.sin(u * 5 + t * 0.8 + b) * 0.3 * s + 0.9 * s * Math.sin(Math.PI * u); c.lineTo(xx, yy); }
        const gr = c.createLinearGradient(0, y0 - 0.3 * s, 0, y0 + 1.2 * s); gr.addColorStop(0, 'rgba(80,255,170,0)'); gr.addColorStop(0.4, `rgba(${b === 1 ? '150,120,255' : '80,255,170'},${0.3 + 0.12 * Math.sin(t + b)})`); gr.addColorStop(1, 'rgba(80,255,170,0)');
        c.fillStyle = gr; c.fill();
      }
      P(c, [x, g, x + 0.5 * s, g - 0.6 * s, x + W - 0.5 * s, g - 0.6 * s, x + W, g], '#e8ecf3');
      R(c, x + 0.7 * s, g - 1.6 * s, 2.2 * s, 1.0 * s, '#b0312a'); for (let k = 0; k < 4; k++) L(c, x + 0.7 * s, g - 1.6 * s + k * 0.25 * s, x + 2.9 * s, g - 1.6 * s + k * 0.25 * s, '#8a2520', 0.7);
      P(c, [x + 0.55 * s, g - 1.55 * s, x + 1.8 * s, g - 2.4 * s, x + 3.05 * s, g - 1.55 * s], '#3a2b22'); P(c, [x + 0.65 * s, g - 1.65 * s, x + 1.8 * s, g - 2.3 * s, x + 2.95 * s, g - 1.65 * s], '#f4f6fb');
      R(c, x + 1.0 * s, g - 1.35 * s, 0.4 * s, 0.35 * s, K.lit); R(c, x + 2.2 * s, g - 1.35 * s, 0.4 * s, 0.35 * s, K.lit); R(c, x + 1.6 * s, g - 1.2 * s, 0.35 * s, 0.6 * s, '#f4f0e7');
      R(c, x + 2.4 * s, g - 2.5 * s, 0.2 * s, 0.4 * s, '#5a4a40'); smoke(c, x + 2.5 * s, g - 2.5 * s, s * 0.7, t);
      for (const tx of [0.3, 3.3]) { P(c, [x + (tx - 0.25) * s, g - 0.4 * s, x + tx * s, g - 1.8 * s, x + (tx + 0.25) * s, g - 0.4 * s], '#244a30'); P(c, [x + (tx - 0.18) * s, g - 1.0 * s, x + tx * s, g - 1.75 * s, x + (tx + 0.18) * s, g - 1.0 * s], '#e8ecf3'); }
    } },
    // ── RUSIA ──
    ru_basil: { w: 4.4, h: 6.6, d(c, x, g, s, t, r) {
      const W = 4.4 * s, wall = '#b8432e', wallD = '#8f3322';
      R(c, x + 0.2 * s, g - 1.6 * s, W - 0.4 * s, 1.6 * s, wall); side(c, x + 0.2 * s, g - 1.6 * s, W - 0.4 * s, 1.6 * s, 0.14);
      for (let i = 0; i < 7; i++) A(c, x + 0.4 * s + i * 0.53 * s, g, 0.3 * s, 0.7 * s, i === 3 ? K.dark : '#f4efe4');
      // torre central
      const cx = x + W / 2; R(c, cx - 0.4 * s, g - 3.8 * s, 0.8 * s, 2.2 * s, '#c9573e'); R(c, cx + 0.1 * s, g - 3.8 * s, 0.3 * s, 2.2 * s, wallD);
      P(c, [cx - 0.42 * s, g - 3.8 * s, cx, g - 5.9 * s, cx + 0.42 * s, g - 3.8 * s], '#d9b04a'); P(c, [cx, g - 5.9 * s, cx + 0.42 * s, g - 3.8 * s, cx + 0.05 * s, g - 3.8 * s], '#b8902e');
      for (let k = 0; k < 5; k++) L(c, cx - 0.4 * s * (1 - k / 5), g - 3.8 * s - k * 0.42 * s, cx + 0.4 * s * (1 - k / 5), g - 3.8 * s - k * 0.42 * s, '#2f7d5a', Math.max(1, s * 0.05));
      onion(c, cx, g - 5.9 * s, 0.45 * s, 0.5 * s, K.gold); cross(c, cx, g - 6.35 * s, s);
      const dome = (dx, base, dw, dh, a, b) => { const bx = cx + dx * s; R(c, bx - dw * 0.3 * s, g - base * s, dw * 0.6 * s, (base - 1.6) * s, '#e8dcc4'); R(c, bx, g - base * s, dw * 0.3 * s, (base - 1.6) * s, 'rgba(0,0,0,0.12)'); G(c, bx - dw * 0.1 * s, g - 1.9 * s, dw * 0.2 * s, 0.5 * s, win(r)); stripedOnion(c, bx, g - base * s, dw * s, dh * s, a, b); cross(c, bx, g - (base + dh) * s, s * 0.8); };
      dome(-1.55, 2.9, 0.9, 1.1, '#2e86de', '#f4f6fb'); dome(1.55, 2.9, 0.9, 1.1, '#2f9a5a', '#f2c14e'); dome(-0.85, 3.4, 0.8, 1.0, '#e2453a', '#2f9a5a'); dome(0.85, 3.4, 0.8, 1.0, '#f2c14e', '#e2453a');
    } },
    ru_kremlin: { w: 5, h: 5.8, d(c, x, g, s, t, r) { // Torre Spásskaya + muralla
      const W = 5 * s, br = '#b8432e', brD = '#8f3322';
      R(c, x, g - 1.6 * s, W, 1.6 * s, br); side(c, x, g - 1.6 * s, W, 1.6 * s, 0.1);
      for (let i = 0; i < 16; i++) P(c, [x + i * W / 16, g - 1.6 * s, x + i * W / 16, g - 1.85 * s, x + (i + 0.25) * W / 16, g - 1.75 * s, x + (i + 0.5) * W / 16, g - 1.85 * s, x + (i + 0.5) * W / 16, g - 1.6 * s], br);
      const tx = x + 2.0 * s, tw = 1.0 * s;
      R(c, tx, g - 3.4 * s, tw, 3.4 * s, br); R(c, tx + tw * 0.68, g - 3.4 * s, tw * 0.32, 3.4 * s, brD); A(c, tx + 0.3 * s, g, 0.4 * s, 0.8 * s, K.dark);
      R(c, tx + 0.1 * s, g - 4.3 * s, tw - 0.2 * s, 0.9 * s, '#c9573e'); O(c, tx + tw / 2, g - 3.85 * s, 0.3 * s, '#1f2f5e'); O(c, tx + tw / 2, g - 3.85 * s, 0.24 * s, K.gold);
      const ang = (t / 60) * Math.PI * 2; L(c, tx + tw / 2, g - 3.85 * s, tx + tw / 2 + Math.sin(ang) * 0.2 * s, g - 3.85 * s - Math.cos(ang) * 0.2 * s, '#1f2f5e', 1);
      R(c, tx + 0.22 * s, g - 4.8 * s, tw - 0.44 * s, 0.5 * s, '#f4efe4'); A(c, tx + 0.38 * s, g - 4.35 * s, 0.24 * s, 0.4 * s, '#3a2516');
      P(c, [tx + 0.18 * s, g - 4.8 * s, tx + tw / 2, g - 5.5 * s, tx + tw - 0.18 * s, g - 4.8 * s], '#2f7d5a');
      const sx = tx + tw / 2, sy = g - 5.7 * s, glow = 0.7 + 0.3 * Math.sin(t * 2);
      c.fillStyle = `rgba(255,40,40,${glow})`; c.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = (i % 2 ? 0.08 : 0.2) * s; c.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr); } c.closePath(); c.fill();
      for (const ox of [0.3, 4.4]) { R(c, x + ox * s, g - 2.6 * s, 0.4 * s, 2.6 * s, br); P(c, [x + (ox - 0.03) * s, g - 2.6 * s, x + (ox + 0.2) * s, g - 3.3 * s, x + (ox + 0.43) * s, g - 2.6 * s], '#2f7d5a'); }
      // cúpulas doradas detrás
      R(c, x + 3.3 * s, g - 2.6 * s, 0.7 * s, 1.0 * s, '#f4efe4'); onion(c, x + 3.65 * s, g - 2.6 * s, 0.7 * s, 0.75 * s, K.gold, '#c99a32'); cross(c, x + 3.65 * s, g - 3.35 * s, s * 0.8);
      R(c, x + 0.9 * s, g - 2.3 * s, 0.6 * s, 0.7 * s, '#f4efe4'); onion(c, x + 1.2 * s, g - 2.3 * s, 0.6 * s, 0.65 * s, K.gold, '#c99a32'); cross(c, x + 1.2 * s, g - 2.95 * s, s * 0.7);
    } },
    ru_winterpalace: { w: 5, h: 2.9, d(c, x, g, s, t, r) {
      const W = 5 * s, gr = '#5fa58a', grD = '#468a70', wh = '#f4f0e7';
      R(c, x, g - 2.3 * s, W, 2.3 * s, gr); side(c, x, g - 2.3 * s, W, 2.3 * s, 0.1);
      for (let i = 0; i < 17; i++) R(c, x + 0.05 * s + i * W / 17, g - 2.3 * s, 0.07 * s, 2.3 * s, wh);
      grid(c, x + 0.1 * s, g - 2.2 * s, W - 0.2 * s, 2.0 * s, 16, 2, r, { arch: true, fw: 0.42, fh: 0.6, p: 0.7 });
      R(c, x, g - 2.45 * s, W, 0.15 * s, wh); R(c, x, g - 1.2 * s, W, 0.07 * s, wh);
      for (let i = 0; i < 20; i++) { const sx = x + 0.1 * s + i * (W - 0.2 * s) / 19; R(c, sx - 0.03 * s, g - 2.75 * s, 0.06 * s, 0.3 * s, K.gold); O(c, sx, g - 2.8 * s, 0.06 * s, K.gold); }
      A(c, x + 2.2 * s, g, 0.6 * s, 0.9 * s, K.litW); R(c, x + 2.1 * s, g - 0.98 * s, 0.8 * s, 0.08 * s, K.gold);
      R(c, x, g - 0.1 * s, W, 0.1 * s, grD);
    } },
    ru_bolshoi: { w: 3.8, h: 3.8, d(c, x, g, s, t, r) {
      const W = 3.8 * s, st = '#ede3cc', stD = '#c9b994';
      R(c, x, g - 2.6 * s, W, 2.6 * s, st); side(c, x, g - 2.6 * s, W, 2.6 * s, 0.12);
      R(c, x + 0.1 * s, g - 2.6 * s, W - 0.2 * s, 2.3 * s, '#c9b994');
      for (let i = 0; i < 4; i++) A(c, x + 0.5 * s + i * 0.75 * s, g - 0.5 * s, 0.4 * s, 1.0 * s, K.lit);
      columns(c, x + 0.2 * s, g - 0.3 * s, W - 0.4 * s, 2.0 * s, 8, '#f6f0e2', stD);
      R(c, x, g - 0.3 * s, W, 0.3 * s, stD); R(c, x + 0.05 * s, g - 2.55 * s, W - 0.1 * s, 0.25 * s, st);
      pediment(c, x, g - 2.6 * s, W, 0.6 * s, st, '#e0d5ba');
      // cuadriga
      const qx = x + W / 2, qy = g - 3.2 * s;
      for (let k = 0; k < 4; k++) { E(c, qx - 0.45 * s + k * 0.3 * s, qy, 0.15 * s, 0.09 * s, '#9a6a2a'); L(c, qx - 0.38 * s + k * 0.3 * s, qy - 0.04 * s, qx - 0.32 * s + k * 0.3 * s, qy - 0.2 * s, '#9a6a2a', Math.max(1, s * 0.06)); O(c, qx - 0.31 * s + k * 0.3 * s, qy - 0.22 * s, 0.05 * s, '#9a6a2a'); }
      R(c, qx - 0.08 * s, qy - 0.55 * s, 0.16 * s, 0.4 * s, '#9a6a2a'); O(c, qx, qy - 0.62 * s, 0.07 * s, '#9a6a2a');
    } },
    ru_matryoshka: { w: 2.6, h: 3.2, d(c, x, g, s, t, r) {
      shop(c, x, g, s, r, { w: 2.6, h: 2.5, wall: '#7c3a28', roof: '#2f7d5a', roofH: 0.6, awn: ['#c8102e', '#f2c14e'],
        sign: (c, x, g, s) => {
          [[0.35, 0.55, '#c8102e'], [0.78, 0.45, '#2e86de'], [1.12, 0.36, '#f2c14e']].forEach(([dx, h, col]) => {
            const mx = x + dx * s, my = g - 0.25 * s;
            E(c, mx, my - h * 0.35 * s, h * 0.32 * s, h * 0.42 * s, col); O(c, mx, my - h * 0.85 * s, h * 0.24 * s, col);
            O(c, mx, my - h * 0.85 * s, h * 0.15 * s, '#f6dcc0'); E(c, mx, my - h * 0.35 * s, h * 0.18 * s, h * 0.2 * s, '#f4f0e7'); O(c, mx, my - h * 0.36 * s, h * 0.07 * s, '#e2453a');
          });
        } });
      // gran matrioska en el tejado
      const mx = x + 1.3 * s, my = g - 2.5 * s - 0.05 * s, h = 0.75 * s;
      E(c, mx, my - h * 0.35, h * 0.35, h * 0.42, '#e2453a'); O(c, mx, my - h * 0.88, h * 0.26, '#e2453a'); O(c, mx, my - h * 0.88, h * 0.16, '#f6dcc0');
      E(c, mx, my - h * 0.35, h * 0.2, h * 0.22, '#f2c14e'); O(c, mx - h * 0.05, my - h * 0.9, h * 0.025, '#222'); O(c, mx + h * 0.05, my - h * 0.9, h * 0.025, '#222');
    } },
  });

  Object.assign(CityArt.FLAGS, {
    switzerland: (u, v) => { const X = Math.abs(u - 0.5), Y = Math.abs(v - 0.5); return (X < 0.09 && Y < 0.32) || (Y < 0.11 && X < 0.26) ? '#ffffff' : '#da291c'; },
    austria: (u, v) => (v > 1 / 3 && v < 2 / 3 ? '#ffffff' : '#c8102e'),
    belgium: (u) => (u < 1 / 3 ? '#111111' : u < 2 / 3 ? '#fdda24' : '#ef3340'),
    ireland: (u) => (u < 1 / 3 ? '#169b62' : u < 2 / 3 ? '#ffffff' : '#ff883e'),
    norway: (u, v) => { const X = Math.abs(u - 0.36), Y = Math.abs(v - 0.5); if (X < 0.045 || Y < 0.07) return '#00205b'; if (X < 0.09 || Y < 0.14) return '#ffffff'; return '#ba0c2f'; },
    russia: (u, v) => (v < 1 / 3 ? '#ffffff' : v < 2 / 3 ? '#0039a6' : '#d52b1e'),
  });
})();
