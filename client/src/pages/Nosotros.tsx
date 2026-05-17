import { Shield, GraduationCap, TrendingUp, Award, CheckCircle } from "lucide-react";
import ClientsSection from "../components/sections/ClientsSection";

const timeline = [
  { year: "2012", event: "Fundación en Bogotá como empresa 100% colombiana" },
  { year: "2020", event: "Apertura de agencia en Medellín" },
  { year: "2022", event: "Inicio de operaciones en Cali y Barranquilla" },
  { year: "Hoy", event: "+100 clientes satisfechos en todo Colombia" },
];

const certifications = [
  "Buenas Prácticas de Manufactura, Transporte y Almacenamiento",
  "Seguridad Industrial",
  "Certificación SENA en despacho de mercancías",
  "En proceso: certificación en cargue y descargue",
  "SG-SST al 90% de implementación",
  "Permisos de trabajo en alturas (Ministerio de Trabajo)",
  "Miembros del Frente de Seguridad Empresarial - Policía Nacional",
  "Procesos basados en BASC Capítulo Bogotá",
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

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                APP Logistics es una empresa 100% colombiana, que nace en 2012
                como una solución para todo tipo de empresas que ven
                oportunidades de mejora en diferentes procesos logísticos como
                el cargue y descargue de mercancías, operaciones de bodega,
                maquila, inventarios entre otros.
              </p>
              <p>
                A lo largo de estos años nos hemos especializado en procesos de
                distribución, cubicaje, reportes, diligenciamiento de formatos,
                radicación de facturación y diferentes requerimientos de
                nuestros clientes, que nos ha permitido permanecer en el
                mercado.
              </p>
              <p>
                Permanentemente capacitamos a nuestro personal en Buenas
                Prácticas (Manufactura, Transporte, Almacenamiento) y
                Seguridad, lo que nos permite entregar un servicio óptimo;
                actualmente el 95% de nuestro
                personal tiene certificación expedida por el SENA en "Despachar
                mercancías según métodos de preparación de pedidos y sistema de
                gestión".
              </p>
              <p>
                Trabajamos constantemente para garantizar que todos nuestros
                procesos sean realizados bajo el cumplimiento de la normatividad
                nacional vigente aplicable en materia de seguridad y salud en el
                trabajo como lo son Garantía de Calidad del Sistema General de
                Riesgos Laborales.
              </p>
              <p>
                En APP Logistics estamos comprometidos con la seguridad para
                nuestros clientes, razón por la cual somos miembros activos del
                Frente de Seguridad Empresarial de la Policía Nacional de
                Colombia y basamos nuestros procesos en sus pilares y principios
                BASC Capítulo Bogotá.
              </p>
            </div>

            <div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-10">
                  {timeline.map((item) => (
                    <div key={item.year} className="relative pl-12">
                      <div className="absolute left-0 w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-md shadow-accent/25">
                        {item.year.length <= 4
                          ? item.year.slice(-2)
                          : item.year.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-accent">
                          {item.year}
                        </span>
                        <p className="text-muted-foreground mt-1">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-3xl p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">
                  Certificaciones y Compromisos
                </h2>
                <p className="text-sm text-muted-foreground">
                  Nuestro compromiso con la calidad y la seguridad
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-start gap-3 bg-white rounded-xl px-4 py-3"
                >
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{cert}</span>
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
