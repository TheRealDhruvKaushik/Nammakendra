import { useState } from "react";
import { Link } from "wouter";

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="text-sm sm:text-base text-center sm:text-left">
            <span language-context="translate">
              By continuing with Nammakendra, you agree that you have read the{" "}
              <Link 
                href="/terms" 
                className="underline hover:text-gray-300 transition-colors duration-200"
                language-context="translate"
              >
                Terms of Service
              </Link>
              {", "}
              <Link 
                href="/about" 
                className="underline hover:text-gray-300 transition-colors duration-200"
                language-context="translate"
              >
                About Us
              </Link>
              {", and "}
              <Link 
                href="/privacy" 
                className="underline hover:text-gray-300 transition-colors duration-200"
                language-context="translate"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 ml-4"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;