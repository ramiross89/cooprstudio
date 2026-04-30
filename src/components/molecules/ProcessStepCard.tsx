import type { ProcessStep } from "@/lib/types";

type ProcessStepCardProps = {
  item: ProcessStep;
};

export function ProcessStepCard({ item }: ProcessStepCardProps) {
  return (
    <article className="border-t border-line pt-6">
      <span className="font-mono text-sm font-bold text-brand">{item.step}</span>
      <h3 className="mt-4 text-xl font-black text-foreground">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
    </article>
  );
}
