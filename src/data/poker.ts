// Live tournament cashes, newest first. Source: The Hendon Mob, player n=570847 (pull via browser tools —
// Cloudflare blocks plain fetches). WSOP only, by design (a 2017 WPT India cash is deliberately left out).
// Everything else on the page — total, number of cashes, best finish, best cash, top-% — is computed from this list.

export interface Result {
  buyIn: string;     // as printed, e.g. '$350+200'
  game: string;      // 'NLH'
  name: string;
  tag: string;       // 'Bracelet #72'
  year: number;
  date: string;      // '28 Jun'
  place: number;
  entries: number;
  prize: number;     // USD
}

export const results: Result[] = [
  { buyIn: "$1,000", game: "NLH", name: "Mini Main Event", tag: "Bracelet #72", year: 2026, date: "28 Jun", place: 777, entries: 12560, prize: 2550 },
  { buyIn: "$350+200", game: "NLH", name: "Mini Mystery Millions", tag: "Bracelet #1", year: 2026, date: "26 May", place: 1970, entries: 20488, prize: 622 },
  { buyIn: "$1,000", game: "NLH", name: "Mini Main Event", tag: "Bracelet #75", year: 2025, date: "29 Jun", place: 511, entries: 10794, prize: 3360 },
  { buyIn: "$1,500", game: "NLH", name: "Millionaire Maker", tag: "Bracelet #53", year: 2025, date: "18 Jun", place: 668, entries: 11996, prize: 3990 },
  { buyIn: "$500", game: "NLH", name: "Colossus", tag: "Bracelet #19", year: 2025, date: "04 Jun", place: 1516, entries: 16301, prize: 1090 },
  { buyIn: "$1,500", game: "NLH", name: "Shootout", tag: "Bracelet #20", year: 2025, date: "04 Jun", place: 32, entries: 1299, prize: 5360 },
  { buyIn: "$1,500", game: "NLH", name: "Millionaire Maker", tag: "Event #37", year: 2022, date: "17 Jun", place: 775, entries: 7962, prize: 3000 },
];

export const total = results.reduce((sum, r) => sum + r.prize, 0);
export const bestCash = Math.max(...results.map(r => r.prize));
export const bestFinish = Math.min(...results.map(r => r.place));
export const latestYear = Math.max(...results.map(r => r.year));

export const usd = (n: number) => '$' + n.toLocaleString('en-US');
export const ordinal = (n: number) => {
  const t = n % 100;
  return t >= 11 && t <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][n % 10] ?? 'th');
};
export const topPercent = (r: Result) => (r.place / r.entries * 100).toFixed(1);
