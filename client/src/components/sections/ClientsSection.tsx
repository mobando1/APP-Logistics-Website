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
    <section className="py-8 bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <span className="text-accent font-semibold text-xs uppercase tracking-wider">
            Confían en nosotros
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-primary mt-1">
            Nuestros Clientes
          </h2>
        </div>

        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 sm:gap-14">
            {loop.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 h-12 sm:h-14 flex items-center justify-center px-2"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-[130px] sm:max-w-[150px] object-contain"
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
