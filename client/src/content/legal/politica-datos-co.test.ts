// Guardas del documento legal publicado. Su valor real es el día que peguen la
// V.03: avisan si se rompen las anclas públicas o si una sección queda vacía.
// Se ejecutan con: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import doc from "./politica-datos-co";
import type { LegalSection } from "./types";

function flatten(sections: LegalSection[]): LegalSection[] {
  return sections.flatMap((s) => [s, ...flatten(s.children ?? [])]);
}

const all = flatten(doc.sections);

test("tiene las 18 secciones numeradas del documento", () => {
  assert.equal(doc.sections.length, 18);
  assert.deepEqual(
    doc.sections.map((s) => s.number),
    Array.from({ length: 18 }, (_, i) => String(i + 1))
  );
});

test("los identificadores de ancla son únicos", () => {
  const ids = all.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("los identificadores se derivan del número de sección", () => {
  for (const section of all) {
    assert.match(section.id, /^sec-\d+(-\d+)?$/, section.id);
    assert.equal(section.id, `sec-${section.number.replace(".", "-")}`);
  }
});

test("ninguna sección queda sin contenido", () => {
  for (const section of all) {
    assert.ok(section.title.trim().length > 0, `sin título: ${section.id}`);
    assert.ok(
      section.blocks.length > 0 || (section.children?.length ?? 0) > 0,
      `sin bloques: ${section.id}`
    );
  }
});

test("no hay bloques de texto vacíos", () => {
  for (const section of all) {
    for (const block of section.blocks) {
      switch (block.kind) {
        case "p":
          assert.ok(block.text.length > 0, `párrafo vacío en ${section.id}`);
          break;
        case "list":
          assert.ok(block.items.length > 0, `lista vacía en ${section.id}`);
          break;
        case "defs":
          assert.ok(block.items.length > 0, `definiciones vacías en ${section.id}`);
          break;
      }
    }
  }
});

// La numeración de cada apartado la pone el renderer a partir de `number`. Si
// además viene escrita dentro del texto (como estaba el "6.1." del numeral 6)
// se ve duplicada o descuadrada respecto al resto del documento.
test("ninguna viñeta trae la numeración escrita dentro del texto", () => {
  for (const section of all) {
    for (const block of section.blocks) {
      if (block.kind !== "list") continue;
      for (const item of block.items) {
        const inicio = item[0]?.text ?? "";
        assert.doesNotMatch(
          inicio,
          /^\d+\.\d*\.?\s/,
          `viñeta numerada en ${section.id}: ${inicio.slice(0, 20)}`
        );
      }
    }
  }
});

test("tiene nota de cierre", () => {
  assert.ok(doc.footnote.trim().length > 0);
});
