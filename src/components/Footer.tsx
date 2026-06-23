import { company } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-normal tracking-tight text-white">
            {company.name}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            &copy; {year} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#products"
            className="text-xs tracking-wide text-neutral-500 transition-colors hover:text-white"
          >
            Products
          </a>
          <a
            href="#about"
            className="text-xs tracking-wide text-neutral-500 transition-colors hover:text-white"
          >
            About
          </a>
          <a
            href={`mailto:${company.contact.email}`}
            className="text-xs tracking-wide text-neutral-500 transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
