# AGENTS.md

## Regla Principal

No hagas cambios, implementaciones, refactors, instalaciones, decisiones técnicas, cambios visuales ni modificaciones de comportamiento por iniciativa propia. Solo actúa cuando el usuario lo indique explícitamente.

Si una decisión no está especificada por el usuario, pregunta antes de avanzar. No asumas preferencias de diseño, arquitectura, copy, dependencias, servicios externos, despliegue o configuración.

## Proyecto

Landing page de CooprStudio construida con:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Atomic Design
- Vitest + React Testing Library
- GitHub Actions
- Preparación para Vercel

## Flujo De Trabajo

- Antes de editar, revisa los archivos relacionados.
- Mantén los cambios estrictamente acotados a lo que el usuario pidió.
- No reestructures carpetas ni componentes si no fue solicitado.
- No cambies textos, colores, estilos, dependencias ni configuraciones sin instrucción directa.
- No agregues abstracciones nuevas salvo que el usuario lo pida.
- No elimines archivos ni reviertas cambios existentes sin autorización explícita.

## Captura Visual Antes De Push

Cada vez que se prepare o realice un push al repositorio Git, Codex debe generar una captura visual actualizada del sitio.

Proceso esperado:

1. Levantar el sitio localmente con el comando de desarrollo o preview correspondiente al proyecto.
2. Abrir la página principal en el navegador.
3. Tomar una captura de pantalla del sitio.
4. Guardar la imagen en `./screenshots/` o en una carpeta equivalente si el proyecto ya usa otra ubicación para evidencias visuales.
5. Nombrar el archivo con fecha y hora, por ejemplo `site-YYYY-MM-DD-HHMM.png`.
6. Incluir en el resumen final la ruta de la captura generada.

Si el sitio no puede ejecutarse o la captura no puede generarse, Codex debe explicar el motivo en el resumen final antes de considerar terminado el trabajo.

## Validación

Cuando el usuario pida un cambio de código, ejecuta validaciones relevantes si están disponibles:

- `npm run lint`
- `npm run test`
- `npm run build`

Si alguna validación no se puede ejecutar, informa el motivo.

## Seguridad

- No escribas secretos en archivos versionados.
- Usa `.env.local` para variables locales sensibles.
- Mantén `.env.example`, `.env.preview.example` y `.env.production.example` sin valores secretos reales.

## Estilo

- Usa español latinoamericano para textos visibles.
- Conserva la estructura Atomic Design existente.
- Mantén props tipadas con TypeScript.
- Prioriza código claro, simple y mantenible.
