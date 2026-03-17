/* ═══════════════════════════════════════════
   EGE NBA SIMULATION · SHARED JAVASCRIPT
   Include at bottom of <body> on every page
═══════════════════════════════════════════ */

(function () {

  /* ── MOBILE NAV ROW ── */
  // Inject a full-width bottom row inside <nav> for mobile page links
  (function() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var pages = [
      { href: 'index.html',   label: 'Home' },
      { href: 'players.html', label: 'Players' },
      { href: 'teams.html',   label: 'Teams' },
      { href: 'history.html', label: 'History' },
      { href: 'draft.html',   label: 'Draft' },
    ];
    var row = document.createElement('div');
    row.className = 'nav-mobile-row';
    pages.forEach(function(p) {
      var a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.label;
      if (p.href === currentPage) a.classList.add('active');
      row.appendChild(a);
    });
    nav.appendChild(row);
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
