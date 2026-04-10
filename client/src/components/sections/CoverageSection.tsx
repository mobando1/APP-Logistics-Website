import { MapPin } from "lucide-react";

const cities = [
  { name: "Bogotá", detail: "Oficina central" },
  { name: "Medellín", detail: "Desde enero 2020" },
  { name: "Cali", detail: "Desde marzo 2022" },
  { name: "Barranquilla", detail: "Desde marzo 2022" },
];

export default function CoverageSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold italic mb-4">
          Donde nos encontramos
        </h2>
        <p className="text-white/80 mb-10 max-w-4xl leading-relaxed">
          Nuestra oficina central se encuentra en la ciudad de Bogotá en enero
          de 2020 realizamos la apertura de nuestra agencia en la ciudad de
          Medellín y en marzo de 2022 iniciamos operaciones en las ciudades de
          Cali y Barranquilla.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cities.map((city) => (
            <div
              key={city.name}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-colors"
            >
              <MapPin className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-1">{city.name}</h3>
              <p className="text-sm text-white/70">{city.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-white/60">
          <span>Seguir a</span>
          <a
            href="https://twitter.com/applogistics_co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 font-medium"
          >
            @applogistics.co
          </a>
        </div>
      </div>
    </section>
  );
}
