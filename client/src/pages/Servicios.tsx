import {
  Truck,
  Package,
  Warehouse,
  ClipboardList,
  Boxes,
  GraduationCap,
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Distribución de Mercancías",
    description:
      "En APP Logistics, sabemos que somos el último eslabón en la cadena logística, por eso nuestro personal posee las competencias necesarias para la entrega final y así poder transmitir la calidad y confianza que nuestros clientes han depositado en nosotros. Realizamos entregas en Clientes estratégicos, grandes superficies, operaciones Tienda A Tienda (TAT) con la responsabilidad y agilidad que cada pedido requiere.",
  },
  {
    icon: Package,
    title: "Cargue y Descargue de Mercancías",
    description:
      "Ofrecemos servicios en el punto que nuestro cliente lo requiera para realizar cargues y descargues de productos en modo masivo o unitario y de cualquier tipo de mercancía. El personal de APP Logistics está comprometido con el mejoramiento continuo, por ello realizamos análisis continuos sobre nuestras operaciones con el fin de proponer mejoras para este tipo de actividades, de esta manera disminuir tiempos y por ende costos para nuestros clientes.",
  },
  {
    icon: Warehouse,
    title: "Operaciones en Bodega",
    description:
      "APP Logistics realiza capacitaciones permanentes, al personal para integrar sus competencias y de esta manera apoyar las diferentes actividades que se llevan a cabo al interior de un centro de distribución o bodega tales como alistamiento de pedidos, embalajes, recepción de devoluciones, ubicación de mercancía, etc. Por eso los jefes de operación que están a cada uno de nuestros clientes se sienten en gran parte gracias al apoyo que les podemos brindar.",
  },
  {
    icon: ClipboardList,
    title: "Inventarios",
    description:
      "El inventario es uno de los activos más importantes que puede tener una empresa, de este depende la continuidad del servicio y la producción de un bien, es por esto que se debe tener un control exhaustivo sobre este y es allí donde APP Logistics entra a realizar un apoyo a sus clientes ya que tenemos personal con experiencia en la toma de inventarios y en el uso de herramientas tecnológicas tales como terminales de RF que permiten optimizar tiempos y mejorar considerablemente la calidad de la información capturada.",
  },
  {
    icon: Boxes,
    title: "Acondicionamiento Secundario",
    description:
      "Con el objeto de integrar servicios complementarios, hemos iniciado procesos de acondicionamiento secundario, apoyando a nuestros clientes en actividades como reempacado, toma de seriales y reacondicionamiento.",
  },
  {
    icon: GraduationCap,
    title: "Asesorías y Capacitación",
    description:
      "APP Logistics pone a la disposición un equipo experto en diferentes áreas de la cadena logística, cuyo objetivo primordial es potenciar las oportunidades de mejora que tiene cada operación, trabajando facultados enfocados a aumentar capacidades, mejorar costos y disminuir tiempos de respuesta a los clientes.",
  },
];

export default function ServiciosPage() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold italic text-primary mb-10 border-b pb-4">
          Servicios
        </h1>

        <div className="space-y-12">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="md:w-1/3">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                  <service.icon className="h-20 w-20 text-primary/30" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold text-primary mb-3">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
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
