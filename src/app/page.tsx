import { LandingPageTemplate } from "@/components/templates/LandingPageTemplate";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        logo: absoluteUrl("/images/logo-cooprstudio.jpg"),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "es-MX",
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": absoluteUrl("/#service"),
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl("/images/hero-build.png"),
        email: siteConfig.email,
        areaServed: "Latinoamérica",
        description: siteConfig.description,
        serviceType: [
          "Diseño y desarrollo web desde cero",
          "Lanzamiento web y SEO",
          "Seguimiento, soporte y mantenimiento",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPageTemplate />
    </>
  );
}
