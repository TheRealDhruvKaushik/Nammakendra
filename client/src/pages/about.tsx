import React from "react";
import { useLanguage } from "@/context/language-context";
import SEOHead from "@/components/seo/seo-head";
import { pageMetadata } from "@/lib/seo";

const AboutPage = () => {
  const { t, language } = useLanguage();
  
  // Create language alternatives for SEO
  const langAlternates = [
    { lang: 'en', path: '/about' },
    { lang: 'kn', path: '/about' }
  ];
  
  return (
    <>
      <SEOHead 
        pageMetadata={pageMetadata.about}
        pagePath="/about"
        langAlternates={langAlternates}
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">{t('about.nammaKendra')}</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('about.mission')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('about.mission.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('about.mission.text2')}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('about.services')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-primary">{t('about.sahayak.title')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('about.sahayak.description')}</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-primary">{t('about.vidhana.title')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('about.vidhana.description')}</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('about.team')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('about.team.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('about.team.text2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('about.commitment')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('about.commitment.text1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('about.commitment.text2')}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;