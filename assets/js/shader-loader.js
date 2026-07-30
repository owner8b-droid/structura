const SHADERS_CDN = 'https://esm.sh/shaders@3.0.445/js';

// Shared bootstrap for the per-page WebGPU shader canvases (hero backgrounds,
// the pricing "featured" card, etc). Each page keeps its own component recipe —
// this just mounts it and no-ops quietly where WebGPU isn't available.
export async function mountShader(canvasId, config) {
  const { createShader, isWebGPUSupported } = await import(SHADERS_CDN);
  const canvas = document.getElementById(canvasId);
  if (!canvas || !isWebGPUSupported()) return null;
  return createShader(canvas, config);
}
