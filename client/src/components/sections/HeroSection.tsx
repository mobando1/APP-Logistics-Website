import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLocale } from "@client/lib/LocaleContext";

export default function HeroSection() {
  const { content } = useLocale();
  const highlights = content.hero.highlights;
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-primary/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            {content.hero.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up animation-delay-100 text-balance">
            Expertos en{" "}
            <span className="text-accent">manipulación de mercancía</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed animate-fade-in-up animation-delay-200 max-w-xl">
            Apoyamos la cadena logística fortaleciendo uno de los eslabones más
            débiles de la misma: las operaciones de cargue y descargue de
            mercancías. Nos hemos especializado en esta operación con el objetivo
            de dar tranquilidad a nuestros clientes y al mercado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up animation-delay-300">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5"
            >
              Solicitar Cotización
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/25 transition-all border border-white/20"
            >
              Conoce Nuestros Servicios
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in-up animation-delay-400">
            {highlights.map((h) => (
              <div
                key={h}
                className="flex items-center gap-2 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2"
              >
                <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
