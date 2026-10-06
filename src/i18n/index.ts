import { es } from './es';
import { en } from './en';
import { routes, type Lang, type RouteKey } from './routes';

export type { Lang, RouteKey };

export const langs: readonly Lang[] = ['es', 'en'];

const dicts = { es, en };

export function t(lang: Lang) {
  return dicts[lang];
}

export function altLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function path(route: RouteKey, lang: Lang) {
  return routes[route][lang];
}
