import { Link, useLocation } from "wouter";
import FontSizeControl from "@/components/ui/font-size-control";
import LanguageSelector from "@/components/ui/language-selector";
import { useAccessibility } from "@/context/accessibility-context";
import logoImage from "@/assets/logo-header.png";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-start mb-4 md:mb-0 -mt-2 relative">
            <div className="relative h-20 mr-3 z-10">
              <img 
                src={logoImage} 
                alt="Nammakendra Logo" 
                className="h-32 absolute -top-3 md:-top-4 md:h-36 -left-2 md:-left-3 transform hover:rotate-3 transition-transform duration-300"
                style={{ filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))" }}
              />
            </div>
            <div className="flex flex-col justify-center mt-3 ml-3 md:ml-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary">NammaKendra</h1>
              <span className="text-sm text-blue-500">Namma Mandyalli Sarkara</span>
            </div>
          </div>
          
          <div className="flex items-center mb-4 md:mb-0 md:order-3">
            <FontSizeControl />
            <LanguageSelector />
          </div>
          
          <nav className="md:order-2 w-full md:w-auto" aria-label="Main Navigation">
            <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <li>
                <Link 
                  href="/" 
                  className={`block px-3 py-2 text-lg ${location === "/" ? "text-primary border-b-2 border-primary font-semibold" : "text-neutral hover:text-primary"}`}
                  aria-current={location === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/namma-sahayak" 
                  className={`block px-3 py-2 text-lg ${location === "/namma-sahayak" ? "text-primary border-b-2 border-primary font-semibold" : "text-neutral hover:text-primary"}`}
                  aria-current={location === "/namma-sahayak" ? "page" : undefined}
                >
                  NammaSahayak
                </Link>
              </li>
              <li>
                <Link 
                  href="/namma-vidhana" 
                  className={`block px-3 py-2 text-lg ${location === "/namma-vidhana" ? "text-primary border-b-2 border-primary font-semibold" : "text-neutral hover:text-primary"}`}
                  aria-current={location === "/namma-vidhana" ? "page" : undefined}
                >
                  NammaVidhana
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`block px-3 py-2 text-lg ${location === "/contact" ? "text-primary border-b-2 border-primary font-semibold" : "text-neutral hover:text-primary"}`}
                  aria-current={location === "/contact" ? "page" : undefined}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
