import {
  Truck,
  Package,
  Warehouse,
  ClipboardList,
  Boxes,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

// Presentación (icono, imagen, color) de cada servicio, mapeada por id.
// El texto (título, corto, largo) vive en el contenido por país.
export interface ServicePresentation {
  icon: LucideIcon;
  image: string;
  color: string; // gradiente del recuadro del icono (página Servicios)
  iconColor: string;
}

export const servicePresentation: Record<string, ServicePresentation> = {
  distribucion: {
    icon: Truck,
    image: "/servicios/distribucion.jpg",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  "cargue-descargue": {
    icon: Package,
    image: "/servicios/cargue-descargue.jpg",
    color: "from-orange-500/10 to-orange-600/5",
    iconColor: "text-accent",
  },
  bodega: {
    icon: Warehouse,
    image: "/servicios/bodega.jpg",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  inventarios: {
    icon: ClipboardList,
    image: "/servicios/inventarios.jpg",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  acondicionamiento: {
    icon: Boxes,
    image: "/servicios/acondicionamiento.jpg",
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-600",
  },
  asesorias: {
    icon: GraduationCap,
    image: "/servicios/asesorias.jpg",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
};
