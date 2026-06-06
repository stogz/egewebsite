/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION · SIM SWITCHER CONFIG
   sim-config.js — Load this as the VERY FIRST script on every page.

   Defines which simulation is currently active and exposes:
     window.EGE_SIM  →  { id, label, season, subtitle, heroEyebrow,
                          heroLine1, heroLine2, heroLine3,
                          statsFile, playerStatsFile, playerGamesFile,
                          teamStatsFile, leagueHistoryFile,
                          teamInfoFile, logosFolder }

   To add a new sim, add an entry to SIM_REGISTRY below.
   ═══════════════════════════════════════════════════════════════ */

(function () {

  /* ── SIM REGISTRY ─────────────────────────────────────────────
     Each key is the sim ID stored in localStorage.
     Files are loaded dynamically by each page using this config.
  ──────────────────────────────────────────────────────────────── */
  var SIM_REGISTRY = {

    'sim-original': {
      id:               'sim-original',
      label:            '2K25',
      season:           '2026-27',
      subtitle:         'Curry Era Simulation · EGE League',
      heroEyebrow:      'Curry Era Simulation · EGE League',
      heroLine1:        'EGE',
      heroLine2:        'NBA',
      heroLine3:        'Simulation',
      logoFile:         'EGE_Logo.png',
      statsFile:        'stats.js',
      playerStatsFile:  'player-stats.js',
      playerGamesFile:  'player-games.js',
      teamStatsFile:    'team-stats.js',
      leagueHistoryFile:'league-history.js',
      teamInfoFile:     'logos/teaminfo.js',    // 2K25 — original flat teaminfo, no logo-ID system
      logosFolder:      'logos',                 // 2K25 — original logo folder
    },

    'sim-26': {
      id:               'sim-26',
      label:            '2K26',
      season:           '2025-26',
      subtitle:         'Bron Era Simulation · EGE League',
      heroEyebrow:      'Bron Era Simulation · EGE League',
      heroLine1:        'EGE',
      heroLine2:        'SIM',
      heroLine3:        'II',
      logoFile:         'EGE_Logo_blue.png',
      statsFile:        'stats-26.js',
      playerStatsFile:  'player-stats-26.js',
      playerGamesFile:  'player-games-26.js',
      teamStatsFile:    'team-stats-26.js',
      leagueHistoryFile:'league-history-26.js',
      teamInfoFile:     'logos26/teaminfo26.js',  // 2K26 — logo-ID system with season-aware resolver
      logosFolder:      'logos26',              // 2K26 — era-specific logo folder
    },

  };

  /* ── ACTIVE SIM ──────────────────────────────────────────────── */
  var stored = localStorage.getItem('ege-sim');
  var activeSim = (stored && SIM_REGISTRY[stored]) ? stored : 'sim-original';

  /* Expose globally */
  window.EGE_SIM          = SIM_REGISTRY[activeSim];
  window.EGE_SIM_REGISTRY = SIM_REGISTRY;

  /* Apply sim theme to <html> immediately — before any paint */
  document.documentElement.setAttribute('data-sim', activeSim);

  /* Helper — call this to switch sims and reload */
  window.EGE_switchSim = function (id) {
    if (SIM_REGISTRY[id]) {
      localStorage.setItem('ege-sim', id);
      window.location.href = 'index.html';
    }
  };

  /* Helper — cycle to next sim */
  window.EGE_cycleSim = function () {
    var keys = Object.keys(SIM_REGISTRY);
    var idx  = keys.indexOf(window.EGE_SIM.id);
    var next = keys[(idx + 1) % keys.length];
    window.EGE_switchSim(next);
  };

})();
