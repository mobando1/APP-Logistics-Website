import type { Locale } from "@client/lib/locale-routing";
import type { LegalDoc } from "./types";
import politicaDatosCo from "./politica-datos-co";

// Documentos legales por país. España queda PENDIENTE: la política colombiana
// (Ley 1581 de 2012) no aplica allí y hace falta la versión RGPD/LOPDGDD de
// APP Logistics S.L. Cuando llegue, basta con añadir el archivo y la clave "es"
// aquí — la página y las rutas ya lo contemplan.
export const politicaDatos: Partial<Record<Locale, LegalDoc>> = {
  co: politicaDatosCo,
};

// Ruta canónica de la política (con alias /privacidad). Se usa en el footer y
// en los checks de autorización de los formularios. Vive en @shared porque el
// servidor también la necesita para redirigir a los visitantes de España.
export { POLITICA_DATOS_PATH } from "@shared/coOnlyPaths";

export type { LegalDoc, LegalSection, LegalBlock } from "./types";
