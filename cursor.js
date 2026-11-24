/* =========================================================
   Pointer companions — desktop only, never in the way of a click.
   Look page: a small flat disc that leaves a trail of fading,
   shrinking echoes when it moves. Read page (and its project pages): a thin
   full-screen crosshair whose lines ripple when you reach something
   clickable (after the Codrops crosshair distortion idea).
   The system cursor stays as it is. Off on touch screens and when
   reduced motion is requested.
   ========================================================= */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // these companions replace the system pointer (see .has-custom-cursor in voice.css).
  // The system pointer is only hidden once the dot has actually been drawn, and it
  // comes back if any script on the page fails — so nobody is ever left without one.
  var root = document.documentElement;
  var failed = false;
  function hidePointer() { if (!failed) root.classList.add('has-custom-cursor'); }
  function restorePointer() { failed = true; root.classList.remove('has-custom-cursor'); }
  addEventListener('error', restorePointer);
  addEventListener('unhandledrejection', restorePointer);

  var cv = document.createElement('canvas');
  cv.className = 'cube-cursor';
  cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d');
  var dpr = 1, W = 0, H = 0;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size(); addEventListener('resize', size);

  // unit cube
  var V = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  var E = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

  var mx = -100, my = -100, x = -100, y = -100, vx = 0, vy = 0;
  var rx = 0.6, ry = 0.8, rz = 0, s = 10, sT = 10, alpha = 0, alphaT = 0;
  var trail = [], tick = 0, last = 0, idle = 0;
  var OFFSET = 0;                               // the cube is the pointer
  function isLook() { return false; }   // Look now uses the plain centre dot (see crosshair below); the disc + trail is kept but off
  new MutationObserver(function () { alphaT = isLook() && mx > 0 ? 1 : 0; if (!running) { running = true; requestAnimationFrame(frame); } })
    .observe(document.body, { attributes: true, attributeFilter: ['data-mode', 'class'] });

  function overFrame(e) { return e.target && e.target.tagName === 'IFRAME'; }
  addEventListener('pointermove', function (e) {
    if (overFrame(e)) { alphaT = 0; return; }      // at the edge of an embedded player: hand over
    mx = e.clientX + OFFSET; my = e.clientY + OFFSET;
    if (alpha === 0) { x = mx; y = my; }
    alphaT = isLook() ? 1 : 0; idle = 0;
    var t = e.target;
    sT = t && t.closest && t.closest('a, button, [role="tab"], .ix__row, .cell, canvas') ? 18 : 10;
    if (!running) { running = true; requestAnimationFrame(frame); }
  }, { passive: true });
  document.addEventListener('pointerleave', function () { alphaT = 0; });
  addEventListener('blur', function () { alphaT = 0; });

  // a flat disc (the cube's rotation values are kept but no longer drawn)
  function draw(px, py, sc, ax, ay, az, a) {
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(px, py, sc * 0.5, 0, Math.PI * 2); ctx.fill();
  }

  var running = false;
  function frame(now) {
    var dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    var k = 1 - Math.exp(-dt * 14);
    var nx = x + (mx - x) * k, ny = y + (my - y) * k;
    vx = (nx - x) / Math.max(dt, 1e-3); vy = (ny - y) / Math.max(dt, 1e-3);
    x = nx; y = ny;
    // it rolls with the motion, and keeps a slow drift of its own
    ry += (vx * 0.00045 + 0.25) * dt * 4;
    rx += (-vy * 0.00045 + 0.18) * dt * 4;
    rz += 0.08 * dt;
    s += (sT - s) * (1 - Math.exp(-dt * 10));
    alpha += (alphaT - alpha) * (1 - Math.exp(-dt * 8));

    // drop an echo every few frames while moving
    var speed = Math.hypot(vx, vy);
    if (speed > 30 && (tick++ % 2 === 0)) trail.push({ x: x, y: y, rx: rx, ry: ry, rz: rz, s: s, life: 1 });
    if (trail.length > 14) trail.shift();

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    for (var i = trail.length - 1; i >= 0; i--) {
      var t = trail[i];
      t.life -= dt * 2.4;
      if (t.life <= 0) { trail.splice(i, 1); continue; }
      draw(t.x, t.y, t.s * (0.35 + 0.65 * t.life), t.rx, t.ry, t.rz, 0.45 * t.life * t.life * alpha);
    }
    draw(x, y, s, rx, ry, rz, 0.95 * alpha);

    idle += dt;
    if (alpha < 0.01 && alphaT === 0 && !trail.length) { ctx.clearRect(0, 0, W, H); running = false; last = 0; return; }
    requestAnimationFrame(frame);
  }

  /* ---------------- crosshair (Read) ---------------- */
  var NS = 'http://www.w3.org/2000/svg';
  var wrap = document.createElement('div');
  wrap.className = 'xhair'; wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML =
    '<svg class="xhair__defs" width="0" height="0"><filter id="xhairWarp" filterUnits="userSpaceOnUse" x="-30" y="-30" width="200" height="200">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" seed="3" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></svg>' +
    '<svg class="xhair__h" viewBox="0 0 140 40"><line x1="0" y1="20" x2="140" y2="20"/></svg>' +
    '<svg class="xhair__v" viewBox="0 0 40 140"><line x1="20" y1="0" x2="20" y2="140"/></svg>' +
    '<i class="xhair__dot"></i>';
  document.body.appendChild(wrap);
  var hEl = wrap.querySelector('.xhair__h'), vEl = wrap.querySelector('.xhair__v'), dEl = wrap.querySelector('.xhair__dot');
  var turb = wrap.querySelector('feTurbulence'), disp = wrap.querySelector('feDisplacementMap');
  var cx = -100, cy = -100, tx = -100, ty = -100, warp = 0, warpT = 0, xOn = 0, xLast = 0, xRun = false;
  var ARM = 70;                                   // half-length of each line
  // Read: crosshair + centre dot. Look: the centre dot alone.
  function xActive() { return true; }
  function syncDotOnly() { wrap.classList.toggle('is-dot', document.body.getAttribute('data-mode') === 'look'); }
  syncDotOnly();
  new MutationObserver(syncDotOnly).observe(document.body, { attributes: true, attributeFilter: ['data-mode'] });
  addEventListener('pointermove', function (e) {
    if (overFrame(e)) { tx = -100; return; }
    tx = e.clientX; ty = e.clientY;
    if (cx < 0) { cx = tx; cy = ty; }
    var t = e.target;
    var hot = !!(t && t.closest && t.closest('a, button, [role="tab"], .ix__row, .jtoc__btn, label, input, textarea'));
    if (hot && warpT === 0) warp = 0;              // restart the ripple on each new target
    warpT = hot ? 1 : 0;
    if (!xRun) { xRun = true; requestAnimationFrame(xFrame); }
  }, { passive: true });
  document.addEventListener('pointerleave', function () { tx = -100; });
  function xFrame(now) {
    var dt = Math.min(0.05, (now - (xLast || now)) / 1000); xLast = now;
    var on = xActive() && tx >= 0 ? 1 : 0;
    xOn += (on - xOn) * (1 - Math.exp(-dt * 10));
    var k = 1 - Math.exp(-dt * 18);
    cx += (tx - cx) * k; cy += (ty - cy) * k;
    hEl.style.transform = 'translate3d(' + (cx - ARM) + 'px,' + (cy - 20) + 'px,0)';
    vEl.style.transform = 'translate3d(' + (cx - 20) + 'px,' + (cy - ARM) + 'px,0)';
    dEl.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';     // the dot is exact; the lines trail a touch
    if (tx >= 0 && !root.classList.contains('has-custom-cursor')) hidePointer();
    wrap.style.opacity = xOn.toFixed(3);
    // ripple: rises fast, then eases out while hovering, and dies away when leaving
    warp += ((warpT ? 1 : 0) - warp) * (1 - Math.exp(-dt * (warpT ? 9 : 5)));
    var ripple = warpT ? Math.sin(Math.min(warp, 1) * Math.PI) : warp;   // a swell, then settles back to straight
    disp.setAttribute('scale', (ripple * 16).toFixed(1));
    turb.setAttribute('baseFrequency', (0.03 + ripple * 0.05).toFixed(4) + ' ' + (0.05 + ripple * 0.1).toFixed(4));
    if (xOn < 0.005 && !on) { xRun = false; xLast = 0; return; }
    requestAnimationFrame(xFrame);
  }

  /* Embedded players (Vimeo) are separate pages: the site can't see the pointer
     inside them, and they draw their own. So the companions step aside there. */
  function frameHover(on) {
    alphaT = on ? 0 : (isLook() ? 1 : 0);
    if (on) { tx = -100; } 
    if (!running) { running = true; requestAnimationFrame(frame); }
    if (!xRun) { xRun = true; requestAnimationFrame(xFrame); }
  }
  function bindFrames(root) {
    (root || document).querySelectorAll('iframe').forEach(function (f) {
      if (f._cc) return; f._cc = 1;
      f.addEventListener('pointerenter', function () { frameHover(true); });
      f.addEventListener('pointerleave', function () { frameHover(false); });
    });
  }
  bindFrames();
  new MutationObserver(function () { bindFrames(); }).observe(document.body, { childList: true, subtree: true });
})();
