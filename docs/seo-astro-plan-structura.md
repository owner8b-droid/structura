# Plan de migración a Astro + SEO — Structura V2

**Para:** Claude Code
**Repo:** `github.com/owner8b-droid/structura` · **Dominio:** `https://www.structuracr.com`
**Reemplaza a:** `seo-plan-structura.md` (aquí ya está decidida la ruta Astro).
**Complementa a:** `security-fixes-structura.md` (aplicar primero).

---

## 0. Reglas de trabajo para Claude Code

1. Trabaja en la rama `astro-migration`. **No toques `main`** hasta que la Fase 7 pase los criterios de aceptación.
2. Ejecuta **una fase a la vez**. Al terminar cada fase: corre sus checks, haz commit (`feat(astro): fase N - <resumen>`), reporta qué hiciste y qué falló, y **detente** hasta que el usuario diga "continúa".
3. Los puntos marcados con 🛑 requieren confirmación o datos del usuario. No inventes datos de negocio (dirección, teléfono, precios, testimonios, resultados de clientes).
4. **No borres los `.dc.html` originales** hasta la Fase 7; muévelos a `legacy/` para consultarlos mientras portas.
5. Mantén el diseño visual **idéntico**: copia CSS y estilos inline tal cual en la primera pasada; refactorizar estilos no es parte de este plan.
6. Sin frameworks de UI (nada de React/Vue/Svelte). La interactividad va en `<script>` dentro de componentes `.astro` (vanilla TS, Astro los empaqueta).
7. Usa la versión estable más reciente de Astro y sus integraciones. Si alguna API de este documento cambió, sigue la documentación oficial actual y anótalo en el reporte de la fase.

---

## 1. Decisiones de stack (cerradas)

| Tema | Decisión |
|---|---|
| Generador | Astro, salida 100 % estática (`output: 'static'`) |
| Lenguaje | TypeScript |
| UI interactiva | `<script>` vanilla dentro de componentes `.astro` |
| i18n | Rutas: ES sin prefijo (`/`), EN con prefijo (`/en/`), slugs traducidos |
| Imágenes | `astro:assets` (`<Picture>`/`<Image>`), AVIF + WebP |
| Fuentes | `@fontsource/ibm-plex-sans` y `@fontsource/ibm-plex-mono`, self-hosted |
| Scroll suave | `lenis` desde npm (no CDN) |
| Shader WebGPU | paquete npm `shaders` (hoy se carga de `esm.sh/shaders@3.0.445`) |
| Hosting | **Default:** Cloudflare Pages. **Fallback:** GitHub Pages con GitHub Actions (🛑 Pregunta 2) |
| Analítica | **Default:** Cloudflare Web Analytics + Google Search Console (🛑 Pregunta 5) |

---

## 2. Inventario del sitio actual (hechos verificados)

- 4 páginas `.dc.html` generadas por `dc-runtime` (`support.js`), que carga React 18.3.1, ReactDOM y `@babel/standalone` 7.29.0 desde unpkg y compila en el navegador.
- `index.html` y `Structura V2.dc.html` son idénticos.
- Textos en un objeto `const DICT = { es: {...}, en: {...} }` dentro de cada página (home ≈ línea 940; Contacto ≈ línea 312). Idioma guardado en `localStorage('structura_lang')`.
- Secciones de la home (`index.html`): hero (≈ l.170, imagen `assets/hero-mountain.avif`, SVG con gradientes), nav con dropdown de soluciones y toggle ES/EN (≈ l.205–260), sidebar móvil, burbuja + panel de chat IA (≈ l.277–300), `#soluciones` (≈ l.325, tarjetas con animaciones CSS), `#portafolio` (≈ l.471, logos en `assets/folio/`), `#experiencia` (≈ l.489, imágenes en `assets/experiencia/`), `#contacto` (≈ l.571).
- Animaciones CSS en `<helmet><style>`: `flow1`, `flow2`, `grainShift`, `livePulse`, `marquee`, `mockCursorMove`, `mockPillPress`, `mockScroll`, `rowAdd`, `toastPop`, `hubMini*`.
- Props configurables: `whatsappNumber` (default `50687096790`), `navVariant` (`glass`|`solid`), `showChatBubble` (`true`).
- **Contacto:** el formulario no tiene backend; arma un texto y abre `https://wa.me/<num>?text=...`.
- **Precios:** usa `assets/js/shader-loader.js` → `mountShader('pricing-scale-shader', …)` (WebGPU, no-op si no hay soporte).
- **Chat IA:** script inline (home ≈ l.992) que hace `POST` a `https://ftpoicnwpnurvptmkdoo.supabase.co/functions/v1/ai-chat` con `business_id`, `session_id` (en `localStorage('structura_chat_session')`) y `message`.
- Lenis 1.1.13 por jsDelivr, inicializado en el componente de la home (≈ l.888).
- Google Fonts: IBM Plex Sans + Mono, pesos 400/500/600/700.

---

## 3. Estructura objetivo

```
/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ .gitignore
├─ legacy/                      # .dc.html originales (se borra en Fase 7)
├─ docs/
│  ├─ seo-astro-plan-structura.md
│  └─ baseline/                 # capturas del sitio viejo para comparar
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ _redirects                # Cloudflare
│  ├─ _headers                  # Cloudflare
│  └─ og/                       # imágenes Open Graph 1200×630
└─ src/
   ├─ assets/
   │  ├─ hero-mountain.avif
   │  ├─ experiencia/*.png
   │  └─ folio/*.(svg|png)
   ├─ i18n/
   │  ├─ es.ts                  # derivado de DICT.es (todas las páginas)
   │  ├─ en.ts                  # derivado de DICT.en
   │  ├─ routes.ts              # mapa de rutas ES↔EN
   │  └─ index.ts               # helpers: t(lang), altLang, path(route, lang)
   ├─ config/site.ts            # datos de negocio (NAP, redes, whatsapp)
   ├─ layouts/Base.astro
   ├─ components/
   │  ├─ SEO.astro
   │  ├─ Schema.astro
   │  ├─ Nav.astro
   │  ├─ MobileSidebar.astro
   │  ├─ LangToggle.astro
   │  ├─ Footer.astro
   │  ├─ ChatWidget.astro
   │  ├─ Breadcrumbs.astro
   │  ├─ home/ (Hero, Soluciones, Portafolio, Experiencia, ContactoCTA)
   │  └─ pages/ (Home, ComoTrabajamos, Precios, Contacto, Servicio, NotFound)
   ├─ scripts/
   │  ├─ chat.ts                # lógica del chat, carga diferida
   │  ├─ lenis.ts
   │  └─ shader.ts
   ├─ styles/global.css
   └─ pages/
      ├─ index.astro
      ├─ como-trabajamos.astro
      ├─ precios.astro
      ├─ contacto.astro
      ├─ soluciones/[slug].astro
      ├─ 404.astro
      └─ en/
         ├─ index.astro
         ├─ how-we-work.astro
         ├─ pricing.astro
         ├─ contact.astro
         └─ solutions/[slug].astro
```

Los archivos de `src/pages/` son delgados: solo importan el componente de `components/pages/` y le pasan `lang`. Toda la página vive una sola vez.

---

## Fase 0 — Preparación y línea base

- [ ] Confirmar que `security-fixes-structura.md` ya se aplicó (sin `supabase/.temp` en el repo ni en el historial). Si no, hacerlo primero.
- [ ] `git tag v2-dc-final` sobre `main` (punto de regreso) y crear rama `astro-migration`.
- [ ] Capturas de línea base del sitio actual con Playwright, en 390 px y 1440 px de ancho, página completa, para las 4 páginas en ES y EN (cambiando el toggle). Guardar en `docs/baseline/<pagina>-<lang>-<ancho>.png`.
- [ ] Mover `*.dc.html`, `index.html`, `support.js` y `assets/js/shader-loader.js` a `legacy/`. Eliminar `uploads/` y `.thumbnail` del repo.
- [ ] Copiar este plan a `docs/seo-astro-plan-structura.md`.

**Check:** existen las capturas en `docs/baseline/`; `git tag` muestra `v2-dc-final`.

---

## Fase 1 — Esqueleto Astro, i18n y SEO base

- [ ] Inicializar Astro en la raíz (plantilla mínima, TypeScript estricto). Instalar: `@astrojs/sitemap`, `lenis`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`.
- [ ] `.gitignore`:
  ```
  node_modules/
  dist/
  .astro/
  .env
  .env.*
  .DS_Store
  .claude/settings.local.json
  supabase/.temp/
  ```
- [ ] `astro.config.mjs`:
  ```js
  // @ts-check
  import { defineConfig } from 'astro/config';
  import sitemap from '@astrojs/sitemap';

  export default defineConfig({
    site: 'https://www.structuracr.com',
    trailingSlash: 'always',
    build: { format: 'directory' },
    i18n: {
      defaultLocale: 'es',
      locales: ['es', 'en'],
      routing: { prefixDefaultLocale: false },
    },
    integrations: [
      sitemap({
        filter: (page) => !page.includes('/404'),
      }),
    ],
  });
  ```
  > Los `hreflang` van en el `<head>` (no en el sitemap) porque los slugs están traducidos y la opción `i18n` del sitemap solo empareja rutas con el mismo slug.

- [ ] `src/i18n/routes.ts`:
  ```ts
  export type Lang = 'es' | 'en';

  export const routes = {
    home:            { es: '/',                                   en: '/en/' },
    comoTrabajamos:  { es: '/como-trabajamos/',                   en: '/en/how-we-work/' },
    precios:         { es: '/precios/',                           en: '/en/pricing/' },
    contacto:        { es: '/contacto/',                          en: '/en/contact/' },
    webMovil:        { es: '/soluciones/desarrollo-web-movil/',   en: '/en/solutions/web-mobile-development/' },
    ecommerce:       { es: '/soluciones/ecommerce/',              en: '/en/solutions/ecommerce/' },
    hosting:         { es: '/soluciones/hosting-servidores/',     en: '/en/solutions/hosting-servers/' },
    iaAutomatizacion:{ es: '/soluciones/ia-automatizacion/',      en: '/en/solutions/ai-automation/' },
  } as const;

  export type RouteKey = keyof typeof routes;
  ```
- [ ] `src/i18n/es.ts` y `en.ts`: extraer **todo** el `DICT` de cada página en `legacy/` (home, como trabajamos, precios, contacto) a un solo objeto por idioma, con claves por página (`home`, `comoTrabajamos`, `precios`, `contacto`, `nav`, `footer`, `chat`, `seo`). Añadir claves `seo.<routeKey>.title` y `seo.<routeKey>.description` (ver Fase 6 para el texto).
- [ ] Test simple (script en `package.json`, p.ej. `npm run check:i18n`) que falle si `es` y `en` no tienen exactamente las mismas claves.
- [ ] `src/config/site.ts`: `whatsappNumber: '50687096790'`, `navVariant`, `showChatBubble`, y datos de negocio vacíos marcados `// TODO 🛑 Pregunta 3`.
- [ ] `src/components/SEO.astro`:
  ```astro
  ---
  import { routes, type Lang, type RouteKey } from '../i18n/routes';
  interface Props {
    lang: Lang; route: RouteKey; title: string; description: string;
    ogImage?: string; noindex?: boolean;
  }
  const { lang, route, title, description, ogImage = '/og/default.png', noindex = false } = Astro.props;
  const site = Astro.site!;
  const canonical = new URL(routes[route][lang], site).href;
  const es = new URL(routes[route].es, site).href;
  const en = new URL(routes[route].en, site).href;
  const fullTitle = route === 'home' ? title : `${title} | Structura`;
  ---
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <link rel="alternate" hreflang="es-CR" href={es} />
  <link rel="alternate" hreflang="en" href={en} />
  <link rel="alternate" hreflang="x-default" href={es} />
  {noindex && <meta name="robots" content="noindex, follow" />}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Structura" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={new URL(ogImage, site).href} />
  <meta property="og:locale" content={lang === 'es' ? 'es_CR' : 'en_US'} />
  <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_CR'} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#0A0E13" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="sitemap" href="/sitemap-index.xml" />
  ```
- [ ] `src/layouts/Base.astro`: `<html lang={lang === 'es' ? 'es-CR' : 'en'}>`, `<SEO>`, `<Schema>`, import de `global.css` y de las fuentes (solo pesos usados), `<Nav>`, `<main id="main"><slot/></main>`, `<Footer>`, `<ChatWidget>` (si `showChatBubble`). Incluir link "saltar al contenido".
- [ ] `src/styles/global.css`: copiar íntegro el contenido de `<helmet><style>` de `legacy/index.html` y de las demás páginas (sin duplicar reglas idénticas). Reemplazar `font-family` que dependan de Google Fonts por las de Fontsource (mismo nombre de familia).
- [ ] `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.structuracr.com/sitemap-index.xml
  ```
- [ ] `src/pages/404.astro` bilingüe (texto ES + EN, links a home ES y EN, con `noindex`).

**Check:** `npm run build` sin errores; `dist/` contiene `index.html`, `en/index.html`, `404.html`, `sitemap-index.xml`, `robots.txt`; `npm run check:i18n` pasa.

---

## Fase 2 — Portar la home (ES y EN)

- [ ] Crear `components/home/Hero.astro`, `Soluciones.astro`, `Portafolio.astro`, `Experiencia.astro`, `ContactoCTA.astro` a partir de `legacy/index.html`, reemplazando cada `{{ t.x.y }}` por `{t.x.y}` y cada `{{#each}}`/lista del runtime por `.map()`.
- [ ] Las clases y estilos dinámicos que dependían de estado React (`logoClass`, `navBg`, `mobileSidebarClass`, etc.) se calculan en el `<script>` del componente (Fase 4). En el HTML inicial, usar el estado por defecto (nav en estado "top", sidebar cerrado).
- [ ] **Un solo `<h1>`** en la home: el titular del hero. Revisar que secciones usen `<h2>` y tarjetas `<h3>`.
- [ ] Usar `<section>`, `<nav>`, `<header>`, `<footer>` semánticos; mantener los `id` actuales (`soluciones`, `portafolio`, `experiencia`, `contacto`) para no romper anclas.
- [ ] Tarjetas de soluciones enlazan a su página de servicio (`routes.webMovil[lang]`, etc.).
- [ ] Imágenes con `alt` real y descriptivo (no el título de la tarjeta). Logos: `alt="Logo de <Cliente>"` / `"<Client> logo"`.
- [ ] `src/pages/index.astro` y `src/pages/en/index.astro` usan `components/pages/Home.astro` con `lang`.

**Check:**
```bash
npm run build && npx astro preview &
curl -s http://localhost:4321/    | grep -c '{{'      # debe ser 0
curl -s http://localhost:4321/    | grep -c '<h1'     # debe ser 1
curl -s http://localhost:4321/en/ | grep -o '<html lang="[^"]*"'   # lang="en"
```
Comparar visualmente contra `docs/baseline/home-*` (mismo ancho). Reportar diferencias.

---

## Fase 3 — Portar el resto de páginas + páginas de servicio

- [ ] Portar `Como Trabajamos`, `Precios` y `Contacto` (ES y EN) desde `legacy/`, igual que la home.
- [ ] Contacto: mantener el comportamiento actual (el submit arma el texto y abre `wa.me`). El `<form>` debe tener `<label>` asociados a cada campo, `required` donde aplique, y un `<noscript>` con un link directo a `https://wa.me/<num>`.
- [ ] Páginas de servicio (`soluciones/[slug].astro` y `en/solutions/[slug].astro` con `getStaticPaths`), plantilla `components/pages/Servicio.astro` con: H1, problema que resuelve, entregables, proceso (enlazar a Cómo trabajamos), "desde" de precio (enlazar a Precios), proyectos relacionados del portafolio, FAQ, CTA a WhatsApp/Contacto, `Breadcrumbs`.
- [ ] 🛑 **Contenido de servicios:** redactar un **borrador** a partir de los textos existentes del `DICT` (descripciones y tags de cada solución) y marcar cada servicio con `draft: true`. Mientras `draft` sea `true`: `noindex` y excluido del sitemap (agregar al `filter`). El usuario revisa y cambia a `draft: false`. **No inventar** precios, clientes, cifras ni resultados.
- [ ] Footer con enlaces a todas las rutas del idioma actual.

**Check:** todas las rutas de `routes.ts` existen en `dist/` para ambos idiomas; cero `{{`; un `<h1>` por página; las páginas `draft` tienen `noindex` y no aparecen en `sitemap-0.xml`.

---

## Fase 4 — Interactividad (vanilla, mínimo JS)

- [ ] **Nav:** fondo según scroll (replicar la fórmula de `navBg` de `legacy/index.html` ≈ l.942), dropdown de soluciones accesible (botón con `aria-expanded`, cierra con Esc y click afuera), micro-bounce del logo.
- [ ] **Sidebar móvil:** abrir/cerrar, `aria-hidden`, bloquear scroll del body, cerrar con Esc, foco atrapado mientras está abierto.
- [ ] **LangToggle:** dos `<a href>` reales a `routes[route].es` y `routes[route].en` con `hreflang` y `lang`. Eliminar uso de `localStorage('structura_lang')`. No redirigir automáticamente por idioma del navegador.
- [ ] **Lenis** (`src/scripts/lenis.ts`): importar desde npm (+ su CSS), mismas opciones (`duration: 1.1`, easing cubic out), **no** inicializar si `prefers-reduced-motion: reduce`. Mantener scroll suave a anclas y "volver arriba" del logo.
- [ ] **Shader de Precios** (`src/scripts/shader.ts`): importar desde el paquete npm `shaders` (verificar nombre/versión equivalente a `esm.sh/shaders@3.0.445`), iniciar en `requestIdleCallback` y solo si `isWebGPUSupported()` y no hay `prefers-reduced-motion`.
- [ ] **ChatWidget:** el HTML de la burbuja y el panel se renderiza estático; `src/scripts/chat.ts` se carga con `import()` **solo al primer click** en la burbuja. Mantener endpoint, `business_id` y `session_id` actuales; agregar `lang` al payload. Placeholder e textos desde i18n. Cambiar el `<a href="javascript:void(0)">` por `<button type="button">`.
  - No cambiar la Edge Function en esta fase; las correcciones de auth/rate-limit están en `security-fixes-structura.md`.
- [ ] Animaciones CSS: pausar (`animation-play-state: paused`) las que estén fuera de viewport con `IntersectionObserver`, y desactivarlas bajo `prefers-reduced-motion`.
- [ ] Eliminar cualquier `href="javascript:void(0)"` restante.

**Check:** `grep -r "javascript:void" dist/` vacío; `grep -r "unpkg\|esm.sh\|jsdelivr\|babel" dist/` vacío; en `dist/_astro/` el JS del chat es un chunk separado que no se descarga al cargar la página (verificar en DevTools > Network).

---

## Fase 5 — Rendimiento

- [ ] Mover imágenes a `src/assets/` y renderizarlas con `astro:assets`:
  - Hero: `<Picture src={hero} formats={['avif','webp']} widths={[640,1024,1600,2400]} sizes="100vw" loading="eager" fetchpriority="high" alt="..." />`. Objetivo < 150 KB en desktop.
  - Resto: `<Picture formats={['avif','webp']} loading="lazy" decoding="async">` con `widths`/`sizes` según el tamaño real en pantalla.
- [ ] Logos del portafolio: si existen versiones SVG, usarlas; si no, `<Picture>` a 2× de su tamaño mostrado.
- [ ] Fuentes: importar solo pesos usados (revisar CSS; probablemente 400/500/600/700 Sans y 400/500/600 Mono), subset latin. Si la versión instalada de Astro tiene API de fuentes estable con `preload`, usarla para el peso del hero.
- [ ] Revisar que ninguna imagen ni elemento sobre el pliegue cause CLS (dimensiones explícitas, reservar espacio del nav).
- [ ] Animación `grainShift`/`flow*` del hero: solo `transform`/`opacity`.

**Check (Lighthouse móvil sobre `astro preview`):** Performance ≥ 90, LCP < 2.5 s, CLS < 0.1, TBT < 200 ms en home y precios. Reportar los números.

---

## Fase 6 — Contenido SEO, schema y Open Graph

- [ ] Titles y descriptions por ruta en `i18n/{es,en}.ts` (`seo.<routeKey>`). Title ≤ ~60 caracteres, description ≈ 140–160, únicos. 🛑 Usar las keywords de la Pregunta 4; si no hay respuesta, proponer y marcar `// REVISAR`.
- [ ] `components/Schema.astro` con JSON-LD (datos desde `config/site.ts`):
  - Todas las páginas: `ProfessionalService` (`@id: https://www.structuracr.com/#org`) + `WebSite` (`@id: .../#website`, `inLanguage: ["es-CR","en"]`).
  - Páginas de servicio: `Service` (`provider: {"@id": ".../#org"}`, `areaServed`, `serviceType`) + `BreadcrumbList`.
  - Precios: `Offer`/`PriceSpecification` **solo** si 🛑 Pregunta 9 confirma precios públicos.
  - FAQ: `FAQPage` solo si las preguntas son visibles en la página.
  - 🛑 Campos de negocio (dirección/área, teléfono, email, redes, Google Business Profile): de la Pregunta 3. Si faltan, omitir el campo (no poner placeholders en producción).
- [ ] Imágenes OG 1200×630 en `public/og/` (una por página principal, con título y marca). Pueden generarse en build o diseñarse a mano; mínimo `default.png`.
- [ ] Enlazado interno: home → servicios; servicios → precios, contacto, cómo trabajamos y proyectos; breadcrumbs en subpáginas.

**Check:** cada página en `dist/` tiene `<title>`, description, canonical, 3 `hreflang`, `og:image` absoluta y JSON-LD válido (validar con `npx schema-dts`-tipado o pegando en el Schema Markup Validator; el usuario validará con Rich Results Test tras el deploy).

---

## Fase 7 — Deploy, redirecciones y retiro del sitio viejo

### Opción por defecto: Cloudflare Pages
- [ ] `public/_redirects`:
  ```
  /index.html                                     /                  301
  /Structura%20V2.dc.html                         /                  301
  /Structura%20V2%20-%20Precios.dc.html           /precios/          301
  /Structura%20V2%20-%20Contacto.dc.html          /contacto/         301
  /Structura%20V2%20-%20Como%20Trabajamos.dc.html /como-trabajamos/  301
  ```
- [ ] **Además** (funciona en cualquier host y cubre el caso de que el match con espacios falle): páginas puente en `public/` con el nombre exacto del archivo viejo (`public/Structura V2 - Precios.dc.html`, etc.), cada una con `<link rel="canonical">` a la ruta nueva, `<meta http-equiv="refresh" content="0; url=/precios/">` y un link visible.
- [ ] `public/_headers`:
  ```
  /_astro/*
    Cache-Control: public, max-age=31536000, immutable

  /*
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Strict-Transport-Security: max-age=31536000; includeSubDomains
    Permissions-Policy: camera=(), microphone=(), geolocation=()
    X-Frame-Options: SAMEORIGIN
  ```
  (CSP estricta queda como tarea posterior; requiere inventariar scripts inline del build.)
- [ ] Eliminar `CNAME` y `.nojekyll` del repo (solo aplican a GitHub Pages).
- [ ] 🛑 El usuario conecta el repo en Cloudflare Pages y configura el dominio (ver guía). Claude Code solo prepara el repo.

### Fallback: GitHub Pages
- [ ] Mantener `public/CNAME` con `www.structuracr.com` y `public/.nojekyll`.
- [ ] Workflow `.github/workflows/deploy.yml` con la acción oficial `withastro/action` + `actions/deploy-pages`. En GitHub: Settings → Pages → Source: **GitHub Actions**.
- [ ] Sin `_redirects`/`_headers` (no soportados): depender de las páginas puente.

### Retiro
- [ ] Tras confirmar el deploy: borrar `legacy/` (queda en el tag `v2-dc-final`), merge de `astro-migration` a `main`.

**Check (después del deploy, contra producción):**
```bash
curl -sI https://structuracr.com/ | grep -i location                 # → https://www.structuracr.com/
curl -sI "https://www.structuracr.com/Structura%20V2%20-%20Precios.dc.html" | head -3   # 301 o 200 de la página puente
curl -s  https://www.structuracr.com/ | grep -c '{{'                 # 0
curl -s  https://www.structuracr.com/robots.txt
curl -s  https://www.structuracr.com/sitemap-index.xml
```

---

## Fase 8 — Medición y control de calidad continuo

- [ ] Lighthouse CI en `.github/workflows/lighthouse.yml` (p.ej. `treosh/lighthouse-ci-action`) sobre `/`, `/en/`, `/precios/`, `/contacto/` y un servicio, con presupuesto: SEO = 100, Accessibility ≥ 95, Best Practices ≥ 95, Performance ≥ 90 (móvil). Falla el PR si no cumple.
- [ ] Analítica (🛑 Pregunta 5). Default: snippet de Cloudflare Web Analytics en `Base.astro`. Eventos de conversión: click a `wa.me`, envío del formulario de contacto, apertura del chat.
- [ ] 🛑 El usuario verifica Search Console y Bing Webmaster y envía el sitemap (ver guía).

---

## Criterios de aceptación finales

- [ ] Ningún HTML en producción contiene `{{`, `unpkg`, `babel` ni `javascript:void`.
- [ ] Cada URL indexable: `<title>`, description, canonical, `hreflang` es-CR/en/x-default, OG completo, JSON-LD válido, un `<h1>`.
- [ ] Lighthouse móvil en home y precios: Performance ≥ 90, SEO 100, Accessibility ≥ 95.
- [ ] URLs viejas `.dc.html` llevan a su equivalente nueva.
- [ ] `structuracr.com` → `https://www.structuracr.com/`.
- [ ] Toggle ES/EN lleva a la página equivalente, no a la home.
- [ ] Chat, formulario a WhatsApp, menú móvil, dropdown, Lenis y shader funcionan igual que antes.
- [ ] Diferencias visuales contra `docs/baseline/` reportadas y aprobadas por el usuario.

---

## Preguntas abiertas (con defaults)

| # | Pregunta | Default si no hay respuesta |
|---|---|---|
| 2 | ¿Cloudflare Pages o seguir en GitHub Pages? ¿Dónde está el DNS? | Cloudflare Pages |
| 3 | Datos de negocio: ¿dirección física o área de servicio?, ciudad/provincia, teléfono, email, horario, redes, ¿perfil de Google Business? | Área de servicio, `areaServed: CR`, omitir campos faltantes |
| 4 | Mercado del inglés y 3–5 búsquedas objetivo | ES → CR; EN → empresas extranjeras con operación en CR; Claude propone y marca `REVISAR` |
| 5 | Analítica | Search Console + Cloudflare Web Analytics |
| 6 | Permiso de clientes del portafolio para casos con nombre y link | Solo logo + descripción breve |
| 7 | ¿Blog/guías? | No en esta migración |
| 8 | Chat: carga diferida y respuesta en inglés en `/en/` | Diferida; enviar `lang` |
| 9 | ¿Precios fijos públicos o "desde"? | "Desde", sin schema `Offer` hasta confirmar |
