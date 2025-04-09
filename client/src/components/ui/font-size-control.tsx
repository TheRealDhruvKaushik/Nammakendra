import { useAccessibility } from "@/context/accessibility-context";
import { useEffect } from "react";

// Direct DOM manipulation for immediate font size change feedback
const applyFontSizeDirectly = (size: number) => {
  console.log("Directly applying font size:", size);
  
  // Set size on body
  document.body.style.fontSize = `${size}px`;
  
  // Set CSS custom property for use in stylesheets
  document.documentElement.style.setProperty('--font-size', `${size}px`);
  
  // Direct method to apply to all common text elements
  const commonElements = document.querySelectorAll('p, span, a, li, div');
  commonElements.forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.fontSize = `${size}px`;
    }
  });
  
  // Scale headings appropriately
  const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headingElements.forEach(el => {
    if (el instanceof HTMLElement) {
      let multiplier = 1;
      switch (el.tagName) {
        case 'H1': multiplier = 2.5; break;
        case 'H2': multiplier = 2.0; break;
        case 'H3': multiplier = 1.75; break;
        case 'H4': multiplier = 1.5; break;
        case 'H5': multiplier = 1.25; break;
        case 'H6': multiplier = 1.1; break;
      }
      el.style.fontSize = `${size * multiplier}px`;
    }
  });
};

const FontSizeControl = () => {
  const { fontSize, decreaseFontSize, resetFontSize, increaseFontSize } = useAccessibility();
  
  // Log current font size when it changes
  useEffect(() => {
    console.log("Current font size:", fontSize);
    applyFontSizeDirectly(fontSize);
  }, [fontSize]);
  
  const handleDecrease = () => {
    console.log("Decrease font size clicked");
    const newSize = Math.max(fontSize - 2, 12);
    decreaseFontSize();
    // Apply immediately for instant feedback
    applyFontSizeDirectly(newSize);
  };
  
  const handleReset = () => {
    console.log("Reset font size clicked");
    resetFontSize();
    // Apply immediately for instant feedback
    applyFontSizeDirectly(16);
  };
  
  const handleIncrease = () => {
    console.log("Increase font size clicked");
    const newSize = Math.min(fontSize + 2, 24);
    increaseFontSize();
    // Apply immediately for instant feedback
    applyFontSizeDirectly(newSize);
  };

  return (
    <div className="font-size-control flex items-center mr-4 border rounded-lg bg-gray-100 p-1 shadow-sm">
      <span className="sr-only">Text size adjustment</span>
      <button 
        onClick={handleDecrease}
        aria-label="Decrease text size" 
        className="px-2 py-1 min-w-[44px] min-h-[44px] rounded-l-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
      >
        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button 
        onClick={handleReset}
        aria-label="Normal text size" 
        className="px-2 py-1 min-w-[44px] min-h-[44px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
      >
        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7V4H20V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 20H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button 
        onClick={handleIncrease}
        aria-label="Increase text size" 
        className="px-2 py-1 min-w-[44px] min-h-[44px] rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
      >
        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default FontSizeControl;
