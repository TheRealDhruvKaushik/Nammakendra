import { Link } from "wouter";
import { useLanguage } from "@/context/language-context";

const ServicesSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">{t('services.title')}</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t('services.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* NammaSahayak Card */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col">
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t('services.sahayak.title')}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t('services.sahayak.description')}</p>
              <ul className="mb-6 space-y-2 flex-grow">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.sahayak.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.sahayak.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.sahayak.feature3')}</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link href="/namma-sahayak">
                  <span className="inline-block bg-primary text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 w-full text-center">
                    {t('services.sahayak.button')}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* NammaSarkara Card */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col">
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{backgroundColor: '#5C6BC0', opacity: 0.1}}>
                  <svg className="h-6 w-6" style={{color: '#5C6BC0'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21L12 13.5L21 21V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13.5V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t('services.sarkara.title')}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t('services.sarkara.description')}</p>
              <ul className="mb-6 space-y-2 flex-grow">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.sarkara.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.sarkara.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.sarkara.feature3')}</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link href="/namma-sarkara">
                  <span className="inline-block text-white text-lg font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition focus:outline-none focus:ring-4 focus:ring-opacity-50 w-full text-center" style={{backgroundColor: '#5C6BC0'}}>
                    {t('services.sarkara.button')}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* NammaVidhana Card */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col">
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t('services.vidhana.title')}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t('services.vidhana.description')}</p>
              <ul className="mb-6 space-y-2 flex-grow">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.vidhana.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.vidhana.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-success mt-1 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">{t('services.vidhana.feature3')}</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link href="/namma-vidhana">
                  <span className="inline-block bg-primary text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 w-full text-center">
                    {t('services.vidhana.button')}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
