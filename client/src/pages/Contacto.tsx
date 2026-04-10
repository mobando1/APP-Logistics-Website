import { useState } from "react";
import { Link } from "wouter";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend API
    alert("Mensaje enviado. Nos pondremos en contacto pronto.");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold italic text-primary mb-4 border-b pb-4">
          Contáctenos
        </h1>

        <p className="text-muted-foreground mb-8">
          Contáctenos para recibir un presupuesto que se ajuste a las
          necesidades de su operación o escríbanos a{" "}
          <a
            href="mailto:carlos.garcia@applogistics.com.co"
            className="text-accent font-medium hover:underline"
          >
            carlos.garcia@applogistics.com.co
          </a>
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre *"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full bg-primary text-white placeholder:text-white/60 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono *"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full bg-primary text-white placeholder:text-white/60 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-primary text-white placeholder:text-white/60 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              name="asunto"
              placeholder="Asunto *"
              required
              value={formData.asunto}
              onChange={handleChange}
              className="w-full bg-primary text-white placeholder:text-white/60 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              name="empresa"
              placeholder="Empresa *"
              required
              value={formData.empresa}
              onChange={handleChange}
              className="w-full bg-primary text-white placeholder:text-white/60 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full bg-primary text-white/60 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
            >
              <option value="">Sector Económico</option>
              {sectores.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              rows={5}
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full bg-primary text-white placeholder:text-white/60 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-accent text-white px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity"
              >
                Enviar
              </button>
            </div>
          </form>

          <div className="hidden lg:flex items-start justify-center">
            <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-5xl font-extrabold text-primary mb-2">
                  APP
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  Logistics SAS
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/empleo"
            className="inline-block border-2 border-accent text-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors w-full text-center"
          >
            Si deseas trabajar con nosotros haz click aquí
          </Link>
        </div>
      </div>
    </section>
  );
}
