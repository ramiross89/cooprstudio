import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "min-h-12 w-full rounded-[16px] border px-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/15",
        hasError ? "border-red-400" : "border-line",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
