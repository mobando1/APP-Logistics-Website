import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 bg-primary rounded-sm"
                  />
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
                APP Logistics
              </h1>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Expertos en manipulación de mercancía
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Apoyamos tu cadena logística fortaleciendo uno de los eslabones
              más débiles de la misma: las operaciones de cargue y descargue de
              mercancías. Nos hemos especializado en esta operación con el
              objetivo de dar tranquilidad a nuestros clientes y al mercado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cotizacion"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity"
              >
                Solicitar Cotización
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary/30 text-primary px-8 py-3 rounded-lg text-base font-semibold hover:bg-primary/5 transition-colors"
              >
                Nuestros Servicios
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl font-extrabold text-accent mb-2">
                  +14
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  Años de experiencia
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Empresa 100% colombiana desde 2012
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="max-w-7xl mx-auto">
          <nav className="flex">
            {[
              { label: "Inicio", href: "/" },
              { label: "Servicios", href: "/servicios" },
              { label: "Nosotros", href: "/nosotros" },
              { label: "Contáctenos", href: "/contacto" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 text-center py-3 text-white text-sm font-medium hover:bg-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
