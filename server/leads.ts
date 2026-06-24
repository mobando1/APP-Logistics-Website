// Doble canal para los formularios públicos ("nunca perder un lead").
//
// Cada formulario llega a ESTE servidor (mismo origen → sin CORS) y sale por DOS
// vías independientes, en paralelo:
//   1) Se reenvía al backend RASTREO → base de datos + portal (fuente de verdad).
//   2) Se envía un correo de respaldo directo vía la API HTTP de Resend.
// Basta con que UNA funcione para no perder el lead: si RASTREO está caído, el
// equipo igual recibe el correo; si el correo falla, RASTREO ya lo guardó. Solo
// se responde error al usuario si fallan AMBAS.

import type { Express, Request, Response } from "express";

const BACKEND_URL = "https://app-server-production-65d5.up.railway.app";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM =
  process.env.EMAIL_FROM || "APP Logistics <no-reply@applogistics.com.co>";

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
    const timer = setTimeout(() => controller.abort(), 15000);
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

// Correo de respaldo directo vía la API HTTP de Resend (sin SDK, con fetch).
// Registra el motivo del fallo en consola (visible en los logs de Railway):
// sin diagnóstico, un correo que no llega es indistinguible de uno que no se
// intentó enviar.
async function sendBackupEmail(subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error(
      "[leads] correo de respaldo OMITIDO: falta RESEND_API_KEY en este servicio (no es la misma variable que la de RASTREO)."
    );
    return false; // sin clave, no hay canal de respaldo por correo
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: notifyEmails(),
        subject,
        html,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      // Causa típica: dominio de EMAIL_FROM no verificado en Resend, o clave
      // inválida. El cuerpo de la respuesta trae el motivo exacto.
      const detail = await res.text().catch(() => "");
      console.error(
        `[leads] Resend rechazó el correo (HTTP ${res.status}) from="${EMAIL_FROM}" to=${JSON.stringify(
          notifyEmails()
        )}: ${detail}`
      );
    }
    return res.ok;
  } catch (err) {
    clearTimeout(timer);
    console.error("[leads] error de red/timeout enviando el correo de respaldo:", err);
    return false;
  }
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
  opts: { backendPath: string; subject: string; html: string }
) {
  const clientIp = (req.ip || "").replace(/^::ffff:/, "");
  if (tooMany(clientIp)) {
    return res
      .status(429)
      .json({ ok: false, message: "Demasiados envíos. Intenta más tarde." });
  }
  // Dos canales en paralelo. No perdemos el lead si AL MENOS uno funciona.
  const [backendOk, emailOk] = await Promise.all([
    forwardToBackend(opts.backendPath, req.body, clientIp),
    sendBackupEmail(opts.subject, opts.html),
  ]);
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
    await handle(req, res, { backendPath: "/api/cotizaciones", subject, html });
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
    await handle(req, res, { backendPath: "/api/candidatos", subject, html });
  });
}
