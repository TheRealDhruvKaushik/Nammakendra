import ChatInterface from "@/components/chatbot/chat-interface";
import { useLanguage } from "@/context/language-context";
import SEOHead from "@/components/seo/seo-head";
import { pageMetadata } from "@/lib/seo";

const NammaSahayak = () => {
  const { t, language } = useLanguage();
  
  // Create language alternatives for SEO
  const langAlternates = [
    { lang: 'en', path: '/namma-sahayak' },
    { lang: 'kn', path: '/namma-sahayak' }
  ];
  
  return (
    <>
      <SEOHead 
        pageMetadata={pageMetadata.nammaSahayak}
        pagePath="/namma-sahayak"
        langAlternates={langAlternates}
      />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('sahayak.title')}</h1>
            <p className="text-lg text-neutral mb-8">
              {t('sahayak.description')}
            </p>
            
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-700">{t('sahayak.features.title')}</h2>
              <ul className="list-disc pl-6 space-y-4 mb-4 text-gray-500">
                <li>
                  <span className="font-medium text-gray-700">{t('sahayak.feature1.title')}</span>
                  <p>{t('sahayak.feature1.description')}</p>
                </li>
                <li>
                  <span className="font-medium text-gray-700">{t('sahayak.feature2.title')}</span>
                  <p>{t('sahayak.feature2.description')}</p>
                </li>
                <li>
                  <span className="font-medium text-gray-700">{t('sahayak.feature3.title')}</span>
                  <p>{t('sahayak.feature3.description')}</p>
                </li>
              </ul>
            </div>
            
            <ChatInterface />
            
            <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h2 className="text-xl font-bold mb-4">{t('sahayak.commonTopics')}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sahayak.topic1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sahayak.topic2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sahayak.topic3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{t('sahayak.topic4')}</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-500 italic">{t('sahayak.tip')}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NammaSahayak;
