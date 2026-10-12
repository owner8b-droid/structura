// Monta un shader WebGPU (paquete shaders, misma versión que usaba el sitio
// viejo desde esm.sh) sobre su <canvas>. Sin WebGPU, con movimiento reducido o
// en celular (pantalla chica o táctil) no descarga la librería, que pesa
// ~630 KB comprimida, y queda el fondo CSS de respaldo que está detrás del
// canvas. Arranca cuando el navegador queda libre, para no competir con la
// carga de la página.
type Preset = Parameters<typeof import('shaders/js').createShader>[1];

interface Avisos {
  /** El primer cuadro del shader ya está en pantalla. */
  listo?: () => void;
  /** La GPU dejó de estar disponible (o el shader no pudo montarse). */
  error?: () => void;
}

export function montarShader(canvas: HTMLCanvasElement | null, preset: Preset, avisos: Avisos = {}) {
  if (!canvas || !('gpu' in navigator)) return;
  if (matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)').matches) return;

  const iniciar = async () => {
    const { createShader, isWebGPUSupported } = await import('shaders/js');
    if (!isWebGPUSupported()) return;
    // Sin disableTelemetry la librería le reporta uso a shaders.com.
    await createShader(canvas, preset, { disableTelemetry: true, onReady: avisos.listo, onError: avisos.error });
  };
  const correr = () => {
    iniciar().catch(() => avisos.error?.());
  };

  if ('requestIdleCallback' in window) requestIdleCallback(correr);
  else setTimeout(correr, 1);
}
