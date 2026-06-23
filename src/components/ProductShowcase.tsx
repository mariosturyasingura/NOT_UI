"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/site";
import { Reveal } from "./Reveal";

interface ProductCardProps {
  product: Product;
  index: number;
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const labels = {
    live: "Live",
    beta: "Beta",
    "coming-soon": "Coming Soon",
  };

  return (
    <span className="text-xs tracking-[0.15em] uppercase text-neutral-500">
      {labels[status]}
    </span>
  );
}

function ProductVisual({ product }: { product: Product }) {
  if (product.visual.type === "image" && product.visual.src) {
    return (
      <div className="product-card-visual relative aspect-[4/3] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
          <motion.div
            className="product-logo-glow relative h-full w-full"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={product.visual.src}
              alt={product.visual.alt ?? product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="product-card-visual relative aspect-[4/3] w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-6xl font-light tracking-tighter text-neutral-800 select-none md:text-8xl">
          {product.visual.accent}
        </span>
      </div>
    </div>
  );
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <Reveal delay={index * 0.15}>
      <motion.a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <article className="overflow-hidden border border-neutral-800 bg-black transition-all duration-500 group-hover:border-neutral-600 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.04)]">
          <ProductVisual product={product} />

          <div className="border-t border-neutral-800 p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs tracking-[0.15em] uppercase text-neutral-500">
                {product.category}
              </span>
              <StatusBadge status={product.status} />
            </div>

            <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">
              {product.name}
            </h3>

            <p className="mt-2 text-sm text-neutral-400">{product.tagline}</p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-500 line-clamp-3">
              {product.summary}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm tracking-wide text-neutral-400 transition-colors group-hover:text-white">
              <span>Visit</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </div>
          </div>
        </article>
      </motion.a>
    </Reveal>
  );
}

export function ProductShowcase({ products }: { products: Product[] }) {
  return (
    <section id="products" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-[0.2em] uppercase text-neutral-500">
            Products
          </p>
          <h2 className="max-w-2xl text-4xl font-light leading-tight tracking-tight text-white md:text-5xl">
            Software built for the industries that matter.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
