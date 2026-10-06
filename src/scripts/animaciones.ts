// Pausa las animaciones CSS de lo que no está en pantalla: las marquesinas,
// los mockups y los fondos animados seguían corriendo aunque nadie los viera.
// La clase anim-pausada está en src/styles/movimiento.css.
const observador = new IntersectionObserver((entradas) => {
  for (const entrada of entradas) entrada.target.classList.toggle('anim-pausada', !entrada.isIntersecting);
});

document.querySelectorAll('main section, [data-animado]').forEach((el) => observador.observe(el));
