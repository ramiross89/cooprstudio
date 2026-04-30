"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import type { HeroSlide } from "@/lib/types";
import { cn } from "@/lib/utils";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section aria-label="Presentacion principal" className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-ink text-white">
      {slides.map((slide, index) => (
        <div
          key={slide.headline}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
            index === activeIndex ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={index !== activeIndex}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,18,0.88),rgba(7,13,18,0.58),rgba(7,13,18,0.18))]" />
      <div className="noise-overlay absolute inset-0 opacity-45" />

      <Container className="relative flex min-h-[calc(100svh-72px)] items-center py-16">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md">
            {activeSlide.eyebrow}
          </p>
          <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-normal text-white sm:text-6xl lg:text-7xl">
            {activeSlide.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-xl">
            {activeSlide.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={activeSlide.primaryCta.href}>
              {activeSlide.primaryCta.label}
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
            <Button href={activeSlide.secondaryCta.href} variant="secondary">
              {activeSlide.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-6 left-0 right-0">
        <Container className="flex items-center justify-between gap-5">
          <div className="flex gap-2" aria-label="Slides">
            {slides.map((slide, index) => (
              <button
                key={slide.headline}
                type="button"
                aria-label={`Mostrar slide ${index + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex ? "w-10 bg-accent" : "w-2.5 bg-white/42",
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Slide anterior"
              className="grid size-11 place-items-center rounded-full border border-white/22 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22"
              onClick={goToPrevious}
            >
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <button
              type="button"
              aria-label="Slide siguiente"
              className="grid size-11 place-items-center rounded-full border border-white/22 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22"
              onClick={goToNext}
            >
              <ChevronRight aria-hidden="true" size={20} />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
