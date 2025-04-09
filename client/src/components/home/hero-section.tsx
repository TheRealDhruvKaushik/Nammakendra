import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="py-8 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Legal Help Made Simple</h1>
            <p className="text-xl md:text-2xl mb-6">Access, understand, and navigate legal information with ease.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
            <div className="w-full rounded-lg bg-white/10 p-2 shadow-lg">
              <svg 
                className="w-full h-auto" 
                viewBox="0 0 600 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="600" height="400" rx="8" fill="#f8f9fa" fillOpacity="0.1" />
                <path d="M300 80C380 80 450 150 450 230C450 310 380 380 300 380C220 380 150 310 150 230C150 150 220 80 300 80Z" fill="#f8f9fa" fillOpacity="0.2" />
                <path d="M300 120C358 120 405 167 405 225C405 283 358 330 300 330C242 330 195 283 195 225C195 167 242 120 300 120Z" fill="#f8f9fa" fillOpacity="0.3" />
                <path d="M290 180C290 174.477 294.477 170 300 170C305.523 170 310 174.477 310 180V270C310 275.523 305.523 280 300 280C294.477 280 290 275.523 290 270V180Z" fill="white" />
                <path d="M250 230C250 224.477 254.477 220 260 220H340C345.523 220 350 224.477 350 230C350 235.523 345.523 240 340 240H260C254.477 240 250 235.523 250 230Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
