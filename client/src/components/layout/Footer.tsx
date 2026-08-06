import { Link } from "wouter";
import { MapPin, Phone, Mail, Shield, ArrowUpRight } from "lucide-react";
import { useLocale } from "@client/lib/LocaleContext";
import { politicaDatos, POLITICA_DATOS_PATH } from "@client/content/legal";

export default function Footer() {
  const { locale, content } = useLocale();
  // El enlace legal solo se muestra donde hay política publicada (hoy, Colombia).
  const hasPoliticaDatos = Boolean(politicaDatos[locale]);

  return (
    <footer className="bg-[#0f2440] text-white print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src="/logo-app-blanco.png"
                alt="APP Logistics"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              {content.footerDescription}
            </p>
            <div className="flex items-start gap-2 text-xs text-white/40">
              <Shield className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{content.footerCertifications}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/90 mb-5">
              Servicios
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="hover:text-accent transition-colors cursor-default">
                Distribución de Mercancías
              </li>
              <li className="hover:text-accent transition-colors cursor-default">
                Cargue y Descargue
              </li>
              <li className="hover:text-accent transition-colors cursor-default">
                Operaciones en Bodega
              </li>
              <li className="hover:text-accent transition-colors cursor-default">
                Inventarios
              </li>
              <li className="hover:text-accent transition-colors cursor-default">
                Acondicionamiento Secundario
              </li>
              <li className="hover:text-accent transition-colors cursor-default">
                Asesorías y Capacitación
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/90 mb-5">
              Empresa
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { label: "Nosotros", href: "/nosotros" },
                { label: "Servicios", href: "/servicios" },
                { label: "Contáctenos", href: "/contacto" },
                { label: "Deja tu Hoja de Vida", href: "/empleo" },
                ...(hasPoliticaDatos
                  ? [
                      {
                        label: "Política de Protección de Datos",
                        href: POLITICA_DATOS_PATH,
                      },
                    ]
                  : []),
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/90 mb-5">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span>{content.footerCities}</span>
              </li>
              {!content.contact.hidePhone && (
                <li>
                  <a
                    href={`tel:${content.contact.phoneTel}`}
                    className="flex items-center gap-3 hover:text-accent transition-colors"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-accent" />
                    {content.contact.phoneDisplay}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <Mail className="h-5 w-5 shrink-0 text-accent" />
                  {content.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {content.companyLegalName}. Todos
            los derechos reservados.
          </span>
          {hasPoliticaDatos && (
            <Link
              href={POLITICA_DATOS_PATH}
              className="text-xs text-white/40 hover:text-accent transition-colors"
            >
              Política de Protección de Datos
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
