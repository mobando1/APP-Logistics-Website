import { useEffect } from "react";
import { Truck, Package, Warehouse, ClipboardList, Boxes, GraduationCap } from "lucide-react";
import { cn } from "@client/lib/utils";

const services = [
  {
    id: "distribucion",
    icon: Truck,
    title: "Distribución de Mercancías",
    description:
      "En APP Logistics, sabemos que somos el último eslabón en la cadena logística, por eso nuestro personal posee las competencias necesarias para la entrega final y así poder transmitir la calidad y confianza que nuestros clientes han depositado en nosotros. Realizamos entregas en Clientes estratégicos, grandes superficies, operaciones Tienda A Tienda (TAT) con la responsabilidad y agilidad que cada pedido requiere.",
    image: "/servicios/distribucion.jpg",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    id: "cargue-descargue",
    icon: Package,
    title: "Cargue y Descargue de Mercancías",
    description:
      "Ofrecemos servicios en el punto que nuestro cliente lo requiera para realizar cargues y descargues de productos en modo masivo o unitario y de cualquier tipo de mercancía. El personal de APP Logistics está comprometido con el mejoramiento continuo, por ello realizamos análisis continuos sobre nuestras operaciones con el fin de proponer mejoras para este tipo de actividades, de esta manera disminuir tiempos y por ende costos para nuestros clientes.",
    image: "/servicios/cargue-descargue.jpg",
    color: "from-orange-500/10 to-orange-600/5",
    iconColor: "text-accent",
  },
  {
    id: "bodega",
    icon: Warehouse,
    title: "Operaciones en Bodega",
    description:
      "Conscientes de la volatilidad del mercado, APP Logistics realiza capacitaciones permanentes al personal para mejorar sus competencias y de esta manera apoyar las diferentes actividades que se llevan a cabo al interior de un centro de distribución o bodega tales como alistamiento de pedidos, embalajes, recepción de devoluciones, ubicación de mercancía, etc. Por esto los picos de operación que tiene cada uno de nuestros clientes se alivian en gran parte gracias al apoyo que les podemos brindar.",
    image: "/servicios/bodega.jpg",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    id: "inventarios",
    icon: ClipboardList,
    title: "Inventarios",
    description:
      "El inventario es uno de los activos más importantes que puede tener una empresa, de este depende la continuidad del servicio y la producción de un bien, es por esto que se debe tener un control exhaustivo sobre este y es allí donde APP Logistics entra a realizar un apoyo a sus clientes ya que tenemos personal con experiencia en la toma de inventarios y en el uso y desarrollo de herramientas que permiten optimizar tiempos y mejorar considerablemente la calidad de la información capturada.",
    image: "/servicios/inventarios.jpg",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  {
    id: "acondicionamiento",
    icon: Boxes,
    title: "Acondicionamiento Secundario",
    description:
      "Con el objeto de integrar servicios complementarios, hemos iniciado procesos de acondicionamiento secundario, apoyando a nuestros clientes en actividades como reempacado, toma de seriales y reacondicionamiento.",
    image: "/servicios/acondicionamiento.jpg",
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-600",
  },
  {
    id: "asesorias",
    icon: GraduationCap,
    title: "Asesorías y Capacitación",
    description:
      "APP Logistics pone a la disposición un equipo experto en diferentes áreas de la cadena logística, cuyo objetivo primordial es potenciar las oportunidades de mejora que tiene cada operación, trabajando facultados enfocados a aumentar capacidades, mejorar costos y disminuir tiempos de respuesta a los clientes.",
    image: "/servicios/asesorias.jpg",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
];

export default function ServiciosPage() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    }
  }, []);

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
              id={service.id}
              className={cn(
                "flex flex-col gap-8 items-center scroll-mt-24",
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
