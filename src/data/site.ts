export interface Product {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  url: string;
  status: "live" | "beta" | "coming-soon";
  category: string;
  visual: {
    type: "placeholder" | "image";
    src?: string;
    alt?: string;
    accent: string;
  };
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  mission: string;
  location: string;
  contact: {
    email: string;
    phone?: string;
  };
  logo: {
    src: string;
    alt: string;
  };
  logoBrief: {
    src: string;
    alt: string;
  };
  logoMark: {
    src: string;
    alt: string;
  };
  logoMarkLight: {
    src: string;
    alt: string;
  };
}

export const company: CompanyInfo = {
  name: "New Origin Tech Ltd",
  shortName: "N.O.T",
  tagline: "Software that moves industries forward.",
  description:
    "A Ugandan software company building practical solutions for the industries that shape our economy. We refine workflows, automate operations, and deliver software that creates real business value.",
  mission:
    "We believe every industry deserves tools built for how it actually works — not borrowed from somewhere else.",
  location: "Uganda",
  contact: {
    email: "hello@neworigintech.com",
  },
  logo: {
    src: "/logo.png",
    alt: "New Origin Tech Ltd logo",
  },
  logoBrief: {
    src: "/logo-brief.png",
    alt: "New Origin Tech",
  },
  logoMark: {
    src: "/logo-mark.png",
    alt: "New Origin Tech mark",
  },
  logoMarkLight: {
    src: "/logo-mark-light.png",
    alt: "New Origin Tech mark",
  },
};

export const products: Product[] = [
  {
    id: "smartlandlords",
    name: "SmartLandlords",
    tagline: "Property management, reimagined.",
    summary:
      "A sophisticated property management platform that replaces traditional methods with streamlined tenant management, rent tracking, and property oversight — built for landlords who want clarity and control.",
    url: "https://thesmartlandlords.com",
    status: "live",
    category: "Property Management",
    visual: {
      type: "image",
      src: "/products/smartlandlords.png",
      alt: "SmartLandlords logo",
      accent: "SL",
    },
  },
  {
    id: "onthefarmtoday",
    name: "onTheFarmToday",
    tagline: "Farm management for the modern farmer.",
    summary:
      "A comprehensive farm management solution designed for today's agricultural operations — from crop planning and livestock tracking to harvest records and financial insights.",
    url: "https://onthefarmtoday.com",
    status: "live",
    category: "Agriculture",
    visual: {
      type: "image",
      src: "/products/onthefarmtoday.png",
      alt: "onTheFarmToday logo",
      accent: "OF",
    },
  },
  {
    id: "transit-haven",
    name: "Transit Haven",
    tagline: "From bar to hotel, one platform.",
    summary:
      "A bar management solution evolving into a full hotel management platform — handling inventory, orders, staff, and guest operations with the precision hospitality demands.",
    url: "https://test.thetransithaven.com",
    status: "beta",
    category: "Hospitality",
    visual: {
      type: "image",
      src: "/products/transit-haven.png",
      alt: "Transit Haven logo",
      accent: "TH",
    },
  },
];

export const values = [
  {
    title: "Industry-first",
    description:
      "We build for specific niches, not generic markets. Every product starts with how the industry actually operates.",
  },
  {
    title: "Workflow-driven",
    description:
      "We study existing processes before writing code. Automation should feel natural, not forced.",
  },
  {
    title: "Built to last",
    description:
      "Practical software that businesses can depend on — reliable, maintainable, and designed to grow with you.",
  },
];
