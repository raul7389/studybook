// ═══ MEDIO ORIENTE + ASIA — Qatar, Emiratos, Egipto, Japón, China ═══
(() => {
  const { K, R, P, O, E, L, A, G, win, grid, crenel, side, cone, water, smoke, tree, columns, pediment } = CityArt.H;
  const glass = (c, x, y, w, h, top, bot) => { const gr = c.createLinearGradient(x, y, x + w, y); gr.addColorStop(0, top); gr.addColorStop(0.55, bot); gr.addColorStop(1, 'rgba(10,20,40,0.9)'); c.fillStyle = gr; c.fillRect(x, y, w, h); };
  const floors = (c, x, y, w, h, step, col) => { for (let yy = y + step; yy < y + h; yy += step) L(c, x, yy, x + w, yy, col, 0.6); };
  const dome = (c, cx, yb, rx, ry, f) => { c.fillStyle = f; c.beginPath(); c.ellipse(cx, yb, rx, ry, 0, Math.PI, 0); c.fill(); };
  const onion = (c, cx, yb, w, h, f) => { c.fillStyle = f; c.beginPath(); c.moveTo(cx - w / 2, yb); c.bezierCurveTo(cx - w * 0.75, yb - h * 0.55, cx - w * 0.1, yb - h * 0.7, cx, yb - h); c.bezierCurveTo(cx + w * 0.1, yb - h * 0.7, cx + w * 0.75, yb - h * 0.55, cx + w / 2, yb); c.closePath(); c.fill(); };
  // tejado asiático curvado: cx centro, y base del alero, w ancho, h alto
  const eave = (c, cx, y, w, h, f, fD) => {
    c.fillStyle = f; c.beginPath(); c.moveTo(cx - w / 2 - w * 0.08, y - h * 0.35); c.quadraticCurveTo(cx - w * 0.38, y + h * 0.1, cx - w * 0.3, y - h * 0.15);
    c.lineTo(cx - w * 0.2, y - h); c.lineTo(cx + w * 0.2, y - h); c.lineTo(cx + w * 0.3, y - h * 0.15); c.quadraticCurveTo(cx + w * 0.38, y + h * 0.1, cx + w / 2 + w * 0.08, y - h * 0.35);
    c.lineTo(cx + w * 0.42, y - h * 0.05); c.lineTo(cx - w * 0.42, y - h * 0.05); c.closePath(); c.fill();
    if (fD) P(c, [cx - w * 0.42, y - h * 0.05, cx + w * 0.42, y - h * 0.05, cx + w * 0.4, y + h * 0.05, cx - w * 0.4, y + h * 0.05], fD);
  };
  const lantern = (c, x, y, s, t, k) => { const sw = Math.sin(t * 1.6 + k) * 0.06 * s; L(c, x, y - s * 0.25, x + sw, y, '#3a2516', 0.8); E(c, x + sw, y + s * 0.18, s * 0.16, s * 0.2, '#d9261c'); E(c, x + sw, y + s * 0.18, s * 0.08, s * 0.16, `rgba(255,190,90,${0.55 + 0.25 * Math.sin(t * 3 + k)})`); R(c, x + sw - s * 0.07, y - s * 0.02, s * 0.14, s * 0.04, K.gold); R(c, x + sw - s * 0.07, y + s * 0.36, s * 0.14, s * 0.04, K.gold); };

  Object.assign(CityArt.B, {
    // ── QATAR ──
    qa_towers: { w: 4.4, h: 7.6, d(c, x, g, s, t, r) {
      // torres de West Bay
      const tw = [[0.0, 0.7, 4.2, '#5a8fc0'], [0.75, 0.65, 5.4, '#3f6f9e'], [2.9, 0.6, 4.8, '#4b7fb2'], [3.55, 0.8, 3.6, '#6a9ccd']];
      tw.forEach(([ox, w, h, col], i) => { const bx = x + ox * s; glass(c, bx, g - h * s, w * s, h * s, col, '#244a72'); floors(c, bx, g - h * s, w * s, h * s, s * 0.3, 'rgba(255,255,255,0.12)');
        for (let k = 0; k < h / 0.3; k++) if (r() < 0.45) R(c, bx + w * s * (0.15 + r() * 0.6), g - h * s + k * 0.3 * s + s * 0.08, w * s * 0.15, s * 0.12, K.lit);
        if (i === 1) P(c, [bx, g - h * s, bx + w * s / 2, g - (h + 0.6) * s, bx + w * s, g - h * s], '#3f6f9e'); });
      // Torre Doha (torpedo) con celosía
      const cx = x + 2.1 * s, w = 1.1 * s, H = 7.0 * s;
      c.save(); c.beginPath(); c.moveTo(cx - w / 2, g); c.lineTo(cx - w / 2, g - H * 0.75); c.quadraticCurveTo(cx - w / 2, g - H * 0.98, cx, g - H); c.quadraticCurveTo(cx + w / 2, g - H * 0.98, cx + w / 2, g - H * 0.75); c.lineTo(cx + w / 2, g); c.closePath();
      const gr = c.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0); gr.addColorStop(0, '#c9d6e3'); gr.addColorStop(0.5, '#8fa6bd'); gr.addColorStop(1, '#4a5d73'); c.fillStyle = gr; c.fill(); c.clip();
      c.strokeStyle = 'rgba(40,55,75,0.55)'; c.lineWidth = 0.7;
      for (let i = -14; i < 14; i++) { const yy = g - i * s * 0.35; c.beginPath(); c.moveTo(cx - w, yy); c.lineTo(cx + w, yy - w * 1.4); c.moveTo(cx - w, yy - w * 1.4); c.lineTo(cx + w, yy); c.stroke(); }
      for (let k = 0; k < 18; k++) { const on = Math.sin(t * 2 + k * 1.7) > 0.2; if (on) O(c, cx + (((k * 37) % 9) / 9 - 0.5) * w * 0.7, g - H * (0.08 + k * 0.045), Math.max(0.8, s * 0.05), 'rgba(140,220,255,0.9)'); }
      c.restore();
      L(c, cx, g - H, cx, g - H - s * 0.5, '#c9d6e3', Math.max(1, s * 0.05)); O(c, cx, g - H - s * 0.5, s * 0.06, `rgba(255,80,80,${0.5 + 0.5 * Math.sin(t * 3)})`);
    } },
    qa_mia: { w: 4.4, h: 4.2, d(c, x, g, s, t) {
      const W = 4.4 * s, cx = x + W * 0.48, st = '#efe6d4', stD = '#cbbd9f';
      water(c, x, g - 0.45 * s, W, 0.45 * s, t);
      R(c, x + 0.2 * s, g - 0.65 * s, W - 0.4 * s, 0.2 * s, '#d9cdb3');
      // bloques escalonados
      R(c, cx - 1.6 * s, g - 1.7 * s, 3.2 * s, 1.05 * s, st); R(c, cx + 1.1 * s, g - 1.7 * s, 0.5 * s, 1.05 * s, stD);
      R(c, cx - 1.1 * s, g - 2.6 * s, 2.2 * s, 0.9 * s, st); R(c, cx + 0.75 * s, g - 2.6 * s, 0.35 * s, 0.9 * s, stD);
      P(c, [cx - 1.1 * s, g - 2.6 * s, cx - 0.75 * s, g - 2.95 * s, cx + 0.75 * s, g - 2.95 * s, cx + 1.1 * s, g - 2.6 * s], '#e3d8c0');
      R(c, cx - 0.65 * s, g - 3.65 * s, 1.3 * s, 0.7 * s, st); R(c, cx + 0.4 * s, g - 3.65 * s, 0.25 * s, 0.7 * s, stD);
      P(c, [cx - 0.65 * s, g - 3.65 * s, cx - 0.4 * s, g - 3.9 * s, cx + 0.4 * s, g - 3.9 * s, cx + 0.65 * s, g - 3.65 * s], '#e3d8c0');
      R(c, cx - 0.25 * s, g - 4.2 * s, 0.5 * s, 0.32 * s, st);
      // ojo (ventana con celosía)
      E(c, cx, g - 3.35 * s, 0.32 * s, 0.14 * s, '#2a2a33'); E(c, cx, g - 3.35 * s, 0.22 * s, 0.09 * s, K.lit);
      // gran ventanal y arcos
      R(c, cx - 0.35 * s, g - 2.45 * s, 0.7 * s, 0.75 * s, '#2a3c56'); for (let i = 0; i < 4; i++) L(c, cx - 0.35 * s + i * 0.233 * s, g - 2.45 * s, cx - 0.35 * s + i * 0.233 * s, g - 1.7 * s, '#c9a85a', 0.7);
      for (let i = 0; i < 6; i++) A(c, cx - 1.45 * s + i * 0.5 * s, g - 0.68 * s, 0.3 * s, 0.6 * s, i % 2 ? K.lit : '#6b5a40');
      // palmeras
      for (const px of [0.25, 4.15]) { const bx = x + px * s; c.strokeStyle = '#7a5a36'; c.lineWidth = Math.max(1, s * 0.07); c.beginPath(); c.moveTo(bx, g - 0.6 * s); c.quadraticCurveTo(bx + 0.1 * s, g - 1.3 * s, bx, g - 1.9 * s); c.stroke();
        for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + Math.sin(t) * 0.05; c.strokeStyle = '#3f8a4a'; c.lineWidth = Math.max(1, s * 0.08); c.beginPath(); c.moveTo(bx, g - 1.9 * s); c.quadraticCurveTo(bx + Math.cos(a) * 0.35 * s, g - 2.1 * s, bx + Math.cos(a) * 0.55 * s, g - 1.9 * s + Math.abs(Math.sin(a)) * 0.25 * s); c.stroke(); } }
    } },
    qa_souq: { w: 4.2, h: 3.6, d(c, x, g, s, t, r) {
      const W = 4.2 * s, mud = '#c99b62', mudD = '#a77c47', beam = '#5a3a20';
      R(c, x, g - 2.4 * s, 2.6 * s, 2.4 * s, mud); side(c, x, g - 2.4 * s, 2.6 * s, 2.4 * s, 0.12);
      R(c, x + 2.4 * s, g - 1.8 * s, 1.8 * s, 1.8 * s, '#d4a96f');
      // torre de viento (barjeel)
      R(c, x + 0.4 * s, g - 3.6 * s, 0.8 * s, 1.2 * s, mud); R(c, x + 1.0 * s, g - 3.6 * s, 0.2 * s, 1.2 * s, mudD);
      for (let i = 0; i < 3; i++) R(c, x + 0.5 * s + i * 0.22 * s, g - 3.45 * s, 0.1 * s, 0.7 * s, '#3a2614');
      crenel(c, x + 0.4 * s, g - 3.6 * s, 0.8 * s, s * 0.6, mud);
      // vigas que sobresalen (danchal)
      for (let i = 0; i < 9; i++) R(c, x + 0.1 * s + i * 0.28 * s, g - 2.3 * s, 0.07 * s, 0.25 * s, beam);
      for (let i = 0; i < 6; i++) R(c, x + 2.5 * s + i * 0.28 * s, g - 1.7 * s, 0.07 * s, 0.22 * s, beam);
      crenel(c, x, g - 2.4 * s, 2.6 * s, s * 0.6, mud);
      // puertas y ventanas de madera
      A(c, x + 0.3 * s, g, 0.6 * s, 1.0 * s, beam); A(c, x + 0.36 * s, g, 0.48 * s, 0.9 * s, K.litW);
      A(c, x + 1.4 * s, g - 1.3 * s, 0.35 * s, 0.6 * s, win(r)); A(c, x + 1.9 * s, g - 1.3 * s, 0.35 * s, 0.6 * s, win(r));
      // tienda con toldo y alfombras
      R(c, x + 2.6 * s, g - 0.9 * s, 1.4 * s, 0.9 * s, '#3a2614'); R(c, x + 2.7 * s, g - 0.8 * s, 1.2 * s, 0.7 * s, K.litW);
      for (let i = 0; i < 4; i++) R(c, x + 2.75 * s + i * 0.3 * s, g - 0.75 * s, 0.22 * s, 0.6 * s, ['#b0182b', '#2b5fb0', '#d9a03a', '#2a7a3a'][i]);
      P(c, [x + 2.5 * s, g - 1.0 * s, x + 4.1 * s, g - 1.0 * s, x + 4.2 * s, g - 0.8 * s, x + 2.4 * s, g - 0.8 * s], '#e8ddc6');
      // faroles
      for (const lx of [1.2, 2.3]) { L(c, x + lx * s, g - 1.75 * s, x + lx * s, g - 1.55 * s, '#222', 0.8); R(c, x + lx * s - s * 0.08, g - 1.55 * s, s * 0.16, s * 0.22, `rgba(255,200,110,${0.7 + 0.3 * Math.sin(t * 4 + lx)})`); }
    } },
    qa_dhow: { w: 4.0, h: 4.4, d(c, x, g, s, t) {
      const W = 4.0 * s, bob = Math.sin(t * 1.1) * 0.07 * s;
      water(c, x, g - 0.55 * s, W, 0.55 * s, t);
      c.save(); c.translate(0, bob);
      // casco
      c.fillStyle = '#8a5a30'; c.beginPath(); c.moveTo(x + 0.05 * s, g - 1.45 * s); c.lineTo(x + 0.6 * s, g - 1.05 * s); c.lineTo(x + 3.3 * s, g - 1.05 * s); c.lineTo(x + 3.95 * s, g - 1.65 * s);
      c.quadraticCurveTo(x + 3.4 * s, g - 0.3 * s, x + 2.0 * s, g - 0.3 * s); c.quadraticCurveTo(x + 0.7 * s, g - 0.35 * s, x + 0.05 * s, g - 1.45 * s); c.closePath(); c.fill();
      for (let k = 0; k < 4; k++) L(c, x + 0.4 * s, g - (0.5 + k * 0.17) * s, x + 3.5 * s, g - (0.5 + k * 0.17) * s, 'rgba(60,35,15,0.5)', 0.7);
      R(c, x + 0.7 * s, g - 1.15 * s, 2.6 * s, 0.1 * s, '#e8ddc6');
      // mástil inclinado y vela latina
      const mx = x + 2.1 * s; L(c, mx, g - 1.05 * s, mx - 0.25 * s, g - 4.2 * s, '#4a2f18', Math.max(1, s * 0.08));
      c.fillStyle = '#f4ecd8'; c.beginPath(); c.moveTo(mx - 0.3 * s, g - 4.3 * s); c.quadraticCurveTo(mx + 1.6 * s, g - 2.6 * s, mx + 1.4 * s, g - 1.35 * s); c.lineTo(mx - 0.1 * s, g - 1.35 * s); c.closePath(); c.fill();
      L(c, mx - 1.3 * s, g - 3.1 * s, mx + 0.9 * s, g - 4.4 * s, '#4a2f18', Math.max(1, s * 0.06));
      c.fillStyle = 'rgba(0,0,0,0.08)'; c.beginPath(); c.moveTo(mx - 0.1 * s, g - 3.9 * s); c.quadraticCurveTo(mx + 0.8 * s, g - 2.6 * s, mx + 0.6 * s, g - 1.35 * s); c.lineTo(mx - 0.1 * s, g - 1.35 * s); c.closePath(); c.fill();
      // bandera qatarí en la popa
      L(c, x + 0.25 * s, g - 1.4 * s, x + 0.25 * s, g - 2.1 * s, '#4a2f18', 1); CityArt.flag(c, 'qatar', x + 0.26 * s, g - 2.1 * s, Math.max(8, 0.55 * s), Math.max(5, 0.33 * s), t);
      c.restore();
    } },
    qa_stadium: { w: 4.6, h: 2.8, d(c, x, g, s, t) {
      const W = 4.6 * s, cx = x + W / 2;
      // cuenco dorado
      c.fillStyle = '#c8952e'; c.beginPath(); c.moveTo(x + 0.15 * s, g - 1.9 * s); c.quadraticCurveTo(cx, g - 2.5 * s, x + W - 0.15 * s, g - 1.9 * s);
      c.quadraticCurveTo(x + W, g - 0.6 * s, x + W - 0.6 * s, g); c.lineTo(x + 0.6 * s, g); c.quadraticCurveTo(x, g - 0.6 * s, x + 0.15 * s, g - 1.9 * s); c.closePath(); c.fill();
      c.save(); c.clip();
      const gr = c.createLinearGradient(x, 0, x + W, 0); gr.addColorStop(0, 'rgba(255,230,150,0.55)'); gr.addColorStop(0.5, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.25)'); c.fillStyle = gr; c.fillRect(x, g - 3 * s, W, 3 * s);
      // patrón de triángulos (fanar)
      for (let j = 0; j < 6; j++) for (let i = 0; i < 16; i++) { const px = x + i * W / 15, py = g - 2.2 * s + j * 0.38 * s, sz = 0.13 * s; const on = Math.sin(t * 2 + i * 0.7 + j) > 0.6; P(c, [px - sz, py + sz, px, py - sz, px + sz, py + sz], on ? 'rgba(255,240,190,0.9)' : 'rgba(90,55,15,0.55)'); }
      c.restore();
      E(c, cx, g - 2.05 * s, W * 0.44, 0.22 * s, '#2b2014'); E(c, cx, g - 2.08 * s, W * 0.4, 0.15 * s, '#2f7a3a');
      // focos
      for (const fx of [0.6, 4.0]) { L(c, x + fx * s, g - 2.1 * s, x + fx * s, g - 2.7 * s, '#ccc', 1); R(c, x + fx * s - 0.12 * s, g - 2.8 * s, 0.24 * s, 0.1 * s, '#fff8d0'); }
      for (let i = 0; i < 5; i++) A(c, x + 1.0 * s + i * 0.55 * s, g, 0.3 * s, 0.45 * s, '#3a2614');
    } },

    // ── EMIRATOS ──
    ae_burjkhalifa: { w: 2.6, h: 8.6, d(c, x, g, s, t, r) {
      const cx = x + 1.3 * s;
      const tiers = [[1.3, 1.7], [1.05, 3.0], [0.85, 4.2], [0.62, 5.3], [0.45, 6.2], [0.3, 6.9], [0.18, 7.4]];
      let prev = 0;
      tiers.forEach(([hw, top], i) => { const bx = cx - hw * s, bw = hw * 2 * s, by = g - top * s;
        glass(c, bx, by, bw, (top - prev) * s + (i ? 0 : 0), '#a9c3db', '#5c7896');
        R(c, bx, by, bw, (top - prev) * s, 'rgba(0,0,0,0)');
        const gr = c.createLinearGradient(bx, 0, bx + bw, 0); gr.addColorStop(0, '#d6e3ef'); gr.addColorStop(0.5, '#8ea7bf'); gr.addColorStop(1, '#4b6079'); c.fillStyle = gr; c.fillRect(bx, by, bw, g - by);
        prev = top; });
      // líneas verticales y luces
      for (let i = -3; i <= 3; i++) L(c, cx + i * 0.16 * s, g - 7.3 * s, cx + i * 0.16 * s, g, 'rgba(255,255,255,0.18)', 0.6);
      for (let k = 0; k < 40; k++) { const y = g - (0.2 + k * 0.18) * s; const hw = tiers.find(([, top]) => top * s > g - y)?.[0] || 0.18; if (r() < 0.4) R(c, cx - hw * s * 0.8 + r() * hw * s * 1.4, y, s * 0.08, s * 0.06, K.lit); }
      // aguja
      P(c, [cx - 0.1 * s, g - 7.4 * s, cx, g - 8.6 * s, cx + 0.1 * s, g - 7.4 * s], '#c9d6e3');
      O(c, cx, g - 8.6 * s, s * (0.06 + 0.04 * Math.sin(t * 3)), 'rgba(255,90,90,0.95)');
      R(c, cx + 0.05 * s, g - 7.4 * s, 1.3 * s, 7.4 * s, 'rgba(0,0,0,0.12)');
    } },
    ae_burjalarab: { w: 3.0, h: 6.6, d(c, x, g, s, t) {
      const bx = x + 0.4 * s;
      water(c, x, g - 0.4 * s, 3.0 * s, 0.4 * s, t);
      R(c, x + 0.3 * s, g - 0.55 * s, 2.4 * s, 0.15 * s, '#d9cdb3');
      // mástil (estructura trasera)
      c.strokeStyle = '#e8edf2'; c.lineWidth = Math.max(1.5, s * 0.14); c.beginPath(); c.moveTo(bx, g - 0.5 * s); c.lineTo(bx, g - 6.6 * s); c.stroke();
      // vela
      c.fillStyle = '#f4f6f8'; c.beginPath(); c.moveTo(bx, g - 0.6 * s); c.lineTo(bx, g - 6.1 * s); c.quadraticCurveTo(bx + 2.7 * s, g - 4.6 * s, bx + 2.2 * s, g - 0.6 * s); c.closePath(); c.fill();
      c.save(); c.clip(); for (let i = 1; i < 9; i++) { c.strokeStyle = 'rgba(150,165,185,0.5)'; c.lineWidth = 0.7; c.beginPath(); c.moveTo(bx, g - 0.6 * s - i * 0.62 * s); c.quadraticCurveTo(bx + 1.4 * s, g - 0.4 * s - i * 0.55 * s, bx + 2.6 * s, g - 0.6 * s - i * 0.4 * s); c.stroke(); }
      const tint = `rgba(${120 + 60 * Math.sin(t * 0.6)},${120 + 50 * Math.sin(t * 0.6 + 2)},255,0.18)`; c.fillStyle = tint; c.fillRect(bx, g - 6.6 * s, 3 * s, 6.6 * s); c.restore();
      // cuerpo de habitaciones
      c.fillStyle = 'rgba(40,60,90,0.55)'; c.beginPath(); c.moveTo(bx + 0.15 * s, g - 0.6 * s); c.lineTo(bx + 0.15 * s, g - 5.6 * s); c.lineTo(bx + 0.5 * s, g - 5.3 * s); c.lineTo(bx + 0.5 * s, g - 0.6 * s); c.closePath(); c.fill();
      for (let k = 0; k < 12; k++) R(c, bx + 0.22 * s, g - (0.9 + k * 0.4) * s, 0.2 * s, 0.12 * s, K.lit);
      // helipuerto
      R(c, bx - 0.2 * s, g - 5.2 * s, 0.5 * s, 0.06 * s, '#9aa3b0'); E(c, bx - 0.45 * s, g - 5.22 * s, 0.32 * s, 0.07 * s, '#7a8696');
    } },
    ae_mosque: { w: 4.8, h: 4.4, d(c, x, g, s, t, r) {
      const W = 4.8 * s, cx = x + W / 2, wh = '#f6f4ee', whD = '#d9d4c7';
      R(c, x + 0.4 * s, g - 1.5 * s, W - 0.8 * s, 1.5 * s, wh); side(c, x + 0.4 * s, g - 1.5 * s, W - 0.8 * s, 1.5 * s, 0.1);
      for (let i = 0; i < 7; i++) { A(c, x + 0.6 * s + i * 0.52 * s, g, 0.36 * s, 1.0 * s, '#c9a85a'); A(c, x + 0.64 * s + i * 0.52 * s, g, 0.28 * s, 0.92 * s, i === 3 ? K.litW : '#3e4d66'); }
      R(c, x + 0.4 * s, g - 1.6 * s, W - 0.8 * s, 0.1 * s, '#c9a85a');
      // cúpulas pequeñas
      for (const dx of [-1.3, -0.65, 0.65, 1.3]) { R(c, cx + dx * s - 0.2 * s, g - 1.8 * s, 0.4 * s, 0.2 * s, wh); onion(c, cx + dx * s, g - 1.8 * s, 0.5 * s, 0.55 * s, wh); L(c, cx + dx * s, g - 2.35 * s, cx + dx * s, g - 2.5 * s, K.gold, 1); }
      // cúpula central
      R(c, cx - 0.7 * s, g - 2.3 * s, 1.4 * s, 0.7 * s, wh); for (let i = 0; i < 5; i++) A(c, cx - 0.6 * s + i * 0.25 * s, g - 1.75 * s, 0.14 * s, 0.35 * s, win(r, 0.7));
      onion(c, cx, g - 2.3 * s, 1.5 * s, 1.6 * s, wh); c.fillStyle = 'rgba(0,0,0,0.1)'; c.beginPath(); c.moveTo(cx, g - 3.9 * s); c.bezierCurveTo(cx + 0.1 * s, g - 3.4 * s, cx + 1.1 * s, g - 3.1 * s, cx + 0.75 * s, g - 2.3 * s); c.lineTo(cx + 0.2 * s, g - 2.3 * s); c.closePath(); c.fill();
      L(c, cx, g - 3.9 * s, cx, g - 4.2 * s, K.gold, Math.max(1, s * 0.06)); O(c, cx, g - 4.25 * s, 0.07 * s, K.gold);
      // minaretes
      for (const mx of [0.2, 4.6]) { const bx = x + mx * s; R(c, bx - 0.13 * s, g - 4.0 * s, 0.26 * s, 4.0 * s, wh); R(c, bx + 0.03 * s, g - 4.0 * s, 0.1 * s, 4.0 * s, whD);
        for (const yy of [1.6, 2.9]) R(c, bx - 0.2 * s, g - yy * s, 0.4 * s, 0.1 * s, '#c9a85a');
        onion(c, bx, g - 4.0 * s, 0.3 * s, 0.4 * s, '#c9a85a'); }
      // reflejo en estanque
      R(c, x + 0.6 * s, g - 0.05 * s, W - 1.2 * s, 0.05 * s, '#5fa3d8');
    } },
    ae_frame: { w: 3.0, h: 5.6, d(c, x, g, s, t) {
      const W = 3.0 * s, gold = '#d9a93a', goldD = '#a87a1e';
      const gr = c.createLinearGradient(x, 0, x + W, 0); gr.addColorStop(0, '#f2cf6b'); gr.addColorStop(0.5, gold); gr.addColorStop(1, goldD);
      R(c, x + 0.1 * s, g - 5.4 * s, 0.6 * s, 5.4 * s, gr); R(c, x + W - 0.7 * s, g - 5.4 * s, 0.6 * s, 5.4 * s, gr);
      R(c, x + 0.1 * s, g - 5.6 * s, W - 0.2 * s, 0.55 * s, gr);
      // patrón calado (solo en los pilares y el puente)
      c.save(); c.beginPath(); c.rect(x + 0.1 * s, g - 5.6 * s, 0.6 * s, 5.6 * s); c.rect(x + W - 0.7 * s, g - 5.6 * s, 0.6 * s, 5.6 * s); c.rect(x + 0.1 * s, g - 5.6 * s, W - 0.2 * s, 0.55 * s); c.clip();
      for (let j = 0; j < 22; j++) for (let i = 0; i < 12; i++) { const px = x + 0.15 * s + i * 0.25 * s, py = g - 5.55 * s + j * 0.25 * s; c.strokeStyle = 'rgba(120,80,15,0.45)'; c.lineWidth = 0.6; c.beginPath(); c.arc(px, py, 0.1 * s, 0, Math.PI * 2); c.stroke(); }
      c.restore();
      // puente de cristal superior
      R(c, x + 0.7 * s, g - 5.45 * s, W - 1.4 * s, 0.3 * s, 'rgba(150,210,255,0.6)');
      for (let k = 0; k < 6; k++) O(c, x + 0.85 * s + k * 0.27 * s, g - 5.3 * s, Math.max(0.8, s * 0.04), `rgba(255,240,190,${0.5 + 0.5 * Math.sin(t * 2 + k)})`);
      R(c, x + 0.1 * s, g - 0.2 * s, W - 0.2 * s, 0.2 * s, '#bfa060');
      for (const px of [1.1, 1.9]) { L(c, x + px * s, g - 0.2 * s, x + px * s, g - 0.8 * s, '#6b4a30', Math.max(1, s * 0.06)); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; L(c, x + px * s, g - 0.8 * s, x + px * s + Math.cos(a) * 0.3 * s, g - 0.75 * s + Math.abs(Math.sin(a)) * 0.12 * s, '#3f8a4a', Math.max(1, s * 0.06)); } }
    } },
    ae_desert: { w: 4.4, h: 2.6, d(c, x, g, s, t) {
      const W = 4.4 * s;
      c.fillStyle = '#d9a35a'; c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(x + 1.2 * s, g - 1.6 * s, x + 2.4 * s, g - 0.6 * s); c.quadraticCurveTo(x + 3.4 * s, g - 1.3 * s, x + W, g - 0.4 * s); c.lineTo(x + W, g); c.closePath(); c.fill();
      c.fillStyle = '#c08a45'; c.beginPath(); c.moveTo(x + 1.2 * s, g - 1.15 * s); c.quadraticCurveTo(x + 1.9 * s, g - 0.8 * s, x + 2.4 * s, g - 0.6 * s); c.lineTo(x + 2.4 * s, g); c.lineTo(x + 1.6 * s, g); c.closePath(); c.fill();
      // tienda beduina
      const tx = x + 0.3 * s; P(c, [tx, g, tx + 0.15 * s, g - 0.9 * s, tx + 0.9 * s, g - 1.15 * s, tx + 1.65 * s, g - 0.9 * s, tx + 1.8 * s, g], '#5a3a24');
      for (let i = 0; i < 5; i++) L(c, tx + 0.2 * s + i * 0.35 * s, g - 0.95 * s, tx + 0.2 * s + i * 0.35 * s, g, '#c8a070', 0.8);
      R(c, tx + 0.65 * s, g - 0.6 * s, 0.5 * s, 0.6 * s, `rgba(255,190,100,${0.7 + 0.2 * Math.sin(t * 5)})`);
      // fogata
      const fx = x + 2.35 * s; for (let k = 0; k < 3; k++) P(c, [fx - 0.12 * s + k * 0.08 * s, g, fx - 0.05 * s + k * 0.08 * s, g - (0.3 + 0.1 * Math.sin(t * 8 + k)) * s, fx + 0.02 * s + k * 0.08 * s, g], ['#ff7a1a', '#ffc04a', '#ff5030'][k]);
      smoke(c, fx, g - 0.35 * s, s * 0.6, t);
      // camello
      const kx = x + 3.0 * s, ky = g - 0.15 * s, cm = '#b07a3e';
      E(c, kx + 0.45 * s, ky - 0.75 * s, 0.5 * s, 0.25 * s, cm); E(c, kx + 0.35 * s, ky - 0.95 * s, 0.18 * s, 0.18 * s, cm); E(c, kx + 0.65 * s, ky - 0.92 * s, 0.16 * s, 0.15 * s, cm);
      for (const lx of [0.1, 0.25, 0.65, 0.8]) L(c, kx + lx * s, ky - 0.6 * s, kx + lx * s, ky, cm, Math.max(1, s * 0.07));
      c.strokeStyle = cm; c.lineWidth = Math.max(1.5, s * 0.12); c.beginPath(); c.moveTo(kx + 0.92 * s, ky - 0.8 * s); c.quadraticCurveTo(kx + 1.15 * s, ky - 1.0 * s, kx + 1.1 * s, ky - 1.3 * s); c.stroke();
      E(c, kx + 1.18 * s, ky - 1.32 * s, 0.13 * s, 0.07 * s, cm);
      R(c, kx + 0.3 * s, ky - 1.0 * s, 0.35 * s, 0.1 * s, '#b0182b');
    } },

    // ── EGIPTO ──
    eg_pyramids: { w: 5.0, h: 3.6, d(c, x, g, s) {
      const pyr = (cx, w, h, lit, shd) => { P(c, [cx - w / 2, g, cx, g - h, cx + w / 2, g], lit); P(c, [cx, g - h, cx + w / 2, g, cx + w * 0.05, g], shd);
        for (let k = 1; k < 10; k++) { const y = g - h * k / 10, hw = (w / 2) * (1 - k / 10); L(c, cx - hw, y, cx + hw * 0.1, y, 'rgba(120,85,40,0.35)', 0.6); } };
      pyr(x + 4.0 * s, 1.8 * s, 1.5 * s, '#e0b774', '#b68a4a');
      pyr(x + 1.2 * s, 2.4 * s, 2.0 * s, '#dcb06a', '#b08244');
      pyr(x + 2.7 * s, 3.2 * s, 3.6 * s, '#e6be7c', '#b98d4e');
      P(c, [x + 2.7 * s - 0.25 * s, g - 3.35 * s, x + 2.7 * s, g - 3.6 * s, x + 2.7 * s + 0.25 * s, g - 3.35 * s], '#f4e2b8');
      // palmeras pequeñas
      for (const px of [0.1, 4.9]) { L(c, x + px * s, g, x + px * s, g - 0.8 * s, '#6b4a30', Math.max(1, s * 0.06)); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; L(c, x + px * s, g - 0.8 * s, x + px * s + Math.cos(a) * 0.35 * s, g - 0.75 * s + Math.abs(Math.sin(a)) * 0.15 * s, '#3f8a4a', Math.max(1, s * 0.06)); } }
    } },
    eg_sphinx: { w: 4.2, h: 2.6, d(c, x, g, s) {
      const sd = '#d8ae6a', sdD = '#b08445', sdL = '#e8c487';
      R(c, x, g - 0.3 * s, 4.2 * s, 0.3 * s, '#c79e5e');
      // cuerpo
      c.fillStyle = sd; c.beginPath(); c.moveTo(x + 0.2 * s, g - 0.3 * s); c.lineTo(x + 0.3 * s, g - 1.1 * s); c.quadraticCurveTo(x + 1.5 * s, g - 1.45 * s, x + 2.6 * s, g - 1.3 * s); c.lineTo(x + 2.8 * s, g - 0.3 * s); c.closePath(); c.fill();
      // patas delanteras
      R(c, x + 2.5 * s, g - 0.65 * s, 1.5 * s, 0.35 * s, sd); R(c, x + 2.5 * s, g - 0.45 * s, 1.5 * s, 0.15 * s, sdD);
      for (let k = 0; k < 4; k++) L(c, x + 3.85 * s, g - (0.35 + k * 0.08) * s, x + 4.0 * s, g - (0.35 + k * 0.08) * s, sdD, 0.7);
      // nemes (tocado)
      P(c, [x + 2.25 * s, g - 1.15 * s, x + 2.45 * s, g - 2.3 * s, x + 3.25 * s, g - 2.3 * s, x + 3.45 * s, g - 1.15 * s], sdL);
      for (let k = 0; k < 6; k++) L(c, x + 2.3 * s + k * 0.03 * s, g - 1.3 * s - k * 0.17 * s, x + 3.4 * s - k * 0.03 * s, g - 1.3 * s - k * 0.17 * s, 'rgba(120,85,40,0.45)', 0.7);
      // cara
      R(c, x + 2.6 * s, g - 2.2 * s, 0.5 * s, 0.85 * s, sd); R(c, x + 2.95 * s, g - 2.2 * s, 0.15 * s, 0.85 * s, sdD);
      R(c, x + 2.67 * s, g - 1.95 * s, 0.12 * s, 0.05 * s, '#5a3a20'); R(c, x + 2.88 * s, g - 1.95 * s, 0.12 * s, 0.05 * s, '#5a3a20');
      R(c, x + 2.8 * s, g - 1.85 * s, 0.08 * s, 0.2 * s, sdD); R(c, x + 2.72 * s, g - 1.55 * s, 0.25 * s, 0.04 * s, '#7a5530');
      R(c, x + 2.78 * s, g - 1.35 * s, 0.14 * s, 0.25 * s, sdD); // barba
      // erosión
      for (let k = 0; k < 6; k++) L(c, x + 0.4 * s + k * 0.35 * s, g - 1.15 * s + (k % 2) * 0.1 * s, x + 0.5 * s + k * 0.35 * s, g - 0.4 * s, 'rgba(120,85,40,0.3)', 0.6);
    } },
    eg_karnak: { w: 4.2, h: 3.4, d(c, x, g, s) {
      const st = '#dcbc84', stD = '#b3925a';
      R(c, x, g - 0.15 * s, 4.2 * s, 0.15 * s, stD);
      // pilono
      P(c, [x, g, x + 0.2 * s, g - 3.2 * s, x + 1.5 * s, g - 3.2 * s, x + 1.7 * s, g], st); R(c, x + 1.3 * s, g - 3.2 * s, 0.4 * s, 3.2 * s, 'rgba(0,0,0,0.1)');
      R(c, x + 0.15 * s, g - 3.4 * s, 1.4 * s, 0.2 * s, stD);
      for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) R(c, x + 0.4 * s + i * 0.25 * s, g - 2.8 * s + j * 0.4 * s, 0.12 * s, 0.22 * s, 'rgba(110,75,35,0.45)'); // jeroglíficos
      // columnas papiriformes
      for (let i = 0; i < 4; i++) { const cx = x + 2.0 * s + i * 0.55 * s; R(c, cx, g - 2.6 * s, 0.38 * s, 2.45 * s, st); R(c, cx + 0.26 * s, g - 2.6 * s, 0.12 * s, 2.45 * s, stD);
        P(c, [cx - 0.08 * s, g - 2.6 * s, cx + 0.46 * s, g - 2.6 * s, cx + 0.36 * s, g - 2.35 * s, cx + 0.02 * s, g - 2.35 * s], '#c9a86e');
        for (let k = 0; k < 3; k++) R(c, cx + 0.05 * s, g - (1.2 + k * 0.4) * s, 0.28 * s, 0.05 * s, '#2a6f8a'); }
      R(c, x + 1.9 * s, g - 2.85 * s, 2.3 * s, 0.25 * s, st);
      // obelisco
      P(c, [x + 1.75 * s, g, x + 1.8 * s, g - 3.0 * s, x + 1.88 * s, g - 3.2 * s, x + 1.96 * s, g - 3.0 * s, x + 2.0 * s, g], '#cfa86a');
    } },
    eg_felucca: { w: 3.6, h: 4.0, d(c, x, g, s, t) {
      const W = 3.6 * s, bob = Math.sin(t * 1.3) * 0.06 * s;
      water(c, x, g - 0.6 * s, W, 0.6 * s, t);
      // juncos y palmera en la orilla
      for (let k = 0; k < 6; k++) L(c, x + (0.05 + k * 0.08) * s, g - 0.6 * s, x + (0.02 + k * 0.08) * s, g - (1.0 + (k % 3) * 0.15) * s, '#5c8a3c', 1);
      L(c, x + 3.4 * s, g - 0.55 * s, x + 3.3 * s, g - 2.0 * s, '#6b4a30', Math.max(1, s * 0.07)); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; L(c, x + 3.3 * s, g - 2.0 * s, x + 3.3 * s + Math.cos(a) * 0.45 * s, g - 1.95 * s + Math.abs(Math.sin(a)) * 0.2 * s, '#3f8a4a', Math.max(1, s * 0.07)); }
      c.save(); c.translate(Math.sin(t * 0.4) * 0.15 * s, bob);
      c.fillStyle = '#7a4e2e'; c.beginPath(); c.moveTo(x + 0.5 * s, g - 0.75 * s); c.quadraticCurveTo(x + 1.6 * s, g - 0.25 * s, x + 2.9 * s, g - 0.85 * s); c.lineTo(x + 2.75 * s, g - 0.6 * s); c.quadraticCurveTo(x + 1.6 * s, g - 0.2 * s, x + 0.6 * s, g - 0.55 * s); c.closePath(); c.fill();
      L(c, x + 1.5 * s, g - 0.6 * s, x + 1.5 * s, g - 3.2 * s, '#3b2414', Math.max(1, s * 0.06));
      c.fillStyle = '#f6efde'; c.beginPath(); c.moveTo(x + 1.55 * s, g - 3.8 * s); c.quadraticCurveTo(x + 2.6 * s, g - 2.2 * s, x + 2.6 * s, g - 0.95 * s); c.lineTo(x + 1.55 * s, g - 0.95 * s); c.closePath(); c.fill();
      L(c, x + 1.0 * s, g - 2.6 * s, x + 1.65 * s, g - 3.9 * s, '#3b2414', Math.max(1, s * 0.05));
      c.restore();
      // sol poniente reflejado
      R(c, x + 0.6 * s, g - 0.35 * s, 2.0 * s, 0.05 * s, 'rgba(255,190,110,0.6)');
    } },
    eg_bazaar: { w: 3.0, h: 3.6, d(c, x, g, s, t, r) {
      const W = 3.0 * s, st = '#d9b27a';
      R(c, x, g - 2.6 * s, W, 2.6 * s, st); side(c, x, g - 2.6 * s, W, 2.6 * s, 0.13);
      // mashrabiya
      for (const wx of [0.25, 1.75]) { R(c, x + wx * s, g - 2.35 * s, 1.0 * s, 0.75 * s, '#6b4226'); for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) O(c, x + (wx + 0.1 + i * 0.16) * s, g - (2.25 - j * 0.17) * s, Math.max(0.6, s * 0.04), r() < 0.5 ? K.lit : '#3a2414'); }
      // minarete pequeño
      R(c, x + 2.5 * s, g - 3.4 * s, 0.35 * s, 0.8 * s, st); onion(c, x + 2.675 * s, g - 3.4 * s, 0.35 * s, 0.3 * s, '#c9a85a');
      // arcos de tiendas
      for (let i = 0; i < 3; i++) { A(c, x + 0.2 * s + i * 0.95 * s, g, 0.7 * s, 1.2 * s, '#3a2414'); A(c, x + 0.27 * s + i * 0.95 * s, g, 0.56 * s, 1.05 * s, K.litW); }
      // lámparas de colores
      const cols = ['#e2453a', '#2e86de', '#f2b632', '#4caf50', '#9b59b6'];
      for (let i = 0; i < 7; i++) { const lx = x + 0.3 * s + i * 0.4 * s, ly = g - 1.35 * s; L(c, lx, g - 1.55 * s, lx, ly, '#222', 0.7); onion(c, lx, ly + 0.25 * s, 0.2 * s, 0.25 * s, cols[i % 5]); O(c, lx, ly + 0.15 * s, s * 0.04, `rgba(255,240,200,${0.6 + 0.4 * Math.sin(t * 3 + i)})`); }
      for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) O(c, x + (0.4 + i * 0.95 + k * 0.15) * s, g - 0.15 * s, 0.08 * s, ['#c0392b', '#e67e22', '#f1c40f'][k]); // especias
    } },

    // ── JAPÓN ──
    jp_fuji: { w: 5.0, h: 4.0, d(c, x, g, s, t) {
      const W = 5.0 * s, cx = x + W / 2;
      c.fillStyle = '#4b5c8a'; c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(cx - 1.2 * s, g - 2.2 * s, cx - 0.45 * s, g - 3.8 * s); c.lineTo(cx + 0.45 * s, g - 3.8 * s); c.quadraticCurveTo(cx + 1.2 * s, g - 2.2 * s, x + W, g); c.closePath(); c.fill();
      c.fillStyle = '#3a4870'; c.beginPath(); c.moveTo(cx + 0.1 * s, g - 3.8 * s); c.lineTo(cx + 0.45 * s, g - 3.8 * s); c.quadraticCurveTo(cx + 1.2 * s, g - 2.2 * s, x + W, g); c.lineTo(cx + 0.5 * s, g); c.closePath(); c.fill();
      // nieve
      c.fillStyle = '#f4f6fb'; c.beginPath(); c.moveTo(cx - 0.45 * s, g - 3.8 * s); c.lineTo(cx + 0.45 * s, g - 3.8 * s); c.lineTo(cx + 0.85 * s, g - 2.9 * s);
      for (let k = 0; k < 6; k++) c.lineTo(cx + (0.85 - (k + 0.5) * 0.283) * s, g - (k % 2 ? 2.9 : 2.55) * s); c.lineTo(cx - 0.85 * s, g - 2.9 * s); c.closePath(); c.fill();
      // bosque y lago
      for (let i = 0; i < 12; i++) P(c, [x + (0.1 + i * 0.4) * s, g, x + (0.3 + i * 0.4) * s, g - (0.5 + (i % 3) * 0.15) * s, x + (0.5 + i * 0.4) * s, g], '#2f5d3a');
      // nubes
      for (let k = 0; k < 2; k++) { const nx = x + ((t * 0.05 + k * 0.5) % 1) * W; E(c, nx, g - (2.2 + k * 0.6) * s, 0.5 * s, 0.12 * s, 'rgba(235,240,250,0.55)'); }
    } },
    jp_himeji: { w: 3.6, h: 5.0, d(c, x, g, s, t, r) {
      const W = 3.6 * s, cx = x + W / 2, wh = '#f7f5ef', roof = '#5e6a78', roofD = '#3f4954';
      // base de piedra
      P(c, [x + 0.1 * s, g, x + 0.5 * s, g - 1.3 * s, x + W - 0.5 * s, g - 1.3 * s, x + W - 0.1 * s, g], '#9a948a');
      for (let j = 0; j < 4; j++) L(c, x + (0.2 + j * 0.1) * s, g - j * 0.32 * s, x + W - (0.2 + j * 0.1) * s, g - j * 0.32 * s, '#7d776d', 0.7);
      const tiers = [[2.6, 1.3, 0.9], [2.1, 2.2, 0.8], [1.6, 3.0, 0.7], [1.1, 3.7, 0.6]];
      tiers.forEach(([w, y0, h], i) => { R(c, cx - w * s / 2, g - (y0 + h) * s, w * s, h * s, wh); R(c, cx + w * s * 0.3, g - (y0 + h) * s, w * s * 0.2, h * s, 'rgba(0,0,0,0.08)');
        for (let k = 0; k < Math.round(w * 2); k++) R(c, cx - w * s / 2 + (k + 0.35) * w * s / Math.round(w * 2), g - (y0 + h * 0.65) * s, 0.12 * s, 0.22 * s, win(r, 0.5));
        eave(c, cx, g - (y0 + h) * s, (w + 0.6) * s, 0.45 * s, roof, roofD);
        if (i % 2 === 0) P(c, [cx - 0.35 * s, g - (y0 + h + 0.15) * s, cx, g - (y0 + h + 0.55) * s, cx + 0.35 * s, g - (y0 + h + 0.15) * s], roof); });
      eave(c, cx, g - 4.3 * s, 1.5 * s, 0.6 * s, roof, roofD);
      // shachihoko dorados
      O(c, cx - 0.3 * s, g - 4.95 * s, 0.07 * s, K.gold); O(c, cx + 0.3 * s, g - 4.95 * s, 0.07 * s, K.gold);
    } },
    jp_pagoda: { w: 2.6, h: 6.2, d(c, x, g, s, t, r) {
      const cx = x + 1.3 * s, red = '#b8322a', roof = '#3d3a3f';
      R(c, cx - 0.9 * s, g - 0.25 * s, 1.8 * s, 0.25 * s, '#8c8478');
      let y = g - 0.25 * s;
      for (let k = 0; k < 5; k++) { const w = (1.2 - k * 0.15) * s, h = 0.55 * s;
        R(c, cx - w / 2, y - h, w, h, red); R(c, cx + w * 0.2, y - h, w * 0.3, h, 'rgba(0,0,0,0.15)');
        for (let i = 0; i < 3; i++) R(c, cx - w / 2 + (i + 0.3) * w / 3, y - h * 0.8, w / 3 * 0.4, h * 0.6, k === 0 && i === 1 ? K.lit : '#f0e6d0');
        y -= h; eave(c, cx, y, w + 1.0 * s, 0.4 * s, roof, '#2a272b'); y -= 0.3 * s; }
      // sorin (aguja)
      L(c, cx, y, cx, y - 1.0 * s, '#c9a85a', Math.max(1, s * 0.07)); for (let k = 0; k < 6; k++) R(c, cx - 0.1 * s, y - (0.15 + k * 0.13) * s, 0.2 * s, 0.04 * s, '#c9a85a');
      O(c, cx, y - 1.05 * s, 0.07 * s, K.gold);
      // farol de piedra
      R(c, x + 0.1 * s, g - 0.9 * s, 0.08 * s, 0.9 * s, '#8c8478'); R(c, x + 0.02 * s, g - 1.05 * s, 0.24 * s, 0.18 * s, `rgba(255,200,120,${0.6 + 0.3 * Math.sin(t * 4)})`); P(c, [x - 0.05 * s, g - 1.05 * s, x + 0.14 * s, g - 1.25 * s, x + 0.33 * s, g - 1.05 * s], '#8c8478');
    } },
    jp_torii: { w: 3.4, h: 3.8, d(c, x, g, s, t) {
      const W = 3.4 * s, red = '#d33a26', redD = '#9e2716';
      water(c, x, g - 0.5 * s, W, 0.5 * s, t);
      R(c, x + 0.55 * s, g - 3.2 * s, 0.28 * s, 3.2 * s, red); R(c, x + 0.73 * s, g - 3.2 * s, 0.1 * s, 3.2 * s, redD);
      R(c, x + W - 0.83 * s, g - 3.2 * s, 0.28 * s, 3.2 * s, red); R(c, x + W - 0.65 * s, g - 3.2 * s, 0.1 * s, 3.2 * s, redD);
      R(c, x + 0.3 * s, g - 2.55 * s, W - 0.6 * s, 0.2 * s, red);
      R(c, x + W / 2 - 0.15 * s, g - 3.1 * s, 0.3 * s, 0.55 * s, red);
      // kasagi curvado
      c.fillStyle = '#2a2224'; c.beginPath(); c.moveTo(x - 0.05 * s, g - 3.35 * s); c.quadraticCurveTo(x + W / 2, g - 3.15 * s, x + W + 0.05 * s, g - 3.35 * s); c.lineTo(x + W + 0.1 * s, g - 3.6 * s); c.quadraticCurveTo(x + W / 2, g - 3.4 * s, x - 0.1 * s, g - 3.6 * s); c.closePath(); c.fill();
      c.fillStyle = red; c.beginPath(); c.moveTo(x + 0.05 * s, g - 3.15 * s); c.quadraticCurveTo(x + W / 2, g - 2.98 * s, x + W - 0.05 * s, g - 3.15 * s); c.lineTo(x + W - 0.05 * s, g - 3.35 * s); c.quadraticCurveTo(x + W / 2, g - 3.15 * s, x + 0.05 * s, g - 3.35 * s); c.closePath(); c.fill();
      // reflejo
      c.globalAlpha = 0.25; R(c, x + 0.55 * s, g - 0.5 * s, 0.28 * s, 0.5 * s, red); R(c, x + W - 0.83 * s, g - 0.5 * s, 0.28 * s, 0.5 * s, red); c.globalAlpha = 1;
    } },
    jp_sakura: { w: 3.8, h: 3.4, d(c, x, g, s, t, r) {
      const W = 3.8 * s;
      // puente rojo
      c.strokeStyle = '#c0392b'; c.lineWidth = Math.max(1.5, s * 0.12); c.beginPath(); c.moveTo(x + 0.2 * s, g); c.quadraticCurveTo(x + 1.0 * s, g - 0.8 * s, x + 1.8 * s, g); c.stroke();
      c.lineWidth = Math.max(1, s * 0.06); c.beginPath(); c.moveTo(x + 0.2 * s, g - 0.3 * s); c.quadraticCurveTo(x + 1.0 * s, g - 1.1 * s, x + 1.8 * s, g - 0.3 * s); c.stroke();
      for (let k = 1; k < 5; k++) { const u = k / 5, bx = x + 0.2 * s + u * 1.6 * s; L(c, bx, g - 0.6 * s * 4 * u * (1 - u) * 0.66 - 0.0, bx, g - 0.3 * s - 0.8 * s * 4 * u * (1 - u) * 0.66, '#c0392b', 0.8); }
      // cerezos
      const tree = (tx, sz) => { c.strokeStyle = '#4a2f22'; c.lineWidth = Math.max(1.2, sz * 0.1); c.beginPath(); c.moveTo(tx, g); c.quadraticCurveTo(tx - sz * 0.1, g - sz * 0.6, tx + sz * 0.05, g - sz * 1.1); c.stroke();
        c.lineWidth = Math.max(1, sz * 0.05); c.beginPath(); c.moveTo(tx, g - sz * 0.7); c.lineTo(tx + sz * 0.45, g - sz * 1.05); c.moveTo(tx, g - sz * 0.8); c.lineTo(tx - sz * 0.4, g - sz * 1.1); c.stroke();
        for (let k = 0; k < 9; k++) O(c, tx + (r() - 0.5) * sz * 0.8, g - sz * (1.0 + r() * 0.55), sz * (0.22 + r() * 0.12), ['#f7b8cf', '#f39ab8', '#fbd3e1'][k % 3]); };
      tree(x + 2.7 * s, 1.9 * s); tree(x + 0.85 * s, 1.4 * s);
      // pétalos cayendo
      for (let k = 0; k < 14; k++) { const ph = (t * 0.15 + k / 14) % 1, px = x + ((k * 0.37) % 1) * W + Math.sin(t + k) * 0.2 * s, py = g - 3.2 * s + ph * 3.2 * s; c.globalAlpha = 1 - ph * 0.6; E(c, px, py, Math.max(1, s * 0.06), Math.max(0.6, s * 0.035), '#fbc7d9'); }
      c.globalAlpha = 1;
    } },

    // ── CHINA ──
    cn_greatwall: { w: 5.0, h: 3.4, d(c, x, g, s, t) {
      const W = 5.0 * s;
      c.fillStyle = '#3f6b3a'; c.beginPath(); c.moveTo(x, g); c.quadraticCurveTo(x + 1.2 * s, g - 2.6 * s, x + 2.5 * s, g - 1.4 * s); c.quadraticCurveTo(x + 3.7 * s, g - 0.3 * s, x + W, g - 2.0 * s); c.lineTo(x + W, g); c.closePath(); c.fill();
      // muralla siguiendo la cresta
      const ridge = (u) => { const px = u * W; if (px < 2.5 * s) { const k = px / (2.5 * s); return g - (2 * (1 - k) * k * 2.6 * s + k * k * 1.4 * s) * 0.92 - 0.0; } const k = (px - 2.5 * s) / (2.5 * s); return g - ((1 - k) * (1 - k) * 1.4 * s + 2 * (1 - k) * k * 0.3 * s + k * k * 2.0 * s) * 0.92; };
      c.fillStyle = '#b5a48a'; c.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50; c.lineTo(x + u * W, ridge(u) - 0.35 * s); } for (let i = 50; i >= 0; i--) { const u = i / 50; c.lineTo(x + u * W, ridge(u)); } c.closePath(); c.fill();
      for (let i = 0; i < 40; i++) { const u = i / 40; if (i % 2) R(c, x + u * W, ridge(u) - 0.5 * s, W / 40, 0.15 * s, '#b5a48a'); }
      // torres de vigía
      for (const u of [0.12, 0.5, 0.88]) { const tx = x + u * W, ty = ridge(u); R(c, tx - 0.3 * s, ty - 1.0 * s, 0.6 * s, 1.0 * s, '#c2b196'); R(c, tx + 0.15 * s, ty - 1.0 * s, 0.15 * s, 1.0 * s, 'rgba(0,0,0,0.15)'); A(c, tx - 0.1 * s, ty - 0.55 * s, 0.2 * s, 0.3 * s, '#3a2f22'); crenel(c, tx - 0.3 * s, ty - 1.0 * s, 0.6 * s, s * 0.5, '#c2b196'); }
    } },
    cn_forbidden: { w: 4.8, h: 3.2, d(c, x, g, s, t, r) {
      const W = 4.8 * s, cx = x + W / 2, red = '#a8231b', gold = '#e0a52a', goldD = '#a87414';
      // terrazas de mármol
      R(c, x, g - 0.3 * s, W, 0.3 * s, '#e6e1d6'); R(c, x + 0.3 * s, g - 0.6 * s, W - 0.6 * s, 0.3 * s, '#efeae0');
      for (let i = 0; i < 24; i++) R(c, x + 0.35 * s + i * (W - 0.7 * s) / 24, g - 0.75 * s, 0.04 * s, 0.15 * s, '#cfc9bc');
      // salón
      R(c, x + 0.6 * s, g - 1.9 * s, W - 1.2 * s, 1.3 * s, red);
      for (let i = 0; i < 9; i++) { const dx = x + 0.75 * s + i * (W - 1.5 * s) / 9; R(c, dx, g - 1.75 * s, (W - 1.5 * s) / 9 * 0.65, 1.15 * s, i === 4 ? K.lit : '#c9852a'); for (let k = 0; k < 3; k++) L(c, dx, g - (1.4 - k * 0.3) * s, dx + (W - 1.5 * s) / 9 * 0.65, g - (1.4 - k * 0.3) * s, '#7a1810', 0.6); }
      R(c, x + 0.6 * s, g - 2.05 * s, W - 1.2 * s, 0.15 * s, '#2a7a6a');
      // doble tejado dorado
      eave(c, cx, g - 2.05 * s, W - 0.1 * s, 0.6 * s, gold, goldD);
      R(c, cx - 1.2 * s, g - 2.95 * s, 2.4 * s, 0.35 * s, red);
      eave(c, cx, g - 2.85 * s, 3.4 * s, 0.4 * s, gold, goldD);
      R(c, cx - 0.9 * s, g - 3.25 * s, 1.8 * s, 0.08 * s, goldD);
    } },
    cn_heaven: { w: 3.0, h: 4.6, d(c, x, g, s, t, r) {
      const cx = x + 1.5 * s, blue = '#2c4f9e', blueD = '#1d3570', red = '#b02a20';
      for (let k = 0; k < 3; k++) { const w = (3.0 - k * 0.35) * s; R(c, cx - w / 2, g - (k + 1) * 0.18 * s, w, 0.18 * s, k % 2 ? '#e6e1d6' : '#f2eee5'); }
      const roofT = (yb, w, h) => { c.fillStyle = blue; c.beginPath(); c.moveTo(cx - w / 2, yb); c.quadraticCurveTo(cx - w * 0.3, yb - h * 0.4, cx, yb - h); c.quadraticCurveTo(cx + w * 0.3, yb - h * 0.4, cx + w / 2, yb); c.closePath(); c.fill();
        c.fillStyle = blueD; c.beginPath(); c.moveTo(cx, yb - h); c.quadraticCurveTo(cx + w * 0.3, yb - h * 0.4, cx + w / 2, yb); c.lineTo(cx + w * 0.1, yb); c.closePath(); c.fill();
        for (let i = -4; i <= 4; i++) L(c, cx + i * w / 10, yb, cx + i * w / 40, yb - h * 0.85, 'rgba(255,255,255,0.15)', 0.6);
        R(c, cx - w / 2, yb, w, 0.07 * s, '#e0a52a'); };
      const body = (yb, w, h) => { R(c, cx - w / 2, yb - h, w, h, red); for (let i = 0; i < 6; i++) R(c, cx - w / 2 + (i + 0.25) * w / 6, yb - h * 0.85, w / 6 * 0.5, h * 0.7, win(r, 0.6)); R(c, cx + w * 0.25, yb - h, w * 0.25, h, 'rgba(0,0,0,0.13)'); R(c, cx - w / 2, yb - h, w, 0.08 * s, '#2a7a6a'); };
      body(g - 0.54 * s, 2.0 * s, 0.9 * s); roofT(g - 1.44 * s, 2.9 * s, 0.7 * s);
      body(g - 1.7 * s, 1.6 * s, 0.55 * s); roofT(g - 2.25 * s, 2.3 * s, 0.6 * s);
      body(g - 2.5 * s, 1.2 * s, 0.45 * s); roofT(g - 2.95 * s, 1.75 * s, 1.15 * s);
      L(c, cx, g - 4.1 * s, cx, g - 4.45 * s, '#e0a52a', Math.max(1, s * 0.08)); O(c, cx, g - 4.5 * s, 0.13 * s, '#e0a52a');
    } },
    cn_lanterns: { w: 3.6, h: 3.6, d(c, x, g, s, t, r) {
      const W = 3.6 * s, red = '#a8231b';
      for (const [hx, hw, hh] of [[0, 1.6, 2.6], [1.9, 1.7, 2.9]]) { const bx = x + hx * s;
        R(c, bx, g - hh * s, hw * s, hh * s, '#e8dcc4'); R(c, bx + hw * s * 0.82, g - hh * s, hw * s * 0.18, hh * s, 'rgba(0,0,0,0.12)');
        R(c, bx + 0.2 * s, g - 1.2 * s, (hw - 0.4) * s, 1.2 * s, red); R(c, bx + 0.35 * s, g - 1.05 * s, (hw - 0.7) * s, 0.9 * s, K.litW);
        for (let i = 0; i < 2; i++) R(c, bx + (0.25 + i * (hw - 0.75)) * s, g - (hh - 0.45) * s, 0.5 * s, 0.6 * s, win(r, 0.7));
        eave(c, bx + hw * s / 2, g - hh * s, (hw + 0.5) * s, 0.5 * s, '#3d3a3f', '#2a272b');
        R(c, bx + hw * s / 2 - 0.15 * s, g - (hh - 0.15) * s, 0.3 * s, 0.45 * s, '#d9261c'); L(c, bx + hw * s / 2, g - (hh - 0.25) * s, bx + hw * s / 2, g - (hh - 0.5) * s, K.gold, 1); }
      // cuerdas con faroles
      for (const [yy, n] of [[2.15, 6], [1.55, 5]]) { c.strokeStyle = '#3a2516'; c.lineWidth = 0.8; c.beginPath(); c.moveTo(x, g - yy * s); c.quadraticCurveTo(x + W / 2, g - (yy - 0.35) * s, x + W, g - yy * s); c.stroke();
        for (let i = 1; i < n; i++) { const u = i / n, lx = x + u * W, ly = g - yy * s + 0.35 * s * 2 * u * (1 - u) * 2 * 0.5 + 0.2 * s; lantern(c, lx, ly, s, t, i + yy); } }
    } },
    cn_bamboo: { w: 3.4, h: 3.8, d(c, x, g, s, t, r) {
      const W = 3.4 * s;
      for (let i = 0; i < 11; i++) { const bx = x + (0.1 + i * 0.31) * s + (r() - 0.5) * 0.1 * s, bh = (2.6 + r() * 1.2) * s, sway = Math.sin(t * 0.8 + i) * 0.08 * s, col = i % 2 ? '#5f9a3c' : '#7ab348';
        c.strokeStyle = col; c.lineWidth = Math.max(1.5, s * 0.11); c.beginPath(); c.moveTo(bx, g); c.quadraticCurveTo(bx, g - bh * 0.6, bx + sway, g - bh); c.stroke();
        for (let k = 1; k < 5; k++) L(c, bx - s * 0.07 + sway * k / 5, g - bh * k / 5, bx + s * 0.07 + sway * k / 5, g - bh * k / 5, '#3f6b28', 1);
        for (let k = 0; k < 3; k++) { const ly = g - bh * (0.55 + k * 0.17), dir = (i + k) % 2 ? 1 : -1; c.fillStyle = '#4c8a34'; c.beginPath(); c.ellipse(bx + sway * 0.7 + dir * 0.22 * s, ly, 0.24 * s, 0.06 * s, dir * 0.4, 0, Math.PI * 2); c.fill(); } }
      // panda sentado comiendo
      const px = x + 1.7 * s, py = g;
      E(c, px, py - 0.5 * s, 0.5 * s, 0.5 * s, '#f6f4ee'); E(c, px - 0.35 * s, py - 0.12 * s, 0.22 * s, 0.13 * s, '#1c1c1c'); E(c, px + 0.35 * s, py - 0.12 * s, 0.22 * s, 0.13 * s, '#1c1c1c');
      E(c, px, py - 0.65 * s, 0.52 * s, 0.17 * s, '#1c1c1c');
      O(c, px, py - 1.15 * s, 0.36 * s, '#f6f4ee'); O(c, px - 0.28 * s, py - 1.45 * s, 0.11 * s, '#1c1c1c'); O(c, px + 0.28 * s, py - 1.45 * s, 0.11 * s, '#1c1c1c');
      E(c, px - 0.13 * s, py - 1.18 * s, 0.09 * s, 0.11 * s, '#1c1c1c'); E(c, px + 0.13 * s, py - 1.18 * s, 0.09 * s, 0.11 * s, '#1c1c1c');
      O(c, px - 0.12 * s, py - 1.19 * s, 0.03 * s, '#fff'); O(c, px + 0.14 * s, py - 1.19 * s, 0.03 * s, '#fff');
      E(c, px, py - 1.03 * s, 0.06 * s, 0.04 * s, '#1c1c1c');
      L(c, px + 0.25 * s, py - 0.55 * s, px + 0.45 * s, py - 1.1 * s, '#7ab348', Math.max(1.2, s * 0.07)); O(c, px + 0.32 * s, py - 0.72 * s, 0.1 * s, '#1c1c1c');
    } },
  });

  Object.assign(CityArt.FLAGS, {
    qatar: (u, v) => { const k = 9, edge = 0.27 + 0.11 * Math.abs(((v * k) % 1) * 2 - 1); return u < edge ? '#ffffff' : '#8a1538'; },
    uae: (u, v) => (u < 0.25 ? '#ef3340' : v < 1 / 3 ? '#00843d' : v < 2 / 3 ? '#ffffff' : '#000000'),
    egypt: (u, v) => { const dx = (u - 0.5) * 1.6, dy = v - 0.5; if (v > 1 / 3 && v < 2 / 3 && dx * dx + dy * dy < 0.006) return '#c09300'; return v < 1 / 3 ? '#ce1126' : v < 2 / 3 ? '#ffffff' : '#000000'; },
    japan: (u, v) => { const dx = (u - 0.5) * 1.5, dy = v - 0.5; return dx * dx + dy * dy < 0.09 ? '#bc002d' : '#ffffff'; },
    china: (u, v) => {
      const star = (cx, cy, rr) => { const dx = (u - cx) * 1.5, dy = v - cy; const d = Math.hypot(dx, dy); if (d > rr) return false; const a = Math.atan2(dy, dx) + Math.PI / 2; const k = Math.cos(Math.PI / 5) / Math.cos(((a % (2 * Math.PI / 5)) + 2 * Math.PI / 5) % (2 * Math.PI / 5) - Math.PI / 5); return d < rr * (0.45 + 0.55 * Math.max(0, k - 0.62) / 0.38); };
      if (star(0.17, 0.27, 0.17) || star(0.33, 0.1, 0.05) || star(0.4, 0.2, 0.05) || star(0.4, 0.35, 0.05) || star(0.33, 0.45, 0.05)) return '#ffde00';
      return '#de2910';
    },
  });
})();
