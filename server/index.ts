import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import geoip from "geoip-lite";
import { registerLeadRoutes } from "./leads";
import { isCoOnlyPath, stripEsPrefix } from "../shared/coOnlyPaths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Locale = "co" | "es";

// Solo actuamos sobre navegaciones HTML (no API, no assets, no XHR).
const STATIC_RE = /\.[a-z0-9]+$/i;
function isDocumentRequest(req: express.Request): boolean {
  if (req.method !== "GET") return false;
  if (req.path.startsWith("/api/")) return false;
  if (STATIC_RE.test(req.path)) return false;
  if (!String(req.headers.accept || "").includes("text/html")) return false;
  return true;
}

// Locale deseado: cookie (elección manual) > geoip por IP > default Colombia.
function desiredLocale(req: express.Request): Locale {
  const cookie = req.cookies?.locale;
  if (cookie === "co" || cookie === "es") return cookie;
  try {
    const ip = (req.ip || "").replace(/^::ffff:/, "");
    const geo = geoip.lookup(ip);
    return geo?.country === "ES" ? "es" : "co";
  } catch {
    return "co";
  }
}

async function start() {
  const app = express();
  // Necesario para leer la IP real del cliente tras un proxy/CDN (X-Forwarded-For).
  app.set("trust proxy", true);
  // Límite amplio: las postulaciones traen hasta 4 documentos en base64
  // (hasta 10MB c/u; base64 infla ~33%, así que 50mb cubre el caso completo).
  app.use(express.json({ limit: "50mb" }));
  app.use(cookieParser());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Formularios públicos (doble canal: reenvío a RASTREO + correo de respaldo).
  registerLeadRoutes(app);

  // Detección de país por IP. Solo redirige hacia "/es"; nunca sale de "/es"
  // (respeta URLs España explícitas) -> sin bucles de redirección.
  app.use((req, res, next) => {
    if (!isDocumentRequest(req)) return next();
    const isEs = req.path === "/es" || req.path.startsWith("/es/");

    // Rutas que solo existen en Colombia (la política de datos). Se tratan como
    // excepción de la detección de país, NO como un redirect suelto: si se
    // dejara actuar al bloque de abajo, este las mandaría de vuelta a "/es" y
    // el navegador entraría en un bucle de redirecciones.
    if (isCoOnlyPath(req.path)) {
      if (isEs) {
        res.set("Cache-Control", "no-store");
        return res.redirect(302, stripEsPrefix(req.originalUrl));
      }
      return next(); // ya está en la versión Colombia: servir sin reenviar a /es
    }

    if (desiredLocale(req) === "es" && !isEs) {
      res.set("Cache-Control", "no-store");
      res.set("Vary", "Cookie");
      return res.redirect(302, "/es" + req.originalUrl);
    }
    next();
  });

  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const publicDir = path.resolve(__dirname, "public");
    app.use(express.static(publicDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  }

  const port = parseInt(process.env.PORT || "3002");
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start().catch(console.error);
