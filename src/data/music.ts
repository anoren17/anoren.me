// The music page, top to bottom. Add a row with one of the helpers:
//   amazon(asin, embedId, height, title)   Amazon Music embed (title shows in the playlist)
//   youtube(videoId, title)                YouTube embed
//   note(date, text)                       a dated note in Anor's own words (either part may be '')
//   heading(text)                          a section heading
// No longer in Amazon's catalogue — do not re-add: B0B5FN3DBZ, B0CDN9KQKN, B0C4VS3CC1, B09VQ6BR7K, B0C6QXZYLN.

export type Item =
  | { kind: 'amazon'; asin: string; embedId: string; height: number; title: string }
  | { kind: 'youtube'; videoId: string; title: string }
  | { kind: 'note'; date: string; text: string }
  | { kind: 'heading'; text: string };

const amazon = (asin: string, embedId: string, height: number, title: string): Item => ({ kind: 'amazon', asin, embedId, height, title });
const youtube = (videoId: string, title: string): Item => ({ kind: 'youtube', videoId, title });
const note = (date: string, text: string): Item => ({ kind: 'note', date, text });
const heading = (text: string): Item => ({ kind: 'heading', text });

export const items: Item[] = [
  amazon("B01N6J9HCO", "7gZBEe5QaF", 352, "Kina Chir"),
  youtube("oRZ0cfZ9SeU", "Vilen — Ek Raat"),
  amazon("B094MQK737", "5H4tipmXvo", 390, "3:15 (Breathe)"),
  amazon("B07X83TF2P", "GInRR19YJd", 390, "love nwantiti"),
  amazon("B0B7B1RRLM", "AIKngnm9yP", 390, "Safar"),
  amazon("B074QFMHBY", "XdwDycClsy", 390, "Chand Sifarish"),
  amazon("B09V6DP45M", "WjG2QlesYQ", 390, "this is what heartbreak feels like"),
  amazon("B000WLMMBW", "3qctVWmDTv", 390, "Lonely"),
  amazon("B002EHTTHW", "gTva9E4JBY", 390, "Numb"),
  amazon("B002A5ZD96", "Fop6qulavJ", 390, "Fairytale"),
  amazon("B001NZXFFI", "AvF3BH4tT6", 390, "Bandoleros"),
  note("5/17", ""),
  amazon("B0B5LBDK7R", "DhWzxtrLec", 390, "она звонила мне"),
  note("2/22", ""),
  amazon("B096LFPB89", "9V4ho6MjHO", 390, "Detstvo"),
  note("1/29", ""),
  amazon("B0BKYYFCFR", "JfX392Yvp5", 390, "Childhood"),
  note("1/27", ""),
  amazon("B01MSIOX2M", "feVjg394T3", 390, "Intro (Infected)"),
  note("1/11", "Gonna be on repeat next few days"),
  youtube("vSINZsLxs8k", "Sickick — Infected"),
  amazon("B0791J764L", "nQDwW3ERzG", 390, "Aap Ki Nazron Ne Samjha"),
  amazon("B0BHTGLFBQ", "2pQTjCVt5G", 390, "Moonlight"),
  note("11/26", "On repeat today ¯\\_(ツ)_/¯. One hell of a day, full of stress and high levels of cortisol."),
  amazon("B0758XZ5XG", "0znkbFgYTB", 390, "Drowning"),
  amazon("B09NLD8Q9D", "NEfjMIgSSC", 390, "The Perfect Girl"),
  amazon("B095F7BRBJ", "ggMoFuL6Hm", 390, "Blood & Water"),
  note("", "But blood's not thicker than water after all"),
  amazon("B01BM5MW2K", "BlzTWR3Vku", 600, "XXXTentacion"),
  amazon("B09SJSVZS7", "CWWuS0lmwm", 600, "Metamorphosed"),
  note("10/22", "Respiration is my top repeat song these days."),
  heading("Evolution of Petrunko"),
  youtube("Skhaf0yQrQc", "The Great Voices of Bulgaria — Bre Petrunko"),
  youtube("dD4oeEvL_sw", "Petrunko Remix by FanEOne (Bass Boosted)"),
  youtube("vS3KVq_xjMo", "Petrunko Remix by FanEOne — Rolls Royce"),
  youtube("0HL-N9oOjcs", "Evolution of Petrunko (English version)"),
  youtube("pF1pKFiGXYw", "t.A.T.u. — Ne Ver', Ne Boysya, Ne Prosi"),
  note("10/8", "On repeat"),
  youtube("YLHpvjrFpe0", "Linkin Park — From the Inside"),
  note("10/18", ""),
  youtube("Z0z9BawyNLQ", "Dido — White Flag"),
  note("10/19", ""),
];

export const embedSrc = (it: Item): string | null =>
  it.kind === 'amazon' ? `https://music.amazon.com/embed/${it.asin}/?id=${it.embedId}&marketplaceId=ATVPDKIKX0DER&musicTerritory=US`
  : it.kind === 'youtube' ? `https://www.youtube.com/embed/${it.videoId}`
  : null;
