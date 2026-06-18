import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, Mail, CheckCircle2, FileText } from "lucide-react";
import { useLocale } from "@client/lib/LocaleContext";

const SEEN_KEY = "vacancyPopupSeen";

export default function JobVacancyPopup() {
  const { content } = useLocale();
  const vacancy = content.vacancy;
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  // Mostrar una vez por sesión, tras un pequeño retardo. Solo si hay vacante (Colombia)
  // y no estamos ya en la página de empleo.
  useEffect(() => {
    if (!vacancy) return;
    if (location === "/empleo") return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* sessionStorage no disponible: igual mostramos una vez por carga */
    }
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, [vacancy, location]);

  // Bloquear el scroll del fondo mientras el pop-up está abierto.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!vacancy || !open) return null;

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignorar */
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={vacancy.title}
    >
      <div
        className="relative w-full max-w-sm max-h-[92vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-primary to-[#0f2440] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner con imagen de referencia */}
        <div className="relative h-28 sm:h-32 overflow-hidden">
          <img
            src={vacancy.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
          <span className="absolute top-2.5 left-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Oferta laboral
          </span>
          <div className="absolute bottom-2 left-3 right-3 bg-white rounded-md py-1.5 px-3 text-center">
            <h2 className="text-lg sm:text-xl font-extrabold tracking-wide text-primary leading-none">
              {vacancy.title}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-5">
          <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-white/80">
            Puesto de trabajo en la ciudad de {vacancy.city}
          </p>

          <div className="mt-3">
            <h3 className="text-accent font-bold text-sm mb-1">Buscamos</h3>
            <ul className="space-y-0.5">
              {vacancy.buscamos.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-white/90">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <h3 className="text-accent font-bold text-sm mb-1">Requisitos</h3>
            <ul className="space-y-0.5">
              {vacancy.requisitos.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-white/90">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <h3 className="text-accent font-bold text-sm mb-1">Beneficios</h3>
            <ul className="space-y-0.5">
              {vacancy.beneficios.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-white/90">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <img
              src="/logo-app-blanco.png"
              alt="APP Logistics"
              className="h-6 w-auto shrink-0"
            />
            <a
              href={`mailto:${vacancy.email}`}
              className="inline-flex items-center gap-1.5 text-[11px] text-white/80 hover:text-accent transition-colors truncate"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{vacancy.email}</span>
            </a>
          </div>

          <Link
            href="/empleo"
            onClick={close}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent/30"
          >
            <FileText className="h-4 w-4" />
            Deja tu HV
          </Link>
        </div>
      </div>
    </div>
  );
}
