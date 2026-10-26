// Diagram kit for the REA handbook: three figure patterns used across chapters.
//   DG.seq   swimlane sequence for request and data flows (actors, lifelines, numbered messages, trust zones)
//   DG.graph node diagram for architecture (columns of nodes, orthogonal edges, a boundary around some columns)
//   DG.steps vertical stepper for procedures (phases, done/current states, optional loop note)
// Each renders into a container, redraws as a stacked list below 520px, and shows the picked item's detail below.
(() => {
const W = 680, NS = 'http://www.w3.org/2000/svg', NARROW = 520;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
// rough width of 12px sans text; good enough to keep labels inside the 680 frame
const tw = s => String(s).length * 6.4;
const ARROW = '<defs><marker id="dgA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>';
const svg = (h, body, label) => `<svg class="dg-svg" viewBox="0 0 ${W} ${h}" role="img" aria-label="${esc(label || '')}">${ARROW}${body}</svg>`;
const ctl = (n, play) => `<div class="dg-ctl"><button data-k="prev" aria-label="Bước trước">‹ Trước</button>${play ? '<button data-k="play">▶ Chạy luồng</button>' : ''}<button data-k="next" aria-label="Bước sau">Sau ›</button><span data-k="pos"></span></div>`;

// redraw on width changes; the page wrapper aborts __hbSignal when the reader leaves
function mount(el, draw) {
 let narrow = null;
 const fit = () => {const n = el.clientWidth < NARROW; if (n !== narrow) {narrow = n; draw(n)}};
 const ro = new ResizeObserver(fit); ro.observe(el); fit();
 window.__hbSignal?.addEventListener('abort', () => ro.disconnect());
}

// ---- A: swimlane sequence ----
// cfg: {label, actors: [{label, tone}], zones: [{label, from, to, tone}], msgs: [{from, to, label, back, risk}], detail(m, i), start}
function seq(el, cfg) {
 const A = cfg.actors, M = cfg.msgs, n = A.length;
 let cur = cfg.start ?? -1, timer = null;
 el.classList.add('dg');
 function draw(narrow) {
  if (narrow) {
   el.innerHTML = `<ol class="dg-list">${M.map((m, i) => `<li data-k="${i}"><span class="dg-no${m.risk ? ' risk' : ''}">${i + 1}</span><div><small>${esc(A[m.from].label)} ${m.from === m.to ? '↻' : '→ ' + esc(A[m.to].label)}</small>${esc(m.label)}</div></li>`).join('')}</ol>` + ctl(M.length, true) + '<div class="dg-det" aria-live="polite"></div>';
  } else {
   const zh = cfg.zones?.length ? 26 : 0, top = 12 + zh, lane = (W - 16) / n, x = i => 8 + lane * (i + .5), bw = i => Math.min(lane - 10, Math.max(110, A[i].label.length * 7.4 + 24));
   const y0 = top + 36 + 34, step = 36, h = y0 + M.length * step;
   let b = (cfg.zones || []).map(z => `<rect class="dg-zone${z.tone ? ' ' + z.tone : ''}" x="${x(z.from) - lane / 2 + 3}" y="6" width="${lane * (z.to - z.from + 1) - 6}" height="${h - 2}" rx="10"/><text class="dg-zl" x="${x(z.from) - lane / 2 + 14}" y="23">${esc(z.label)}</text>`).join('');
   b += A.map((a, i) => `<line class="dg-life" x1="${x(i)}" y1="${top + 36}" x2="${x(i)}" y2="${h - 6}"/><g class="dg-actor ${a.tone || ''}"><rect x="${x(i) - bw(i) / 2}" y="${top}" width="${bw(i)}" height="36" rx="7"/><text x="${x(i)}" y="${top + 18}" text-anchor="middle" dominant-baseline="central">${esc(a.label)}</text></g>`).join('');
   b += M.map((m, i) => {
    const y = y0 + i * step, a = x(m.from), c = x(m.to), self = m.from === m.to, r = c > a;
    const line = self ? `<path d="M${a + 2} ${y - 10} h26 v14 h-22" fill="none" marker-end="url(#dgA)"/>` : `<line x1="${a + (r ? 4 : -4)}" y1="${y}" x2="${c + (r ? -7 : 7)}" y2="${y}" marker-end="url(#dgA)"/>`;
    // label sits above the arrow, starting next to the number; it flips to end at the arrow when it would run off the frame
    // number badge at the arrow's left end (left of the lifeline for a self-loop); the label runs right of it,
    // or ends left of it when it would run off the frame
    const nx = self ? a - 14 : Math.min(a, c) + 11, ny = y - (self ? 3 : 11), lx = self ? a + 34 : nx + 11;
    const fits = lx + tw(m.label) < W - 6, tx = fits ? lx : nx - 12;
    return `<g class="dg-msg${m.back ? ' back' : ''}${m.risk ? ' risk' : ''}" data-k="${i}" tabindex="0" role="button" aria-label="${i + 1}. ${esc(m.label)}">${line}<circle cx="${nx}" cy="${ny}" r="8"/><text class="dg-n" x="${nx}" y="${ny}" text-anchor="middle" dominant-baseline="central">${i + 1}</text><text class="dg-ml" x="${tx}" y="${ny}" text-anchor="${fits ? 'start' : 'end'}" dominant-baseline="central">${esc(m.label)}</text></g>`}).join('');
   el.innerHTML = svg(h, b, cfg.label) + ctl(M.length, true) + '<div class="dg-det" aria-live="polite"></div>';
  }
  show(cur)}
 function show(i) {
  cur = i;
  el.querySelectorAll('[data-k]').forEach(g => {if (!/^\d+$/.test(g.dataset.k)) return; const j = +g.dataset.k; g.classList.toggle('dim', i >= 0 && j > i); g.classList.toggle('on', j === i)});
  el.querySelector('[data-k=pos]').textContent = i < 0 ? `${M.length} bước` : `${i + 1}/${M.length}`;
  const m = M[i];
  el.querySelector('.dg-det').innerHTML = i < 0 ? (cfg.hint || 'Bấm “Chạy luồng” hoặc chọn một bước. Nét đứt là chiều trả về; màu cam là điểm rủi ro.') :
   `<div class="dg-dh"><span class="dg-no${m.risk ? ' risk' : ''}">${i + 1}</span><b>${esc(m.label)}</b><small>${esc(A[m.from].label)}${m.from === m.to ? '' : ' → ' + esc(A[m.to].label)}</small></div>${cfg.detail(m, i)}`}
 const stop = () => {clearInterval(timer); timer = null};
 el.addEventListener('click', e => {const t = e.target.closest('[data-k]'); if (!t) return; const k = t.dataset.k;
  if (k === 'play') {stop(); show(0); timer = setInterval(() => cur >= M.length - 1 ? stop() : show(cur + 1), 1400); return}
  stop(); if (k === 'prev') show(Math.max(cur - 1, 0)); else if (k === 'next') show(Math.min(cur + 1, M.length - 1)); else if (/^\d+$/.test(k)) show(+k)});
 el.addEventListener('keydown', e => {const t = e.target.closest('.dg-msg'); if (t && (e.key === 'Enter' || e.key === ' ')) {e.preventDefault(); stop(); show(+t.dataset.k)}});
 window.__hbSignal?.addEventListener('abort', stop);
 mount(el, draw);
}

// ---- B: node diagram ----
// cfg: {label, cols: [[{label, sub, tone}...]...], edges: [[[c, r], [c, r], label, both]], zone: {label, from, to}, detail(node), start: [c, r]}
function graph(el, cfg) {
 const C = cfg.cols;
 let cur = cfg.start || null;
 el.classList.add('dg');
 const key = (c, r) => c + ':' + r;
 function draw(narrow) {
  if (narrow) {
   el.innerHTML = C.map((col, c) => {
    // one dashed box wraps every column of the zone, arrows between them included
    const z = cfg.zone, lbl = cfg.edges.find(e => e[0][0] === c - 1 && e[2])?.[2];
    return (c ? `<div class="dg-down">↓${lbl ? ' ' + esc(lbl) : ''}</div>` : '') + (z && c === z.from ? `<div class="dg-zbox"><small class="dg-zl">${esc(z.label)}</small>` : '') + `<div class="dg-col">${col.map((nd, r) => `<button class="dg-node ${nd.tone || ''}" data-k="${key(c, r)}"><b>${esc(nd.label)}</b>${nd.sub ? `<small>${esc(nd.sub)}</small>` : ''}</button>`).join('')}</div>` + (z && c === z.to ? '</div>' : '')}).join('') + '<div class="dg-det" aria-live="polite"></div>';
  } else {
   // a fan-out label sits before the trunk, so the gap must hold it twice over; a straight edge needs it once
   const need = cfg.edges.filter(e => e[2]).map(([[c1, r1], [c2, r2], l]) => C[c1].length === 1 && C[c2].length === 1 ? tw(l) + 24 : 2 * (tw(l) + 12));
   const gap = Math.min(130, Math.max(C.length > 3 ? 40 : 56, ...need)), pad = 18, top = cfg.zone ? 40 : 14, nh = C.some(col => col.some(n => n.sub)) ? 56 : 44, rg = 14;
   const cw = (W - 2 * pad - gap * (C.length - 1)) / C.length, ch = Math.max(...C.map(col => col.length)) * (nh + rg) - rg;
   const X = c => pad + c * (cw + gap), Y = (c, r) => top + (ch - (C[c].length * (nh + rg) - rg)) / 2 + r * (nh + rg), h = top + ch + 18;
   let b = '';
   if (cfg.zone) {const z = cfg.zone, x0 = X(z.from) - 12, x1 = X(z.to) + cw + 12; b += `<rect class="dg-zone" x="${x0}" y="6" width="${x1 - x0}" height="${h - 10}" rx="12"/><text class="dg-zl" x="${x0 + 12}" y="24">${esc(z.label)}</text>`}
   const labelled = new Set();
   b += cfg.edges.map(([[c1, r1], [c2, r2], lbl, both]) => {
    const xa = X(c1) + cw + 2, ya = Y(c1, r1) + nh / 2, xb = X(c2) - 3, yb = Y(c2, r2) + nh / 2, mx = xa + (xb - xa) / 2;
    const d = ya === yb ? `M${xa} ${ya}H${xb}` : `M${xa} ${ya}H${mx}V${yb}H${xb}`;
    // a fan-out from one node carries its label once
    const showL = lbl && !labelled.has(key(c1, r1) + lbl); if (showL) labelled.add(key(c1, r1) + lbl);
    return `<path class="dg-edge" data-e="${key(c1, r1)} ${key(c2, r2)}" d="${d}" fill="none" marker-end="url(#dgA)"${both ? ' marker-start="url(#dgA)"' : ''}/>` + (showL ? `<text class="dg-el" x="${xa + (Math.min(mx, xb) - xa) / 2}" y="${ya - 7}" text-anchor="middle">${esc(lbl)}</text>` : '')}).join('');
   b += C.map((col, c) => col.map((nd, r) => `<g class="dg-gn ${nd.tone || ''}" data-k="${key(c, r)}" tabindex="0" role="button" aria-label="${esc(nd.label)}"><rect x="${X(c)}" y="${Y(c, r)}" width="${cw}" height="${nh}" rx="8"/><text class="dg-nt" x="${X(c) + cw / 2}" y="${Y(c, r) + (nd.sub ? nh / 2 - 9 : nh / 2)}" text-anchor="middle" dominant-baseline="central">${esc(nd.label)}</text>${nd.sub ? `<text class="dg-ns" x="${X(c) + cw / 2}" y="${Y(c, r) + nh / 2 + 10}" text-anchor="middle" dominant-baseline="central">${esc(nd.sub)}</text>` : ''}</g>`).join('')).join('');
   el.innerHTML = svg(h, b, cfg.label) + '<div class="dg-det" aria-live="polite"></div>';
  }
  show(cur, picked)}
 // the preset node is only highlighted; dimming the rest waits for the reader's own pick
 let picked = false;
 function show(k, user) {
  cur = k; picked = !!user; const id = k && key(...k);
  el.querySelectorAll('[data-k]').forEach(g => {g.classList.toggle('on', g.dataset.k === id); g.classList.toggle('dim', !!user && !!id && g.dataset.k !== id && !cfg.edges.some(e => {const a = key(...e[0]), b = key(...e[1]); return (a === id && b === g.dataset.k) || (b === id && a === g.dataset.k)}))});
  el.querySelectorAll('[data-e]').forEach(p => p.classList.toggle('hot', !!id && p.dataset.e.split(' ').includes(id)));
  el.querySelector('.dg-det').innerHTML = k ? `<div class="dg-dh"><b>${esc(C[k[0]][k[1]].label)}</b>${C[k[0]][k[1]].sub ? `<small>${esc(C[k[0]][k[1]].sub)}</small>` : ''}</div>${cfg.detail(C[k[0]][k[1]], k)}` : (cfg.hint || 'Chọn một khối để xem vai trò của nó và những khối nối trực tiếp.')}
 el.addEventListener('click', e => {const t = e.target.closest('[data-k]'); if (t) show(t.dataset.k.split(':').map(Number), true)});
 el.addEventListener('keydown', e => {const t = e.target.closest('.dg-gn'); if (t && (e.key === 'Enter' || e.key === ' ')) {e.preventDefault(); show(t.dataset.k.split(':').map(Number), true)}});
 mount(el, draw);
}

// ---- C: vertical stepper ----
// cfg: {steps: [{t, sub, group, body}], loop: {at, text}, start, unit}
function steps(el, cfg) {
 const S = cfg.steps, unit = cfg.unit || 'Bước';
 let cur = cfg.start ?? 0;
 el.classList.add('dg');
 function draw() {
  el.innerHTML = `<ol class="dg-steps">${S.map((s, i) => `${s.group ? `<li class="dg-grp" aria-hidden="true">${esc(s.group)}</li>` : ''}<li class="dg-st" data-k="${i}"><button class="dg-dot" aria-label="${unit} ${i + 1}: ${esc(s.t)}"><span>${i + 1}</span></button><div class="dg-sb"><div class="dg-stt">${esc(s.t)}${s.sub ? ` <small>${esc(s.sub)}</small>` : ''}</div><div class="dg-sd"><div>${s.body}</div></div>${cfg.loop?.at === i ? `<div class="dg-loop">↻ ${esc(cfg.loop.text)}</div>` : ''}</div></li>`).join('')}</ol>` + ctl(S.length, false);
  show(cur)}
 function show(i) {
  cur = i;
  el.querySelectorAll('.dg-st').forEach(li => {const j = +li.dataset.k; li.classList.toggle('done', j < i); li.classList.toggle('on', j === i); li.querySelector('.dg-dot span').textContent = j < i ? '✓' : j + 1});
  el.querySelector('[data-k=pos]').textContent = `${unit} ${i + 1}/${S.length}`}
 el.addEventListener('click', e => {
  const t = e.target.closest('[data-k]'); if (!t || e.target.closest('.kw')) return; const k = t.dataset.k;
  if (k === 'prev') show(Math.max(cur - 1, 0)); else if (k === 'next') show(Math.min(cur + 1, S.length - 1)); else if (/^\d+$/.test(k)) show(+k)});
 draw();
}

window.DG = {seq, graph, steps};
})();
