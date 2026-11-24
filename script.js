/* =========================================================
   Harigovind Sajimon — portfolio behaviour
   Plain vanilla JS. No framework, no build step.
   Replaces the Claude Design <x-dc> runtime entirely.
   ========================================================= */

(function () {
  'use strict';

  var body    = document.body;
  var stage   = document.getElementById('stage');
  var buttons = document.querySelectorAll('[data-mode-btn]');

  /* ---------- Shared body scroll lock ----------
     Any overlay (project modal, lightbox, forge lightbox, archive, contact)
     locks the background here. Because body.modal-open is position:fixed, we
     must remember the scroll position and restore it — otherwise the page
     jumps to the top when the overlay opens (and again when it closes).
     A counter lets overlays nest (e.g. a lightbox opened from the archive)
     without one closing unlocking the other prematurely. */
  var scrollLockCount = 0;
  var savedScrollY = 0;
  function lockScroll() {
    if (scrollLockCount === 0) {
      savedScrollY = window.scrollY || window.pageYOffset || 0;
      body.style.top = (-savedScrollY) + 'px';
      body.classList.add('modal-open');
    }
    scrollLockCount++;
  }
  function unlockScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      body.classList.remove('modal-open');
      body.style.top = '';
      window.scrollTo(0, savedScrollY);
    }
  }

  /* Always open at the top. Browsers restore the previous scroll position on
     reload, which drops visitors into the middle of the page. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- Shareable mode URLs ----------
     Read is the default landing view (harigovind.ie) — page 1.
     Look has its own shareable link (harigovind.ie/#look) — page 2.
     Toggling REPLACES the URL rather than pushing history, so the back button
     leaves the site instead of stepping back through view toggles. */
  var VALID_MODES = ['look', 'read'];
  var activeProjectId = null;

  function projectIdFromHash() {
    var h = (location.hash || '').replace('#', '').toLowerCase();
    if (!h) return null;
    var parts = h.split('/');
    if (parts[0] === 'project' && parts[1]) return parts[1];
    if (parts[0] === 'read' && parts[1] === 'project' && parts[2]) return parts[2];
    return null;
  }

  /* Read is page 1 (the default, no hash); Look is page 2 (#look).
     Project links and in-page Read anchors (#index) belong to Read;
     any other in-page anchor keeps whichever mode is showing. */
  function modeFromURL() {
    var h = (location.hash || '').replace('#', '').toLowerCase();
    if (h === 'look') return 'look';
    if (!h || h === 'read' || h === 'index' || h.indexOf('project/') === 0 || h.indexOf('read/') === 0) return 'read';
    return body.getAttribute('data-mode') || 'read';
  }

  function syncURL(mode, projectId) {
    var base = location.pathname + location.search;
    var hash = '';

    if (projectId) {
      hash = 'project/' + projectId;
    } else if (mode === 'look') {
      hash = 'look';
    }

    var target = base + (hash ? '#' + hash : '');
    if (location.href !== new URL(target, location.origin).href) {
      history.replaceState(null, '', target);
    }
  }

  /* read the transition duration from CSS so JS + CSS stay in sync */
  function transitionMs() {
    var raw = getComputedStyle(body).getPropertyValue('--dur').trim(); // e.g. "600ms"
    var n = parseFloat(raw);
    return isNaN(n) ? 600 : n;
  }

  var blurTimer = null;
  /* assigned later once the rail is set up; called after a mode switch
     since the rail's dimensions only exist while its panel is visible */

  function switchTo(mode) {
    if (mode === body.getAttribute('data-mode')) return;

    /* set the mode — CSS variables + panel visibility follow automatically */
    body.setAttribute('data-mode', mode);

    /* update the switch buttons' selected state */
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-selected', String(btn.dataset.modeBtn === mode));
    });

    /* fire the mid-transition blur on the content wrapper */
    clearTimeout(blurTimer);
    stage.classList.remove('is-switching');
    /* force reflow so the animation restarts even on rapid toggles */
    void stage.offsetWidth;
    stage.classList.add('is-switching');
    blurTimer = setTimeout(function () {
      stage.classList.remove('is-switching');
    }, transitionMs() + 60);


    syncURL(mode, mode === 'read' ? activeProjectId : null);
  }

  /* Set the mode WITHOUT the visible blur transition. Used when opening a
     project from Look: the modal covers the whole screen, so animating the
     Read landing view underneath just causes a visible flash before the modal
     appears. This sets the underlying state silently so closing the modal
     lands correctly in Read. */
  function setModeSilently(mode) {
    if (mode === body.getAttribute('data-mode')) return;
    body.setAttribute('data-mode', mode);
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-selected', String(btn.dataset.modeBtn === mode));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchTo(btn.dataset.modeBtn);
    });
  });

  /* ---------- Initial mode from the URL ----------
     #look opens Look directly (shareable); anything else lands on Read. */
  (function initMode() {
    var initial = modeFromURL();
    var current = body.getAttribute('data-mode');

    // set state without the switch animation on first paint
    // (the inline head script may already have set data-mode, so always sync the buttons)
    if (initial !== current) body.setAttribute('data-mode', initial);
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-selected', String(btn.dataset.modeBtn === initial));
    });
    syncURL(initial, initial === 'read' ? projectIdFromHash() : null);

    // start at the top regardless of what the browser remembered
    requestAnimationFrame(function () { window.scrollTo(0, 0); });
  })();

  /* if someone edits the hash or uses back/forward, follow it */
  window.addEventListener('hashchange', function () {
    var nextMode = modeFromURL();
    var nextProject = projectIdFromHash();
    if (nextProject) {
      activeProjectId = nextProject;
      switchTo(nextMode);
      openProject(nextProject, { updateUrl: false });
    } else {
      switchTo(nextMode);
      if (modal && modal.getAttribute('aria-hidden') === 'false') closeProject();
    }
  });

  /* ---------- Project data ----------
     Sourced from github.com/heli0hari/portfolio (script.js `projects` array),
     condensed for this site's lighter-weight modal. */
  /* Project case studies are loaded from projects.json (ported from the old
     portfolio). Rendered by renderBlocks() into the instrument-panel language. */
  var projectData = {};
  fetch('projects.json?v=5')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      projectData = d;
      var initialProject = projectIdFromHash();
      if (initialProject && projectData[initialProject]) {
        activeProjectId = initialProject;
        openProject(initialProject, { updateUrl: false });
      }
    })
    .catch(function (e) { console.warn('[projects]', e.message); });

  /* ---------- Project detail modal ---------- */
  var modal = document.getElementById('projectModal');
  var modalPanel      = modal && (modal.querySelector('.project-modal__panel') || modal);
  var modalScroll      = modal && modal.querySelector('.project-modal__scroll');
  var modalMeta        = document.getElementById('projectModalMeta');
  var modalTitle       = document.getElementById('projectModalTitle');
  var modalDesc        = document.getElementById('projectModalDesc');
  var modalTags        = document.getElementById('projectModalTags');
  var modalContent     = document.getElementById('projectModalContent');
  var modalLastFocused = null;

  function modalFocusables() {
    return modalPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') { closeProject(); return; }
    if (e.key !== 'Tab') return;
    var els = modalFocusables();
    if (!els.length) return;
    var first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }


  /* ---------- Case study block renderer ----------
     Renders the ported content blocks in the site's instrument-panel language:
     rounded cards, hairline borders, tiny uppercase labels, generous padding. */
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.innerHTML = text;
    return e;
  }

  function renderBlocks(blocks, into) {
    into.innerHTML = '';
    into.classList.add('cs');       // keep the element's existing classes
    (blocks || []).forEach(function (b) {
      var v = b.value;
      var node = null;

      switch (b.type) {
        case 'heading': {
          node = mk('h2');
          node.innerHTML = v;
          break;
        }
        case 'subheading': {
          node = mk('h3');
          node.innerHTML = v;
          break;
        }

        case 'paragraph': {
          node = mk('p');
          node.innerHTML = v;           // old content contains inline links
          break;
        }

        case 'quote': {
          node = mk('blockquote', 'cs-quote');
          node.appendChild(mk('p', null, v.text || v));
          if (v.author) node.appendChild(mk('cite', null, v.author));
          break;
        }

        case 'image': {
          node = mk('figure', 'cs-figure');
          var img = mk('img');
          img.src = v.src; img.alt = v.alt || ''; img.loading = 'lazy';
          node.appendChild(img);
          if (v.caption) node.appendChild(mk('figcaption', null, v.caption));
          break;
        }

        case 'table': {
          node = mk('div', 'cs-card');
          if (v.title) node.appendChild(mk('div', 'cs-label', v.title));
          
          // Create the new responsive wrapper
          var tableWrap = mk('div', 'cs-table-wrap');
          var t = mk('table', 'cs-table');
          
          if (Array.isArray(v)) {
            v.forEach(function (row, i) {
              var tr = mk('tr');
              row.forEach(function (cell) { 
                var cellNode = mk(i === 0 ? 'th' : 'td');
                cellNode.innerHTML = cell;
                tr.appendChild(cellNode); 
              });
              t.appendChild(tr);
            });
          } else {
            if (v.headers) {
              var tr = mk('tr');
              v.headers.forEach(function (h) { var th = mk('th'); th.innerHTML = h; tr.appendChild(th); });
              t.appendChild(tr);
            }
            (v.rows || []).forEach(function (row) {
              var tr2 = mk('tr');
              row.forEach(function (cell) { var td = mk('td'); td.innerHTML = cell; tr2.appendChild(td); });
              t.appendChild(tr2);
            });
          }
          
          // Inject the table into the wrapper, and the wrapper into the card
          tableWrap.appendChild(t);
          node.appendChild(tableWrap);
          break;
        }

        case 'gallery':
        case 'portrait-pair':
        case 'portrait_pair': {
          node = mk('div', 'cs-pair');
          (v.images || v || []).forEach(function (im) {
            var f = mk('figure', 'cs-figure');
            var i3 = mk('img'); i3.src = im.src || im; i3.alt = im.alt || ''; i3.loading = 'lazy';
            f.appendChild(i3);
            if (im.caption) f.appendChild(mk('figcaption', null, im.caption));
            node.appendChild(f);
          });
          break;
        }

        case 'list': {
          node = mk('ul', 'cs-list');
          (v.items || v).forEach(function (it) { 
            var li = mk('li');
            li.innerHTML = it;
            node.appendChild(li); 
          });
          break;
        }

        case 'lined-list': {
          node = mk('ul', 'cs-lined');
          (v.items || v).forEach(function (it) {
            var li = mk('li');
            li.innerHTML = (typeof it === 'string') ? it
              : ('<strong>' + (it.title || '') + '</strong> ' + (it.text || it.description || ''));
            node.appendChild(li);
          });
          break;
        }

        case 'box-list': {
          node = mk('ul', 'cs-boxes');
          (v.items || v).forEach(function (it) {
            var li = mk('li');
            li.innerHTML = (typeof it === 'string') ? it
              : ('<strong>' + (it.title || '') + '</strong><br>' + (it.text || it.description || ''));
            node.appendChild(li);
          });
          break;
        }

        case 'comparison': {
          node = mk('div', 'cs-compare');
          if (v.title) node.appendChild(mk('div', 'cs-compare__title', v.title));
          var cols = mk('div', 'cs-compare__cols');
          [v.left, v.right].forEach(function (side) {
            if (!side) return;
            var c = mk('div', 'cs-compare__col');
            c.appendChild(mk('h4', null, side.title));
            var ul = mk('ul');
            (side.items || []).forEach(function (it) { ul.appendChild(mk('li', null, it)); });
            c.appendChild(ul);
            cols.appendChild(c);
          });
          node.appendChild(cols);
          break;
        }

        case 'table': {
          node = mk('div', 'cs-card');
          if (v.title) node.appendChild(mk('div', 'cs-label', v.title));
          var t = mk('table', 'cs-table');
          if (v.headers) {
            var tr = mk('tr');
            v.headers.forEach(function (h) { tr.appendChild(mk('th', null, h)); });
            t.appendChild(tr);
          }
          (v.rows || []).forEach(function (row) {
            var tr2 = mk('tr');
            row.forEach(function (cell) { tr2.appendChild(mk('td', null, cell)); });
            t.appendChild(tr2);
          });
          node.appendChild(t);
          break;
        }

        /* architecture, concept-grid, snake-flow, flow, horizontal-flow all
           become node panels — a grid of bordered cards */
        case 'architecture': {
          node = mk('div', 'cs-arch');
          if (v.title) node.appendChild(mk('div', 'cs-label', v.title));
          var layers = Array.isArray(v) ? v : (v.layers || v.items || []);
          layers.forEach(function (layer, li) {
            var row = mk('div', 'cs-arch__layer');
            if (layer && !Array.isArray(layer) && (layer.text || layer.highlight)) {
              var hero = mk('div', 'cs-arch__node cs-arch__node--hero');
              hero.innerHTML = layer.text || '';
              row.appendChild(hero);
            } else {
              var groups = Array.isArray(layer) ? layer : [layer];
              groups.forEach(function (group) {
                var col = mk('div', 'cs-arch__group');
                var cells = Array.isArray(group) ? group : [group];
                cells.forEach(function (cell) {
                  var n = mk('div', 'cs-arch__node');
                  if (cell && cell.highlight) n.classList.add('cs-arch__node--hero');
                  n.innerHTML = (cell && cell.text != null) ? cell.text : (cell || '');
                  col.appendChild(n);
                });
                row.appendChild(col);
              });
            }
            node.appendChild(row);
            if (li < layers.length - 1) {
              var conn = mk('div', 'cs-arch__connector');
              conn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M6 14l6 6 6-6"/></svg>';
              node.appendChild(conn);
            }
          });
          break;
        }

        case 'concept-grid': {
          node = mk('div', 'cs-concept');
          if (v.title) node.appendChild(mk('div', 'cs-label', v.title));
          var cg = mk('div', 'cs-concept__grid');
          var citems = Array.isArray(v) ? v : (v.items || []);
          citems.forEach(function (it) {
            var card = mk('div', 'cs-concept__card');
            card.appendChild(mk('div', 'cs-concept__t', it.title || it.name || ''));
            if (it.description || it.text) card.appendChild(mk('div', 'cs-concept__d', it.description || it.text));
            cg.appendChild(card);
          });
          node.appendChild(cg);
          break;
        }

        case 'snake-flow':
        case 'flow':
        case 'horizontal-flow': {
          var steps = Array.isArray(v) ? v : (v.items || v.steps || []);
          var last = String(steps[steps.length - 1] || '').toLowerCase();
          var isLoop = /repeat|cycle|loop|back to|returns to/.test(last);

          node = mk('div', 'cs-flow' + (isLoop ? ' cs-flow--loop' : ''));
          if (v.title) node.appendChild(mk('div', 'cs-label', v.title));

          var track = mk('div', 'cs-flow__track');
          steps.forEach(function (it, i) {
            var step = mk('div', 'cs-flow__step');
            var num = mk('span', 'cs-flow__num', isLoop ? String(i + 1) : String(i + 1));
            var txt = mk('span', 'cs-flow__txt');
            txt.innerHTML = (typeof it === 'string') ? it : (it.title || it.label || it.text || '');
            step.appendChild(num);
            step.appendChild(txt);
            // the final step of a loop is the "return" marker
            if (isLoop && i === steps.length - 1) step.classList.add('cs-flow__step--return');
            track.appendChild(step);

            if (i < steps.length - 1) {
              var conn = mk('span', 'cs-flow__arrow');
              conn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
              track.appendChild(conn);
            }
          });
          node.appendChild(track);

          // for loops, add an explicit "returns to start" ribbon
          if (isLoop) {
            var ribbon = mk('div', 'cs-flow__loopback');
            ribbon.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.4 2.6L3 8"/><path d="M3 3v5h5"/></svg><span>Loops back to the start — the cycle repeats</span>';
            node.appendChild(ribbon);
          }
          break;
        }

        case 'roadmap': {
          node = mk('div', 'cs-road');
          (v.phases || v.items || v).forEach(function (ph) {
            var item = mk('div', 'cs-road__item');
            item.appendChild(mk('div', 'cs-road__phase', ph.phase || ph.title || ''));
            var bod = mk('div', 'cs-road__body');
            if (ph.title && ph.phase) bod.appendChild(mk('h4', null, ph.title));
            var ul2 = mk('ul');
            (ph.items || ph.points || []).forEach(function (p2) { ul2.appendChild(mk('li', null, p2)); });
            bod.appendChild(ul2);
            item.appendChild(bod);
            node.appendChild(item);
          });
          break;
        }

        case 'iframe': {
          node = mk('div', 'cs-frame');
          var fr = mk('iframe');
          fr.src = v.src; fr.title = v.title || 'Embedded content';
          fr.loading = 'lazy';
          fr.setAttribute('allowfullscreen', '');
          node.appendChild(fr);
          break;
        }

        case 'video': {
          node = mk('video', 'cs-video');
          node.src = v.src || v;
          node.controls = true; node.muted = true; node.loop = true;
          node.setAttribute('playsinline', '');
          if (v.poster) node.poster = v.poster;
          break;
        }

        case 'mobile-demo': {
          node = mk('div', 'cs-phone');
          var demoUrl = typeof v === 'string' ? v : (v.src || v.url || v.image);
          if (typeof demoUrl === 'string' && /^https?:\/\//i.test(demoUrl)) {
            var frame = mk('iframe');
            frame.src = demoUrl;
            frame.title = 'Live prototype preview';
            frame.loading = 'lazy';
            frame.setAttribute('allowfullscreen', '');
            frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
            node.appendChild(frame);
          } else if (v && (v.video || (v.src && /\.(mp4|webm)$/i.test(v.src)))) {
            var mv = mk('video');
            mv.src = v.video || v.src;
            mv.autoplay = true; mv.muted = true; mv.loop = true;
            mv.setAttribute('playsinline', '');
            node.appendChild(mv);
          } else {
            var mi = mk('img');
            mi.src = demoUrl || '';
            mi.alt = (typeof v === 'object' && v.alt) ? v.alt : 'Mobile demo preview';
            mi.loading = 'lazy';
            node.appendChild(mi);
          }
          break;
        }

        default: {
          // unknown block: render any text we can find rather than dropping it
          if (typeof v === 'string') node = mk('p', null, v);
          break;
        }
      }

      if (node) into.appendChild(node);
    });
  }

  function openProject(id, options) {
    var data = projectData[id];
    if (!modal || !data) return;

    options = options || {};
    activeProjectId = id;
    setModeSilently('read');

    modalLastFocused = document.activeElement;

    if (window.Journal) {
      // the journal lays out the whole project (cover, chapters, navigation)
      window.Journal.render(id, data, projectData, {
        renderBlock: function (block) { var d = document.createElement('div'); renderBlocks([block], d); return d; }
      });
    } else {
    // Update Top Navigation
    var modalTopCat = document.getElementById('projectModalTopCat');
    if (modalTopCat) modalTopCat.textContent = data.category;

    // Flatten tags into the Meta Row (Year · Category · Tags...)
    modalMeta.innerHTML = '';
    var metaArr = [data.year, data.category].concat(data.tags || []);
    metaArr.forEach(function (text, i) {
      if (i > 0) {
        var dot = document.createElement('span');
        dot.className = 'metarow__dot';
        dot.textContent = '·';
        modalMeta.appendChild(dot);
      }
      var span = document.createElement('span');
      span.textContent = text;
      modalMeta.appendChild(span);
    });

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    renderBlocks(data.content, modalContent);

    // Setup Next Project Footer Button
    var keys = Object.keys(projectData);
    var currIdx = keys.indexOf(id);
    var nextIdx = (currIdx + 1) % keys.length;
    var nextId = keys[nextIdx];
    var nextBtn = document.getElementById('projectModalNextTitle');
    
    if (nextBtn) {
      nextBtn.textContent = projectData[nextId].title;
      nextBtn.onclick = function() {
        if (modalScroll) modalScroll.scrollTop = 0;
        openProject(nextId);
      };
    }
    }

    if (options.updateUrl !== false) syncURL('read', id);

    // Only lock the background if the modal isn't already open. The "next
     // project" footer calls openProject() again on top of the open modal —
     // locking a second time would leave the counter unbalanced, so closing
     // later wouldn't fully unlock and the page scroll would stay broken.
    var alreadyOpen = modal.getAttribute('aria-hidden') === 'false';
    modal.setAttribute('aria-hidden', 'false');
    if (!alreadyOpen) lockScroll();
    document.addEventListener('keydown', onModalKeydown);
    if (modalScroll) modalScroll.scrollTop = 0;
    requestAnimationFrame(function () { modal.focus(); });
  }

  function closeProject() {
    if (!modal || modal.getAttribute('aria-hidden') === 'true') return;
    activeProjectId = null;
    modal.setAttribute('aria-hidden', 'true');
    unlockScroll();
    document.removeEventListener('keydown', onModalKeydown);
    syncURL('read', null);
    if (modalLastFocused && typeof modalLastFocused.focus === 'function') modalLastFocused.focus();
  }

  if (modal) {
    modal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeProject);
    });
    document.querySelectorAll('.readlink[data-project]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openProject(el.dataset.project);
      });
    });
  }

// === CONTACT MODAL (added / updated) ===
document.addEventListener('DOMContentLoaded', function() {
  var contactModal = document.getElementById('contactModal');
  var contactBtn = document.querySelector('.cta__primary');
  var projectModal = document.getElementById('projectModal');

  // Open contact modal
  if (contactBtn && contactModal) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactModal.setAttribute('aria-hidden', 'false');
      lockScroll();
    });
  }

  // Close contact modal via back button (data-modal-close)
  if (contactModal) {
    contactModal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', function () {
        contactModal.setAttribute('aria-hidden', 'true');
        unlockScroll();
      });
    });

    // Also allow clicking the backdrop (outside the scroll area)
    contactModal.addEventListener('click', function (e) {
      if (e.target === contactModal) {
        contactModal.setAttribute('aria-hidden', 'true');
        unlockScroll();
      }
    });
  }
});
})();