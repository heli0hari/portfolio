// three.js + the sculpture load only when the section is about to be seen
const ARCHIVE_URL = './archive.js?v=1795412069';
function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

const section = document.getElementById('archive');
const stage = document.getElementById('archiveStage');
const nowEl = document.getElementById('archiveNow');
const loadingBar = document.querySelector('#archiveLoading i');

function label(p) {
  return (p.tags && p.tags.length) ? p.tags.slice(0, 2).join(' · ') : 'photograph';
}
function pad(n) { return String(n).padStart(2, '0'); }

/* ---------- viewer ---------- */
const viewer = document.getElementById('viewer');
const vImg = document.getElementById('viewerImg');
const vCap = document.getElementById('viewerCap');
const vCount = document.getElementById('viewerCount');
let vList = [], vPos = 0, lastFocus = null;

let api = null;                               // set once the sculpture mounts
let animating = false;
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

function show() {
  const p = vList[vPos];
  vImg.classList.remove('is-sharp');
  vImg.src = p.thumb || p.src;                 // preview (already cached from the wall)
  vImg.alt = p.alt || ('Photograph, ' + label(p));
  vCap.textContent = label(p);
  vCount.textContent = pad(vPos + 1) + ' / ' + pad(vList.length);
  // load the original off-screen and swap only once it's decoded and nothing is
  // animating — swapping mid-flight blanks the image for a frame
  const full = new Image();
  full.src = p.src;
  full.decode().then(() => {
    const swap = () => {
      if (vList[vPos] !== p || !viewer.classList.contains('is-open')) return;
      if (animating) return setTimeout(swap, 120);
      vImg.src = p.src; vImg.classList.add('is-sharp');
    };
    swap();
  }).catch(() => {});
  return vImg.decode().catch(() => {});
}

/* Final on-screen box of the image, from the photo's aspect and the CSS limits. */
function finalBox(p) {
  const maxW = Math.min(innerWidth * (innerWidth < 700 ? 0.94 : 0.88), 1600);
  const maxH = innerHeight * 0.8;
  const a = p.w / p.h;
  let w = maxW, h = w / a;
  if (h > maxH) { h = maxH; w = h * a; }
  return { w, h };
}
function sizeImg() {
  const { w, h } = finalBox(vList[vPos]);
  vImg.style.width = w + 'px'; vImg.style.height = h + 'px';
}

/* FLIP between the card's rect on the wall and the image's final box. */
function flip(rect, reverse) {
  const box = vImg.getBoundingClientRect();
  const sx = rect.width / box.width, sy = rect.height / box.height;
  const dx = rect.left - box.left, dy = rect.top - box.top;
  const at = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  return vImg.animate(
    reverse ? [{ transform: 'none' }, { transform: at }] : [{ transform: at }, { transform: 'none' }],
    { duration: 620, easing: EASE, fill: 'forwards' }
  );
}
const nextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

async function open(i, list, rect) {
  if (animating) return;
  animating = true;
  vList = list; vPos = i; lastFocus = document.activeElement;
  vImg.style.visibility = 'hidden';
  await show();                                 // decoded before it's ever painted
  sizeImg();
  viewer.classList.add('is-open');
  if (rect && !reduceMotion) viewer.classList.add('is-flipping');
  viewer.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('viewer-open');
  if (rect && !reduceMotion) {
    const anim = flip(rect, false);              // first painted frame is already over the card
    vImg.style.visibility = '';
    await nextFrame();
    if (api) api.lift(vList[vPos]);              // hide the wall card only once the image covers it
    await anim.finished.catch(() => {});
    anim.commitStyles && anim.cancel();
    viewer.classList.remove('is-flipping');
  } else {
    vImg.style.visibility = '';
    if (api) api.lift(vList[vPos]);
  }
  animating = false;
  document.getElementById('viewerClose').focus({ preventScroll: true });
}
async function close() {
  if (animating || !viewer.classList.contains('is-open')) return;
  animating = true;
  const rect = api && !reduceMotion ? api.rectFor(vList[vPos]) : null;
  if (rect) {
    viewer.classList.add('is-closing', 'is-flipping');
    const anim = flip(rect, true);
    await anim.finished.catch(() => {});
    // put the card back on the wall first, let the 3D view draw it, then remove the image
    if (api) api.release();
    await nextFrame();
    viewer.classList.remove('is-open', 'is-closing', 'is-flipping');
    anim.cancel();
  } else {
    if (api) api.release();
    viewer.classList.remove('is-open');
  }
  viewer.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('viewer-open');
  animating = false;
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}
function step(d) {
  if (animating) return;
  vPos = (vPos + d + vList.length) % vList.length;
  show().then(() => {
    sizeImg();
    vImg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: EASE });
  });
  if (api) api.lift(vList[vPos]);
}
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.getElementById('viewerClose').addEventListener('click', close);
document.getElementById('viewerPrev').addEventListener('click', () => step(-1));
document.getElementById('viewerNext').addEventListener('click', () => step(1));
viewer.addEventListener('click', e => { if (e.target === viewer) close(); });
document.addEventListener('keydown', e => {
  if (!viewer.classList.contains('is-open')) return;
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowRight') step(1);
  else if (e.key === 'ArrowLeft') step(-1);
});
let touchX = null;
viewer.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
viewer.addEventListener('touchend', e => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  touchX = null;
});

/* ---------- sculpture ---------- */
const hint = document.getElementById('archiveHint');
const rail = document.getElementById('archiveRail');
const HINTS = ['Drag to turn · Scroll to open', 'Keep scrolling', 'Scroll or drag to browse · Click a photo to view'];

if (!webglAvailable()) {
  document.getElementById('archiveFallback').hidden = false;
  hint.hidden = true;
  section.style.height = 'auto';
} else {
  // wait until the section is near the viewport (and visible — Look mode on the main site)
  const near = new Promise(resolve => {
    const io = new IntersectionObserver(en => {
      if (en.some(e => e.isIntersecting)) { io.disconnect(); resolve(); }
    }, { rootMargin: '1200px 0px' });
    io.observe(section);
  });
  near.then(() => Promise.all([fetch('photos.json').then(r => r.json()), import(ARCHIVE_URL)]))
    .then(([data, mod]) => {
      const mountArchive = mod.mountArchive;
      api = mountArchive(stage, data.photos || [], {
        onOpen: open,
        onHover: (p, i, n) => { nowEl.textContent = p ? pad(i + 1) + ' / ' + pad(n) + '  —  ' + label(p) : api.total + ' photographs'; },
        onStage: s => {
          hint.textContent = HINTS[s];
          section.classList.toggle('is-open', s > 0);
          section.classList.toggle('is-carousel', s === 2);
          if (s === 0) nowEl.textContent = api.total + ' photographs';
        },
        onLoad: (d, n) => {
          loadingBar.style.transform = 'scaleX(' + (d / n) + ')';
          if (d === n) section.classList.add('is-ready');
        },
      });
      nowEl.textContent = api.total + ' photographs';
      requestAnimationFrame(() => requestAnimationFrame(() => section.classList.add('is-mounted')));

      // Scroll length: two screens for the explode + form, then enough to turn
      // the carousel once through every photo (~7% of a screen per photo).
      const INTRO = 2;
      function sizeSection() { section.style.height = ((1 + INTRO + api.spinScreens()) * 100) + 'vh'; }
      sizeSection();
      function onScroll() {
        const vh = window.innerHeight;
        const y = -section.getBoundingClientRect().top;
        const total = Math.max(1, section.offsetHeight - vh);
        const intro = Math.min(1, Math.max(0, y / (INTRO * vh)));
        const spin = Math.min(1, Math.max(0, (y - INTRO * vh) / Math.max(1, total - INTRO * vh)));
        api.setProgress(intro, spin);
        rail.style.transform = 'scaleY(' + Math.min(1, Math.max(0, y / total)).toFixed(4) + ')';
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', () => { sizeSection(); onScroll(); });
      new ResizeObserver(() => requestAnimationFrame(() => { sizeSection(); onScroll(); })).observe(stage);
      onScroll();

      // arrow keys step through the carousel when it's on screen
      document.addEventListener('keydown', e => {
        if (viewer.classList.contains('is-open') || api.stage() !== 2) return;
        if (e.key === 'ArrowRight') { api.step(1); e.preventDefault(); }
        else if (e.key === 'ArrowLeft') { api.step(-1); e.preventDefault(); }
      });
    })
    .catch(err => console.warn('Archive: could not load photos.json', err));
}
