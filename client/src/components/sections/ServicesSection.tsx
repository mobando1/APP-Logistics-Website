import { Truck, Package, Warehouse, ClipboardList, Boxes, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@client/lib/utils";

const services = [
  {
    icon: Truck,
    title: "Distribución de Mercancías",
    description:
      "Personal idóneo para procesos de distribución urbana, entrega de pedidos, operaciones Tienda A Tienda.",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Package,
    title: "Cargue y Descargue",
    description:
      "Apoyo a cargue y descargue de todo tipo de mercancía y de todo tipo de vehículos: Tractomulas, Minimulas, Dobletroque, Sencillos, Turbos.",
    color: "from-orange-500/10 to-orange-600/5",
    iconColor: "text-accent",
  },
  {
    icon: Warehouse,
    title: "Apoyo en Bodega",
    description:
      "Personal para actividades de picking, packing, ubicación de mercancía en bodega, devoluciones, inventarios.",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: ClipboardList,
    title: "Inventarios",
    description:
      "Personal con experiencia en toma de inventarios y uso de terminales de RF para optimizar tiempos y calidad de información.",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  {
    icon: Boxes,
    title: "Acondicionamiento Secundario",
    description:
      "Servicios de reempacado, toma de seriales y reacondicionamiento para integrar servicios complementarios.",
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-600",
  },
  {
    icon: GraduationCap,
    title: "Asesorías y Capacitación",
    description:
      "Equipo experto para potenciar oportunidades de mejora, aumentar capacidades y disminuir tiempos de respuesta.",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Lo que hacemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cubrimos toda la cadena logística con personal capacitado y
            comprometido con la mejora continua.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href="/servicios"
              className={cn(
                "group relative p-8 rounded-2xl border border-transparent",
                "bg-gradient-to-br",
                service.color,
                "hover:border-border hover:shadow-lg transition-all duration-300",
                "hover:-translate-y-1 cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-5",
                  "bg-white shadow-sm group-hover:shadow-md transition-shadow"
                )}
              >
                <service.icon className={cn("h-7 w-7", service.iconColor)} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Ver más <span className="text-lg">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
