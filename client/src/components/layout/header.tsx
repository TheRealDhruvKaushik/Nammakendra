import { Link, useLocation } from "wouter";
import logoImage from "@/assets/Nammakendra_logo_crisp-removebg-preview.png";
import { useLanguage } from "@/context/language-context";
import LanguageSelector from "@/components/ui/language-selector";

const Header = () => {
  const [location] = useLocation();
  const { t } = useLanguage();

  // Navigation menu text constants
  const navItems = [
    { href: "/", label: t('nav.home'), key: "home" },
    { href: "/namma-sahayak", label: t('nav.sahayak'), key: "namma_sahayak" },
    { href: "/namma-vidhana", label: t('nav.vidhana'), key: "namma_vidhana" },
    { href: "/contact", label: t('nav.contact'), key: "contact" }
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Nammakendra Logo" 
                className="h-14 mr-3 transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <div>
              <h1 
                className="text-2xl md:text-3xl font-bold header-title hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent"
              >
                NammaKendra
              </h1>
              <span 
                className="text-sm bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
              >
                Legal Assistance Simplified
              </span>
            </div>
          </div>

          <nav className="md:order-2 w-full md:w-auto" aria-label="Main Navigation">
            <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              {navItems.map(({ href, label, key }) => (
                <li key={key}>
                  <Link 
                    href={href}
                    className={`block px-3 py-2 text-lg relative group ${
                      location === href ? "text-primary font-semibold" : "text-gray-800"
                    }`}
                    aria-current={location === href ? "page" : undefined}
                  >
                    <span 
                      className={`transition-all duration-300 ${
                        location === href
                          ? ""
                          : "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent"
                      }`}
                    >
                      {label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 ${
                        location === href ? "w-full" : ""
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
