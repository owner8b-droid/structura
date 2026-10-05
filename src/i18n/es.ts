// Textos en español del sitio. Salen del DICT de cada página en legacy/:
// nav, home y footer del shell (Structura V2.dc.html) y el resto de cada
// "… Content.dc.html". Tiene que tener las mismas claves que en.ts
// (npm run check:i18n).

export const es = {
  nav: {
    soluciones: "Soluciones",
    dropdown: ["Desarrollo Web y Móvil", "E-commerce", "Hosting & Servidores", "IA y Automatización"],
    portafolio: "Portafolio",
    experiencia: "Experiencia",
    comoTrabajamos: "Cómo trabajamos",
    precios: "Precios",
    contactar: "Contactar",
    // Nuevo (link "saltar al contenido" del layout).
    skipToContent: "Saltar al contenido",
  },
  home: {
    hero: {
      text: "Construimos software propio — desde landing pages hasta plataformas completas. Sin plantillas genéricas, sin código innecesario.",
    },
    ticker: [
      "Desarrollo Web",
      "E-commerce",
      "Productos SaaS",
      "Hosting & Servidores",
      "Automatización",
      "Integraciones",
      "Dashboards en Tiempo Real",
      "Arquitectura de Datos",
    ],
    soluciones: {
      eyebrow: "// SOLUCIONES",
      title: "Todo lo que tu negocio necesita, bajo un mismo equipo",
      sub: "Desde el sitio que te presenta hasta el sistema que opera tu negocio — diseño, desarrollo e infraestructura sin subcontratar nada.",
      inventario: "INVENTARIO",
      toast: "✓ Producto agregado",
      nucleo: "NÚCLEO STRUCTURA",
      cards: [
        {
          title: "Desarrollo Web y Móvil",
          desc: "Sitios y apps a medida, rápidas y con identidad propia — desde landings hasta plataformas multi-página.",
        },
        {
          title: "E-commerce",
          desc: "Tiendas en línea con inventario, pagos y facturación electrónica lista para Costa Rica.",
        },
        {
          title: "Hosting & Servidores",
          desc: "Infraestructura propia con monitoreo y respaldos — tu plataforma disponible todo el tiempo.",
        },
        {
          title: "IA y Automatización",
          desc: "Chatbots, agentes e integraciones que eliminan trabajo manual y aceleran tu operación.",
        },
      ],
    },
    portafolio: {
      eyebrow: "// REFERENCIAS",
      title: "El nivel que podemos alcanzar",
      sub: "Estilos y estándares de diseño que podemos construir para tu marca — marcas y proyectos con los que ya trabajamos.",
      previewSoon: "VIDEO PRÓXIMAMENTE",
    },
    experiencia: {
      eyebrow: "// EXPERIENCIA POR SECTOR",
      title: "Ya construimos para industrias como la tuya",
      sub: "No partimos de cero — conocemos los retos de cada sector porque ya entregamos soluciones ahí.",
      photoPlaceholder: "[ foto sector ]",
      cards: [
        {
          title: "Legal",
          desc: "Sitios corporativos y portales para firmas y asociaciones legales.",
          tags: ["Sitio corporativo", "Multilenguaje"],
        },
        {
          title: "Bienes Raíces & Hospitalidad",
          desc: "Portales con buscador de propiedades y fichas por proyecto.",
          tags: ["Buscador", "Fichas"],
        },
        {
          title: "Agro & Sostenibilidad",
          desc: "Sitios y plataformas para operaciones agrícolas y proyectos sostenibles.",
          tags: ["Trazabilidad", "Catálogo"],
        },
        {
          title: "Creativos & Marca",
          desc: "Portafolios de alto impacto para estudios y marcas visuales.",
          tags: ["Galerías", "Video"],
        },
        {
          title: "Servicios Profesionales",
          desc: "Sitios y sistemas internos para firmas de consultoría y servicios.",
          tags: ["Reservas", "Portales de cliente"],
        },
        {
          title: "Retail & E-commerce",
          desc: "Tiendas en línea con inventario y facturación electrónica.",
          tags: ["Inventario", "Facturación"],
        },
      ],
      alsoWorkedIn: "También hemos trabajado en",
      otherTags: [
        "ERP a la medida",
        "CRM",
        "Intranets y portales internos",
        "Reservas y citas",
        "Integraciones y APIs",
      ],
    },
    contacto: {
      eyebrow: "// CONTACTO",
      contactEmail: "soluciones@structuracr.com",
      ctaTitleA: "¿Listo para",
      ctaTitleB: "comenzar",
      ctaTitleC: "tu proyecto?",
      ctaSub: "Contanos qué necesita tu negocio y te respondemos con una propuesta clara.",
      ctaPrimary: "Iniciar Proyecto",
      ctaSecondary: "Ver Portafolio",
      ctaEmailLabel: "O escribinos directamente a:",
      benefits: [
        {
          title: "Respuesta rápida",
          desc: "Te contactamos en menos de 24 horas.",
        },
        {
          title: "Propuesta a la medida",
          desc: "Alcance y presupuesto claros antes de empezar.",
        },
        {
          title: "Arranque inmediato",
          desc: "Empezamos a trabajar en tu proyecto la siguiente semana.",
        },
      ],
    },
  },
  footer: {
    blurb: "Estudio de software en Costa Rica. Diseñamos, desarrollamos y operamos sitios, apps y sistemas a la medida.",
    empresa: "Empresa",
    soluciones: "Soluciones",
    portafolio: "Portafolio",
    comoTrabajamos: "Cómo trabajamos",
    precios: "Precios",
    contacto: "Contacto",
    faqEyebrow: "// PREGUNTAS FRECUENTES",
    faq: [
      {
        q: "¿Cómo definen el alcance de mi proyecto?",
        a: "Partimos de tus objetivos reales en una conversación inicial y definimos juntos alcance, funcionalidades y tiempos.",
      },
      {
        q: "¿Cuánto tardan en entregar?",
        a: "Los tiempos de entrega varían según la complejidad del proyecto, pero generalmente oscilan entre 2 y 8 semanas.",
      },
      {
        q: "¿El código fuente es mío?",
        a: "Sí, el código fuente es tuyo una vez que se complete el proyecto.",
      },
      {
        q: "¿Dan soporte después del lanzamiento?",
        a: "Sí, ofrecemos soporte post-lanzamiento para garantizar el correcto funcionamiento de tu proyecto.",
      },
    ],
    privacidad: "Política de privacidad",
    copyright: "© 2026 structura. — soluciones digitales, Costa Rica",
  },
  comoTrabajamos: {
    eyebrow: "// CÓMO TRABAJAMOS",
    title: "De la idea al lanzamiento",
    sub: "Un proceso claro en cinco pasos. Sabés qué pasa en cada etapa, quién lo hace y qué recibís.",
    steps: [
      {
        phase: "SEMANA 1",
        title: "Descubrimiento",
        desc: "Entendemos tu operación, tus usuarios y tus objetivos reales antes de proponer nada. Salimos de esta etapa con alcance y prioridades claras.",
      },
      {
        phase: "SEMANAS 1–2",
        title: "Diseño",
        desc: "Prototipo navegable de las pantallas clave antes de escribir una línea de código. Iterás sobre algo que podés ver y tocar, no sobre promesas.",
      },
      {
        phase: "SEMANAS 2–6",
        title: "Desarrollo",
        desc: "Sprints cortos con entregas funcionales cada semana. Ves el avance en un ambiente de pruebas desde el primer sprint.",
      },
      {
        phase: "LANZAMIENTO",
        title: "Lanzamiento",
        desc: "Pruebas, optimización de rendimiento, SEO y salida a producción con monitoreo activo desde el día uno.",
      },
      {
        phase: "SIEMPRE",
        title: "Soporte y evolución",
        desc: "No desaparecemos después del lanzamiento. Mantenimiento, métricas y nuevas funcionalidades según crece tu negocio.",
      },
    ],
    ctaTitle: "¿Empezamos con tu proyecto?",
    ctaSub: "Contanos qué necesita tu negocio y te respondemos con una propuesta clara.",
    ctaBtn: "Escribir por WhatsApp",
  },
  precios: {
    eyebrow: "// PRECIOS",
    title: "Precios que se ajustan a tu proyecto",
    sub: "Dos paquetes con precio fijo para lanzar rápido, y un plan a tu medida cuando tu proyecto necesita más.",
    subEm: "(pago único)",
    essential: {
      title: "Plan Básico",
      desc: "Para negocios que necesitan presencia digital sólida y rápida.",
      priceFigure: "$175",
      priceSuffix: "único pago",
      features: [
        "Landing page completa (1 página)",
        "Diseño moderno y responsive",
        "Botón de WhatsApp integrado",
        "Formulario de contacto",
        "Entrega en 5-10 días",
        "30 días de ajustes incluidos",
      ],
      cta: "Quiero el Plan Básico",
    },
    scale: {
      title: "Plan Pro",
      badge: "MÁS POPULAR",
      desc: "Para negocios que quieren destacar y aparecer en Google desde el día uno.",
      priceFigure: "$250",
      priceSuffix: "único pago",
      features: [
        "Incluye todo lo del Plan Básico",
        "SEO básico (aparecer en Google)",
        "Google Analytics integrado",
        "Diseño premium personalizado",
        "Sección de testimonios",
        "Fotos optimizadas para web",
        "Dominio propio incluido (1 año)",
      ],
      cta: "Quiero el Plan Pro",
    },
    custom: {
      title: "Plan a Tu Medida",
      desc: "Para tiendas en línea, integraciones o automatización con necesidades específicas.",
      priceFigure: "Cotizar",
      priceSuffix: "según alcance",
      features: [
        "Múltiples páginas o catálogos",
        "Tienda online (E-commerce)",
        "Integraciones (CRMs, Stripe, etc.)",
        "Automatizaciones complejas",
        "Soporte prioritario por WhatsApp",
      ],
      cta: "Cotizar proyecto",
    },
    footnote: "Precios en USD. El Plan Básico y el Plan Pro son de pago único; el Plan a Tu Medida se cotiza según el alcance. Trabajamos con organizaciones sin fines de lucro con condiciones especiales —",
    footnoteLink: "escribinos",
    detailLink: "Ver el detalle completo",
    finalCtaTitle: "¿Empezamos con tu proyecto?",
    finalCtaSub: "Contanos qué necesita tu negocio y te respondemos con una propuesta clara.",
    finalCtaBtn: "Escribir por WhatsApp",
  },
  contacto: {
    form: {
      name: "Nombre completo",
      namePh: "Tu nombre",
      email: "Email",
      emailPh: "tucorreo@ejemplo.com",
      company: "Empresa",
      companyPh: "Nombre de tu empresa (opcional)",
      projectType: "Tipo de proyecto",
      projectTypeOptions: {
        web: "Desarrollo Web",
        movil: "App Móvil",
        ia: "Inteligencia Artificial",
        ecommerce: "E-commerce",
        automatizacion: "Automatización",
        hosting: "Hosting / Servidor",
        otro: "Otro",
      },
      interest: "¿Qué te interesa específicamente?",
      interestOptions: {
        landing: "Landing Page",
        multipagina: "Sitio Multi-página",
        ecommerce: "E-commerce",
        movil: "App Móvil",
        automatizacion: "Automatización / IA",
        hosting: "Hosting Personalizado",
        consultoria: "Consultoría / Asesoría",
        noseguro: "No estoy seguro aún",
      },
      description: "Descripción del proyecto",
      descriptionPh: "Contanos qué necesitás, objetivos, plazos...",
      submit: "Enviar mensaje",
    },
    hero: {
      eyebrow: "CONTACTO",
      title: "Hablemos de tu proyecto",
      tagline: "Convierte tu idea en realidad",
      sub: "Contanos sobre tu proyecto y te respondemos dentro de 24 horas.",
    },
    side: {
      title: "Otras formas de contactarnos",
      whatsapp: "WhatsApp",
      whatsappNote: "Chat directo y rápido",
      hoursValue: "Lun–Vie, 8am–6pm",
      hoursNote: "Zona horaria Costa Rica",
      reachValue: "Costa Rica y remoto",
      reachNote: "También trabajamos con clientes fuera del país",
      whyTitle: "¿Por qué elegirnos?",
      why: [
        "Diseño y desarrollo bajo un mismo equipo, sin subcontratar nada",
        "Infraestructura propia con monitoreo y respaldos",
        "Soporte continuo después del lanzamiento",
        "Facturación electrónica lista para Costa Rica",
      ],
      whatsappBtn: "Escribir por WhatsApp",
    },
  },
  privacidad: {
    eyebrow: "// PRIVACIDAD",
    title: "Política de privacidad",
    sub: "Qué datos recopilamos en structuracr.com, para qué los usamos y cómo podés ejercer tus derechos sobre ellos.",
    updatedLabel: "Última actualización:",
    updatedDate: "27 de septiembre de 2026",
    summaryTitle: "En resumen",
    summary: [
      "Solo usamos los datos que vos decidís compartirnos por el chat, WhatsApp o correo.",
      "No usamos cookies de rastreo ni herramientas de analítica o publicidad.",
      "No vendemos, alquilamos ni cedemos tus datos a terceros con fines comerciales.",
      "Podés pedirnos acceso, corrección o eliminación de tus datos cuando quieras.",
    ],
    tocTitle: "Contenido",
    sections: [
      {
        id: "privacidad-responsable",
        title: "Responsable de tus datos",
        intro: [
          "Structura es un estudio de desarrollo de software con sede en Costa Rica. Los datos personales que nos compartís a través de este sitio y sus canales de contacto se incorporan a una base de datos bajo nuestra responsabilidad.",
        ],
        facts: [
          {
            label: "Responsable",
            value: "Structura",
          },
          {
            label: "Sitio web",
            value: "www.structuracr.com",
          },
          {
            label: "Correo",
            value: "soluciones@structuracr.com",
            href: "mailto:soluciones@structuracr.com",
          },
          {
            label: "Ubicación",
            value: "Costa Rica",
          },
        ],
      },
      {
        id: "privacidad-datos",
        title: "Datos que recopilamos",
        intro: [
          "Solo recopilamos los datos necesarios para atender tu consulta. Según cómo uses el sitio, pueden ser:",
        ],
        items: [
          {
            label: "Asistente virtual (chat).",
            text: "Los mensajes que escribís y un identificador de sesión aleatorio generado en tu navegador. No te pedimos nombre, correo ni teléfono para usarlo.",
          },
          {
            label: "Formulario de contacto.",
            text: "Nombre, correo, empresa (opcional), tipo de proyecto y descripción. El formulario no guarda nada en nuestros servidores: al enviarlo se abre WhatsApp con tu mensaje ya redactado, y solo nos llega si decidís enviarlo.",
          },
          {
            label: "WhatsApp y correo electrónico.",
            text: "Tu número de teléfono o dirección de correo, tu nombre de perfil y el contenido de los mensajes que nos enviés.",
          },
          {
            label: "Datos técnicos.",
            text: "Como en cualquier sitio web, al cargar la página tu navegador comparte tu dirección IP y datos básicos del dispositivo (tipo de navegador, sistema operativo) con los servicios que alojan el sitio y sus recursos. No usamos esa información para identificarte ni para crear perfiles.",
          },
        ],
        outro: [
          "No solicitamos datos sensibles, como origen racial o étnico, salud, creencias religiosas u orientación sexual. Te pedimos no compartirlos por el chat ni por otros canales.",
        ],
      },
      {
        id: "privacidad-finalidades",
        title: "Para qué los usamos",
        intro: ["Usamos tus datos únicamente para:"],
        items: [
          "Responder tus consultas y preparar propuestas o cotizaciones.",
          "Operar el asistente virtual: generar respuestas con el contexto de tu conversación y, cuando no sabe algo, avisar a nuestro equipo para darte seguimiento.",
          "Mejorar la información del sitio y del asistente a partir de las preguntas más frecuentes.",
          "Gestionar la relación comercial y cumplir obligaciones legales, contables y tributarias si llegás a ser cliente.",
        ],
        outro: [
          "No usamos tus datos para enviarte publicidad sin tu autorización ni para tomar decisiones automatizadas que te afecten.",
        ],
      },
      {
        id: "privacidad-consentimiento",
        title: "Consentimiento",
        intro: [
          "Tratamos tus datos con base en tu consentimiento, que otorgás al escribirnos por cualquiera de nuestros canales, y en la necesidad de atender tu solicitud o de ejecutar un contrato con vos.",
          "Darnos tus datos es voluntario. Si preferís no hacerlo, la única consecuencia es que no podremos responderte ni preparar una propuesta. Podés retirar tu consentimiento en cualquier momento, sin efecto retroactivo.",
        ],
      },
      {
        id: "privacidad-terceros",
        title: "Con quién los compartimos",
        intro: [
          "Para operar el sitio trabajamos con proveedores que procesan datos en nuestro nombre, solo para prestarnos su servicio:",
        ],
        items: [
          {
            label: "Supabase:",
            text: "almacena las conversaciones del asistente virtual.",
          },
          {
            label: "Google (Gemini API):",
            text: "genera las respuestas del asistente a partir de tus mensajes.",
          },
          {
            label: "Resend:",
            text: "envía a nuestro equipo un aviso por correo cuando el asistente no puede responder una pregunta.",
          },
          {
            label: "WhatsApp (Meta):",
            text: "recibe los mensajes que nos enviás por WhatsApp, incluido el formulario de contacto.",
          },
          {
            label: "GitHub Pages:",
            text: "aloja el sitio web.",
          },
          {
            label: "Google Fonts, jsDelivr y esm.sh:",
            text: "sirven las tipografías y librerías que usa el sitio y reciben tu dirección IP al cargarlas.",
          },
        ],
        outro: [
          "Fuera de estos casos, solo compartiremos tus datos si una autoridad competente lo exige conforme a la ley. El sitio también enlaza a servicios de terceros, como WhatsApp, que se rigen por sus propias políticas de privacidad.",
        ],
      },
      {
        id: "privacidad-transferencias",
        title: "Transferencias internacionales",
        intro: [
          "Algunos de estos proveedores almacenan o procesan datos en servidores ubicados fuera de Costa Rica, principalmente en Estados Unidos. Al usar el chat o escribirnos por estos canales, consentís esa transferencia, que es necesaria para prestarte el servicio. Trabajamos con proveedores reconocidos que aplican medidas de seguridad acordes con estándares internacionales.",
        ],
      },
      {
        id: "privacidad-cookies",
        title: "Cookies y almacenamiento local",
        intro: [
          "Este sitio no instala cookies de rastreo ni usa herramientas de analítica o publicidad. Lo único que guarda en tu navegador son dos datos en el almacenamiento local (localStorage):",
        ],
        items: [
          {
            label: "structura_lang:",
            text: "recuerda el idioma que elegiste (español o inglés).",
          },
          {
            label: "structura_chat_session:",
            text: "identificador aleatorio que le permite al asistente mantener el contexto de tu conversación.",
          },
        ],
        outro: [
          "Estos datos permanecen en tu dispositivo hasta que los borrés desde la configuración de tu navegador. Si los eliminás, el sitio vuelve al idioma predeterminado y el asistente inicia una conversación nueva.",
        ],
      },
      {
        id: "privacidad-conservacion",
        title: "Conservación",
        intro: [
          "Conservamos tus datos solo mientras sean necesarios para las finalidades descritas: las conversaciones y mensajes, mientras sean útiles para darte seguimiento; y la información de clientes, durante la relación comercial y el plazo adicional que exija la legislación costarricense, por ejemplo en materia tributaria. Cuando dejan de ser necesarios, o cuando nos pedís eliminarlos, los borramos o anonimizamos.",
        ],
      },
      {
        id: "privacidad-seguridad",
        title: "Seguridad",
        intro: [
          "Aplicamos medidas técnicas y organizativas razonables para proteger tu información contra pérdida, acceso no autorizado o alteración: conexiones cifradas (HTTPS), acceso restringido a las bases de datos y proveedores con estándares reconocidos de seguridad.",
          "Ningún sistema es infalible. Si ocurriera un incidente de seguridad que afecte tus datos, te lo notificaremos a vos y a las autoridades competentes conforme a la normativa aplicable.",
        ],
      },
      {
        id: "privacidad-derechos",
        title: "Tus derechos",
        intro: [
          "De acuerdo con la Ley N.° 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales y su reglamento, tenés derecho a:",
        ],
        items: [
          {
            label: "Acceso:",
            text: "saber si tenemos datos tuyos, para qué los usamos y obtener una copia.",
          },
          {
            label: "Rectificación:",
            text: "corregir o actualizar datos inexactos o incompletos.",
          },
          {
            label: "Eliminación:",
            text: "pedir que borremos tus datos cuando ya no sean necesarios o se hayan tratado de forma indebida.",
          },
          {
            label: "Revocación:",
            text: "retirar tu consentimiento en cualquier momento.",
          },
        ],
        outro: [
          "Para ejercerlos, escribinos a soluciones@structuracr.com con tu solicitud y algún dato que nos permita ubicar tu información, como el correo o número desde el que nos contactaste o la fecha aproximada de tu conversación con el asistente. La gestión es gratuita y te responderemos en un plazo máximo de cinco días hábiles.",
          "Si considerás que no atendimos tu solicitud correctamente, podés acudir a la Agencia de Protección de Datos de los Habitantes (PRODHAB).",
        ],
      },
      {
        id: "privacidad-menores",
        title: "Menores de edad",
        intro: [
          "Este sitio está dirigido a empresas y personas mayores de edad. No recopilamos a sabiendas datos de menores; si sos madre, padre o tutor y creés que un menor nos compartió información, escribinos y la eliminaremos.",
        ],
      },
      {
        id: "privacidad-cambios",
        title: "Cambios a esta política",
        intro: [
          "Podemos actualizar esta política cuando cambien nuestros servicios, proveedores o la normativa aplicable. Publicaremos cualquier cambio en esta página e indicaremos la fecha de la última actualización.",
        ],
      },
    ],
    contact: {
      title: "¿Dudas sobre tus datos?",
      sub: "Si tenés preguntas sobre esta política o querés ejercer tus derechos, escribinos.",
      whatsapp: "Escribir por WhatsApp",
    },
  },
  // Textos que estaban fijos en el HTML/JS del widget de chat.
  chat: {
    toggle: "Chatear con Structura",
    title: "Structura — Asistente",
    close: "Cerrar chat",
    greeting: "Hola, soy el asistente de Structura. ¿En qué te puedo ayudar?",
    placeholder: "Escribí tu mensaje...",
    send: "Enviar",
    typing: "Escribiendo...",
    errorReply: "Disculpá, tuve un problema para responder. Te vamos a contactar directo.",
    errorConnection: "Disculpá, tuve un problema de conexión. Te vamos a contactar directo.",
    whatsappCta: "Escribir por WhatsApp",
  },
  // Nuevo: página 404.
  notFound: {
    title: "Página no encontrada",
    text: "La página que buscás no existe o cambió de dirección.",
    cta: "Ir al inicio",
  },
  // Provisorio, armado con textos que ya existían. Se reescribe en la Fase 6 (REVISAR).
  seo: {
    home: {
      title: "Structura — Estudio de software en Costa Rica",
      description: "Estudio de software en Costa Rica. Diseñamos, desarrollamos y operamos sitios, apps y sistemas a la medida.",
    },
    comoTrabajamos: {
      title: "Cómo trabajamos",
      description: "Un proceso claro en cinco pasos. Sabés qué pasa en cada etapa, quién lo hace y qué recibís.",
    },
    precios: {
      title: "Precios",
      description: "Dos paquetes con precio fijo para lanzar rápido, y un plan a tu medida cuando tu proyecto necesita más.",
    },
    contacto: {
      title: "Contacto",
      description: "Contanos sobre tu proyecto y te respondemos dentro de 24 horas.",
    },
    privacidad: {
      title: "Política de privacidad",
      description: "Qué datos recopilamos en structuracr.com, para qué los usamos y cómo podés ejercer tus derechos sobre ellos.",
    },
    webMovil: {
      title: "Desarrollo Web y Móvil",
      description: "Sitios y apps a medida, rápidas y con identidad propia — desde landings hasta plataformas multi-página.",
    },
    ecommerce: {
      title: "E-commerce",
      description: "Tiendas en línea con inventario, pagos y facturación electrónica lista para Costa Rica.",
    },
    hosting: {
      title: "Hosting & Servidores",
      description: "Infraestructura propia con monitoreo y respaldos — tu plataforma disponible todo el tiempo.",
    },
    iaAutomatizacion: {
      title: "IA y Automatización",
      description: "Chatbots, agentes e integraciones que eliminan trabajo manual y aceleran tu operación.",
    },
  },
};

export type Dict = typeof es;
