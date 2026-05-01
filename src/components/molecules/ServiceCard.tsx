import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  return (
    <article className="group rounded-[8px] border border-line bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:border-brand/55">
      <div className="grid size-12 place-items-center rounded-[14px] border border-white/12 bg-white/8 text-brand transition group-hover:bg-brand/80 group-hover:text-ink">
        <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
      </div>
      <h3 className="mt-6 text-xl font-bold leading-snug tracking-[-0.01em] text-foreground">{title}</h3>
      <p className="mt-4 text-[0.95rem] leading-7 text-muted sm:text-base">{description}</p>
    </article>
  );
}
