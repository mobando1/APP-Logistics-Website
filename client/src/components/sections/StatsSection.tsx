import { Calendar, Award, Users, MapPin, Boxes, Truck, type LucideIcon } from "lucide-react";
import CountUp from "@client/components/ui/CountUp";
import { useLocale } from "@client/lib/LocaleContext";

const statIcons: Record<string, LucideIcon> = {
  experiencia: Calendar,
  certificado: Award,
  clientes: Users,
  cobertura: MapPin,
  cajas: Boxes,
  vehiculos: Truck,
};

export default function StatsSection() {
  const { content } = useLocale();
  const stats = content.stats;
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => {
            const Icon = statIcons[stat.key] ?? Award;
            return (
              <div key={stat.key} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1">
                  {stat.value === null ? (
                    <span>—</span>
                  ) : (
                    <CountUp
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-sm font-semibold text-white/90 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-white/50">{stat.detail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
