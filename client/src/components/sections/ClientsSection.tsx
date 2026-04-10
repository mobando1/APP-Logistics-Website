const clients = [
  "Brenntag",
  "Grupo Phoenix",
  "Conquímica",
  "Pochteca Colombia",
  "Premex",
];

export default function ClientsSection() {
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

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {clients.map((client) => (
            <div
              key={client}
              className="group px-8 py-5 bg-muted hover:bg-primary rounded-xl transition-all duration-300 cursor-default"
            >
              <span className="text-lg font-bold text-primary group-hover:text-white transition-colors">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
