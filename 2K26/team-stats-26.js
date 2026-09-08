/* ══════════════════════════════════════════════════════════════
   team-stats-26.js — All team data for Sim II (teams.html)
   Structure mirrors team-stats.js exactly.
   ══════════════════════════════════════════════════════════════ */

/* ── TEAM INFO ─────────────────────────────────────────────── */
window.EGE_TEAM_INFO = {
  atlantahawks:          { name: "Atlanta Hawks",           division: "Eastern Conference, Southeast Division" },
  bostonceltics:         { name: "Boston Celtics",          division: "Eastern Conference, Atlantic Division" },
  newjerseynets:         { name: "New Jersey Nets",         division: "Eastern Conference, Atlantic Division" },
  brooklynnets:          { name: "Brooklyn Nets",           division: "Eastern Conference, Atlantic Division" },
  charlottebobcats:      { name: "Charlotte Bobcats",       division: "Eastern Conference, Southeast Division" },
  charlottehornets:      { name: "Charlotte Hornets",       division: "Eastern Conference, Southeast Division" },
  chicagobulls:          { name: "Chicago Bulls",           division: "Eastern Conference, Central Division" },
  clevelandcavaliers:    { name: "Cleveland Cavaliers",     division: "Eastern Conference, Central Division" },
  dallasmavericks:       { name: "Dallas Mavericks",        division: "Western Conference, Southwest Division" },
  denvernuggets:         { name: "Denver Nuggets",          division: "Western Conference, Northwest Division" },
  detroitpistons:        { name: "Detroit Pistons",         division: "Eastern Conference, Central Division" },
  goldenstatewarriors:   { name: "Golden State Warriors",   division: "Western Conference, Pacific Division" },
  houstonrockets:        { name: "Houston Rockets",         division: "Western Conference, Southwest Division" },
  indianapacers:         { name: "Indiana Pacers",          division: "Eastern Conference, Central Division" },
  losangelesclippers:    { name: "Los Angeles Clippers",    division: "Western Conference, Pacific Division" },
  losangeleslakers:      { name: "Los Angeles Lakers",      division: "Western Conference, Pacific Division" },
  memphisgrizzlies:      { name: "Memphis Grizzlies",       division: "Western Conference, Southwest Division" },
  miamiheat:             { name: "Miami Heat",              division: "Eastern Conference, Southeast Division" },
  milwaukeebucks:        { name: "Milwaukee Bucks",         division: "Eastern Conference, Central Division" },
  minnesotatimberwolves: { name: "Minnesota Timberwolves",  division: "Western Conference, Northwest Division" },
  neworleanshornets:     { name: "New Orleans Hornets",     division: "Western Conference, Southwest Division" },
  newyorkknicks:         { name: "New York Knicks",         division: "Eastern Conference, Atlantic Division" },
  oklahomacitythunder:   { name: "Oklahoma City Thunder",   division: "Western Conference, Northwest Division" },
  orlandomagic:          { name: "Orlando Magic",           division: "Eastern Conference, Southeast Division" },
  philadelphia76ers:     { name: "Philadelphia 76ers",      division: "Eastern Conference, Atlantic Division" },
  phoenixsuns:           { name: "Phoenix Suns",            division: "Western Conference, Pacific Division" },
  portlandtrailblazers:  { name: "Portland Trail Blazers",  division: "Western Conference, Northwest Division" },
  sacramentokings:       { name: "Sacramento Kings",        division: "Western Conference, Pacific Division" },
  sanantoniospurs:       { name: "San Antonio Spurs",       division: "Western Conference, Southwest Division" },
  torontoraptors:        { name: "Toronto Raptors",         division: "Eastern Conference, Atlantic Division" },
  utahjazz:              { name: "Utah Jazz",               division: "Western Conference, Northwest Division" },
  washingtonwizards:     { name: "Washington Wizards",      division: "Eastern Conference, Southeast Division" },
};

/* ── PLAYER ICON URLS ───────────────────────────────────────── */
window.EGE_PLAYER_ICONS = {
  "Cooper Clark":   "headshots/headshot_clark.png",
  "Jaykeb Stewart": "headshots/headshot_stewart.png",
  "Sam Stogsdill":  "headshots/headshot_stogsdill.png",
  "Paxon Hatch":    "headshots/headshot_hatch.png",
  "Isaac Vitel":    "headshots/headshot_vitel.png",
};

/* ══════════════════════════════════════════════════════════════
   SEASON STATS — Sim II seasons
   ══════════════════════════════════════════════════════════════ */
window.EGE_SEASON_STATS = {

  /* ── 2010-11 ──────────────────────────────────────────────── */
  "2010-11": {
    /* EAST */
    chicagobulls:          { record: "62-20", pct: ".756", rank: "1st",  playoffs: "Lost in Conference Finals" },
    miamiheat:             { record: "58-24", pct: ".707", rank: "2nd",  playoffs: "Lost in NBA Finals" },
    bostonceltics:         { record: "56-26", pct: ".683", rank: "3rd",  playoffs: "Lost in Conference Semifinals" },
    orlandomagic:          { record: "52-30", pct: ".634", rank: "4th",  playoffs: "Lost in First Round" },
    atlantahawks:          { record: "44-38", pct: ".537", rank: "5th",  playoffs: "Lost in First Round" },
    newyorkknicks:         { record: "42-40", pct: ".512", rank: "6th",  playoffs: "Lost in First Round" },
    philadelphia76ers:     { record: "41-41", pct: ".500", rank: "7th",  playoffs: "Lost in First Round" },
    indianapacers:         { record: "37-45", pct: ".451", rank: "8th",  playoffs: "Lost in First Round" },
    milwaukeebucks:        { record: "35-47", pct: ".427", rank: "9th",  playoffs: "Did not qualify" },
    charlottebobcats:      { record: "34-48", pct: ".415", rank: "10th", playoffs: "Did not qualify" },
    detroitpistons:        { record: "30-52", pct: ".366", rank: "11th", playoffs: "Did not qualify" },
    newjerseynets:          { record: "24-58", pct: ".293", rank: "12th", playoffs: "Did not qualify" },
    washingtonwizards:     { record: "23-59", pct: ".280", rank: "13th", playoffs: "Did not qualify" },
    torontoraptors:        { record: "22-60", pct: ".268", rank: "14th", playoffs: "Did not qualify" },
    clevelandcavaliers:    { record: "19-63", pct: ".232", rank: "15th", playoffs: "Did not qualify" },
    /* WEST */
    sanantoniospurs:       { record: "61-21", pct: ".744", rank: "1st",  playoffs: "Lost in Conference Semifinals" },
    losangeleslakers:      { record: "57-25", pct: ".695", rank: "2nd",  playoffs: "Lost in Conference Semifinals" },
    dallasmavericks:       { record: "57-25", pct: ".695", rank: "3rd",  playoffs: "Champions", finals_mvp: "Dirk Nowitzki" },
    oklahomacitythunder:   { record: "55-27", pct: ".671", rank: "4th",  playoffs: "Lost in Conference Finals" },
    denvernuggets:         { record: "50-32", pct: ".610", rank: "5th",  playoffs: "Lost in Conference Semifinals" },
    portlandtrailblazers:  { record: "48-34", pct: ".585", rank: "6th",  playoffs: "Lost in First Round" },
    neworleanshornets:     { record: "46-36", pct: ".561", rank: "7th",  playoffs: "Lost in First Round" },
    memphisgrizzlies:      { record: "46-36", pct: ".561", rank: "8th",  playoffs: "Lost in Conference Finals" },
    houstonrockets:        { record: "43-39", pct: ".524", rank: "9th",  playoffs: "Did not qualify" },
    phoenixsuns:           { record: "40-42", pct: ".488", rank: "10th", playoffs: "Did not qualify" },
    utahjazz:              { record: "39-43", pct: ".476", rank: "11th", playoffs: "Did not qualify" },
    goldenstatewarriors:   { record: "36-46", pct: ".439", rank: "12th", playoffs: "Did not qualify" },
    losangelesclippers:    { record: "32-50", pct: ".390", rank: "13th", playoffs: "Did not qualify" },
    sacramentokings:       { record: "24-58", pct: ".293", rank: "14th", playoffs: "Did not qualify" },
    minnesotatimberwolves: { record: "17-65", pct: ".207", rank: "15th", playoffs: "Did not qualify" },
  },

  /* ── 2011-12 ──────────────────────────────────────────────── */
  "2011-12": {
    /* EAST */
    chicagobulls:          { record: "50-16", pct: ".758", rank: "1st",  playoffs: "Lost in First Round" },
    miamiheat:             { record: "46-20", pct: ".697", rank: "2nd",  playoffs: "Champions", finals_mvp: "LeBron James" },
    indianapacers:         { record: "42-24", pct: ".636", rank: "3rd",  playoffs: "Lost in Conference Semifinals" },
    bostonceltics:         { record: "39-27", pct: ".591", rank: "4th",  playoffs: "Lost in Conference Finals" },
    atlantahawks:          { record: "40-26", pct: ".606", rank: "5th",  playoffs: "Lost in First Round" },
    orlandomagic:          { record: "37-29", pct: ".561", rank: "6th",  playoffs: "Lost in First Round" },
    newyorkknicks:         { record: "36-30", pct: ".545", rank: "7th",  playoffs: "Lost in First Round" },
    philadelphia76ers:     { record: "35-31", pct: ".530", rank: "8th",  playoffs: "Lost in Conference Semifinals" },
    milwaukeebucks:        { record: "31-35", pct: ".470", rank: "9th",  playoffs: "Did not qualify" },
    detroitpistons:        { record: "25-41", pct: ".379", rank: "10th", playoffs: "Did not qualify" },
    torontoraptors:        { record: "23-43", pct: ".348", rank: "11th", playoffs: "Did not qualify" },
    brooklynnets:          { record: "22-44", pct: ".333", rank: "12th", playoffs: "Did not qualify" },
    clevelandcavaliers:    { record: "21-45", pct: ".318", rank: "13th", playoffs: "Did not qualify" },
    washingtonwizards:     { record: "20-46", pct: ".303", rank: "14th", playoffs: "Did not qualify" },
    charlottebobcats:      { record: "7-59",  pct: ".106", rank: "15th", playoffs: "Did not qualify" },
    /* WEST */
    sanantoniospurs:       { record: "50-16", pct: ".758", rank: "1st",  playoffs: "Lost in Conference Finals" },
    oklahomacitythunder:   { record: "47-19", pct: ".712", rank: "2nd",  playoffs: "Lost in NBA Finals" },
    losangeleslakers:      { record: "41-25", pct: ".621", rank: "3rd",  playoffs: "Lost in Conference Semifinals" },
    memphisgrizzlies:      { record: "41-25", pct: ".621", rank: "4th",  playoffs: "Lost in First Round" },
    losangelesclippers:    { record: "40-26", pct: ".606", rank: "5th",  playoffs: "Lost in Conference Semifinals" },
    denvernuggets:         { record: "38-28", pct: ".576", rank: "6th",  playoffs: "Lost in First Round" },
    dallasmavericks:       { record: "36-30", pct: ".545", rank: "7th",  playoffs: "Lost in First Round" },
    utahjazz:              { record: "36-30", pct: ".545", rank: "8th",  playoffs: "Lost in First Round" },
    houstonrockets:        { record: "34-32", pct: ".515", rank: "9th",  playoffs: "Did not qualify" },
    phoenixsuns:           { record: "33-33", pct: ".500", rank: "10th", playoffs: "Did not qualify" },
    portlandtrailblazers:  { record: "28-38", pct: ".424", rank: "11th", playoffs: "Did not qualify" },
    minnesotatimberwolves: { record: "26-40", pct: ".394", rank: "12th", playoffs: "Did not qualify" },
    goldenstatewarriors:   { record: "23-43", pct: ".348", rank: "13th", playoffs: "Did not qualify" },
    sacramentokings:       { record: "22-44", pct: ".333", rank: "14th", playoffs: "Did not qualify" },
    neworleanshornets:     { record: "21-45", pct: ".318", rank: "15th", playoffs: "Did not qualify" },
  },
  
}; /* end EGE_SEASON_STATS */
window.EGE_BRACKETS = {
  "2010-11": {
    east: {
      playoff_seeds: {},
      r1: [
        { top: "chicagobulls",     topW: 4, bot: "indianapacers",     botW: 1 },  /* 1 vs 8 */
        { top: "orlandomagic",     topW: 2, bot: "atlantahawks",  botW: 4 },  /* 4 vs 5 */
        { top: "bostonceltics",      topW: 4, bot: "newyorkknicks",          botW: 0 },  /* 3 vs 6 */
        { top: "miamiheat",  topW: 4, bot: "philadelphia76ers",       botW: 1 },  /* 2 vs 7 */
      ],
      r2: [
        { top: "chicagobulls",     topW: 4, bot: "atlantahawks",     botW: 2 },  /* 1/8 vs 4/5 */
        { top: "bostonceltics",  topW: 1, bot: "miamiheat",          botW: 4 },  /* 3/6 vs 2/7 */
      ],
      r3: [
        { top: "chicagobulls",     topW: 1, bot: "miamiheat",  botW: 4 },
      ],
    },
    west: {
      playoff_seeds: {},
      r1: [
        { top: "sanantoniospurs",    topW: 2, bot: "memphisgrizzlies",     botW: 4 },  /* 1 vs 8 */
        { top: "oklahomacitythunder",    topW: 4, bot: "denvernuggets",           botW: 1 },  /* 4 vs 5 */
        { top: "dallasmavericks",      topW: 4, bot: "portlandtrailblazers",   botW: 2 },  /* 3 vs 6 */
        { top: "losangeleslakers",topW: 4, bot: "neworleanshornets",        botW: 2 },  /* 2 vs 7 */
      ],
      r2: [
        { top: "memphisgrizzlies",    topW: 3, bot: "oklahomacitythunder",    botW: 4 },  /* 1/8 vs 4/5 */
        { top: "dallasmavericks",topW: 4, bot: "losangeleslakers",      botW: 0 },  /* 3/6 vs 2/7 */
      ],
      r3: [
        { top: "oklahomacitythunder",    topW: 1, bot: "dallasmavericks",botW: 4 },
      ],
    },
    finals: { top: "dallasmavericks", topW: 4, bot: "miamiheat", botW: 2 },
  },
  "2011-12": {
    east: {
      playoff_seeds: {},
      r1: [
        { top: "chicagobulls",     topW: 2, bot: "philadelphia76ers",  botW: 4 },  /* 1 vs 8 */
        { top: "bostonceltics",    topW: 4, bot: "atlantahawks",       botW: 2 },  /* 4 vs 5 */
        { top: "indianapacers",    topW: 4, bot: "orlandomagic",       botW: 1 },  /* 3 vs 6 */
        { top: "miamiheat",        topW: 4, bot: "newyorkknicks",      botW: 1 },  /* 2 vs 7 */
      ],
      r2: [
        { top: "philadelphia76ers", topW: 3, bot: "bostonceltics",     botW: 4 },  /* 1/8 vs 4/5 */
        { top: "indianapacers",     topW: 2, bot: "miamiheat",         botW: 4 },  /* 3/6 vs 2/7 */
      ],
      r3: [
        { top: "bostonceltics",    topW: 3, bot: "miamiheat",          botW: 4 },
      ],
    },
    west: {
      playoff_seeds: {},
      r1: [
        { top: "sanantoniospurs",     topW: 4, bot: "utahjazz",           botW: 0 },  /* 1 vs 8 */
        { top: "memphisgrizzlies",    topW: 3, bot: "losangelesclippers", botW: 4 },  /* 4 vs 5 */
        { top: "losangeleslakers",    topW: 4, bot: "denvernuggets",      botW: 3 },  /* 3 vs 6 */
        { top: "oklahomacitythunder", topW: 4, bot: "dallasmavericks",    botW: 0 },  /* 2 vs 7 */
      ],
      r2: [
        { top: "sanantoniospurs",     topW: 4, bot: "losangelesclippers", botW: 0 },  /* 1/8 vs 4/5 */
        { top: "losangeleslakers",    topW: 1, bot: "oklahomacitythunder", botW: 4 },  /* 3/6 vs 2/7 */
      ],
      r3: [
        { top: "sanantoniospurs",     topW: 2, bot: "oklahomacitythunder", botW: 4 },
      ],
    },
    finals: { top: "miamiheat", topW: 4, bot: "oklahomacitythunder", botW: 1 },
  },
}

/* ══════════════════════════════════════════════════════════════
   TOP PLAYERS
   The third thing that can fill the roster slot on teams.html. A season
   here can have a full roster (EGE_ROSTERS), this — a team's best three,
   as headshot, name and a star rating — or neither, which leaves the
   "no roster data" note. teams.html prefers a roster when both exist.

   Format:  "SEASON": { ABBR: [ { name, stars }, ... up to three ] }

   `name` is looked up in NBA_All_Player_IDs.csv to build the headshot URL,
   so it has to match the spelling there (accents and case are ignored).
   38 names in that file belong to more than one player — for those, add
   `nbaId` to say which one, as CHO's Gerald Henderson does below.
   `stars` runs 1-5 and may end in .5.
   ══════════════════════════════════════════════════════════════ */
window.EGE_TOP_PLAYERS = {

  /* ── 2011-12 ──────────────────────────────────────────────── */
  "2011-12": {
    /* EAST */
    CHI: [
      { name: "Derrick Rose", stars: 5 },
      { name: "Luol Deng", stars: 4 },
      { name: "Joakim Noah", stars: 4 },
    ],
    MIA: [
      { name: "LeBron James", stars: 5 },
      { name: "Dwyane Wade", stars: 5 },
      { name: "Chris Bosh", stars: 4 },
    ],
    IND: [
      { name: "Danny Granger", stars: 4 },
      { name: "Roy Hibbert", stars: 4 },
      { name: "David West", stars: 3.5 },
    ],
    BOS: [
      { name: "Rajon Rondo", stars: 4 },
      { name: "Paul Pierce", stars: 4 },
      { name: "Kevin Garnett", stars: 4 },
    ],
    ATL: [
      { name: "Josh Smith", stars: 4 },
      { name: "Joe Johnson", stars: 3.5 },
      { name: "Al Horford", stars: 3.5 },
    ],
    ORL: [
      { name: "Dwight Howard", stars: 5 },
      { name: "Ryan Anderson", stars: 3.5 },
      { name: "Jameer Nelson", stars: 3 },
    ],
    NYK: [
      { name: "Carmelo Anthony", stars: 4.5 },
      { name: "Tyson Chandler", stars: 4 },
      { name: "Amar'e Stoudemire", stars: 3.5 },
    ],
    PHI: [
      { name: "Andre Iguodala", stars: 3.5 },
      { name: "Lou Williams", stars: 3 },
      { name: "Jrue Holiday", stars: 3 },
    ],
    MIL: [
      { name: "Brandon Jennings", stars: 3.5 },
      { name: "Monta Ellis", stars: 3.5 },
      { name: "Ersan Ilyasova", stars: 3 },
    ],
    DET: [
      { name: "Greg Monroe", stars: 3.5 },
      { name: "Rodney Stuckey", stars: 2.5 },
      { name: "Brandon Knight", stars: 2.5 },
    ],
    TOR: [
      { name: "DeMar DeRozan", stars: 3 },
      { name: "Andrea Bargnani", stars: 3 },
      { name: "Jose Calderon", stars: 2.5 },
    ],
    BKN: [
      { name: "Deron Williams", stars: 4 },
      { name: "Brook Lopez", stars: 3 },
      { name: "MarShon Brooks", stars: 2.5 },
    ],
    CLE: [
      { name: "Kyrie Irving", stars: 4 },
      { name: "Antawn Jamison", stars: 3 },
      { name: "Anderson Varejao", stars: 3 },
    ],
    WAS: [
      { name: "John Wall", stars: 3.5 },
      { name: "Nene", stars: 3 },
      { name: "Jordan Crawford", stars: 2.5 },
    ],
    CHO: [
      { name: "Gerald Henderson", stars: 2.5, nbaId: 201945 },
      { name: "Kemba Walker", stars: 2.5 },
      { name: "Byron Mullens", stars: 2 },
    ],
    /* WEST */
    SAS: [
      { name: "Tony Parker", stars: 4.5 },
      { name: "Tim Duncan", stars: 4 },
      { name: "Manu Ginobili", stars: 4 },
    ],
    OKC: [
      { name: "Kevin Durant", stars: 5 },
      { name: "Russell Westbrook", stars: 4.5 },
      { name: "James Harden", stars: 4 },
    ],
    LAL: [
      { name: "Kobe Bryant", stars: 5 },
      { name: "Andrew Bynum", stars: 4 },
      { name: "Pau Gasol", stars: 4 },
    ],
    MEM: [
      { name: "Marc Gasol", stars: 4 },
      { name: "Rudy Gay", stars: 3.5 },
      { name: "Zach Randolph", stars: 3.5 },
    ],
    LAC: [
      { name: "Chris Paul", stars: 5 },
      { name: "Blake Griffin", stars: 4.5 },
      { name: "DeAndre Jordan", stars: 3.5 },
    ],
    DEN: [
      { name: "Ty Lawson", stars: 3.5 },
      { name: "Danilo Gallinari", stars: 3.5 },
      { name: "Al Harrington", stars: 3 },
    ],
    DAL: [
      { name: "Dirk Nowitzki", stars: 4.5 },
      { name: "Jason Terry", stars: 3 },
      { name: "Shawn Marion", stars: 3 },
    ],
    UTA: [
      { name: "Al Jefferson", stars: 3.5 },
      { name: "Paul Millsap", stars: 3.5 },
      { name: "Gordon Hayward", stars: 3 },
    ],
    HOU: [
      { name: "Luis Scola", stars: 3.5 },
      { name: "Kevin Martin", stars: 3 },
      { name: "Goran Dragic", stars: 3 },
    ],
    PHX: [
      { name: "Steve Nash", stars: 4 },
      { name: "Marcin Gortat", stars: 3.5 },
      { name: "Jared Dudley", stars: 3 },
    ],
    POR: [
      { name: "LaMarcus Aldridge", stars: 4.5 },
      { name: "Nicolas Batum", stars: 3.5 },
      { name: "Wesley Matthews", stars: 3 },
    ],
    MIN: [
      { name: "Kevin Love", stars: 4.5 },
      { name: "Nikola Pekovic", stars: 3.5 },
      { name: "Ricky Rubio", stars: 3.5 },
    ],
    GSW: [
      { name: "David Lee", stars: 4 },
      { name: "Stephen Curry", stars: 3.5 },
      { name: "Klay Thompson", stars: 3 },
    ],
    SAC: [
      { name: "DeMarcus Cousins", stars: 4 },
      { name: "Tyreke Evans", stars: 3 },
      { name: "Marcus Thornton", stars: 3 },
    ],
    NOH: [
      { name: "Eric Gordon", stars: 3 },
      { name: "Jarrett Jack", stars: 2.5 },
      { name: "Chris Kaman", stars: 2.5 },
    ],
  },

};
