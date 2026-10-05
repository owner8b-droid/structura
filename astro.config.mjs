// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { routes } from './src/i18n/routes.ts';
import { servicios } from './src/config/servicios.ts';

const site = 'https://www.structuracr.com';

// Los servicios en borrador llevan noindex: tampoco van al sitemap.
const borradores = Object.entries(servicios)
  .filter(([, s]) => s.draft)
  .flatMap(([key]) => Object.values(routes[/** @type {keyof typeof routes} */ (key)]))
  .map((path) => new URL(path, site).href);

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !borradores.includes(page),
    }),
  ],
});
