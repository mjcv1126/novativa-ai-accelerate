
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import Services from './pages/Services';
import Schedule from './pages/Schedule';
import ScheduleConfirmation from './pages/ScheduleConfirmation';
import VideoTranscription from './pages/VideoTranscription';
import TranscriptionPage from './pages/TranscriptionPage';
import NovaChannel from './pages/NovaChannel';
import Index from './pages/Index';
import KnowledgeBase from './pages/KnowledgeBase';
import IACoding from './pages/IACoding';
import SocialMediaAI from './pages/SocialMediaAI';
import ContentGeneration from './pages/services/ContentGeneration';
import IADevelopment from './pages/services/IADevelopment';
import ContactCenter from './pages/services/ContactCenter';
import Welcome from './pages/Welcome';
import ConsultaEficiente from './pages/ConsultaEficiente';
import FileUpload from './pages/FileUpload';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { language } = useLanguage();
  
  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/servicios" element={<Layout><Services /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      
      {/* English and Spanish routes for specific services */}
      <Route path="/servicios/contenido" element={<Layout><ContentGeneration /></Layout>} />
      <Route path="/services/content" element={<Layout><ContentGeneration /></Layout>} />
      
      <Route path="/servicios/desarrollo-ia" element={<Layout><IADevelopment /></Layout>} />
      <Route path="/services/ai-development" element={<Layout><IADevelopment /></Layout>} />
      
      <Route path="/servicios/contact-center" element={<Layout><ContactCenter /></Layout>} />
      <Route path="/services/contact-center" element={<Layout><ContactCenter /></Layout>} />
      
      <Route path="/servicios/redes-sociales-ia" element={<Layout><SocialMediaAI /></Layout>} />
      <Route path="/services/social-media-ai" element={<Layout><SocialMediaAI /></Layout>} />
      
      <Route path="/precios" element={<Layout><Pricing /></Layout>} />
      <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
      
      <Route path="/contacto" element={<Contact />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route path="/agenda" element={<Schedule />} />
      <Route path="/schedule" element={<Schedule />} />
      
      <Route path="/confirmacion-agenda" element={<ScheduleConfirmation />} />
      <Route path="/schedule-confirmation" element={<ScheduleConfirmation />} />
      
      <Route path="/transcripcion" element={<TranscriptionPage />} />
      <Route path="/transcription" element={<TranscriptionPage />} />
      
      <Route path="/subir-archivos" element={<Layout><FileUpload /></Layout>} />
      <Route path="/upload-files" element={<Layout><FileUpload /></Layout>} />
      
      <Route path="/terminos-condiciones" element={<Layout><TermsAndConditions /></Layout>} />
      <Route path="/terms-conditions" element={<Layout><TermsAndConditions /></Layout>} />
      
      <Route path="/politica-reembolso" element={<Layout><RefundPolicy /></Layout>} />
      <Route path="/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
      
      <Route path="/novachannel" element={<Layout><NovaChannel /></Layout>} />
      <Route path="/knowledge" element={<Layout><KnowledgeBase /></Layout>} />
      <Route path="/iacoding" element={<Layout><IACoding /></Layout>} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/novamedic" element={<ConsultaEficiente />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
