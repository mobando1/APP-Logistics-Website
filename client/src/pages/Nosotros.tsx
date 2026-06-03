import ClientsSection from "../components/sections/ClientsSection";

const timeline = [
  { year: "2012", event: "Fundación en Bogotá como empresa 100% colombiana" },
  { year: "2020", event: "Apertura de agencia en Medellín" },
  { year: "2022", event: "Inicio de operaciones en Cali y Barranquilla" },
  {
    year: "2026",
    event:
      "En expansión: nueva cobertura en Cartagena y Bucaramanga y proyección internacional hacia España",
  },
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
            <p className="text-lg sm:text-xl font-semibold text-primary max-w-3xl mx-auto">
              APP Logistics: precisión, confianza y excelencia operativa
            </p>
          </div>

          <div className="max-w-5xl mx-auto text-muted-foreground leading-relaxed columns-1 lg:columns-2 gap-10 [&>p]:mb-5 [&>p]:break-inside-avoid">
            <p>
              <strong className="font-semibold text-primary">APP Logistics</strong> es
              una compañía 100% colombiana fundada en 2012, especializada en
              soluciones logísticas integrales diseñadas para optimizar la
              operación de empresas que buscan mayor eficiencia, control y
              productividad en su cadena de suministro.
            </p>
            <p>
              Durante más de una década hemos acompañado a organizaciones de
              distintos sectores, fortaleciendo procesos estratégicos como{" "}
              <strong className="font-semibold text-primary">
                cargue y descargue de mercancías, operaciones de bodega, picking
                &amp; packing, maquila, gestión de inventarios, distribución,
                cubicaje, trazabilidad documental, radicación de facturación y
                ejecución de procesos operativos especializados
              </strong>
              , adaptándonos a los requerimientos particulares de cada cliente.
            </p>
            <p>
              Nuestra permanencia y crecimiento en el mercado son el resultado de
              una operación construida sobre tres pilares fundamentales:{" "}
              <strong className="font-semibold text-primary">
                excelencia operativa, talento humano calificado y estricto
                cumplimiento normativo.
              </strong>
            </p>
            <p>
              Contamos con un equipo altamente capacitado y en formación
              permanente en{" "}
              <strong className="font-semibold text-primary">
                Buenas Prácticas de Manufactura, almacenamiento, transporte,
                manipulación de alimentos y seguridad operativa
              </strong>
              . Actualmente, el{" "}
              <strong className="font-semibold text-primary">
                65% de nuestro personal cuenta con certificación expedida por el
                SENA en "Despachar mercancías según métodos de preparación de
                pedidos y sistema de gestión"
              </strong>
              , garantizando ejecución técnica, eficiencia y confiabilidad en
              cada operación.
            </p>
            <p>
              En APP Logistics desarrollamos todos nuestros procesos bajo el
              cumplimiento riguroso de la normatividad colombiana vigente en{" "}
              <strong className="font-semibold text-primary">
                Seguridad y Salud en el Trabajo
              </strong>
              , alineados con los estándares mínimos del Sistema General de
              Riesgos Laborales y bajo una cultura organizacional orientada a la
              mejora continua y la prevención.
            </p>
            <p>
              La seguridad y la confianza de nuestros clientes son prioridad. Por
              ello, somos{" "}
              <strong className="font-semibold text-primary">
                miembros activos del Frente de Seguridad Empresarial de la Policía
                Nacional de Colombia
              </strong>{" "}
              y estructuramos nuestra operación bajo los principios y lineamientos{" "}
              <strong className="font-semibold text-primary">
                BASC Capítulo Bogotá
              </strong>
              , fortaleciendo entornos logísticos seguros, transparentes y
              confiables.
            </p>
            <p>
              Hoy, con presencia en las principales ciudades de Colombia y
              proyección internacional hacia Europa,{" "}
              <strong className="font-semibold text-primary">
                APP Logistics evoluciona para convertirse en el aliado estratégico
                que impulsa operaciones más eficientes, seguras y competitivas.
              </strong>
            </p>
          </div>

          <p className="max-w-5xl mx-auto mt-10 text-center text-xl sm:text-2xl font-extrabold text-primary">
            Transformamos procesos logísticos en ventajas competitivas.
          </p>

          <div className="mt-24">
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Nuestra trayectoria
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-2">
                Más de una década creciendo
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="group bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30 transition-all duration-300"
                >
                  <span className="block text-4xl font-extrabold text-accent leading-none">
                    {item.year}
                  </span>
                  <div className="w-10 h-1 bg-accent/30 rounded-full my-4 group-hover:w-16 group-hover:bg-accent transition-all duration-300" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
