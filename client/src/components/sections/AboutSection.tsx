import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold italic text-primary mb-8 border-b pb-4">
          Nosotros
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              APP Logistics es una empresa 100% colombiana, que nace en 2012
              como una solución para todo tipo de empresas que ven oportunidades
              de mejora en diferentes procesos logísticos como el cargue y
              descargue de mercancías, operaciones de bodega, maquila, inventarios
              entre otros.
            </p>
            <p>
              A lo largo de estos años nos hemos especializado en procesos de
              distribución, cubicaje, reportes, diligenciamiento de formatos,
              radicación de facturación y diferentes requerimientos de nuestros
              clientes, que nos ha permitido permanecer en el mercado.
            </p>
            <p>
              Permanentemente capacitamos a nuestro personal en Buenas Prácticas
              (Manufactura, Transporte, Almacenamiento), Manipulación de Alimentos,
              Seguridad y esto lo que nos permite para entregar un servicio óptimo;
              actualmente el 95% de nuestro personal tiene certificación expedida
              por el SENA en "Despachar mercancías según métodos de preparación de
              pedidos y sistema de gestión". Actualmente estamos en proceso de
              certificación de competencias para "cargue y descargue de mercancías".
            </p>
            <p>
              Trabajamos constantemente para garantizar que todos nuestros procesos
              sean realizados bajo el cumplimiento de la normatividad nacional vigente
              aplicable en materia de seguridad y salud en el trabajo como lo son
              Garantía de Calidad del Sistema General de Riesgos Laborales. Actualmente
              tenemos un avance del 90% en la implementación del SG-SST y contamos
              con permisos para trabajo en alturas expedido por el Ministerio de Trabajo.
            </p>
            <p>
              En APP Logistics estamos comprometidos con la seguridad para nuestros
              clientes, razón por la cual somos miembros activos del Frente de Seguridad
              Empresarial de la Policía Nacional de Colombia y basamos nuestros procesos
              en sus pilares y principios BASC Capítulo Bogotá.
            </p>
          </div>

          <div>
            <div className="bg-accent text-white rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">
                Solicite una Cotización
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0" />
                  <span className="font-medium">(57) 315 340 25 45</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">
                    info@applogistics.com.co
                  </span>
                </div>
              </div>
              <Link
                href="/contacto"
                className="block text-center bg-white text-accent font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                Contáctenos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
