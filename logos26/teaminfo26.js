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
  atl: {
    abr: 'ATL', name: 'Atlanta Hawks', city: 'Atlanta', mascot: 'Hawks',
    primaryColor: '#c8102e', secondaryColor: '#ffffff',
    logos: [
      { clr: 'ATL.png', wht: 'ATL.png', toYear: 2015,
        primaryColor: '#CB0829', secondaryColor: '#082341' },
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
  bos: {
    abr: 'BOS', name: 'Boston Celtics', city: 'Boston', mascot: 'Celtics',
    primaryColor: '#007d28', secondaryColor: '#ffffff',
    logos: [
      { clr: 'BOS.png', wht: 'BOS.png', toYear: Infinity,
        primaryColor: '#007d28', secondaryColor: '#ffffff' },
    ],
  },
  cho: {
    abr: 'CHO', name: 'Charlotte Bobcats', city: 'Charlotte', mascot: 'Bobcats',
    primaryColor: '#B2B0B4', secondaryColor: '#5991C5',
    logos: [
      { clr: 'CHO.png', wht: 'CHO.png', toYear: Infinity,
        primaryColor: '#B2B0B4', secondaryColor: '#5991C5' },
    ],
  },
  cha: {
    abr: 'CHA', name: 'Charlotte Hornets', city: 'Charlotte', mascot: 'Hornets',
    primaryColor: '#00778c', secondaryColor: '#1f1647',
    logos: [
      { clr: 'CHA.png', wht: 'CHA.png', toYear: Infinity,
        primaryColor: '#00778c', secondaryColor: '#1f1647' },
    ],
  },
  chi: {
    abr: 'CHI', name: 'Chicago Bulls', city: 'Chicago', mascot: 'Bulls',
    primaryColor: '#fa0943', secondaryColor: '#000000',
    logos: [
      { clr: 'CHI.png', wht: 'CHI.png', toYear: Infinity,
        primaryColor: '#fa0943', secondaryColor: '#000000' },
    ],
  },
  cle: {
    abr: 'CLE', name: 'Cleveland Cavaliers', city: 'Cleveland', mascot: 'Cavaliers',
    primaryColor: '#72253d', secondaryColor: '#b4975a',
    logos: [
      { clr: 'CLE.png', wht: 'CLE.png', toYear: 2017,
        primaryColor: '#7A1E3D', secondaryColor: '#FEB708' },
      { clr: 'CLE1.png', wht: 'CLE1.png', toYear: 2022,
        primaryColor: '#781036', secondaryColor: '#EAA631' },
      { clr: 'CLE2.png', wht: 'CLE2.png', toYear: Infinity,
        primaryColor: '#72253d', secondaryColor: '#b4975a' },
    ],
  },
  dal: {
    abr: 'DAL', name: 'Dallas Mavericks', city: 'Dallas', mascot: 'Mavericks',
    primaryColor: '#0064b5', secondaryColor: '#b9c5cc',
    logos: [
      { clr: 'DAL.png', wht: 'DAL.png', toYear: Infinity,
        primaryColor: '#0064b5', secondaryColor: '#b9c5cc' },
    ],
  },
  den: {
    abr: 'DEN', name: 'Denver Nuggets', city: 'Denver', mascot: 'Nuggets',
    primaryColor: '#0d213e', secondaryColor: '#ffc627',
    logos: [
      { clr: 'DEN.png', wht: 'DEN.png', toYear: 2018,
        primaryColor: '#4A90CD', secondaryColor: '#F9B72B' },
      { clr: 'DEN1.png', wht: 'DEN1.png', toYear: Infinity,
        primaryColor: '#0d213e', secondaryColor: '#ffc627' },
    ],
  },
  det: {
    abr: 'DET', name: 'Detroit Pistons', city: 'Detroit', mascot: 'Pistons',
    primaryColor: '#c8102e', secondaryColor: '#1d4289',
    logos: [
      { clr: 'DET.png', wht: 'DET.png', toYear: 2017,
        primaryColor: '#D50132', secondaryColor: '#174DAC' },
      { clr: 'DET1.png', wht: 'DET1.png', toYear: Infinity,
        primaryColor: '#c8102e', secondaryColor: '#1d4289' },
    ],
  },
  gsw: {
    abr: 'GSW', name: 'Golden State Warriors', city: 'Golden State', mascot: 'Warriors',
    primaryColor: '#1d428a', secondaryColor: '#fdb927',
    logos: [
      { clr: 'GSW.png', wht: 'GSW.png', toYear: 2019,
        primaryColor: '#0566B0', secondaryColor: '#F7C537' },
      { clr: 'GSW1.png', wht: 'GSW1.png', toYear: Infinity,
        primaryColor: '#1d428a', secondaryColor: '#fdb927' },
    ],
  },
  hou: {
    abr: 'HOU', name: 'Houston Rockets', city: 'Houston', mascot: 'Rockets',
    primaryColor: '#ce1141', secondaryColor: '#ffffff',
    logos: [
      { clr: 'HOU_color.png', wht: 'HOU_white.png', toYear: Infinity,
        primaryColor: '#ce1141', secondaryColor: '#ffffff' },
    ],
  },
  ind: {
    abr: 'IND', name: 'Indiana Pacers', city: 'Indiana', mascot: 'Pacers',
    primaryColor: '#002d62', secondaryColor: '#fdba31',
    logos: [
      { clr: 'IND.png', wht: 'IND.png', toYear: Infinity,
        primaryColor: '#002d62', secondaryColor: '#fdba31' },
    ],
  },
  lac: {
    abr: 'LAC', name: 'Los Angeles Clippers', city: 'Los Angeles', mascot: 'Clippers',
    primaryColor: '#12173f', secondaryColor: '#ffffff',
    logos: [
      { clr: 'LAC.png', wht: 'LAC.png', toYear: 2015,
        primaryColor: '#003CAB', secondaryColor: '#ffffff' },
      { clr: 'LAC1.png', wht: 'LAC1.png', toYear: 2024,
        primaryColor: '#0146AF', secondaryColor: '#ffffff' },
      { clr: 'LAC2.png', wht: 'LAC2.png', toYear: Infinity,
        primaryColor: '#12173f', secondaryColor: '#ffffff' },
    ],
  },
  lal: {
    abr: 'LAL', name: 'Los Angeles Lakers', city: 'Los Angeles', mascot: 'Lakers',
    primaryColor: '#330072', secondaryColor: '#ffc72c',
    logos: [
      { clr: 'LAL.png', wht: 'LAL.png', toYear: Infinity,
        primaryColor: '#330072', secondaryColor: '#ffc72c' },
    ],
  },
  mem: {
    abr: 'MEM', name: 'Memphis Grizzlies', city: 'Memphis', mascot: 'Grizzlies',
    primaryColor: '#7d9bc1', secondaryColor: '#0c2340',
    logos: [
      { clr: 'MEM.png', wht: 'MEM.png', toYear: Infinity,
        primaryColor: '#7d9bc1', secondaryColor: '#0c2340' },
    ],
  },
  mia: {
    abr: 'MIA', name: 'Miami Heat', city: 'Miami', mascot: 'Heat',
    primaryColor: '#b3002b', secondaryColor: '#ffa200',
    logos: [
      { clr: 'MIA.png', wht: 'MIA.png', toYear: Infinity,
        primaryColor: '#b3002b', secondaryColor: '#ffa200' },
    ],
  },
  mil: {
    abr: 'MIL', name: 'Milwaukee Bucks', city: 'Milwaukee', mascot: 'Bucks',
    primaryColor: '#195331', secondaryColor: '#e1cb9f',
    logos: [
      { clr: 'MIL.png', wht: 'MIL.png', toYear: 2015,
        primaryColor: '#1A5432', secondaryColor: '#B80128' },
      { clr: 'MIL1.png', wht: 'MIL1.png', toYear: Infinity,
        primaryColor: '#195331', secondaryColor: '#e1cb9f' },
    ],
  },
  min: {
    abr: 'MIN', name: 'Minnesota Timberwolves', city: 'Minnesota', mascot: 'Timberwolves',
    primaryColor: '#002b5b', secondaryColor: '#7ac243',
    logos: [
      { clr: 'MIN.png', wht: 'MIN.png', toYear: 2017,
        primaryColor: '#005084', secondaryColor: '#A6A9AC' },
      { clr: 'MIN1.png', wht: 'MIN1.png', toYear: Infinity,
        primaryColor: '#002b5b', secondaryColor: '#7ac243' },
    ],
  },
  noh: {
    abr: 'NOH', name: 'New Orleans Hornets', city: 'New Orleans', mascot: 'Hornets',
    primaryColor: '#061e3e', secondaryColor: '#ba985a',
    logos: [
      { clr: 'NOH.png', wht: 'NOH.png', toYear: Infinity,
        primaryColor: '#068BC2', secondaryColor: '#F8B827' },
    ],
  },
  nop: {
    abr: 'NOP', name: 'New Orleans Pelicans', city: 'New Orleans', mascot: 'Pelicans',
    primaryColor: '#061e3e', secondaryColor: '#ba985a',
    logos: [
      { clr: 'NOP.png', wht: 'NOP.png', toYear: Infinity,
        primaryColor: '#061e3e', secondaryColor: '#ba985a' },
    ],
  },
  nyk: {
    abr: 'NYK', name: 'New York Knicks', city: 'New York', mascot: 'Knicks',
    primaryColor: '#ff6720', secondaryColor: '#003da5',
    logos: [
      { clr: 'NYK.png', wht: 'NYK.png', toYear: Infinity,
        primaryColor: '#ff6720', secondaryColor: '#003da5' },
    ],
  },
  okc: {
    abr: 'OKC', name: 'Oklahoma City Thunder', city: 'Oklahoma City', mascot: 'Thunder',
    primaryColor: '#007dc3', secondaryColor: '#ef3b24',
    logos: [
      { clr: 'OKC.png', wht: 'OKC.png', toYear: Infinity,
        primaryColor: '#007dc3', secondaryColor: '#ef3b24' },
    ],
  },
  orl: {
    abr: 'ORL', name: 'Orlando Magic', city: 'Orlando', mascot: 'Magic',
    primaryColor: '#1f55a6', secondaryColor: '#000000',
    logos: [
      { clr: 'ORL.png', wht: 'ORL.png', toYear: 2025,
        primaryColor: '#007DC6', secondaryColor: '#081821' },
      { clr: 'ORL1.png', wht: 'ORL1.png', toYear: Infinity,
        primaryColor: '#1f55a6', secondaryColor: '#000000' },
    ],
  },
  phi: {
    abr: 'PHI', name: 'Philadelphia 76ers', city: 'Philadelphia', mascot: '76ers',
    primaryColor: '#19449c', secondaryColor: '#de1e34',
    logos: [
      { clr: 'PHI_color.png', wht: 'PHI_white.png', toYear: Infinity,
        primaryColor: '#19449c', secondaryColor: '#de1e34' },
    ],
  },
  phx: {
    abr: 'PHX', name: 'Phoenix Suns', city: 'Phoenix', mascot: 'Suns',
    primaryColor: '#e56020', secondaryColor: '#F9A01C',
    logos: [
      { clr: 'PHX.png', wht: 'PHX.png', toYear: Infinity,
        primaryColor: '#e56020', secondaryColor: '#F9A01C' },
    ],
  },
  por: {
    abr: 'POR', name: 'Portland Trail Blazers', city: 'Portland', mascot: 'Trail Blazers',
    primaryColor: '#ff373c', secondaryColor: '#000000',
    logos: [
      { clr: 'POR.png', wht: 'POR.png', toYear: 2017,
        primaryColor: '#E13A3E', secondaryColor: '#061921' },
      { clr: 'POR1.png', wht: 'POR1.png', toYear: Infinity,
        primaryColor: '#ff373c', secondaryColor: '#000000' },
    ],
  },
  sac: {
    abr: 'SAC', name: 'Sacramento Kings', city: 'Sacramento', mascot: 'Kings',
    primaryColor: '#5b2b82', secondaryColor: '#5c6670',
    logos: [
      { clr: 'SAC.png', wht: 'SAC.png', toYear: 2016,
        primaryColor: '#6845A8', secondaryColor: '#8C8D8D' },
      { clr: 'SAC1.png', wht: 'SAC1.png', toYear: Infinity,
        primaryColor: '#5b2b82', secondaryColor: '#5c6670' },
    ],
  },
  sas: {
    abr: 'SAS', name: 'San Antonio Spurs', city: 'San Antonio', mascot: 'Spurs',
    primaryColor: '#c6cdd3', secondaryColor: '#000000',
    logos: [
      { clr: 'SAS.png', wht: 'SAS.png', toYear: Infinity,
        primaryColor: '#c6cdd3', secondaryColor: '#000000' },
    ],
  },
  tor: {
    abr: 'TOR', name: 'Toronto Raptors', city: 'Toronto', mascot: 'Raptors',
    primaryColor: '#be0f34', secondaryColor: '#000000',
    logos: [
      { clr: 'TOR.png', wht: 'TOR.png', toYear: 2015,
        primaryColor: '#BA0D2F', secondaryColor: '#000000' },
      { clr: 'TOR1.png', wht: 'TOR1.png', toYear: 2020,
        primaryColor: '#be0f34', secondaryColor: '#8C8D8E' },
      { clr: 'TOR_color.png', wht: 'TOR_white.png', toYear: Infinity,
        primaryColor: '#be0f34', secondaryColor: '#000000' },
    ],
  },
  uta: {
    abr: 'UTA', name: 'Utah Jazz', city: 'Utah', mascot: 'Jazz',
    primaryColor: '#4e008e', secondaryColor: '#ffffff',
    logos: [
      { clr: 'UTA.png', wht: 'UTA.png', toYear: 2016,
        primaryColor: '#002144', secondaryColor: '#264F37' },
      { clr: 'UTA1.png', wht: 'UTA1.png', toYear: 2022,
        primaryColor: '#0C2240', secondaryColor: '#2B5234' },
      { clr: 'UTA2.png', wht: 'UTA2.png', toYear: 2024,
        primaryColor: '#FCE022', secondaryColor: '#000000' },
      { clr: 'UTA_color.png', wht: 'UTA_white.png', toYear: Infinity,
        primaryColor: '#4e008e', secondaryColor: '#ffffff' },
    ],
  },
  was: {
    abr: 'WAS', name: 'Washington Wizards', city: 'Washington', mascot: 'Wizards',
    primaryColor: '#002144', secondaryColor: '#cc092f',
    logos: [
      { clr: 'WAS.png', wht: 'WAS.png', toYear: 2011,
        primaryColor: '#246394', secondaryColor: '#8A6D4C' },
      { clr: 'WAS1.png', wht: 'WAS1.png', toYear: 2015,
        primaryColor: '#E41735', secondaryColor: '#042A5C' },
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
