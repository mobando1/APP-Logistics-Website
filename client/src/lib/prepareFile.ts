// Deja un archivo elegido por el usuario listo para viajar en el JSON: valida el
// tipo, comprime si es imagen, mide los bytes REALES que va a pesar y valida el
// tamaño contra el tope.
//
// El orden importa:
//   1. Extensión primero, para rechazar un .exe sin leer nada del disco.
//   2. Compresión (solo imágenes): una foto de cédula de 4MB baja a unos cientos
//      de KB y entra sin que el candidato tenga que hacer nada.
//   3. Tamaño al final, sobre los bytes ya comprimidos, que son los que de
//      verdad se envían. Validar antes daría un "no cabe" a un archivo que sí
//      cabía una vez comprimido.
//
// Un PDF o un Word no se pueden comprimir en el navegador, así que se validan
// por su tamaño original y se rechazan si se pasan.

import { dataUrlBytes } from "@shared/fileLimits";
import { compressDataUrl, readAsDataUrl } from "./imageCompression";
import { isCompressible, validateExtension, validateSize } from "./fileValidation";

export type PreparedFile =
  | { ok: true; dataUrl: string; bytes: number }
  | { ok: false; error: string };

export async function prepareFile(
  file: File,
  otherFilesBytes = 0
): Promise<PreparedFile> {
  const tipo = validateExtension(file.name);
  if (!tipo.ok) return tipo;

  // Los que no se pueden comprimir se miden por el tamaño del propio archivo:
  // así un PDF de 20MB se rechaza sin haberlo leído entero a memoria.
  if (!isCompressible(file.name)) {
    const tamano = validateSize(file.size, otherFilesBytes);
    if (!tamano.ok) return tamano;
    const dataUrl = await readAsDataUrl(file);
    if (!dataUrl) return { ok: false, error: "No se pudo leer el archivo. Vuelve a intentarlo." };
    return { ok: true, dataUrl, bytes: file.size };
  }

  const original = await readAsDataUrl(file);
  if (!original) return { ok: false, error: "No se pudo leer el archivo. Vuelve a intentarlo." };

  const comprimido = await compressDataUrl(original);
  const bytes = dataUrlBytes(comprimido);

  // Si la compresión no bastó (o el navegador no pudo con el formato y devolvió
  // el original), se rechaza igual: el tope es el tope.
  const tamano = validateSize(bytes, otherFilesBytes);
  if (!tamano.ok) return tamano;

  return { ok: true, dataUrl: comprimido, bytes };
}
