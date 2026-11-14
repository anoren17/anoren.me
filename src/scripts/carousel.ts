// Cooking carousel. The slides, thumbnails and first photo are already in the HTML;
// this adds autoplay, navigation (buttons, keys, swipe, click on either half) and lazy loading.
import { $, $$, calm, pad2, retrigger } from './util';

const HOLD = 4200;   // ms per photo while playing

const stage  = $('#stage');
const slides = $$('.slide', stage);
const thumbs = $$('button', $('#thumbs'));
const curEl  = $('#cur');
const bar    = $('#bar');
const toggle = $('#toggle');
const N = slides.length;

document.documentElement.style.setProperty('--hold', HOLD + 'ms');

// Full-size photos load only when they are about to be shown.
const load = (i: number) => {
  const img = $<HTMLImageElement>('img', slides[(i + N) % N]!);
  if (img.dataset.src) {
    img.srcset = img.dataset.srcset ?? '';
    img.src = img.dataset.src;
    delete img.dataset.src;
  }
};

let idx = 0;
let playing = !calm;

function restartBar() {
  bar.classList.remove('run');
  void bar.offsetWidth;            // restart the CSS animation that doubles as the autoplay timer
  if (playing) bar.classList.add('run');
}

/** dir: +1 = moving forward (the new photo drifts in from the right), -1 = back */
function go(n: number, dir = 1) {
  stage.classList.add('synced');   // from now on, each incoming photo glitches in (creed.css)
  const old = slides[idx]!;
  thumbs[idx]!.classList.remove('active');
  idx = (n + N) % N;
  const cur = slides[idx]!;
  load(idx); load(idx + 1); load(idx - 1);
  stage.style.setProperty('--dir', String(dir));
  if (old !== cur) {
    void cur.offsetWidth;          // start the new slide from its off-side position
    old.classList.remove('active');
    old.classList.add('leaving');
    setTimeout(() => old.classList.remove('leaving'), 900);
  }
  cur.classList.remove('leaving');
  cur.classList.add('active');
  thumbs[idx]!.classList.add('active');
  curEl.textContent = pad2(idx + 1);
  retrigger(curEl, 'tick');
  restartBar();
}

function setPlaying(on: boolean) {
  playing = on;
  toggle.textContent = playing ? 'Pause' : 'Play';
  stage.classList.toggle('paused', !playing);
  restartBar();
}

const prev = () => go(idx - 1, -1);
const next = () => go(idx + 1, 1);

bar.addEventListener('animationend', next);
toggle.addEventListener('click', () => setPlaying(!playing));
$('#prev').addEventListener('click', prev);
$('#next').addEventListener('click', next);
thumbs.forEach((t, i) => t.addEventListener('click', () => go(i, i < idx ? -1 : 1)));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === ' ' && e.target === document.body) { e.preventDefault(); setPlaying(!playing); }
});

// On the photo: swipe, or click the left / right half.
let x0: number | null = null;
const leftHalf = (e: PointerEvent) => { const r = stage.getBoundingClientRect(); return e.clientX - r.left < r.width / 2; };
stage.addEventListener('pointerdown', e => { x0 = e.clientX; });
stage.addEventListener('pointerup', e => {
  if (x0 === null) return;
  const dx = e.clientX - x0;
  x0 = null;
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  else if (Math.abs(dx) < 8) (leftHalf(e) ? prev : next)();
});
stage.addEventListener('pointercancel', () => { x0 = null; });
stage.addEventListener('pointermove', e => { stage.style.cursor = leftHalf(e) ? 'w-resize' : 'e-resize'; }, { passive: true });

load(1); load(-1);
setPlaying(playing);
