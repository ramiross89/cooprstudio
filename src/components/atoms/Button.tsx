import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-accent bg-accent text-white shadow-[0_18px_44px_rgba(31,122,104,0.26)] hover:border-brand-strong hover:bg-brand-strong",
  secondary:
    "border border-white/28 bg-white/12 text-white shadow-[0_18px_44px_rgba(0,0,0,0.14)] backdrop-blur-md hover:border-white/42 hover:bg-white/20",
  ghost: "text-foreground hover:bg-foreground/6",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] px-5 text-sm font-black tracking-normal transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 sm:px-6",
    variantClasses[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
