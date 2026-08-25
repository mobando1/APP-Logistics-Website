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
  base64Bytes,
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

// Resultado del reenvío. `rejected` distingue "RASTREO contestó que no entiende
// la petición" (4xx) de "RASTREO no contestó" (5xx, red, timeout): solo el
// primero se puede arreglar mandando un payload distinto.
// `status` y `message` guardan lo que contestó, para poder distinguir un rechazo
// deliberado (un archivo que no cabe) de un desajuste de campos.
interface ForwardResult {
  ok: boolean;
  rejected: boolean;
  status?: number;
  message?: string;
}

// Reenvía al backend RASTREO con un reintento ante fallos transitorios (5xx/red).
// Pasa la IP real del visitante en "X-Real-IP" para que el límite por-IP de
// RASTREO siga contando por visitante y no por la (única) IP de este servidor.
async function forwardToBackend(
  path: string,
  payload: unknown,
  clientIp: string,
  { retries = 1 }: { retries?: number } = {}
): Promise<ForwardResult> {
  const delays = Array(retries).fill(2000); // reintentos, a los 2 s cada uno
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
      if (res.ok) return { ok: true, rejected: false };
      if (res.status < 500) {
        // 4xx: reintentar lo mismo no ayudaría. Se registra el cuerpo porque es
        // donde RASTREO explica qué campo no le gustó.
        const detail = await res.text().catch(() => "");
        console.error(
          `[leads] RASTREO rechazó ${path} (HTTP ${res.status}): ${detail.slice(0, 500)}`
        );
        let message: string | undefined;
        try {
          message = JSON.parse(detail)?.message;
        } catch {
          // El cuerpo no era JSON: se queda sin mensaje y el llamador decide.
        }
        return { ok: false, rejected: true, status: res.status, message };
      }
    } catch {
      clearTimeout(timer); // error de red/timeout → reintentar si quedan intentos
    }
  }
  return { ok: false, rejected: false };
}

// ---------------------------------------------------------------------------
// Reintento degradado
//
// Los campos de la autorización de datos son recientes; si algún día los DTO de
// RASTREO no los reconocen, un 400 haría que TODOS los leads acabaran en el
// correo de respaldo (y las hojas de vida se perderían, porque ese correo no
// llevaba adjuntos). Antes que perderlos, se reintenta sin esos campos y la
// constancia se traslada a un campo de texto que el CRM sí acepta desde siempre.
// ---------------------------------------------------------------------------

const CONSENT_FIELDS = [
  "autorizacionDatos",
  "autorizacionDatosVersion",
  "autorizacionDatosFecha",
] as const;

export function hasConsentFields(body: Record<string, unknown>): boolean {
  return CONSENT_FIELDS.some((f) => body[f] !== undefined);
}

/** Quita los campos de autorización y deja la constancia dentro de `textField`. */
export function degradeConsent(
  body: Record<string, unknown>,
  textField: string
): Record<string, unknown> {
  const out = { ...body };
  const constancia = [
    "Autorización de tratamiento de datos aceptada",
    out.autorizacionDatosVersion,
    out.autorizacionDatosFecha,
  ]
    .filter(Boolean)
    .join(" — ");

  for (const field of CONSENT_FIELDS) delete out[field];

  // Se conserva lo que la persona hubiera escrito: la constancia se añade al
  // final, nunca reemplaza.
  const previo = String(out[textField] ?? "").trim();
  out[textField] = previo ? `${previo}\n\n${constancia}` : constancia;
  return out;
}

// Envío genérico vía la API HTTP de Resend (sin SDK, con fetch). Registra el
// motivo del fallo en consola (visible en los logs de Railway): sin diagnóstico,
// un correo que no llega es indistinguible de uno que no se intentó enviar.
async function postToResend(opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string[];
  attachments?: { filename: string; content: string }[]; // content en base64
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
    if (opts.attachments && opts.attachments.length) {
      body.attachments = opts.attachments;
    }
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
function sendBackupEmail(
  subject: string,
  html: string,
  attachments?: { filename: string; content: string }[]
): Promise<boolean> {
  return postToResend({
    to: notifyEmails(),
    subject,
    html,
    attachments,
    label: "correo de respaldo",
  });
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

// Aviso rojo al principio del correo. Solo se usa en el canal de respaldo: sin
// él, el aviso interno se ve idéntico a una notificación normal y nadie se
// entera de que el lead NO quedó en el CRM.
function banner(title: string, body: string): string {
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;background:#fef2f2;border:1px solid #fecaca;border-left:4px solid #dc2626;border-radius:8px;"><tr><td style="padding:14px 16px;">` +
    `<p style="margin:0 0 4px;color:#991b1b;font-size:14px;font-weight:800;">${title}</p>` +
    `<p style="margin:0;color:#7f1d1d;font-size:13px;line-height:1.6;">${body}</p>` +
    `</td></tr></table>`
  );
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

// Resumen de la autorización de tratamiento de datos para el aviso interno.
// Cadena vacía si el lead no la trae: dataRows() omite la fila.
// Este correo solo sale cuando RASTREO falla, así que la prueba "de verdad" es
// la que queda en el CRM; esto es el respaldo del canal de respaldo.
function autorizacionResumen(b: Record<string, unknown>): string {
  if (!b.autorizacionDatos) return "";
  return ["Aceptada", b.autorizacionDatosVersion, b.autorizacionDatosFecha]
    .filter(Boolean)
    .join(" · ");
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

// Defensa en profundidad: valida los adjuntos del payload ANTES de reenviarlos a
// RASTREO. La validación del navegador puede saltarse (peticiones directas a la
// API), por eso el servidor vuelve a comprobar tipo y tamaño. Solo inspecciona
// data URLs base64 (lo que envía el formulario); cualquier otro valor se ignora
// para no romper integraciones que manden URLs reales. Devuelve un mensaje de
// error o null si todo está correcto.
export function validateCandidatoFiles(body: Record<string, unknown>): string | null {
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

// Tope para el adjunto del correo de respaldo. Se deja por encima del límite
// por archivo (no en 40MB, que es donde corta Resend) para que siga siendo una
// red de seguridad real: si algún día entrara un archivo mayor que MAX_FILE_BYTES
// —una integración distinta, un límite que sube—, el correo de respaldo se envía
// igual sin el adjunto en vez de fallar entero y perder el lead.
const MAX_ATTACH_BYTES = MAX_FILE_BYTES * 2;

/**
 * Extrae la hoja de vida del payload como adjunto para Resend.
 * Devuelve undefined si no viene, si no es una data URL base64 o si es enorme.
 */
function cvAttachment(
  b: Record<string, unknown>
): { filename: string; content: string }[] | undefined {
  const dataUrl = b.hojaVidaUrl;
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) return undefined;
  const comma = dataUrl.indexOf(",");
  if (comma < 0 || !/;base64/i.test(dataUrl.slice(0, comma))) return undefined;

  const content = dataUrl.slice(comma + 1);
  if (base64Bytes(content) > MAX_ATTACH_BYTES) {
    console.error(
      "[leads] hoja de vida demasiado grande para adjuntarla al correo de respaldo; se omite."
    );
    return undefined;
  }

  const filename = String(b.hojaVidaNombre || "hoja-de-vida.pdf").replace(
    /[\\/:*?"<>|]/g, // caracteres que rompen el nombre de archivo en Windows
    "_"
  );
  return [{ filename, content }];
}

async function handle(
  req: Request,
  res: Response,
  opts: {
    backendPath: string;
    subject: string;
    html: string;
    // Campo de texto libre del payload donde dejar la constancia de la
    // autorización si hay que reintentar sin los campos dedicados.
    consentTextField: string;
    // Adjuntos del correo de respaldo (hoy: la hoja de vida). Solo viajan por
    // este canal; cuando RASTREO recibe el lead, los archivos van al portal.
    attachments?: { filename: string; content: string }[];
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

  const body: Record<string, unknown> = req.body ?? {};

  // La fecha de la autorización la sella el servidor: una prueba de
  // consentimiento no puede depender del reloj del PC del visitante.
  if (body.autorizacionDatos) {
    body.autorizacionDatosFecha = new Date().toISOString();
  }

  // Canal primario: RASTREO. Guarda en BD/portal y envía SUS PROPIOS correos
  // (aviso al equipo + confirmación a la persona).
  let forward = await forwardToBackend(opts.backendPath, body, clientIp);

  // Rechazo deliberado por tamaño (413): NO es que RASTREO esté caído ni que sus
  // campos se hayan desincronizado, así que ni se reintenta ni se manda por
  // correo. Mandarlo por correo le diría al postulante que su postulación quedó
  // enviada y al equipo que la cargue a mano — justo lo que el límite quiere
  // evitar. Se le devuelve el motivo para que corrija el archivo y reenvíe.
  if (!forward.ok && forward.status === 413) {
    return res.status(413).json({
      ok: false,
      message:
        forward.message ||
        `Uno de los documentos supera el tamaño máximo de ${MAX_FILE_MB}MB.`,
    });
  }

  // Si RASTREO rechazó la petición (4xx) y el lead traía los campos de
  // autorización, el sospechoso más probable es que sus DTO todavía no los
  // conozcan. Antes que mandar el lead al correo (donde se perderían los
  // archivos), se reintenta una vez sin ellos, con la constancia como texto.
  // Un solo intento: el navegador espera 40 s y ya se consumió parte.
  if (!forward.ok && forward.rejected && hasConsentFields(body)) {
    console.error(
      `[leads] reintento degradado (sin campos de autorización) para ${opts.backendPath}`
    );
    forward = await forwardToBackend(
      opts.backendPath,
      degradeConsent(body, opts.consentTextField),
      clientIp,
      { retries: 0 }
    );
    if (forward.ok) {
      console.error(
        `[leads] REVISAR DTO: ${opts.backendPath} no acepta los campos de autorización; el lead entró con la constancia en "${opts.consentTextField}".`
      );
    }
  }

  const backendOk = forward.ok;

  // Red de seguridad: SOLO si RASTREO no recibió el lead, este servidor manda los
  // correos (aviso al equipo + confirmación a la persona). Así no se duplican los
  // correos cuando RASTREO está sano, pero ni el lead ni los avisos se pierden si
  // RASTREO está caído.
  let emailOk = false;
  if (!backendOk) {
    // El aviso se marca en grande: este correo significa que el lead NO quedó
    // en el CRM y que alguien tiene que cargarlo a mano.
    const faltanAdjuntos = !opts.attachments?.length;
    const alerta =
      banner(
        "⚠️ ESTE LEAD NO QUEDÓ EN EL CRM",
        "RASTREO no recibió la solicitud, así que hay que cargarla a mano en el portal." +
          (faltanAdjuntos
            ? " Los archivos adjuntos no viajaron: hay que pedírselos a la persona."
            : " La hoja de vida va adjunta a este correo.")
      ) + opts.html;

    const [notifOk] = await Promise.all([
      sendBackupEmail(
        `⚠️ RASTREO NO RECIBIÓ · ${opts.subject}`,
        alerta,
        opts.attachments
      ),
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

// Caché en memoria de la lista de cargos por país. El formulario de empleo la
// consume en cada carga; cachear unos segundos evita golpear a RASTREO en ráfagas
// (varias cargas seguidas, doble render de React) sin retrasar los cambios.
// TTL corto (30 s): un cargo creado/eliminado en el CRM se refleja casi enseguida.
const CARGOS_CACHE_MS = 30 * 1000;
const cargosCache = new Map<string, { at: number; data: unknown }>();

async function fetchCargos(pais: string): Promise<unknown> {
  const cached = cargosCache.get(pais);
  if (cached && Date.now() - cached.at < CARGOS_CACHE_MS) return cached.data;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const qs = pais ? `?pais=${encodeURIComponent(pais)}` : "";
    const res = await fetch(`${BACKEND_URL}/api/cargos/publicos${qs}`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`RASTREO respondió ${res.status}`);
    const data = await res.json();
    cargosCache.set(pais, { at: Date.now(), data });
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export function registerLeadRoutes(app: Express) {
  // Lista de cargos para el formulario de empleo. Fuente de verdad: el módulo de
  // Cargos del CRM (RASTREO). Si RASTREO falla, devuelve [] y el formulario cae a
  // su lista fija de content (co.ts / es.ts).
  app.get("/api/lead/cargos", async (req, res) => {
    const pais = typeof req.query.pais === "string" ? req.query.pais.trim().toUpperCase() : "";
    // El navegador/edge debe revalidar seguido para que un cambio en el CRM
    // (crear/eliminar cargo) se refleje pronto en el formulario, no quedarse con
    // una copia vieja por el caché heurístico del navegador.
    res.set("Cache-Control", "public, max-age=30, must-revalidate");
    try {
      res.json(await fetchCargos(pais));
    } catch {
      res.json([]);
    }
  });

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
          ["Autorización de datos", autorizacionResumen(b)],
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

    await handle(req, res, {
      backendPath: "/api/cotizaciones",
      subject,
      html,
      consentTextField: "mensaje",
      confirmation,
    });
  });

  // Postulación de empleo
  app.post("/api/lead/candidato", async (req, res) => {
    const b = req.body ?? {};

    // Defensa en profundidad: rechaza adjuntos de tipo/tamaño inválido antes de
    // procesar o reenviar (la validación del navegador puede saltarse).
    // 413 y no 400: el formulario solo muestra el mensaje del servidor cuando el
    // rechazo es por tamaño; con un 400 la persona vería el error genérico de
    // "no pudimos enviar" y no sabría que lo único que falla es un archivo.
    const fileError = validateCandidatoFiles(b);
    if (fileError) {
      return res.status(413).json({ ok: false, message: fileError });
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
          ["Autorización de datos", autorizacionResumen(b)],
        ]) +
        fineprint(
          "Los archivos adjuntos (CV, documentos) quedan disponibles en el portal cuando la postulación entra a RASTREO."
        )
    );

    // La hoja de vida es el único archivo irreemplazable: si RASTREO no recibe
    // la postulación, viaja adjunta en el correo de respaldo. Los demás
    // documentos (cédula, antecedentes) se le pueden volver a pedir.
    const attachments = cvAttachment(b);

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

    await handle(req, res, {
      backendPath: "/api/candidatos",
      subject,
      html,
      consentTextField: "comentarios",
      attachments,
      confirmation,
    });
  });
}
