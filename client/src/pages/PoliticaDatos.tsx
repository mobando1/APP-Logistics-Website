import { useEffect } from "react";
import { Printer } from "lucide-react";
import { useLocale } from "@client/lib/LocaleContext";
import { usePageMeta } from "@client/lib/usePageMeta";
import { politicaDatos, POLITICA_DATOS_PATH } from "@client/content/legal";
import LegalDocView from "@client/components/legal/LegalDocView";

export default function PoliticaDatosPage() {
  const { locale } = useLocale();
  const doc = politicaDatos[locale];

  usePageMeta({
    title: doc
      ? `${doc.title} | APP Logistics SAS`
      : "Política de Protección de Datos | APP Logistics",
    description:
      "Política de protección y tratamiento de datos personales de APP LOGISTICS SAS (POL-PAE-02 V. 02), conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015.",
    canonical:
      typeof window !== "undefined"
        ? `${window.location.origin}${POLITICA_DATOS_PATH}`
        : undefined,
  });

  // Enlaces profundos en carga fría (p. ej. /politica-tratamiento-datos#sec-10).
  // Mismo patrón que Servicios.tsx; ScrollToTop ya se abstiene cuando hay hash.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    }
  }, []);

  // Solo debería ocurrir si algún día se enruta la página en un país sin
  // documento publicado (hoy las rutas existen únicamente en Colombia).
  if (!doc) {
    return (
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-4">
            Política no disponible
          </h1>
          <p className="text-muted-foreground">
            La política de protección de datos para este país aún no está
            publicada.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            {doc.title}
          </h1>
          {doc.subtitle && (
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              {doc.subtitle}
            </p>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary border border-border rounded-xl px-4 py-2 hover:border-accent hover:text-accent transition-colors print:hidden"
          >
            <Printer className="h-4 w-4" />
            Imprimir / Guardar PDF
          </button>
        </header>

        <LegalDocView doc={doc} />
      </div>
    </section>
  );
}
