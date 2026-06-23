"use client";

import { company } from "@/data/site";
import { Reveal } from "./Reveal";

export function ContactCTA() {
  return (
    <section id="contact" className="border-t border-neutral-800 px-6 py-32">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="mb-4 text-sm tracking-[0.2em] uppercase text-neutral-500">
            Contact
          </p>
          <h2 className="text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            Let&apos;s build something
            <br />
            worth using.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-neutral-400">
            Whether you need a product demo or want to discuss a custom
            solution, we&apos;d like to hear from you.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <a
              href={`mailto:${company.contact.email}`}
              className="group inline-flex items-center gap-3 border border-white px-8 py-4 text-sm tracking-wide text-white transition-all hover:bg-white hover:text-neutral-900"
            >
              {company.contact.email}
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
