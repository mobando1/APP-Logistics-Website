import type { RichSegment } from "../types";

// ============================================================================
// Modelo de documentos legales (políticas, avisos) publicados como texto.
//
// Vive aparte de LocaleContent porque un documento legal es propio de un país
// y se actualiza con una cadencia distinta al copy de marketing: cuando el
// cliente envía una versión nueva se reemplaza un solo archivo.
// ============================================================================

export type LegalBlock =
  // Párrafo normal (admite resaltados con RichSegment).
  | { kind: "p"; text: RichSegment[] }
  // Lista de viñetas.
  | { kind: "list"; items: RichSegment[][] }
  // Lista de definiciones (término + explicación). Se renderiza como <dl>.
  | { kind: "defs"; items: { term: string; text: RichSegment[] }[] };

export interface LegalSection {
  // Ancla estable derivada del NÚMERO de la sección ("sec-5", "sec-5-1"), no
  // del título: si una versión futura reescribe el encabezado, los enlaces
  // profundos que ya se compartieron siguen funcionando.
  id: string;
  number: string; // "5" | "5.1"
  title: string;
  blocks: LegalBlock[];
  children?: LegalSection[]; // un solo nivel de anidamiento (5.1, 5.2, ...)
}

export interface LegalDoc {
  // Identidad del documento. No se publica en la página; sirve para saber qué
  // versión está publicada cuando el cliente mande la siguiente.
  code: string; // "POL-PAE-02"
  version: string; // "V. 02"

  title: string;
  subtitle?: string;
  sections: LegalSection[];
  footnote: string; // nota de cierre al pie del documento
}
