import { useState } from "react";
import { Upload, Send, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import CountryCodeSelect from "@client/components/ui/CountryCodeSelect";

const API_URL = "https://app-server-production-65d5.up.railway.app";

const cargos = [
  "Auxiliar de operaciones",
  "Montacarguista",
  "Conductor",
  "Auxiliar administrativo",
];

const tiposDocumento = ["Cédula", "PEP"];

const ciudades = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Otra",
];

const identidadGenero = [
  "Masculino",
  "Femenino",
  "No binario",
  "Prefiero no decir",
];

const grupoEtnico = [
  "Ninguno",
  "Afrocolombiano",
  "Indígena",
  "Raizal",
  "Palenquero",
  "Rom/Gitano",
  "Prefiero no decir",
];

const orientacionSexual = [
  "Heterosexual",
  "Homosexual",
  "Bisexual",
  "Prefiero no decir",
];

function FileUpload({
  label,
  name,
  onChange,
  fileName,
}: {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      <label className="flex items-center justify-center gap-2 bg-accent/90 hover:bg-accent text-white px-5 py-3 rounded-xl cursor-pointer transition-colors text-sm font-medium">
        <Upload className="h-4 w-4" />
        {fileName || "Cargar archivo"}
        <input
          type="file"
          name={name}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={onChange}
          className="hidden"
        />
      </label>
      <p className="text-xs text-muted-foreground mt-1.5">
        Tamaño máximo de archivo 2MB
      </p>
    </div>
  );
}

export default function EmpleoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "Cédula",
    documento: "",
    email: "",
    codigoPais: "+57",
    telefono: "",
    cargo: "",
    ciudad: "",
    identidadGenero: "",
    grupoEtnico: "",
    orientacionSexual: "",
    fechaDisponible: "",
    comentarios: "",
  });

  const [fileNames, setFileNames] = useState<Record<string, string>>({
    documentoIdentidad: "",
    hojaVida: "",
    medidasCorrectivas: "",
    antecedentes: "",
  });
  const [fileData, setFileData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileNames({ ...fileNames, [e.target.name]: file.name });
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileData((prev) => ({ ...prev, [e.target.name]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Split nombre into primer/segundo
      const nombreParts = formData.nombre.trim().split(/\s+/);
      const apellidoParts = formData.apellido.trim().split(/\s+/);

      const payload = {
        primerNombre: nombreParts[0] || "",
        segundoNombre: nombreParts.slice(1).join(" ") || null,
        primerApellido: apellidoParts[0] || "",
        segundoApellido: apellidoParts.slice(1).join(" ") || null,
        tipoDocumento: formData.tipoDocumento === "PEP" ? "PEP" : "CC",
        numeroDocumento: formData.documento,
        celular: `${formData.codigoPais} ${formData.telefono}`.trim(),
        email: formData.email,
        ciudad: formData.ciudad,
        cargoAspira: formData.cargo,
        experiencia: [
          formData.comentarios,
          formData.identidadGenero ? `Género: ${formData.identidadGenero}` : "",
          formData.grupoEtnico ? `Etnia: ${formData.grupoEtnico}` : "",
          formData.orientacionSexual ? `Orientación: ${formData.orientacionSexual}` : "",
          formData.fechaDisponible ? `Disponible desde: ${formData.fechaDisponible}` : "",
        ].filter(Boolean).join("\n"),
        hojaVidaUrl: fileData.hojaVida || null,
        hojaVidaNombre: fileNames.hojaVida || null,
      };

      const res = await fetch(`${API_URL}/api/candidatos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al enviar");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">¡Hoja de vida enviada!</h2>
          <p className="text-muted-foreground">
            Gracias por tu interés en APP Logistics. Revisaremos tu información y nos pondremos en contacto contigo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Únete al equipo
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
            Deja tu Hoja de Vida
          </h1>
          <p className="text-muted-foreground text-lg">
            APP Logistics ha implementado un portal exclusivo para que las
            personas que deseen participar en procesos de selección, registren
            su hoja de vida.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm mb-2">
                Recuerde:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-amber-700">
                <li>
                  APP Logistics SAS no utiliza intermediarios para realizar
                  procesos de selección o vinculación de personal.
                </li>
                <li>
                  Por ningún motivo APP Logistics SAS solicita dinero o
                  cualquier otro tipo de beneficio para estudiar, analizar o
                  seleccionar a sus candidatos para las diferentes
                  convocatorias.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border p-8 shadow-sm space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                required
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Tipo de documento
              </label>
              <select
                name="tipoDocumento"
                required
                value={formData.tipoDocumento}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
              >
                {tiposDocumento.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Número de identificación
              </label>
              <input
                type="text"
                name="documento"
                required
                value={formData.documento}
                onChange={handleChange}
                placeholder="Número de identificación"
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Teléfono
              </label>
              <div className="flex gap-2">
                <CountryCodeSelect
                  value={formData.codigoPais}
                  onChange={(dial) =>
                    setFormData((prev) => ({ ...prev, codigoPais: dial }))
                  }
                />
                <input
                  type="tel"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className="flex-1 min-w-0 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Cargo al que aspira
              </label>
              <select
                name="cargo"
                required
                value={formData.cargo}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
              >
                <option value="">Cargo al que aspira</option>
                {cargos.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Ciudad donde quisiera trabajar
              </label>
              <select
                name="ciudad"
                required
                value={formData.ciudad}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
              >
                <option value="">Ciudad donde quisiera tr...</option>
                {ciudades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <FileUpload
              label="Documento de Identidad"
              name="documentoIdentidad"
              onChange={handleFileChange}
              fileName={fileNames.documentoIdentidad}
            />
            <FileUpload
              label="Hoja de Vida"
              name="hojaVida"
              onChange={handleFileChange}
              fileName={fileNames.hojaVida}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <FileUpload
              label="Medidas Correctivas"
              name="medidasCorrectivas"
              onChange={handleFileChange}
              fileName={fileNames.medidasCorrectivas}
            />
            <FileUpload
              label="Antecedentes Policía Nacional"
              name="antecedentes"
              onChange={handleFileChange}
              fileName={fileNames.antecedentes}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Identidad de Género
              </label>
              <select
                name="identidadGenero"
                value={formData.identidadGenero}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
              >
                <option value="">Identidad de Género</option>
                {identidadGenero.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Grupo Étnico
              </label>
              <select
                name="grupoEtnico"
                value={formData.grupoEtnico}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
              >
                <option value="">Grupo Étnico</option>
                {grupoEtnico.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Orientación Sexual
              </label>
              <select
                name="orientacionSexual"
                value={formData.orientacionSexual}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
              >
                <option value="">Orientación Sexual</option>
                {orientacionSexual.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Fecha de inicio disponible
              </label>
              <input
                type="date"
                name="fechaDisponible"
                value={formData.fechaDisponible}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Comentarios
            </label>
            <textarea
              name="comentarios"
              rows={4}
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Comentarios algo..."
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-accent hover:bg-accent/90 text-white px-12 py-3.5 rounded-xl font-bold transition-all shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 inline-flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
