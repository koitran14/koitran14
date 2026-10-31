// Hub engine shared by every handbook: builds the page's table of contents from the sections it finds,
// in the same two forms a chapter uses (fixed side list on wide screens, a collapsible box on narrow ones).
(() => {
const art = document.querySelector('.hb article');
if (!art) return;
const media = art.querySelector('.media');
// "01–04": the chapter numbers listed under a part row, so a bare "Phần I" says what it covers
const range = p => {const n = []; for (let e = p.nextElementSibling; e?.classList.contains('ch'); e = e.nextElementSibling) n.push(e.querySelector('.no').firstChild.textContent);
 return n.length > 1 ? `${n[0]}–${n.at(-1)}` : n[0] || ''};
const ITEMS = [
 [media, art.querySelector('#yt, #vd') ? 'Nghe và xem' : 'Nghe tổng quan'],
 [art.querySelector('.routes'), 'Lộ trình đọc'],
 ...[...art.querySelectorAll('#path .part')].map(p => [p, p.textContent, true, range(p)]),
 [art.querySelector('#skills'), 'Học cùng Claude'],
 [art.querySelector('#sources'), 'Nguồn và lưu ý'],
].filter(x => x[0]);
// renderPath() rebuilds the part rows when a route is picked, so parts are looked up again by name at click time
const target = i => ITEMS[i][2] ? [...art.querySelectorAll('#path .part')].find(p => p.textContent === ITEMS[i][1]) : ITEMS[i][0];

// "Mới" badges: anything marked data-new="YYYY-MM-DD" stays flagged for 7 calendar days in the reader's time zone, like the Notes list
const day = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const age = el => Math.round((day(new Date()) - day(new Date(el.dataset.new + 'T00:00'))) / 864e5);
const fresh = el => {const a = age(el); return a >= 0 && a < 7};
const badge = el => {if (!fresh(el) || el.querySelector('.new-badge')) return; const a = age(el);
 (el.querySelector('h3, h2, .label') || el).insertAdjacentHTML('beforeend', `<span class="new-badge"><i></i>Mới · ${a ? a + ' ngày trước' : 'hôm nay'}</span>`)};
const decorate = () => art.querySelectorAll('[data-new]').forEach(badge);
decorate();
// renderPath() replaces the chapter rows, so their badges are put back each time
const watch = new MutationObserver(decorate);
const path = art.querySelector('#path');
if (path) watch.observe(path, {childList: true});
// a TOC item gets a dot when its stretch of the page holds something new: a part covers the chapter rows under it
const scope = i => {const [el, , sub] = ITEMS[i];
 if (!sub) return [el.classList.contains('routes') ? path : el];
 const rows = []; for (let e = el.nextElementSibling; e?.classList.contains('ch'); e = e.nextElementSibling) rows.push(e); return rows};
const hasNew = i => scope(i).some(e => e && [e, ...e.querySelectorAll('[data-new]')].some(x => x.dataset.new && fresh(x)));
const list = () => `<ul class="toc-list">${ITEMS.map((x, i) => `<li><a href="#" data-i="${i}"${x[2] ? ' class="sub"' : ''}><span>${x[1]}${hasNew(i) ? '<span class="new-dot" title="Mới"></span>' : ''}</span>${x[3] ? `<i>${x[3]}</i>` : ''}</a></li>`).join('')}</ul>`;
const side = document.createElement('aside');
side.className = 'toc-side';
side.innerHTML = `<span class="label">Handbook · Mục lục</span>${list()}`;
const inline = document.createElement('details');
inline.className = 'toc-inline';
inline.innerHTML = `<summary>Mục lục</summary>${list()}`;
art.before(side);
(art.querySelector('.metarow') || art.querySelector('h1')).after(inline);
const links = [...side.querySelectorAll('a'), ...inline.querySelectorAll('a')];
const go = e => {const a = e.target.closest('[data-i]'); if (!a) return; e.preventDefault(); inline.open = false;
 scrollTo({top: target(+a.dataset.i).getBoundingClientRect().top + scrollY - 90, behavior: 'smooth'})};
side.onclick = inline.onclick = go;
const spy = () => {let on = 0; ITEMS.forEach((_, i) => {const t = target(i); if (t && t.getBoundingClientRect().top < 140) on = i});
 links.forEach(a => a.classList.toggle('on', +a.dataset.i === on))};
addEventListener('scroll', spy, {passive: true, signal: window.__hbSignal});
spy();
window.__hbSignal?.addEventListener('abort', () => {side.remove(); inline.remove(); watch.disconnect()});
})();
