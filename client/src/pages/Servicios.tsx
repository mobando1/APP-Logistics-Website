import { useEffect } from "react";
import { cn } from "@client/lib/utils";
import { useLocale } from "@client/lib/LocaleContext";
import { servicePresentation } from "@client/lib/servicePresentation";

export default function ServiciosPage() {
  const { content } = useLocale();
  const services = content.services.map((s) => ({
    ...s,
    ...servicePresentation[s.id],
  }));

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

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Lo que hacemos
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            {content.servicesIntro.title}
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            {content.servicesIntro.subtitle}
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, i) => (
            <div
              key={service.title}
              id={service.id}
              className={cn(
                "flex flex-col gap-8 items-center scroll-mt-24",
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              <div className="w-full lg:w-5/12">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              <div className="w-full lg:w-7/12">
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-5",
                    "bg-gradient-to-br",
                    service.color
                  )}
                >
                  <service.icon className={cn("h-7 w-7", service.iconColor)} />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {service.long}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
