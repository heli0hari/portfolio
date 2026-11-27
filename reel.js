/* =========================================================
   Motion & 3D — curved reel
   Vertical scroll pulls a row of cards across the screen. Cards bend away
   from the centre; the card in the middle plays.
   Content comes from forge.json (same file the main site uses).
   ========================================================= */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var section = document.getElementById('reel');
  var stage = document.getElementById('reelStage');
  var track = document.getElementById('reelTrack');
  var nowEl = document.getElementById('reelNow');
  var progEl = document.getElementById('reelProgress');

  function pad(n) { return String(n).padStart(2, '0'); }
  function base(path) { return path.split('/').pop().replace(/\.[^.]+$/, ''); }

  /* ---------- data ---------- */
  function buildSections(d) {
    var cars = (d.cars || []).map(function (c) {
      var isVid = c.type === 'video';
      var name = base(isVid ? c.video : c.image);
      return {
        kind: isVid ? 'video' : 'image',
        src: isVid ? c.video : c.image,
        thumb: isVid ? 'images/3d/anim/posters/' + name + '.jpg' : 'images/3d/anim/thumbs/' + name + '.jpg',
        aspect: 9 / 16, focus: c.focus || 'center', title: c.alt || 'Motorhead'
      };
    });
    var type = (d.alphabet || []).map(function (a) {
      return {
        kind: a.video ? 'video' : 'image',
        src: a.video || a.image, still: a.image,
        thumb: 'images/3d/type/thumbs/' + base(a.image) + '.jpg',
        aspect: 1, focus: 'center', title: 'Letter ' + a.char
      };
    });
    return [
      { name: 'Motorhead', code: 'MH', items: cars },
      { name: '3D Typography', code: 'TY', items: type }
    ];
  }

  /* ---------- build the strip ---------- */
  var cells = [], media = [];
  function cellEl(cls) {
    var el = document.createElement('div');
    el.className = 'cell ' + (cls || '');
    var pic = document.createElement('div');
    pic.className = 'cell__pic';
    el.appendChild(pic);
    track.appendChild(el);
    return { el: el, pic: pic };
  }

  function build(sections) {
    sections.forEach(function (sec, si) {
      var s = cellEl('cell--slate');
      s.pic.innerHTML = '<div class="slate__no">' + pad(si + 1) + '</div>' +
        '<div class="slate__name">' + sec.name + '</div>' +
        '<div class="slate__count">' + sec.items.length + ' pieces</div>';
      cells.push({ el: s.el, aspect: 0.72, slate: true, section: sec });

      sec.items.forEach(function (it, ii) {
        var c = cellEl();
        c.el.setAttribute('role', 'listitem');
        c.el.setAttribute('tabindex', '0');
        c.el.setAttribute('aria-label', 'Open ' + it.title);
        var img = document.createElement('img');
        img.src = it.thumb; img.alt = it.title; img.decoding = 'async';
        img.style.objectPosition = it.focus;
        c.pic.appendChild(img);
        var vid = null;
        if (it.kind === 'video') {
          vid = document.createElement('video');
          vid.muted = true; vid.loop = true; vid.playsInline = true;
          vid.setAttribute('playsinline', ''); vid.preload = 'none';
          vid.style.objectPosition = it.focus;
          c.pic.appendChild(vid);
          var tag = document.createElement('span');
          tag.className = 'cell__play'; tag.setAttribute('aria-hidden', 'true');
          c.pic.appendChild(tag);
        }
        var cap = document.createElement('div');
        cap.className = 'cell__cap';
        cap.innerHTML = '<b>' + pad(ii + 1) + '</b><span></span>';
        cap.lastChild.textContent = it.title;
        c.el.appendChild(cap);

        var item = Object.assign({ section: sec, index: ii, n: sec.items.length }, it);
        var cell = { el: c.el, pic: c.pic, aspect: it.aspect, item: item, video: vid, mediaIndex: media.length };
        media.push(item);
        cells.push(cell);
        c.el.addEventListener('click', function () { if (!dragMoved) openViewer(cell.mediaIndex, c.pic); });
        c.el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openViewer(cell.mediaIndex, c.pic); }
        });
      });
    });
  }

  /* ---------- layout ---------- */
  var vw = 0, vh = 0, cellH = 0, first = 0, travel = 0;
  var RATE = 0.38;                 // page scroll per pixel of film: the room holds for about 3–4 screens
  function layout() {
    vw = stage.clientWidth; vh = stage.clientHeight;
    cellH = track.clientHeight;
    var picH = cellH;
    var gap = Math.max(22, vw * 0.022);
    var x = 0;
    cells.forEach(function (c) {
      c.w = Math.round(picH * c.aspect);
      c.x = x;                      // left edge along the strip
      c.cx = x + c.w / 2;           // centre
      c.el.style.width = c.w + 'px';
      x += c.w + gap;
    });
    first = cells.length ? cells[0].cx : 0;
    travel = cells.length ? cells[cells.length - 1].cx - first : 0;
    section.style.height = (vh + travel * RATE) + 'px';
  }

  /* ---------- scroll + drag ---------- */
  var target = 0, cur = 0;
  function readScroll() {
    var y = -section.getBoundingClientRect().top;
    target = Math.min(travel, Math.max(0, y / RATE));
  }
  window.addEventListener('scroll', readScroll, { passive: true });

  var dragging = false, lastX = 0, dragMoved = false, downX = 0;
  stage.style.touchAction = 'pan-y';
  stage.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = downX = e.clientX; dragMoved = false;
  });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX; lastX = e.clientX;
    if (Math.abs(e.clientX - downX) > 6) dragMoved = true;
    if (dragMoved) window.scrollBy(0, -dx * RATE);   // dragging the film = scrolling the page
  });
  window.addEventListener('pointerup', function () {
    dragging = false;
    setTimeout(function () { dragMoved = false; }, 0);
  });

  function scrollToCell(c) {
    var top = section.getBoundingClientRect().top + window.scrollY + (c.cx - first) * RATE;
    window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
  }
  document.addEventListener('keydown', function (e) {
    if (viewer.classList.contains('is-open')) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var r = section.getBoundingClientRect();
    if (r.top > 0 || r.bottom < vh) return;
    e.preventDefault();
    var i = gateIndex + (e.key === 'ArrowRight' ? 1 : -1);
    if (cells[i]) scrollToCell(cells[i]);
  });

  /* ---------- render ---------- */
  var gateIndex = 0, lastNow = -1, last = 0;
  function frame(now) {
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;
    cur += (target - cur) * (reduce ? 1 : 1 - Math.exp(-dt * 9));
    var anchor = vw * 0.5;
    var best = 1e9;

    cells.forEach(function (c, i) {
      var sx = c.cx - first - cur + anchor;            // centre on screen
      var d = (sx - anchor) / vw;                      // -0.5..0.5 across the screen
      var off = sx + c.w / 2 < -vw * 0.3 || sx - c.w / 2 > vw * 1.3;
      c.el.style.visibility = off ? 'hidden' : '';
      if (off) return;
      // film leaves the gate and bends away, like it's wrapping onto a reel
      var rot = reduce ? 0 : Math.max(-60, Math.min(60, -d * 52));
      var z = reduce ? 0 : -Math.pow(Math.abs(d), 1.4) * 520;
      c.el.style.transform = 'translate3d(' + (sx - c.w / 2).toFixed(1) + 'px,0,' + z.toFixed(1) + 'px) rotateY(' + rot.toFixed(2) + 'deg)';
      var lit = 1 - Math.min(Math.abs(d) * 1.25, 0.62);
      c.el.style.filter = 'brightness(' + lit.toFixed(3) + ')';
      if (Math.abs(d) < best) { best = Math.abs(d); gateIndex = i; }
    });

    // the frame in the gate plays; everything else rests on its still
    cells.forEach(function (c, i) {
      if (!c.video) return;
      var inGate = i === gateIndex && best < 0.2;
      if (inGate) {
        if (!c.video.src) { c.video.src = c.item.src; c.video.preload = 'auto'; }
        if (c.video.paused) {
          var p = c.video.play();
          if (p && p.catch) p.catch(function () {});
        }
        c.el.classList.toggle('is-playing', c.video.readyState >= 2);
      } else if (!c.video.paused) {
        c.video.pause();
        c.el.classList.remove('is-playing');
      }
    });

    cells.forEach(function (c, i) { c.el.classList.toggle('is-gate', i === gateIndex); });
    if (gateIndex !== lastNow) {
      lastNow = gateIndex;
      var g = cells[gateIndex];
      nowEl.textContent = !g ? ' ' : g.slate
        ? g.section.name + '  —  ' + g.section.items.length + ' pieces'
        : g.item.section.name + '  ' + pad(g.item.index + 1) + ' / ' + pad(g.item.n) + '  —  ' + g.item.title;
    }
    progEl.style.transform = 'scaleX(' + (travel ? cur / travel : 0).toFixed(4) + ')';
    requestAnimationFrame(frame);
  }

  /* ---------- viewer (grows out of the frame it was opened from) ---------- */
  var viewer = document.getElementById('reelViewer');
  var vMedia = document.getElementById('reelViewerMedia');
  var vCap = document.getElementById('reelViewerCap');
  var vCount = document.getElementById('reelViewerCount');
  var vPos = 0, animating = false, fromPic = null, lastFocus = null;
  var EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

  function box(item) {
    var maxW = Math.min(window.innerWidth * (window.innerWidth < 700 ? 0.94 : 0.88), 1600);
    var maxH = window.innerHeight * 0.8;
    var w = maxW, h = w / item.aspect;
    if (h > maxH) { h = maxH; w = h * item.aspect; }
    return { w: w, h: h };
  }
  function fill(item) {
    vMedia.innerHTML = '';
    var b = box(item);
    vMedia.style.width = b.w + 'px'; vMedia.style.height = b.h + 'px';
    var poster = document.createElement('img');
    poster.src = item.thumb; poster.alt = item.title;
    vMedia.appendChild(poster);
    if (item.kind === 'video') {
      var v = document.createElement('video');
      v.src = item.src; v.loop = true; v.muted = true; v.playsInline = true; v.controls = true;
      v.setAttribute('playsinline', '');
      v.style.position = 'absolute'; v.style.inset = '0';
      v.addEventListener('canplay', function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
      vMedia.appendChild(v);
    } else {
      var full = new Image();
      full.src = item.src;
      full.decode().then(function () {
        if (media[vPos] !== item) return;
        poster.src = item.src;
      }).catch(function () {});
    }
    vCap.textContent = item.section.name + '  —  ' + item.title;
    vCount.textContent = pad(vPos + 1) + ' / ' + pad(media.length);
    return poster.decode ? poster.decode().catch(function () {}) : Promise.resolve();
  }
  function flip(rect, reverse) {
    var b = vMedia.getBoundingClientRect();
    var t = 'translate(' + (rect.left - b.left) + 'px,' + (rect.top - b.top) + 'px) scale(' + rect.width / b.width + ',' + rect.height / b.height + ')';
    return vMedia.animate(reverse ? [{ transform: 'none' }, { transform: t }] : [{ transform: t }, { transform: 'none' }],
      { duration: 620, easing: EASE, fill: 'forwards' });
  }
  function twoFrames() { return new Promise(function (r) { requestAnimationFrame(function () { requestAnimationFrame(r); }); }); }

  function openViewer(i, pic) {
    if (animating) return;
    animating = true; vPos = i; fromPic = pic; lastFocus = document.activeElement;
    vMedia.style.visibility = 'hidden';
    fill(media[i]).then(function () {
      viewer.classList.add('is-open');
      viewer.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('viewer-open');
      var rect = pic.getBoundingClientRect();
      if (reduce) { vMedia.style.visibility = ''; animating = false; return; }
      viewer.classList.add('is-flipping');
      var a = flip(rect, false);
      vMedia.style.visibility = '';
      twoFrames().then(function () { pic.style.visibility = 'hidden'; });
      a.finished.then(function () {
        a.cancel(); viewer.classList.remove('is-flipping'); animating = false;
        document.getElementById('reelViewerClose').focus({ preventScroll: true });
      });
    });
  }
  function closeViewer() {
    if (animating || !viewer.classList.contains('is-open')) return;
    animating = true;
    var v = vMedia.querySelector('video'); if (v) v.pause();
    var pic = cellFor(vPos);
    var finish = function () {
      viewer.classList.remove('is-open', 'is-closing', 'is-flipping');
      viewer.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('viewer-open');
      vMedia.innerHTML = '';
      animating = false;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    if (reduce || !pic) { if (fromPic) fromPic.style.visibility = ''; finish(); return; }
    pic.style.visibility = 'hidden';
    var rect = pic.getBoundingClientRect();
    viewer.classList.add('is-closing', 'is-flipping');
    var a = flip(rect, true);
    a.finished.then(function () {
      pic.style.visibility = '';
      if (fromPic) fromPic.style.visibility = '';
      return twoFrames();
    }).then(function () { a.cancel(); finish(); });
  }
  function cellFor(mi) {
    for (var i = 0; i < cells.length; i++) if (cells[i].mediaIndex === mi && !cells[i].slate) return cells[i].pic;
    return null;
  }
  function stepViewer(d) {
    if (animating) return;
    if (fromPic) fromPic.style.visibility = '';
    vPos = (vPos + d + media.length) % media.length;
    fromPic = cellFor(vPos);
    if (fromPic) fromPic.style.visibility = 'hidden';
    fill(media[vPos]).then(function () {
      vMedia.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: EASE });
    });
    var c = cells.filter(function (x) { return x.mediaIndex === vPos && !x.slate; })[0];
    if (c) scrollToCell(c);           // keep the film in step behind the viewer
  }
  document.getElementById('reelViewerClose').addEventListener('click', closeViewer);
  document.getElementById('reelViewerPrev').addEventListener('click', function () { stepViewer(-1); });
  document.getElementById('reelViewerNext').addEventListener('click', function () { stepViewer(1); });
  viewer.addEventListener('click', function (e) { if (e.target === viewer) closeViewer(); });
  document.addEventListener('keydown', function (e) {
    if (!viewer.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeViewer();
    else if (e.key === 'ArrowRight') stepViewer(1);
    else if (e.key === 'ArrowLeft') stepViewer(-1);
  });

  /* ---------- go ---------- */
  fetch('forge.json')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      build(buildSections(d));
      layout(); readScroll(); cur = target;
      window.addEventListener('resize', function () { layout(); readScroll(); });
      // the main site hides this section in Read mode; lay out again when it appears
      if ('ResizeObserver' in window) new ResizeObserver(function () { layout(); readScroll(); }).observe(stage);
      requestAnimationFrame(frame);
    })
    .catch(function (e) { console.warn('Reel: could not load forge.json', e); });
})();
