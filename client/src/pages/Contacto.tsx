import { useState } from "react";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";

const API_URL = "https://app-server-production-65d5.up.railway.app";

const sectores = [
  "Alimentos y Bebidas",
  "Químicos",
  "Farmacéutico",
  "Retail",
  "Manufactura",
  "Tecnología",
  "Construcción",
  "Otro",
];

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    asunto: "",
    empresa: "",
    sector: "",
    mensaje: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        nombreEmpresa: formData.empresa || formData.nombre,
        contactoNombre: formData.nombre,
        contactoEmail: formData.email,
        contactoTelefono: formData.telefono,
        servicioInteres: formData.asunto || formData.sector,
        mensaje: formData.mensaje,
      };

      const res = await fetch(`${API_URL}/api/cotizaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar");
      setSubmitted(true);
    } catch {
      setError("Error al enviar. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Hablemos
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            Contáctenos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Reciba un presupuesto que se ajuste a las necesidades de su
            operación o escríbanos a{" "}
            <a
              href="mailto:carlos.garcia@applogistics.com.co"
              className="text-accent font-medium hover:underline"
            >
              carlos.garcia@applogistics.com.co
            </a>
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border p-8 shadow-sm space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    required
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    required
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Sector Económico
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
                  >
                    <option value="">Seleccionar...</option>
                    {sectores.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-5">
                <a
                  href="tel:+573153402545"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Teléfono</p>
                    <p className="font-medium">(57) 315 340 25 45</p>
                  </div>
                </a>
                <a
                  href="mailto:info@applogistics.com.co"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Email</p>
                    <p className="font-medium">info@applogistics.com.co</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Oficina Central</p>
                    <p className="font-medium">Bogotá, Colombia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Cobertura</p>
                    <p className="font-medium">
                      Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/empleo"
              className="block bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6 text-center hover:border-accent/40 transition-all group"
            >
              <p className="text-accent font-bold mb-1 group-hover:underline">
                ¿Quieres trabajar con nosotros?
              </p>
              <p className="text-sm text-muted-foreground">
                Deja tu hoja de vida aquí
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
