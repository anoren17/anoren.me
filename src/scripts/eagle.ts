// Eagle vision: the world drains to grey, things you can use glow turquoise, the current target glows gold.
//  · tap E      → stays on until E is tapped again, Esc, or a click
//  · hold E     → on while held
//  · press and hold an empty spot (touch or mouse) → on while held
// All the visuals are in src/styles/creed.css; this only flips html.eagle and places the pulse.
import { calm } from './util';

const root = document.documentElement;

const veil = document.createElement('div');
veil.className = 'eagle-veil';
const ring = document.createElement('div');
ring.className = 'eagle-ring';
for (const el of [veil, ring]) {
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
}

let on = false;
let latched = false;   // turned on by a tap of E: stays on until switched off

function enter(x: number, y: number) {
  if (on) return;
  on = true;
  root.style.setProperty('--ex', `${Math.round(x)}px`);
  root.style.setProperty('--ey', `${Math.round(y)}px`);
  root.classList.add('eagle');
  if (!calm) {
    ring.classList.remove('go');
    void ring.offsetWidth;          // restart the pulse
    ring.classList.add('go');
  }
}

function leave() {
  latched = false;
  if (!on) return;
  on = false;
  root.classList.remove('eagle');
}

// ---- Keyboard: tap E to toggle, or hold it. (A quick tap used to look like nothing happened:
// it switched off on key-up before the half-second fade-in could show.)
const TAP = 300;   // ms: a press shorter than this is a tap
const isE = (e: KeyboardEvent) => e.key === 'e' || e.key === 'E';
let downAt = 0;
addEventListener('keydown', e => {
  if (e.key === 'Escape') { leave(); return; }
  if (!isE(e) || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
  if (on && latched) { leave(); return; }            // second tap switches it off
  downAt = performance.now();
  enter(innerWidth / 2, innerHeight / 2);
});
addEventListener('keyup', e => {
  if (!isE(e) || !on) return;
  if (performance.now() - downAt < TAP) latched = true;   // tapped: stay on
  else leave();                                         // held: off on release
});
addEventListener('blur', leave);
document.addEventListener('visibilitychange', () => { if (document.hidden) leave(); });

// ---- Press and hold an empty spot (anything that isn't a link, button, embed, photo stage or playlist).
const HOLD = 450;   // ms
const SLOP = 10;    // px the pointer may drift before it counts as a scroll or drag
let timer = 0, x0 = 0, y0 = 0, pid = -1;

function disarm() {
  clearTimeout(timer);
  timer = 0;
  root.classList.remove('eagle-arm');
}

addEventListener('pointerdown', e => {
  if (on && latched) { leave(); return; }            // any click ends a tapped-on eagle vision
  if (!e.isPrimary || e.button !== 0) return;
  if ((e.target as Element).closest('a, button, iframe, input, .stage, .playlist')) return;
  x0 = e.clientX;
  y0 = e.clientY;
  pid = e.pointerId;
  // On touch, stop the long-press from selecting text or opening a menu (mouse text selection is untouched).
  if (e.pointerType === 'touch') root.classList.add('eagle-arm');
  timer = window.setTimeout(() => { timer = 0; enter(x0, y0); }, HOLD);
});
addEventListener('pointermove', e => {
  if (e.pointerId === pid && timer && Math.hypot(e.clientX - x0, e.clientY - y0) > SLOP) disarm();
}, { passive: true });

const release = (e: PointerEvent) => {
  if (e.pointerId !== pid) return;
  pid = -1;
  disarm();
  leave();
};
addEventListener('pointerup', release);
addEventListener('pointercancel', release);
addEventListener('contextmenu', e => { if (on || timer) e.preventDefault(); });
