// Locale (país) por ruta: Colombia en la raíz "/", España bajo "/es".
export type Locale = "co" | "es";

export const LOCALE_BASE: Record<Locale, string> = {
  co: "",
  es: "/es",
};

const COOKIE_NAME = "locale";

// Deriva el locale a partir del pathname. Solo el prefijo "/es" cuenta como España.
export function localeFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "co";
}

// Quita el prefijo "/es" para obtener la ruta relativa (la misma página en el otro locale).
export function stripBase(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

// Construye el destino equivalente en el locale objetivo, conservando la misma página.
export function localizedPath(target: Locale, pathname: string): string {
  const rel = stripBase(pathname);
  if (target === "co") return rel;
  return rel === "/" ? "/es" : "/es" + rel;
}

export function setLocalePreference(locale: Locale) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${oneYear}; SameSite=Lax`;
  try {
    localStorage.setItem(COOKIE_NAME, locale);
  } catch {
    /* localStorage puede no estar disponible; la cookie es suficiente */
  }
}
