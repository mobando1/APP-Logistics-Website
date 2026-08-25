// Compresión de imágenes en el navegador, sin dependencias.
//
// Por qué: los adjuntos viajan como data URL base64 dentro del JSON, y el tope
// por archivo es de 2MB (ver @shared/fileLimits). Una foto de celular moderno
// pesa 3-5MB, así que sin comprimir, el candidato que fotografía su cédula
// choca contra el límite y abandona la postulación. Reducirla a 1080px de lado
// mayor la deja muy por debajo del tope sin que pierda legibilidad.
//
// Los PDF y Word no se pueden comprimir aquí: esos se validan por su tamaño tal
// cual y se rechazan si se pasan.
//
// Portado del helper equivalente del CRM (client/src/lib/imagen.ts en RASTREO),
// incluida su guarda de lienzo en blanco, que salió de un fallo real en campo.

/** Lado máximo: suficiente para leer un documento escaneado o fotografiado. */
export const MAX_LADO_IMAGEN = 1080;
/** Calidad JPEG: por debajo de ~0.8 empiezan a aparecer artefactos. */
export const CALIDAD_IMAGEN = 0.85;

/**
 * Reduce un data URL de imagen para que su lado mayor no supere `maxLado`, y lo
 * recodifica como JPEG. Conserva la relación de aspecto.
 *
 * Es tolerante a fallos a propósito: si el navegador no puede decodificar la
 * imagen (formato raro, HEIC sin soporte, canvas bloqueado), devuelve el data
 * URL original en vez de lanzar. El que decide si cabe es el validador de
 * tamaño; aquí solo se intenta ayudar.
 */
export async function compressDataUrl(
  dataUrl: string,
  maxLado: number = MAX_LADO_IMAGEN,
  calidad: number = CALIDAD_IMAGEN
): Promise<string> {
  // La comprobación va DENTRO del try: si la lectura del archivo se abortó,
  // dataUrl puede llegar como null y `startsWith` lanzaría un TypeError.
  try {
    if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) return dataUrl;
    const img = await cargarImagen(dataUrl);
    const { width, height } = img;
    if (!width || !height) return dataUrl;

    const escala = Math.min(1, maxLado / Math.max(width, height));

    // A diferencia del helper del CRM, aquí NO se sale cuando la imagen ya es
    // pequeña de lado: lo que importa es el peso, no las dimensiones. Un PNG de
    // 900x700 sin comprimir pasa de 2MB con facilidad, y recodificarlo a JPEG lo
    // deja en unos cientos de KB. La comparación del final protege el caso
    // contrario: si la salida pesa más que la entrada, se devuelve el original.

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * escala);
    canvas.height = Math.round(height * escala);
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;

    // Fondo blanco: si la fuente tiene alfa (PNG), el JPEG mostraría negro.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Comprobar que el lienzo tiene CONTENIDO antes de dar la imagen por buena.
    // WebKit purga el búfer de un canvas cuando el sistema anda justo de memoria
    // (un iPhone con decenas de pestañas abiertas) y el resultado se codifica
    // como una imagen uniforme sin lanzar ningún error: el documento se subiría
    // en blanco y nadie se enteraría hasta ir a revisarlo.
    if (!tieneContenido(ctx, canvas.width, canvas.height)) return dataUrl;

    const salida = canvas.toDataURL("image/jpeg", calidad);
    // Si por lo que sea salió más grande que el original, quédate con el original.
    return salida.length < dataUrl.length ? salida : dataUrl;
  } catch {
    return dataUrl;
  }
}

/**
 * ¿El lienzo tiene algo, o es un rectángulo de un solo color?
 *
 * Muestrea una rejilla en vez de recorrer millones de píxeles: una foto real
 * nunca da el mismo color en 25 puntos repartidos. Basta con encontrar DOS
 * distintos para saber que la imagen es buena.
 */
function tieneContenido(ctx: CanvasRenderingContext2D, ancho: number, alto: number): boolean {
  const PASOS = 5;
  let primero: string | null = null;
  try {
    for (let i = 0; i < PASOS; i++) {
      for (let j = 0; j < PASOS; j++) {
        const x = Math.floor(((i + 0.5) * ancho) / PASOS);
        const y = Math.floor(((j + 0.5) * alto) / PASOS);
        const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
        // Se redondea a bloques de 8 para que el ruido del sensor no cuente como
        // contenido: una imagen "negra" real trae valores como 2, 3, 1.
        const clave = `${r >> 3},${g >> 3},${b >> 3}`;
        if (primero === null) primero = clave;
        else if (clave !== primero) return true;
      }
    }
  } catch {
    // getImageData puede fallar por lienzo contaminado (imagen de otro origen).
    // No es el caso aquí —viene de un data URL—, pero si pasa, no se descarta.
    return true;
  }
  return false;
}

/** Lee un File como data URL. */
export function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.onloadend = () => {
      // Una lectura abortada deja result en null; devolver "" hace que el
      // validador lo rechace por su propia comprobación, sin lanzar.
      resolve(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  });
}

function cargarImagen(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo decodificar la imagen"));
    img.src = src;
  });
}
