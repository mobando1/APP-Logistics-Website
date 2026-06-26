// Validación de los archivos adjuntos del formulario de postulación.
//
// Vive aquí (función pura, sin React ni DOM) para poder probarla con tests
// automáticos: así un cambio accidental en el límite o en los tipos permitidos
// queda detectado antes de llegar a producción. El componente (Empleo.tsx) solo
// llama a validateFile() y pinta el error que devuelve.
//
// Los límites y tipos vienen de @shared/fileLimits para que cliente y servidor
// validen exactamente con los mismos valores (una sola fuente de verdad).

import {
  MAX_FILE_MB,
  MAX_FILE_BYTES,
  MAX_TOTAL_MB,
  MAX_TOTAL_BYTES,
  ALLOWED_EXTENSIONS,
} from "@shared/fileLimits";

export {
  MAX_FILE_MB,
  MAX_FILE_BYTES,
  MAX_TOTAL_MB,
  MAX_TOTAL_BYTES,
  ALLOWED_EXTENSIONS,
};

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
