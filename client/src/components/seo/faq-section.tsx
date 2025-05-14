import React from "react";
import { Helmet } from "react-helmet";
import { generateFAQSchema } from "@/lib/seo";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

/**
 * FAQ Section Component with Structured Data
 * 
 * Displays FAQ content with schema.org markup for rich results in search
 * 
 * @param faqs - Array of question/answer pairs
 * @param title - Optional section title
 * @param className - Optional CSS class name
 */
const FAQSection: React.FC<FAQSectionProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  className = "" 
}) => {
  // Generate structured data for FAQs
  const faqSchemaData = generateFAQSchema(faqs);
  const jsonLd = JSON.stringify(faqSchemaData);

  return (
    <section className={`faq-section my-8 ${className}`}>
      {/* Add Schema.org markup for FAQs */}
      <Helmet>
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>
      
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          {title}
        </h2>
      )}
      
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <details 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <summary className="p-4 cursor-pointer font-medium text-lg flex items-center justify-between text-gray-800 hover:bg-gray-50">
              {faq.question}
              <svg 
                className="w-5 h-5 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>
            <div className="p-4 pt-0 text-gray-600">
              <p className="prose prose-sm max-w-none">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;