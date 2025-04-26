import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/language-context";

const AboutPage = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('about.title')} | NammaKendra</title>
        <meta name="description" content="Learn about NammaKendra's mission to simplify legal information for all citizens." />
      </Helmet>

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