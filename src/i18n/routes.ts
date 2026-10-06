export type Lang = 'es' | 'en';

export const routes = {
  home:            { es: '/',                                   en: '/en/' },
  comoTrabajamos:  { es: '/como-trabajamos/',                   en: '/en/how-we-work/' },
  precios:         { es: '/precios/',                           en: '/en/pricing/' },
  contacto:        { es: '/contacto/',                          en: '/en/contact/' },
  privacidad:      { es: '/privacidad/',                        en: '/en/privacy/' },
  webMovil:        { es: '/soluciones/desarrollo-web-movil/',   en: '/en/solutions/web-mobile-development/' },
  ecommerce:       { es: '/soluciones/ecommerce/',              en: '/en/solutions/ecommerce/' },
  hosting:         { es: '/soluciones/hosting-servidores/',     en: '/en/solutions/hosting-servers/' },
  iaAutomatizacion:{ es: '/soluciones/ia-automatizacion/',      en: '/en/solutions/ai-automation/' },
} as const;

export type RouteKey = keyof typeof routes;
