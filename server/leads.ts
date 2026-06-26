// Doble canal para los formularios públicos ("nunca perder un lead").
//
// Cada formulario llega a ESTE servidor (mismo origen → sin CORS) y se procesa así:
//   1) Canal primario: se reenvía al backend RASTREO → base de datos + portal.
//      RASTREO envía SUS PROPIOS correos (aviso al equipo + confirmación a la persona).
//   2) Red de seguridad: SOLO si el reenvío a RASTREO falla, este servidor manda
//      los correos (aviso al equipo + confirmación a la persona) vía Resend.
// Así el lead nunca se pierde (si RASTREO está caído, el respaldo cubre) y NO se
// duplican los correos cuando RASTREO está sano. Solo se responde error al
// usuario si fallan AMBOS canales.

import type { Express, Request, Response } from "express";
import {
  ALLOWED_MIME_TYPES,
  FILE_URL_FIELDS,
  MAX_FILE_BYTES,
  MAX_FILE_MB,
  MAX_TOTAL_BYTES,
  MAX_TOTAL_MB,
} from "../shared/fileLimits";

const BACKEND_URL = "https://app-server-production-65d5.up.railway.app";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM =
  process.env.EMAIL_FROM || "APP Logistics <no-reply@app-logistics.com>";

function notifyEmails(): string[] {
  return (process.env.NOTIFY_EMAIL || "info@applogistics.com.co")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Reenvía al backend RASTREO con un reintento ante fallos transitorios (5xx/red).
// Pasa la IP real del visitante en "X-Real-IP" para que el límite por-IP de
// RASTREO siga contando por visitante y no por la (única) IP de este servidor.
async function forwardToBackend(
  path: string,
  payload: unknown,
  clientIp: string
): Promise<boolean> {
  const delays = [2000]; // 2 intentos en total: inmediato y a los 2 s
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    if (attempt > 0) await wait(delays[attempt - 1]);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(`${BACKEND_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Real-IP": clientIp,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) return true;
      if (res.status < 500) return false; // 4xx: reintentar no ayudaría
    } catch {
      clearTimeout(timer); // error de red/timeout → reintentar si quedan intentos
    }
  }
  return false;
}

// Envío genérico vía la API HTTP de Resend (sin SDK, con fetch). Registra el
// motivo del fallo en consola (visible en los logs de Railway): sin diagnóstico,
// un correo que no llega es indistinguible de uno que no se intentó enviar.
async function postToResend(opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string[];
  label: string; // para los logs: "correo de respaldo", "correo de confirmación"…
}): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error(
      `[leads] ${opts.label} OMITIDO: falta RESEND_API_KEY en este servicio (no es la misma variable que la de RASTREO).`
    );
    return false; // sin clave, no hay canal de correo
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const body: Record<string, unknown> = {
      from: EMAIL_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    };
    if (opts.replyTo && opts.replyTo.length) body.reply_to = opts.replyTo;
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      // Causa típica: dominio de EMAIL_FROM no verificado en Resend, o clave
      // inválida. El cuerpo de la respuesta trae el motivo exacto.
      const detail = await res.text().catch(() => "");
      console.error(
        `[leads] Resend rechazó ${opts.label} (HTTP ${res.status}) from="${EMAIL_FROM}" to=${JSON.stringify(
          opts.to
        )}: ${detail}`
      );
    }
    return res.ok;
  } catch (err) {
    clearTimeout(timer);
    console.error(`[leads] error de red/timeout enviando ${opts.label}:`, err);
    return false;
  }
}

// Aviso interno al equipo (a las bandejas de NOTIFY_EMAIL).
function sendBackupEmail(subject: string, html: string): Promise<boolean> {
  return postToResend({ to: notifyEmails(), subject, html, label: "correo de respaldo" });
}

// Confirmación personalizada a quien llenó el formulario (postulante o contacto).
// reply_to apunta al equipo para que, si la persona responde, su correo llegue a
// una bandeja real y no al buzón no-reply.
function sendConfirmationEmail(to: string, subject: string, html: string): Promise<boolean> {
  return postToResend({
    to: [to],
    subject,
    html,
    replyTo: notifyEmails().slice(0, 1),
    label: "correo de confirmación",
  });
}

// Escapa texto del usuario antes de meterlo en el HTML del correo.
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Plantillas con la marca de APP Logistics. Mismo diseño que RASTREO (el canal
// principal) para que el correo se vea idéntico salga por donde salga: header
// navy con logo blanco, franja naranja, tarjeta blanca y pie con contacto real.
// Estos correos son el RESPALDO (solo se envían si RASTREO está caído), así que
// los avisos al equipo NO llevan botón "Ver en el portal" (aún no está en el
// portal) pero sí cargan todos los datos del lead.
// ---------------------------------------------------------------------------

const BRAND = {
  navy: "#1B396A",
  orange: "#F97316",
  logo: "https://www.app-logistics.com/logo-app-blanco.png",
  site: "https://www.app-logistics.com",
  phoneDisplay: "(57) 315 340 25 45",
  phoneTel: "+573153402545",
};

// Envuelve el contenido en la tarjeta con marca (header + franja + cuerpo + pie).
// `footerHtml` es la línea opcional de teléfono/correo del pie (HTML ya armado).
function shell(content: string, footerHtml = ""): string {
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:24px 12px;"><tr><td align="center">` +
    `<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">` +
    `<tr><td style="background:${BRAND.navy};padding:28px 32px;text-align:center;"><img src="${BRAND.logo}" alt="APP Logistics" height="34" style="height:34px;display:inline-block;border:0;"></td></tr>` +
    `<tr><td style="height:4px;background:${BRAND.orange};font-size:0;line-height:0;">&nbsp;</td></tr>` +
    `<tr><td style="padding:32px;">${content}</td></tr>` +
    `<tr><td style="background:#f8fafc;border-top:1px solid #e5e7eb;padding:24px 32px;">` +
    `<p style="margin:0 0 6px;color:${BRAND.navy};font-size:14px;font-weight:700;">APP Logistics SAS</p>` +
    `<p style="margin:0;color:#6b7280;font-size:12px;line-height:1.7;">Soluciones logísticas integrales · Colombia<br>${footerHtml}<a href="${BRAND.site}" style="color:${BRAND.orange};text-decoration:none;font-weight:600;">www.app-logistics.com</a></p>` +
    `</td></tr>` +
    `</table>` +
    `<p style="margin:16px 0 0;color:#9aa4b2;font-size:11px;">© APP Logistics SAS · Este es un mensaje automático.</p>` +
    `</td></tr></table>`
  );
}

// Línea de contacto del pie (teléfono + correo) para los correos de confirmación.
function footerContactLine(email: string): string {
  return (
    `<a href="tel:${BRAND.phoneTel}" style="color:#6b7280;text-decoration:none;">${BRAND.phoneDisplay}</a> · ` +
    `<a href="mailto:${esc(email)}" style="color:#6b7280;text-decoration:none;">${esc(email)}</a><br>`
  );
}

// Título navy grande (igual en confirmaciones y avisos internos).
function heading(text: string): string {
  return `<h1 style="margin:0 0 16px;color:${BRAND.navy};font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:21px;line-height:1.3;font-weight:800;">${text}</h1>`;
}

// Párrafo del cuerpo. `last` quita el margen inferior (para el último párrafo).
function para(html: string, last = false): string {
  return `<p style="margin:${last ? "0" : "0 0 16px"};color:#1f2937;font-size:15px;line-height:1.65;">${html}</p>`;
}

// Línea introductoria de un aviso interno (un poco más pegada a la tabla de datos).
function intro(html: string): string {
  return `<p style="margin:0 0 8px;color:#1f2937;font-size:15px;line-height:1.65;">${html}</p>`;
}

// Texto pequeño en gris (nota de adjuntos / avisos). Mismo estilo que RASTREO.
function fineprint(html: string): string {
  return `<p style="margin:8px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">${html}</p>`;
}

// Tabla de datos (etiqueta gris + valor) para los avisos internos.
function dataRows(fields: Array<[string, unknown]>): string {
  const rows = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([label, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(
          label
        )}</td><td style="padding:8px 0;color:#1f2937;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${esc(v)}</td></tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 4px;">${rows}</table>`;
}

// Devuelve el email saneado si parece válido, o null. Evita pedirle a Resend que
// envíe a una dirección rota (y evita el rebote correspondiente).
function looksLikeEmail(v: unknown): string | null {
  const s = String(v ?? "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : null;
}

// Limitador simple en memoria para proteger el canal de correo de abusos.
// Este servidor es una sola instancia, así que un Map en memoria basta.
const HITS = new Map<string, number[]>();
const LIMIT = 20; // envíos
const WINDOW_MS = 60 * 60 * 1000; // por hora, por IP
function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > LIMIT;
}

// Tamaño en bytes que representa una cadena base64 (sin el prefijo data URL).
function base64Bytes(b64: string): number {
  const len = b64.length;
  if (len === 0) return 0;
  const padding = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.floor((len * 3) / 4) - padding;
}

// Defensa en profundidad: valida los adjuntos del payload ANTES de reenviarlos a
// RASTREO. La validación del navegador puede saltarse (peticiones directas a la
// API), por eso el servidor vuelve a comprobar tipo y tamaño. Solo inspecciona
// data URLs base64 (lo que envía el formulario); cualquier otro valor se ignora
// para no romper integraciones que manden URLs reales. Devuelve un mensaje de
// error o null si todo está correcto.
function validateCandidatoFiles(body: Record<string, unknown>): string | null {
  let total = 0;
  for (const field of FILE_URL_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || !value.startsWith("data:")) continue;
    const match = /^data:([^;,]*)(;base64)?,/.exec(value);
    if (!match || !match[2]) continue; // no es base64 inline → no se valida
    const mime = (match[1] || "").toLowerCase();
    if (!ALLOWED_MIME_TYPES.includes(mime)) {
      return "Uno de los documentos tiene un tipo de archivo no permitido.";
    }
    const bytes = base64Bytes(value.slice(value.indexOf(",") + 1));
    if (bytes > MAX_FILE_BYTES) {
      return `Uno de los documentos supera el tamaño máximo de ${MAX_FILE_MB}MB.`;
    }
    total += bytes;
  }
  if (total > MAX_TOTAL_BYTES) {
    return `El tamaño total de los documentos supera el máximo de ${MAX_TOTAL_MB}MB.`;
  }
  return null;
}

async function handle(
  req: Request,
  res: Response,
  opts: {
    backendPath: string;
    subject: string;
    html: string;
    // Confirmación opcional para la persona que llenó el formulario. Solo se
    // envía como respaldo si RASTREO no recibió el lead (cuando RASTREO está
    // sano, es él quien manda la confirmación).
    confirmation?: { to: string; subject: string; html: string } | null;
  }
) {
  const clientIp = (req.ip || "").replace(/^::ffff:/, "");
  if (tooMany(clientIp)) {
    return res
      .status(429)
      .json({ ok: false, message: "Demasiados envíos. Intenta más tarde." });
  }
  // Canal primario: RASTREO. Guarda en BD/portal y envía SUS PROPIOS correos
  // (aviso al equipo + confirmación a la persona).
  const backendOk = await forwardToBackend(opts.backendPath, req.body, clientIp);

  // Red de seguridad: SOLO si RASTREO no recibió el lead, este servidor manda los
  // correos (aviso al equipo + confirmación a la persona). Así no se duplican los
  // correos cuando RASTREO está sano, pero ni el lead ni los avisos se pierden si
  // RASTREO está caído.
  let emailOk = false;
  if (!backendOk) {
    const [notifOk] = await Promise.all([
      sendBackupEmail(opts.subject, opts.html),
      opts.confirmation
        ? sendConfirmationEmail(
            opts.confirmation.to,
            opts.confirmation.subject,
            opts.confirmation.html
          )
        : Promise.resolve(false),
    ]);
    emailOk = notifOk;
  }

  if (backendOk || emailOk) {
    return res.status(201).json({ ok: true, backend: backendOk, email: emailOk });
  }
  console.error(
    `[leads] LEAD PERDIDO: fallaron AMBOS canales (RASTREO y correo) para ${opts.backendPath}`
  );
  return res.status(502).json({ ok: false });
}

export function registerLeadRoutes(app: Express) {
  // Contacto / cotización
  app.post("/api/lead/cotizacion", async (req, res) => {
    const b = req.body ?? {};
    const subject = `Nuevo contacto · ${b.nombreEmpresa || b.contactoNombre || "web"}`;
    const empresa = String(b.nombreEmpresa || "").trim();
    const html = shell(
      heading("Nueva solicitud de contacto") +
        intro(
          empresa
            ? `<strong>${esc(empresa)}</strong> solicitó información.`
            : "Nueva solicitud recibida desde el formulario web."
        ) +
        dataRows([
          ["Contacto", b.contactoNombre],
          ["Email", b.contactoEmail],
          ["Teléfono", b.contactoTelefono],
          ["Servicio", b.servicioInteres],
          ["Mensaje", b.mensaje],
        ])
    );

    // Confirmación personalizada para quien escribió (si dejó un email válido).
    // Mismo texto y diseño que la confirmación principal de RASTREO.
    const contactoEmail = looksLikeEmail(b.contactoEmail);
    const nombre = String(b.contactoNombre || b.nombreEmpresa || "").trim();
    const confirmation = contactoEmail
      ? {
          to: contactoEmail,
          subject: "Gracias por contactarnos · APP Logistics",
          html: shell(
            heading(`¡Gracias por contactarnos${nombre ? `, ${esc(nombre)}` : ""}!`) +
              para(
                "Hemos recibido tu solicitud en <strong>APP Logistics</strong> y agradecemos tu interés en nuestros servicios."
              ) +
              para(
                "Uno de nuestros asesores se pondrá en contacto contigo muy pronto para brindarte la información que necesitas."
              ) +
              para("Quedamos atentos.", true),
            footerContactLine("info@applogistics.com.co")
          ),
        }
      : null;

    await handle(req, res, { backendPath: "/api/cotizaciones", subject, html, confirmation });
  });

  // Postulación de empleo
  app.post("/api/lead/candidato", async (req, res) => {
    const b = req.body ?? {};

    // Defensa en profundidad: rechaza adjuntos de tipo/tamaño inválido antes de
    // procesar o reenviar (la validación del navegador puede saltarse).
    const fileError = validateCandidatoFiles(b);
    if (fileError) {
      return res.status(400).json({ ok: false, message: fileError });
    }

    const nombre = [b.primerNombre, b.segundoNombre, b.primerApellido, b.segundoApellido]
      .filter(Boolean)
      .join(" ");
    const subject = `Nueva postulación · ${nombre || b.numeroDocumento || "web"}`;
    const html = shell(
      heading("Nueva postulación de empleo") +
        intro(
          nombre
            ? `<strong>${esc(nombre)}</strong> envió su hoja de vida.`
            : "Nueva postulación recibida desde el formulario web."
        ) +
        dataRows([
          ["Documento", [b.tipoDocumento, b.numeroDocumento].filter(Boolean).join(" ")],
          ["Cargo", b.cargoAspira],
          ["Ciudad", b.ciudad],
          ["Celular", b.celular],
          ["Email", b.email],
          ["Nacionalidad", b.nacionalidad],
          ["Fecha disponible", b.fechaDisponible],
          ["Comentarios", b.comentarios],
        ]) +
        fineprint(
          "Los archivos adjuntos (CV, documentos) quedan disponibles en el portal cuando la postulación entra a RASTREO."
        )
    );

    // Confirmación personalizada para el postulante (si dejó un email válido).
    // Mismo texto y diseño que la confirmación principal de RASTREO.
    const email = looksLikeEmail(b.email);
    const primerNombre = String(b.primerNombre || "").trim();
    const confirmation = email
      ? {
          to: email,
          subject: "Recibimos tu postulación · APP Logistics",
          html: shell(
            heading(`¡Gracias por tu interés${primerNombre ? `, ${esc(primerNombre)}` : ""}!`) +
              para(
                "Hemos recibido tu postulación en <strong>APP Logistics</strong> y tu hoja de vida ya hace parte de nuestro proceso de selección."
              ) +
              para(
                "Nuestro equipo de selección la revisará con atención. Si tu perfil se ajusta a la vacante, nos pondremos en contacto contigo muy pronto."
              ) +
              para("Gracias por querer ser parte de nuestro equipo.", true),
            footerContactLine("seleccion@applogistics.com.co")
          ),
        }
      : null;

    await handle(req, res, { backendPath: "/api/candidatos", subject, html, confirmation });
  });
}
