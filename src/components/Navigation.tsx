"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/site";
import { useScrollTheme } from "./ScrollThemeProvider";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const { progress, navIsDark } = useScrollTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolidNav = scrolled || progress > 0.05;
  const navBg = navIsDark
    ? `color-mix(in srgb, #0a0a0a ${Math.max(progress, scrolled ? 0.92 : 0) * 100}%, transparent)`
    : showSolidNav
      ? `color-mix(in srgb, #fafafa 92%, transparent)`
      : "transparent";

  const borderColor = navIsDark ? "rgba(38, 38, 38, 0.8)" : "rgba(229, 229, 229, 0.8)";
  const linkClass = navIsDark
    ? "text-neutral-400 hover:text-white"
    : "text-neutral-500 hover:text-neutral-900";

  const markSrc = navIsDark ? company.logoMarkLight.src : company.logoMark.src;
  const markAlt = navIsDark ? company.logoMarkLight.alt : company.logoMark.alt;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500"
      style={{
        backgroundColor: showSolidNav || progress > 0.05 ? navBg : "transparent",
        borderBottom: showSolidNav || progress > 0.05 ? `1px solid ${borderColor}` : "1px solid transparent",
        backdropFilter: showSolidNav || progress > 0.05 ? "blur(12px)" : "none",
      }}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:py-5">
        <div className="flex items-center justify-start">
          <button
            className="relative z-50 flex h-8 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block h-px w-5 ${navIsDark ? "bg-white" : "bg-neutral-900"}`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block h-px w-5 ${navIsDark ? "bg-white" : "bg-neutral-900"}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block h-px w-5 ${navIsDark ? "bg-white" : "bg-neutral-900"}`}
            />
          </button>
        </div>

        <Link href="/" className="group flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={markSrc}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={markSrc}
                alt={markAlt}
                width={80}
                height={48}
                className="h-10 w-auto transition-opacity group-hover:opacity-75 md:h-11"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </Link>

        <ul className="hidden items-center justify-end gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${linkClass}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:hidden" />
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden ${
              navIsDark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"
            }`}
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-light tracking-wide"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
