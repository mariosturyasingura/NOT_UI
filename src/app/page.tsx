import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { AboutSection } from "@/components/AboutSection";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";
import { ThemeTransition } from "@/components/ThemeTransition";
import { products } from "@/data/site";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navigation />
      <main>
        <Hero />
        <ThemeTransition />
        <div className="section-dark">
          <ProductShowcase products={products} />
          <AboutSection />
          <ContactCTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
