import { ContactForm } from "@/components/organisms/ContactForm";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { HeroCarousel } from "@/components/organisms/HeroCarousel";
import { Process } from "@/components/organisms/Process";
import { Services } from "@/components/organisms/Services";
import { heroSlides } from "@/lib/content";

export function LandingPageTemplate() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel slides={heroSlides} />
        <Services />
        <Process />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
