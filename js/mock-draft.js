/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION · MOCK DRAFT (js/mock-draft.js)
   2012 draft class, altered to include five EGE Simulation
   originals. Setup modal → pick-by-pick draft board.
   ═══════════════════════════════════════════════════════════════ */

(function () {

  var SEASON       = '2011-12';
  var STAT_COLS    = ['ppg','rpg','apg','spg','bpg','fgp','tpp','ftp','mpg'];
  var LOGOS_DIR    = 'logos/';
  var NBA_CDN      = 'https://cdn.nba.com/headshots/nba/latest/1040x760/';

  var state = {
    order:  [],   // draft slots for this sim length
    pool:   [],   // remaining prospects
    log:    [],   // completed picks, pick order: { pick, team, prospect }
    pickIdx: 0,
  };

  var pendingProspect = null; // prospect awaiting yes/no confirmation
  var colorMode = false;      // heatmap toggle for the pool table

  function fmt1(n) { return (Math.round(n * 10) / 10).toFixed(1); }
  function fmtPct(n) { return fmt1(n) + '%'; }

  function teamInfo(teamKey) {
    return window.getTeamInfoForSeason(teamKey, SEASON);
  }

  function initials(name) {
    return name.split(' ').map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase();
  }

  /* ── PORTRAIT — NBA.com CDN / EGE weebly icon / initials fallback ── */
  function portraitHtml(p, sizeClass) {
    var url = p.iconUrl || (p.nbaId ? NBA_CDN + p.nbaId + '.png' : '');
    if (!url) return '<span class="md-portrait md-portrait-fallback ' + sizeClass + '">' + initials(p.name) + '</span>';
    return '<img class="md-portrait ' + sizeClass + '" src="' + url + '" alt="" data-fallback="' + initials(p.name) + '" />';
  }

  function bindPortraitFallbacks(root) {
    root.querySelectorAll('img.md-portrait').forEach(function (img) {
      img.addEventListener('error', function () {
        var span = document.createElement('span');
        span.className = img.className.replace('md-portrait', 'md-portrait md-portrait-fallback');
        span.textContent = img.dataset.fallback;
        img.replaceWith(span);
      });
    });
  }

  /* ── SETUP MODAL ── */
  function initSetupModal() {
    var backdrop = document.getElementById('md-setup-backdrop');
    backdrop.querySelectorAll('[data-length]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        startDraft(parseInt(btn.dataset.length, 10));
        backdrop.classList.remove('active');
      });
    });
  }

  function openSetupModal() {
    document.getElementById('md-app').style.display = 'none';
    document.getElementById('md-pool-section').style.display = 'none';
    document.getElementById('md-onclock').innerHTML = '';
    document.getElementById('md-setup-backdrop').classList.add('active');
  }

  function startDraft(length) {
    state.order = window.MOCK_DRAFT_2012.order.slice(0, length);
    state.pool = window.MOCK_DRAFT_2012.prospects.slice();
    state.log = [];
    state.pickIdx = 0;
    sortState = { key: 'estPick', dir: 'asc' };
    document.getElementById('md-app').style.display = '';
    preloadLogos(state.order.map(function (s) { return s.team; }));
    renderHeader();
    renderPool();
    renderLog();
  }

  /* ── HEADER (on the clock + starting five + restart/undo) ── */
  function renderHeader() {
    var wrap = document.getElementById('md-onclock');
    var controls =
      '<div class="md-onclock-controls">' +
        '<button id="md-undo-btn" class="md-ctrl-btn"' + (state.log.length ? '' : ' disabled') + '>&#8630; Undo Pick</button>' +
        '<button id="md-restart-btn" class="md-ctrl-btn md-ctrl-danger">Restart</button>' +
      '</div>';

    if (state.pickIdx >= state.order.length) {
      wrap.innerHTML = controls +
        '<div class="md-done"><div class="md-done-title">Draft Complete</div>' +
        '<p class="md-done-sub">All ' + state.order.length + ' picks are in. Scroll down to see the full board.</p></div>';
      bindHeaderControls();
      return;
    }

    var slot = state.order[state.pickIdx];
    var info = teamInfo(slot.team);
    var record = window.MOCK_DRAFT_2012.records[slot.team] || '—';
    var lineup = window.MOCK_DRAFT_2012.lineups[slot.team] || [];

    var lineupHtml = '<div class="md-lineup"><div class="md-lineup-label">Projected ' + SEASON + ' Starting Five</div><div class="md-lineup-row">';
    lineup.forEach(function (pl) {
      lineupHtml += '<div class="md-lineup-player">' + portraitHtml(pl, 'md-portrait-md') + '<span class="md-lineup-name">' + pl.name + '</span></div>';
    });
    lineupHtml += '</div></div>';

    wrap.innerHTML = controls +
      '<div class="md-onclock-pick">' +
        '<span class="md-onclock-label">On the Clock</span>' +
        '<span class="md-onclock-num">Pick ' + slot.pick + '</span>' +
        '<span class="md-onclock-of">of ' + state.order.length + '</span>' +
      '</div>' +
      '<div class="md-onclock-team">' +
        '<img class="md-onclock-logo" src="' + LOGOS_DIR + info.teamLogoCLR + '" alt="' + info.name + '" />' +
        '<div class="md-onclock-teaminfo">' +
          '<div class="md-onclock-name">' + info.name + '</div>' +
          '<div class="md-onclock-record">' + SEASON + ' Record &middot; ' + record + '</div>' +
        '</div>' +
      '</div>' +
      lineupHtml;

    bindPortraitFallbacks(wrap);
    bindHeaderControls();
  }

  function bindHeaderControls() {
    var undoBtn = document.getElementById('md-undo-btn');
    if (undoBtn) undoBtn.addEventListener('click', undoPick);
    var restartBtn = document.getElementById('md-restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', openSetupModal);
  }

  /* ── COLOR HEATMAP (green = best, red = worst, within remaining pool) ── */
  function statRange(stat) {
    var min = Infinity, max = -Infinity;
    state.pool.forEach(function (p) { if (p[stat] < min) min = p[stat]; if (p[stat] > max) max = p[stat]; });
    return { min: min, max: max };
  }

  function heatStyle(stat, val, range) {
    var t = range.max === range.min ? 0.5 : (val - range.min) / (range.max - range.min);
    var hue = t * 120; // 0 = red, 120 = green
    return 'background:hsl(' + hue.toFixed(0) + ',65%,42%);color:#fff;';
  }

  /* ── PROSPECT POOL TABLE ── */
  var COLS = [
    { key:'estPick', label:'Est. Pick' },
    { key:'name',    label:'Player' },
    { key:'college', label:'College' },
    { key:'cls',     label:'Class' },
    { key:'pos',     label:'Pos' },
    { key:'ppg',     label:'PPG' },
    { key:'rpg',     label:'RPG' },
    { key:'apg',     label:'APG' },
    { key:'spg',     label:'SPG' },
    { key:'bpg',     label:'BPG' },
    { key:'fgp',     label:'FG%' },
    { key:'tpp',     label:'3P%' },
    { key:'ftp',     label:'FT%' },
    { key:'mpg',     label:'MPG' },
  ];

  var sortState = { key: 'estPick', dir: 'asc' };

  function renderPool() {
    var section = document.getElementById('md-pool-section');
    if (state.pickIdx >= state.order.length) { section.style.display = 'none'; return; }
    section.style.display = '';

    var ranges = {};
    STAT_COLS.forEach(function (stat) { ranges[stat] = statRange(stat); });

    var rows = state.pool.slice();
    rows.sort(function (a, b) {
      var col = sortState.key;
      var av = a[col], bv = b[col];
      var cmp;
      if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      return sortState.dir === 'asc' ? cmp : -cmp;
    });

    var thead = '<thead><tr>';
    COLS.forEach(function (col) {
      var arrow = '';
      if (sortState.key === col.key) arrow = sortState.dir === 'asc' ? '&#9650;' : '&#9660;';
      thead += '<th data-col="' + col.key + '" class="' + (sortState.key === col.key ? 'sort-col' : '') + '">' + col.label + '<span class="md-sort-arrow">' + arrow + '</span></th>';
    });
    thead += '<th class="md-col-add">Draft</th></tr></thead>';

    var tbody = '<tbody>';
    rows.forEach(function (p) {
      tbody += '<tr data-id="' + p.id + '">';
      tbody += '<td class="md-estpick-cell">' + p.estPick + '</td>';
      tbody += '<td class="md-name-cell"><span class="md-name-inner">' + portraitHtml(p, 'md-portrait-sm') + '<span>' + p.name + '</span>' + (p.fictional ? '<span class="md-ege-tag">EGE</span>' : '') + '</span></td>';
      tbody += '<td class="md-college-cell">' + p.college + '</td>';
      tbody += '<td>' + p.cls + '</td>';
      tbody += '<td>' + p.pos + '</td>';
      STAT_COLS.forEach(function (stat) {
        var isPct = stat === 'fgp' || stat === 'tpp' || stat === 'ftp';
        var val = isPct ? fmtPct(p[stat]) : fmt1(p[stat]);
        var style = colorMode ? ' style="' + heatStyle(stat, p[stat], ranges[stat]) + '"' : '';
        tbody += '<td' + style + '>' + val + '</td>';
      });
      tbody += '<td class="md-col-add"><button class="md-add-btn" data-id="' + p.id + '" title="Draft ' + p.name + '">+</button></td>';
      tbody += '</tr>';
    });
    tbody += '</tbody>';

    var table = document.getElementById('md-pool-table');
    table.innerHTML = thead + tbody;
    bindPortraitFallbacks(table);

    table.querySelectorAll('thead th[data-col]').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.dataset.col;
        if (sortState.key === key) sortState.dir = sortState.dir === 'desc' ? 'asc' : 'desc';
        else { sortState.key = key; sortState.dir = key === 'estPick' ? 'asc' : 'desc'; }
        renderPool();
      });
    });
    table.querySelectorAll('.md-add-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { openConfirm(btn.dataset.id); });
    });
  }

  function initColorToggle() {
    var btn = document.getElementById('md-color-toggle');
    btn.addEventListener('click', function () {
      colorMode = !colorMode;
      btn.classList.toggle('active', colorMode);
      btn.textContent = colorMode ? 'Color: On' : 'Color: Off';
      renderPool();
    });
  }

  /* ── DRAFT LOG / BOARD — first pick at top, descending to last ── */
  function renderLog() {
    var wrap = document.getElementById('md-log');
    if (!state.log.length) { wrap.innerHTML = '<p class="md-log-empty">No picks made yet.</p>'; return; }
    var html = '';
    state.log.forEach(function (entry) {
      var info = teamInfo(entry.team);
      html += '<div class="md-log-row">' +
        '<span class="md-log-pick">' + entry.pick + '</span>' +
        '<img class="md-log-logo" src="' + LOGOS_DIR + info.teamLogoCLR + '" alt="' + info.name + '" />' +
        '<span class="md-log-team">' + info.name + '</span>' +
        portraitHtml(entry.prospect, 'md-portrait-sm') +
        '<span class="md-log-player">' + entry.prospect.name + (entry.prospect.fictional ? '<span class="md-ege-tag">EGE</span>' : '') + '</span>' +
        '<span class="md-log-college">' + entry.prospect.college + '</span>' +
      '</div>';
    });
    wrap.innerHTML = html;
    bindPortraitFallbacks(wrap);
  }

  /* ── CONFIRM MODAL ── */
  function openConfirm(id) {
    var prospect = state.pool.filter(function (p) { return p.id === id; })[0];
    if (!prospect) return;
    pendingProspect = prospect;
    var slot = state.order[state.pickIdx];
    var info = teamInfo(slot.team);
    document.getElementById('md-confirm-text').innerHTML =
      'Draft <strong>' + prospect.name + '</strong> with <strong>Pick ' + slot.pick + '</strong> to the <strong>' + info.name + '</strong>?';
    document.getElementById('md-confirm-backdrop').classList.add('active');
  }

  function closeConfirm() {
    pendingProspect = null;
    document.getElementById('md-confirm-backdrop').classList.remove('active');
  }

  function commitPick() {
    if (!pendingProspect) return;
    var slot = state.order[state.pickIdx];
    state.log.push({ pick: slot.pick, team: slot.team, prospect: pendingProspect });
    state.pool = state.pool.filter(function (p) { return p.id !== pendingProspect.id; });
    state.pickIdx++;
    closeConfirm();
    renderHeader();
    renderPool();
    renderLog();
    if (state.pickIdx >= state.order.length) openDownloadPrompt();
  }

  function undoPick() {
    if (!state.log.length) return;
    var last = state.log.pop();
    state.pool.push(last.prospect);
    state.pickIdx--;
    renderHeader();
    renderPool();
    renderLog();
  }

  function initConfirmModal() {
    document.getElementById('md-confirm-yes').addEventListener('click', commitPick);
    document.getElementById('md-confirm-no').addEventListener('click', closeConfirm);
    document.getElementById('md-confirm-backdrop').addEventListener('click', function (e) {
      if (e.target.id === 'md-confirm-backdrop') closeConfirm();
    });
  }

  /* ── DOWNLOAD PROMPT + PNG RECAP ──
     Logos are preloaded into logoCache the moment a draft starts (see
     startDraft), so by the time the user clicks "Download PNG" the canvas
     can be built and exported entirely synchronously inside that click
     handler. Waiting on image onload / canvas.toBlob callbacks here would
     push the actual download past the click's user-activation window,
     which browsers (Safari in particular) silently block. */
  var logoCache = {};

  function preloadLogos(teams) {
    teams.forEach(function (team) {
      if (logoCache[team]) return;
      var info = teamInfo(team);
      var img = new Image();
      img.src = LOGOS_DIR + info.teamLogoCLR;
      logoCache[team] = img;
    });
  }

  function openDownloadPrompt() {
    document.getElementById('md-download-backdrop').classList.add('active');
  }
  function closeDownloadPrompt() {
    document.getElementById('md-download-backdrop').classList.remove('active');
  }

  function buildDraftPNG() {
    var rows = state.log;
    var W = 960, rowH = 46, headerH = 96, padX = 28;
    var H = headerH + rows.length * rowH + 24;
    var canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#08052f';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#e75719';
    ctx.font = '700 13px monospace';
    ctx.fillText('EGE NBA SIMULATION', padX, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 26px sans-serif';
    ctx.fillText('2012 Mock Draft Results', padX, 62);
    ctx.strokeStyle = 'rgba(120,110,220,.4)';
    ctx.beginPath(); ctx.moveTo(padX, headerH - 16); ctx.lineTo(W - padX, headerH - 16); ctx.stroke();

    rows.forEach(function (entry, i) {
      var y = headerH + i * rowH;
      if (i % 2 === 1) { ctx.fillStyle = 'rgba(255,255,255,.03)'; ctx.fillRect(0, y, W, rowH); }
      var img = logoCache[entry.team];
      if (img && img.complete && img.naturalWidth) ctx.drawImage(img, padX, y + 6, 34, 34);
      ctx.fillStyle = '#e75719';
      ctx.font = '700 13px monospace';
      ctx.fillText(String(entry.pick), padX + 46, y + 20);
      var info = teamInfo(entry.team);
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '400 11px monospace';
      ctx.fillText(info.name, padX + 46, y + 34);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 15px sans-serif';
      ctx.fillText(entry.prospect.name + (entry.prospect.fictional ? '  [EGE]' : ''), padX + 230, y + 22);
      ctx.fillStyle = 'rgba(255,255,255,.55)';
      ctx.font = '400 12px sans-serif';
      ctx.fillText(entry.prospect.college, padX + 230, y + 38);
    });

    return canvas;
  }

  function downloadDraftPNG() {
    try {
      var canvas = buildDraftPNG();
      var a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'ege-mock-draft-2012.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('Mock draft PNG export failed:', e);
    }
  }

  function initDownloadModal() {
    document.getElementById('md-download-yes').addEventListener('click', function () { downloadDraftPNG(); closeDownloadPrompt(); });
    document.getElementById('md-download-no').addEventListener('click', closeDownloadPrompt);
    document.getElementById('md-download-backdrop').addEventListener('click', function (e) {
      if (e.target.id === 'md-download-backdrop') closeDownloadPrompt();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSetupModal();
    initConfirmModal();
    initColorToggle();
    initDownloadModal();
    document.getElementById('md-setup-backdrop').classList.add('active');
  });

})();
