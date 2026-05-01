import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { navItems } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-background pb-10 pt-5 sm:pt-6">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted">
           © 2025 CooprStudio. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4" aria-label="Footer">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
