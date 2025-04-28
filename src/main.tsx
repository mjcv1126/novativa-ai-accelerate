
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Proporcionar un mecanismo para recargar la aplicación después de que Google Translate haya terminado
const handleTranslationComplete = () => {
  // Este evento podría usarse para reinicializar componentes después de la traducción
  document.dispatchEvent(new Event('translationComplete'));
};

// Observar cambios en la clase del cuerpo para detectar cuando Google Translate termina
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const bodyElement = document.body;
      if (bodyElement.className.includes('translated')) {
        handleTranslationComplete();
      }
    }
  });
});

// Iniciar observación del cuerpo del documento
observer.observe(document.body, { attributes: true });

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
