import { Switch, Route, Router } from "wouter";
import { LocaleProvider } from "./lib/LocaleContext";
import { localeFromPath, LOCALE_BASE } from "./lib/locale-routing";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import JobVacancyPopup from "./components/JobVacancyPopup";
import Reveal from "./components/ui/Reveal";
import HeroSection from "./components/sections/HeroSection";
import ServicesSection from "./components/sections/ServicesSection";
import StatsSection from "./components/sections/StatsSection";
import AboutSection from "./components/sections/AboutSection";
import CoverageSection from "./components/sections/CoverageSection";
import ClientsSection from "./components/sections/ClientsSection";
import CTASection from "./components/sections/CTASection";
import ServiciosPage from "./pages/Servicios";
import NosotrosPage from "./pages/Nosotros";
import ContactoPage from "./pages/Contacto";
import EmpleoPage from "./pages/Empleo";
import PoliticaDatosPage from "./pages/PoliticaDatos";

function HomePage() {
  return (
    <>
      <HeroSection />
      <Reveal><ClientsSection /></Reveal>
      <Reveal><ServicesSection /></Reveal>
      <Reveal><StatsSection /></Reveal>
      <Reveal><AboutSection /></Reveal>
      <Reveal><CoverageSection /></Reveal>
      <Reveal><CTASection /></Reveal>
    </>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-primary/20 mb-4">404</h1>
        <p className="text-xl font-bold text-primary mb-2">
          Página no encontrada
        </p>
        <p className="text-muted-foreground">
          La página que buscas no existe.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  // El locale se deriva del prefijo de la URL ("/es" = España, resto = Colombia).
  // Se lee una sola vez al montar: cambiar de país es una navegación completa.
  const locale = localeFromPath(window.location.pathname);

  return (
    <LocaleProvider locale={locale}>
      <Router base={LOCALE_BASE[locale]}>
        <div className="min-h-screen flex flex-col">
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 pt-16 lg:pt-20 print:pt-0">
            <Switch>
              <Route path="/">
                <HomePage />
              </Route>
              <Route path="/servicios">
                <ServiciosPage />
              </Route>
              <Route path="/nosotros">
                <NosotrosPage />
              </Route>
              <Route path="/contacto">
                <ContactoPage />
              </Route>
              <Route path="/cotizacion">
                <ContactoPage />
              </Route>
              <Route path="/empleo">
                <EmpleoPage />
              </Route>
              {/* La política publicada es la colombiana (Ley 1581 de 2012); en
                  España no existe la ruta hasta tener la versión RGPD. */}
              {locale === "co" && (
                <Route path="/politica-tratamiento-datos">
                  <PoliticaDatosPage />
                </Route>
              )}
              {locale === "co" && (
                <Route path="/privacidad">
                  <PoliticaDatosPage />
                </Route>
              )}
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </main>
          <Footer />
          <WhatsAppButton />
          <JobVacancyPopup />
        </div>
      </Router>
    </LocaleProvider>
  );
}
