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

Copia el archivo correspondiente al entorno que necesites:

```bash
cp .env.example .env.local
cp .env.preview.example .env.preview
cp .env.production.example .env.production
```

Variables disponibles:

- `NEXT_PUBLIC_SITE_URL`: URL pública usada para metadata, canonical y Open Graph.
- `RESEND_API_KEY`: API key de Resend para enviar correos desde la API route.
- `LEADS_EMAIL_TO`: destinatario de los leads. Por defecto: `cooprstudio@gmail.com`.
- `LEADS_EMAIL_FROM`: remitente verificado en Resend. En producción usa un dominio verificado, por ejemplo `CooprStudio <hola@cooprstudio.com>`.

En Vercel, configura `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `LEADS_EMAIL_TO` y `LEADS_EMAIL_FROM` por ambiente: Preview y Production.

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
- La landing usa metadata completa, Open Graph, Twitter Card, canonical y estructura semántica.
- Los fondos del carrusel se generan localmente con `npm run assets:generate` y viven en `public/images`.
