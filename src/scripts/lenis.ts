// Scroll suave con Lenis (mismas opciones que el sitio viejo) y anclas de la
// misma página que se deslizan en vez de saltar. Con prefers-reduced-motion
// Lenis no se inicia y el navegador hace scroll normal.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const lenis = reducido ? null : new Lenis({ duration: 1.1, easing: easeOutCubic, autoRaf: true });

/** Desliza hasta un elemento (o al tope de la página). */
export function scrollA(destino: HTMLElement | 'tope') {
  const behavior = reducido ? 'auto' : 'smooth';
  if (destino === 'tope') {
    if (lenis) lenis.scrollTo(0, { duration: 1.2, easing: easeOutCubic });
    else window.scrollTo({ top: 0, behavior });
    return;
  }
  // Lenis ignora scroll-margin-top, así que se lo pasamos como offset.
  const offset = -(parseFloat(getComputedStyle(destino).scrollMarginTop) || 0);
  if (lenis) lenis.scrollTo(destino, { offset, duration: 1.2, easing: easeOutCubic });
  else destino.scrollIntoView({ behavior });
}

// Links a un ancla de esta misma página (#soluciones en la home, el índice de
// Privacidad). Los que apuntan a otra página navegan normalmente y el
// navegador baja al ancla al cargar.
document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
  const destino = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!destino) return;
  e.preventDefault();
  scrollA(destino);
});
