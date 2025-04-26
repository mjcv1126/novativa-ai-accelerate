
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type CustomCSSContextType = {
  customCSS: string;
  setCustomCSS: (css: string) => void;
  applyCustomCSS: () => void;
};

const CustomCSSContext = createContext<CustomCSSContextType | undefined>(undefined);

export const CustomCSSProvider = ({ children }: { children: ReactNode }) => {
  const [customCSS, setCustomCSS] = useState<string>(() => {
    return localStorage.getItem('novativa_custom_css') || '';
  });

  // Apply custom CSS to the page
  const applyCustomCSS = () => {
    // Remove any existing custom style
    const existingStyle = document.getElementById('novativa-custom-css');
    if (existingStyle) {
      existingStyle.remove();
    }

    // If we have CSS to apply, create a style element and append it
    if (customCSS) {
      const styleElement = document.createElement('style');
      styleElement.id = 'novativa-custom-css';
      styleElement.innerHTML = customCSS;
      document.head.appendChild(styleElement);
    }
  };

  // Apply CSS when component mounts and when CSS changes
  useEffect(() => {
    applyCustomCSS();
    
    // Save to localStorage whenever it changes
    localStorage.setItem('novativa_custom_css', customCSS);
  }, [customCSS]);

  return (
    <CustomCSSContext.Provider value={{ customCSS, setCustomCSS, applyCustomCSS }}>
      {children}
    </CustomCSSContext.Provider>
  );
};

export const useCustomCSS = () => {
  const context = useContext(CustomCSSContext);
  if (context === undefined) {
    throw new Error('useCustomCSS must be used within a CustomCSSProvider');
  }
  return context;
};
