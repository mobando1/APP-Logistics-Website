import type { LocaleContent } from "./types";

// Contenido de la versión Colombia (raíz "/"). Es el contenido original del sitio.
const co: LocaleContent = {
  locale: "co",
  country: "Colombia",
  companyLegalName: "APP Logistics SAS",

  contact: {
    phoneDisplay: "(57) 315 340 25 45",
    phoneTel: "+573153402545",
    navPhoneShort: "315 340 25 45",
    email: "info@applogistics.com.co",
    salesEmail: "carlos.garcia@applogistics.com.co",
    whatsappNumber: "573153402545",
    whatsappMessage: "Hola, quiero información sobre sus servicios logísticos.",
    officeCity: "Bogotá, Colombia",
    coverageInline: "Bogotá, Medellín, Cali, Barranquilla",
    // Tel. y WhatsApp ocultos: el cliente usará una línea/SIM exclusiva, aún por definir.
    // Para reactivarlos: poner estos flags en false (o eliminarlos).
    hidePhone: true,
    hideWhatsapp: true,
  },

  coverage: {
    intro:
      "Nuestra oficina central se encuentra en Bogotá. En enero de 2020 abrimos en Medellín y en marzo de 2022 iniciamos operaciones en Cali y Barranquilla.",
    cities: [
      {
        name: "Bogotá",
        detail: "Oficina central",
        image:
          "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400&h=300&fit=crop",
      },
      {
        name: "Medellín",
        detail: "",
        image:
          "https://images.unsplash.com/photo-1633627425472-d07ac65e2a36?w=400&h=300&fit=crop",
      },
      {
        name: "Cali",
        detail: "",
        image:
          "https://images.unsplash.com/photo-1728588519059-a62e06050425?w=400&h=300&fit=crop",
      },
      {
        name: "Barranquilla",
        detail: "",
        image:
          "https://images.unsplash.com/photo-1548372007-09f87bdf7a35?w=400&h=300&fit=crop",
      },
    ],
  },
  footerCities: "Bogotá | Medellín | Cali | Barranquilla",
  footerDescription:
    "Empresa 100% colombiana fundada en 2012. Expertos en manipulación de mercancía y operaciones logísticas.",
  footerCertifications:
    "Miembros del Frente de Seguridad Empresarial de la Policía Nacional | BASC Capítulo Bogotá",

  hero: {
    badge: "+14 años fortaleciendo operaciones logísticas en Colombia",
    highlights: [
      "Personal certificado SENA",
      "Procesos BASC",
      "Cobertura en 4 ciudades",
    ],
  },

  about: {
    heading: "Empresa 100% colombiana desde 2012",
    paragraphs: [
      "Nacimos en 2012 como una solución para empresas que buscan eficiencia en sus procesos logísticos: cargue y descargue, operaciones de bodega, maquila, inventarios entre otros.",
      "Más de una década especializándonos en distribución y operaciones, con personal capacitado y un compromiso real con la mejora continua de cada cliente.",
    ],
    valores: [
      {
        title: "Personal altamente capacitado y certificado",
        text: "Equipo formado en buenas prácticas y seguridad industrial, con certificación SENA en despacho de mercancías.",
      },
      {
        title: "Seguridad, cumplimiento y eficiencia en cada operación",
        text: "Procesos basados en estándares BASC, SG-SST y la normatividad vigente, para entregar resultados confiables.",
      },
      {
        title: "Experiencia y especialización en operaciones logísticas",
        text: "Más de una década enfocados en distribución, bodega, inventarios y cargue/descargue para empresas de todo Colombia.",
      },
    ],
  },

  services: [
    {
      id: "distribucion",
      title: "Distribución de Mercancías",
      short:
        "Personal calificado para distribución urbana, entrega de pedidos y operaciones tienda a tienda.",
      long: "En APP Logistics entendemos que la distribución es el punto de contacto final con el cliente y un factor clave para su satisfacción. Por ello, contamos con personal capacitado para realizar entregas en clientes estratégicos, grandes superficies y operaciones Tienda a Tienda (TAT), garantizando cumplimiento, agilidad y un servicio que refleja la calidad y confianza de las marcas que representamos.",
    },
    {
      id: "cargue-descargue",
      title: "Cargue y Descargue de Mercancías",
      short:
        "Apoyamos sus operaciones logísticas con personal capacitado para el manejo de todo tipo de mercancías.",
      long: "Ofrecemos soluciones especializadas de cargue y descargue en el lugar y momento que nuestros clientes lo requieran, para mercancías unitarias o masivas de cualquier tipo. Nuestro personal altamente capacitado trabaja bajo estándares de seguridad, eficiencia y productividad, contribuyendo a optimizar los tiempos de operación y reducir costos. En APP Logistics promovemos el mejoramiento continuo de nuestros procesos para generar mayor valor y eficiencia en cada operación logística.",
    },
    {
      id: "bodega",
      title: "Operaciones en Bodega",
      short:
        "Personal capacitado para apoyar las operaciones de almacenamiento, alistamiento y control de mercancías.",
      long: "En APP Logistics contamos con personal capacitado para apoyar de manera eficiente las diferentes actividades dentro de centros de distribución y bodegas. Gracias a nuestros procesos de formación continua, garantizamos un servicio confiable en labores como alistamiento de pedidos, picking, packing, recepción de devoluciones, inventarios y ubicación de mercancías. Nuestra flexibilidad operativa nos permite responder oportunamente a los incrementos de demanda y picos de operación, contribuyendo a la productividad y continuidad de las operaciones de nuestros clientes.",
    },
    {
      id: "inventarios",
      title: "Inventarios",
      short:
        "Garantizamos inventarios precisos y confiables para una mejor gestión de sus operaciones.",
      long: "Entendemos que el inventario es un activo fundamental para garantizar la continuidad operativa y el nivel de servicio de cualquier organización. Por ello, en APP Logistics contamos con personal especializado en la toma, control y validación de inventarios, apoyado por herramientas y metodologías que optimizan los tiempos de ejecución y mejoran la calidad de la información recopilada. Nuestro objetivo es proporcionar datos confiables que faciliten la toma de decisiones y contribuyan a una gestión eficiente de los recursos de nuestros clientes.",
    },
    {
      id: "acondicionamiento",
      title: "Acondicionamiento Secundario",
      short:
        "Soluciones de acondicionamiento y adecuación de mercancías para optimizar sus procesos logísticos.",
      long: "Como parte de nuestra oferta de servicios complementarios, apoyamos a nuestros clientes en procesos de acondicionamiento secundario que agregan valor a sus operaciones logísticas. Contamos con personal capacitado para realizar actividades de reempaque, toma de seriales, etiquetado, clasificación y reacondicionamiento de mercancías, garantizando calidad, trazabilidad y cumplimiento de los requerimientos específicos de cada operación.",
    },
    {
      id: "asesorias",
      title: "Asesorías y Capacitación",
      short:
        "Expertos en logística enfocados en optimizar procesos, fortalecer capacidades y generar valor para su operación.",
      long: "Ponemos a disposición de nuestros clientes un equipo de profesionales con amplia experiencia en las diferentes áreas de la cadena de suministro. A través de servicios de asesoría y capacitación, identificamos oportunidades de mejora y desarrollamos soluciones orientadas a optimizar procesos, incrementar la productividad, reducir costos operativos y fortalecer la capacidad de respuesta de las organizaciones frente a las exigencias del mercado.",
    },
  ],
  servicesIntro: {
    title: "Expertos en cargue y descargue de mercancías",
    subtitle:
      "Somos especialistas en operaciones de cargue y descargue, un eslabón fundamental para el éxito de cualquier cadena logística. En APP Logistics ponemos a disposición de nuestros clientes personal calificado, procesos seguros y una amplia experiencia operativa para garantizar eficiencia, productividad y cuidado de la mercancía en cada movimiento. Trabajamos para que nuestros clientes puedan enfocarse en su negocio mientras nosotros nos encargamos de la ejecución logística.",
  },

  vacancy: {
    title: "VACANTES LABORALES",
    city: "Sabaneta - Antioquia",
    // Imagen de referencia (bodega/logística). Reemplazable por la foto del flyer del cliente.
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=360&fit=crop",
    buscamos: ["Auxiliares de cargue y descargue", "Auxiliares de bodega"],
    requisitos: [
      "Bachillerato terminado",
      "1 año de experiencia en operaciones logísticas",
      "Tiempo completo",
      "Preferiblemente que vivan cerca a la bodega",
    ],
    beneficios: [
      "Contrato directo con la empresa",
      "SMLV + prestaciones de ley",
    ],
    email: "seleccion@applogistics.com.co",
  },

  cta: {
    title: "¿Busca personal confiable para su operación logística?",
    subtitle:
      "Cuéntenos qué necesita y prepararemos una propuesta ajustada a sus requerimientos. Estamos listos para apoyar sus procesos de cargue, descargue, distribución, bodega e inventarios.",
  },
  empleoIntro: {
    title: "Construye tu futuro con APP Logistics",
    subtitle:
      "Únete a un equipo comprometido con la excelencia logística. Comparte tu hoja de vida y forma parte de una empresa que impulsa el crecimiento y desarrollo de su talento humano.",
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
      value: 65,
      prefix: "",
      suffix: "%",
      label: "Personal certificado",
      detail: "Certificación SENA",
    },
    {
      key: "clientes",
      value: 100,
      prefix: "",
      suffix: "%",
      label: "Clientes satisfechos",
      detail: "En todo Colombia",
    },
    {
      key: "cobertura",
      value: 4,
      prefix: "",
      suffix: "",
      label: "Ciudades de cobertura",
      detail: "Y creciendo",
    },
    {
      key: "cajas",
      value: null, // PENDIENTE: valor del último trimestre (lo pasa el cliente)
      prefix: "",
      suffix: "+",
      label: "Cajas movidas",
      detail: "Último trimestre",
    },
    {
      key: "vehiculos",
      value: null, // PENDIENTE: valor del último trimestre (lo pasa el cliente)
      prefix: "",
      suffix: "+",
      label: "Vehículos cargados/descargados",
      detail: "Último trimestre",
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
          text: "cargue y descargue de mercancías, operaciones de bodega, picking & packing, maquila, gestión de inventarios, distribución, cubicaje, trazabilidad documental, radicación de facturación y ejecución de procesos operativos especializados",
          bold: true,
        },
        {
          text: ", adaptándonos a los requerimientos particulares de cada cliente.",
        },
      ],
      [
        {
          text: "Nuestra permanencia y crecimiento en el mercado son el resultado de una operación construida sobre tres pilares fundamentales: ",
        },
        {
          text: "excelencia operativa, talento humano calificado y estricto cumplimiento normativo.",
          bold: true,
        },
      ],
      [
        {
          text: "Contamos con un equipo altamente capacitado y en formación permanente en ",
        },
        {
          text: "Buenas Prácticas de Manufactura, almacenamiento, transporte, manipulación de alimentos y seguridad operativa",
          bold: true,
        },
        { text: ". Actualmente, el " },
        {
          text: '65% de nuestro personal cuenta con certificación expedida por el SENA en "Despachar mercancías según métodos de preparación de pedidos y sistema de gestión"',
          bold: true,
        },
        {
          text: ", garantizando ejecución técnica, eficiencia y confiabilidad en cada operación.",
        },
      ],
      [
        {
          text: "En APP Logistics desarrollamos todos nuestros procesos bajo el cumplimiento riguroso de la normatividad colombiana vigente en ",
        },
        { text: "Seguridad y Salud en el Trabajo", bold: true },
        {
          text: ", alineados con los estándares mínimos del Sistema General de Riesgos Laborales y bajo una cultura organizacional orientada a la mejora continua y la prevención.",
        },
      ],
      [
        {
          text: "La seguridad y la confianza de nuestros clientes son prioridad. Por ello, somos ",
        },
        {
          text: "miembros activos del Frente de Seguridad Empresarial de la Policía Nacional de Colombia",
          bold: true,
        },
        {
          text: " y estructuramos nuestra operación bajo los principios y lineamientos ",
        },
        { text: "BASC Capítulo Bogotá", bold: true },
        {
          text: ", fortaleciendo entornos logísticos seguros, transparentes y confiables.",
        },
      ],
      [
        {
          text: "Hoy, con presencia en las principales ciudades de Colombia y proyección internacional hacia Europa, ",
        },
        {
          text: "APP Logistics evoluciona para convertirse en el aliado estratégico que impulsa operaciones más eficientes, seguras y competitivas.",
          bold: true,
        },
      ],
    ],
    closing: "Transformamos procesos logísticos en ventajas competitivas.",
    timeline: [
      {
        year: "2012",
        event: "Fundación en Bogotá como empresa 100% colombiana",
      },
      { year: "2020", event: "Apertura de agencia en Medellín" },
      { year: "2022", event: "Inicio de operaciones en Cali y Barranquilla" },
      {
        year: "2026",
        event: "En expansión: proyección internacional hacia España",
      },
    ],
  },

  forms: {
    defaultDialCode: "+57",
    tiposDocumento: ["Cédula", "PEP"],
    documentoApiMap: { Cédula: "CC", PEP: "PEP" },
    ciudades: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Otra"],
    cargos: [
      "Auxiliar de operaciones",
      "Montacarguista",
      "Conductor",
      "Auxiliar administrativo",
    ],
    sectores: [
      "Alimentos y Bebidas",
      "Químicos",
      "Farmacéutico",
      "Retail",
      "Manufactura",
      "Tecnología",
      "Construcción",
      "Otro",
    ],
    grupoEtnico: [
      "Ninguno",
      "Afrocolombiano",
      "Indígena",
      "Raizal",
      "Palenquero",
      "Rom/Gitano",
      "Prefiero no decir",
    ],
    declaracion:
      "Declaro que la información suministrada es veraz y que dispongo de los documentos que acreditan mi experiencia laboral, formación académica, cursos, capacitaciones y demás datos incluidos en mi candidatura, comprometiéndome a presentarlos cuando sean requeridos por APP Logistics.",
  },
};

export default co;
