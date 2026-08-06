import type { LocaleContent } from "./types";

// ============================================================================
// VERSIÓN ESPAÑA (ruta "/es") — DATOS PROVISIONALES (PENDIENTE)
// Reemplazar todos los valores marcados con // PENDIENTE por los datos reales
// de la operación en Madrid, España (dirección, teléfono +34, email, ciudades,
// imágenes, certificaciones/normativa). Las imágenes usan placeholders visibles.
// ============================================================================
const es: LocaleContent = {
  locale: "es",
  country: "España",
  companyLegalName: "APP Logistics S.L.", // PENDIENTE: razón social real en España

  contact: {
    phoneDisplay: "(+34) 600 000 000", // PENDIENTE
    phoneTel: "+34600000000", // PENDIENTE
    navPhoneShort: "600 000 000", // PENDIENTE
    email: "info@applogistics.com.es",
    salesEmail: "info@applogistics.com.es", // El cliente solo facilitó un correo para España
    whatsappNumber: "34600000000", // PENDIENTE
    whatsappMessage: "Hola, quiero información sobre sus servicios logísticos.",
    officeCity: "Madrid, España", // Oficina central
    coverageInline: "Madrid", // PENDIENTE: ciudades reales de cobertura
    // Tel. y WhatsApp ocultos hasta que el cliente facilite la SIM/número exclusivo de España.
    // Cuando llegue el número real: rellenar phone*/whatsappNumber y poner estos flags en false (o eliminarlos).
    hidePhone: true,
    hideWhatsapp: true,
  },

  coverage: {
    intro:
      "Nuestra sede para Europa se encuentra en Madrid, España. Desde aquí impulsamos operaciones logísticas eficientes y seguras para empresas que buscan un aliado estratégico en el mercado europeo.", // PENDIENTE
    cities: [
      {
        name: "Madrid",
        detail: "Sede central",
        image:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop",
      },
    ],
  },
  footerCities: "Madrid", // PENDIENTE: ciudades reales
  footerDescription:
    "Compañía especializada en soluciones logísticas integrales, con operación en España y Colombia.", // PENDIENTE
  footerCertifications:
    "Operación alineada con la normativa española y europea en seguridad y prevención de riesgos laborales.", // PENDIENTE

  hero: {
    badge: "Operaciones logísticas con sede en Madrid, España", // PENDIENTE
    highlights: [
      "Personal cualificado",
      "Normativa española y europea",
      "Sede en Madrid",
    ], // PENDIENTE
  },

  about: {
    heading: "Empresa 100% colombiana desde 2012",
    paragraphs: [
      "Nacimos en 2012 como una solución para empresas que buscan eficiencia en sus procesos logísticos: cargue y descargue, operaciones de bodega, maquila, inventarios entre otros.",
      "Más de una década especializándonos en distribución y operaciones, con personal capacitado y un compromiso real con la mejora continua de cada cliente.",
    ],
    valores: [
      {
        title: "Personal altamente cualificado",
        text: "Equipo formado en buenas prácticas y seguridad operativa para una ejecución técnica y fiable.", // PENDIENTE
      },
      {
        title: "Seguridad, cumplimiento y eficiencia en cada operación",
        text: "Procesos alineados con la normativa española y europea de prevención de riesgos laborales.", // PENDIENTE
      },
      {
        title: "Experiencia y especialización en operaciones logísticas",
        text: "Más de una década enfocados en distribución, almacén, inventarios y cargue/descargue.", // PENDIENTE
      },
    ],
  },

  services: [
    {
      id: "distribucion",
      title: "Distribución de Mercancías",
      short:
        "Personal cualificado para distribución urbana, reparto de pedidos y entrega a puntos de venta.",
      long: "En APP Logistics entendemos que la distribución es uno de los momentos más importantes de la experiencia del cliente. Por ello, contamos con personal capacitado para realizar entregas en grandes superficies, establecimientos comerciales y puntos de venta, garantizando puntualidad, eficiencia y un servicio alineado con los estándares de calidad de nuestros clientes.",
    },
    {
      id: "cargue-descargue",
      title: "Carga y Descarga de Mercancías",
      short:
        "Apoyamos sus operaciones logísticas con personal especializado en la manipulación de mercancías.",
      long: "Ofrecemos soluciones especializadas de carga y descarga allí donde nuestros clientes lo necesiten, tanto para mercancía paletizada como para carga unitaria o de gran volumen. Nuestro equipo trabaja bajo estrictos estándares de seguridad, eficiencia y productividad, contribuyendo a optimizar los tiempos de operación y reducir costes logísticos. La mejora continua forma parte de nuestra cultura de trabajo, permitiéndonos aportar valor en cada servicio.",
    },
    {
      id: "bodega",
      title: "Operaciones de Almacén",
      short:
        "Personal cualificado para operaciones de almacenamiento, preparación de pedidos y gestión de mercancías.",
      long: "En APP Logistics disponemos de personal formado para apoyar las diferentes actividades dentro de almacenes y centros logísticos. Prestamos servicios de preparación de pedidos, picking, packing, gestión de devoluciones, inventarios y ubicación de mercancías. Nuestra flexibilidad operativa nos permite adaptarnos a incrementos de actividad y campañas estacionales, garantizando la continuidad y eficiencia de las operaciones.",
    },
    {
      id: "inventarios",
      title: "Inventarios",
      short:
        "Garantizamos inventarios precisos y fiables para una gestión eficiente de sus existencias.",
      long: "Entendemos que el control de inventario es fundamental para garantizar la continuidad operativa y mantener un alto nivel de servicio. Por ello, contamos con personal especializado y herramientas que permiten optimizar los tiempos de ejecución, mejorar la precisión de los recuentos y proporcionar información fiable para la toma de decisiones.",
    },
    {
      id: "acondicionamiento",
      title: "Acondicionamiento Secundario",
      short:
        "Soluciones de acondicionamiento y adecuación de mercancías adaptadas a sus necesidades operativas.",
      long: "Como parte de nuestros servicios de valor añadido, apoyamos a nuestros clientes en procesos de acondicionamiento secundario tales como reempaquetado, etiquetado, serialización, clasificación y reacondicionamiento de productos. Garantizamos calidad, trazabilidad y cumplimiento de los requisitos específicos de cada operación.",
    },
    {
      id: "asesorias",
      title: "Consultoría y Formación Logística",
      short:
        "Especialistas en optimización logística, mejora de procesos y desarrollo de capacidades operativas.",
      long: "Ponemos a disposición de nuestros clientes un equipo de profesionales con amplia experiencia en la cadena de suministro. A través de servicios de consultoría y formación identificamos oportunidades de mejora y desarrollamos soluciones orientadas a aumentar la productividad, optimizar recursos, reducir costes operativos y mejorar la capacidad de respuesta de las organizaciones.",
    },
  ],
  servicesIntro: {
    title: "Especialistas en carga y descarga de mercancías",
    subtitle:
      "Somos especialistas en operaciones de carga y descarga, una actividad esencial para el correcto funcionamiento de la cadena de suministro. En APP Logistics ponemos a disposición de nuestros clientes personal cualificado, procedimientos seguros y una amplia experiencia operativa para garantizar eficiencia, productividad y un adecuado manejo de las mercancías en cada operación. Trabajamos para que nuestros clientes puedan centrarse en su actividad principal mientras nosotros nos encargamos de la ejecución operativa.",
  },

  cta: {
    title: "¿Necesita personal especializado para su operación logística?",
    subtitle:
      "Cuéntenos sus necesidades y elaboraremos una propuesta adaptada a su empresa. Estamos preparados para apoyar operaciones de carga y descarga, distribución, almacén, inventarios y servicios logísticos complementarios.",
  },
  empleoIntro: {
    title: "Desarrolla tu carrera profesional con APP Logistics",
    subtitle:
      "Buscamos personas comprometidas, responsables y con vocación de servicio para formar parte de nuestro equipo. Envíanos tu currículum y descubre las oportunidades de crecimiento profesional que tenemos para ti.",
  },

  stats: [
    {
      key: "experiencia",
      value: 14,
      prefix: "+",
      suffix: "",
      label: "Años de experiencia",
      detail: "Desde 2012",
    },
    {
      key: "certificado",
      value: 100, // PENDIENTE
      prefix: "",
      suffix: "%",
      label: "Personal cualificado",
      detail: "Formación continua", // PENDIENTE
    },
    {
      key: "clientes",
      value: 100,
      prefix: "",
      suffix: "%",
      label: "Clientes satisfechos",
      detail: "En España y Europa", // PENDIENTE
    },
    {
      key: "cobertura",
      value: 1, // PENDIENTE: nº de ciudades reales
      prefix: "",
      suffix: "",
      label: "Ciudades de cobertura",
      detail: "Y creciendo",
    },
    {
      key: "cajas",
      value: 1219973,
      prefix: "",
      suffix: "+",
      label: "Cajas movidas",
      detail: "Último trimestre",
    },
    {
      key: "vehiculos",
      value: 5178,
      prefix: "",
      suffix: "+",
      label: "Vehículos registrados",
      detail: "A nivel nacional",
    },
  ],

  nosotros: {
    subtitle: "APP Logistics: precisión, confianza y excelencia operativa",
    paragraphs: [
      [
        { text: "APP Logistics", bold: true },
        {
          text: " es una compañía 100% colombiana fundada en 2012, especializada en soluciones logísticas integrales diseñadas para optimizar la operación de empresas que buscan mayor eficiencia, control y productividad en su cadena de suministro.",
        },
      ],
      [
        {
          text: "Durante más de una década hemos acompañado a organizaciones de distintos sectores, fortaleciendo procesos estratégicos como ",
        },
        {
          text: "cargue y descargue de mercancías, operaciones de almacén, picking & packing, maquila, gestión de inventarios, distribución, cubicaje, trazabilidad documental y ejecución de procesos operativos especializados",
          bold: true,
        },
        {
          text: ", adaptándonos a los requerimientos particulares de cada cliente.",
        },
      ],
      [
        {
          text: "Nuestra permanencia y crecimiento son el resultado de una operación construida sobre tres pilares fundamentales: ",
        },
        {
          text: "excelencia operativa, talento humano cualificado y estricto cumplimiento normativo.",
          bold: true,
        },
      ],
      [
        {
          text: "Contamos con un equipo altamente cualificado y en formación permanente en ",
        },
        {
          text: "buenas prácticas de manipulación, almacenamiento, transporte y seguridad operativa",
          bold: true,
        },
        {
          text: ", garantizando ejecución técnica, eficiencia y fiabilidad en cada operación.",
        }, // PENDIENTE: certificaciones concretas en España
      ],
      [
        {
          text: "Desarrollamos todos nuestros procesos bajo el cumplimiento riguroso de la ",
        },
        {
          text: "normativa española y europea vigente en seguridad y prevención de riesgos laborales",
          bold: true,
        },
        {
          text: ", con una cultura organizacional orientada a la mejora continua y la prevención.",
        },
      ],
      [
        {
          text: "La seguridad y la confianza de nuestros clientes son nuestra prioridad. Por ello, ",
        },
        {
          text: "estructuramos nuestra operación bajo estándares internacionales de seguridad en la cadena de suministro",
          bold: true,
        },
        {
          text: ", fortaleciendo entornos logísticos seguros, transparentes y fiables.",
        }, // PENDIENTE: certificaciones/asociaciones en España
      ],
      [
        {
          text: "Hoy, con presencia internacional y sede europea en Madrid, ",
        },
        {
          text: "APP Logistics evoluciona para convertirse en el aliado estratégico que impulsa operaciones más eficientes, seguras y competitivas.",
          bold: true,
        },
      ],
    ],
    closing: "Transformamos procesos logísticos en ventajas competitivas.",
    timeline: [
      { year: "2012", event: "Fundación como empresa especializada en logística" }, // PENDIENTE
      { year: "2020", event: "Consolidación y crecimiento de operaciones" }, // PENDIENTE
      { year: "2022", event: "Ampliación de servicios logísticos" }, // PENDIENTE
      {
        year: "2026",
        event: "Apertura de sede en Madrid, España, para la operación en Europa",
      }, // PENDIENTE
    ],
  },

  forms: {
    defaultDialCode: "+34",
    tiposDocumento: ["DNI", "NIE Comunidad Europea", "TIE"],
    documentoApiMap: {
      DNI: "DNI",
      "NIE Comunidad Europea": "NIE",
      TIE: "TIE",
    }, // PENDIENTE: confirmar valores que acepta el backend
    ciudades: ["Madrid", "Barcelona", "Valencia", "Otra"], // PENDIENTE
    cargos: [
      "Auxiliar de operaciones",
      "Carretillero",
      "Conductor",
      "Auxiliar administrativo",
    ], // PENDIENTE
    sectores: [
      "Alimentación y Bebidas",
      "Químicos",
      "Farmacéutico",
      "Retail",
      "Industria",
      "Tecnología",
      "Construcción",
      "Otro",
    ],
    // grupoEtnico se omite en España (no aplica) -> el campo no se renderiza.
    nacionalidades: ["Español", "Extranjero"],
    declaracion:
      "Declaro que la información suministrada es veraz y que dispongo de los documentos que acreditan mi experiencia laboral, formación académica, cursos, capacitaciones y demás datos incluidos en mi candidatura, comprometiéndome a presentarlos cuando sean requeridos por APP Logistics.",
    // autorizacionDatos se omite en España: la política publicada es la
    // colombiana (Ley 1581) y no aplica aquí. PENDIENTE: texto de autorización
    // RGPD/LOPDGDD + su política, y entonces se rellena esta clave.
  },
};

export default es;
