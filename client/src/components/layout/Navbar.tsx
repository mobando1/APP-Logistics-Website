import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@client/lib/utils";
import { useLocale } from "@client/lib/LocaleContext";
import LocaleSwitcher from "./LocaleSwitcher";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contáctenos" },
];

export default function Navbar() {
  const { content } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo-app.png"
              alt="APP Logistics"
              className="h-9 lg:h-11 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  location === link.href
                    ? "text-accent font-semibold"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.label}
                {location === link.href && (
                  <div className="h-0.5 bg-accent rounded-full mt-0.5" />
                )}
              </Link>
            ))}

            <div className="ml-4 flex items-center gap-3">
              {!content.contact.hidePhone && (
                <a
                  href={`tel:${content.contact.phoneTel}`}
                  className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {content.contact.navPhoneShort}
                </a>
              )}
              <LocaleSwitcher />
              <Link
                href="/contacto"
                className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-accent/25"
              >
                Cotizar
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LocaleSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-80 border-t" : "max-h-0"
        )}
      >
        <div className="bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-3 px-4 text-sm font-medium rounded-lg transition-colors",
                location === link.href
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-foreground/70 hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="block bg-accent text-white text-center px-6 py-3 rounded-lg text-sm font-semibold mt-3"
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </nav>
  );
}
