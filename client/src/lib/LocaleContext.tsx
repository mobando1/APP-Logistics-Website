import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./locale-routing";
import { content } from "@client/content";
import type { LocaleContent } from "@client/content/types";

interface LocaleContextValue {
  locale: Locale;
  content: LocaleContent;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, content: content[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale debe usarse dentro de <LocaleProvider>");
  }
  return ctx;
}
