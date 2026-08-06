// Rutas que solo existen en la versión Colombia.
//
// FUENTE ÚNICA DE VERDAD: la usan el servidor (para no empujar estas rutas a
// "/es" y para redirigir a quien llegue con el prefijo) y el cliente (enlaces
// del footer, check de autorización, selector de país). Tenerlas en un solo
// lugar evita que se desincronicen.
//
// Hoy solo es la política de datos: es un documento colombiano (Ley 1581 de
// 2012) y España no tiene todavía su versión RGPD/LOPDGDD. Mientras tanto, a un
// visitante de España se le atiende con el documento colombiano en lugar de
// dejarle un 404.

export const POLITICA_DATOS_PATH = "/politica-tratamiento-datos";

export const CO_ONLY_PATHS: readonly string[] = [
  POLITICA_DATOS_PATH,
  "/privacidad", // alias
];

const ES_BASE = "/es";

/** Quita el prefijo "/es" de una ruta. "/es/x" -> "/x", "/es" -> "/". */
export function stripEsPrefix(pathname: string): string {
  if (pathname === ES_BASE) return "/";
  if (pathname.startsWith(ES_BASE + "/")) return pathname.slice(ES_BASE.length);
  return pathname || "/";
}

/** ¿La ruta (con o sin prefijo "/es") es una de las que solo existen en Colombia? */
export function isCoOnlyPath(pathname: string): boolean {
  const withoutTrailingSlash = stripEsPrefix(pathname).replace(/\/+$/, "");
  return CO_ONLY_PATHS.includes(withoutTrailingSlash || "/");
}
