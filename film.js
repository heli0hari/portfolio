/* =========================================================
   Color Grading film — the Vimeo video with the site's own controls.
   The embed runs with controls=0 (no Vimeo chrome); a transparent
   layer over it takes clicks, so the site's pointer keeps working
   over the film. Controls: play/pause, seek, sound, full screen.
   Uses Vimeo's Player SDK, loaded only when the film is near.
   ========================================================= */
(function () {
  var root = document.getElementById('gradeFilm');
  if (!root) return;
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
    player = new window.Vimeo.Player(iframe);
    player.getDuration().then(function (d) { dur = d; timeEl.textContent = '00:00 / ' + fmt(d); });
    player.on('play', function () { setPlaying(true); root.classList.add('has-started'); });
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
    var s = document.createElement('script');
    s.src = 'https://player.vimeo.com/api/player.js';
    s.onload = init;
    document.head.appendChild(s);
  }
  new IntersectionObserver(function (es, io) {
    if (es.some(function (e) { return e.isIntersecting; })) { load(); io.disconnect(); }
  }, { rootMargin: '600px' }).observe(root);

  function playPause() {
    if (!player) return;
    player.getPaused().then(function (p) { return p ? player.play() : player.pause(); }).catch(function () {});
  }
  hit.addEventListener('click', playPause);
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
  fsBtn.addEventListener('click', function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (root.requestFullscreen) root.requestFullscreen();
    else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
  });
  document.addEventListener('fullscreenchange', function () {
    var on = document.fullscreenElement === root;
    root.classList.toggle('is-full', on);
    fsBtn.textContent = on ? 'Exit full screen' : 'Full screen';
  });

  // controls rest out of sight while the film plays and the pointer is still
  var idleT = 0;
  root.addEventListener('pointermove', function () {
    root.classList.remove('is-idle');
    clearTimeout(idleT);
    idleT = setTimeout(function () { if (playing) root.classList.add('is-idle'); }, 2200);
  });
  root.addEventListener('pointerleave', function () { if (playing) root.classList.add('is-idle'); });
})();
