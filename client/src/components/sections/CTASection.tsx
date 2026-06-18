import { Link } from "wouter";
import { ArrowRight, FileText } from "lucide-react";
import { useLocale } from "@client/lib/LocaleContext";

export default function CTASection() {
  const { content } = useLocale();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-balance">
              {content.cta.title}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              {content.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/30 hover:-translate-y-0.5"
              >
                Solicitar Cotización
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/empleo"
                className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/25 transition-all border border-white/20"
              >
                <FileText className="h-5 w-5" />
                Deja tu Hoja de Vida
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
