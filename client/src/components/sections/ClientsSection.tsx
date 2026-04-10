const clients = [
  "Brenntag",
  "Grupo Phoenix",
  "Conquímica",
  "Pochteca Colombia",
  "Premex",
];

export default function ClientsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold italic text-primary mb-8 border-b pb-4">
          Nuestros Clientes
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {clients.map((client) => (
            <div
              key={client}
              className="px-6 py-4 bg-muted rounded-lg text-primary font-bold text-lg"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
