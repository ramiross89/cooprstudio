import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p
        className={cn(
          "text-xs font-extrabold uppercase tracking-[0.18em] sm:text-sm",
          tone === "dark" ? "text-accent" : "text-brand",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-[1.95rem] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[2.85rem] sm:leading-[1.05] lg:text-[3.5rem]",
          tone === "dark" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      <div className="mt-5 h-1 w-24 rounded-full bg-accent sm:mt-6" aria-hidden="true" />
      <p
        className={cn(
          "mt-5 text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8",
          tone === "dark" ? "text-white/74" : "text-muted",
        )}
      >
        {description}
      </p>
    </div>
  );
}
