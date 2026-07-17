/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION 2K26 · PLAYER STATS DATA  (player-stats-26.js)

   Same five players as 2K25.
   info{}   → player bio shown on the profile Bio tab
   retired  → true | false  (controls active count and profile badge)
   team     → active team abbreviation (college abbr here; works the
              same as an NBA abbr for banner logo, colors, roster chip)
═══════════════════════════════════════════════════════════════ */

window.PLAYER_STATS = {

  /* ─────────────── COOPER CLARK ─────────────── */
  clark: {
    info: {
      height:    '6\'5\"',
      weight:    '???',
      age:       '—',
      college:   'Louisville',
      draftYear: '???',
      draftPick: '???',
      nickname:  '"Clutch Clark", "Cswag"',
    },
    retired:  false,
    team:     'LOU',   // active team — college abbr (matches TEAM_ABBR / logos/LOU.png)
    jerseys:  [
        { team:'Louisville Cardinals', name:'Home',  number:'5', bg:'#ff0000', stroke:'#050505', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── PAXON HATCH ─────────────── */
  hatch: {
    info: {
      height:    '7\'0\"',
      weight:    '???',
      age:       '—',
      college:   'Texas',
      draftYear: '???',
      draftPick: '???',
      nickname:  '"Pax"',
    },
    retired:  false,
    team:     'TU',   // active team — college abbr (matches TEAM_ABBR / logos/TU.png)
    jerseys:  [
        { team:'Texas Longhorns', name:'Home',  number:'10', bg:'#cd6600', stroke:'#ffffff', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── SAM STOGSDILL ─────────────── */
  stogsdill: {
    info: {
      height:    '6\'9\"',
      weight:    '???',
      age:       '—',
      college:   'Butler',
      draftYear: '???',
      draftPick: '???',
      nickname:  '"Uncle Sam"',
    },
    retired:  false,
    team:     'BU',   // active team — college abbr (matches TEAM_ABBR / logos/BU.png)
    jerseys:  [
        { team:'Butler Bulldogs', name:'Home',  number:'1', bg:'#0000ff', stroke:'#ffffff', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── JAYKEB STEWART ─────────────── */
  stewart: {
    info: {
      height:    '6\'7\"',
      weight:    '???',
      age:       '—',
      college:   'Marquette',
      draftYear: '???',
      draftPick: '???',
      nickname:  '—',
    },
    retired:  false,
    team:     'MA',   // active team — college abbr (matches TEAM_ABBR / logos/MA.png)
    jerseys:  [
        { team:'Marquette Golden Eagles', name:'Home',  number:'2', bg:'#0000ff', stroke:'#ffd700', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── ISAAC VITEL ─────────────── */
  vitel: {
    info: {
      height:    '6\'3\"',
      weight:    '???',
      age:       '—',
      college:   'Indiana',
      draftYear: '???',
      draftPick: '???',
      nickname:  '"V8"',
    },
    retired:  false,
    team:     'IU',   // active team — college abbr (matches TEAM_ABBR / logos/IU.png)
    jerseys:  [
        { team:'Indiana Hoosiers', name:'Home',  number:'8', bg:'#dc143c', stroke:'#ffffff', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [],
    playoffs: [],
    totals:   [],
  },

};
