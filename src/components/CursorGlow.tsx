"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollTheme } from "./ScrollThemeProvider";

export function CursorGlow() {
  const { isDark } = useScrollTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-40 hidden md:block"
      animate={{
        x: position.x - 200,
        y: position.y - 200,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      style={{ width: 400, height: 400 }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
