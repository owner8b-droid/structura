// Textos en inglés del sitio, con las mismas claves que es.ts
// (npm run check:i18n). Salen del DICT de cada página en legacy/.

import type { Dict } from './es';

export const en: Dict = {
  nav: {
    soluciones: "Solutions",
    dropdown: ["Web & Mobile Development", "E-commerce", "Hosting & Servers", "AI & Automation"],
    portafolio: "Portfolio",
    experiencia: "Experience",
    comoTrabajamos: "How we work",
    precios: "Pricing",
    contactar: "Contact",
    // Nuevo (link "saltar al contenido" del layout). REVISAR traducción.
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  home: {
    hero: {
      text: "We build software that does not look like a template. Custom design and development, made to sell, scale, and last.",
      // Nuevo: alt de la foto del hero (REVISAR traducción).
      imgAlt: "Volcano above the clouds",
    },
    ticker: [
      "Web Development",
      "E-commerce",
      "SaaS Products",
      "Hosting & Servers",
      "Automation",
      "Integrations",
      "Real-Time Dashboards",
      "Data Architecture",
    ],
    soluciones: {
      eyebrow: "// SOLUTIONS",
      title: "Everything your business needs, under one team",
      sub: "From the site that introduces you to the system that runs your business — design, development, and infrastructure, nothing outsourced.",
      inventario: "INVENTORY",
      toast: "✓ Product added",
      nucleo: "STRUCTURA CORE",
      cards: [
        {
          title: "Web & Mobile Development",
          desc: "Custom sites and apps, fast and with their own identity — from landing pages to multi-page platforms.",
        },
        {
          title: "E-commerce",
          desc: "Online stores with inventory, payments, and e-invoicing ready for Costa Rica.",
        },
        {
          title: "Hosting & Servers",
          desc: "Our own infrastructure with monitoring and backups — your platform available at all times.",
        },
        {
          title: "AI & Automation",
          desc: "Chatbots, agents, and integrations that remove manual work and speed up your operation.",
        },
      ],
    },
    portafolio: {
      eyebrow: "// REFERENCES",
      title: "The level we can reach",
      sub: "Design styles and standards we can build for your brand — brands and projects we have already worked with.",
      previewSoon: "VIDEO COMING SOON",
      // Nuevo: alt de los logos del carrusel; {name} es el cliente.
      logoAlt: "{name} logo",
    },
    experiencia: {
      eyebrow: "// EXPERIENCE BY INDUSTRY",
      title: "We have already built for industries like yours",
      sub: "We do not start from zero — we know each sector challenges because we have already delivered solutions there.",
      photoPlaceholder: "[ sector photo ]",
      cards: [
        {
          title: "Legal",
          desc: "Corporate sites and portals for law firms and legal associations.",
          tags: ["Corporate site", "Multi-language"],
          imgAlt: "Lawyer signing a document next to a judge gavel and the scales of justice",
        },
        {
          title: "Real Estate & Hospitality",
          desc: "Portals with property search and per-project listings.",
          tags: ["Search", "Listings"],
          imgAlt: "House model on blueprints next to a hard hat and a laptop",
        },
        {
          title: "Agro & Sustainability",
          desc: "Sites and platforms for agricultural operations and sustainable projects.",
          tags: ["Traceability", "Catalog"],
          imgAlt: "Farmers working among rows of lettuce at sunset",
        },
        {
          title: "Creative & Branding",
          desc: "High-impact portfolios for studios and visual brands.",
          tags: ["Galleries", "Video"],
          imgAlt: "Photo studio with lights, a white backdrop, and an armchair set up for a shoot",
        },
        {
          title: "Professional Services",
          desc: "Sites and internal systems for consulting and service firms.",
          tags: ["Bookings", "Client portals"],
          imgAlt: "Three professionals reviewing documents in a meeting",
        },
        {
          title: "Retail & E-commerce",
          desc: "Online stores with inventory and e-invoicing.",
          tags: ["Inventory", "Invoicing"],
          imgAlt: "Miniature shopping cart next to a laptop showing shipping boxes",
        },
      ],
      alsoWorkedIn: "We have also worked on",
      otherTags: [
        "Custom ERP",
        "CRM",
        "Intranets & internal portals",
        "Bookings & appointments",
        "Integrations & APIs",
      ],
    },
    contacto: {
      eyebrow: "// CONTACT",
      contactEmail: "soluciones@structuracr.com",
      ctaTitleA: "Ready to",
      ctaTitleB: "start",
      ctaTitleC: "your project?",
      ctaSub: "Tell us what your business needs and we will reply with a clear proposal.",
      ctaPrimary: "Start a Project",
      ctaSecondary: "View Portfolio",
      ctaEmailLabel: "Or write to us directly at:",
      benefits: [
        {
          title: "Fast reply",
          desc: "We get back to you in under 24 hours.",
        },
        {
          title: "A proposal built for you",
          desc: "Clear scope and budget before we start.",
        },
        {
          title: "Immediate start",
          desc: "We begin work on your project the following week.",
        },
      ],
    },
  },
  footer: {
    blurb: "Software studio in Costa Rica. We design, develop, and operate custom sites, apps, and systems.",
    empresa: "Company",
    soluciones: "Solutions",
    portafolio: "Portfolio",
    comoTrabajamos: "How we work",
    precios: "Pricing",
    contacto: "Contact",
    faqEyebrow: "// FREQUENTLY ASKED QUESTIONS",
    faq: [
      {
        q: "How do you define my project scope?",
        a: "We start from your real goals in an initial conversation and define scope, features, and timeline together.",
      },
      {
        q: "How long does delivery take?",
        a: "Delivery times vary based on project complexity, but typically range from 2 to 8 weeks.",
      },
      {
        q: "Is the source code mine?",
        a: "Yes, the source code is yours once the project is completed.",
      },
      {
        q: "Do you offer support after launch?",
        a: "Yes, we offer post-launch support to ensure your project functions correctly.",
      },
    ],
    privacidad: "Privacy policy",
    copyright: "© 2026 structura. — digital solutions, Costa Rica",
  },
  comoTrabajamos: {
    eyebrow: "// HOW WE WORK",
    title: "From idea to launch",
    sub: "A clear five-step process. You know what happens at every stage, who does it, and what you get.",
    steps: [
      {
        phase: "WEEK 1",
        title: "Discovery",
        desc: "We understand your operation, your users, and your real goals before proposing anything. We leave this stage with clear scope and priorities.",
      },
      {
        phase: "WEEKS 1–2",
        title: "Design",
        desc: "A clickable prototype of the key screens before writing a line of code. You iterate on something you can see and touch, not on promises.",
      },
      {
        phase: "WEEKS 2–6",
        title: "Development",
        desc: "Short sprints with functional deliveries every week. You see progress in a staging environment from the first sprint.",
      },
      {
        phase: "LAUNCH",
        title: "Launch",
        desc: "Testing, performance optimization, SEO, and release to production with active monitoring from day one.",
      },
      {
        phase: "ONGOING",
        title: "Support & evolution",
        desc: "We do not disappear after launch. Maintenance, metrics, and new features as your business grows.",
      },
    ],
    ctaTitle: "Ready to start your project?",
    ctaSub: "Tell us what your business needs and we will reply with a clear proposal.",
    ctaBtn: "Message on WhatsApp",
  },
  precios: {
    eyebrow: "// PRICING",
    title: "Pricing that fits your project",
    sub: "Two fixed-price packages to launch fast, and a custom plan for when your project needs more.",
    subEm: "(one-time payment)",
    essential: {
      title: "Basic Plan",
      desc: "For businesses that need a solid, fast digital presence.",
      priceFigure: "$175",
      priceSuffix: "one-time payment",
      features: [
        "Complete landing page (1 page)",
        "Modern, responsive design",
        "Integrated WhatsApp button",
        "Contact form",
        "Delivery in 5-10 days",
        "30 days of included adjustments",
      ],
      cta: "I want the Basic Plan",
    },
    scale: {
      title: "Pro Plan",
      badge: "MOST POPULAR",
      desc: "For businesses that want to stand out and show up on Google from day one.",
      priceFigure: "$250",
      priceSuffix: "one-time payment",
      features: [
        "Includes everything in the Basic Plan",
        "Basic SEO (show up on Google)",
        "Google Analytics integrated",
        "Custom premium design",
        "Testimonials section",
        "Web-optimized photos",
        "Own domain included (1 year)",
      ],
      cta: "I want the Pro Plan",
    },
    custom: {
      title: "Custom Plan",
      desc: "For online stores, integrations, or automation with specific needs.",
      priceFigure: "Get a quote",
      priceSuffix: "based on scope",
      features: [
        "Multiple pages or catalogs",
        "Online store (E-commerce)",
        "Integrations (CRMs, Stripe, etc.)",
        "Complex automations",
        "Priority WhatsApp support",
      ],
      cta: "Get a project quote",
    },
    footnote: "Prices in USD. The Basic Plan and Pro Plan are one-time payments; the Custom Plan is quoted based on scope. We work with non-profits under special terms —",
    footnoteLink: "write to us",
    detailLink: "See the full breakdown",
    finalCtaTitle: "Ready to start your project?",
    finalCtaSub: "Tell us what your business needs and we will reply with a clear proposal.",
    finalCtaBtn: "Message on WhatsApp",
  },
  contacto: {
    form: {
      name: "Full name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@example.com",
      company: "Company",
      companyPh: "Your company name (optional)",
      projectType: "Project type",
      projectTypeOptions: {
        web: "Web Development",
        movil: "Mobile App",
        ia: "Artificial Intelligence",
        ecommerce: "E-commerce",
        automatizacion: "Automation",
        hosting: "Hosting / Server",
        otro: "Other",
      },
      interest: "What are you interested in specifically?",
      interestOptions: {
        landing: "Landing Page",
        multipagina: "Multi-page Site",
        ecommerce: "E-commerce",
        movil: "Mobile App",
        automatizacion: "Automation / AI",
        hosting: "Custom Hosting",
        consultoria: "Consulting / Advisory",
        noseguro: "Not sure yet",
      },
      description: "Project description",
      descriptionPh: "Tell us what you need, goals, timeline...",
      submit: "Send message",
      // Nuevo: aviso para quien navega sin JavaScript (Fase 3).
      noscript: "If the form does not work in your browser, message us directly on WhatsApp:",
    },
    hero: {
      eyebrow: "CONTACT",
      title: "Let us talk about your project",
      tagline: "Turn your idea into reality",
      sub: "Tell us about your project and we will reply within 24 hours.",
    },
    side: {
      title: "Other ways to reach us",
      whatsapp: "WhatsApp",
      whatsappNote: "Direct, fast chat",
      hoursValue: "Mon–Fri, 8am–6pm",
      hoursNote: "Costa Rica time zone",
      reachValue: "Costa Rica and remote",
      reachNote: "We also work with clients outside the country",
      whyTitle: "Why work with us?",
      why: [
        "Design and development under one team, nothing outsourced",
        "Our own infrastructure with monitoring and backups",
        "Ongoing support after launch",
        "E-invoicing ready for Costa Rica",
      ],
      whatsappBtn: "Message on WhatsApp",
    },
  },
  privacidad: {
    eyebrow: "// PRIVACY",
    title: "Privacy policy",
    sub: "What data we collect on structuracr.com, what we use it for, and how you can exercise your rights over it.",
    updatedLabel: "Last updated:",
    // REVISAR: fecha del cambio de la Fase 4 (sin Google Fonts ni CDN, idioma en la URL).
    updatedDate: "October 5, 2026",
    summaryTitle: "In short",
    summary: [
      "We only use the data you choose to share with us through the chat, WhatsApp, or email.",
      "We do not use tracking cookies or analytics or advertising tools.",
      "We do not sell, rent, or hand over your data to third parties for commercial purposes.",
      "You can ask us to access, correct, or delete your data at any time.",
    ],
    tocTitle: "Contents",
    sections: [
      {
        id: "privacidad-responsable",
        title: "Who is responsible for your data",
        intro: [
          "Structura is a software development studio based in Costa Rica. The personal data you share with us through this site and its contact channels is stored in a database under our responsibility.",
        ],
        facts: [
          {
            label: "Controller",
            value: "Structura",
          },
          {
            label: "Website",
            value: "www.structuracr.com",
          },
          {
            label: "Email",
            value: "soluciones@structuracr.com",
            href: "mailto:soluciones@structuracr.com",
          },
          {
            label: "Location",
            value: "Costa Rica",
          },
        ],
      },
      {
        id: "privacidad-datos",
        title: "Data we collect",
        intro: [
          "We only collect the data needed to handle your inquiry. Depending on how you use the site, it may include:",
        ],
        items: [
          {
            label: "Virtual assistant (chat).",
            text: "The messages you type and a random session identifier generated in your browser. We do not ask for your name, email, or phone number to use it.",
          },
          {
            label: "Contact form.",
            text: "Name, email, company (optional), project type, and description. The form does not store anything on our servers: submitting it opens WhatsApp with your message already drafted, and it only reaches us if you decide to send it.",
          },
          {
            label: "WhatsApp and email.",
            text: "Your phone number or email address, your profile name, and the content of the messages you send us.",
          },
          {
            label: "Technical data.",
            text: "As with any website, when the page loads your browser shares your IP address and basic device details (browser type, operating system) with the services that host the site and its resources. We do not use this information to identify you or build profiles.",
          },
        ],
        outro: [
          "We do not request sensitive data, such as racial or ethnic origin, health, religious beliefs, or sexual orientation. Please do not share it through the chat or any other channel.",
        ],
      },
      {
        id: "privacidad-finalidades",
        title: "How we use it",
        intro: ["We use your data only to:"],
        items: [
          "Answer your inquiries and prepare proposals or quotes.",
          "Run the virtual assistant: generate replies with the context of your conversation and, when it does not know something, alert our team so we can follow up.",
          "Improve the information on the site and in the assistant based on the most frequent questions.",
          "Manage the business relationship and meet legal, accounting, and tax obligations if you become a client.",
        ],
        outro: [
          "We do not use your data to send you advertising without your permission or to make automated decisions that affect you.",
        ],
      },
      {
        id: "privacidad-consentimiento",
        title: "Consent",
        intro: [
          "We process your data based on your consent, which you give when you contact us through any of our channels, and on the need to handle your request or perform a contract with you.",
          "Giving us your data is voluntary. If you prefer not to, the only consequence is that we will not be able to reply or prepare a proposal. You can withdraw your consent at any time, without retroactive effect.",
        ],
      },
      {
        id: "privacidad-terceros",
        title: "Who we share it with",
        intro: [
          "To run the site we work with providers that process data on our behalf, only to provide their service to us:",
        ],
        items: [
          {
            label: "Supabase:",
            text: "stores the virtual assistant conversations.",
          },
          {
            label: "Google (Gemini API):",
            text: "generates the assistant replies from your messages.",
          },
          {
            label: "Resend:",
            text: "sends our team an email alert when the assistant cannot answer a question.",
          },
          {
            label: "WhatsApp (Meta):",
            text: "receives the messages you send us on WhatsApp, including the contact form.",
          },
          {
            label: "GitHub Pages:",
            text: "hosts the website.",
          },
        ],
        outro: [
          "Beyond these cases, we will only share your data if a competent authority requires it under the law. The site also links to third-party services, such as WhatsApp, which are governed by their own privacy policies.",
        ],
      },
      {
        id: "privacidad-transferencias",
        title: "International transfers",
        intro: [
          "Some of these providers store or process data on servers outside Costa Rica, mainly in the United States. By using the chat or contacting us through these channels, you consent to that transfer, which is necessary to provide the service. We work with established providers that apply security measures in line with international standards.",
        ],
      },
      {
        id: "privacidad-cookies",
        title: "Cookies and local storage",
        intro: [
          "This site does not set tracking cookies or use analytics or advertising tools. The only thing it saves in your browser is one entry in local storage (localStorage):",
        ],
        items: [
          {
            label: "structura_chat_session:",
            text: "a random identifier that lets the assistant keep the context of your conversation.",
          },
        ],
        outro: [
          "This entry stays on your device until you clear it in your browser settings. If you delete it, the assistant starts a new conversation.",
        ],
      },
      {
        id: "privacidad-conservacion",
        title: "Retention",
        intro: [
          "We keep your data only as long as needed for the purposes described: conversations and messages, while they are useful to follow up with you; and client information, for the duration of the business relationship plus any additional period required by Costa Rican law, for example for tax purposes. When data is no longer needed, or when you ask us to delete it, we erase or anonymize it.",
        ],
      },
      {
        id: "privacidad-seguridad",
        title: "Security",
        intro: [
          "We apply reasonable technical and organizational measures to protect your information against loss, unauthorized access, or alteration: encrypted connections (HTTPS), restricted access to databases, and providers with recognized security standards.",
          "No system is infallible. If a security incident affecting your data occurs, we will notify you and the competent authorities as required by applicable regulations.",
        ],
      },
      {
        id: "privacidad-derechos",
        title: "Your rights",
        intro: [
          "Under Law No. 8968 of Costa Rica on the Protection of Individuals with Regard to the Processing of their Personal Data and its regulations, you have the right to:",
        ],
        items: [
          {
            label: "Access:",
            text: "know whether we hold data about you, what we use it for, and get a copy.",
          },
          {
            label: "Rectification:",
            text: "correct or update inaccurate or incomplete data.",
          },
          {
            label: "Deletion:",
            text: "ask us to delete your data when it is no longer needed or has been processed improperly.",
          },
          {
            label: "Withdrawal:",
            text: "withdraw your consent at any time.",
          },
        ],
        outro: [
          "To exercise them, email soluciones@structuracr.com with your request and some detail that helps us locate your information, such as the email or number you contacted us from or the approximate date of your conversation with the assistant. It is free of charge and we will reply within five business days at most.",
          "If you believe we did not handle your request properly, you can turn to the Data Protection Agency of Costa Rica (PRODHAB).",
        ],
      },
      {
        id: "privacidad-menores",
        title: "Minors",
        intro: [
          "This site is intended for businesses and adults. We do not knowingly collect data from minors; if you are a parent or guardian and believe a minor has shared information with us, write to us and we will delete it.",
        ],
      },
      {
        id: "privacidad-cambios",
        title: "Changes to this policy",
        intro: [
          "We may update this policy when our services, providers, or applicable regulations change. We will post any changes on this page and show the date of the last update.",
        ],
      },
    ],
    contact: {
      title: "Questions about your data?",
      sub: "If you have questions about this policy or want to exercise your rights, write to us.",
      whatsapp: "Message on WhatsApp",
    },
  },
  // Nuevo (Fase 3): textos comunes de las páginas de servicio.
  servicio: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    problemaTitle: "What it solves",
    entregablesTitle: "What is included",
    procesoTitle: "How we do it",
    procesoSub: "The same five-step process on every project.",
    procesoLink: "See how we work",
    precioTitle: "Price",
    precioLink: "See pricing",
  },
  // Borradores de las páginas de servicio (Fase 3), armados solo con textos
  // que ya estaban en el sitio. REVISAR antes de pasar draft a false en
  // src/config/servicios.ts.
  servicios: {
    webMovil: {
      title: "Web & Mobile Development",
      lede: "Custom sites and apps, fast and with their own identity — from landing pages to multi-page platforms.",
      problema: "Your business needs a site or an app that feels like your own, loads fast, and grows with you, not a generic template everyone uses.",
      entregables: [
        "Landing pages and multi-page sites",
        "Mobile apps",
        "Modern, responsive design",
        "WhatsApp button and contact form",
        "Basic SEO and Google Analytics integrated",
        "Own domain included for 1 year on the Pro Plan",
      ],
      precio: "From $175",
      precioNota: "Basic Plan, one-time payment. The Pro Plan ($250) adds basic SEO, Google Analytics, and your own domain.",
    },
    ecommerce: {
      title: "E-commerce",
      lede: "Online stores with inventory, payments, and e-invoicing ready for Costa Rica.",
      problema: "Selling online takes more than a catalog: up-to-date inventory, reliable payments, and e-invoicing that complies in Costa Rica.",
      entregables: [
        "Online store with a product catalog",
        "Inventory management",
        "Online payments",
        "E-invoicing ready for Costa Rica",
        "Integrations with CRMs, Stripe, and other tools",
      ],
      precio: "Get a quote",
      precioNota: "Custom Plan: quoted based on the scope of your store.",
    },
    hosting: {
      title: "Hosting & Servers",
      lede: "Our own infrastructure with monitoring and backups — your platform available at all times.",
      problema: "If your site or system goes down, your business stops. You need infrastructure that someone watches and backs up for you.",
      entregables: [
        "Our own infrastructure",
        "Monitoring of your platform",
        "Backups",
        "Custom hosting for your project",
        "Ongoing support after launch",
      ],
      precio: "Get a quote",
      precioNota: "Quoted based on the scope of your project.",
    },
    iaAutomatizacion: {
      title: "AI & Automation",
      lede: "Chatbots, agents, and integrations that remove manual work and speed up your operation.",
      problema: "If your team spends hours on repetitive tasks or answering the same questions, that time can go back to your business.",
      entregables: [
        "Chatbots and assistants",
        "AI agents",
        "Integrations between your tools (CRMs, Stripe, etc.)",
        "Complex automations",
      ],
      precio: "Get a quote",
      precioNota: "Custom Plan: quoted based on scope.",
    },
  },
  // REVISAR: traducción nueva; el widget viejo solo estaba en español.
  chat: {
    toggle: "Chat with Structura",
    title: "Structura — Assistant",
    close: "Close chat",
    greeting: "Hi, I am the Structura assistant. How can I help you?",
    placeholder: "Type your message...",
    send: "Send",
    typing: "Typing...",
    errorReply: "Sorry, I had trouble answering. We will contact you directly.",
    errorConnection: "Sorry, I had a connection problem. We will contact you directly.",
    whatsappCta: "Message us on WhatsApp",
  },
  // Nuevo: página 404. REVISAR traducción.
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    cta: "Go to the home page",
  },
  // Provisorio, armado con textos que ya existían. Se reescribe en la Fase 6 (REVISAR).
  seo: {
    home: {
      title: "Structura — Software studio in Costa Rica",
      description: "Software studio in Costa Rica. We design, develop, and operate custom sites, apps, and systems.",
    },
    comoTrabajamos: {
      title: "How we work",
      description: "A clear five-step process. You know what happens at every stage, who does it, and what you get.",
    },
    precios: {
      title: "Pricing",
      description: "Two fixed-price packages to launch fast, and a custom plan for when your project needs more.",
    },
    contacto: {
      title: "Contact",
      description: "Tell us about your project and we will reply within 24 hours.",
    },
    privacidad: {
      title: "Privacy policy",
      description: "What data we collect on structuracr.com, what we use it for, and how you can exercise your rights over it.",
    },
    webMovil: {
      title: "Web & Mobile Development",
      description: "Custom sites and apps, fast and with their own identity — from landing pages to multi-page platforms.",
    },
    ecommerce: {
      title: "E-commerce",
      description: "Online stores with inventory, payments, and e-invoicing ready for Costa Rica.",
    },
    hosting: {
      title: "Hosting & Servers",
      description: "Our own infrastructure with monitoring and backups — your platform available at all times.",
    },
    iaAutomatizacion: {
      title: "AI & Automation",
      description: "Chatbots, agents, and integrations that remove manual work and speed up your operation.",
    },
  },
};
