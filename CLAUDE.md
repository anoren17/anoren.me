# anoren.me — Personal Website

Personal static site for Anor. Minimal, editorial design. Four pages: Home (socials only),
Cooking (photo carousel), Music (embeds + notes), Poker (placeholder). **No crypto page.**

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
music.html        YouTube embeds + listening log + personal note
poker.html        Elegant "coming soon" placeholder
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
- **Music** → add another `<article class="track">` with a YouTube `/embed/<id>` iframe.
- **Poker** → replace the `.coming` section in `poker.html` with real results when ready.

## Migration note
This replaced a Google Sites site (sites.google.com). Old pages: Home, Cooking Pan, Music,
Crypto Portfolio. Content (socials, cooking photos, music links, listening log) was carried
over; the Crypto Portfolio page was intentionally dropped and a Poker page added.
