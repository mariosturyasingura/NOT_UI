"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { company } from "@/data/site";

const words = [
  "workflows",
  "operations",
  "industries",
  "businesses",
  "growth",
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="hero-light relative flex min-h-screen flex-col justify-end px-6 pb-16 md:justify-center md:pb-0"
    >
      <div className="mx-auto w-full max-w-6xl pt-28 md:pt-32">
        {/* Main brand lockup — fills the space above the headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16"
        >
          <Image
            src={company.logo.src}
            alt={company.logo.alt}
            width={480}
            height={320}
            className="h-24 w-auto sm:h-28 md:h-36 lg:h-40"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8 text-sm tracking-[0.2em] uppercase text-neutral-500"
        >
          {company.location} &mdash; Software Company
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl text-5xl font-light leading-[1.08] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            We build software
            <br />
            for{" "}
            <span className="relative inline-block min-w-[4ch]">
              <motion.span
                key={wordIndex}
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block font-normal text-neutral-900"
              >
                {words[wordIndex]}
              </motion.span>
            </span>
            .
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-500 md:text-xl"
        >
          {company.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="#products"
            className="group inline-flex items-center gap-2 border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm tracking-wide text-white transition-all hover:bg-transparent hover:text-neutral-900"
          >
            View Products
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#contact"
            className="text-sm tracking-wide text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.15em] uppercase text-neutral-400">
            Scroll
          </span>
          <div className="h-8 w-px bg-neutral-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
