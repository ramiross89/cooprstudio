import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, error, children }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      {label}
      {children}
      {error ? (
        <span className="text-sm font-medium text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
