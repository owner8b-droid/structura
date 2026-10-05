// Imágenes Open Graph (1200×630) generadas en el build: una por ruta e idioma
// (/og/<ruta>-<idioma>.png) y default.png para la 404. satori arma un SVG con
// las fuentes del sitio y sharp lo pasa a PNG. Los textos salen de i18n (el
// eyebrow, el h1 y la bajada de cada página), así que se regeneran solos.
// Las rutas de archivos son relativas a la raíz: el build corre desde ahí.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori, { type SatoriOptions } from 'satori';
import sharp from 'sharp';
import { servicios, type ServicioKey } from '../../config/servicios';
import { t, langs, type Lang, type RouteKey } from '../../i18n';
import { routes } from '../../i18n/routes';

// type y no interface: las props de getStaticPaths piden índice de string.
type Tarjeta = {
  eyebrow?: string;
  // Sin título (la home) va el "structura." grande, como en el hero.
  titulo?: string;
  sub: string;
  pie: string;
};

type Pagina = Exclude<RouteKey, ServicioKey>;
type Textos = ReturnType<typeof t>;

const paginas: Record<Pagina, (d: Textos) => Omit<Tarjeta, 'pie'>> = {
  home: (d) => ({ sub: d.home.hero.text }),
  comoTrabajamos: (d) => ({ eyebrow: d.comoTrabajamos.eyebrow, titulo: d.comoTrabajamos.title, sub: d.comoTrabajamos.sub }),
  precios: (d) => ({ eyebrow: d.precios.eyebrow, titulo: d.precios.title, sub: d.precios.sub }),
  contacto: (d) => ({ eyebrow: `// ${d.contacto.hero.eyebrow}`, titulo: d.contacto.hero.title, sub: d.contacto.hero.sub }),
  privacidad: (d) => ({ eyebrow: d.privacidad.eyebrow, titulo: d.privacidad.title, sub: d.privacidad.sub }),
};

const esServicio = (route: RouteKey): route is ServicioKey => route in servicios;

function tarjeta(route: RouteKey, lang: Lang): Tarjeta {
  const d = t(lang);
  const textos = esServicio(route)
    ? { eyebrow: d.home.soluciones.eyebrow, titulo: d.servicios[route].title, sub: d.servicios[route].lede }
    : paginas[route](d);
  return { ...textos, pie: d.contacto.side.reachValue };
}

export const getStaticPaths = (() => [
  ...langs.flatMap((lang) =>
    (Object.keys(routes) as RouteKey[]).map((route) => ({
      params: { slug: `${route}-${lang}` },
      props: tarjeta(route, lang),
    })),
  ),
  { params: { slug: 'default' }, props: tarjeta('home', 'es') },
]) satisfies GetStaticPaths;

const archivo = (ruta: string) => readFileSync(join(process.cwd(), ruta));
const fuente = (familia: string, peso: 400 | 600 | 700) =>
  archivo(`node_modules/@fontsource/${familia}/files/${familia}-latin-${peso}-normal.woff`);

// satori no lee woff2: usa los .woff que trae el mismo paquete de Fontsource.
const fonts: SatoriOptions['fonts'] = [
  { name: 'IBM Plex Sans', weight: 400, style: 'normal', data: fuente('ibm-plex-sans', 400) },
  { name: 'IBM Plex Sans', weight: 600, style: 'normal', data: fuente('ibm-plex-sans', 600) },
  { name: 'IBM Plex Mono', weight: 400, style: 'normal', data: fuente('ibm-plex-mono', 400) },
  { name: 'IBM Plex Mono', weight: 700, style: 'normal', data: fuente('ibm-plex-mono', 700) },
];
const marca = `data:image/svg+xml;base64,${archivo('public/favicon.svg').toString('base64')}`;
const dominio = new URL(import.meta.env.SITE).hostname.replace(/^www\./, '');

// satori recibe el mismo árbol que daría JSX, armado a mano (sin React). Como
// en JSX, un hijo único va solo: en un array satori lo cuenta como varios y
// exige display: flex.
type Estilo = Record<string, string | number>;
type Nodo = { type: string; props: Record<string, unknown> };
const div = (style: Estilo, ...children: (Nodo | string)[]): Nodo => ({
  type: 'div',
  props: { style, children: children.length === 1 ? children[0] : children },
});

const wordmark = (tamano: number) =>
  div(
    { display: 'flex', fontFamily: 'IBM Plex Mono', fontWeight: 700, fontSize: tamano, lineHeight: 1, color: '#F2F0EA' },
    'structura',
    div({ color: '#2DD4FF' }, '.'),
  );

function plantilla({ eyebrow, titulo, sub, pie }: Tarjeta): Nodo {
  return div(
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '60px 72px',
      backgroundColor: '#0A0E13',
      backgroundImage: 'radial-gradient(circle at 90% 0%, rgba(45,212,255,0.16), rgba(45,212,255,0) 50%)',
      color: '#E7ECEF',
      fontFamily: 'IBM Plex Sans',
    },
    div(
      { display: 'flex', alignItems: 'center', gap: 16 },
      { type: 'img', props: { src: marca, width: 40, height: 40 } },
      ...(titulo ? [wordmark(28)] : []),
    ),
    div(
      { display: 'flex', flexDirection: 'column' },
      ...(eyebrow ? [div({ fontFamily: 'IBM Plex Mono', fontSize: 22, letterSpacing: '0.04em', color: '#2DD4FF', marginBottom: 22 }, eyebrow)] : []),
      titulo
        ? div({ fontSize: 64, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1, maxWidth: 1000 }, titulo)
        : wordmark(120),
      div({ fontSize: 26, lineHeight: 1.45, color: '#7C8894', maxWidth: 940, marginTop: 26 }, sub),
    ),
    div(
      { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #232B35', paddingTop: 26, fontFamily: 'IBM Plex Mono', fontSize: 20, color: '#7C8894' },
      // Cada texto en su div: dos textos sueltos satori los junta en uno.
      div({}, dominio),
      div({}, pie),
    ),
  );
}

export const GET: APIRoute = async ({ props }) => {
  const svg = await satori(plantilla(props as Tarjeta), { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
