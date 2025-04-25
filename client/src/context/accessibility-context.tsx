import React, { createContext, useContext } from "react";

// Simplified accessibility context without language features
interface AccessibilityContextType {
  // This context can be used for other accessibility features in the future
}

const AccessibilityContext = createContext<AccessibilityContextType>({});

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set English as the default language directly
  document.documentElement.setAttribute('lang', 'en');
  document.documentElement.style.setProperty('--base-font-size', '16px');
  
  return (
    <AccessibilityContext.Provider value={{}}>
      {children}
    </AccessibilityContext.Provider>
  );
};