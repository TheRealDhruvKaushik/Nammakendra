import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/language-context";

const TermsOfServicePage = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('terms.title')} | NammaKendra</title>
        <meta name="description" content="NammaKendra's terms of service outlining the rules and guidelines for using our platform." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">{t('terms.title')}</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 mb-6">{t('terms.lastUpdated')}</div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section1.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section1.text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section2.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section2.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section2.text2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section3.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section3.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section3.text2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section4.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section4.text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section5.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section5.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section5.text2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section6.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section6.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section6.text2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section7.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section7.text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section8.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section8.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('terms.section8.text2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('terms.section9.title')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t('terms.section9.text')}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;