# anoren.me — Personal Website

Personal static site for Anor. Blue, calligraphic, animated. Four pages: Home (wordmark, socials, three
section tiles), Cooking (41-photo carousel), Music (player: stage + playlist of Amazon Music + YouTube
embeds with dated notes — 42 items), Poker (live WSOP results — earnings panel + ledger). **No crypto page.**

## ⚠️ Content & voice rule (read before writing any copy)
- **Never invent taglines, descriptions, or first-person ("I…") copy.** All text that speaks
  in Anor's voice must be Anor's own words. Do not write things like "A small corner of the
  internet for the things I make and love."
- Keep the site **minimal** — prefer no descriptive prose over filler.
- **Always confirm any user-facing content/text with Anor before publishing it.** Structural
  labels (nav, section numbers, headings he's approved) are fine; personal-voice sentences are not.
- Approved so far: headlines "Cooking", "Music", "Poker". Music sub-line
  "The songs I can't stop playing." is approved. Poker eyebrow "Live tournament results" and
  the dated music notes (Anor's own words) are approved.
- Footers show only `anoren.me` (his request). The home eyebrow "Personal — est. 2026" and the cooking
  sub-line (both my wording, never confirmed) were **removed** in the 2026-11-09 redesign — don't
  re-add them or anything like them without his words.
- **Approved tagline** on home page (Anor's own words): "Nothing is true, Everything is permitted. 🗡️"

## How it's wired up

| Layer | Detail |
|---|---|
| **Source** | This directory. Plain static HTML/CSS/JS — no build step, no framework. |
| **Host** | GitHub Pages, repo `anoren17/anoren.me`, branch `main`, folder `/` (root). |
| **GitHub Pages URL** | https://anoren17.github.io/anoren.me/ |
| **Live URL** | https://anoren.me (custom domain, HTTPS enforced — cert covers anoren.me + www, expires 2026-09-11) |
| **Git remote** | `git@github.com:anoren17/anoren.me.git` (SSH — HTTPS push fails in this env) |
| **Registrar** | Tucows (formerly Google Domains; domain now managed at domains.squarespace.com) |
| **Design preview** | claude.ai/design project `9b50760f-e4c3-4711-abef-c0757d2154d5` (synced via DesignSync) |

### gh CLI is available
`gh` is authenticated in this environment. Use it for all GitHub operations, e.g.:
- View Pages status: `gh api repos/anoren17/anoren.me/pages`
- Re-set custom domain: `gh api repos/anoren17/anoren.me/pages --method PUT --field cname=anoren.me`
- Repo info: `gh repo view anoren17/anoren.me`

### DNS records (set at Squarespace Domains → anoren.me → DNS)
Apex `@` → four GitHub Pages A records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
`www` → CNAME → `anoren17.github.io`
(Leave the Squarespace `_domainconnect` record in place — it's harmless.)
The `CNAME` file in this repo root holds `anoren.me` and must stay — it tells Pages the custom domain.

## File structure
```
index.html        Home — interactive wordmark, social links, three section tiles (inline script)
cooking.html      41-photo auto-advancing carousel + thumbnail grid (JS-driven from assets/cooking/)
music.html        Stage + playlist of Amazon Music + YouTube embeds + notes/headings (JS `items` array)
poker.html        WSOP results — earnings panel (count-up) + suit-marked results ledger
styles.css        Shared stylesheet — tokens at the top (`--royal` is the accent)
site.js           Shared behaviour, loaded in <head>: entrance reveals, pointer glow, `.js`/`.vt` flags
assets/cooking/   img-01.jpg … img-41.jpg (full size) + thumbs/img-NN.jpg (400px copies for the grid)
CNAME             Custom-domain marker for GitHub Pages
```

## Design system
- Palette: ground `#F5F7FC`, navy ink `#0B1337`, **blue accent `#0B5CFF`** (`--royal`; deep `#0A2BB5` for
  ink shading), wash `#DFE9FF`, turquoise `#4FE6D6` (spark — only on blue/navy surfaces). Anor asked for
  blue instead of the old orange, then for "a better blue" than `#1E44E2`.
- Type: **Alex Brush** (calligraphy — wordmark, page titles, tile titles; his request), **Bricolage
  Grotesque** (numbers, event names, notes), **Onest** (text; has Cyrillic for song titles).
- Motion (his brief: "highly stunning, interactive and smooth"): lettering is written on + sheen sweep;
  home wordmark has a pointer light + tilt; cross-page **view transitions** morph wordmark / tiles /
  titles / nav pill (names set in `styles.css`; body class `page-*` picks them); music tile equalizer
  follows the pointer; poker tile cards fan; poker rows' underline = that cash ÷ best cash (computed in
  JS from `.r-prize`). All of it is disabled under `prefers-reduced-motion`.
- Each page begins with a `<!-- @dsCard group="Pages" -->` marker so it renders as a card
  in the claude.ai/design pane. The comment is inert in browsers — safe to keep.

## To update the site
1. `git pull origin main` first (per repo convention).
2. Edit the HTML/CSS.
3. Commit + push: `git add -A && git commit -m "..." && git push`
4. Pages redeploys automatically (~30–60s). Verify with `curl -sI https://anoren.me`.

### Common edits
- **Socials** → `index.html`, the `.socials` block (handles live in the link text).
- **More cooking photos** → drop files in `assets/cooking/`, bump `const N` in `cooking.html`, update
  "41 plates" on the home tile, and make the thumb:
  `sips -Z 400 -s formatOptions 62 assets/cooking/img-NN.jpg --out assets/cooking/thumbs/img-NN.jpg`
  (a missing thumb falls back to the full photo). Home tile rotates `picks` in `index.html`.
- **Music** → add a row to the `items` array in `music.html`: `['a', ASIN, id, height, 'Title']` for
  Amazon Music (title is required — shown in the playlist), `['y', videoId, 'Title']` for YouTube,
  `['n', date, text]` for a note, `['h', 'Heading HTML']` for a section heading. One item shows on the
  stage at a time; no autoplay. "Vilen — Ek Raat" (oRZ0cfZ9SeU) is age-restricted and won't embed. Broken/removed Amazon tracks: B0B5FN3DBZ,
  B0CDN9KQKN, B0C4VS3CC1, B09VQ6BR7K, B0C6QXZYLN (no longer in Amazon catalog — do not re-add).
- **Poker** → edit the `.result` rows in the `.ledger` and the `.eh-substats` in `poker.html`; mark the
  best cash with `class="result best"`. Each `.r-place` now includes field size and top-% via
  `<span class="r-entries"> / N,NNN (X.X%)</span>`. Source: The Hendon Mob player n=570847 (name
  withheld; the old n=960137 URL now redirects here — use n=570847 going forward). Hendon Mob's
  Cloudflare check blocks WebFetch — pull results via claude-in-chrome browser tools instead.
  Page is WSOP-only by design (a 2017 WPT India cash exists on Hendon Mob but is deliberately
  excluded — confirmed with Anor 2026-08-27). Current: 7 cashes, $19,972, best 32nd / 1,299 (2.5%)
  in $1,500 Shootout. Poker page stays as a ledger (not a carousel) — 7 rows is the right format.
  The hero figure counts up to whatever number is in the HTML; nothing else to update.

## Migration note
This replaced a Google Sites site (sites.google.com). Old pages: Home, Cooking Pan, Music,
Crypto Portfolio. Content (socials, cooking photos, music links, listening log) was carried
over; the Crypto Portfolio page was intentionally dropped and a Poker page added.

The old Google Site is Drive file `1n4vwoxD6vCf305v8cdR4BHkHOxiZ8TTw` (page
`1e5U0QPBvbLD-D12EJT_3mu4Fxl6ZRUy-`). It is **not scrapable** — the editor/preview URLs require
Anor's Google login and Sites content can't be exported via the Drive API. To recover anything
else from it, have Anor paste the page's raw HTML (that's how the music embeds were recovered).

---
**Session note (2026-06-13):** Built the whole site from scratch (4 pages + 41 cooking images),
deployed to GitHub Pages on anoren.me, synced to claude.ai/design; added real poker results,
rebuilt music with all ~35 embeds, and stripped invented copy per the content/voice rule.
Next: get Anor's words for the home eyebrow + cooking sub-line if he wants them changed.

**Session note (2026-06-13 continued):** Added field sizes + top-% to all poker results; removed 6 dead
music embeds; converted music feed to carousel (matching cooking). Next: none — site is in good shape.

**Session note (2026-06-13 final):** Fixed HTTPS (cycled CNAME to trigger Let's Encrypt provisioning,
enforced via API); added home tagline. Site is fully live and secure at https://anoren.me.

**Session note (2026-06-14):** Fixed music page iframe/link interactivity — invisible inactive slides (`position:absolute;inset:0;opacity:0`) were blocking pointer events on the active slide's iframes. Fix: `pointer-events:none` on inactive slides, `pointer-events:auto` on active. No open TODOs.

**Session note (2026-08-27):** Synced 2 new WSOP 2026 cashes from Hendon Mob (pulled via browser tools since Hendon Mob blocks WebFetch); confirmed with Anor to keep the poker page WSOP-only rather than backfill an older non-WSOP cash. No open TODOs.

**Session note (2026-11-09):** Full redesign at Anor's request — blue accent (`#0B5CFF`), Alex Brush calligraphy lettering with effects, photo-first cooking page, music player layout, and an interactive/animated layer (view transitions, pointer effects, count-up). Local preview only needs `python3 -m http.server`; its dropped connections under load are a test-server artifact, not a site bug.
