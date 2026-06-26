// Tests de la validación de archivos del formulario de postulación.
// Se ejecutan con: npm test  (usa el runner nativo de Node + tsx, sin libs extra).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateFile,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  MAX_FILE_MB,
  MAX_TOTAL_MB,
} from "./fileValidation";

test("acepta un PDF dentro del límite", () => {
  const r = validateFile({ name: "cv.pdf", size: 1_000_000 });
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

test("rechaza un archivo que supera el límite por archivo", () => {
  const r = validateFile({ name: "grande.pdf", size: MAX_FILE_BYTES + 1 });
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.error, new RegExp(`${MAX_FILE_MB}MB`));
});

test("acepta exactamente en el límite por archivo", () => {
  assert.equal(validateFile({ name: "justo.pdf", size: MAX_FILE_BYTES }).ok, true);
});

test("rechaza cuando el total de documentos supera el máximo", () => {
  // Ya hay 30MB adjuntos; agregar 6MB más supera los 35MB totales.
  const otros = 30 * 1024 * 1024;
  const r = validateFile({ name: "extra.pdf", size: 6 * 1024 * 1024 }, otros);
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.error, new RegExp(`total.*${MAX_TOTAL_MB}MB`));
});

test("permite llegar justo al límite total", () => {
  const otros = MAX_TOTAL_BYTES - 1_000_000;
  assert.equal(validateFile({ name: "ok.pdf", size: 1_000_000 }, otros).ok, true);
});
