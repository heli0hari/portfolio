/* =========================================================
   Motion & 3D — the endless box
   A square-section prism. Scrolling turns it a quarter at a time; the side
   that's facing away is quietly re-filled with the next piece, so the four
   sides cycle through every project. The box reshapes per project:
   tall 9:16 sides for Motorhead, a cube for 3D Typography.
   Content comes from forge.json.
   ========================================================= */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var section = document.getElementById('box');
  var stage = document.getElementById('boxStage');
  var prism = document.getElementById('prism');
  var nowEl = document.getElementById('boxNow');
  var indexEl = document.getElementById('boxIndex');
  var sides = Array.prototype.slice.call(prism.querySelectorAll('.face[data-slot]'));
  var top = prism.querySelector('.face--top');
  var bottom = prism.querySelector('.face--bottom');

  function pad(n) { return String(n).padStart(2, '0'); }
  function base(p) { return p.split('/').pop().replace(/\.[^.]+$/, ''); }
  function mod(a, n) { return ((a % n) + n) % n; }
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function smooth(a, b, x) { x = clamp((x - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); }

  /* ---------- data ---------- */
  var sections = [], items = [];
  function load(d) {
    sections = [
      { name: 'Motorhead', aspect: 9 / 16, items: (d.cars || []).map(function (c) {
        var vid = c.type === 'video', n = base(vid ? c.video : c.image);
        return { kind: vid ? 'video' : 'image', src: vid ? c.video : c.image, focus: c.focus || 'center',
          thumb: vid ? 'images/3d/anim/posters/' + n + '.jpg' : 'images/3d/anim/thumbs/' + n + '.jpg',
          aspect: 9 / 16, title: c.alt || 'Motorhead' };
      }) },
      { name: '3D Typography', aspect: 1, items: (d.alphabet || []).map(function (a) {
        return { kind: a.video ? 'video' : 'image', src: a.video || a.image, focus: 'center',
          thumb: 'images/3d/type/thumbs/' + base(a.image) + '.jpg', aspect: 1, title: 'Letter ' + a.char };
      }) }
    ];
    sections.forEach(function (s, si) {
      s.start = items.length;
      s.items.forEach(function (it, ii) { it.sec = si; it.ii = ii; it.n = s.items.length; items.push(it); });
    });
  }

  /* ---------- sides: fill a slot with an item (only when it changes) ---------- */
  var slotItem = [-1, -1, -1, -1];
  function fill(slot, idx) {
    if (slotItem[slot] === idx) return;
    slotItem[slot] = idx;
    var it = items[idx], face = sides[slot];
    face.innerHTML = '';
    face.classList.remove('is-playing');
    var img = document.createElement('img');
    img.src = it.thumb; img.alt = it.title; img.decoding = 'async';
    img.style.objectPosition = it.focus;
    face.appendChild(img);
    if (it.kind === 'video') {
      var v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', '');
      v.preload = 'none'; v.style.objectPosition = it.focus;
      face.appendChild(v);
      var tag = document.createElement('span');
      tag.className = 'face__tag'; tag.textContent = 'Motion';
      face.appendChild(tag);
    }
    var sh = document.createElement('div');
    sh.className = 'face__shade';
    face.appendChild(sh);
    face.setAttribute('aria-label', 'Open ' + it.title);
  }
  var lidSec = -1;
  function lids(si) {
    if (si === lidSec) return;
    lidSec = si;
    var s = sections[si];
    top.innerHTML = '<div class="lid__no">' + pad(si + 1) + ' / ' + pad(sections.length) + '</div><div class="lid__name">' + s.name + '</div>';
    bottom.innerHTML = '<div class="lid__no">' + s.items.length + ' pieces</div>';
    Array.prototype.forEach.call(indexEl.children, function (b, i) { b.setAttribute('aria-current', String(i === si)); });
  }

  /* ---------- sizing ---------- */
  var vw = 0, vh = 0, STEP = 1;
  function measure() {
    vw = stage.clientWidth; vh = stage.clientHeight;
    STEP = vh * 0.5;                                   // half a screen of scroll per side
    section.style.height = (vh + (items.length - 1) * STEP + vh * 0.3) + 'px';
  }
  function dims(aspect) {
    // tall prism and cube read as similar visual weight
    var h = aspect < 1 ? vh * 0.6 : vh * 0.44;
    var w = h * aspect;
    var maxW = vw * (vw < 700 ? 0.56 : 0.34);           // the diagonal at 45° is 1.41× wider
    if (w > maxW) { h *= maxW / w; w = maxW; }
    return { w: w, h: h };
  }

  /* ---------- input ---------- */
  var tScroll = 0, tDrag = 0, dragV = 0, pitch = 0, dragging = false, lastX = 0, lastY = 0, moved = 0;
  function readScroll() {
    var y = -section.getBoundingClientRect().top;
    tScroll = clamp(y / STEP, 0, items.length - 1);
  }
  window.addEventListener('scroll', readScroll, { passive: true });

  var curW = 300;
  stage.addEventListener('pointerdown', function (e) {
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; dragV = 0;
  });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    var d = -dx / (curW * 1.4);                          // about one side per side-width of drag
    tDrag += d; dragV = d;
    if (e.pointerType === 'mouse') pitch = clamp(pitch + dy * 0.25, -40, 40);
  });
  window.addEventListener('pointerup', function (e) {
    if (!dragging) return;
    dragging = false;
    if (moved < 6) {
      var face = e.target.closest && e.target.closest('.face[data-slot]');
      if (face) openViewer(slotItem[+face.dataset.slot], face);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (viewer.classList.contains('is-open')) return;
    var r = section.getBoundingClientRect();
    if (r.top > 1 || r.bottom < vh - 1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(Math.round(tScroll) + (e.key === 'ArrowRight' ? 1 : -1));
    } else if (e.key === 'Enter') {
      openViewer(slotItem[frontSlot], sides[frontSlot]);
    }
  });
  function goTo(i) {
    i = clamp(i, 0, items.length - 1);
    var top = section.getBoundingClientRect().top + window.scrollY + i * STEP;
    tDrag = Math.round(tDrag);
    window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ---------- render ---------- */
  var tv = 0, shapeA = 9 / 16, frontSlot = 0, lastFront = -1, last = 0, pitchV = 0;
  function frame(now) {
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;
    var k = reduce ? 1 : 1 - Math.exp(-dt * 8);

    if (!dragging) {
      // glide a little, then settle the drag offset on a whole side
      tDrag += dragV; dragV *= Math.exp(-dt * 6);
      if (Math.abs(dragV) < 0.002) tDrag += (Math.round(tDrag) - tDrag) * k;
      pitch += (0 - pitch) * (1 - Math.exp(-dt * 3));
    }
    var t = tScroll + tDrag;
    // dwell on each side, turn in between
    var fl = Math.floor(t), fr = t - fl;
    var target = dragging ? t : fl + (reduce ? Math.round(fr) : smooth(0.3, 0.7, fr));
    tv += (target - tv) * (dragging ? 1 : k);

    var N = items.length;
    var front = mod(Math.round(tv), N);
    frontSlot = mod(Math.round(tv), 4);

    // each side shows the item that belongs to it at this point of the cycle;
    // the side facing away changes while nobody can see it
    for (var j = 0; j < 4; j++) {
      var n = j + 4 * Math.round((tv - j) / 4);
      fill(j, mod(n, N));
      var ang = (j - tv) * Math.PI / 2;
      sides[j].lastChild.style.opacity = (Math.min(1, 1 - Math.cos(ang)) * 0.65).toFixed(3);
    }

    // shape: blend between the projects either side of the current turn
    var a0 = sections[items[mod(Math.floor(tv), N)].sec].aspect;
    var a1 = sections[items[mod(Math.ceil(tv), N)].sec].aspect;
    var ta = a0 + (a1 - a0) * (tv - Math.floor(tv));
    shapeA += (ta - shapeA) * k;
    var d = dims(shapeA);
    curW = d.w;
    prism.style.setProperty('--w', d.w.toFixed(1) + 'px');
    prism.style.setProperty('--h', d.h.toFixed(1) + 'px');
    stage.style.setProperty('--floor', (d.h / 2 + 26).toFixed(0) + 'px');

    var idle = reduce ? 0 : Math.sin(now / 1400) * 1.2;
    prism.style.transform = 'rotateX(' + (-12 + pitch).toFixed(2) + 'deg) rotateY(' + (-tv * 90 + idle).toFixed(2) + 'deg)';

    // the side facing you plays once it has settled
    var settled = Math.abs(tv - Math.round(tv)) < 0.06 && !dragging;
    sides.forEach(function (f, j) {
      var v = f.querySelector('video');
      if (!v) return;
      if (j === frontSlot && settled) {
        if (!v.src) { v.src = items[slotItem[j]].src; v.preload = 'auto'; }
        if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        f.classList.toggle('is-playing', v.readyState >= 2);
      } else if (!v.paused) { v.pause(); f.classList.remove('is-playing'); }
    });

    if (front !== lastFront) {
      lastFront = front;
      var it = items[front], s = sections[it.sec];
      lids(it.sec);
      nowEl.textContent = s.name + '  ' + pad(it.ii + 1) + ' / ' + pad(it.n) + '  —  ' + it.title;
    }
    requestAnimationFrame(frame);
  }

  /* ---------- viewer (grows out of the side it was opened from) ---------- */
  var viewer = document.getElementById('viewer');
  var vMedia = document.getElementById('viewerMedia');
  var vCap = document.getElementById('viewerCap');
  var vCount = document.getElementById('viewerCount');
  var vPos = 0, animating = false, lastFocus = null;
  var EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

  function vbox(it) {
    var maxW = Math.min(innerWidth * (innerWidth < 700 ? 0.94 : 0.88), 1600), maxH = innerHeight * 0.8;
    var w = maxW, h = w / it.aspect;
    if (h > maxH) { h = maxH; w = h * it.aspect; }
    return { w: w, h: h };
  }
  function show(it) {
    vMedia.innerHTML = '';
    var b = vbox(it);
    vMedia.style.width = b.w + 'px'; vMedia.style.height = b.h + 'px';
    var img = document.createElement('img');
    img.src = it.thumb; img.alt = it.title;
    vMedia.appendChild(img);
    if (it.kind === 'video') {
      var v = document.createElement('video');
      v.src = it.src; v.loop = true; v.muted = true; v.playsInline = true; v.controls = true;
      v.setAttribute('playsinline', '');
      v.style.position = 'absolute'; v.style.inset = '0';
      v.addEventListener('canplay', function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
      vMedia.appendChild(v);
    } else {
      var full = new Image(); full.src = it.src;
      full.decode().then(function () { if (items[vPos] === it) img.src = it.src; }).catch(function () {});
    }
    vCap.textContent = sections[it.sec].name + '  —  ' + it.title;
    vCount.textContent = pad(vPos + 1) + ' / ' + pad(items.length);
    return img.decode ? img.decode().catch(function () {}) : Promise.resolve();
  }
  function flip(rect, reverse) {
    var b = vMedia.getBoundingClientRect();
    var t = 'translate(' + (rect.left - b.left) + 'px,' + (rect.top - b.top) + 'px) scale(' + rect.width / b.width + ',' + rect.height / b.height + ')';
    return vMedia.animate(reverse ? [{ transform: 'none' }, { transform: t }] : [{ transform: t }, { transform: 'none' }],
      { duration: 620, easing: EASE, fill: 'forwards' });
  }
  function frames2() { return new Promise(function (r) { requestAnimationFrame(function () { requestAnimationFrame(r); }); }); }
  function faceShowing(idx) {
    // a side showing this item that is facing the viewer
    for (var j = 0; j < 4; j++) if (slotItem[j] === idx && Math.abs(mod((j - tv) + 2, 4) - 2) < 0.6) return sides[j];
    return null;
  }

  function openViewer(idx, face) {
    if (animating || idx < 0) return;
    animating = true; vPos = idx; lastFocus = document.activeElement;
    vMedia.style.visibility = 'hidden';
    show(items[idx]).then(function () {
      viewer.classList.add('is-open');
      viewer.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('viewer-open');
      if (reduce) { vMedia.style.visibility = ''; animating = false; return; }
      viewer.classList.add('is-flipping');
      var a = flip(face.getBoundingClientRect(), false);
      vMedia.style.visibility = '';
      a.finished.then(function () {
        a.cancel(); viewer.classList.remove('is-flipping'); animating = false;
        document.getElementById('viewerClose').focus({ preventScroll: true });
      });
    });
  }
  function closeViewer() {
    if (animating || !viewer.classList.contains('is-open')) return;
    animating = true;
    var v = vMedia.querySelector('video'); if (v) v.pause();
    var face = reduce ? null : faceShowing(vPos);
    var finish = function () {
      viewer.classList.remove('is-open', 'is-closing', 'is-flipping');
      viewer.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('viewer-open');
      vMedia.innerHTML = ''; animating = false;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    if (!face) { finish(); return; }
    viewer.classList.add('is-closing', 'is-flipping');
    var a = flip(face.getBoundingClientRect(), true);
    a.finished.then(frames2).then(function () { a.cancel(); finish(); });
  }
  function stepViewer(d) {
    if (animating) return;
    vPos = mod(vPos + d, items.length);
    show(items[vPos]).then(function () { vMedia.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: EASE }); });
    goTo(vPos - Math.round(tDrag));              // turn the box behind the viewer to match
  }
  document.getElementById('viewerClose').addEventListener('click', closeViewer);
  document.getElementById('viewerPrev').addEventListener('click', function () { stepViewer(-1); });
  document.getElementById('viewerNext').addEventListener('click', function () { stepViewer(1); });
  viewer.addEventListener('click', function (e) { if (e.target === viewer) closeViewer(); });
  document.addEventListener('keydown', function (e) {
    if (!viewer.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeViewer();
    else if (e.key === 'ArrowRight') stepViewer(1);
    else if (e.key === 'ArrowLeft') stepViewer(-1);
  });

  /* ---------- go ---------- */
  fetch('forge.json').then(function (r) { return r.json(); }).then(function (d) {
    load(d);
    sections.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = '<span>' + pad(i + 1) + '</span>' + s.name;
      b.addEventListener('click', function () { goTo(s.start); });
      indexEl.appendChild(b);
    });
    measure(); readScroll();
    tv = tScroll;
    window.addEventListener('resize', function () { measure(); readScroll(); });
    requestAnimationFrame(frame);
  }).catch(function (e) { console.warn('Box: could not load forge.json', e); });
})();
