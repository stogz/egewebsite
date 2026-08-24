  /* ═══════════════════════════════════════════
     PLAYERS PAGE LOGIC (players.html)

     Two views: a roster-select grid, and a single player's profile
     (bio, stats/charts, awards, contracts, performances, shoes — each
     a tab, switchable and deep-linkable via URL hash, e.g.
     #clark-traditional-splits). Career highs live on the Bio tab.

     Loads player-stats.js + player-games.js for the active sim, then
     everything below runs inside window.__EGE_PLAYERS_BOOT (called
     once both files, or their error handlers, have fired).
  ═══════════════════════════════════════════ */

  /* Load correct data files for active sim, then call boot */
  (function() {
    var sim = window.EGE_SIM || { playerStatsFile:'2K25/player-stats.js', playerGamesFile:'2K25/player-games.js' };
    var loaded = 0;
    var needed = 2;

    function done() {
      loaded++;
      if (loaded < needed) return;
      // Both data files loaded — boot the page
      if (typeof window.__EGE_PLAYERS_BOOT === 'function') {
        window.__EGE_PLAYERS_BOOT();
      }
    }

    function loadScript(src) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = done;
      s.onerror = done; // don't hang if a file is missing
      document.body.appendChild(s);
    }

    loadScript(sim.playerStatsFile);
    loadScript(sim.playerGamesFile);
  })();

  /* ══════════════════════════════════════════
     PLAYER PAGE LOGIC
     Wrapped in __EGE_PLAYERS_BOOT so it runs
     only AFTER all data scripts have loaded.
  ══════════════════════════════════════════ */
  window.__EGE_PLAYERS_BOOT = function() {

  var PLAYERS = {
    clark:     { name:'Cooper Clark',   initials:'CC', number:'#5',  position:'Point Guard',   team:'Active', bio:[] },
    hatch:     { name:'Paxon Hatch',    initials:'PH', number:'#10', position:'Power Forward', team:'Retired', bio:[] },
    stogsdill: { name:'Sam Stogsdill',  initials:'SS', number:'#1', position:'Center',        team:'Retired', bio:[] },
    stewart:   { name:'Jaykeb Stewart', initials:'JS', number:'#2', position:'Point Guard',   team:'Retired', bio:[] },
    vitel:     { name:'Isaac Vitel',    initials:'IV', number:'#8',  position:'Shooting Guard',team:'Retired', bio:[] },
  };

  /* ── SYNC PLAYERS FROM PLAYER_STATS ──
     Reads info{} and retired from PLAYER_STATS so the single source of
     truth for bio data and retirement status is player-stats.js. */
  // Sync PLAYERS from PLAYER_STATS — runs inside boot after data is loaded
  (function() {
    var ps_all = (typeof PLAYER_STATS !== 'undefined') ? PLAYER_STATS
                 : (window.PLAYER_STATS || null);
    if (!ps_all) return;
    Object.keys(PLAYERS).forEach(function(key) {
      var ps = ps_all[key];
      if (!ps) return;
      var info = ps.info || {};
      // Retirement driven by player-stats.js retired boolean;
      // ps.team (if present) sets the active team, e.g. a college abbr in 2K26
      PLAYERS[key].team = ps.retired ? 'Retired' : (ps.team || 'Active');
      // info.position (if set) overrides the static banner position per-sim,
      // e.g. a player's college position in player-stats-26.js
      if (info.position) PLAYERS[key].position = info.position;
      // Build bio rows from info object
      PLAYERS[key].bio = [
        { key:'Height',      val: info.height     || '—' },
        { key:'Weight',      val: info.weight     || '—' },
        { key:'Age',         val: info.age        || '—' },
        { key:'Birth Place', val: info.birthPlace || '—' },
        { key:'Highschool',  val: info.highSchool || '—' },
        { key:'College',     val: info.college    || '—' },
        { key:'Draft Year',  val: info.draftYear  || '—' },
        { key:'Draft Pick',  val: info.draftPick  || '—' },
        { key:'Draft Team',  val: info.draftTeam  || '—' },
        { key:'Nickname',    val: info.nickname   || '—' },
      ];
    });
  })();

  /* ── SIM II PLAYER OVERRIDE ──
     If Sim II is active, replace PLAYERS with Sim II roster pulled from player-stats-26.js bio data */
  (function() {
    var sim = window.EGE_SIM;
    if (!sim || sim.id === 'sim-original') return;
    if (!window.PLAYER_STATS) return;
    // Only override if this sim defines a DIFFERENT roster via EGE_SIM2_PLAYER_NAMES
    if (!window.EGE_SIM2_PLAYER_NAMES) return;
    var newPlayers = {};
    Object.keys(window.PLAYER_STATS).forEach(function(key) {
      var ps = window.PLAYER_STATS[key];
      var bio = ps.bio || {};
      var names = window.EGE_SIM2_PLAYER_NAMES;
      var fullName = names[key] || key;
      var initials = fullName.split(' ').map(function(w){ return w[0]; }).join('');
      newPlayers[key] = {
        name:     fullName,
        initials: initials,
        number:   '#' + (ps.jerseys && ps.jerseys[0] ? ps.jerseys[0].number : '0'),
        position: bio.position || '—',
        team:     bio.team || 'Active',
        bio: [
          { key:'Height',    val: bio.height   || '—' },
          { key:'Weight',    val: bio.weight   || '—' },
          { key:'Born',      val: bio.born     || '—' },
          { key:'Hometown',  val: bio.hometown || '—' },
          { key:'College',   val: bio.college  || '—' },
          { key:'Draft',     val: bio.drafted  || '—' },
          { key:'Team',      val: bio.team     || '—' },
        ]
      };
    });
    // Replace PLAYERS entirely for this sim
    Object.keys(PLAYERS).forEach(function(k){ delete PLAYERS[k]; });
    Object.assign(PLAYERS, newPlayers);
  })();

  var TABS = ['bio','traditional-splits','awards','contracts','performances','shoes'];

  /* ── HEADSHOT IMAGES ── */
  /* ── TEAM LOGOS ── */
  var _isLight = document.documentElement.classList.contains('light');
  /* Logo folder — all sims now use 'logos/' */
  var LOGOS_DIR = ((window.EGE_SIM && window.EGE_SIM.logosFolder) || 'logos') + '/';
  // Build TEAM_LOGOS from teaminfo.js — always color logo
  var TEAM_LOGOS = {
    // ── College teams (still on weebly, not in teaminfo.js) ──
    'FSU':  'https://egesimulation.weebly.com/uploads/1/2/9/6/129667888/fsu-seminoles_orig.png',
    'DUKE': 'https://egesimulation.weebly.com/uploads/1/2/9/6/129667888/duke-blue-devils_orig.png',
    'KU':   'https://egesimulation.weebly.com/uploads/1/2/9/6/129667888/editor/kansas-jayhawks-1946-logo-svg_2.png',
    'AU':   'https://egesimulation.weebly.com/uploads/1/2/9/6/129667888/editor/arizona-wildcats-logo-svg.png?1745441103',
    'LOU':  LOGOS_DIR + 'LOU.png',
    'UCLA': 'https://egesimulation.weebly.com/uploads/1/2/9/6/129667888/editor/ucla-bruins-logo-svg.png?1746204102',
    // ── 2K26 college additions (local logos/ files) ──
    'MA':   LOGOS_DIR + 'MU.png',   // Marquette
    'BU':   LOGOS_DIR + 'BU.png',   // Butler
    'IU':   LOGOS_DIR + 'IU.png',   // Indiana
    'TU':   LOGOS_DIR + 'TU.png',   // Texas
    // Full-name keys — banner/game-card lookups use teamFull() names
    'Marquette Golden Eagles':  LOGOS_DIR + 'MU.png',
    'Butler Bulldogs':     LOGOS_DIR + 'BU.png',
    'Indiana Hoosiers':    LOGOS_DIR + 'IU.png',
    'Texas Longhorns':      LOGOS_DIR + 'TU.png',
    'Louisville Cardinals': LOGOS_DIR + 'LOU.png',
  };
  if (typeof teamInfo !== 'undefined') {
    Object.keys(teamInfo).forEach(function(k) {
      var t = teamInfo[k];
      TEAM_LOGOS[t.name] = LOGOS_DIR + t.teamLogoCLR;
    });
  }
  // No-op: mode-dependent logos removed — always use color logo
  function refreshModeLogos() {
    // Update portrait team logo if visible
    var portraitLogoWrap = document.getElementById('banner-portrait-team-logo');
    if (portraitLogoWrap && currentKey) {
      var isRet = (PLAYERS[currentKey]||{}).team === 'Retired';
      var latest = latestSeason(currentKey);
      var t2 = isRet ? null : teamFull(latest ? latest.team : (PLAYERS[currentKey]||{}).team);
      var newSrc = (!isRet && t2) ? (TEAM_LOGOS[t2] || '') : '';
      var portraitImg = portraitLogoWrap.querySelector('img');
      if (portraitImg && newSrc) portraitImg.src = newSrc;
      // Refresh border/team-name color
      var tc = (!isRet && t2) ? TEAM_BANNER_COLORS[t2] : null;
      var pc = tc ? tc.primary : 'var(--orange)';
      var hBox = document.getElementById('player-headshot-box');
      if (hBox) hBox.style.borderColor = pc;
      var brkt = document.getElementById('player-headshot-bracket');
      if (brkt) brkt.style.color = pc;
      var card = document.querySelector('.player-banner-card');
      if (card) card.style.color = pc;
    }
  }

  // Map abbreviations to full team names
  var TEAM_ABBR = {
    // All 30 NBA teams
    'ATL': 'Atlanta Hawks',
    'BOS': 'Boston Celtics',
    'BKN': 'Brooklyn Nets',
    'CHA': 'Charlotte Hornets',
    'CHI': 'Chicago Bulls',
    'CLE': 'Cleveland Cavaliers',
    'DAL': 'Dallas Mavericks',
    'DEN': 'Denver Nuggets',
    'DET': 'Detroit Pistons',
    'GSW': 'Golden State Warriors',
    'HOU': 'Houston Rockets',
    'IND': 'Indiana Pacers',
    'LAC': 'Los Angeles Clippers',
    'LAL': 'Los Angeles Lakers',
    'MIA': 'Miami Heat',
    'MIL': 'Milwaukee Bucks',
    'MIN': 'Minnesota Timberwolves',
    'NOP': 'New Orleans Pelicans',
    'NYK': 'New York Knicks',
    'OKC': 'Oklahoma City Thunder',
    'ORL': 'Orlando Magic',
    'PHI': 'Philadelphia 76ers',
    'PHX': 'Phoenix Suns',
    'POR': 'Portland Trail Blazers',
    'SAC': 'Sacramento Kings',
    'SAS': 'San Antonio Spurs',
    'TOR': 'Toronto Raptors',
    'UTA': 'Utah Jazz',
    'WAS': 'Washington Wizards',
    // EGE expansion / historical
    'VAN': 'Vancouver Grizzlies',
    'MEX': 'Mexico City Flight',
    'STL': 'St. Louis Spirit',
    // 2K26 colleges — sim players' active teams
    'MA':  'Marquette Golden Eagles',
    'BU':  'Butler Bulldogs',
    'IU':  'Indiana Hoosiers',
    'TU':  'Texas Longhorns',
    'LOU': 'Louisville Cardinals',
  };
  function teamFull(t) {
    return TEAM_ABBR[t] || t;
  }

  /* '#rrggbb' -> 'r,g,b' for use inside rgba(); null for non-hex colors
     (e.g. the 'var(--orange)' fallback), which callers instead pair
     with the theme's own rgba(var(--accent-rgb), x). */
  function hexToRgbStr(hex) {
    if (!hex || hex[0] !== '#' || hex.length < 7) return null;
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return (isNaN(r)||isNaN(g)||isNaN(b)) ? null : (r+','+g+','+b);
  }

  /* Perceived brightness (0=black, 1=white) of an 'r,g,b' string */
  function relLuminance(rgbStr) {
    var parts = rgbStr.split(',').map(Number);
    return (0.299*parts[0] + 0.587*parts[1] + 0.114*parts[2]) / 255;
  }

  // Primary and secondary colors per team for banner gradients
  // Build TEAM_BANNER_COLORS from teaminfo.js primary/secondaryColor
  var TEAM_BANNER_COLORS = {};
  if (typeof teamInfo !== 'undefined') {
    Object.keys(teamInfo).forEach(function(k) {
      var t = teamInfo[k];
      TEAM_BANNER_COLORS[t.name] = { primary: t.primaryColor, secondary: t.secondaryColor };
    });
  }
  // ── 2K26 college colors (not in teaminfo) — official school brand colors ──
  TEAM_BANNER_COLORS['Marquette Golden Eagles']  = { primary: '#003366', secondary: '#FFCC00' };
  TEAM_BANNER_COLORS['Butler Bulldogs']     = { primary: '#13294B', secondary: '#FFFFFF' };
  TEAM_BANNER_COLORS['Indiana Hoosiers']    = { primary: '#990000', secondary: '#EEEDEB' };
  TEAM_BANNER_COLORS['Texas Longhorns']      = { primary: '#BF5700', secondary: '#FFFFFF' };
  TEAM_BANNER_COLORS['Louisville Cardinals'] = { primary: '#AD0000', secondary: '#000000' };

  var NBA_HS = 'https://cdn.nba.com/headshots/nba/latest/1040x760/';
  var NBA_FALLBACK = NBA_HS + '202458.png';
  var PLAYER_HEADSHOTS = {
    clark:     'headshots/headshot_clark.png',
    hatch:     'headshots/headshot_hatch.png',
    stogsdill: 'headshots/headshot_stogsdill.png',
    stewart:   'headshots/headshot_stewart.png',
    vitel:     'headshots/headshot_vitel.png'
  };

  /* ── 2K26 SELECT-CARD META ──
     Positions + scouting-report bios shown on the Select a Player grid.
     Only used when Sim II (2K26) is active. */
  var SIM26_SELECT_META = {
    clark: {
      pos: 'SG', posFull: 'Shooting Guard',
      bio: 'Two-way slasher. Knocks down contested looks like the defender isn\'t even there. Self-creation and iso-scoring is Clark\'s bread and butter.'
    },
    hatch: {
      pos: 'C', posFull: 'Center',
      bio: 'Two-way unicorn. Separates himself from most centers with a deadly mid-range pull up shot and giant frame. Puts the paint on lock down with shot-blocking prowess.'
    },
    stogsdill: {
      pos: 'G/F', posFull: 'Guard / Forward',
      bio: 'Slashing floor-general. Slashing that commands multiple defenders creating wide open looks for teammates. Freak athlete with high-IQ.'
    },
    stewart: {
      pos: 'SF', posFull: 'Small Forward',
      bio: 'Lockdown defender. Rim running defensive demon that loves a star matchup to shutdown. Can block shots and disrupt the leagues best shooters.'
    },
    vitel: {
      pos: 'G', posFull: 'Combo Guard',
      bio: 'Three-level playmaker. Silky smooth three-point shot that feels unguardable. A true offensive engine that creates easy open-looks with quick decision making.'
    },
  };

  /* ── 3D TILT — sel26 tiles follow the cursor on hover ──
     Skipped for touch-only devices and reduced-motion preference. */
  var SEL26_TILT_OK = window.matchMedia &&
    window.matchMedia('(hover:hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  function attachSel26Tilt(card) {
    if (!SEL26_TILT_OK) return;
    var MAX = 7; // degrees
    card.addEventListener('mousemove', function(e) {
      var r  = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width  - 0.5;  // -0.5 .. 0.5
      var py = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        'perspective(900px) rotateX(' + (-py * MAX).toFixed(2) + 'deg)' +
        ' rotateY(' + (px * MAX).toFixed(2) + 'deg) translateY(-4px) scale(1.015)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  }

  /* ── ROSTER GRID RENDERER ──
     Builds player select cards dynamically from PLAYERS{} so both
     Sim I and Sim II rosters render correctly without hardcoded HTML.
     2K25 (sim-original): legacy .player-select-card layout.
     2K26 (sim-26): .sel26-card character-select tiles — team-color
     band, ghost jersey number, scout report from SIM26_SELECT_META. */
  function renderRosterGrid() {
    var grid = document.getElementById('player-select-grid');
    if (!grid) return;
    grid.innerHTML = '';
    var isSim26 = !!(window.EGE_SIM && window.EGE_SIM.id === 'sim-26');
    grid.classList.toggle('sel26-grid', isSim26);
    var keys = Object.keys(PLAYERS);
    keys.forEach(function(k, idx) {
      var p    = PLAYERS[k];
      var img  = PLAYER_HEADSHOTS[k] || '';
      var meta = isSim26 ? SIM26_SELECT_META[k] : null;
      // Position abbreviation for the number chip
      var posAbbr = meta ? meta.pos
        : (p.position||'').replace('Point Guard','PG')
          .replace('Shooting Guard','SG').replace('Small Forward','SF')
          .replace('Power Forward','PF').replace('Center','C')
          .replace(' / ','/');
      var posFull = meta ? meta.posFull : (p.position||'');
      // Number display (strip leading #)
      var numDisplay = (p.number||'').replace('#','');
      var card = document.createElement('a');
      card.className = meta ? 'sel26-card' : 'player-select-card';
      card.href = '#' + k + '-bio';
      card.dataset.player = k;
      card.style.animationDelay = (idx * 0.06) + 's';
      card.addEventListener('click', function(e) {
        e.preventDefault();
        showProfile(k, 'bio');
      });
      if (meta) {
        // ── 2K26 character-select tile, wrapped in a cell with a static
        //    team logo mark below (mark stays outside the 3D tilt) ──
        var abbr    = (p.team && p.team !== 'Active' && p.team !== 'Retired') ? p.team : null;
        var tFull   = abbr ? teamFull(abbr) : null;
        var tLogo   = abbr ? (TEAM_LOGOS[abbr] || TEAM_LOGOS[tFull] || '') : '';
        var tColors = (tFull && TEAM_BANNER_COLORS[tFull]) || { primary:'var(--orange)', secondary:'var(--blue)' };
        card.style.setProperty('--tc',  tColors.primary);
        card.style.setProperty('--tc2', tColors.secondary);
        var stageInner = img
          ? '<img class="sel26-hs" src="' + img + '" alt="" onerror="this.style.display=\'none\'">'
          : '<span class="sel26-hs-fallback">' + (p.initials||'?') + '</span>';
        card.innerHTML =
          '<div class="sel26-stage">' +
            '<span class="sel26-ghost">' + numDisplay + '</span>' +
            stageInner +
          '</div>' +
          '<div class="sel26-rule"></div>' +
          '<div class="sel26-body">' +
            '<h3 class="sel26-name">' + p.name + '</h3>' +
            '<div class="sel26-role">' + posFull + '</div>' +
            '<p class="sel26-scout-label">// scout report</p>' +
            '<p class="sel26-bio">' + meta.bio + '</p>' +
          '</div>' +
          '<div class="sel26-cta"><span>Select Player</span><span class="sel26-cta-arrow">→</span></div>';
        attachSel26Tilt(card);
        var cell = document.createElement('div');
        cell.className = 'sel26-cell';
        cell.style.animationDelay = (idx * 0.06) + 's';
        cell.appendChild(card);
        if (tLogo) {
          var mark = document.createElement('div');
          mark.className = 'sel26-team-mark';
          mark.innerHTML = '<img src="' + tLogo + '" alt="' + (tFull||'') + '" title="' + (tFull||'') + '">';
          cell.appendChild(mark);
        }
        grid.appendChild(cell);
        return;
      } else {
        var avatarInner = img
          ? '<img src="' + img + '" alt="" style="width:100%;height:100%;object-fit:cover;object-position:top center;" onerror="this.style.display=\'none\'">'
          : '<span style="font-family:var(--font-display);font-weight:900;font-size:1.8rem;color:var(--orange);">' + (p.initials||'?') + '</span>';
        card.innerHTML =
          '<div class="psc-num">#' + numDisplay + ' · ' + posAbbr + '</div>' +
          '<div class="psc-avatar" style="background:transparent;overflow:hidden;padding:0;">' + avatarInner + '</div>' +
          '<div class="psc-name">' + p.name + '</div>' +
          '<div class="psc-pos">' + posFull + '</div>' +
          '<span class="psc-arrow">View Profile →</span>';
      }
      grid.appendChild(card);
    });

    // 2K26: mobile-only logo strip — all team logos side by side at the
    // bottom of the grid (per-card marks are hidden at that breakpoint)
    if (isSim26) {
      var row = document.createElement('div');
      row.className = 'sel26-logo-row';
      keys.forEach(function(k) {
        var t = (PLAYERS[k]||{}).team;
        if (!t || t === 'Active' || t === 'Retired') return;
        var full = teamFull(t);
        var logo = TEAM_LOGOS[t] || TEAM_LOGOS[full] || '';
        if (logo) row.innerHTML += '<img src="' + logo + '" alt="' + full + '" title="' + full + '">';
      });
      if (row.children.length) grid.appendChild(row);
    }

    // Wire team logo chips after cards exist (legacy 2K25 cards only —
    // sel26 tiles carry their own team band)
    grid.querySelectorAll('.player-select-card').forEach(function(card) {
      var k = card.dataset.player;
      if (k && PLAYER_STATS[k] && PLAYERS[k] && PLAYERS[k].team !== 'Retired') {
        var rows = (PLAYER_STATS[k].regular||[]).filter(isProRow);
        var latestTeam = rows.length ? rows[rows.length-1].team : null;
        // No pro seasons yet — fall back to assigned team (e.g. 2K26 college abbr)
        if (!latestTeam && PLAYERS[k].team && PLAYERS[k].team !== 'Active') latestTeam = PLAYERS[k].team;
        if (latestTeam && TEAM_LOGOS[latestTeam]) {
          var chip = document.createElement('div');
          chip.className = 'psc-team-chip';
          chip.innerHTML = '<img src="' + TEAM_LOGOS[latestTeam] + '" alt="' + latestTeam + '" title="' + latestTeam + '">';
          var arrow = card.querySelector('.psc-arrow');
          if (arrow) card.insertBefore(chip, arrow);
        }
      }
    });
  }
  var activeCharts = {};
  var pgMode = 'regular';
  var currentKey = null;

  /* ── HELPERS ── */
  function fmtSeason(s){ return String(s||'').replace('-','–'); }
  function fmt1(n){ var v=parseFloat(n); return isNaN(v)?'—':(Math.round(v*10)/10).toFixed(1); }
  function pct(s){ var v=parseFloat(String(s||'').replace('%','')); return isNaN(v)?'—':fmt1(v)+'%'; }

  /* COLLEGE_TEAMS — seasons played for these abbreviations are excluded from
     all career stats, charts, bio, and all-time metrics.
     MEX, VAN, STL are intentionally NOT in this list (they count as pro). */
  var COLLEGE_TEAMS = ['AU','KU','LOU','FSU','DUKE','UCLA', 'FCB', 'MA','BU','IU','TU'];

  /* isProRow — exclude college seasons, dnq rows, and zero-GP rows */
  function isProRow(r) { return COLLEGE_TEAMS.indexOf((r.team||'').toUpperCase()) === -1 && !r.dnq && r.gp > 0; }

  /* ── LEAGUE LEADER HELPERS ──
     PLAYER_STATS is the entire tracked league, so "leads the league" means
     posts the season's top value (among pro rows) across all players there.
     Ties all get marked. Applies to every numeric stat column in both
     tables — the leading value is simply italicized (see the * key under
     each table), same treatment whether it's a "good" stat to lead (PPG)
     or not (TOPG).

     To force a specific stat to show as a league leader regardless of the
     numbers (e.g. a real-world honor the data model can't compute), add a
     `leaders` array of stat keys to that season row:
       { season:'2022-23', ..., fgp:'48.3%', ..., leaders:['fgp'] }
     Works the same on 'regular'/'playoffs' rows (PG_LEADER_STATS keys) and
     'totals' rows (TOTALS_LEADER_STATS keys). */
  var PG_LEADER_STATS = ['ppg','rpg','apg','spg','bpg','topg','fgp','tpp','ftp','tpa','gs','gp','mpg'];
  var TOTALS_LEADER_STATS = ['pts','reb','ast','stl','blk','tov','fgm','fga','tpm','tpa','ftm','fta','min','gs','gp','dd','td'];

  function statNum(raw) {
    var v = typeof raw === 'string' ? parseFloat(raw.replace('%','')) : raw;
    return (v === undefined || v === null || isNaN(v)) ? null : v;
  }

  /* Best value per season/stat for dataKey ('regular'|'playoffs'|'totals') */
  function seasonLeaders(dataKey, statList) {
    var best = {};
    Object.keys(PLAYER_STATS).forEach(function(key){
      ((PLAYER_STATS[key]||{})[dataKey]||[]).filter(isProRow).forEach(function(row){
        statList.forEach(function(stat){
          var val = statNum(row[stat]);
          if (val === null) return;
          best[row.season] = best[row.season] || {};
          if (best[row.season][stat] === undefined || val > best[row.season][stat]) {
            best[row.season][stat] = val;
          }
        });
      });
    });
    return best;
  }

  /* Wrap text in italics if row's value ties the league lead for that season/stat,
     or if the row manually forces it via a `leaders` array (see above). */
  function leadWrap(leaders, stat, row, text) {
    var val = statNum(row[stat]);
    var best = leaders[row.season] && leaders[row.season][stat];
    var isAutoLeader = val !== null && best !== undefined && val === best;
    var isManualLeader = Array.isArray(row.leaders) && row.leaders.indexOf(stat) !== -1;
    var isLeader = isAutoLeader || isManualLeader;
    return isLeader ? '<em class="stat-leader">'+text+'</em>' : text;
  }

  /* ── COMPUTE CAREER AVERAGES FROM PLAYER_STATS ── */
  function careerAvg(key) {
    var rows = ((PLAYER_STATS[key]||{}).regular||[]).filter(isProRow);
    if (!rows.length) return null;
    var g=0,wPPG=0,wRPG=0,wAPG=0,wSPG=0,wBPG=0,wTOPG=0,wFG=0,wTP=0,wFT=0,tpW=0;
    rows.forEach(function(r){
      g+=r.gp;
      wPPG+=r.ppg*r.gp; wRPG+=r.rpg*r.gp; wAPG+=r.apg*r.gp;
      wSPG+=r.spg*r.gp; wBPG+=r.bpg*r.gp; wTOPG+=r.topg*r.gp;
      wFG+=parseFloat((r.fgp||'0').replace('%',''))*r.gp;
      wFT+=parseFloat((r.ftp||'0').replace('%',''))*r.gp;
      var tw=r.tpa>0?r.tpa*r.gp:r.gp; tpW+=tw; wTP+=parseFloat((r.tpp||'0').replace('%',''))*tw;
    });
    return {
      seasons: rows.length,
      gp: g,
      ppg: fmt1(wPPG/g), rpg: fmt1(wRPG/g), apg: fmt1(wAPG/g),
      spg: fmt1(wSPG/g), bpg: fmt1(wBPG/g), topg: fmt1(wTOPG/g),
      fgp: fmt1(wFG/g)+'%', tpp: fmt1(tpW>0?wTP/tpW:0)+'%', ftp: fmt1(wFT/g)+'%'
    };
  }

  function latestSeason(key) {
    var rows = ((PLAYER_STATS[key]||{}).regular||[]).filter(isProRow);
    return rows.length ? rows[rows.length-1] : null;
  }

  function starCount(key) {
    return ((PLAYER_STATS[key]||{}).regular||[]).filter(function(r){ return r.star; }).length;
  }

  function champCount(key) {
    return ((PLAYER_STATS[key]||{}).playoffs||[]).filter(function(r){ return r.champ; }).length;
  }

  /* ── HASH PARSING ── */
  function parseHash(hash) {
    hash = (hash||'').replace('#','').toLowerCase();
    if (!hash) return {player:null,tab:null};
    var playerKey = null;
    Object.keys(PLAYERS).forEach(function(k){ if(hash===k||hash.indexOf(k+'-')===0) playerKey=k; });
    if (!playerKey) return {player:null,tab:null};
    var tab = hash.replace(playerKey+'-','') || 'bio';
    if (TABS.indexOf(tab)===-1) tab='bio';
    return {player:playerKey,tab:tab};
  }

  /* ── BANNER ── */
  function renderBanner(key) {
    refreshModeLogos();
    var p = PLAYERS[key];
    if (!p) return;
    var isRetired = p.team === 'Retired';
    var latest = isRetired ? null : latestSeason(key);
    var teamRaw = latest ? latest.team : (isRetired ? null : p.team);
    var team = teamRaw ? teamFull(teamRaw) : null;

    // Headshot
    var hsEl = document.getElementById('profile-initials');
    var imgSrc = PLAYER_HEADSHOTS[key];
    if (imgSrc) {
      hsEl.style.display = 'none';
      var existing = document.getElementById('profile-headshot-img');
      if (!existing) {
        var img = document.createElement('img');
        img.id = 'profile-headshot-img';
        img.style.cssText = 'width:auto;height:100%;max-width:none;object-fit:contain;object-position:bottom center;display:block;position:absolute;bottom:0;left:50%;transform:translateX(-50%);';
        hsEl.parentNode.style.position = 'relative';
        hsEl.parentNode.appendChild(img);
        existing = img;
      }
      existing.src = imgSrc;
      existing.style.display = 'block';
      existing.classList.remove('animate-in');
      void existing.offsetWidth;
      existing.classList.add('animate-in');
    } else {
      hsEl.style.display = 'flex';
      var old = document.getElementById('profile-headshot-img');
      if (old) old.style.display = 'none';
    }

    // Team colors
    var colors = !isRetired && team ? TEAM_BANNER_COLORS[team] : null;
    var primaryColor = (colors && colors.primary) ? colors.primary : 'var(--orange)';

    // L-bracket colors — left brackets on wrapper, right brackets on card
    var boxEl = document.getElementById('player-headshot-box');
    var bracketEl = document.getElementById('player-headshot-bracket');
    var cardEl = document.querySelector('.player-banner-card');
    var borderCol = isRetired ? 'var(--orange)' : primaryColor;
    if (boxEl) boxEl.style.borderColor = borderCol;
    if (bracketEl) bracketEl.style.color = borderCol;
    if (cardEl) cardEl.style.color = borderCol;

    // Team color var — read by the banner ghost number and subnav underline
    var profEl = document.getElementById('player-profile');
    if (profEl) profEl.style.setProperty('--nav-tc', borderCol);

    // Ghost jersey number — right side of the banner, behind the info
    var numEl = document.getElementById('profile-banner-num');
    if (numEl) numEl.textContent = (p.number || '').replace('#','');

    // Page background gradient — subtle team primary color
    var pgGrad = document.getElementById('player-profile-gradient');
    if (pgGrad) {
      if (colors && colors.primary) {
        var r2 = parseInt(colors.primary.slice(1,3),16);
        var g2 = parseInt(colors.primary.slice(3,5),16);
        var b2 = parseInt(colors.primary.slice(5,7),16);
        pgGrad.style.background =
          'radial-gradient(ellipse at 80% 0%, rgba('+r2+','+g2+','+b2+',.22) 0%, transparent 65%),' +
          'radial-gradient(ellipse at 20% 100%, rgba('+r2+','+g2+','+b2+',.14) 0%, transparent 55%)';
      } else {
        pgGrad.style.background = '';
      }
    }

    // Team logo — hide for retired players
    var logoWrap = document.getElementById('banner-portrait-team-logo');
    if (logoWrap) {
      var logoUrl = (!isRetired && team) ? (TEAM_LOGOS[team] || '') : '';
      if (logoUrl) {
        logoWrap.innerHTML = '<img src="'+logoUrl+'" alt="'+(team||'')+'">';
        logoWrap.style.display = 'flex';
      } else {
        logoWrap.innerHTML = '';
        logoWrap.style.display = 'none';
      }
    }

    // Name
    var nameEl = document.getElementById('profile-name');
    nameEl.innerHTML = '<span>'+p.name+'</span>';

    renderTeamBadges(key);

    var meta = document.getElementById('profile-meta');
    meta.innerHTML='';
  }

  /* ── TEAM / POSITION BADGES ──
     Split out from renderBanner so the mode-toggle button can re-run just
     this piece. The box is filled solid with the same color as the
     headshot box border (--nav-tc); text is white unless the team color
     itself is really bright, in which case white would wash out and the
     site's dark navy reads better instead. */
  function renderTeamBadges(key) {
    var p = PLAYERS[key];
    if (!p) return;
    var tLineEl = document.getElementById('profile-team-line');
    if (!tLineEl) return;
    var isRetired = p.team === 'Retired';
    var latest = isRetired ? null : latestSeason(key);
    var teamRaw = latest ? latest.team : (isRetired ? null : p.team);
    var team = teamRaw ? teamFull(teamRaw) : null;
    var colors = !isRetired && team ? TEAM_BANNER_COLORS[team] : null;
    var primaryColor = (colors && colors.primary) ? colors.primary : 'var(--orange)';

    var badgeColor = isRetired ? 'var(--orange)' : primaryColor;
    var badgeRgb = hexToRgbStr(badgeColor);
    var isReallyBright = badgeRgb && relLuminance(badgeRgb) > 0.6;
    var textColor = isReallyBright ? 'var(--navy)' : '#ffffff';
    var badgeStyle = 'background:'+badgeColor+';color:'+textColor+';';

    // Same contrast check drives the subnav's sliding indicator text color
    var profEl2 = document.getElementById('player-profile');
    if (profEl2) profEl2.style.setProperty('--nav-tc-text', textColor);

    var teamLabel = isRetired ? 'Retired' : (team || '');
    var posLabel = p.position || '';
    var badgesHtml = '';
    if (teamLabel) badgesHtml += '<span class="banner-badge" style="'+badgeStyle+'">'+teamLabel+'</span>';
    if (posLabel)  badgesHtml += '<span class="banner-badge" style="'+badgeStyle+'">'+posLabel+'</span>';
    tLineEl.innerHTML = badgesHtml;
  }

  /* ── BIO (driven by PLAYER_STATS) ── */
  function renderBio(key) {
    var p = PLAYERS[key];
    if (!p) return;
    var avg = careerAvg(key);
    var latest = latestSeason(key);
    var isRetired = p.team === 'Retired';
    var champs = champCount(key);
    var stars  = starCount(key);

    // Snapshot — career avg stats:
    // Row 1: PPG | RPG | APG
    // Row 2: SPG or BPG (whichever is higher) | FG% | 3P%
    var snap = document.getElementById('bio-snapshot');
    snap.innerHTML='';
    if (avg) {
      var spgVal = parseFloat(avg.spg) || 0;
      var bpgVal = parseFloat(avg.bpg) || 0;
      var defLabel = spgVal >= bpgVal ? 'SPG' : 'BPG';
      var defVal   = spgVal >= bpgVal ? avg.spg : avg.bpg;
      var snapStats = [
        ['PPG', avg.ppg, true],
        ['RPG', avg.rpg, false],
        ['APG', avg.apg, false],
        [defLabel, defVal, false],
        ['FG%', avg.fgp, false],
        ['3P%', avg.tpp, false],
      ];
    } else {
      var snapStats = [
        ['PPG','—',true],['RPG','—',false],['APG','—',false],
        ['SPG','—',false],['FG%','—',false],['3P%','—',false],
      ];
    }
    snapStats.forEach(function(s){
      var c = document.createElement('div'); c.className='snapshot-cell';
      c.innerHTML='<div class="snapshot-label">'+s[0]+'</div><div class="snapshot-val'+(s[2]?' orange':'')+'">'+s[1]+'</div>';
      snap.appendChild(c);
    });

    // Single unified "Player Information" card
    var bioEl = document.getElementById('bio-info-rows');
    bioEl.innerHTML='';

    // Pull raw bio fields from p.bio array into a lookup
    var bioMap = {};
    (p.bio || []).forEach(function(r){ bioMap[r.key] = r.val; });

    // Age: prefer latest season age, else bio
    var ageVal = (latest && latest.age) ? String(latest.age) : (bioMap['Age'] || '—');

    var rows = [
      { key:'Height',      val: bioMap['Height']     || '—' },
      { key:'Weight',      val: bioMap['Weight']     || '—' },
      { key:'Age',         val: ageVal },
      { key:'Birth Place', val: bioMap['Birth Place']|| '—' },
      { key:'Highschool',  val: bioMap['Highschool'] || '—' },
      { key:'College',     val: bioMap['College']    || '—' },
      { key:'Class',       val: bioMap['Draft Year'] || '—' },
      { key:'Draft Pick',  val: bioMap['Draft Pick'] || '—' },
      { key:'Draft Team',  val: bioMap['Draft Team'] || '—' },
    ];

    rows.forEach(function(r){
      var d = document.createElement('div'); d.className='bio-row';
      d.innerHTML='<span class="bio-row-key">'+r.key+'</span><span class="bio-row-val">'+r.val+'</span>';
      bioEl.appendChild(d);
    });

    // Clear unused career rows element
    var careerEl = document.getElementById('bio-career-rows');
    if (careerEl) careerEl.innerHTML='';

    // Render play style
    renderCareerOverview(key, avg, champs, stars, isRetired);
  }

  /* ── CAREER OVERVIEW ── */
  function renderCareerOverview(key, avg, champs, stars, isRetired) {
    var el = document.getElementById('bio-overview-rows');
    if (!el) return;
    el.innerHTML = '';

    var proRegular = ((PLAYER_STATS[key]||{}).regular||[]).filter(isProRow);
    var proTotals  = ((PLAYER_STATS[key]||{}).totals ||[]).filter(isProRow);

    if (!avg || !proRegular.length) {
      el.innerHTML = '<div class="bio-row"><span class="bio-row-key">Career</span><span class="bio-row-val">—</span></div>';
      return;
    }

    var lastRow = proRegular[proRegular.length-1];

    // Seasons span, e.g. "2016–17 – 2036–37" — active players show "..." for the open-ended final year
    var firstSeason = proRegular[0].season;
    var lastLabel = isRetired ? fmtSeason(lastRow.season) : '...';
    var span = (isRetired && fmtSeason(firstSeason) === fmtSeason(lastRow.season))
      ? fmtSeason(firstSeason)
      : fmtSeason(firstSeason) + ' – ' + lastLabel;

    // Distinct teams, in order first played
    var teams = [];
    proRegular.forEach(function(r){ if (r.team && teams.indexOf(r.team) === -1) teams.push(r.team); });

    // Career totals — sum from totals rows when present, else derive from per-game averages
    var careerPts, careerReb, careerAst;
    if (proTotals.length) {
      careerPts = proTotals.reduce(function(s,r){ return s+(r.pts||0); }, 0);
      careerReb = proTotals.reduce(function(s,r){ return s+(r.reb||0); }, 0);
      careerAst = proTotals.reduce(function(s,r){ return s+(r.ast||0); }, 0);
    } else {
      careerPts = Math.round(proRegular.reduce(function(s,r){ return s+r.ppg*r.gp; }, 0));
      careerReb = Math.round(proRegular.reduce(function(s,r){ return s+r.rpg*r.gp; }, 0));
      careerAst = Math.round(proRegular.reduce(function(s,r){ return s+r.apg*r.gp; }, 0));
    }

    // Peak season by PPG
    var peak = proRegular.reduce(function(best,r){ return (!best || r.ppg > best.ppg) ? r : best; }, null);

    // Repeat a glyph once per count, each with a staggered glow, or an em dash if zero
    function iconRow(count, render) {
      if (!count) return '<span class="bio-icon-empty">—</span>';
      var html = '';
      for (var i = 0; i < count; i++) html += render(i);
      return html;
    }
    var TROPHY_URL = 'https://egesimulation.weebly.com/uploads/1/2/9/6/129667888/nba-champ_orig.png';

    var rows = [
      { key:'Seasons',          val: avg.seasons + ' (' + span + ')' },
      { key:'Career Points',    val: careerPts.toLocaleString() },
      { key:'Career Rebounds',  val: careerReb.toLocaleString() },
      { key:'Career Assists',   val: careerAst.toLocaleString() },
      { key:'Peak Season',      val: peak ? (fmtSeason(peak.season) + ' · ' + fmt1(peak.ppg) + ' PPG') : '—' },
      { key:'All-Star Selections', val: iconRow(stars, function(i){
          return '<span class="bio-icon-star" style="animation-delay:'+(i*0.18)+'s">★</span>';
        }), icons:true },
      { key:'Championships',    val: iconRow(champs, function(i){
          return '<img class="bio-icon-trophy" src="'+TROPHY_URL+'" alt="Championship" style="animation-delay:'+(i*0.18)+'s">';
        }), icons:true },
    ];

    rows.forEach(function(r){
      var d = document.createElement('div'); d.className='bio-row';
      var valEl = r.icons ? '<span class="bio-icon-row">'+r.val+'</span>' : '<span class="bio-row-val">'+r.val+'</span>';
      d.innerHTML='<span class="bio-row-key">'+r.key+'</span>'+valEl;
      el.appendChild(d);
    });

    // Team logo strip — centered, full-width, below the two-column bio grid
    var stripEl = document.getElementById('bio-teams-strip');
    if (stripEl) {
      stripEl.innerHTML = '';
      teams.forEach(function(team){
        var teamName = teamFull(team) || team;
        var logoUrl = TEAM_LOGOS[team] || TEAM_LOGOS[teamName] || '';
        if (!logoUrl) return;
        var box = document.createElement('span');
        box.className = 'logo-box';
        var img = document.createElement('img');
        img.src = logoUrl;
        img.alt = teamName;
        img.loading = 'lazy';
        box.appendChild(img);
        stripEl.appendChild(box);
      });
    }
  }
  /* ── TEAM ABBR → SLUG MAP (for linking team cells to teams.html) ── */
  var ABBR_TO_SLUG = {
    'ATL':'atlantahawks',      'BOS':'bostonceltics',       'BKN':'brooklynnets',
    'CHA':'charlottehornets',  'CHI':'chicagobulls',        'CLE':'clevelandcavaliers',
    'DAL':'dallasmavericks',   'DEN':'denvernuggets',       'DET':'detroitpistons',
    'GSW':'goldenstatewarriors','HOU':'houstonrockets',     'IND':'indianapacers',
    'LAC':'losangelesclippers','LAL':'losangeleslakers',    'MIA':'miamiheat',
    'MIL':'milwaukeebucks',    'MIN':'minnesotatimberwolves','NOP':'neworleanspelicans',
    'NYK':'newyorkknicks',     'OKC':'oklahomacitythunder', 'ORL':'orlandomagic',
    'PHI':'philadelphia76ers', 'PHX':'phoenixsuns',         'POR':'portlandtrailblazers',
    'SAC':'sacramentokings',   'SAS':'sanantoniospurs',     'TOR':'torontoraptors',
    'UTA':'utahjazz',          'VAN':'vancouvergrizzlies',  'WAS':'washingtonwizards',
    'MEX':'mexicocityflight',  'STL':'stlouisspirit',
  };

  /* Converts '2025-26' → '26', '2029-30' → '30' etc. */
  function seasonSuffix(s) {
    if (!s || !String(s).includes('-')) return '';
    return (String(s).split('-')[1] || '').replace(/\D/g,'').slice(-2).padStart(2,'0');
  }

  /* Returns a linked team cell for pro rows, plain text for college/unknown */
  function teamCell(abbr, season) {
    var slug = ABBR_TO_SLUG[abbr];
    if (!slug) return abbr; // college or unrecognised — plain text
    var yy = seasonSuffix(season);
    if (!yy) return abbr;
    return '<a href="teams.html#' + slug + yy + '" '
      + 'style="color:var(--orange);text-decoration:underline;text-underline-offset:3px;font-weight:700;cursor:pointer;">'
      + abbr + '</a>';
  }

  /* ── PER GAME TABLE ── */
  function renderPGTable(key, mode) {
    pgMode = mode || 'regular';
    var data = (PLAYER_STATS[key]||{})[pgMode] || [];
    var label = (pgMode==='regular' ? 'Regular Season' : 'Playoffs') + ' · Per Game';
    document.getElementById('pg-table-label').textContent = label;
    document.querySelectorAll('[data-scope="pg"]').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.mode === pgMode);
    });
    var table = document.getElementById('pg-table');
    var COLS = ['SEASON','AGE','TEAM','PPG','RPG','APG','SPG','BPG','TOPG','FG%','3P%','FT%','3PA','GS','GP','MPG'];
    var thead = '<thead><tr>';
    COLS.forEach(function(col){ thead+='<th data-col="'+col+'">'+col+'<span class="sort-arrow"></span></th>'; });
    thead+='</tr></thead>';
    var leaders = seasonLeaders(pgMode, PG_LEADER_STATS);
    var tbody='<tbody>';
    data.forEach(function(row,idx){
      if(row.dnq){
        tbody+='<tr class="dnq-row" data-orig="'+idx+'" data-dnq="1"><td colspan="'+COLS.length+'"><span>'+fmtSeason(row.season)+'</span><span class="dnq-note">'+(row.note||'Did not qualify.')+'</span></td></tr>';
        return;
      }
      var isCollege = COLLEGE_TEAMS.indexOf((row.team||'').toUpperCase()) !== -1;
      if(isCollege){
        var cIcons='';
        tbody+='<tr class="college-row" data-orig="'+idx+'" data-college="1">';
        tbody+='<td><span title="Non-NBA season, excluded from career averages." class="college-tag">'+fmtSeason(row.season)+' *</span></td>';
        tbody+='<td>'+row.age+'</td><td>'+row.team+'</td>';
        tbody+='<td>'+fmt1(row.ppg)+'</td><td>'+fmt1(row.rpg)+'</td><td>'+fmt1(row.apg)+'</td>';
        tbody+='<td>'+fmt1(row.spg)+'</td><td>'+fmt1(row.bpg)+'</td><td>'+fmt1(row.topg)+'</td>';
        tbody+='<td>'+row.fgp+'</td><td>'+row.tpp+'</td><td>'+row.ftp+'</td>';
        tbody+='<td>'+fmt1(row.tpa)+'</td><td>'+row.gs+'</td><td>'+row.gp+'</td><td>'+fmt1(row.mpg)+'</td>';
        tbody+='</tr>';
        return;
      }
      var icons=(row.star?'<span class="season-icon">⭐</span>':'')+(row.champ?'<span class="season-icon">🏆</span>':'');
      tbody+='<tr data-orig="'+idx+'"><td>'+fmtSeason(row.season)+icons+'</td><td>'+row.age+'</td><td>'+teamCell(row.team,row.season)+'</td>';
      tbody+='<td class="hi">'+leadWrap(leaders,'ppg',row,fmt1(row.ppg))+'</td><td>'+leadWrap(leaders,'rpg',row,fmt1(row.rpg))+'</td><td>'+leadWrap(leaders,'apg',row,fmt1(row.apg))+'</td>';
      tbody+='<td>'+leadWrap(leaders,'spg',row,fmt1(row.spg))+'</td><td>'+leadWrap(leaders,'bpg',row,fmt1(row.bpg))+'</td><td>'+leadWrap(leaders,'topg',row,fmt1(row.topg))+'</td>';
      tbody+='<td>'+leadWrap(leaders,'fgp',row,row.fgp)+'</td><td>'+leadWrap(leaders,'tpp',row,row.tpp)+'</td><td>'+leadWrap(leaders,'ftp',row,row.ftp)+'</td>';
      tbody+='<td>'+leadWrap(leaders,'tpa',row,fmt1(row.tpa))+'</td><td>'+leadWrap(leaders,'gs',row,row.gs)+'</td><td>'+leadWrap(leaders,'gp',row,row.gp)+'</td><td>'+leadWrap(leaders,'mpg',row,fmt1(row.mpg))+'</td></tr>';
    });
    // Career avg row
    var valid=data.filter(isProRow);
    if(valid.length){
      var g=0,wP=0,wR=0,wA=0,wS=0,wB=0,wT=0,wFG=0,wTP=0,wFT=0,tpW=0,wTPA=0,wMPG=0,totGS=0;
      valid.forEach(function(r){
        g+=r.gp; totGS+=r.gs;
        wP+=r.ppg*r.gp; wR+=r.rpg*r.gp; wA+=r.apg*r.gp; wS+=r.spg*r.gp;
        wB+=r.bpg*r.gp; wT+=r.topg*r.gp; wTPA+=r.tpa*r.gp; wMPG+=r.mpg*r.gp;
        wFG+=parseFloat((r.fgp||'0').replace('%',''))*r.gp;
        wFT+=parseFloat((r.ftp||'0').replace('%',''))*r.gp;
        var tw=r.tpa>0?r.tpa*r.gp:r.gp; tpW+=tw; wTP+=parseFloat((r.tpp||'0').replace('%',''))*tw;
      });
      tbody+='<tr class="career-row" data-career="1"><td>Career Avg</td><td></td><td></td>';
      tbody+='<td class="hi">'+fmt1(wP/g)+'</td><td>'+fmt1(wR/g)+'</td><td>'+fmt1(wA/g)+'</td>';
      tbody+='<td>'+fmt1(wS/g)+'</td><td>'+fmt1(wB/g)+'</td><td>'+fmt1(wT/g)+'</td>';
      tbody+='<td>'+fmt1(wFG/g)+'%</td><td>'+fmt1(tpW>0?wTP/tpW:0)+'%</td><td>'+fmt1(wFT/g)+'%</td>';
      tbody+='<td>'+fmt1(wTPA/g)+'</td><td>'+totGS+'</td><td>'+g+'</td><td>'+fmt1(wMPG/g)+'</td></tr>';
    }
    table.innerHTML=thead+tbody+'</tbody>';
    initSort(table);
    var fn=document.getElementById('pg-footnote');
    if(fn) fn.style.display = data.some(function(r){ return COLLEGE_TEAMS.indexOf((r.team||'').toUpperCase())!==-1; }) ? 'block' : 'none';
  }

  /* ── TOTALS TABLE ── */
  function renderTotalsTable(key) {
    var data=(PLAYER_STATS[key]||{}).totals||[];
    var table=document.getElementById('totals-table');
    var COLS=['SEASON','AGE','TEAM','POS','PTS','REB','AST','STL','BLK','TOV','FGM','FGA','3PM','3PA','FTM','FTA','MIN','GS','GP','DD','TD'];
    var thead='<thead><tr>';
    COLS.forEach(function(col){ thead+='<th data-col="'+col+'">'+col+'<span class="sort-arrow"></span></th>'; });
    thead+='</tr></thead>';
    var leaders = seasonLeaders('totals', TOTALS_LEADER_STATS);
    var tbody='<tbody>';
    data.forEach(function(row,idx){
      var isCollege = COLLEGE_TEAMS.indexOf((row.team||'').toUpperCase()) !== -1;
      var icons=(row.star?'<span class="season-icon">⭐</span>':'')+(row.champ?'<span class="season-icon">🏆</span>':'');
      var teamTd = isCollege ? row.team : teamCell(row.team, row.season);
      var trClass = isCollege ? ' class="college-row"' : '';
      var posVal = row.pos || '—';
      tbody+='<tr'+trClass+' data-orig="'+idx+'"'+(isCollege?' data-college="1"':'')+'>'+
        '<td>'+(isCollege?'<span title="College season — excluded from career stats" class="college-tag">'+fmtSeason(row.season)+' *</span>':fmtSeason(row.season)+icons)+'</td>'+
        '<td>'+row.age+'</td><td>'+teamTd+'</td><td style="font-family:var(--font-mono);font-size:.7rem;letter-spacing:.06em;">'+posVal+'</td>';
      tbody+='<td class="hi">'+(isCollege?row.pts:leadWrap(leaders,'pts',row,row.pts))+'</td>';
      ['reb','ast','stl','blk','tov','fgm','fga','tpm','tpa','ftm','fta','min','gs','gp','dd','td'].forEach(function(k){
        var val = row[k]||0;
        var isLeaderStat = !isCollege && TOTALS_LEADER_STATS.indexOf(k)!==-1;
        tbody+='<td>'+(isLeaderStat?leadWrap(leaders,k,row,val):val)+'</td>';
      });
      tbody+='</tr>';
    });
    var valid=data.filter(function(r){ return r.gp>0 && COLLEGE_TEAMS.indexOf((r.team||'').toUpperCase())===-1; });
    if(valid.length){
      var sums={pts:0,reb:0,ast:0,stl:0,blk:0,tov:0,fgm:0,fga:0,tpm:0,tpa:0,ftm:0,fta:0,min:0,gs:0,gp:0,dd:0,td:0};
      valid.forEach(function(r){ Object.keys(sums).forEach(function(k){ sums[k]+=(r[k]||0); }); });
      tbody+='<tr class="career-row" data-career="1"><td>Career</td><td></td><td></td><td></td><td class="hi">'+sums.pts+'</td>';
      ['reb','ast','stl','blk','tov','fgm','fga','tpm','tpa','ftm','fta','min','gs','gp','dd','td'].forEach(function(k){ tbody+='<td>'+sums[k]+'</td>'; });
      tbody+='</tr>';
    }
    table.innerHTML=thead+tbody+'</tbody>';
    initSort(table);
  }

  /* ── SORTING ── */
  function initSort(table) {
    var tbody=table.tBodies[0]; if(!tbody) return;
    Array.from(tbody.rows).forEach(function(r,i){ if(!r.dataset.originalIndex) r.dataset.originalIndex=String(i); });
    var headers=table.querySelectorAll('thead th');
    headers.forEach(function(th,colIdx){
      th.dataset.sortState='none';
      th.addEventListener('click',function(){
        var curr=th.dataset.sortState;
        var next=curr==='none'?'desc':curr==='desc'?'asc':'none';
        headers.forEach(function(h){ h.dataset.sortState='none'; h.classList.remove('sort-asc','sort-desc','sort-col'); var a=h.querySelector('.sort-arrow'); if(a) a.textContent=''; });
        table.querySelectorAll('.sort-col').forEach(function(el){ el.classList.remove('sort-col'); });
        th.dataset.sortState=next;
        var arrow=th.querySelector('.sort-arrow');
        if(next==='desc'){ th.classList.add('sort-desc'); if(arrow) arrow.textContent='▼'; }
        else if(next==='asc'){ th.classList.add('sort-asc'); if(arrow) arrow.textContent='▲'; }
        var rows=Array.from(tbody.rows);
        if(next==='none'){
          rows.sort(function(a,b){ return Number(a.dataset.originalIndex)-Number(b.dataset.originalIndex); });
        } else {
          rows.sort(function(a,b){
            var aC=a.dataset.career==='1',bC=b.dataset.career==='1'; if(aC||bC) return aC?1:-1;
            var aD=a.dataset.dnq==='1',bD=b.dataset.dnq==='1';
            if(aD||bD){ if(aD&&bD) return Number(a.dataset.originalIndex)-Number(b.dataset.originalIndex); return aD?1:-1; }
            // data-sort-val wins when a cell carries one, so a column can sort
            // on something other than its display text (e.g. 'MAR 15, 2012')
            var aCell=a.cells[colIdx], bCell=b.cells[colIdx];
            var aT=(aCell?.dataset.sortVal ?? (aCell?.textContent||'')).trim();
            var bT=(bCell?.dataset.sortVal ?? (bCell?.textContent||'')).trim();
            var aN=parseFloat(aT.replace('%','').replace(',','')), bN=parseFloat(bT.replace('%','').replace(',',''));
            var cmp=(!isNaN(aN)&&!isNaN(bN))?aN-bN:aT.localeCompare(bT);
            return next==='asc'?cmp:-cmp;
          });
        }
        rows.forEach(function(r){ tbody.appendChild(r); });
        if(next!=='none'){
          th.classList.add('sort-col');
          Array.from(tbody.rows).forEach(function(r){
            if(r.dataset.career==='1') return;
            var cell=r.cells[colIdx]; if(cell) cell.classList.add('sort-col');
          });
        }
      });
    });
  }

  /* ── CHART HELPERS ── */
  function destroyCharts() {
    Object.keys(activeCharts).forEach(function(id){ if(activeCharts[id]){ activeCharts[id].destroy(); delete activeCharts[id]; } });
  }

  function chartColors() {
    var light=document.documentElement.classList.contains('light');
    return {
      orange:'var(--orange)', orangeFade:'rgba(var(--accent-rgb),0.15)',
      blue:'#231aa5',   blueFade:'rgba(35,26,165,0.15)',
      navy:'var(--dark-orange)',
      grid:  light?'rgba(0,0,0,0.07)':'rgba(255,255,255,0.06)',
      text:  light?'#2a2140':'#d0d0d0',
      faint: light?'rgba(42,33,64,0.4)':'rgba(208,208,208,0.4)',
    };
  }

  function baseScales(c) {
    return { x:{ ticks:{color:c.faint,font:{family:"'Share Tech Mono',monospace",size:9}}, grid:{color:c.grid} },
             y:{ ticks:{color:c.faint,font:{family:"'Share Tech Mono',monospace",size:9}}, grid:{color:c.grid} } };
  }

  function legendOpts(c) {
    return { display:false }; // hidden — we use the card header title instead
  }

  /* ── STAT ROW VALUE GETTER ── */
  function getStatVal(row, stat) {
    if (!row) return 0;
    var map = { ppg:row.ppg, rpg:row.rpg, apg:row.apg, spg:row.spg, bpg:row.bpg, topg:row.topg, mpg:row.mpg,
                fgp:parseFloat((row.fgp||'0').replace('%','')),
                tpp:parseFloat((row.tpp||'0').replace('%','')),
                ftp:parseFloat((row.ftp||'0').replace('%','')) };
    return isNaN(map[stat]) ? 0 : (map[stat]||0);
  }

  function statLabel(stat) {
    return {ppg:'PPG',rpg:'RPG',apg:'APG',spg:'SPG',bpg:'BPG',topg:'TOPG',mpg:'MPG',fgp:'FG%',tpp:'3P%',ftp:'FT%'}[stat]||stat.toUpperCase();
  }

  function statFullName(stat) {
    return {ppg:'Points Per Game',rpg:'Rebounds Per Game',apg:'Assists Per Game',
            spg:'Steals Per Game',bpg:'Blocks Per Game',topg:'Turnovers Per Game',
            mpg:'Minutes Per Game',fgp:'Field Goal %',tpp:'Three Point %',ftp:'Free Throw %'}[stat]||stat.toUpperCase();
  }

  /* ── WEIGHTED AVG ROW ── */
  function weightedAvgRow(rows) {
    var valid = (rows||[]).filter(isProRow);
    if (!valid.length) return null;
    var g=0,wP=0,wR=0,wA=0,wS=0,wB=0,wT=0,wFG=0,wTP=0,wFT=0,tpW=0,wMPG=0;
    valid.forEach(function(r){
      var gp = r.gp||0; if(gp<=0) return;
      g+=gp; wP+=r.ppg*gp; wR+=r.rpg*gp; wA+=r.apg*gp;
      wS+=r.spg*gp; wB+=r.bpg*gp; wT+=r.topg*gp; wMPG+=r.mpg*gp;
      wFG+=parseFloat(String(r.fgp||'0').replace('%',''))*gp;
      wFT+=parseFloat(String(r.ftp||'0').replace('%',''))*gp;
      var tw=(r.tpa||0)>0?(r.tpa*gp):gp; tpW+=tw;
      wTP+=parseFloat(String(r.tpp||'0').replace('%',''))*tw;
    });
    if (!g) return null;
    return { ppg:wP/g, rpg:wR/g, apg:wA/g, spg:wS/g, bpg:wB/g, topg:wT/g, mpg:wMPG/g,
             fgp:wFG/g, tpp:tpW>0?wTP/tpW:0, ftp:wFT/g };
  }

  /* ══ CHART 1: PROGRESSION LINE ══ */
  function buildProgressionChart(key, stat) {
    if(activeCharts['prog']){ activeCharts['prog'].destroy(); delete activeCharts['prog']; }
    var data=(PLAYER_STATS[key]||{}).regular||[];
    var valid=data.filter(isProRow);
    if(!valid.length) return;
    var c=chartColors();

    // Update card header title
    var titleEl=document.getElementById('progression-chart-title');
    if(titleEl) titleEl.textContent=statFullName(stat);

    // Build per-point team color arrays
    var pointColors = valid.map(function(r) {
      var tn = teamFull(r.team||'');
      var tc = tn ? TEAM_BANNER_COLORS[tn] : null;
      return tc ? tc.primary : c.orange;
    });
    // Per-point fade (for fill) — 30% opacity of primary color
    var pointFades = valid.map(function(r) {
      var tn = teamFull(r.team||'');
      var tc = tn ? TEAM_BANNER_COLORS[tn] : null;
      var hex = tc ? tc.primary : 'var(--orange)';
      var ri=parseInt(hex.slice(1,3),16), gi=parseInt(hex.slice(3,5),16), bi=parseInt(hex.slice(5,7),16);
      return 'rgba('+ri+','+gi+','+bi+',.18)';
    });

    // Build lookup: season label → row + index
    var rowByLabel={};
    valid.forEach(function(r,i){ rowByLabel[fmtSeason(r.season)]={ row:r, idx:i }; });

    // External tooltip element
    var tooltipEl=document.getElementById('prog-tooltip');
    if(!tooltipEl){
      tooltipEl=document.createElement('div');
      tooltipEl.id='prog-tooltip';
      tooltipEl.style.cssText=
        'position:fixed;pointer-events:none;z-index:9999;display:none;'+
        'padding:8px 12px;min-width:120px;'+
        'box-shadow:0 4px 18px rgba(0,0,0,.35);';
      document.body.appendChild(tooltipEl);
    }

    function externalTooltip(context){
      var tt=context.tooltip;
      if(tt.opacity===0){ tooltipEl.style.display='none'; return; }

      var isLightNow=document.documentElement.classList.contains('light');
      var bg      = isLightNow ? '#ffffff' : '#0e0b2e';
      var border  = isLightNow ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)';
      var textMain= isLightNow ? '#0e0b2e' : '#ffffff';
      var textMuted=isLightNow ? 'rgba(14,11,46,.5)' : 'rgba(255,255,255,.45)';

      var label = tt.dataPoints&&tt.dataPoints[0]?tt.dataPoints[0].label:'';
      var entry = rowByLabel[label];
      var row   = entry ? entry.row : null;
      var idx   = entry ? entry.idx : 0;
      var rawVal= tt.dataPoints&&tt.dataPoints[0]?tt.dataPoints[0].raw:0;
      var isPct =(stat==='fgp'||stat==='tpp'||stat==='ftp');
      var displayVal=isPct?rawVal.toFixed(1)+'%':rawVal.toFixed(1);
      var teamRaw=row?row.team:'';
      var teamName=teamRaw?teamFull(teamRaw):'';
      var logoUrl=teamName?(TEAM_LOGOS[teamName]||''):'';
      // Use team primary color for the value
      var tn = teamName ? TEAM_BANNER_COLORS[teamName] : null;
      var accentColor = tn ? tn.primary : c.orange;

      tooltipEl.style.background=bg;
      tooltipEl.style.border='1px solid '+border;
      tooltipEl.innerHTML=
        '<div style="display:flex;align-items:center;gap:8px;">'+
          (logoUrl?'<img src="'+logoUrl+'" style="width:24px;height:24px;object-fit:contain;flex-shrink:0;" alt="">':'')+
          '<div style="flex:1;min-width:0;">'+
            '<div style="font-family:var(--font-mono);font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:'+textMuted+';">'+label+'</div>'+
            '<div style="font-family:var(--font-mono);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:'+textMuted+';margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+teamName+'</div>'+
          '</div>'+
          '<div style="font-family:var(--font-display);font-weight:400;font-size:1.3rem;color:'+textMain+';line-height:1;flex-shrink:0;padding-left:8px;">'+displayVal+'</div>'+
        '</div>';

      tooltipEl.style.display='block';
      var canvas=context.chart.canvas;
      var rect=canvas.getBoundingClientRect();
      var x=rect.left+tt.caretX+14;
      var y=rect.top+tt.caretY-20;
      if(x+180>window.innerWidth) x=rect.left+tt.caretX-180-14;
      tooltipEl.style.left=x+'px';
      tooltipEl.style.top=y+'px';
    }

    var ctx2=document.getElementById('chart-progression').getContext('2d');
    activeCharts['prog']=new Chart(ctx2,{
      type:'line',
      data:{
        labels:valid.map(function(r){ return fmtSeason(r.season); }),
        datasets:[{
          label:statLabel(stat),
          data:valid.map(function(r){ return getStatVal(r,stat); }),
          // Segment coloring — each segment takes color of the point it arrives at (p1)
          // so the color change appears to the LEFT of each dot
          borderColor: function(ctx3) {
            var i = ctx3.p1DataIndex !== undefined ? ctx3.p1DataIndex : 0;
            return pointColors[i] || c.orange;
          },
          segment:{
            borderColor: function(ctx3){
              var i = ctx3.p1DataIndex !== undefined ? ctx3.p1DataIndex : 0;
              return pointColors[i] || c.orange;
            },
            backgroundColor: function(ctx3){
              var i = ctx3.p1DataIndex !== undefined ? ctx3.p1DataIndex : 0;
              return pointFades[i] || c.orangeFade;
            }
          },
          backgroundColor: pointFades[0] || c.orangeFade,
          tension:.35, fill:true,
          pointBackgroundColor: pointColors,
          pointBorderColor: pointColors,
          pointRadius:4, pointHoverRadius:7,
          pointHitRadius:28
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        interaction:{ mode:'index', intersect:false },
        plugins:{
          legend:legendOpts(c),
          tooltip:{ enabled:false, external:externalTooltip }
        },
        scales:baseScales(c)
      }
    });

    var canvasEl=document.getElementById('chart-progression');
    canvasEl.onmouseleave=function(){ tooltipEl.style.display='none'; };
  }

  /* ── BUILD ALL CHARTS ── */
  function buildCharts(key) {
    var stat=document.getElementById('progression-stat-select').value||'ppg';
    buildProgressionChart(key, stat);
    buildPositionPie(key);
    populatePercentileYears(key);
    buildPercentileReport(key, '');
  }

  function initChartControls(key) {
    // Progression stat change
    var progSel=document.getElementById('progression-stat-select');
    if (progSel) progSel.onchange=function(){
      buildProgressionChart(key, progSel.value);
      var titleEl=document.getElementById('progression-chart-title');
      if(titleEl) titleEl.textContent=statFullName(progSel.value);
    };
    // Regular Season / Playoffs toggle
    document.querySelectorAll('[data-scope="pg"]').forEach(function(btn) {
      btn.onclick = function() { renderPGTable(key, btn.dataset.mode); };
    });
    // Percentile year change
    var pctSel=document.getElementById('percentile-year-select');
    var pctPrev=document.getElementById('percentile-year-prev');
    var pctNext=document.getElementById('percentile-year-next');
    function stepPercentileYear(dir) {
      if (!pctSel) return;
      var idx = pctSel.selectedIndex + dir;
      if (idx < 0 || idx >= pctSel.options.length) return;
      pctSel.selectedIndex = idx;
      buildPercentileReport(key, pctSel.value);
    }
    if (pctSel) pctSel.onchange = function() { buildPercentileReport(key, pctSel.value); };
    if (pctPrev) pctPrev.onclick = function() { stepPercentileYear(1); };  // options are newest-first
    if (pctNext) pctNext.onclick = function() { stepPercentileYear(-1); };
  }

  /* ── POSITION PIE CHART ── */
  function buildPositionPie(key) {
    var totals = (PLAYER_STATS[key]||{}).totals || [];
    var canvas  = document.getElementById('chart-position-pie');
    var legend  = document.getElementById('position-pie-legend');
    var card    = document.getElementById('position-pie-card');
    var tooltip = document.getElementById('pie-tooltip');
    if (!canvas || !legend || !card) return;

    // Count games per position from pro seasons only
    var posMap = {};
    totals.filter(function(r){ return r.gp > 0 && COLLEGE_TEAMS.indexOf((r.team||'').toUpperCase()) === -1; })
      .forEach(function(r) {
        var pos = r.pos || '—';
        posMap[pos] = (posMap[pos] || 0) + (r.gp || 0);
      });

    var entries = Object.keys(posMap).map(function(p){ return { pos:p, gp:posMap[p] }; });
    entries.sort(function(a,b){ return b.gp - a.gp; });

    if (!entries.length || (entries.length === 1 && entries[0].pos === '—')) {
      card.style.display = 'none'; return;
    }
    card.style.display = '';

    var total = entries.reduce(function(s,e){ return s + e.gp; }, 0);

    // Use site palette — orange first, then blue, then muted variants
    var PALETTE = ['var(--orange)','#231aa5','#2dd4bf','#f59e0b','#a855f7','#ec4899'];

    // Store slice angles for hit-testing
    var slices = [];
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;  // 160×160
    var cx = W/2, cy = H/2;
    var outerR = Math.min(W,H)/2 - 4;
    var innerR = outerR * 0.52; // donut hole
    var GAP    = 0.022;         // radians gap between slices

    function drawPie(hoveredIdx) {
      var isLight = document.documentElement.classList.contains('light');
      ctx.clearRect(0, 0, W, H);

      // Draw donut hole background to match card bg
      ctx.beginPath();
      ctx.arc(cx, cy, innerR + 1, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? '#f0ede8' : '#08052f';
      ctx.fill();

      slices = [];
      var startAngle = -Math.PI / 2;
      entries.forEach(function(e, i) {
        var sweep = (e.gp / total) * Math.PI * 2 - GAP;
        var midAngle = startAngle + sweep / 2;
        var isHovered = i === hoveredIdx;
        var rOuter = isHovered ? outerR + 6 : outerR;
        var rInner = isHovered ? innerR - 4 : innerR;

        ctx.beginPath();
        ctx.arc(cx, cy, rOuter, startAngle, startAngle + sweep);
        ctx.arc(cx, cy, rInner, startAngle + sweep, startAngle, true);
        ctx.closePath();

        // Slightly lighter on hover
        var col = PALETTE[i % PALETTE.length];
        ctx.fillStyle = isHovered ? col : col + 'cc';
        ctx.shadowBlur = 0;
        ctx.fill();

        // Thin separator line in bg color
        ctx.strokeStyle = isLight ? '#f0ede8' : '#08052f';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        slices.push({ startAngle:startAngle, endAngle:startAngle + sweep, pos:e.pos, gp:e.gp,
          pct:((e.gp/total)*100).toFixed(1), color:col, mid:midAngle });
        startAngle += sweep + GAP;
      });

      // Centre label
      var isLight2 = document.documentElement.classList.contains('light');
      ctx.fillStyle = isLight2 ? 'rgba(42,33,64,0.5)' : 'rgba(208,208,208,0.5)';
      ctx.font = '600 11px "Share Tech Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (hoveredIdx >= 0 && slices[hoveredIdx]) {
        var s = slices[hoveredIdx];
        ctx.fillStyle = s.color;
        ctx.font = 'bold 15px "Barlow Condensed", sans-serif';
        ctx.fillText(s.pos, cx, cy - 8);
        ctx.font = '600 10px "Share Tech Mono", monospace';
        ctx.fillStyle = isLight2 ? 'rgba(42,33,64,0.55)' : 'rgba(208,208,208,0.55)';
        ctx.fillText(s.pct + '%', cx, cy + 8);
      } else {
        ctx.fillText('GP', cx, cy);
      }
    }

    // Hit-test: is point inside a slice?
    function getHoveredSlice(mx, my) {
      var dx = mx - cx, dy = my - cy;
      var dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < innerR || dist > outerR + 6) return -1;
      var angle = Math.atan2(dy, dx);
      // Normalize to our start offset
      for (var i = 0; i < slices.length; i++) {
        var s = slices[i];
        // Normalize angle to same range
        var a = angle;
        while (a < s.startAngle) a += Math.PI * 2;
        if (a >= s.startAngle && a <= s.endAngle) return i;
      }
      return -1;
    }

    // Mouse events
    canvas.onmousemove = function(e) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * scaleX;
      var my = (e.clientY - rect.top) * scaleY;
      var idx = getHoveredSlice(mx, my);
      drawPie(idx);
      if (idx >= 0 && tooltip) {
        var s = slices[idx];
        var isLightNow = document.documentElement.classList.contains('light');
        var bg       = isLightNow ? '#ffffff' : '#0e0b2e';
        var border   = isLightNow ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)';
        var textMain = isLightNow ? '#0e0b2e' : '#ffffff';
        var textMuted= isLightNow ? 'rgba(14,11,46,.5)' : 'rgba(255,255,255,.45)';
        tooltip.style.background = bg;
        tooltip.style.border = '1px solid ' + border;
        tooltip.style.color = textMain;
        tooltip.innerHTML =
          '<div style="display:flex;align-items:center;gap:8px;">' +
            '<div style="flex:1;min-width:0;">' +
              '<div style="font-family:var(--font-mono);font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:' + textMain + ';">' + s.pos + '</div>' +
              '<div style="font-family:var(--font-mono);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:' + textMuted + ';margin-top:1px;">' + s.gp + ' GP</div>' +
            '</div>' +
            '<div style="font-family:var(--font-display);font-weight:400;font-size:1.3rem;color:' + textMain + ';line-height:1;flex-shrink:0;padding-left:8px;">' + s.pct + '%</div>' +
          '</div>';
        tooltip.style.display = 'block';
        tooltip.style.padding = '8px 12px';
        tooltip.style.boxShadow = '0 4px 18px rgba(0,0,0,.35)';
        tooltip.style.minWidth = '120px';
        tooltip.style.left = (e.clientX + 16) + 'px';
        tooltip.style.top  = (e.clientY - 12) + 'px';
      } else if (tooltip) {
        tooltip.style.display = 'none';
      }
    };
    canvas.onmouseleave = function() {
      drawPie(-1);
      if (tooltip) tooltip.style.display = 'none';
    };

    // Legend — styled like Chart.js legend in the other cards
    legend.innerHTML = '';
    entries.forEach(function(e, i) {
      var pct = ((e.gp / total) * 100).toFixed(1);
      var col = PALETTE[i % PALETTE.length];
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;cursor:default;';
      row.innerHTML =
        '<div style="width:3px;height:28px;flex-shrink:0;background:'+col+';"></div>' +
        '<div style="display:flex;flex-direction:column;gap:2px;">' +
          '<span style="font-family:var(--font-display);font-weight:700;font-size:1rem;letter-spacing:.04em;color:var(--heading);">'+e.pos+'</span>' +
          '<span style="font-family:var(--font-mono);font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);">'+e.gp+' GP &nbsp;·&nbsp; '+pct+'%</span>' +
        '</div>';
      // Hover on legend also highlights slice
      row.addEventListener('mouseenter', function() { drawPie(i); });
      row.addEventListener('mouseleave', function() { drawPie(-1); });
      legend.appendChild(row);
    });

    drawPie(-1);
  }

  /* ── SCOUTING REPORT / PERCENTILE ── */

  // 2024-25 NBA per-game stat distributions by position (approx. league data)
  // Each entry: [p10, p25, p50, p75, p90] — used to compute percentile via linear interpolation
  var PCT_BENCHMARKS = {
    PG: {
      ppg:  [5.2,  8.8,  13.5, 19.2, 25.0],
      rpg:  [1.8,  2.6,  3.8,  5.2,  6.8],
      apg:  [2.8,  4.2,  6.0,  8.2,  10.5],
      spg:  [0.4,  0.6,  0.9,  1.3,  1.7],
      bpg:  [0.1,  0.2,  0.3,  0.5,  0.8],
      topg: [1.2,  1.6,  2.1,  2.8,  3.6],
      fgp:  [38.0, 42.0, 45.5, 49.0, 52.5],
      tpp:  [30.0, 34.0, 37.5, 41.0, 44.5],
      ftp:  [68.0, 74.0, 80.0, 86.0, 91.0],
      mpg:  [15.0, 20.0, 25.5, 30.5, 34.5],
    },
    SG: {
      ppg:  [4.8,  8.2,  13.0, 18.8, 24.5],
      rpg:  [1.5,  2.2,  3.2,  4.5,  6.0],
      apg:  [1.4,  2.2,  3.2,  4.8,  6.5],
      spg:  [0.4,  0.6,  0.9,  1.2,  1.6],
      bpg:  [0.1,  0.2,  0.3,  0.5,  0.8],
      topg: [0.9,  1.3,  1.7,  2.3,  3.0],
      fgp:  [38.5, 42.5, 46.0, 49.5, 53.0],
      tpp:  [30.5, 34.5, 37.8, 41.5, 45.0],
      ftp:  [68.0, 74.0, 80.5, 86.5, 91.5],
      mpg:  [14.0, 19.0, 24.5, 30.0, 34.0],
    },
    SF: {
      ppg:  [4.5,  7.8,  12.5, 18.0, 23.5],
      rpg:  [2.0,  3.2,  4.8,  6.5,  8.2],
      apg:  [1.2,  1.8,  2.8,  4.2,  5.8],
      spg:  [0.4,  0.6,  0.9,  1.2,  1.6],
      bpg:  [0.2,  0.3,  0.5,  0.8,  1.2],
      topg: [0.8,  1.2,  1.7,  2.3,  3.0],
      fgp:  [39.0, 43.0, 46.5, 50.0, 53.5],
      tpp:  [29.0, 33.0, 36.5, 40.5, 44.0],
      ftp:  [66.0, 72.0, 78.5, 85.0, 90.5],
      mpg:  [13.5, 18.5, 24.0, 29.5, 33.5],
    },
    PF: {
      ppg:  [4.2,  7.5,  12.0, 17.5, 23.0],
      rpg:  [2.8,  4.2,  6.0,  8.0,  10.0],
      apg:  [0.8,  1.4,  2.2,  3.4,  4.8],
      spg:  [0.3,  0.5,  0.7,  1.1,  1.5],
      bpg:  [0.2,  0.4,  0.7,  1.1,  1.6],
      topg: [0.8,  1.1,  1.6,  2.2,  2.9],
      fgp:  [40.0, 44.0, 48.0, 52.0, 55.5],
      tpp:  [25.0, 30.5, 35.0, 38.5, 42.5],
      ftp:  [62.0, 68.0, 75.0, 82.0, 88.0],
      mpg:  [13.0, 18.0, 23.5, 29.0, 33.0],
    },
    C: {
      ppg:  [3.8,  6.5,  11.0, 16.5, 22.0],
      rpg:  [3.5,  5.5,  8.0,  10.5, 12.8],
      apg:  [0.6,  1.0,  1.8,  3.0,  4.5],
      spg:  [0.2,  0.4,  0.6,  0.9,  1.3],
      bpg:  [0.4,  0.7,  1.1,  1.7,  2.4],
      topg: [0.7,  1.1,  1.6,  2.2,  2.9],
      fgp:  [44.0, 49.0, 54.0, 58.5, 63.0],
      tpp:  [20.0, 27.0, 33.0, 37.5, 41.5],
      ftp:  [55.0, 62.0, 70.0, 78.0, 85.0],
      mpg:  [12.0, 17.0, 22.5, 27.5, 31.5],
    },
  };
  // Fallback if position not matched
  PCT_BENCHMARKS['G']  = PCT_BENCHMARKS['PG'];
  PCT_BENCHMARKS['F']  = PCT_BENCHMARKS['SF'];
  PCT_BENCHMARKS['F-G']= PCT_BENCHMARKS['SG'];
  PCT_BENCHMARKS['F-C']= PCT_BENCHMARKS['PF'];
  PCT_BENCHMARKS['C-F']= PCT_BENCHMARKS['PF'];

  var PCT_STATS = [
    { key:'ppg',  label:'PPG',  higher:true  },
    { key:'rpg',  label:'RPG',  higher:true  },
    { key:'apg',  label:'APG',  higher:true  },
    { key:'spg',  label:'SPG',  higher:true  },
    { key:'bpg',  label:'BPG',  higher:true  },
    { key:'topg', label:'TOPG', higher:false },
    { key:'fgp',  label:'FG%',  higher:true  },
    { key:'tpp',  label:'3P%',  higher:true  },
    { key:'ftp',  label:'FT%',  higher:true  },
    { key:'mpg',  label:'MPG',  higher:true  },
  ];

  function calcPercentile(val, benchmarks, higher) {
    // benchmarks = [p10, p25, p50, p75, p90]
    var points = [[0,10],[1,25],[2,50],[3,75],[4,90]];
    if (val <= benchmarks[0]) return higher ? Math.round((val / benchmarks[0]) * 10) : 90 + Math.round(((benchmarks[0]-val)/benchmarks[0])*10);
    if (val >= benchmarks[4]) return higher ? Math.min(99, 90 + Math.round(((val-benchmarks[4])/benchmarks[4])*9)) : Math.max(1, 10 - Math.round(((val-benchmarks[4])/benchmarks[4])*9));
    var pct = 10;
    for (var i = 0; i < 4; i++) {
      var lo = benchmarks[i], hi = benchmarks[i+1];
      var pLo = points[i][1], pHi = points[i+1][1];
      if (val >= lo && val <= hi) {
        pct = pLo + ((val - lo) / (hi - lo)) * (pHi - pLo);
        break;
      }
    }
    return higher ? Math.round(pct) : Math.round(100 - pct);
  }

  function pctBarColor(pct) {
    if (pct >= 75) return '#22c55e';        // green
    if (pct >= 50) return '#84cc16';        // yellow-green
    if (pct >= 25) return '#e8a838';        // amber
    return '#b45309';                        // brown-red
  }

  function populatePercentileYears(key) {
    var sel = document.getElementById('percentile-year-select');
    if (!sel) return;
    var data = (PLAYER_STATS[key]||{}).regular || [];
    var valid = data.filter(isProRow);
    sel.innerHTML = '';
    valid.slice().reverse().forEach(function(r) {
      var o = document.createElement('option');
      o.value = r.season;
      o.textContent = fmtSeason(r.season);
      sel.appendChild(o);
    });
  }

  function buildPercentileReport(key, season) {
    var card = document.getElementById('percentile-card');
    var body = document.getElementById('percentile-body');
    if (!card || !body) return;

    var data  = (PLAYER_STATS[key]||{}).regular || [];
    var valid = data.filter(isProRow);
    if (!valid.length) { card.style.display='none'; return; }
    card.style.display = '';

    // Pick row — default to most recent
    var sel = document.getElementById('percentile-year-select');
    var targetSeason = season || (sel && sel.value) || valid[valid.length-1].season;
    if (sel && targetSeason) sel.value = targetSeason;
    var row = valid.find(function(r){ return r.season === targetSeason; }) || valid[valid.length-1];

    // Always get position from totals row for THIS season
    var totals = (PLAYER_STATS[key]||{}).totals || [];
    var totRow = totals.find(function(r){ return r.season === row.season; });
    var pos = (totRow && totRow.pos) ? totRow.pos : (PLAYERS[key].position || 'PG');
    var benchPos = pos.toUpperCase().trim();
    var bench = PCT_BENCHMARKS[benchPos] || PCT_BENCHMARKS['PG'];

    // Update team logo next to dropdown
    var logoImg = document.getElementById('percentile-team-logo');
    if (logoImg) {
      var teamRaw = row.team || '';
      var teamName = teamRaw ? teamFull(teamRaw) : '';
      var logoUrl = teamName ? (TEAM_LOGOS[teamName] || '') : '';
      if (logoUrl) {
        logoImg.src = logoUrl;
        logoImg.alt = teamName;
        logoImg.style.display = 'block';
      } else {
        logoImg.style.display = 'none';
      }
    }

    // Get/create tooltip
    var tooltip = document.getElementById('pct-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'pct-tooltip';
      tooltip.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;display:none;padding:8px 12px;min-width:140px;box-shadow:0 4px 18px rgba(0,0,0,.35);';
      document.body.appendChild(tooltip);
    }

    var PCT_STAT_FULL = {
      ppg:'Points Per Game', rpg:'Rebounds Per Game', apg:'Assists Per Game',
      spg:'Steals Per Game', bpg:'Blocks Per Game', topg:'Turnovers Per Game',
      fgp:'Field Goal %', tpp:'Three Point %', ftp:'Free Throw %', mpg:'Minutes Per Game'
    };
    var PCT_CONTEXT = {
      ppg:'Higher is better', rpg:'Higher is better', apg:'Higher is better',
      spg:'Higher is better', bpg:'Higher is better', topg:'Lower is better',
      fgp:'Higher is better', tpp:'Higher is better', ftp:'Higher is better', mpg:'Higher is better'
    };

    body.innerHTML = '';
    PCT_STATS.forEach(function(s) {
      var rawVal = parseFloat(String(row[s.key]||'0').replace('%',''));
      if (isNaN(rawVal)) rawVal = 0;
      var benchArr = bench[s.key];
      if (!benchArr) return;
      var pct = calcPercentile(rawVal, benchArr, s.higher);
      var barCol = pctBarColor(pct);
      var pctTxtCol = pct >= 75 ? '#22c55e' : pct >= 50 ? '#84cc16' : pct >= 25 ? '#e8a838' : '#b45309';
      var displayVal = (s.key==='fgp'||s.key==='tpp'||s.key==='ftp') ? rawVal.toFixed(1)+'%' : rawVal.toFixed(1);

      var rowEl = document.createElement('div');
      rowEl.className = 'pct-row';
      rowEl.innerHTML =
        '<span class="pct-stat">'+s.label+'</span>'+
        '<span class="pct-val">'+displayVal+'</span>'+
        '<div class="pct-bar-wrap"><div class="pct-bar" style="width:'+pct+'%;background:'+barCol+';"></div></div>'+
        '<span class="pct-num" style="color:'+pctTxtCol+';">'+pct+'</span>';

      // Hover tooltip
      rowEl.addEventListener('mouseenter', function(e) {
        var isLightNow = document.documentElement.classList.contains('light');
        var bg       = isLightNow ? '#ffffff' : '#0e0b2e';
        var border   = isLightNow ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)';
        var textMain = isLightNow ? '#0e0b2e' : '#ffffff';
        var textMuted= isLightNow ? 'rgba(14,11,46,.5)' : 'rgba(255,255,255,.45)';
        tooltip.style.background = bg;
        tooltip.style.border = '1px solid ' + border;
        tooltip.innerHTML =
          '<div style="display:flex;align-items:center;gap:8px;">' +
            '<div style="flex:1;min-width:0;">' +
              '<div style="font-family:var(--font-mono);font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:'+textMain+';">' + (PCT_STAT_FULL[s.key]||s.label) + '</div>' +
              '<div style="font-family:var(--font-mono);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:'+textMuted+';margin-top:1px;">vs '+benchPos+' avg · '+PCT_CONTEXT[s.key]+'</div>' +
            '</div>' +
            '<div style="font-family:var(--font-display);font-weight:400;font-size:1.3rem;color:'+pctTxtCol+';line-height:1;flex-shrink:0;padding-left:8px;">'+pct+'<span style="font-size:.6rem;font-family:var(--font-mono);color:'+textMuted+';margin-left:2px;">%ile</span></div>' +
          '</div>';
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 16) + 'px';
        tooltip.style.top  = (e.clientY - 16) + 'px';
      });
      rowEl.addEventListener('mousemove', function(e) {
        tooltip.style.left = (e.clientX + 16) + 'px';
        tooltip.style.top  = (e.clientY - 16) + 'px';
      });
      rowEl.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
      });

      body.appendChild(rowEl);
    });

    // Position + season note at bottom
    var note = document.createElement('div');
    note.style.cssText = 'font-family:var(--font-mono);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin-top:10px;padding-top:8px;border-top:1px solid var(--border-soft);';
    note.textContent = 'vs ' + benchPos + ' league avg · 2024-25 NBA · ' + fmtSeason(row.season);
    body.appendChild(note);

    // Update arrow disabled state
    var pctSel2 = document.getElementById('percentile-year-select');
    var pctPrev2 = document.getElementById('percentile-year-prev');
    var pctNext2 = document.getElementById('percentile-year-next');
    if (pctSel2 && pctPrev2 && pctNext2) {
      pctPrev2.disabled = pctSel2.selectedIndex >= pctSel2.options.length - 1;
      pctNext2.disabled = pctSel2.selectedIndex <= 0;
    }
  }
  /* Importance rank for sorting: lower = more important */
  var AWARD_RANK = {
    'hall of fame':1,
    'most valuable player':2, 'mvp':2,
    'champion':3, 'finals mvp':3,
    'all-nba first team':4,
    'all-nba second team':5,
    'all-nba third team':6,
    'all-defense first team':7,
    'all-defense second team':8,
    'nba all-star':9,
    'most improved player':10,
    'all-rookie first team':11,
    'all-rookie second team':12,
    'ncaa champion':13,
    'olympics':14,
  };

  function awardsRank(title) {
    var t = (title||'').toLowerCase();
    for (var key in AWARD_RANK) {
      if (t.indexOf(key) !== -1) return AWARD_RANK[key];
    }
    return 99;
  }

  var awardsViewMode = 'importance'; // 'importance' | 'chronological'

  function renderAwards(key) {
    var panel = document.getElementById('panel-awards');
    if (!panel) return;
    var data = (PLAYER_STATS[key]||{}).awards;
    if (!data) {
      panel.innerHTML = '<div class="panel-placeholder"><div class="panel-placeholder-icon">🏆</div><div class="panel-placeholder-title">Awards</div><p class="panel-placeholder-sub">No awards data available yet.</p></div>';
      return;
    }

    // Pull regular season rows for stats lookup
    var regularRows = (PLAYER_STATS[key]||{}).regular || [];

    // Flatten all awards into one list with category tag
    var all = [];
    (data.nba||[]).forEach(function(a)     { all.push({ title:a.title, years:a.years||[], cat:'NBA' }); });
    (data.college||[]).forEach(function(a) { all.push({ title:a.title, years:a.years||[], cat:'College' }); });
    (data.misc||[]).forEach(function(a)    { all.push({ title:a.title, years:a.years||[], cat:'Other' }); });

    if (!all.length) {
      panel.innerHTML = '<div class="panel-placeholder"><div class="panel-placeholder-icon">🏅</div><div class="panel-placeholder-title">Awards</div><p class="panel-placeholder-sub">No awards recorded yet.</p></div>';
      return;
    }

    // Expand each award into one row per year
    var rows = [];
    all.forEach(function(a) {
      if (a.years.length === 0) {
        rows.push({ title:a.title, year:null, cat:a.cat, rank:awardsRank(a.title), count:0 });
      } else {
        a.years.forEach(function(yr) {
          rows.push({ title:a.title, year:yr, cat:a.cat, rank:awardsRank(a.title), count:a.years.length });
        });
      }
    });

    function awardEmoji(title) {
      var t = (title||'').toLowerCase();
      if (t.indexOf('hall of fame') !== -1)                                return ' 🏛️';
      if (t.indexOf('most valuable player') !== -1 || t === 'nba mvp')    return ' 👑';
      if (t.indexOf('gold medal') !== -1 || t.indexOf('olympics') !== -1) return ' 🥇';
      if (t.indexOf('champion') !== -1 || t.indexOf('finals mvp') !== -1) return ' 🏆';
      return '';
    }

    function fmtRangeYears(years) {
      if (!years || !years.length) return '';
      var sorted = years.slice().sort(function(a,b){ return a-b; });
      var ranges = [], s = sorted[0], e = sorted[0];
      for (var i=1; i<sorted.length; i++) {
        if (sorted[i] === e+1) { e = sorted[i]; }
        else { ranges.push(s===e ? String(s) : s+'–'+e); s = e = sorted[i]; }
      }
      ranges.push(s===e ? String(s) : s+'–'+e);
      return ranges.join(', ');
    }

    // Returns {team, ppg, rpg, apg} for a given calendar year (season ending in that year)
    function statsForYear(yr) {
      if (!yr || yr === '—') return null;
      // season format: '2022-23' means the year is 2023
      for (var i=0; i<regularRows.length; i++) {
        var r = regularRows[i];
        var seasonEnd = parseInt(String(r.season||'').split('-')[0]) + 1;
        if (seasonEnd === yr && !r.dnq && r.gp > 0) {
          return { team: r.team, ppg: r.ppg, rpg: r.rpg, apg: r.apg };
        }
      }
      return null;
    }

    // Build abbr->fullName map from regularRows at award-render time
    var abbrToFull = {};
    regularRows.forEach(function(r) {
      if (r.team && r.team.length <= 4) {
        // Try to find matching full team name in TEAM_LOGOS
        if (!abbrToFull[r.team]) {
          for (var k in TEAM_LOGOS) {
            var words = k.split(' ');
            var abbr = words.map(function(w){ return w[0]; }).join('').toUpperCase();
            var last = words[words.length-1].toUpperCase().slice(0,3);
            if (abbr === r.team || last === r.team.slice(0,3) || k.toUpperCase().indexOf(r.team) !== -1) {
              abbrToFull[r.team] = k;
              break;
            }
          }
        }
      } else if (r.team) {
        abbrToFull[r.team] = r.team; // already full name
      }
    });

    function teamLogoImg(teamCode) {
      // Direct key match first (handles college abbrs and full names)
      var url = TEAM_LOGOS[teamCode] || TEAM_LOGOS[abbrToFull[teamCode]] || '';
      if (url) {
        return '<img src="'+url+'" alt="" style="width:16px;height:16px;object-fit:contain;vertical-align:middle;display:inline-block;margin:0 5px 1px 6px;">';
      }
      return '<span style="font-family:var(--font-mono);font-size:.55rem;color:var(--text-muted);margin:0 6px;">'+teamCode+'</span>';
    }

    function fmt1Stat(n) {
      var v = parseFloat(n);
      return isNaN(v) ? '—' : (Math.round(v*10)/10).toFixed(1);
    }

    // ── CHRONOLOGICAL VIEW ──
    function buildChronologicalRows() {
      var sorted = rows.slice().sort(function(a,b){ return (a.year||9999)-(b.year||9999) || a.rank-b.rank; });
      var yearMap = {}, yearOrder = [];
      sorted.forEach(function(r) {
        var y = r.year || '—';
        if (!yearMap[y]) { yearMap[y] = []; yearOrder.push(y); }
        yearMap[y].push(r);
      });
      var html = '';
      yearOrder.forEach(function(yr) {
        var stats = typeof yr === 'number' ? statsForYear(yr) : null;
        var dividerContent = '<span style="font-weight:700;font-size:.72rem;">' + yr + '</span>';
        if (stats) {
          dividerContent += teamLogoImg(stats.team);
          dividerContent += '<span style="font-size:.62rem;color:var(--text-muted);letter-spacing:.04em;">'
            + fmt1Stat(stats.ppg) + ' PPG, '
            + fmt1Stat(stats.rpg) + ' RPG, '
            + fmt1Stat(stats.apg) + ' APG'
            + '</span>';
        }
        html += '<li class="awards-section-divider" style="display:flex;align-items:center;flex-wrap:wrap;gap:0;">' + dividerContent + '</li>';
        yearMap[yr].forEach(function(r) {
          html += '<li class="awards-list-row">';
          html += '<span class="aw-cat">' + r.cat + '</span>';
          html += '<span class="aw-title">' + r.title + awardEmoji(r.title) + '</span>';
          html += '</li>';
        });
      });
      return html;
    }

    // ── IMPORTANCE VIEW: build a single card with given pre-grouped items ──
    function buildImportanceCard(headerLabel, groupedItems) {
      // groupedItems: array of { sectionLabel, items: [{title, years:[]}] }
      if (!groupedItems || !groupedItems.length) return '';
      var rows2 = '';
      groupedItems.forEach(function(section) {
        if (!section.items || !section.items.length) return;
        rows2 += '<li class="awards-section-divider">' + section.sectionLabel + '</li>';
        section.items.forEach(function(g) {
          var sorted = (g.years||[]).slice().sort(function(a,b){ return a-b; });
          var yearStr = sorted.length ? fmtRangeYears(sorted) : '';
          var countBadge = sorted.length > 1 ? '<span class="aw-count">'+sorted.length+'x</span>' : '';
          rows2 += '<li class="awards-list-row">';
          rows2 += '<span class="aw-title">'+g.title+awardEmoji(g.title)+countBadge+'</span>';
          rows2 += '<span class="aw-years-right">'+yearStr+'</span>';
          rows2 += '</li>';
        });
      });
      if (!rows2) return '';
      return '<div class="awards-table-card">'
        + '<div class="awards-table-header"><div class="chart-card-dot"></div>'
        + '<span class="chart-card-title">'+headerLabel+'</span></div>'
        + '<ul class="awards-list">'+rows2+'</ul>'
        + '</div>';
    }

    function groupAndSort(items) {
      // Merge duplicate titles, sort by rank
      var byTitle = {};
      (items||[]).forEach(function(a) {
        if (!byTitle[a.title]) byTitle[a.title] = { title:a.title, rank:a._rank||50, years:[] };
        (a.years||[]).forEach(function(y){ byTitle[a.title].years.push(y); });
      });
      return Object.keys(byTitle).map(function(k){ return byTitle[k]; })
        .sort(function(a,b){ return a.rank-b.rank || a.title.localeCompare(b.title); });
    }

    function buildImportanceHTML() {
      var awardsData = (PLAYER_STATS[key]||{}).awards || {};

      // ── NBA Card ──
      var nbaTiers = [
        { label:'Pinnacle',                     ranks:[1,3]  },
        { label:'All-NBA & Defense',            ranks:[4,8]  },
        { label:'All-Star & Individual Awards', ranks:[9,12] },
      ];
      var nbaItems = (awardsData.nba||[]).map(function(a){
        return { title:a.title, years:a.years||[], _rank:awardsRank(a.title) };
      });
      var nbaGrouped = groupAndSort(nbaItems);
      var nbaSections = nbaTiers.map(function(tier) {
        return {
          sectionLabel: tier.label,
          items: nbaGrouped.filter(function(g){ return g.rank>=tier.ranks[0] && g.rank<=tier.ranks[1]; })
        };
      }).filter(function(s){ return s.items.length > 0; });
      var nbaCard = buildImportanceCard('NBA Accolades', nbaSections);

      // ── College Card — show ALL items, no rank filtering ──
      var collegeItems = (awardsData.college||[]).map(function(a, i){
        return { title:a.title, years:a.years||[], _rank: i+1 }; // preserve original order
      });
      var collegeGrouped = groupAndSort(collegeItems);
      var collegeCard = collegeGrouped.length
        ? buildImportanceCard('College Accolades', [{ sectionLabel:'College', items:collegeGrouped }])
        : '';

      // ── International Card — separate, always visible ──
      var miscItems = (awardsData.misc||[]).map(function(a, i){
        return { title:a.title, years:a.years||[], _rank: i+1 };
      });
      var miscGrouped = groupAndSort(miscItems);
      var miscCard = miscGrouped.length
        ? buildImportanceCard('International', [{ sectionLabel:'International', items:miscGrouped }])
        : '';

      var cards = [nbaCard, collegeCard, miscCard].filter(Boolean);
      return cards.length
        ? cards.join('<div style="height:24px;"></div>')
        : '<div class="awards-empty">No awards data.</div>';
    }

    function buildListHTML() {
      if (awardsViewMode === 'chronological') {
        return '<div class="awards-table-card" id="awards-list-'+key+'">'
          + '<div class="awards-table-header"><div class="chart-card-dot"></div>'
          + '<span class="chart-card-title">All Awards by Year</span></div>'
          + '<ul class="awards-list">'+buildChronologicalRows()+'</ul>'
          + '</div>';
      } else {
        return '<div id="awards-list-'+key+'">'+buildImportanceHTML()+'</div>';
      }
    }

    function rebuild() {
      var controls = panel.querySelector('.splits-controls');
      if (controls) {
        while (controls.nextSibling) panel.removeChild(controls.nextSibling);
      }
      var tmp = document.createElement('div');
      tmp.innerHTML = buildListHTML();
      while (tmp.firstChild) panel.appendChild(tmp.firstChild);
      panel.querySelectorAll('[data-awards-mode]').forEach(function(b){
        b.classList.toggle('active', b.dataset.awardsMode === awardsViewMode);
      });
    }

    var toggleHTML = '<div class="splits-controls">'
      + '<div>'
        + ''
        + '<div class="awards-section-heading">Career Awards</div>'
      + '</div>'
      + '<div class="splits-toggle">'
        + '<button class="splits-toggle-btn'+(awardsViewMode==='importance'?' active':'')+'" data-awards-mode="importance">By Importance</button>'
        + '<button class="splits-toggle-btn'+(awardsViewMode==='chronological'?' active':'')+'" data-awards-mode="chronological">By Year</button>'
      + '</div>'
      + '</div>';

    panel.innerHTML = toggleHTML + buildListHTML();

    panel.querySelectorAll('[data-awards-mode]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        awardsViewMode = btn.dataset.awardsMode;
        rebuild();
      });
    });
  }

  /* ── CONTRACTS PANEL ── */
  // Build TEAM_COLORS from teaminfo.js primaryColor
  var TEAM_COLORS = {};
  if (typeof teamInfo !== 'undefined') {
    Object.keys(teamInfo).forEach(function(k) {
      var t = teamInfo[k];
      TEAM_COLORS[t.name] = t.primaryColor;
    });
  }

  function fmtSeasonDisplay(s){ return String(s||'').replace('-','–'); }

  function renderContracts(key) {
    var panel = document.getElementById('panel-contracts');
    if (!panel) return;
    var data = (PLAYER_STATS[key]||{}).contracts;
    if (!data) {
      panel.innerHTML = '<div class="panel-placeholder"><div class="panel-placeholder-icon">📄</div><div class="panel-placeholder-title">Contracts</div><p class="panel-placeholder-sub">No contract data available.</p></div>';
      return;
    }

    var seasons  = data.seasons  || [];
    var signings = data.signings || [];

    // Pull age from regular season data for each contract season
    var regularRows = (PLAYER_STATS[key]||{}).regular || [];
    function getAgeForSeason(seasonKey) {
      // Match e.g. '2018-19' in regular rows
      for (var i=0; i<regularRows.length; i++) {
        var rs = String(regularRows[i].season||'');
        if (rs === seasonKey) return regularRows[i].age;
      }
      return '';
    }

    // Career earnings total — include all seasons (waived contracts still count)
    var totalEarned = 0;
    seasons.forEach(function(s) {
      var sal = parseFloat(String(s.salary||'').replace(/[^0-9.]/g,''));
      if (!isNaN(sal)) totalEarned += sal;
    });

    // ── Build table rows (sortable) ──
    var tableId = 'ct-table-'+key;

    function buildTableRows(rowData, sortCol, sortDir) {
      var rows = rowData.slice();
      if (sortDir !== 'none') {
        rows.sort(function(a, b) {
          var valA, valB;
          if (sortCol === 0) { // season
            valA = String(a.season||'');
            valB = String(b.season||'');
            var cmp = valA.localeCompare(valB);
            return sortDir === 'asc' ? cmp : -cmp;
          }
          if (sortCol === 1) { // age
            valA = getAgeForSeason(a.season) || 0;
            valB = getAgeForSeason(b.season) || 0;
          } else if (sortCol === 2) { // team
            valA = String(a.team||'');
            valB = String(b.team||'');
            var cmp2 = valA.localeCompare(valB);
            return sortDir === 'asc' ? cmp2 : -cmp2;
          } else { // salary
            valA = parseFloat(String(a.salary||'').replace(/[^0-9.]/g,''))||0;
            valB = parseFloat(String(b.salary||'').replace(/[^0-9.]/g,''))||0;
          }
          return sortDir === 'asc' ? (valA - valB) : (valB - valA);
        });
      }

            // Build set of played seasons for future-dimming
      var playedSeasons = {};
      regularRows.forEach(function(r){ if (!r.dnq && (r.gp||0) > 0) playedSeasons[String(r.season||'')] = true; });

      var html = '';
      rows.forEach(function(s) {
        var age = getAgeForSeason(s.season);
        var isWaived = s.option === 'waived';
        var isPlayer = s.option === 'player';
        var isTeam   = s.option === 'team';
        var isFuture = !isWaived && !playedSeasons[s.season];

        var optClass = isPlayer ? 'opt-player' : isTeam ? 'opt-team' : isWaived ? 'opt-waived' : '';
        if (isFuture) optClass = (optClass ? optClass + ' ' : '') + 'ct-future';

        var badge = isPlayer
          ? '<span class="ct-opt-badge player">P·OPT</span>'
          : isTeam
          ? '<span class="ct-opt-badge team">T·OPT</span>'
          : isWaived
          ? '<span class="ct-opt-badge waived">WAIVED</span>'
          : '';

        var logo = TEAM_LOGOS[s.team] || '';
        var teamHtml = '<div class="ct-team-cell">'
          + (logo ? '<img src="'+logo+'" alt="" loading="lazy">' : '')
          + '<span>'+s.team+'</span></div>';

        // helper: add sort-col class to the active sorted column
        function tdClass(colIdx) {
          return (sortCol === colIdx && sortDir !== 'none') ? ' class="ct-sort-col"' : '';
        }

        html += '<tr class="'+optClass+'" data-season="'+s.season+'">';
        html += '<td'+tdClass(0)+'>'+fmtSeasonDisplay(s.season)+badge+'</td>';
        html += '<td'+tdClass(1)+'>'+(age||'—')+'</td>';
        html += '<td'+tdClass(2)+'>'+teamHtml+'</td>';
        html += '<td'+tdClass(3)+'>'+s.salary+'</td>';
        html += '</tr>';
      });
      // Career totals row (never sorted away)
      html += '<tr class="ct-career">';
      html += '<td'+(sortCol===0&&sortDir!=='none'?' class="ct-sort-col"':'')+'>Career</td>';
      html += '<td'+(sortCol===1&&sortDir!=='none'?' class="ct-sort-col"':'')+'>  </td>';
      html += '<td'+(sortCol===2&&sortDir!=='none'?' class="ct-sort-col"':'')+'>  </td>';
      html += '<td'+(sortCol===3&&sortDir!=='none'?' class="ct-sort-col"':'')+'>$'+totalEarned.toFixed(2)+'M</td>';
      html += '</tr>';
      return html;
    }

    var COLS = ['SEASON','AGE','TEAM','SALARY'];
    var sortState = { col:-1, dir:'none' };

    function buildHeaderHtml() {
      return COLS.map(function(label, i) {
        var activeClass = sortState.col===i ? (' '+(sortState.dir==='asc'?'sort-asc':'sort-desc')+' ct-sort-col') : '';
        return '<th data-colidx="'+i+'" class="'+activeClass+'">'
          + label
          + '<span class="ct-sort-arrow">'
            + (sortState.col===i ? (sortState.dir==='asc' ? '▲' : '▼') : '')
          + '</span></th>';
      }).join('');
    }

    function refreshTable() {
      var tbl = document.getElementById(tableId);
      if (!tbl) return;
      tbl.querySelector('thead tr').innerHTML = buildHeaderHtml();
      tbl.querySelector('tbody').innerHTML = buildTableRows(seasons, sortState.col, sortState.dir);
      // Re-attach sort listeners
      tbl.querySelectorAll('th').forEach(function(th) {
        th.addEventListener('click', function() {
          var ci = parseInt(th.dataset.colidx, 10);
          if (sortState.col === ci) {
            sortState.dir = sortState.dir==='desc' ? 'asc' : sortState.dir==='asc' ? 'none' : 'desc';
            if (sortState.dir === 'none') sortState.col = -1;
          } else {
            sortState.col = ci;
            sortState.dir = 'desc';
          }
          refreshTable();
        });
      });
    }

    var initialTableHTML = '<thead><tr>'+buildHeaderHtml()+'</tr></thead>'
      + '<tbody>'+buildTableRows(seasons, -1, 'none')+'</tbody>';

    // ── Legend ──
    var legendHTML = '<div class="ct-legend">'
      + '<div class="ct-legend-item"><div class="ct-legend-dot" style="background:rgba(16,148,76,.5);border:1px solid rgba(16,148,76,.3);"></div>Player Option</div>'
      + '<div class="ct-legend-item"><div class="ct-legend-dot" style="background:rgba(124,58,237,.4);border:1px solid rgba(124,58,237,.2);"></div>Team Option</div>'
      + '<div class="ct-legend-item"><div class="ct-legend-dot" style="background:rgba(211,47,47,.5);border:1px solid rgba(211,47,47,.3);"></div>Waived</div>'
      + '<div class="ct-legend-item"><div class="ct-legend-dot" style="background:var(--text-muted);opacity:.35;"></div>Future / Unplayed</div>'
      + '</div>';

    // ── Salary table card ──
    var salaryTable = '<div class="ct-card">'
      + '<div class="ct-card-header"><div class="chart-card-dot"></div><span class="chart-card-title">Season Earnings</span></div>'
      + '<div class="ct-scroll"><table class="ct-table" id="'+tableId+'">'+initialTableHTML+'</table></div>'
      + legendHTML
      + '</div>';

    // ── Salary progression chart ──
    var chartId = 'chart-salary-'+key;
    var salaryChart = '<div class="ct-card">'
      + '<div class="ct-card-header"><div class="chart-card-dot"></div><span class="chart-card-title">Salary Progression</span></div>'
      + '<div class="ct-chart-scroll"><div class="ct-chart-inner"><canvas id="'+chartId+'"></canvas></div></div>'
      + '</div>';

    // ── Build Contract Signings feed ──
    var signingItems = '';
    signings.forEach(function(s) {
      var tc  = TEAM_BANNER_COLORS[s.team];
      var col = tc ? tc.primary : 'var(--orange)';
      var logo = TEAM_LOGOS[s.team] || '';
      // Meta: "4 years · $37.03M / yr"
      var metaParts = [];
      if (s.years) metaParts.push(s.years + ' year' + (s.years > 1 ? 's' : ''));
      if (s.aav)   metaParts.push(s.aav + ' / yr');

      signingItems += '<div class="signing-card">'
        + '<div class="signing-card-bar" style="background:'+col+';"></div>'
        + '<div class="signing-card-logo">'+(logo?'<img src="'+logo+'" alt="">':'')+'</div>'
        + '<div class="signing-card-body">'
          + '<div class="signing-card-left">'
            + '<div class="signing-card-team">'+s.team+'</div>'
            + '<div class="signing-card-date">'+s.date+(s.type?' · '+s.type:'')+'</div>'
          + '</div>'
          + '<div class="signing-card-right">'
            + '<div class="signing-card-value">'+(s.total||'')+'</div>'
            + (metaParts.length ? '<div class="signing-card-meta">'+metaParts.join(' · ')+'</div>' : '')
          + '</div>'
        + '</div>'
        + '</div>';
    });

    // ── Build Trade History feed ──
    var trades = data.trades || [];
    var tradeCards = '';

    function parsePickText(text) {
      var t = text || '';
      var round = /1st/i.test(t) ? 'First Round Pick' : /2nd/i.test(t) ? 'Second Round Pick' : t;
      var yearMatch = t.match(/\b(20\d\d)\b/);
      var year = yearMatch ? yearMatch[1] : '';
      var label = year ? year + ' ' + round : round;
      var extra = t.replace(/\b20\d\d\b/,'').replace(/1st round pick|2nd round pick/i,'').replace(/pick/i,'').trim().replace(/^[-·\s]+|[-·\s]+$/g,'');
      var sub = ['NBA Draft', extra].filter(Boolean).join(' · ');
      return { label: label, sub: sub };
    }

    function buildTradeAssetRow(a, accentColor, oldTeamLogoUrl) {
      var atype = (a.type||'').toLowerCase();
      var bar = '<div class="trade-asset-bar" style="background:'+accentColor+';"></div>';
      if (atype === 'player') {
        var imgUrl = a.img || '';
        if (!imgUrl) {
          // Check PLAYER_HEADSHOTS by name match
          Object.keys(PLAYER_HEADSHOTS).forEach(function(k) {
            var pname = (PLAYERS[k]||{}).name || '';
            if (pname && a.text && pname.toLowerCase() === a.text.toLowerCase()) imgUrl = PLAYER_HEADSHOTS[k];
          });
        }
        // If still no image, use fallback
        if (!imgUrl) imgUrl = NBA_FALLBACK;
        var thumb = imgUrl
          ? '<img class="trade-asset-thumb" src="'+imgUrl+'" alt="'+a.text+'">'
          : '<div class="trade-asset-thumb-init">'+((a.text||'?').charAt(0))+'</div>';
        var oldTeam = oldTeamLogoUrl
          ? '<div class="trade-asset-old-team"><img src="'+oldTeamLogoUrl+'" alt=""></div>'
          : '';
        return '<div class="trade-asset-row">'+bar+thumb
          +'<div class="trade-asset-info">'
            +'<div class="trade-asset-name">'+a.text+'</div>'
            +(a.pos?'<div class="trade-asset-sub">'+a.pos+'</div>':'')
          +'</div>'+oldTeam+'</div>';
      } else {
        var parsed = parsePickText(a.text);
        var logoThumb = oldTeamLogoUrl
          ? '<div class="trade-asset-thumb-logo"><img src="'+oldTeamLogoUrl+'" alt=""></div>'
          : '<div class="trade-asset-thumb-init">🏀</div>';
        return '<div class="trade-asset-row">'+bar+logoThumb
          +'<div class="trade-asset-info">'
            +'<div class="trade-asset-name">'+parsed.label+'</div>'
            +(parsed.sub?'<div class="trade-asset-sub">'+parsed.sub+'</div>':'')
          +'</div></div>';
      }
    }

    trades.forEach(function(t) {
      var toLogo   = TEAM_LOGOS[t.toTeam]   || '';
      var fromLogo = TEAM_LOGOS[t.fromTeam] || '';
      var toTc     = TEAM_BANNER_COLORS[t.toTeam];
      var fromTc   = TEAM_BANNER_COLORS[t.fromTeam];
      var toCol    = toTc   ? toTc.primary : 'var(--orange)';
      var fromCol  = fromTc ? fromTc.primary : '#231aa5';
      var sent     = t.sent     || [];
      var received = t.received || [];

      tradeCards += '<div class="trade-card">';
      // Date bar at top
      tradeCards += '<div class="trade-card-date-bar">'+t.date+'</div>';

      // Two-column grid
      tradeCards += '<div class="trade-columns-row">';

      // LEFT: toTeam receives — header is just their logo
      tradeCards += '<div class="trade-col-side">';
      tradeCards += '<div class="trade-col-header">'
        +(toLogo?'<img src="'+toLogo+'" alt="">':'')
        +'</div>';
      sent.forEach(function(a){ tradeCards += buildTradeAssetRow(a, toCol, fromLogo); });
      tradeCards += '</div>';

      // RIGHT: fromTeam receives — header is just their logo
      tradeCards += '<div class="trade-col-side">';
      tradeCards += '<div class="trade-col-header">'
        +(fromLogo?'<img src="'+fromLogo+'" alt="">':'')
        +'</div>';
      received.forEach(function(a){ tradeCards += buildTradeAssetRow(a, fromCol, toLogo); });
      tradeCards += '</div>';

      tradeCards += '</div>'; // close trade-columns-row
      if (t.notes) tradeCards += '<div class="trade-card-notes">'+t.notes+'</div>';
      tradeCards += '</div>'; // close trade-card
    });

    var signingsFeed = '<div class="contracts-signings">'
      + '<div class="contracts-signings-header"><div class="bio-card-dot"></div>Contract Signings</div>'
      + '<div style="padding:12px;">'+signingItems+'</div>'
      + '</div>';

    var tradesFeed = (trades.length > 0)
      ? '<div class="contracts-signings">'
        + '<div class="contracts-signings-header"><div class="bio-card-dot"></div>Trade History</div>'
        + '<div style="padding:12px;">'+tradeCards+'</div>'
        + '</div>'
      : '';

    var bottomCols = tradesFeed
      ? '<div class="contracts-bottom">'+ signingsFeed + tradesFeed +'</div>'
      : '<div class="contracts-bottom" style="grid-template-columns:1fr;">'+ signingsFeed +'</div>';
    var contractsTitle = '';

    panel.innerHTML = contractsTitle + '<div class="contracts-layout">'
      + '<div>'+ salaryTable + salaryChart +'</div>'
      + '</div>'
      + bottomCols;

        // Attach sort listeners after DOM render
    refreshTable();

    // ── Bar chart ──
    var ctx = document.getElementById(chartId);
    if (!ctx) return;
    var c2d = ctx.getContext('2d');
    var isLight = document.documentElement.classList.contains('light');
    var gridCol   = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
    var textFaint = isLight ? 'rgba(42,33,64,0.45)' : 'rgba(208,208,208,0.45)';

    // Build chart data — group duplicate seasons side-by-side (e.g. waived + new team)
    // Each season row gets its own bar; duplicate seasons show as adjacent bars
    var chartLabels  = [];
    var chartAmounts = [];
    var chartBgCols  = [];
    var chartBdCols  = [];
    var chartTooltips = [];

    // Build played set for chart dimming
    var chartPlayedSet = {};
    regularRows.forEach(function(r){ if (!r.dnq && r.gp > 0) chartPlayedSet[String(r.season||'')] = true; });

    // Track how many times each season appears to append a suffix for duplicates
    var seasonCount = {};
    seasons.forEach(function(s){ seasonCount[s.season] = (seasonCount[s.season]||0)+1; });
    var seasonSeen = {};
    seasons.forEach(function(s, i) {
      seasonSeen[s.season] = (seasonSeen[s.season]||0);
      var labelSuffix = seasonCount[s.season] > 1
        ? (seasonSeen[s.season] === 0 ? ' (1)' : ' (2)')
        : '';
      seasonSeen[s.season]++;

      var label = fmtSeasonDisplay(s.season) + labelSuffix;
      var amount = parseFloat(String(s.salary||'').replace(/[^0-9.]/g,''))||0;
      var isWaived = s.option === 'waived';
      var isFuture = !chartPlayedSet[s.season] && !isWaived;

      var baseColor = TEAM_COLORS[s.team]||'var(--orange)';
      var alpha = isFuture ? '44' : isWaived ? 'cc' : '99';
      var borderAlpha = isFuture ? '66' : 'ff';

      chartLabels.push(label);
      chartAmounts.push(amount);
      chartBgCols.push(baseColor + alpha);
      chartBdCols.push(baseColor + borderAlpha);
      chartTooltips.push({ season: fmtSeasonDisplay(s.season), team: s.team, amount: amount, waived: isWaived, future: isFuture });
    });

    if (activeCharts['salary']) { activeCharts['salary'].destroy(); delete activeCharts['salary']; }

    // External tooltip — matches stat progression style
    var salTooltipEl = document.getElementById('salary-prog-tooltip');
    if (!salTooltipEl) {
      salTooltipEl = document.createElement('div');
      salTooltipEl.id = 'salary-prog-tooltip';
      salTooltipEl.style.cssText =
        'position:fixed;pointer-events:none;z-index:9999;display:none;'+
        'padding:8px 12px;min-width:140px;box-shadow:0 4px 18px rgba(0,0,0,.35);';
      document.body.appendChild(salTooltipEl);
    }

    function salaryExternalTooltip(context) {
      var tt = context.tooltip;
      if (tt.opacity === 0) { salTooltipEl.style.display = 'none'; return; }
      var isLightNow = document.documentElement.classList.contains('light');
      var bg       = isLightNow ? '#ffffff' : '#0e0b2e';
      var border   = isLightNow ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)';
      var textMain = isLightNow ? '#0e0b2e' : '#ffffff';
      var textMuted= isLightNow ? 'rgba(14,11,46,.5)' : 'rgba(255,255,255,.45)';
      salTooltipEl.style.background = bg;
      salTooltipEl.style.border = '1px solid ' + border;

      var idx = tt.dataPoints && tt.dataPoints[0] ? tt.dataPoints[0].dataIndex : 0;
      var t   = chartTooltips[idx];
      var teamName = t.team || '';
      var logoUrl  = TEAM_LOGOS[teamName] || '';
      var suffix   = t.waived ? ' · Waived' : t.future ? ' · Future' : '';
      var displayVal = '$' + t.amount.toFixed(2) + 'M';

      salTooltipEl.innerHTML =
        '<div style="display:flex;align-items:center;gap:8px;">' +
          (logoUrl ? '<img src="'+logoUrl+'" style="width:24px;height:24px;object-fit:contain;flex-shrink:0;" alt="">' : '') +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-family:var(--font-mono);font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:'+textMuted+';">'+t.season+'</div>' +
            '<div style="font-family:var(--font-mono);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:'+textMuted+';margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+teamName+suffix+'</div>' +
          '</div>' +
          '<div style="font-family:var(--font-display);font-weight:400;font-size:1.3rem;color:'+textMain+';line-height:1;flex-shrink:0;padding-left:8px;">'+displayVal+'</div>' +
        '</div>';

      salTooltipEl.style.display = 'block';
      var canv = context.chart.canvas;
      var rect = canv.getBoundingClientRect();
      var x = rect.left + tt.caretX + 14;
      var y = rect.top  + tt.caretY - 20;
      if (x + 200 > window.innerWidth) x = rect.left + tt.caretX - 200 - 14;
      salTooltipEl.style.left = x + 'px';
      salTooltipEl.style.top  = y + 'px';
    }

    activeCharts['salary'] = new Chart(c2d, {
      type:'bar',
      data:{ labels:chartLabels, datasets:[{
        data:chartAmounts,
        backgroundColor:chartBgCols,
        borderColor:chartBdCols,
        borderWidth:2,
        borderRadius:5
      }]},
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{
          legend:{ display:false },
          tooltip:{ enabled:false, external:salaryExternalTooltip }
        },
        scales:{
          x:{ ticks:{ color:textFaint, font:{family:"'Share Tech Mono',monospace",size:8}, maxRotation:45 }, grid:{ color:gridCol } },
          y:{ ticks:{ color:textFaint, font:{family:"'Share Tech Mono',monospace",size:9}, callback:function(v){ return '$'+v+'M'; } }, grid:{ color:gridCol }, beginAtZero:true }
        }
      }
    });

    // Hide tooltip on mouse leave
    ctx.onmouseleave = function() { salTooltipEl.style.display = 'none'; };
  }

  /* ── SHOES PANEL ── */
  /* ── SHOE LIGHTBOX ── */
  var _shoeLightbox = null;
  function openShoeLightbox(imgSrc, name, model) {
    if (!_shoeLightbox) {
      var lb = document.createElement('div');
      lb.className = 'shoe-lightbox';
      lb.innerHTML = '<div class="shoe-lightbox-inner">'
        + '<button class="shoe-lightbox-close">✕ Close</button>'
        + '<img class="shoe-lightbox-img" src="" alt="">'
        + '<div class="shoe-lightbox-label"></div>'
        + '<div class="shoe-lightbox-sub"></div>'
        + '</div>';
      document.body.appendChild(lb);
      lb.querySelector('.shoe-lightbox-close').addEventListener('click', closeShoeLightbox);
      lb.addEventListener('click', function(e){ if (e.target === lb) closeShoeLightbox(); });
      document.addEventListener('keydown', function(e){ if (e.key==='Escape') closeShoeLightbox(); });
      _shoeLightbox = lb;
    }
    _shoeLightbox.querySelector('.shoe-lightbox-img').src = imgSrc;
    _shoeLightbox.querySelector('.shoe-lightbox-label').textContent = name;
    _shoeLightbox.querySelector('.shoe-lightbox-sub').textContent = model;
    requestAnimationFrame(function(){ _shoeLightbox.classList.add('visible'); });
    document.body.style.overflow = 'hidden';
  }
  function closeShoeLightbox() {
    if (_shoeLightbox) _shoeLightbox.classList.remove('visible');
    document.body.style.overflow = '';
  }

  /* ── SHOE SLIDESHOW TIMERS ── */
  var _shoeTimers = {};
  function startSlideshow(cardId, colorways) {
    if (_shoeTimers[cardId]) clearInterval(_shoeTimers[cardId]);
    var slides = document.querySelectorAll('#'+cardId+' .shoe-slide');
    var dots   = document.querySelectorAll('#'+cardId+' .shoe-dot');
    if (!slides.length) return;
    var cur = 0;
    _shoeTimers[cardId] = setInterval(function() {
      slides[cur].classList.remove('active');
      dots[cur] && dots[cur].classList.remove('active');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('active');
      dots[cur] && dots[cur].classList.add('active');
    }, 3000);
  }

  function renderShoes(key) {
    var panel = document.getElementById('panel-shoes');
    if (!panel) return;
    // Clear old timers
    Object.keys(_shoeTimers).forEach(function(k){ clearInterval(_shoeTimers[k]); delete _shoeTimers[k]; });

    var shoesData = (PLAYER_STATS[key]||{}).shoes;
    if (!shoesData || !shoesData.sigs || !shoesData.sigs.length) {
      panel.innerHTML = '<div class="panel-placeholder"><div class="panel-placeholder-icon">👟</div><div class="panel-placeholder-title">Shoes</div><p class="panel-placeholder-sub">No signature shoe data for this player.</p></div>';
      return;
    }
    var brand = shoesData.brand || '';

    var cardsHtml = shoesData.sigs.map(function(sig, idx) {
      var cardId = 'shoe-card-'+key+'-'+idx;

      // Slideshow slides (one per colorway)
      var slides = sig.colorways.map(function(cw, ci) {
        return '<div class="shoe-slide'+(ci===0?' active':'')+'">'          + '<img src="'+cw.img+'" alt="'+cw.name+'" loading="lazy">'          + '</div>';
      }).join('');

      // Slide dots
      var dots = sig.colorways.map(function(cw, ci) {
        return '<div class="shoe-dot'+(ci===0?' active':'')+'"></div>';
      }).join('');

      // Colorway rows
      var cwRows = sig.colorways.map(function(cw) {
        return '<div class="shoe-cw-row" data-img="'+cw.img+'" data-name="'+cw.name+'" data-model="'+sig.name+' · '+brand+'">'          + '<div class="shoe-cw-thumb"><img src="'+cw.img+'" alt="'+cw.name+'" loading="lazy"></div>'          + '<div>'            + '<div class="shoe-cw-name">'+cw.name+'</div>'            + '<div class="shoe-cw-model">'+sig.name+' · '+brand+'</div>'            + '<div class="shoe-cw-view">Click to view →</div>'          + '</div>'          + '</div>';
      }).join('');

      return '<div class="shoe-card" id="'+cardId+'">'        + '<div class="shoe-card-main" data-shoe-idx="'+idx+'" data-player-key="'+key+'">'          + '<div class="shoe-card-img">'            + slides            + '<div class="shoe-slide-dots">'+dots+'</div>'          + '</div>'          + '<div class="shoe-card-info">'            + '<div>'              + '<div class="shoe-card-sig-label">Signature Model</div>'              + '<div class="shoe-card-name">'+sig.name+'</div>'              + '<div class="shoe-card-brand-badge">'+brand+'</div>'            + '</div>'            + '<div class="shoe-card-toggle">'              + '<span>'+sig.colorways.length+' Colorways</span>'              + '<span class="shoe-toggle-arrow">▾</span>'            + '</div>'          + '</div>'        + '</div>'        + '<div class="shoe-colorways"><div class="shoe-colorways-list">'+cwRows+'</div></div>'        + '</div>';
    }).join('');

    panel.innerHTML = '<div class="shoes-layout">'      + '<div>'        + ''        + '<div class="shoes-heading" style="display:none;"></div>'      + '</div>'      + cardsHtml      + '</div>';

    // Wire toggle clicks (only toggle area, not whole card)
    panel.querySelectorAll('.shoe-card-main').forEach(function(main) {
      main.addEventListener('click', function() {
        var idx = main.dataset.shoeIdx;
        var pk  = main.dataset.playerKey;
        var card = document.getElementById('shoe-card-'+pk+'-'+idx);
        if (card) card.classList.toggle('is-open');
      });
    });

    // Wire colorway row clicks → lightbox
    panel.querySelectorAll('.shoe-cw-row').forEach(function(row) {
      row.addEventListener('click', function(e) {
        e.stopPropagation();
        openShoeLightbox(row.dataset.img, row.dataset.name, row.dataset.model);
      });
    });

    // Start slideshows
    shoesData.sigs.forEach(function(sig, idx) {
      var cardId = 'shoe-card-'+key+'-'+idx;
      if (sig.colorways.length > 1) startSlideshow(cardId, sig.colorways);
    });
  }
  /* ── BIO JERSEYS ── */
  function makeBioJerseySVG(number, col, titleText) {
    var fs = String(number).length > 1 ? 18 : 22;
    return '<svg viewBox="0 0 42 52" class="bio-jersey" role="img">'
      + '<rect fill="' + col.bg + '" height="52" width="42" y="0" x="0" rx="1"/>'
      + '<ellipse class="bio-jersey-sleeve" stroke-width="2" stroke="' + col.stroke + '" ry="18" rx="7" cy="5" cx="0"/>'
      + '<ellipse class="bio-jersey-sleeve" stroke-width="2" stroke="' + col.stroke + '" ry="18" rx="7" cy="5" cx="42"/>'
      + '<ellipse class="bio-jersey-sleeve" stroke-width="2" stroke="' + col.stroke + '" ry="7" rx="7" cy="0" cx="21"/>'
      + '<text x="50%" y="39" fill="' + col.num + '" font-family="Arial,sans-serif" font-size="' + fs + '" text-anchor="middle" dominant-baseline="middle">' + number + '</text>'
      + '</svg>';
  }

  function renderBioJerseys(key) {
    var el   = document.getElementById('bio-jerseys-section');
    var card = document.getElementById('bio-jerseys-card');
    if (!el) return;

    var jerseyData = (PLAYER_STATS[key]||{}).jerseys || [];
    var defaultNum = ((PLAYERS[key]||{}).number||'0').replace('#','');
    var COLLEGE    = ['AU','KU','LOU','FSU','DUKE','UCLA','FCB','MA','BU','IU','TU'];
    var html = '';

    function makeWrap(jerseyHtml, j) {
      return '<div class="jersey-wrap">' + jerseyHtml + '</div>';
    }

    if (jerseyData.length) {
      jerseyData.forEach(function(j) {
        var num = j.number || defaultNum;
        // Use per-entry colors if provided, else fall back to nothing (white bg jersey)
        var col = {
          bg:     j.bg     || '#333333',
          stroke: j.stroke || '#888888',
          num:    j.num    || '#ffffff'
        };
        var jerseyHtml;
        if (j.img) {
          jerseyHtml = '<img src="' + j.img + '" alt="' + j.name + '" class="bio-jersey bio-jersey-img">';
        } else {
          jerseyHtml = makeBioJerseySVG(num, col, j.name);
        }
        html += makeWrap(jerseyHtml, j);
      });
    } else {
      // Fallback: one SVG per unique pro team from regular season
      var seen = {};
      ((PLAYER_STATS[key]||{}).regular||[]).forEach(function(r) {
        if (COLLEGE.indexOf(r.team) === -1 && !seen[r.team]) {
          seen[r.team] = true;
          var col = { bg:'#333', stroke:'#888', num:'#fff' };
          var fakeJ = { team:r.team, name:'', number:defaultNum };
          html += makeWrap(makeBioJerseySVG(defaultNum, col, r.team), fakeJ);
        }
      });
    }

    el.innerHTML = html;
    if (card) card.style.display = html ? '' : 'none';

    // Wire hover lift
    el.querySelectorAll('.bio-jersey').forEach(function(el2) {
      el2.style.cssText = 'width:60px;height:auto;cursor:pointer;display:block;transition:transform .2s;';
      el2.addEventListener('mouseenter', function() { el2.style.transform = 'translateY(-5px) scale(1.1)'; });
      el2.addEventListener('mouseleave', function() { el2.style.transform = ''; });
    });
  }

  /* ── PERFORMANCES LOG ──
     One season is in view at a time; the log has no other view state.
     (The parked card renderer further down also referenced gamesMode,
     gamesSort, gamesPage and PERF_PER_PAGE — restore those alongside it.) */
  var gamesSeason = '';

  /* ── Game Score formula ── */
  function calcGameScore(g) {
    return g.pts + (0.4*g.fgm) - (0.7*g.fga) - (0.4*(g.fta - g.ftm))
           + (0.5*g.reb) + g.stl + (0.7*g.ast) + (0.7*g.blk) - g.tov;
  }

  /* ── F. Lastname ── */
  function abbrevName(fullName) {
    var parts = (fullName||'').trim().split(/\s+/);
    if (parts.length < 2) return fullName.toUpperCase();
    return (parts[0].charAt(0) + '. ' + parts.slice(1).join(' ')).toUpperCase();
  }

  /* ── Derive team abbreviation from PLAYER_STATS for a given season ──
     Looks in the rows for the requested type first, then falls back to the
     'regular' rows. The fallback matters for postseason games in a sim that
     only tracks a regular-season row for the year (e.g. the 2K26 college
     seasons, where the March Madness games are logged as playoffs but the
     player's school only appears in `regular`). Without it those cards
     would render with no team name, logo, or colors. */
  function teamForSeason(key, season, type) {
    var abbr = teamFromRows((PLAYER_STATS[key]||{})[type||'regular'], season);
    if (!abbr && type && type !== 'regular') {
      abbr = teamFromRows((PLAYER_STATS[key]||{}).regular, season);
    }
    return abbr;
  }

  /* Exact season match if there is one, else the nearest earlier season */
  function teamFromRows(rows, season) {
    rows = rows || [];
    for (var i=0; i<rows.length; i++) {
      if (rows[i].season === season) return rows[i].team || '';
    }
    var best = null;
    rows.forEach(function(r){
      if (r.season <= season) best = r.team;
    });
    return best || '';
  }

  /* ── Game date ──
     Games carry an optional ISO `date` ('2012-03-15'). Rendered as
     'MAR 15, 2012' in the card's top row; games without one simply omit it.
     Parsed field-by-field rather than with new Date(str), which reads a
     bare ISO date as UTC midnight and can land on the previous day for
     viewers west of Greenwich. */
  var MONTH_ABBR = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  function fmtGameDate(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(d||'').trim());
    if (!m) return '';
    var mon = parseInt(m[2], 10);
    if (mon < 1 || mon > 12) return '';
    return MONTH_ABBR[mon-1] + ' ' + parseInt(m[3], 10) + ', ' + m[1];
  }

  /* Sortable number for a date, or null when absent/malformed */
  function dateSortKey(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(d||'').trim());
    return m ? (parseInt(m[1],10)*10000 + parseInt(m[2],10)*100 + parseInt(m[3],10)) : null;
  }

  /* ── Card label — what sits next to the player's name ──
     A game's own `round` wins ('Sweet Sixteen', 'National Championship',
     'Conference Finals' — any string). Otherwise playoff games fall back to
     'Game One'-style numbering and everything else reads 'Regular Season'. */
  var NUM_WORDS = ['One','Two','Three','Four','Five','Six','Seven'];
  function gameLabel(g) {
    if (g.round) return String(g.round);
    if (g.type === 'playoffs') {
      return g.game ? 'Game ' + (NUM_WORDS[parseInt(g.game,10)-1] || g.game) : 'Playoffs';
    }
    return 'Regular Season';
  }

  /* ── Pick the 3 best highlight stats for a game ──
     Default: PTS · REB · AST (always in that order if shown).
     Override 3rd (AST) with a special stat if any threshold is met.
     Override 2nd (REB) if REB ≤ 2 and something better fits.
     Override 2nd (AST) if AST ≤ 2 and REB is also ≤ 2 and something better fits.
  */
  function pickDisplayStats(g) {

    // ── Check for override-worthy special stats ──
    var special = null; // { lbl, display }

    // 6+ 3PM
    if (g.tpm >= 6) {
      special = { lbl:'3PM', display: String(g.tpm) };
    }
    // 5+ STL
    if (!special && g.stl >= 5) {
      special = { lbl:'STL', display: String(g.stl) };
    }
    // 5+ BLK
    if (!special && g.blk >= 5) {
      special = { lbl:'BLK', display: String(g.blk) };
    }
    // FG% ≥ 70% on 8+ attempts
    if (!special && g.fga >= 8 && (g.fgm / g.fga) >= 0.70) {
      special = { lbl:'FG%', display: Math.round(g.fgm / g.fga * 100) + '%' };
    }
    // 3P% ≥ 60% on 5+ attempts
    if (!special && g.tpa >= 5 && (g.tpm / g.tpa) >= 0.60) {
      special = { lbl:'3P%', display: Math.round(g.tpm / g.tpa * 100) + '%' };
    }

    var pts = { lbl:'PTS', display: String(g.pts) };
    var reb = { lbl:'REB', display: String(g.reb) };
    var ast = { lbl:'AST', display: String(g.ast) };

    // ── Decide 2nd slot ──
    // If REB is very low (≤2), prefer AST in the 2nd slot
    var second = (g.reb <= 2 && g.ast > g.reb) ? ast : reb;

    // ── Decide 3rd slot ──
    var third;
    if (special) {
      // Special stat overrides the 3rd slot
      third = special;
    } else if (second.lbl === 'REB') {
      // Normal case: 3rd is AST
      third = ast;
    } else {
      // 2nd is AST (low REB case): 3rd tries REB, but if REB ≤ 2 use STL/BLK/fallback
      if (g.reb > 2) {
        third = reb;
      } else if (g.stl >= 2) {
        third = { lbl:'STL', display: String(g.stl) };
      } else if (g.blk >= 2) {
        third = { lbl:'BLK', display: String(g.blk) };
      } else {
        third = reb; // show it even if low, better than nothing
      }
    }

    return [pts, second, third];
  }

  /* ── BUILD SERIES-GROUPED LIST ──────────────────────────────────
     Called when a specific season is selected with latest/oldest sort.
     Groups playoff games by opponent (= series), shows a header with
     series result and a footer with series averages.
     Regular season games in the same view appear under a simple header.
  ─────────────────────────────────────────────────────────────── */
  /* ══════════════════════════════════════════════════════════════
     GAME LOG TABLES

     The Logs tab is a table of every game, styled like the Stats tab's
     splits tables. One season is shown at a time, split into a Regular
     Season table and a postseason table ('March Madness' for a college
     season, 'Playoffs' otherwise). Rows run oldest to latest; clicking a
     column header re-sorts, same as on the Stats tab.

     The game-card layout that used to live here is preserved, commented
     out, under "PARKED: GAME CARD RENDERER" further down.
     ══════════════════════════════════════════════════════════════ */

  /* Columns, in display order.
       cls 'log-lbl' — an identity column (mono label type, left aligned)
                       rather than a figure. Marked explicitly rather than by
                       position, because the range modal drops these five and
                       a positional rule would then restyle MIN/PTS/REB/AST.
       grp 'fg'      — made/attempted counts, hidden by the Field Goal Data
                       setting. The percentages are deliberately not in the
                       group, so turning it off narrows the table without
                       losing shooting efficiency. */
  var LOG_COLS = [
    { lbl:'DATE', cls:'log-lbl' },  { lbl:'TEAM', cls:'log-lbl' },
    { lbl:'OPP',  cls:'log-lbl' },  { lbl:'H/A',  cls:'log-lbl' },
    { lbl:'RESULT', cls:'log-lbl' },
    { lbl:'MIN' },   { lbl:'PTS' },   { lbl:'REB' },   { lbl:'AST' },
    { lbl:'STL' },   { lbl:'BLK' },   { lbl:'TO' },
    { lbl:'FG',  grp:'fg' }, { lbl:'FGA', grp:'fg' }, { lbl:'FG%' },
    { lbl:'3P',  grp:'fg' }, { lbl:'3PA', grp:'fg' }, { lbl:'3P%' },
    { lbl:'FT',  grp:'fg' }, { lbl:'FTA', grp:'fg' }, { lbl:'FT%' },
    { lbl:'TS%' },   { lbl:'HOOP' },
  ];

  function colClass(c) {
    return ((c.cls || '') + (c.grp === 'fg' ? ' col-fg' : '')).trim();
  }
  function clsAttr(c) {
    var v = colClass(c);
    return v ? ' class="' + v + '"' : '';
  }

  /* ── LOG SETTINGS ──
     Persisted so the choice survives navigation, like the theme and sim. */
  var LOG_SETTINGS_KEY = 'ege-log-settings';
  var logSettings = (function(){
    var d = { fgData: true, colorSystem: false };
    try {
      var raw = JSON.parse(localStorage.getItem(LOG_SETTINGS_KEY) || '{}');
      if (typeof raw.fgData === 'boolean') d.fgData = raw.fgData;
      if (typeof raw.colorSystem === 'boolean') d.colorSystem = raw.colorSystem;
    } catch(e) {}
    return d;
  })();
  function saveLogSettings() {
    try { localStorage.setItem(LOG_SETTINGS_KEY, JSON.stringify(logSettings)); } catch(e) {}
  }

  /* ── HOOP SCORE HEAT ──
     Anchors, with a continuous ramp between each pair:
       <=5  bright red    hsl(0,82,46)
        25  bright green  hsl(140,68,40)
        35  blue          hsl(215,80,48)
       >=50 purple        hsl(280,62,48)
     Each segment starts on the previous one's end values, so the ramp has no
     seam at a boundary. Matches the mock draft's filled-cell heatmap: an HSL
     background under white text, and every lightness stays in the 40-48 band
     so white stays legible the whole way up. */
  function hoopHeatStyle(gs) {
    var h, sat, lum;
    if (gs >= 50)      { h = 280; sat = 62; lum = 48; }                // purple
    else if (gs >= 35) { var a = (gs - 35) / 15;                       // blue → purple
                         h = 215 + a * 65; sat = 80 - a * 18; lum = 48; }
    else if (gs >= 25) { var b = (gs - 25) / 10;                       // green → blue
                         h = 140 + b * 75; sat = 68 + b * 12; lum = 40 + b * 8; }
    else if (gs > 5)   { var c = (gs - 5) / 20;                        // red → green
                         h = c * 140; sat = 82 - c * 14; lum = 46 - c * 6; }
    else               { h = 0;   sat = 82; lum = 46; }                // bright red
    return 'background:hsl(' + h.toFixed(0) + ',' + sat.toFixed(0) + '%,' + lum.toFixed(0) + '%)!important;color:#fff!important;';
  }

  /* Hoop cell, tinted when the Color System setting is on. `perGame` guards
     the range modal's Totals row, where a summed score would always peg the
     top of the scale.
     The tint carries !important because the averages rows are .career-row,
     whose own `background: var(--bg-card) !important` would otherwise win
     over an inline style and leave those cells untinted. */
  function hoopCell(gs, perGame) {
    var txt = (gs < 0 ? '−' : '') + Math.abs(gs).toFixed(1);
    if (!logSettings.colorSystem || perGame === false) {
      return '<td class="log-hoop">' + txt + '</td>';
    }
    return '<td class="log-hoop" style="' + hoopHeatStyle(gs) + '">' + txt + '</td>';
  }

  function pctOrDash(made, att) {
    return att > 0 ? (made / att * 100).toFixed(1) + '%' : '—';
  }

  /* True Shooting — PTS / (2 * (FGA + 0.44 * FTA)) */
  function tsPctOf(g) {
    var denom = g.fga + 0.44 * g.fta;
    return denom > 0 ? (g.pts / (2 * denom) * 100).toFixed(1) + '%' : '—';
  }

  /* One <tr> for one game. `idx` is the game's position in the table's own
     games array, so a selected range can map rows back to game objects. */
  function logRow(key, g, idx) {
    var teamAbbr = teamForSeason(key, g.season, g.type || 'regular');
    var isWin    = (g.result || '').toUpperCase() === 'W';
    var gs       = calcGameScore(g);
    var gsText   = (gs < 0 ? '−' : '') + Math.abs(gs).toFixed(1);

    // Date sorts on its numeric key so 'MAR 15, 2012' doesn't sort as text
    var dKey  = dateSortKey(g.date);
    var dCell = '<td class="log-lbl"' + (dKey !== null ? ' data-sort-val="' + dKey + '"' : '') + '>'
      + (fmtGameDate(g.date) || '—') + '</td>';

    var resultCell = '<td class="log-lbl" data-sort-val="' + (isWin ? 1 : 0) + '">'
      + '<span class="log-res ' + (isWin ? 'log-res--w' : 'log-res--l') + '">'
      + (isWin ? 'W' : 'L') + '</span> '
      + '<span class="log-score">' + (g.score || '—') + '</span></td>';

    return '<tr class="log-row" data-gi="' + idx + '">'
      + dCell
      + '<td class="log-lbl">' + (teamAbbr || '—') + '</td>'
      + '<td class="log-lbl">' + (g.opp || '—') + '</td>'
      + '<td class="log-lbl">' + (g.home ? 'HOME' : 'AWAY') + '</td>'
      + resultCell
      + '<td>' + g.min + '</td>'
      + '<td class="hi">' + g.pts + '</td>'
      + '<td>' + g.reb + '</td>'
      + '<td>' + g.ast + '</td>'
      + '<td>' + g.stl + '</td>'
      + '<td>' + g.blk + '</td>'
      + '<td>' + g.tov + '</td>'
      + '<td class="col-fg">' + g.fgm + '</td>'
      + '<td class="col-fg">' + g.fga + '</td>'
      + '<td>' + pctOrDash(g.fgm, g.fga) + '</td>'
      + '<td class="col-fg">' + g.tpm + '</td>'
      + '<td class="col-fg">' + g.tpa + '</td>'
      + '<td>' + pctOrDash(g.tpm, g.tpa) + '</td>'
      + '<td class="col-fg">' + g.ftm + '</td>'
      + '<td class="col-fg">' + g.fta + '</td>'
      + '<td>' + pctOrDash(g.ftm, g.fta) + '</td>'
      + '<td>' + tsPctOf(g) + '</td>'
      + hoopCell(gs, true)
      + '</tr>';
  }

  /* Totals/averages footer row for one table */
  function logTotalsRow(games) {
    var n = games.length;
    if (!n) return '';
    var t = { pts:0, reb:0, ast:0, stl:0, blk:0, tov:0,
              fgm:0, fga:0, tpm:0, tpa:0, ftm:0, fta:0, min:0, gs:0 };
    games.forEach(function(g){
      ['pts','reb','ast','stl','blk','tov','fgm','fga','tpm','tpa','ftm','fta','min'].forEach(function(f){
        t[f] += (g[f] || 0);
      });
      t.gs += calcGameScore(g);
    });
    function avg(v){ return (Math.round(v / n * 10) / 10).toFixed(1); }
    var tsDenom = t.fga + 0.44 * t.fta;

    return '<tr class="career-row" data-career="1">'
      + '<td class="log-lbl">' + n + ' GP</td>'
      + '<td class="log-lbl"></td><td class="log-lbl"></td>'
      + '<td class="log-lbl"></td><td class="log-lbl"></td>'
      + '<td>' + avg(t.min) + '</td>'
      + '<td class="hi">' + avg(t.pts) + '</td>'
      + '<td>' + avg(t.reb) + '</td>'
      + '<td>' + avg(t.ast) + '</td>'
      + '<td>' + avg(t.stl) + '</td>'
      + '<td>' + avg(t.blk) + '</td>'
      + '<td>' + avg(t.tov) + '</td>'
      + '<td class="col-fg">' + avg(t.fgm) + '</td>'
      + '<td class="col-fg">' + avg(t.fga) + '</td>'
      + '<td>' + pctOrDash(t.fgm, t.fga) + '</td>'
      + '<td class="col-fg">' + avg(t.tpm) + '</td>'
      + '<td class="col-fg">' + avg(t.tpa) + '</td>'
      + '<td>' + pctOrDash(t.tpm, t.tpa) + '</td>'
      + '<td class="col-fg">' + avg(t.ftm) + '</td>'
      + '<td class="col-fg">' + avg(t.fta) + '</td>'
      + '<td>' + pctOrDash(t.ftm, t.fta) + '</td>'
      + '<td>' + (tsDenom > 0 ? (t.pts / (2 * tsDenom) * 100).toFixed(1) + '%' : '—') + '</td>'
      + hoopCell(t.gs / n, true)
      + '</tr>';
  }

  /* One titled table card. Returns '' when the season has no games of this type. */
  function logTableCard(key, games, title, tableId) {
    if (!games.length) return '';
    var thead = '<thead><tr>';
    LOG_COLS.forEach(function(c){
      thead += '<th' + clsAttr(c) + ' data-col="' + c.lbl + '">' + c.lbl + '<span class="sort-arrow"></span></th>';
    });
    thead += '</tr></thead>';

    var tbody = '<tbody>';
    games.forEach(function(g, i){ tbody += logRow(key, g, i); });
    tbody += logTotalsRow(games);
    tbody += '</tbody>';

    return '<div class="splits-card">'
      + '<div class="splits-card-header">'
      + '<div class="splits-card-dot"></div>'
      + '<span class="splits-card-title">' + title + '</span>'
      + '<span class="log-card-count">' + games.length + (games.length === 1 ? ' game' : ' games') + '</span>'
      + '</div>'
      + '<div class="splits-scroll">'
      + '<table class="splits-table log-table' + (logSettings.fgData ? '' : ' log-hide-fg')
      + '" id="' + tableId + '">' + thead + tbody + '</table>'
      + '</div>'
      + '</div>';
  }

  /* Postseason heading depends on whether the season was played in college */
  function postseasonTitle(key, season) {
    var abbr = teamForSeason(key, season, 'playoffs') || teamForSeason(key, season, 'regular');
    return COLLEGE_TEAMS.indexOf((abbr || '').toUpperCase()) !== -1 ? 'March Madness' : 'Playoffs';
  }

  function renderPerformancesTable(key, games) {
    var panel = document.getElementById('panel-performances');
    if (!panel) return;

    // Seasons that have any games, newest first
    var seasonSet = {};
    games.forEach(function(g){ seasonSet[g.season] = true; });
    var seasons = Object.keys(seasonSet).sort().reverse();

    if (!seasons.length) {
      panel.innerHTML = '<div class="perf-empty"><div class="perf-empty-icon">📋</div>'
        + '<div class="perf-empty-title">No Performances Logged</div>'
        + '<div class="perf-empty-sub">Add performance data to player-games.js to populate this log</div>'
        + '</div>';
      return;
    }

    // Keep the selected season valid (it can be stale after switching players)
    if (seasons.indexOf(gamesSeason) === -1) gamesSeason = seasons[0];

    // ── Controls: season arrows + season select, nothing else ──
    var curIdx   = seasons.indexOf(gamesSeason);
    var canPrev  = curIdx < seasons.length - 1;  // newest-first, so "prev" = older = higher index
    var canNext  = curIdx > 0;

    // Three zones: empty | season nav (centered) | settings gear (right)
    var html = '<div class="perf-controls">'
      + '<div class="perf-controls-side"></div>'
      + '<div class="perf-year-nav">'
      + '<button class="perf-year-arrow" id="perf-year-prev"' + (canPrev ? '' : ' disabled') + ' title="Previous season">&#8592;</button>'
      + '<select class="chart-select" id="perf-season-select">';
    seasons.forEach(function(s){
      html += '<option value="' + s + '"' + (gamesSeason === s ? ' selected' : '') + '>' + s + '</option>';
    });
    html += '</select>'
      + '<button class="perf-year-arrow" id="perf-year-next"' + (canNext ? '' : ' disabled') + ' title="Next season">&#8594;</button>'
      + '</div>'
      + '<div class="perf-controls-side perf-controls-side--right">' + logSettingsMenu() + '</div>'
      + '</div>';

    // ── Split the season into regular and postseason, oldest first ──
    var seasonGames = games.filter(function(g){ return g.season === gamesSeason; });
    var ordered     = orderOldestFirst(seasonGames);
    var regular     = ordered.filter(function(g){ return g.type !== 'playoffs'; });
    var post        = ordered.filter(function(g){ return g.type === 'playoffs'; });

    html += logTableCard(key, regular, 'Regular Season', 'log-table-regular');
    html += logTableCard(key, post, postseasonTitle(key, gamesSeason), 'log-table-playoffs');

    panel.innerHTML = html;

    clearRangeSelection();
    [['log-table-regular', regular], ['log-table-playoffs', post]].forEach(function(pair){
      var t = document.getElementById(pair[0]);
      if (!t) return;
      initSort(t);
      wireRangeSelection(t, key, pair[1]);
    });

    wirePerformancesControls(panel, key, games);
  }


  /* ══════════════════════════════════════════════════════════════
     GAME RANGE SELECTION

     Click a row to anchor a range, click a second row to total and average
     every game between them (inclusive) in a centered modal. Clicking the
     anchored row again clears it. Selection lives in one table at a time —
     anchoring in the other table moves the anchor there — since a range
     spanning the regular season and the postseason has no clear meaning.

     The range follows what is on screen, not entry order: rows are read in
     current DOM order, so re-sorting by a column and then picking two rows
     spans the games between them as displayed.
     ══════════════════════════════════════════════════════════════ */

  var logSel = null;  // { tableId, gi } — the anchored row, or null

  function clearRangeSelection() {
    logSel = null;
    document.querySelectorAll('.log-row.is-anchor').forEach(function(r){
      r.classList.remove('is-anchor');
    });
  }

  /* Games between two rows of one table, in the order they are displayed */
  function gamesBetween(table, giA, giB, games) {
    var rows = Array.from(table.tBodies[0].rows).filter(function(r){
      return r.classList.contains('log-row');
    });
    var posA = rows.findIndex(function(r){ return r.dataset.gi === String(giA); });
    var posB = rows.findIndex(function(r){ return r.dataset.gi === String(giB); });
    if (posA === -1 || posB === -1) return [];
    var lo = Math.min(posA, posB), hi = Math.max(posA, posB);
    return rows.slice(lo, hi + 1).map(function(r){ return games[parseInt(r.dataset.gi, 10)]; });
  }

  /* Title reads '{Date} through {Date}' when both ends are dated. Undated
     games (the 2K25 logs) have no date to name, so those fall back to the
     span's size and season. */
  function rangeTitle(span) {
    // Endpoints run earliest → latest whatever order the table is sorted in,
    // so a descending sort doesn't title the span 'MAR 17 through MAR 15'.
    var keys = span.map(function(g){ return dateSortKey(g.date); });
    if (keys.every(function(k){ return k !== null; })) {
      var lo = span[keys.indexOf(Math.min.apply(null, keys))];
      var hi = span[keys.indexOf(Math.max.apply(null, keys))];
      var a = fmtGameDate(lo.date), b = fmtGameDate(hi.date);
      return a === b ? a : a + ' through ' + b;
    }
    return span.length + ' Games · ' + (span[0].season || '');
  }

  function openRangeModal(span) {
    if (!span.length) return;
    var backdrop = document.getElementById('range-modal-backdrop');
    var table    = document.getElementById('range-modal-table');
    if (!backdrop || !table) return;

    var wins = span.filter(function(g){ return (g.result||'').toUpperCase() === 'W'; }).length;

    document.getElementById('range-modal-title').textContent = rangeTitle(span);
    document.getElementById('range-modal-count').textContent =
      span.length + (span.length === 1 ? ' game · ' : ' games · ') + wins + '-' + (span.length - wins);

    // The five identity columns describe a single game, so the summary
    // replaces them with one label column
    var thead = '<thead><tr><th class="log-lbl"></th>';
    LOG_COLS.forEach(function(c){
      if (c.cls === 'log-lbl') return;
      thead += '<th' + clsAttr(c) + '>' + c.lbl + '</th>';
    });
    thead += '</tr></thead>';

    table.className = 'splits-table log-table' + (logSettings.fgData ? '' : ' log-hide-fg');
    table.innerHTML = thead + '<tbody>' + rangeSummaryRows(span) + '</tbody>';
    backdrop.classList.add('open');
    document.body.classList.add('range-modal-open');
  }

  /* TOTALS and AVG rows for the selected span */
  function rangeSummaryRows(span) {
    var n = span.length;
    var t = { pts:0, reb:0, ast:0, stl:0, blk:0, tov:0,
              fgm:0, fga:0, tpm:0, tpa:0, ftm:0, fta:0, min:0, gs:0 };
    span.forEach(function(g){
      ['pts','reb','ast','stl','blk','tov','fgm','fga','tpm','tpa','ftm','fta','min'].forEach(function(f){
        t[f] += (g[f] || 0);
      });
      t.gs += calcGameScore(g);
    });
    var tsDenom = t.fga + 0.44 * t.fta;
    var tsPct   = tsDenom > 0 ? (t.pts / (2 * tsDenom) * 100).toFixed(1) + '%' : '—';

    // Percentages are the span's own made/attempted, identical in both rows
    function row(label, cls, f, perGame) {
      return '<tr class="' + cls + '"><td class="log-lbl">' + label + '</td>'
        + '<td>' + f(t.min) + '</td>'
        + '<td class="hi">' + f(t.pts) + '</td>'
        + '<td>' + f(t.reb) + '</td>'
        + '<td>' + f(t.ast) + '</td>'
        + '<td>' + f(t.stl) + '</td>'
        + '<td>' + f(t.blk) + '</td>'
        + '<td>' + f(t.tov) + '</td>'
        + '<td class="col-fg">' + f(t.fgm) + '</td>'
        + '<td class="col-fg">' + f(t.fga) + '</td>'
        + '<td>' + pctOrDash(t.fgm, t.fga) + '</td>'
        + '<td class="col-fg">' + f(t.tpm) + '</td>'
        + '<td class="col-fg">' + f(t.tpa) + '</td>'
        + '<td>' + pctOrDash(t.tpm, t.tpa) + '</td>'
        + '<td class="col-fg">' + f(t.ftm) + '</td>'
        + '<td class="col-fg">' + f(t.fta) + '</td>'
        + '<td>' + pctOrDash(t.ftm, t.fta) + '</td>'
        + '<td>' + tsPct + '</td>'
        + hoopCell(perGame ? t.gs / n : t.gs, perGame)
        + '</tr>';
    }

    var totals = row('Totals', 'range-row-total', function(v){
      return (Math.round(v * 10) / 10).toFixed(1).replace(/\.0$/, '');
    }, false);
    var avgs = row('Per Game', 'career-row', function(v){
      return (Math.round(v / n * 10) / 10).toFixed(1);
    }, true);
    return totals + avgs;
  }

  function closeRangeModal() {
    var backdrop = document.getElementById('range-modal-backdrop');
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('range-modal-open');
    clearRangeSelection();
  }

  /* Wire row clicks for one rendered table */
  function wireRangeSelection(table, key, games) {
    if (!table) return;
    table.querySelectorAll('tbody tr.log-row').forEach(function(row){
      row.addEventListener('click', function(){
        var gi = parseInt(row.dataset.gi, 10);

        // Same row again — unselect
        if (logSel && logSel.tableId === table.id && logSel.gi === gi) {
          clearRangeSelection();
          return;
        }
        // Second row in the same table — summarize the span between them
        if (logSel && logSel.tableId === table.id) {
          var span = gamesBetween(table, logSel.gi, gi, games);
          clearRangeSelection();
          openRangeModal(span);
          return;
        }
        // Anchor here (moving the anchor if it was in the other table)
        clearRangeSelection();
        logSel = { tableId: table.id, gi: gi };
        row.classList.add('is-anchor');
      });
    });
  }

  /* One-time modal wiring — close button, backdrop click, Escape */
  (function initRangeModal(){
    function ready() {
      var backdrop = document.getElementById('range-modal-backdrop');
      if (!backdrop) return;
      var closeBtn = document.getElementById('range-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', closeRangeModal);
      // Only a click on the backdrop itself counts as "outside the box"
      backdrop.addEventListener('click', function(e){
        if (e.target === backdrop) closeRangeModal();
      });
      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape' && backdrop.classList.contains('open')) closeRangeModal();
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', ready);
    } else {
      ready();
    }
  })();

  /* ── LOG SETTINGS MENU ──
     Gear at the top right of the Logs tab. Both toggles re-render the
     tables, which is also what re-applies them to a freshly opened range
     modal. */
  var LOG_TOGGLES = [
    { id:'fgData', label:'Field Goal Data',
      hint:'Show made and attempted counts. Off keeps FG%, 3P%, FT% and TS%.' },
    { id:'colorSystem', label:'Color System',
      hint:'Shade the Hoop Score by performance — red through green and blue to purple.' },
  ];

  function logSettingsMenu() {
    var html = '<div class="log-settings">'
      + '<button class="log-settings-btn" id="log-settings-btn" title="Log settings" aria-label="Log settings" aria-expanded="false">'
      + '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<circle cx="12" cy="12" r="3"/>'
      + '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.63.71 1.09 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
      + '</svg></button>'
      + '<div class="log-settings-panel" id="log-settings-panel">'
      + '<div class="log-settings-title">// log settings</div>';
    LOG_TOGGLES.forEach(function(t){
      var on = !!logSettings[t.id];
      html += '<button class="log-settings-row' + (on ? ' is-on' : '') + '" data-setting="' + t.id + '" role="switch" aria-checked="' + on + '">'
        + '<span class="log-settings-switch"><span class="log-settings-knob"></span></span>'
        + '<span class="log-settings-text">'
        + '<span class="log-settings-label">' + t.label + '</span>'
        + '<span class="log-settings-hint">' + t.hint + '</span>'
        + '</span></button>';
    });
    html += '</div></div>';
    return html;
  }

  function wireLogSettings(key, games) {
    var btn   = document.getElementById('log-settings-btn');
    var panel = document.getElementById('log-settings-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.classList.toggle('is-active', open);
    });
    // Keep the panel open while toggling, so several can be flipped at once
    panel.addEventListener('click', function(e){ e.stopPropagation(); });
    document.addEventListener('click', closeLogSettingsPanel);

    panel.querySelectorAll('.log-settings-row').forEach(function(row){
      row.addEventListener('click', function(){
        var id = row.dataset.setting;
        logSettings[id] = !logSettings[id];
        saveLogSettings();
        renderPerformancesTable(key, games);
        // Re-render replaced the panel — reopen it at the same place
        var newPanel = document.getElementById('log-settings-panel');
        var newBtn   = document.getElementById('log-settings-btn');
        if (newPanel) newPanel.classList.add('open');
        if (newBtn) { newBtn.classList.add('is-active'); newBtn.setAttribute('aria-expanded','true'); }
      });
    });
  }

  function closeLogSettingsPanel() {
    var panel = document.getElementById('log-settings-panel');
    var btn   = document.getElementById('log-settings-btn');
    if (panel) panel.classList.remove('open');
    if (btn) { btn.classList.remove('is-active'); btn.setAttribute('aria-expanded','false'); }
  }

  /* Oldest first: by date when every game has one, else as entered */
  function orderOldestFirst(list) {
    var out = list.slice();
    var allDated = out.length > 0 && out.every(function(g){ return dateSortKey(g.date) !== null; });
    if (allDated) out.sort(function(a, b){ return dateSortKey(a.date) - dateSortKey(b.date); });
    return out;
  }

  function wirePerformancesControls(panel, key, games) {
    var seasonSet = {};
    games.forEach(function(g){ seasonSet[g.season] = true; });
    var navSeasons = Object.keys(seasonSet).sort().reverse(); // newest first

    function goTo(season) {
      if (!season) return;
      gamesSeason = season;
      renderPerformancesTable(key, games);
    }

    var seasonSel = document.getElementById('perf-season-select');
    if (seasonSel) seasonSel.addEventListener('change', function(){ goTo(this.value); });

    wireLogSettings(key, games);

    var yearPrev = document.getElementById('perf-year-prev');
    var yearNext = document.getElementById('perf-year-next');
    // navSeasons is newest-first: older seasons sit at higher indexes
    if (yearPrev) yearPrev.addEventListener('click', function(){
      goTo(navSeasons[navSeasons.indexOf(gamesSeason) + 1]);
    });
    if (yearNext) yearNext.addEventListener('click', function(){
      var idx = navSeasons.indexOf(gamesSeason);
      if (idx > 0) goTo(navSeasons[idx - 1]);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     PARKED: GAME CARD RENDERER  (+ emoji reaction system)

     The Logs tab used to render each game as a card — circle headshot in
     team colors, the three best stats, hoop score, final score with team
     logos, and an expandable panel of full splits. Cards also carried
     emoji reactions backed by Supabase, with per-user state in
     localStorage under 'ege_reactions'.

     Parked on purpose, not dead code: the table above replaced it as the
     primary view, and this is kept verbatim so the card can come back
     (most likely as a preview panel opened by clicking a table row).

     To revive: uncomment, then call the card builder from
     renderPerformancesTable and re-wire .glc-summary clicks. The card CSS
     (.game-log-card, .glc-*, .perf-page-*) is still live in
     css/players.css, and the shared emoji modal below is still in use.

     ── original source ──

       function renderPerformancesTable(key, games) {
         var panel = document.getElementById('panel-performances');
         if (!panel) return;
         var p = PLAYERS[key];
     
         var filtered = games.filter(function(g){
           if (gamesMode !== 'all' && g.type !== gamesMode) return false;
           if (gamesSeason !== 'all' && g.season !== gamesSeason) return false;
           return true;
         });
     
         // ── Sort ──
         // Chronological sorts use each game's `date` when every game in view has
         // one, so entries can be logged in any order. Where any game is undated
         // (most of the 2K25 logs) the original entry order stands in for
         // chronology, exactly as before dates existed.
         var sorted = filtered.slice();
         var allDated = sorted.length > 0 && sorted.every(function(g){ return dateSortKey(g.date) !== null; });
     
         if (gamesSort === 'best') {
           sorted.sort(function(a, b){ return calcGameScore(b) - calcGameScore(a); });
         } else if (gamesSort === 'worst') {
           sorted.sort(function(a, b){ return calcGameScore(a) - calcGameScore(b); });
         } else if (allDated) {
           sorted.sort(function(a, b){ return dateSortKey(a.date) - dateSortKey(b.date); });
           if (gamesSort !== 'oldest') sorted.reverse(); // 'latest' — newest first
         } else if (gamesSort !== 'oldest') {
           sorted.reverse(); // 'latest' — reverse entry order
         }
         // 'oldest' with no dates keeps as-entered order (first entered = oldest)
     
         // Season options from ALL games (both types) so switching type doesn't reset it
         var seasonSet = {};
         games.forEach(function(g){ seasonSet[g.season] = true; });
         var seasons = Object.keys(seasonSet).sort().reverse();
     
         var html = '';
     
         // Controls row: title on left, dropdowns + toggle on right
         html += '<div class="perf-controls">'
           + '<div></div>'
           + '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">';
     
         // Sort dropdown
         html += '<select class="chart-select" id="perf-sort-select">'
           + '<option value="latest"'  +(gamesSort==='latest' ?' selected':'')+'> Latest</option>'
           + '<option value="oldest"'  +(gamesSort==='oldest' ?' selected':'')+'> Oldest</option>'
           + '<option value="best"'    +(gamesSort==='best'   ?' selected':'')+'> Best</option>'
           + '<option value="worst"'   +(gamesSort==='worst'  ?' selected':'')+'> Worst</option>'
           + '</select>';
     
         // Season dropdown with year arrows
         var curSeasonIdx = gamesSeason === 'all' ? -1 : seasons.indexOf(gamesSeason);
         var canPrev = curSeasonIdx < seasons.length - 1; // seasons is newest-first, so "prev" = higher index
         var canNext = curSeasonIdx > 0 && curSeasonIdx !== -1;
         html += '<div class="perf-year-nav">'
           + '<button class="perf-year-arrow" id="perf-year-prev"'+(canPrev?'':' disabled')+' title="Previous season">&#8592;</button>'
           + '<select class="chart-select" id="perf-season-select">'
           + '<option value="all"'+(gamesSeason==='all'?' selected':'')+'>All Seasons</option>';
         seasons.forEach(function(s){
           html += '<option value="'+s+'"'+(gamesSeason===s?' selected':'')+'>'+s+'</option>';
         });
         html += '</select>'
           + '<button class="perf-year-arrow" id="perf-year-next"'+(canNext?'':' disabled')+' title="Next season">&#8594;</button>'
           + '</div>';
     
         // Type dropdown
         html += '<select class="chart-select" id="perf-type-select">'
           + '<option value="all"'+(gamesMode==='all'?' selected':'')+'>All Games</option>'
           + '<option value="regular"'+(gamesMode==='regular'?' selected':'')+'>Regular Season</option>'
           + '<option value="playoffs"'+(gamesMode==='playoffs'?' selected':'')+'>Playoffs</option>'
           + '</select>';
     
         html += '</div></div>'; // close right flex + games-controls
     
         if (!sorted.length) {
           html += '<div class="perf-empty"><div class="perf-empty-icon">📋</div>'
             + '<div class="perf-empty-title">No Performances Logged</div>'
             + '<div class="perf-empty-sub">Add performance data to player-games.js to populate this log</div>'
             + '</div>';
           panel.innerHTML = html;
           wirePerformancesControls(panel, key, games);
           return;
         }
     
         // ── Pagination ──
         var totalPages = Math.max(1, Math.ceil(sorted.length / PERF_PER_PAGE));
         if (gamesPage >= totalPages) gamesPage = totalPages - 1;
         var pageStart = gamesPage * PERF_PER_PAGE;
         var pageSlice = sorted.slice(pageStart, pageStart + PERF_PER_PAGE);
     
         html += '<div class="game-log-list">';
         pageSlice.forEach(function(g) {
           // ── Team lookup from season ──
           var teamAbbr = teamForSeason(key, g.season, g.type || 'regular');
           var teamName  = TEAM_ABBR[teamAbbr] || teamAbbr;
           var colors    = TEAM_BANNER_COLORS[teamName] || { primary:'#231aa5', secondary:'var(--orange)' };
           var accent    = colors.primary;
           var logoUrl   = TEAM_LOGOS[teamName] || '';
           var headshot  = PLAYER_HEADSHOTS[key] || '';
     
           // ── Game score — always white ──
           var gs = calcGameScore(g);
           var gsAbs = Math.abs(gs).toFixed(1);
           var gsSign = gs < 0 ? '−' : '';
     
           var ballHtml = '<img class="glc-ball-icon" src="bballwhite.png" alt="">';
     
           // ── Display stats ──
           var displayStats = pickDisplayStats(g);
     
           var isWin = (g.result||'').toUpperCase() === 'W';
           var haHome = g.home ? 'vs' : '@';
     
           // ── Shooting percentages for detail panel ──
           var fgpStr = g.fga > 0 ? (g.fgm/g.fga*100).toFixed(1)+'%' : '—';
           var tppStr = g.tpa > 0 ? (g.tpm/g.tpa*100).toFixed(1)+'%' : '—';
           var ftpStr = g.fta > 0 ? (g.ftm/g.fta*100).toFixed(1)+'%' : '—';
     
           // ── Card label (round name, series game, or 'Regular Season') and date ──
           var gameTypeLabel = gameLabel(g);
           var gameDateLabel = fmtGameDate(g.date);
     
           // ── Opponent info ──
           var oppTeamName = TEAM_ABBR[g.opp] || g.opp;
           var oppLogoUrl  = TEAM_LOGOS[oppTeamName] || '';
     
           html += '<div class="game-log-card">';
     
           // ── CLICKABLE SUMMARY ROW ──
           html += '<div class="glc-summary">';
     
           // Circle headshot
           html += '<div class="glc-headshot-wrap">';
           html += '<div class="glc-headshot-circle">';
           html += '<div class="glc-headshot-circle-bg" style="background:'+accent+';"></div>';
           if (headshot) {
             html += '<img class="glc-headshot-img" src="'+headshot+'" alt="'+p.name+'">';
           } else {
             html += '<div class="glc-headshot-initials">'+p.initials+'</div>';
           }
           html += '</div>'; // .glc-headshot-circle
           if (logoUrl) {
             html += '<div class="glc-team-logo"><img src="'+logoUrl+'" alt="'+teamName+'"></div>';
           }
           html += '</div>'; // .glc-headshot-wrap
     
           // Main content
           html += '<div class="glc-main">';
     
           // Top row: name · round/game type · date · ball icon + hoop score (top right)
           html += '<div class="glc-top">'
             + '<span class="glc-name">'+abbrevName(p.name)+'</span>'
             + '<span class="glc-dot-sep">·</span>'
             + '<span class="glc-game-type">'+gameTypeLabel+'</span>'
             + (gameDateLabel
                 ? '<span class="glc-dot-sep">·</span><span class="glc-date">'+gameDateLabel+'</span>'
                 : '')
             + '<span class="glc-score-right">'
             + ballHtml
             + '<span class="glc-gamescore">'+gsSign+gsAbs+'</span>'
             + '</span>'
             + '</div>';
     
           // Big 3 stats
           html += '<div class="glc-stats">';
           displayStats.forEach(function(s){
             html += '<div class="glc-stat-block">'
               + '<span class="glc-stat-val">'+s.display+'</span>'
               + '<span class="glc-stat-lbl">'+s.lbl+'</span>'
               + '</div>';
           });
           html += '</div>';
     
           // Bottom row: date · @ vs opp-abbr opp-logo · W/L · Details
           // ── Unique storage key for this game's reactions ──
           // ── Unique storage key for this performance's reactions ──
           var gameReactionKey = 'reactions:' + key + ':' + g.season + ':' + g.type + ':' + g.opp + ':' + (g.game || 'r');
     
           var oppLogoHtml = oppLogoUrl
             ? '<img src="'+oppLogoUrl+'" alt="'+oppTeamName+'">'
             : '';
     
           // ── Final score for bottom row: away logo · score · home logo, winner orange ──
           var finalScoreHtml = '';
           if (g.score && g.score.indexOf('-') !== -1) {
             var fsParts   = g.score.split('-');
             var ourScore  = fsParts[0].trim();
             var theirScore = fsParts[1].trim();
             var awayLogo, homeLogo, awayScore, homeScore, awayWon, homeWon;
             if (g.home) {
               // we are home (right), opp is away (left)
               awayLogo  = oppLogoUrl  ? '<img src="'+oppLogoUrl+'"  alt="'+oppTeamName+'" style="width:18px;height:18px;object-fit:contain;display:block;">' : '';
               homeLogo  = logoUrl     ? '<img src="'+logoUrl+'"     alt="'+teamName+'"    style="width:18px;height:18px;object-fit:contain;display:block;">' : '';
               awayScore = isWin ? theirScore : '<span style="color:var(--orange);font-weight:700;">'+theirScore+'</span>';
               homeScore = isWin ? '<span style="color:var(--orange);font-weight:700;">'+ourScore+'</span>' : ourScore;
             } else {
               // we are away (left), opp is home (right)
               awayLogo  = logoUrl     ? '<img src="'+logoUrl+'"     alt="'+teamName+'"    style="width:18px;height:18px;object-fit:contain;display:block;">' : '';
               homeLogo  = oppLogoUrl  ? '<img src="'+oppLogoUrl+'"  alt="'+oppTeamName+'" style="width:18px;height:18px;object-fit:contain;display:block;">' : '';
               awayScore = isWin ? '<span style="color:var(--orange);font-weight:700;">'+ourScore+'</span>' : ourScore;
               homeScore = isWin ? theirScore : '<span style="color:var(--orange);font-weight:700;">'+theirScore+'</span>';
             }
             finalScoreHtml = awayLogo + '<span class="glc-final-score-text">'+awayScore+'-'+homeScore+'</span>' + homeLogo;
           } else {
             finalScoreHtml = '<span class="glc-final-score-text">'+(g.score||'')+'</span>';
           }
     
           html += '<div class="glc-bottom">'
             + '<div class="glc-bottom-emojis">'
             + '<span class="glc-reactions" data-rkey="'+gameReactionKey+'"></span>'
             + '<button class="glc-reaction-add" data-rkey="'+gameReactionKey+'" title="Add reaction">+</button>'
             + '</div>'
             + '<span class="glc-final-score">'+finalScoreHtml+'</span>'
             + '</div>';
     
           html += '</div>'; // .glc-main
           html += '</div>'; // .glc-summary
     
           // ── EXPANDABLE DETAIL PANEL ──
           // TS% = PTS / (2 * (FGA + 0.44 * FTA))
           var tsPct = (g.fga + 0.44 * g.fta) > 0
             ? (g.pts / (2 * (g.fga + 0.44 * g.fta)) * 100).toFixed(1) + '%'
             : '—';
     
           // Score display: away score on left, home score on right
           // g.home = true means the player's team is home (right side)
           // g.score stored as "ourScore-theirScore"
           var scoreHtml = g.score || '—';
           if (g.score && g.score.indexOf('-') !== -1) {
             var scoreParts = g.score.split('-');
             var ourScore  = scoreParts[0].trim();
             var theirScore = scoreParts[1].trim();
             var ourWon = isWin;
             if (g.home) {
               // home (right): our score on right, opp on left
               scoreHtml = (ourWon ? theirScore : '<span class="win">'+theirScore+'</span>')
                 + '-'
                 + (ourWon ? '<span class="win">'+ourScore+'</span>' : ourScore);
             } else {
               // away (left): our score on left, opp on right
               scoreHtml = (ourWon ? '<span class="win">'+ourScore+'</span>' : ourScore)
                 + '-'
                 + (ourWon ? theirScore : '<span class="win">'+theirScore+'</span>');
             }
           }
     
           // stat helper — no hi class at all
           function detStat(val, lbl) {
             return '<div class="glc-detail-stat">'
               + '<span class="glc-detail-stat-val">'+val+'</span>'
               + '<span class="glc-detail-stat-lbl">'+lbl+'</span>'
               + '</div>';
           }
     
           html += '<div class="glc-detail"><div class="glc-detail-inner">';
     
           // Header: Final Stats left · season right
           html += '<div class="glc-detail-header">';
           html += '<span class="glc-detail-title">Final Stats</span>';
           html += '<span style="font-family:var(--font-mono);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);opacity:.7;">'+(g.season||'')+'</span>';
           html += '</div>'; // close header
     
           // All stats on one flex-wrap row
           html += '<div class="glc-detail-stat-row">';
           html += detStat(g.min,            'MIN');
           html += detStat(g.pts,            'PTS');
           html += detStat(g.reb,            'REB');
           html += detStat(g.ast,            'AST');
           html += detStat(g.stl,            'STL');
           html += detStat(g.blk,            'BLK');
           html += detStat(fgpStr,           'FG%');
           html += detStat(g.fgm+'/'+g.fga, 'FG');
           html += detStat(g.tpm+'/'+g.tpa, '3FG');
           html += detStat(g.ftm+'/'+g.fta, 'FTS');
           html += detStat(g.tov,            'TO');
           html += detStat(tsPct,            'TS%');
           html += detStat(gsSign+gsAbs,     'HOOP SCORE');
           html += '</div>';
     
           html += '</div></div>'; // .glc-detail-inner / .glc-detail
     
           html += '</div>'; // .game-log-card
         }); // end pageSlice.forEach
     
         html += '</div>'; // .game-log-list
     
         // ── Pagination controls ──
         if (totalPages > 1) {
           html += '<div class="perf-pagination" id="perf-pagination">';
           html += '<button class="perf-page-btn" id="perf-prev"' + (gamesPage === 0 ? ' disabled' : '') + '>← Prev</button>';
     
           // Build page number buttons with ellipsis compression
           var pages = [];
           for (var pi = 0; pi < totalPages; pi++) {
             var showBtn = pi === 0 || pi === totalPages - 1 || Math.abs(pi - gamesPage) <= 2;
             if (showBtn) {
               pages.push(pi);
             } else if (pages[pages.length - 1] !== '…') {
               pages.push('…');
             }
           }
           pages.forEach(function(p) {
             if (p === '…') {
               html += '<span class="perf-page-ellipsis">…</span>';
             } else {
               html += '<button class="perf-page-btn' + (p === gamesPage ? ' active' : '') + '" data-page="' + p + '">' + (p + 1) + '</button>';
             }
           });
     
           html += '<button class="perf-page-btn" id="perf-next"' + (gamesPage >= totalPages - 1 ? ' disabled' : '') + '>Next →</button>';
           html += '<span class="perf-page-info">' + (pageStart + 1) + '–' + Math.min(pageStart + PERF_PER_PAGE, sorted.length) + ' of ' + sorted.length + '</span>';
           html += '</div>';
         } // end if totalPages > 1
     
         panel.innerHTML = html;
         wirePerformancesControls(panel, key, games);
       }
     
       function wirePerformancesControls(panel, key, games) {
         // Build sorted season list for arrow navigation (newest-first)
         var seasonSet2 = {};
         games.forEach(function(g){ seasonSet2[g.season] = true; });
         var navSeasons = Object.keys(seasonSet2).sort().reverse(); // newest first
     
         var seasonSel = document.getElementById('perf-season-select');
         if (seasonSel) {
           seasonSel.addEventListener('change', function(){
             gamesSeason = this.value;
             gamesPage = 0;
             renderPerformancesTable(key, games);
           });
         }
     
         // Year arrow wiring
         var yearPrev = document.getElementById('perf-year-prev');
         var yearNext = document.getElementById('perf-year-next');
         if (yearPrev) {
           yearPrev.addEventListener('click', function(){
             // navSeasons is newest-first; "prev" means older = higher index
             var idx = gamesSeason === 'all' ? -1 : navSeasons.indexOf(gamesSeason);
             var nextIdx = idx + 1;
             if (nextIdx < navSeasons.length) {
               gamesSeason = navSeasons[nextIdx];
               gamesPage = 0;
               renderPerformancesTable(key, games);
             }
           });
         }
         if (yearNext) {
           yearNext.addEventListener('click', function(){
             // "next" means newer = lower index
             var idx = gamesSeason === 'all' ? -1 : navSeasons.indexOf(gamesSeason);
             if (idx > 0) {
               gamesSeason = navSeasons[idx - 1];
               gamesPage = 0;
               renderPerformancesTable(key, games);
             }
           });
         }
         var sortSel = document.getElementById('perf-sort-select');
         if (sortSel) {
           sortSel.addEventListener('change', function(){
             gamesSort = this.value;
             gamesPage = 0;
             renderPerformancesTable(key, games);
           });
         }
         var typeSel = document.getElementById('perf-type-select');
         if (typeSel) {
           typeSel.addEventListener('change', function(){
             gamesMode = this.value;
             gamesPage = 0;
             renderPerformancesTable(key, games);
           });
         }
     
         // ── Pagination wiring ──
         var prevBtn = document.getElementById('perf-prev');
         var nextBtn = document.getElementById('perf-next');
         if (prevBtn) {
           prevBtn.addEventListener('click', function(){
             if (gamesPage > 0) { gamesPage--; renderPerformancesTable(key, games); _scrollToPerf(); }
           });
         }
         if (nextBtn) {
           nextBtn.addEventListener('click', function(){
             gamesPage++; renderPerformancesTable(key, games); _scrollToPerf();
           });
         }
         panel.querySelectorAll('.perf-page-btn[data-page]').forEach(function(btn){
           btn.addEventListener('click', function(){
             gamesPage = parseInt(this.dataset.page, 10);
             renderPerformancesTable(key, games);
             _scrollToPerf();
           });
         });
         function _scrollToPerf() {
           var perfPanel = document.getElementById('panel-performances');
           if (perfPanel) perfPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
     
         // Wire card expand/collapse
         panel.querySelectorAll('.glc-summary').forEach(function(summary){
           summary.addEventListener('click', function(e){
             // Don't toggle if clicking inside reaction area
             if (e.target.closest('.glc-reactions') || e.target.closest('.glc-reaction-add')) return;
             var card = summary.closest('.game-log-card');
             if (!card) return;
             var isOpen = card.classList.contains('is-open');
             panel.querySelectorAll('.game-log-card.is-open').forEach(function(c){ c.classList.remove('is-open'); });
             if (!isOpen) card.classList.add('is-open');
           });
         });
     
         // ── REACTION SYSTEM (Supabase + localStorage for per-user tracking) ──
         // localStorage key: 'ege_reactions' → { [rkey]: emoji | null }
         // Stores which emoji THIS user reacted with on each game (one per game).
     
         var SUPABASE_URL      = 'https://wspmprjqqhtxekzyensq.supabase.co';
         var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzcG1wcmpxcWh0eGVrenllbnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NjQ3MDMsImV4cCI6MjA5MDI0MDcwM30.UrPDj26pC7P5D6grI6LGCzhC76-U0IYibQAbwycWE-Y';
     
         // ── localStorage helpers ──
         var LS_KEY = 'ege_reactions';
         function lsGet() {
           try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch(e) { return {}; }
         }
         function lsSet(data) {
           try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch(e) {}
         }
         function myReaction(rkey) { return lsGet()[rkey] || null; }
         function setMyReaction(rkey, emoji) {
           var d = lsGet(); d[rkey] = emoji; lsSet(d);
         }
         function clearMyReaction(rkey) {
           var d = lsGet(); delete d[rkey]; lsSet(d);
         }
     
         function sbHeaders() {
           return {
             'apikey':        SUPABASE_ANON_KEY,
             'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
             'Content-Type':  'application/json',
             'Prefer':        'return=representation'
           };
         }
     
         function fetchReactions(rkey) {
           return fetch(
             SUPABASE_URL + '/rest/v1/game_reactions?id=eq.' + encodeURIComponent(rkey) + '&select=counts',
             { headers: sbHeaders() }
           )
           .then(function(r){ return r.json(); })
           .then(function(rows){ return (rows && rows[0] && rows[0].counts) ? rows[0].counts : {}; });
         }
     
         function saveReactions(rkey, counts) {
           return fetch(
             SUPABASE_URL + '/rest/v1/game_reactions',
             {
               method: 'POST',
               headers: Object.assign({}, sbHeaders(), { 'Prefer': 'resolution=merge-duplicates,return=representation' }),
               body: JSON.stringify({ id: rkey, counts: counts })
             }
           ).then(function(r){ return r.json(); });
         }
     
         /* Render reaction pills — highlights the user's own, makes it clickable to remove *\/
         function renderReactionPills(rkey, counts) {
           var container = panel.querySelector('.glc-reactions[data-rkey="'+rkey+'"]');
           if (!container) return;
           var mine = myReaction(rkey);
           var entries = Object.keys(counts).map(function(e){ return { emoji:e, count:counts[e] }; });
           entries.sort(function(a,b){ return b.count - a.count; });
           var top3 = entries.slice(0, 3);
           container.innerHTML = top3.map(function(r){
             var isMine = (r.emoji === mine);
             return '<span class="glc-reaction-pill'+(isMine?' mine':'')+'" data-rkey="'+rkey+'" data-emoji="'+r.emoji+'" title="'+(isMine?'Remove your reaction':'Add this reaction')+'" style="cursor:pointer;">'
               + r.emoji
               + '<span class="glc-reaction-count">'+r.count+'</span>'
               + (isMine ? '<span class="glc-reaction-remove-hint">✕</span>' : '')
               + '</span>';
           }).join('');
     
           // Wire clicks on all pills — mine removes, others add
           container.querySelectorAll('.glc-reaction-pill').forEach(function(pill){
             pill.addEventListener('click', function(e){
               e.stopPropagation();
               if (pill.classList.contains('mine')) {
                 removeReaction(rkey, pill.dataset.emoji);
               } else {
                 submitReaction(rkey, pill.dataset.emoji);
               }
             });
           });
         }
     
         function loadAllReactions() {
           panel.querySelectorAll('.glc-reactions[data-rkey]').forEach(function(container){
             var rkey = container.dataset.rkey;
             fetchReactions(rkey).then(function(counts){
               renderReactionPills(rkey, counts);
             }).catch(function(){});
           });
         }
     
         /* Add a reaction — one per user per game (replaces previous if different) *\/
         function submitReaction(rkey, emoji) {
           if (!emoji || !emoji.trim()) return;
           var trimmed = emoji.trim();
           // Must contain at least one emoji — reject plain text/numbers
           // Emoji regex: covers most emoji ranges including ZWJ sequences
           var hasEmoji = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FEFF}]/u.test(trimmed)
             || /[\u00A9\u00AE\u203C\u2049\u2122\u2139\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA]/u.test(trimmed);
           if (!hasEmoji) return;
           // Strip variation selectors and keep just the base emoji
           trimmed = trimmed.replace(/\uFE0F/g, '').trim();
           if (!trimmed) return;
     
           var prev = myReaction(rkey);
           fetchReactions(rkey).then(function(counts){
             // Remove previous reaction if different emoji
             if (prev && prev !== trimmed && counts[prev]) {
               counts[prev] = Math.max(0, counts[prev] - 1);
               if (counts[prev] === 0) delete counts[prev];
             }
             // Add new — only if not already reacted with same emoji
             if (prev !== trimmed) {
               counts[trimmed] = (counts[trimmed] || 0) + 1;
               setMyReaction(rkey, trimmed);
             }
             return saveReactions(rkey, counts).then(function(){ return counts; });
           }).then(function(counts){
             renderReactionPills(rkey, counts);
           }).catch(function(err){ console.warn('Reaction save failed:', err); });
         }
     
         /* Remove the user's own reaction *\/
         function removeReaction(rkey, emoji) {
           fetchReactions(rkey).then(function(counts){
             if (counts[emoji]) {
               counts[emoji] = Math.max(0, counts[emoji] - 1);
               if (counts[emoji] === 0) delete counts[emoji];
             }
             clearMyReaction(rkey);
             return saveReactions(rkey, counts).then(function(){ return counts; });
           }).then(function(counts){
             renderReactionPills(rkey, counts);
           }).catch(function(err){ console.warn('Reaction remove failed:', err); });
         }
     
         // Wire "+" buttons to open the shared emoji modal
         panel.querySelectorAll('.glc-reaction-add').forEach(function(btn){
           btn.addEventListener('click', function(e){
             e.stopPropagation();
             openEmojiModal(btn.dataset.rkey);
           });
         });
     
         // Listen for confirmed reactions from the shared modal
         if (!panel._emojiReactListenerAttached) {
           panel._emojiReactListenerAttached = true;
           document.addEventListener('ege:react', function(e){
             submitReaction(e.detail.rkey, e.detail.emoji);
           });
         }
     
         // Load reactions on render
         loadAllReactions();
       }

     ══════════════════════════════════════════════════════════════ */


  /* ── SHARED EMOJI MODAL ── */
  document.addEventListener('DOMContentLoaded', function() {
    var backdrop = document.getElementById('emoji-modal-backdrop');
    var input    = document.getElementById('emoji-modal-input');
    var confirm  = document.getElementById('emoji-modal-confirm');
    var cancel   = document.getElementById('emoji-modal-cancel');
    var activeRkey = null;

    function openEmojiModal(rkey) {
      activeRkey = rkey;
      input.value = '';
      input.classList.remove('invalid');
      backdrop.classList.add('open');
      setTimeout(function(){ input.focus(); }, 60);
    }

    function closeModal() {
      backdrop.classList.remove('open');
      activeRkey = null;
    }

    function extractEmoji(str) {
      var m = str.match(/\p{Emoji_Presentation}[\u{FE00}-\u{FE0F}\u{1F3FB}-\u{1F3FF}\u{200D}\p{Emoji_Presentation}]*/u)
             || str.match(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FEFF}\u00A9\u00AE]/u);
      return m ? m[0] : null;
    }

    input.addEventListener('input', function() {
      var emoji = extractEmoji(input.value);
      if (emoji) {
        input.value = emoji;
        input.classList.remove('invalid');
      } else if (input.value.length > 0) {
        input.classList.add('invalid');
      }
    });

    function doConfirm() {
      var emoji = extractEmoji(input.value);
      if (!emoji) {
        input.classList.add('invalid');
        input.focus();
        return;
      }
      if (activeRkey) {
        document.dispatchEvent(new CustomEvent('ege:react', { detail: { rkey: activeRkey, emoji: emoji } }));
      }
      closeModal();
    }

    confirm.addEventListener('click', function(e){ e.stopPropagation(); doConfirm(); });
    cancel.addEventListener('click',  function(e){ e.stopPropagation(); closeModal(); });
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter') { e.stopPropagation(); doConfirm(); }
      if (e.key === 'Escape') { e.stopPropagation(); closeModal(); }
    });
    backdrop.addEventListener('click', function(e){
      if (e.target === backdrop) closeModal();
    });

    window.openEmojiModal = openEmojiModal;
  });

  function renderPerformances(key) {
    var games = (window.PLAYER_GAMES && window.PLAYER_GAMES[key]) || [];

    // Open on the most recent season with games
    var seasonSet = {};
    games.forEach(function(g){ seasonSet[g.season] = true; });
    var allSeasons = Object.keys(seasonSet).sort().reverse();

    gamesSeason = allSeasons[0] || '';
    renderPerformancesTable(key, games);
  }

    /* ── SUBNAV SLIDING INDICATOR ──
       Slides the pill behind whichever tab is active. Measured with
       getBoundingClientRect so it's correct regardless of tab label
       width, hidden tabs (Shoes), or horizontal scroll position. */
  function positionSubnavIndicator() {
    var indicator = document.getElementById('subnav-indicator');
    var active = document.querySelector('.subnav-tab.active');
    // offsetLeft/offsetWidth (relative to .subnav-island, the offsetParent)
    // are layout-coordinate values that don't shift with the island's own
    // horizontal scroll position — unlike getBoundingClientRect, which is
    // viewport-relative and would go stale mid-scroll (e.g. right after a
    // click triggers both this and an animated scrollIntoView).
    if (!indicator || !active || active.offsetParent === null) return;
    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }

    /* ── TAB SWITCH ── */
  function switchTab(tab, key, push) {
    // Fade out current panel briefly before switching
    document.querySelectorAll('.content-panel.active').forEach(function(p){ p.classList.remove('active'); });
    document.querySelectorAll('.subnav-tab').forEach(function(b){ b.classList.toggle('active',b.dataset.tab===tab); });
    positionSubnavIndicator();
    // Keep the active tab visible when the tab row overflows
    var activeTab = document.querySelector('.subnav-tab.active');
    if (activeTab && activeTab.scrollIntoView) {
      try { activeTab.scrollIntoView({ block:'nearest', inline:'center', behavior:'smooth' }); } catch(e) {}
    }
    var ms = document.getElementById('subnav-mobile-select');
    if (ms) ms.value = tab;
    var panel=document.getElementById('panel-'+tab);
    if(panel) panel.classList.add('active');
    if(tab==='shoes'){
      renderShoes(key);
    }
    if(tab==='performances'){
      renderPerformances(key);
    }
    if(tab==='contracts'){
      renderContracts(key);
    }
    if(tab==='traditional-splits'){
      renderPGTable(key, pgMode);
      renderTotalsTable(key);
      initChartControls(key);
      setTimeout(function(){ buildCharts(key); }, 80);
    }
    if(push!==false) history.pushState(null,'','#'+key+'-'+tab);
    // Always scroll to the very top of the page on every tab switch
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── SHOW PROFILE ── */
  function showProfile(key, tab) {
    currentKey=key;
    document.getElementById('player-select-view').style.display='none';
    document.getElementById('player-profile').classList.add('visible');
    pgMode='regular';

    // Show/hide Shoes tab depending on whether player has shoe data
    var hasShoesData = !!(PLAYER_STATS[key] && PLAYER_STATS[key].shoes && (PLAYER_STATS[key].shoes.sigs||[]).length);
    var shoesTabBtn = document.querySelector('.subnav-tab[data-tab="shoes"]');
    if (shoesTabBtn) shoesTabBtn.style.display = hasShoesData ? '' : 'none';
    // Remove/add the mobile <option> from the DOM (style.display doesn't work on iOS Safari)
    var mSel = document.getElementById('subnav-mobile-select');
    if (mSel) {
      var existingOpt = mSel.querySelector('option[value="shoes"]');
      if (hasShoesData && !existingOpt) {
        var newOpt = document.createElement('option');
        newOpt.value = 'shoes';
        newOpt.textContent = 'Shoes';
        mSel.appendChild(newOpt);
      } else if (!hasShoesData && existingOpt) {
        mSel.removeChild(existingOpt);
      }
    }
    if (!hasShoesData && tab === 'shoes') tab = 'bio';

    renderBanner(key);
    renderBio(key);
    renderBioJerseys(key);
    renderContracts(key);
    renderAwards(key);
    switchTab(tab, key, false);
    document.title=PLAYERS[key].name+' · EGE NBA Simulation';
    // Scroll to very top of page when opening a player profile
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function showRoster() {
    destroyCharts();
    currentKey=null;
    document.getElementById('player-select-view').style.display='';
    document.getElementById('player-profile').classList.remove('visible');
    var pgGrad = document.getElementById('player-profile-gradient');
    if (pgGrad) pgGrad.style.background = '';
    document.title='Players · EGE NBA Simulation';
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function boot() {
    var initialHash = parseHash(location.hash);
    if (initialHash.player) showProfile(initialHash.player, initialHash.tab);

    // Wire subnav tab clicks
    document.querySelectorAll('.subnav-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (currentKey) switchTab(btn.dataset.tab, currentKey, true);
      });
    });

    // Wire mobile select
    var mobileSelect = document.getElementById('subnav-mobile-select');
    if (mobileSelect) {
      mobileSelect.addEventListener('change', function() {
        if (currentKey) switchTab(mobileSelect.value, currentKey, true);
      });
    }

    // Re-measure the subnav indicator after fonts finish loading and on resize
    // (mobile breakpoint shrinks tab padding/font-size, changing button widths)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(positionSubnavIndicator);
    }
    var subnavResizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(subnavResizeTimer);
      subnavResizeTimer = setTimeout(positionSubnavIndicator, 100);
    });

    // Cards are built by renderRosterGrid() — just wire back button here
    var backBtn = document.getElementById('back-btn');
    if (backBtn) backBtn.addEventListener('click', showRoster);
    window.addEventListener('popstate', function(){
      var popHash = parseHash(location.hash);
      if (popHash.player) {
        showProfile(popHash.player, popHash.tab);
      } else {
        showRoster();
      }
    });
  }

  renderRosterGrid();
  boot();

  // Re-render bio jerseys when dark/light mode toggles (updates sleeve fill)
  var _modeBtn = document.getElementById('mode-toggle');
  if (_modeBtn) {
    _modeBtn.addEventListener('click', function() {
      refreshModeLogos();
      if (currentKey) {
        renderBanner(currentKey);
        renderBioJerseys(currentKey);
      }
    });
  }
  // Also watch for the mobile nav mode toggle
  document.addEventListener('click', function(e) {
    if (e.target && e.target.closest && e.target.closest('#nav-menu-mode-toggle')) {
      setTimeout(function() {
        if (currentKey) {
          renderBanner(currentKey);
          renderBioJerseys(currentKey);
        }
      }, 50);
    }
  });

  }; // end window.__EGE_PLAYERS_BOOT
