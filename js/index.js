  (function() {
    var sim = window.EGE_SIM || { statsFile:'stats.js', playerStatsFile:'player-stats.js' };

    function loadScript(src, cb) {
      var s = document.createElement('script'); s.src = src;
      s.onload = cb || function(){}; document.head.appendChild(s);
    }

    function initPage() {
      /* ── UPDATE HERO EYEBROW + TITLE SIM LABEL ── */
      var eyebrow = document.getElementById('hero-eyebrow');
      if (eyebrow && sim.heroEyebrow) eyebrow.textContent = sim.heroEyebrow;
      var simLabel = document.getElementById('hero-sim-label');
      if (simLabel) simLabel.textContent = sim.label;

      /* ── TICKER + STATS STRIP ── */
      (function() {
        if (typeof PLAYER_STATS === 'undefined') return;

        var COLLEGE = ['AU','KU','LOU','FSU','DUKE','UCLA',
          'Arizona Wildcats','Duke Blue Devils','Florida State Seminoles',
          'Kansas Jayhawks','Louisville Cardinals'];
        // Retirement driven by player-stats.js retired: boolean
        // Player display names
        var PLAYER_NAMES_DEFAULT = {
          clark:'Cooper Clark', hatch:'Paxon Hatch', stogsdill:'Sam Stogsdill',
          stewart:'Jaykeb Stewart', vitel:'Isaac Vitel'
        };
        var PLAYER_NAMES = window.EGE_SIM2_PLAYER_NAMES || PLAYER_NAMES_DEFAULT;

        function isProRow(r) {
          return COLLEGE.indexOf((r.team||'').toUpperCase()) === -1
              && COLLEGE.indexOf(r.team||'') === -1
              && !r.dnq && r.gp > 0;
        }

        // Active = not retired (reads from player-stats.js retired boolean)
        var activeKeys = Object.keys(PLAYER_STATS).filter(function(p) {
          return !PLAYER_STATS[p].retired;
        });

        var latestSeason = '';
        activeKeys.forEach(function(p) {
          var rows = (PLAYER_STATS[p].regular||[]).filter(isProRow);
          if (rows.length) {
            var s = rows[rows.length-1].season;
            if (s > latestSeason) latestSeason = s;
          }
        });

        var latestStats = {};
        activeKeys.forEach(function(p) {
          var rows = (PLAYER_STATS[p].regular||[]).filter(isProRow);
          latestStats[p] = rows.find(function(r){ return r.season === latestSeason; })
                        || rows[rows.length-1] || null;
        });

        function fmt(val, stat) {
          var v = parseFloat(String(val||'').replace('%',''));
          if (isNaN(v)) return null;
          return (stat==='tpp'||stat==='fgp') ? v.toFixed(1)+'%' : v.toFixed(1);
        }

        // BUILD TICKER
        var ticker = document.getElementById('index-ticker');
        if (ticker) {
          var statDefs = [
            {key:'ppg', label:'PPG Leader'},
            {key:'rpg', label:'RPG Leader'},
            {key:'apg', label:'APG Leader'},
            {key:'spg', label:'SPG Leader'},
            {key:'bpg', label:'BPG Leader'},
            {key:'tpp', label:'3P% Leader'},
            {key:'fgp', label:'FG% Leader'},
          ];
          var items = [];
          var allKeys = Object.keys(PLAYER_STATS);
          var allRetired = allKeys.every(function(p) { return PLAYER_STATS[p].retired; });

          if (allRetired) {
            // Career averages — weighted by games played across all pro seasons
            function careerAvg(p, key) {
              var rows = (PLAYER_STATS[p].regular||[]).filter(isProRow);
              var totalGP = 0, weightedSum = 0;
              rows.forEach(function(r) {
                var v = parseFloat(String(r[key]||'').replace('%',''));
                if (!isNaN(v) && r.gp > 0) {
                  weightedSum += v * r.gp;
                  totalGP += r.gp;
                }
              });
              return totalGP > 0 ? weightedSum / totalGP : null;
            }

            statDefs.forEach(function(def) {
              var bestP = null, bestV = -Infinity;
              allKeys.forEach(function(p) {
                var avg = careerAvg(p, def.key);
                if (avg !== null && avg > bestV) { bestV = avg; bestP = p; }
              });
              if (bestP) {
                var display = fmt(bestV, def.key);
                if (display) items.push('Career ' + def.label + ' · ' + (PLAYER_NAMES[bestP]||bestP) + ' · ' + display);
              }
            });
            items.push('All Players Retired · ' + sim.label);
          } else {
            statDefs.forEach(function(def) {
              var bestP = null, bestV = -Infinity;
              activeKeys.forEach(function(p) {
                var s = latestStats[p];
                if (!s) return;
                var v = parseFloat(String(s[def.key]||'').replace('%',''));
                if (!isNaN(v) && v > bestV) { bestV = v; bestP = p; }
              });
              if (bestP) {
                var display = fmt(latestStats[bestP][def.key], def.key);
                if (display) items.push(def.label + ' · ' + (PLAYER_NAMES[bestP]||bestP) + ' · ' + display);
              }
            });
            items.push('Season · ' + latestSeason.replace('-', '–'));
          }
          items.push(sim.label + ' · ' + sim.subtitle);
          ticker.innerHTML = items.concat(items).map(function(txt) {
            return '<span class="ticker-item">' + txt + '</span>';
          }).join('');
        }

        // BUILD STATS STRIP
        var allKeys = Object.keys(PLAYER_STATS);

        var elP = document.getElementById('strip-players');
        if (elP) elP.dataset.target = activeKeys.length;

        var allSeasons = new Set();
        allKeys.forEach(function(p) {
          (PLAYER_STATS[p].regular||[]).filter(isProRow).forEach(function(r){ allSeasons.add(r.season); });
        });
        var elS = document.getElementById('strip-seasons');
        if (elS) elS.dataset.target = allSeasons.size;

        var total = 0;
        allKeys.forEach(function(p) {
          ['regular','playoffs'].forEach(function(mode) {
            ((PLAYER_STATS[p]||{})[mode]||[]).filter(isProRow).forEach(function(r){ total += (r.gp||0); });
          });
        });
        var elG = document.getElementById('strip-games');
        if (elG) elG.dataset.target = total;
      })();

      /* ── ROTATING STAT BANNER (EGE_STATS) ── */
      (function () {
        var track  = document.getElementById('stat-track');
        var dotsEl = document.getElementById('stat-dots');
        var data   = (typeof EGE_STATS !== 'undefined') ? EGE_STATS.leaders : [];
        if (!data.length || !track) return;
        data.forEach(function(item, i) {
          var slide = document.createElement('div');
          slide.className = 'stat-banner-slide' + (i === 0 ? ' active' : '');
          slide.innerHTML =
            '<span class="stat-banner-category">' + item.label + '</span>' +
            '<span class="stat-banner-sep">◆</span>' +
            '<span class="stat-banner-player">' + item.player + '</span>' +
            '<span class="stat-banner-sep">·</span>' +
            '<span class="stat-banner-stat">' + item.value +
              '<span class="stat-banner-unit">' + item.unit + '</span>' +
            '</span>';
          track.appendChild(slide);
          var dot = document.createElement('button');
          dot.className = 'stat-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          dot.addEventListener('click', function() { goTo(i); });
          dotsEl.appendChild(dot);
        });
        var slides = track.querySelectorAll('.stat-banner-slide');
        var dots   = dotsEl.querySelectorAll('.stat-dot');
        var current = 0, timer;
        function goTo(next) {
          if (next === current) return;
          slides[current].classList.add('exit');
          dots[current].classList.remove('active');
          var prev = current; current = next;
          slides[current].classList.add('active');
          dots[current].classList.add('active');
          setTimeout(function() { slides[prev].classList.remove('active','exit'); }, 500);
          clearInterval(timer); timer = setInterval(advance, 3800);
        }
        function advance() { goTo((current + 1) % data.length); }
        timer = setInterval(advance, 3800);
      })();
    }

    // Load data files, then run init (shared.js already loaded statically above)
    loadScript(sim.statsFile, function() {
      loadScript(sim.playerStatsFile, function() {
        initPage();
      });
    });
  })();
