// Renders related videos into every [data-videos="NN"] block (data in media.js) as thumbnails;
// a click swaps the thumbnail for the YouTube player, so nothing loads from YouTube until then except the image.
(() => {
 const PLAY = '<svg viewBox="0 0 16 16"><path d="M5 3l8 5-8 5z" fill="currentColor"/></svg>';
 const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
 document.querySelectorAll('[data-videos]').forEach(box => {
  const list = (window.VIDEOS || {})[box.dataset.videos] || [];
  if (!list.length) return box.remove();
  box.innerHTML = `<span class="label">Video liên quan</span><div class="vgrid${list.length === 1 ? ' one' : ''}">` + list.map(([t, by, id, why]) =>
   `<div class="vcard"><button class="vthumb" data-yt="${id}" aria-label="Phát video: ${esc(t)}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy"><i>${PLAY}</i></button>` +
   `<div class="vcap"><b>${esc(t)}</b><span>${esc(by)}</span>${why ? `<small>${esc(why)}</small>` : ''}</div></div>`).join('') +
   '</div><p class="note">Video tiếng Anh; bật phụ đề tự động và dịch sang tiếng Việt nếu cần. Video thuộc tác giả, nhúng từ YouTube.</p>';
  box.onclick = e => {
   const b = e.target.closest('[data-yt]'); if (!b) return;
   const t = b.closest('.vcard').querySelector('b').textContent;
   b.outerHTML = `<div class="vthumb"><iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="${esc(t)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`};
 });
})();
