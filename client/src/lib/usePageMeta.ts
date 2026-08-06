import { useEffect } from "react";

// Gestión mínima del <head> por página, sin dependencias: fija title,
// description, canonical y robots al montar y restaura los valores previos al
// desmontar. El sitio es una SPA sin prerender, así que esto solo lo ve un
// crawler que ejecute JS (Googlebot sí lo hace).

interface PageMeta {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string; // p. ej. "noindex"
}

/** Crea la etiqueta si no existe y devuelve el valor anterior para restaurarlo. */
function upsertMeta(name: string, value: string): () => void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  const created = !el;
  const previous = el?.content ?? "";

  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = value;

  return () => {
    if (created) el?.remove();
    else if (el) el.content = previous;
  };
}

function upsertCanonical(href: string): () => void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const created = !el;
  const previous = el?.href ?? "";

  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;

  return () => {
    if (created) el?.remove();
    else if (el) el.href = previous;
  };
}

export function usePageMeta({ title, description, canonical, robots }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const restore: Array<() => void> = [];
    if (description) restore.push(upsertMeta("description", description));
    if (robots) restore.push(upsertMeta("robots", robots));
    if (canonical) restore.push(upsertCanonical(canonical));

    return () => {
      document.title = previousTitle;
      restore.forEach((fn) => fn());
    };
  }, [title, description, canonical, robots]);
}

export default usePageMeta;
