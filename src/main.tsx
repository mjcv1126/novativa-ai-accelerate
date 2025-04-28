
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </HelmetProvider>
);
