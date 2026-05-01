export type Cta = {
  label: string;
  href: string;
};

export type HeroSlide = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

export type Service = {
  title: string;
  description: string;
  icon: "activity" | "layers" | "rocket";
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};
