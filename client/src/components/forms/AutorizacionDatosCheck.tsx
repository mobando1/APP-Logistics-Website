import { useLocale } from "@client/lib/LocaleContext";
import { POLITICA_DATOS_PATH } from "@client/content/legal";

// Check de autorización de tratamiento de datos personales (Ley 1581 de 2012).
// Va SIEMPRE en un check propio, separado de cualquier otra declaración: el
// artículo 8.2 de la política exige consentimiento explícito y concreto, así
// que no puede ir agrupado con la declaración de veracidad.
//
// Se renderiza únicamente donde el país tiene autorización definida
// (content.forms.autorizacionDatos); en España devuelve null hasta que exista
// la política RGPD.

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/** Texto de la autorización del país actual, o undefined si no aplica. */
export function useAutorizacionDatos() {
  const { content } = useLocale();
  return content.forms.autorizacionDatos;
}

export default function AutorizacionDatosCheck({ checked, onChange }: Props) {
  const autorizacion = useAutorizacionDatos();
  if (!autorizacion) return null;

  return (
    <label className="flex items-start gap-3 bg-muted/40 border border-border rounded-xl p-4 cursor-pointer">
      <input
        type="checkbox"
        name="autorizacionDatos"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-accent"
      />
      <span className="text-sm text-muted-foreground leading-relaxed">
        {autorizacion.before}
        {/* Pestaña nueva a propósito: navegar dentro de la SPA vaciaría el
            formulario (en Empleo se perderían además los archivos cargados).
            La ruta no lleva prefijo de país porque la autorización solo existe
            en Colombia, cuya base es "". */}
        <a
          href={POLITICA_DATOS_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-medium hover:underline"
        >
          {autorizacion.linkLabel}
        </a>
        {autorizacion.after}
      </span>
    </label>
  );
}
