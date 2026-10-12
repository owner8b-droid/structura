// Monta un shader WebGPU (paquete shaders, misma versión que usaba el sitio
// viejo desde esm.sh) sobre su <canvas>. Sin WebGPU o con movimiento reducido
// no descarga la librería (~630 KB comprimida) y queda el fondo CSS de
// respaldo que está detrás del canvas. En escritorio arranca cuando el
// navegador queda libre; en celular (pantalla chica o táctil) recién con el
// primer toque, scroll o tecla, así la carga inicial queda liviana y el
// fondo animado aparece apenas la persona interactúa. Con soloEscritorio
// (la tarjeta de Precios, como en el sitio viejo) en celular no se monta.
type Preset = Parameters<typeof import('shaders/js').createShader>[1];

interface Avisos {
  /** El primer cuadro del shader ya está en pantalla. */
  listo?: () => void;
  /** La GPU dejó de estar disponible (o el shader no pudo montarse). */
  error?: () => void;
}

interface Opciones {
  soloEscritorio?: boolean;
}

export function montarShader(canvas: HTMLCanvasElement | null, preset: Preset, avisos: Avisos = {}, opciones: Opciones = {}) {
  if (!canvas || !('gpu' in navigator)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const celular = matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  if (celular && opciones.soloEscritorio) return;

  const iniciar = async () => {
    const { createShader, isWebGPUSupported } = await import('shaders/js');
    if (!isWebGPUSupported()) return;
    // Sin disableTelemetry la librería le reporta uso a shaders.com.
    await createShader(canvas, preset, { disableTelemetry: true, onReady: avisos.listo, onError: avisos.error });
  };
  const correr = () => {
    iniciar().catch(() => avisos.error?.());
  };

  const arrancar = () => {
    if ('requestIdleCallback' in window) requestIdleCallback(correr);
    else setTimeout(correr, 1);
  };
  if (!celular) return arrancar();

  const eventos = ['pointerdown', 'touchstart', 'scroll', 'wheel', 'keydown'] as const;
  const primeraVez = () => {
    eventos.forEach((e) => removeEventListener(e, primeraVez));
    arrancar();
  };
  eventos.forEach((e) => addEventListener(e, primeraVez, { passive: true }));
}
