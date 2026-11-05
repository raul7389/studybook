// ═══ AMÉRICA — Colombia, México, Perú, Estados Unidos ═══
(() => {
  const { K, R, P, O, E, L, A, G, win, grid, crenel, side, cone, water, smoke, tree, columns, pediment } = CityArt.H;

  // palma de cera del Quindío: tronco altísimo y fino
  const waxPalm = (c, x, g, h, s) => {
    L(c, x, g, x + s * 0.05, g - h, '#cfc6b4', Math.max(1, s * 0.07));
    const tx = x + s * 0.05, ty = g - h;
    for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.45; c.strokeStyle = k % 2 ? '#2f7a3c' : '#3e9a4e'; c.lineWidth = Math.max(1, s * 0.06); c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + Math.cos(a) * s * 0.35, ty + Math.sin(a) * s * 0.35, tx + Math.cos(a) * s * 0.55, ty + Math.sin(a) * s * 0.35 + s * 0.25); c.stroke(); }
  };
  const balcony = (c, x, y, w, s, col) => {
    R(c, x, y, w, s * 0.08, col);
    for (let i = 0; i <= 6; i++) L(c, x + w * i / 6, y, x + w * i / 6, y + s * 0.28, col, Math.max(1, s * 0.04));
    R(c, x, y + s * 0.28, w, s * 0.06, col);
    for (let i = 0; i < 3; i++) O(c, x + w * (0.2 + i * 0.3), y - s * 0.02, s * 0.07, i % 2 ? '#e0408a' : '#ff6f61');
  };
  const roofTiles = (c, x, y, w, h, s) => {
    P(c, [x - s * 0.1, y, x + w * 0.5, y - h, x + w + s * 0.1, y], '#b5502f');
    for (let i = 1; i < 6; i++) L(c, x + w * i / 6, y, x + w * 0.5, y - h, 'rgba(90,30,15,0.35)', 0.8);
  };
  const person = (c, x, g, s, col) => { const h = s * 0.5; R(c, x - h * 0.12, g - h * 0.75, h * 0.24, h * 0.5, col); O(c, x, g - h * 0.88, h * 0.13, '#c99062'); L(c, x - h * 0.06, g - h * 0.27, x - h * 0.08, g, '#222', 1); L(c, x + h * 0.06, g - h * 0.27, x + h * 0.08, g, '#222', 1); };

  Object.assign(CityArt.B, {
    // ── COLOMBIA ──
    co_cartagena: { w: 4.6, h: 4.6, d(c, x, g, s, t, r) {
      const W = 4.6 * s, wall = '#c9a46a', wallD = '#a8854f';
      // casas de colores tras la muralla
      const cols = ['#f2c14e', '#e4572e', '#3fa7d6', '#9bc53d', '#f4a1c1', '#ffffff'];
      for (let i = 0; i < 6; i++) {
        const hx = x + i * 0.75 * s, hh = (1.9 + (i % 3) * 0.35) * s;
        R(c, hx, g - 1.1 * s - hh, 0.75 * s, hh, cols[i]);
        R(c, hx - 0.03 * s, g - 1.1 * s - hh - 0.12 * s, 0.81 * s, 0.12 * s, '#b5502f');
        R(c, hx + 0.2 * s, g - 1.1 * s - hh + 0.25 * s, 0.32 * s, 0.45 * s, win(r));
        balcony(c, hx + 0.08 * s, g - 1.1 * s - hh + 0.75 * s, 0.6 * s, s, '#5a3a24');
        if (i % 2) { O(c, hx + 0.38 * s, g - 1.1 * s - hh + 0.75 * s, s * 0.12, '#d6336c'); O(c, hx + 0.52 * s, g - 1.1 * s - hh + 0.7 * s, s * 0.1, '#e64980'); }
      }
      // Torre del Reloj
      const tx = x + 1.95 * s;
      R(c, tx, g - 4.0 * s, 0.75 * s, 4.0 * s, '#f3e7c9'); side(c, tx, g - 4.0 * s, 0.75 * s, 4.0 * s, 0.15);
      R(c, tx - 0.08 * s, g - 3.05 * s, 0.91 * s, 0.1 * s, '#d6c49b');
      O(c, tx + 0.375 * s, g - 3.45 * s, 0.24 * s, '#fffaf0'); O(c, tx + 0.375 * s, g - 3.45 * s, 0.24 * s * 0.15, '#222');
      const ang = (t / 60) * Math.PI * 2; L(c, tx + 0.375 * s, g - 3.45 * s, tx + 0.375 * s + Math.sin(ang) * 0.17 * s, g - 3.45 * s - Math.cos(ang) * 0.17 * s, '#222', 1);
      R(c, tx + 0.15 * s, g - 4.5 * s, 0.45 * s, 0.5 * s, '#f3e7c9'); A(c, tx + 0.25 * s, g - 4.05 * s, 0.25 * s, 0.35 * s, '#7a5a3a');
      c.fillStyle = '#e8d9b5'; c.beginPath(); c.ellipse(tx + 0.375 * s, g - 4.5 * s, 0.25 * s, 0.22 * s, 0, Math.PI, 0); c.fill();
      // muralla
      R(c, x, g - 1.1 * s, W, 1.1 * s, wall); crenel(c, x, g - 1.1 * s, W, s, wall);
      for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) R(c, x + i * W / 12 + (j % 2) * W / 24, g - (0.3 + j * 0.3) * s, W / 12 - 1, 1, wallD);
      A(c, tx + 0.12 * s, g, 0.5 * s, 0.8 * s, '#3a2a1a'); A(c, tx + 0.18 * s, g, 0.38 * s, 0.68 * s, K.litW);
      // garita
      const gx = x + 4.0 * s; R(c, gx, g - 1.55 * s, 0.4 * s, 0.45 * s, wall); c.fillStyle = wallD; c.beginPath(); c.ellipse(gx + 0.2 * s, g - 1.55 * s, 0.24 * s, 0.22 * s, 0, Math.PI, 0); c.fill(); R(c, gx + 0.13 * s, g - 1.45 * s, 0.14 * s, 0.22 * s, '#3a2a1a');
    } },
    co_monserrate: { w: 4.2, h: 6.2, d(c, x, g, s, t, r) {
      const W = 4.2 * s, peakX = x + 2.6 * s, peakY = g - 5.0 * s;
      // cerro verde
      c.fillStyle = '#2f6b3c'; c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(x + 1.2 * s, g - 1.5 * s, x + 2.0 * s, g - 4.3 * s); c.lineTo(peakX - 0.5 * s, peakY); c.lineTo(peakX + 0.6 * s, peakY); c.quadraticCurveTo(x + 3.6 * s, g - 3.2 * s, x + W, g); c.closePath(); c.fill();
      c.fillStyle = '#245633'; c.beginPath(); c.moveTo(peakX + 0.6 * s, peakY); c.quadraticCurveTo(x + 3.6 * s, g - 3.2 * s, x + W, g); c.lineTo(x + 3.0 * s, g); c.quadraticCurveTo(x + 3.2 * s, g - 2.5 * s, peakX + 0.2 * s, peakY); c.closePath(); c.fill();
      const rs = CityArt.H.seeded(77); for (let i = 0; i < 26; i++) { const u = rs(), v = rs(); const tx = x + 0.3 * s + u * 3.6 * s, ty = g - v * 3.6 * s; if (ty > g - (1 - Math.abs(u - 0.6)) * 4.5 * s) O(c, tx, ty, s * 0.13, i % 3 ? '#3b8048' : '#4f9a5a'); }
      // santuario blanco
      const cx = peakX;
      R(c, cx - 0.6 * s, peakY - 0.55 * s, 1.2 * s, 0.6 * s, K.white); side(c, cx - 0.6 * s, peakY - 0.55 * s, 1.2 * s, 0.6 * s, 0.12);
      P(c, [cx - 0.68 * s, peakY - 0.55 * s, cx, peakY - 0.85 * s, cx + 0.68 * s, peakY - 0.55 * s], '#c4523a');
      for (const dx of [-0.45, 0.45]) { R(c, cx + dx * s - 0.13 * s, peakY - 1.25 * s, 0.26 * s, 0.75 * s, K.white); P(c, [cx + dx * s - 0.15 * s, peakY - 1.25 * s, cx + dx * s, peakY - 1.5 * s, cx + dx * s + 0.15 * s, peakY - 1.25 * s], '#c4523a'); R(c, cx + dx * s - 0.05 * s, peakY - 1.1 * s, 0.1 * s, 0.18 * s, win(r, 0.9)); }
      A(c, cx - 0.14 * s, peakY + 0.05 * s, 0.28 * s, 0.38 * s, K.lit);
      L(c, cx, peakY - 0.85 * s, cx, peakY - 1.0 * s, K.gold, 1); L(c, cx - 0.06 * s, peakY - 0.95 * s, cx + 0.06 * s, peakY - 0.95 * s, K.gold, 1);
      // teleférico
      const bx = x + 0.15 * s, by = g - 0.35 * s, ex = cx - 0.7 * s, ey = peakY - 0.1 * s;
      L(c, bx, by, ex, ey, '#d9dde5', 1); R(c, bx - 0.12 * s, by - 0.05 * s, 0.35 * s, 0.4 * s, '#8c8f96');
      const u = (Math.sin(t * 0.35) + 1) / 2, kx = bx + (ex - bx) * u, ky = by + (ey - by) * u;
      L(c, kx, ky, kx, ky + 0.2 * s, '#444', 1); R(c, kx - 0.17 * s, ky + 0.2 * s, 0.34 * s, 0.24 * s, '#e03131'); R(c, kx - 0.12 * s, ky + 0.25 * s, 0.24 * s, 0.1 * s, 'rgba(200,230,255,0.9)');
    } },
    co_penol: { w: 3.2, h: 5.2, d(c, x, g, s, t) {
      const W = 3.2 * s, cx = x + 1.6 * s;
      water(c, x, g - 0.55 * s, W, 0.55 * s, t);
      for (const [ix, iw] of [[0.1, 0.6], [2.5, 0.6]]) { E(c, x + (ix + iw / 2) * s, g - 0.55 * s, iw / 2 * s, 0.15 * s, '#3f7d3a'); O(c, x + (ix + iw / 2) * s, g - 0.75 * s, 0.18 * s, '#356f43'); }
      // roca
      const rock = c.createLinearGradient(cx - 0.9 * s, 0, cx + 0.9 * s, 0); rock.addColorStop(0, '#9a9a96'); rock.addColorStop(0.55, '#c9c8c2'); rock.addColorStop(1, '#7c7b77');
      c.fillStyle = rock; c.beginPath(); c.moveTo(cx - 0.85 * s, g - 0.55 * s); c.bezierCurveTo(cx - 1.05 * s, g - 2.5 * s, cx - 0.9 * s, g - 4.6 * s, cx - 0.1 * s, g - 4.8 * s); c.bezierCurveTo(cx + 0.8 * s, g - 4.75 * s, cx + 1.0 * s, g - 2.6 * s, cx + 0.85 * s, g - 0.55 * s); c.closePath(); c.fill();
      // grieta y escalera en zigzag (la grieta es real en la roca)
      L(c, cx + 0.15 * s, g - 4.7 * s, cx + 0.25 * s, g - 0.6 * s, '#6c6b67', Math.max(1, s * 0.06));
      c.strokeStyle = '#f4f0e7'; c.lineWidth = Math.max(1, s * 0.06); c.beginPath(); c.moveTo(cx + 0.25 * s, g - 0.6 * s);
      for (let k = 0; k < 14; k++) { const y = g - 0.6 * s - (k + 1) * 0.28 * s; c.lineTo(cx + 0.25 * s + (k % 2 ? 0.16 : -0.16) * s, y); }
      c.stroke();
      // letras pintadas "GI" del intento histórico
      c.fillStyle = 'rgba(255,255,255,0.75)'; c.font = `bold ${Math.max(6, s * 0.55)}px sans-serif`; c.fillText('G', cx - 0.75 * s, g - 2.5 * s); c.fillText('I', cx - 0.38 * s, g - 2.5 * s);
      // mirador arriba
      R(c, cx - 0.35 * s, g - 5.05 * s, 0.7 * s, 0.28 * s, '#e8e0cf'); R(c, cx - 0.4 * s, g - 5.12 * s, 0.8 * s, 0.08 * s, '#b5502f'); R(c, cx - 0.25 * s, g - 4.98 * s, 0.15 * s, 0.15 * s, K.lit); R(c, cx + 0.08 * s, g - 4.98 * s, 0.15 * s, 0.15 * s, K.lit);
      L(c, cx, g - 5.12 * s, cx, g - 5.45 * s, '#ccc', 1); P(c, [cx, g - 5.45 * s, cx + 0.32 * s, g - 5.37 * s, cx, g - 5.29 * s], '#fcd116');
    } },
    co_cafetal: { w: 4.0, h: 4.6, d(c, x, g, s, t, r) {
      const W = 4.0 * s;
      c.fillStyle = '#4c8b3a'; c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(x + 1.2 * s, g - 2.2 * s, x + 2.4 * s, g - 1.6 * s); c.quadraticCurveTo(x + 3.4 * s, g - 1.1 * s, x + W, g - 1.5 * s); c.lineTo(x + W, g); c.closePath(); c.fill();
      c.fillStyle = '#3d7530'; c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(x + 2 * s, g - 1.0 * s, x + W, g - 0.4 * s); c.lineTo(x + W, g); c.closePath(); c.fill();
      // hileras de cafetos con granos rojos
      for (let j = 0; j < 3; j++) for (let i = 0; i < 9; i++) {
        const u = (i + 0.5) / 9, bx = x + u * W, hill = j === 0 ? 0.15 + 0.55 * Math.sin(Math.PI * u) : j === 1 ? 0.6 + 0.9 * Math.sin(Math.PI * Math.min(1, u * 1.2)) : 1.0 + 0.6 * Math.sin(Math.PI * u * 0.9);
        const by = g - hill * s * 0.9 - j * 0.1 * s;
        O(c, bx, by, s * (0.2 - j * 0.03), j % 2 ? '#2e6b2a' : '#356f2f');
        if ((i + j) % 2 === 0) { O(c, bx - s * 0.06, by + s * 0.02, s * 0.045, '#d7263d'); O(c, bx + s * 0.05, by - s * 0.04, s * 0.045, '#b5172d'); }
      }
      // palmas de cera
      waxPalm(c, x + 0.45 * s, g - 0.4 * s, 4.1 * s, s); waxPalm(c, x + 3.6 * s, g - 1.1 * s, 3.4 * s, s); waxPalm(c, x + 3.2 * s, g - 1.2 * s, 2.9 * s, s);
      // finca cafetera
      const fx = x + 1.8 * s, fy = g - 1.45 * s;
      R(c, fx, fy - 0.8 * s, 1.1 * s, 0.8 * s, K.white); R(c, fx - 0.05 * s, fy - 0.08 * s, 1.2 * s, 0.08 * s, '#2a7f3e');
      roofTiles(c, fx, fy - 0.8 * s, 1.1 * s, 0.4 * s, s);
      R(c, fx + 0.15 * s, fy - 0.6 * s, 0.25 * s, 0.3 * s, '#1f7a3e'); R(c, fx + 0.7 * s, fy - 0.6 * s, 0.25 * s, 0.3 * s, win(r, 0.8)); R(c, fx + 0.45 * s, fy - 0.45 * s, 0.2 * s, 0.37 * s, '#7a2e1d');
      smoke(c, fx + 0.9 * s, fy - 1.15 * s, s * 0.7, t);
      // costal de café
      E(c, x + 1.4 * s, g - 0.95 * s, 0.17 * s, 0.22 * s, '#b08a58'); R(c, x + 1.33 * s, g - 1.0 * s, 0.14 * s, 0.05 * s, '#6b4a30');
    } },
    co_colonial: { w: 3.4, h: 3.6, d(c, x, g, s, t, r) {
      const cols = [['#f2c14e', '#2a7f3e'], ['#3f8ed8', '#7a2e1d'], ['#e4572e', '#1f5f8b']];
      for (let i = 0; i < 3; i++) {
        const hx = x + i * 1.12 * s, hw = 1.12 * s, hh = (2.5 + (i === 1 ? 0.4 : 0)) * s, [wall, trim] = cols[i];
        R(c, hx, g - hh, hw, hh, wall); R(c, hx, g - 0.35 * s, hw, 0.35 * s, '#f4f0e7'); // zócalo blanco
        roofTiles(c, hx, g - hh, hw, 0.45 * s, s);
        // balcón de madera
        R(c, hx + 0.08 * s, g - hh + 0.35 * s, hw - 0.16 * s, 0.6 * s, win(r, 0.55));
        R(c, hx + 0.02 * s, g - hh + 0.98 * s, hw - 0.04 * s, 0.08 * s, trim);
        for (let k = 0; k <= 6; k++) L(c, hx + 0.04 * s + k * (hw - 0.08 * s) / 6, g - hh + 0.98 * s, hx + 0.04 * s + k * (hw - 0.08 * s) / 6, g - hh + 1.28 * s, trim, Math.max(1, s * 0.05));
        R(c, hx + 0.02 * s, g - hh + 1.28 * s, hw - 0.04 * s, 0.07 * s, trim);
        L(c, hx + 0.1 * s, g - hh + 1.35 * s, hx + 0.25 * s, g - hh + 1.6 * s, trim, Math.max(1, s * 0.05)); L(c, hx + hw - 0.1 * s, g - hh + 1.35 * s, hx + hw - 0.25 * s, g - hh + 1.6 * s, trim, Math.max(1, s * 0.05));
        // puerta y ventana con reja
        R(c, hx + 0.12 * s, g - 1.25 * s, 0.38 * s, 0.9 * s, trim); R(c, hx + 0.15 * s, g - 1.22 * s, 0.32 * s, 0.84 * s, '#5a3a24');
        R(c, hx + 0.62 * s, g - 1.15 * s, 0.38 * s, 0.5 * s, win(r)); for (let k = 0; k < 4; k++) L(c, hx + 0.66 * s + k * 0.1 * s, g - 1.15 * s, hx + 0.66 * s + k * 0.1 * s, g - 0.65 * s, '#222', 0.8);
        O(c, hx + 0.3 * s, g - hh + 0.98 * s, s * 0.08, '#e64980'); O(c, hx + 0.75 * s, g - hh + 0.96 * s, s * 0.08, '#ff6f61');
      }
      // farol
      L(c, x + 3.4 * s, g - 1.9 * s, x + 3.6 * s, g - 1.9 * s, '#222', 1); R(c, x + 3.52 * s, g - 1.9 * s, 0.14 * s, 0.22 * s, `rgba(255,210,122,${0.8 + 0.2 * Math.sin(t * 3)})`);
    } },

    // ── MÉXICO ──
    mx_teotihuacan: { w: 4.6, h: 3.6, d(c, x, g, s) {
      const W = 4.6 * s, st = '#b99a72', stD = '#8f7553', stL = '#cdb08a';
      const tiers = [[0, 4.6, 0.9], [0.5, 3.6, 0.85], [0.95, 2.7, 0.8], [1.35, 1.9, 0.7]];
      let y = g;
      tiers.forEach(([ox, tw, th]) => {
        P(c, [x + ox * s, y, x + (ox + 0.25) * s, y - th * s, x + (ox + tw - 0.25) * s, y - th * s, x + (ox + tw) * s, y], st);
        P(c, [x + (ox + tw * 0.6) * s, y, x + (ox + tw * 0.6) * s, y - th * s, x + (ox + tw - 0.25) * s, y - th * s, x + (ox + tw) * s, y], stD);
        R(c, x + (ox + 0.25) * s, y - th * s, (tw - 0.5) * s, 0.06 * s, stL);
        y -= th * s;
      });
      R(c, x + 1.85 * s, y - 0.3 * s, 0.9 * s, 0.3 * s, stD); R(c, x + 1.95 * s, y - 0.25 * s, 0.25 * s, 0.25 * s, '#3a2c1d');
      // escalinata central
      const sx = x + 1.95 * s, sw = 0.7 * s;
      P(c, [sx - 0.5 * s, g, sx, y, sx + sw, y, sx + sw + 0.5 * s, g], '#a88a63');
      for (let k = 1; k < 20; k++) { const v = k / 20, yy = g - (g - y) * v; L(c, sx - 0.5 * s * (1 - v), yy, sx + sw + 0.5 * s * (1 - v), yy, stD, 0.8); }
    } },
    mx_chichen: { w: 4.2, h: 3.9, d(c, x, g, s) {
      const W = 4.2 * s, st = '#c6b089', stD = '#9c8761', stL = '#ddc9a2';
      for (let k = 0; k < 9; k++) { const inset = k * 0.19 * s, th = 0.32 * s, y = g - k * th; R(c, x + inset, y - th, W - inset * 2, th, k % 2 ? st : stL); R(c, x + W - inset - (W - inset * 2) * 0.3, y - th, (W - inset * 2) * 0.3, th, stD); L(c, x + inset, y, x + W - inset, y, stD, 0.7); }
      const topY = g - 9 * 0.32 * s;
      // escalinata con serpiente Kukulkán
      const sx = x + 1.65 * s, sw = 0.9 * s;
      R(c, sx, topY, sw, g - topY, '#b39c75');
      for (let k = 0; k < 18; k++) L(c, sx, topY + k * (g - topY) / 18, sx + sw, topY + k * (g - topY) / 18, stD, 0.7);
      R(c, sx - 0.08 * s, topY, 0.08 * s, g - topY, '#8a7552'); R(c, sx + sw, topY, 0.08 * s, g - topY, '#8a7552');
      E(c, sx - 0.05 * s, g - 0.12 * s, 0.22 * s, 0.14 * s, '#7a6646'); E(c, sx + sw + 0.05 * s, g - 0.12 * s, 0.22 * s, 0.14 * s, '#7a6646');
      // templo superior
      R(c, x + 1.5 * s, topY - 0.85 * s, 1.2 * s, 0.85 * s, stL); R(c, x + 2.25 * s, topY - 0.85 * s, 0.45 * s, 0.85 * s, stD);
      R(c, x + 1.45 * s, topY - 0.95 * s, 1.3 * s, 0.12 * s, st);
      for (let i = 0; i < 3; i++) R(c, x + 1.62 * s + i * 0.35 * s, topY - 0.6 * s, 0.2 * s, 0.6 * s, '#3a2c1d');
    } },
    mx_bellasartes: { w: 4.6, h: 4.6, d(c, x, g, s, t, r) {
      const W = 4.6 * s, mar = '#efe7d6', marD = '#cfc3a9', cx = x + W / 2;
      R(c, x, g - 2.4 * s, W, 2.4 * s, mar); side(c, x, g - 2.4 * s, W, 2.4 * s, 0.12);
      R(c, x - 0.05 * s, g - 2.55 * s, W + 0.1 * s, 0.15 * s, marD);
      for (let i = 0; i < 5; i++) A(c, x + 0.25 * s + i * 0.85 * s, g - 0.25 * s, 0.5 * s, 1.5 * s, i === 2 ? K.litW : win(r, 0.6));
      columns(c, x + 0.1 * s, g - 0.25 * s, W - 0.2 * s, 1.8 * s, 10, '#f6f0e2', marD);
      R(c, x, g - 0.25 * s, W, 0.25 * s, marD);
      // cúpula naranja y dorada
      R(c, cx - 1.0 * s, g - 3.0 * s, 2.0 * s, 0.5 * s, mar);
      const dome = c.createLinearGradient(cx - 1.1 * s, 0, cx + 1.1 * s, 0); dome.addColorStop(0, '#f08c2e'); dome.addColorStop(0.45, '#f6b24a'); dome.addColorStop(1, '#c4621c');
      c.fillStyle = dome; c.beginPath(); c.moveTo(cx - 1.05 * s, g - 3.0 * s); c.quadraticCurveTo(cx - 1.05 * s, g - 4.1 * s, cx, g - 4.25 * s); c.quadraticCurveTo(cx + 1.05 * s, g - 4.1 * s, cx + 1.05 * s, g - 3.0 * s); c.closePath(); c.fill();
      for (let k = -3; k <= 3; k++) L(c, cx + k * 0.3 * s, g - 3.0 * s, cx + k * 0.06 * s, g - 4.2 * s, '#d4a017', 1);
      R(c, cx - 0.12 * s, g - 4.5 * s, 0.24 * s, 0.28 * s, K.gold); O(c, cx, g - 4.55 * s, 0.1 * s, K.gold);
      for (const dx of [-1.9, 1.9]) { const px = cx + dx * s; R(c, px - 0.3 * s, g - 2.9 * s, 0.6 * s, 0.35 * s, mar); c.fillStyle = '#f0a03a'; c.beginPath(); c.ellipse(px, g - 2.9 * s, 0.32 * s, 0.35 * s, 0, Math.PI, 0); c.fill(); }
    } },
    mx_hacienda: { w: 4.4, h: 3.4, d(c, x, g, s, t, r) {
      const W = 4.4 * s, wall = '#e6a86a', wallD = '#c98a4e';
      R(c, x, g - 1.9 * s, W, 1.9 * s, wall); side(c, x, g - 1.9 * s, W, 1.9 * s, 0.13);
      roofTiles(c, x, g - 1.9 * s, W, 0.45 * s, s);
      for (let i = 0; i < 6; i++) A(c, x + 0.15 * s + i * 0.72 * s, g, 0.48 * s, 1.15 * s, i === 3 ? K.litW : '#6b3f1c');
      R(c, x, g - 1.25 * s, W, 0.07 * s, wallD);
      for (let i = 0; i < 6; i++) R(c, x + 0.3 * s + i * 0.72 * s, g - 1.75 * s, 0.22 * s, 0.32 * s, win(r));
      // espadaña con campana
      const bx = x + 3.0 * s; P(c, [bx, g - 2.3 * s, bx, g - 3.1 * s, bx + 0.45 * s, g - 3.4 * s, bx + 0.9 * s, g - 3.1 * s, bx + 0.9 * s, g - 2.3 * s], '#f0f0e8');
      A(c, bx + 0.28 * s, g - 2.55 * s, 0.34 * s, 0.5 * s, '#3a2516'); O(c, bx + 0.45 * s, g - 2.85 * s, 0.1 * s, K.gold);
      // agaves y nopal
      for (const ax of [0.2, 4.15]) for (let k = -2; k <= 2; k++) P(c, [x + ax * s - 0.04 * s, g, x + ax * s + k * 0.12 * s, g - 0.55 * s + Math.abs(k) * 0.12 * s, x + ax * s + 0.04 * s, g], '#5d8f6a');
    } },
    mx_mariachi: { w: 3.4, h: 3.6, d(c, x, g, s, t, r) {
      const W = 3.4 * s;
      // kiosco
      const kx = x + 1.7 * s;
      R(c, kx - 1.0 * s, g - 0.25 * s, 2.0 * s, 0.25 * s, '#cfc6b3');
      for (let i = 0; i < 6; i++) L(c, kx - 0.9 * s + i * 0.36 * s, g - 0.25 * s, kx - 0.9 * s + i * 0.36 * s, g - 1.9 * s, '#2e8b57', Math.max(1, s * 0.07));
      c.fillStyle = '#2e8b57'; c.beginPath(); c.moveTo(kx - 1.15 * s, g - 1.9 * s); c.quadraticCurveTo(kx, g - 3.1 * s, kx + 1.15 * s, g - 1.9 * s); c.closePath(); c.fill();
      O(c, kx, g - 2.6 * s, 0.1 * s, K.gold);
      // papel picado
      const cols = ['#e03131', '#f59f00', '#37b24d', '#1c7ed6', '#d6336c', '#7048e8'];
      L(c, x, g - 2.2 * s, x + W, g - 2.2 * s, '#555', 0.7);
      for (let i = 0; i < 10; i++) { const fx = x + 0.1 * s + i * 0.33 * s, sway = Math.sin(t * 2 + i) * 0.03 * s; P(c, [fx, g - 2.2 * s, fx + 0.26 * s, g - 2.2 * s, fx + 0.26 * s + sway, g - 1.95 * s, fx + 0.13 * s + sway, g - 1.85 * s, fx + sway, g - 1.95 * s], cols[i % 6]); }
      // mariachis con sombrero
      for (let k = 0; k < 3; k++) {
        const px = kx - 0.5 * s + k * 0.5 * s, ph = 0.9 * s, py = g - 0.25 * s;
        R(c, px - 0.1 * s, py - ph * 0.65, 0.2 * s, ph * 0.45, '#1a1a1a'); for (let b = 0; b < 3; b++) O(c, px - 0.07 * s, py - ph * 0.6 + b * 0.1 * s, s * 0.02, K.gold);
        L(c, px - 0.05 * s, py - ph * 0.2, px - 0.06 * s, py, '#1a1a1a', Math.max(1, s * 0.06)); L(c, px + 0.05 * s, py - ph * 0.2, px + 0.06 * s, py, '#1a1a1a', Math.max(1, s * 0.06));
        O(c, px, py - ph * 0.75, 0.09 * s, '#c99062');
        E(c, px, py - ph * 0.83, 0.25 * s, 0.06 * s, '#d9b45a'); E(c, px, py - ph * 0.9, 0.1 * s, 0.1 * s, '#d9b45a');
        if (k === 1) { O(c, px + 0.18 * s, py - ph * 0.45, 0.12 * s, '#b5651d'); L(c, px + 0.18 * s, py - ph * 0.45, px + 0.4 * s, py - ph * 0.8, '#6b4a30', 1); }
        if (k === 2) L(c, px + 0.12 * s, py - ph * 0.55, px + 0.35 * s, py - ph * 0.6 + Math.sin(t * 6) * 0.03 * s, '#c9a227', Math.max(1, s * 0.05));
      }
    } },

    // ── PERÚ ──
    pe_machupicchu: { w: 4.8, h: 5.4, d(c, x, g, s, t, r) {
      const W = 4.8 * s;
      // Huayna Picchu detrás
      c.fillStyle = '#2f5d3a'; c.beginPath(); c.moveTo(x + 1.8 * s, g - 1.2 * s); c.quadraticCurveTo(x + 2.9 * s, g - 5.6 * s, x + 3.4 * s, g - 5.3 * s); c.quadraticCurveTo(x + 4.2 * s, g - 3.2 * s, x + W, g - 1.4 * s); c.lineTo(x + W, g); c.lineTo(x + 1.8 * s, g); c.closePath(); c.fill();
      c.fillStyle = '#244a2e'; c.beginPath(); c.moveTo(x + 3.4 * s, g - 5.3 * s); c.quadraticCurveTo(x + 4.2 * s, g - 3.2 * s, x + W, g - 1.4 * s); c.lineTo(x + W, g); c.lineTo(x + 3.6 * s, g); c.closePath(); c.fill();
      E(c, x + 2.75 * s, g - 4.3 * s, 0.55 * s, 0.12 * s, 'rgba(235,240,250,0.35)'); E(c, x + 3.5 * s, g - 3.6 * s, 0.45 * s, 0.1 * s, 'rgba(235,240,250,0.25)');
      // ladera con terrazas
      c.fillStyle = '#5b8f4a'; c.beginPath(); c.moveTo(x, g); c.lineTo(x, g - 1.6 * s); c.quadraticCurveTo(x + 2 * s, g - 2.0 * s, x + 3.6 * s, g - 1.5 * s); c.lineTo(x + W, g - 0.6 * s); c.lineTo(x + W, g); c.closePath(); c.fill();
      for (let k = 0; k < 5; k++) L(c, x, g - 0.3 * s - k * 0.27 * s, x + (3.6 + k * 0.1) * s - k * 0.5 * s, g - 0.25 * s - k * 0.27 * s, '#8aa36b', Math.max(1, s * 0.05));
      // ciudadela de piedra
      const huts = [[0.3, 0.7], [1.1, 0.6], [1.8, 0.75], [2.6, 0.55]];
      huts.forEach(([hx, hw], i) => {
        const bx = x + hx * s, by = g - 1.65 * s - (i % 2) * 0.12 * s, hh = 0.5 * s;
        R(c, bx, by - hh, hw * s, hh, '#a7a398'); R(c, bx + hw * s * 0.7, by - hh, hw * s * 0.3, hh, '#8a877e');
        P(c, [bx - 0.05 * s, by - hh, bx + hw * s / 2, by - hh - 0.45 * s, bx + hw * s + 0.05 * s, by - hh], i % 2 ? '#8a6f3c' : '#9c7f45');
        P(c, [bx + hw * s * 0.35, by, bx + hw * s * 0.4, by - hh * 0.7, bx + hw * s * 0.6, by - hh * 0.7, bx + hw * s * 0.65, by], '#3a3328');
      });
      for (let k = 0; k < 12; k++) R(c, x + (0.2 + k * 0.28) * s, g - 1.75 * s + (k % 3) * 0.04 * s, 0.22 * s, 0.1 * s, '#b3afa3');
      // llama
      const lx = x + 0.6 * s + Math.sin(t * 0.3) * 0.1 * s, ly = g - 0.5 * s;
      E(c, lx, ly, 0.22 * s, 0.12 * s, '#f1e9da'); R(c, lx + 0.12 * s, ly - 0.35 * s, 0.07 * s, 0.32 * s, '#f1e9da'); E(c, lx + 0.18 * s, ly - 0.36 * s, 0.09 * s, 0.05 * s, '#f1e9da');
      for (const dx of [-0.14, -0.05, 0.06, 0.15]) L(c, lx + dx * s, ly + 0.08 * s, lx + dx * s, ly + 0.28 * s, '#d8cdb8', 1);
    } },
    pe_cusco: { w: 4.0, h: 5.0, d(c, x, g, s, t, r) {
      const W = 4.0 * s, st = '#a67b5b', stD = '#7f5c42', stL = '#c0947a';
      R(c, x + 0.8 * s, g - 2.6 * s, 2.4 * s, 2.6 * s, st); side(c, x + 0.8 * s, g - 2.6 * s, 2.4 * s, 2.6 * s, 0.12);
      pediment(c, x + 1.4 * s, g - 2.6 * s, 1.2 * s, 0.45 * s, stL, st);
      A(c, x + 1.65 * s, g, 0.7 * s, 1.6 * s, '#3a2516'); A(c, x + 1.75 * s, g, 0.5 * s, 1.35 * s, K.litW);
      for (const dx of [1.05, 2.65]) A(c, x + dx * s, g - 1.5 * s, 0.3 * s, 0.6 * s, win(r));
      columns(c, x + 0.9 * s, g - 0.1 * s, 0.7 * s, 2.3 * s, 2, stL, stD); columns(c, x + 2.4 * s, g - 0.1 * s, 0.7 * s, 2.3 * s, 2, stL, stD);
      for (const tx of [0, 3.2]) {
        const bx = x + tx * s;
        R(c, bx, g - 3.4 * s, 0.8 * s, 3.4 * s, st); R(c, bx + 0.6 * s, g - 3.4 * s, 0.2 * s, 3.4 * s, stD);
        R(c, bx - 0.05 * s, g - 3.5 * s, 0.9 * s, 0.1 * s, stL);
        R(c, bx + 0.1 * s, g - 4.3 * s, 0.6 * s, 0.8 * s, stL); A(c, bx + 0.22 * s, g - 3.6 * s, 0.36 * s, 0.6 * s, '#3a2516'); O(c, bx + 0.4 * s, g - 3.82 * s, 0.09 * s, K.gold);
        c.fillStyle = stD; c.beginPath(); c.ellipse(bx + 0.4 * s, g - 4.3 * s, 0.32 * s, 0.35 * s, 0, Math.PI, 0); c.fill();
        L(c, bx + 0.4 * s, g - 4.65 * s, bx + 0.4 * s, g - 4.95 * s, K.gold, 1); L(c, bx + 0.32 * s, g - 4.85 * s, bx + 0.48 * s, g - 4.85 * s, K.gold, 1);
        R(c, bx + 0.25 * s, g - 2.6 * s, 0.3 * s, 0.4 * s, win(r));
      }
      R(c, x, g - 0.1 * s, W, 0.1 * s, stD);
    } },
    pe_terraces: { w: 4.4, h: 3.4, d(c, x, g, s, t) {
      const W = 4.4 * s;
      // terrazas en anfiteatro (Moray)
      for (let k = 0; k < 7; k++) {
        const inset = k * 0.28 * s, y = g - k * 0.42 * s, h = 0.42 * s;
        R(c, x + inset, y - h, W - inset * 2, h, k % 2 ? '#6fa14f' : '#82b35d');
        R(c, x + inset, y - 0.08 * s, W - inset * 2, 0.08 * s, '#8a7a60');
        for (let i = 0; i < (W - inset * 2) / (0.25 * s); i++) R(c, x + inset + i * 0.25 * s, y - 0.08 * s, 1, 0.08 * s, '#6b5d48');
      }
      // escalera de piedra lateral
      for (let k = 0; k < 7; k++) R(c, x + (0.1 + k * 0.28) * s, g - (k + 1) * 0.42 * s, 0.22 * s, 0.1 * s, '#a7a398');
      // agricultor y nevado al fondo
      P(c, [x + 2.6 * s, g - 2.94 * s, x + 3.3 * s, g - 3.4 * s, x + 4.0 * s, g - 2.94 * s], '#e8eef5');
      const px = x + 2.0 * s, py = g - 2.94 * s; R(c, px - 0.06 * s, py - 0.32 * s, 0.12 * s, 0.22 * s, '#c92a2a'); O(c, px, py - 0.38 * s, 0.06 * s, '#a0714c'); E(c, px, py - 0.43 * s, 0.11 * s, 0.03 * s, '#3b2a1a');
    } },
    pe_titicaca: { w: 4.0, h: 3.2, d(c, x, g, s, t) {
      const W = 4.0 * s;
      water(c, x, g - 0.8 * s, W, 0.8 * s, t);
      // isla flotante de totora
      E(c, x + 1.3 * s, g - 0.75 * s, 1.15 * s, 0.17 * s, '#d9b85c'); E(c, x + 1.3 * s, g - 0.8 * s, 1.0 * s, 0.1 * s, '#e6c86f');
      for (const [hx, hw] of [[0.5, 0.65], [1.4, 0.55]]) { const bx = x + hx * s, by = g - 0.85 * s; P(c, [bx, by, bx, by - 0.45 * s, bx + hw * s / 2, by - 0.8 * s, bx + hw * s, by - 0.45 * s, bx + hw * s, by], '#d4b25a'); for (let k = 1; k < 5; k++) L(c, bx + hw * s * k / 5, by, bx + hw * s * k / 5, by - 0.45 * s, '#b8963f', 0.7); R(c, bx + hw * s * 0.38, by - 0.32 * s, hw * s * 0.24, 0.32 * s, '#5a3e1c'); }
      // barca de totora con cabeza de puma
      const bob = Math.sin(t * 1.1) * 0.05 * s, bx = x + 2.4 * s, by = g - 0.45 * s + bob;
      c.fillStyle = '#d8b04f'; c.beginPath(); c.moveTo(bx, by - 0.15 * s); c.quadraticCurveTo(bx + 0.7 * s, by + 0.3 * s, bx + 1.4 * s, by - 0.15 * s); c.lineTo(bx + 1.45 * s, by - 0.55 * s); c.lineTo(bx + 1.3 * s, by - 0.25 * s); c.quadraticCurveTo(bx + 0.7 * s, by + 0.05 * s, bx + 0.15 * s, by - 0.25 * s); c.lineTo(bx - 0.05 * s, by - 0.55 * s); c.closePath(); c.fill();
      O(c, bx + 1.45 * s, by - 0.62 * s, 0.1 * s, '#c79a3a'); O(c, bx + 1.49 * s, by - 0.64 * s, 0.025 * s, '#222');
      for (let k = 1; k < 6; k++) L(c, bx + 0.2 * s * k + 0.05 * s, by - 0.2 * s, bx + 0.2 * s * k, by, '#b38a35', 0.7);
      // montañas al fondo y sol andino
      P(c, [x + 2.0 * s, g - 0.8 * s, x + 2.9 * s, g - 2.2 * s, x + 3.8 * s, g - 0.8 * s], '#5a6a86'); P(c, [x + 2.65 * s, g - 1.8 * s, x + 2.9 * s, g - 2.2 * s, x + 3.15 * s, g - 1.8 * s], '#e8eef5');
      // persona con pollera
      const px = x + 1.0 * s, py = g - 0.88 * s; P(c, [px - 0.15 * s, py, px - 0.06 * s, py - 0.3 * s, px + 0.06 * s, py - 0.3 * s, px + 0.15 * s, py], '#d6336c'); R(c, px - 0.06 * s, py - 0.45 * s, 0.12 * s, 0.16 * s, '#1c7ed6'); O(c, px, py - 0.52 * s, 0.06 * s, '#a0714c'); R(c, px - 0.07 * s, py - 0.65 * s, 0.14 * s, 0.08 * s, '#3b2a1a');
    } },
    pe_llamas: { w: 3.6, h: 3.0, d(c, x, g, s, t) {
      const W = 3.6 * s;
      // corral de piedra y casa con techo de paja
      R(c, x + 0.1 * s, g - 1.6 * s, 1.3 * s, 0.9 * s, '#a7a398'); R(c, x + 1.0 * s, g - 1.6 * s, 0.4 * s, 0.9 * s, '#8a877e');
      P(c, [x, g - 1.6 * s, x + 0.75 * s, g - 2.3 * s, x + 1.5 * s, g - 1.6 * s], '#c9a64e'); for (let k = 1; k < 6; k++) L(c, x + 0.25 * k * s, g - 1.6 * s, x + 0.75 * s, g - 2.3 * s, '#a8873a', 0.7);
      R(c, x + 0.6 * s, g - 1.3 * s, 0.3 * s, 0.6 * s, '#3a3328');
      for (let i = 0; i < 12; i++) R(c, x + i * 0.3 * s, g - 0.7 * s + (i % 2) * 0.03 * s, 0.28 * s, 0.18 * s, i % 2 ? '#a7a398' : '#b8b4a8');
      // llamas de colores con borlas
      const llama = (lx, col, ph) => {
        const ly = g - 0.2 * s, bob = Math.sin(t * 1.5 + ph) * 0.03 * s;
        E(c, lx, ly - 0.35 * s, 0.3 * s, 0.17 * s, col);
        R(c, lx + 0.18 * s, ly - 0.85 * s + bob, 0.1 * s, 0.5 * s, col); E(c, lx + 0.26 * s, ly - 0.88 * s + bob, 0.12 * s, 0.07 * s, col);
        P(c, [lx + 0.2 * s, ly - 0.95 * s + bob, lx + 0.22 * s, ly - 1.08 * s + bob, lx + 0.26 * s, ly - 0.95 * s + bob], col);
        O(c, lx + 0.3 * s, ly - 0.9 * s + bob, 0.02 * s, '#222');
        O(c, lx + 0.21 * s, ly - 1.0 * s + bob, 0.04 * s, '#e03131'); O(c, lx + 0.24 * s, ly - 0.6 * s, 0.035 * s, '#f59f00');
        for (const dx of [-0.2, -0.1, 0.1, 0.2]) L(c, lx + dx * s, ly - 0.22 * s, lx + dx * s, ly + 0.15 * s, '#8a7a60', Math.max(1, s * 0.05));
      };
      llama(x + 1.9 * s, '#f1e9da', 0); llama(x + 2.8 * s, '#9c6b45', 1.3); llama(x + 2.35 * s, '#e8ddc8', 2.1);
    } },

    // ── ESTADOS UNIDOS ──
    us_liberty: { w: 2.6, h: 8.2, d(c, x, g, s, t) {
      const cx = x + 1.3 * s, cu = '#5fae96', cuD = '#3f8a73', cuL = '#7fc8ae';
      // pedestal
      R(c, x + 0.2 * s, g - 0.4 * s, 2.2 * s, 0.4 * s, '#b8ad97');
      P(c, [x + 0.45 * s, g - 0.4 * s, x + 0.65 * s, g - 2.8 * s, x + 1.95 * s, g - 2.8 * s, x + 2.15 * s, g - 0.4 * s], '#d6ccb4'); P(c, [cx + 0.3 * s, g - 2.8 * s, x + 1.95 * s, g - 2.8 * s, x + 2.15 * s, g - 0.4 * s, cx + 0.35 * s, g - 0.4 * s], '#b8ad97');
      R(c, x + 0.55 * s, g - 3.0 * s, 1.5 * s, 0.2 * s, '#c9bfa5'); R(c, cx - 0.2 * s, g - 2.2 * s, 0.4 * s, 0.6 * s, '#9c9078');
      // túnica
      c.fillStyle = cu; c.beginPath(); c.moveTo(cx - 0.45 * s, g - 3.0 * s); c.lineTo(cx - 0.32 * s, g - 5.6 * s); c.quadraticCurveTo(cx, g - 5.9 * s, cx + 0.3 * s, g - 5.6 * s); c.lineTo(cx + 0.45 * s, g - 3.0 * s); c.closePath(); c.fill();
      R(c, cx + 0.08 * s, g - 5.6 * s, 0.35 * s, 2.6 * s, 'rgba(0,0,0,0.12)');
      for (let k = 0; k < 5; k++) L(c, cx - 0.3 * s + k * 0.15 * s, g - 5.3 * s, cx - 0.38 * s + k * 0.18 * s, g - 3.05 * s, cuD, 0.8);
      // tabla
      P(c, [cx - 0.45 * s, g - 4.6 * s, cx - 0.28 * s, g - 5.2 * s, cx - 0.12 * s, g - 5.15 * s, cx - 0.28 * s, g - 4.55 * s], cuL);
      // cabeza y corona
      O(c, cx, g - 6.05 * s, 0.22 * s, cu);
      for (let k = -3; k <= 3; k++) { const a = -Math.PI / 2 + k * 0.32; P(c, [cx + Math.cos(a - 0.08) * 0.2 * s, g - 6.15 * s + Math.sin(a - 0.08) * 0.2 * s, cx + Math.cos(a) * 0.55 * s, g - 6.15 * s + Math.sin(a) * 0.55 * s, cx + Math.cos(a + 0.08) * 0.2 * s, g - 6.15 * s + Math.sin(a + 0.08) * 0.2 * s], cuL); }
      // brazo con antorcha
      L(c, cx + 0.22 * s, g - 5.5 * s, cx + 0.55 * s, g - 7.25 * s, cu, Math.max(2, s * 0.18));
      R(c, cx + 0.45 * s, g - 7.55 * s, 0.22 * s, 0.3 * s, K.gold);
      const fl = 0.85 + 0.15 * Math.sin(t * 8);
      P(c, [cx + 0.42 * s, g - 7.55 * s, cx + 0.56 * s, g - (7.55 + 0.6 * fl) * s, cx + 0.7 * s, g - 7.55 * s], '#ffb020'); P(c, [cx + 0.48 * s, g - 7.55 * s, cx + 0.56 * s, g - (7.55 + 0.35 * fl) * s, cx + 0.64 * s, g - 7.55 * s], '#fff0a0');
      const hg = c.createRadialGradient(cx + 0.56 * s, g - 7.85 * s, 1, cx + 0.56 * s, g - 7.85 * s, 0.7 * s); hg.addColorStop(0, 'rgba(255,200,90,0.45)'); hg.addColorStop(1, 'rgba(255,200,90,0)'); c.fillStyle = hg; c.fillRect(cx - 0.2 * s, g - 8.6 * s, 1.5 * s, 1.5 * s);
    } },
    us_empire: { w: 2.6, h: 8.4, d(c, x, g, s, t, r) {
      const cx = x + 1.3 * s, st = '#c8c1b3', stD = '#9e978a';
      const tiers = [[2.6, 2.2], [2.0, 2.2], [1.6, 1.6], [1.1, 0.6], [0.8, 0.5], [0.5, 0.4]];
      let y = g;
      tiers.forEach(([tw, th], i) => {
        const bx = cx - tw * s / 2;
        R(c, bx, y - th * s, tw * s, th * s, st); R(c, cx + tw * s * 0.2, y - th * s, tw * s * 0.3, th * s, stD);
        if (i < 3) grid(c, bx + 0.08 * s, y - th * s + 0.1 * s, tw * s - 0.16 * s, th * s - 0.2 * s, Math.round(tw * 3), Math.round(th * 4), r, { fw: 0.35, fh: 0.5, p: 0.55 });
        if (i < 3) for (let k = 1; k < Math.round(tw * 3); k++) L(c, bx + k * tw * s / Math.round(tw * 3), y - th * s, bx + k * tw * s / Math.round(tw * 3), y, 'rgba(120,115,105,0.35)', 0.6);
        y -= th * s;
      });
      // corona art déco iluminada
      R(c, cx - 0.35 * s, y - 0.3 * s, 0.7 * s, 0.3 * s, '#e3dccd');
      const glow = 0.7 + 0.3 * Math.sin(t * 1.5);
      R(c, cx - 0.32 * s, y - 0.25 * s, 0.64 * s, 0.2 * s, `rgba(255,210,122,${glow})`);
      y -= 0.3 * s;
      P(c, [cx - 0.2 * s, y, cx - 0.1 * s, y - 0.4 * s, cx + 0.1 * s, y - 0.4 * s, cx + 0.2 * s, y], '#d8d1c2');
      L(c, cx, y - 0.4 * s, cx, g - 8.4 * s, '#b0b0b0', Math.max(1, s * 0.06));
      O(c, cx, g - 8.4 * s, 0.06 * s, Math.sin(t * 3) > 0 ? '#ff4040' : '#802020');
    } },
    us_goldengate: { w: 5.0, h: 5.4, d(c, x, g, s, t) {
      const W = 5.0 * s, red = '#c0362c', redD = '#8e241c';
      water(c, x, g - 1.1 * s, W, 1.1 * s, t);
      const deckY = g - 1.6 * s;
      // torres
      for (const tx of [1.0, 4.0]) {
        const bx = x + tx * s;
        R(c, bx - 0.25 * s, deckY - 3.7 * s, 0.14 * s, 3.7 * s + 1.6 * s - 0.2 * s, red); R(c, bx + 0.11 * s, deckY - 3.7 * s, 0.14 * s, 3.7 * s + 1.6 * s - 0.2 * s, redD);
        for (const yy of [0.6, 1.6, 2.6, 3.5]) R(c, bx - 0.25 * s, deckY - yy * s, 0.5 * s, 0.12 * s, red);
        R(c, bx - 0.3 * s, g - 1.15 * s, 0.6 * s, 0.25 * s, '#8a8f96');
      }
      // cables principales
      c.strokeStyle = red; c.lineWidth = Math.max(1, s * 0.07);
      c.beginPath(); c.moveTo(x + 1.0 * s, deckY - 3.6 * s); c.quadraticCurveTo(x + 2.5 * s, deckY + 0.8 * s, x + 4.0 * s, deckY - 3.6 * s); c.stroke();
      c.beginPath(); c.moveTo(x, deckY - 1.0 * s); c.quadraticCurveTo(x + 0.6 * s, deckY - 1.6 * s, x + 1.0 * s, deckY - 3.6 * s); c.stroke();
      c.beginPath(); c.moveTo(x + 4.0 * s, deckY - 3.6 * s); c.quadraticCurveTo(x + 4.4 * s, deckY - 1.6 * s, x + W, deckY - 1.0 * s); c.stroke();
      // tirantes verticales
      for (let i = 1; i < 18; i++) { const u = i / 18, px = x + 1.0 * s + u * 3.0 * s, cy = (1 - u) * (1 - u) * (deckY - 3.6 * s) + 2 * u * (1 - u) * (deckY + 0.8 * s) + u * u * (deckY - 3.6 * s); L(c, px, cy, px, deckY, 'rgba(192,54,44,0.8)', 0.7); }
      // tablero
      R(c, x, deckY, W, 0.22 * s, red); R(c, x, deckY + 0.22 * s, W, 0.12 * s, redD);
      for (let i = 0; i < 25; i++) L(c, x + i * W / 25, deckY + 0.22 * s, x + (i + 0.5) * W / 25, deckY + 0.34 * s, '#6e1a14', 0.6);
      // autos con luces
      for (let k = 0; k < 3; k++) { const px = x + (((t * 0.12 + k / 3) % 1)) * W; R(c, px, deckY - 0.12 * s, 0.25 * s, 0.12 * s, ['#f4f0e7', '#1c7ed6', '#f59f00'][k]); O(c, px + 0.25 * s, deckY - 0.06 * s, 0.03 * s, K.litW); }
    } },
    us_capitol: { w: 5.0, h: 5.4, d(c, x, g, s, t, r) {
      const W = 5.0 * s, cx = x + W / 2, mar = '#f2eee6', marD = '#cfc8ba';
      R(c, x, g - 1.8 * s, W, 1.8 * s, mar); side(c, x, g - 1.8 * s, W, 1.8 * s, 0.1);
      grid(c, x + 0.1 * s, g - 1.7 * s, W - 0.2 * s, 1.5 * s, 14, 2, r, { fw: 0.45, fh: 0.6, p: 0.55 });
      R(c, x - 0.05 * s, g - 1.95 * s, W + 0.1 * s, 0.15 * s, marD);
      columns(c, cx - 0.9 * s, g - 0.2 * s, 1.8 * s, 1.5 * s, 6, '#faf8f2', marD); pediment(c, cx - 1.0 * s, g - 1.95 * s, 2.0 * s, 0.4 * s, mar, marD);
      R(c, x, g - 0.2 * s, W, 0.2 * s, marD);
      // tambor y cúpula
      R(c, cx - 1.0 * s, g - 2.9 * s, 2.0 * s, 0.95 * s, mar); columns(c, cx - 1.0 * s, g - 1.95 * s, 2.0 * s, 0.85 * s, 10, '#faf8f2', marD);
      R(c, cx - 1.05 * s, g - 3.0 * s, 2.1 * s, 0.12 * s, marD);
      c.fillStyle = mar; c.beginPath(); c.moveTo(cx - 0.95 * s, g - 3.0 * s); c.quadraticCurveTo(cx - 0.95 * s, g - 4.3 * s, cx, g - 4.4 * s); c.quadraticCurveTo(cx + 0.95 * s, g - 4.3 * s, cx + 0.95 * s, g - 3.0 * s); c.closePath(); c.fill();
      c.fillStyle = 'rgba(0,0,0,0.12)'; c.beginPath(); c.moveTo(cx + 0.2 * s, g - 4.38 * s); c.quadraticCurveTo(cx + 0.95 * s, g - 4.3 * s, cx + 0.95 * s, g - 3.0 * s); c.lineTo(cx + 0.3 * s, g - 3.0 * s); c.closePath(); c.fill();
      for (let k = -3; k <= 3; k++) L(c, cx + k * 0.27 * s, g - 3.0 * s, cx + k * 0.05 * s, g - 4.35 * s, marD, 0.7);
      for (let k = 0; k < 6; k++) R(c, cx - 0.75 * s + k * 0.28 * s, g - 3.4 * s, 0.1 * s, 0.18 * s, win(r, 0.7));
      R(c, cx - 0.15 * s, g - 4.85 * s, 0.3 * s, 0.45 * s, mar); for (let k = 0; k < 3; k++) R(c, cx - 0.1 * s + k * 0.08 * s, g - 4.75 * s, 0.04 * s, 0.25 * s, marD);
      O(c, cx, g - 4.9 * s, 0.1 * s, marD); R(c, cx - 0.03 * s, g - 5.4 * s, 0.06 * s, 0.45 * s, '#9e978a');
    } },
    us_diner: { w: 3.4, h: 3.2, d(c, x, g, s, t) {
      const W = 3.4 * s;
      // vagón cromado
      c.fillStyle = '#c9d1db'; c.beginPath(); c.moveTo(x + 0.1 * s, g - 0.25 * s); c.lineTo(x + 0.1 * s, g - 1.5 * s); c.quadraticCurveTo(x + W / 2, g - 1.95 * s, x + W - 0.1 * s, g - 1.5 * s); c.lineTo(x + W - 0.1 * s, g - 0.25 * s); c.closePath(); c.fill();
      for (let k = 0; k < 4; k++) L(c, x + 0.1 * s, g - (0.35 + k * 0.08) * s, x + W - 0.1 * s, g - (0.35 + k * 0.08) * s, k % 2 ? '#e8edf2' : '#9aa4b0', 1);
      R(c, x + 0.1 * s, g - 0.75 * s, W - 0.2 * s, 0.12 * s, '#e03131');
      for (let i = 0; i < 6; i++) R(c, x + 0.25 * s + i * 0.5 * s, g - 1.45 * s, 0.4 * s, 0.6 * s, K.litW);
      R(c, x + 1.5 * s, g - 1.35 * s, 0.4 * s, 1.1 * s, '#2b2b33'); R(c, x + 1.55 * s, g - 1.3 * s, 0.3 * s, 0.5 * s, K.lit);
      R(c, x, g - 0.25 * s, W, 0.25 * s, '#5a5a66');
      // letrero de neón
      const on = Math.sin(t * 3) > -0.6, neon = on ? '#ff4fa3' : '#6a2a48';
      L(c, x + 0.6 * s, g - 1.85 * s, x + 0.6 * s, g - 2.15 * s, '#666', 1); L(c, x + 2.8 * s, g - 1.85 * s, x + 2.8 * s, g - 2.15 * s, '#666', 1);
      R(c, x + 0.4 * s, g - 2.85 * s, 2.6 * s, 0.7 * s, '#1a1a2e');
      c.strokeStyle = neon; c.lineWidth = Math.max(1, s * 0.05); c.strokeRect(x + 0.45 * s, g - 2.8 * s, 2.5 * s, 0.6 * s);
      c.fillStyle = on ? '#7ee8fa' : '#2a4a52'; c.font = `bold ${Math.max(6, s * 0.38)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('DINER', x + 1.7 * s, g - 2.5 * s); c.textAlign = 'start'; c.textBaseline = 'alphabetic';
      if (on) { c.fillStyle = 'rgba(255,79,163,0.12)'; c.fillRect(x + 0.2 * s, g - 3.05 * s, 3.0 * s, 1.1 * s); }
      // auto clásico
      const ax = x + 2.55 * s; R(c, ax, g - 0.55 * s, 0.85 * s, 0.25 * s, '#2fb3a0'); R(c, ax + 0.15 * s, g - 0.75 * s, 0.5 * s, 0.22 * s, '#2fb3a0'); R(c, ax + 0.2 * s, g - 0.71 * s, 0.4 * s, 0.14 * s, 'rgba(200,230,255,0.8)');
      O(c, ax + 0.18 * s, g - 0.28 * s, 0.1 * s, '#222'); O(c, ax + 0.68 * s, g - 0.28 * s, 0.1 * s, '#222');
    } },
  });

  Object.assign(CityArt.FLAGS, {
    colombia: (u, v) => (v < 0.5 ? '#fcd116' : v < 0.75 ? '#003893' : '#ce1126'),
    mexico: (u, v) => { const dx = (u - 0.5) * 1.6, dy = v - 0.5; if (u > 1 / 3 && u < 2 / 3 && dx * dx + dy * dy < 0.018) return '#8a5a2b'; return u < 1 / 3 ? '#006847' : u < 2 / 3 ? '#ffffff' : '#ce1126'; },
    peru: (u) => (u < 1 / 3 || u >= 2 / 3 ? '#d91023' : '#ffffff'),
    usa: (u, v) => { if (u < 0.4 && v < 7 / 13) { const sx = Math.floor(u / 0.4 * 6), sy = Math.floor(v / (7 / 13) * 5); const fu = (u / 0.4 * 6) % 1, fv = (v / (7 / 13) * 5) % 1; return (sx + sy) % 2 === 0 && Math.abs(fu - 0.5) < 0.3 && Math.abs(fv - 0.5) < 0.3 ? '#ffffff' : '#3c3b6e'; } return Math.floor(v * 13) % 2 ? '#ffffff' : '#b22234'; },
  });
})();
