import type { Locale } from "@client/lib/locale-routing";

export interface TimelineEntry {
  year: string;
  event: string;
}

export interface CoverageCity {
  name: string;
  detail: string;
  image: string;
}

// Fragmento de párrafo: texto normal o resaltado (negrilla).
export interface RichSegment {
  text: string;
  bold?: boolean;
}

// Servicio: el icono/imagen/color viven en el componente y se mapean por id.
export interface ServiceItem {
  id: string; // distribucion | cargue-descargue | bodega | inventarios | acondicionamiento | asesorias
  title: string;
  short: string; // descripción corta (tarjetas Home)
  long: string; // descripción larga (página Servicios)
}

// Indicador de la sección Stats. value null => se muestra "—" (valor pendiente).
export interface StatItem {
  key: string; // experiencia | certificado | clientes | cobertura | cajas | vehiculos
  value: number | null;
  prefix: string;
  suffix: string;
  label: string;
  detail: string;
}

export interface LocaleContent {
  locale: Locale;
  country: string; // "Colombia" | "España"
  companyLegalName: string; // "APP Logistics SAS" | "APP Logistics S.L."

  contact: {
    phoneDisplay: string; // "(57) 315 340 25 45"
    phoneTel: string; // "+573153402545"
    navPhoneShort: string; // "315 340 25 45"
    email: string; // "info@applogistics.com.co"
    salesEmail: string; // "carlos.garcia@applogistics.com.co"
    whatsappNumber: string; // "573153402545"
    whatsappMessage: string;
    officeCity: string; // "Bogotá, Colombia"
    coverageInline: string; // "Bogotá, Medellín, ..." (Contacto)
    hidePhone?: boolean; // true para ocultar teléfono en Navbar/Footer/Contacto (España, hasta tener SIM exclusiva)
    hideWhatsapp?: boolean; // true para ocultar el botón flotante de WhatsApp
  };

  coverage: {
    intro: string; // párrafo de CoverageSection
    cities: CoverageCity[];
  };
  footerCities: string; // "Bogotá | Medellín | ..."
  footerDescription: string; // "Empresa 100% colombiana fundada en 2012. ..."
  footerCertifications: string; // "Miembros del Frente de Seguridad ... | BASC ..."

  hero: {
    badge: string; // "+14 años ... en Colombia"
    highlights: string[];
  };

  about: {
    heading: string; // "Empresa 100% colombiana desde 2012"
    paragraphs: string[];
    valores: { title: string; text: string }[];
  };

  // Servicios (Home + página Servicios) y encabezado de la página.
  services: ServiceItem[];
  servicesIntro: { title: string; subtitle: string };

  // Pop-up de vacante laboral. Solo aparece si el locale lo define (Colombia).
  vacancy?: {
    title: string; // "VACANTES LABORALES"
    city: string; // "Sabaneta - Antioquia"
    image: string; // banner de referencia (reemplazable)
    buscamos: string[];
    requisitos: string[];
    beneficios: string[];
    email: string; // se conserva; sin teléfono ni web
  };

  // Recuadro de cotización (CTASection) y encabezado de la página Empleo.
  cta: { title: string; subtitle: string };
  empleoIntro: { title: string; subtitle: string };

  stats: StatItem[];

  nosotros: {
    subtitle: string;
    paragraphs: RichSegment[][]; // párrafos con resaltados
    closing: string;
    timeline: TimelineEntry[];
  };

  forms: {
    defaultDialCode: string; // "+57" | "+34"
    tiposDocumento: string[]; // ["Cédula", "PEP"] | ["DNI", "NIE Comunidad Europea", "TIE"]
    documentoApiMap: Record<string, string>; // {"Cédula":"CC", ...}
    ciudades: string[];
    cargos: string[];
    sectores: string[];
    grupoEtnico?: string[]; // undefined en España (se oculta el campo)
    nacionalidades?: string[]; // solo España: ["Español", "Extranjero"]
    declaracion: string; // texto de la declaración obligatoria (ambos países)
    // Autorización de tratamiento de datos (check propio, separado de la
    // declaración de veracidad: la Ley 1581 no admite autorizaciones abiertas).
    // El texto se parte en dos para embeber el enlace a la política.
    // undefined => no se pide autorización en ese país (España: falta la
    // política RGPD/LOPDGDD; ver client/src/content/legal/index.ts).
    autorizacionDatos?: {
      before: string;
      linkLabel: string;
      after: string;
      version: string; // versión aceptada, viaja al CRM: "POL-PAE-02 V. 02"
    };
  };
}

export type LocaleContentMap = Record<Locale, LocaleContent>;
