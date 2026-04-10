import { Switch, Route } from "wouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
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

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <AboutSection />
      <CoverageSection />
      <ClientsSection />
      <CTASection />
    </>
  );
}

function EmpleoPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-accent font-semibold text-sm uppercase tracking-wider">
          Únete al equipo
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 mb-4">
          Deja tu Hoja de Vida
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          ¿Deseas hacer parte de nuestro equipo? Déjanos tu hoja de vida y nos
          pondremos en contacto contigo.
        </p>
        <div className="bg-muted rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">
            Formulario de aplicación - Próximamente
          </p>
        </div>
      </div>
    </section>
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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
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
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
