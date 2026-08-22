/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION · MOCK DRAFT (js/mock-draft.js)
   2012 draft class, altered to include five EGE Simulation
   originals. Setup modal → pick-by-pick draft board.
   ═══════════════════════════════════════════════════════════════ */

(function () {

  var SEASON       = '2011-12';
  var STAT_COLS    = ['ppg','rpg','apg','spg','bpg','fgp','tpp','ftp','mpg'];
  var LOGOS_DIR    = 'logos/';

  var state = {
    order:  [],   // draft slots for this sim length
    pool:   [],   // remaining prospects
    log:    [],   // completed picks: { pick, team, prospect }
    pickIdx: 0,
  };

  var pendingProspect = null; // prospect awaiting yes/no confirmation

  function fmt1(n) { return (Math.round(n * 10) / 10).toFixed(1); }
  function fmtPct(n) { return fmt1(n) + '%'; }

  function teamInfo(teamKey) {
    return window.getTeamInfoForSeason(teamKey, SEASON);
  }

  /* ── SETUP MODAL ── */
  function initSetupModal() {
    var backdrop = document.getElementById('md-setup-backdrop');
    var buttons = backdrop.querySelectorAll('[data-length]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        startDraft(parseInt(btn.dataset.length, 10));
        backdrop.classList.remove('active');
      });
    });
    backdrop.classList.add('active');
  }

  function startDraft(length) {
    state.order = window.MOCK_DRAFT_2012.order.slice(0, length);
    state.pool = window.MOCK_DRAFT_2012.prospects.slice();
    state.log = [];
    state.pickIdx = 0;
    document.getElementById('md-app').style.display = '';
    renderHeader();
    renderPool();
    renderLog();
  }

  /* ── HEADER (on the clock) ── */
  function renderHeader() {
    var wrap = document.getElementById('md-onclock');
    if (state.pickIdx >= state.order.length) {
      wrap.innerHTML =
        '<div class="md-done"><div class="md-done-title">Draft Complete</div>' +
        '<p class="md-done-sub">All ' + state.order.length + ' picks are in. Scroll down to see the full board, or refresh to start a new sim.</p></div>';
      return;
    }
    var slot = state.order[state.pickIdx];
    var info = teamInfo(slot.team);
    var record = window.MOCK_DRAFT_2012.records[slot.team] || '—';
    wrap.innerHTML =
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
      '</div>';
  }

  /* ── LEADERS (gold box) — max value per stat among remaining pool ── */
  function computeLeaders() {
    var leaders = {};
    STAT_COLS.forEach(function (stat) {
      var max = -Infinity;
      state.pool.forEach(function (p) { if (p[stat] > max) max = p[stat]; });
      leaders[stat] = max;
    });
    return leaders;
  }

  /* ── PROSPECT POOL TABLE ── */
  var COLS = [
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

  var sortState = { key: 'ppg', dir: 'desc' };

  function renderPool() {
    var section = document.getElementById('md-pool-section');
    if (state.pickIdx >= state.order.length) { section.style.display = 'none'; return; }
    section.style.display = '';

    var leaders = computeLeaders();
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
      tbody += '<td class="md-name-cell">' + p.name + (p.fictional ? '<span class="md-ege-tag">EGE</span>' : '') + '</td>';
      tbody += '<td>' + p.college + '</td>';
      tbody += '<td>' + p.cls + '</td>';
      tbody += '<td>' + p.pos + '</td>';
      STAT_COLS.forEach(function (stat) {
        var isPct = stat === 'fgp' || stat === 'tpp' || stat === 'ftp';
        var val = isPct ? fmtPct(p[stat]) : fmt1(p[stat]);
        var isLeader = p[stat] === leaders[stat] && leaders[stat] > 0;
        tbody += '<td' + (isLeader ? ' class="md-leader" data-val="' + val + '"' : '') + '>' + val + '</td>';
      });
      tbody += '<td class="md-col-add"><button class="md-add-btn" data-id="' + p.id + '" title="Draft ' + p.name + '">+</button></td>';
      tbody += '</tr>';
    });
    tbody += '</tbody>';

    var table = document.getElementById('md-pool-table');
    table.innerHTML = thead + tbody;

    table.querySelectorAll('thead th[data-col]').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.dataset.col;
        if (sortState.key === key) sortState.dir = sortState.dir === 'desc' ? 'asc' : 'desc';
        else { sortState.key = key; sortState.dir = 'desc'; }
        renderPool();
      });
    });
    table.querySelectorAll('.md-add-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { openConfirm(btn.dataset.id); });
    });
  }

  /* ── DRAFT LOG / BOARD ── */
  function renderLog() {
    var wrap = document.getElementById('md-log');
    if (!state.log.length) { wrap.innerHTML = '<p class="md-log-empty">No picks made yet.</p>'; return; }
    var html = '';
    state.log.slice().reverse().forEach(function (entry) {
      var info = teamInfo(entry.team);
      html += '<div class="md-log-row">' +
        '<span class="md-log-pick">' + entry.pick + '</span>' +
        '<img class="md-log-logo" src="' + LOGOS_DIR + info.teamLogoCLR + '" alt="' + info.name + '" />' +
        '<span class="md-log-team">' + info.name + '</span>' +
        '<span class="md-log-player">' + entry.prospect.name + (entry.prospect.fictional ? '<span class="md-ege-tag">EGE</span>' : '') + '</span>' +
        '<span class="md-log-college">' + entry.prospect.college + '</span>' +
      '</div>';
    });
    wrap.innerHTML = html;
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
  }

  function initConfirmModal() {
    document.getElementById('md-confirm-yes').addEventListener('click', commitPick);
    document.getElementById('md-confirm-no').addEventListener('click', closeConfirm);
    document.getElementById('md-confirm-backdrop').addEventListener('click', function (e) {
      if (e.target.id === 'md-confirm-backdrop') closeConfirm();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSetupModal();
    initConfirmModal();
  });

})();
