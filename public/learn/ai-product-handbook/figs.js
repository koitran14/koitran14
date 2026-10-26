// Shared figure widgets for the AI Product handbook, loaded before each chapter's own script.
// stepper(box, steps): numbered dots on a line, a "Bước n/N" bar with prev/next, and the current step's body.
// steps = [[title, html]]; the Cube handbook's chapter 00 stepper is the model for the look.
window.stepper = (box, steps) => {
 let i = 0;
 box.classList.add('stp');
 box.innerHTML = `<ol class="stp-track" style="--n:${steps.length}">${steps.map(([t], k) => `<li><button data-k="${k}" title="${t}"><span class="stp-n">${k + 1}</span><span class="stp-l">${t}</span></button></li>`).join('')}</ol>` +
  '<div class="stp-bar"><span class="stp-t" aria-live="polite"></span><span class="stp-nav"><button data-d="-1">← Trước</button><button data-d="1" class="pri">Tiếp →</button></span></div><div class="stp-body"></div>';
 const show = () => {
  box.querySelectorAll('[data-k]').forEach((b, k) => {b.className = k < i ? 'done' : k === i ? 'cur' : ''; b.setAttribute('aria-current', k === i ? 'step' : 'false')});
  box.querySelector('.stp-t').innerHTML = `<small>Bước ${i + 1}/${steps.length}</small>${steps[i][0]}`;
  box.querySelector('.stp-body').innerHTML = steps[i][1];
  box.querySelector('[data-d="-1"]').disabled = !i;
  box.querySelector('[data-d="1"]').disabled = i === steps.length - 1};
 box.onclick = e => {
  const k = e.target.closest('[data-k]'), d = e.target.closest('[data-d]');
  if (k) i = +k.dataset.k; else if (d) i = Math.min(steps.length - 1, Math.max(0, i + +d.dataset.d)); else return;
  show()};
 show();
};
