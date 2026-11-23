/* Look page: dim the lights while one of the dark 3D rooms fills the screen. */
(function () {
  var rooms = document.querySelectorAll('.look-room');
  if (!rooms.length || !('IntersectionObserver' in window)) return;
  var inside = new Set();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) inside.add(e.target); else inside.delete(e.target); });
    document.body.classList.toggle('in-room', inside.size > 0);
  }, { rootMargin: '-45% 0px -45% 0px' });          // "in" once a room crosses the middle of the screen
  rooms.forEach(function (r) { io.observe(r); });
})();

/* Back to top — appears on the Look page once you're a screen down. */
(function () {
  var btn = document.getElementById('toTop');
  if (!btn) return;
  btn.hidden = false;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var ticking = false;
  function update() {
    ticking = false;
    var show = document.body.getAttribute('data-mode') === 'look' && window.scrollY > window.innerHeight;
    btn.classList.toggle('is-shown', show);
    btn.tabIndex = show ? 0 : -1;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  new MutationObserver(update).observe(document.body, { attributes: true, attributeFilter: ['data-mode'] });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' });
    var first = document.querySelector('.switch button, a, button');
    if (first) first.focus({ preventScroll: true });
  });
  update();
})();
