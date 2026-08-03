  (function () {

    /* ── TEAM COLOURS — built from teaminfo.js ── */
    var TC = {};
    if (typeof teamInfo !== 'undefined') {
      Object.keys(teamInfo).forEach(function(k) {
        var t = teamInfo[k];
        TC[t.name] = { p: t.primaryColor, s: t.secondaryColor };
      });
    }

    /* ── TEAM LOGOS — built from teaminfo.js ── */
    /* Logo folder — all sims now use 'logos/' */
    var LOGOS_DIR = ((window.EGE_SIM && window.EGE_SIM.logosFolder) || 'logos') + '/';
    var TL = {};     // color logos — for list team-name section
    var TL_WHT = {}; // white logos — for card grid and thumb watermarks
    if (typeof teamInfo !== 'undefined') {
      Object.keys(teamInfo).forEach(function(k) {
        var t = teamInfo[k];
        TL[t.name]     = LOGOS_DIR + t.teamLogoCLR;
        TL_WHT[t.name] = LOGOS_DIR + t.teamLogoWHT;
      });
    }

    /* ── EGE PLAYER HEADSHOTS ── */
    var HS = {
      'Cooper Clark':   'headshots/headshot_clark.png',
      'Paxon Hatch':    'headshots/headshot_hatch.png',
      'Sam Stogsdill':  'headshots/headshot_stogsdill.png',
      'Jaykeb Stewart': 'headshots/headshot_stewart.png',
      'Isaac Vitel':    'headshots/headshot_vitel.png',
    };

    /* ── PLAYER → TEAM LOOKUP ──
       For EGE players we read from PLAYER_STATS at runtime.
       For external NBA players we use a static season-keyed table. */
    var EXT = {
      /* Season-specific entries take priority: "Name|season" */
      'LeBron James|2017-18':               'Cleveland Cavaliers',
      'LeBron James|2018-19':               'Los Angeles Lakers',
      'LeBron James|2019-20':               'Los Angeles Lakers',
      'LeBron James|2020-21':               'Los Angeles Lakers',
      'LeBron James|2021-22':               'Los Angeles Lakers',
      /* Fallback by name for players who stayed put */
      'Giannis Antetokounmpo':              'Milwaukee Bucks',
      'Nikola Jokić':                       'Denver Nuggets',
      'Luka Dončić':                        'Dallas Mavericks',
      'Rudy Gobert':                        'Utah Jazz',
      'Victor Oladipo':                     'Indiana Pacers',
      'Lou Williams':                       'Los Angeles Clippers',
      'Montrezl Harrell':                   'Los Angeles Clippers',
      'Jordan Clarkson':                    'Utah Jazz',
      'Jerami Grant':                       'Detroit Pistons',
      'LaMelo Ball':                        'Charlotte Hornets',
      'Zion Williamson':                    'New Orleans Pelicans',
      'Tyler Herro':                        'Miami Heat',
      'Evan Mobley':                        'Cleveland Cavaliers',
      'Marcus Smart':                       'Boston Celtics',
      'Darius Garland':                     'Cleveland Cavaliers',
      'Paolo Banchero':                     'Orlando Magic',
      'Victor Wembanyama':                  'San Antonio Spurs',
      'Tyrese Maxey':                       'Philadelphia 76ers',
      'Naz Reid':                           'Minnesota Timberwolves',
      'Zaccharie Risacher':                 'Atlanta Hawks',
      'Payton Pritchard':                   'Boston Celtics',
      'Ace Bailey':                         'Brooklyn Nets',
      'Nikola Topic':                       'Oklahoma City Thunder',
      'Stephon Castle':                     'San Antonio Spurs',
      'Alexandre Sarr':                     'Washington Wizards',
      'Cade Cunningham':                    'Detroit Pistons',
      'Matas Buzelis':                      'Chicago Bulls',
      'Tre Johnson':                        'Dallas Mavericks',
      'Cooper Flagg':                       'Boston Celtics',
      'Dylan Harper':                       'Brooklyn Nets',
      'VJ Edgecombe':                       'Golden State Warriors',
      'Kasparas Jakučionis':                'Chicago Bulls',
      'Noa Essengue':                       'Portland Trail Blazers',
      'Lauri Markkanen':                    'Utah Jazz',
      'Malcolm Brogdon':                    'Boston Celtics',
      'Darryn Peterson':                    'Oklahoma City Thunder',
      'Jayson Tatum':                       'Boston Celtics',
      'Shai Gilgeous-Alexander':            'Oklahoma City Thunder',
      'Stephen Curry':                      'Golden State Warriors',
      'Malik Monk':                         'Sacramento Kings',
      /* New players from updated MVP list */
      'Cam Boozer':                         'Oklahoma City Thunder',
      'Luka Dončić|2022-23':               'Orlando Magic',
      'Luka Dončić|2023-24':               'Orlando Magic',
      'Cade Cunningham|2025-26':            'Brooklyn Nets',
      'Jaykeb Stewart|2026-27':             'New York Knicks',
      'Victor Wembanyama|2027-28':          'Golden State Warriors',
      'Victor Wembanyama|2028-29':          'Golden State Warriors',
      'Victor Wembanyama|2029-30':          'Golden State Warriors',
      'Zion Williamson|2031-32':            'Los Angeles Clippers',
    };

    function getTeam(name, season) {
      /* 1. Check season-specific external entry */
      var key = name + '|' + season;
      if (EXT[key]) return EXT[key];
      /* 2. Check name-only external entry */
      if (EXT[name]) return EXT[name];
      /* 3. Look in PLAYER_STATS (EGE players) */
      if (window.PLAYER_STATS) {
        var keys = Object.keys(window.PLAYER_STATS);
        for (var i = 0; i < keys.length; i++) {
          var ps = window.PLAYER_STATS[keys[i]];
          /* Match by name from player-stats bio or by checking names table */
          var psName = (ps.info && ps.info.length) ? null : null;
          /* Use the PLAYERS name map if available */
          var found = false;
          if (window.PLAYERS) {
            var pk = keys[i];
            if (window.PLAYERS[pk] && window.PLAYERS[pk].name === name) found = true;
          }
          /* Simpler: match key display names */
          var nameMap = {
            'clark':'Cooper Clark','hatch':'Paxon Hatch',
            'stogsdill':'Sam Stogsdill','stewart':'Jaykeb Stewart','vitel':'Isaac Vitel'
          };
          if (nameMap[keys[i]] === name) {
            var rows = (ps.regular||[]).filter(function(r){return r.season===season;});
            if (rows.length) return rows[0].team;
          }
        }
      }
      return null;
    }

    function initials(name) {
      return name.split(' ').map(function(w){return w[0]||'';}).join('').toUpperCase().slice(0,2);
    }

    /* ── BUILD ONE CARD ──
       team     → from entry.team (required — no auto-detection)
       headshot → from entry.headshot (URL string, optional) */
    function buildCard(name, season, idx, team, headshot) {
      var colors = TC[team] || { p:'#231aa5', s:'var(--orange)' };
      var logo    = team ? (TL_WHT[team] || TL[team] || '') : '';

      var card = document.createElement('div');
      card.className = 'award-card';

      /* Inner wrapper carries the entrance animation */
      var inner = document.createElement('div');
      inner.className = 'award-card-inner';
      inner.style.animationDelay = (idx * 0.045) + 's';

      /* .award-card-photo — rounded rect */
      var photo = document.createElement('div');
      photo.className = 'award-card-photo';

      /* 1. Background colour gradient */
      var bg = document.createElement('div');
      bg.className = 'award-card-bg';
      bg.style.background = 'linear-gradient(150deg,' + colors.p + ' 0%,' +
        shadeBlend(-0.35, colors.p) + ' 60%,' +
        colors.s + ' 140%)';
      photo.appendChild(bg);

      /* 2. Large background logo watermark — behind headshot */
      if (logo) {
        var logoBg = document.createElement('img');
        logoBg.className = 'award-card-logo-bg';
        logoBg.src = logo;
        logoBg.alt = '';
        photo.appendChild(logoBg);
      }

      /* 3. Vignette — above bg logo, below headshot */
      var vig = document.createElement('div');
      vig.className = 'award-card-vignette';
      photo.appendChild(vig);

      /* 4. Headshot — sits above vignette */
      var photoWrap = document.createElement('div');
      photoWrap.className = 'award-card-photo-wrap';

      if (headshot) {
        var img = document.createElement('img');
        img.src = headshot;
        img.alt = name;
        img.onerror = function() {
          this.style.display = 'none';
          var ini = document.createElement('div');
          ini.className = 'award-card-initials';
          ini.textContent = initials(name);
          photoWrap.appendChild(ini);
        };
        photoWrap.appendChild(img);
      } else {
        var ini = document.createElement('div');
        ini.className = 'award-card-initials';
        ini.textContent = initials(name);
        photoWrap.appendChild(ini);
      }
      photo.appendChild(photoWrap);

      /* 5. Small corner logo badge — on top of headshot */
      if (logo) {
        var logoEl = document.createElement('img');
        logoEl.className = 'award-card-logo';
        logoEl.src = logo;
        logoEl.alt = team || '';
        photo.appendChild(logoEl);
      }

      inner.appendChild(photo);

      /* Caption below the photo */
      var cap = document.createElement('div');
      cap.className = 'award-card-caption';
      cap.innerHTML =
        '<div class="award-card-name">' + name + '</div>' +
        '<div class="award-card-season">' + season + '</div>';
      inner.appendChild(cap);

      card.appendChild(inner);
      return card;
    }

    /* Darken a hex colour by a factor (negative = darker) */
    function shadeBlend(p, c) {
      var f = parseInt(c.slice(1),16);
      var R = f>>16, G = f>>8&0xFF, B = f&0xFF;
      var t = p < 0 ? 0 : 255;
      var a = p < 0 ? -p : p;
      return '#' + (0x1000000 +
        (Math.round((t-R)*a)+R)*0x10000 +
        (Math.round((t-G)*a)+G)*0x100  +
        (Math.round((t-B)*a)+B)
      ).toString(16).slice(1);
    }

    /* ── VIEW MODE ── */
    var viewMode = 'card'; // 'card' | 'list'

    /* ── BUILD ONE LIST ROW ── */
    function buildListRow(name, season, idx, team, headshot) {
      var colors    = TC[team] || { p:'#231aa5', s:'var(--orange)' };
      var logoWht   = team ? (TL_WHT[team] || TL[team] || '') : ''; // white — thumb watermark
      var logoClr   = team ? (TL[team] || '') : '';                  // color — team name section

      var row = document.createElement('div');
      row.className = 'award-list-row';
      row.style.animationDelay = (idx * 0.035) + 's';
      /* Team primary colour drives the left accent bar */
      row.style.setProperty('--row-accent', colors.p);

      /* ── Thumb: team gradient bg + logo watermark + portrait ── */
      var thumb = document.createElement('div');
      thumb.className = 'award-list-row-thumb';

      var tbg = document.createElement('div');
      tbg.className = 'award-list-row-thumb-bg';
      tbg.style.background = 'linear-gradient(160deg,' + colors.p + ' 0%,' + shadeBlend(-0.3, colors.p) + ' 100%)';
      thumb.appendChild(tbg);

      if (logoWht) {
        var tlogo = document.createElement('img');
        tlogo.className = 'award-list-row-thumb-logo';
        tlogo.src = logoWht; tlogo.alt = '';
        thumb.appendChild(tlogo);
      }

      if (headshot) {
        var tphoto = document.createElement('img');
        tphoto.className = 'award-list-row-thumb-photo';
        tphoto.src = headshot; tphoto.alt = name;
        tphoto.onerror = function() {
          this.style.display = 'none';
          var ini = document.createElement('div');
          ini.className = 'award-list-row-thumb-initials';
          ini.textContent = initials(name);
          thumb.appendChild(ini);
        };
        thumb.appendChild(tphoto);
      } else {
        var ini = document.createElement('div');
        ini.className = 'award-list-row-thumb-initials';
        ini.textContent = initials(name);
        thumb.appendChild(ini);
      }
      row.appendChild(thumb);

      /* ── Main: year // name — uses site background, not team colour ── */
      var main = document.createElement('div');
      main.className = 'award-list-row-main';

      var yearEl = document.createElement('span');
      yearEl.className = 'award-list-row-year';
      /* Extract ending year: '2027-28' → '2028' */
      var parts = (season || '').split('-');
      var endYear = parts.length >= 2
        ? (parts[0].slice(0,2) + parts[1])   /* e.g. '20' + '28' = '2028' */
        : season;
      yearEl.textContent = endYear;
      main.appendChild(yearEl);

      var nameEl = document.createElement('span');
      nameEl.className = 'award-list-row-name';
      nameEl.textContent = name;
      main.appendChild(nameEl);

      row.appendChild(main);

      /* ── Team: logo + name right-aligned ── */
      var teamEl = document.createElement('div');
      teamEl.className = 'award-list-row-team';

      if (logoClr) {
        var teamLogo = document.createElement('img');
        teamLogo.className = 'award-list-row-team-logo';
        teamLogo.src = logoClr; teamLogo.alt = team || '';
        teamEl.appendChild(teamLogo);
      }
      var teamName = document.createElement('span');
      teamName.className = 'award-list-row-team-name';
      teamName.textContent = team || '';
      teamEl.appendChild(teamName);
      row.appendChild(teamEl);

      return row;
    }

    /* ── RENDER ── */
    function render(category) {
      var history = window.EGE_LEAGUE_HISTORY || [];
      var content = document.getElementById('history-content');
      if (!content) return;

      /* Newest first */
      var list = history.slice().reverse();

      var LABELS = {
        mvp:      'Most Valuable Player',
        roty:     'Rookie of the Year',
        dpoy:     'Defensive Player of the Year',
        mip:      'Most Improved Player',
        sixmoty:  'Sixth Man of the Year',
        champion: 'Finals MVP',
      };
      var label = document.createElement('p');
      label.className = 'award-category-label';
      label.textContent = LABELS[category] || category;

      var container = document.createElement('div');
      container.className = viewMode === 'list' ? 'award-list-view' : 'award-grid';

      list.forEach(function(entry, idx) {
        var name, team, headshot;

        if (category === 'champion') {
          name     = entry.finals_mvp          || null;
          team     = entry.finals_mvp_team     || entry.champion || null;
          headshot = entry.finals_mvp_headshot || null;
        } else {
          name     = entry[category]               || null;
          team     = entry[category + '_team']     || null;
          headshot = entry[category + '_headshot'] || null;
        }

        if (!name || name === 'N/A') return;

        if (viewMode === 'list') {
          container.appendChild(buildListRow(name, entry.season, idx, team, headshot));
        } else {
          container.appendChild(buildCard(name, entry.season, idx, team, headshot));
        }
      });

      content.innerHTML = '';
      content.appendChild(label);
      content.appendChild(container);
    }

    function renderCategory() {
      var sel = document.getElementById('history-category');
      render(sel ? sel.value : 'mvp');
    }

    /* ── INIT ── */
    function init() {
      var sim = window.EGE_SIM || { leagueHistoryFile:'league-history.js' };
      var s   = document.createElement('script');
      s.src   = sim.leagueHistoryFile;
      s.onload = function() {
        renderCategory();

        /* View toggle buttons */
        var btnCard = document.getElementById('view-card');
        var btnList = document.getElementById('view-list');
        function setViewMode(mode) {
          viewMode = mode;
          if (btnCard) btnCard.classList.toggle('active', mode === 'card');
          if (btnList) btnList.classList.toggle('active', mode === 'list');
          renderCategory();
        }
        if (btnCard) btnCard.addEventListener('click', function() { setViewMode('card'); });
        if (btnList) btnList.addEventListener('click', function() { setViewMode('list'); });

        /* Category dropdown */
        var sel = document.getElementById('history-category');
        if (sel) sel.addEventListener('change', function() { renderCategory(); });
      };
      document.body.appendChild(s);
    }

    init();

  })();
