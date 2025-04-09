import React from "react";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | NammaKendra</title>
        <meta name="description" content="Learn about NammaKendra's mission to simplify legal information for all citizens." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center header-title bg-gradient-to-r from-primary via-purple-600 to-amber-500 bg-clip-text text-transparent">About NammaKendra</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              NammaKendra was founded with a simple yet powerful mission: to make legal information accessible to everyone, 
              especially the elderly and underprivileged citizens who often struggle to navigate complex legal documents and processes.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our motto "Nimma Maneyalli Sarkara" (Government at Your Home) reflects our commitment to bringing legal assistance 
              and government services directly to citizens in a way that is easy to understand and act upon.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Services</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-primary">NammaSahayak (Our Helper)</h3>
                <p className="text-gray-700 leading-relaxed">An AI-powered assistant that can answer questions about legal rights, 
                government schemes, and procedures in simple, everyday language.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-primary">NammaVidhana (Our System)</h3>
                <p className="text-gray-700 leading-relaxed">A document simplification tool that breaks down complex legal documents 
                into clear, understandable language with highlighted key points.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Team</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              NammaKendra was established by a team of legal experts, technologists, and social advocates who share a common goal 
              of democratizing access to legal information. Our diverse team brings together expertise in law, artificial intelligence, 
              user experience design, and community outreach.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We actively collaborate with government departments, legal aid organizations, and community groups to ensure our 
              services are relevant, accurate, and truly beneficial to those who need them most.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Commitment</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We are committed to breaking down barriers to legal information through technology, simple language, and 
              inclusive design. We believe that understanding your rights and obligations is fundamental to full citizenship, 
              and we strive to make this possible for everyone regardless of education, background, or technological proficiency.
            </p>
            <p className="text-gray-700 leading-relaxed">
              NammaKendra is dedicated to continuous improvement, responding to community needs, and expanding our services 
              to reach more citizens across diverse regions and languages.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;