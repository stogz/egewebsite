/* ═══════════════════════════════════════════
   EGE NBA SIMULATION · SHARED JAVASCRIPT
   Include at bottom of <body> on every page
═══════════════════════════════════════════ */

(function () {

  /* ── SIM-AWARE PAGE TITLE ── */
  if (window.EGE_SIM && EGE_SIM.id !== 'sim-original') {
    document.title = document.title.replace('EGE NBA Simulation', 'EGE ' + EGE_SIM.label + ' Simulation');
  }

  /* ── SIM LOGO SWAP ── */
  /* Each sim can define a logoFile in sim-config.js.
     Falls back to EGE_Logo.png if not set.
     To add a logo for a future sim, just set logoFile in its registry entry. */
  (function() {
    if (typeof EGE_SIM === 'undefined') return;
    var logo = EGE_SIM.logoFile;
    if (!logo || logo === 'EGE_Logo.png') return;

    // The nav logo itself is handled by sim-config.js, which writes a CSS
    // rule from <head> so the right mark is painted in the first frame
    // instead of being swapped in after load.

    // Swap favicon
    var favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = logo;
  })();

  /* ── SIM SWITCHER BUTTON (desktop nav) ── */
  (function() {
    if (typeof EGE_SIM === 'undefined') return;
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // If the static placeholder exists, populate it in place (no DOM move = no reflow).
    // Otherwise fall back to creating and inserting a new li before mode-toggle.
    var li = document.getElementById('sim-toggle-li');
    if (!li) {
      li = document.createElement('li');
      li.id = 'sim-toggle-li';
      var modeLi = document.querySelector('#mode-toggle').closest('li');
      navLinks.insertBefore(li, modeLi);
    }

    // Only create the button if it isn't already inside (prevents double-init)
    if (!document.getElementById('sim-toggle')) {
      var simBtn = document.createElement('button');
      simBtn.id = 'sim-toggle';
      simBtn.title = 'Switch simulation';
      simBtn.setAttribute('aria-label', 'Switch simulation');
      simBtn.innerHTML =
        '<span class="sim-toggle-label">' + window.EGE_SIM.label + '</span>' +
        '<svg class="sim-toggle-icon" width="10" height="10" viewBox="0 0 10 10" fill="none">' +
        '<path d="M1.5 3.5L5 7 8.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';
      li.appendChild(simBtn);
    }

    var simBtn = document.getElementById('sim-toggle');

    simBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var existing = document.getElementById('sim-dropdown');
      if (existing) { existing.remove(); return; }

      var dropdown = document.createElement('div');
      dropdown.id = 'sim-dropdown';

      Object.keys(window.EGE_SIM_REGISTRY).forEach(function(key) {
        var entry = window.EGE_SIM_REGISTRY[key];
        var item  = document.createElement('button');
        item.className = 'sim-dropdown-item' + (key === window.EGE_SIM.id ? ' active' : '');
        item.innerHTML =
          '<span class="sim-item-label">' + entry.label + '</span>' +
          '<span class="sim-item-sub">' + entry.subtitle + '</span>';
        item.addEventListener('click', function() { window.EGE_switchSim(key); });
        dropdown.appendChild(item);
      });

      document.body.appendChild(dropdown);
      var rect = simBtn.getBoundingClientRect();
      dropdown.style.top   = (rect.bottom + 8) + 'px';
      dropdown.style.right = (window.innerWidth - rect.right) + 'px';

      setTimeout(function() {
        document.addEventListener('click', function close(e2) {
          if (!dropdown.contains(e2.target) && e2.target !== simBtn) {
            dropdown.remove();
            document.removeEventListener('click', close);
          }
        });
      }, 0);
    });

  })();

  /* ── MOBILE HAMBURGER NAV ── */
  (function() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var pages = [
      { href: 'index.html',   label: 'Home' },
      { href: 'players.html', label: 'Players' },
      { href: 'teams.html',   label: 'Teams' },
      { href: 'history.html', label: 'History' },
      { href: 'other.html',   label: 'Other' },
    ];

    // Hamburger button — hidden on desktop via CSS, shown on mobile
    var btn = document.createElement('button');
    btn.id = 'nav-hamburger';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    // Dropdown menu — always in DOM, shown/hidden via CSS class
    var menu = document.createElement('div');
    menu.id = 'nav-mobile-menu';

    pages.forEach(function(p) {
      var a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.label;
      if (p.href === currentPage) a.classList.add('active');
      menu.appendChild(a);
    });

    // Divider
    var divEl = document.createElement('div');
    divEl.className = 'nav-menu-divider';
    menu.appendChild(divEl);

    // Sim switcher row in mobile menu
    if (typeof EGE_SIM !== 'undefined' && typeof EGE_SIM_REGISTRY !== 'undefined') {
      Object.keys(window.EGE_SIM_REGISTRY).forEach(function(key) {
        var entry = window.EGE_SIM_REGISTRY[key];
        var isActive = key === window.EGE_SIM.id;
        var simRow = document.createElement('button');
        simRow.className = 'nav-menu-sim-btn' + (isActive ? ' active' : '');
        simRow.textContent = isActive
          ? '◆  ' + entry.label + ' · Active'
          : '◇  ' + entry.label;
        simRow.addEventListener('click', function() {
          if (!isActive) window.EGE_switchSim(key);
        });
        menu.appendChild(simRow);
      });
      var div2 = document.createElement('div');
      div2.className = 'nav-menu-divider';
      menu.appendChild(div2);
    }

    // Mode toggle row (only visible inside mobile menu)
    var modeRow = document.createElement('button');
    modeRow.id = 'nav-menu-mode-toggle';
    modeRow.setAttribute('aria-label', 'Toggle light/dark mode');
    modeRow.textContent = '☀  Light / Dark Mode';
    modeRow.addEventListener('click', function() {
      var mainToggle = document.getElementById('mode-toggle');
      if (mainToggle) mainToggle.click();
      var isLight = document.documentElement.classList.contains('light');
      modeRow.textContent = isLight ? '☾  Light / Dark Mode' : '☀  Light / Dark Mode';
    });
    menu.appendChild(modeRow);
    nav.appendChild(menu);

    // Toggle open/close
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      btn.classList.toggle('open');
      menu.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target)) {
        btn.classList.remove('open');
        menu.classList.remove('open');
      }
    });

    // Close when a link is tapped
    menu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        btn.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  })();

  /* ── DARK / LIGHT MODE ── */
  const btn = document.getElementById('mode-toggle');
  const html = document.documentElement;

  function applyMode(mode) {
    if (mode === 'light') {
      html.classList.add('light');
      if (btn) btn.textContent = '☾';
    } else {
      html.classList.remove('light');
      if (btn) btn.textContent = '☀';
    }
  }

  // Load saved preference, default to dark
  const saved = localStorage.getItem('ege-mode') || 'dark';
  applyMode(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const isLight = html.classList.contains('light');
      const next = isLight ? 'dark' : 'light';
      localStorage.setItem('ege-mode', next);
      applyMode(next);
    });
  }

  /* ── MATRIX RAIN ── */
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, cols, drops;
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';

    function initMatrix() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols  = Math.floor(W / 18);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    }

    function drawMatrix() {
      const isLight = html.classList.contains('light');
      ctx.fillStyle = isLight ? 'rgba(240,237,232,0.12)' : 'rgba(8,5,47,0.06)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = '13px Share Tech Mono, monospace';
      for (let i = 0; i < drops.length; i++) {
        const c = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 5 === 0 ? '#e75719' : '#231aa5';
        ctx.fillText(c, i * 18, drops[i] * 18);
        if (drops[i] * 18 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.35;
      }
    }

    initMatrix();
    window.addEventListener('resize', initMatrix);
    setInterval(drawMatrix, 55);
  }

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(r => obs.observe(r));
  }

  /* ── COUNTER ANIMATION ── */
  function animCounter(el, target, duration) {
    duration = duration || 1400;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const p    = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.counter').forEach(c => {
          animCounter(c, parseInt(c.dataset.target));
        });
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.stats-strip').forEach(s => counterObs.observe(s));

  /* ── DATA BAR ANIMATION ── */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.data-bar').forEach((b, i) => {
          setTimeout(() => b.classList.add('animated'), i * 120);
        });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.players-grid').forEach(g => barObs.observe(g));

})();

  /* ══════════════════════════════════════════════════════════════
     TOOLTIP

     One element, one set of styles, shared by the progression chart, the
     position pie and the scouting rows on Players, and the win-history
     chart on Teams. Each of those used to build its own div with its own
     inline colours, padding and shadow, which is why they never quite
     matched. It lives here rather than on either page so a change to the
     shape of a tooltip lands on both at once.

     Behaviour worth knowing:
     · Positioned with transform, so following the cursor does not force a
       layout on every mouse move.
     · Kept inside the viewport, flipping to the other side of the cursor
       when it would overflow rather than being cut off at the edge.
     · Hidden on scroll, wheel and resize. It is position:fixed, so without
       that it hangs in place while the page moves underneath.
     · On touch, CSS docks it to the bottom of the screen — there is no
       cursor to follow and anything at the finger sits under the finger.
     ══════════════════════════════════════════════════════════════ */
  window.EGETooltip = (function () {
    var el = null;
    var OFFSET_X = 16, OFFSET_Y = 18, EDGE = 10;

    function isCoarse() {
      return window.matchMedia
        && window.matchMedia('(hover: none), (pointer: coarse)').matches;
    }

    /* Built once up front rather than on first hover: place() measures the
       element straight after setting its content, and a div appended in the
       same tick can still report a width of zero. */
    function node() {
      if (el && el.isConnected) return el;
      el = document.getElementById('ege-tooltip');
      if (!el) {
        el = document.createElement('div');
        el.id = 'ege-tooltip';
        el.className = 'ege-tooltip';
        el.setAttribute('role', 'tooltip');
        el.setAttribute('aria-hidden', 'true');
      }
      if (!el.isConnected && document.body) document.body.appendChild(el);
      return el;
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', node);
    } else {
      node();
    }

    /* Place near (x, y) in viewport coordinates, staying on screen. */
    function place(x, y) {
      var t = node();
      if (isCoarse()) return;            // CSS docks it; nothing to position
      var w = t.offsetWidth, h = t.offsetHeight;
      var left = x + OFFSET_X;
      var top  = y - OFFSET_Y;
      if (left + w > window.innerWidth - EDGE) left = x - w - OFFSET_X;
      if (left < EDGE) left = EDGE;
      if (top + h > window.innerHeight - EDGE) top = y - h - OFFSET_Y;
      if (top < EDGE) top = EDGE;
      t.style.transform = 'translate(' + Math.round(left) + 'px,' + Math.round(top) + 'px)';
    }

    function show(html, x, y) {
      var t = node();
      t.innerHTML = html;
      t.classList.add('is-open');
      t.setAttribute('aria-hidden', 'false');
      place(x, y);                        // after paint, so offsetWidth is real
    }

    function move(x, y) {
      if (el && el.classList.contains('is-open')) place(x, y);
    }

    function hide() {
      if (!el) return;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
    }

    /* A fixed-position tooltip does not move with the page, so anything that
       scrolls or resizes the viewport has to dismiss it. Capture phase picks
       up scrolling inside the tables and chart panes too, not just the page. */
    ['scroll', 'wheel'].forEach(function (evt) {
      window.addEventListener(evt, hide, { passive: true, capture: true });
    });
    window.addEventListener('resize', hide, { passive: true });
    window.addEventListener('orientationchange', hide, { passive: true });
    // A tap anywhere outside the thing that opened it closes it on touch.
    document.addEventListener('touchstart', function (e) {
      if (!el || !el.classList.contains('is-open')) return;
      if (e.target && e.target.closest && e.target.closest('[data-tt-source]')) return;
      hide();
    }, { passive: true });

    /* ── Shared markup builders, so every caller looks the same ── */
    function body(opts) {
      return '<div class="ege-tt-row">'
        + (opts.logo ? '<img class="ege-tt-logo" src="' + opts.logo + '" alt="">' : '')
        + '<div class="ege-tt-main">'
        + '<div class="ege-tt-title">' + opts.title + '</div>'
        + (opts.sub ? '<div class="ege-tt-sub">' + opts.sub + '</div>' : '')
        + '</div>'
        + '<div class="ege-tt-value"' + (opts.valueColor ? ' style="color:' + opts.valueColor + ';"' : '') + '>'
        + opts.value
        + (opts.unit ? '<span class="ege-tt-unit">' + opts.unit + '</span>' : '')
        + '</div></div>';
    }

    return { show: show, move: move, hide: hide, body: body, isCoarse: isCoarse };
  })();
