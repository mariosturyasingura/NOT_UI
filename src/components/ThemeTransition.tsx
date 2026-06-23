"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollTheme } from "./ScrollThemeProvider";

export function ThemeTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setTransitionProgress } = useScrollTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(p);
      setTransitionProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setTransitionProgress]);

  const bg = `color-mix(in srgb, #fafafa ${(1 - progress) * 100}%, #0a0a0a)`;
  const color = `color-mix(in srgb, #0a0a0a ${(1 - progress) * 100}%, #fafafa)`;
  const labelOpacity = progress > 0.2 && progress < 0.8 ? 1 : progress <= 0.2 ? progress / 0.2 : (1 - progress) / 0.2;

  return (
    <div ref={containerRef} className="relative" style={{ height: "120vh" }}>
      <div
        className="sticky top-0 flex h-screen items-center justify-center"
        style={{ background: bg, color }}
      >
        <motion.p
          className="text-sm tracking-[0.3em] uppercase md:text-base"
          style={{ opacity: Math.min(Math.max(labelOpacity, 0), 1) }}
        >
          Our Products
        </motion.p>
      </div>
    </div>
  );
}
