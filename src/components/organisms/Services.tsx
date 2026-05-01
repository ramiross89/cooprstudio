import { Activity, Layers3, Rocket } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { services } from "@/lib/content";

const icons = {
  activity: Activity,
  layers: Layers3,
  rocket: Rocket,
};

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-24 bg-background py-16 sm:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Servicios"
            title="Todo lo que necesitas para lanzar un sitio web moderno."
            description="Tenemos más de 10 años de experiencia ayudando a marcas, negocios y emprendedores a crear sitios web claros, modernos y preparados para crecer."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 120}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={icons[service.icon]}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
