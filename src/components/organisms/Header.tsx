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
    <header className="pointer-events-none sticky top-[calc(var(--spacing)*4)] z-50 px-4 pt-4 transition-shadow duration-300">
      <Container
        className={cn(
          "pointer-events-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 rounded-[32px] bg-zinc-900/40 backdrop-blur-md border border-zinc-800 transition-all duration-300 sm:px-5 lg:px-6",
          isScrolled
            ? "border-white/18"
            : "border-white/12",
        )}
      >
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
          <Button href="#contacto" className="!min-h-10 !px-4 !text-xs">
            Empezar proyecto
          </Button>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line bg-surface text-foreground md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {isOpen ? (
        <div className="pointer-events-auto mx-auto mt-3 w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/14 bg-ink/78 shadow-[0_22px_70px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:hidden">
          <Container className="grid max-w-5xl gap-3 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-sm font-semibold text-muted hover:bg-surface"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              href="#contacto"
              className="mt-2 !min-h-10 !px-4 !text-xs"
              onClick={() => setIsOpen(false)}
            >
              Empezar proyecto
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
