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
          "text-sm font-bold uppercase tracking-[0.18em]",
          tone === "dark" ? "text-accent" : "text-brand",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl font-black tracking-normal sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-5 text-base leading-8 sm:text-lg",
          tone === "dark" ? "text-white/74" : "text-muted",
        )}
      >
        {description}
      </p>
    </div>
  );
}
