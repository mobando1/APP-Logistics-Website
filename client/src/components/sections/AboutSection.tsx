import { Award, TrendingUp } from "lucide-react";

type Highlight = {
  title: string;
  text: string;
  logo?: string;
  icon?: typeof Award;
};

const highlights: Highlight[] = [
  {
    title: "95% Certificado SENA",
    text: 'Personal con certificación en "Despachar mercancías según métodos de preparación de pedidos y sistema de gestión".',
    logo: "/certificaciones/sena.svg",
  },
  {
    title: "Seguridad BASC",
    text: "Miembros activos del Frente de Seguridad Empresarial de la Policía Nacional. Procesos basados en BASC Capítulo Bogotá.",
    logo: "/certificaciones/basc.svg",
  },
  {
    title: "SG-SST al 90%",
    text: "Avance del 90% en implementación del Sistema de Gestión de Seguridad y Salud en el Trabajo. Permisos para trabajo en alturas.",
    icon: Award,
  },
  {
    title: "Mejora Continua",
    text: "Análisis constante de operaciones para proponer mejoras que reduzcan tiempos y costos para nuestros clientes.",
    icon: TrendingUp,
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8 group">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=600&fit=crop"
                alt="Equipo APP Logistics en operación"
                loading="lazy"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

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
                className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 p-2">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : item.icon ? (
                    <item.icon className="h-6 w-6 text-accent" />
                  ) : null}
                </div>
                <h3 className="font-bold text-primary mb-2 text-sm">
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
