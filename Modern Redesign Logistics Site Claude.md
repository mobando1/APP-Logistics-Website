# APP Logistics — Rediseño Web

## Descripción
Rediseño moderno del sitio web público de APP Logistics SAS, empresa colombiana especializada en servicios logísticos (cargue/descargue, distribución, bodega e inventarios). El sitio sirve dos audiencias: empresas B2B que buscan proveedor logístico, y personas naturales que buscan empleo.

## Stack Técnico
- **Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui + TanStack Query + Wouter
- **Backend:** Node.js + Express + TypeScript
- **Base de datos:** PostgreSQL + Drizzle ORM
- **Auth:** express-session + bcryptjs (solo para panel admin)
- **Emails:** Resend (notificaciones al recibir cotización o hoja de vida)
- **Archivos:** Multer (subida de hojas de vida en PDF/Word)
- **Pagos:** N/A
- **Deploy:** Replit

## Usuarios y Roles
- **Visitante (público):** Navega el sitio, solicita cotización, envía hoja de vida
- **Admin (interno):** Accede al panel para ver y gestionar solicitudes de cotización y hojas de vida recibidas

## Páginas / Rutas Principales

### Sitio Público
- `/` → Landing principal: hero, propuesta de valor, servicios destacados, cobertura, cifras clave, CTA de contacto
- `/servicios` → Detalle de los 4 servicios: Distribución de Mercancías, Cargue y Descargue, Operaciones en Bodega, Inventarios
- `/nosotros` → Historia de la empresa, misión, valores, equipo
- `/cobertura` → Sección con mapa o visualización de las 4 ciudades: Bogotá, Medellín, Cali, Barranquilla
- `/cotizacion` → Formulario de contacto comercial (nombre, empresa, ciudad, servicio requerido, mensaje)
- `/empleo` → Formulario de hoja de vida (nombre, ciudad, cargo al que aplica, experiencia, subida de archivo PDF/Word)
- `/contacto` → Información de contacto general, teléfonos, emails por ciudad

### Panel Admin (protegido)
- `/admin/login` → Acceso al panel con usuario y contraseña
- `/admin/cotizaciones` → Lista de solicitudes de cotización recibidas (filtros por fecha, ciudad, servicio)
- `/admin/hojas-de-vida` → Lista de candidatos con opción de descargar archivo adjunto
- `/admin/configuracion` → [PENDIENTE: definir si se puede editar contenido del sitio desde acá]

## Modelo de Negocio
- **Tipo:** Sitio corporativo / generación de leads (no e-commerce)
- **Moneda:** COP
- **Planes:** N/A
- **Monetización:** El sitio no cobra — convierte visitantes en leads calificados para el equipo comercial

## Integraciones Externas
- **Resend** — envío de emails al admin cuando llega una cotización o hoja de vida
- **[PENDIENTE]** — integración futura con portal de rastreo de envíos (en desarrollo separado)

## Estructura de Carpetas

```
client/src/
  components/
    layout/       → Navbar, Footer, Layout wrapper
    ui/           → componentes shadcn/ui
    sections/     → secciones reutilizables (HeroSection, ServicesSection, etc.)
    forms/        → FormCotizacion, FormEmpleo
  pages/
    Home.tsx
    Servicios.tsx
    Nosotros.tsx
    Cotizacion.tsx
    Empleo.tsx
    Contacto.tsx
    admin/
      Login.tsx
      Cotizaciones.tsx
      HojasDeVida.tsx
  lib/
    api.ts        → funciones de fetch con TanStack Query
    auth.ts       → helpers de sesión admin
    utils.ts

server/
  routes/
    cotizaciones.ts   → POST /api/cotizaciones, GET /api/admin/cotizaciones
    empleo.ts         → POST /api/empleo (con Multer), GET /api/admin/hojas-de-vida
    auth.ts           → POST /api/admin/login, POST /api/admin/logout
  services/
    email.ts          → lógica de envío con Resend
    storage.ts        → manejo de archivos subidos
  middleware/
    requireAdmin.ts   → protege rutas /api/admin/*
  db/
    schema.ts         → tablas: cotizaciones, hojas_de_vida, admins
```

## Diseño

- **Estilo:** Serio pero fresco — corporativo moderno, no genérico. Inspiración: entre Coordinadora y Lalamove
- **Componentes UI:** shadcn/ui
- **Colores primarios:** Azul oscuro `#1B3A6B` (institucional) + acento naranja `#F97316` (energía/logística)
- **Colores secundarios:** Gris claro `#F8FAFC` (fondos) + blanco `#FFFFFF`
- **Fuente:** Inter (sans-serif moderna, legible en todos los tamaños)
- **Dark mode:** No
- **Estilo visual:**
  - Tipografía grande y bold en el hero
  - Cards con sombra suave para los servicios
  - Sección de estadísticas/cifras animadas (años de experiencia, ciudades, clientes, operaciones)
  - Imágenes reales de operaciones logísticas (bodegas, cargue, distribución)
  - Iconografía limpia (Lucide Icons)

## Reglas de Negocio Importantes
- Solo usuarios admin autenticados pueden ver las solicitudes de cotización y hojas de vida
- Las hojas de vida se almacenan en servidor — solo admins pueden descargarlas
- Al recibir una cotización, se envía email automático al correo comercial de APP Logistics
- Al recibir una hoja de vida, se envía email automático al correo de RRHH de APP Logistics
- El sitio debe tener una clara separación visual entre la sección de clientes (B2B) y la sección de empleo
- Mobile-first en todos los componentes — ambas audiencias usan móvil y desktop

## Lo que NO hacer
- No usar Redux (usar TanStack Query)
- No crear archivos README.md ni documentación extra
- No instalar librerías sin preguntar primero
- No romper mobile-first
- No construir portal de rastreo ni portal de clientes — eso va en un proyecto separado
- No agregar funcionalidad de pagos
- No conectar con sistemas externos de ERP/TMS — integración futura

## Contexto Adicional
- La web actual está en Wix (`applogistics.co`) — el contenido de texto puede reutilizarse y mejorarse
- La empresa opera en Bogotá (sede principal), Medellín (desde ene 2020), Cali y Barranquilla (desde mar 2022)
- Los 4 servicios core son: Distribución de Mercancías, Cargue y Descargue, Operaciones en Bodega, Inventarios
- El panel admin es una fase 1.5 — se conectará al sistema de rastreo que están construyendo en paralelo
- [PENDIENTE: confirmar email(s) del cliente para recibir notificaciones de cotizaciones y RRHH]
- [PENDIENTE: confirmar si el cliente tiene fotografías propias de sus operaciones o se usan stock photos]
- [PENDIENTE: confirmar número de WhatsApp para botón flotante de contacto rápido]
