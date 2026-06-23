"use client";

import { company, values } from "@/data/site";
import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-neutral-800 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-sm tracking-[0.2em] uppercase text-neutral-500">
              What We Do
            </p>
            <h2 className="text-4xl font-light leading-tight tracking-tight text-white md:text-5xl">
              Refining workflows.
              <br />
              Automating operations.
              <br />
              Delivering value.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-neutral-400">
              {company.description}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
              {company.mission}
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-px bg-neutral-800 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.1}>
              <div className="bg-[#0a0a0a] p-8 md:p-10">
                <h3 className="text-lg font-normal tracking-tight text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
