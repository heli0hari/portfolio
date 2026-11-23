/* =========================================================
   Photo grid lens — in the Chroma photo viewer, moving the mouse
   breaks the photo into a grid around the pointer: each cell near it
   zooms into its own patch, with a dot on the grid corner. The faster
   you move, the wider it spreads; when you stop it settles back to the
   plain photo. Adapted from the "Canvas Grid Mouse Effect" CodePen
   (creativeocean), without GSAP: the easing is done here.
   Desktop only; off for reduced motion.
   ========================================================= */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var viewer = document.getElementById('viewer');
  var img = document.getElementById('viewerImg');
  if (!viewer || !img) return;

  var cv = document.createElement('canvas');
  cv.className = 'viewer__grid';
  cv.setAttribute('aria-hidden', 'true');
  img.insertAdjacentElement('afterend', cv);
  var ctx = cv.getContext('2d');

  var W = 0, H = 0, dpr = 1, box = 0, boxes = [];
  var m = { x: 0, y: 0, x2: 0, y2: 0, s: 0 };
  var running = false, last = 0, inside = false;

  function ready() {
    return viewer.classList.contains('is-open') && !viewer.classList.contains('is-flipping') &&
      !viewer.classList.contains('is-closing') && img.complete && img.naturalWidth > 0;
  }
  function layout() {
    var r = img.getBoundingClientRect();
    var fr = img.parentNode.getBoundingClientRect();
    cv.style.left = (r.left - fr.left) + 'px';
    cv.style.top = (r.top - fr.top) + 'px';
    cv.style.width = r.width + 'px';
    cv.style.height = r.height + 'px';
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (Math.round(r.width * dpr) !== cv.width || Math.round(r.height * dpr) !== cv.height) {
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    }
    W = r.width; H = r.height;
    box = Math.max(28, Math.round(W / 22));        // ~22 cells across, as in the original
    boxes = [];
    for (var x = 0; x <= W; x += box) for (var y = 0; y <= H; y += box) boxes.push({ x: x, y: y });
    return r;
  }

  viewer.addEventListener('pointermove', function (e) {
    if (!ready()) return;
    var r = layout();
    var px = e.clientX - r.left, py = e.clientY - r.top;
    var wasInside = inside;
    inside = px >= 0 && py >= 0 && px <= r.width && py <= r.height;
    if (!inside) return;
    if (!wasInside && !running) { m.x = px; m.y = py; }   // enter: the lens starts under the pointer
    m.x2 = px; m.y2 = py;
    if (!running) { running = true; last = 0; requestAnimationFrame(frame); }
  });
  viewer.addEventListener('pointerleave', function () { inside = false; });

  function frame(now) {
    var dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    if (!ready()) { stop(); return; }
    // the lens trails the pointer (expo-ish), and spreads with the gap between them
    var k = 1 - Math.exp(-dt * 3);
    m.x += (m.x2 - m.x) * k; m.y += (m.y2 - m.y) * k;
    var gap = Math.hypot(m.x - m.x2, m.y - m.y2);
    var sT = inside ? Math.min(0.9, (gap / W) * 3) : 0;
    m.s += (sT - m.s) * (1 - Math.exp(-dt * 2.5));

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (m.s < 0.002 && (!inside || gap < 0.5)) { stop(); return; }

    var nx = img.naturalWidth / W, ny = img.naturalHeight / H;
    var reach = W * m.s, drawn = [];
    for (var i = 0; i < boxes.length; i++) {
      var c = boxes[i];
      var d = Math.hypot(c.x - m.x, c.y - m.y);
      var s = 1 - Math.min(1, d / reach);
      if (s < 0.001) continue;
      var shrink = box * s;                          // smaller source patch → zoomed cell
      var sw = Math.max(1, box - shrink);
      ctx.drawImage(img, (c.x + shrink / 2) * nx, (c.y + shrink / 2) * ny, sw * nx, sw * ny, c.x, c.y, box, box);
      drawn.push(c.x, c.y, s);
    }
    ctx.fillStyle = '#fff';
    for (var j = 0; j < drawn.length; j += 3) {
      ctx.beginPath();
      ctx.arc(drawn[j], drawn[j + 1], box * 0.13 * drawn[j + 2], 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  function stop() {
    running = false; last = 0; m.s = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
  }
})();
