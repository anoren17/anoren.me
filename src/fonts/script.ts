// The calligraphy shelf.
// Every face here is installed and self-hosted; only ACTIVE is ever downloaded by a visitor.
// To switch the site's lettering, change ACTIVE — nothing else.
// `scale` evens out how big each face draws at the same font-size (Alex Brush = 1), so layouts hold.
// Comparison sheet: docs/calligraphy-shelf.png
import alexBrush from '@fontsource/alex-brush/files/alex-brush-latin-400-normal.woff2?url';
import allura from '@fontsource/allura/files/allura-latin-400-normal.woff2?url';
import greatVibes from '@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff2?url';
import pinyonScript from '@fontsource/pinyon-script/files/pinyon-script-latin-400-normal.woff2?url';
import italianno from '@fontsource/italianno/files/italianno-latin-400-normal.woff2?url';
import imperialScript from '@fontsource/imperial-script/files/imperial-script-latin-400-normal.woff2?url';
import carattere from '@fontsource/carattere/files/carattere-latin-400-normal.woff2?url';
import kaushanScript from '@fontsource/kaushan-script/files/kaushan-script-latin-400-normal.woff2?url';
import playball from '@fontsource/playball/files/playball-latin-400-normal.woff2?url';
import yesteryear from '@fontsource/yesteryear/files/yesteryear-latin-400-normal.woff2?url';
import mrDafoe from '@fontsource/mr-dafoe/files/mr-dafoe-latin-400-normal.woff2?url';

export const shelf = {
  // pen / brush calligraphy, close in spirit to Alex Brush
  'Alex Brush':      { url: alexBrush,      scale: 1 },
  'Allura':          { url: allura,         scale: 1.04 },
  'Great Vibes':     { url: greatVibes,     scale: 1.2 },
  'Pinyon Script':   { url: pinyonScript,   scale: 0.97 },
  'Italianno':       { url: italianno,      scale: 1.25 },
  'Imperial Script': { url: imperialScript, scale: 1.12 },
  'Carattere':       { url: carattere,      scale: 1.1 },
  // heavier brush lettering
  'Kaushan Script':  { url: kaushanScript,  scale: 0.96 },
  'Playball':        { url: playball,       scale: 0.97 },
  'Yesteryear':      { url: yesteryear,     scale: 1.17 },
  'Mr Dafoe':        { url: mrDafoe,        scale: 1.04 },
} as const;

export const ACTIVE: keyof typeof shelf = 'Alex Brush';

export const script = { name: ACTIVE, ...shelf[ACTIVE] };
