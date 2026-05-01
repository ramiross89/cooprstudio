import type { HeroSlide, ProcessStep, Service } from "@/lib/types";

export const navItems = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Diseño + desarrollo desde cero",
    headline: "Sitios web modernos que muestran lo mejor de tu negocio.",
    subheadline:
      "CooprStudio combina estrategia, interfaz y desarrollo Next.js para lanzar experiencias web rápidas, elegantes y fáciles de evolucionar.",
    primaryCta: { label: "Agendar diagnóstico", href: "#contacto" },
    secondaryCta: { label: "Ver servicios", href: "#servicios" },
  },
  {
    eyebrow: "Lanzamiento web + SEO",
    headline: "Lanzamos tu sitio para crecer en Google.",
    subheadline:
      "Cuidamos estructura semántica, performance, metadata, conversión y analítica para que el lanzamiento no solo se vea bien: también sea accionable.",
    primaryCta: { label: "Planear lanzamiento", href: "#contacto" },
    secondaryCta: { label: "Nuestro proceso", href: "#proceso" },
  },
  {
    eyebrow: "Soporte continuo",
    headline: "Cuando tu sitio está en línea, seguimos contigo.",
    subheadline:
      "Mantenimiento, mejoras iterativas, monitoreo y soporte para que tu presencia digital no se quede quieta después de publicar.",
    primaryCta: { label: "Solicitar soporte", href: "#contacto" },
    secondaryCta: { label: "Explorar servicios", href: "#servicios" },
  },
];

export const services: Service[] = [
  {
    title: "Diseño y desarrollo web desde cero",
    description:
      "Creamos una página clara, atractiva y fácil de navegar para que tu negocio se vea profesional desde el primer clic.",
    icon: "layers",
  },
  {
    title: "Lanzamiento web y SEO",
    description:
      "Preparamos tu sitio para salir al mundo con una presencia sólida y mejores oportunidades de aparecer cuando tus clientes te buscan.",
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
    title: "Construcción",
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
