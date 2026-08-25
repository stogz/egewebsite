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

/* ─────────── REGULAR SEASON — 34 games, Louisville 30-4 ───────────
   The Big East slate plus non-conference play, ahead of the tournament
   run logged below. Every one of the twelve season averages on Clark's
   2011-12 row in player-stats-26.js reproduces exactly from these games.
   The last three are Big East Tournament games at a neutral site, which
   the schema has no flag for, so they carry home:false like the NCAA
   Tournament entries do.
   ──────────────────────────────────────────────────────────────── */

// ── NOVEMBER 2011 ──
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'UTM', result:'W', score:'89-56', home:true,
  pts:21, reb:5, ast:3, stl:3, blk:1, tov:2,
  fgm:8, fga:15, tpm:0, tpa:2, ftm:5, fta:6, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-11-13',
  opp:'LAM', result:'W', score:'78-57', home:true,
  pts:18, reb:6, ast:2, stl:2, blk:1, tov:1,
  fgm:7, fga:12, tpm:0, tpa:1, ftm:4, fta:5, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'BU', result:'W', score:'69-57', home:false,
  pts:14, reb:4, ast:2, stl:2, blk:0, tov:2,
  fgm:5, fga:13, tpm:1, tpa:5, ftm:3, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-11-22',
  opp:'ARST', result:'W', score:'74-43', home:true,
  pts:15, reb:4, ast:2, stl:2, blk:1, tov:1,
  fgm:5, fga:12, tpm:0, tpa:1, ftm:5, fta:6, min:28,
},
{ season:'2011-12', type:'regular', date:'2011-11-25',
  opp:'OHIO', result:'W', score:'68-60', home:true,
  pts:17, reb:7, ast:2, stl:2, blk:1, tov:2,
  fgm:6, fga:12, tpm:0, tpa:1, ftm:5, fta:6, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-11-28',
  opp:'LBSU', result:'W', score:'82-70', home:true,
  pts:20, reb:5, ast:2, stl:3, blk:1, tov:2,
  fgm:7, fga:14, tpm:1, tpa:2, ftm:5, fta:6, min:34,
},

// ── DECEMBER 2011 ──
{ season:'2011-12', type:'regular', date:'2011-12-02',
  opp:'VANDY', result:'W', score:'71-66', home:true,
  pts:18, reb:6, ast:3, stl:2, blk:1, tov:1,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:4, fta:5, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-07',
  opp:'IUPUI', result:'W', score:'91-61', home:true,
  pts:20, reb:4, ast:3, stl:3, blk:0, tov:2,
  fgm:8, fga:13, tpm:0, tpa:1, ftm:4, fta:5, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'FDU', result:'W', score:'84-59', home:true,
  pts:14, reb:5, ast:1, stl:2, blk:1, tov:1,
  fgm:5, fga:11, tpm:0, tpa:1, ftm:4, fta:5, min:26,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'MEM', result:'W', score:'88-79', home:true,
  pts:27, reb:7, ast:3, stl:2, blk:1, tov:3,
  fgm:11, fga:18, tpm:1, tpa:2, ftm:4, fta:5, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-12-20',
  opp:'COFC', result:'W', score:'75-64', home:true,
  pts:17, reb:5, ast:2, stl:2, blk:1, tov:2,
  fgm:6, fga:12, tpm:0, tpa:1, ftm:5, fta:6, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-12-23',
  opp:'WKU', result:'W', score:'77-59', home:true,
  pts:20, reb:7, ast:2, stl:2, blk:1, tov:2,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:4, fta:5, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-28',
  opp:'GTWN', result:'L', score:'66-70', home:true,
  pts:12, reb:4, ast:1, stl:1, blk:0, tov:4,
  fgm:5, fga:18, tpm:0, tpa:1, ftm:2, fta:4, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'UK', result:'W', score:'76-73', home:false,
  pts:27, reb:8, ast:2, stl:3, blk:1, tov:3,
  fgm:11, fga:19, tpm:1, tpa:2, ftm:4, fta:5, min:38,
},

// ── JANUARY 2012 ──
{ season:'2011-12', type:'regular', date:'2012-01-03',
  opp:'SJU', result:'W', score:'79-65', home:false,
  pts:19, reb:4, ast:2, stl:2, blk:1, tov:2,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:5, fta:6, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-07',
  opp:'ND', result:'W', score:'74-68', home:true,
  pts:17, reb:6, ast:2, stl:2, blk:1, tov:2,
  fgm:6, fga:13, tpm:0, tpa:1, ftm:5, fta:6, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-10',
  opp:'PROV', result:'W', score:'82-69', home:false,
  pts:23, reb:7, ast:2, stl:3, blk:1, tov:3,
  fgm:9, fga:15, tpm:1, tpa:2, ftm:4, fta:5, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-01-14',
  opp:'DEP', result:'W', score:'85-67', home:true,
  pts:26, reb:5, ast:3, stl:2, blk:0, tov:2,
  fgm:10, fga:16, tpm:1, tpa:1, ftm:5, fta:6, min:31,
},
{ season:'2011-12', type:'regular', date:'2012-01-16',
  opp:'MA', result:'L', score:'72-78', home:false,
  pts:22, reb:6, ast:3, stl:2, blk:1, tov:4,
  fgm:8, fga:17, tpm:2, tpa:6, ftm:4, fta:5, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'PITT', result:'W', score:'73-66', home:false,
  pts:18, reb:4, ast:2, stl:2, blk:1, tov:2,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:4, fta:5, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-25',
  opp:'NOVA', result:'W', score:'81-70', home:true,
  pts:20, reb:5, ast:2, stl:2, blk:1, tov:1,
  fgm:8, fga:13, tpm:0, tpa:1, ftm:4, fta:5, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'HALL', result:'W', score:'69-62', home:false,
  pts:16, reb:5, ast:1, stl:2, blk:1, tov:2,
  fgm:6, fga:12, tpm:0, tpa:1, ftm:4, fta:5, min:32,
},

// ── FEBRUARY 2012 ──
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'RUT', result:'W', score:'78-64', home:true,
  pts:19, reb:7, ast:2, stl:3, blk:1, tov:2,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:5, fta:6, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-06',
  opp:'UCONN', result:'W', score:'76-68', home:true,
  pts:21, reb:5, ast:2, stl:3, blk:0, tov:3,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:5, fta:6, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'WVU', result:'W', score:'75-71', home:false,
  pts:18, reb:7, ast:2, stl:2, blk:1, tov:3,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:4, fta:5, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-02-13',
  opp:'SYR', result:'L', score:'64-69', home:true,
  pts:13, reb:4, ast:1, stl:1, blk:0, tov:4,
  fgm:4, fga:15, tpm:0, tpa:1, ftm:5, fta:6, min:38,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'DEP', result:'W', score:'87-76', home:false,
  pts:28, reb:6, ast:3, stl:3, blk:1, tov:3,
  fgm:11, fga:18, tpm:1, tpa:1, ftm:5, fta:6, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-02-23',
  opp:'CIN', result:'W', score:'70-66', home:false,
  pts:27, reb:6, ast:2, stl:2, blk:1, tov:2,
  fgm:11, fga:18, tpm:0, tpa:1, ftm:5, fta:6, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-26',
  opp:'PITT', result:'W', score:'72-63', home:true,
  pts:19, reb:6, ast:2, stl:3, blk:1, tov:2,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:5, fta:6, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-02-29',
  opp:'USF', result:'W', score:'74-65', home:true,
  pts:18, reb:6, ast:2, stl:2, blk:1, tov:2,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:4, fta:5, min:34,
},

// ── MARCH 2012 ──
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'SYR', result:'L', score:'61-68', home:false,
  pts:11, reb:4, ast:1, stl:1, blk:0, tov:4,
  fgm:4, fga:13, tpm:0, tpa:1, ftm:3, fta:4, min:37,
},
// Big East Tournament — neutral site
{ season:'2011-12', type:'regular', date:'2012-03-08',
  opp:'HALL', result:'W', score:'78-65', home:false,
  pts:20, reb:6, ast:3, stl:2, blk:1, tov:2,
  fgm:8, fga:16, tpm:0, tpa:1, ftm:4, fta:5, min:36,
},
// Big East Tournament — neutral site
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'MA', result:'W', score:'76-70', home:false,
  pts:22, reb:5, ast:2, stl:2, blk:1, tov:2,
  fgm:8, fga:15, tpm:1, tpa:2, ftm:5, fta:6, min:37,
},
// Big East Tournament — neutral site
{ season:'2011-12', type:'regular', date:'2012-03-10',
  opp:'CIN', result:'W', score:'72-66', home:false,
  pts:23, reb:6, ast:2, stl:3, blk:1, tov:3,
  fgm:9, fga:21, tpm:0, tpa:1, ftm:5, fta:6, min:38,
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

/* ─────────── REGULAR SEASON — 33 games, Texas 25-8 ───────────
   Non-conference play and the Big 12 slate, ahead of the tournament games
   logged below. The last two are Big 12 Tournament games at a neutral
   site, which the schema has no flag for, so they carry home:false like
   the NCAA Tournament entries do.

   ── ONE ROW DOES NOT RECONCILE ──
   The 2011-12-03 win at UCLA lists 19 PTS on 7/11 FG, 1/3 3PT and 2/3 FT,
   which add to 17. Every field in it is corroborated by a different season
   figure in player-stats-26.js, and they cannot all hold at once:
     PTS 19 is what puts ppg at 15.6    (17 would give 15.5)
     FG 7  is what puts FG-pct at 54.8  (8 would give 55.1)
     3P 1  is what puts 3P-pct at 32.7  (3 would give 36.7)
   So the arithmetic slipped upstream of both this log and that row. It is
   left exactly as supplied, which keeps all three season figures matching;
   correcting PTS to 17 would break ppg instead.
   ─────────────────────────────────────────────────────────── */

// ── NOVEMBER 2011 ──
{ season:'2011-12', type:'regular', date:'2011-11-13',
  opp:'BOSU', result:'W', score:'88-44', home:true,
  pts:16, reb:12, ast:2, stl:0, blk:5, tov:1,
  fgm:7, fga:11, tpm:1, tpa:2, ftm:1, fta:2, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-11-15',
  opp:'URI', result:'W', score:'82-67', home:true,
  pts:13, reb:8, ast:1, stl:1, blk:2, tov:2,
  fgm:6, fga:12, tpm:0, tpa:1, ftm:1, fta:2, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'ORST', result:'L', score:'71-76', home:true,
  pts:11, reb:7, ast:1, stl:1, blk:2, tov:2,
  fgm:4, fga:9, tpm:0, tpa:1, ftm:3, fta:4, min:28,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'NCST', result:'L', score:'69-73', home:true,
  pts:10, reb:8, ast:1, stl:0, blk:2, tov:3,
  fgm:4, fga:10, tpm:0, tpa:1, ftm:2, fta:3, min:27,
},
{ season:'2011-12', type:'regular', date:'2011-11-26',
  opp:'SHSU', result:'W', score:'79-57', home:true,
  pts:17, reb:10, ast:2, stl:1, blk:2, tov:2,
  fgm:6, fga:10, tpm:1, tpa:2, ftm:4, fta:5, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-11-29',
  opp:'UNT', result:'W', score:'75-60', home:true,
  pts:8, reb:6, ast:1, stl:1, blk:2, tov:1,
  fgm:3, fga:8, tpm:0, tpa:1, ftm:2, fta:3, min:24,
},

// ── DECEMBER 2011 ──
// NOTE: source has PTS 19 against 7/11 FG, 1/3 3PT, 2/3 FT, which totals 17.
// Left as supplied — see the header note.
{ season:'2011-12', type:'regular', date:'2011-12-03',
  opp:'UCLA', result:'W', score:'67-62', home:false,
  pts:19, reb:10, ast:2, stl:0, blk:3, tov:2,
  fgm:7, fga:11, tpm:1, tpa:3, ftm:2, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-12-06',
  opp:'UTARL', result:'W', score:'84-62', home:true,
  pts:14, reb:9, ast:1, stl:1, blk:2, tov:1,
  fgm:5, fga:9, tpm:0, tpa:1, ftm:4, fta:5, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'TXST', result:'W', score:'68-55', home:true,
  pts:7, reb:7, ast:1, stl:0, blk:2, tov:3,
  fgm:3, fga:6, tpm:0, tpa:1, ftm:1, fta:2, min:25,
},
{ season:'2011-12', type:'regular', date:'2011-12-13',
  opp:'NICH', result:'W', score:'86-58', home:true,
  pts:16, reb:8, ast:2, stl:1, blk:2, tov:1,
  fgm:6, fga:10, tpm:0, tpa:1, ftm:4, fta:5, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'TEM', result:'W', score:'74-68', home:true,
  pts:20, reb:9, ast:1, stl:1, blk:2, tov:2,
  fgm:8, fga:13, tpm:1, tpa:2, ftm:3, fta:4, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-12-21',
  opp:'UNC', result:'L', score:'72-82', home:false,
  pts:17, reb:11, ast:1, stl:0, blk:4, tov:3,
  fgm:7, fga:13, tpm:0, tpa:0, ftm:3, fta:4, min:36,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'RICE', result:'W', score:'77-61', home:true,
  pts:14, reb:8, ast:1, stl:1, blk:3, tov:1,
  fgm:6, fga:10, tpm:0, tpa:0, ftm:2, fta:3, min:32,
},

// ── JANUARY 2012 ──
{ season:'2011-12', type:'regular', date:'2012-01-04',
  opp:'ISU', result:'W', score:'74-69', home:false,
  pts:15, reb:9, ast:2, stl:1, blk:2, tov:2,
  fgm:6, fga:11, tpm:0, tpa:0, ftm:3, fta:3, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-01-07',
  opp:'OKST', result:'W', score:'77-68', home:true,
  pts:13, reb:8, ast:1, stl:1, blk:2, tov:1,
  fgm:5, fga:10, tpm:0, tpa:0, ftm:3, fta:4, min:30,
},
{ season:'2011-12', type:'regular', date:'2012-01-11',
  opp:'TAMU', result:'W', score:'72-66', home:true,
  pts:16, reb:9, ast:1, stl:1, blk:3, tov:2,
  fgm:6, fga:11, tpm:1, tpa:2, ftm:3, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-14',
  opp:'MIZ', result:'L', score:'70-77', home:false,
  pts:18, reb:10, ast:2, stl:1, blk:2, tov:2,
  fgm:7, fga:13, tpm:0, tpa:0, ftm:4, fta:5, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-18',
  opp:'KSU', result:'L', score:'65-71', home:false,
  pts:11, reb:8, ast:1, stl:1, blk:2, tov:3,
  fgm:5, fga:11, tpm:0, tpa:0, ftm:1, fta:2, min:29,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'KU', result:'W', score:'73-70', home:true,
  pts:21, reb:11, ast:2, stl:1, blk:4, tov:2,
  fgm:8, fga:12, tpm:1, tpa:2, ftm:4, fta:5, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-01-24',
  opp:'ISU', result:'W', score:'79-67', home:true,
  pts:12, reb:7, ast:1, stl:0, blk:2, tov:1,
  fgm:4, fga:8, tpm:0, tpa:0, ftm:4, fta:4, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'BAY', result:'W', score:'80-76', home:false,
  pts:22, reb:10, ast:1, stl:1, blk:4, tov:2,
  fgm:8, fga:14, tpm:3, tpa:5, ftm:3, fta:4, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-30',
  opp:'MIZ', result:'W', score:'76-71', home:true,
  pts:18, reb:9, ast:2, stl:1, blk:3, tov:2,
  fgm:7, fga:12, tpm:1, tpa:2, ftm:3, fta:4, min:34,
},

// ── FEBRUARY 2012 ──
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'TTU', result:'W', score:'82-64', home:true,
  pts:10, reb:6, ast:1, stl:0, blk:2, tov:3,
  fgm:3, fga:7, tpm:0, tpa:1, ftm:4, fta:5, min:25,
},
{ season:'2011-12', type:'regular', date:'2012-02-06',
  opp:'TAMU', result:'W', score:'70-62', home:false,
  pts:17, reb:10, ast:1, stl:1, blk:3, tov:1,
  fgm:6, fga:10, tpm:1, tpa:2, ftm:4, fta:4, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'KSU', result:'W', score:'75-69', home:true,
  pts:15, reb:9, ast:1, stl:1, blk:2, tov:2,
  fgm:6, fga:11, tpm:0, tpa:1, ftm:3, fta:4, min:31,
},
{ season:'2011-12', type:'regular', date:'2012-02-14',
  opp:'OU', result:'W', score:'78-66', home:false,
  pts:19, reb:10, ast:2, stl:1, blk:3, tov:2,
  fgm:7, fga:12, tpm:1, tpa:2, ftm:4, fta:5, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'OKST', result:'W', score:'80-72', home:false,
  pts:14, reb:8, ast:1, stl:1, blk:2, tov:2,
  fgm:5, fga:10, tpm:0, tpa:1, ftm:4, fta:4, min:29,
},
{ season:'2011-12', type:'regular', date:'2012-02-20',
  opp:'BAY', result:'L', score:'73-81', home:false,
  pts:20, reb:12, ast:3, stl:1, blk:3, tov:2,
  fgm:8, fga:15, tpm:1, tpa:2, ftm:3, fta:4, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-02-25',
  opp:'TTU', result:'W', score:'77-61', home:false,
  pts:16, reb:9, ast:1, stl:1, blk:2, tov:1,
  fgm:6, fga:10, tpm:1, tpa:3, ftm:3, fta:4, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-02-29',
  opp:'OU', result:'W', score:'83-70', home:true,
  pts:21, reb:10, ast:2, stl:1, blk:2, tov:2,
  fgm:8, fga:13, tpm:1, tpa:3, ftm:4, fta:5, min:35,
},

// ── MARCH 2012 ──
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'KU', result:'L', score:'68-75', home:false,
  pts:18, reb:12, ast:1, stl:1, blk:3, tov:3,
  fgm:7, fga:14, tpm:0, tpa:2, ftm:4, fta:5, min:37,
},
// Big 12 Tournament — neutral site
{ season:'2011-12', type:'regular', date:'2012-03-08',
  opp:'ISU', result:'W', score:'75-69', home:false,
  pts:17, reb:10, ast:2, stl:1, blk:2, tov:2,
  fgm:6, fga:11, tpm:1, tpa:3, ftm:4, fta:5, min:35,
},
// Big 12 Tournament — neutral site
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'KU', result:'L', score:'71-76', home:false,
  pts:20, reb:10, ast:1, stl:1, blk:2, tov:2,
  fgm:8, fga:14, tpm:0, tpa:2, ftm:4, fta:5, min:36,
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

/* ─────────── REGULAR SEASON — 33 games, Butler 26-7 ───────────
   Non-conference play and the Horizon League slate, ahead of the
   tournament games logged below. Eleven of the twelve season averages on
   Sam's 2011-12 row in player-stats-26.js reproduce exactly from these
   games; see the note on tpa in that file's row.
   The 2011-11-19 loss to Louisville is the same game as the win in
   Clark's log — same date, mirrored score and home/away.
   ──────────────────────────────────────────────────────────── */

// ── NOVEMBER 2011 ──
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'EVAN', result:'W', score:'74-61', home:false,
  pts:13, reb:11, ast:8, stl:2, blk:2, tov:3,
  fgm:6, fga:10, tpm:0, tpa:0, ftm:1, fta:1, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-11-15',
  opp:'CHAT', result:'W', score:'72-58', home:true,
  pts:17, reb:6, ast:6, stl:1, blk:1, tov:2,
  fgm:6, fga:14, tpm:0, tpa:1, ftm:5, fta:6, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'LOU', result:'L', score:'57-69', home:true,
  pts:19, reb:8, ast:5, stl:1, blk:1, tov:3,
  fgm:8, fga:12, tpm:0, tpa:0, ftm:3, fta:4, min:36,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'SAV', result:'W', score:'68-48', home:true,
  pts:11, reb:6, ast:7, stl:2, blk:1, tov:3,
  fgm:4, fga:13, tpm:0, tpa:1, ftm:3, fta:4, min:29,
},
{ season:'2011-12', type:'regular', date:'2011-11-23',
  opp:'GWEB', result:'W', score:'73-61', home:true,
  pts:20, reb:8, ast:5, stl:2, blk:2, tov:3,
  fgm:7, fga:12, tpm:1, tpa:1, ftm:5, fta:6, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-11-27',
  opp:'IU', result:'L', score:'74-78', home:false,
  pts:24, reb:10, ast:7, stl:2, blk:2, tov:4,
  fgm:9, fga:14, tpm:0, tpa:1, ftm:6, fta:8, min:39,
},
{ season:'2011-12', type:'regular', date:'2011-11-29',
  opp:'OAKC', result:'W', score:'91-55', home:true,
  pts:15, reb:6, ast:5, stl:1, blk:0, tov:2,
  fgm:5, fga:10, tpm:0, tpa:0, ftm:5, fta:6, min:27,
},

// ── DECEMBER 2011 ──
{ season:'2011-12', type:'regular', date:'2011-12-03',
  opp:'VALPO', result:'W', score:'69-62', home:true,
  pts:22, reb:8, ast:5, stl:2, blk:2, tov:3,
  fgm:9, fga:15, tpm:0, tpa:1, ftm:4, fta:5, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-12-07',
  opp:'XAV', result:'L', score:'64-71', home:true,
  pts:22, reb:8, ast:6, stl:2, blk:1, tov:3,
  fgm:9, fga:16, tpm:0, tpa:1, ftm:4, fta:6, min:36,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'BALL', result:'W', score:'62-56', home:false,
  pts:12, reb:7, ast:5, stl:1, blk:0, tov:3,
  fgm:5, fga:15, tpm:0, tpa:1, ftm:2, fta:3, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'PUR', result:'W', score:'69-65', home:false,
  pts:23, reb:8, ast:6, stl:2, blk:2, tov:3,
  fgm:9, fga:14, tpm:1, tpa:2, ftm:4, fta:5, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-12-20',
  opp:'GONZ', result:'L', score:'61-72', home:false,
  pts:16, reb:7, ast:5, stl:1, blk:1, tov:3,
  fgm:6, fga:15, tpm:0, tpa:0, ftm:4, fta:5, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-12-22',
  opp:'STAN', result:'W', score:'68-64', home:false,
  pts:21, reb:10, ast:7, stl:2, blk:2, tov:4,
  fgm:8, fga:13, tpm:0, tpa:1, ftm:5, fta:7, min:38,
},
{ season:'2011-12', type:'regular', date:'2011-12-29',
  opp:'GB', result:'W', score:'70-58', home:true,
  pts:20, reb:8, ast:5, stl:2, blk:1, tov:2,
  fgm:8, fga:14, tpm:0, tpa:0, ftm:4, fta:5, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'UWM', result:'W', score:'66-57', home:true,
  pts:19, reb:7, ast:6, stl:1, blk:1, tov:3,
  fgm:7, fga:13, tpm:0, tpa:1, ftm:5, fta:6, min:34,
},

// ── JANUARY 2012 ──
{ season:'2011-12', type:'regular', date:'2012-01-06',
  opp:'WRST', result:'W', score:'65-59', home:false,
  pts:21, reb:6, ast:7, stl:2, blk:1, tov:3,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:5, fta:6, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-08',
  opp:'UDM', result:'L', score:'67-72', home:false,
  pts:25, reb:9, ast:7, stl:2, blk:2, tov:5,
  fgm:8, fga:15, tpm:1, tpa:1, ftm:8, fta:10, min:39,
},
{ season:'2011-12', type:'regular', date:'2012-01-13',
  opp:'CLST', result:'L', score:'63-68', home:true,
  pts:18, reb:8, ast:7, stl:1, blk:1, tov:3,
  fgm:7, fga:16, tpm:0, tpa:1, ftm:4, fta:5, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-01-15',
  opp:'YSU', result:'W', score:'76-60', home:true,
  pts:22, reb:10, ast:7, stl:2, blk:2, tov:3,
  fgm:9, fga:15, tpm:0, tpa:0, ftm:4, fta:5, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-19',
  opp:'UIC', result:'W', score:'71-57', home:false,
  pts:17, reb:6, ast:7, stl:1, blk:1, tov:4,
  fgm:6, fga:14, tpm:0, tpa:1, ftm:5, fta:6, min:31,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'LUC', result:'W', score:'67-54', home:false,
  pts:20, reb:7, ast:5, stl:2, blk:1, tov:2,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:4, fta:5, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-26',
  opp:'UWM', result:'W', score:'69-63', home:false,
  pts:21, reb:8, ast:6, stl:1, blk:1, tov:3,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:5, fta:6, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'GB', result:'W', score:'72-66', home:false,
  pts:24, reb:9, ast:7, stl:2, blk:2, tov:3,
  fgm:9, fga:15, tpm:1, tpa:1, ftm:5, fta:6, min:36,
},

// ── FEBRUARY 2012 ──
{ season:'2011-12', type:'regular', date:'2012-02-02',
  opp:'WRST', result:'W', score:'74-59', home:true,
  pts:16, reb:6, ast:5, stl:1, blk:1, tov:4,
  fgm:6, fga:13, tpm:0, tpa:0, ftm:4, fta:6, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'UDM', result:'W', score:'73-68', home:true,
  pts:23, reb:8, ast:6, stl:3, blk:1, tov:3,
  fgm:9, fga:15, tpm:0, tpa:1, ftm:5, fta:7, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-09',
  opp:'YSU', result:'W', score:'78-63', home:false,
  pts:22, reb:9, ast:7, stl:2, blk:1, tov:3,
  fgm:9, fga:15, tpm:0, tpa:0, ftm:4, fta:5, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'CLST', result:'W', score:'70-66', home:false,
  pts:24, reb:9, ast:8, stl:2, blk:2, tov:3,
  fgm:9, fga:14, tpm:0, tpa:1, ftm:6, fta:8, min:39,
},
{ season:'2011-12', type:'regular', date:'2012-02-14',
  opp:'LUC', result:'W', score:'75-56', home:true,
  pts:20, reb:8, ast:6, stl:1, blk:1, tov:2,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:4, fta:5, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'INST', result:'W', score:'77-64', home:true,
  pts:23, reb:10, ast:7, stl:2, blk:2, tov:3,
  fgm:8, fga:13, tpm:1, tpa:2, ftm:6, fta:8, min:38,
},
{ season:'2011-12', type:'regular', date:'2012-02-21',
  opp:'UIC', result:'W', score:'80-58', home:true,
  pts:21, reb:8, ast:6, stl:1, blk:1, tov:2,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:5, fta:6, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-02-24',
  opp:'VALPO', result:'L', score:'64-69', home:false,
  pts:14, reb:8, ast:6, stl:1, blk:1, tov:3,
  fgm:5, fga:15, tpm:0, tpa:0, ftm:4, fta:5, min:39,
},

// ── MARCH 2012 ──
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'UWM', result:'W', score:'74-62', home:true,
  pts:20, reb:9, ast:7, stl:2, blk:1, tov:3,
  fgm:8, fga:14, tpm:0, tpa:1, ftm:4, fta:5, min:38,
},
{ season:'2011-12', type:'regular', date:'2012-03-06',
  opp:'UDM', result:'W', score:'71-67', home:true,
  pts:22, reb:11, ast:6, stl:1, blk:2, tov:3,
  fgm:9, fga:15, tpm:0, tpa:1, ftm:4, fta:5, min:39,
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

/* ─────────── REGULAR SEASON — 33 games, Marquette 26-7 ───────────
   Non-conference play and the Big East slate, ahead of the tournament
   games logged below. The last two are Big East Tournament games at a
   neutral site, which the schema has no flag for, so they carry
   home:false like the NCAA Tournament entries do.

   Both Louisville games are the same games as entries in Clark's log —
   2012-01-16 and 2012-03-09, mirrored score and result each time. The
   third such agreement between independently supplied logs.

   ── THREE SEASON FIGURES DIFFER ──
   Nine of the twelve averages on Stewart's row in player-stats-26.js
   reproduce exactly from these games. Three do not:
     apg  log 59 assists / 33 = 1.8   row says 1.3 (16 assists apart)
     ftp  log 70/100 = 70.0           row says 70.4 (that is 69/98)
     tpa  log 14 attempts / 33 = 0.4  row says 0.2
   tpa looks wrong in the row: 3P-pct there reads 21.4, which is exactly
   3/14, so 14 attempts is what produced it. Left exactly as supplied.
   ─────────────────────────────────────────────────────────────── */

// -- NOVEMBER 2011 --
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'MSM', result:'W', score:'83-57', home:true,
  pts:12, reb:10, ast:3, stl:4, blk:3, tov:1,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:2, fta:4, min:32,
},
{ season:'2011-12', type:'regular', date:'2011-11-14',
  opp:'NORF', result:'W', score:'78-61', home:true,
  pts:8, reb:6, ast:1, stl:2, blk:1, tov:2,
  fgm:4, fga:6, tpm:0, tpa:0, ftm:0, fta:1, min:28,
},
{ season:'2011-12', type:'regular', date:'2011-11-18',
  opp:'WIN', result:'W', score:'81-60', home:true,
  pts:11, reb:9, ast:2, stl:2, blk:2, tov:1,
  fgm:4, fga:6, tpm:0, tpa:0, ftm:3, fta:4, min:30,
},
{ season:'2011-12', type:'regular', date:'2011-11-20',
  opp:'MISS', result:'W', score:'74-66', home:true,
  pts:9, reb:8, ast:1, stl:1, blk:1, tov:2,
  fgm:4, fga:6, tpm:0, tpa:0, ftm:1, fta:2, min:29,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'NORF', result:'W', score:'79-63', home:true,
  pts:13, reb:8, ast:2, stl:2, blk:2, tov:1,
  fgm:5, fga:8, tpm:0, tpa:1, ftm:3, fta:4, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-11-28',
  opp:'JAX', result:'W', score:'86-62', home:true,
  pts:12, reb:9, ast:2, stl:2, blk:2, tov:2,
  fgm:5, fga:7, tpm:0, tpa:0, ftm:2, fta:3, min:32,
},

// -- DECEMBER 2011 --
{ season:'2011-12', type:'regular', date:'2011-12-03',
  opp:'WIS', result:'W', score:'64-59', home:false,
  pts:10, reb:12, ast:3, stl:2, blk:1, tov:2,
  fgm:4, fga:8, tpm:0, tpa:0, ftm:2, fta:4, min:24,
},
{ season:'2011-12', type:'regular', date:'2011-12-06',
  opp:'WASH', result:'W', score:'79-72', home:true,
  pts:12, reb:8, ast:2, stl:3, blk:2, tov:1,
  fgm:5, fga:9, tpm:0, tpa:0, ftm:2, fta:2, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'GB', result:'W', score:'77-60', home:true,
  pts:7, reb:6, ast:1, stl:2, blk:1, tov:2,
  fgm:3, fga:5, tpm:0, tpa:0, ftm:1, fta:2, min:27,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'UNCO', result:'W', score:'82-58', home:true,
  pts:13, reb:10, ast:2, stl:2, blk:3, tov:1,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:3, fta:4, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-12-19',
  opp:'LSU', result:'L', score:'68-72', home:false,
  pts:13, reb:9, ast:2, stl:2, blk:2, tov:3,
  fgm:5, fga:10, tpm:0, tpa:1, ftm:3, fta:4, min:35,
},
{ season:'2011-12', type:'regular', date:'2011-12-22',
  opp:'UWM', result:'W', score:'76-63', home:true,
  pts:10, reb:8, ast:1, stl:2, blk:1, tov:2,
  fgm:4, fga:6, tpm:0, tpa:0, ftm:2, fta:3, min:29,
},
{ season:'2011-12', type:'regular', date:'2011-12-29',
  opp:'VANDY', result:'L', score:'66-71', home:true,
  pts:9, reb:7, ast:1, stl:2, blk:1, tov:2,
  fgm:4, fga:8, tpm:0, tpa:1, ftm:1, fta:2, min:30,
},

// -- JANUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-01-01',
  opp:'NOVA', result:'W', score:'81-70', home:true,
  pts:13, reb:9, ast:2, stl:3, blk:2, tov:1,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:3, fta:4, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-01-04',
  opp:'GTWN', result:'L', score:'65-73', home:false,
  pts:8, reb:8, ast:1, stl:2, blk:1, tov:2,
  fgm:4, fga:9, tpm:0, tpa:1, ftm:0, fta:1, min:31,
},
{ season:'2011-12', type:'regular', date:'2012-01-07',
  opp:'SYR', result:'L', score:'69-75', home:false,
  pts:13, reb:7, ast:2, stl:3, blk:1, tov:2,
  fgm:5, fga:11, tpm:1, tpa:3, ftm:2, fta:2, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-11',
  opp:'SJU', result:'W', score:'82-68', home:true,
  pts:11, reb:10, ast:2, stl:2, blk:2, tov:1,
  fgm:4, fga:7, tpm:0, tpa:0, ftm:3, fta:4, min:30,
},
{ season:'2011-12', type:'regular', date:'2012-01-14',
  opp:'PITT', result:'W', score:'77-65', home:true,
  pts:12, reb:8, ast:1, stl:2, blk:2, tov:2,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:2, fta:3, min:32,
},
// Same game as Clark's 2012-01-16 entry - see his log
{ season:'2011-12', type:'regular', date:'2012-01-16',
  opp:'LOU', result:'W', score:'78-72', home:true,
  pts:18, reb:10, ast:4, stl:2, blk:2, tov:2,
  fgm:7, fga:13, tpm:1, tpa:3, ftm:3, fta:4, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-01-21',
  opp:'PROV', result:'W', score:'74-67', home:false,
  pts:10, reb:9, ast:2, stl:2, blk:2, tov:1,
  fgm:4, fga:7, tpm:0, tpa:1, ftm:2, fta:3, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-24',
  opp:'USF', result:'W', score:'72-61', home:true,
  pts:9, reb:6, ast:1, stl:1, blk:1, tov:2,
  fgm:3, fga:5, tpm:0, tpa:0, ftm:3, fta:4, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-01-28',
  opp:'NOVA', result:'W', score:'79-70', home:false,
  pts:14, reb:9, ast:2, stl:3, blk:2, tov:1,
  fgm:6, fga:8, tpm:0, tpa:0, ftm:2, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-31',
  opp:'HALL', result:'W', score:'75-66', home:true,
  pts:12, reb:8, ast:2, stl:2, blk:2, tov:2,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:2, fta:3, min:32,
},

// -- FEBRUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'ND', result:'L', score:'64-70', home:false,
  pts:10, reb:10, ast:1, stl:2, blk:2, tov:2,
  fgm:4, fga:8, tpm:0, tpa:1, ftm:2, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-06',
  opp:'DEP', result:'W', score:'80-65', home:false,
  pts:7, reb:5, ast:1, stl:1, blk:1, tov:2,
  fgm:3, fga:5, tpm:0, tpa:0, ftm:1, fta:2, min:26,
},
{ season:'2011-12', type:'regular', date:'2012-02-11',
  opp:'CIN', result:'W', score:'73-66', home:true,
  pts:13, reb:8, ast:2, stl:2, blk:2, tov:1,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:3, fta:4, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-02-18',
  opp:'UCONN', result:'W', score:'76-69', home:false,
  pts:13, reb:11, ast:2, stl:4, blk:3, tov:2,
  fgm:5, fga:8, tpm:0, tpa:0, ftm:3, fta:4, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-22',
  opp:'RUT', result:'W', score:'78-64', home:true,
  pts:8, reb:7, ast:1, stl:2, blk:1, tov:2,
  fgm:3, fga:5, tpm:0, tpa:0, ftm:2, fta:3, min:28,
},
{ season:'2011-12', type:'regular', date:'2012-02-24',
  opp:'WVU', result:'W', score:'71-67', home:false,
  pts:14, reb:9, ast:2, stl:3, blk:3, tov:1,
  fgm:6, fga:9, tpm:0, tpa:0, ftm:2, fta:3, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-29',
  opp:'CIN', result:'L', score:'65-70', home:false,
  pts:12, reb:8, ast:1, stl:2, blk:1, tov:3,
  fgm:5, fga:10, tpm:0, tpa:1, ftm:2, fta:3, min:33,
},

// -- MARCH 2012 --
{ season:'2011-12', type:'regular', date:'2012-03-03',
  opp:'GTWN', result:'W', score:'76-69', home:true,
  pts:17, reb:11, ast:2, stl:3, blk:3, tov:2,
  fgm:7, fga:10, tpm:1, tpa:1, ftm:2, fta:2, min:35,
},
// Big East Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-08',
  opp:'GTWN', result:'W', score:'74-68', home:false,
  pts:11, reb:9, ast:3, stl:2, blk:2, tov:1,
  fgm:4, fga:7, tpm:0, tpa:0, ftm:3, fta:3, min:34,
},
// Big East Tournament - neutral site
// Same game as Clark's 2012-03-09 entry - see his log
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'LOU', result:'L', score:'70-76', home:false,
  pts:15, reb:8, ast:2, stl:2, blk:2, tov:2,
  fgm:6, fga:10, tpm:0, tpa:0, ftm:3, fta:3, min:36,
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

/* ─────────── REGULAR SEASON — 34 games, Indiana 28-6 ───────────
   Non-conference play and the Big Ten slate, ahead of the tournament run
   logged below. The last three are Big Ten Tournament games at a neutral
   site, which the schema has no flag for, so they carry home:false like
   the NCAA Tournament entries do.

   Indiana's 2011-11-27 win over Butler is the same game as the loss in
   Stogsdill's log: same date, mirrored score, opposite result and home
   flag. The two logs agree without having been written together.

   ── THREE SEASON FIGURES RUN HIGH ──
   Nine of the twelve averages on Vitel's row in player-stats-26.js
   reproduce exactly from these games, including all four shooting
   figures. Three do not, and the gaps are larger than a rounding choice:
     ppg  log 578 pts / 34 = 17.0    row says 16.9
     rpg  log 150 reb / 34 =  4.4    row says  4.3
     mpg  log 1159 min / 34 = 34.1   row says 33.8  (~10 minutes apart)
   Left exactly as supplied. The shooting totals are what the row's own
   percentages were computed from, so the per-game data looks sound and
   the row appears to predate it.
   ────────────────────────────────────────────────────────────── */

// -- NOVEMBER 2011 --
{ season:'2011-12', type:'regular', date:'2011-11-11',
  opp:'SBU', result:'W', score:'94-68', home:true,
  pts:18, reb:6, ast:8, stl:3, blk:0, tov:2,
  fgm:6, fga:11, tpm:4, tpa:7, ftm:2, fta:2, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-11-13',
  opp:'CHAT', result:'W', score:'82-61', home:true,
  pts:15, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:5, fga:10, tpm:2, tpa:5, ftm:3, fta:4, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-11-16',
  opp:'EVAN', result:'W', score:'78-64', home:false,
  pts:16, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:6, fga:12, tpm:2, tpa:5, ftm:2, fta:2, min:33,
},
{ season:'2011-12', type:'regular', date:'2011-11-19',
  opp:'SAV', result:'W', score:'88-56', home:true,
  pts:13, reb:5, ast:5, stl:1, blk:1, tov:2,
  fgm:4, fga:10, tpm:2, tpa:5, ftm:3, fta:4, min:29,
},
{ season:'2011-12', type:'regular', date:'2011-11-21',
  opp:'GWEB', result:'W', score:'84-62', home:true,
  pts:17, reb:4, ast:3, stl:2, blk:0, tov:2,
  fgm:6, fga:11, tpm:3, tpa:6, ftm:2, fta:2, min:32,
},
// Same game as Stogsdill's 2011-11-27 loss - see his log
{ season:'2011-12', type:'regular', date:'2011-11-27',
  opp:'BU', result:'W', score:'78-74', home:true,
  pts:14, reb:3, ast:3, stl:1, blk:0, tov:3,
  fgm:6, fga:13, tpm:0, tpa:4, ftm:2, fta:3, min:36,
},
{ season:'2011-12', type:'regular', date:'2011-11-30',
  opp:'NCST', result:'W', score:'81-76', home:false,
  pts:21, reb:6, ast:4, stl:2, blk:1, tov:2,
  fgm:7, fga:13, tpm:3, tpa:6, ftm:4, fta:5, min:36,
},

// -- DECEMBER 2011 --
{ season:'2011-12', type:'regular', date:'2011-12-04',
  opp:'STET', result:'W', score:'86-59', home:true,
  pts:12, reb:4, ast:4, stl:2, blk:0, tov:1,
  fgm:4, fga:10, tpm:2, tpa:5, ftm:2, fta:2, min:28,
},
{ season:'2011-12', type:'regular', date:'2011-12-10',
  opp:'UK', result:'W', score:'76-73', home:true,
  pts:19, reb:6, ast:6, stl:2, blk:0, tov:2,
  fgm:7, fga:14, tpm:3, tpa:6, ftm:2, fta:2, min:37,
},
{ season:'2011-12', type:'regular', date:'2011-12-17',
  opp:'ND', result:'W', score:'80-71', home:true,
  pts:18, reb:4, ast:4, stl:2, blk:1, tov:2,
  fgm:5, fga:11, tpm:3, tpa:6, ftm:5, fta:6, min:34,
},
{ season:'2011-12', type:'regular', date:'2011-12-19',
  opp:'HOW', result:'W', score:'89-63', home:true,
  pts:20, reb:5, ast:5, stl:2, blk:0, tov:2,
  fgm:7, fga:11, tpm:3, tpa:6, ftm:3, fta:3, min:31,
},
{ season:'2011-12', type:'regular', date:'2011-12-22',
  opp:'UMBC', result:'W', score:'77-58', home:true,
  pts:11, reb:3, ast:3, stl:1, blk:0, tov:3,
  fgm:4, fga:11, tpm:0, tpa:5, ftm:3, fta:4, min:25,
},
{ season:'2011-12', type:'regular', date:'2011-12-28',
  opp:'MSU', result:'L', score:'69-75', home:false,
  pts:13, reb:4, ast:3, stl:1, blk:0, tov:3,
  fgm:5, fga:12, tpm:1, tpa:6, ftm:2, fta:3, min:36,
},
{ season:'2011-12', type:'regular', date:'2011-12-31',
  opp:'OSU', result:'W', score:'78-74', home:true,
  pts:22, reb:5, ast:4, stl:3, blk:1, tov:2,
  fgm:7, fga:13, tpm:4, tpa:7, ftm:4, fta:4, min:39,
},

// -- JANUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-01-05',
  opp:'MICH', result:'W', score:'76-70', home:true,
  pts:16, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:6, fga:12, tpm:2, tpa:5, ftm:2, fta:2, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-01-08',
  opp:'PSU', result:'W', score:'73-64', home:false,
  pts:17, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:6, fga:13, tpm:2, tpa:5, ftm:3, fta:3, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-12',
  opp:'MINN', result:'L', score:'68-72', home:true,
  pts:12, reb:3, ast:3, stl:1, blk:0, tov:3,
  fgm:5, fga:12, tpm:0, tpa:4, ftm:2, fta:3, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-01-15',
  opp:'OSU', result:'L', score:'71-77', home:false,
  pts:18, reb:5, ast:4, stl:2, blk:0, tov:3,
  fgm:6, fga:13, tpm:3, tpa:6, ftm:3, fta:4, min:37,
},
{ season:'2011-12', type:'regular', date:'2012-01-18',
  opp:'NEB', result:'W', score:'74-62', home:false,
  pts:15, reb:4, ast:4, stl:2, blk:1, tov:2,
  fgm:5, fga:12, tpm:2, tpa:5, ftm:3, fta:3, min:32,
},
{ season:'2011-12', type:'regular', date:'2012-01-22',
  opp:'PSU', result:'W', score:'82-66', home:true,
  pts:20, reb:5, ast:4, stl:2, blk:0, tov:2,
  fgm:6, fga:12, tpm:3, tpa:6, ftm:5, fta:5, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-01-26',
  opp:'WIS', result:'L', score:'65-70', home:false,
  pts:14, reb:4, ast:3, stl:1, blk:0, tov:3,
  fgm:5, fga:13, tpm:2, tpa:5, ftm:2, fta:3, min:36,
},
{ season:'2011-12', type:'regular', date:'2012-01-29',
  opp:'IOWA', result:'W', score:'83-72', home:true,
  pts:22, reb:5, ast:4, stl:2, blk:1, tov:2,
  fgm:7, fga:13, tpm:3, tpa:6, ftm:5, fta:5, min:35,
},

// -- FEBRUARY 2012 --
{ season:'2011-12', type:'regular', date:'2012-02-01',
  opp:'MICH', result:'L', score:'72-76', home:false,
  pts:19, reb:5, ast:4, stl:2, blk:0, tov:3,
  fgm:6, fga:13, tpm:3, tpa:6, ftm:4, fta:5, min:38,
},
{ season:'2011-12', type:'regular', date:'2012-02-04',
  opp:'PUR', result:'W', score:'79-73', home:false,
  pts:16, reb:4, ast:4, stl:2, blk:1, tov:2,
  fgm:6, fga:11, tpm:2, tpa:5, ftm:2, fta:2, min:33,
},
{ season:'2011-12', type:'regular', date:'2012-02-09',
  opp:'ILL', result:'W', score:'81-69', home:true,
  pts:17, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:6, fga:14, tpm:3, tpa:6, ftm:2, fta:2, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-15',
  opp:'NW', result:'W', score:'70-64', home:true,
  pts:10, reb:3, ast:3, stl:1, blk:0, tov:3,
  fgm:4, fga:11, tpm:0, tpa:5, ftm:2, fta:3, min:27,
},
{ season:'2011-12', type:'regular', date:'2012-02-19',
  opp:'IOWA', result:'W', score:'84-74', home:false,
  pts:21, reb:5, ast:4, stl:2, blk:1, tov:2,
  fgm:7, fga:14, tpm:3, tpa:6, ftm:4, fta:4, min:35,
},
{ season:'2011-12', type:'regular', date:'2012-02-22',
  opp:'NCCU', result:'W', score:'85-60', home:true,
  pts:15, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:5, fga:12, tpm:2, tpa:5, ftm:3, fta:4, min:31,
},
{ season:'2011-12', type:'regular', date:'2012-02-26',
  opp:'MINN', result:'W', score:'77-68', home:false,
  pts:17, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:6, fga:12, tpm:3, tpa:6, ftm:2, fta:2, min:34,
},
{ season:'2011-12', type:'regular', date:'2012-02-28',
  opp:'MSU', result:'W', score:'75-70', home:true,
  pts:21, reb:5, ast:5, stl:2, blk:1, tov:2,
  fgm:6, fga:13, tpm:4, tpa:7, ftm:5, fta:5, min:37,
},

// -- MARCH 2012 --
{ season:'2011-12', type:'regular', date:'2012-03-04',
  opp:'PUR', result:'W', score:'82-74', home:true,
  pts:22, reb:6, ast:4, stl:1, blk:0, tov:2,
  fgm:8, fga:14, tpm:4, tpa:7, ftm:2, fta:3, min:39,
},
// Big Ten Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-09',
  opp:'PUR', result:'W', score:'79-72', home:false,
  pts:18, reb:4, ast:4, stl:2, blk:0, tov:2,
  fgm:7, fga:11, tpm:2, tpa:5, ftm:2, fta:3, min:36,
},
// Big Ten Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-10',
  opp:'OSU', result:'W', score:'75-71', home:false,
  pts:22, reb:5, ast:5, stl:2, blk:1, tov:2,
  fgm:7, fga:13, tpm:3, tpa:6, ftm:5, fta:5, min:38,
},
// Big Ten Tournament - neutral site
{ season:'2011-12', type:'regular', date:'2012-03-11',
  opp:'MSU', result:'L', score:'70-74', home:false,
  pts:17, reb:4, ast:4, stl:1, blk:0, tov:2,
  fgm:6, fga:14, tpm:2, tpa:5, ftm:3, fta:4, min:39,
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
