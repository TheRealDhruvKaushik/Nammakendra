import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/language-context";

const AccessibilityPage = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('accessibility.title')} | NammaKendra</title>
        <meta name="description" content="Learn about NammaKendra's accessibility features and our commitment to making legal information accessible to all users." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">{t('accessibility.title')}</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 mb-6">{t('accessibility.lastUpdated')}</div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('accessibility.commitment.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('accessibility.commitment.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('accessibility.commitment.text2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('accessibility.features.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('accessibility.features.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>{t('accessibility.features.voice')}</li>
              <li>{t('accessibility.features.multilingual')}</li>
              <li>{t('accessibility.features.clearDesign')}</li>
              <li>{t('accessibility.features.highContrast')}</li>
              <li>{t('accessibility.features.textToSpeech')}</li>
              <li>{t('accessibility.features.keyboardNav')}</li>
              <li>{t('accessibility.features.screenReader')}</li>
              <li>{t('accessibility.features.simpleLanguage')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('accessibility.conformance.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('accessibility.conformance.text1')}
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('accessibility.conformance.text2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('accessibility.howToUse.title')}</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-primary mb-2">{t('accessibility.howToUse.voiceTitle')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('accessibility.howToUse.voiceText')}
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-primary mb-2">{t('accessibility.howToUse.clearDesignTitle')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('accessibility.howToUse.clearDesignText')}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">{t('accessibility.howToUse.keyboardNavTitle')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('accessibility.howToUse.keyboardNavText')}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('accessibility.limitations.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('accessibility.limitations.intro')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>{t('accessibility.limitations.item1')}</li>
              <li>{t('accessibility.limitations.item2')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('accessibility.feedback.title')}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {t('accessibility.feedback.text')}
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>{t('accessibility.feedback.item1')}</li>
              <li>{t('accessibility.feedback.item2')}</li>
              <li>{t('accessibility.feedback.item3')}</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default AccessibilityPage;