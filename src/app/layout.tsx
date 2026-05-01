import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Manrope } from "next/font/google";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "CooprStudio | Sitios web modernos desde cero",
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
    title: "CooprStudio | Sitios web modernos desde cero",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero-build.png",
        width: 1600,
        height: 900,
        alt: "Sitio web moderno creado por CooprStudio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CooprStudio | Sitios web modernos desde cero",
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
    "theme-color": "#0b0c0f",
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
    <html lang="es-MX" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
