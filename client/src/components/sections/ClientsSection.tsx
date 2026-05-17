const clients = [
  { name: "Brenntag", logo: "/clientes/brenntag.png" },
  { name: "Grupo Phoenix", logo: "/clientes/GrupoPhoenix.png" },
  { name: "Conquímica", logo: "/clientes/Conquimica.png" },
  { name: "Pochteca Colombia", logo: "/clientes/photeca.jpg" },
  { name: "Premex", logo: "/clientes/premex.jpeg" },
];

export default function ClientsSection() {
  const loop = [...clients, ...clients];

  return (
    <section className="py-16 bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Confían en nosotros
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-2">
            Nuestros Clientes
          </h2>
        </div>

        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 sm:gap-16">
            {loop.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 h-20 sm:h-24 flex items-center justify-center px-4"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-[180px] sm:max-w-[200px] object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
