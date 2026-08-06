// Busca los *.test.ts y se los pasa al runner nativo de Node.
//
// Antes esto era `find ... ` dentro del script de npm: funcionaba en CI (Linux)
// pero en Windows npm ejecuta los scripts con cmd.exe, donde `find` es otro
// programa que se queda esperando entrada y el `npm test` nunca terminaba.
// Hacerlo desde Node evita depender del shell y de que la versión de turno
// acepte globs en `--test`.
import { readdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const RAICES = ["client", "server", "shared"];

function buscarTests(dir) {
  const encontrados = [];
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    if (entrada.name === "node_modules") continue;
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...buscarTests(ruta));
    else if (entrada.name.endsWith(".test.ts")) encontrados.push(ruta);
  }
  return encontrados;
}

const tests = RAICES.filter(existsSync).flatMap(buscarTests);

if (tests.length === 0) {
  console.error("No se encontró ningún archivo *.test.ts en:", RAICES.join(", "));
  process.exit(1);
}

const { status } = spawnSync(
  process.execPath,
  ["--import", "tsx", "--test", ...tests],
  { stdio: "inherit" },
);

process.exit(status ?? 1);
