/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION 2K26 · PLAYER STATS DATA  (player-stats-26.js)

   Same five players as 2K25.
   info{}   → player bio shown on the profile Bio tab
              info.position (optional) overrides the position shown in
              the player banner for this sim, e.g. a different college
              position than their default NBA position in 2K25
   retired  → true | false  (controls active count and profile badge)
   team     → active team abbreviation (college abbr here; works the
              same as an NBA abbr for banner logo, colors, roster chip)
═══════════════════════════════════════════════════════════════ */

window.PLAYER_STATS = {

  /* ─────────────── COOPER CLARK ─────────────── */
  clark: {
    info: {
      height:    '6\'5\"',
      weight:    '202 lbs',
      age:       '—',
      college:   'Louisville',
      draftYear: '2012',
      draftPick: '???',
      nickname:  '"Clutch Clark", "Cswag"',
      position:  'Shooting Guard',
    },
    retired:  false,
    team:     'LOU',   // active team — college abbr (matches TEAM_ABBR / logos/LOU.png)
    jerseys:  [
        { team:'Louisville Cardinals', name:'Home',  number:'5', bg:'#ff0000', stroke:'#050505', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [
       { season:'2011-12', age:18, team:'LOU',  ppg:19.4, rpg:5.5, apg:2.1,  spg:2.2, bpg:0.8, topg:2.3, fgp:'51.2%', tpp:'20.4%', ftp:'81.3%', tpa:1.4, gs:34, gp:34, mpg:33.8, star:false, dnq:false },
    ],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── PAXON HATCH ─────────────── */
  hatch: {
    info: {
      height:    '7\'0\"',
      weight:    '223 lbs',
      age:       '—',
      college:   'Texas',
      draftYear: '2012',
      draftPick: '???',
      nickname:  '"Pax"',
      position:  'Center',
    },
    retired:  false,
    team:     'TU',   // active team — college abbr (matches TEAM_ABBR / logos/TU.png)
    jerseys:  [
        { team:'Texas Longhorns', name:'Home',  number:'10', bg:'#cd6600', stroke:'#ffffff', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [
       { season:'2011-12', age:18, team:'TU',  ppg:15.6, rpg:9.0, apg:1.4,  spg:0.8, bpg:2.5, topg:1.9, fgp:'54.8%', tpp:'32.7%', ftp:'78.3%', tpa:1.3, gs:33, gp:33, mpg:31.9, star:false, dnq:false },
    ],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── SAM STOGSDILL ─────────────── */
  stogsdill: {
    info: {
      height:    '6\'9\"',
      weight:    '237 lbs',
      age:       '—',
      college:   'Butler',
      draftYear: '2012',
      draftPick: '???',
      nickname:  '"Uncle Sam"',
      position:  'Point Guard',
    },
    retired:  false,
    team:     'BU',   // active team — college abbr (matches TEAM_ABBR / logos/BU.png)
    jerseys:  [
        { team:'Butler Bulldogs', name:'Home',  number:'1', bg:'#0000ff', stroke:'#ffffff', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [
       { season:'2011-12', age:18, team:'BU',  ppg:19.6, rpg:8.1, apg:6.2,  spg:1.6, bpg:1.3, topg:3.0, fgp:'54.0%', tpp:'19.2%', ftp:'78.5%', tpa:0.2, gs:33, gp:33, mpg:35.0, star:false, dnq:false },
    ],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── JAYKEB STEWART ─────────────── */
  stewart: {
    info: {
      height:    '6\'7\"',
      weight:    '214 lbs',
      age:       '—',
      college:   'Marquette',
      draftYear: '2012',
      draftPick: '???',
      nickname:  '—',
      position:  'Small Forward',
    },
    retired:  false,
    team:     'MA',   // active team — college abbr (matches TEAM_ABBR / logos/MA.png)
    jerseys:  [
        { team:'Marquette Golden Eagles', name:'Home',  number:'2', bg:'#0000ff', stroke:'#ffd700', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [
       { season:'2011-12', age:18, team:'MA',  ppg:11.5, rpg:8.5, apg:1.3,  spg:2.2, bpg:1.8, topg:1.7, fgp:'59.1%', tpp:'21.4%', ftp:'70.4%', tpa:0.2, gs:33, gp:33, mpg:31.6, star:false, dnq:false },
    ],
    playoffs: [],
    totals:   [],
  },

  /* ─────────────── ISAAC VITEL ─────────────── */
  vitel: {
    info: {
      height:    '6\'3\"',
      weight:    '188 lbs',
      age:       '—',
      college:   'Indiana',
      draftYear: '2012',
      draftPick: '???',
      nickname:  '"V8"',
      position:  'Combo Guard',
    },
    retired:  false,
    team:     'IU',   // active team — college abbr (matches TEAM_ABBR / logos/IU.png)
    jerseys:  [
        { team:'Indiana Hoosiers', name:'Home',  number:'8', bg:'#dc143c', stroke:'#ffffff', num:'#ffffff', seasons:'2011–2012', img:'' },
    ],
    regular:  [
       { season:'2011-12', age:18, team:'IU',  ppg:16.9, rpg:4.3, apg:4.1,  spg:1.8, bpg:0.3, topg:2.2, fgp:'48.1%', tpp:'42.1%', ftp:'86.2%', tpa:5.6, gs:34, gp:34, mpg:33.8, star:false, dnq:false },
    ],
    playoffs: [],
    totals:   [],
  },

};
