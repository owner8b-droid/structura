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

  // Internal nav links — smooth scroll instead of native jump
  document.querySelectorAll('a[href^="#"]:not(#logo-home)').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
    });
  });

  // Hub nodes — energy line travels from core to hovered/tapped node
  const nodes = document.querySelectorAll('.hub__node');
  const energyLines = document.querySelectorAll('.hub__energy');
  const activate = (i) => {
    nodes[i]?.classList.add('is-active');
    energyLines[i]?.classList.add('is-active');
  };
  const deactivate = (i) => {
    nodes[i]?.classList.remove('is-active');
    energyLines[i]?.classList.remove('is-active');
  };
  nodes.forEach((node, i) => {
    node.addEventListener('mouseenter', () => activate(i));
    node.addEventListener('mouseleave', () => deactivate(i));
    node.addEventListener('touchstart', () => activate(i), { passive: true });
    node.addEventListener('touchend', () => setTimeout(() => deactivate(i), 900));
  });

  // Service card visuals — tap support for touch devices (hover handles desktop)
  document.querySelectorAll('.svc-visual').forEach((el) => {
    el.addEventListener('touchstart', () => el.classList.add('is-active'), { passive: true });
    el.addEventListener('touchend', () => setTimeout(() => el.classList.remove('is-active'), 2000));
  });
});