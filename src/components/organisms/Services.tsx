import { Activity, Layers3, Rocket } from "lucide-react";
import { Container } from "@/components/atoms/Container";
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
    <section id="servicios" className="bg-background py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo necesario para lanzar una presencia web seria."
          description="Trabajamos desde la idea inicial hasta el seguimiento post-lanzamiento, con una base técnica preparada para crecer."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={icons[service.icon]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
