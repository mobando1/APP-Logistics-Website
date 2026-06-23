// Cliente HTTP para los formularios públicos.
//
// Los formularios envían a NUESTRO propio servidor (rutas /api/lead/*, mismo
// origen → sin CORS). Ese servidor es quien reenvía a RASTREO con reintentos y
// además manda un correo de respaldo. Por eso AQUÍ no reintentamos: evitamos
// envíos (y correos) duplicados. La resiliencia vive en el servidor; si todo
// falla, el formulario muestra un mensaje claro con un correo alterno.

export async function postJson(
  path: string,
  body: unknown,
  { timeoutMs = 40000 }: { timeoutMs?: number } = {}
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}
