import { Calendar, Award, Users, MapPin } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "+14",
    label: "Años de experiencia",
    detail: "Desde 2012",
  },
  {
    icon: Award,
    value: "95%",
    label: "Personal certificado",
    detail: "Certificación SENA",
  },
  {
    icon: Users,
    value: "100+",
    label: "Clientes satisfechos",
    detail: "En todo Colombia",
  },
  {
    icon: MapPin,
    value: "4",
    label: "Ciudades de cobertura",
    detail: "Y creciendo",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <stat.icon className="h-7 w-7 text-accent" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white/90 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-white/50">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
