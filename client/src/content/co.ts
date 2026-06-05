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
    coverageInline:
      "Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga",
  },

  coverage: {
    intro:
      "Nuestra oficina central se encuentra en Bogotá. En enero de 2020 abrimos en Medellín y en marzo de 2022 iniciamos operaciones en Cali y Barranquilla. Hoy también tenemos cobertura en Cartagena y Bucaramanga.",
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
      {
        name: "Cartagena",
        detail: "",
        image:
          "https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=400&h=300&fit=crop",
      },
      {
        name: "Bucaramanga",
        detail: "",
        image: "/ciudades/bucaramanga.jpg",
      },
    ],
  },
  footerCities:
    "Bogotá | Medellín | Cali | Barranquilla | Cartagena | Bucaramanga",
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

  stats: {
    experienceDetail: "Desde 2012",
    certifiedValue: 95,
    certifiedDetail: "Certificación SENA",
    clientsDetail: "En todo Colombia",
    citiesValue: 4,
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
        event:
          "En expansión: nueva cobertura en Cartagena y Bucaramanga y proyección internacional hacia España",
      },
    ],
  },

  forms: {
    defaultDialCode: "+57",
    tiposDocumento: ["Cédula", "PEP"],
    documentoApiMap: { Cédula: "CC", PEP: "PEP" },
    ciudades: [
      "Bogotá",
      "Medellín",
      "Cali",
      "Barranquilla",
      "Cartagena",
      "Bucaramanga",
      "Otra",
    ],
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
  },
};

export default co;
