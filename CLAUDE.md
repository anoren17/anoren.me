# anoren.me — Personal Website

Personal static site for Anor. Minimal, editorial design. Four pages: Home (socials only),
Cooking (41-photo carousel), Music (carousel of Amazon Music + YouTube embeds with dated notes — 42 slides),
Poker (live WSOP results — earnings hero + ledger). **No crypto page.**

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
- Still UNCONFIRMED (his call): footer right-side microcopy was removed at his request —
  footers now show only `anoren.me`. The home eyebrow "Personal — est. 2026" and the cooking
  sub-line are still my wording; confirm or replace if he objects.

## How it's wired up

| Layer | Detail |
|---|---|
| **Source** | This directory. Plain static HTML/CSS/JS — no build step, no framework. |
| **Host** | GitHub Pages, repo `anoren17/anoren.me`, branch `main`, folder `/` (root). |
| **GitHub Pages URL** | https://anoren17.github.io/anoren.me/ |
| **Live URL** | https://anoren.me (custom domain, HTTPS enforced) |
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
index.html        Home — wordmark, social links, contents index
cooking.html      41-photo auto-advancing carousel (JS-driven from assets/cooking/)
music.html        Carousel of Amazon Music + YouTube embeds + notes/headings (42 slides, JS `items` array)
poker.html        WSOP results — giant earnings hero + suit-marked results ledger
styles.css        Shared stylesheet (Fraunces / Space Mono / Inter; persimmon accent)
assets/cooking/   img-01.jpg … img-41.jpg (downloaded from the old Google Sites page)
CNAME             Custom-domain marker for GitHub Pages
```

## Design system
- Palette: paper `#F3EFE6`, ink `#17130E`, persimmon accent `#E2552B`, sage `#5E6A4C`.
- Type: **Fraunces** (display), **Space Mono** (labels), **Inter** (body).
- Each page begins with a `<!-- @dsCard group="Pages" -->` marker so it renders as a card
  in the claude.ai/design pane. The comment is inert in browsers — safe to keep.

## To update the site
1. `git pull origin main` first (per repo convention).
2. Edit the HTML/CSS.
3. Commit + push: `git add -A && git commit -m "..." && git push`
4. Pages redeploys automatically (~30–60s). Verify with `curl -sI https://anoren.me`.

### Common edits
- **Socials** → `index.html`, the `.socials` block (handles live in the link text).
- **More cooking photos** → drop files in `assets/cooking/`, bump `const N` in `cooking.html`.
- **Music** → add a row to the `items` array in `music.html`: `['a', ASIN, id, height, 'Title']` for
  Amazon Music (title is required — shown in thumbnail strip), `['y', videoId, 'Title']` for YouTube,
  `['n', date, text]` for a note, `['h', 'Heading HTML']` for a section heading. The page is now a
  carousel (same chrome as cooking) with no autoplay. Broken/removed Amazon tracks: B0B5FN3DBZ,
  B0CDN9KQKN, B0C4VS3CC1, B09VQ6BR7K, B0C6QXZYLN (no longer in Amazon catalog — do not re-add).
- **Poker** → edit the `.result` rows in the `.ledger` and the `.eh-substats` in `poker.html`; mark the
  best cash with `class="result best"`. Each `.r-place` now includes field size and top-% via
  `<span class="r-entries"> / N,NNN (X.X%)</span>`. Source: The Hendon Mob player n=960137 (name withheld).
  Current: 5 cashes, $16,800, best 32nd / 1,299 (2.5%) in $1,500 Shootout. Poker page stays as a ledger
  (not a carousel) — 5 rows is the right format.

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
