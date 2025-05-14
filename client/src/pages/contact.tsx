import ContactForm from "@/components/contact/contact-form";
import { useLanguage } from "@/context/language-context";
import SEOHead from "@/components/seo/seo-head";
import { pageMetadata } from "@/lib/seo";

const Contact = () => {
  const { t, language } = useLanguage();
  
  // Create language alternatives for SEO
  const langAlternates = [
    { lang: 'en', path: '/contact' },
    { lang: 'kn', path: '/contact' }
  ];
  
  return (
    <>
      <SEOHead 
        pageMetadata={pageMetadata.contact}
        pagePath="/contact"
        langAlternates={langAlternates}
      />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('contact.title')}</h1>
            <p className="text-lg text-neutral mb-8">
              {t('contact.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-black">{t('contact.phone')}</h2>
                <p className="text-neutral text-black">{t('footer.phone')}</p>
                <p className="text-neutral text-sm mt-2 text-black">{t('contact.phone.availability')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-black">{t('contact.email')}</h2>
                <p className="text-neutral text-black">{t('footer.email')}</p>
                <p className="text-neutral text-sm mt-2 text-black">{t('contact.email.response')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-black">{t('contact.address')}</h2>
                <p className="text-neutral text-black">{t('footer.address')}</p>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
