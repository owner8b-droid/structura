// Opciones del sitio (las props del componente viejo, con sus mismos
// defaults) y datos del negocio para el JSON-LD.

export const site = {
  name: 'Structura',
  whatsappNumber: '50687096790',
  navVariant: 'glass' as 'glass' | 'solid',
  showChatBubble: true,

  // Solo lo que el sitio ya publica (Pregunta 3 del plan): se atiende como
  // consultores, sin oficina, en Costa Rica y de forma remota. Lo que queda
  // vacío se omite del JSON-LD (nada de placeholders en producción).
  business: {
    email: 'soluciones@structuracr.com',
    // El mismo número de los links a WhatsApp, en formato internacional.
    phone: '+50687096790',
    country: 'CR',
    areaServed: 'Costa Rica',
    // "Lun–Vie, 8am–6pm, zona horaria de Costa Rica" (página de Contacto).
    openingHours: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
      opens: '08:00',
      closes: '18:00',
    },
    socials: [] as string[],
    googleBusinessProfile: '',
  },
};

export const waLink = `https://wa.me/${site.whatsappNumber.replace(/\D/g, '')}`;
