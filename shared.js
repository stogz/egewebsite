/* ═══════════════════════════════════════════
   EGE NBA SIMULATION · SHARED JAVASCRIPT
   Include at bottom of <body> on every page
═══════════════════════════════════════════ */

(function () {

  /* ── SIM SWITCHER BUTTON (desktop nav) ── */
  (function() {
    if (typeof EGE_SIM === 'undefined') return;
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    var simBtn = document.createElement('button');
    simBtn.id = 'sim-toggle';
    simBtn.title = 'Switch simulation';
    simBtn.setAttribute('aria-label', 'Switch simulation');

    function updateSimBtn() {
      simBtn.innerHTML =
        '<span class="sim-toggle-label">' + window.EGE_SIM.label + '</span>' +
        '<svg class="sim-toggle-icon" width="10" height="10" viewBox="0 0 10 10" fill="none">' +
        '<path d="M1.5 3.5L5 7 8.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';
    }
    updateSimBtn();

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
      dropdown.style.right  = (window.innerWidth - rect.right) + 'px';

      setTimeout(function() {
        document.addEventListener('click', function close(e2) {
          if (!dropdown.contains(e2.target) && e2.target !== simBtn) {
            dropdown.remove();
            document.removeEventListener('click', close);
          }
        });
      }, 0);
    });

    var li = document.createElement('li');
    li.appendChild(simBtn);
    var lastLi = navLinks.querySelector('li:last-child');
    navLinks.insertBefore(li, lastLi);

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
