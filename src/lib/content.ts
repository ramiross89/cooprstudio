import type { HeroSlide, ProcessStep, Service } from "@/lib/types";

export const navItems = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Diseño + desarrollo desde cero",
    headline: "Creamos páginas web listas para vender, medir y crecer.",
    subheadline:
      "CooprStudio combina estrategia, interfaz y desarrollo Next.js para lanzar experiencias web rápidas, elegantes y fáciles de evolucionar.",
    primaryCta: { label: "Agendar diagnóstico", href: "#contacto" },
    secondaryCta: { label: "Ver servicios", href: "#servicios" },
    image: "/images/hero-build.png",
  },
  {
    eyebrow: "Lanzamiento web + SEO",
    headline: "Tu sitio sale con base técnica, contenido claro y SEO inicial.",
    subheadline:
      "Cuidamos estructura semántica, performance, metadata, conversión y analítica para que el lanzamiento no solo se vea bien: también sea accionable.",
    primaryCta: { label: "Planear lanzamiento", href: "#contacto" },
    secondaryCta: { label: "Nuestro proceso", href: "#proceso" },
    image: "/images/hero-launch.png",
  },
  {
    eyebrow: "Soporte continuo",
    headline: "Despues del go-live seguimos optimizando contigo.",
    subheadline:
      "Mantenimiento, mejoras iterativas, monitoreo y soporte para que tu presencia digital no se quede quieta después de publicar.",
    primaryCta: { label: "Solicitar soporte", href: "#contacto" },
    secondaryCta: { label: "Explorar servicios", href: "#servicios" },
    image: "/images/hero-support.png",
  },
];

export const services: Service[] = [
  {
    title: "Diseño y desarrollo web desde cero",
    description:
      "Arquitectura, UI responsive, componentes reutilizables y desarrollo con Next.js, React, TypeScript y Tailwind CSS.",
    icon: "layers",
  },
  {
    title: "Lanzamiento web y SEO",
    description:
      "Preparación de metadata, Open Graph, estructura semántica, optimización técnica y despliegue en Vercel.",
    icon: "rocket",
  },
  {
    title: "Seguimiento y mantenimiento",
    description:
      "Soporte continuo, mejoras evolutivas, ajustes de contenido, medición y acompañamiento posterior al lanzamiento.",
    icon: "activity",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Diagnostico",
    description:
      "Aterrizamos objetivos, audiencia, mensajes clave y el alcance del primer lanzamiento.",
  },
  {
    step: "02",
    title: "Sistema visual",
    description:
      "Definimos una dirección visual moderna y componentes consistentes para escalar sin fricción.",
  },
  {
    step: "03",
    title: "Construccion",
    description:
      "Desarrollamos la experiencia en Next.js con código tipado, responsive y preparado para Vercel.",
  },
  {
    step: "04",
    title: "Lanzamiento y mejora",
    description:
      "Publicamos, validamos SEO/performance y dejamos una ruta clara de soporte y optimización.",
  },
];
