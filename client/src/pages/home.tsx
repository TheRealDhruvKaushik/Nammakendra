import HeroSection from "@/components/home/hero-section";
import ServicesSection from "@/components/home/services-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>NammaSahayak - Legal Assistance for Everyone</title>
        <meta name="description" content="Access, understand, and navigate legal information with ease. NammaSahayak makes legal help simple." />
      </Helmet>
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
