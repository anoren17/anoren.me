// Home hero, pointer-driven:
//  · a light travels inside the wordmark's lettering and the word tilts toward the pointer
//  · "eagle vision": a hidden lattice shows only inside the pointer's light, anywhere in the hero
// One requestAnimationFrame loop that runs only while something is still settling.
import { $, calm } from './util';

if (!calm) {
  const hero = $('.hero');
  const h1 = $('h1', hero);
  const LIFT = 90;                           // .hero::before extends this far above the hero (see site.css)

  let px = 0, py = 0, onWord = false;       // pointer in the wordmark's own coordinates
  let hx = 0, hy = 0, inHero = false;       // pointer in the lattice layer's coordinates
  let sx = 0, sy = 0, spot = 0, vis = 0;    // smoothed light position and strengths
  let rx = 0, ry = 0, tx = 0, ty = 0;       // tilt: current and target, in degrees
  let raf = 0, last = 0;

  const frame = (now: number) => {
    raf = 0;
    const k = 1 - Math.pow(0.86, Math.min(50, now - last) / 16.7);   // frame-rate independent easing
    last = now;
    const spotGoal = onWord ? 1 : 0, visGoal = inHero ? 1 : 0;
    spot += (spotGoal - spot) * k;
    vis += (visGoal - vis) * k;
    if (onWord) { sx += (px - sx) * Math.min(1, k * 1.6); sy += (py - sy) * Math.min(1, k * 1.6); }
    rx += (tx - rx) * k; ry += (ty - ry) * k;
    const s = hero.style;
    s.setProperty('--mx', sx.toFixed(1) + 'px');
    s.setProperty('--my', sy.toFixed(1) + 'px');
    s.setProperty('--spot', spot.toFixed(3));
    s.setProperty('--vis', vis.toFixed(3));
    s.setProperty('--hx', hx.toFixed(1) + 'px');
    s.setProperty('--hy', hy.toFixed(1) + 'px');
    s.setProperty('--rx', rx.toFixed(2) + 'deg');
    s.setProperty('--ry', ry.toFixed(2) + 'deg');
    const busy = Math.abs(spotGoal - spot) > 0.004 || Math.abs(visGoal - vis) > 0.004
      || Math.abs(tx - rx) > 0.02 || Math.abs(ty - ry) > 0.02
      || (onWord && Math.hypot(px - sx, py - sy) > 0.5);
    if (busy) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };

  const move = (e: PointerEvent) => {
    const hr = hero.getBoundingClientRect();
    const padX = parseFloat(getComputedStyle(hero.parentElement!).paddingLeft) || 0;
    inHero = e.clientX >= hr.left - padX && e.clientX <= hr.right + padX && e.clientY >= hr.top - LIFT && e.clientY <= hr.bottom;
    if (inHero) { hx = e.clientX - hr.left + padX; hy = e.clientY - hr.top + LIFT; }

    const w = h1.offsetWidth, h = h1.offsetHeight;
    const r = h1.getBoundingClientRect();
    px = (e.clientX - r.left) / r.width * w;      // back to the element's own (untilted) coordinates
    py = (e.clientY - r.top) / r.height * h;
    const was = onWord;
    onWord = px > 0 && px < w && py > 0 && py < h;
    if (onWord && !was && spot < 0.02) { sx = px; sy = py; }   // the light appears under the pointer
    tx = onWord ? -(py / h - 0.5) * 9 : 0;
    ty = onWord ? (px / w - 0.5) * 12 : 0;
    kick();
  };
  const away = () => { onWord = inHero = false; tx = ty = 0; kick(); };

  addEventListener('pointermove', move, { passive: true });
  addEventListener('pointerdown', move, { passive: true });
  addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') away(); }, { passive: true });
  addEventListener('pointercancel', away, { passive: true });
  document.documentElement.addEventListener('pointerleave', away);
  addEventListener('blur', away);
}
