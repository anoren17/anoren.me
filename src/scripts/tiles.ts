// Home tiles.
import { $, $$, calm } from './util';

// ---- Music tile: the bars swell under the pointer.
{
  const tile = $('.tile-music');
  const wrap = $('.bars', tile);
  const bars = $$('i', wrap);
  const hs = bars.map(b => parseFloat(b.style.getPropertyValue('--h')) / 100);
  tile.addEventListener('pointermove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    bars.forEach((b, i) => {
      const p = Math.max(0, 1 - Math.abs((i + 0.5) / bars.length - x) / 0.2);
      const q = p * p * (3 - 2 * p);
      b.style.setProperty('--s', (1 + q * (1 / hs[i]! - 1)).toFixed(3));
      b.style.setProperty('--t', q.toFixed(3));
    });
  }, { passive: true });
  const rest = () => bars.forEach(b => { b.style.setProperty('--s', '1'); b.style.setProperty('--t', '0'); });
  tile.addEventListener('pointerleave', rest);
  tile.addEventListener('pointercancel', rest);
}

// ---- Cooking tile: slow crossfade through a few plates (each loaded only when it is needed).
if (!calm) {
  const box = $('#cookTile');
  const picks: { src: string; srcset: string }[] = JSON.parse(box.dataset.picks ?? '[]');
  let i = 0;
  if (picks.length > 1) {
    setInterval(() => {
      if (document.hidden) return;
      const next = picks[(i + 1) % picks.length]!;
      const img = new Image();
      img.alt = '';
      img.sizes = box.dataset.sizes ?? '100vw';
      img.onload = () => {
        const old = box.querySelector('img.on');
        box.appendChild(img);
        void img.offsetWidth;          // commit the starting opacity so the fade runs
        img.classList.add('on');
        if (old) { old.classList.remove('on'); setTimeout(() => old.remove(), 1400); }
        i++;
      };
      img.srcset = next.srcset;
      img.src = next.src;
    }, 5000);
  }
}
