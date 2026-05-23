import { Truck, Package, Warehouse, ClipboardList, Boxes, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@client/lib/utils";

const services = [
  {
    id: "distribucion",
    icon: Truck,
    title: "Distribución de Mercancías",
    description:
      "Personal idóneo para procesos de distribución urbana, entrega de pedidos, operaciones Tienda A Tienda.",
    image: "/servicios/distribucion.jpg",
    iconColor: "text-blue-600",
  },
  {
    id: "cargue-descargue",
    icon: Package,
    title: "Cargue y Descargue",
    description:
      "Apoyo a cargue y descargue de todo tipo de mercancía y de todo tipo de vehículos: Tractomulas, Minimulas, Dobletroque, Sencillos, Turbos.",
    image: "/servicios/cargue-descargue.jpg",
    iconColor: "text-accent",
  },
  {
    id: "bodega",
    icon: Warehouse,
    title: "Operaciones en Bodega",
    description:
      "Personal para actividades de picking, packing, ubicación de mercancía en bodega, devoluciones, inventarios.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    iconColor: "text-emerald-600",
  },
  {
    id: "inventarios",
    icon: ClipboardList,
    title: "Inventarios",
    description:
      "Personal con experiencia en toma de inventarios y uso de terminales de RF para optimizar tiempos y calidad de información.",
    image: "/servicios/inventarios.jpg",
    iconColor: "text-violet-600",
  },
  {
    id: "acondicionamiento",
    icon: Boxes,
    title: "Acondicionamiento Secundario",
    description:
      "Servicios de reempacado, toma de seriales y reacondicionamiento para integrar servicios complementarios.",
    image: "/servicios/acondicionamiento.jpg",
    iconColor: "text-rose-600",
  },
  {
    id: "asesorias",
    icon: GraduationCap,
    title: "Asesorías y Capacitación",
    description:
      "Equipo experto para potenciar oportunidades de mejora, aumentar capacidades y disminuir tiempos de respuesta.",
    image: "/servicios/asesorias.jpg",
    iconColor: "text-amber-600",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <Link
              key={service.title}
              href={`/servicios#${service.id}`}
              className={cn(
                "group relative flex flex-col rounded-2xl overflow-hidden",
                "bg-white border border-border",
                "hover:shadow-xl hover:-translate-y-1 hover:border-primary/20",
                "transition-all duration-300 cursor-pointer"
              )}
            >
              <div className="relative overflow-hidden h-44 sm:h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {service.description}
                </p>
                <div className="mt-4 text-sm font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver más <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
