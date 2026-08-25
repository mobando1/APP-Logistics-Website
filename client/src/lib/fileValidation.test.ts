// Tests de la validación de archivos del formulario de postulación.
// Se ejecutan con: npm test  (usa el runner nativo de Node + tsx, sin libs extra).
//
// Los tamaños se expresan SIEMPRE en función de las constantes, nunca en MB
// literales: cuando el límite bajó de 10MB a 2MB, un caso escrito con un "6MB"
// fijo pasó a fallar por el motivo equivocado y el test dejó de probar lo suyo.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateFile,
  validateExtension,
  validateSize,
  isCompressible,
  extensionOf,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  MAX_FILE_MB,
  MAX_TOTAL_MB,
} from "./fileValidation";

test("acepta un PDF dentro del límite", () => {
  const r = validateFile({ name: "cv.pdf", size: MAX_FILE_BYTES - 1 });
  assert.equal(r.ok, true);
});

test("acepta extensiones en mayúsculas", () => {
  assert.equal(validateFile({ name: "FOTO.PNG", size: 500 }).ok, true);
  assert.equal(validateFile({ name: "Hoja.PdF", size: 500 }).ok, true);
});

test("acepta todos los tipos permitidos", () => {
  for (const ext of ["pdf", "doc", "docx", "jpg", "jpeg", "png"]) {
    assert.equal(validateFile({ name: `a.${ext}`, size: 10 }).ok, true, ext);
  }
});

test("rechaza un tipo no permitido con mensaje claro", () => {
  const r = validateFile({ name: "virus.exe", size: 10 });
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.error, /Tipo de archivo no permitido/);
});

test("rechaza un archivo sin extensión", () => {
  assert.equal(validateFile({ name: "documento", size: 10 }).ok, false);
});

test("el tipo se valida antes que el tamaño", () => {
  // Un .exe enorme tiene que fallar por tipo, no por tamaño: es lo que permite
  // rechazarlo sin llegar a leerlo.
  const r = validateFile({ name: "virus.exe", size: MAX_FILE_BYTES * 10 });
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.error, /Tipo de archivo no permitido/);
});

test("rechaza un archivo que supera el límite por archivo", () => {
  const r = validateFile({ name: "grande.pdf", size: MAX_FILE_BYTES + 1 });
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.error, new RegExp(`${MAX_FILE_MB}MB`));
});

test("acepta exactamente en el límite por archivo", () => {
  assert.equal(validateFile({ name: "justo.pdf", size: MAX_FILE_BYTES }).ok, true);
});

test("rechaza cuando el total de documentos supera el máximo", () => {
  // Un archivo que SÍ cabe por sí solo, pero que rebasa el tope total al sumarse
  // a los ya adjuntos: así el caso prueba el límite total y no el por-archivo.
  const otros = MAX_TOTAL_BYTES - MAX_FILE_BYTES + 1;
  const r = validateFile({ name: "extra.pdf", size: MAX_FILE_BYTES }, otros);
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.error, new RegExp(`total.*${MAX_TOTAL_MB}MB`));
});

test("permite llegar justo al límite total", () => {
  const otros = MAX_TOTAL_BYTES - MAX_FILE_BYTES;
  assert.equal(validateFile({ name: "ok.pdf", size: MAX_FILE_BYTES }, otros).ok, true);
});

test("el tope total deja pasar al menos un archivo completo", () => {
  // Si alguien bajara MAX_TOTAL por debajo de MAX_FILE, un solo documento válido
  // sería irrechazablemente inválido. Esta relación tiene que sostenerse.
  assert.ok(MAX_TOTAL_BYTES >= MAX_FILE_BYTES);
});

test("validateExtension y validateSize funcionan por separado", () => {
  assert.equal(validateExtension("hoja.pdf").ok, true);
  assert.equal(validateExtension("hoja.exe").ok, false);
  assert.equal(validateSize(MAX_FILE_BYTES).ok, true);
  assert.equal(validateSize(MAX_FILE_BYTES + 1).ok, false);
});

test("solo las imágenes se marcan como comprimibles", () => {
  for (const n of ["foto.jpg", "foto.JPEG", "cedula.png"]) {
    assert.equal(isCompressible(n), true, n);
  }
  for (const n of ["cv.pdf", "carta.docx", "viejo.doc", "sinextension"]) {
    assert.equal(isCompressible(n), false, n);
  }
});

test("extensionOf normaliza y tolera nombres raros", () => {
  assert.equal(extensionOf("a.b.c.PDF"), "pdf");
  assert.equal(extensionOf("sinpunto"), "");
});
