/* ══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION 2K26 · PLAYER PERFORMANCE LOGS
   player-games-26.js — Individual statlines for the 2K26 sim.

   {
     season:  '2011-12',              // season string
     type:    'regular'|'playoffs',   // game type
     date:    '2012-03-15',           // ISO date — drives chronological sort
     round:   'Sweet Sixteen',        // optional — label shown on the card
     opp:     'ABBR',                 // opponent abbreviation
     result:  'W'|'L',                // win or loss
     score:   '83-58',                // final score (OUR score first)
     home:    true|false,             // true = home game
     game:    1,                      // optional — game of a playoff series

     pts, reb, ast, stl, blk, tov,
     fgm, fga, tpm, tpa, ftm, fta, min,
   }

   date  — always set one. When every game in view has a date the log sorts
           Latest/Oldest by actual date, so games can be logged in any order
           rather than having to be typed in chronological sequence. Rendered
           on the card as 'MAR 15, 2012'.
   round — the label shown next to the player's name, replacing 'Regular
           Season' or 'Game One'. Any string works; the March Madness set is
           'Round of 64', 'Round of 32', 'Sweet Sixteen', 'Elite Eight',
           'Final Four', 'National Championship'. Omit it and the card falls
           back to the game type.
   game  — only meaningful for a numbered best-of-seven series. The NCAA
           Tournament is single-elimination, so these entries use `round`
           instead and leave `game` unset.

   ── 2011-12 NCAA TOURNAMENT ───────────────────────────────
   Every game below is from the 2012 NCAA Tournament. School teams:
     Cooper Clark    — Louisville Cardinals      (LOU)
     Isaac Vitel     — Indiana Hoosiers          (IU)
     Jaykeb Stewart  — Marquette Golden Eagles   (MA)
     Sam Stogsdill   — Butler Bulldogs           (BU)
     Paxon Hatch     — Texas Longhorns           (TU)

   Dates follow the real 2012 bracket: Round of 64 Mar 15-16, Round of 32
   Mar 17-18, Sweet 16 Mar 22-23, Elite Eight Mar 24-25, Final Four Mar 31,
   National Championship Apr 2. Each school keeps to one side of the
   Thu/Sat or Fri/Sun rotation, and shared opponents line up across players
   (Baylor plays Butler Mar 18 and Indiana Mar 23; the title game is Apr 2
   on both Clark's and Vitel's cards).

   NOTES ON THE DATA MODEL
   • home:false — NCAA Tournament games are played at neutral sites, which
     the schema has no flag for. false puts our team on the left of the
     final-score row, so it reads in the same order as the source
     ("Louisville 83, UNC Asheville 58").
   • Opponent abbreviations that already exist site-wide (LOU, IU, KU)
     resolve to full names and logos; the rest render as plain text.
   • Where a statline listed no 3PT split, made threes reconcile to zero
     from PTS/FG/FT, so it is recorded as 0/0.
   ══════════════════════════════════════════════════════════════ */

window.PLAYER_GAMES = {

  /* ────────────────────────────────────────
     COOPER CLARK · Louisville Cardinals
     Ran the table — 2012 National Champions.
  ──────────────────────────────────────── */
  clark: [

/* --------- REGULAR SEASON - 34 games, Louisville 30-4 ---------
   Games quoted in the source write-ups are marked CANONICAL and are fixed.
   Every other game was generated so the season totals land on Clark's
   official 2011-12 row in player-stats-26.js; all eleven of its figures
   match exactly. Scoring varies the way a real season does.
   The last three are Big East Tournament games at a neutral site, which
   the schema has no flag for, so they carry home:false.
   ------------------------------------------------------------- */

// -- NOVEMBER 2011 --
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'UTM', result:'W', score:'89-56', home:true,
  pts:21, reb:5, ast:3, stl:3, blk:1, tov:3,
  fgm:8, fga:15, tpm:0, tpa:2, ftm:5, fta:6, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-11-13',
  opp:'LAM', result:'W', score:'78-57', home:true,
  pts:13, reb:11, ast:1, stl:2, blk:3, tov:4,
  fgm:6, fga:15, tpm:0, tpa:0, ftm:1, fta:3, min:29,
},
// Same game as Stogsdill's 2011-11-19 entry
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'BU', result:'W', score:'69-57', home:false,
  pts:14, reb:4, ast:2, stl:2, blk:0, tov:2,
  fgm:5, fga:13, tpm:1, tpa:5, ftm:3, fta:3, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-11-22',
  opp:'ARST', result:'W', score:'74-43', home:true,
  pts:17, reb:2, ast:1, stl:2, blk:2, tov:3,
  fgm:8, fga:15, tpm:0, tpa:1, ftm:1, fta:1, min:36,
},
{ season:'2011-12', type:'regular', date:'2011-11-25',
  opp:'OHIO', result:'W', score:'68-60', home:true,
  pts:10, reb:6, ast:2, stl:1, blk:2, tov:4,
  fgm:4, fga:10, tpm:0, tpa:0, ftm:2, fta:5, min:42,
},
{ season:'2011-12', type:'regular', date:'2011-11-28',
  opp:'LBSU', result:'W', score:'82-70', home:true,
  pts:21, reb:7, ast:5, stl:5, blk:1, tov:2,
  fgm:9, fga:12, tpm:1, tpa:1, ftm:2, fta:4, min:31,
},

// -- DECEMBER 2011 --
{ season:'2011-12', type:'regular', date:'2011-12-02',
  opp:'VANDY', result:'W', score:'71-66', home:true,
  pts:18, reb:5, ast:2, stl:2, blk:0, tov:3,
  fgm:7, fga:12, tpm:0, tpa:2, ftm:4, fta:4, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-12-07',
  opp:'IUPUI', result:'W', score:'91-61', home:true,
  pts:9, reb:1, ast:0, stl:0, blk:0, tov:1,
  fgm:4, fga:10, tpm:0, tpa:0, ftm:1, fta:1, min:26,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'FDU', result:'W', score:'84-59', home:true,
  pts:17, reb:5, ast:1, stl:1, blk:0, tov:5,
  fgm:6, fga:18, tpm:0, tpa:1, ftm:5, fta:5, min:42,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'MEM', result:'W', score:'88-79', home:true,
  pts:19, reb:6, ast:1, stl:2, blk:0, tov:0,
  fgm:8, fga:11, tpm:0, tpa:1, ftm:3, fta:4, min:25,
},
{ season:'2011-12', type:'regular', date:'2011-12-20',
  opp:'COFC', result:'W', score:'75-64', home:true,
  pts:23, reb:6, ast:1, stl:2, blk:0, tov:5,
  fgm:9, fga:15, tpm:0, tpa:0, ftm:5, fta:5, min:42,
},
{ season:'2011-12', type:'regular', date:'2011-12-23',
  opp:'WKU', result:'W', score:'77-59', home:true,
  pts:11, reb:4, ast:1, stl:4, blk:0, tov:2,
  fgm:4, fga:15, tpm:0, tpa:1, ftm:3, fta:3, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-12-28',
  opp:'GTWN', result:'L', score:'66-70', home:true,
  pts:20, reb:6, ast:1, stl:5, blk:1, tov:2,
  fgm:9, fga:11, tpm:0, tpa:1, ftm:2, fta:4, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'UK', result:'W', score:'76-73', home:false,
  pts:20, reb:8, ast:2, stl:5, blk:0, tov:3,
  fgm:8, fga:19, tpm:1, tpa:2, ftm:3, fta:4, min:33,
},

// -- JANUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-01-03',
  opp:'SJU', result:'W', score:'79-65', home:false,
  pts:10, reb:4, ast:9, stl:1, blk:1, tov:0,
  fgm:5, fga:16, tpm:0, tpa:0, ftm:0, fta:3, min:29,
},
{ season:'2011-12', type:'regular', date:'2012-01-07',
  opp:'ND', result:'W', score:'74-68', home:true,
  pts:23, reb:1, ast:4, stl:2, blk:1, tov:1,
  fgm:8, fga:14, tpm:1, tpa:2, ftm:6, fta:7, min:42,
},
{ season:'2011-12', type:'regular', date:'2012-01-10',
  opp:'PROV', result:'W', score:'82-69', home:false,
  pts:12, reb:10, ast:4, stl:2, blk:1, tov:1,
  fgm:4, fga:9, tpm:1, tpa:3, ftm:3, fta:3, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-14',
  opp:'DEP', result:'W', score:'85-67', home:true,
  pts:44, reb:11, ast:3, stl:3, blk:1, tov:4,
  fgm:16, fga:19, tpm:0, tpa:4, ftm:12, fta:12, min:28,
},
// Same game as Stewart's 2012-01-16 entry
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2012-01-16',
  opp:'MA', result:'L', score:'72-78', home:false,
  pts:22, reb:6, ast:3, stl:2, blk:1, tov:3,
  fgm:8, fga:17, tpm:2, tpa:6, ftm:4, fta:5, min:38,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'PITT', result:'W', score:'73-66', home:false,
  pts:27, reb:0, ast:1, stl:3, blk:1, tov:2,
  fgm:10, fga:14, tpm:0, tpa:0, ftm:7, fta:8, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-01-25',
  opp:'NOVA', result:'W', score:'81-70', home:true,
  pts:27, reb:9, ast:1, stl:0, blk:2, tov:2,
  fgm:12, fga:19, tpm:0, tpa:1, ftm:3, fta:8, min:39,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'HALL', result:'W', score:'69-62', home:false,
  pts:15, reb:6, ast:0, stl:2, blk:0, tov:0,
  fgm:7, fga:7, tpm:0, tpa:2, ftm:1, fta:1, min:31,
},

// -- FEBRUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'RUT', result:'W', score:'78-64', home:true,
  pts:18, reb:5, ast:0, stl:3, blk:1, tov:1,
  fgm:6, fga:11, tpm:1, tpa:1, ftm:5, fta:7, min:42,
},
{ season:'2011-12', type:'regular', date:'2012-02-06',
  opp:'UCONN', result:'W', score:'76-68', home:true,
  pts:9, reb:17, ast:5, stl:0, blk:3, tov:1,
  fgm:3, fga:15, tpm:0, tpa:0, ftm:3, fta:3, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'WVU', result:'W', score:'75-71', home:false,
  pts:13, reb:3, ast:2, stl:2, blk:0, tov:4,
  fgm:5, fga:13, tpm:0, tpa:1, ftm:3, fta:3, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-02-13',
  opp:'SYR', result:'L', score:'64-69', home:true,
  pts:44, reb:5, ast:2, stl:5, blk:0, tov:2,
  fgm:16, fga:24, tpm:1, tpa:2, ftm:11, fta:11, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'DEP', result:'W', score:'87-76', home:false,
  pts:11, reb:3, ast:2, stl:3, blk:2, tov:3,
  fgm:4, fga:12, tpm:0, tpa:1, ftm:3, fta:3, min:27,
},
{ season:'2011-12', type:'regular', date:'2012-02-23',
  opp:'CIN', result:'W', score:'70-66', home:false,
  pts:6, reb:6, ast:0, stl:3, blk:1, tov:2,
  fgm:2, fga:14, tpm:0, tpa:1, ftm:2, fta:6, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-26',
  opp:'PITT', result:'W', score:'72-63', home:true,
  pts:36, reb:0, ast:1, stl:1, blk:0, tov:1,
  fgm:13, fga:19, tpm:1, tpa:1, ftm:9, fta:9, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-02-29',
  opp:'USF', result:'W', score:'74-65', home:true,
  pts:12, reb:4, ast:5, stl:1, blk:0, tov:2,
  fgm:6, fga:6, tpm:0, tpa:2, ftm:0, fta:1, min:25,
},

// -- MARCH 2012 --
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'SYR', result:'L', score:'61-68', home:false,
  pts:15, reb:3, ast:2, stl:0, blk:2, tov:2,
  fgm:6, fga:18, tpm:0, tpa:1, ftm:3, fta:3, min:26,
},
// Big East Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-08',
  opp:'HALL', result:'W', score:'78-65', home:false,
  pts:37, reb:2, ast:1, stl:0, blk:0, tov:1,
  fgm:16, fga:21, tpm:0, tpa:0, ftm:5, fta:5, min:31,
},
// Big East Tournament - neutral site
// Same game as Stewart's 2012-03-09 entry
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'MA', result:'W', score:'76-70', home:false,
  pts:31, reb:1, ast:3, stl:3, blk:0, tov:4,
  fgm:12, fga:23, tpm:0, tpa:1, ftm:7, fta:7, min:39,
},
// Big East Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-10',
  opp:'CIN', result:'W', score:'72-66', home:false,
  pts:13, reb:15, ast:1, stl:3, blk:0, tov:3,
  fgm:5, fga:24, tpm:0, tpa:3, ftm:3, fta:3, min:40,
},

/* ─────────── NCAA TOURNAMENT ─────────── */

// ── ROUND OF 64 — (1) Louisville 83, (16) UNC Asheville 58 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-15', round:'Round of 64',
  opp:'UNCA', result:'W', score:'83-58', home:false,
  pts:21, reb:6, ast:3, stl:2, blk:0, tov:2,
  fgm:8, fga:13, tpm:0, tpa:2, ftm:5, fta:6, min:32,
},

// ── ROUND OF 32 — (1) Louisville 77, (8) Memphis 68 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-17', round:'Round of 32',
  opp:'MEM', result:'W', score:'77-68', home:false,
  pts:24, reb:5, ast:2, stl:1, blk:0, tov:3,
  fgm:10, fga:17, tpm:1, tpa:2, ftm:3, fta:4, min:35,
},

// ── SWEET 16 — (1) Louisville 74, (4) Wisconsin 64 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-22', round:'Sweet Sixteen',
  opp:'WIS', result:'W', score:'74-64', home:false,
  pts:20, reb:7, ast:3, stl:2, blk:1, tov:2,
  fgm:8, fga:15, tpm:0, tpa:2, ftm:4, fta:5, min:36,
},

// ── ELITE EIGHT — (1) Louisville 72, (2) Michigan State 68 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-24', round:'Elite Eight',
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
{ season:'2011-12', type:'playoffs', date:'2012-03-31', round:'Final Four',
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
{ season:'2011-12', type:'playoffs', date:'2012-04-02', round:'National Championship',
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

/* --------- REGULAR SEASON - 33 games, Texas 25-8 ---------
   Games quoted in the source write-ups are marked CANONICAL and are fixed.
   Every other game was generated so the season totals land on Hatch's
   official 2011-12 row in player-stats-26.js.

   Two notes on that row:
   - The 2011-12-03 win at UCLA is quoted as 19 PTS on 7/11 FG, 1/3 3PT and
     2/3 FT, which total 17. Kept verbatim as canonical; the two-point gap
     is carried as an offset so ppg still lands on 15.6.
   - tpa cannot be matched. The row pairs tpa 1.3 with 3P-pct 32.7, and no
     integer season satisfies both: 32.7 is exactly 16/49, and 49 attempts
     over 33 games is 1.5. 3P-pct wins, so this season has 49 attempts.
   --------------------------------------------------------- */

// -- NOVEMBER 2011 --
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-11-13',
  opp:'BOSU', result:'W', score:'88-44', home:true,
  pts:16, reb:12, ast:2, stl:0, blk:5, tov:2,
  fgm:7, fga:11, tpm:1, tpa:2, ftm:1, fta:2, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-11-15',
  opp:'URI', result:'W', score:'82-67', home:true,
  pts:15, reb:9, ast:1, stl:2, blk:3, tov:1,
  fgm:6, fga:15, tpm:0, tpa:2, ftm:3, fta:5, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'ORST', result:'L', score:'71-76', home:true,
  pts:23, reb:8, ast:0, stl:2, blk:3, tov:3,
  fgm:8, fga:12, tpm:0, tpa:0, ftm:7, fta:7, min:42,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'NCST', result:'L', score:'69-73', home:true,
  pts:13, reb:11, ast:1, stl:0, blk:2, tov:2,
  fgm:6, fga:6, tpm:1, tpa:2, ftm:0, fta:1, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-11-26',
  opp:'SHSU', result:'W', score:'79-57', home:true,
  pts:12, reb:4, ast:1, stl:0, blk:5, tov:3,
  fgm:4, fga:5, tpm:2, tpa:2, ftm:2, fta:2, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-11-29',
  opp:'UNT', result:'W', score:'75-60', home:true,
  pts:11, reb:20, ast:2, stl:0, blk:4, tov:2,
  fgm:3, fga:11, tpm:1, tpa:1, ftm:4, fta:4, min:30,
},

// -- DECEMBER 2011 --
// CANONICAL - statline fixed from the source write-up, not generated
//   the write-up gives 19 PTS on 7/11 FG, 1/3 3PT, 2/3 FT,
//   which totals 17. Kept verbatim; see the header note.
{ season:'2011-12', type:'regular', date:'2011-12-03',
  opp:'UCLA', result:'W', score:'67-62', home:false,
  pts:19, reb:10, ast:2, stl:0, blk:3, tov:3,
  fgm:7, fga:11, tpm:1, tpa:3, ftm:2, fta:3, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-12-06',
  opp:'UTARL', result:'W', score:'84-62', home:true,
  pts:12, reb:6, ast:2, stl:1, blk:3, tov:3,
  fgm:5, fga:5, tpm:0, tpa:0, ftm:2, fta:4, min:27,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'TXST', result:'W', score:'68-55', home:true,
  pts:7, reb:16, ast:0, stl:0, blk:2, tov:1,
  fgm:3, fga:10, tpm:0, tpa:0, ftm:1, fta:1, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-13',
  opp:'NICH', result:'W', score:'86-58', home:true,
  pts:27, reb:1, ast:1, stl:1, blk:1, tov:0,
  fgm:10, fga:12, tpm:0, tpa:0, ftm:7, fta:8, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'TEM', result:'W', score:'74-68', home:true,
  pts:13, reb:10, ast:1, stl:0, blk:3, tov:1,
  fgm:6, fga:10, tpm:1, tpa:1, ftm:0, fta:0, min:29,
},
{ season:'2011-12', type:'regular', date:'2011-12-21',
  opp:'UNC', result:'L', score:'72-82', home:false,
  pts:15, reb:7, ast:0, stl:1, blk:4, tov:6,
  fgm:5, fga:11, tpm:0, tpa:3, ftm:5, fta:5, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'RICE', result:'W', score:'77-61', home:true,
  pts:13, reb:7, ast:1, stl:1, blk:1, tov:2,
  fgm:5, fga:14, tpm:0, tpa:2, ftm:3, fta:5, min:30,
},

// -- JANUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-01-04',
  opp:'ISU', result:'W', score:'74-69', home:false,
  pts:7, reb:7, ast:1, stl:1, blk:4, tov:2,
  fgm:3, fga:7, tpm:0, tpa:2, ftm:1, fta:6, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-07',
  opp:'OKST', result:'W', score:'77-68', home:true,
  pts:9, reb:7, ast:3, stl:2, blk:4, tov:2,
  fgm:4, fga:7, tpm:0, tpa:0, ftm:1, fta:1, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-11',
  opp:'TAMU', result:'W', score:'72-66', home:true,
  pts:16, reb:18, ast:3, stl:0, blk:3, tov:1,
  fgm:6, fga:17, tpm:0, tpa:0, ftm:4, fta:4, min:30,
},
{ season:'2011-12', type:'regular', date:'2012-01-14',
  opp:'MIZ', result:'L', score:'70-77', home:false,
  pts:4, reb:9, ast:2, stl:1, blk:5, tov:3,
  fgm:1, fga:10, tpm:0, tpa:1, ftm:2, fta:3, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-18',
  opp:'KSU', result:'L', score:'65-71', home:false,
  pts:15, reb:10, ast:1, stl:1, blk:2, tov:0,
  fgm:7, fga:7, tpm:1, tpa:1, ftm:0, fta:1, min:30,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'KU', result:'W', score:'73-70', home:true,
  pts:25, reb:9, ast:2, stl:0, blk:2, tov:0,
  fgm:10, fga:17, tpm:0, tpa:0, ftm:5, fta:5, min:31,
},
{ season:'2011-12', type:'regular', date:'2012-01-24',
  opp:'ISU', result:'W', score:'79-67', home:true,
  pts:16, reb:4, ast:2, stl:1, blk:1, tov:1,
  fgm:6, fga:9, tpm:2, tpa:3, ftm:2, fta:6, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'BAY', result:'W', score:'80-76', home:false,
  pts:24, reb:8, ast:3, stl:0, blk:1, tov:1,
  fgm:9, fga:14, tpm:0, tpa:2, ftm:6, fta:6, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-01-30',
  opp:'MIZ', result:'W', score:'76-71', home:true,
  pts:30, reb:14, ast:0, stl:0, blk:1, tov:4,
  fgm:10, fga:19, tpm:0, tpa:2, ftm:10, fta:10, min:34,
},

// -- FEBRUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'TTU', result:'W', score:'82-64', home:true,
  pts:19, reb:9, ast:1, stl:0, blk:1, tov:3,
  fgm:6, fga:9, tpm:0, tpa:2, ftm:7, fta:7, min:23,
},
{ season:'2011-12', type:'regular', date:'2012-02-06',
  opp:'TAMU', result:'W', score:'70-62', home:false,
  pts:24, reb:11, ast:0, stl:2, blk:1, tov:3,
  fgm:8, fga:19, tpm:1, tpa:2, ftm:7, fta:7, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'KSU', result:'W', score:'75-69', home:true,
  pts:13, reb:6, ast:3, stl:1, blk:2, tov:2,
  fgm:6, fga:10, tpm:0, tpa:2, ftm:1, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-14',
  opp:'OU', result:'W', score:'78-66', home:false,
  pts:9, reb:8, ast:1, stl:0, blk:1, tov:2,
  fgm:3, fga:6, tpm:0, tpa:3, ftm:3, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'OKST', result:'W', score:'80-72', home:false,
  pts:16, reb:5, ast:0, stl:1, blk:3, tov:0,
  fgm:6, fga:6, tpm:0, tpa:0, ftm:4, fta:5, min:29,
},
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2012-02-20',
  opp:'BAY', result:'L', score:'73-81', home:false,
  pts:20, reb:12, ast:3, stl:1, blk:3, tov:3,
  fgm:8, fga:15, tpm:1, tpa:2, ftm:3, fta:4, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-02-25',
  opp:'TTU', result:'W', score:'77-61', home:false,
  pts:23, reb:11, ast:2, stl:0, blk:3, tov:0,
  fgm:8, fga:15, tpm:0, tpa:0, ftm:7, fta:7, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-02-29',
  opp:'OU', result:'W', score:'83-70', home:true,
  pts:10, reb:3, ast:3, stl:3, blk:2, tov:3,
  fgm:3, fga:8, tpm:1, tpa:3, ftm:3, fta:3, min:29,
},

// -- MARCH 2012 --
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'KU', result:'L', score:'68-75', home:false,
  pts:11, reb:10, ast:2, stl:1, blk:1, tov:1,
  fgm:4, fga:10, tpm:2, tpa:5, ftm:1, fta:1, min:42,
},
// Big 12 Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-08',
  opp:'ISU', result:'W', score:'75-69', home:false,
  pts:13, reb:7, ast:0, stl:2, blk:4, tov:1,
  fgm:6, fga:8, tpm:0, tpa:0, ftm:1, fta:5, min:36,
},
// Big 12 Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'KU', result:'L', score:'71-76', home:false,
  pts:16, reb:8, ast:0, stl:2, blk:0, tov:2,
  fgm:6, fga:10, tpm:1, tpa:1, ftm:3, fta:4, min:24,
},

/* ─────────── NCAA TOURNAMENT ─────────── */

// ── ROUND OF 64 — (4) Texas 76, (13) Bucknell 66 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-16', round:'Round of 64',
  opp:'BUCK', result:'W', score:'76-66', home:false,
  pts:20, reb:11, ast:1, stl:0, blk:3, tov:2,
  fgm:8, fga:14, tpm:2, tpa:4, ftm:2, fta:2, min:34,
},

// ── ROUND OF 32 — (4) Texas 73, (5) San Diego State 69 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-18', round:'Round of 32',
  opp:'SDSU', result:'W', score:'73-69', home:false,
  pts:17, reb:10, ast:1, stl:1, blk:3, tov:2,
  fgm:7, fga:13, tpm:1, tpa:3, ftm:2, fta:3, min:35,
},

// ── SWEET 16 — (1) North Carolina 83, (4) Texas 75 — ELIMINATED ──
//    Texas was ultimately stretched thin by the top seeded UNC. They
//    truly could not keep up. Hatch attempted to keep up and was swarmed
//    at each shot attempt, leading to the freshman being rattled by the
//    Tarheel's tough defense. Texas eliminated.
{ season:'2011-12', type:'playoffs', date:'2012-03-23', round:'Sweet Sixteen',
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

/* --------- REGULAR SEASON - 33 games, Butler 26-7 ---------
   Games quoted in the source write-ups are marked CANONICAL and are fixed.
   Every other game was generated so the season totals land on Stogsdill's
   official 2011-12 row in player-stats-26.js.

   tpa cannot be matched. The row pairs tpa 0.2 with 3P-pct 19.2, and no
   integer season satisfies both: 19.2 is exactly 5/26, and 26 attempts
   over 33 games is 0.8. 3P-pct wins, so this season has 26 attempts.
   ---------------------------------------------------------- */

// -- NOVEMBER 2011 --
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'EVAN', result:'W', score:'74-61', home:false,
  pts:13, reb:11, ast:8, stl:2, blk:2, tov:2,
  fgm:6, fga:10, tpm:0, tpa:0, ftm:1, fta:1, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-11-15',
  opp:'CHAT', result:'W', score:'72-58', home:true,
  pts:20, reb:4, ast:2, stl:2, blk:1, tov:2,
  fgm:7, fga:10, tpm:0, tpa:2, ftm:6, fta:6, min:42,
},
// Same game as Clark's 2011-11-19 entry
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'LOU', result:'L', score:'57-69', home:true,
  pts:19, reb:8, ast:5, stl:1, blk:1, tov:2,
  fgm:8, fga:12, tpm:0, tpa:0, ftm:3, fta:4, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'SAV', result:'W', score:'68-48', home:true,
  pts:23, reb:11, ast:5, stl:0, blk:2, tov:5,
  fgm:9, fga:14, tpm:0, tpa:0, ftm:5, fta:5, min:21,
},
{ season:'2011-12', type:'regular', date:'2011-11-23',
  opp:'GWEB', result:'W', score:'73-61', home:true,
  pts:18, reb:8, ast:10, stl:3, blk:0, tov:1,
  fgm:8, fga:10, tpm:0, tpa:0, ftm:2, fta:2, min:38,
},
// Same game as Vitel's 2011-11-27 entry
{ season:'2011-12', type:'regular', date:'2011-11-27',
  opp:'IU', result:'L', score:'74-78', home:false,
  pts:28, reb:3, ast:4, stl:2, blk:4, tov:1,
  fgm:10, fga:18, tpm:0, tpa:1, ftm:8, fta:9, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-11-29',
  opp:'OAKC', result:'W', score:'91-55', home:true,
  pts:19, reb:8, ast:4, stl:1, blk:1, tov:1,
  fgm:9, fga:9, tpm:1, tpa:1, ftm:0, fta:5, min:28,
},

// -- DECEMBER 2011 --
{ season:'2011-12', type:'regular', date:'2011-12-03',
  opp:'VALPO', result:'W', score:'69-62', home:true,
  pts:10, reb:11, ast:5, stl:0, blk:2, tov:2,
  fgm:5, fga:15, tpm:0, tpa:2, ftm:0, fta:8, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-12-07',
  opp:'XAV', result:'L', score:'64-71', home:true,
  pts:19, reb:4, ast:1, stl:0, blk:0, tov:5,
  fgm:7, fga:20, tpm:1, tpa:1, ftm:4, fta:4, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'BALL', result:'W', score:'62-56', home:false,
  pts:18, reb:11, ast:10, stl:1, blk:1, tov:3,
  fgm:6, fga:14, tpm:0, tpa:0, ftm:6, fta:6, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'PUR', result:'W', score:'69-65', home:false,
  pts:26, reb:1, ast:5, stl:0, blk:0, tov:1,
  fgm:10, fga:12, tpm:0, tpa:1, ftm:6, fta:6, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-12-20',
  opp:'GONZ', result:'L', score:'61-72', home:false,
  pts:23, reb:9, ast:7, stl:4, blk:2, tov:3,
  fgm:10, fga:18, tpm:0, tpa:1, ftm:3, fta:6, min:36,
},
{ season:'2011-12', type:'regular', date:'2011-12-22',
  opp:'STAN', result:'W', score:'68-64', home:false,
  pts:17, reb:7, ast:5, stl:1, blk:1, tov:3,
  fgm:6, fga:11, tpm:0, tpa:1, ftm:5, fta:5, min:28,
},
{ season:'2011-12', type:'regular', date:'2011-12-29',
  opp:'GB', result:'W', score:'70-58', home:true,
  pts:15, reb:4, ast:6, stl:1, blk:0, tov:4,
  fgm:6, fga:15, tpm:0, tpa:2, ftm:3, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'UWM', result:'W', score:'66-57', home:true,
  pts:37, reb:8, ast:3, stl:2, blk:0, tov:6,
  fgm:16, fga:25, tpm:0, tpa:0, ftm:5, fta:5, min:37,
},

// -- JANUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-01-06',
  opp:'WRST', result:'W', score:'65-59', home:false,
  pts:19, reb:7, ast:7, stl:2, blk:1, tov:4,
  fgm:9, fga:15, tpm:0, tpa:1, ftm:1, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-08',
  opp:'UDM', result:'L', score:'67-72', home:false,
  pts:26, reb:10, ast:2, stl:0, blk:3, tov:3,
  fgm:11, fga:18, tpm:1, tpa:1, ftm:3, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-13',
  opp:'CLST', result:'L', score:'63-68', home:true,
  pts:13, reb:2, ast:6, stl:1, blk:2, tov:3,
  fgm:6, fga:11, tpm:0, tpa:1, ftm:1, fta:3, min:42,
},
{ season:'2011-12', type:'regular', date:'2012-01-15',
  opp:'YSU', result:'W', score:'76-60', home:true,
  pts:4, reb:6, ast:2, stl:4, blk:1, tov:2,
  fgm:2, fga:7, tpm:0, tpa:1, ftm:0, fta:2, min:27,
},
{ season:'2011-12', type:'regular', date:'2012-01-19',
  opp:'UIC', result:'W', score:'71-57', home:false,
  pts:28, reb:8, ast:4, stl:3, blk:2, tov:5,
  fgm:13, fga:13, tpm:0, tpa:1, ftm:2, fta:2, min:40,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'LUC', result:'W', score:'67-54', home:false,
  pts:13, reb:14, ast:11, stl:0, blk:0, tov:1,
  fgm:5, fga:15, tpm:0, tpa:0, ftm:3, fta:3, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-01-26',
  opp:'UWM', result:'W', score:'69-63', home:false,
  pts:21, reb:4, ast:16, stl:0, blk:2, tov:5,
  fgm:8, fga:25, tpm:0, tpa:0, ftm:5, fta:5, min:40,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'GB', result:'W', score:'72-66', home:false,
  pts:14, reb:15, ast:10, stl:2, blk:1, tov:5,
  fgm:4, fga:19, tpm:0, tpa:0, ftm:6, fta:6, min:30,
},

// -- FEBRUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-02-02',
  opp:'WRST', result:'W', score:'74-59', home:true,
  pts:29, reb:9, ast:12, stl:2, blk:1, tov:1,
  fgm:10, fga:18, tpm:0, tpa:3, ftm:9, fta:9, min:42,
},
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'UDM', result:'W', score:'73-68', home:true,
  pts:9, reb:5, ast:11, stl:3, blk:1, tov:3,
  fgm:4, fga:6, tpm:0, tpa:1, ftm:1, fta:1, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-02-09',
  opp:'YSU', result:'W', score:'78-63', home:false,
  pts:14, reb:12, ast:5, stl:3, blk:0, tov:5,
  fgm:5, fga:12, tpm:0, tpa:0, ftm:4, fta:7, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'CLST', result:'W', score:'70-66', home:false,
  pts:31, reb:12, ast:5, stl:1, blk:1, tov:4,
  fgm:11, fga:23, tpm:1, tpa:1, ftm:8, fta:8, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-02-14',
  opp:'LUC', result:'W', score:'75-56', home:true,
  pts:11, reb:13, ast:2, stl:3, blk:3, tov:2,
  fgm:5, fga:15, tpm:0, tpa:1, ftm:1, fta:1, min:42,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'INST', result:'W', score:'77-64', home:true,
  pts:26, reb:9, ast:5, stl:1, blk:1, tov:4,
  fgm:12, fga:25, tpm:0, tpa:0, ftm:2, fta:4, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-02-21',
  opp:'UIC', result:'W', score:'80-58', home:true,
  pts:9, reb:10, ast:3, stl:2, blk:3, tov:6,
  fgm:4, fga:15, tpm:0, tpa:2, ftm:1, fta:1, min:42,
},
{ season:'2011-12', type:'regular', date:'2012-02-24',
  opp:'VALPO', result:'L', score:'64-69', home:false,
  pts:30, reb:8, ast:8, stl:1, blk:2, tov:2,
  fgm:12, fga:12, tpm:0, tpa:0, ftm:6, fta:9, min:34,
},

// -- MARCH 2012 --
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'UWM', result:'W', score:'74-62', home:true,
  pts:26, reb:8, ast:11, stl:2, blk:1, tov:3,
  fgm:10, fga:13, tpm:0, tpa:0, ftm:6, fta:6, min:27,
},
{ season:'2011-12', type:'regular', date:'2012-03-06',
  opp:'UDM', result:'W', score:'71-67', home:true,
  pts:18, reb:7, ast:5, stl:3, blk:1, tov:0,
  fgm:8, fga:10, tpm:1, tpa:1, ftm:1, fta:1, min:42,
},

/* ─────────── NCAA TOURNAMENT ─────────── */

// ── ROUND OF 64 — (6) Butler 70, (11) Colorado State 64 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-16', round:'Round of 64',
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
{ season:'2011-12', type:'playoffs', date:'2012-03-18', round:'Round of 32',
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

/* --------- REGULAR SEASON - 33 games, Marquette 26-7 ---------
   Games quoted in the source write-ups are marked CANONICAL and are fixed.
   Every other game was generated so the season totals land on Stewart's
   official 2011-12 row in player-stats-26.js.

   tpa cannot be matched. The row pairs tpa 0.2 with 3P-pct 21.4, and no
   integer season satisfies both: 21.4 is exactly 3/14, and 14 attempts
   over 33 games is 0.4. 3P-pct wins, so this season has 14 attempts.
   ------------------------------------------------------------- */

// -- NOVEMBER 2011 --
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'MSM', result:'W', score:'83-57', home:true,
  pts:12, reb:10, ast:3, stl:4, blk:3, tov:2,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:2, fta:4, min:28,
},
{ season:'2011-12', type:'regular', date:'2011-11-14',
  opp:'NORF', result:'W', score:'78-61', home:true,
  pts:15, reb:6, ast:1, stl:3, blk:1, tov:1,
  fgm:6, fga:8, tpm:0, tpa:0, ftm:3, fta:5, min:29,
},
{ season:'2011-12', type:'regular', date:'2011-11-18',
  opp:'WIN', result:'W', score:'81-60', home:true,
  pts:7, reb:9, ast:4, stl:1, blk:2, tov:2,
  fgm:2, fga:8, tpm:0, tpa:1, ftm:3, fta:3, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-11-20',
  opp:'MISS', result:'W', score:'74-66', home:true,
  pts:15, reb:4, ast:0, stl:3, blk:0, tov:0,
  fgm:6, fga:9, tpm:0, tpa:0, ftm:3, fta:5, min:38,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'NORF', result:'W', score:'79-63', home:true,
  pts:9, reb:22, ast:2, stl:3, blk:1, tov:1,
  fgm:4, fga:7, tpm:0, tpa:0, ftm:1, fta:8, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-11-28',
  opp:'JAX', result:'W', score:'86-62', home:true,
  pts:7, reb:10, ast:0, stl:1, blk:1, tov:1,
  fgm:2, fga:4, tpm:0, tpa:0, ftm:3, fta:6, min:36,
},

// -- DECEMBER 2011 --
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-12-03',
  opp:'WIS', result:'W', score:'64-59', home:false,
  pts:10, reb:12, ast:3, stl:2, blk:1, tov:2,
  fgm:4, fga:8, tpm:0, tpa:0, ftm:2, fta:4, min:24,
},
{ season:'2011-12', type:'regular', date:'2011-12-06',
  opp:'WASH', result:'W', score:'79-72', home:true,
  pts:10, reb:6, ast:0, stl:2, blk:1, tov:1,
  fgm:3, fga:6, tpm:0, tpa:1, ftm:4, fta:4, min:27,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'GB', result:'W', score:'77-60', home:true,
  pts:29, reb:3, ast:1, stl:3, blk:3, tov:1,
  fgm:9, fga:11, tpm:0, tpa:0, ftm:11, fta:11, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'UNCO', result:'W', score:'82-58', home:true,
  pts:12, reb:3, ast:2, stl:4, blk:2, tov:1,
  fgm:5, fga:9, tpm:0, tpa:0, ftm:2, fta:2, min:23,
},
{ season:'2011-12', type:'regular', date:'2011-12-19',
  opp:'LSU', result:'L', score:'68-72', home:false,
  pts:21, reb:10, ast:2, stl:3, blk:3, tov:1,
  fgm:9, fga:11, tpm:0, tpa:1, ftm:3, fta:4, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-12-22',
  opp:'UWM', result:'W', score:'76-63', home:true,
  pts:12, reb:11, ast:2, stl:1, blk:0, tov:0,
  fgm:5, fga:6, tpm:0, tpa:0, ftm:2, fta:2, min:29,
},
{ season:'2011-12', type:'regular', date:'2011-12-29',
  opp:'VANDY', result:'L', score:'66-71', home:true,
  pts:9, reb:11, ast:2, stl:2, blk:3, tov:1,
  fgm:4, fga:6, tpm:0, tpa:0, ftm:1, fta:1, min:32,
},

// -- JANUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-01-01',
  opp:'NOVA', result:'W', score:'81-70', home:true,
  pts:9, reb:3, ast:0, stl:4, blk:2, tov:2,
  fgm:4, fga:6, tpm:0, tpa:0, ftm:1, fta:1, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-04',
  opp:'GTWN', result:'L', score:'65-73', home:false,
  pts:3, reb:11, ast:0, stl:0, blk:2, tov:1,
  fgm:1, fga:4, tpm:0, tpa:0, ftm:1, fta:5, min:32,
},
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2012-01-07',
  opp:'SYR', result:'L', score:'69-75', home:false,
  pts:13, reb:7, ast:2, stl:3, blk:1, tov:2,
  fgm:5, fga:11, tpm:1, tpa:3, ftm:2, fta:2, min:29,
},
{ season:'2011-12', type:'regular', date:'2012-01-11',
  opp:'SJU', result:'W', score:'82-68', home:true,
  pts:3, reb:5, ast:0, stl:1, blk:3, tov:6,
  fgm:1, fga:5, tpm:0, tpa:0, ftm:1, fta:5, min:30,
},
{ season:'2011-12', type:'regular', date:'2012-01-14',
  opp:'PITT', result:'W', score:'77-65', home:true,
  pts:10, reb:6, ast:1, stl:2, blk:2, tov:0,
  fgm:3, fga:6, tpm:0, tpa:0, ftm:4, fta:5, min:24,
},
// Same game as Clark's 2012-01-16 entry
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2012-01-16',
  opp:'LOU', result:'W', score:'78-72', home:true,
  pts:18, reb:10, ast:4, stl:2, blk:2, tov:1,
  fgm:7, fga:13, tpm:1, tpa:3, ftm:3, fta:4, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'PROV', result:'W', score:'74-67', home:false,
  pts:7, reb:11, ast:1, stl:0, blk:2, tov:4,
  fgm:2, fga:6, tpm:0, tpa:0, ftm:3, fta:3, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-01-24',
  opp:'USF', result:'W', score:'72-61', home:true,
  pts:12, reb:6, ast:0, stl:1, blk:1, tov:3,
  fgm:4, fga:4, tpm:0, tpa:0, ftm:4, fta:8, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'NOVA', result:'W', score:'79-70', home:false,
  pts:8, reb:8, ast:2, stl:2, blk:3, tov:0,
  fgm:3, fga:3, tpm:0, tpa:1, ftm:2, fta:3, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-31',
  opp:'HALL', result:'W', score:'75-66', home:true,
  pts:18, reb:4, ast:0, stl:4, blk:3, tov:0,
  fgm:5, fga:10, tpm:0, tpa:1, ftm:8, fta:8, min:42,
},

// -- FEBRUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'ND', result:'L', score:'64-70', home:false,
  pts:16, reb:11, ast:0, stl:3, blk:3, tov:3,
  fgm:6, fga:9, tpm:0, tpa:0, ftm:4, fta:4, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-02-06',
  opp:'DEP', result:'W', score:'80-65', home:false,
  pts:6, reb:8, ast:1, stl:2, blk:2, tov:1,
  fgm:2, fga:5, tpm:0, tpa:0, ftm:2, fta:2, min:26,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'CIN', result:'W', score:'73-66', home:true,
  pts:23, reb:10, ast:1, stl:2, blk:2, tov:5,
  fgm:8, fga:13, tpm:0, tpa:0, ftm:7, fta:9, min:40,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'UCONN', result:'W', score:'76-69', home:false,
  pts:21, reb:9, ast:0, stl:1, blk:2, tov:3,
  fgm:8, fga:8, tpm:0, tpa:0, ftm:5, fta:5, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-02-22',
  opp:'RUT', result:'W', score:'78-64', home:true,
  pts:10, reb:6, ast:1, stl:3, blk:3, tov:0,
  fgm:4, fga:7, tpm:0, tpa:1, ftm:2, fta:2, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-02-24',
  opp:'WVU', result:'W', score:'71-67', home:false,
  pts:4, reb:9, ast:2, stl:2, blk:2, tov:0,
  fgm:1, fga:6, tpm:0, tpa:0, ftm:2, fta:2, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-02-29',
  opp:'CIN', result:'L', score:'65-70', home:false,
  pts:15, reb:6, ast:1, stl:4, blk:1, tov:2,
  fgm:5, fga:6, tpm:1, tpa:1, ftm:4, fta:4, min:31,
},

// -- MARCH 2012 --
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'GTWN', result:'W', score:'76-69', home:true,
  pts:2, reb:13, ast:3, stl:2, blk:0, tov:3,
  fgm:1, fga:4, tpm:0, tpa:1, ftm:0, fta:4, min:38,
},
// Big East Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-08',
  opp:'GTWN', result:'W', score:'74-68', home:false,
  pts:7, reb:9, ast:1, stl:2, blk:2, tov:5,
  fgm:3, fga:3, tpm:0, tpa:0, ftm:1, fta:3, min:35,
},
// Big East Tournament - neutral site
// Same game as Clark's 2012-03-09 entry
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'LOU', result:'L', score:'70-76', home:false,
  pts:8, reb:12, ast:1, stl:1, blk:1, tov:1,
  fgm:2, fga:5, tpm:0, tpa:0, ftm:4, fta:4, min:34,
},

/* ─────────── NCAA TOURNAMENT ─────────── */

// ── ROUND OF 64 — (3) Marquette 79, (14) Iona 65 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-15', round:'Round of 64',
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
{ season:'2011-12', type:'playoffs', date:'2012-03-17', round:'Round of 32',
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

/* --------- REGULAR SEASON - 34 games, Indiana 28-6 ---------
   Games quoted in the source write-ups are marked CANONICAL and are fixed.
   Every other game was generated so the season totals land on Vitel's
   official 2011-12 row in player-stats-26.js; all eleven of its figures
   match exactly.
   The last three are Big Ten Tournament games at a neutral site, which
   the schema has no flag for, so they carry home:false.
   ----------------------------------------------------------- */

// -- NOVEMBER 2011 --
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'SBU', result:'W', score:'94-68', home:true,
  pts:18, reb:6, ast:8, stl:3, blk:0, tov:3,
  fgm:6, fga:11, tpm:4, tpa:7, ftm:2, fta:2, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-11-13',
  opp:'CHAT', result:'W', score:'82-61', home:true,
  pts:18, reb:3, ast:6, stl:1, blk:0, tov:1,
  fgm:5, fga:13, tpm:3, tpa:5, ftm:5, fta:5, min:42,
},
{ season:'2011-12', type:'regular', date:'2011-11-16',
  opp:'EVAN', result:'W', score:'78-64', home:false,
  pts:10, reb:3, ast:7, stl:5, blk:1, tov:0,
  fgm:3, fga:6, tpm:3, tpa:5, ftm:1, fta:1, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'SAV', result:'W', score:'88-56', home:true,
  pts:33, reb:2, ast:3, stl:1, blk:0, tov:5,
  fgm:13, fga:19, tpm:3, tpa:7, ftm:4, fta:4, min:28,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'GWEB', result:'W', score:'84-62', home:true,
  pts:12, reb:5, ast:1, stl:4, blk:1, tov:2,
  fgm:4, fga:5, tpm:2, tpa:5, ftm:2, fta:2, min:28,
},
// Same game as Stogsdill's 2011-11-27 entry
{ season:'2011-12', type:'regular', date:'2011-11-27',
  opp:'BU', result:'W', score:'78-74', home:true,
  pts:20, reb:4, ast:6, stl:2, blk:0, tov:3,
  fgm:7, fga:10, tpm:2, tpa:4, ftm:4, fta:5, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-11-30',
  opp:'NCST', result:'W', score:'81-76', home:false,
  pts:36, reb:3, ast:0, stl:0, blk:0, tov:2,
  fgm:13, fga:21, tpm:2, tpa:5, ftm:8, fta:8, min:30,
},

// -- DECEMBER 2011 --
{ season:'2011-12', type:'regular', date:'2011-12-04',
  opp:'STET', result:'W', score:'86-59', home:true,
  pts:15, reb:3, ast:4, stl:2, blk:0, tov:3,
  fgm:6, fga:14, tpm:1, tpa:4, ftm:2, fta:4, min:31,
},
// CANONICAL - statline fixed from the source write-up, not generated
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'UK', result:'W', score:'76-73', home:true,
  pts:19, reb:6, ast:6, stl:2, blk:0, tov:2,
  fgm:7, fga:14, tpm:3, tpa:6, ftm:2, fta:2, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'ND', result:'W', score:'80-71', home:true,
  pts:4, reb:1, ast:1, stl:3, blk:0, tov:2,
  fgm:1, fga:6, tpm:1, tpa:4, ftm:1, fta:1, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-12-19',
  opp:'HOW', result:'W', score:'89-63', home:true,
  pts:9, reb:2, ast:5, stl:1, blk:1, tov:0,
  fgm:2, fga:8, tpm:2, tpa:8, ftm:3, fta:3, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-22',
  opp:'UMBC', result:'W', score:'77-58', home:true,
  pts:20, reb:2, ast:2, stl:4, blk:0, tov:3,
  fgm:7, fga:22, tpm:2, tpa:7, ftm:4, fta:4, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-12-28',
  opp:'MSU', result:'L', score:'69-75', home:false,
  pts:15, reb:3, ast:6, stl:1, blk:0, tov:2,
  fgm:7, fga:8, tpm:1, tpa:5, ftm:0, fta:3, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'OSU', result:'W', score:'78-74', home:true,
  pts:10, reb:6, ast:5, stl:3, blk:0, tov:1,
  fgm:4, fga:7, tpm:0, tpa:7, ftm:2, fta:2, min:41,
},

// -- JANUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-01-05',
  opp:'MICH', result:'W', score:'76-70', home:true,
  pts:16, reb:6, ast:0, stl:3, blk:0, tov:2,
  fgm:4, fga:11, tpm:3, tpa:8, ftm:5, fta:5, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-01-08',
  opp:'PSU', result:'W', score:'73-64', home:false,
  pts:19, reb:2, ast:2, stl:3, blk:0, tov:6,
  fgm:6, fga:12, tpm:4, tpa:5, ftm:3, fta:4, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-12',
  opp:'MINN', result:'L', score:'68-72', home:true,
  pts:13, reb:6, ast:5, stl:1, blk:0, tov:3,
  fgm:5, fga:16, tpm:2, tpa:4, ftm:1, fta:1, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-15',
  opp:'OSU', result:'L', score:'71-77', home:false,
  pts:11, reb:3, ast:5, stl:2, blk:0, tov:2,
  fgm:4, fga:11, tpm:2, tpa:8, ftm:1, fta:1, min:42,
},
{ season:'2011-12', type:'regular', date:'2012-01-18',
  opp:'NEB', result:'W', score:'74-62', home:false,
  pts:26, reb:4, ast:6, stl:2, blk:0, tov:2,
  fgm:10, fga:12, tpm:1, tpa:4, ftm:5, fta:6, min:30,
},
{ season:'2011-12', type:'regular', date:'2012-01-22',
  opp:'PSU', result:'W', score:'82-66', home:true,
  pts:7, reb:5, ast:0, stl:3, blk:1, tov:1,
  fgm:2, fga:9, tpm:2, tpa:6, ftm:1, fta:2, min:31,
},
{ season:'2011-12', type:'regular', date:'2012-01-26',
  opp:'WIS', result:'L', score:'65-70', home:false,
  pts:13, reb:3, ast:2, stl:0, blk:1, tov:0,
  fgm:4, fga:6, tpm:3, tpa:4, ftm:2, fta:2, min:40,
},
{ season:'2011-12', type:'regular', date:'2012-01-29',
  opp:'IOWA', result:'W', score:'83-72', home:true,
  pts:14, reb:3, ast:4, stl:2, blk:0, tov:2,
  fgm:4, fga:11, tpm:2, tpa:2, ftm:4, fta:4, min:35,
},

// -- FEBRUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-02-01',
  opp:'MICH', result:'L', score:'72-76', home:false,
  pts:13, reb:6, ast:3, stl:2, blk:0, tov:2,
  fgm:4, fga:11, tpm:4, tpa:11, ftm:1, fta:1, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'PUR', result:'W', score:'79-73', home:false,
  pts:29, reb:8, ast:10, stl:3, blk:0, tov:2,
  fgm:9, fga:20, tpm:6, tpa:6, ftm:5, fta:5, min:40,
},
{ season:'2011-12', type:'regular', date:'2012-02-09',
  opp:'ILL', result:'W', score:'81-69', home:true,
  pts:36, reb:7, ast:3, stl:2, blk:0, tov:3,
  fgm:13, fga:20, tpm:5, tpa:5, ftm:5, fta:5, min:29,
},
{ season:'2011-12', type:'regular', date:'2012-02-15',
  opp:'NW', result:'W', score:'70-64', home:true,
  pts:18, reb:11, ast:2, stl:0, blk:2, tov:2,
  fgm:7, fga:13, tpm:3, tpa:6, ftm:1, fta:1, min:38,
},
{ season:'2011-12', type:'regular', date:'2012-02-19',
  opp:'IOWA', result:'W', score:'84-74', home:false,
  pts:35, reb:0, ast:5, stl:0, blk:0, tov:5,
  fgm:13, fga:20, tpm:2, tpa:2, ftm:7, fta:7, min:29,
},
{ season:'2011-12', type:'regular', date:'2012-02-22',
  opp:'NCCU', result:'W', score:'85-60', home:true,
  pts:14, reb:5, ast:5, stl:2, blk:0, tov:0,
  fgm:5, fga:12, tpm:0, tpa:4, ftm:4, fta:4, min:41,
},
{ season:'2011-12', type:'regular', date:'2012-02-26',
  opp:'MINN', result:'W', score:'77-68', home:false,
  pts:8, reb:3, ast:4, stl:0, blk:0, tov:2,
  fgm:3, fga:7, tpm:1, tpa:7, ftm:1, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-28',
  opp:'MSU', result:'W', score:'75-70', home:true,
  pts:8, reb:4, ast:3, stl:0, blk:0, tov:1,
  fgm:2, fga:12, tpm:2, tpa:7, ftm:2, fta:2, min:35,
},

// -- MARCH 2012 --
{ season:'2011-12', type:'regular', date:'2012-03-04',
  opp:'PUR', result:'W', score:'82-74', home:true,
  pts:24, reb:4, ast:6, stl:1, blk:1, tov:1,
  fgm:10, fga:12, tpm:2, tpa:8, ftm:2, fta:2, min:36,
},
// Big Ten Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'PUR', result:'W', score:'79-72', home:false,
  pts:11, reb:5, ast:8, stl:2, blk:0, tov:3,
  fgm:4, fga:17, tpm:2, tpa:4, ftm:1, fta:1, min:31,
},
// Big Ten Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-10',
  opp:'OSU', result:'W', score:'75-71', home:false,
  pts:18, reb:3, ast:4, stl:1, blk:0, tov:2,
  fgm:5, fga:12, tpm:5, tpa:5, ftm:3, fta:3, min:31,
},
// Big Ten Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-11',
  opp:'MSU', result:'L', score:'70-74', home:false,
  pts:4, reb:9, ast:3, stl:0, blk:2, tov:5,
  fgm:2, fga:10, tpm:0, tpa:5, ftm:0, fta:4, min:28,
},

/* ─────────── NCAA TOURNAMENT ─────────── */

// ── ROUND OF 64 — (2) Indiana 86, (15) Norfolk State 67 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-16', round:'Round of 64',
  opp:'NORF', result:'W', score:'86-67', home:false,
  pts:20, reb:5, ast:3, stl:2, blk:0, tov:2,
  fgm:7, fga:12, tpm:5, tpa:8, ftm:1, fta:1, min:34,
},

// ── ROUND OF 32 — (2) Indiana 78, (7) Saint Mary's 72 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-18', round:'Round of 32',
  opp:'SMC', result:'W', score:'78-72', home:false,
  pts:18, reb:4, ast:6, stl:1, blk:0, tov:2,
  fgm:6, fga:13, tpm:4, tpa:8, ftm:2, fta:2, min:36,
},

// ── SWEET 16 — (2) Indiana 82, (3) Baylor 77 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-23', round:'Sweet Sixteen',
  opp:'BAY', result:'W', score:'82-77', home:false,
  pts:19, reb:5, ast:3, stl:2, blk:0, tov:2,
  fgm:6, fga:12, tpm:4, tpa:7, ftm:3, fta:4, min:37,
},

// ── ELITE EIGHT — (2) Indiana 79, (1) Syracuse 75 ──
{ season:'2011-12', type:'playoffs', date:'2012-03-25', round:'Elite Eight',
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
{ season:'2011-12', type:'playoffs', date:'2012-03-31', round:'Final Four',
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
{ season:'2011-12', type:'playoffs', date:'2012-04-02', round:'National Championship',
  opp:'LOU', result:'L', score:'72-75', home:false,
  pts:21, reb:4, ast:7, stl:2, blk:0, tov:2,
  fgm:8, fga:15, tpm:4, tpa:8, ftm:1, fta:2, min:39,
},

  ],

};
