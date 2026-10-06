// Falla si es.ts y en.ts no tienen exactamente las mismas claves (incluido
// el largo de cada lista), para que ningún texto quede sin traducir.
// Corre con Node directo, sin compilar: por eso los imports llevan .ts.
import { es } from '../src/i18n/es.ts';
import { en } from '../src/i18n/en.ts';

function claves(valor: unknown, prefijo = ''): string[] {
  if (valor === null || typeof valor !== 'object') return [prefijo];
  return Object.entries(valor).flatMap(([k, v]) => claves(v, prefijo ? `${prefijo}.${k}` : k));
}

const deEs = new Set(claves(es));
const deEn = new Set(claves(en));
const faltanEnEn = [...deEs].filter((k) => !deEn.has(k));
const faltanEnEs = [...deEn].filter((k) => !deEs.has(k));

if (faltanEnEn.length || faltanEnEs.length) {
  if (faltanEnEn.length) console.error(`Faltan en en.ts:\n  ${faltanEnEn.join('\n  ')}`);
  if (faltanEnEs.length) console.error(`Faltan en es.ts:\n  ${faltanEnEs.join('\n  ')}`);
  process.exit(1);
}

console.log(`i18n OK: es.ts y en.ts tienen las mismas ${deEs.size} claves.`);
