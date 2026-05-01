import { Container } from "@/components/atoms/Container";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProcessStepCard } from "@/components/molecules/ProcessStepCard";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="proceso" className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Proceso"
              title="Un flujo claro para avanzar sin vueltas innecesarias."
              description="Cada fase deja decisiones, entregables y siguientes pasos definidos para reducir incertidumbre y acelerar el lanzamiento."
            />
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2">
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
