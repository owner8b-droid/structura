// Campo de puntos en ola (WebGL), portado del scroll-wave-field de originkit
// sin React ni motion: el resorte del hover se reemplazó por un suavizado
// exponencial equivalente. Pesa unos KB, así que no hace falta la carga
// diferida de shader.ts; corre en cualquier navegador con WebGL (también el
// de Instagram). Se pausa fuera de pantalla y con la pestaña oculta. Con
// movimiento reducido no se monta y queda el fondo CSS de respaldo.
const FIELD_W = 3600;
const FIELD_D = 7000;
const CAM_Z0 = 700;
const FOV = 60;
const DPR_CAP = 1.5;
const TAU = Math.PI * 2;
const CAM_Y_FULL = 550;
const CAM_REF_AREA = 1200 * 800;
const CAM_SCALE_MIN = 0.5;
const CAM_SCALE_MAX = 2.5;
const CURSOR_FOLLOW = 7;
// Velocidad con la que el hover/press llega a su valor (≈ el resorte original).
const HOVER_FOLLOW = 18;
const FLOW_PER_WAVE = 260 / 160;
const GLOW_PER_LIFT = 100 / 45;

const VERT = `
precision highp float;
attribute vec2 aGrid;
attribute vec2 aSeed;
uniform vec2  uRes;
uniform float uFocal;
uniform float uTime;
uniform float uAmp;
uniform float uScatter;
uniform float uFreq;
uniform vec2  uDir;
uniform float uFlow;
uniform float uDepth;
uniform float uCamY;
uniform float uCamZ;
uniform float uPitch;
uniform float uRoll;
uniform float uDot;
uniform float uColorCount;
uniform vec2  uJit;
uniform vec3  uColors[8];
uniform vec3  uCursor;
uniform float uCurR;
uniform float uCurS;
uniform float uHover;
varying vec3  vCol;
varying float vA;
varying float vHot;

vec3 pickColor(float sel) {
  float idx = floor(sel * uColorCount);
  vec3 c = uColors[0];
  for (int i = 1; i < 8; i++) {
    if (float(i) >= uColorCount) break;
    if (float(i) == idx) c = uColors[i];
  }
  return c;
}

float surf(vec2 q) {
  return sin(q.x) * 0.55 + sin(q.x * 0.55 + q.y * 1.15) * 0.30 + sin(q.y * 0.75) * 0.22;
}

void main() {
  vec2 w = aGrid + (aSeed - 0.5) * uJit;
  w.y = uCamZ + mod(w.y - uFlow - uCamZ, uDepth);
  float h3 = fract(sin(dot(aSeed, vec2(91.37, 47.13))) * 12345.678);
  float h = surf(w * uFreq - uDir * uTime) * uAmp + (h3 - 0.5) * uScatter;
  float cd = length(w - uCursor.xy);
  float g = exp(-(cd * cd) / (uCurR * uCurR)) * uCursor.z;
  h += g * uCurS;
  float g2 = g * g; g2 = g2 * g2; g2 = g2 * g2;

  vec3 p = vec3(w.x, h - uCamY, w.y - uCamZ);
  float c = cos(uPitch);
  float s = sin(uPitch);
  float ry = p.y * c + p.z * s;
  float rz = -p.y * s + p.z * c;
  if (rz < 40.0) {
    gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
    gl_PointSize = 0.0;
    vCol = uColors[0];
    vA = 0.0;
    vHot = 0.0;
    return;
  }
  float cr = cos(uRoll);
  float sr = sin(uRoll);
  float rx = p.x * cr - ry * sr;
  float ryr = p.x * sr + ry * cr;
  gl_Position = vec4((rx * uFocal / rz) / (uRes.x * 0.5), (ryr * uFocal / rz) / (uRes.y * 0.5), 0.0, 1.0);

  float rad = max(uDot * uFocal / rz, 0.55);
  gl_PointSize = clamp(rad * 2.0 * (1.0 + g2 * uHover * 0.20), 1.0, 220.0);

  float bri = 0.28 + h3 * 0.72;
  vec2 bq = w * vec2(0.0040, 0.0032) - uDir * uTime * 0.30;
  float band = sin(bq.x) + sin(bq.y);
  float sel = fract((band + 2.0) * 0.25 + (aSeed.y - 0.5) * 0.55);
  vCol = pickColor(sel);
  float lum = dot(vCol, vec3(0.299, 0.587, 0.114));
  vHot = (0.25 + 0.75 * lum) * bri * bri * 0.7 + g2 * uHover * 0.55;
  float fog = (1.0 - smoothstep(2800.0, 6400.0, rz)) * smoothstep(70.0, 240.0, rz);
  vA = bri * fog * (1.0 + g2 * uHover * 0.55);
}
`;

const FRAG = `
precision highp float;
varying vec3  vCol;
varying float vA;
varying float vHot;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float a = (1.0 - smoothstep(0.90, 1.0, d)) * vA;
  vec3 col = vCol + vec3(1.0) * pow(1.0 - d, 10.0) * vHot * 0.9;
  gl_FragColor = vec4(col * a, a);
}
`;

export interface OpcionesOla {
  colors?: string[];
  density?: number;
  dotSize?: number;
  scatter?: number;
  /** 0–100 */
  cameraHeight?: number;
  waveHeight?: number;
  waveLength?: number;
  waveSpeed?: number;
  /** Grados de inclinación de la cámara. */
  tilt?: number;
  roll?: number;
  /** % del ancho del campo. */
  cursorRadius?: number;
  cursorLift?: number;
}

interface Avisos {
  /** El primer cuadro ya está en pantalla. */
  listo?: () => void;
  /** No hay WebGL o el shader no compiló. */
  error?: () => void;
}

function hexARgb(hex: string): [number, number, number] {
  let h = hex.trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  h = h.padEnd(6, '0');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];
}

function mulberry32(a: number) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Monta el campo sobre `canvas`. `zona` es el elemento que recibe el puntero
 * (el hero completo, para que la ola reaccione también debajo del texto).
 */
export function montarOla(canvas: HTMLCanvasElement | null, zona: HTMLElement | null, opciones: OpcionesOla = {}, avisos: Avisos = {}) {
  if (!canvas || !zona) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const {
    colors = ['#2DD4FF', '#0FA8CE'],
    density = 145,
    dotSize = 2,
    scatter = 108,
    cameraHeight = 50,
    waveHeight = 200,
    waveLength = 2070,
    waveSpeed = 250,
    tilt = 12,
    roll = 0,
    cursorRadius = 25,
    cursorLift = 45,
  } = opciones;
  const flowSpeed = waveSpeed * FLOW_PER_WAVE;
  const hoverGlow = Math.min(400, Math.abs(cursorLift) * GLOW_PER_LIFT);

  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true, depth: false });
  if (!gl) return avisos.error?.();

  const compilar = (tipo: number, src: string) => {
    const sh = gl.createShader(tipo)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compilar(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compilar(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return avisos.error?.();
  gl.useProgram(prog);

  const U = (n: string) => gl.getUniformLocation(prog, n);

  // Rejilla fija: se arma una sola vez.
  const cols = Math.max(8, Math.round(density));
  const rows = Math.max(8, Math.round(density * 2));
  const count = cols * rows;
  const spacingX = FIELD_W / (cols - 1);
  const spacingZ = FIELD_D / (rows - 1);
  const grid = new Float32Array(count * 2);
  const seed = new Float32Array(count * 2);
  const rnd = mulberry32(0x5eed);
  for (let r = 0, i = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, i++) {
      grid[i * 2] = -FIELD_W / 2 + (c + 0.5) * spacingX;
      grid[i * 2 + 1] = r * spacingZ;
      seed[i * 2] = rnd();
      seed[i * 2 + 1] = rnd();
    }
  }
  const atributo = (nombre: string, datos: Float32Array) => {
    const loc = gl.getAttribLocation(prog, nombre);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, datos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  };
  atributo('aGrid', grid);
  atributo('aSeed', seed);

  // Uniformes que no cambian entre cuadros.
  const pal = colors.slice(0, 8);
  gl.uniform3fv(U('uColors[0]'), new Float32Array(pal.flatMap(hexARgb)));
  gl.uniform1f(U('uColorCount'), pal.length);
  gl.uniform1f(U('uAmp'), waveHeight);
  gl.uniform1f(U('uScatter'), scatter);
  gl.uniform1f(U('uFreq'), TAU / Math.max(50, waveLength));
  gl.uniform2f(U('uDir'), 0, -1);
  gl.uniform1f(U('uDepth'), FIELD_D);
  gl.uniform1f(U('uCamZ'), CAM_Z0);
  gl.uniform1f(U('uDot'), dotSize);
  gl.uniform2f(U('uJit'), spacingX * 0.25, spacingZ * 0.7);
  gl.uniform1f(U('uCurR'), Math.max(1, (cursorRadius / 100) * (FIELD_W / 2)));
  gl.uniform1f(U('uCurS'), cursorLift);
  gl.uniform1f(U('uHover'), hoverGlow / 100);
  const pitch = (tilt * Math.PI) / 180;
  const rollRad = (-roll * Math.PI) / 180;
  gl.uniform1f(U('uPitch'), pitch);
  gl.uniform1f(U('uRoll'), rollRad);

  const u = {
    res: U('uRes'),
    focal: U('uFocal'),
    time: U('uTime'),
    flow: U('uFlow'),
    camY: U('uCamY'),
    cursor: U('uCursor'),
  };

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE);
  gl.clearColor(0, 0, 0, 0);

  let dpr = 1;
  let camY = 0;
  let focal = 1;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const area = w > 0 && h > 0 ? Math.min(CAM_SCALE_MAX, Math.max(CAM_SCALE_MIN, Math.sqrt((w * h) / CAM_REF_AREA))) : 1;
    camY = (Math.min(100, Math.max(0, cameraHeight)) / 100) * CAM_Y_FULL * area;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    focal = canvas.height / (2 * Math.tan(((FOV / 2) * Math.PI) / 180));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.res, canvas.width, canvas.height);
    gl.uniform1f(u.focal, focal);
    gl.uniform1f(u.camY, camY);
  };
  resize();
  new ResizeObserver(resize).observe(canvas);

  // Puntero: posición en px del canvas, más hover y press suavizados.
  const p = { x: 0, y: 0, sx: 0, sy: 0, hover: 0, hoverTo: 0, press: 0, pressTo: 0 };
  zona.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    p.x = e.clientX - r.left;
    p.y = e.clientY - r.top;
    p.hoverTo = 1;
  });
  zona.addEventListener('pointerleave', () => {
    p.hoverTo = 0;
    p.pressTo = 0;
  });
  zona.addEventListener('pointerdown', (e) => {
    const r = canvas.getBoundingClientRect();
    p.x = e.clientX - r.left;
    p.y = e.clientY - r.top;
    p.hoverTo = 1;
    p.pressTo = 1;
  });
  const soltar = () => {
    p.pressTo = 0;
    // En pantallas táctiles no hay "hover" después de levantar el dedo.
    if (matchMedia('(pointer: coarse)').matches) p.hoverTo = 0;
  };
  zona.addEventListener('pointercancel', soltar);
  addEventListener('pointerup', soltar);

  // Punto del suelo bajo el puntero (rayo desde la cámara contra y = 0).
  const sueloBajo = (mx: number, my: number) => {
    const px = mx * dpr - canvas.width / 2;
    const py = -(my * dpr - canvas.height / 2);
    const cr = Math.cos(rollRad);
    const sr = Math.sin(rollRad);
    const dx = (px * cr + py * sr) / focal;
    const dy = (-px * sr + py * cr) / focal;
    const c = Math.cos(pitch);
    const s = Math.sin(pitch);
    const wy = dy * c - s;
    const wz = dy * s + c;
    if (wy > -1e-4) return null;
    const t = -camY / wy;
    return { x: dx * t, z: CAM_Z0 + wz * t };
  };

  let raf = 0;
  let last = 0;
  let phase = 0;
  let flow = 0;
  let hitX = 0;
  let hitZ = -1e6;
  let primero = true;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;

    const kh = 1 - Math.exp(-dt * HOVER_FOLLOW);
    p.hover += (p.hoverTo - p.hover) * kh;
    p.press += (p.pressTo - p.press) * kh;
    if (p.hover < 0.002) {
      p.sx = p.x;
      p.sy = p.y;
    } else {
      const k = 1 - Math.exp(-dt * CURSOR_FOLLOW);
      p.sx += (p.x - p.sx) * k;
      p.sy += (p.y - p.sy) * k;
    }

    const speedMul = 1 + p.press;
    phase += dt * (waveSpeed / 100) * speedMul;
    flow = (flow + dt * flowSpeed * speedMul) % FIELD_D;

    if (p.hover <= 0.001) {
      hitX = 0;
      hitZ = -1e6;
    } else {
      const hit = sueloBajo(p.sx, p.sy);
      if (hit) {
        hitX = hit.x;
        hitZ = hit.z;
      } else if (hitZ === -1e6) {
        hitX = 0;
        hitZ = FIELD_D;
      }
    }

    gl.uniform1f(u.time, phase);
    gl.uniform1f(u.flow, flow);
    gl.uniform3f(u.cursor, hitX, hitZ, p.hover);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, count);

    if (primero) {
      primero = false;
      avisos.listo?.();
    }
  };

  // Solo anima mientras el hero se ve y la pestaña está activa.
  let visible = false;
  let perdido = false;
  const actualizar = () => {
    const correr = visible && !document.hidden && !perdido;
    if (correr && !raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    } else if (!correr && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    actualizar();
  }).observe(canvas);
  document.addEventListener('visibilitychange', actualizar);

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    perdido = true;
    cancelAnimationFrame(raf);
    raf = 0;
    avisos.error?.();
  });
}
