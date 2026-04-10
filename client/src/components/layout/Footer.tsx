import { Link } from "wouter";
import { MapPin, Phone, Mail, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm" />
                ))}
              </div>
              <span className="text-lg font-bold">APP Logistics SAS</span>
            </div>
            <p className="text-sm opacity-80 mb-3">
              Empresa 100% colombiana fundada en 2012. Expertos en manipulación
              de mercancía.
            </p>
            <div className="flex items-center gap-2 text-xs opacity-70">
              <Shield className="h-4 w-4 shrink-0" />
              <span>
                Frente de Seguridad Empresarial | BASC Capítulo Bogotá
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Servicios</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Distribución de Mercancías</li>
              <li>Cargue y Descargue</li>
              <li>Operaciones en Bodega</li>
              <li>Inventarios</li>
              <li>Acondicionamiento Secundario</li>
              <li>Asesorías y Capacitación</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/nosotros" className="hover:opacity-100">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:opacity-100">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/empleo" className="hover:opacity-100">
                  Deja tu Hoja de Vida
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:opacity-100">
                  Contáctenos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Bogotá | Medellín | Cali | Barranquilla
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                (57) 315 340 25 45
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                info@applogistics.com.co
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} APP Logistics SAS. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
}
