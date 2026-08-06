// Tests de las rutas que solo existen en Colombia.
// Se ejecutan con: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  POLITICA_DATOS_PATH,
  isCoOnlyPath,
  stripEsPrefix,
} from "./coOnlyPaths";

test("stripEsPrefix quita el prefijo de España", () => {
  assert.equal(stripEsPrefix("/es"), "/");
  assert.equal(stripEsPrefix("/es/servicios"), "/servicios");
  assert.equal(stripEsPrefix("/es/politica-tratamiento-datos"), POLITICA_DATOS_PATH);
});

test("stripEsPrefix no toca las rutas de Colombia", () => {
  assert.equal(stripEsPrefix("/"), "/");
  assert.equal(stripEsPrefix("/servicios"), "/servicios");
  // No debe confundir una ruta que empiece por "es" sin ser el prefijo.
  assert.equal(stripEsPrefix("/especiales"), "/especiales");
});

test("reconoce la política y su alias, con y sin prefijo", () => {
  for (const path of [
    "/politica-tratamiento-datos",
    "/es/politica-tratamiento-datos",
    "/privacidad",
    "/es/privacidad",
    "/politica-tratamiento-datos/", // barra final
  ]) {
    assert.equal(isCoOnlyPath(path), true, path);
  }
});

test("las demás rutas no son solo-Colombia", () => {
  for (const path of ["/", "/es", "/servicios", "/es/empleo", "/contacto"]) {
    assert.equal(isCoOnlyPath(path), false, path);
  }
});
