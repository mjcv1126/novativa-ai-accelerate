
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
import AgentsAICourse from './pages/AgentsAICourse';
import AgentsAIThankYou from './pages/AgentsAIThankYou';
import ConversationalFormPage from './pages/ConversationalFormPage';
import FormularioConfirmacion from './pages/FormularioConfirmacion';
import FormularioSinInversionPage from './pages/FormularioSinInversionPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCRM from './pages/admin/AdminCRM';
import AdminBookings from './pages/admin/AdminBookings';
import AdminActivities from './pages/admin/AdminActivities';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogEdit from './pages/admin/AdminBlogEdit';
import AdminScripts from './pages/admin/AdminScripts';
import AdminCustomCSS from './pages/admin/AdminCustomCSS';
import FileUpload from './pages/FileUpload';
import TranscriptionPage from './pages/TranscriptionPage';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { language } = useLanguage();
  
  return (
    <div className="App">
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
        
        <Route path="/terminos-condiciones" element={<Layout><TermsAndConditions /></Layout>} />
        <Route path="/terms-conditions" element={<Layout><TermsAndConditions /></Layout>} />
        
        <Route path="/politica-reembolso" element={<Layout><RefundPolicy /></Layout>} />
        <Route path="/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
        
        {/* Blog routes */}
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
        
        <Route path="/novachannel" element={<Layout><NovaChannel /></Layout>} />
        <Route path="/knowledge" element={<Layout><KnowledgeBase /></Layout>} />
        <Route path="/iacoding" element={<Layout><IACoding /></Layout>} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/novamedic" element={<ConsultaEficiente />} />
        <Route path="/curso-agentes-ia" element={<AgentsAICourse />} />
        <Route path="/curso-agentes-ia-gracias" element={<AgentsAIThankYou />} />
        <Route path="/formulario" element={<ConversationalFormPage />} />
        <Route path="/formulario-confirmacion" element={<FormularioConfirmacion />} />
        <Route path="/formulario-sin-inversion" element={<Layout><FormularioSinInversionPage /></Layout>} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={
          <AdminAuthProvider>
            <AdminLogin />
          </AdminAuthProvider>
        } />
        <Route path="/admin/*" element={
          <AdminAuthProvider>
            <AdminLayout />
          </AdminAuthProvider>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
