import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@client/lib/utils";
import { useLocale } from "@client/lib/LocaleContext";
import {
  type Locale,
  localizedPath,
  setLocalePreference,
} from "@client/lib/locale-routing";

const OPTIONS: { locale: Locale; label: string; iso: string }[] = [
  { locale: "co", label: "Colombia", iso: "co" },
  { locale: "es", label: "España", iso: "es" },
];

export default function LocaleSwitcher({
  className,
}: {
  className?: string;
}) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const current = OPTIONS.find((o) => o.locale === locale) ?? OPTIONS[0];

  const switchTo = (target: Locale) => {
    setOpen(false);
    if (target === locale) return;
    setLocalePreference(target);
    const dest =
      localizedPath(target, window.location.pathname) +
      window.location.search +
      window.location.hash;
    // Navegación completa: cruza el "base" de wouter y deja que el server
    // y el contexto se reinicialicen con el nuevo locale.
    window.location.assign(dest);
  };

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambiar país"
        className="flex items-center gap-1.5 border rounded-lg px-2.5 py-2 text-sm bg-white hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
      >
        <img
          src={`https://flagcdn.com/24x18/${current.iso}.png`}
          alt={current.label}
          className="w-5 h-auto rounded-sm"
        />
        <span className="hidden sm:inline text-foreground/80 font-medium">
          {current.label}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">
          <ul>
            {OPTIONS.map((o) => (
              <li key={o.locale}>
                <button
                  type="button"
                  onClick={() => switchTo(o.locale)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left hover:bg-muted transition-colors",
                    o.locale === locale && "font-semibold text-accent"
                  )}
                >
                  <img
                    src={`https://flagcdn.com/24x18/${o.iso}.png`}
                    alt=""
                    className="w-5 h-auto rounded-sm shrink-0"
                  />
                  <span className="flex-1 text-foreground">{o.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
