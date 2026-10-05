// Opciones del sitio (las props del componente viejo, con sus mismos
// defaults) y datos del negocio para el footer y el JSON-LD.

export const site = {
  name: 'Structura',
  whatsappNumber: '50687096790',
  navVariant: 'glass' as 'glass' | 'solid',
  showChatBubble: true,

  // TODO 🛑 Pregunta 3: mientras un campo esté vacío, el sitio lo omite
  // (nada de placeholders en producción).
  business: {
    email: '', // el sitio actual muestra soluciones@structuracr.com: confirmar
    phone: '',
    // Dirección física, o vacío si se atiende como "área de servicio"
    streetAddress: '',
    city: '',
    region: '',
    areaServed: '',
    openingHours: '',
    socials: [] as string[],
    googleBusinessProfile: '',
  },
};

export const waLink = `https://wa.me/${site.whatsappNumber.replace(/\D/g, '')}`;
