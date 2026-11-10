// The creed resolves out of scrambled glyphs — once on load, and again whenever it is hovered.
// The words themselves are never changed: every glyph settles back to exactly what is in the HTML.
import { $, calm } from './util';

if (!calm) {
  const el = $('.creed');
  const text = el.textContent ?? '';
  const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789/\\<>=+_';
  let timer = 0;

  const run = (lead: number, per: number) => {
    if (timer) return;

    // One span per character (words kept unbreakable) so each can scramble on its own.
    el.textContent = '';
    const chars: { el: HTMLSpanElement; ch: string }[] = [];
    text.split(' ').forEach((word, i, all) => {
      const w = document.createElement('span');
      w.className = 'w';
      for (const ch of word) {
        const c = document.createElement('span');
        c.className = 'c';
        c.textContent = ch;
        w.appendChild(c);
        chars.push({ el: c, ch });
      }
      el.appendChild(w);
      if (i < all.length - 1) el.appendChild(document.createTextNode(' '));
    });
    // Lock every slot to its final width so the line never shifts while glyphs flicker.
    const widths = chars.map(c => c.el.offsetWidth);
    chars.forEach((c, i) => { c.el.style.width = widths[i] + 'px'; });

    const t0 = performance.now() + lead;
    const settle = chars.map((_, i) => t0 + 240 + i * per + Math.random() * 140);
    const tick = () => {
      const now = performance.now();
      let left = 0;
      chars.forEach((c, i) => {
        if (now >= settle[i]!) {
          if (c.el.classList.contains('raw')) { c.el.textContent = c.ch; c.el.classList.remove('raw'); }
        } else {
          left++;
          if (/[a-z]/i.test(c.ch)) {
            c.el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!;
            c.el.classList.add('raw');
          }
        }
      });
      if (!left) {
        clearInterval(timer);
        timer = 0;
        el.textContent = text;      // back to plain text (restores kerning)
      }
    };
    tick();
    timer = window.setInterval(tick, 48);
  };

  run(350, 26);
  if (matchMedia('(hover: hover)').matches) {
    el.closest('.tagline')?.addEventListener('pointerenter', () => run(0, 14));
  }
}
