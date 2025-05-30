import { Link } from "wouter";
import { useLanguage } from "@/context/language-context";

const CTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">{t('cta.subtitle')}</p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-4xl mx-auto">
          <Link href="/namma-sahayak">
            <span className="inline-block bg-white text-primary text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 w-full md:w-auto text-center">
              {t('cta.chatButton')}
            </span>
          </Link>
          <Link href="/namma-sarkara">
            <span className="inline-block bg-purple-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 w-full md:w-auto text-center">
              {t('cta.sarkaraButton')}
            </span>
          </Link>
          <Link href="/namma-vidhana">
            <span className="inline-block border-2 border-white text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 w-full md:w-auto text-center">
              {t('cta.uploadButton')}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
