/* ═══════════════════════════════════════════
   HOME PAGE LOGIC (index.html)

   Loads player-stats.js for the current sim, then:
     1. Fills in the hero eyebrow/title with the sim's label
     2. Computes today's stat leaders and scrolls them in the ticker
     3. Fills in the "active players / seasons / games" counters
        (shared.js animates the actual count-up once they scroll
        into view — see .counter / data-target in shared.js)
═══════════════════════════════════════════ */
(function () {
  var sim = window.EGE_SIM || { playerStatsFile: 'player-stats.js' };

  function loadScript(src, onLoad) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onLoad;
    document.head.appendChild(s);
  }

  /* Seasons played at a college count toward a player's amateur career,
     not their pro stats — excluded from every leader/total below. */
  var COLLEGE_TEAMS = [
    'AU', 'KU', 'LOU', 'FSU', 'DUKE', 'UCLA',
    'Arizona Wildcats', 'Duke Blue Devils', 'Florida State Seminoles',
    'Kansas Jayhawks', 'Louisville Cardinals',
  ];
  function isProSeason(row) {
    var team = (row.team || '').toUpperCase();
    return COLLEGE_TEAMS.indexOf(team) === -1
        && COLLEGE_TEAMS.indexOf(row.team || '') === -1
        && !row.dnq && row.gp > 0;
  }

  function formatStat(value, statKey) {
    var num = parseFloat(String(value || '').replace('%', ''));
    if (isNaN(num)) return null;
    var isPercent = statKey === 'tpp' || statKey === 'fgp';
    return isPercent ? num.toFixed(1) + '%' : num.toFixed(1);
  }

  /* Career average for one stat, weighted by games played per season
     (so a great 10-game season doesn't outweigh a full 70-game one). */
  function careerAverage(playerKey, statKey) {
    var seasons = (PLAYER_STATS[playerKey].regular || []).filter(isProSeason);
    var totalGames = 0, weightedSum = 0;
    seasons.forEach(function (row) {
      var value = parseFloat(String(row[statKey] || '').replace('%', ''));
      if (!isNaN(value) && row.gp > 0) {
        weightedSum += value * row.gp;
        totalGames += row.gp;
      }
    });
    return totalGames > 0 ? weightedSum / totalGames : null;
  }

  var STAT_LEADER_DEFS = [
    { key: 'ppg', label: 'PPG Leader' },
    { key: 'rpg', label: 'RPG Leader' },
    { key: 'apg', label: 'APG Leader' },
    { key: 'spg', label: 'SPG Leader' },
    { key: 'bpg', label: 'BPG Leader' },
    { key: 'tpp', label: '3P% Leader' },
    { key: 'fgp', label: 'FG% Leader' },
  ];

  /* Builds the "PPG Leader · Name · 12.3" ticker lines. Two modes:
     - Normal: each active player's most recent season is compared.
     - All-retired sims: falls back to career averages across everyone,
       since there's no "current season" to compare. */
  function buildTickerItems(allKeys, activeKeys, latestStatsByPlayer, latestSeason, allRetired) {
    var items = [];

    if (allRetired) {
      // activeKeys is empty by definition here, so career leaders are
      // computed across every player, not just "active" ones.
      STAT_LEADER_DEFS.forEach(function (def) {
        var bestPlayer = null, bestValue = -Infinity;
        allKeys.forEach(function (key) {
          var avg = careerAverage(key, def.key);
          if (avg !== null && avg > bestValue) { bestValue = avg; bestPlayer = key; }
        });
        if (bestPlayer) {
          var display = formatStat(bestValue, def.key);
          if (display) items.push('Career ' + def.label + ' · ' + playerDisplayName(bestPlayer) + ' · ' + display);
        }
      });
      items.push('All Players Retired · ' + sim.label);
    } else {
      STAT_LEADER_DEFS.forEach(function (def) {
        var bestPlayer = null, bestValue = -Infinity;
        activeKeys.forEach(function (key) {
          var row = latestStatsByPlayer[key];
          if (!row) return;
          var value = parseFloat(String(row[def.key] || '').replace('%', ''));
          if (!isNaN(value) && value > bestValue) { bestValue = value; bestPlayer = key; }
        });
        if (bestPlayer) {
          var display = formatStat(latestStatsByPlayer[bestPlayer][def.key], def.key);
          if (display) items.push(def.label + ' · ' + playerDisplayName(bestPlayer) + ' · ' + display);
        }
      });
      items.push('Season · ' + latestSeason.replace('-', '–'));
    }

    items.push(sim.label + ' · ' + sim.subtitle);
    return items;
  }

  var DEFAULT_PLAYER_NAMES = {
    clark: 'Cooper Clark', hatch: 'Paxon Hatch', stogsdill: 'Sam Stogsdill',
    stewart: 'Jaykeb Stewart', vitel: 'Isaac Vitel',
  };
  function playerDisplayName(key) {
    var names = window.EGE_SIM2_PLAYER_NAMES || DEFAULT_PLAYER_NAMES;
    return names[key] || key;
  }

  /* Ticker + stats-strip counters both read from PLAYER_STATS, so they
     only make sense once that file has loaded. */
  function renderTickerAndStrip() {
    if (typeof PLAYER_STATS === 'undefined') return;

    var allKeys = Object.keys(PLAYER_STATS);
    var activeKeys = allKeys.filter(function (key) { return !PLAYER_STATS[key].retired; });
    var allRetired = allKeys.every(function (key) { return PLAYER_STATS[key].retired; });

    // Each active player's most recent pro season (used for "current" leaders)
    var latestSeason = '';
    activeKeys.forEach(function (key) {
      var seasons = (PLAYER_STATS[key].regular || []).filter(isProSeason);
      if (seasons.length) {
        var season = seasons[seasons.length - 1].season;
        if (season > latestSeason) latestSeason = season;
      }
    });
    var latestStatsByPlayer = {};
    activeKeys.forEach(function (key) {
      var seasons = (PLAYER_STATS[key].regular || []).filter(isProSeason);
      latestStatsByPlayer[key] = seasons.find(function (row) { return row.season === latestSeason; })
                              || seasons[seasons.length - 1] || null;
    });

    var ticker = document.getElementById('index-ticker');
    if (ticker) {
      var items = buildTickerItems(allKeys, activeKeys, latestStatsByPlayer, latestSeason, allRetired);
      // Duplicated so the CSS animation (translateX -50%) loops seamlessly
      ticker.innerHTML = items.concat(items)
        .map(function (text) { return '<span class="ticker-item">' + text + '</span>'; })
        .join('');
    }

    var activePlayersEl = document.getElementById('strip-players');
    if (activePlayersEl) activePlayersEl.dataset.target = activeKeys.length;

    var seasonsPlayed = new Set();
    allKeys.forEach(function (key) {
      (PLAYER_STATS[key].regular || []).filter(isProSeason).forEach(function (row) { seasonsPlayed.add(row.season); });
    });
    var seasonsEl = document.getElementById('strip-seasons');
    if (seasonsEl) seasonsEl.dataset.target = seasonsPlayed.size;

    var totalGames = 0;
    allKeys.forEach(function (key) {
      ['regular', 'playoffs'].forEach(function (mode) {
        ((PLAYER_STATS[key] || {})[mode] || []).filter(isProSeason).forEach(function (row) {
          totalGames += row.gp || 0;
        });
      });
    });
    var gamesEl = document.getElementById('strip-games');
    if (gamesEl) gamesEl.dataset.target = totalGames;
  }

  function initPage() {
    var eyebrow = document.getElementById('hero-eyebrow');
    if (eyebrow && sim.heroEyebrow) eyebrow.textContent = sim.heroEyebrow;
    var simLabel = document.getElementById('hero-sim-label');
    if (simLabel) simLabel.textContent = sim.label;

    renderTickerAndStrip();
  }

  // shared.js is already loaded (static <script> tag above this one)
  loadScript(sim.playerStatsFile, initPage);
})();
