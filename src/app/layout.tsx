import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "CooprStudio | Diseño y desarrollo web desde cero",
    template: "%s | CooprStudio",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "CooprStudio" }],
  creator: "CooprStudio",
  publisher: "CooprStudio",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "es-MX": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    title: "CooprStudio | Diseño y desarrollo web desde cero",
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    description: siteConfig.description,
    images: ["/images/hero-build.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "theme-color": "#1f7a68",
    "og:email": siteConfig.email,
    "og:url": absoluteUrl("/"),
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
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
