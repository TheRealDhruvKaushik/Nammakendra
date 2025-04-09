import { Link } from "wouter";
import logoImage from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="py-8 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-10">
          <div className="bg-white p-5 rounded-full shadow-lg">
            <img 
              src={logoImage} 
              alt="Nammakendra Logo" 
              className="h-48 md:h-64 w-auto"
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Legal Help Made Simple</h1>
            <p className="text-xl md:text-2xl mb-6">Access, understand, and navigate legal information with ease.</p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/namma-sahayak">
                <span className="inline-block bg-white text-primary text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
                  Get Started
                </span>
              </Link>
              <Link href="/about">
                <span className="inline-block border-2 border-white text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">NammaKendra</h2>
              <p className="text-xl mb-6">Namma Mandyalli Sarkara - Your trusted partner for legal guidance and support.</p>
              <p className="text-lg mb-4">We make legal information accessible to everyone, especially elderly and underprivileged citizens.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
