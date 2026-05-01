"use client";

import { useEffect, useState } from "react";
import { GlowyWavesHero } from "@/components/ui/glowy-waves-hero-shadcnui";
import type { HeroSlide } from "@/lib/types";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const togglePaused = () => {
    setIsPaused((current) => !current);
  };

  return (
    <GlowyWavesHero
      slides={slides}
      activeIndex={activeIndex}
      isPaused={isPaused}
      onPrevious={goToPrevious}
      onNext={goToNext}
      onSelectSlide={setActiveIndex}
      onTogglePaused={togglePaused}
    />
  );
}
