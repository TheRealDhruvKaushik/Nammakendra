import { Link, useLocation } from "wouter";
import { useLanguage } from "@/context/language-context";
import LanguageSelector from "@/components/ui/language-selector";
import { useState, useEffect } from "react";

const Header = () => {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Navigation menu text constants
  const navItems = [
    { href: "/", label: t('nav.home'), key: "home" },
    { href: "/namma-sahayak", label: t('nav.sahayak'), key: "namma_sahayak" },
    { href: "/namma-sarkara", label: t('nav.sarkara'), key: "namma_sarkara" },
    { href: "/namma-vidhana", label: t('nav.vidhana'), key: "namma_vidhana" },
    { href: "/contact", label: t('nav.contact'), key: "contact" }
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 relative z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/">
                <img 
                  src="/voice_logo.png"
                  alt="Nammakendra Logo" 
                  className="h-14 mr-3 transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div>
                <h1 
                  className="text-2xl md:text-3xl font-bold header-title hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent"
                >
                  {t('nav.logo')}
                </h1>
                <span 
                  className="text-sm bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
                >
                  {t('nav.slogan')}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <nav aria-label="Main Navigation">
                <ul className="flex items-center space-x-6">
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
              <LanguageSelector />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-gray-800 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Navigation */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Side Panel */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="p-4" aria-label="Mobile Navigation">
              <ul className="space-y-2">
                {navItems.map(({ href, label, key }) => (
                  <li key={key}>
                    <Link 
                      href={href}
                      className={`block px-4 py-3 rounded-lg text-lg transition-all duration-200 ${
                        location === href 
                          ? "bg-primary text-white font-semibold" 
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                      aria-current={location === href ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
