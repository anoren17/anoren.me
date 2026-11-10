// Shared helpers for the page scripts.

/** True when the visitor asked for reduced motion: scripts then skip anything that moves on its own. */
export const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** querySelector that throws instead of returning null, so missing markup fails loudly at the call site. */
export function $<T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`Missing element: ${sel}`);
  return el;
}

export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] =>
  [...root.querySelectorAll<T>(sel)];

export const pad2 = (n: number) => String(n).padStart(2, '0');

/** Restart a CSS animation that is driven by a class. */
export function retrigger(el: Element, cls: string) {
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}
