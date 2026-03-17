/* ═══════════════════════════════════════════════════════════
   EGE NBA SIMULATION · PLAYER STATS DATA
   Edit this file to update all stats across the site.

   Structure per player:
     regular  → array of per-game season rows
     playoffs → array of per-game playoff rows
     totals   → array of season totals rows

   College teams excluded from all career/chart stats: AU, KU, LOU, FSU, DUKE, UCLA
   MEX, VAN, and STL count as pro seasons and ARE included in all-time metrics.
   dnq:true    → Did Not Qualify for playoffs (shows as DNQ row in table)
═══════════════════════════════════════════════════════════ */

var PLAYER_STATS = {

  /* ─────────────── COOPER CLARK ─────────────── */
  clark: {
    regular: [
      { season:'2016-17', age:18, team:'AU',  ppg:10.1, rpg:1.1, apg:5.9,  spg:1.1, bpg:0.0, topg:2.2, fgp:'47.4%', tpp:'32.9%', ftp:'74.4%', tpa:3.7, gs:34, gp:36, mpg:22.9, star:false, dnq:false },
      { season:'2017-18', age:19, team:'AU',  ppg:15.5, rpg:2.5, apg:7.4,  spg:1.1, bpg:0.0, topg:2.4, fgp:'49.8%', tpp:'40.3%', ftp:'85.2%', tpa:3.6, gs:35, gp:35, mpg:24.4, star:false, dnq:false },
      { season:'2018-19', age:20, team:'LAC', ppg:8.8,  rpg:1.0, apg:5.4,  spg:1.0, bpg:0.5, topg:1.9, fgp:'38.7%', tpp:'29.3%', ftp:'74.5%', tpa:2.7, gs:31, gp:82, mpg:23.5, star:false, dnq:false },
      { season:'2019-20', age:21, team:'LAC', ppg:15.6, rpg:2.1, apg:10.5, spg:1.6, bpg:0.0, topg:3.0, fgp:'41.4%', tpp:'29.5%', ftp:'78.4%', tpa:5.5, gs:78, gp:78, mpg:37.1, star:false, dnq:false },
      { season:'2020-21', age:22, team:'LAC', ppg:15.8, rpg:3.1, apg:8.3,  spg:1.5, bpg:0.0, topg:3.1, fgp:'47.4%', tpp:'38.7%', ftp:'83.9%', tpa:5.7, gs:69, gp:69, mpg:33.1, star:false, dnq:false },
      { season:'2021-22', age:23, team:'LAC', ppg:16.6, rpg:2.6, apg:8.4,  spg:1.6, bpg:0.0, topg:3.3, fgp:'49.0%', tpp:'40.8%', ftp:'86.1%', tpa:5.7, gs:79, gp:79, mpg:32.9, star:false, dnq:false },
      { season:'2022-23', age:24, team:'LAC', ppg:22.7, rpg:2.9, apg:10.1, spg:1.8, bpg:0.0, topg:3.6, fgp:'48.3%', tpp:'40.9%', ftp:'84.5%', tpa:8.3, gs:79, gp:79, mpg:36.5, star:true,  dnq:false },
      { season:'2023-24', age:25, team:'LAC', ppg:24.4, rpg:2.3, apg:11.0, spg:2.0, bpg:0.0, topg:3.3, fgp:'50.2%', tpp:'42.5%', ftp:'87.4%', tpa:8.8, gs:71, gp:71, mpg:36.7, star:true,  dnq:false },
      { season:'2024-25', age:26, team:'LAL', ppg:19.6, rpg:2.5, apg:9.7,  spg:1.6, bpg:0.0, topg:2.6, fgp:'51.7%', tpp:'41.1%', ftp:'90.0%', tpa:7.3, gs:69, gp:69, mpg:32.4, star:true,  dnq:false },
      { season:'2025-26', age:27, team:'LAL', ppg:26.5, rpg:2.7, apg:10.3, spg:1.8, bpg:0.0, topg:2.9, fgp:'48.5%', tpp:'42.3%', ftp:'88.5%', tpa:9.9, gs:79, gp:79, mpg:36.8, star:true,  dnq:false },
      { season:'2026-27', age:28, team:'LAL', ppg:24.3, rpg:3.1, apg:10.8, spg:1.5, bpg:0.0, topg:2.4, fgp:'49.7%', tpp:'42.6%', ftp:'91.8%', tpa:9.2, gs:82, gp:82, mpg:34.4, star:true,  dnq:false },
      { season:'2027-28', age:29, team:'LAL', ppg:25.3, rpg:1.6, apg:9.9,  spg:1.5, bpg:0.0, topg:3.1, fgp:'48.4%', tpp:'42.2%', ftp:'90.4%', tpa:9.6, gs:76, gp:76, mpg:36.3, star:true,  dnq:false },
      { season:'2028-29', age:30, team:'LAL', ppg:29.1, rpg:1.6, apg:8.6,  spg:1.6, bpg:0.0, topg:2.8, fgp:'48.9%', tpp:'42.8%', ftp:'93.6%', tpa:11.0,gs:77, gp:77, mpg:35.1, star:true,  dnq:false },
      { season:'2029-30', age:31, team:'IND', ppg:17.4, rpg:1.2, apg:8.0,  spg:1.0, bpg:0.0, topg:2.1, fgp:'46.2%', tpp:'40.5%', ftp:'95.1%', tpa:6.5, gs:72, gp:72, mpg:30.1, star:false, dnq:false },
      { season:'2030-31', age:32, team:'IND', ppg:17.6, rpg:1.6, apg:7.7,  spg:1.0, bpg:0.0, topg:2.0, fgp:'45.8%', tpp:'39.3%', ftp:'92.2%', tpa:7.2, gs:80, gp:80, mpg:29.4, star:false, dnq:false },
      { season:'2031-32', age:33, team:'IND', ppg:21.5, rpg:1.6, apg:7.6,  spg:1.0, bpg:0.0, topg:2.2, fgp:'48.1%', tpp:'42.8%', ftp:'95.6%', tpa:8.2, gs:82, gp:82, mpg:30.5, star:false, dnq:false },
    ],
    playoffs: [
      { season:'2016-17', age:18, team:'AU',  ppg:11.3, rpg:1.3, apg:7.0,  spg:0.7, bpg:0.7, topg:3.3, fgp:'40.5%', tpp:'33.3%', ftp:'50.0%', tpa:3.7, gs:3,  gp:3,  mpg:24.0, dnq:false },
      { season:'2017-18', age:19, team:'AU',  ppg:13.6, rpg:2.4, apg:6.4,  spg:1.0, bpg:0.4, topg:1.8, fgp:'40.3%', tpp:'41.4%', ftp:'100%',  tpa:5.8, gs:5,  gp:5,  mpg:28.6, dnq:false },
      { season:'2018-19', age:20, team:'LAC', ppg:0,    rpg:0,   apg:0,    spg:0,   bpg:0,   topg:0,   fgp:'',      tpp:'',      ftp:'',      tpa:0,   gs:0,  gp:0,  mpg:0,   dnq:true, note:'Did not qualify.' },
      { season:'2019-20', age:21, team:'LAC', ppg:0,    rpg:0,   apg:0,    spg:0,   bpg:0,   topg:0,   fgp:'',      tpp:'',      ftp:'',      tpa:0,   gs:0,  gp:0,  mpg:0,   dnq:true, note:'Did not qualify.' },
      { season:'2020-21', age:22, team:'LAC', ppg:0,    rpg:0,   apg:0,    spg:0,   bpg:0,   topg:0,   fgp:'',      tpp:'',      ftp:'',      tpa:0,   gs:0,  gp:0,  mpg:0,   dnq:true, note:'Did not qualify.' },
      { season:'2021-22', age:23, team:'LAC', ppg:0,    rpg:0,   apg:0,    spg:0,   bpg:0,   topg:0,   fgp:'',      tpp:'',      ftp:'',      tpa:0,   gs:0,  gp:0,  mpg:0,   dnq:true, note:'Did not qualify.' },
      { season:'2022-23', age:24, team:'LAC', ppg:0,    rpg:0,   apg:0,    spg:0,   bpg:0,   topg:0,   fgp:'',      tpp:'',      ftp:'',      tpa:0,   gs:0,  gp:0,  mpg:0,   dnq:true, note:'Did not qualify.' },
      { season:'2023-24', age:25, team:'LAC', ppg:0,    rpg:0,   apg:0,    spg:0,   bpg:0,   topg:0,   fgp:'',      tpp:'',      ftp:'',      tpa:0,   gs:0,  gp:0,  mpg:0,   dnq:true, note:'Did not qualify.' },
      { season:'2024-25', age:26, team:'LAL', ppg:19.4, rpg:1.9, apg:9.9,  spg:1.7, bpg:0.0, topg:2.3, fgp:'47.2%', tpp:'44.3%', ftp:'85.0%', tpa:7.9, gs:20, gp:20, mpg:33.3, dnq:false },
      { season:'2025-26', age:27, team:'LAL', ppg:24.0, rpg:2.3, apg:11.8, spg:2.0, bpg:0.0, topg:3.1, fgp:'44.3%', tpp:'37.9%', ftp:'93.2%', tpa:10.0,gs:21, gp:21, mpg:39.2, champ:true, dnq:false },
      { season:'2026-27', age:28, team:'LAL', ppg:28.4, rpg:3.6, apg:12.0, spg:1.9, bpg:0.0, topg:3.2, fgp:'46.2%', tpp:'36.4%', ftp:'90.4%', tpa:11.8,gs:21, gp:21, mpg:40.5, dnq:false },
      { season:'2027-28', age:29, team:'LAL', ppg:0,    rpg:0,   apg:0,    spg:0,   bpg:0,   topg:0,   fgp:'',      tpp:'',      ftp:'',      tpa:0,   gs:0,  gp:0,  mpg:0,   dnq:true, note:'Did not play, injury.' },
      { season:'2028-29', age:30, team:'LAL', ppg:29.0, rpg:2.4, apg:10.1, spg:1.0, bpg:0.0, topg:3.3, fgp:'46.3%', tpp:'42.0%', ftp:'96.0%', tpa:9.9, gs:7,  gp:7,  mpg:38.9, dnq:false },
      { season:'2029-30', age:31, team:'IND', ppg:21.3, rpg:1.3, apg:11.5, spg:1.7, bpg:0.0, topg:2.8, fgp:'49.4%', tpp:'43.8%', ftp:'92.6%', tpa:8.0, gs:6,  gp:6,  mpg:35.5, dnq:false },
      { season:'2030-31', age:32, team:'IND', ppg:21.1, rpg:1.4, apg:8.1,  spg:1.9, bpg:0.0, topg:3.0, fgp:'45.9%', tpp:'41.4%', ftp:'91.9%', tpa:8.3, gs:7,  gp:7,  mpg:36.1, dnq:false },
      { season:'2031-32', age:33, team:'IND', ppg:21.9, rpg:1.6, apg:9.3,  spg:1.2, bpg:0.0, topg:1.8, fgp:'54.7%', tpp:'43.8%', ftp:'96.5%', tpa:7.1, gs:18, gp:18, mpg:31.1, dnq:false },
    ],
    totals: [
      { season:'2018-19', age:20, team:'LAC', pts:722,  reb:83,  ast:445, stl:78,  blk:0, tov:155, fgm:267, fga:690,  tpm:65,  tpa:222, ftm:123, fta:165, min:1928, gs:31, gp:82, dd:4,  td:0 },
      { season:'2019-20', age:21, team:'LAC', pts:1219, reb:166, ast:818, stl:122, blk:0, tov:234, fgm:455, fga:1099, tpm:127, tpa:431, ftm:182, fta:232, min:2896, gs:78, gp:78, dd:39, td:0 },
      { season:'2020-21', age:22, team:'LAC', pts:1092, reb:217, ast:571, stl:104, blk:0, tov:212, fgm:403, fga:850,  tpm:151, tpa:390, ftm:135, fta:161, min:2283, gs:69, gp:69, dd:21, td:0 },
      { season:'2021-22', age:23, team:'LAC', pts:1311, reb:205, ast:661, stl:125, blk:0, tov:263, fgm:464, fga:946,  tpm:184, tpa:451, ftm:199, fta:231, min:2600, gs:79, gp:79, dd:27, td:0 },
      { season:'2022-23', age:24, team:'LAC', pts:1795, reb:229, ast:801, stl:146, blk:0, tov:283, fgm:598, fga:1237, tpm:267, tpa:653, ftm:332, fta:393, min:2887, gs:79, gp:79, dd:45, td:0, star:true },
      { season:'2023-24', age:25, team:'LAC', pts:1735, reb:165, ast:784, stl:143, blk:0, tov:235, fgm:607, fga:1210, tpm:265, tpa:624, ftm:256, fta:293, min:2607, gs:71, gp:71, dd:42, td:0, star:true },
      { season:'2024-25', age:26, team:'LAL', pts:1353, reb:173, ast:668, stl:112, blk:0, tov:182, fgm:465, fga:899,  tpm:207, tpa:504, ftm:216, fta:240, min:2235, gs:69, gp:69, dd:32, td:0, star:true },
      { season:'2025-26', age:27, team:'LAL', pts:2093, reb:212, ast:812, stl:142, blk:0, tov:228, fgm:684, fga:1410, tpm:332, tpa:784, ftm:393, fta:444, min:2908, gs:79, gp:79, dd:46, td:0, star:true },
      { season:'2026-27', age:28, team:'LAL', pts:1995, reb:256, ast:887, stl:125, blk:0, tov:196, fgm:679, fga:1365, tpm:322, tpa:755, ftm:315, fta:343, min:2824, gs:82, gp:82, dd:53, td:0, star:true },
      { season:'2027-28', age:29, team:'LAL', pts:1922, reb:121, ast:752, stl:113, blk:0, tov:234, fgm:634, fga:1310, tpm:307, tpa:728, ftm:347, fta:384, min:2759, gs:76, gp:76, dd:44, td:0, star:true },
      { season:'2028-29', age:30, team:'LAL', pts:2244, reb:123, ast:664, stl:122, blk:0, tov:217, fgm:735, fga:1504, tpm:362, tpa:846, ftm:412, fta:440, min:2700, gs:77, gp:77, dd:31, td:0, star:true },
      { season:'2029-30', age:31, team:'IND', pts:1256, reb:88,  ast:578, stl:69,  blk:0, tov:149, fgm:406, fga:878,  tpm:189, tpa:467, ftm:255, fta:268, min:2166, gs:72, gp:72, dd:19, td:0 },
      { season:'2030-31', age:32, team:'IND', pts:1425, reb:127, ast:625, stl:77,  blk:0, tov:162, fgm:474, fga:1036, tpm:228, tpa:580, ftm:249, fta:270, min:2380, gs:81, gp:81, dd:18, td:0 },
      { season:'2031-32', age:33, team:'IND', pts:1759, reb:156, ast:622, stl:85,  blk:0, tov:179, fgm:560, fga:1165, tpm:288, tpa:673, ftm:351, fta:367, min:2501, gs:82, gp:82, dd:16, td:0 },
    ]
  },

  /* ─────────────── PAXON HATCH ─────────────── */
  hatch: {
    regular: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:false, note:'Stats pending upload.' },
    ],
    playoffs: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:true, note:'Stats pending upload.' },
    ],
    totals: [
      { season:'2024-25', age:22, team:'TBD', pts:0, reb:0, ast:0, stl:0, blk:0, tov:0, fgm:0, fga:0, tpm:0, tpa:0, ftm:0, fta:0, min:0, gs:0, gp:0, dd:0, td:0 },
    ]
  },

  /* ─────────────── SAM STOGSDILL ─────────────── */
  stogsdill: {
    regular: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:false, note:'Stats pending upload.' },
    ],
    playoffs: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:true, note:'Stats pending upload.' },
    ],
    totals: [
      { season:'2024-25', age:22, team:'TBD', pts:0, reb:0, ast:0, stl:0, blk:0, tov:0, fgm:0, fga:0, tpm:0, tpa:0, ftm:0, fta:0, min:0, gs:0, gp:0, dd:0, td:0 },
    ]
  },

  /* ─────────────── JAYKEB STEWART ─────────────── */
  stewart: {
    regular: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:false, note:'Stats pending upload.' },
    ],
    playoffs: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:true, note:'Stats pending upload.' },
    ],
    totals: [
      { season:'2024-25', age:22, team:'TBD', pts:0, reb:0, ast:0, stl:0, blk:0, tov:0, fgm:0, fga:0, tpm:0, tpa:0, ftm:0, fta:0, min:0, gs:0, gp:0, dd:0, td:0 },
    ]
  },

  /* ─────────────── ISAAC VITEL ─────────────── */
  vitel: {
    regular: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:false, note:'Stats pending upload.' },
    ],
    playoffs: [
      { season:'2024-25', age:22, team:'TBD', ppg:0, rpg:0, apg:0, spg:0, bpg:0, topg:0, fgp:'—', tpp:'—', ftp:'—', tpa:0, gs:0, gp:0, mpg:0, dnq:true, note:'Stats pending upload.' },
    ],
    totals: [
      { season:'2024-25', age:22, team:'TBD', pts:0, reb:0, ast:0, stl:0, blk:0, tov:0, fgm:0, fga:0, tpm:0, tpa:0, ftm:0, fta:0, min:0, gs:0, gp:0, dd:0, td:0 },
    ]
  }

};
