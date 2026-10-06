// Eventos de conversión para Umami (el script se carga desde Base.astro con
// el Website ID de config/site.ts). Sin Umami (sin ID, en localhost o en una
// vista previa de pages.dev) no hacen nada.
declare global {
  interface Window {
    umami?: { track: (evento: string, datos?: Record<string, string>) => void };
  }
}

export function registrar(evento: string, datos?: Record<string, string>) {
  window.umami?.track(evento, datos);
}

// Cualquier link a WhatsApp del sitio, los de hoy y los que se agreguen. El
// texto del botón dice cuál fue ("Quiero el Plan Pro", la burbuja, etc.).
export function escucharWhatsApp() {
  document.addEventListener('click', (e) => {
    const link = e.target instanceof Element ? e.target.closest('a[href^="https://wa.me/"]') : null;
    if (!link) return;
    const boton = link.textContent?.trim() || link.getAttribute('aria-label') || '';
    registrar('whatsapp', { boton: boton.slice(0, 80) });
  });
}
