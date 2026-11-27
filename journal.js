/* =========================================================
   Project journal — renders a project from projects.json as a small
   art-directed publication: cover, numbered chapters, varied layouts,
   sticky navigation with chapter tracking and reading progress.

   Called by openProject() in script.js:
     Journal.render(id, data, allProjects, { renderBlock })
   renderBlock(block) returns the existing renderer's output for blocks this
   file doesn't lay out itself (tables, flows, diagrams, lists…), so their
   content and behaviour are unchanged.
   ========================================================= */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var modal = document.getElementById('projectModal');
  if (!modal) return;
  var scroller = modal.querySelector('.project-modal__scroll');
  var article = document.getElementById('projectModalContent');
  var navProj = document.getElementById('jnProj');
  var navChNo = document.getElementById('jnChNo');
  var navChLabel = document.getElementById('jnChLabel');
  var navChBtn = document.getElementById('jnCh');
  var navMenu = document.getElementById('jnMenu');
  var navPrev = document.getElementById('jnPrev');
  var navNext = document.getElementById('jnNext');
  var progress = document.getElementById('jnProgress');
  var toc = document.getElementById('jToc');

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function text(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent || ''; }

  /* homepage order (the index), falling back to the JSON order */
  /* pinned projects (Selected work) page through each other; index projects through the index */
  function order(all, id) {
    var pinned = document.querySelector('.cw__card[data-project="' + id + '"]');
    var sel = pinned ? '.cw__card[data-project]' : '.ix__row[data-project]';
    var ids = Array.prototype.map.call(document.querySelectorAll(sel), function (r) { return r.dataset.project; });
    return ids.length ? ids.filter(function (k) { return all[k]; }) : Object.keys(all);
  }

  /* image modes cycle per theme so consecutive images never repeat a layout */
  var CYCLE = {
    visual:   ['bleed', 'wide', 'offset-r', 'bleed', 'offset-l'],
    system:   ['wide', 'offset-r', 'wide', 'offset-l'],
    human:    ['offset-r', 'wide', 'offset-l', 'wide'],
    data:     ['wide', 'bleed', 'offset-l', 'wide'],
    material: ['bleed', 'offset-r', 'wide', 'offset-l']
  };
  var CAPTIONS = { system: true, data: true, material: true, human: true, visual: false };
  var WIDE_BLOCKS = { table: 1, architecture: 1, 'concept-grid': 1, 'snake-flow': 1, flow: 1, 'horizontal-flow': 1,
    comparison: 1, roadmap: 1, 'portrait-pair': 1, portrait_pair: 1, gallery: 1, iframe: 1, video: 1, 'mobile-demo': 1, 'box-list': 1 };

  var observers = [];
  function cleanup() {
    observers.forEach(function (o) { o.disconnect(); });
    observers = [];
    modal._lastTop = 0; modal.classList.remove('nav-tucked');
  }

  function render(id, data, all, api) {
    cleanup();
    var cfg = (window.JOURNAL && window.JOURNAL[id]) || { theme: 'system', cover: 'inset', chapters: [] };
    var theme = cfg.theme || 'system';
    var ids = order(all, id);
    var pos = ids.indexOf(id);
    var countEl = document.getElementById('jnCount');
    if (countEl) countEl.textContent = pad(pos + 1) + ' / ' + pad(ids.length);
    var blocks = data.content || [];
    var skip = {};
    (cfg.skip || []).forEach(function (i) { skip[i] = 1; });

    modal.setAttribute('data-theme', theme);
    modal.style.setProperty('--pj', 'oklch(0.52 0.09 ' + (data.hue != null ? data.hue : 220) + ')');   // deep enough to read on paper
    article.innerHTML = '';
    article.className = 'jr';

    /* ---------- cover ---------- */
    var heroBlock = blocks[0] && blocks[0].type === 'image' ? blocks[0].value : (data.image ? { src: data.image, alt: data.title } : null);
    if (cfg.coverImage) heroBlock = cfg.coverImage;     // a cleaner image than the project's title card
    if (blocks[0] && blocks[0].type === 'image') skip[0] = 1;
    var cover = el('header', 'jc jc--' + (cfg.cover || 'inset'));
    var kicker = el('div', 'jc__kicker');
    kicker.appendChild(el('span', null, 'No. ' + pad(pos + 1)));
    kicker.appendChild(el('span', null, data.category || ''));
    kicker.appendChild(el('span', null, data.year || ''));
    cover.appendChild(kicker);
    var h = el('h1', 'jc__title'); h.id = 'jTitle'; h.textContent = data.title;
    cover.appendChild(h);
    if (data.description) cover.appendChild(el('p', 'jc__lede')).textContent = data.description;

    var facts = el('dl', 'jc__facts');
    function fact(k, v) { if (!v) return; var d = el('div'); d.appendChild(el('dt', null)).textContent = k; d.appendChild(el('dd', null)).textContent = v; facts.appendChild(d); }
    // year and discipline already sit in the kicker above the title
    var f = cfg.facts || {};
    Object.keys(f).forEach(function (k) { fact(k, f[k]); });
    var tags = (data.tags || []).filter(function (t) { return t !== 'In progress'; });
    fact('Fields', tags.join(', '));
    if ((data.tags || []).indexOf('In progress') >= 0) fact('Status', 'In progress');
    cover.appendChild(facts);

    if (heroBlock) {
      var hf = el('figure', 'jc__media');
      var hi = el('img'); hi.src = heroBlock.src; hi.alt = heroBlock.alt || data.title;
      hi.decoding = 'async'; hi.setAttribute('fetchpriority', 'high');
      hf.appendChild(hi);
      cover.appendChild(hf);
    }
    article.appendChild(cover);

    /* ---------- chapters ---------- */
    var starts = (cfg.chapters || []).slice().sort(function (a, b) { return a.at - b.at; });
    if (!starts.length || starts[0].at > 1) starts.unshift({ at: 1, label: 'Overview' });
    var chapters = [];
    starts.forEach(function (c, k) {
      var end = k + 1 < starts.length ? starts[k + 1].at : blocks.length;
      var list = [];
      for (var i = c.at; i < end; i++) if (!skip[i] && blocks[i]) list.push(blocks[i]);
      if (list.length) chapters.push({ label: c.label, blocks: list });
    });

    var fig = 0;
    chapters.forEach(function (ch, k) {
      var sec = el('section', 'jch');
      sec.id = 'jch-' + (k + 1);
      sec.setAttribute('aria-labelledby', 'jch-t-' + (k + 1));
      var head = el('div', 'jch__head');
      head.appendChild(el('span', 'jch__no', pad(k + 1)));
      head.appendChild(el('span', 'jch__label', ch.label));
      sec.appendChild(head);

      var bl = ch.blocks.slice();
      var title = el('h2', 'jch__title');
      title.id = 'jch-t-' + (k + 1);
      if (bl[0] && bl[0].type === 'heading') {
        title.innerHTML = bl.shift().value.replace(/^\s*\d{1,2}[.)]\s+/, '');
        ch.title = text(title.innerHTML);
      }
      else { title.textContent = ch.label; title.classList.add('is-label'); ch.title = ch.label; }
      sec.appendChild(title);

      layout(bl, sec, k + 1);
      article.appendChild(sec);
      ch.el = sec;
    });

    function layout(bl, into, chNo) {
      var lede = false, hn = 0, cyc = 0, flip = false;
      var modes = CYCLE[theme] || CYCLE.system;
      for (var i = 0; i < bl.length; i++) {
        var b = bl[i], v = b.value;
        switch (b.type) {
          case 'heading': {
            hn++;
            var h3 = el('h3', 'jh');
            // headings that already carry their own step number ("02. …") keep it
            var own = /^\s*(\d{1,2})[.)]\s+/.exec(text(v));
            if (own) {
              h3.appendChild(el('span', 'jh__no', pad(+own[1])));
              h3.appendChild(el('span', null, v.replace(/^\s*\d{1,2}[.)]\s+/, '')));
            } else {
              if (theme === 'system' || theme === 'material') h3.appendChild(el('span', 'jh__no', chNo + '.' + hn));
              h3.appendChild(el('span', null, v));
            }
            into.appendChild(h3);
            lede = false;
            break;
          }
          case 'subheading': into.appendChild(el('h4', 'jsh', v)); break;
          case 'paragraph': {
            if (!lede) { into.appendChild(el('p', 'jp jp--lede', v)); lede = true; break; }
            // paragraph + a single image → side by side
            var nx = bl[i + 1], nn = bl[i + 2];
            if (theme !== 'visual' && nx && nx.type === 'image' && !(nn && nn.type === 'image') && text(v).length < 520) {
              var sp = el('div', 'jsplit' + (flip ? ' jsplit--rev' : ''));
              flip = !flip;
              sp.appendChild(el('p', 'jp', v));
              sp.appendChild(figure(nx.value, 'split'));
              into.appendChild(sp);
              i++;
              break;
            }
            into.appendChild(el('p', 'jp', v));
            break;
          }
          case 'image': {
            var run = [v];
            while (bl[i + 1] && bl[i + 1].type === 'image') run.push(bl[++i].value);
            if (run.length === 1) into.appendChild(figure(v, v.layout || modes[cyc++ % modes.length]));
            else into.appendChild(sequence(run));
            break;
          }
          case 'quote': {
            var q = typeof v === 'string' ? { text: v } : v;
            var bq = el('blockquote', 'jq' + (text(q.text || '').length > 110 ? ' jq--long' : ''));
            // the typographic opening mark comes from CSS; drop any the text brings
            bq.appendChild(el('p', null, (q.text || '').trim().replace(/^[“"‘']+|[”"’']+$/g, '')));
            if (q.cite || q.author) bq.appendChild(el('cite', null, q.cite || q.author));
            into.appendChild(bq);
            break;
          }
          case 'lined-list': {
            // personas: lift "Quote:" lines out as small pull quotes (human theme)
            if (theme === 'human' && Array.isArray(v)) {
              var quotes = v.filter(function (s) { return /<strong>Quote:<\/strong>/i.test(s); });
              var rest = v.filter(function (s) { return quotes.indexOf(s) < 0; });
              if (quotes.length) {
                if (rest.length) into.appendChild(wrap({ type: b.type, value: rest }));
                quotes.forEach(function (s) {
                  var t = s.replace(/<strong>Quote:<\/strong>\s*/i, '').trim().replace(/^['‘“"]|['’”"]$/g, '');
                  var pq = el('blockquote', 'jq jq--voice');
                  pq.appendChild(el('p', null, t));
                  into.appendChild(pq);
                });
                break;
              }
            }
            into.appendChild(wrap(b));
            break;
          }
          default: into.appendChild(wrap(b));
        }
      }
    }

    function figure(v, mode) {
      fig++;
      var f = el('figure', 'jf jf--' + mode);
      var im = el('img');
      im.src = v.src; im.alt = v.alt || ''; im.loading = 'lazy'; im.decoding = 'async';
      f.appendChild(im);
      if (CAPTIONS[theme] && (v.caption || v.alt)) {
        var cap = el('figcaption');
        cap.appendChild(el('span', 'jf__no', 'Fig. ' + pad(fig)));
        cap.appendChild(el('span', null, v.caption || v.alt));
        f.appendChild(cap);
      }
      return f;
    }
    function sequence(run) {
      var n = run.length;
      var s = el('div', 'jseq jseq--' + (n === 2 ? 'pair' : n === 3 ? 'tri' : 'grid'));
      run.forEach(function (v) { s.appendChild(figure(v, 'seq')); });
      return s;
    }
    function wrap(b) {
      var w = el('div', 'jx' + (WIDE_BLOCKS[b.type] ? ' jx--wide' : ''));
      w.appendChild(api.renderBlock(b));
      return w;
    }

    /* ---------- end: previous / next ---------- */
    var end = el('footer', 'jend');
    var prevId = ids[(pos - 1 + ids.length) % ids.length], nextId = ids[(pos + 1) % ids.length];
    function endLink(pid, dir) {
      var a = el('a', 'jend__link jend__link--' + dir);
      a.href = '#project/' + pid;
      a.appendChild(el('span', 'jend__dir', dir === 'prev' ? 'Previous' : 'Next'));
      a.appendChild(el('span', 'jend__no', 'No. ' + pad(ids.indexOf(pid) + 1)));
      a.appendChild(el('span', 'jend__title')).textContent = all[pid].title;
      a.appendChild(el('span', 'jend__cat')).textContent = all[pid].category || '';
      return a;
    }
    end.appendChild(endLink(prevId, 'prev'));
    end.appendChild(endLink(nextId, 'next'));
    var back = el('button', 'jend__back', 'Back to all work');
    back.type = 'button';
    back.setAttribute('data-modal-close', '');
    back.addEventListener('click', function () { var b = modal.querySelector('.jn__back'); if (b) b.click(); });
    end.appendChild(back);
    article.appendChild(end);

    /* ---------- navigation ---------- */
    navProj.textContent = data.title;
    navPrev.onclick = function () { location.hash = '#project/' + prevId; };
    navNext.onclick = function () { location.hash = '#project/' + nextId; };
    navPrev.setAttribute('aria-label', 'Previous project: ' + all[prevId].title);
    navNext.setAttribute('aria-label', 'Next project: ' + all[nextId].title);

    toc.innerHTML = ''; navMenu.innerHTML = '';
    chapters.forEach(function (ch, k) {
      [toc, navMenu].forEach(function (listEl) {
        var li = el('li');
        var b = el('button', 'jtoc__btn');
        b.type = 'button';
        b.appendChild(el('span', 'jtoc__no', pad(k + 1)));
        b.appendChild(el('span', 'jtoc__label', ch.label));
        b.addEventListener('click', function () { goTo(ch.el); closeMenu(); });
        li.appendChild(b);
        listEl.appendChild(li);
      });
    });

    function goTo(target) {
      var navH = modal.querySelector('.jn').offsetHeight;
      var top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - navH - 12;
      scroller.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
      var t = target.querySelector('.jch__title');
      if (t) { t.setAttribute('tabindex', '-1'); setTimeout(function () { t.focus({ preventScroll: true }); }, reduce ? 0 : 500); }
    }

    function setCurrent(k) {
      navChNo.textContent = k >= 0 ? pad(k + 1) : '';
      navChLabel.textContent = k >= 0 ? chapters[k].label : 'Cover';
      [toc, navMenu].forEach(function (listEl) {
        Array.prototype.forEach.call(listEl.children, function (li, j) {
          var b = li.firstChild;
          if (j === k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
        });
      });
    }
    setCurrent(-1);

    // current chapter = the last one whose top has passed the upper third
    var io = new IntersectionObserver(function () {
      var cur = -1, line = scroller.getBoundingClientRect().top + scroller.clientHeight * 0.33;
      chapters.forEach(function (ch, k) { if (ch.el.getBoundingClientRect().top < line) cur = k; });
      setCurrent(cur);
    }, { root: scroller, threshold: [0, 0.25, 0.5, 1], rootMargin: '0px 0px -40% 0px' });
    chapters.forEach(function (ch) { io.observe(ch.el); });
    observers.push(io);
    modal.classList.toggle('has-toc', chapters.length > 1);
  }

  /* reading progress + chapter tracking on scroll (one listener for all projects) */
  if (scroller) {
    scroller.addEventListener('scroll', function () {
      var max = scroller.scrollHeight - scroller.clientHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? scroller.scrollTop / max : 0).toFixed(4) + ')';
      modal.classList.toggle('is-scrolled', scroller.scrollTop > 40);
      // corner marks step out of the way while reading down, and return on the way back up
      var st = scroller.scrollTop, menuOpen = navChBtn.getAttribute('aria-expanded') === 'true';
      if (!menuOpen && Math.abs(st - (modal._lastTop || 0)) > 6) {
        modal.classList.toggle('nav-tucked', st > modal._lastTop && st > 120);
        modal._lastTop = st;
      }
      // margin chapter list steps aside whenever a picture runs under it
      var tocEl = toc.parentNode, tr = tocEl.getBoundingClientRect(), hit = false;
      if (tr.width) {
        var media = article.querySelectorAll('img, iframe, video, .jch__no');
        for (var m = 0; m < media.length && !hit; m++) {
          var r = media[m].getBoundingClientRect();
          if (r.bottom > tr.top - 8 && r.top < tr.bottom + 8 && r.left < tr.right + 16 && r.right > tr.left) hit = true;
        }
      }
      modal.classList.toggle('toc-covered', hit);
      // keep the chapter indicator honest between observer callbacks
      var line = scroller.getBoundingClientRect().top + scroller.clientHeight * 0.33, cur = -1;
      Array.prototype.forEach.call(article.querySelectorAll('.jch'), function (s, k) { if (s.getBoundingClientRect().top < line) cur = k; });
      var chs = article.querySelectorAll('.jch');
      navChNo.textContent = cur >= 0 ? pad(cur + 1) : '';
      navChLabel.textContent = cur >= 0 ? chs[cur].querySelector('.jch__label').textContent : 'Cover';
      [toc, navMenu].forEach(function (listEl) {
        Array.prototype.forEach.call(listEl.children, function (li, j) {
          if (j === cur) li.firstChild.setAttribute('aria-current', 'true'); else li.firstChild.removeAttribute('aria-current');
        });
      });
    }, { passive: true });
  }

  /* chapter menu (narrow screens) */
  function closeMenu() { navMenu.hidden = true; navChBtn.setAttribute('aria-expanded', 'false'); }
  if (navChBtn) {
    navChBtn.addEventListener('click', function () {
      var open = navMenu.hidden;
      navMenu.hidden = !open;
      navChBtn.setAttribute('aria-expanded', String(open));
      if (open) { var f = navMenu.querySelector('button'); if (f) f.focus(); }
    });
    navMenu.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); closeMenu(); navChBtn.focus(); } });
    document.addEventListener('click', function (e) { if (!navMenu.hidden && !e.target.closest('.jn__where')) closeMenu(); });
  }

  window.Journal = { render: render };
})();
