# EGE NBA Simulation

A static fan site for the **EGE NBA Simulation** — a fictional NBA league (5
real-life friends, each controlling one "player" whose fake career is
simulated in NBA2K) — tracking player stats, team standings, league history,
and awards across multiple simulation eras.

No build step, no framework, no package manager. Plain HTML + CSS +
vanilla JS, opened directly as static files or served by any static host
(e.g. GitHub Pages).

## Quick start

There's nothing to install or build. Serve the repo root with any static
file server and open `index.html`:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Opening the HTML files directly via `file://` mostly works too (data is
loaded via `<script>` tags, not `fetch`), but a local server avoids
occasional browser file:// restrictions.

## The 5 players

The whole site is organized around 5 recurring player identities (the
"owners" of the league). They show up by first-name-derived key across data
files (`clark`, `hatch`, `stogsdill`, `stewart`, `vitel`):

| key       | name           | icon                  |
|-----------|----------------|------------------------|
| clark     | Cooper Clark   | `icons/Cooper.png`    |
| hatch     | Paxon Hatch    | `icons/Paxon.png`     |
| stogsdill | Sam Stogsdill  | `icons/Sam.png`       |
| stewart   | Jaykeb Stewart | (embedded base64)     |
| vitel     | Isaac Vitel    | `icons/Isaac.png`     |

## Pages

| Page            | Purpose                                                                 | Main JS         | Main CSS          |
|-----------------|--------------------------------------------------------------------------|------------------|--------------------|
| `index.html`    | Home page — hero, stat leader ticker, matrix-rain background            | `js/index.js`   | `css/index.css`   |
| `players.html`  | Roster grid + per-player profile (bio, stat tabs, awards, contracts, career-highs, game log, shoes) | `js/players.js` | `css/players.css` |
| `teams.html`    | Team standings/history by season, rosters, team stat charts (Chart.js)  | `js/teams.js`   | `css/teams.css`   |
| `history.html`  | League history — season-by-season MVP/DPOY/ROTY/champion awards          | `js/history.js` | `css/history.css` |
| `other.html`    | Landing page for misc tools (currently just the Tweet Generator)        | —                | `css/other.css`   |
| `tweet-gen.html`| Fake-tweet image generator (html2canvas) for announcing signings etc.   | `js/tweet-gen.js`| `css/tweet-gen.css`|

`shared.css` and `shared.js` are included on every page (nav, dark/light
mode, mobile hamburger menu, matrix-rain canvas, scroll-reveal animations,
sim switcher UI).

## Architecture: how a page loads

Every page follows the same script/style order in `<head>`, then loads
`shared.js` at the end of `<body>`:

1. **`sim-config.js`** — loaded first, always. Defines `window.EGE_SIM`
   (the active season/era) and `window.EGE_SIM_REGISTRY` (all available
   eras). Must load before anything that reads `EGE_SIM`.
2. `shared.css`, then the page's own `css/<page>.css`.
3. Page body / markup.
4. The page's own `js/<page>.js`. Data-heavy pages (`players.html`,
   `teams.html`, `history.html`) don't hardcode a season's data file in
   the `<script>` tag — instead their JS reads `window.EGE_SIM` to pick
   which data file to load *at runtime*, so the same page works for every
   era without duplicating HTML.
5. **`shared.js`** — last, applies nav/theme/animation behavior after the
   page's own content and data exist.

## The multi-era "sim" system

The league has been simulated more than once ("eras"), each with its own
full data set. `sim-config.js` is the single source of truth for this:

```js
SIM_REGISTRY = {
  'sim-original': { label: '2K25', season: '2026-27', statsFile: '2K25/stats.js', playerStatsFile: '2K25/player-stats.js', ... },
  'sim-26':       { label: '2K26', season: '2025-26', statsFile: '2K26/stats-26.js', playerStatsFile: '2K26/player-stats-26.js', ... },
}
```

- The active era is stored in `localStorage['ege-sim']` and exposed as
  `window.EGE_SIM`.
- The nav bar's sim-switcher button (built by `shared.js`) lets the user
  flip between eras; switching calls `EGE_switchSim(id)`, which saves the
  choice and reloads `index.html`.
- Each page-level JS file reads `window.EGE_SIM.<xFile>` to know which data
  file under `2K25/` or `2K26/` to `<script>`-inject at runtime (see
  `js/players.js` top, `teams.html`'s inline sim-conditional `<script>`,
  etc.).
- **To add a new era**: add a new entry to `SIM_REGISTRY` in
  `sim-config.js` with its own data file paths, then create the
  corresponding `2K##/` folder with the same file shapes as `2K25/`
  (`stats.js`, `player-stats.js`, `player-games.js`, `team-stats.js`,
  `league-history.js`) plus a `logos/teaminfo##.js` if team branding
  differs. No other page needs to change.

## Data files (edit these to update site content)

All content is plain JS files assigning to `window.*` globals — no CMS, no
database for core content. Edit the file, refresh the page.

| File                              | Global                    | Contents                                                                 |
|------------------------------------|----------------------------|----------------------------------------------------------------------------|
| `2K25/player-stats.js` (+ `-26`)   | `window.PLAYER_STATS`     | Per-player: bio info, jerseys, per-season regular/playoff/totals rows, awards, retired flag |
| `2K25/player-games.js` (+ `-26`)   | (game log data)            | Individual game box scores per player, used for the Performances tab      |
| `2K25/team-stats.js` (+ `-26`)     | `window.EGE_TEAM_INFO`, `window.EGE_SEASON_STATS`, `window.EGE_PLAYER_ICONS` | Team names/divisions, standings/playoff results per season, player headshot URLs |
| `2K25/league-history.js` (+ `-26`) | `window.EGE_LEAGUE_HISTORY`| One entry per season: MVP/ROTY/DPOY/MIP/6MOTY/Champion/Finals MVP + headshots |
| `2K25/stats.js` (+ `-26`)          | `EGE_STATS`                | Home page stat-leader ticker (PPG/RPG/APG/etc. leaders)                   |
| `logos/teaminfo.js` (+ `teaminfo26.js`) | `teamInfo`             | Team abbreviation → name/city/mascot/logo filenames/brand colors          |
| `sim-config.js`                    | `EGE_SIM`, `EGE_SIM_REGISTRY` | Era registry — which data files/branding are active                    |

Notable data conventions (documented in comments at the top of
`2K25/player-stats.js`):

- **League-leader bolding**: a stat is auto-bolded in tables when it's the
  season's highest among tracked players. Force a bold via a row's
  `leaders: ['ppg', 'fgp']` array to override the automatic check.
- **College seasons**: `AU, KU, LOU, FSU, DUKE, UCLA` are excluded from
  career/chart totals; `MEX, VAN, STL` count as pro seasons and *are*
  included.
- **`dnq: true`** on a playoffs row renders as "Did Not Qualify".
- **`retired: true/false`** on a player controls the active-player count
  and profile badge site-wide.

## Assets

- `logos/` — NBA team logos (light/dark/color variants), keyed by
  filename in `teaminfo.js` / `teaminfo26.js`.
- `headshots/` — the 5 players' profile headshots (`headshots/history/`
  holds award-specific headshots used on the History page).
- `photos/` — hero/carousel photos.
- `icons/` — small UI icons (player avatars for the tweet generator, the
  Twitter icon, Woj icon).
- `numbers.ttf` — custom font used for jersey number rendering.

## External dependencies (CDN, no local install)

- **Google Fonts** — Share Tech Mono, Barlow Condensed, Rajdhani.
- **Chart.js** (`teams.html`) — team stat charts.
- **html2canvas** (`tweet-gen.html`) — renders the fake tweet card to a
  downloadable image.
- **Supabase** (`js/players.js`) — a public anon-key-backed REST endpoint
  used only for lightweight emoji "reactions" on game-log entries
  (`game_reactions` table). The anon key in the source is meant to be
  public (Supabase's row-level-security model); it is not a secret.

## Known quirks worth knowing before you touch things

- `js/tweet-gen.js` hardcodes per-account PINs in plaintext as a *soft*
  gate on which preset Twitter handle you can post as — it's not real
  auth (visible to anyone who views source), just friction against
  friends impersonating each other for the joke tweets.
- `2K25/` (era `sim-original`, labeled "2K25") and `2K26/` (era `sim-26`,
  labeled "2K26") are parallel, hand-duplicated data sets. There's no
  shared/inherited data between eras — updating one does not affect the
  other.
- No build tooling, linter, formatter, or test suite is configured. Keep
  changes consistent with the existing vanilla-JS/IIFE style already in
  each file.
