import { useState, useEffect } from "react";

type FontSizeHook = {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
};

const useFontSize = (): FontSizeHook => {
  const [fontSize, setFontSize] = useState<number>(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      const savedSize = localStorage.getItem("fontSize");
      return savedSize ? parseInt(savedSize) : 16;
    }
    return 16;
  });

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12));
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  return {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  };
};

export default useFontSize;
