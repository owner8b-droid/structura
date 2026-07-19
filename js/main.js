/* =========================================================
   STRUCTURA — Main JS
   ========================================================= */

// Smooth scroll — damped feel instead of native scroll
const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Reveal-on-scroll — grows from presence (scale .96 + blur), never from scale(0)
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-in'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Logo click — smooth return to top + micro-bounce
  const logo = document.getElementById('logo-home');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      logo.classList.add('is-clicked');
      lenis.scrollTo(0, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
      setTimeout(() => logo.classList.remove('is-clicked'), 500);
    });
  }
});
