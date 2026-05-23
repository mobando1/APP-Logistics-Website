import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Al cambiar de ruta, sube al inicio de la página.
 * Si la URL trae un hash (#servicio), no interfiere — la página destino
 * se encarga de hacer scroll al ancla correspondiente.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
