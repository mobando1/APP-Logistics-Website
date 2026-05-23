import ClientsSection from "../components/sections/ClientsSection";

const timeline = [
  { year: "2012", event: "Fundación en Bogotá como empresa 100% colombiana" },
  { year: "2020", event: "Apertura de agencia en Medellín" },
  { year: "2022", event: "Inicio de operaciones en Cali y Barranquilla" },
  { year: "2026", event: "+100 clientes satisfechos en todo Colombia" },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Nuestra historia
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
              Nosotros
            </h1>
          </div>

          <div className="max-w-5xl mx-auto text-muted-foreground leading-relaxed columns-1 lg:columns-2 gap-10 [&>p]:mb-5 [&>p]:break-inside-avoid">
            <p>
              APP Logistics es una empresa 100% colombiana, que nace en 2012
              como una solución para todo tipo de empresas que ven oportunidades
              de mejora en diferentes procesos logísticos como el cargue y
              descargue de mercancías, operaciones de bodega, maquila,
              inventarios entre otros.
            </p>
            <p>
              A lo largo de estos años nos hemos especializado en procesos de
              distribución, cubicaje, reportes, diligenciamiento de formatos,
              radicación de facturación y diferentes requerimientos de nuestros
              clientes, que nos ha permitido permanecer en el mercado.
            </p>
            <p>
              Permanentemente capacitamos a nuestro personal en Buenas Prácticas
              (manufactura, transporte, almacenamiento), manipulación de
              alimentos y seguridad, lo que nos permite entregar un servicio
              óptimo; actualmente el 95% de nuestro personal tiene certificación
              expedida por el SENA en "Despachar mercancías según métodos de
              preparación de pedidos y sistema de gestión".
            </p>
            <p>
              Trabajamos constantemente para garantizar que todos nuestros
              procesos sean realizados bajo el cumplimiento de la normatividad
              nacional vigente aplicable en materia de seguridad y salud en el
              trabajo, en armonía con los estándares mínimos del Sistema
              Obligatorio de Garantía de Calidad del Sistema General de Riesgos
              Laborales.
            </p>
            <p>
              En APP Logistics estamos comprometidos con la seguridad para
              nuestros clientes, razón por la cual somos miembros activos del
              Frente de Seguridad Empresarial de la Policía Nacional de Colombia
              y basamos nuestros procesos en sus pilares y principios BASC
              Capítulo Bogotá.
            </p>
          </div>

          <div className="mt-24">
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Nuestra trayectoria
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-2">
                Más de una década creciendo
              </h2>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative">
                {timeline.map((item) => (
                  <div
                    key={item.year}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-br from-accent to-orange-600 text-white flex items-center justify-center text-xl font-extrabold shadow-lg shadow-accent/30 ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                      {item.year.slice(-2)}
                    </div>
                    <span className="block text-lg font-bold text-primary mt-5">
                      {item.year}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1.5 max-w-[220px] leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsSection />
    </>
  );
}
