import { useState } from "react";
import { Helmet } from "react-helmet";
import DocumentUpload from "@/components/document/document-upload";
import DocumentViewer from "@/components/document/document-viewer";

const NammaVidhana = () => {
  const [simplifiedText, setSimplifiedText] = useState<string | null>(null);

  const handleDocumentProcessed = (text: string) => {
    setSimplifiedText(text);
    // Scroll to the results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSimplifiedText(null);
  };

  return (
    <>
      <Helmet>
        <title>NammaVidhana - Legal Document Simplification</title>
        <meta name="description" content="Upload legal documents and get them explained in simple language. Understand contracts, notices, and other legal papers easily." />
      </Helmet>
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NammaVidhana Document Simplifier</h1>
            <p className="text-lg text-neutral mb-8">
              Upload legal documents and get them explained in simple, easy-to-understand language. Our AI helps you make sense of complex legal jargon.
            </p>
            
            {simplifiedText ? (
              <DocumentViewer 
                simplifiedText={simplifiedText} 
                onReset={handleReset} 
              />
            ) : (
              <>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-600">Document Simplification Service</h2>
                  <p className="text-gray-600 mb-4">
                    Our tool analyzes legal documents and translates them into plain language that's easy to understand. 
                    You'll get:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-500">
                    <li>A simplified summary of the entire document</li>
                    <li>Highlighted key points and important information</li>
                    <li>Clear explanation of legal terms used</li>
                    <li>Important dates, deadlines, and required actions</li>
                  </ul>
                  <p class="text-gray-500">
                    This service helps you understand legal documents without needing to hire an expensive lawyer for basic explanations.
                  </p>
                </div>
                
                <DocumentUpload onDocumentProcessed={handleDocumentProcessed} />
              </>
            )}
            
            {!simplifiedText && (
              <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h2 className="text-xl font-bold mb-4">Documents You Can Upload</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Court Notices and Orders</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Legal Contracts and Agreements</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Government Notices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Property Documents</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default NammaVidhana;
