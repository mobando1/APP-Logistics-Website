import ClientsSection from "../components/sections/ClientsSection";
import { useLocale } from "@client/lib/LocaleContext";

export default function NosotrosPage() {
  const { content } = useLocale();
  const { subtitle, paragraphs, closing, timeline } = content.nosotros;

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Nuestra historia
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
              Nosotros
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-primary max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="max-w-5xl mx-auto text-muted-foreground leading-relaxed columns-1 lg:columns-2 gap-10 [&>p]:mb-5 [&>p]:break-inside-avoid">
            {paragraphs.map((segments, i) => (
              <p key={i}>
                {segments.map((seg, j) =>
                  seg.bold ? (
                    <strong key={j} className="font-semibold text-primary">
                      {seg.text}
                    </strong>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
              </p>
            ))}
          </div>

          <p className="max-w-5xl mx-auto mt-10 text-center text-xl sm:text-2xl font-extrabold text-primary">
            {closing}
          </p>

          <div className="mt-24">
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Nuestra trayectoria
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-2">
                Más de una década creciendo
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="group bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30 transition-all duration-300"
                >
                  <span className="block text-4xl font-extrabold text-accent leading-none">
                    {item.year}
                  </span>
                  <div className="w-10 h-1 bg-accent/30 rounded-full my-4 group-hover:w-16 group-hover:bg-accent transition-all duration-300" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClientsSection />
    </>
  );
}
