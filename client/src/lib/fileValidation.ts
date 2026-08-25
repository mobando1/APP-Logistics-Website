// Validación de los archivos adjuntos del formulario de postulación.
//
// Vive aquí (funciones puras, sin React ni DOM) para poder probarla con tests
// automáticos: así un cambio accidental en el límite o en los tipos permitidos
// queda detectado antes de llegar a producción. El componente (Empleo.tsx) solo
// llama y pinta el error que devuelve.
//
// Los límites y tipos vienen de @shared/fileLimits para que cliente y servidor
// validen exactamente con los mismos valores (una sola fuente de verdad).
//
// La validación está partida en dos porque las imágenes se comprimen antes de
// subirse: la extensión se comprueba de entrada (para no perder tiempo leyendo
// un .exe) y el tamaño DESPUÉS de comprimir, sobre los bytes que realmente van
// a viajar. Ver `prepareFile` en lib/prepareFile.ts.

import {
  MAX_FILE_MB,
  MAX_FILE_BYTES,
  MAX_TOTAL_MB,
  MAX_TOTAL_BYTES,
  ALLOWED_EXTENSIONS,
  COMPRESSIBLE_EXTENSIONS,
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

/** Extensión en minúsculas, sin punto. "" si el nombre no tiene ninguna. */
export function extensionOf(name: string): string {
  const partes = name.split(".");
  // Sin punto no hay extensión: split() devolvería el nombre entero, y un
  // "sinpunto" tratado como extensión confunde a quien lea el resultado (para
  // validar da igual —tampoco está en la lista blanca— pero para decidir si algo
  // es comprimible, no).
  if (partes.length < 2) return "";
  return partes.pop()!.toLowerCase();
}

/** ¿Es una imagen que el navegador puede comprimir antes de subirla? */
export function isCompressible(name: string): boolean {
  return COMPRESSIBLE_EXTENSIONS.includes(extensionOf(name));
}

/** Valida solo el tipo de archivo por su extensión. */
export function validateExtension(name: string): FileCheck {
  const ext = extensionOf(name);
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      ok: false,
      error:
        "Tipo de archivo no permitido. Sube un PDF, una imagen (JPG/PNG) o un documento Word.",
    };
  }
  return { ok: true };
}

/**
 * Valida el tamaño de un archivo ya listo para subir. `bytes` son los bytes
 * finales (después de comprimir, si era imagen) y `otherFilesBytes` la suma de
 * los demás documentos ya adjuntos, para el tope total.
 */
export function validateSize(bytes: number, otherFilesBytes = 0): FileCheck {
  if (bytes > MAX_FILE_BYTES) {
    return {
      ok: false,
      error: `El archivo supera el tamaño máximo de ${MAX_FILE_MB}MB. Comprime el documento o sube uno más liviano.`,
    };
  }
  if (otherFilesBytes + bytes > MAX_TOTAL_BYTES) {
    return {
      ok: false,
      error: `El tamaño total de los documentos supera el máximo de ${MAX_TOTAL_MB}MB. Sube archivos más livianos.`,
    };
  }
  return { ok: true };
}

// Valida un archivo recién elegido (tipo y tamaño de una vez). `otherFilesBytes`
// es la suma del tamaño de los demás documentos ya adjuntos. Devuelve un mensaje
// en español listo para mostrar junto al campo.
export function validateFile(
  file: FileLike,
  otherFilesBytes = 0
): FileCheck {
  const tipo = validateExtension(file.name);
  if (!tipo.ok) return tipo;
  return validateSize(file.size, otherFilesBytes);
}
