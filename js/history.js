/* ═══════════════════════════════════════════
   LEAGUE HISTORY PAGE LOGIC (history.html)

   Renders past award winners (MVP, ROTY, DPOY, etc.) as either a
   card grid or a list, based on window.EGE_LEAGUE_HISTORY — loaded
   from league-history.js (or league-history-26.js for Sim II).
   Each history entry already carries its own team/headshot fields
   (e.g. entry.mvp_team, entry.mvp_headshot), so this file only needs
   to turn that data into DOM — no separate team/headshot lookup.
═══════════════════════════════════════════ */
(function () {

  /* ── TEAM COLORS + LOGOS — built from teaminfo.js ── */
  var TEAM_COLORS = {};
  var TEAM_LOGOS_COLOR = {};  // for the list view's team-name section
  var TEAM_LOGOS_WHITE = {};  // for card grid + list thumb watermarks
  if (typeof teamInfo !== 'undefined') {
    var logosDir = ((window.EGE_SIM && window.EGE_SIM.logosFolder) || 'logos') + '/';
    Object.keys(teamInfo).forEach(function (key) {
      var t = teamInfo[key];
      TEAM_COLORS[t.name] = { primary: t.primaryColor, secondary: t.secondaryColor };
      TEAM_LOGOS_COLOR[t.name] = logosDir + t.teamLogoCLR;
      TEAM_LOGOS_WHITE[t.name] = logosDir + t.teamLogoWHT;
    });
  }

  function initials(name) {
    return name.split(' ').map(function (word) { return word[0] || ''; }).join('').toUpperCase().slice(0, 2);
  }

  /* Darkens a hex color by a factor (negative = darker), used for the
     team-color gradients behind each card/row. */
  function shadeColor(factor, hex) {
    var num = parseInt(hex.slice(1), 16);
    var r = num >> 16, g = (num >> 8) & 0xFF, b = num & 0xFF;
    var target = factor < 0 ? 0 : 255;
    var amount = factor < 0 ? -factor : factor;
    return '#' + (0x1000000 +
      (Math.round((target - r) * amount) + r) * 0x10000 +
      (Math.round((target - g) * amount) + g) * 0x100 +
      (Math.round((target - b) * amount) + b)
    ).toString(16).slice(1);
  }

  /* ── CARD VIEW — one award-winner tile ──
     team     → team name string (may be null/unknown)
     headshot → image URL (may be null, falls back to initials) */
  function buildCard(name, season, index, team, headshot) {
    var colors = TEAM_COLORS[team] || { primary: '#231aa5', secondary: 'var(--orange)' };
    var logo = team ? (TEAM_LOGOS_WHITE[team] || TEAM_LOGOS_COLOR[team] || '') : '';

    var card = document.createElement('div');
    card.className = 'award-card';

    // Inner wrapper carries the entrance animation, so it never
    // conflicts with the hover transform on the outer .award-card
    var inner = document.createElement('div');
    inner.className = 'award-card-inner';
    inner.style.animationDelay = (index * 0.045) + 's';

    var photo = document.createElement('div');
    photo.className = 'award-card-photo';

    // Layer 1: solid team-color gradient fill
    var bg = document.createElement('div');
    bg.className = 'award-card-bg';
    bg.style.background = 'linear-gradient(150deg,' + colors.primary + ' 0%,' +
      shadeColor(-0.35, colors.primary) + ' 60%,' + colors.secondary + ' 140%)';
    photo.appendChild(bg);

    // Layer 2: oversized team logo watermark, behind the headshot
    if (logo) {
      var logoBg = document.createElement('img');
      logoBg.className = 'award-card-logo-bg';
      logoBg.src = logo;
      logoBg.alt = '';
      photo.appendChild(logoBg);
    }

    // Layer 3: gradient vignette so the headshot pops over the logo
    var vignette = document.createElement('div');
    vignette.className = 'award-card-vignette';
    photo.appendChild(vignette);

    // Layer 4: headshot (or initials if none / if it fails to load)
    var photoWrap = document.createElement('div');
    photoWrap.className = 'award-card-photo-wrap';
    if (headshot) {
      var img = document.createElement('img');
      img.src = headshot;
      img.alt = name;
      img.onerror = function () {
        this.style.display = 'none';
        var fallback = document.createElement('div');
        fallback.className = 'award-card-initials';
        fallback.textContent = initials(name);
        photoWrap.appendChild(fallback);
      };
      photoWrap.appendChild(img);
    } else {
      var initialsEl = document.createElement('div');
      initialsEl.className = 'award-card-initials';
      initialsEl.textContent = initials(name);
      photoWrap.appendChild(initialsEl);
    }
    photo.appendChild(photoWrap);

    // Small corner logo badge — CSS hides this (.award-card-logo{display:none}),
    // since the big background watermark logo is used instead. Kept here so
    // markup/requests stay identical; harmless to leave, cheap to delete later.
    if (logo) {
      var cornerLogo = document.createElement('img');
      cornerLogo.className = 'award-card-logo';
      cornerLogo.src = logo;
      cornerLogo.alt = team || '';
      photo.appendChild(cornerLogo);
    }

    inner.appendChild(photo);

    var caption = document.createElement('div');
    caption.className = 'award-card-caption';
    caption.innerHTML =
      '<div class="award-card-name">' + name + '</div>' +
      '<div class="award-card-season">' + season + '</div>';
    inner.appendChild(caption);

    card.appendChild(inner);
    return card;
  }

  /* ── LIST VIEW — one award-winner row ── */
  function buildListRow(name, season, index, team, headshot) {
    var colors = TEAM_COLORS[team] || { primary: '#231aa5', secondary: 'var(--orange)' };
    var logoWhite = team ? (TEAM_LOGOS_WHITE[team] || TEAM_LOGOS_COLOR[team] || '') : '';
    var logoColor = team ? (TEAM_LOGOS_COLOR[team] || '') : '';

    var row = document.createElement('div');
    row.className = 'award-list-row';
    row.style.animationDelay = (index * 0.035) + 's';
    row.style.setProperty('--row-accent', colors.primary); // left accent bar color

    // Thumb: team-color gradient + logo watermark + portrait
    var thumb = document.createElement('div');
    thumb.className = 'award-list-row-thumb';

    var thumbBg = document.createElement('div');
    thumbBg.className = 'award-list-row-thumb-bg';
    thumbBg.style.background = 'linear-gradient(160deg,' + colors.primary + ' 0%,' + shadeColor(-0.3, colors.primary) + ' 100%)';
    thumb.appendChild(thumbBg);

    if (logoWhite) {
      var thumbLogo = document.createElement('img');
      thumbLogo.className = 'award-list-row-thumb-logo';
      thumbLogo.src = logoWhite;
      thumbLogo.alt = '';
      thumb.appendChild(thumbLogo);
    }

    if (headshot) {
      var thumbPhoto = document.createElement('img');
      thumbPhoto.className = 'award-list-row-thumb-photo';
      thumbPhoto.src = headshot;
      thumbPhoto.alt = name;
      thumbPhoto.onerror = function () {
        this.style.display = 'none';
        var fallback = document.createElement('div');
        fallback.className = 'award-list-row-thumb-initials';
        fallback.textContent = initials(name);
        thumb.appendChild(fallback);
      };
      thumb.appendChild(thumbPhoto);
    } else {
      var initialsEl = document.createElement('div');
      initialsEl.className = 'award-list-row-thumb-initials';
      initialsEl.textContent = initials(name);
      thumb.appendChild(initialsEl);
    }
    row.appendChild(thumb);

    // Main: "// year   Player Name"
    var main = document.createElement('div');
    main.className = 'award-list-row-main';

    var yearEl = document.createElement('span');
    yearEl.className = 'award-list-row-year';
    // '2027-28' → '2028' (take the century from the start year + the end year's last 2 digits)
    var seasonParts = (season || '').split('-');
    yearEl.textContent = seasonParts.length >= 2 ? (seasonParts[0].slice(0, 2) + seasonParts[1]) : season;
    main.appendChild(yearEl);

    var nameEl = document.createElement('span');
    nameEl.className = 'award-list-row-name';
    nameEl.textContent = name;
    main.appendChild(nameEl);
    row.appendChild(main);

    // Team: logo + name, right-aligned
    var teamEl = document.createElement('div');
    teamEl.className = 'award-list-row-team';
    if (logoColor) {
      var teamLogo = document.createElement('img');
      teamLogo.className = 'award-list-row-team-logo';
      teamLogo.src = logoColor;
      teamLogo.alt = team || '';
      teamEl.appendChild(teamLogo);
    }
    var teamNameEl = document.createElement('span');
    teamNameEl.className = 'award-list-row-team-name';
    teamNameEl.textContent = team || '';
    teamEl.appendChild(teamNameEl);
    row.appendChild(teamEl);

    return row;
  }

  var CATEGORY_LABELS = {
    mvp: 'Most Valuable Player',
    roty: 'Rookie of the Year',
    dpoy: 'Defensive Player of the Year',
    mip: 'Most Improved Player',
    sixmoty: 'Sixth Man of the Year',
    champion: 'Finals MVP',
  };

  var viewMode = 'card'; // 'card' | 'list' — toggled by the view buttons

  function render(category) {
    var history = window.EGE_LEAGUE_HISTORY || [];
    var content = document.getElementById('history-content');
    if (!content) return;

    var seasons = history.slice().reverse(); // newest first

    var label = document.createElement('p');
    label.className = 'award-category-label';
    label.textContent = CATEGORY_LABELS[category] || category;

    var container = document.createElement('div');
    container.className = viewMode === 'list' ? 'award-list-view' : 'award-grid';

    seasons.forEach(function (entry, index) {
      var name, team, headshot;
      if (category === 'champion') {
        // "Champion" award is really the Finals MVP; team falls back to
        // the champion field since finals_mvp_team isn't always set.
        name = entry.finals_mvp || null;
        team = entry.finals_mvp_team || entry.champion || null;
        headshot = entry.finals_mvp_headshot || null;
      } else {
        name = entry[category] || null;
        team = entry[category + '_team'] || null;
        headshot = entry[category + '_headshot'] || null;
      }
      if (!name || name === 'N/A') return;

      var row = viewMode === 'list'
        ? buildListRow(name, entry.season, index, team, headshot)
        : buildCard(name, entry.season, index, team, headshot);
      container.appendChild(row);
    });

    content.innerHTML = '';
    content.appendChild(label);
    content.appendChild(container);
  }

  function renderSelectedCategory() {
    var select = document.getElementById('history-category');
    render(select ? select.value : 'mvp');
  }

  function init() {
    var sim = window.EGE_SIM || { leagueHistoryFile: '2K25/league-history.js' };
    var script = document.createElement('script');
    script.src = sim.leagueHistoryFile;
    script.onload = function () {
      renderSelectedCategory();

      var cardBtn = document.getElementById('view-card');
      var listBtn = document.getElementById('view-list');
      function setViewMode(mode) {
        viewMode = mode;
        if (cardBtn) cardBtn.classList.toggle('active', mode === 'card');
        if (listBtn) listBtn.classList.toggle('active', mode === 'list');
        renderSelectedCategory();
      }
      if (cardBtn) cardBtn.addEventListener('click', function () { setViewMode('card'); });
      if (listBtn) listBtn.addEventListener('click', function () { setViewMode('list'); });

      var categorySelect = document.getElementById('history-category');
      if (categorySelect) categorySelect.addEventListener('change', renderSelectedCategory);
    };
    document.body.appendChild(script);
  }

  init();

})();
