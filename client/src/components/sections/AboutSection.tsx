import { GraduationCap, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "@client/lib/LocaleContext";

const valorIcons = [GraduationCap, ShieldCheck, Award];

export default function AboutSection() {
  const { content } = useLocale();
  const valores = content.about.valores.map((v, i) => ({
    ...v,
    icon: valorIcons[i] ?? Award,
  }));
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Sobre nosotros
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-6">
              {content.about.heading}
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              {content.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 hover:gap-3 transition-all"
            >
              Conoce más sobre nosotros
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-5">
            {valores.map((valor) => (
              <div
                key={valor.title}
                className="flex items-start gap-4 bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <valor.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">{valor.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {valor.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
