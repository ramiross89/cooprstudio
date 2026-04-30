import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  return (
    <article className="group rounded-[8px] border border-line bg-white p-6 shadow-[0_24px_80px_rgba(17,19,21,0.06)] transition hover:-translate-y-1 hover:border-brand/40">
      <div className="grid size-12 place-items-center rounded-[8px] bg-surface-strong text-brand transition group-hover:bg-brand group-hover:text-white">
        <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
      </div>
      <h3 className="mt-6 text-xl font-black text-foreground">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
    </article>
  );
}
