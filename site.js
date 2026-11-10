// anoren.me — shared behaviour. Loaded in <head> so it runs before first paint.
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  // Arriving through a page-to-page view transition: skip entrance animations so the morph lands cleanly.
  addEventListener('pagereveal', e => { if (e.viewTransition) root.classList.add('vt'); });

  document.addEventListener('DOMContentLoaded', () => {
    // Entrance reveals: elements fade up as they scroll into view, staggered among siblings.
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -5% 0px' });

    const counts = new Map();
    document.querySelectorAll('.reveal, .ledger .result, .thumbs button').forEach(el => {
      const p = el.parentElement;
      const n = counts.get(p) || 0;
      counts.set(p, n + 1);
      if (!el.style.getPropertyValue('--i') && n) el.style.setProperty('--i', n);
      io.observe(el);
    });

    // Pointer-follow sheen on [data-glow] panels.
    document.querySelectorAll('[data-glow]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    });
  });
})();
