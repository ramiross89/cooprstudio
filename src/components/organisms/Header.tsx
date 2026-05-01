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
    <header className="pointer-events-none fixed inset-x-0 top-[calc(var(--spacing)*3)] z-50 px-3 transition-shadow duration-300 sm:top-[calc(var(--spacing)*4)] sm:px-4">
      <Container
        className={cn(
          "pointer-events-auto flex min-h-14 max-w-5xl items-center justify-between gap-3 rounded-[28px] border border-zinc-800 bg-zinc-900/40 px-3 shadow-none backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-500 ease-out sm:min-h-16 sm:gap-4 sm:rounded-[32px] sm:px-5 lg:px-6",
          isScrolled
            ? "border-white/18 shadow-[0_22px_70px_rgba(0,0,0,0.38)]"
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
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-foreground md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {isOpen ? (
        <div className="pointer-events-auto mx-auto mt-3 w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/14 bg-ink/78 shadow-[0_22px_70px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:hidden">
          <Container className="grid max-w-5xl gap-2 px-3 py-3">
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
