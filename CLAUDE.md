# anoren.me — Personal Website

Anor's personal site. Night ground, electric-turquoise calligraphy, Assassin's Creed persona, animated.
Four pages: Home (wordmark, blade, creed, socials, three section tiles), Cooking (photo carousel),
Music (stage + playlist of Amazon Music / YouTube embeds with dated notes), Poker (live WSOP results).
**No crypto page.** Built with **Astro 7 + TypeScript**; output is plain static pages.

## ⚠️ Content & voice rule (read before writing any copy)
- **Never invent taglines, descriptions, or first-person ("I…") copy.** All text in Anor's voice must be
  his own words. Keep the site minimal — prefer no prose over filler.
- **Always confirm any user-facing text with Anor before publishing it.** Structural labels are fine.
- Approved: headlines "Cooking", "Music", "Poker"; music sub-line "The songs I can't stop playing.";
  poker sub-line "Live tournament results"; the dated music notes; home tagline
  "Nothing is true, Everything is permitted. 🗡️" (effects may animate it, never reword it).
- Footers show only `anoren.me`. The old home eyebrow and cooking sub-line (my wording) were removed — don't re-add.

## Anor's brief (2026-11-09) — the quality bar
"I am not an average guy": the site must reflect his persona, be thought through, catch the eye at first
glance, nothing mediocre — and effects must cost almost nothing in load time or CPU.
- **Colour**: electric turquoise on a dark ground (he rejected orange, then two blues).
- **Lettering**: calligraphy (Alex Brush) — approved; alternates kept on a shelf (below).
- **Persona**: Assassin's Creed. Use **original** motifs only — never logos, artwork or UI lifted from the games.
  He picks which motifs ship (2026-11-13: chose eagle vision, leap of faith, Animus sync-in, scroll hero;
  passed on blade-strike clicks, decode-everywhere, DNA strand, 404 page).

## Commands
`npm run dev` (live preview) · `npm run build` → `dist/` · `npm run preview` (serve the build, port 4321) ·
`npm run check` (types). Node comes from Homebrew (`brew install node`).

## Structure
```
astro.config.mjs        site URL; build.format 'file' (keeps /cooking.html etc. working)
src/layouts/Base.astro  the one page shell: head, fonts, nav, footer, pre-paint inline script
src/pages/*.astro       index, cooking, music, poker
src/data/site.ts        nav + socials            src/data/music.ts   the playlist (helpers: amazon/youtube/note/heading)
src/data/poker.ts       results → totals computed src/data/cooking.ts photo list (globbed) + home tile picks
src/assets/cooking/     img-NN.jpg originals (compressed to WebP at build by src/lib/images.ts)
src/scripts/*.ts        wordmark (light, tilt, lattice), decode (creed), eagle, tiles, carousel, player
src/styles/tokens.css   colours, type, motion, layout tokens      src/styles/site.css  everything else
src/styles/creed.css    the Assassin's Creed effects layer (header comment lists all four)
src/fonts/script.ts     the calligraphy shelf                      docs/calligraphy-shelf.png  comparison sheet
public/CNAME            .github/workflows/deploy.yml (build + deploy to Pages)
```

## Common edits (each is one data edit; counts and totals follow)
- **Socials** → `src/data/site.ts`.
- **Cooking photo** → drop `img-NN.jpg` in `src/assets/cooking/`. Home tile rotation: `homePicks` in `src/data/cooking.ts`.
- **Music** → add a row in `src/data/music.ts`. Dead Amazon ASINs are listed there (do not re-add).
  "Vilen — Ek Raat" is age-restricted on YouTube and won't embed.
- **Poker** → add a row in `src/data/poker.ts`; total, cash count, best finish/cash, top-% and the row bars are
  computed. Source: The Hendon Mob player n=570847 (name withheld); Cloudflare blocks fetches — use the
  claude-in-chrome browser tools. WSOP-only by design (a 2017 WPT India cash is deliberately excluded,
  confirmed 2026-08-27). Stays a ledger, not a carousel.
- **Calligraphy face** → change `ACTIVE` in `src/fonts/script.ts`. Installed alternates — similar: Allura,
  Great Vibes, Pinyon Script, Italianno, Imperial Script, Carattere; heavier: Kaushan Script, Playball,
  Yesteryear, Mr Dafoe. Each has a `scale` so layouts hold; only the active file is downloaded by visitors.
- **Colours** → `src/styles/tokens.css` (`--turq` is the signature; `--red` is only for hearts/diamonds).
- **New effect or interactive sim** → a module in `src/scripts/`, imported from a `<script>` in the page or
  component that owns the markup; data it needs goes in `src/data/`. Follow the performance rules.

## Design system
- Tokens: night `#04090D`, surfaces `#0A141A` / `#12212A`, text `#E9F4F2` / soft `#8DA3A8`,
  turquoise `#19F0D2` (deep `#0D9DB3`, highlight `#D4FFF6`), ink-on-turquoise `#031014`, red `#FF4D5E`.
- Type: script face (wordmark, page + tile titles) · Bricolage Grotesque (numbers, event names, notes) ·
  Onest (text; has Cyrillic). All self-hosted via `@fontsource`.
- `.ink` = the luminous lettering (gradient fill, static blurred glow from `data-text`, write-on mask, sheen).
- Home: blade SVG extends once under the wordmark; creed decodes on load/hover; pointer light + tilt on the
  wordmark; lattice visible only in the pointer's light. Tiles: photo crossfade, equalizer, card fan.
- Cross-page view transitions morph wordmark / tiles / titles / nav pill (names in `site.css`, body `page-*`).
- **AC layer (`creed.css`)**: *leap of faith* — root dives into a section, rises back home (`data-leap` set in
  `Base.astro`'s `pagereveal`), light streaks behind; *Animus sync-in* — data slices on every arrival, scanline
  glitch on a fresh load (`html.fresh`), cooking photos glitch between slides; *eagle vision* — tap **E** to
  toggle (or hold it), or press-and-hold an empty spot (`eagle.ts`): world greys under a veil, usable things glow turquoise, the current
  target (photo / track / best cash) glows `--gold`; *scroll hero* — name tilts back, blade sheathes (CSS scroll timeline).
- **Performance rules** (re-measured 2026-11-13 with the AC layer: idle main thread ≤1% on every page, eagle
  vision held ~0.3%):
  glows are static blurred copies, never a filter on something animating; endless loops are transform-only
  and pause off-screen; pointer effects run only while the pointer moves; nothing else loops; no canvas/WebGL
  loops; `prefers-reduced-motion` switches all motion off. Re-measure after adding effects.
- **Traps (each caused a real bug):** the hero and page-title lettering have padded, invisible boxes (room for the
  glow and write-on mask), so they are `pointer-events:none` and `.nav` sits at `z-index:2` — keep it that way or
  nav links stop clicking. The `@view-transition` opt-in is inlined first in `Base.astro` *and* kept in `site.css`;
  with only the stylesheet copy, most page changes silently skipped the morph. Eagle vision lifts targets above
  a fixed veil, so their ancestors must not be stacking contexts — no isolation/transform/filter/mask left on
  `.hero` or `main` (why the page background lives on `html`). Keep scroll `animation-timeline` in its own,
  more specific rule: the minifier folds it into the `animation` shorthand, which Chrome rejects silently.

## Hosting
| | |
|---|---|
| **Host** | GitHub Pages, repo `anoren17/anoren.me`, deployed by GitHub Actions on push to `main` |
| **Live URL** | https://anoren.me (custom domain set in Pages settings + `public/CNAME`; HTTPS enforced) |
| **Git remote** | `git@github.com:anoren17/anoren.me.git` (SSH — HTTPS push fails in this env) |
| **Registrar / DNS** | Squarespace Domains: apex → 185.199.108–111.153, `www` CNAME → `anoren17.github.io` |

`gh` is authenticated: `gh api repos/anoren17/anoren.me/pages` (status), `gh run watch` (deploys),
`gh api repos/anoren17/anoren.me/pages --method PUT --field cname=anoren.me` (re-set domain).
To publish: `git pull origin main`, edit, `npm run build && npm run check`, check in the browser (`npm run preview`)
that links click, page morphs run and nothing scrolls sideways at 320px, commit, push — only when Anor says so.
**Open:** only tested in Chrome — not yet Safari, Firefox or a real phone. The claude.ai/design preview project
(`9b50760f-…`) was synced from the old hand-written HTML and is stale.

## History
Replaced a Google Sites site in June 2026 (content carried over; Crypto page dropped, Poker added). The old
Google Site (Drive file `1n4vwoxD6vCf305v8cdR4BHkHOxiZ8TTw`) is not scrapable — ask Anor to paste raw HTML.

**Session note (2026-06-13/14):** Built and launched the original static site on GitHub Pages with HTTPS; music carousel pointer-events fix.

**Session note (2026-08-27):** Synced 2 new WSOP 2026 cashes; confirmed poker stays WSOP-only.

**Session note (2026-11-09):** Blue redesign shipped then rejected; migrated to Astro 7 + TypeScript and rebuilt as night/turquoise with Assassin's Creed motifs, then fixed the bugs now listed under Design system → Traps. Headless-Chrome checks need a real-time session (virtual-time screenshots stall animations).

**Session note (2026-11-13):** Added the AC effects layer (`creed.css`, `eagle.ts`) — four effects he picked from eight offered; verified in Chrome at 320–1920px.
