  /* ═══════════════════════════════════════════
     TEAMS PAGE LOGIC (teams.html)

     Two views, toggled by whether a team is selected (tracked in the
     URL hash, e.g. #bostonceltics26):
       - Standings: both conferences + the playoff bracket
       - Detail: one team's banner, roster, win chart, ratings gauges,
         postseason series, and trends vs. the prior season

     Loads team-stats.js for the active sim, then everything below
     runs inside window.__EGE_TEAMS_BOOT (called once that file, or
     its error handler, fires).
  ═══════════════════════════════════════════ */
  (function() {
    var sim = window.EGE_SIM || { teamStatsFile:'2K25/team-stats.js' };
    var s = document.createElement('script');
    s.src = sim.teamStatsFile;
    s.onload = function() {
      if (typeof window.__EGE_TEAMS_BOOT === 'function') window.__EGE_TEAMS_BOOT();
    };
    s.onerror = function() {
      if (typeof window.__EGE_TEAMS_BOOT === 'function') window.__EGE_TEAMS_BOOT();
    };
    document.body.appendChild(s);
  })();

  window.__EGE_TEAMS_BOOT = function() {
    /* ─── LOGO FOLDER — sim-aware ─────────────────────────────── */
    /* Logo folder — all sims now use 'logos/' */
    var LOGOS_DIR = ((window.EGE_SIM && window.EGE_SIM.logosFolder) || 'logos') + '/';

    /* ─── DATA ACCESS ─────────────────────────────────────────── */
    function TEAM_INFO()    { return window.EGE_TEAM_INFO    || {}; }
    function SEASON_STATS() { return window.EGE_SEASON_STATS || {}; }
    function RATINGS()      { return window.EGE_RATINGS      || {}; }
    function ROSTERS()      { return window.EGE_ROSTERS      || {}; }
    function PLAYER_ICONS() { return window.EGE_PLAYER_ICONS || {}; }

    /* ─── CONSTANTS — built from teaminfo.js ──────────────────── */

    // Build name→teamInfo lookup from teamInfo (keyed by abbr slug in teaminfo.js)
    function _buildNameMap() {
      var map = {};
      if (typeof teamInfo === 'undefined') return map;
      Object.keys(teamInfo).forEach(function(k) {
        var t = teamInfo[k];
        map[t.name] = t;
      });
      return map;
    }
    var _teamByName = _buildNameMap();

    function getTeamInfo(teamName) {
      return _teamByName[teamName] || null;
    }

    // Resolve the correct logo for a team in a given season.
    // Uses getTeamInfoForSeason (2K26) so logos change by year automatically.
    // Falls back to the flat shim for 2K25.
    function _logoForTeam(teamName, season, useWht) {
      if (typeof window.getTeamInfoForSeason === 'function') {
        var key = null;
        if (typeof teamInfo !== 'undefined') {
          Object.keys(teamInfo).some(function(k) {
            if (teamInfo[k].name === teamName) { key = k; return true; }
          });
        }
        if (key) {
          var resolved = window.getTeamInfoForSeason(key, season);
          if (resolved) return LOGOS_DIR + (useWht ? resolved.teamLogoWHT : resolved.teamLogoCLR);
        }
      }
      var t = getTeamInfo(teamName);
      return t ? LOGOS_DIR + (useWht ? t.teamLogoWHT : t.teamLogoCLR) : '';
    }

    function getStandingsLogo(teamName, season)  { return _logoForTeam(teamName, season, false); }
    function getDetailLogo(teamName, season)     { return _logoForTeam(teamName, season, true);  }

    // Build TEAM_COLORS from teamInfo primaryColor (used as fallback / 2K25)
    var TEAM_COLORS = {};
    if (typeof teamInfo !== 'undefined') {
      Object.keys(teamInfo).forEach(function(k) {
        var t = teamInfo[k];
        TEAM_COLORS[t.name] = t.primaryColor;
      });
    }

    // Season-aware color lookup.
    // For 2K26 uses getTeamInfoForSeason so colors change with eras.
    // Falls back to the static TEAM_COLORS map for 2K25.
    function getTeamColor(teamName, season) {
      if (typeof window.getTeamInfoForSeason === 'function') {
        var key = null;
        if (typeof teamInfo !== 'undefined') {
          Object.keys(teamInfo).some(function(k) {
            if (teamInfo[k].name === teamName) { key = k; return true; }
          });
        }
        if (key) {
          var resolved = window.getTeamInfoForSeason(key, season);
          if (resolved && resolved.primaryColor) return resolved.primaryColor;
        }
      }
      return TEAM_COLORS[teamName] || '#333';
    }
    var SLUG_ABBR = {
      atlantahawks:"ATL",bostonceltics:"BOS",brooklynnets:"BKN",charlottehornets:"CHA",
      charlottebobcats:"CHO",
      chicagobulls:"CHI",clevelandcavaliers:"CLE",dallasmavericks:"DAL",denvernuggets:"DEN",
      detroitpistons:"DET",goldenstatewarriors:"GSW",houstonrockets:"HOU",indianapacers:"IND",
      losangelesclippers:"LAC",losangeleslakers:"LAL",memphisgrizzlies:"MEM",miamiheat:"MIA",
      milwaukeebucks:"MIL",minnesotatimberwolves:"MIN",neworleanspelicans:"NOP",
      neworleanshornets:"NOH",newyorkknicks:"NYK",
      oklahomacitythunder:"OKC",orlandomagic:"ORL",philadelphia76ers:"PHI",phoenixsuns:"PHX",
      portlandtrailblazers:"POR",sacramentokings:"SAC",sanantoniospurs:"SAS",torontoraptors:"TOR",
      utahjazz:"UTA",vancouvergrizzlies:"VAN",washingtonwizards:"WAS",
      mexicocityflight:"MEX",stlouisspirit:"STL",
    };
    var ABBR_BY_NAME = {};
    Object.keys(SLUG_ABBR).forEach(function(s){ var ti = TEAM_INFO(); if(ti[s]) ABBR_BY_NAME[ti[s].name] = SLUG_ABBR[s]; });

    /* ─── URL HELPERS ─────────────────────────────────────────── */
    function parseHash() {
      var raw = (location.hash||'').slice(1).trim().toLowerCase();
      if (!raw) return { slug:'', yy:'' };
      var last2 = raw.slice(-2);
      if (/^\d{2}$/.test(last2)) return { slug: raw.slice(0,-2), yy: last2 };
      return { slug: raw, yy: '' };
    }
    function suffixToSeason(yy) {
      if (!/^\d{2}$/.test(yy)) return '';
      var end = parseInt(yy,10);
      var start = (end-1+100)%100;
      return '20'+String(start).padStart(2,'0')+'-'+String(end).padStart(2,'0');
    }
    function seasonToSuffix(s) {
      if (!s||!s.includes('-')) return '';
      return (s.split('-')[1]||'').padStart(2,'0');
    }
    function setHash(slug, season, push) {
      var yy = seasonToSuffix(season);
      var url = slug
        ? location.pathname+location.search+'#'+slug+yy
        : location.pathname+location.search;
      if (push) { history.pushState(null,'',url); }
      else       { history.replaceState(null,'',url); }
    }
    /* ─── SETTINGS ────────────────────────────────────────────────
       One switch for now, in the same gear-and-panel menu the Logs tab uses.
       Persisted so the choice survives navigation, like the theme and sim. */
    var TEAMS_SETTINGS_KEY = 'ege-teams-settings-v1';
    var teamsSettings = (function(){
      var d = { markers: true };
      try {
        var raw = JSON.parse(localStorage.getItem(TEAMS_SETTINGS_KEY) || '{}');
        if (typeof raw.markers === 'boolean') d.markers = raw.markers;
      } catch(e) {}
      return d;
    })();
    function saveTeamsSettings() {
      try { localStorage.setItem(TEAMS_SETTINGS_KEY, JSON.stringify(teamsSettings)); } catch(e) {}
    }

    /* ─── DOM REFS ────────────────────────────────────────────── */
    var teamSel    = document.getElementById('teamSelect');
    var yearSel    = document.getElementById('yearSelect');
    var prevBtn    = document.getElementById('yearPrevBtn');
    var nextBtn    = document.getElementById('yearNextBtn');
    var backBtn    = document.getElementById('teamsBackBtn');
    var standView  = document.getElementById('teamsStandingsView');
    var detailView = document.getElementById('teamsDetailView');
    var eastList   = document.getElementById('standingsEast');
    var westList   = document.getElementById('standingsWest');

    /* ─── YEAR SELECT INIT ────────────────────────────────────── */
    function syncYearArrows() {
      prevBtn.disabled = yearSel.selectedIndex <= 0;
      nextBtn.disabled = yearSel.selectedIndex >= yearSel.options.length - 1;
    }

    /* Populate year dropdown from keys in EGE_SEASON_STATS so it
       always matches exactly what the loaded data file contains. */
    function populateYearSelect() {
      var ss = window.EGE_SEASON_STATS || {};
      var years = Object.keys(ss).sort();
      yearSel.innerHTML = '';
      years.forEach(function(y) {
        var opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSel.appendChild(opt);
      });
    }

    /* Populate team dropdown with only the teams present in the
       selected year's data, sorted alphabetically by display name. */
    function populateTeamSelect(year) {
      var ss  = window.EGE_SEASON_STATS || {};
      var ti  = window.EGE_TEAM_INFO    || {};
      var yearData = ss[year] || {};
      var slugs = Object.keys(yearData).sort(function(a, b) {
        var na = (ti[a] && ti[a].name) || a;
        var nb = (ti[b] && ti[b].name) || b;
        return na.localeCompare(nb);
      });
      // Remember currently selected team so we can restore it if still valid
      var current = teamSel.value;
      teamSel.innerHTML = '<option value="">Standings</option>';
      slugs.forEach(function(slug) {
        var name = (ti[slug] && ti[slug].name) || slug;
        var opt  = document.createElement('option');
        opt.value = slug;
        opt.textContent = name;
        teamSel.appendChild(opt);
      });
      // Restore selection only if that team exists in the new year
      teamSel.value = yearData[current] ? current : '';
    }

    function initLatestYear() {
      populateYearSelect();
      yearSel.selectedIndex = yearSel.options.length - 1;
      syncYearArrows();
      populateTeamSelect(yearSel.value);
    }
    initLatestYear();

    prevBtn.addEventListener('click', function(){
      if (prevBtn.disabled) return;
      yearSel.selectedIndex--;
      yearSel.dispatchEvent(new Event('change',{bubbles:true}));
    });
    nextBtn.addEventListener('click', function(){
      if (nextBtn.disabled) return;
      yearSel.selectedIndex++;
      yearSel.dispatchEvent(new Event('change',{bubbles:true}));
    });

    /* ─── TEAM SELECT SYNC ────────────────────────────────────── */
    function syncDropdownsFromHash() {
      var h = parseHash();
      if (!h.slug) { teamSel.value = ''; }
      else {
        var opt = Array.from(teamSel.options).find(function(o){ return o.value===h.slug; });
        teamSel.value = opt ? h.slug : '';
      }
      if (h.yy) {
        var season = suffixToSeason(h.yy);
        var yOpt = Array.from(yearSel.options).find(function(o){ return o.value===season; });
        if (yOpt) yearSel.value = season;
      }
      syncYearArrows();
    }

    teamSel.addEventListener('change', function(){
      var slug = teamSel.value;
      var season = yearSel.value;
      setHash(slug, season, true); // push so back button works
      render();
      window.scrollTo({top:0,behavior:'smooth'});
    });
    yearSel.addEventListener('change', function(){
      syncYearArrows();
      populateTeamSelect(yearSel.value);
      var h = parseHash();
      if (h.slug) { setHash(h.slug, yearSel.value, false); }
      render();
    });
    backBtn.addEventListener('click', function(){
      teamSel.value = '';
      setHash('', yearSel.value, false);
      render();
      window.scrollTo({top:0,behavior:'smooth'});
    });
    // Prevent browser from restoring scroll position on back/forward
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    window.addEventListener('popstate', function(){
      window.scrollTo({top:0,behavior:'instant'});
      syncDropdownsFromHash();
      render();
    });

    /* ─── STANDINGS RENDERING ─────────────────────────────────── */
    function isEastern(slug) {
      var ti = TEAM_INFO()[slug];
      return ti && String(ti.division).toLowerCase().includes('eastern');
    }
    function buildStandingsRow(slug, stats, seed, year) {
      var ti = TEAM_INFO()[slug] || {};
      var teamName = ti.name || slug;
      var logo = getStandingsLogo(teamName, year);
      var bg = getTeamColor(teamName, year);
      var record = stats.record || 'N/A';
      /* The record is authored as "50-16"; pct is authored alongside it but
         is computed here when a season's row omits it. */
      var rec = String(record).split('-');
      var wins = rec.length === 2 ? rec[0].trim() : record;
      var loss = rec.length === 2 ? rec[1].trim() : '';
      var pct  = stats.pct;
      if (!pct && rec.length === 2) {
        var w = parseInt(wins,10), l = parseInt(loss,10);
        if (!isNaN(w) && !isNaN(l) && (w+l) > 0) {
          pct = (w/(w+l)).toFixed(3).replace(/^0/,'');
        }
      }
      var yy = seasonToSuffix(year);
      var abbr = ABBR_BY_NAME[teamName] || slug.slice(0,3).toUpperCase();
      var players = Array.isArray(stats.players) ? stats.players : [];
      var named = teamsSettings.markers
        ? players.map(function(n){ return { name:n, src:PLAYER_ICONS()[n] }; })
                 .filter(function(x){ return !!x.src; })
        : [];
      var iconsHtml = named.length
        ? '<div class="standings-row__icons">'+named.map(function(x,i){
            return '<img class="standings-row__icon" src="'+x.src+'" alt="'+x.name+'" title="'+x.name+'" loading="lazy" style="z-index:'+(20-i)+';">';
          }).join('')+'</div>'
        : '';
      var isChampion = (stats.playoffs||'').trim() === 'Champions';
      var champHtml = isChampion
        ? '<img class="standings-champ-trophy" src="https://egesimulation.weebly.com/uploads/1/2/9/6/129667888/nba-champ_orig.png" alt="Champions" title="NBA Champions">'
        : '';
      var accentRgb = hexTriplet(bg);
      return '<a class="standings-row" href="#'+slug+yy+'" style="--row-accent:'+bg
        + (accentRgb ? ';--row-accent-rgb:'+accentRgb : '') + ';">'
        +'<div class="standings-row__left">'
          +'<div class="standings-row__crest">'
            +(logo?'<img class="standings-row__logo" src="'+logo+'" alt="'+teamName+'" loading="lazy">':'')
          +'</div>'
          +'<div class="standings-row__seed">'+seed+'.</div>'
          +'<div class="standings-row__name">'+teamName+'</div>'
          +'<div class="standings-row__abbr">'+abbr+'</div>'
          +champHtml
        +'</div>'
        +'<div class="standings-row__right">'
          +iconsHtml
          +'<div class="standings-row__record">'
            +'<span class="rec-box rec-w">'+wins+'</span>'
            +'<span class="rec-box rec-l">'+(loss||'—')+'</span>'
            +'<span class="rec-box rec-pct">'+(pct||'—')+'</span>'
          +'</div>'
        +'</div>'
      +'</a>';
    }
    function renderStandings(year) {
      var ss = SEASON_STATS()[year];
      var heads = document.querySelectorAll('.standings-head');
      if (!ss) {
        eastList.innerHTML = '<div class="roster-empty">No data for this season.</div>';
        westList.innerHTML = '';
        heads.forEach(function(h){ h.style.display = 'none'; });
        return;
      }
      heads.forEach(function(h){ h.style.display = ''; });
      var slugs = Object.keys(TEAM_INFO()).filter(function(s){ return !!ss[s]; });
      var sorted = slugs.slice().sort(function(a,b){
        var ra = parseInt(String(ss[a].rank||'').replace(/\D/g,''),10)||9999;
        var rb = parseInt(String(ss[b].rank||'').replace(/\D/g,''),10)||9999;
        return ra-rb||String(a).localeCompare(String(b));
      });
      var east=[],west=[];
      sorted.forEach(function(s){ (isEastern(s)?east:west).push(s); });
      /* The playoff divider is its own element between the eighth and ninth
         rows, not a border on the eighth row: as part of that row it inherited
         the row's hover lift and slid up with it. */
      function listHTML(slugs) {
        return slugs.map(function(s, i) {
          return buildStandingsRow(s, ss[s], i+1, year)
            + (i === 7 && slugs.length > 8 ? '<div class="standings-cut" aria-hidden="true"></div>' : '');
        }).join('');
      }
      eastList.innerHTML = listHTML(east);
      westList.innerHTML = listHTML(west);
      // Render bracket
      renderBracket(year);
      // Wire clicks
      document.querySelectorAll('.standings-row').forEach(function(a){
        a.addEventListener('click', function(e){
          e.preventDefault();
          var href = a.getAttribute('href')||'';
          if (!href.startsWith('#')) return;
          history.pushState(null,'',location.pathname+location.search+href);
          syncDropdownsFromHash();
          render();
          window.scrollTo({top:0,behavior:'smooth'});
        });
      });
    }

    /* ─── TEAM DETAIL RENDERING ───────────────────────────────── */
    var _winChart = null;

    function hexToRgba(hex,a){
      hex = hex.replace('#','');
      var r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
      return 'rgba('+r+','+g+','+b+','+a+')';
    }
    /* "r, g, b" for the team colour, so a rule can build its own alpha from it
       — a hover tint can't be derived from the hex in --row-accent alone. */
    function hexTriplet(hex){
      if (!hex || String(hex).charAt(0) !== '#') return '';
      hex = String(hex).replace('#','');
      if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      if (hex.length !== 6) return '';
      return parseInt(hex.slice(0,2),16)+','+parseInt(hex.slice(2,4),16)+','+parseInt(hex.slice(4,6),16);
    }
    function ordinal(n){
      if (!Number.isFinite(n)) return '—';
      var s=['th','st','nd','rd'],v=n%100;
      return n+(s[(v-20)%10]||s[v]||s[0]);
    }
    function computeRanks(obj) {
      var teams = Object.keys(obj||{}).filter(function(k){ return k!=='__meta'; });
      var offSorted = teams.slice().sort(function(a,b){ return (obj[b].off||-Infinity)-(obj[a].off||-Infinity); });
      var defSorted = teams.slice().sort(function(a,b){ return (obj[a].def||Infinity)-(obj[b].def||Infinity); });
      var offR={},defR={};
      offSorted.forEach(function(a,i){ offR[a]=i+1; });
      defSorted.forEach(function(a,i){ defR[a]=i+1; });
      return {offR:offR, defR:defR, count:teams.length};
    }
    function renderGauge(el, value, type) {
      var prog = el.querySelector('.gauge-progress');
      var r = prog.r.baseVal.value;
      var circ = 2*Math.PI*r;
      var min=105, max=125;
      var clamped = Math.max(min,Math.min(value,max));
      var score = type==='off' ? (clamped-min)/(max-min) : (max-clamped)/(max-min);
      score = Math.max(0,Math.min(score,1));
      // Start at 0, animate in
      prog.style.strokeDasharray = circ+' '+circ;
      prog.style.strokeDashoffset = circ; // start empty
      var dashLen = circ;
      var green='#00cc66',orange='#ff9900',red='#ff3300';
      var lerpColor = function(a,b,t){
        var c1=[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];
        var c2=[parseInt(b.slice(1,3),16),parseInt(b.slice(3,5),16),parseInt(b.slice(5,7),16)];
        return 'rgb('+Math.round(c1[0]+(c2[0]-c1[0])*t)+','+Math.round(c1[1]+(c2[1]-c1[1])*t)+','+Math.round(c1[2]+(c2[2]-c1[2])*t)+')';
      };
      prog.style.stroke = score>=0.5 ? lerpColor(green,orange,(1-score)*2) : lerpColor(orange,red,(0.5-score)*2);
      // Trigger fill animation after a small delay so transition fires
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          prog.style.strokeDashoffset = dashLen*(1-score);
        });
      });
      // Count-up the value display
      var valEl = el.querySelector('.gauge-content__val');
      if (valEl) {
        valEl.classList.remove('counting');
        void valEl.offsetWidth;
        valEl.classList.add('counting');
        var start = null, duration = 700, target = value;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts-start)/duration, 1);
          var ease = 1 - Math.pow(1-p, 3);
          valEl.textContent = (ease*target).toFixed(1);
          if (p < 1) requestAnimationFrame(step);
          else valEl.textContent = target.toFixed(1);
        }
        requestAnimationFrame(step);
      }
    }
    /* ─── POSTSEASON SERIES RENDERER ────────────────────────── */
    function derivePlayoffResult(slug, year, bData, ss) {
      // Kept for champion card compatibility
      var result = { isChamp: false };
      if (!bData) {
        result.isChamp = ss && (ss.playoffs||'').trim() === 'Champions';
        return result;
      }
      var fin = bData.finals;
      if (fin && (fin.top===slug || fin.bot===slug)) {
        var fMyW = fin.top===slug ? fin.topW : fin.botW;
        var fOpW = fin.top===slug ? fin.botW : fin.topW;
        result.isChamp = fMyW > fOpW;
      }
      return result;
    }

    function renderPostseasonSeries(slug, year, bData, ss) {
      var card  = document.getElementById('playoffResultCard');
      var list  = document.getElementById('playoffSeriesList');
      if (!card || !list) return;

      var playoffs = ss ? (ss.playoffs||'').trim() : '';

      // No bracket data or did not qualify
      if (!bData || playoffs === 'Did not qualify') {
        card.style.display = 'none';
        return;
      }

      // Collect all series involving this team
      var series = [];
      var conf = isEastern(slug) ? 'east' : 'west';
      var roundDefs = [
        { key:'r1', label:'First Round',       conf: conf },
        { key:'r2', label:'Conf. Semifinals',  conf: conf },
        { key:'r3', label:'Conf. Finals',      conf: conf },
        { key:'finals', label:'NBA Finals',    conf: 'finals' },
      ];

      roundDefs.forEach(function(rd) {
        var rounds = rd.conf === 'finals'
          ? (bData.finals ? [bData.finals] : [])
          : (bData[rd.conf] && bData[rd.conf][rd.key] || []);

        rounds.forEach(function(m) {
          if (!m) return;
          if (m.top !== slug && m.bot !== slug) return;
          var myW  = m.top===slug ? m.topW : m.botW;
          var opW  = m.top===slug ? m.botW : m.topW;
          var opSlug = m.top===slug ? m.bot : m.top;
          series.push({ label: rd.label, myW: myW, opW: opW, opSlug: opSlug, isFinals: rd.conf==='finals' });
        });
      });

      // Not in bracket at all — check play-in
      if (!series.length) {
        list.innerHTML = '<div class="ps-no-data">Did not make playoffs</div>';
        card.style.display = 'block';
        return;
      }

      var yy = seasonToSuffix(year);
      var html = series.map(function(s) {
        var won = s.myW > s.opW;
        var isChampSeries = s.isFinals && won;
        var scoreStr = s.myW + '–' + s.opW;
        var scoreCls = isChampSeries ? 'champ' : won ? 'won' : 'lost';
        var resultWord = won ? 'Won' : 'Lost';

        // Opponent info
        var opTi   = TEAM_INFO()[s.opSlug] || {};
        var opName = opTi.name || s.opSlug;
        var opAbbr = SLUG_ABBR[s.opSlug] || (s.opSlug||'').slice(0,3).toUpperCase();
        var opSs   = (SEASON_STATS()[year]||{})[s.opSlug] || null;
        var opLogo = getStandingsLogo(opName, year);
        var opLink = '#' + s.opSlug + yy;

        return '<a class="ps-series-row" href="' + opLink + '">'
          + (opLogo ? '<img class="ps-series-logo" src="' + opLogo + '" alt="' + opName + '">' : '')
          + '<div class="ps-series-info">'
            + '<div class="ps-series-round">' + s.label + '</div>'
            + '<div class="ps-series-matchup">' + resultWord + ' vs. ' + opAbbr + '</div>'
          + '</div>'
          + '<div class="ps-series-score ' + scoreCls + '">' + scoreStr + '</div>'
        + '</a>';
      }).join('');

      list.innerHTML = html;
      card.style.display = 'block';

      // Wire clicks to navigate to opponent's team page
      card.querySelectorAll('.ps-series-row').forEach(function(a) {
        a.addEventListener('click', function(e) {
          e.preventDefault();
          var href = a.getAttribute('href') || '';
          if (!href.startsWith('#')) return;
          history.pushState(null,'',location.pathname+location.search+href);
          syncDropdownsFromHash();
          render();
          window.scrollTo({top:0,behavior:'smooth'});
        });
      });
    }

    function renderDetail(slug, year) {
      var ti = TEAM_INFO()[slug] || {};
      var teamName = ti.name || slug;
      var ss = (SEASON_STATS()[year]||{})[slug] || null;
      var logo = getDetailLogo(teamName, year) || '';
      var bg = getTeamColor(teamName, year);
      var abbr = SLUG_ABBR[slug] || '';

      // Banner
      var banner = document.getElementById('teamBanner');
      banner.style.background = bg; // fallback solid color
      document.getElementById('teamBannerLogo').src = logo;
      document.getElementById('teamBannerLogo').alt = teamName;
      document.getElementById('teamBannerName').textContent = teamName;
      document.getElementById('teamBannerSeason').textContent = year;

      // Quick stats
      document.getElementById('teamStatRecord').textContent = ss ? ss.record : '—';
      document.getElementById('teamStatPct').textContent    = ss ? ss.pct    : '—';
      document.getElementById('teamStatRank').textContent   = ss ? ss.rank   : '—';
      // Derive playoff result from bracket data
      var champCard = document.getElementById('champCard');
      var bData = (BRACKETS()[year]) || null;
      var playoffResult = derivePlayoffResult(slug, year, bData, ss);

      // Champions card
      if (champCard) {
        if (playoffResult.isChamp) {
          document.getElementById('champYear').textContent = year;
          var mvpEl = document.getElementById('champMvp');
          if (ss && ss.finals_mvp) {
            mvpEl.textContent = ss.finals_mvp;
          } else {
            mvpEl.innerHTML = '<span class="champ-mvp-empty">— Not recorded —</span>';
          }
          champCard.classList.remove('visible');
          void champCard.offsetWidth;
          champCard.classList.add('visible');
        } else {
          champCard.classList.remove('visible');
        }
      }

      // Postseason series card
      renderPostseasonSeries(slug, year, bData, ss);

      // Win history chart
      var allSeasons = Object.keys(SEASON_STATS()).sort();
      var labels=[], data=[];
      allSeasons.forEach(function(s){
        var row = (SEASON_STATS()[s]||{})[slug];
        if (row && row.record) {
          var m = String(row.record).match(/^(\d+)/);
          if (m) { labels.push(s); data.push(parseInt(m[1],10)); }
        }
      });
      if (_winChart) { _winChart.destroy(); _winChart=null; }
      // Read actual computed colors from the site's CSS variables at render time
      var isLight    = document.documentElement.classList.contains('light');
      var labelColor = isLight ? 'rgba(42,33,64,.5)'   : 'rgba(208,208,208,.45)';
      var gridColor  = isLight ? 'rgba(35,26,165,.14)'  : 'rgba(35,26,165,.22)';
      /* Chart.js comes off a CDN, so it can simply not be there — blocked,
         offline, an outage. Without this guard the ReferenceError aborted
         the rest of this function and took the gauges, the roster and the
         trends down with it, leaving nothing but the banner. */
      var canvas = document.getElementById('teamWinChart');
      var chartNote = document.getElementById('teamWinChartNote');
      if (typeof Chart === 'undefined') {
        canvas.style.display = 'none';
        if (chartNote) chartNote.classList.add('visible');
        return renderDetailRest();
      }
      canvas.style.display = '';
      if (chartNote) chartNote.classList.remove('visible');
      var ctx = canvas.getContext('2d');
      _winChart = new Chart(ctx, {
        type:'line',
        data:{ labels:labels, datasets:[{ data:data, tension:.4, borderColor:bg, backgroundColor:hexToRgba(bg,.3), fill:true, borderWidth:3, pointRadius:0, pointHoverRadius:6, hitRadius:18 }] },
        options:{
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{display:false}, tooltip:{ callbacks:{ title:function(i){ return i[0].label; }, label:function(c){ return 'Wins: '+c.parsed.y; } } } },
          scales:{
            x:{ ticks:{ color:labelColor, font:{size:10} }, grid:{color:gridColor} },
            y:{ min:5, max:75, ticks:{ stepSize:10, color:labelColor, font:{size:10} }, grid:{color:gridColor} }
          },
          onClick:function(evt){
            if (!_winChart) return;
            var pts = _winChart.getElementsAtEventForMode(evt,'nearest',{intersect:false},true);
            if (!pts||!pts.length) return;
            var clickedYear = _winChart.data.labels[pts[0].index];
            if (!clickedYear) return;
            var yOpt = Array.from(yearSel.options).find(function(o){ return o.value===clickedYear; });
            if (yOpt) { yearSel.value=clickedYear; yearSel.dispatchEvent(new Event('change',{bubbles:true})); }
          }
        }
      });

      renderDetailRest();

      /* The parts of the detail view that come after the chart. Declared
         here so it closes over slug/year/abbr, and called on both paths. */
      function renderDetailRest() {
      // OFF/DEF gauges
      var ratingsYear = RATINGS()[year];
      var gaugesCard = document.getElementById('teamGaugesCard');
      if (ratingsYear && abbr && ratingsYear[abbr]) {
        var ranks = computeRanks(ratingsYear);
        var teamRatings = ratingsYear[abbr];
        var offRank = (teamRatings.offRank||ranks.offR[abbr]);
        var defRank = (teamRatings.defRank||ranks.defR[abbr]);
        document.getElementById('gaugeOffVal').textContent  = Number(teamRatings.off).toFixed(1);
        document.getElementById('gaugeOffRank').textContent = ordinal(offRank);
        document.getElementById('gaugeDefVal').textContent  = Number(teamRatings.def).toFixed(1);
        document.getElementById('gaugeDefRank').textContent = ordinal(defRank);
        renderGauge(document.querySelector('.gauge-wrap[data-type="off"]'), teamRatings.off, 'off');
        renderGauge(document.querySelector('.gauge-wrap[data-type="def"]'), teamRatings.def, 'def');
        gaugesCard.style.display = 'block';
      } else {
        gaugesCard.style.display = 'none';
      }

      // Roster — splits-style
      renderRoster(slug, year, _rosterScope);

      // Trends
      renderTrends(slug, year, abbr);
      }
    }

    /* ─── ROSTER HELPERS (outside renderDetail) ──────────────── */
    var _rosterScope = 'regular';

    function fmt1r(n) {
      var v = parseFloat(n);
      return isNaN(v) ? '—' : (Math.round(v * 10) / 10).toFixed(1);
    }

    /* Sim players — abbreviated name as it appears in roster data → players.html hash */
    var SIM_PLAYERS = {
      'C. Clark':     'clark-traditional-splits',
      'S. Stogsdill': 'stogsdill-traditional-splits',
      'J. Stewart':   'stewart-traditional-splits',
      'I. Vitel':     'vitel-traditional-splits',
      'P. Hatch':     'hatch-traditional-splits',
    };

    function rosterNameCell(name) {
      var hash = SIM_PLAYERS[name];
      if (hash) {
        return '<a href="players.html#'+hash+'" '
          + 'style="color:var(--orange);text-decoration:underline;text-underline-offset:3px;font-weight:700;cursor:pointer;" '
          + 'title="View profile">'
          + name + '</a>';
      }
      return name;
    }

    function renderRoster(slug, year, scope) {
      var abbr2 = SLUG_ABBR[slug] || '';
      var rostYear = ROSTERS()[year];
      var rostData = rostYear && abbr2 && rostYear[abbr2] ? rostYear[abbr2] : null;

      var labelEl = document.getElementById('rosterTableLabel');
      if (labelEl) labelEl.textContent = 'Roster';

      var table   = document.getElementById('rosterTable');
      var tbody   = document.getElementById('rosterTbody');
      var emptyEl = document.getElementById('rosterEmpty');

      if (!rostData || !rostData.length) {
        tbody.innerHTML = ''; emptyEl.style.display = 'block';
        return;
      }
      emptyEl.style.display = 'none';

      var rows = '';
      rostData.forEach(function(p, idx) {
        var ppg = fmt1r(p[4]), rpg = fmt1r(p[5]), apg = fmt1r(p[6]);
        var spg = (p[7]==='N/A'||p[7]===undefined||p[7]===null) ? '—' : fmt1r(p[7]);
        var bpg = (p[8]==='N/A'||p[8]===undefined||p[8]===null) ? '—' : fmt1r(p[8]);
        rows += '<tr data-orig="'+idx+'">'
          + '<td>'+rosterNameCell(p[0])+'</td>'
          + '<td>'+p[1]+'</td>'
          + '<td>'+p[2]+'</td>'
          + '<td class="hi">'+p[3]+'</td>'
          + '<td class="hi">'+ppg+'</td>'
          + '<td>'+rpg+'</td>'
          + '<td>'+apg+'</td>'
          + '<td>'+spg+'</td>'
          + '<td>'+bpg+'</td>'
          + '</tr>';
      });

      // Team Totals row:
      // - Age: average rounded to nearest tenth
      // - OVR: average rounded to nearest tenth
      // - PPG/RPG/APG/SPG/BPG: summed totals across all players
      var numericRows = rostData.filter(function(p){ return !isNaN(parseFloat(p[4])); });
      if (numericRows.length) {
        var n = numericRows.length;
        var sumAge=0, sumOvr=0, sumPpg=0, sumRpg=0, sumApg=0, sumSpg=0, sumBpg=0, spgCount=0, bpgCount=0;
        numericRows.forEach(function(p){
          sumAge+=parseFloat(p[2])||0;
          sumOvr+=parseFloat(p[3])||0;
          sumPpg+=parseFloat(p[4])||0;
          sumRpg+=parseFloat(p[5])||0;
          sumApg+=parseFloat(p[6])||0;
          if(p[7]!=='N/A'&&p[7]!=null&&!isNaN(parseFloat(p[7]))){ sumSpg+=parseFloat(p[7]); spgCount++; }
          if(p[8]!=='N/A'&&p[8]!=null&&!isNaN(parseFloat(p[8]))){ sumBpg+=parseFloat(p[8]); bpgCount++; }
        });
        var avgAge = fmt1r(sumAge/n);   // average, nearest tenth
        var avgOvr = fmt1r(sumOvr/n);  // average, nearest tenth
        rows += '<tr class="roster-career-row" data-career="1">'
          + '<td>Team Totals</td><td></td>'
          + '<td>'+avgAge+'</td>'
          + '<td class="hi">'+avgOvr+'</td>'
          + '<td class="hi">'+fmt1r(sumPpg)+'</td>'
          + '<td>'+fmt1r(sumRpg)+'</td>'
          + '<td>'+fmt1r(sumApg)+'</td>'
          + '<td>'+(spgCount?fmt1r(sumSpg):'—')+'</td>'
          + '<td>'+(bpgCount?fmt1r(sumBpg):'—')+'</td>'
          + '</tr>';
      }

      tbody.innerHTML = rows;
      initRosterSort(table);
    }

    function initRosterSort(table) {
      var tbody = table.tBodies[0]; if (!tbody) return;
      Array.from(tbody.rows).forEach(function(r, i){ if (!r.dataset.originalIndex) r.dataset.originalIndex = String(i); });
      var headers = Array.from(table.querySelectorAll('thead th'));
      headers.forEach(function(th, colIdx){
        var fresh = th.cloneNode(true);
        th.parentNode.replaceChild(fresh, th);
        fresh.dataset.sortState = 'none';
        fresh.addEventListener('click', function(){
          var curr = fresh.dataset.sortState || 'none';
          var next = curr==='none' ? 'desc' : curr==='desc' ? 'asc' : 'none';
          var allTh = Array.from(table.querySelectorAll('thead th'));
          allTh.forEach(function(h){
            h.dataset.sortState = 'none';
            h.classList.remove('sort-asc','sort-desc','sort-col');
            var a = h.querySelector('.roster-sort-arrow'); if (a) a.textContent = '';
          });
          Array.from(table.querySelectorAll('td.sort-col')).forEach(function(el){ el.classList.remove('sort-col'); });
          fresh.dataset.sortState = next;
          var arrow = fresh.querySelector('.roster-sort-arrow');
          if (next==='desc') { fresh.classList.add('sort-desc'); if (arrow) arrow.textContent = '▼'; }
          else if (next==='asc') { fresh.classList.add('sort-asc'); if (arrow) arrow.textContent = '▲'; }
          var rows = Array.from(tbody.rows);
          if (next==='none') {
            rows.sort(function(a,b){ return Number(a.dataset.originalIndex)-Number(b.dataset.originalIndex); });
          } else {
            rows.sort(function(a,b){
              var aC=a.dataset.career==='1', bC=b.dataset.career==='1';
              if (aC||bC) return aC ? 1 : -1;
              var aT=(a.cells[colIdx]?a.cells[colIdx].textContent:'').trim();
              var bT=(b.cells[colIdx]?b.cells[colIdx].textContent:'').trim();
              var aN=parseFloat(aT), bN=parseFloat(bT);
              var cmp=(!isNaN(aN)&&!isNaN(bN)) ? aN-bN : aT.localeCompare(bT);
              return next==='asc' ? cmp : -cmp;
            });
          }
          rows.forEach(function(r){ tbody.appendChild(r); });
          if (next!=='none') {
            fresh.classList.add('sort-col');
            Array.from(tbody.rows).forEach(function(r){
              if (r.dataset.career==='1') return;
              var cell=r.cells[colIdx]; if (cell) cell.classList.add('sort-col');
            });
          }
        });
      });
    }

    /* ─── MAIN RENDER ─────────────────────────────────────────── */
    function render() {
      var h = parseHash();
      var year = yearSel.value;
      var slug = h.slug || teamSel.value || '';
      var hasTeam = !!slug;

      backBtn.classList.toggle('visible', hasTeam);
      if (hasTeam && teamSel.value !== slug) {
        var opt = Array.from(teamSel.options).find(function(o){ return o.value===slug; });
        if (opt) teamSel.value = slug;
      }

      var bracketView = document.getElementById('teamsBracketView');
      if (hasTeam) {
        standView.style.display = 'none';
        detailView.classList.add('visible');
        if (bracketView) bracketView.style.display = 'none';
        renderDetail(slug, year);
      } else {
        standView.style.display = 'block';
        detailView.classList.remove('visible');
        renderStandings(year);
      }
    }

    /* ─── SETTINGS MENU ───────────────────────────────────────────
       The panel is static markup, so a toggle just re-renders the view under
       it — no need to rebuild and reopen the menu itself. */
    (function wireTeamsSettings(){
      var btn   = document.getElementById('teams-settings-btn');
      var panel = document.getElementById('teams-settings-panel');
      if (!btn || !panel) return;

      function syncRows() {
        panel.querySelectorAll('.log-settings-row').forEach(function(row){
          var on = !!teamsSettings[row.dataset.setting];
          row.classList.toggle('is-on', on);
          row.setAttribute('aria-checked', String(on));
        });
      }
      syncRows();

      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var open = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        btn.classList.toggle('is-active', open);
      });
      // Stays open while switches are flipped
      panel.addEventListener('click', function(e){ e.stopPropagation(); });
      document.addEventListener('click', function(){
        panel.classList.remove('open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      });

      panel.querySelectorAll('.log-settings-row').forEach(function(row){
        row.addEventListener('click', function(){
          var id = row.dataset.setting;
          teamsSettings[id] = !teamsSettings[id];
          saveTeamsSettings();
          syncRows();
          render();
        });
      });
    })();

    /* ─── INIT ────────────────────────────────────────────────── */
    syncDropdownsFromHash();
    render();

    // Re-render chart when light/dark mode is toggled so colors update immediately
    var modeBtn = document.getElementById('mode-toggle');
    if (modeBtn) {
      modeBtn.addEventListener('click', function() {
        requestAnimationFrame(function() {
          var h = parseHash();
          var slug = h.slug || teamSel.value || '';
          if (slug && _winChart) {
            renderDetail(slug, yearSel.value);
          } else {
            /* Re-render standings so 76ers logo swaps instantly on mode change */
            renderStandings(yearSel.value);
          }
        });
      });
    }

    /* ─── PLAYOFF BRACKET ────────────────────────────────────── */
    function BRACKETS() { return window.EGE_BRACKETS || {}; }

    /* "3" → "3rd" for the bracket's seed chip; anything non-numeric passes
       through, so a missing seed stays blank. */
    function seedText(seed) {
      var n = parseInt(seed, 10);
      return isNaN(n) ? (seed || '') : ordinal(n);
    }
    function buildBracketTeam(slug, wins, isWinner, isChamp, seedLabel, ss, year, isLoser) {
      if (!slug) return '<div class="bracket-team"><span class="bracket-team__name" style="color:var(--text-muted);">TBD</span></div>';
      var ti = TEAM_INFO()[slug]||{};
      var name = ti.name || slug;
      var abbr = SLUG_ABBR[slug] || slug.slice(0,3).toUpperCase();
      var logo = getStandingsLogo(name, year);
      var cls = 'bracket-team'+(isChamp?' champion':isWinner?' winner':'')+(isLoser?' loser':'');
      var winsStr = wins !== null && wins !== undefined ? String(wins) : '';
      // Player icons from standings data
      var iconsHtml = '';
      if (ss && teamsSettings.markers) {
        var teamStats = ss[slug] || {};
        var players = Array.isArray(teamStats.players) ? teamStats.players : [];
        var named = players.map(function(n){ return { name:n, src:PLAYER_ICONS()[n] }; })
                           .filter(function(x){ return !!x.src; });
        if (named.length) {
          iconsHtml = '<span class="bracket-player-icons">'
            + named.map(function(x,i){
                return '<img src="'+x.src+'" alt="'+x.name+'" title="'+x.name+'" style="z-index:'+(20-i)+';">';
              }).join('')
            + '</span>';
        }
      }
      /* Seed left, crest centred, series wins right — and the crest again as
         a washed-out backdrop behind the whole box. */
      var teamHex  = getTeamColor(name, year);
      var teamRgb  = hexTriplet(teamHex);
      var style = '--row-accent:'+(teamHex||'var(--orange)')+';'
                + (teamRgb ? '--row-accent-rgb:'+teamRgb+';' : '')
                + (logo ? '--team-logo:url(\''+logo+'\');' : '');
      return '<div class="'+cls+'" data-slug="'+slug+'" title="'+name+'" style="'+style+'">'
        +'<span class="bracket-team__seed">'+seedText(seedLabel)+'</span>'
        /* The marker precedes the crest so the crest can overlap it. */
        +iconsHtml
        +(logo
            ? '<img class="bracket-team__logo" src="'+logo+'" alt="'+name+'">'
            : '<span class="bracket-team__name">'+abbr+'</span>')
        +'<span class="bracket-team__wins">'+winsStr+'</span>'
        +'</div>';
    }

    function buildMatchup(m, topSeed, botSeed, roundIndex, isChampMatch, ss, year) {
      if (!m) {
        return '<div class="bracket-matchup">'
          + buildBracketTeam('',null,false,false,'',ss,year)
          + buildBracketTeam('',null,false,false,'',ss,year)
          + '</div>';
      }
      var topWon = m.topW > m.botW;
      var botWon = m.botW > m.topW;
      var topChamp = isChampMatch && topWon;
      var botChamp = isChampMatch && botWon;
      return '<div class="bracket-matchup">'
        + buildBracketTeam(m.top, m.topW, topWon, topChamp, topSeed||'', ss, year, botWon)
        + buildBracketTeam(m.bot, m.botW, botWon, botChamp, botSeed||'', ss, year, topWon)
        + '</div>';
    }

    function renderBracket(year) {
      var bracketView = document.getElementById('teamsBracketView');
      var grid = document.getElementById('bracketGrid');
      if (!bracketView || !grid) return;

      var bData = (BRACKETS()[year]);

      // Show bracket section only if bracket data exists for this year
      if (!bData) {
        bracketView.style.display = 'none';
        return;
      }
      bracketView.style.display = 'block';

      var ss = SEASON_STATS()[year] || {};

      // Build playoff seed order per conference.
      // bData.east.playoff_seeds / bData.west.playoff_seeds can override
      // positions 7 and 8 (0-indexed: 6 and 7) for play-in winners.
      // Format: { 7: "slug", 8: "slug" }  (1-based seed numbers)
      function buildSeedOrder(conf) {
        var slugs = Object.keys(TEAM_INFO()).filter(function(s){ return !!ss[s]; });
        var sorted = slugs.slice().sort(function(a,b){
          var ra=parseInt(String(ss[a]&&ss[a].rank||'99').replace(/\D/g,''),10)||9999;
          var rb=parseInt(String(ss[b]&&ss[b].rank||'99').replace(/\D/g,''),10)||9999;
          return ra-rb;
        });
        var order = sorted.filter(function(s){
          return conf==='east' ? isEastern(s) : !isEastern(s);
        });
        // Apply playoff_seeds overrides for 7 and 8
        var overrides = bData[conf] && bData[conf].playoff_seeds || {};
        [7,8].forEach(function(seed) {
          if (overrides[seed]) order[seed-1] = overrides[seed];
        });
        return order;
      }

      var eastOrder = buildSeedOrder('east');
      var westOrder = buildSeedOrder('west');

      function getSeed(slug, conf) {
        var order = conf==='east' ? eastOrder : westOrder;
        var idx = order.indexOf(slug);
        return idx >= 0 ? idx+1 : '';
      }

      /* Matchups are emitted two to a .bracket-pair. The pair is what the
         bracket's elbow is drawn on: the vertical line joining a pair spans
         its two matchup centres, which sit at exactly 25% and 75% of the
         pair's height however tall it gets. A lone matchup (a conference
         final) is emitted bare and reaches the finals with one stub. */
      function colHTML(matchups, seeds, conf, isFinals) {
        if (!matchups || !matchups.length) return '';
        var cards = matchups.map(function(m, i) {
          var ts = seeds ? seeds[i*2]   : (m ? getSeed(m.top, conf) : '');
          var bs = seeds ? seeds[i*2+1] : (m ? getSeed(m.bot, conf) : '');
          return buildMatchup(m, ts, bs, i, isFinals, ss, year);
        });
        if (isFinals || cards.length < 2) return cards.join('');
        var out = '';
        for (var i = 0; i < cards.length; i += 2) {
          out += '<div class="bracket-pair">' + cards[i] + (cards[i+1] || '') + '</div>';
        }
        return out;
      }

      // Build seed labels for R1
      var eastR1 = bData.east && bData.east.r1 || [];
      var eastR2 = bData.east && bData.east.r2 || [];
      var eastR3 = bData.east && bData.east.r3 || [];
      var westR1 = bData.west && bData.west.r1 || [];
      var westR2 = bData.west && bData.west.r2 || [];
      var westR3 = bData.west && bData.west.r3 || [];
      var finals = bData.finals;

      // Build each column's HTML.
      // R1 order: [1v8, 4v5, 3v6, 2v7]
      // R2: matchup1 = winner of 1v8 vs winner of 4v5
      //     matchup2 = winner of 3v6 vs winner of 2v7
      // The columns are all the same height and space their matchups evenly
      // (justify-content:space-around), which puts 2 matchups exactly at the
      // midpoints of 4, and 1 at the midpoint of 2 — the alignment a bracket
      // needs, at any width. It used to be done with fixed-height spacers,
      // which only held at one size.
      var eR1html = colHTML(eastR1, null, 'east', false);
      var eR2html = colHTML(eastR2, null, 'east', false);
      var eR3html = colHTML(eastR3, null, 'east', false);
      var wR1html = colHTML(westR1, null, 'west', false);
      var wR2html = colHTML(westR2, null, 'west', false);
      var wR3html = colHTML(westR3, null, 'west', false);

      var finalsHtml = finals
        ? '<div class="bracket-finals-col">'
            /* Both marks ship; CSS shows the one that suits the theme, so a live
               theme toggle needs no JS. The white wordmark would disappear on
               the light ground and the black one on the dark. */
            + '<div class="bracket-finals-trophy">'
                + '<img class="finals-mark finals-mark--dark" src="icons/NBA-Finals-Logo-White.png" alt="NBA Finals">'
                + '<img class="finals-mark finals-mark--light" src="icons/NBA-Finals-Logo.png" alt="" aria-hidden="true">'
              + '</div>'
            + buildMatchup(finals, getSeed(finals.top,'east')||getSeed(finals.top,'west'), getSeed(finals.bot,'east')||getSeed(finals.bot,'west'), 0, true, ss, year)
          + '</div>'
        : '<div class="bracket-finals-col"><div class="bracket-empty">TBD</div></div>';

      // Column header row (7 cols). WEST and EAST carry their conference's
      // colour, the same two the standings card headers use.
      var roundLabels = ['First Round','Conf. Semis','Conf. Finals','NBA Finals','Conf. Finals','Conf. Semis','First Round'];
      var headers = roundLabels.map(function(l,i){
        if (i===0) return '<div class="bracket-col-label"><span class="bracket-label-west">WEST · </span>'+l+'</div>';
        if (i===6) return '<div class="bracket-col-label">'+l+' · <span class="bracket-label-east">EAST</span></div>';
        return '<div class="bracket-col-label">'+l+'</div>';
      }).join('');

      grid.innerHTML = headers
        + '<div class="bracket-col">'+wR1html+'</div>'
        + '<div class="bracket-col">'+wR2html+'</div>'
        + '<div class="bracket-col">'+wR3html+'</div>'
        + finalsHtml
        + '<div class="bracket-col bracket-col--east" style="direction:rtl;">'+eR3html+'</div>'
        + '<div class="bracket-col bracket-col--east" style="direction:rtl;">'+eR2html+'</div>'
        + '<div class="bracket-col bracket-col--east" style="direction:rtl;">'+eR1html+'</div>';

      // Wire click-through to team detail
      grid.querySelectorAll('.bracket-team[data-slug]').forEach(function(el) {
        el.addEventListener('click', function() {
          var slug = el.dataset.slug;
          if (!slug) return;
          teamSel.value = slug;
          setHash(slug, yearSel.value);
          render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }

    /* ─── TRENDS CARD ───────────────────────────────────────── */
    function renderTrends(slug, year, abbr) {
      var card = document.getElementById('trendsCard');
      var list = document.getElementById('trendsList');
      if (!card || !list) return;

      // Get prior season
      var allYears = Object.keys(SEASON_STATS()).sort();
      var yearIdx  = allYears.indexOf(year);
      if (yearIdx <= 0) { card.style.display = 'none'; return; }
      var prevYear = allYears[yearIdx - 1];

      var ssCurr = (SEASON_STATS()[year]     || {})[slug];
      var ssPrev = (SEASON_STATS()[prevYear] || {})[slug];
      var rtCurr = abbr && (RATINGS()[year]     || {})[abbr];
      var rtPrev = abbr && (RATINGS()[prevYear] || {})[abbr];
      var roCurr = abbr && (ROSTERS()[year]     || {})[abbr];
      var roPrev = abbr && (ROSTERS()[prevYear] || {})[abbr];

      // Need at least season stats for both years
      if (!ssCurr || !ssPrev) { card.style.display = 'none'; return; }

      // Helper: parse wins from record string e.g. "52-30"
      function wins(ss) {
        if (!ss || !ss.record) return null;
        var m = String(ss.record).match(/^(\d+)/);
        return m ? parseInt(m[1], 10) : null;
      }

      // Helper: compute roster average for a stat index
      function rosterAvg(roData, idx) {
        if (!roData || !roData.length) return null;
        var valid = roData.filter(function(p){ return !isNaN(parseFloat(p[idx])); });
        if (!valid.length) return null;
        var sum = valid.reduce(function(a,p){ return a + parseFloat(p[idx]); }, 0);
        return sum / valid.length;
      }

      // Build metrics list: { label, curr, prev, invertGood }
      // invertGood=true means lower is better (DRTG, Age)
      var metrics = [];

      if (rtCurr && rtPrev) {
        metrics.push({ label:'ORTG', curr:parseFloat(rtCurr.off), prev:parseFloat(rtPrev.off), dp:1, thresh:[0.5,2], invertGood:false });
        metrics.push({ label:'DRTG', curr:parseFloat(rtCurr.def), prev:parseFloat(rtPrev.def), dp:1, thresh:[0.5,2], invertGood:true });
      }

      var ageCurr = rosterAvg(roCurr, 2), agePrev = rosterAvg(roPrev, 2);
      if (ageCurr!==null && agePrev!==null)
        metrics.push({ label:'Avg Age', curr:ageCurr, prev:agePrev, dp:1, thresh:[0.5,1.5], invertGood:true });

      var ovrCurr = rosterAvg(roCurr, 3), ovrPrev = rosterAvg(roPrev, 3);
      if (ovrCurr!==null && ovrPrev!==null)
        metrics.push({ label:'Avg OVR', curr:ovrCurr, prev:ovrPrev, dp:1, thresh:[1,3], invertGood:false });

      var ppgCurr = rosterAvg(roCurr, 4), ppgPrev = rosterAvg(roPrev, 4);
      if (ppgCurr!==null && ppgPrev!==null)
        metrics.push({ label:'Avg PPG', curr:ppgCurr, prev:ppgPrev, dp:1, thresh:[1,4], invertGood:false });

      var rpgCurr = rosterAvg(roCurr, 5), rpgPrev = rosterAvg(roPrev, 5);
      if (rpgCurr!==null && rpgPrev!==null)
        metrics.push({ label:'Avg RPG', curr:rpgCurr, prev:rpgPrev, dp:1, thresh:[0.5,2], invertGood:false });

      var apgCurr = rosterAvg(roCurr, 6), apgPrev = rosterAvg(roPrev, 6);
      if (apgCurr!==null && apgPrev!==null)
        metrics.push({ label:'Avg APG', curr:apgCurr, prev:apgPrev, dp:1, thresh:[0.5,2], invertGood:false });

      var spgCurr = rosterAvg(roCurr, 7), spgPrev = rosterAvg(roPrev, 7);
      if (spgCurr!==null && spgPrev!==null && spgCurr!==undefined && spgPrev!==undefined)
        metrics.push({ label:'Avg SPG', curr:spgCurr, prev:spgPrev, dp:2, thresh:[0.1,0.4], invertGood:false });

      var wCurr = wins(ssCurr), wPrev = wins(ssPrev);
      if (wCurr!==null && wPrev!==null)
        metrics.push({ label:'Wins', curr:wCurr, prev:wPrev, dp:0, thresh:[3,8], invertGood:false });

      if (!metrics.length) { card.style.display = 'none'; return; }

      // Render each metric
      list.innerHTML = metrics.map(function(m) {
        if (isNaN(m.curr) || isNaN(m.prev)) return '';
        var diff = m.curr - m.prev;
        var absDiff = Math.abs(diff);
        var isGood = m.invertGood ? diff < 0 : diff > 0;
        var isPos  = isGood;
        var tier = absDiff === 0 ? 'zero'
                 : absDiff < m.thresh[0] ? (isPos ? 'pos-lo'  : 'neg-lo')
                 : absDiff < m.thresh[1] ? (isPos ? 'pos-mid' : 'neg-mid')
                 :                          (isPos ? 'pos-hi'  : 'neg-hi');
        var cls    = 'trend-' + tier;
        var arrow  = diff === 0 ? '—' : diff > 0 ? '▲' : '▼';
        var sign   = diff > 0 ? '+' : '';
        var valStr = sign + diff.toFixed(m.dp);
        return '<div class="trend-row '+cls+'">'
          + '<span class="trend-label">'+m.label+'</span>'
          + '<span class="trend-arrow">'+arrow+'</span>'
          + '<span class="trend-value">'+valStr+'</span>'
          + '</div>';
      }).join('');

      card.style.display = 'block';
    }

    // Reveal the page and footer — removes the pre-boot hidden state
    var _pg = document.querySelector('.teams-page');
    if (_pg) requestAnimationFrame(function(){
      _pg.classList.add('ready');
      document.body.classList.add('teams-ready');
    });

  }; // end window.__EGE_TEAMS_BOOT
