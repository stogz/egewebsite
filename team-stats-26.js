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
  "Marcus Vega":     "",
  "Dante Okafor":    "",
  "Eli Marchetti":   "",
  "Cole Pemberton":  "",
  "Jordan Cross":    "",
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
        { top: "bostonceltics",  topW: 1, bot: "miamiheat",          botW: 0 },  /* 3/6 vs 2/7 */
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
    finals: { top: "dallasmavericks", topW: 4, bot: "miamiheat", botW: 0 },
  },
}