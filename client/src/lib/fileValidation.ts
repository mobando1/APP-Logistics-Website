// Validación de los archivos adjuntos del formulario de postulación.
//
// Vive aquí (función pura, sin React ni DOM) para poder probarla con tests
// automáticos: así un cambio accidental en el límite o en los tipos permitidos
// queda detectado antes de llegar a producción. El componente (Empleo.tsx) solo
// llama a validateFile() y pinta el error que devuelve.

// Límite por archivo. Holgado para una foto/escáner de un documento.
export const MAX_FILE_MB = 10;
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

// Límite del tamaño TOTAL de todos los adjuntos juntos. El backend acepta hasta
// ~50MB de payload y base64 infla los binarios ~33% (4/3), así que el tope real
// de bytes "crudos" que cabe es ~36MB. Dejamos 35MB para tener margen con el
// resto del JSON y evitar un fallo silencioso (413) cuando alguien sube varios
// documentos grandes a la vez.
export const MAX_TOTAL_MB = 35;
export const MAX_TOTAL_BYTES = MAX_TOTAL_MB * 1024 * 1024;

// Tipos permitidos. DEBEN coincidir con el atributo accept del input de archivo.
export const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

export type FileLike = { name: string; size: number };

export type FileCheck = { ok: true } | { ok: false; error: string };

// Valida un archivo recién elegido. `otherFilesBytes` es la suma del tamaño de
// los demás documentos ya adjuntos (para el tope total). Devuelve un mensaje en
// español listo para mostrar junto al campo.
export function validateFile(
  file: FileLike,
  otherFilesBytes = 0
): FileCheck {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      ok: false,
      error:
        "Tipo de archivo no permitido. Sube un PDF, una imagen (JPG/PNG) o un documento Word.",
    };
  }
  if (file.size > MAX_FILE_BYTES) {
    return {
      ok: false,
      error: `El archivo supera el tamaño máximo de ${MAX_FILE_MB}MB. Comprime el documento o sube uno más liviano.`,
    };
  }
  if (otherFilesBytes + file.size > MAX_TOTAL_BYTES) {
    return {
      ok: false,
      error: `El tamaño total de los documentos supera el máximo de ${MAX_TOTAL_MB}MB. Sube archivos más livianos.`,
    };
  }
  return { ok: true };
}
