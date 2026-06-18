import { Link } from "wouter";
import { cn } from "@client/lib/utils";
import { useLocale } from "@client/lib/LocaleContext";
import { servicePresentation } from "@client/lib/servicePresentation";

export default function ServicesSection() {
  const { content } = useLocale();
  const services = content.services.map((s) => ({
    ...s,
    image: servicePresentation[s.id]?.image,
  }));
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Lo que hacemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cubrimos toda la cadena logística con personal capacitado y
            comprometido con la mejora continua.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={`/servicios#${service.id}`}
              className={cn(
                "group relative flex flex-col rounded-2xl overflow-hidden",
                "bg-white border border-border",
                "hover:shadow-xl hover:-translate-y-1 hover:border-primary/20",
                "transition-all duration-300 cursor-pointer"
              )}
            >
              <div className="relative overflow-hidden h-44 sm:h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {service.short}
                </p>
                <div className="mt-4 text-sm font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver más <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
