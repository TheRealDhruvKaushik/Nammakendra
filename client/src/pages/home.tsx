import HeroSection from "@/components/home/hero-section";
import ServicesSection from "@/components/home/services-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import SEOHead from "@/components/seo/seo-head";
import { pageMetadata } from "@/lib/seo";
import { useLanguage } from "@/context/language-context";

const Home = () => {
  const { language } = useLanguage();
  
  // Create language alternatives for SEO
  const langAlternates = [
    { lang: 'en', path: '/' },
    { lang: 'kn', path: '/' }
  ];
  
  return (
    <>
      <SEOHead 
        pageMetadata={pageMetadata.home}
        pagePath="/"
        langAlternates={langAlternates}
      />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
};

export default Home;
