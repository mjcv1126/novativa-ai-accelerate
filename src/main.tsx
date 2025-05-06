
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext'

// Clear cache before mounting app
if ('caches' in window) {
  caches.keys().then((names) => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
}

// Add cache-busting query parameter to the script URL
const addCacheBuster = () => {
  const scripts = document.getElementsByTagName('script');
  Array.from(scripts).forEach(script => {
    if (script.src && !script.src.includes('?')) {
      script.src = `${script.src}?v=${new Date().getTime()}`;
    }
  });
};

// Execute cache-busting
addCacheBuster();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </HelmetProvider>
);
