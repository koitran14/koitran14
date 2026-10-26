// Renders the related-video list into every [data-videos="NN"] block (data in media.js).
// A video with an id plays inline on click; a search link opens YouTube in a new tab.
(() => {
 const PLAY = '<svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" fill="currentColor"/></svg>';
 const FIND = '<svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5"/></svg>';
 const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
 document.querySelectorAll('[data-videos]').forEach(box => {
  const list = (window.VIDEOS || {})[box.dataset.videos] || [];
  if (!list.length) return box.remove();
  box.innerHTML = '<span class="label">Video liên quan</span><ul>' + list.map(([t, why, v]) => {
   const sub = why ? `<small>${esc(why)}</small>` : '';
   return v.id
    ? `<li><button class="vh" data-yt="${v.id}" aria-expanded="false"><i>${PLAY}</i><span>${esc(t)}${sub}</span><em>YouTube</em></button></li>`
    : `<li><a class="vh s" href="https://www.youtube.com/results?search_query=${encodeURIComponent(v.q)}" target="_blank" rel="noopener"><i>${FIND}</i><span>${esc(t)}${sub}</span><em>Tìm trên YouTube ↗</em></a></li>`}).join('') +
   '</ul><p class="note">Phần lớn video bằng tiếng Anh; bật phụ đề tự động và dịch sang tiếng Việt nếu cần. Với link tìm kiếm, chọn một video hợp trình độ và thời lượng. Video thuộc tác giả, nhúng từ YouTube.</p>';
  box.onclick = e => {
   const b = e.target.closest('[data-yt]'); if (!b) return;
   const li = b.parentElement, open = li.querySelector('iframe');
   if (open) {open.remove(); b.setAttribute('aria-expanded', 'false'); return}
   li.insertAdjacentHTML('beforeend', `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="${esc(b.querySelector('span').firstChild.textContent)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`);
   b.setAttribute('aria-expanded', 'true')};
 });
})();
