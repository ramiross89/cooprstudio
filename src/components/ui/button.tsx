import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "lg";

export type UiButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "border border-accent bg-accent !text-black hover:border-brand-strong hover:bg-brand-strong hover:!text-black",
  outline:
    "border border-white/24 bg-white/8 text-white backdrop-blur-md hover:border-white/42 hover:bg-white/14",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-sm",
};

export function Button({
  children,
  variant = "default",
  size = "default",
  asChild = false,
  className,
  type = "button",
  ...props
}: UiButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[8px] font-bold tracking-[-0.01em] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
