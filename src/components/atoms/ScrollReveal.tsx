"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
