"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/ui/button";
import type { HeroSlide } from "@/lib/types";
import { cn } from "@/lib/utils";

type Point = {
  x: number;
  y: number;
};

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

type GlowyWavesHeroProps = {
  slides: HeroSlide[];
  activeIndex: number;
  isPaused: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  onTogglePaused: () => void;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function GlowyWavesHero({
  slides,
  activeIndex,
  isPaused,
  onPrevious,
  onNext,
  onSelectSlide,
  onTogglePaused,
}: GlowyWavesHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });
  const touchStartRef = useRef<Point | null>(null);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);

      const resolveColor = (variables: string[], alpha = 1) => {
        const tempEl = document.createElement("div");
        tempEl.style.position = "absolute";
        tempEl.style.visibility = "hidden";
        tempEl.style.width = "1px";
        tempEl.style.height = "1px";
        document.body.appendChild(tempEl);

        let color = `rgba(255, 255, 255, ${alpha})`;

        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim();

          if (value) {
            tempEl.style.backgroundColor = `var(${variable})`;
            const computedColor = getComputedStyle(tempEl).backgroundColor;

            if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
              if (alpha < 1) {
                const rgbMatch = computedColor.match(
                  /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/,
                );
                color = rgbMatch
                  ? `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`
                  : computedColor;
              } else {
                color = computedColor;
              }
              break;
            }
          }
        }

        document.body.removeChild(tempEl);
        return color;
      };

      return {
        backgroundTop: resolveColor(["--background"], 1),
        backgroundBottom: resolveColor(["--ink", "--background"], 1),
        wavePalette: [
          {
            offset: 0,
            amplitude: 70,
            frequency: 0.003,
            color: resolveColor(["--brand"], 0.8),
            opacity: 0.45,
          },
          {
            offset: Math.PI / 2,
            amplitude: 90,
            frequency: 0.0026,
            color: resolveColor(["--accent", "--brand"], 0.7),
            opacity: 0.35,
          },
          {
            offset: Math.PI,
            amplitude: 60,
            frequency: 0.0034,
            color: resolveColor(["--muted", "--foreground"], 0.55),
            opacity: 0.24,
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 80,
            frequency: 0.0022,
            color: resolveColor(["--foreground"], 0.2),
            opacity: 0.18,
          },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();

    const handleThemeMutation = () => {
      themeColors = computeThemeColors();
    };

    const observer = new MutationObserver(handleThemeMutation);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseLeave = () => {
      recenterMouse();
    };

    resizeCanvas();
    recenterMouse();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      time += 1;

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, themeColors.backgroundTop);
      gradient.addColorStop(1, themeColors.backgroundBottom);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      themeColors.wavePalette.forEach(drawWave);

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  const isMobileTouch = () =>
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    if (!isMobileTouch()) {
      return;
    }

    const touch = event.touches.item(0);

    if (!touch) {
      return;
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (!touchStartRef.current || !isMobileTouch()) {
      touchStartRef.current = null;
      return;
    }

    const touch = event.changedTouches.item(0);

    if (!touch) {
      touchStartRef.current = null;
      return;
    }

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

    if (isHorizontalSwipe) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrevious();
      }
    }

    touchStartRef.current = null;
  };

  return (
    <section
      className="relative isolate min-h-svh overflow-hidden bg-background text-white"
      role="region"
      aria-label="Presentación principal"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.045] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.035] blur-[120px]" />
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-brand/[0.06] blur-[150px]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(8,9,11,0.22),rgba(8,9,11,0.72))]" />
      <div className="noise-overlay absolute inset-0 opacity-20" />

      <Container className="relative z-10 flex min-h-svh items-center pb-32 pt-28 sm:py-16">
        <motion.div
          key={activeSlide.headline}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={itemVariants}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-background/60 px-3 py-2 text-[0.68rem] font-extrabold uppercase leading-5 tracking-[0.14em] text-white/82 backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.18em]"
          >
            <Sparkles className="h-4 w-4 text-brand" aria-hidden="true" />
            {activeSlide.eyebrow}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl text-[2.35rem] font-extrabold leading-[1.03] tracking-[-0.04em] text-white sm:mt-7 sm:text-[4.25rem] sm:leading-[1] sm:tracking-[-0.045em] lg:text-[4.6rem]"
          >
            {activeSlide.headline}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-white/72 sm:mt-6 sm:text-xl sm:leading-8"
          >
            {activeSlide.subheadline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"
          >
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href={activeSlide.primaryCta.href}>
                {activeSlide.primaryCta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href={activeSlide.secondaryCta.href}>
                {activeSlide.secondaryCta.label}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <div className="absolute bottom-6 left-0 right-0 z-10">
        <Container className="flex items-center justify-between gap-4">
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
                onClick={() => onSelectSlide(index)}
              />
            ))}
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label={isPaused ? "Reanudar slider" : "Pausar slider"}
              aria-pressed={isPaused}
              className="grid size-8 place-items-center rounded-full border border-white/22 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22 sm:size-9"
              onClick={onTogglePaused}
            >
              {isPaused ? (
                <Play aria-hidden="true" size={15} />
              ) : (
                <Pause aria-hidden="true" size={15} />
              )}
            </button>
            <button
              type="button"
              aria-label="Slide anterior"
              className="grid size-8 place-items-center rounded-full border border-white/22 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22 sm:size-9"
              onClick={onPrevious}
            >
              <ChevronLeft aria-hidden="true" size={17} />
            </button>
            <button
              type="button"
              aria-label="Slide siguiente"
              className="grid size-8 place-items-center rounded-full border border-white/22 bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22 sm:size-9"
              onClick={onNext}
            >
              <ChevronRight aria-hidden="true" size={17} />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
