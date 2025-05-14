import { useState } from "react";
import DocumentUpload from "@/components/document/document-upload";
import DocumentViewer from "@/components/document/document-viewer";
import { useLanguage } from "@/context/language-context";
import SEOHead from "@/components/seo/seo-head";
import { pageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";

const NammaVidhana = () => {
  const [documentAnalysis, setDocumentAnalysis] = useState<{
    simplifiedText: string;
    keyPoints: string[];
  } | null>(null);
  const { t, language } = useLanguage();

  // Create language alternatives for SEO
  const langAlternates = [
    { lang: 'en', path: '/namma-vidhana' },
    { lang: 'kn', path: '/namma-vidhana' }
  ];

  const handleDocumentProcessed = (data: { simplifiedText: string; keyPoints: string[] }) => {
    setDocumentAnalysis(data);
    // Scroll to the results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setDocumentAnalysis(null);
  };

  return (
    <>
      <SEOHead 
        pageMetadata={pageMetadata.nammaVidhana}
        pagePath="/namma-vidhana"
        langAlternates={langAlternates}
      />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs
              items={[
                { name: t('nav.home'), path: '/' },
                { name: t('vidhana.title'), path: '/namma-vidhana' }
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('vidhana.title')}</h1>
            <p className="text-lg text-neutral mb-8">
              {t('vidhana.description')}
            </p>
            
            {documentAnalysis ? (
              <DocumentViewer 
                simplifiedText={documentAnalysis.simplifiedText} 
                keyPoints={documentAnalysis.keyPoints}
                onReset={handleReset} 
              />
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-600">{t('vidhana.service')}</h2>
                  <p className="text-gray-600 mb-4">
                    {t('vidhana.serviceDesc')}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-500">
                    <li>{t('vidhana.feature1')}</li>
                    <li>{t('vidhana.feature2')}</li>
                    <li>{t('vidhana.feature3')}</li>
                    <li>{t('vidhana.feature4')}</li>
                  </ul>
                  <p className="text-gray-500">
                    {t('vidhana.benefit')}
                  </p>
                </div>
                
                <DocumentUpload onDocumentProcessed={handleDocumentProcessed} />
              </>
            )}
            
            {!documentAnalysis && (
              <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h2 className="text-xl font-bold mb-4">{t('vidhana.documentTypes')}</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{t('vidhana.docType1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{t('vidhana.docType2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{t('vidhana.docType3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{t('vidhana.docType4')}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default NammaVidhana;
