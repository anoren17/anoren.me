// Music player. Slides and playlist rows are already in the HTML (built from src/data/music.ts);
// this shows one at a time, mounts the embed for the active track, and glides the playlist highlight.
import { $, $$, pad2, retrigger } from './util';

const stage  = $('#stage');
const list   = $('#playlist');
const slides = $$('.slide', stage);
const rows   = $$('button', list);
const pill   = $('.pl-pill', list);
const curEl  = $('#cur');
const N = slides.length;

// Embeds are created when their slide is shown and removed when it is left (which also stops playback).
function mountEmbed(slide: HTMLElement) {
  const { kind, src, height, title } = slide.dataset;
  if (!src) return;
  const wrap = document.createElement('div');
  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = title ?? '';
  if (kind === 'amazon') {
    wrap.className = 'sl-embed-wrap';
    iframe.height = height ?? '390';
  } else {
    wrap.className = 'sl-embed-wrap sl-yt';
    iframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
  }
  wrap.appendChild(iframe);
  slide.appendChild(wrap);
}

function placePill(instant = false) {
  const r = rows[idx]!;
  if (instant) pill.style.transition = 'none';
  pill.style.height = r.offsetHeight + 'px';
  pill.style.transform = `translateY(${r.offsetTop}px)`;
  if (instant) { void pill.offsetWidth; pill.style.transition = ''; }
}

let idx = 0;

function go(n: number, first = false) {
  if (!first) {
    slides[idx]!.querySelector('.sl-embed-wrap')?.remove();
    slides[idx]!.classList.remove('active');
    rows[idx]!.classList.remove('active');
    rows[idx]!.removeAttribute('aria-current');
  }
  idx = (n + N) % N;
  mountEmbed(slides[idx]!);
  slides[idx]!.classList.add('active');
  rows[idx]!.classList.add('active');
  rows[idx]!.setAttribute('aria-current', 'true');
  curEl.textContent = pad2(idx + 1);
  if (!first) retrigger(curEl, 'tick');

  pill.classList.toggle('playing', !!slides[idx]!.dataset.src);

  // glide the highlight to the active row, and keep that row visible without scrolling the page
  placePill(first);
  const r = rows[idx]!, top = r.offsetTop, bottom = top + r.offsetHeight;
  if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) {
    list.scrollTo({ top: top - list.clientHeight / 2 + r.offsetHeight / 2, behavior: first ? 'auto' : 'smooth' });
  }
}

rows.forEach((b, i) => b.addEventListener('click', () => go(i)));
$('#prev').addEventListener('click', () => go(idx - 1));
$('#next').addEventListener('click', () => go(idx + 1));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(idx + 1);
  if (e.key === 'ArrowLeft')  go(idx - 1);
});
addEventListener('resize', () => placePill(true));

go(0, true);
