import { Switch, Route } from "wouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import ServicesSection from "./components/sections/ServicesSection";
import CoverageSection from "./components/sections/CoverageSection";
import ServiciosPage from "./pages/Servicios";
import NosotrosPage from "./pages/Nosotros";
import ContactoPage from "./pages/Contacto";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CoverageSection />
    </>
  );
}

function EmpleoPage() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold italic text-primary mb-4 border-b pb-4">
          Deja tu Hoja de Vida
        </h1>
        <p className="text-muted-foreground mb-8">
          ¿Deseas hacer parte de nuestro equipo? Déjanos tu hoja de vida y nos
          pondremos en contacto contigo.
        </p>
        <p className="text-muted-foreground">Próximamente</p>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          404 - Página no encontrada
        </h1>
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
      <main className="flex-1 pt-16">
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
