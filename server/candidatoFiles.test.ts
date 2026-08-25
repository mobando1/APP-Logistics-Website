// Tests del guard de archivos del servidor: la última barrera antes de reenviar
// la postulación a RASTREO.
//
// Existe porque la validación del navegador se puede saltar (basta con un POST
// directo a /api/lead/candidato), y los documentos que entran por aquí acaban en
// la ficha del empleado cuando el candidato es contratado. Si este guard se
// desincroniza del límite compartido, el tope deja de existir de verdad.
// Se ejecutan con: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateCandidatoFiles } from "./leads";
import {
  FILE_URL_FIELDS,
  MAX_FILE_BYTES,
  MAX_FILE_MB,
  MAX_TOTAL_BYTES,
  MAX_TOTAL_MB,
} from "../shared/fileLimits";

// Construye un data URL base64 cuyo contenido pesa EXACTAMENTE los bytes pedidos,
// redondeados hacia abajo al múltiplo de 3 más cercano (3 bytes crudos = 4
// caracteres base64 sin relleno). Que sea exacto importa: si el helper se pasara
// aunque fuera por un byte, los casos del tope total fallarían por el límite
// por-archivo y dejarían de probar lo que dicen probar.
function dataUrlDe(bytes: number, mime = "application/pdf"): string {
  const exactos = bytes - (bytes % 3);
  const b64 = "A".repeat((exactos / 3) * 4);
  return `data:${mime};base64,${b64}`;
}

test("acepta una postulación sin adjuntos", () => {
  assert.equal(validateCandidatoFiles({ primerNombre: "Juan" }), null);
});

test("acepta un documento dentro del límite", () => {
  const r = validateCandidatoFiles({ hojaVidaUrl: dataUrlDe(MAX_FILE_BYTES - 1024) });
  assert.equal(r, null);
});

test("rechaza un documento que supera el límite por archivo", () => {
  const r = validateCandidatoFiles({ hojaVidaUrl: dataUrlDe(MAX_FILE_BYTES + 1024) });
  assert.ok(r);
  assert.match(r!, new RegExp(`${MAX_FILE_MB}MB`));
});

test("rechaza un tipo de archivo no permitido", () => {
  const r = validateCandidatoFiles({
    hojaVidaUrl: dataUrlDe(1024, "image/svg+xml"),
  });
  assert.ok(r);
  assert.match(r!, /tipo de archivo no permitido/i);
});

test("suma todos los documentos para el tope total", () => {
  // Documentos que caben de sobra por separado, pero que juntos rebasan el tope.
  // El número sale de las constantes para que el caso siga probando el límite
  // TOTAL aunque mañana cambien: con un tope por archivo que divide justo al
  // total, hacen falta uno más de los que caben.
  const cuantos = Math.floor(MAX_TOTAL_BYTES / MAX_FILE_BYTES) + 1;
  assert.ok(
    cuantos <= FILE_URL_FIELDS.length,
    "no hay campos suficientes para rebasar el tope total"
  );
  const body: Record<string, unknown> = {};
  for (const field of FILE_URL_FIELDS.slice(0, cuantos)) {
    body[field] = dataUrlDe(MAX_FILE_BYTES);
  }
  const r = validateCandidatoFiles(body);
  assert.ok(r);
  assert.match(r!, new RegExp(`total.*${MAX_TOTAL_MB}MB`));
});

test("ignora los campos que no son data URLs base64", () => {
  // Una URL real de storage (lo que reenvía RASTREO) no se valida por tamaño.
  const r = validateCandidatoFiles({
    hojaVidaUrl: "https://storage.example.com/cv.pdf",
    documentoIdentidadUrl: null,
  });
  assert.equal(r, null);
});
