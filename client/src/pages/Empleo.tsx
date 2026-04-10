import { useState } from "react";
import { Upload, Send, AlertCircle } from "lucide-react";

const cargos = [
  "Operario de Cargue y Descargue",
  "Operario de Bodega",
  "Auxiliar de Distribución",
  "Auxiliar de Inventarios",
  "Coordinador de Operaciones",
  "Supervisor",
  "Otro",
];

const ciudades = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
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
    email: "",
    telefono: "",
    cargo: "",
    ciudad: "",
    identidadGenero: "",
    grupoEtnico: "",
    orientacionSexual: "",
    fechaDisponible: "",
    comentarios: "",
  });

  const [files, setFiles] = useState<Record<string, string>>({
    documentoIdentidad: "",
    hojaVida: "",
    medidasCorrectivas: "",
    antecedentes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles({ ...files, [e.target.name]: file.name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Hoja de vida enviada exitosamente. Nos pondremos en contacto contigo.");
  };

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
              <input
                type="tel"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
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
              fileName={files.documentoIdentidad}
            />
            <FileUpload
              label="Hoja de Vida"
              name="hojaVida"
              onChange={handleFileChange}
              fileName={files.hojaVida}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <FileUpload
              label="Medidas Correctivas"
              name="medidasCorrectivas"
              onChange={handleFileChange}
              fileName={files.medidasCorrectivas}
            />
            <FileUpload
              label="Antecedentes Policía Nacional"
              name="antecedentes"
              onChange={handleFileChange}
              fileName={files.antecedentes}
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

          <div className="text-center pt-2">
            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-white px-12 py-3.5 rounded-xl font-bold transition-all shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
