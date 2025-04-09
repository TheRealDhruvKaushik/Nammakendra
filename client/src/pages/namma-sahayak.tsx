import { Helmet } from "react-helmet";
import ChatInterface from "@/components/chatbot/chat-interface";

const NammaSahayak = () => {
  return (
    <>
      <Helmet>
        <title>NammaSahayak - AI Legal Assistant</title>
        <meta name="description" content="Get simple answers to your legal questions with our AI-powered chatbot. No legal jargon, just clear guidance." />
      </Helmet>
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">NammaSahayak AI Legal Assistant</h1>
            <p className="text-lg text-neutral mb-8">
              Ask any legal questions you have and get simple, easy-to-understand answers. Our AI assistant helps you navigate complex legal topics without the confusing jargon.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold mb-4">How to Use NammaSahayak</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Type your legal question in the chat box below</li>
                <li>Wait for NammaSahayak to provide a simple explanation</li>
                <li>Ask follow-up questions if you need clarification</li>
                <li>Get guidance on next steps or procedures</li>
              </ol>
            </div>
            
            <ChatInterface />
            
            <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h2 className="text-xl font-bold mb-4">Example Questions You Can Ask</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>"What are my rights as a tenant?"</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>"How do I apply for senior citizen benefits?"</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>"What is the process for filing a consumer complaint?"</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>"What documents do I need for property registration?"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NammaSahayak;
