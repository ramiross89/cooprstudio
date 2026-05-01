import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProcessStepCard } from "@/components/molecules/ProcessStepCard";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="proceso" className="scroll-mt-24 bg-surface py-16 sm:py-28">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Proceso"
              title="Un proceso claro para avanzar con seguridad."
              description="Trabajamos por etapas para que sepas qué estamos haciendo, qué necesitamos de ti y cuál es el siguiente paso en todo momento."
            />
          </ScrollReveal>
          <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
            {processSteps.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 100}>
                <ProcessStepCard item={item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
