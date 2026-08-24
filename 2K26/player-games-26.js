/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION 2K26 · PLAYER PERFORMANCE LOGS
   player-games-26.js — Individual statlines for the 2K26 sim.

   Schema is identical to 2K25/player-games.js:
   {
     season:  '2011-12',              // season string
     type:    'regular'|'playoffs',   // game type
     opp:     'ABBR',                 // opponent abbreviation
     result:  'W'|'L',                // win or loss
     score:   '83-58',                // final score (OUR score first)
     home:    true|false,             // true = home game
     game:    1,                      // PLAYOFFS ONLY — game of the series

     pts, reb, ast, stl, blk, tov,
     fgm, fga, tpm, tpa, ftm, fta, min,
   }

   ── 2011-12 NCAA TOURNAMENT ─────────────────────────────────────
   Every game below is from the 2012 NCAA Tournament. School teams:
     Cooper Clark    — Louisville Cardinals      (LOU)
     Isaac Vitel     — Indiana Hoosiers          (IU)
     Jaykeb Stewart  — Marquette Golden Eagles   (MA)
     Sam Stogsdill   — Butler Bulldogs           (BU)
     Paxon Hatch     — Texas Longhorns           (TU)

   NOTES ON THE DATA MODEL
   • type:'regular' — the log renderer resolves a player's team, logo,
     and colors from PLAYER_STATS[key][type], and 2K26 has no
     `playoffs` rows, so type:'playoffs' would render these cards with
     no team identity and NBA round headers ("NBA FINALS" on an Elite
     Eight game). 'regular' renders correctly; the only cost is the
     card's own label reading "Regular Season".
   • home:false — NCAA Tournament games are played at neutral sites,
     which the schema has no flag for. false puts our team on the left
     of the final-score row, so it reads in the same order as the
     source ("Louisville 83, UNC Asheville 58").
   • Opponent abbreviations that already exist site-wide (LOU, IU, KU)
     resolve to full names and logos; the rest render as plain text.
   • Where a statline listed no 3PT split, made threes reconcile to
     zero from PTS/FG/FT, so it is recorded as 0/0.

   Games are entered oldest-first (Round of 64 → National Championship)
   so the log's "Oldest"/"Latest" sorts read chronologically.
   ═══════════════════════════════════════════════════════════════ */

window.PLAYER_GAMES = {

  /* ────────────────────────────────────────
     COOPER CLARK · Louisville Cardinals
     Ran the table — 2012 National Champions.
  ──────────────────────────────────────── */
  clark: [

// ── ROUND OF 64 — (1) Louisville 83, (16) UNC Asheville 58 ──
{ season:'2011-12', type:'regular',
  opp:'UNCA', result:'W', score:'83-58', home:false,
  pts:21, reb:6, ast:3, stl:2, blk:0, tov:2,
  fgm:8, fga:13, tpm:0, tpa:2, ftm:5, fta:6, min:32,
},

// ── ROUND OF 32 — (1) Louisville 77, (8) Memphis 68 ──
{ season:'2011-12', type:'regular',
  opp:'MEM', result:'W', score:'77-68', home:false,
  pts:24, reb:5, ast:2, stl:1, blk:0, tov:3,
  fgm:10, fga:17, tpm:1, tpa:2, ftm:3, fta:4, min:35,
},

// ── SWEET 16 — (1) Louisville 74, (4) Wisconsin 64 ──
{ season:'2011-12', type:'regular',
  opp:'WIS', result:'W', score:'74-64', home:false,
  pts:20, reb:7, ast:3, stl:2, blk:1, tov:2,
  fgm:8, fga:15, tpm:0, tpa:2, ftm:4, fta:5, min:36,
},

// ── ELITE EIGHT — (1) Louisville 72, (2) Michigan State 68 ──
{ season:'2011-12', type:'regular',
  opp:'MSU', result:'W', score:'72-68', home:false,
  pts:23, reb:6, ast:3, stl:3, blk:1, tov:3,
  fgm:9, fga:17, tpm:1, tpa:3, ftm:4, fta:5, min:38,
},

// ── FINAL FOUR — (1) Louisville 74, (1) Kentucky 70 ──
//    The showdown between the two biggest stars of the tournament was
//    one for the ages. Kentucky swarmed Clark, forcing him to take very
//    difficult shots. On the other end Davis had a great game
//    defensively, garnering 4 blocks in a must-win game. Late into the
//    game, on a scoring surge led by Clark hitting his only three of the
//    game, Louisville pulled off a six point comeback to win the contest
//    and are now headed to the biggest stage in college basketball.
{ season:'2011-12', type:'regular',
  opp:'UK', result:'W', score:'74-70', home:false,
  pts:18, reb:6, ast:3, stl:2, blk:1, tov:4,
  fgm:6, fga:16, tpm:1, tpa:3, ftm:5, fta:6, min:39,
},

// ── NATIONAL CHAMPIONSHIP — (1) Louisville 75, (2) Indiana 72 ──
//    Game-sealing rebound and free throws.
//    After twenty five arduous years Louisville yet again finds
//    themselves atop of the college basketball world. The squad, led by
//    top collegiate guard Cooper Clark, had a historic season going 27-4
//    against some of the toughest teams in collegiate basketball. This is
//    one Louisville fans will remember for years to come, as Clark summed
//    up the championship simply: "Twenty five years was long enough."
{ season:'2011-12', type:'regular',
  opp:'IU', result:'W', score:'75-72', home:false,
  pts:23, reb:6, ast:3, stl:3, blk:1, tov:3,
  fgm:8, fga:17, tpm:0, tpa:0, ftm:7, fta:8, min:38,
},

  ],

  /* ────────────────────────────────────────
     PAXON HATCH · Texas Longhorns
     Eliminated in the Sweet 16 by top-seeded North Carolina.
  ──────────────────────────────────────── */
  hatch: [

// ── ROUND OF 64 — (4) Texas 76, (13) Bucknell 66 ──
{ season:'2011-12', type:'regular',
  opp:'BUCK', result:'W', score:'76-66', home:false,
  pts:20, reb:11, ast:1, stl:0, blk:3, tov:2,
  fgm:8, fga:14, tpm:2, tpa:4, ftm:2, fta:2, min:34,
},

// ── ROUND OF 32 — (4) Texas 73, (5) San Diego State 69 ──
{ season:'2011-12', type:'regular',
  opp:'SDSU', result:'W', score:'73-69', home:false,
  pts:17, reb:10, ast:1, stl:1, blk:3, tov:2,
  fgm:7, fga:13, tpm:1, tpa:3, ftm:2, fta:3, min:35,
},

// ── SWEET 16 — (1) North Carolina 83, (4) Texas 75 — ELIMINATED ──
//    Texas was ultimately stretched thin by the top seeded UNC. They
//    truly could not keep up. Hatch attempted to keep up and was swarmed
//    at each shot attempt, leading to the freshman being rattled by the
//    Tarheel's tough defense. Texas eliminated.
{ season:'2011-12', type:'regular',
  opp:'UNC', result:'L', score:'75-83', home:false,
  pts:15, reb:11, ast:2, stl:0, blk:2, tov:3,
  fgm:6, fga:13, tpm:1, tpa:3, ftm:2, fta:2, min:36,
},

  ],

  /* ────────────────────────────────────────
     SAM STOGSDILL · Butler Bulldogs
     Eliminated in the Round of 32 by (3) Baylor.
  ──────────────────────────────────────── */
  stogsdill: [

// ── ROUND OF 64 — (6) Butler 70, (11) Colorado State 64 ──
{ season:'2011-12', type:'regular',
  opp:'CSU', result:'W', score:'70-64', home:false,
  pts:19, reb:12, ast:8, stl:1, blk:2, tov:4,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:3, fta:4, min:38,
},

// ── ROUND OF 32 — (3) Baylor 75, (6) Butler 71 — ELIMINATED ──
//    Sam attempted to shoulder the burden of a small school against a top
//    AP team all season. Baylor struggled to keep their offense humming
//    amidst struggling to find answers for Sam defensively. Sam was the
//    only reason the game was kept close, but in the end, David could not
//    beat Goliath. Butler eliminated.
{ season:'2011-12', type:'regular',
  opp:'BAY', result:'L', score:'71-75', home:false,
  pts:32, reb:9, ast:7, stl:2, blk:1, tov:4,
  fgm:14, fga:17, tpm:0, tpa:0, ftm:4, fta:5, min:39,
},

  ],

  /* ────────────────────────────────────────
     JAYKEB STEWART · Marquette Golden Eagles
     Eliminated in the Round of 32 by (6) Murray State.
  ──────────────────────────────────────── */
  stewart: [

// ── ROUND OF 64 — (3) Marquette 79, (14) Iona 65 ──
{ season:'2011-12', type:'regular',
  opp:'IONA', result:'W', score:'79-65', home:false,
  pts:12, reb:10, ast:2, stl:1, blk:2, tov:1,
  fgm:5, fga:7, tpm:0, tpa:0, ftm:2, fta:3, min:31,
},

// ── ROUND OF 32 — (6) Murray State 68, (3) Marquette 65 — ELIMINATED ──
//    It was a perfect matchup for Murray State, their guard play allowed
//    them to overwhelm and disorganize Marquette. Down the stretch
//    Marquette was worn out and could not keep up. Jaykeb did his job
//    defensively, but ultimately the offense could not keep up.
//    Marquette eliminated.
{ season:'2011-12', type:'regular',
  opp:'MURR', result:'L', score:'65-68', home:false,
  pts:9, reb:11, ast:2, stl:2, blk:1, tov:2,
  fgm:4, fga:7, tpm:0, tpa:0, ftm:1, fta:3, min:34,
},

  ],

  /* ────────────────────────────────────────
     ISAAC VITEL · Indiana Hoosiers
     Runner-up — lost the National Championship to Louisville.
  ──────────────────────────────────────── */
  vitel: [

// ── ROUND OF 64 — (2) Indiana 86, (15) Norfolk State 67 ──
{ season:'2011-12', type:'regular',
  opp:'NORF', result:'W', score:'86-67', home:false,
  pts:20, reb:5, ast:3, stl:2, blk:0, tov:2,
  fgm:7, fga:12, tpm:5, tpa:8, ftm:1, fta:1, min:34,
},

// ── ROUND OF 32 — (2) Indiana 78, (7) Saint Mary's 72 ──
{ season:'2011-12', type:'regular',
  opp:'SMC', result:'W', score:'78-72', home:false,
  pts:18, reb:4, ast:6, stl:1, blk:0, tov:2,
  fgm:6, fga:13, tpm:4, tpa:8, ftm:2, fta:2, min:36,
},

// ── SWEET 16 — (2) Indiana 82, (3) Baylor 77 ──
{ season:'2011-12', type:'regular',
  opp:'BAY', result:'W', score:'82-77', home:false,
  pts:19, reb:5, ast:3, stl:2, blk:0, tov:2,
  fgm:6, fga:12, tpm:4, tpa:7, ftm:3, fta:4, min:37,
},

// ── ELITE EIGHT — (2) Indiana 79, (1) Syracuse 75 ──
{ season:'2011-12', type:'regular',
  opp:'SYR', result:'W', score:'79-75', home:false,
  pts:18, reb:5, ast:7, stl:2, blk:0, tov:2,
  fgm:6, fga:13, tpm:3, tpa:7, ftm:3, fta:4, min:38,
},

// ── FINAL FOUR — (2) Indiana 79, (2) Kansas 72 ──
//    The battle of the big men script was ripped early as Kansas realized
//    how their zone defense was too far stretched. The spacing of Vitel,
//    the rim running Oladipo, and the large Zeller at the cup ended up
//    being just far too much for Kansas. Vitel showed up in a big way,
//    hitting easy shots over and over again. Vitel showed up big, hitting
//    5 threes and a final one to extend the lead to 9 in the final minute.
{ season:'2011-12', type:'regular',
  opp:'KU', result:'W', score:'79-72', home:false,
  pts:23, reb:4, ast:4, stl:2, blk:0, tov:3,
  fgm:8, fga:14, tpm:5, tpa:8, ftm:2, fta:2, min:38,
},

// ── NATIONAL CHAMPIONSHIP — (1) Louisville 75, (2) Indiana 72 ──
//    For Indiana fans this is a night of heartbreak. After years of
//    disappointment Indiana had a breakthrough, making it all the way to
//    the tournament final. The game ending with a miss from Isaac Vitel
//    to seal the contest, Indiana fans are left to wonder: What's next?
//    For young Vitel, the future is bright. But after losing on the
//    biggest stage of his life yet again, one must wonder if this defeat
//    will only serve to make him hungrier than ever.
{ season:'2011-12', type:'regular',
  opp:'LOU', result:'L', score:'72-75', home:false,
  pts:21, reb:4, ast:7, stl:2, blk:0, tov:2,
  fgm:8, fga:15, tpm:4, tpa:8, ftm:1, fta:2, min:39,
},

  ],

};
