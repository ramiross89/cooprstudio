# CooprStudio Landing

Landing page moderna para **CooprStudio**, un estudio de diseño y desarrollo de páginas web desde cero. El proyecto está construido con Next.js App Router, React, TypeScript, Tailwind CSS y una arquitectura Atomic Design lista para desplegar en Vercel.

## Stack

- Next.js con App Router
- React + TypeScript
- Tailwind CSS
- Atomic Design: atoms, molecules, organisms y templates
- React Hook Form + Zod para validacion
- API Route mock para leads
- Vitest + React Testing Library
- GitHub Actions para lint, tests y build
- Preparado para Vercel

## Estructura

```txt
src/
  app/
    api/leads/route.ts
    layout.tsx
    page.tsx
  components/
    atoms/
    molecules/
    organisms/
    templates/
  lib/
  schemas/
  test/
```

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Variables de ambiente

Variables disponibles:

- `NEXT_PUBLIC_SITE_URL`: URL pública usada para metadata, canonical y Open Graph.
- `NEXT_PUBLIC_GA_ID`: Measurement ID de Google Analytics 4, por ejemplo `G-XXXXXXXXXX`.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: token de verificación de Google Search Console.
- `RESEND_API_KEY`: API key de Resend para enviar correos desde la API route.
- `LEADS_EMAIL_TO`: destinatario de los leads. Por defecto: `cooprstudio@gmail.com`.
- `LEADS_EMAIL_FROM`: remitente verificado en Resend. En producción usa un dominio verificado, por ejemplo `CooprStudio <hola@cooprstudio.com>`.

En Vercel, configura estas variables por ambiente: Preview y Production.

```env
NEXT_PUBLIC_SITE_URL=https://cooprstudio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
RESEND_API_KEY=
LEADS_EMAIL_TO=cooprstudio@gmail.com
LEADS_EMAIL_FROM=CooprStudio <onboarding@resend.dev>
```

Para producción, cambia `LEADS_EMAIL_FROM` a un remitente con dominio propio solo después de verificar el dominio en Resend.

## CI/CD

El workflow `.github/workflows/ci.yml` ejecuta:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

## Deploy en Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Configura las variables de ambiente para Preview y Production.
4. Vercel detectará Next.js y usará `npm ci` + `npm run build`.

## Notas de implementacion

- El formulario valida en cliente con Zod y también en la API route.
- El envío del formulario solo responde como exitoso si Resend acepta el correo del lead.
- La landing usa metadata completa, Open Graph, Twitter Card, canonical, JSON-LD, `robots.txt`, `sitemap.xml` e integración opcional con Google Analytics 4.
- Los fondos del carrusel se generan localmente con `npm run assets:generate` y viven en `public/images`.
