import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full resize-y rounded-[16px] border px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/15",
        hasError ? "border-red-400" : "border-line",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
