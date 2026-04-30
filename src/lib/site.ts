export const siteConfig = {
  name: "CooprStudio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cooprstudio.com",
  description:
    "CooprStudio diseña, desarrolla y lanza páginas web modernas con SEO, soporte y mantenimiento continuo.",
  locale: "es_MX",
  email: "cooprstudio@gmail.com",
  keywords: [
    "diseño web",
    "desarrollo web",
    "páginas web",
    "landing pages",
    "SEO",
    "mantenimiento web",
  ],
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
