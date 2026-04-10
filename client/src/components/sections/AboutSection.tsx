import { Shield, GraduationCap, TrendingUp, Award } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "95% Certificado SENA",
    text: 'Personal con certificación en "Despachar mercancías según métodos de preparación de pedidos y sistema de gestión".',
  },
  {
    icon: Shield,
    title: "Seguridad BASC",
    text: "Miembros activos del Frente de Seguridad Empresarial de la Policía Nacional. Procesos basados en BASC Capítulo Bogotá.",
  },
  {
    icon: Award,
    title: "SG-SST al 90%",
    text: "Avance del 90% en implementación del Sistema de Gestión de Seguridad y Salud en el Trabajo. Permisos para trabajo en alturas.",
  },
  {
    icon: TrendingUp,
    title: "Mejora Continua",
    text: "Análisis constante de operaciones para proponer mejoras que reduzcan tiempos y costos para nuestros clientes.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Sobre nosotros
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-6">
              Empresa 100% colombiana desde 2012
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                APP Logistics nace en 2012 como una solución para todo tipo de
                empresas que ven oportunidades de mejora en diferentes procesos
                logísticos como el cargue y descargue de mercancías, operaciones
                de bodega, maquila, inventarios entre otros.
              </p>
              <p>
                A lo largo de estos años nos hemos especializado en procesos de
                distribución, cubicaje, reportes, diligenciamiento de formatos,
                radicación de facturación y diferentes requerimientos de
                nuestros clientes.
              </p>
              <p>
                Capacitamos permanentemente a nuestro personal en Buenas
                Prácticas (Manufactura, Transporte, Almacenamiento),
                Manipulación de Alimentos y Seguridad para entregar un servicio
                óptimo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-muted hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
