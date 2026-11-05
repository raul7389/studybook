// ═══ PDF → Markdown (en el dispositivo, sin IA) ═══
// PdfToMd.fromPdf(arrayBuffer, {onProgress}) → {md, info}   (usa pdf.js: índice, tamaños de letra)
// PdfToMd.fromText(texto)                    → {md, info}   (texto ya extraído de un PDF)
(function (root) {
  const deacc = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  const normKey = (s) => deacc(s).toLowerCase().replace(/[^a-z0-9ñ]+/g, ' ').trim();
  const letters = (s) => (s.match(/[A-Za-zÀ-ÿÑñ]/g) || []).length;
  const isCaps = (s) => { const L = letters(s); if (L < 4) return false; const up = (s.match(/[A-ZÀ-ÞÑ]/g) || []).length; return up / L >= 0.85; };
  const isPageNum = (s) => /^\s*(p[aá]g(ina)?\.?\s*)?[-–—]?\s*\d{1,4}\s*[-–—]?\s*$/i.test(s) || /^\s*\d{1,4}\s*(\/|de|of)\s*\d{1,4}\s*$/i.test(s);
  const isJunk = (s) => /^[\s\-–—_*•·.~=|]+$/.test(s) && s.trim().length > 0;
  const isTocTitle = (s) => /^\s*(table of contents|contents|índice|indice|índice general|contenido|tabla de contenidos?|sumario)\s*$/i.test(s);
  const endsSentence = (s) => /[.!?…:;”»"')\]]\s*$/.test(s);
  const isListItem = (s) => /^\s*([•●▪◦\-–—*]|\d{1,2}[º°.)]\)?|\(?[a-z]\))\s+/i.test(s);
  const median = (a) => { if (!a.length) return 0; const b = [...a].sort((x, y) => x - y); return b[Math.floor(b.length / 2)]; };

  // ── núcleo: pages = [{ lines: [{ text, size? }] }], outline = [{ title, page }] ──
  function structure(pages, opts = {}) {
    const info = { pages: pages.length, removed: 0, headings: 0, source: 'none', toc: 0, warnings: [] };
    // 1) limpiar caracteres raros y líneas basura / números de página
    pages.forEach((p) => {
      p.lines = p.lines.map((l) => ({ ...l, text: String(l.text).replace(/[\u0002­​]/g, '').replace(/\s+/g, ' ').trim() }))
        .filter((l) => { if (!l.text) return false; if (isPageNum(l.text) || isJunk(l.text)) { info.removed++; return false; } return true; });
    });
    // 2) encabezados y pies repetidos (mismo texto arriba/abajo en muchas páginas)
    if (pages.length >= 6) {
      const cnt = new Map(), key = (t) => normKey(t).replace(/\d+/g, '#');
      pages.forEach((p) => { const edge = [...p.lines.slice(0, 2), ...p.lines.slice(-2)]; new Set(edge.map((l) => key(l.text))).forEach((k) => k && cnt.set(k, (cnt.get(k) || 0) + 1)); });
      const rep = new Set([...cnt].filter(([k, n]) => n >= Math.max(3, pages.length * 0.25) && k.length < 90).map(([k]) => k));
      if (rep.size) pages.forEach((p) => { const n = p.lines.length; p.lines = p.lines.filter((l, i) => { const edge = i < 2 || i >= n - 2; if (edge && rep.has(key(l.text))) { info.removed++; return false; } return true; }); });
    }
    // 3) índice (tabla de contenidos) al inicio
    let tocStr = '', tocEnd = { page: -1, line: -1 };
    const lim = Math.max(3, Math.ceil(pages.length * 0.15));
    outer: for (let pi = 0; pi < Math.min(lim, pages.length); pi++) {
      const ls = pages[pi].lines;
      for (let li = 0; li < ls.length; li++) {
        if (!isTocTitle(ls[li].text)) continue;
        const parts = []; let p2 = pi, l2 = li + 1;
        for (; p2 < pages.length; p2++, l2 = 0) {
          const pl = pages[p2].lines; let prose = 0;
          for (; l2 < pl.length; l2++) {
            const t = pl[l2].text;
            if (t.length > 70 && /[a-záéíóúñ]{3}/.test(t) && !isCaps(t)) { if (++prose >= 2) break; continue; }
            parts.push(t.replace(/\.{3,}\s*\d+\s*$|\s+\d{1,4}\s*$/, ''));
          }
          if (prose >= 2) break;
        }
        tocStr = ' ' + parts.map(normKey).join(' ') + ' ';
        tocEnd = { page: pi, line: li, endPage: p2 };
        info.toc = parts.length;
        // quitar el índice del cuerpo
        for (let pp = pi; pp < Math.min(p2, pages.length); pp++) pages[pp].lines = pp === pi ? pages[pp].lines.slice(0, li) : [];
        break outer;
      }
    }
    // 4) tamaño de letra típico (solo PDF real)
    const sizes = []; pages.forEach((p) => p.lines.forEach((l) => l.size && l.text.length > 30 && sizes.push(l.size)));
    const body = median(sizes);
    // 5) títulos candidatos
    const outlineKeys = (opts.outline || []).map((o) => ({ ...o, k: normKey(o.title) })).filter((o) => o.k);
    const flat = []; pages.forEach((p, pi) => p.lines.forEach((l) => flat.push({ ...l, page: pi })));
    const lens = flat.map((l) => l.text.length).filter((n) => n > 25); const lineW = median(lens) || 70;
    const cand = (l) => {
      if (l.text.length > 110) return false;
      if (body && l.size && l.size >= body * 1.18 && letters(l.text) >= 3) return 'font';
      if (isCaps(l.text) && l.text.length <= 90) return 'caps';
      return false;
    };
    const fontHeads = body ? flat.filter((l) => l.size && l.size >= body * 1.18 && l.text.length <= 110 && letters(l.text) >= 3).length : 0;
    const useFont = fontHeads >= 3; // si hay títulos con letra grande, solo se fía del tamaño
    const out = []; // bloques: {h:'texto'} | {p:'texto'} | {li:'texto'}
    let para = '', prevLine = null;
    const flush = () => { if (para.trim()) out.push({ p: para.trim() }); para = ''; };
    for (let i = 0; i < flat.length; i++) {
      const l = flat[i], kind = cand(l);
      if (kind) {
        // juntar títulos partidos en varias líneas (solo dentro de la misma página)
        let j = i;
        while (j + 1 < flat.length && j - i < 3 && flat[j + 1].page === l.page && cand(flat[j + 1]) === kind && flat[j + 1].text.length < 90 && !endsSentence(flat[j].text)) j++;
        const midSentence = prevLine && prevLine.page === l.page && !endsSentence(prevLine.text);
        const accept = (txt) => {
          const k = normKey(txt);
          if (outlineKeys.length) return outlineKeys.some((o) => o.k === k || (k.length > 6 && (o.k.includes(k) || k.includes(o.k))));
          if (tocStr) return k.length >= 4 && tocStr.includes(' ' + k + ' ');
          if (useFont) return kind === 'font';
          return txt.length <= 70 && !/[,;]$/.test(txt);
        };
        let hit = -1;
        if (!midSentence) for (let e = j; e >= i; e--) { const txt = flat.slice(i, e + 1).map((x) => x.text).join(' '); if (accept(txt)) { hit = e; break; } }
        if (hit >= 0) {
          const txt = flat.slice(i, hit + 1).map((x) => x.text).join(' ');
          flush(); out.push({ h: txt.replace(/\s*[:.]$/, ''), page: l.page }); info.headings++; i = hit; prevLine = null; continue;
        }
      }
      // 6) párrafos: unir líneas cortadas
      if (isListItem(l.text)) { flush(); out.push({ li: l.text.replace(/^\s*[•●▪◦*]\s*/, '') }); prevLine = l; continue; }
      if (para) {
        const prev = prevLine ? prevLine.text : '';
        const shortPrev = prev.length < lineW * 0.6;
        if (endsSentence(prev) && (shortPrev || /^[«“"¿¡\-–—A-ZÁÉÍÓÚÑ0-9]/.test(l.text) && shortPrev)) flush();
        else if (endsSentence(prev) && /^[«“"¿¡—–-]/.test(l.text)) flush();
      }
      if (para && /[A-Za-zÀ-ÿ]-$/.test(para) && /^[a-záéíóúñ]/.test(l.text)) para = para.slice(0, -1) + l.text;
      else para += (para ? ' ' : '') + l.text;
      prevLine = l;
    }
    flush();
    // 7) índice del PDF: si hay capítulos del índice que no se encontraron en el texto, insertarlos por página
    if (outlineKeys.length) {
      info.source = 'outline';
      const found = new Set(out.filter((b) => b.h).map((b) => normKey(b.h)));
      outlineKeys.filter((o) => !found.has(o.k) && o.page != null).forEach((o) => {
        let idx = out.findIndex((b) => b.page != null && b.page >= o.page);
        if (idx < 0) idx = out.length;
        out.splice(idx, 0, { h: o.title, page: o.page }); info.headings++;
      });
    } else info.source = tocStr ? 'toc' : body ? 'font' : info.headings ? 'caps' : 'none';
    // páginas de cada bloque de párrafo (para insertar por página arriba): aproximación
    const md = (opts.title ? `# ${opts.title}\n\n` : '') + out.map((b) => (b.h ? `## ${b.h}` : b.li ? `- ${b.li}` : b.p)).join('\n\n') + '\n';
    info.words = md.split(/\s+/).filter(Boolean).length;
    if (info.words < pages.length * 15) info.warnings.push('Muy poco texto: puede ser un PDF escaneado (imágenes). Usa tu conversor con OCR.');
    if (!info.headings) info.warnings.push('No se encontraron títulos; se dividirá en partes por tamaño.');
    return { md, info };
  }

  // ── texto ya extraído (páginas separadas por números de página o \f) ──
  function fromText(text, opts = {}) {
    const raw = String(text).replace(/\r\n?/g, '\n');
    const pages = []; let cur = [];
    const lines = raw.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i];
      if (t.includes('\f')) { t.split('\f').forEach((part, k) => { if (k) { pages.push({ lines: cur }); cur = []; } if (part.trim()) cur.push({ text: part }); }); continue; }
      if (isPageNum(t) && (i + 1 >= lines.length || !lines[i + 1].trim())) { pages.push({ lines: cur }); cur = []; continue; }
      if (t.trim()) cur.push({ text: t });
    }
    if (cur.length) pages.push({ lines: cur });
    return structure(pages.filter((p) => p.lines.length), opts);
  }
  const looksLikePdfText = (text) => (String(text).match(/\n\s*\d{1,4}\s*\n\s*\n/g) || []).length >= 5 || String(text).includes('\f');

  // ── PDF real con pdf.js ──
  async function fromPdf(data, opts = {}) {
    const lib = opts.pdfjs || root.pdfjsLib;
    const pdf = await lib.getDocument({ data }).promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const pg = await pdf.getPage(i);
      const tc = await pg.getTextContent();
      // agrupar fragmentos en líneas por su altura en la página
      const rows = [];
      tc.items.forEach((it) => {
        if (!it.str || !it.str.trim()) { if (it.hasEOL && rows.length) rows[rows.length - 1].eol = true; return; }
        const y = it.transform[5], x = it.transform[4], size = Math.hypot(it.transform[2], it.transform[3]) || Math.abs(it.transform[3]) || it.height || 0;
        let r = rows.find((r) => Math.abs(r.y - y) <= Math.max(2, size * 0.4));
        if (!r) { r = { y, items: [] }; rows.push(r); }
        r.items.push({ x, str: it.str, size, w: it.width || 0 });
      });
      rows.sort((a, b) => b.y - a.y);
      const lines = rows.map((r) => {
        r.items.sort((a, b) => a.x - b.x);
        let s = '', lastEnd = null;
        r.items.forEach((it) => { if (lastEnd != null && it.x - lastEnd > it.size * 0.2 && !/\s$/.test(s) && !/^\s/.test(it.str)) s += ' '; s += it.str; lastEnd = it.x + it.w; });
        return { text: s, size: Math.max(...r.items.map((i) => i.size)) };
      });
      pages.push({ lines });
      if (opts.onProgress) opts.onProgress(i / pdf.numPages);
    }
    // índice del PDF (marcadores)
    let outline = [];
    try {
      const ol = await pdf.getOutline();
      const walk = async (items, depth) => { for (const it of items || []) {
        let page = null;
        try { const dest = typeof it.dest === 'string' ? await pdf.getDestination(it.dest) : it.dest; if (dest && dest[0]) page = await pdf.getPageIndex(dest[0]); } catch (e) {}
        if (it.title && depth <= 1) outline.push({ title: it.title.trim(), page, depth });
        if (depth < 1) await walk(it.items, depth + 1);
      } };
      await walk(ol, 0);
      // si hay muchos de primer nivel, usar solo esos
      const top = outline.filter((o) => o.depth === 0);
      if (top.length >= 3) outline = top;
      if (outline.length < 3) outline = [];
    } catch (e) { outline = []; }
    let title = opts.title;
    try { const meta = await pdf.getMetadata(); if (!title && meta && meta.info && meta.info.Title && meta.info.Title.length > 3) title = meta.info.Title.trim(); } catch (e) {}
    return structure(pages, { ...opts, title, outline });
  }

  const api = { fromPdf, fromText, structure, looksLikePdfText };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.PdfToMd = api;
})(typeof window !== 'undefined' ? window : globalThis);
