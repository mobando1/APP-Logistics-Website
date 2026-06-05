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

  stats: {
    experienceDetail: string; // "Desde 2012"
    certifiedValue: number; // 95 / 65
    certifiedDetail: string; // "Certificación SENA"
    clientsDetail: string; // "En todo Colombia"
    citiesValue: number; // 6 / nº ciudades
    citiesDetail: string; // "Y creciendo"
  };

  nosotros: {
    subtitle: string;
    paragraphs: RichSegment[][]; // párrafos con resaltados
    closing: string;
    timeline: TimelineEntry[];
  };

  forms: {
    defaultDialCode: string; // "+57" | "+34"
    tiposDocumento: string[]; // ["Cédula", "PEP"] | ["DNI", "NIE"]
    documentoApiMap: Record<string, string>; // {"Cédula":"CC", ...}
    ciudades: string[];
    cargos: string[];
    sectores: string[];
    grupoEtnico?: string[]; // undefined en España (se oculta el campo)
  };
}

export type LocaleContentMap = Record<Locale, LocaleContent>;
