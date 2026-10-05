// Revisa el SEO de cada página de dist/ (correr después de `astro build`):
// title y description únicos, canonical a sí misma, los 3 hreflang hacia
// páginas que existen, og:image absoluta que apunta a un PNG de 1200×630 y
// JSON-LD que parsea, con los tipos que le tocan a cada página.
// Corre con Node directo, sin compilar, igual que check-i18n.ts.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const paginas = readdirSync(dist, { recursive: true, encoding: 'utf8' })
  .filter((f) => f.endsWith('.html'))
  .sort();

const problemas: string[] = [];
const titulos = new Map<string, string>();
const descripciones = new Map<string, string>();

const atributos = (tag: string) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (html: string, nombre: string) =>
  [...html.matchAll(new RegExp(`<${nombre}\\b[^>]*>`, 'g'))].map((m) => atributos(m[0]));
const meta = (html: string, clave: string) =>
  tags(html, 'meta').find((m) => m.name === clave || m.property === clave)?.content;

// La URL del sitio sale del canonical de la home: así no se repite acá.
const home = tags(readFileSync(join(dist, 'index.html'), 'utf8'), 'link').find((l) => l.rel === 'canonical')?.href;
if (!home) throw new Error('dist/index.html no tiene canonical');
const origen = new URL(home).origin;

// Archivo de dist/ al que apunta una URL del sitio ("/precios/" -> precios/index.html).
const archivoDe = (url: string) => {
  const ruta = decodeURIComponent(new URL(url).pathname);
  return join(dist, ruta.endsWith('/') ? `${ruta}index.html` : ruta);
};

// Ancho y alto de un PNG, del chunk IHDR.
const tamanoPng = (archivo: string) => {
  const b = readFileSync(archivo);
  return `${b.readUInt32BE(16)}x${b.readUInt32BE(20)}`;
};

for (const pagina of paginas) {
  const html = readFileSync(join(dist, pagina), 'utf8');
  const mal = (msg: string) => problemas.push(`${pagina}: ${msg}`);
  const es404 = pagina === '404.html';
  const ruta = `/${pagina.replace(/index\.html$/, '')}`;

  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!titulo) mal('sin <title>');
  else if (titulos.has(titulo)) mal(`title repetido con ${titulos.get(titulo)}`);
  else titulos.set(titulo, pagina);

  const descripcion = meta(html, 'description');
  if (!descripcion) mal('sin meta description');
  else if (descripciones.has(descripcion)) mal(`description repetida con ${descripciones.get(descripcion)}`);
  else descripciones.set(descripcion, pagina);

  const links = tags(html, 'link');
  const canonical = links.find((l) => l.rel === 'canonical')?.href;
  const alternos = links.filter((l) => l.rel === 'alternate' && l.hreflang);
  if (!es404) {
    if (canonical !== `${origen}${ruta}`) mal(`canonical ${canonical} (esperaba ${origen}${ruta})`);
    if (meta(html, 'og:url') !== canonical) mal('og:url distinto del canonical');
    const idiomas = alternos.map((l) => l.hreflang).sort().join(',');
    if (idiomas !== 'en,es-CR,x-default') mal(`hreflang: ${idiomas || 'ninguno'}`);
    for (const l of alternos) if (!existsSync(archivoDe(l.href))) mal(`hreflang ${l.hreflang} apunta a ${l.href}, que no existe`);
  }

  const og = meta(html, 'og:image');
  if (!og?.startsWith(`${origen}/`)) mal(`og:image no absoluta: ${og}`);
  else if (!existsSync(archivoDe(og))) mal(`og:image ${og} no existe en dist`);
  else if (tamanoPng(archivoDe(og)) !== '1200x630') mal(`og:image mide ${tamanoPng(archivoDe(og))}`);

  const bloques = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (bloques.length !== 1) mal(`${bloques.length} bloques JSON-LD`);
  for (const [, json] of bloques) {
    let grafo: { '@graph'?: { '@type': string; hasOfferCatalog?: { itemListElement: unknown[] } }[] };
    try {
      grafo = JSON.parse(json);
    } catch {
      mal('JSON-LD que no parsea');
      continue;
    }
    const nodos = grafo['@graph'] ?? [];
    const tipos = nodos.map((n) => n['@type']);
    const esperados = ['ProfessionalService', 'WebSite'];
    if (/soluciones\/|solutions\//.test(pagina)) esperados.push('Service', 'BreadcrumbList');
    if (pagina === 'index.html' || pagina === 'en/index.html') esperados.push('FAQPage');
    for (const tipo of esperados) if (!tipos.includes(tipo)) mal(`JSON-LD sin ${tipo}`);
    if (/^(precios|en\/pricing)\//.test(pagina)) {
      const ofertas = nodos.find((n) => n['@type'] === 'ProfessionalService')?.hasOfferCatalog?.itemListElement ?? [];
      if (ofertas.length !== 2) mal(`JSON-LD con ${ofertas.length} planes con precio (esperaba 2)`);
    }
  }
}

if (problemas.length) {
  console.error(`SEO con ${problemas.length} problemas:\n  ${problemas.join('\n  ')}`);
  process.exit(1);
}

console.log(`SEO OK: ${paginas.length} páginas con title, description, canonical, hreflang, og:image de 1200×630 y JSON-LD.`);
