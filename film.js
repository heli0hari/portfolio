/* =========================================================
   Color Grading film — the Vimeo video with the site's own controls.
   The embed runs with controls=0 (no Vimeo chrome); a transparent
   layer over it takes clicks, so the site's pointer keeps working
   over the film. Controls: play/pause, seek, sound, full screen.
   Uses Vimeo's Player SDK, loaded only when the film is near.
   ========================================================= */
(function () {
  var films = [];
  function pauseOthers(me) { films.forEach(function (f) { if (f !== me && f.player && f.sound !== false) f.player.pause().catch(function () {}); }); }
  document.querySelectorAll('.film').forEach(function (r) { if (!r.querySelector('video')) setup(r); });
  window.attachFilm = setupVideo;      // project pages add their clips later
  document.querySelectorAll('.film--video').forEach(setupVideo);

/* the same controls for a plain <video> (project pages) */
function setupVideo(root) {
  var v = root.querySelector('video');
  var hit = root.querySelector('.film__hit'), toggleBtn = root.querySelector('.film__toggle');
  var track = root.querySelector('.film__track'), fill = root.querySelector('.film__fill');
  var timeEl = root.querySelector('.film__time'), muteBtn = root.querySelector('.film__mute'), fsBtn = root.querySelector('.film__fs');
  var loop = root.classList.contains('film--loop');
  if (root.dataset.on) return;
  root.dataset.on = '1';
  var me = { player: { pause: function () { v.pause(); return Promise.resolve(); } }, sound: !loop };
  films.push(me);
  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  function sync() {
    var p = !v.paused;
    root.classList.toggle('is-playing', p);
    toggleBtn.textContent = p ? 'Pause' : 'Play';
    hit.setAttribute('aria-label', p ? 'Pause' : 'Play');
  }
  v.addEventListener('play', function () { root.classList.add('has-started'); sync(); if (!v.muted) pauseOthers(me); });
  v.addEventListener('pause', sync);
  v.addEventListener('timeupdate', function () {
    var d = v.duration || 0, p = d ? v.currentTime / d : 0;
    fill.style.transform = 'scaleX(' + p + ')';
    track.setAttribute('aria-valuenow', Math.round(p * 100));
    timeEl.textContent = fmt(v.currentTime) + ' / ' + fmt(d);
  });
  v.addEventListener('volumechange', function () { me.sound = !v.muted; muteBtn.textContent = v.muted ? 'Sound on' : 'Sound off'; if (!v.muted) pauseOthers(me); });
  function playPause() { if (v.paused) v.play().catch(function () {}); else v.pause(); }
  var clickT = 0;
  hit.addEventListener('click', function () { clearTimeout(clickT); clickT = setTimeout(playPause, 230); });
  hit.addEventListener('dblclick', function (e) { e.preventDefault(); clearTimeout(clickT); toggleFull(); });
  toggleBtn.addEventListener('click', playPause);
  muteBtn.addEventListener('click', function () { v.muted = !v.muted; if (!v.muted && v.paused) v.play().catch(function () {}); });
  function seekAt(x) {
    if (!v.duration) return;
    var r = track.getBoundingClientRect(), p = Math.min(1, Math.max(0, (x - r.left) / r.width));
    v.currentTime = p * v.duration;
  }
  var seeking = false;
  track.addEventListener('pointerdown', function (e) { seeking = true; track.setPointerCapture(e.pointerId); seekAt(e.clientX); });
  track.addEventListener('pointermove', function (e) { if (seeking) seekAt(e.clientX); });
  track.addEventListener('pointerup', function () { seeking = false; });
  track.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault(); v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + (e.key === 'ArrowRight' ? 5 : -5)));
  });
  function toggleFull() {
    if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else if (root.requestFullscreen) root.requestFullscreen();
    else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();     // iPhone: the system player
  }
  fsBtn.addEventListener('click', toggleFull);
  function onFull() {
    var fe = document.fullscreenElement || document.webkitFullscreenElement, on = fe === root;
    document.documentElement.classList.toggle('film-full', !!fe);
    root.classList.toggle('is-full', on);
    fsBtn.textContent = on ? 'Exit full screen' : 'Full screen';
  }
  document.addEventListener('fullscreenchange', onFull);
  document.addEventListener('webkitfullscreenchange', onFull);
  // off screen: pause; a silent loop starts again when it comes back
  new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (document.fullscreenElement) return;
      if (!e.isIntersecting && !v.paused) { v.pause(); root.dataset.resume = loop && v.muted ? '1' : ''; }
      else if (e.isIntersecting && root.dataset.resume === '1') { root.dataset.resume = ''; v.play().catch(function () {}); }
    });
  }, { threshold: 0.2 }).observe(root);
  var idleT = 0;
  root.addEventListener('pointermove', function () {
    root.classList.remove('is-idle'); clearTimeout(idleT);
    idleT = setTimeout(function () { if (!v.paused) root.classList.add('is-idle'); }, 2200);
  });
  root.addEventListener('pointerleave', function () { if (!v.paused) root.classList.add('is-idle'); });
  sync();
}

function setup(root) {
  var me = { player: null };
  films.push(me);
  var iframe = root.querySelector('iframe');
  var hit = root.querySelector('.film__hit');
  var toggleBtn = root.querySelector('.film__toggle');
  var track = root.querySelector('.film__track');
  var fill = root.querySelector('.film__fill');
  var timeEl = root.querySelector('.film__time');
  var muteBtn = root.querySelector('.film__mute');
  var fsBtn = root.querySelector('.film__fs');
  var player = null, dur = 0, playing = false, muted = false;

  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  function setPlaying(p) {
    playing = p;
    root.classList.toggle('is-playing', p);
    toggleBtn.textContent = p ? 'Pause' : 'Play';
    hit.setAttribute('aria-label', p ? 'Pause' : 'Play');
  }

  function init() {
    if (player || !window.Vimeo) return;
    player = me.player = new window.Vimeo.Player(iframe);
    player.getDuration().then(function (d) { dur = d; timeEl.textContent = '00:00 / ' + fmt(d); });
    player.on('play', function () { setPlaying(true); root.classList.add('has-started'); pauseOthers(me); });
    player.on('pause', function () { setPlaying(false); });
    player.on('ended', function () { setPlaying(false); });
    player.on('timeupdate', function (e) {
      dur = e.duration || dur;
      fill.style.transform = 'scaleX(' + (e.percent || 0) + ')';
      track.setAttribute('aria-valuenow', Math.round((e.percent || 0) * 100));
      timeEl.textContent = fmt(e.seconds) + ' / ' + fmt(dur);
    });
    player.on('volumechange', function (e) { muted = e.volume === 0; muteBtn.textContent = muted ? 'Sound on' : 'Sound off'; });
  }
  function load() {
    if (window.Vimeo) return init();
    var s = document.querySelector('script[data-vimeo-sdk]');
    if (!s) {
      s = document.createElement('script');
      s.src = 'https://player.vimeo.com/api/player.js';
      s.setAttribute('data-vimeo-sdk', '');
      document.head.appendChild(s);
    }
    s.addEventListener('load', init);
  }
  new IntersectionObserver(function (es, io) {
    if (es.some(function (e) { return e.isIntersecting; })) { load(); io.disconnect(); }
  }, { rootMargin: '600px' }).observe(root);

  // scrolled past: the film pauses on its own
  new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (!e.isIntersecting && player && playing && !document.fullscreenElement) player.pause().catch(function () {}); });
  }, { threshold: 0.2 }).observe(root);

  function playPause() {
    if (!player) return;
    player.getPaused().then(function (p) { return p ? player.play() : player.pause(); }).catch(function () {});
  }
  // one click plays or pauses; a double click goes full screen (the single click waits a moment to tell them apart)
  var clickT = 0;
  hit.addEventListener('click', function () {
    clearTimeout(clickT);
    clickT = setTimeout(playPause, 230);
  });
  hit.addEventListener('dblclick', function (e) {
    e.preventDefault();
    clearTimeout(clickT);
    toggleFull();
  });
  toggleBtn.addEventListener('click', playPause);
  muteBtn.addEventListener('click', function () {
    if (!player) return;
    player.setVolume(muted ? 1 : 0);
  });

  // seek: click or drag along the line; arrow keys step 5 s
  function seekAt(clientX) {
    if (!player || !dur) return;
    var r = track.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    fill.style.transform = 'scaleX(' + p + ')';
    player.setCurrentTime(p * dur).catch(function () {});
  }
  var seeking = false;
  track.addEventListener('pointerdown', function (e) { seeking = true; track.setPointerCapture(e.pointerId); seekAt(e.clientX); });
  track.addEventListener('pointermove', function (e) { if (seeking) seekAt(e.clientX); });
  track.addEventListener('pointerup', function () { seeking = false; });
  track.addEventListener('keydown', function (e) {
    if (!player || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    player.getCurrentTime().then(function (t) { player.setCurrentTime(Math.max(0, Math.min(dur, t + (e.key === 'ArrowRight' ? 5 : -5)))); });
  });

  // full screen: the whole frame, so these controls come along
  function toggleFull() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else if (root.requestFullscreen) root.requestFullscreen();
    else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
  }
  fsBtn.addEventListener('click', toggleFull);
  function onFull() {
    var on = (document.fullscreenElement || document.webkitFullscreenElement) === root;
    // the site's own pointer can't follow into full screen, so the normal pointer comes back there
    document.documentElement.classList.toggle('film-full', !!(document.fullscreenElement || document.webkitFullscreenElement));
    root.classList.toggle('is-full', on);
    fsBtn.textContent = on ? 'Exit full screen' : 'Full screen';
    if (on) { root.classList.remove('is-idle'); }
  }
  document.addEventListener('fullscreenchange', onFull);
  document.addEventListener('webkitfullscreenchange', onFull);

  // controls rest out of sight while the film plays and the pointer is still
  var idleT = 0;
  root.addEventListener('pointermove', function () {
    root.classList.remove('is-idle');
    clearTimeout(idleT);
    idleT = setTimeout(function () { if (playing) root.classList.add('is-idle'); }, 2200);
  });
  root.addEventListener('pointerleave', function () { if (playing) root.classList.add('is-idle'); });
}
})();
