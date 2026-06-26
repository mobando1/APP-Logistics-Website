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

function renderRows(fields: Array<[string, unknown]>): string {
  const rows = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([label, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top;">${esc(
          label
        )}</td><td style="padding:4px 0;font-weight:600;">${esc(v)}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;font-size:14px;line-height:1.5;">${rows}</table>`;
}

function wrap(title: string, inner: string): string {
  return (
    `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1f2937;">` +
    `<h2 style="margin:0 0 4px;">${esc(title)}</h2>` +
    `<p style="margin:0 0 16px;color:#6b7280;font-size:13px;">Recibido desde el formulario del sitio web.</p>` +
    inner +
    `</div>`
  );
}

// Devuelve el email saneado si parece válido, o null. Evita pedirle a Resend que
// envíe a una dirección rota (y evita el rebote correspondiente).
function looksLikeEmail(v: unknown): string | null {
  const s = String(v ?? "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : null;
}

// Plantilla con marca para el correo de confirmación que recibe la persona.
// `greeting` y los `paragraphs` ya vienen con el texto del usuario escapado; los
// párrafos pueden traer <strong>/<br> que ponemos nosotros, no el usuario.
function confirmationWrap(greeting: string, paragraphs: string[]): string {
  const body = paragraphs
    .map((p) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">${p}</p>`)
    .join("");
  return (
    `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">` +
    `<div style="background:#0f172a;padding:20px 24px;border-radius:8px 8px 0 0;">` +
    `<span style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.5px;">APP&nbsp;Logistics</span>` +
    `</div>` +
    `<div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">` +
    `<p style="margin:0 0 16px;font-size:16px;font-weight:600;">${greeting}</p>` +
    body +
    `<p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">Este es un mensaje automático de confirmación enviado desde el sitio web de APP Logistics.</p>` +
    `</div>` +
    `</div>`
  );
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
    const html = wrap(
      "Nueva solicitud de contacto / cotización",
      renderRows([
        ["Empresa", b.nombreEmpresa],
        ["Contacto", b.contactoNombre],
        ["Email", b.contactoEmail],
        ["Teléfono", b.contactoTelefono],
        ["Servicio de interés", b.servicioInteres],
        ["Mensaje", b.mensaje],
      ])
    );

    // Confirmación personalizada para quien escribió (si dejó un email válido).
    const contactoEmail = looksLikeEmail(b.contactoEmail);
    const pila = String(b.contactoNombre || "").trim().split(/\s+/)[0];
    const paras = [
      "Gracias por contactarte con <strong>APP Logistics</strong>. Hemos recibido tu mensaje correctamente.",
    ];
    if (String(b.servicioInteres || "").trim()) {
      paras.push(`Registramos tu interés en: <strong>${esc(b.servicioInteres)}</strong>.`);
    }
    paras.push(
      "Uno de nuestros asesores comerciales se pondrá en contacto contigo a la brevedad para ayudarte con tu solicitud."
    );
    paras.push("Gracias por confiar en nosotros.<br><strong>Equipo Comercial — APP Logistics</strong>");
    const confirmation = contactoEmail
      ? {
          to: contactoEmail,
          subject: "Recibimos tu solicitud · APP Logistics",
          html: confirmationWrap(pila ? `Hola ${esc(pila)},` : "Hola,", paras),
        }
      : null;

    await handle(req, res, { backendPath: "/api/cotizaciones", subject, html, confirmation });
  });

  // Postulación de empleo
  app.post("/api/lead/candidato", async (req, res) => {
    const b = req.body ?? {};
    const nombre = [b.primerNombre, b.segundoNombre, b.primerApellido, b.segundoApellido]
      .filter(Boolean)
      .join(" ");
    const subject = `Nueva postulación · ${nombre || b.numeroDocumento || "web"}`;
    const inner =
      renderRows([
        ["Nombre", nombre],
        ["Documento", [b.tipoDocumento, b.numeroDocumento].filter(Boolean).join(" ")],
        ["Cargo al que aspira", b.cargoAspira],
        ["Ciudad", b.ciudad],
        ["Celular", b.celular],
        ["Email", b.email],
        ["Nacionalidad", b.nacionalidad],
        ["Fecha disponible", b.fechaDisponible],
        ["Comentarios", b.comentarios],
      ]) +
      `<p style="margin-top:12px;font-size:12px;color:#9ca3af;">Los archivos adjuntos (CV, documentos) quedan disponibles en el portal cuando la postulación entra a RASTREO.</p>`;
    const html = wrap("Nueva postulación de empleo", inner);

    // Confirmación personalizada para el postulante (si dejó un email válido).
    const email = looksLikeEmail(b.email);
    const primerNombre = String(b.primerNombre || "").trim();
    const paras = [
      "Gracias por postularte a <strong>APP Logistics</strong>. Hemos recibido tu hoja de vida correctamente.",
    ];
    if (String(b.cargoAspira || "").trim()) {
      paras.push(`Tu postulación quedó registrada para el cargo de <strong>${esc(b.cargoAspira)}</strong>.`);
    }
    paras.push(
      "Nuestro equipo de selección revisará tu perfil. Si tu experiencia se ajusta a la vacante, nos pondremos en contacto contigo por este medio o por teléfono."
    );
    paras.push("Te deseamos mucho éxito en el proceso.<br><strong>Equipo de Selección — APP Logistics</strong>");
    const confirmation = email
      ? {
          to: email,
          subject: "Recibimos tu postulación · APP Logistics",
          html: confirmationWrap(primerNombre ? `Hola ${esc(primerNombre)},` : "Hola,", paras),
        }
      : null;

    await handle(req, res, { backendPath: "/api/candidatos", subject, html, confirmation });
  });
}
