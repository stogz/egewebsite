/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION · PLAYER GAME LOGS
   player-games.js — Individual game statlines for EGE players

   Each game entry contains:
   {
     date:    'YYYY-MM-DD',      // game date
     season:  '20XX-XX',         // season string (e.g. '2033-34')
     type:    'regular'|'playoffs', // game type
     opp:     'Team Abbr',       // opponent abbreviation
     result:  'W'|'L',           // win or loss
     score:   '110-105',         // final score (team score first)
     home:    true|false,        // true = home game

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
   ═══════════════════════════════════════════════════════════════ */

window.PLAYER_GAMES = {

  /* ────────────────────────────────────────
     PAXON HATCH
  ──────────────────────────────────────── */
  hatch: [
    // Add game entries here. Example format:
    // {
    //   date:'2033-10-22', season:'2033-34', type:'regular',
    //   opp:'LAL', result:'W', score:'118-104', home:true,
    //   pts:28, reb:9, ast:4, stl:1, blk:2, tov:2,
    //   fgm:10, fga:18, tpm:2, tpa:5, ftm:6, fta:7, min:36,
    // },
  ],

  /* ────────────────────────────────────────
     COOPER CLARK
  ──────────────────────────────────────── */
  clark: [
    {
      date:"2034-5-2", season:'2033-34', type:'playoffs',
      opp:'GSW', result: 'W', score:'130-115', home:true,
      pts:39, reb:1, ast:13, stl:1, blk:0, tov:2,
      fgm:14, fga:19, tpm:8, tpa:11, ftm:3, fta:3, min:37,
    },
  ],

  /* ────────────────────────────────────────
     SAM STOGSDILL
  ──────────────────────────────────────── */
  stogsdill: [
    // Add game entries here.
  ],

  /* ────────────────────────────────────────
     JAYKEB STEWART
  ──────────────────────────────────────── */
  stewart: [
    // Add game entries here.
  ],

  /* ────────────────────────────────────────
     ISAAC VITEL
  ──────────────────────────────────────── */
  vitel: [
    // Add game entries here.
  ],

};
