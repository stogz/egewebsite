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
            // 2024-25
    {
      season:'2024-25', type:'playoffs', game:1,
      opp:'MIN', result:'W', score:'142-110', home:true,
      pts:23, reb:3, ast:14, stl:3, blk:0, tov:0,
      fgm:7, fga:11, tpm:4, tpa:6, ftm:5, fta:5, min:32,
    },
    {
      season:'2024-25', type:'playoffs', game:2,
      opp:'MIN', result:'W', score:'139-121', home:true,
      pts:31, reb:3, ast:10, stl:2, blk:0, tov:0,
      fgm:10, fga:19, tpm:7, tpa:12, ftm:4, fta:4, min:33,
    },
    {
      season:'2024-25', type:'playoffs', game:3,
      opp:'MIN', result:'W', score:'124-135', home:false,
      pts:19, reb:0, ast:11, stl:3, blk:0, tov:5,
      fgm:8, fga:13, tpm:2, tpa:5, ftm:2, fta:5, min:30,
    },
    {
      season:'2024-25', type:'playoffs', game:4,
      opp:'MIN', result:'W', score:'113-122', home:false,
      pts:9, reb:1, ast:10, stl:1, blk:0, tov:1,
      fgm:4, fga:15, tpm:1, tpa:10, ftm:0, fta:2, min:29,
    },
    {
      season:'2024-25', type:'playoffs', game:1,
      opp:'VAN', result:'W', score:'128-126', home:true,
      pts:20, reb:2, ast:8, stl:1, blk:0, tov:2,
      fgm:7, fga:14, tpm:4, tpa:8, ftm:2, fta:3, min:27,
    },
    {
      season:'2024-25', type:'playoffs', game:2,
      opp:'VAN', result:'W', score:'131-114', home:true,
      pts:27, reb:4, ast:7, stl:4, blk:0, tov:5,
      fgm:8, fga:15, tpm:5, tpa:11, ftm:6, fta:7, min:32,
    },
    {
      season:'2024-25', type:'playoffs', game:3,
      opp:'VAN', result:'W', score:'106-99', home:false,
      pts:24, reb:2, ast:10, stl:0, blk:0, tov:2,
      fgm:7, fga:18, tpm:2, tpa:11, ftm:8, fta:9, min:36,
    },
    {
      season:'2024-25', type:'playoffs', game:4,
      opp:'VAN', result:'W', score:'120-116', home:false,
      pts:19, reb:1, ast:8, stl:2, blk:0, tov:4,
      fgm:4, fga:8, tpm:2, tpa:6, ftm:9, fta:10, min:33,
    },
    {
      season:'2024-25', type:'playoffs', game:1,
      opp:'DAL', result:'L', score:'118-120', home:true,
      pts:15, reb:2, ast:10, stl:2, blk:0, tov:0,
      fgm:5, fga:9, tpm:3, tpa:5, ftm:2, fta:2, min:32,
    },
    {
      season:'2024-25', type:'playoffs', game:2,
      opp:'DAL', result:'W', score:'123-98', home:true,
      pts:17, reb:2, ast:9, stl:2, blk:0, tov:1,
      fgm:6, fga:10, tpm:5, tpa:6, ftm:0, fta:0, min:32,
    },
    {
      season:'2024-25', type:'playoffs', game:3,
      opp:'DAL', result:'W', score:'141-97', home:false,
      pts:27, reb:4, ast:11, stl:2, blk:0, tov:3,
      fgm:7, fga:17, tpm:5, tpa:8, ftm:8, fta:10, min:35,
    },
    {
      season:'2024-25', type:'playoffs', game:4,
      opp:'DAL', result:'L', score:'108-121', home:false,
      pts:20, reb:1, ast:8, stl:4, blk:0, tov:2,
      fgm:5, fga:8, tpm:2, tpa:2, ftm:8, fta:8, min:33,
    },
    {
      season:'2024-25', type:'playoffs', game:5,
      opp:'DAL', result:'W', score:'133-117', home:true,
      pts:16, reb:1, ast:15, stl:2, blk:0, tov:2,
      fgm:6, fga:9, tpm:3, tpa:4, ftm:1, fta:1, min:30,
    },
    {
      season:'2024-25', type:'playoffs', game:6,
      opp:'DAL', result:'L', score:'110-113', home:false,
      pts:17, reb:1, ast:3, stl:2, blk:0, tov:3,
      fgm:6, fga:15, tpm:3, tpa:8, ftm:2, fta:2, min:31,
    },
    {
      season:'2024-25', type:'playoffs', game:7,
      opp:'DAL', result:'W', score:'125-98', home:true,
      pts:22, reb:1, ast:12, stl:0, blk:0, tov:2,
      fgm:7, fga:14, tpm:6, tpa:10, ftm:2, fta:3, min:34,
    },
    {
      season:'2024-25', type:'playoffs', game:1,
      opp:'MIL', result:'W', score:'109-102', home:true,
      pts:17, reb:1, ast:11, stl:1, blk:0, tov:5,
      fgm:5, fga:10, tpm:5, tpa:7, ftm:2, fta:2, min:43,
    },
    {
      season:'2024-25', type:'playoffs', game:2,
      opp:'MIL', result:'L', score:'112-106', home:true,
      pts:14, reb:0, ast:12, stl:1, blk:0, tov:2,
      fgm:5, fga:17, tpm:1, tpa:11, ftm:3, fta:3, min:42,
    },
    {
      season:'2024-25', type:'playoffs', game:3,
      opp:'MIL', result:'L', score:'109-105', home:false,
      pts:15, reb:3, ast:7, stl:0, blk:0, tov:2,
      fgm:4, fga:17, tpm:3, tpa:12, ftm:4, fta:5, min:36,
    },
    {
      season:'2024-25', type:'playoffs', game:4,
      opp:'MIL', result:'L', score:'143-118', home:false,
      pts:20, reb:3, ast:13, stl:0, blk:0, tov:3,
      fgm:8, fga:10, tpm:4, tpa:6, ftm:0, fta:0, min:33,
    },
    {
      season:'2024-25', type:'playoffs', game:5,
      opp:'MIL', result:'L', score:'121-116', home:true,
      pts:16, reb:5, ast:8, stl:2, blk:0, tov:2,
      fgm:6, fga:16, tpm:3, tpa:10, ftm:1, fta:2, min:34,
    },


            // 2025-26
    {
      season:'2025-26', type:'playoffs', game:1,
      opp:'SAS', result:'W', score:'120-89', home:true,
      pts:38, reb:3, ast:13, stl:3, blk:0, tov:0,
      fgm:10, fga:23, tpm:7, tpa:17, ftm:11, fta:13, min:39,
    },
    {
      season:'2025-26', type:'playoffs', game:2,
      opp:'SAS', result:'L', score:'89-97', home:true,
      pts:16, reb:1, ast:9, stl:1, blk:0, tov:1,
      fgm:5, fga:12, tpm:4, tpa:8, ftm:2, fta:2, min:28,
    },
    {
      season:'2025-26', type:'playoffs', game:3,
      opp:'SAS', result:'L', score:'95-98', home:false,
      pts:15, reb:1, ast:10, stl:3, blk:0, tov:4,
      fgm:5, fga:13, tpm:1, tpa:8, ftm:4, fta:5, min:42,
    },
    {
      season:'2025-26', type:'playoffs', game:4,
      opp:'SAS', result:'W', score:'116-83', home:false,
      pts:32, reb:3, ast:16, stl:0, blk:0, tov:3,
      fgm:9, fga:24, tpm:5, tpa:15, ftm:9, fta:10, min:43,
    },
    {
      season:'2025-26', type:'playoffs', game:5,
      opp:'SAS', result:'W', score:'102-93', home:true,
      pts:17, reb:3, ast:13, stl:4, blk:0, tov:2,
      fgm:2, fga:13, tpm:2, tpa:10, ftm:11, fta:11, min:40,
    },
    {
      season:'2025-26', type:'playoffs', game:6,
      opp:'SAS', result:'W', score:'119-98', home:false,
      pts:31, reb:3, ast:15, stl:0, blk:0, tov:3,
      fgm:7, fga:13, tpm:2, tpa:5, ftm:15, fta:16, min:43,
    },
    {
      season:'2025-26', type:'playoffs', game:1,
      opp:'SAC', result:'W', score:'122-109', home:true,
      pts:21, reb:3, ast:12, stl:4, blk:0, tov:3,
      fgm:7, fga:17, tpm:2, tpa:8, ftm:5, fta:5, min:42,
    },
    {
      season:'2025-26', type:'playoffs', game:2,
      opp:'SAC', result:'L', score:'117-124', home:true,
      pts:26, reb:4, ast:14, stl:0, blk:0, tov:6,
      fgm:7, fga:15, tpm:3, tpa:7, ftm:9, fta:10, min:47,
    },
    {
      season:'2025-26', type:'playoffs', game:3,
      opp:'SAC', result:'W', score:'109-92', home:false,
      pts:23, reb:1, ast:10, stl:4, blk:0, tov:4,
      fgm:7, fga:11, tpm:5, tpa:8, ftm:4, fta:4, min:38,
    },
    {
      season:'2025-26', type:'playoffs', game:4,
      opp:'SAC', result:'W', score:'125-114', home:false,
      pts:14, reb:2, ast:14, stl:3, blk:0, tov:4,
      fgm:5, fga:15, tpm:4, tpa:10, ftm:0, fta:0, min:37,
    },
    {
      season:'2025-26', type:'playoffs', game:5,
      opp:'SAC', result:'W', score:'106-105', home:true,
      pts:41, reb:4, ast:10, stl:3, blk:0, tov:1,
      fgm:13, fga:22, tpm:10, tpa:17, ftm:5, fta:5, min:41,
    },
    {
      season:'2025-26', type:'playoffs', game:1,
      opp:'DEN', result:'W', score:'122-105', home:true,
      pts:31, reb:0, ast:8, stl:1, blk:0, tov:2,
      fgm:11, fga:20, tpm:5, tpa:11, ftm:4, fta:4, min:39,
    },
    {
      season:'2025-26', type:'playoffs', game:2,
      opp:'DEN', result:'L', score:'113-114', home:false,
      pts:30, reb:3, ast:12, stl:3, blk:0, tov:3,
      fgm:12, fga:24, tpm:6, tpa:15, ftm:0, fta:0, min:41,
    },
    {
      season:'2025-26', type:'playoffs', game:3,
      opp:'DEN', result:'W', score:'121-113', home:true,
      pts:29, reb:2, ast:9, stl:1, blk:0, tov:2,
      fgm:9, fga:18, tpm:5, tpa:9, ftm:6, fta:7, min:39,
    },
    {
      season:'2025-26', type:'playoffs', game:4,
      opp:'DEN', result:'W', score:'131-105', home:true,
      pts:23, reb:3, ast:14, stl:2, blk:0, tov:3,
      fgm:7, fga:19, tpm:3, tpa:14, ftm:6, fta:7, min:39,
    },
    {
      season:'2025-26', type:'playoffs', game:5,
      opp:'DEN', result:'L', score:'93-127', home:false,
      pts:21, reb:2, ast:9, stl:1, blk:0, tov:12,
      fgm:7, fga:18, tpm:5, tpa:15, ftm:2, fta:2, min:42,
    },
    {
      season:'2025-26', type:'playoffs', game:6,
      opp:'DEN', result:'W', score:'127-86', home:true,
      pts:24, reb:2, ast:15, stl:2, blk:0, tov:4,
      fgm:7, fga:15, tpm:2, tpa:4, ftm:8, fta:8, min:36,
    },
    {
      season:'2025-26', type:'playoffs', game:1,
      opp:'BKN', result:'W', score:'120-96', home:true,
      pts:16, reb:1, ast:9, stl:2, blk:0, tov:1,
      fgm:6, fga:14, tpm:0, tpa:7, ftm:4, fta:4, min:31,
    },
    {
      season:'2025-26', type:'playoffs', game:2,
      opp:'BKN', result:'W', score:'129-117', home:true,
      pts:18, reb:1, ast:8, stl:3, blk:0, tov:2,
      fgm:7, fga:15, tpm:4, tpa:8, ftm:0, fta:0, min:36,
    },
    {
      season:'2025-26', type:'playoffs', game:3,
      opp:'BKN', result:'W', score:'112-103', home:false,
      pts:11, reb:3, ast:16, stl:2, blk:0, tov:1,
      fgm:5, fga:18, tpm:1, tpa:10, ftm:0, fta:0, min:41,
    },
    {
      season:'2025-26', type:'playoffs', game:4,
      opp:'BKN', result:'W', score:'125-114', home:false,
      pts:28, reb:4, ast:11, stl:1, blk:0, tov:5,
      fgm:10, fga:18, tpm:4, tpa:5, ftm:4, fta:4, min:39,
    },

            // 2026-27
    {
      season:'2026-27', type:'playoffs', game:1,
      opp:'HOU', result:'W', score:'120-102', home:true,
      pts:24, reb:2, ast:18, stl:3, blk:0, tov:3,
      fgm:9, fga:18, tpm:5, tpa:14, ftm:1, fta:1, min:43,
    },
    {
      season:'2026-27', type:'playoffs', game:2,
      opp:'HOU', result:'W', score:'126-107', home:true,
      pts:31, reb:3, ast:13, stl:3, blk:0, tov:3,
      fgm:9, fga:18, tpm:5, tpa:14, ftm:1, fta:1, min:43,
    },
    {
      season:'2026-27', type:'playoffs', game:3,
      opp:'HOU', result:'L', score:'92-113', home:false,
      pts:15, reb:7, ast:18, stl:3, blk:0, tov:4,
      fgm:6, fga:19, tpm:1, tpa:10, ftm:2, fta:2, min:43,
    },
    {
      season:'2026-27', type:'playoffs', game:4,
      opp:'HOU', result:'W', score:'104-97', home:false,
      pts:20, reb:5, ast:13, stl:1, blk:0, tov:3,
      fgm:7, fga:21, tpm:3, tpa:12, ftm:3, fta:5, min:42,
    },
    {
      season:'2026-27', type:'playoffs', game:5,
      opp:'HOU', result:'L', score:'126-139', home:true,
      pts:37, reb:2, ast:12, stl:1, blk:0, tov:0,
      fgm:12, fga:18, tpm:4, tpa:8, ftm:9, fta:10, min:40,
    },
    {
      season:'2026-27', type:'playoffs', game:6,
      opp:'HOU', result:'L', score:'109-114', home:false,
      pts:28, reb:4, ast:12, stl:3, blk:0, tov:3,
      fgm:7, fga:20, tpm:4, tpa:14, ftm:10, fta:11, min:40,
    },
    {
      season:'2026-27', type:'playoffs', game:7,
      opp:'HOU', result:'W', score:'140-130', home:true,
      pts:28, reb:2, ast:17, stl:3, blk:0, tov:4,
      fgm:10, fga:20, tpm:6, tpa:14, ftm:2, fta:2, min:47,
    },
    {
      season:'2026-27', type:'playoffs', game:1,
      opp:'PHX', result:'W', score:'120-114', home:true,
      pts:42, reb:2, ast:11, stl:5, blk:0, tov:2,
      fgm:13, fga:26, tpm:9, tpa:20, ftm:7, fta:8, min:40,
    },
    {
      season:'2026-27', type:'playoffs', game:2,
      opp:'PHX', result:'L', score:'99-106', home:true,
      pts:29, reb:4, ast:8, stl:0, blk:0, tov:6,
      fgm:9, fga:28, tpm:3, tpa:17, ftm:8, fta:8, min:40,
    },
    {
      season:'2026-27', type:'playoffs', game:3,
      opp:'PHX', result:'W', score:'126-104', home:false,
      pts:30, reb:7, ast:13, stl:2, blk:0, tov:3,
      fgm:10, fga:24, tpm:4, tpa:14, ftm:6, fta:6, min:37,
    },
    {
      season:'2026-27', type:'playoffs', game:4,
      opp:'PHX', result:'W', score:'120-115', home:false,
      pts:40, reb:2, ast:7, stl:3, blk:0, tov:2,
      fgm:14, fga:25, tpm:6, tpa:13, ftm:6, fta:7, min:39,
    },
    {
      season:'2026-27', type:'playoffs', game:5,
      opp:'PHX', result:'L', score:'96-121', home:true,
      pts:28, reb:2, ast:8, stl:1, blk:0, tov:5,
      fgm:9, fga:19, tpm:6, tpa:13, ftm:4, fta:5, min:37,
    },
    {
      season:'2026-27', type:'playoffs', game:6,
      opp:'PHX', result:'L', score:'108-112', home:false,
      pts:25, reb:5, ast:12, stl:2, blk:0, tov:4,
      fgm:9, fga:22, tpm:4, tpa:9, ftm:3, fta:3, min:42,
    },
    {
      season:'2026-27', type:'playoffs', game:7,
      opp:'PHX', result:'W', score:'135-121', home:true,
      pts:31, reb:2, ast:15, stl:1, blk:0, tov:3,
      fgm:7, fga:13, tpm:2, tpa:6, ftm:15, fta:15, min:39,
    },
    {
      season:'2026-27', type:'playoffs', game:1,
      opp:'SAS', result:'L', score:'101-107', home:true,
      pts:28, reb:6, ast:13, stl:0, blk:0, tov:4,
      fgm:12, fga:21, tpm:2, tpa:6, ftm:2, fta:2, min:45,
    },
    {
      season:'2026-27', type:'playoffs', game:2,
      opp:'SAS', result:'W', score:'109-101', home:true,
      pts:44, reb:5, ast:5, stl:2, blk:0, tov:3,
      fgm:12, fga:23, tpm:8, tpa:15, ftm:12, fta:14, min:41,
    },
    {
      season:'2026-27', type:'playoffs', game:3,
      opp:'SAS', result:'L', score:'96-109', home:false,
      pts:12, reb:1, ast:9, stl:1, blk:0, tov:2,
      fgm:5, fga:13, tpm:0, tpa:6, ftm:2, fta:2, min:27,
    },
    {
      season:'2026-27', type:'playoffs', game:4,
      opp:'SAS', result:'W', score:'117-110', home:false,
      pts:28, reb:4, ast:17, stl:4, blk:0, tov:4,
      fgm:10, fga:24, tpm:3, tpa:13, ftm:5, fta:5, min:47,
    },
    {
      season:'2026-27', type:'playoffs', game:5,
      opp:'SAS', result:'W', score:'124-115', home:true,
      pts:28, reb:4, ast:19, stl:2, blk:0, tov:4,
      fgm:10, fga:18, tpm:5, tpa:11, ftm:3, fta:3, min:39,
    },
    {
      season:'2026-27', type:'playoffs', game:6,
      opp:'SAS', result:'L', score:'82-92', home:false,
      pts:22, reb:5, ast:7, stl:0, blk:0, tov:5,
      fgm:7, fga:17, tpm:4, tpa:11, ftm:4, fta:5, min:42,
    },
    {
      season:'2026-27', type:'playoffs', game:7,
      opp:'SAS', result:'L', score:'111-131', home:true,
      pts:27, reb:1, ast:6, stl:1, blk:0, tov:2,
      fgm:10, fga:21, tpm:4, tpa:11, ftm:3, fta:4, min:36,
    },



            // 2028-29
    {
      season:'2028-29', type:'playoffs', game:1,
      opp:'GSW', result:'W', score:'116-111', home:true,
      pts:40, reb:4, ast:11, stl:0, blk:0, tov:6,
      fgm:13, fga:23, tpm:5, tpa:11, ftm:9, fta:9, min:44,
    },
    {
      season:'2028-29', type:'playoffs', game:2,
      opp:'GSW', result:'W', score:'133-127', home:true,
      pts:30, reb:2, ast:10, stl:0, blk:0, tov:1,
      fgm:9, fga:20, tpm:4, tpa:8, ftm:8, fta:9, min:37,
    },
    {
      season:'2028-29', type:'playoffs', game:3,
      opp:'GSW', result:'L', score:'122-123', home:false,
      pts:52, reb:0, ast:7, stl:1, blk:0, tov:3,
      fgm:19, fga:30, tpm:10, tpa:15, ftm:4, fta:4, min:42,
    },
    {
      season:'2028-29', type:'playoffs', game:4,
      opp:'GSW', result:'L', score:'100-130', home:false,
      pts:14, reb:0, ast:13, stl:1, blk:0, tov:4,
      fgm:4, fga:20, tpm:0, tpa:9, ftm:6, fta:7, min:40,
    },
    {
      season:'2028-29', type:'playoffs', game:5,
      opp:'GSW', result:'W', score:'130-116', home:true,
      pts:22, reb:5, ast:12, stl:1, blk:0, tov:2,
      fgm:5, fga:16, tpm:3, tpa:12, ftm:9, fta:9, min:39,
    },
    {
      season:'2028-29', type:'playoffs', game:6,
      opp:'GSW', result:'L', score:'104-124', home:false,
      pts:17, reb:1, ast:10, stl:3, blk:0, tov:2,
      fgm:5, fga:11, tpm:1, tpa:4, ftm:6, fta:6, min:34,
    },
    {
      season:'2028-29', type:'playoffs', game:7,
      opp:'GSW', result:'L', score:'103-104', home:true,
      pts:28, reb:5, ast:8, stl:1, blk:0, tov:5,
      fgm:8, fga:16, tpm:6, tpa:10, ftm:6, fta:6, min:36,
    },


            // 2029-30
    {
      season:'2029-30', type:'playoffs', game:1,
      opp:'TOR', result:'W', score:'132-120', home:true,
      pts:28, reb:1, ast:21, stl:1, blk:0, tov:3,
      fgm:6, fga:11, tpm:4, tpa:9, ftm:12, fta:13, min:45,
    },
    {
      season:'2029-30', type:'playoffs', game:2,
      opp:'TOR', result:'L', score:'112-123', home:true,
      pts:16, reb:1, ast:12, stl:0, blk:0, tov:5,
      fgm:6, fga:17, tpm:3, tpa:7, ftm:1, fta:1, min:31,
    },
    {
      season:'2029-30', type:'playoffs', game:3,
      opp:'TOR', result:'L', score:'135-137', home:false,
      pts:10, reb:1, ast:10, stl:0, blk:0, tov:2,
      fgm:3, fga:7, tpm:2, tpa:6, ftm:2, fta:2, min:33,
    },
    {
      season:'2029-30', type:'playoffs', game:4,
      opp:'TOR', result:'L', score:'102-129', home:false,
      pts:17, reb:2, ast:11, stl:2, blk:0, tov:2,
      fgm:7, fga:17, tpm:2, tpa:10, ftm:1, fta:1, min:34,
    },
    {
      season:'2029-30', type:'playoffs', game:5,
      opp:'TOR', result:'W', score:'159-139', home:true,
      pts:39, reb:2, ast:9, stl:4, blk:0, tov:1,
      fgm:12, fga:19, tpm:7, tpa:12, ftm:8, fta:9, min:36,
    },
    {
      season:'2029-30', type:'playoffs', game:6,
      opp:'TOR', result:'L', score:'119-136', home:false,
      pts:18, reb:1, ast:6, stl:3, blk:0, tov:4,
      fgm:7, fga:12, tpm:3, tpa:4, ftm:1, fta:1, min:34,
    },


            // 2030-31
    {
      season:'2030-31', type:'playoffs', game:1,
      opp:'PHI', result:'L', score:'115-126', home:false,
      pts:16, reb:2, ast:7, stl:3, blk:0, tov:3,
      fgm:6, fga:13, tpm:2, tpa:8, ftm:2, fta:3, min:38,
    },
    {
      season:'2030-31', type:'playoffs', game:2,
      opp:'PHI', result:'W', score:'127-106', home:false,
      pts:20, reb:0, ast:14, stl:2, blk:0, tov:1,
      fgm:5, fga:11, tpm:4, tpa:6, ftm:6, fta:6, min:34,
    },
    {
      season:'2030-31', type:'playoffs', game:3,
      opp:'PHI', result:'W', score:'127-111', home:true,
      pts:15, reb:0, ast:6, stl:2, blk:0, tov:1,
      fgm:5, fga:13, tpm:3, tpa:9, ftm:2, fta:2, min:33,
    },
    {
      season:'2030-31', type:'playoffs', game:4,
      opp:'PHI', result:'L', score:'105-121', home:true,
      pts:28, reb:1, ast:6, stl:3, blk:0, tov:4,
      fgm:9, fga:17, tpm:5, tpa:10, ftm:5, fta:5, min:35,
    },
    {
      season:'2030-31', type:'playoffs', game:5,
      opp:'PHI', result:'L', score:'90-133', home:false,
      pts:11, reb:0, ast:5, stl:1, blk:0, tov:4,
      fgm:3, fga:10, tpm:1, tpa:4, ftm:4, fta:5, min:34,
    },
    {
      season:'2030-31', type:'playoffs', game:6,
      opp:'PHI', result:'W', score:'143-132', home:true,
      pts:32, reb:4, ast:7, stl:1, blk:0, tov:1,
      fgm:10, fga:18, tpm:7, tpa:12, ftm:5, fta:5, min:39,
    },
    {
      season:'2030-31', type:'playoffs', game:7,
      opp:'PHI', result:'L', score:'122-127', home:false,
      pts:26, reb:3, ast:12, stl:1, blk:0, tov:7,
      fgm:7, fga:16, tpm:2, tpa:9, ftm:10, fta:11, min:40,
    },

            // 2031-32
    {
      season:'2031-32', type:'playoffs', game:1,
      opp:'ATL', result:'W', score:'153-125', home:true,
      pts:16, reb:0, ast:9, stl:1, blk:0, tov:0,
      fgm:5, fga:12, tpm:0, tpa:5, ftm:6, fta:6, min:30,
    },
    {
      season:'2031-32', type:'playoffs', game:2,
      opp:'ATL', result:'W', score:'158-141', home:true,
      pts:30, reb:1, ast:9, stl:3, blk:0, tov:1,
      fgm:8, fga:14, tpm:3, tpa:8, ftm:11, fta:12, min:32,
    },
    {
      season:'2031-32', type:'playoffs', game:3,
      opp:'ATL', result:'L', score:'136-144', home:false,
      pts:16, reb:0, ast:13, stl:1, blk:0, tov:2,
      fgm:3, fga:8, tpm:0, tpa:3, ftm:10, fta:10, min:31,
    },
    {
      season:'2031-32', type:'playoffs', game:4,
      opp:'ATL', result:'W', score:'132-106', home:false,
      pts:16, reb:0, ast:13, stl:4, blk:0, tov:1,
      fgm:4, fga:11, tpm:3, tpa:7, ftm:5, fta:5, min:28,
    },
    {
      season:'2031-32', type:'playoffs', game:5,
      opp:'ATL', result:'W', score:'149-139', home:true,
      pts:28, reb:1, ast:5, stl:2, blk:0, tov:2,
      fgm:9, fga:18, tpm:4, tpa:9, ftm:6, fta:6, min:31,
    },
    {
      season:'2031-32', type:'playoffs', game:1,
      opp:'WAS', result:'W', score:'124-115', home:true,
      pts:25, reb:2, ast:5, stl:2, blk:0, tov:1,
      fgm:8, fga:11, tpm:1, tpa:4, ftm:8, fta:9, min:33,
    },
    {
      season:'2031-32', type:'playoffs', game:2,
      opp:'WAS', result:'L', score:'124-149', home:true,
      pts:17, reb:4, ast:11, stl:0, blk:0, tov:4,
      fgm:7, fga:10, tpm:0, tpa:1, ftm:3, fta:3, min:32,
    },
    {
      season:'2031-32', type:'playoffs', game:3,
      opp:'WAS', result:'L', score:'128-130', home:false,
      pts:26, reb:1, ast:7, stl:1, blk:0, tov:1,
      fgm:10, fga:16, tpm:5, tpa:11, ftm:1, fta:2, min:32,
    },
    {
      season:'2031-32', type:'playoffs', game:4,
      opp:'WAS', result:'W', score:'146-124', home:false,
      pts:18, reb:1, ast:11, stl:1, blk:0, tov:1,
      fgm:7, fga:12, tpm:4, tpa:6, ftm:0, fta:0, min:30,
    },
    {
      season:'2031-32', type:'playoffs', game:5,
      opp:'WAS', result:'W', score:'137-120', home:true,
      pts:20, reb:0, ast:9, stl:0, blk:0, tov:2,
      fgm:6, fga:9, tpm:4, tpa:7, ftm:4, fta:4, min:29,
    },
    {
      season:'2031-32', type:'playoffs', game:6,
      opp:'WAS', result:'L', score:'128-134', home:false,
      pts:24, reb:5, ast:8, stl:1, blk:0, tov:1,
      fgm:5, fga:12, tpm:4, tpa:7, ftm:10, fta:10, min:32,
    },
    {
      season:'2031-32', type:'playoffs', game:7,
      opp:'WAS', result:'W', score:'106-87', home:true,
      pts:28, reb:4, ast:3, stl:1, blk:0, tov:2,
      fgm:10, fga:22, tpm:3, tpa:11, ftm:5, fta:5, min:37,
    },
    {
      season:'2031-32', type:'playoffs', game:1,
      opp:'PHI', result:'L', score:'127-134', home:true,
      pts:28, reb:1, ast:11, stl:0, blk:0, tov:2,
      fgm:9, fga:17, tpm:7, tpa:13, ftm:3, fta:3, min:29,
    },
    {
      season:'2031-32', type:'playoffs', game:2,
      opp:'PHI', result:'L', score:'122-131', home:true,
      pts:27, reb:4, ast:13, stl:3, blk:0, tov:1,
      fgm:9, fga:15, tpm:5, tpa:10, ftm:4, fta:4, min:34,
    },
    {
      season:'2031-32', type:'playoffs', game:3,
      opp:'PHI', result:'W', score:'138-110', home:false,
      pts:16, reb:2, ast:13, stl:1, blk:0, tov:3,
      fgm:7, fga:14, tpm:2, tpa:7, ftm:0, fta:0, min:31,
    },
    {
      season:'2031-32', type:'playoffs', game:4,
      opp:'PHI', result:'L', score:'119-138', home:false,
      pts:20, reb:1, ast:6, stl:0, blk:0, tov:1,
      fgm:7, fga:13, tpm:2, tpa:6, ftm:4, fta:4, min:30,
    },
    {
      season:'2031-32', type:'playoffs', game:5,
      opp:'PHI', result:'W', score:'133-109', home:true,
      pts:13, reb:1, ast:13, stl:0, blk:0, tov:4,
      fgm:5, fga:7, tpm:3, tpa:4, ftm:0, fta:0, min:30,
    },
    {
      season:'2031-32', type:'playoffs', game:6,
      opp:'PHI', result:'L', score:'129-133', home:false,
      pts:26, reb:1, ast:8, stl:0, blk:0, tov:3,
      fgm:9, fga:13, tpm:6, tpa:9, ftm:2, fta:2, min:29,
    },

            // 2032-33
    {
      season:'2032-33', type:'playoffs', game:1,
      opp:'PHI', result:'W', score:'151-141', home:false,
      pts:20, reb:3, ast:12, stl:2, blk:0, tov:2,
      fgm:5, fga:9, tpm:2, tpa:4, ftm:8, fta:9, min:31,
    },
    {
      season:'2032-33', type:'playoffs', game:2,
      opp:'PHI', result:'L', score:'131-142', home:false,
      pts:12, reb:0, ast:8, stl:0, blk:0, tov:2,
      fgm:5, fga:7, tpm:2, tpa:4, ftm:0, fta:0, min:28,
    },
    {
      season:'2032-33', type:'playoffs', game:3,
      opp:'PHI', result:'L', score:'134-146', home:true,
      pts:15, reb:0, ast:10, stl:1, blk:0, tov:0,
      fgm:6, fga:12, tpm:3, tpa:7, ftm:0, fta:0, min:28,
    },
    {
      season:'2032-33', type:'playoffs', game:4,
      opp:'PHI', result:'L', score:'102-121', home:true,
      pts:17, reb:2, ast:7, stl:1, blk:0, tov:4,
      fgm:6, fga:7, tpm:3, tpa:4, ftm:2, fta:2, min:30,
    },
    {
      season:'2032-33', type:'playoffs', game:5,
      opp:'PHI', result:'L', score:'107-146', home:false,
      pts:16, reb:0, ast:9, stl:1, blk:0, tov:2,
      fgm:5, fga:8, tpm:3, tpa:6, ftm:3, fta:3, min:31,
    },

            // 2033-34
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
    {
      season:'2033-34', type:'playoffs', game:1,
      opp:'MEX', result:'L', score:'125-103', home:false,
      pts:5, reb:4, ast:6, stl:0, blk:0, tov:1,
      fgm:2, fga:13, tpm:0, tpa:7, ftm:1, fta:1, min:35,
    },
    {
      season:'2033-34', type:'playoffs', game:2,
      opp:'MEX', result:'W', score:'95-116', home:false,
      pts:25, reb:4, ast:7, stl:2, blk:0, tov:1,
      fgm:9, fga:14, tpm:6, tpa:7, ftm:1, fta:1, min:35,
    },
    {
      season:'2033-34', type:'playoffs', game:3,
      opp:'MEX', result:'W', score:'92-98', home:true,
      pts:25, reb:2, ast:9, stl:0, blk:0, tov:4,
      fgm:7, fga:11, tpm:3, tpa:6, ftm:8, fta:8, min:30,
    },
    {
      season:'2033-34', type:'playoffs', game:4,
      opp:'MEX', result:'L', score:'115-111', home:true,
      pts:17, reb:2, ast:9, stl:1, blk:0, tov:5,
      fgm:6, fga:10, tpm:4, tpa:6, ftm:1, fta:1, min:36,
    },
    {
      season:'2033-34', type:'playoffs', game:5,
      opp:'MEX', result:'L', score:'120-96', home:false,
      pts:11, reb:3, ast:7, stl:1, blk:0, tov:6,
      fgm:3, fga:10, tpm:1, tpa:6, ftm:4, fta:5, min:34,
    },
    {
      season:'2033-34', type:'playoffs', game:6,
      opp:'MEX', result:'L', score:'138-88', home:true,
      pts:19, reb:5, ast:10, stl:1, blk:0, tov:3,
      fgm:5, fga:9, tpm:2, tpa:6, ftm:7, fta:7, min:35,
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
