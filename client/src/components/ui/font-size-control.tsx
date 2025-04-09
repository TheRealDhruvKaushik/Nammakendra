import { useAccessibility } from "@/context/accessibility-context";

const FontSizeControl = () => {
  const { decreaseFontSize, resetFontSize, increaseFontSize } = useAccessibility();

  return (
    <div className="font-size-control flex items-center mr-4 border rounded-lg bg-white p-1">
      <span className="sr-only">Text size adjustment</span>
      <button 
        onClick={decreaseFontSize}
        aria-label="Decrease text size" 
        className="px-2 py-1 min-w-[44px] min-h-[44px] rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button 
        onClick={resetFontSize}
        aria-label="Normal text size" 
        className="px-2 py-1 min-w-[44px] min-h-[44px] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7V4H20V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 20H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button 
        onClick={increaseFontSize}
        aria-label="Increase text size" 
        className="px-2 py-1 min-w-[44px] min-h-[44px] rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
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
