
import { useEffect, useRef, useState } from 'react';

// Update the type to be generic, with HTMLDivElement as the default type
export const useInView = <T extends HTMLElement = HTMLDivElement>(options = { threshold: 0.1 }) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Only animate once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isInView };
};
