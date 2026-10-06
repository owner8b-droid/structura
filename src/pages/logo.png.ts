// Logo del JSON-LD (Google lo pide de al menos 112 px): el ícono del favicon
// en PNG de 512 px con fondo transparente, para quien no lee SVG.
import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const LADO = 512;

export const GET: APIRoute = async () => {
  const svg = readFileSync(join(process.cwd(), 'public/favicon.svg'));
  // El viewBox mide 34: se rasteriza ya a 512 para que no quede borroso.
  const png = await sharp(svg, { density: (72 * LADO) / 34 }).resize(LADO, LADO).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
