// Tests del reintento degradado: cuando RASTREO no reconoce los campos de la
// autorización, el lead se reenvía sin ellos y la constancia se traslada a un
// campo de texto. Lo que se prueba aquí es que no se pierda ni la constancia ni
// lo que la persona escribió.
// Se ejecutan con: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { degradeConsent, hasConsentFields } from "./leads";

const leadConAutorizacion = {
  primerNombre: "Juan",
  comentarios: "Disponible desde el lunes.",
  autorizacionDatos: true,
  autorizacionDatosVersion: "POL-PAE-02 V. 02",
  autorizacionDatosFecha: "2026-08-06T14:22:31.918Z",
};

test("detecta si el lead trae los campos de autorización", () => {
  assert.equal(hasConsentFields(leadConAutorizacion), true);
  assert.equal(hasConsentFields({ primerNombre: "Juan" }), false);
});

test("quita los tres campos de autorización", () => {
  const out = degradeConsent(leadConAutorizacion, "comentarios");
  assert.equal("autorizacionDatos" in out, false);
  assert.equal("autorizacionDatosVersion" in out, false);
  assert.equal("autorizacionDatosFecha" in out, false);
});

test("conserva lo que escribió la persona y añade la constancia", () => {
  const out = degradeConsent(leadConAutorizacion, "comentarios");
  const comentarios = String(out.comentarios);
  assert.match(comentarios, /Disponible desde el lunes\./);
  assert.match(comentarios, /Autorización de tratamiento de datos aceptada/);
  assert.match(comentarios, /POL-PAE-02 V\. 02/);
  assert.match(comentarios, /2026-08-06T14:22:31\.918Z/);
});

test("no deja el campo con un salto de línea suelto si venía vacío", () => {
  const out = degradeConsent({ ...leadConAutorizacion, comentarios: "" }, "comentarios");
  assert.match(String(out.comentarios), /^Autorización de tratamiento/);
});

test("funciona con el campo de la cotización y no toca el resto del lead", () => {
  const out = degradeConsent(
    { nombreEmpresa: "ACME", mensaje: "Necesito cotización.", ...leadConAutorizacion },
    "mensaje"
  );
  assert.equal(out.nombreEmpresa, "ACME");
  assert.equal(out.primerNombre, "Juan");
  assert.match(String(out.mensaje), /Necesito cotización\./);
  assert.match(String(out.mensaje), /Autorización de tratamiento de datos aceptada/);
});

test("no muta el objeto original", () => {
  const original = { ...leadConAutorizacion };
  degradeConsent(original, "comentarios");
  assert.equal(original.autorizacionDatos, true);
  assert.equal(original.comentarios, "Disponible desde el lunes.");
});
