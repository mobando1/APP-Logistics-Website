// Límites y tipos permitidos para los archivos del formulario de postulación.
//
// FUENTE ÚNICA DE VERDAD: la usan tanto el cliente (valida al elegir el archivo
// y pinta el error) como el servidor (valida el payload base64 antes de
// reenviarlo a RASTREO). Tenerlos en un solo lugar evita que se desincronicen
// —exactamente el tipo de bug que dejó pasar archivos sin avisar—.

// Límite por archivo. Holgado para una foto/escáner de un documento.
export const MAX_FILE_MB = 10;
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

// Límite del tamaño TOTAL de todos los adjuntos juntos. El backend acepta hasta
// ~50MB de payload y base64 infla los binarios ~33% (4/3), así que el tope real
// de bytes "crudos" que cabe es ~36MB. Dejamos 35MB de margen para el resto del
// JSON y para no fallar de forma silenciosa (413) con varios documentos grandes.
export const MAX_TOTAL_MB = 35;
export const MAX_TOTAL_BYTES = MAX_TOTAL_MB * 1024 * 1024;

// Extensiones permitidas (validación en el navegador y atributo accept del input).
export const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

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
