import { Truck, Package, Warehouse, ClipboardList, Boxes, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@client/lib/utils";

const services = [
  {
    icon: Truck,
    title: "Distribución de Mercancías",
    description:
      "Personal idóneo para procesos de distribución urbana, entrega de pedidos, operaciones Tienda A Tienda.",
  },
  {
    icon: Package,
    title: "Cargue y Descargue",
    description:
      "Apoyo a cargue y descargue de todo tipo de mercancía (Bultos, cajas, rollos, etc.) y de todo tipo de vehículos (Tractomulas, Minimulas, Dobletroque, Sencillos, Turbos).",
  },
  {
    icon: Warehouse,
    title: "Apoyo en Bodega",
    description:
      "Personal para actividades de picking, packing, ubicación de mercancía en bodega, devoluciones, inventarios.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <service.icon className="h-16 w-16 text-primary/40" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href="/servicios"
                  className="inline-block bg-primary text-white px-6 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Lee más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
