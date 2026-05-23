import { MapPin } from "lucide-react";

const cities = [
  {
    name: "Bogotá",
    detail: "Oficina central",
    image: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=400&h=300&fit=crop",
  },
  {
    name: "Medellín",
    detail: "",
    image: "https://images.unsplash.com/photo-1633627425472-d07ac65e2a36?w=400&h=300&fit=crop",
  },
  {
    name: "Cali",
    detail: "",
    image: "https://images.unsplash.com/photo-1728588519059-a62e06050425?w=400&h=300&fit=crop",
  },
  {
    name: "Barranquilla",
    detail: "",
    image: "https://images.unsplash.com/photo-1548372007-09f87bdf7a35?w=400&h=300&fit=crop",
  },
];

export default function CoverageSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Cobertura nacional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            Donde nos encontramos
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Nuestra oficina central se encuentra en Bogotá. En enero de 2020
            abrimos en Medellín y en marzo de 2022 iniciamos operaciones en
            Cali y Barranquilla.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <div
              key={city.name}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-accent" />
                  <h3 className="text-xl font-bold text-white">
                    {city.name}
                  </h3>
                </div>
                {city.detail && (
                  <p className="text-sm text-white/70">{city.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
