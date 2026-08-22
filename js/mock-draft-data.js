/* ═══════════════════════════════════════════════════════════════
   EGE NBA SIMULATION · MOCK DRAFT DATA
   The 2012 NBA Draft — altered to include five EGE Simulation
   originals (Paxon Hatch, Cooper Clark, Sam Stogsdill, Jaykeb
   Stewart, Isaac Vitel) as extra prospects in the class.

   Real prospects: 2011-12 college season per-game stats, sourced
   from public draft-class records. Team records are final 2011-12
   NBA regular-season marks (66-game lockout season).

   The five EGE originals' college lines are pulled from their
   2K26 simulation profiles (2K26/player-stats-26.js).
   ═══════════════════════════════════════════════════════════════ */

window.MOCK_DRAFT_2012 = {

  /* ── DRAFT ORDER — real 2012 first round, team on the clock ──
     Team keys match logos/teaminfo26.js so historical (2012-era)
     logos/colors resolve via window.getTeamInfoForSeason(key,'2011-12'). */
  order: [
    { pick: 1,  team: 'noh' },
    { pick: 2,  team: 'cho' },
    { pick: 3,  team: 'was' },
    { pick: 4,  team: 'cle' },
    { pick: 5,  team: 'sac' },
    { pick: 6,  team: 'por' },
    { pick: 7,  team: 'gsw' },
    { pick: 8,  team: 'tor' },
    { pick: 9,  team: 'det' },
    { pick: 10, team: 'noh' },
    { pick: 11, team: 'por' },
    { pick: 12, team: 'hou' },
    { pick: 13, team: 'phx' },
    { pick: 14, team: 'mil' },
    { pick: 15, team: 'phi' },
    { pick: 16, team: 'hou' },
    { pick: 17, team: 'dal' },
    { pick: 18, team: 'hou' },
    { pick: 19, team: 'orl' },
    { pick: 20, team: 'den' },
    { pick: 21, team: 'bos' },
    { pick: 22, team: 'bos' },
    { pick: 23, team: 'atl' },
    { pick: 24, team: 'cle' },
    { pick: 25, team: 'mem' },
    { pick: 26, team: 'ind' },
    { pick: 27, team: 'mia' },
    { pick: 28, team: 'okc' },
    { pick: 29, team: 'chi' },
    { pick: 30, team: 'gsw' },
  ],

  /* ── 2011-12 FINAL RECORDS — for the teams above ── */
  records: {
    noh: '21-45', cho: '7-59',  was: '20-46', cle: '21-45', sac: '22-44',
    por: '28-38', gsw: '23-43', tor: '23-43', det: '25-41', hou: '34-32',
    phx: '33-33', mil: '31-35', phi: '35-31', dal: '36-30', orl: '37-29',
    den: '38-28', bos: '39-27', atl: '40-26', mem: '41-25', ind: '42-24',
    mia: '46-20', okc: '47-19', chi: '50-16',
  },

  /* ── PROSPECT POOL — 2011-12 college per-game stats ──
     fgp/tpp/ftp stored as plain numbers (percent, no % sign).
     nbaId — NBA.com person ID for the headshot CDN; omitted where
     not confidently known (falls back to an initials placeholder). */
  prospects: [
    { id:'davis',      name:'Anthony Davis',      college:'Kentucky',           cls:'FR', pos:'F', ppg:14.2, rpg:10.4, apg:1.3, spg:1.4, bpg:4.7, fgp:62.3, tpp:0.0,  ftp:71.0, mpg:32.0, nbaId:203076 },
    { id:'mkg',        name:'Michael Kidd-Gilchrist', college:'Kentucky',       cls:'FR', pos:'F', ppg:11.9, rpg:7.4,  apg:1.3, spg:1.5, bpg:0.8, fgp:49.5, tpp:25.0, ftp:74.9, mpg:29.8, nbaId:203077 },
    { id:'beal',       name:'Bradley Beal',        college:'Florida',          cls:'FR', pos:'G', ppg:14.8, rpg:6.7,  apg:2.2, spg:1.1, bpg:0.5, fgp:44.4, tpp:33.9, ftp:78.5, mpg:32.6, nbaId:203078 },
    { id:'waiters',    name:'Dion Waiters',        college:'Syracuse',         cls:'SO', pos:'G', ppg:12.6, rpg:2.3,  apg:2.1, spg:1.1, bpg:0.2, fgp:45.4, tpp:33.3, ftp:79.9, mpg:22.1, nbaId:203079 },
    { id:'robinson',   name:'Thomas Robinson',     college:'Kansas',           cls:'JR', pos:'F', ppg:17.7, rpg:11.9, apg:1.0, spg:0.9, bpg:0.7, fgp:50.3, tpp:0.0,  ftp:70.3, mpg:32.3, nbaId:203080 },
    { id:'lillard',    name:'Damian Lillard',      college:'Weber State',      cls:'SR', pos:'G', ppg:24.5, rpg:4.0,  apg:4.0, spg:1.4, bpg:0.2, fgp:47.0, tpp:41.0, ftp:88.0, mpg:37.4, nbaId:203081 },
    { id:'barnes',     name:'Harrison Barnes',     college:'North Carolina',   cls:'SO', pos:'F', ppg:17.1, rpg:5.8,  apg:1.4, spg:0.9, bpg:0.4, fgp:43.9, tpp:35.8, ftp:79.8, mpg:32.5, nbaId:203084 },
    { id:'ross',       name:'Terrence Ross',       college:'Washington',       cls:'SO', pos:'G', ppg:16.4, rpg:5.8,  apg:1.4, spg:1.1, bpg:0.5, fgp:44.7, tpp:36.9, ftp:74.3, mpg:31.7, nbaId:203082 },
    { id:'drummond',   name:'Andre Drummond',      college:'Connecticut',      cls:'FR', pos:'C', ppg:10.0, rpg:7.6,  apg:0.5, spg:0.4, bpg:2.7, fgp:54.9, tpp:0.0,  ftp:29.1, mpg:24.9, nbaId:203083 },
    { id:'rivers',     name:'Austin Rivers',       college:'Duke',             cls:'FR', pos:'G', ppg:15.5, rpg:3.4,  apg:2.1, spg:1.1, bpg:0.2, fgp:41.8, tpp:36.0, ftp:68.5, mpg:32.0, nbaId:203085 },
    { id:'leonard',    name:'Meyers Leonard',      college:'Illinois',         cls:'SO', pos:'C', ppg:13.6, rpg:8.2,  apg:0.6, spg:0.5, bpg:1.6, fgp:58.2, tpp:0.0,  ftp:72.6, mpg:29.5, nbaId:203086 },
    { id:'jlamb',      name:'Jeremy Lamb',         college:'Connecticut',      cls:'SO', pos:'G', ppg:17.7, rpg:5.6,  apg:2.0, spg:1.2, bpg:0.7, fgp:44.7, tpp:36.0, ftp:77.5, mpg:33.0, nbaId:203087 },
    { id:'marshall',   name:'Kendall Marshall',    college:'North Carolina',   cls:'SO', pos:'G', ppg:8.1,  rpg:2.2,  apg:9.8, spg:1.6, bpg:0.1, fgp:42.5, tpp:34.0, ftp:74.0, mpg:33.0, nbaId:203088 },
    { id:'henson',     name:'John Henson',         college:'North Carolina',   cls:'JR', pos:'F', ppg:13.7, rpg:10.2, apg:1.0, spg:0.7, bpg:2.9, fgp:58.5, tpp:0.0,  ftp:54.5, mpg:30.9, nbaId:203089 },
    { id:'harkless',   name:'Maurice Harkless',    college:"St. John's",       cls:'FR', pos:'F', ppg:15.3, rpg:8.6,  apg:1.2, spg:1.4, bpg:1.0, fgp:46.7, tpp:26.7, ftp:65.7, mpg:33.0, nbaId:203090 },
    { id:'white',      name:'Royce White',         college:'Iowa State',       cls:'SO', pos:'F', ppg:13.4, rpg:9.3,  apg:5.0, spg:1.5, bpg:0.7, fgp:51.0, tpp:25.0, ftp:70.5, mpg:30.6, nbaId:203091 },
    { id:'zeller',     name:'Tyler Zeller',        college:'North Carolina',   cls:'SR', pos:'C', ppg:16.3, rpg:9.6,  apg:1.5, spg:0.6, bpg:1.4, fgp:55.7, tpp:0.0,  ftp:75.0, mpg:30.7, nbaId:203092 },
    { id:'tjones',     name:'Terrence Jones',      college:'Kentucky',         cls:'SO', pos:'F', ppg:12.3, rpg:7.7,  apg:1.1, spg:1.0, bpg:1.1, fgp:49.7, tpp:33.9, ftp:66.4, mpg:26.8, nbaId:203093 },
    { id:'nicholson',  name:'Andrew Nicholson',    college:'St. Bonaventure',  cls:'SR', pos:'F', ppg:18.5, rpg:8.0,  apg:1.3, spg:0.7, bpg:2.2, fgp:60.4, tpp:0.0,  ftp:70.7, mpg:31.5, nbaId:203094 },
    { id:'sullinger',  name:'Jared Sullinger',     college:'Ohio State',       cls:'SO', pos:'F', ppg:17.2, rpg:9.2,  apg:1.6, spg:0.8, bpg:1.0, fgp:52.2, tpp:40.0, ftp:66.0, mpg:31.9, nbaId:203096 },
    { id:'melo',       name:'Fab Melo',            college:'Syracuse',         cls:'SO', pos:'C', ppg:7.8,  rpg:5.8,  apg:0.3, spg:0.3, bpg:2.2, fgp:55.0, tpp:0.0,  ftp:60.9, mpg:20.4, nbaId:203097 },
    { id:'jenkins',    name:'John Jenkins',        college:'Vanderbilt',       cls:'JR', pos:'G', ppg:19.9, rpg:3.3,  apg:1.4, spg:0.9, bpg:0.1, fgp:46.4, tpp:44.3, ftp:84.9, mpg:32.9, nbaId:203098 },
    { id:'cunningham', name:'Jared Cunningham',    college:'Oregon State',     cls:'JR', pos:'G', ppg:18.6, rpg:4.6,  apg:2.9, spg:2.3, bpg:0.3, fgp:44.4, tpp:34.5, ftp:79.0, mpg:33.9, nbaId:203099 },
    { id:'wroten',     name:'Tony Wroten',         college:'Washington',       cls:'FR', pos:'G', ppg:16.2, rpg:4.6,  apg:3.9, spg:1.6, bpg:0.4, fgp:43.1, tpp:14.3, ftp:55.9, mpg:31.4, nbaId:203100 },
    { id:'mplumlee',   name:'Miles Plumlee',       college:'Duke',             cls:'SR', pos:'C', ppg:6.7,  rpg:5.2,  apg:0.6, spg:0.4, bpg:0.8, fgp:55.9, tpp:0.0,  ftp:61.2, mpg:19.4, nbaId:203101 },
    { id:'moultrie',   name:'Arnett Moultrie',     college:'Mississippi State',cls:'JR', pos:'F', ppg:16.5, rpg:10.5, apg:1.0, spg:0.9, bpg:1.0, fgp:51.6, tpp:25.0, ftp:67.6, mpg:31.6, nbaId:203102 },
    { id:'pjones',     name:'Perry Jones III',     college:'Baylor',           cls:'SO', pos:'F', ppg:13.5, rpg:7.7,  apg:1.6, spg:0.9, bpg:1.2, fgp:50.5, tpp:25.9, ftp:66.4, mpg:27.5, nbaId:203103 },
    { id:'teague',     name:'Marquis Teague',      college:'Kentucky',         cls:'FR', pos:'G', ppg:9.9,  rpg:1.8,  apg:3.9, spg:1.0, bpg:0.1, fgp:44.8, tpp:27.4, ftp:72.4, mpg:22.9, nbaId:203104 },
    { id:'ezeli',      name:'Festus Ezeli',        college:'Vanderbilt',       cls:'SR', pos:'C', ppg:10.5, rpg:6.4,  apg:0.6, spg:0.4, bpg:1.8, fgp:57.5, tpp:0.0,  ftp:61.9, mpg:24.2, nbaId:203105 },
    { id:'green',      name:'Draymond Green',      college:'Michigan State',   cls:'SR', pos:'F', ppg:16.0, rpg:10.6, apg:3.4, spg:1.6, bpg:0.6, fgp:45.7, tpp:32.0, ftp:66.8, mpg:32.6, nbaId:203110 },
    { id:'middleton',  name:'Khris Middleton',     college:'Texas A&M',        cls:'JR', pos:'G', ppg:13.7, rpg:5.6,  apg:1.6, spg:1.0, bpg:0.3, fgp:46.4, tpp:44.7, ftp:78.7, mpg:29.9, nbaId:203114 },
    { id:'crowder',    name:'Jae Crowder',         college:'Marquette',        cls:'SR', pos:'F', ppg:17.9, rpg:8.2,  apg:2.1, spg:1.6, bpg:0.5, fgp:48.4, tpp:40.0, ftp:75.7, mpg:33.6, nbaId:203109 },
    { id:'barton',     name:'Will Barton',         college:'Memphis',          cls:'SO', pos:'G', ppg:17.1, rpg:7.3,  apg:2.2, spg:1.4, bpg:0.6, fgp:46.2, tpp:31.0, ftp:68.1, mpg:33.2 },
    { id:'mscott',     name:'Mike Scott',          college:'Virginia',         cls:'SR', pos:'F', ppg:18.1, rpg:8.2,  apg:1.6, spg:0.6, bpg:0.6, fgp:54.5, tpp:32.0, ftp:74.0, mpg:32.0 },
    { id:'dlamb',      name:'Doron Lamb',          college:'Kentucky',         cls:'SO', pos:'G', ppg:13.7, rpg:2.4,  apg:1.4, spg:0.7, bpg:0.1, fgp:47.2, tpp:47.0, ftp:89.0, mpg:26.0 },
    { id:'english',    name:'Kim English',         college:'Missouri',         cls:'SR', pos:'G', ppg:13.5, rpg:3.4,  apg:1.6, spg:1.0, bpg:0.2, fgp:46.0, tpp:43.1, ftp:88.5, mpg:30.5 },
    { id:'sacre',      name:'Robert Sacre',        college:'Gonzaga',          cls:'SR', pos:'C', ppg:11.6, rpg:7.4,  apg:1.0, spg:0.4, bpg:2.1, fgp:51.3, tpp:0.0,  ftp:65.9, mpg:26.1 },
    { id:'qmiller',    name:'Quincy Miller',       college:'Baylor',           cls:'FR', pos:'F', ppg:10.1, rpg:5.2,  apg:1.2, spg:0.7, bpg:1.1, fgp:40.9, tpp:31.8, ftp:66.7, mpg:24.9 },
    { id:'dmiller',    name:'Darius Miller',       college:'Kentucky',         cls:'SR', pos:'F', ppg:10.4, rpg:3.9,  apg:2.0, spg:0.9, bpg:0.3, fgp:45.7, tpp:41.0, ftp:74.0, mpg:27.8 },

    /* ── EGE Simulation originals — 2011-12 college season, pulled
       from the 2K26 simulation (2K26/player-stats-26.js) ── */
    { id:'clark',      name:'Cooper Clark',        college:'Louisville',       cls:'FR', pos:'G', ppg:19.4, rpg:5.5,  apg:2.1, spg:2.2, bpg:0.8, fgp:51.2, tpp:20.4, ftp:81.3, mpg:33.8, fictional:true },
    { id:'hatch',      name:'Paxon Hatch',         college:'Texas',            cls:'FR', pos:'C', ppg:15.6, rpg:9.0,  apg:1.4, spg:0.8, bpg:2.5, fgp:54.8, tpp:32.7, ftp:78.3, mpg:31.9, fictional:true },
    { id:'stogsdill',  name:'Sam Stogsdill',       college:'Butler',           cls:'FR', pos:'C', ppg:19.6, rpg:8.1,  apg:6.2, spg:1.6, bpg:1.3, fgp:54.0, tpp:19.2, ftp:78.5, mpg:35.0, fictional:true },
    { id:'stewart',    name:'Jaykeb Stewart',      college:'Marquette',        cls:'FR', pos:'F', ppg:11.5, rpg:8.5,  apg:1.3, spg:2.2, bpg:1.8, fgp:59.1, tpp:21.4, ftp:70.4, mpg:31.6, fictional:true },
    { id:'vitel',      name:'Isaac Vitel',         college:'Indiana',          cls:'FR', pos:'G', ppg:16.9, rpg:4.3,  apg:4.1, spg:1.8, bpg:0.3, fgp:48.1, tpp:42.1, ftp:86.2, mpg:33.8, fictional:true },
  ],

};
