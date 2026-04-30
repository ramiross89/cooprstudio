import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cooprstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CooprStudio | Diseño y desarrollo web desde cero",
    template: "%s | CooprStudio",
  },
  description:
    "CooprStudio diseña, desarrolla y lanza páginas web modernas con SEO, soporte y mantenimiento continuo.",
  keywords: [
    "diseño web",
    "desarrollo web",
    "landing pages",
    "SEO",
    "Next.js",
    "Vercel",
    "mantenimiento web",
  ],
  authors: [{ name: "CooprStudio" }],
  creator: "CooprStudio",
  publisher: "CooprStudio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    title: "CooprStudio | Diseño y desarrollo web desde cero",
    description:
      "Landing, sitios y experiencias web construidas desde cero con lanzamiento, SEO y soporte continuo.",
    siteName: "CooprStudio",
    images: [
      {
        url: "/images/hero-build.png",
        width: 1600,
        height: 900,
        alt: "Interfaz web moderna creada por CooprStudio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CooprStudio | Diseño y desarrollo web desde cero",
    description:
      "Diseño, desarrollo, lanzamiento SEO y mantenimiento continuo para marcas que necesitan crecer en web.",
    images: ["/images/hero-build.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
