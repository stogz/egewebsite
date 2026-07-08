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
    newjerseynets:          { record: "22-44", pct: ".333", rank: "12th", playoffs: "Did not qualify" },
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