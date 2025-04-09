import { Link } from "wouter";
import logoImage from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="py-8 md:py-16 bg-white text-gray-800 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#f0f0f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-10">
          <div className="bg-gradient-to-br from-gray-100 to-white p-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 relative animate-pulse-glow border border-gray-200">
            <img 
              src={logoImage} 
              alt="Nammakendra Logo" 
              className="h-48 md:h-64 w-auto relative z-10"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100/30 to-amber-50/20 animate-spin-slow"></div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">Legal Help Made Simple</h1>
            <p className="text-xl md:text-2xl mb-6 text-gray-700 font-medium">Access, understand, and navigate legal information with ease.</p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/namma-sahayak">
                <span className="inline-block bg-primary text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50">
                  Get Started
                </span>
              </Link>
              <Link href="/about">
                <span className="inline-block border-2 border-primary text-primary text-lg font-semibold px-6 py-3 rounded-lg hover:bg-primary/10 transition focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-30">
                  Learn More
                </span>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 header-title bg-gradient-to-r from-amber-500 via-orange-500 to-primary bg-clip-text text-transparent">NammaKendra</h2>
              <p className="text-xl mb-6 text-gray-700"><span className="text-amber-600 font-semibold">Nimma Maneyalli Sarkara</span> - Your trusted partner for legal guidance and support.</p>
              <p className="text-lg mb-4 text-gray-600 leading-relaxed">We make legal information accessible to everyone, especially elderly and underprivileged citizens.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
