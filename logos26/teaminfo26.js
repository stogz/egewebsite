/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION · TEAM INFO — 2K26 SIM ONLY
   logos26/teaminfo26.js

   Used exclusively by the 2K26 simulation.
   The 2K25 simulation uses logos/teaminfo.js unchanged.

   ── LOGO & COLOR ERA SYSTEM ─────────────────────────────────────
   Each team's `logos` array lists eras in order, oldest first.
   Every entry has:

     {
       clr:            string  — color logo filename (in logos26/)
       wht:            string  — white logo filename (in logos26/)
       primaryColor:   string  — primary hex color for this era
       secondaryColor: string  — secondary hex color for this era
       toYear:         number  — last calendar year this era appears.
                                 Uses the SECOND year of the season:
                                   '2011-12' → 2012
                                   '2025-26' → 2026
                                 toYear: 2012 shows in 2011-12
                                 but NOT in 2012-13.
                                 Use Infinity for the current era.
     }

   primaryColor / secondaryColor can be null to inherit the team's
   top-level defaults defined just above the logos array.

   ── EXAMPLE ─────────────────────────────────────────────────────
   bkn: {
     primaryColor: '#000000', secondaryColor: '#ffffff',
     logos: [
       { clr: 'NJN.png', wht: 'NJN.png', toYear: 2012,
         primaryColor: '#002a5c', secondaryColor: '#ffffff' },
       { clr: 'BKN.png', wht: 'BKN.png', toYear: Infinity,
         primaryColor: '#000000', secondaryColor: '#ffffff' },
     ],
   }
═══════════════════════════════════════════════════════════════ */

teamInfo = {

  /* ─── ATLANTA HAWKS ──────────────────────────────────────────── */
  atl: {
    abr: 'ATL', name: 'Atlanta Hawks', city: 'Atlanta', mascot: 'Hawks',
    primaryColor: '#c8102e', secondaryColor: '#ffffff',
    logos: [
      { clr: 'ATL.png', wht: 'ATL.png', toYear: 2015,
        primaryColor: '#c8102e', secondaryColor: '#ffffff' },
      { clr: 'ATL_color.png', wht: 'ATL_white.png', toYear: Infinity,
        primaryColor: '#c8102e', secondaryColor: '#ffffff' },
    ],
  },

  /* ─── BROOKLYN NETS (formerly New Jersey Nets) ───────────────── */
  njn: {
    abr: 'NJN', name: 'New Jersey Nets', city: 'New Jersey', mascot: 'Nets',
    primaryColor: '#000000', secondaryColor: '#ffffff',
    logos: [
      { clr: 'NJN.png', wht: 'NJN.png', toYear: Infinity,
        primaryColor: '#000000', secondaryColor: '#ffffff' },
    ],
  },

  /* ─── BOSTON CELTICS ─────────────────────────────────────────── */
  bos: {
    abr: 'BOS', name: 'Boston Celtics', city: 'Boston', mascot: 'Celtics',
    primaryColor: '#007d28', secondaryColor: '#ffffff',
    logos: [
      { clr: 'BOS.png', wht: 'BOS.png', toYear: Infinity,
        primaryColor: '#007d28', secondaryColor: '#ffffff' },
    ],
  },

  /* ─── CHARLOTTE BOBCATS ──────────────────────────────────────── */
  cho: {
    abr: 'CHO', name: 'Charlotte Bobcats', city: 'Charlotte', mascot: 'Bobcats',
    primaryColor: '#00778c', secondaryColor: '#1f1647',
    logos: [
      { clr: 'CHO.png', wht: 'CHO.png', toYear: Infinity,
        primaryColor: '#00778c', secondaryColor: '#1f1647' },
    ],
  },

  /* ─── CHARLOTTE HORNETS ──────────────────────────────────────── */
  cha: {
    abr: 'CHA', name: 'Charlotte Hornets', city: 'Charlotte', mascot: 'Hornets',
    primaryColor: '#00778c', secondaryColor: '#1f1647',
    logos: [
      { clr: 'CHA.png', wht: 'CHA.png', toYear: Infinity,
        primaryColor: '#00778c', secondaryColor: '#1f1647' },
    ],
  },

  /* ─── CHICAGO BULLS ──────────────────────────────────────────── */
  chi: {
    abr: 'CHI', name: 'Chicago Bulls', city: 'Chicago', mascot: 'Bulls',
    primaryColor: '#fa0943', secondaryColor: '#000000',
    logos: [
      { clr: 'CHI.png', wht: 'CHI.png', toYear: Infinity,
        primaryColor: '#fa0943', secondaryColor: '#000000' },
    ],
  },

  /* ─── CLEVELAND CAVALIERS ────────────────────────────────────── */
  cle: {
    abr: 'CLE', name: 'Cleveland Cavaliers', city: 'Cleveland', mascot: 'Cavaliers',
    primaryColor: '#72253d', secondaryColor: '#b4975a',
    logos: [
      { clr: 'CLE.png', wht: 'CLE.png', toYear: 2017,
        primaryColor: '#72253d', secondaryColor: '#b4975a' },
      { clr: 'CLE1.png', wht: 'CLE1.png', toYear: 2022,
        primaryColor: '#72253d', secondaryColor: '#b4975a' },
      { clr: 'CLE2.png', wht: 'CLE2.png', toYear: Infinity,
        primaryColor: '#72253d', secondaryColor: '#b4975a' },
    ],
  },

  /* ─── DALLAS MAVERICKS ───────────────────────────────────────── */
  dal: {
    abr: 'DAL', name: 'Dallas Mavericks', city: 'Dallas', mascot: 'Mavericks',
    primaryColor: '#0064b5', secondaryColor: '#b9c5cc',
    logos: [
      { clr: 'DAL.png', wht: 'DAL.png', toYear: Infinity,
        primaryColor: '#0064b5', secondaryColor: '#b9c5cc' },
    ],
  },

  /* ─── DENVER NUGGETS ─────────────────────────────────────────── */
  den: {
    abr: 'DEN', name: 'Denver Nuggets', city: 'Denver', mascot: 'Nuggets',
    primaryColor: '#0d213e', secondaryColor: '#ffc627',
    logos: [
      { clr: 'DEN.png', wht: 'DEN.png', toYear: 2018,
        primaryColor: '#0d213e', secondaryColor: '#ffc627' },
      { clr: 'DEN1.png', wht: 'DEN1.png', toYear: Infinity,
        primaryColor: '#0d213e', secondaryColor: '#ffc627' },
    ],
  },

  /* ─── DETROIT PISTONS ────────────────────────────────────────── */
  det: {
    abr: 'DET', name: 'Detroit Pistons', city: 'Detroit', mascot: 'Pistons',
    primaryColor: '#c8102e', secondaryColor: '#1d4289',
    logos: [
      { clr: 'DET.png', wht: 'DET.png', toYear: 2017,
        primaryColor: '#c8102e', secondaryColor: '#1d4289' },
      { clr: 'DET1.png', wht: 'DET1.png', toYear: Infinity,
        primaryColor: '#c8102e', secondaryColor: '#1d4289' },
    ],
  },

  /* ─── GOLDEN STATE WARRIORS ──────────────────────────────────── */
  gsw: {
    abr: 'GSW', name: 'Golden State Warriors', city: 'Golden State', mascot: 'Warriors',
    primaryColor: '#1d428a', secondaryColor: '#fdb927',
    logos: [
      { clr: 'GSW.png', wht: 'GSW.png', toYear: 2019,
        primaryColor: '#1d428a', secondaryColor: '#fdb927' },
      { clr: 'GSW1.png', wht: 'GSW1.png', toYear: Infinity,
        primaryColor: '#1d428a', secondaryColor: '#fdb927' },
    ],
  },

  /* ─── HOUSTON ROCKETS ────────────────────────────────────────── */
  hou: {
    abr: 'HOU', name: 'Houston Rockets', city: 'Houston', mascot: 'Rockets',
    primaryColor: '#ce1141', secondaryColor: '#ffffff',
    logos: [
      { clr: 'HOU_color.png', wht: 'HOU_white.png', toYear: Infinity,
        primaryColor: '#ce1141', secondaryColor: '#ffffff' },
    ],
  },

  /* ─── INDIANA PACERS ─────────────────────────────────────────── */
  ind: {
    abr: 'IND', name: 'Indiana Pacers', city: 'Indiana', mascot: 'Pacers',
    primaryColor: '#002d62', secondaryColor: '#fdba31',
    logos: [
      { clr: 'IND.png', wht: 'IND.png', toYear: Infinity,
        primaryColor: '#002d62', secondaryColor: '#fdba31' },
    ],
  },

  /* ─── LOS ANGELES CLIPPERS ───────────────────────────────────── */
  lac: {
    abr: 'LAC', name: 'Los Angeles Clippers', city: 'Los Angeles', mascot: 'Clippers',
    primaryColor: '#12173f', secondaryColor: '#ffffff',
    logos: [
      { clr: 'LAC.png', wht: 'LAC.png', toYear: 2015,
        primaryColor: '#12173f', secondaryColor: '#ffffff' },
      { clr: 'LAC1.png', wht: 'LAC1.png', toYear: 2024,
        primaryColor: '#12173f', secondaryColor: '#ffffff' },
      { clr: 'LAC2.png', wht: 'LAC2.png', toYear: Infinity,
        primaryColor: '#12173f', secondaryColor: '#ffffff' },
    ],
  },

  /* ─── LOS ANGELES LAKERS ─────────────────────────────────────── */
  lal: {
    abr: 'LAL', name: 'Los Angeles Lakers', city: 'Los Angeles', mascot: 'Lakers',
    primaryColor: '#330072', secondaryColor: '#ffc72c',
    logos: [
      { clr: 'LAL.png', wht: 'LAL.png', toYear: Infinity,
        primaryColor: '#330072', secondaryColor: '#ffc72c' },
    ],
  },

  /* ─── MEMPHIS GRIZZLIES ──────────────────────────────────────── */
  mem: {
    abr: 'MEM', name: 'Memphis Grizzlies', city: 'Memphis', mascot: 'Grizzlies',
    primaryColor: '#7d9bc1', secondaryColor: '#0c2340',
    logos: [
      { clr: 'MEM.png', wht: 'MEM.png', toYear: Infinity,
        primaryColor: '#7d9bc1', secondaryColor: '#0c2340' },
    ],
  },

  /* ─── MIAMI HEAT ─────────────────────────────────────────────── */
  mia: {
    abr: 'MIA', name: 'Miami Heat', city: 'Miami', mascot: 'Heat',
    primaryColor: '#b3002b', secondaryColor: '#ffa200',
    logos: [
      { clr: 'MIA.png', wht: 'MIA.png', toYear: Infinity,
        primaryColor: '#b3002b', secondaryColor: '#ffa200' },
    ],
  },

  /* ─── MILWAUKEE BUCKS ────────────────────────────────────────── */
  mil: {
    abr: 'MIL', name: 'Milwaukee Bucks', city: 'Milwaukee', mascot: 'Bucks',
    primaryColor: '#195331', secondaryColor: '#e1cb9f',
    logos: [
      { clr: 'MIL.png', wht: 'MIL.png', toYear: 2015,
        primaryColor: '#195331', secondaryColor: '#e1cb9f' },
      { clr: 'MIL1.png', wht: 'MIL1.png', toYear: Infinity,
        primaryColor: '#195331', secondaryColor: '#e1cb9f' },
    ],
  },

  /* ─── MINNESOTA TIMBERWOLVES ─────────────────────────────────── */
  min: {
    abr: 'MIN', name: 'Minnesota Timberwolves', city: 'Minnesota', mascot: 'Timberwolves',
    primaryColor: '#002b5b', secondaryColor: '#7ac243',
    logos: [
      { clr: 'MIN.png', wht: 'MIN.png', toYear: 2017,
        primaryColor: '#002b5b', secondaryColor: '#7ac243' },
      { clr: 'MIN1.png', wht: 'MIN1.png', toYear: Infinity,
        primaryColor: '#002b5b', secondaryColor: '#7ac243' },
    ],
  },

  /* ─── NEW ORLEANS HORNETS ────────────────────────────────────── */
  noh: {
    abr: 'NOH', name: 'New Orleans Hornets', city: 'New Orleans', mascot: 'Hornets',
    primaryColor: '#061e3e', secondaryColor: '#ba985a',
    logos: [
      { clr: 'NOH.png', wht: 'NOH.png', toYear: Infinity,
        primaryColor: '#061e3e', secondaryColor: '#ba985a' },
    ],
  },

  /* ─── NEW ORLEANS PELICANS ───────────────────────────────────── */
  nop: {
    abr: 'NOP', name: 'New Orleans Pelicans', city: 'New Orleans', mascot: 'Pelicans',
    primaryColor: '#061e3e', secondaryColor: '#ba985a',
    logos: [
      { clr: 'NOP.png', wht: 'NOP.png', toYear: Infinity,
        primaryColor: '#061e3e', secondaryColor: '#ba985a' },
    ],
  },

  /* ─── NEW YORK KNICKS ────────────────────────────────────────── */
  nyk: {
    abr: 'NYK', name: 'New York Knicks', city: 'New York', mascot: 'Knicks',
    primaryColor: '#ff6720', secondaryColor: '#003da5',
    logos: [
      { clr: 'NYK.png', wht: 'NYK.png', toYear: Infinity,
        primaryColor: '#ff6720', secondaryColor: '#003da5' },
    ],
  },

  /* ─── OKLAHOMA CITY THUNDER ──────────────────────────────────── */
  okc: {
    abr: 'OKC', name: 'Oklahoma City Thunder', city: 'Oklahoma City', mascot: 'Thunder',
    primaryColor: '#007dc3', secondaryColor: '#ef3b24',
    logos: [
      { clr: 'OKC.png', wht: 'OKC.png', toYear: Infinity,
        primaryColor: '#007dc3', secondaryColor: '#ef3b24' },
    ],
  },

  /* ─── ORLANDO MAGIC ──────────────────────────────────────────── */
  orl: {
    abr: 'ORL', name: 'Orlando Magic', city: 'Orlando', mascot: 'Magic',
    primaryColor: '#1f55a6', secondaryColor: '#000000',
    logos: [
      { clr: 'ORL.png', wht: 'ORL.png', toYear: 2025,
        primaryColor: '#1f55a6', secondaryColor: '#000000' },
      { clr: 'ORL1.png', wht: 'ORL1.png', toYear: Infinity,
        primaryColor: '#1f55a6', secondaryColor: '#000000' },
    ],
  },

  /* ─── PHILADELPHIA 76ERS ─────────────────────────────────────── */
  phi: {
    abr: 'PHI', name: 'Philadelphia 76ers', city: 'Philadelphia', mascot: '76ers',
    primaryColor: '#19449c', secondaryColor: '#de1e34',
    logos: [
      { clr: 'PHI_color.png', wht: 'PHI_white.png', toYear: Infinity,
        primaryColor: '#19449c', secondaryColor: '#de1e34' },
    ],
  },

  /* ─── PHOENIX SUNS ───────────────────────────────────────────── */
  phx: {
    abr: 'PHX', name: 'Phoenix Suns', city: 'Phoenix', mascot: 'Suns',
    primaryColor: '#e56020', secondaryColor: '#e56020',
    logos: [
      { clr: 'PHX.png', wht: 'PHX.png', toYear: Infinity,
        primaryColor: '#e56020', secondaryColor: '#e56020' },
    ],
  },

  /* ─── PORTLAND TRAIL BLAZERS ─────────────────────────────────── */
  por: {
    abr: 'POR', name: 'Portland Trail Blazers', city: 'Portland', mascot: 'Trail Blazers',
    primaryColor: '#ff373c', secondaryColor: '#000000',
    logos: [
      { clr: 'POR.png', wht: 'POR.png', toYear: 2017,
        primaryColor: '#ff373c', secondaryColor: '#000000' },
      { clr: 'POR1.png', wht: 'POR1.png', toYear: Infinity,
        primaryColor: '#ff373c', secondaryColor: '#000000' },
    ],
  },

  /* ─── SACRAMENTO KINGS ───────────────────────────────────────── */
  sac: {
    abr: 'SAC', name: 'Sacramento Kings', city: 'Sacramento', mascot: 'Kings',
    primaryColor: '#5b2b82', secondaryColor: '#5c6670',
    logos: [
      { clr: 'SAC.png', wht: 'SAC.png', toYear: 2016,
        primaryColor: '#5b2b82', secondaryColor: '#5c6670' },
      { clr: 'SAC1.png', wht: 'SAC1.png', toYear: Infinity,
        primaryColor: '#5b2b82', secondaryColor: '#5c6670' },
    ],
  },

  /* ─── SAN ANTONIO SPURS ──────────────────────────────────────── */
  sas: {
    abr: 'SAS', name: 'San Antonio Spurs', city: 'San Antonio', mascot: 'Spurs',
    primaryColor: '#c6cdd3', secondaryColor: '#000000',
    logos: [
      { clr: 'SAS.png', wht: 'SAS.png', toYear: Infinity,
        primaryColor: '#c6cdd3', secondaryColor: '#000000' },
    ],
  },

  /* ─── TORONTO RAPTORS ────────────────────────────────────────── */
  tor: {
    abr: 'TOR', name: 'Toronto Raptors', city: 'Toronto', mascot: 'Raptors',
    primaryColor: '#be0f34', secondaryColor: '#000000',
    logos: [
      { clr: 'TOR.png', wht: 'TOR.png', toYear: 2015,
        primaryColor: '#be0f34', secondaryColor: '#000000' },
      { clr: 'TOR1.png', wht: 'TOR1.png', toYear: 2020,
        primaryColor: '#be0f34', secondaryColor: '#000000' },
      { clr: 'TOR_color.png', wht: 'TOR_white.png', toYear: Infinity,
        primaryColor: '#be0f34', secondaryColor: '#000000' },
    ],
  },

  /* ─── UTAH JAZZ ──────────────────────────────────────────────── */
  uta: {
    abr: 'UTA', name: 'Utah Jazz', city: 'Utah', mascot: 'Jazz',
    primaryColor: '#4e008e', secondaryColor: '#ffffff',
    logos: [
      { clr: 'UTA.png', wht: 'UTA.png', toYear: 2016,
        primaryColor: '#4e008e', secondaryColor: '#ffffff' },
      { clr: 'UTA1.png', wht: 'UTA1.png', toYear: 2022,
        primaryColor: '#4e008e', secondaryColor: '#ffffff' },
      { clr: 'UTA2.png', wht: 'UTA2.png', toYear: 2024,
        primaryColor: '#FCE022', secondaryColor: '#000000' },
      { clr: 'UTA_color.png', wht: 'UTA_white.png', toYear: Infinity,
        primaryColor: '#4e008e', secondaryColor: '#ffffff' },
    ],
  },

  /* ─── WASHINGTON WIZARDS ─────────────────────────────────────── */
  was: {
    abr: 'WAS', name: 'Washington Wizards', city: 'Washington', mascot: 'Wizards',
    primaryColor: '#002144', secondaryColor: '#cc092f',
    logos: [
      { clr: 'WAS.png', wht: 'WAS.png', toYear: 2011,
        primaryColor: '#002144', secondaryColor: '#cc092f' },
      { clr: 'WAS1.png', wht: 'WAS1.png', toYear: 2015,
        primaryColor: '#002144', secondaryColor: '#cc092f' },
      { clr: 'WAS2.png', wht: 'WAS2.png', toYear: Infinity,
        primaryColor: '#002144', secondaryColor: '#cc092f' },
    ],
  },

};

/* ═══════════════════════════════════════════════════════════════
   LOGO & COLOR RESOLVER — season-aware helper
   ═══════════════════════════════════════════════════════════════

   Parses the SECOND year of the season string:
     '2011-12' → 2012,  '2025-26' → 2026

   Picks the first logo era entry whose toYear >= that number.
   Returns teamLogoCLR, teamLogoWHT, primaryColor, secondaryColor
   all resolved for that era.

   Backwards-compat shim sets flat teamLogoCLR/WHT/primaryColor/
   secondaryColor on each teamInfo entry using the last (Infinity)
   era, so existing code that reads these fields directly still works.
═══════════════════════════════════════════════════════════════ */
(function () {

  function parseSecondYear(season) {
    if (typeof season === 'number') return season;
    if (!season) return null;
    var s = String(season).trim();
    var m = s.match(/^(\d{4})-(\d{2,4})$/);
    if (!m) return null;
    var firstYear  = parseInt(m[1], 10);
    var suffix     = m[2];
    var secondYear = suffix.length === 4
      ? parseInt(suffix, 10)
      : Math.floor(firstYear / 100) * 100 + parseInt(suffix, 10);
    return secondYear;
  }

  window.getTeamInfoForSeason = function (teamKey, season) {
    var base = teamInfo[teamKey];
    if (!base) return null;

    var year     = parseSecondYear(season);
    var logoSets = base.logos || [];
    var chosen   = logoSets[logoSets.length - 1]; // fallback: last era

    if (year !== null) {
      for (var i = 0; i < logoSets.length; i++) {
        var to = (logoSets[i].toYear === undefined || logoSets[i].toYear === null)
                 ? Infinity : logoSets[i].toYear;
        if (year <= to) { chosen = logoSets[i]; break; }
      }
    }

    return {
      abr:            base.abr,
      name:           base.name,
      city:           base.city,
      mascot:         base.mascot,
      teamLogoCLR:    chosen ? chosen.clr            : '',
      teamLogoWHT:    chosen ? chosen.wht            : '',
      primaryColor:   (chosen && chosen.primaryColor)   || base.primaryColor,
      secondaryColor: (chosen && chosen.secondaryColor) || base.secondaryColor,
    };
  };

  // Backwards-compat shim: populate flat fields from last (permanent) era
  Object.keys(teamInfo).forEach(function (k) {
    var entry    = teamInfo[k];
    var sets     = entry.logos || [];
    var fallback = sets[sets.length - 1] || {};
    if (!entry.teamLogoCLR)    entry.teamLogoCLR    = fallback.clr            || '';
    if (!entry.teamLogoWHT)    entry.teamLogoWHT    = fallback.wht            || '';
    if (!entry.primaryColor)   entry.primaryColor   = fallback.primaryColor   || '';
    if (!entry.secondaryColor) entry.secondaryColor = fallback.secondaryColor || '';
  });

})();
