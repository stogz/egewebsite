/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION · PLAYER PERFORMANCE LOGS
   player-games.js — Individual performance statlines for EGE players

   Each entry contains:
   {
     season:  '20XX-XX',              // season string (e.g. '2033-34')
     type:    'regular'|'playoffs',   // game type
     opp:     'ABBR',                 // opponent abbreviation e.g. 'LAL', 'GSW'
     result:  'W'|'L',               // win or loss
     score:   '110-105',             // final score (your score first)
     home:    true|false,            // true = home game
     game:    1,                     // PLAYOFFS ONLY — which game of the series (1-7)

     pts:  0,   // points
     reb:  0,   // total rebounds
     ast:  0,   // assists
     stl:  0,   // steals
     blk:  0,   // blocks
     tov:  0,   // turnovers
     fgm:  0,   // field goals made
     fga:  0,   // field goal attempts
     tpm:  0,   // three-pointers made
     tpa:  0,   // three-point attempts
     ftm:  0,   // free throws made
     fta:  0,   // free throw attempts
     min:  0,   // minutes played
   }

   Example regular season entry:
   {
     season:'2033-34', type:'regular',
     opp:'LAL', result:'W', score:'118-104', home:true,
     pts:28, reb:9, ast:4, stl:1, blk:2, tov:2,
     fgm:10, fga:18, tpm:2, tpa:5, ftm:6, fta:7, min:36,
   }

   Example playoff entry:
   {
     season:'2033-34', type:'playoffs', game:3,
     opp:'GSW', result:'W', score:'130-115', home:true,
     pts:39, reb:1, ast:13, stl:1, blk:0, tov:2,
     fgm:14, fga:19, tpm:8, tpa:11, ftm:3, fta:3, min:37,
   }
   ═══════════════════════════════════════════════════════════════ */

window.PLAYER_GAMES = {

  /* ────────────────────────────────────────
     PAXON HATCH
  ──────────────────────────────────────── */
  hatch: [
    // Add entries here
  ],

  /* ────────────────────────────────────────
     COOPER CLARK
  ──────────────────────────────────────── */
  clark: [
    {
      season:'2033-34', type:'playoffs', game:1,
      opp:'GSW', result:'W', score:'135-111', home:false,
      pts:29, reb:1, ast:13, stl:1, blk:0, tov:3,
      fgm:9, fga:11, tpm:4, tpa:6, ftm:7, fta:7, min:33,
    },
    {
      season:'2033-34', type:'playoffs', game:2,
      opp:'GSW', result:'W', score:'143-103', home:false,
      pts:29, reb:5, ast:19, stl:3, blk:0, tov:3,
      fgm:10, fga:18, tpm:4, tpa:9, ftm:5, fta:5, min:38,
    },
    {
      season:'2033-34', type:'playoffs', game:3,
      opp:'GSW', result:'W', score:'130-115', home:true,
      pts:39, reb:1, ast:13, stl:1, blk:0, tov:4,
      fgm:14, fga:19, tpm:8, tpa:11, ftm:3, fta:3, min:37,
    },
    {
      season:'2033-34', type:'playoffs', game:4,
      opp:'GSW', result:'W', score:'130-117', home:true,
      pts:37, reb:1, ast:6, stl:2, blk:2, tov:0,
      fgm:10, fga:18, tpm:7, tpa:10, ftm:10, fta:11, min:37,
    },
  ],

  /* ────────────────────────────────────────
     SAM STOGSDILL
  ──────────────────────────────────────── */
  stogsdill: [
    // Add entries here
  ],

  /* ────────────────────────────────────────
     JAYKEB STEWART
  ──────────────────────────────────────── */
  stewart: [
    // Add entries here
  ],

  /* ────────────────────────────────────────
     ISAAC VITEL
  ──────────────────────────────────────── */
  vitel: [
    // Add entries here
  ],

};
