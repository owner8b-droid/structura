const SHADERS_CDN = 'https://esm.sh/shaders@3.0.445/js';

// Shared bootstrap for the per-page WebGPU shader canvases (hero backgrounds,
// the pricing "featured" card, etc). Each page keeps its own component recipe —
// this just mounts it and no-ops quietly where WebGPU isn't available (in-app
// browsers like Instagram's usually lack it), so pages keep a CSS fallback
// behind the canvas. `onReady` fires once the first frame is on screen and
// `onError` if the GPU becomes unavailable.
export async function mountShader(canvasId, config, { onReady, onError } = {}) {
  if (!navigator.gpu) return null; // skip downloading the library at all
  const { createShader, isWebGPUSupported } = await import(SHADERS_CDN);
  const canvas = document.getElementById(canvasId);
  if (!canvas || !isWebGPUSupported()) return null;
  // Without disableTelemetry the library reports usage stats to shaders.com.
  return createShader(canvas, config, { disableTelemetry: true, onReady, onError });
}
