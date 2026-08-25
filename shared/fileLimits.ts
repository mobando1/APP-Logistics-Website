// Límites y tipos permitidos para los archivos del formulario de postulación.
//
// FUENTE ÚNICA DE VERDAD: la usan tanto el cliente (valida al elegir el archivo
// y pinta el error) como el servidor (valida el payload base64 antes de
// reenviarlo a RASTREO). Tenerlos en un solo lugar evita que se desincronicen
// —exactamente el tipo de bug que dejó pasar archivos sin avisar—.

// Límite por archivo. Ajustado a 2MB por petición del cliente: los documentos
// del candidato terminan en la ficha del empleado (RASTREO los copia al
// convertirlo), así que el tope tiene que ser el mismo en toda la cadena.
// Para que no frustre al que fotografía su cédula con el celular, las imágenes
// se comprimen en el navegador ANTES de validarlas (ver lib/imageCompression).
// Los PDF y Word no se pueden comprimir aquí, así que esos sí se rechazan.
export const MAX_FILE_MB = 2;
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

// Límite del tamaño TOTAL de todos los adjuntos juntos. El formulario admite
// hasta 4 documentos, así que 4 x 2MB = 8MB es el techo natural. Sigue muy por
// debajo de lo que acepta el backend (ver el express.json de server/index.ts),
// que es lo que evita el 413 silencioso con varios documentos grandes.
export const MAX_TOTAL_MB = 8;
export const MAX_TOTAL_BYTES = MAX_TOTAL_MB * 1024 * 1024;

// Extensiones permitidas (validación en el navegador y atributo accept del input).
export const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

// Extensiones que el navegador puede comprimir antes de subir (subconjunto de
// ALLOWED_EXTENSIONS). El resto —PDF y Word— viaja tal cual.
export const COMPRESSIBLE_EXTENSIONS = ["jpg", "jpeg", "png"];

// MIME types permitidos (validación en el servidor sobre las data URLs base64).
export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

// Campos del payload de /api/lead/candidato que transportan archivos en base64.
export const FILE_URL_FIELDS = [
  "hojaVidaUrl",
  "documentoIdentidadUrl",
  "medidasCorrectivasUrl",
  "antecedentesUrl",
  "pasaporteUrl",
  "autorizacionTrabajoUrl",
] as const;

/**
 * Tamaño en bytes que representa una cadena base64 (sin el prefijo data URL).
 *
 * Hace falta porque el archivo viaja codificado: base64 abulta ~33% respecto al
 * binario, así que medir el largo del string daría un número distinto al
 * `file.size` que ve el navegador, y cliente y servidor validarían cosas
 * distintas con la misma constante.
 */
export function base64Bytes(b64: string): number {
  const len = b64.length;
  if (len === 0) return 0;
  const padding = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.floor((len * 3) / 4) - padding;
}

/** Bytes reales de un data URL base64 completo ("data:image/png;base64,..."). */
export function dataUrlBytes(dataUrl: string): number {
  const comma = dataUrl.indexOf(",");
  if (comma < 0 || !/;base64/i.test(dataUrl.slice(0, comma))) return 0;
  return base64Bytes(dataUrl.slice(comma + 1));
}
