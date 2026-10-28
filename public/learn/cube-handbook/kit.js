// Chapter engine for the Cube handbook mockup: TOC, study card (D), tools (T1), keywords (H4), self-check (Q1).
// The page sets window.CH = {key, sections, terms, alias, rel, quiz, next} before loading this file.
(() => {
const {key, sections: SEC, terms: TERMS, alias: ALIAS, rel: REL, quiz: QB} = window.CH;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const store = {get(k, d) {try {return JSON.parse(localStorage.getItem(k)) ?? d} catch {return d}}, set(k, v) {try {localStorage.setItem(k, JSON.stringify(v))} catch {}}};
const ICON = {
 mark: '<svg viewBox="0 0 16 16"><path d="M9.6 2.4l4 4-6.2 6.2H3.4v-4z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M2 14.6h12" stroke="currentColor" stroke-width="1.3"/></svg>',
 sun: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M3.4 12.6l1.3-1.3M11.3 4.7l1.3-1.3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
 moon: '<svg viewBox="0 0 16 16"><path d="M13.4 9.8A5.6 5.6 0 0 1 6.2 2.6a5.6 5.6 0 1 0 7.2 7.2z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
 hex: '<svg viewBox="-60 -60 120 120"><g fill="none" stroke="currentColor" stroke-width="5"><path d="M0-50L43-25V25L0 50L-43 25V-25Z"/><path d="M-43-25L0 0 43-25M0 0V50"/></g></svg>'};
const art = $('article'), card = $('#card');

// ---- T1 tools: highlight on/off (the site toggle owns light/dark) ----
let kwOn = store.get('kw', true);
// the page wrapper aborts this signal when the reader leaves, so global listeners and body changes go away with it
const sig = window.__hbSignal;
// handbook styles are scoped to the .hb wrapper, so its classes and floating parts live there, not on <body>
const root = art.closest('.hb') || document.body;
function tools() {
 root.classList.toggle('kw-off', !kwOn);
 $$('[data-tool=kw]').forEach(b => {b.innerHTML = ICON.mark; b.setAttribute('aria-pressed', kwOn); b.dataset.tip = kwOn ? 'Tắt tô sáng thuật ngữ' : 'Bật tô sáng thuật ngữ'}); 
 store.set('kw', kwOn)}

// ---- table of contents ----
const qOf = i => QB.filter(q => q.s === i), done = l => l.filter(q => ANS[q.id]).length;
function toc() {
 $$('[data-toc]').forEach(ul => ul.innerHTML = SEC.map((s, i) => {const l = qOf(i);
  return `<li><a href="#${s.id}" data-sec="${i}"><span><b>${s.n}</b>${s.t}</span>${l.length ? `<i title="Câu tự kiểm tra đã làm">${done(l)}/${l.length}</i>` : ''}</a></li>`}).join(''));
 const all = QB.length, ok = QB.filter(q => ANS[q.id]?.ok).length;
 $$('[data-stat]').forEach(el => el.innerHTML = `${SEC.length} mục · ${window.CH.minutes} phút đọc<br>Tự kiểm tra: ${ok}/${all} câu đúng`)}

// ---- keywords (H4): first use of each glossary term per paragraph becomes clickable ----
const A2T = new Map(Object.entries(ALIAS).flatMap(([k, a]) => a.map(x => [x.toLowerCase(), k])));
// a hyphen on either side means a package or tool name (rea-agents, ida-pro-mcp), not the term
const KW = new RegExp(`(?<![\\p{L}\\d_.-])(${[...A2T.keys()].sort((a, b) => b.length - a.length).map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\d_-])`, 'giu');
function mark(block) {
 const seen = new Set(), w = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {acceptNode: n => n.parentElement.closest('code,.kw,button,pre') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT}), nodes = [];
 while (w.nextNode()) nodes.push(w.currentNode);
 nodes.forEach(n => {const s = n.nodeValue; let last = 0, frag = null, m; KW.lastIndex = 0;
  while ((m = KW.exec(s))) {const k = A2T.get(m[1].toLowerCase()); if (seen.has(k)) continue; seen.add(k);
   frag ??= document.createDocumentFragment(); frag.append(s.slice(last, m.index));
   const sp = document.createElement('span'); Object.assign(sp, {className: 'kw', tabIndex: 0, textContent: m[1]}); sp.dataset.t = k;
   sp.setAttribute('role', 'button'); sp.setAttribute('aria-label', m[1] + ': xem giải thích'); frag.append(sp); last = m.index + m[1].length}
  if (frag) {frag.append(s.slice(last)); n.replaceWith(frag)}})}
art.querySelectorAll('.dek,.idea,.gist,section > p,.take,section li,details.deep p').forEach(mark);
const kpop = $('#kpop'); let kOpen = null;
// a term is [name, academic definition, plain-language "cabin interpreter" version]; names stay in English
const explain = k => `<div class="xp"><small>Học thuật</small><p>${TERMS[k][1]}</p></div>` + (TERMS[k][2] ? `<div class="xp easy"><small>Dễ hiểu</small><p>${TERMS[k][2]}</p></div>` : '');
const occ = k => [...art.querySelectorAll(`.kw[data-t="${k}"]`)];
const lit = k => $$('[data-t]').forEach(x => x.classList.toggle('lit', !!k && x.dataset.t === k));
function openKw(el) {
 const k = el.dataset.t, all = occ(k), i = all.indexOf(el); kOpen = el;
 $$('.kw.on').forEach(x => x.classList.remove('on')); el.classList.add('on'); lit(k);
 kpop.innerHTML = `<div class="kh"><b>${TERMS[k][0]}</b><span>thuật ngữ</span><button class="kx" aria-label="Đóng">×</button></div>${explain(k)}` +
  (REL[k]?.length ? `<div class="kr">Liên quan ${REL[k].map(r => `<button data-go="${r}">${TERMS[r][0]}</button>`).join('')}</div>` : '') +
  `<div class="kn"><span>Xuất hiện ${all.length} lần trong chương</span>${all.length > 1 ? `<span><button data-step="-1" aria-label="Lần trước">‹</button>${i + 1}/${all.length}<button data-step="1" aria-label="Lần sau">›</button></span>` : ''}</div>`;
 kpop.hidden = false;
 const r = el.getBoundingClientRect(), W = document.documentElement.clientWidth, h = kpop.offsetHeight;
 kpop.style.left = Math.min(Math.max(12, r.left - 16), W - kpop.offsetWidth - 12) + scrollX + 'px';
 kpop.style.top = (r.bottom + h + 12 < innerHeight ? r.bottom + 8 : r.top - h - 8) + scrollY + 'px'}
function closeKw() {kpop.hidden = true; kOpen = null; $$('.kw.on').forEach(x => x.classList.remove('on')); lit(null)}
function goKw(el) {el.scrollIntoView({block: 'center'}); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); openKw(el)}
function goTerm(k) {const all = occ(k); if (all.length) goKw(all.find(x => x.getBoundingClientRect().top > innerHeight * .5) || all[0])}

// ---- Q1 self-check: one or several correct answers, feedback links back to the section ----
const ANS = store.get('ans:' + key, {}), SEL = {}, QI = {};
const tag = q => q.type === 'multi' ? 'Chọn nhiều đáp án' : 'Một đáp án';
const same = (a, b) => a.length === b.length && a.every(x => b.includes(x));
function qHTML(q) {
 const st = ANS[q.id], multi = q.type === 'multi', right = [].concat(q.a), sel = st ? [].concat(st.v) : (SEL[q.id] || []);
 let h = `<span class="qt">${tag(q)}</span>${q.id.startsWith('nb') ? '<span class="qsrc" title="Câu hỏi do Gemini Notebook tạo bằng AI từ cùng bộ nguồn, đã biên tập lại">nguồn: Gemini Notebook</span>' : ''}<p class="qq">${q.q}</p><div class="qo${multi ? ' multi' : ''}">` + q.o.map((o, j) => {
  const c = !st ? (sel.includes(j) ? 'sel' : '') : right.includes(j) ? (sel.includes(j) ? 'right' : 'right miss') : sel.includes(j) ? 'wrong' : '';
  return `<button data-qid="${q.id}" data-v="${j}" class="${c}" ${st ? 'disabled' : ''}><span>${'ABCDE'[j]}</span>${o}</button>`}).join('') + '</div>';
 if (multi && !st) h += `<div class="qact"><button class="pri" data-qcheck="${q.id}" ${sel.length ? '' : 'disabled'}>Kiểm tra</button></div>`;
 if (st) {const wrongPick = sel.find(j => !right.includes(j)), s = SEC[q.s];
  h += `<div class="qf ${st.ok ? 'ok' : 'no'}"><b>${st.ok ? 'Chính xác.' : multi ? `Đúng ${sel.filter(j => right.includes(j)).length}/${right.length} ý.` : 'Chưa đúng.'}</b> ${q.ex}` +
   (wrongPick != null && q.why?.[wrongPick] ? `<em>Vì sao ${'ABCDE'[wrongPick]} sai: ${q.why[wrongPick]}</em>` : '') +
   ` <a href="#${s.id}">Đọc lại ${s.n} →</a></div>`}
 return h}
function stepper(hk, list) {
 const n = list.length, i = QI[hk] = Math.min(QI[hk] ?? Math.max(0, list.findIndex(q => !ANS[q.id])), n - 1);
 return `<div class="qstep"><div class="qdots">${list.map((q, j) => `<button data-qgo="${hk}:${j}" class="${j === i ? 'cur ' : ''}${ANS[q.id] ? (ANS[q.id].ok ? 'ok' : 'no') : ''}" aria-label="Câu ${j + 1}"></button>`).join('')}</div><span>Câu ${i + 1}/${n}</span></div>` +
  qHTML(list[i]) + (n > 1 ? `<div class="qnav"><button data-qgo="${hk}:${i - 1}" ${i ? '' : 'disabled'}>‹ Trước</button><button data-qgo="${hk}:${i + 1}" ${i < n - 1 ? '' : 'disabled'}>Sau ›</button></div>` : '')}
// narrow screens: the card is hidden, so the same set sits at the end of each section
const inline = SEC.map((s, i) => {if (!qOf(i).length) return null; const d = document.createElement('div'); d.className = 'qinline'; document.getElementById(s.id).appendChild(d); return d});

// ---- D card: Tóm tắt / Thuật ngữ / Tự kiểm tra for the section being read ----
let tab = 'sum', cur = -1;
function renderCard() {
 const i = Math.max(cur, 0), s = SEC[i], l = qOf(i), left = l.length - done(l), nx = SEC[i + 1] || window.CH.next;
 const body = tab === 'sum' ? `<ul>${s.sum.map(x => `<li>${x}</li>`).join('')}</ul>`
  : tab === 'terms' ? `<dl class="dl">${s.terms.map(k => `<dt data-t="${k}">${TERMS[k][0]}</dt><dd>${explain(k)}</dd>`).join('')}</dl>`
  : l.length ? `<div class="qscore">${l.filter(q => ANS[q.id]?.ok).length}/${l.length} câu đúng ở mục này</div>` + stepper('card' + i, l) : '<p class="qnote" style="margin:0">Mục này không có câu hỏi.</p>';
 card.innerHTML = `<div class="hd"><span class="label" style="margin:0">Mục ${s.n}</span><i>${ICON.hex}</i></div><h4>${s.t}</h4>` +
  `<div class="ctabs">${[['sum', 'Tóm tắt'], ['terms', 'Thuật ngữ'], ['quiz', 'Tự kiểm tra']].map(([k, v]) => `<button data-tab="${k}" class="${k === tab ? 'on' : ''}">${v}${k === 'quiz' && left ? `<sup>${left}</sup>` : ''}</button>`).join('')}</div>` +
  body + (nx ? `<a class="next" href="${nx.href || '#' + nx.id}">Tiếp: ${nx.n} ${nx.t} →</a>` : '');
 inline.forEach((d, j) => d && (d.innerHTML = `<span class="label">Tự kiểm tra · ${SEC[j].n}</span>` + stepper('in' + j, qOf(j))));
 fitCube()}
function refresh() {store.set('ans:' + key, ANS); toc(); renderCard(); onScroll()}

// ---- reading progress, active section, cube ----
const prog = $('#prog'), w2 = $('.wire svg');
function fitCube() {if (!w2) return; const b = card.getBoundingClientRect().bottom + 28; w2.style.top = b + 'px'; w2.style.visibility = b + parseFloat(getComputedStyle(w2).height) < innerHeight - 16 ? 'visible' : 'hidden'}
function onScroll() {
 const h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
 let on = -1; SEC.forEach((s, i) => {if (document.getElementById(s.id).getBoundingClientRect().top < innerHeight * .4) on = i});
 $$('[data-sec]').forEach(a => a.classList.toggle('on', +a.dataset.sec === on));
 if (on !== cur) {cur = on; renderCard()}
 if (w2) w2.style.transform = `rotate(${-scrollY * .08}deg)`}

// ---- events ----
document.addEventListener('click', e => {
 const t = e.target, b = t.closest('[data-tool],[data-tab],[data-v],[data-qcheck],[data-qgo]');
 if (b) {const d = b.dataset;
  if (d.tool === 'kw') {kwOn = !kwOn; closeKw()}   else if (d.tab) tab = d.tab;
  else if (d.v != null) {const q = QB.find(x => x.id === d.qid), j = +d.v;
   if (q.type === 'multi') {const s = SEL[q.id] ??= []; s.includes(j) ? s.splice(s.indexOf(j), 1) : s.push(j)}
   else ANS[q.id] = {v: j, ok: j === q.a}}
  else if (d.qcheck) {const q = QB.find(x => x.id === d.qcheck); ANS[q.id] = {v: SEL[q.id], ok: same(SEL[q.id], q.a)}}
  else if (d.qgo) {const [k, j] = d.qgo.split(':'); QI[k] = +j}
  tools(); refresh(); return}
 const kw = t.closest('.kw'); if (kw) {e.preventDefault(); kw === kOpen ? closeKw() : openKw(kw); return}
 if (t.closest('.kx')) return closeKw();
 const st = t.closest('[data-step]'); if (st && kOpen) {const all = occ(kOpen.dataset.t); goKw(all[(all.indexOf(kOpen) + +st.dataset.step + all.length) % all.length]); return}
 const go = t.closest('[data-go]'); if (go) return goTerm(go.dataset.go);
 const side = t.closest('.card [data-t]'); if (side) return goTerm(side.dataset.t);
 if (kOpen && !t.closest('#kpop')) closeKw()}, {signal: sig});
document.addEventListener('keydown', e => {if (e.key === 'Escape') closeKw(); if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('kw')) {e.preventDefault(); openKw(e.target)}}, {signal: sig});
document.addEventListener('mouseover', e => {if (kOpen) return; lit(e.target.closest('.card [data-t],.kw')?.dataset.t)}, {signal: sig});
// ---- media per section: a slice of the overview audio + clips of Cube's workshop video ----
// Add ?map=1 to the URL to set audio start/end for each section; marks are kept in localStorage and exported as JSON.
const M = window.MEDIA, mapMode = new URLSearchParams(location.search).has('map');
if (M) {
 const AM = Object.assign({}, M.audio.marks, store.get('amap', {}));
 const au = new Audio(M.audio.src); au.preload = 'metadata';
 let seg = null;
 const fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '–:––';
 const PLAY = '<svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" fill="currentColor"/></svg>', PAUSE = '<svg viewBox="0 0 16 16"><path d="M3 2h4v12H3zM9 2h4v12H9z" fill="currentColor"/></svg>';
 const HEAD = '<svg viewBox="0 0 16 16"><path d="M2.5 10V8a5.5 5.5 0 0 1 11 0v2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="2" y="9.5" width="3" height="4.5" rx="1" fill="currentColor"/><rect x="11" y="9.5" width="3" height="4.5" rx="1" fill="currentColor"/></svg>';
 const FILM = '<svg viewBox="0 0 16 16"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 6v4l3.5-2z" fill="currentColor"/></svg>';
 const dock = document.createElement('div'); dock.className = 'mdock';
 dock.innerHTML = '<button class="pp" data-m="pp" aria-label="Phát"></button><div class="mt"><div class="ttl"></div><div class="bar"><b></b></div></div><button class="x" data-m="close" aria-label="Đóng">×</button>';
 root.appendChild(dock);
 sig?.addEventListener('abort', () => {au.pause(); dock.remove(); panel?.remove()});
 function dockUI() {
  dock.querySelector('.pp').innerHTML = au.paused ? PLAY : PAUSE;
  const s = seg && SEC.find(x => x.n === seg.n), a = seg ? seg.at : 0, b = seg ? seg.end : au.duration;
  dock.querySelector('.ttl').innerHTML = `<span class="t">${s ? s.n + ' · ' + s.t : M.audio.title}</span><span>audio AI · ${fmt(au.currentTime)} / ${seg ? fmt(seg.end) : fmt(au.duration)}</span>`;
  dock.querySelector('.bar b').style.width = Math.min(100, Math.max(0, (au.currentTime - a) / (b - a) * 100)) + '%';
  $$('[data-m=aud]').forEach(x => x.classList.toggle('on', !au.paused && seg?.n === x.dataset.n))}
 // sit just above whatever the site pins to the bottom of the screen (its toolbar, toasts)
 // shortcut: only looks at Tailwind `fixed` elements, which is how the site pins them; widen if that changes
 function placeDock() {
  let h = 0;
  document.querySelectorAll('[class*="fixed"]').forEach(e => {
   if (root.contains(e)) return; const r = e.getBoundingClientRect();
   if (r.height && r.height < innerHeight / 3 && r.bottom > innerHeight - 24 && r.top > innerHeight / 2) h = Math.max(h, innerHeight - r.top)});
  dock.style.bottom = h + 12 + 'px'}
 function playSeg(n) {const m = AM[n]; if (!m) return; seg = {n, at: m[0], end: m[1]}; au.currentTime = m[0]; au.play().catch(() => dockUI()); placeDock(); dock.classList.add('show'); closeYT()}
 addEventListener('resize', placeDock, {signal: sig});
 au.addEventListener('timeupdate', () => {if (seg && !mapMode && au.currentTime >= seg.end) au.pause(); dockUI(); if (mapMode) panelUI()});
 ['play', 'pause', 'loadedmetadata'].forEach(ev => au.addEventListener(ev, () => {dockUI(); if (mapMode) panelUI()}));
 function rows() {
  SEC.forEach(s => {const sec = document.getElementById(s.id); let r = sec.querySelector('.mrow');
   if (!r) {r = document.createElement('div'); r.className = 'mrow'; (sec.querySelector('.gist') || sec.querySelector('h2')).after(r)}
   const a = AM[s.n], clips = M.demo[s.n] || [];
   r.innerHTML = (a ? `<button class="mchip" data-m="aud" data-n="${s.n}">${HEAD}Nghe đoạn này <span title="Audio tổng quan do Gemini Notebook tạo bằng AI">${fmt(a[0])}–${fmt(a[1])}</span></button>` : '') +
    clips.map((c, i) => `<button class="mchip" data-m="yt" data-n="${s.n}" data-i="${i}">${FILM}Xem demo <span>${fmt(c[0])}</span>${c[2]}</button>`).join('') +
    (mapMode ? `<span class="mmap"><button data-m="set0" data-n="${s.n}">Đặt đầu</button><button data-m="set1" data-n="${s.n}">Đặt cuối</button>${a ? `<button data-m="clr" data-n="${s.n}">Xóa</button>` : ''}<em>${a ? fmt(a[0]) + '–' + fmt(a[1]) : 'chưa gán audio'}</em></span>` : '');
   r.hidden = !r.innerHTML}); dockUI()}
 function closeYT() {$$('.yt-box').forEach(b => b.remove()); $$('[data-m=yt]').forEach(x => x.classList.remove('on'))}
 function openYT(btn) {
  const was = btn.classList.contains('on'); closeYT(); if (was) return;
  const c = M.demo[btn.dataset.n][+btn.dataset.i], box = document.createElement('div'); box.className = 'yt-box';
  box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${M.yt.id}?start=${c[0]}&end=${c[1]}&autoplay=1&rel=0" title="${c[2]}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>` +
   `<p class="note">${fmt(c[0])}–${fmt(c[1])} ${M.yt.note} <a href="https://www.youtube.com/watch?v=${M.yt.id}&t=${c[0]}s" target="_blank" rel="noopener">Mở trên YouTube ↗</a></p>`;
  btn.closest('.mrow').after(box); btn.classList.add('on'); au.pause()}
 // mapping tool: play the overview, stop where a section starts or ends, press the button on that section
 let panel = null;
 function panelUI() {if (!panel) return; panel.querySelector('[data-m=ppm]').innerHTML = au.paused ? PLAY : PAUSE;
  panel.querySelector('.now').textContent = `${fmt(au.currentTime)} / ${fmt(au.duration)}`; panel.querySelector('input').value = au.currentTime / (au.duration || 1) * 1000}
 if (mapMode) {
  panel = document.createElement('div'); panel.className = 'mpanel';
  panel.innerHTML = `<span class="label">Gán mốc audio</span><div class="mp-row"><button class="pp" data-m="ppm"></button><button data-m="back">−5s</button><button data-m="fwd">+5s</button><span class="now"></span></div><input type="range" min="0" max="1000" value="0" aria-label="Vị trí audio">` +
   `<p>Phát audio, dừng ở chỗ một mục bắt đầu hoặc kết thúc, rồi bấm “Đặt đầu” hoặc “Đặt cuối” ngay dưới tiêu đề mục đó.</p><div class="mp-row"><button data-m="export">Copy JSON</button><button data-m="reset">Xóa hết</button></div>`;
  root.appendChild(panel);
  panel.querySelector('input').oninput = e => {if (au.duration) au.currentTime = e.target.value / 1000 * au.duration}}
 document.addEventListener('click', e => {const b = e.target.closest('[data-m]'); if (!b) return; const n = b.dataset.n, t = Math.round(au.currentTime);
  switch (b.dataset.m) {
   case 'aud': seg?.n === n && !au.paused ? au.pause() : playSeg(n); break;
   case 'yt': openYT(b); break;
   case 'pp': au.paused ? (seg ? au.play() : null) : au.pause(); break;
   case 'close': au.pause(); seg = null; dock.classList.remove('show'); break;
   case 'ppm': seg = null; au.paused ? au.play() : au.pause(); break;
   case 'back': au.currentTime = Math.max(0, au.currentTime - 5); break;
   case 'fwd': au.currentTime = au.currentTime + 5; break;
   case 'set0': AM[n] = [t, Math.max(t + 1, AM[n]?.[1] ?? t + 30)]; break;
   case 'set1': AM[n] = [Math.min(AM[n]?.[0] ?? Math.max(0, t - 30), t - 1), t]; break;
   case 'clr': delete AM[n]; break;
   case 'reset': if (confirm('Xóa toàn bộ mốc audio đã gán?')) Object.keys(AM).forEach(k => delete AM[k]); break;
   case 'export': navigator.clipboard?.writeText(JSON.stringify(AM)); b.textContent = 'Đã copy'; setTimeout(() => b.textContent = 'Copy JSON', 1500); break}
  if (/^(set0|set1|clr|reset)$/.test(b.dataset.m)) {store.set('amap', AM); rows()}
  dockUI(); panelUI()}, {signal: sig});
 rows(); panelUI();
}


// ---- reminders and sources: a note under the byline, chapter sources at the end ----
const SRC = window.SOURCES || [], mine = (window.CH_SOURCES || {})[key.slice(-2)] || [];
const notice = document.createElement('aside'); notice.className = 'notice';
// each book's sources.js sets its own reminder (window.NOTICE)
notice.innerHTML = `<span class="label">Lưu ý</span>${window.NOTICE} <a href="#credits">Nguồn của chương</a>.`;
$('.metarow')?.after(notice);
const end = $('.end');
if (end) {
 // a chapter may carry its own caveat in .end p; the rest of the block is built here
 const extra = end.querySelector('p')?.textContent.trim() || '';
 const nb = QB.filter(q => q.id.startsWith('nb')).length;
 end.id = 'credits';
 end.innerHTML = `<b style="color:var(--fg)">Nguồn của chương</b>` +
  (mine.length ? `<ol class="src">${mine.map(id => SRC.find(x => x.id === id)).filter(Boolean).map(x => `<li>${x.url ? `<a href="${x.url}" target="_blank" rel="noopener">${x.title}</a>` : x.title}${x.by ? ` · <span>${x.by}</span>` : ''}</li>`).join('')}</ol>` : '') +
  (extra ? `<p><b>Ghi chú.</b> ${extra}</p>` : '') +
  `<p><b>Tự kiểm tra.</b> ${QB.length} câu: ${nb ? `${nb} câu từ bộ trắc nghiệm do Gemini Notebook (AI) tạo, đã biên tập; ` : ''}${QB.length - nb} câu được soạn bổ sung theo nội dung chương với sự hỗ trợ của AI và đã được rà soát.</p>` +
  (M ? `<p><b>Media.</b> Audio tổng quan do Gemini Notebook tạo bằng AI từ cùng bộ nguồn và có thể còn điểm chưa chính xác. ${M.yt.credit}</p>` : '') +
  `<p><a href="${location.pathname.replace(/\/[^/]*$/, '')}#sources">Danh sách nguồn đầy đủ và các lưu ý →</a></p>`;
}

addEventListener('scroll', onScroll, {passive: true, signal: sig}); addEventListener('resize', fitCube, {signal: sig});
tools(); toc(); renderCard(); onScroll();
})();
