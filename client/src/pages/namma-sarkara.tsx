import ChatInterface from "@/components/chatbot/chat-interface";
import { useLanguage } from "@/context/language-context";
import SEOHead from "@/components/seo/seo-head";
import { pageMetadata } from "@/lib/seo";

const NammaSarkara = () => {
  const { t, language } = useLanguage();
  
  // Create language alternatives for SEO
  const langAlternates = [
    { lang: 'en', path: '/namma-sarkara' },
    { lang: 'kn', path: '/namma-sarkara' }
  ];
  
  return (
    <>
      <SEOHead 
        pageMetadata={pageMetadata.nammaSarkara}
        pagePath="/namma-sarkara"
        langAlternates={langAlternates}
      />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('sarkara.title')}</h1>
            <p className="text-lg text-neutral mb-8">
              {t('sarkara.description')}
            </p>
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-700">{t('sarkara.features.title')}</h2>
              <ul className="list-disc pl-6 space-y-4 mb-4 text-gray-500">
                <li>
                  <span className="font-medium text-gray-700">{t('sarkara.feature1.title')}</span>
                  <p>{t('sarkara.feature1.description')}</p>
                </li>
                <li>
                  <span className="font-medium text-gray-700">{t('sarkara.feature2.title')}</span>
                  <p>{t('sarkara.feature2.description')}</p>
                </li>
                <li>
                  <span className="font-medium text-gray-700">{t('sarkara.feature3.title')}</span>
                  <p>{t('sarkara.feature3.description')}</p>
                </li>
              </ul>
            </div>
            
            <ChatInterface pageType="sarkara" />
            
            <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h2 className="text-xl font-bold mb-4">{t('sarkara.commonTopics')}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sarkara.topic1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sarkara.topic2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sarkara.topic3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sarkara.topic4')}</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-500 italic">{t('sarkara.tip')}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NammaSarkara;