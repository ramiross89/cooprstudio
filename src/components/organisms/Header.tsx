"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 8);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-white/40 bg-white border-gray-800 transition-shadow duration-300",
        isScrolled ? "shadow-[0_14px_36px_rgba(17,19,21,0.10)]" : "shadow-none",
      )}
    >
      <Container className="flex min-h-18 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
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
        <div className="hidden md:block">
          <Button href="#contacto">Empezar proyecto</Button>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line bg-white md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {isOpen ? (
        <div className="border-t border-line bg-background md:hidden">
          <Container className="grid gap-3 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-sm font-semibold text-muted hover:bg-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button href="#contacto" className="mt-2" onClick={() => setIsOpen(false)}>
              Empezar proyecto
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
