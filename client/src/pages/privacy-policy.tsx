import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/language-context";

const PrivacyPolicyPage = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('privacy.title')} | NammaKendra</title>
        <meta name="description" content="NammaKendra's privacy policy explaining how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">{t('privacy.title')}</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 mb-6">{t('privacy.lastUpdated')}</div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacy.intro.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('privacy.intro.text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacy.collect.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('privacy.collect.text')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>{t('privacy.collect.identity')}</strong></li>
              <li><strong>{t('privacy.collect.contact')}</strong></li>
              <li><strong>{t('privacy.collect.technical')}</strong></li>
              <li><strong>{t('privacy.collect.usage')}</strong></li>
              <li><strong>{t('privacy.collect.content')}</strong></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacy.use.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('privacy.use.text')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>{t('privacy.use.item1')}</li>
              <li>{t('privacy.use.item2')}</li>
              <li>{t('privacy.use.item3')}</li>
              <li>{t('privacy.use.item4')}</li>
              <li>{t('privacy.use.item5')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacy.security.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('privacy.security.text')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacy.rights.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('privacy.rights.text')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>{t('privacy.rights.item1')}</li>
              <li>{t('privacy.rights.item2')}</li>
              <li>{t('privacy.rights.item3')}</li>
              <li>{t('privacy.rights.item4')}</li>
              <li>{t('privacy.rights.item5')}</li>
              <li>{t('privacy.rights.item6')}</li>
              <li>{t('privacy.rights.item7')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacy.cookies.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('privacy.cookies.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('privacy.cookies.text2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacy.contact.title')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.contact.text')}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;