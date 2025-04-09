import React from "react";
import { Helmet } from "react-helmet";

const TermsOfServicePage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | NammaKendra</title>
        <meta name="description" content="NammaKendra's terms of service outlining the rules and guidelines for using our platform." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">Terms of Service</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 mb-6">Last updated: April 9, 2025</div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Welcome to NammaKendra. These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Use of Services</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our Services are intended to provide information and assistance regarding legal matters and government services. However, the information provided through our Services is not legal advice, and should not be relied upon as such. We strongly recommend consulting with a qualified legal professional for advice concerning your specific situation.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You agree to use our Services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Services. Prohibited behavior includes harassing or causing distress to other users, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Accounts</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Services.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Intellectual Property</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Services and their original content, features, and functionality are and will remain the exclusive property of NammaKendra and its licensors. The Services are protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NammaKendra.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. User-Generated Content</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By submitting content to our Services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You represent and warrant that: (i) the content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the submission of your content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Disclaimer</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              NammaKendra, its subsidiaries, affiliates, and licensors do not warrant that: (i) the Services will function uninterrupted, secure, or available at any particular time or location; (ii) any errors or defects will be corrected; (iii) the Services are free of viruses or other harmful components; or (iv) the results of using the Services will meet your requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              In no event shall NammaKendra, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Changes</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us through the contact form on our website or by sending an email to terms@nammakendra.org.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;