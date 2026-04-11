import { Truck, Package, Warehouse, ClipboardList, Boxes, GraduationCap } from "lucide-react";
import { cn } from "@client/lib/utils";

const services = [
  {
    icon: Truck,
    title: "Distribución de Mercancías",
    description:
      "En APP Logistics, sabemos que somos el último eslabón en la cadena logística, por eso nuestro personal posee las competencias necesarias para la entrega final y así poder transmitir la calidad y confianza que nuestros clientes han depositado en nosotros. Realizamos entregas en Clientes estratégicos, grandes superficies, operaciones Tienda A Tienda (TAT) con la responsabilidad y agilidad que cada pedido requiere.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Package,
    title: "Cargue y Descargue de Mercancías",
    description:
      "Ofrecemos servicios en el punto que nuestro cliente lo requiera para realizar cargues y descargues de productos en modo masivo o unitario y de cualquier tipo de mercancía. El personal de APP Logistics está comprometido con el mejoramiento continuo, por ello realizamos análisis continuos sobre nuestras operaciones con el fin de proponer mejoras para este tipo de actividades, de esta manera disminuir tiempos y por ende costos para nuestros clientes.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop",
    color: "from-orange-500/10 to-orange-600/5",
    iconColor: "text-accent",
  },
  {
    icon: Warehouse,
    title: "Operaciones en Bodega",
    description:
      "APP Logistics realiza capacitaciones permanentes, al personal para integrar sus competencias y de esta manera apoyar las diferentes actividades que se llevan a cabo al interior de un centro de distribución o bodega tales como alistamiento de pedidos, embalajes, recepción de devoluciones, ubicación de mercancía, etc. Por eso los jefes de operación que están a cada uno de nuestros clientes se sienten en gran parte gracias al apoyo que les podemos brindar.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: ClipboardList,
    title: "Inventarios",
    description:
      "El inventario es uno de los activos más importantes que puede tener una empresa, de este depende la continuidad del servicio y la producción de un bien, es por esto que se debe tener un control exhaustivo sobre este y es allí donde APP Logistics entra a realizar un apoyo a sus clientes ya que tenemos personal con experiencia en la toma de inventarios y en el uso de herramientas tecnológicas tales como terminales de RF que permiten optimizar tiempos y mejorar considerablemente la calidad de la información capturada.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  {
    icon: Boxes,
    title: "Acondicionamiento Secundario",
    description:
      "Con el objeto de integrar servicios complementarios, hemos iniciado procesos de acondicionamiento secundario, apoyando a nuestros clientes en actividades como reempacado, toma de seriales y reacondicionamiento.",
    image: "https://images.unsplash.com/photo-1590247813693-5541d1c573ef?w=600&h=400&fit=crop",
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-600",
  },
  {
    icon: GraduationCap,
    title: "Asesorías y Capacitación",
    description:
      "APP Logistics pone a la disposición un equipo experto en diferentes áreas de la cadena logística, cuyo objetivo primordial es potenciar las oportunidades de mejora que tiene cada operación, trabajando facultados enfocados a aumentar capacidades, mejorar costos y disminuir tiempos de respuesta a los clientes.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
];

export default function ServiciosPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Lo que hacemos
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Apoyamos tu cadena logística con personal operativo capacitado y
            comprometido con la mejora continua de tus procesos.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={cn(
                "flex flex-col gap-8 items-center",
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              <div className="lg:w-5/12">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              <div className="lg:w-7/12">
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-5",
                    "bg-gradient-to-br",
                    service.color
                  )}
                >
                  <service.icon className={cn("h-7 w-7", service.iconColor)} />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
