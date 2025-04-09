import { Link, useLocation } from "wouter";
import LanguageSelector from "@/components/ui/language-selector";
import { useAccessibility } from "@/context/accessibility-context";
import { useTranslation } from "@/hooks/use-translation";
import logoImage from "@/assets/logo-header.png";

const Header = () => {
  const [location] = useLocation();
  const { t } = useTranslation();

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
                style={{ filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))" }}
              />
            </div>
            <div className="flex flex-col justify-center mt-3 ml-3 md:ml-6">
              <h1 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent header-title hover:scale-105 transition-transform duration-300"
                data-i18n-key="nammakendra"
              >
                {t('nammakendra')}
              </h1>
              <span 
                className="text-sm bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
                data-i18n-key="motto"
              >
                {t('motto')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center mb-4 md:mb-0 md:order-3">
            <LanguageSelector />
          </div>
          
          <nav className="md:order-2 w-full md:w-auto" aria-label="Main Navigation">
            <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <li>
                <Link 
                  href="/" 
                  className={`block px-3 py-2 text-lg relative group ${location === "/" ? "text-primary font-semibold" : "text-gray-600"}`}
                  aria-current={location === "/" ? "page" : undefined}
                >
                  <span 
                    className={`${location === "/" ? "" : "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent"} transition-all duration-300`} 
                    data-i18n-key="home"
                  >
                    {t('home')}
                  </span>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 ${location === "/" ? "w-full" : ""}`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/namma-sahayak" 
                  className={`block px-3 py-2 text-lg relative group ${location === "/namma-sahayak" ? "text-primary font-semibold" : "text-gray-600"}`}
                  aria-current={location === "/namma-sahayak" ? "page" : undefined}
                >
                  <span 
                    className={`${location === "/namma-sahayak" ? "" : "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent"} transition-all duration-300`}
                    data-i18n-key="namma_sahayak"
                  >
                    {t('namma_sahayak')}
                  </span>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 ${location === "/namma-sahayak" ? "w-full" : ""}`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/namma-vidhana" 
                  className={`block px-3 py-2 text-lg relative group ${location === "/namma-vidhana" ? "text-primary font-semibold" : "text-gray-600"}`}
                  aria-current={location === "/namma-vidhana" ? "page" : undefined}
                >
                  <span 
                    className={`${location === "/namma-vidhana" ? "" : "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent"} transition-all duration-300`}
                    data-i18n-key="namma_vidhana"
                  >
                    {t('namma_vidhana')}
                  </span>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 ${location === "/namma-vidhana" ? "w-full" : ""}`}></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`block px-3 py-2 text-lg relative group ${location === "/contact" ? "text-primary font-semibold" : "text-gray-600"}`}
                  aria-current={location === "/contact" ? "page" : undefined}
                >
                  <span 
                    className={`${location === "/contact" ? "" : "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent"} transition-all duration-300`}
                    data-i18n-key="contact"
                  >
                    {t('contact')}
                  </span>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 ${location === "/contact" ? "w-full" : ""}`}></span>
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
