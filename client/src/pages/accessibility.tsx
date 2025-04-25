import React from "react";
import { Helmet } from "react-helmet";

const AccessibilityPage = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility | NammaKendra</title>
        <meta name="description" content="Learn about NammaKendra's accessibility features and our commitment to making legal information accessible to all users." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">Accessibility Statement</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500 mb-6">Last updated: April 9, 2025</div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Commitment to Accessibility</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At NammaKendra, we are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our mission is to make legal information accessible to all citizens, especially the elderly and underprivileged. To achieve this, we have built accessibility features directly into our platform and continuously work to improve them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Accessibility Features</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              NammaKendra includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Font Size Controls</strong>: Easily increase or decrease text size for better readability.</li>
              <li><strong>Clear Design</strong>: Our interface is designed with clarity and simplicity in mind.</li>
              <li><strong>High Contrast</strong>: Our design maintains appropriate color contrast ratios for readability.</li>
              <li><strong>Text to Speech</strong>: Text to speech capabilities for those who prefer auditory information.</li>
              <li><strong>Keyboard Navigation</strong>: Full keyboard accessibility for users who cannot use a mouse.</li>
              <li><strong>Screen Reader Compatibility</strong>: Our website is optimized for screen readers.</li>
              <li><strong>Simple Language</strong>: We use plain, straightforward language whenever possible.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Conformance Status</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              NammaKendra is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Use Our Accessibility Features</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-primary mb-2">Font Size Control</h3>
              <p className="text-gray-700 leading-relaxed">
                You can adjust the text size using the font size controls in the header of every page. Click the (-) button to decrease, the (A) button to reset to default size, or the (+) button to increase font size.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-primary mb-2">Clear Design</h3>
              <p className="text-gray-700 leading-relaxed">
                Our interface features consistent, intuitive navigation and clear visual hierarchy to enhance usability for all users, including those with cognitive disabilities.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-primary mb-2">Keyboard Navigation</h3>
              <p className="text-gray-700 leading-relaxed">
                You can navigate our website using only your keyboard. Use Tab to move forward through links and controls, Shift+Tab to move backward, Enter to activate links and buttons, and Space to toggle checkboxes and radio buttons.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Limitations and Alternatives</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Despite our best efforts to ensure accessibility of NammaKendra, there may be some limitations. Below is a description of known limitations, and potential solutions:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Some of our older PDF documents might not be fully accessible. We are working on updating these documents, but if you encounter an inaccessible PDF, please contact us for assistance.</li>
              <li>Some of our interactive features may be challenging for users with certain disabilities. We provide alternative methods to access the same information whenever possible.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedback and Contact Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We welcome your feedback on the accessibility of NammaKendra. Please let us know if you encounter accessibility barriers:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Use our Contact form to report any accessibility issues or to request assistance.</li>
              <li>Email us directly at accessibility@nammakendra.org.</li>
              <li>We aim to respond to feedback within 2 business days.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default AccessibilityPage;