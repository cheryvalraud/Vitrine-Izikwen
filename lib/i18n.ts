export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export type Dictionary = {
  localeName: string;
  nav: {
    skip: string;
    homeLabel: string;
    app: string;
    how: string;
    trust: string;
    assets: string;
    mission: string;
    requestAccess: string;
    menu: string;
    languages: string;
  };
  hero: {
    kicker: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    dashboardAlt: string;
    sceneAlt: string;
  };
  showcase: {
    kicker: string;
    title: string;
    progressLabel: string;
    screens: Array<{
      id: string;
      image: string;
      title: string;
      copy: string;
      alt: string;
    }>;
  };
  how: {
    kicker: string;
    title: string;
    steps: Array<{ title: string; copy: string }>;
  };
  trust: {
    kicker: string;
    title: string;
    body: string;
    points: string[];
  };
  assets: {
    kicker: string;
    title: string;
    body: string;
    availability: string;
  };
  mission: {
    kicker: string;
    title: string;
    body: string;
  };
  faq: {
    kicker: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tagline: string;
    description: string;
    requestAccess: string;
    contact: string;
    copyright: string;
    emailLabel: string;
  };
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    imageAlt: string;
  };
};

const screenImages = {
  dashboard: "/app-screens/dashboard.webp",
  buy: "/app-screens/buy.webp",
  payment: "/app-screens/payment.webp",
  history: "/app-screens/history.webp",
  profile: "/app-screens/profile.webp",
  verification: "/app-screens/verification.webp",
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    localeName: "English",
    nav: {
      skip: "Skip to content",
      homeLabel: "Izikwen home",
      app: "App",
      how: "How it works",
      trust: "Trust",
      assets: "Assets",
      mission: "Mission",
      requestAccess: "Request access",
      menu: "Open navigation",
      languages: "Choose language",
    },
    hero: {
      kicker: "A clearer path through digital assets",
      title: "Digital assets, made simpler.",
      body: "A guided way to buy, sell, verify, and follow supported digital-asset transactions.",
      primary: "Request access",
      secondary: "Explore the app",
      dashboardAlt: "Izikwen dashboard showing a sanitized demo account and recent activity",
      sceneAlt: "Animated Izikwen digital-value emblem",
    },
    showcase: {
      kicker: "The real Izikwen experience",
      title: "A guided product story, screen by screen.",
      progressLabel: "Product story progress",
      screens: [
        {
          id: "dashboard",
          image: screenImages.dashboard,
          title: "Understand your account at a glance",
          copy: "See supported assets and recent activity in one calm, readable view.",
          alt: "Izikwen dashboard with sanitized demo activity",
        },
        {
          id: "buy",
          image: screenImages.buy,
          title: "Choose what to buy or sell",
          copy: "Focused choices keep each step understandable before anything moves forward.",
          alt: "Izikwen digital-asset purchase selection screen",
        },
        {
          id: "payment",
          image: screenImages.payment,
          title: "Select a payment option",
          copy: "Payment context remains visible so the next action stays clear.",
          alt: "Izikwen payment option screen with sanitized demo data",
        },
        {
          id: "history",
          image: screenImages.history,
          title: "Follow transaction activity",
          copy: "Status, asset, and amount are organized into one readable activity trail.",
          alt: "Izikwen transaction activity screen with demo orders",
        },
        {
          id: "profile",
          image: screenImages.profile,
          title: "Manage your account",
          copy: "Security, payment methods, invoices, support, and settings stay close at hand.",
          alt: "Izikwen profile screen showing a sanitized demo account level",
        },
        {
          id: "verification",
          image: screenImages.verification,
          title: "Build access through verification",
          copy: "Account-level progress is presented with plain next steps and visible status.",
          alt: "Izikwen verification screen using sanitized demo status",
        },
      ],
    },
    how: {
      kicker: "How Izikwen works",
      title: "A short path from access to activity.",
      steps: [
        {
          title: "Request access",
          copy: "Begin with a simple request so the product can be introduced in the right context.",
        },
        {
          title: "Set up and verify",
          copy: "Follow guided account steps before moving into higher-trust product flows.",
        },
        {
          title: "Buy, sell, and follow",
          copy: "Choose a supported asset, review the details, and follow transaction activity from one place.",
        },
      ],
    },
    trust: {
      kicker: "Trust through clarity",
      title: "Each next step stays visible.",
      body: "Izikwen keeps verification, payment choices, and transaction status understandable. The experience is designed around review and clear account context—not promises about returns or availability.",
      points: [
        "Guided account verification",
        "Readable transaction review",
        "Clear activity status",
        "Account and payment settings in one profile",
      ],
    },
    assets: {
      kicker: "Product capabilities",
      title: "Focused support for familiar digital assets.",
      body: "The current product experience references Bitcoin, Ethereum, and Tether for supported buy, sell, and tracking flows.",
      availability: "Asset and payment availability can vary. Request access for current product details.",
    },
    mission: {
      kicker: "Our mission",
      title: "Make complex transaction journeys feel considered and clear.",
      body: "Izikwen is building a more understandable way to move through digital-asset account setup, verification, payment choices, and transaction follow-up.",
    },
    faq: {
      kicker: "Frequently asked questions",
      title: "Useful answers, without the fine-print fog.",
      items: [
        {
          question: "What is Izikwen?",
          answer: "Izikwen is a guided product experience for buying, selling, verifying, and following supported digital-asset transactions.",
        },
        {
          question: "Which assets appear in the product?",
          answer: "The current experience references BTC, ETH, and USDT. Availability and payment options may vary.",
        },
        {
          question: "Can I download the app now?",
          answer: "No public store link is presented here. Use the access request to ask about the current release and onboarding process.",
        },
        {
          question: "Why does verification matter?",
          answer: "Verification helps the product present account access and transaction steps in the appropriate context. The app shows progress and next actions clearly.",
        },
        {
          question: "Does Izikwen guarantee transaction speed or returns?",
          answer: "No. Izikwen does not present digital assets as risk-free and does not guarantee transaction timing, availability, or financial outcomes.",
        },
      ],
    },
    cta: {
      title: "Ready to see Izikwen?",
      body: "Request access to the product experience and continue the conversation from there.",
      primary: "Request access",
      secondary: "Contact Izikwen",
    },
    footer: {
      tagline: "Digital assets, made simpler.",
      description: "A guided product experience for supported digital assets, account verification, payment choices, and transaction tracking. Availability may vary.",
      requestAccess: "Request access",
      contact: "Contact Izikwen",
      copyright: "© 2026 Izikwen. All rights reserved.",
      emailLabel: "Email Izikwen",
    },
    seo: {
      title: "Izikwen | Digital assets, made simpler",
      description: "Explore Izikwen, a guided way to buy, sell, verify, and follow supported digital-asset transactions.",
      ogTitle: "Izikwen — Digital assets, made simpler",
      ogDescription: "A clear, guided product experience for supported digital-asset transactions.",
      imageAlt: "Izikwen — Digital assets, made simpler",
    },
  },
  fr: {
    localeName: "Français",
    nav: {
      skip: "Aller au contenu",
      homeLabel: "Accueil Izikwen",
      app: "Application",
      how: "Fonctionnement",
      trust: "Confiance",
      assets: "Actifs",
      mission: "Mission",
      requestAccess: "Demander un accès",
      menu: "Ouvrir la navigation",
      languages: "Choisir la langue",
    },
    hero: {
      kicker: "Un parcours plus clair pour les actifs numériques",
      title: "Les actifs numériques, en toute simplicité.",
      body: "Une expérience guidée pour acheter, vendre, vérifier et suivre les transactions d’actifs numériques pris en charge.",
      primary: "Demander un accès",
      secondary: "Découvrir l’application",
      dashboardAlt: "Tableau de bord Izikwen avec un compte de démonstration anonymisé et son activité récente",
      sceneAlt: "Emblème animé de valeur numérique Izikwen",
    },
    showcase: {
      kicker: "La véritable expérience Izikwen",
      title: "Un parcours guidé, écran par écran.",
      progressLabel: "Progression dans la présentation du produit",
      screens: [
        { id: "dashboard", image: screenImages.dashboard, title: "Comprendre son compte en un coup d’œil", copy: "Consultez les actifs pris en charge et l’activité récente dans une vue calme et lisible.", alt: "Tableau de bord Izikwen avec une activité de démonstration anonymisée" },
        { id: "buy", image: screenImages.buy, title: "Choisir quoi acheter ou vendre", copy: "Des choix ciblés rendent chaque étape compréhensible avant de poursuivre.", alt: "Écran Izikwen de sélection d’un achat d’actif numérique" },
        { id: "payment", image: screenImages.payment, title: "Sélectionner un mode de paiement", copy: "Le contexte du paiement reste visible pour que la prochaine action soit toujours claire.", alt: "Écran de paiement Izikwen avec des données de démonstration anonymisées" },
        { id: "history", image: screenImages.history, title: "Suivre l’activité des transactions", copy: "Le statut, l’actif et le montant sont réunis dans un historique facile à lire.", alt: "Écran d’activité Izikwen avec des opérations de démonstration" },
        { id: "profile", image: screenImages.profile, title: "Gérer son compte", copy: "Sécurité, paiements, factures, assistance et réglages restent à portée de main.", alt: "Profil Izikwen présentant un niveau de compte de démonstration" },
        { id: "verification", image: screenImages.verification, title: "Développer son accès par la vérification", copy: "La progression du compte s’affiche avec des étapes simples et un statut visible.", alt: "Écran de vérification Izikwen avec un statut de démonstration anonymisé" },
      ],
    },
    how: {
      kicker: "Comment fonctionne Izikwen",
      title: "Un parcours court, de l’accès à l’activité.",
      steps: [
        { title: "Demander un accès", copy: "Commencez par une demande simple afin de découvrir le produit dans le bon contexte." },
        { title: "Configurer et vérifier", copy: "Suivez les étapes guidées du compte avant d’accéder aux parcours qui exigent davantage de vérification." },
        { title: "Acheter, vendre et suivre", copy: "Choisissez un actif pris en charge, vérifiez les détails et suivez l’activité depuis un seul endroit." },
      ],
    },
    trust: {
      kicker: "La confiance par la clarté",
      title: "Chaque prochaine étape reste visible.",
      body: "Izikwen rend la vérification, les choix de paiement et le statut des transactions compréhensibles. L’expérience privilégie la relecture et le contexte du compte, sans promesse de rendement ni de disponibilité.",
      points: ["Vérification de compte guidée", "Récapitulatif de transaction lisible", "Statut d’activité clair", "Compte et paiements réunis dans le profil"],
    },
    assets: {
      kicker: "Fonctionnalités du produit",
      title: "Une prise en charge ciblée d’actifs numériques connus.",
      body: "L’expérience actuelle fait référence au Bitcoin, à l’Ethereum et au Tether dans les parcours d’achat, de vente et de suivi pris en charge.",
      availability: "La disponibilité des actifs et des paiements peut varier. Demandez un accès pour connaître les informations actuelles.",
    },
    mission: {
      kicker: "Notre mission",
      title: "Rendre les parcours de transaction complexes plus clairs et mieux pensés.",
      body: "Izikwen construit une approche plus compréhensible de la création de compte, de la vérification, des choix de paiement et du suivi des transactions d’actifs numériques.",
    },
    faq: {
      kicker: "Questions fréquentes",
      title: "Des réponses utiles, sans brouillard inutile.",
      items: [
        { question: "Qu’est-ce qu’Izikwen ?", answer: "Izikwen est une expérience guidée pour acheter, vendre, vérifier et suivre les transactions d’actifs numériques pris en charge." },
        { question: "Quels actifs apparaissent dans le produit ?", answer: "L’expérience actuelle fait référence au BTC, à l’ETH et à l’USDT. La disponibilité et les modes de paiement peuvent varier." },
        { question: "Puis-je télécharger l’application maintenant ?", answer: "Aucun lien public vers une boutique n’est présenté ici. Utilisez la demande d’accès pour vous renseigner sur la version actuelle et l’intégration." },
        { question: "Pourquoi la vérification est-elle importante ?", answer: "La vérification aide le produit à présenter l’accès au compte et les étapes de transaction dans le contexte approprié. L’application affiche clairement la progression et les prochaines actions." },
        { question: "Izikwen garantit-il la rapidité ou un rendement ?", answer: "Non. Izikwen ne présente pas les actifs numériques comme étant sans risque et ne garantit ni les délais, ni la disponibilité, ni les résultats financiers." },
      ],
    },
    cta: { title: "Prêt à découvrir Izikwen ?", body: "Demandez un accès à l’expérience produit et poursuivez la conversation.", primary: "Demander un accès", secondary: "Contacter Izikwen" },
    footer: {
      tagline: "Les actifs numériques, en toute simplicité.",
      description: "Une expérience guidée pour les actifs numériques pris en charge, la vérification du compte, les choix de paiement et le suivi des transactions. La disponibilité peut varier.",
      requestAccess: "Demander un accès",
      contact: "Contacter Izikwen",
      copyright: "© 2026 Izikwen. Tous droits réservés.",
      emailLabel: "Écrire à Izikwen",
    },
    seo: {
      title: "Izikwen | Les actifs numériques, en toute simplicité",
      description: "Découvrez Izikwen, une expérience guidée pour acheter, vendre, vérifier et suivre les transactions d’actifs numériques pris en charge.",
      ogTitle: "Izikwen — Les actifs numériques, en toute simplicité",
      ogDescription: "Une expérience produit claire et guidée pour les transactions d’actifs numériques pris en charge.",
      imageAlt: "Izikwen — Les actifs numériques, en toute simplicité",
    },
  },
  es: {
    localeName: "Español",
    nav: {
      skip: "Ir al contenido",
      homeLabel: "Inicio de Izikwen",
      app: "Aplicación",
      how: "Cómo funciona",
      trust: "Confianza",
      assets: "Activos",
      mission: "Misión",
      requestAccess: "Solicitar acceso",
      menu: "Abrir navegación",
      languages: "Elegir idioma",
    },
    hero: {
      kicker: "Un camino más claro para los activos digitales",
      title: "Activos digitales, más sencillos.",
      body: "Una experiencia guiada para comprar, vender, verificar y seguir transacciones de activos digitales compatibles.",
      primary: "Solicitar acceso",
      secondary: "Explorar la aplicación",
      dashboardAlt: "Panel de Izikwen con una cuenta de demostración anonimizada y actividad reciente",
      sceneAlt: "Emblema animado de valor digital de Izikwen",
    },
    showcase: {
      kicker: "La experiencia real de Izikwen",
      title: "Una historia guiada, pantalla por pantalla.",
      progressLabel: "Progreso de la presentación del producto",
      screens: [
        { id: "dashboard", image: screenImages.dashboard, title: "Comprende tu cuenta de un vistazo", copy: "Consulta los activos compatibles y la actividad reciente en una vista tranquila y legible.", alt: "Panel de Izikwen con actividad de demostración anonimizada" },
        { id: "buy", image: screenImages.buy, title: "Elige qué comprar o vender", copy: "Las opciones enfocadas mantienen cada paso claro antes de continuar.", alt: "Pantalla de selección de compra de activos digitales de Izikwen" },
        { id: "payment", image: screenImages.payment, title: "Selecciona una opción de pago", copy: "El contexto del pago permanece visible para que la siguiente acción esté clara.", alt: "Pantalla de pago de Izikwen con datos de demostración anonimizados" },
        { id: "history", image: screenImages.history, title: "Sigue la actividad de tus transacciones", copy: "El estado, el activo y el importe se organizan en un historial fácil de leer.", alt: "Pantalla de actividad de Izikwen con operaciones de demostración" },
        { id: "profile", image: screenImages.profile, title: "Administra tu cuenta", copy: "Seguridad, pagos, facturas, soporte y ajustes permanecen al alcance.", alt: "Perfil de Izikwen con un nivel de cuenta de demostración" },
        { id: "verification", image: screenImages.verification, title: "Amplía el acceso mediante la verificación", copy: "El progreso de la cuenta se presenta con pasos sencillos y un estado visible.", alt: "Pantalla de verificación de Izikwen con estado de demostración anonimizado" },
      ],
    },
    how: {
      kicker: "Cómo funciona Izikwen",
      title: "Un camino corto desde el acceso hasta la actividad.",
      steps: [
        { title: "Solicita acceso", copy: "Empieza con una solicitud sencilla para conocer el producto en el contexto adecuado." },
        { title: "Configura y verifica", copy: "Sigue los pasos guiados de la cuenta antes de entrar en recorridos que requieren mayor verificación." },
        { title: "Compra, vende y sigue", copy: "Elige un activo compatible, revisa los detalles y sigue la actividad desde un solo lugar." },
      ],
    },
    trust: {
      kicker: "Confianza mediante claridad",
      title: "Cada siguiente paso permanece visible.",
      body: "Izikwen mantiene comprensibles la verificación, las opciones de pago y el estado de las transacciones. La experiencia se centra en la revisión y el contexto de la cuenta, no en promesas de rentabilidad o disponibilidad.",
      points: ["Verificación de cuenta guiada", "Revisión de transacciones legible", "Estado de actividad claro", "Cuenta y pagos reunidos en el perfil"],
    },
    assets: {
      kicker: "Capacidades del producto",
      title: "Compatibilidad enfocada para activos digitales conocidos.",
      body: "La experiencia actual hace referencia a Bitcoin, Ethereum y Tether en recorridos compatibles de compra, venta y seguimiento.",
      availability: "La disponibilidad de activos y pagos puede variar. Solicita acceso para conocer la información actual.",
    },
    mission: {
      kicker: "Nuestra misión",
      title: "Hacer que los recorridos complejos de transacción se sientan claros y bien pensados.",
      body: "Izikwen construye una forma más comprensible de avanzar por la configuración de la cuenta, la verificación, las opciones de pago y el seguimiento de transacciones de activos digitales.",
    },
    faq: {
      kicker: "Preguntas frecuentes",
      title: "Respuestas útiles, sin niebla innecesaria.",
      items: [
        { question: "¿Qué es Izikwen?", answer: "Izikwen es una experiencia guiada para comprar, vender, verificar y seguir transacciones de activos digitales compatibles." },
        { question: "¿Qué activos aparecen en el producto?", answer: "La experiencia actual hace referencia a BTC, ETH y USDT. La disponibilidad y las opciones de pago pueden variar." },
        { question: "¿Puedo descargar la aplicación ahora?", answer: "Aquí no se presenta un enlace público a una tienda. Usa la solicitud de acceso para preguntar por la versión actual y el proceso de incorporación." },
        { question: "¿Por qué importa la verificación?", answer: "La verificación ayuda al producto a presentar el acceso a la cuenta y los pasos de transacción en el contexto apropiado. La aplicación muestra claramente el progreso y las próximas acciones." },
        { question: "¿Izikwen garantiza rapidez o rentabilidad?", answer: "No. Izikwen no presenta los activos digitales como libres de riesgo y no garantiza plazos, disponibilidad ni resultados financieros." },
      ],
    },
    cta: { title: "¿Listo para conocer Izikwen?", body: "Solicita acceso a la experiencia del producto y continúa la conversación.", primary: "Solicitar acceso", secondary: "Contactar a Izikwen" },
    footer: {
      tagline: "Activos digitales, más sencillos.",
      description: "Una experiencia guiada para activos digitales compatibles, verificación de cuenta, opciones de pago y seguimiento de transacciones. La disponibilidad puede variar.",
      requestAccess: "Solicitar acceso",
      contact: "Contactar a Izikwen",
      copyright: "© 2026 Izikwen. Todos los derechos reservados.",
      emailLabel: "Escribir a Izikwen",
    },
    seo: {
      title: "Izikwen | Activos digitales, más sencillos",
      description: "Descubre Izikwen, una experiencia guiada para comprar, vender, verificar y seguir transacciones de activos digitales compatibles.",
      ogTitle: "Izikwen — Activos digitales, más sencillos",
      ogDescription: "Una experiencia de producto clara y guiada para transacciones de activos digitales compatibles.",
      imageAlt: "Izikwen — Activos digitales, más sencillos",
    },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};
