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
    email: "info@applogistics.es", // PENDIENTE
    salesEmail: "comercial@applogistics.es", // PENDIENTE
    whatsappNumber: "34600000000", // PENDIENTE
    whatsappMessage: "Hola, quiero información sobre sus servicios logísticos.",
    officeCity: "Madrid, España", // PENDIENTE: dirección concreta
    coverageInline: "Madrid", // PENDIENTE: ciudades reales de cobertura
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
    heading: "Soluciones logísticas con sede en Madrid", // PENDIENTE
    paragraphs: [
      "Llevamos más de una década ofreciendo soluciones logísticas a empresas que buscan eficiencia en sus procesos: cargue y descargue, operaciones de almacén, maquila e inventarios, entre otros.", // PENDIENTE
      "Ahora ampliamos nuestra operación a España y Europa desde Madrid, con personal cualificado y un compromiso real con la mejora continua de cada cliente.", // PENDIENTE
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

  stats: {
    experienceDetail: "Desde 2012",
    certifiedValue: 100, // PENDIENTE
    certifiedDetail: "Personal cualificado", // PENDIENTE
    clientsDetail: "En España y Europa", // PENDIENTE
    citiesValue: 1, // PENDIENTE: nº de ciudades reales
    citiesDetail: "Y creciendo",
  },

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
    tiposDocumento: ["DNI", "NIE"],
    documentoApiMap: { DNI: "DNI", NIE: "NIE" }, // PENDIENTE: confirmar valores que acepta el backend
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
  },
};

export default es;
