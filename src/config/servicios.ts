// Páginas de servicio (/soluciones/… y /en/solutions/…). Mientras draft sea
// true, la página lleva noindex y no entra al sitemap. Pasalo a false cuando
// hayas revisado su texto en src/i18n/es.ts y en.ts (servicios.<clave>).
// Las claves son las mismas de src/i18n/routes.ts.

export const servicios = {
  webMovil: { draft: true },
  ecommerce: { draft: true },
  hosting: { draft: true },
  iaAutomatizacion: { draft: true },
};

export type ServicioKey = keyof typeof servicios;
