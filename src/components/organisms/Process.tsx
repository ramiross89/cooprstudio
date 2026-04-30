import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProcessStepCard } from "@/components/molecules/ProcessStepCard";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="proceso" className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Proceso"
            title="Un flujo claro para avanzar sin vueltas innecesarias."
            description="Cada fase deja decisiones, entregables y siguientes pasos definidos para reducir incertidumbre y acelerar el lanzamiento."
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {processSteps.map((item) => (
              <ProcessStepCard key={item.step} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
