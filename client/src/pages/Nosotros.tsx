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

          <div className="max-w-4xl mx-auto space-y-5 text-muted-foreground leading-relaxed">
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

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-primary text-center mb-12">
              Nuestra trayectoria
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {timeline.map((item) => (
                <div key={item.year} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-accent text-white flex items-center justify-center text-lg font-extrabold shadow-md shadow-accent/25 mb-4">
                    {item.year.slice(-2)}
                  </div>
                  <span className="block text-base font-bold text-accent">
                    {item.year}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClientsSection />
    </>
  );
}
