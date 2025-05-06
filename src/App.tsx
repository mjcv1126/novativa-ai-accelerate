
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import NotFound from '@/pages/NotFound';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import AIAgents from '@/pages/services/AIAgents';
import ContentGeneration from '@/pages/services/ContentGeneration';
import IADevelopment from '@/pages/services/IADevelopment';
import MobileAppDevelopment from '@/pages/services/MobileAppDevelopment';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminLogin from '@/pages/admin/AdminLogin';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import NovaChannel from '@/pages/NovaChannel';
import AdminScripts from '@/pages/admin/AdminScripts';
import AdminCustomCSS from '@/pages/admin/AdminCustomCSS';
import Welcome from '@/pages/Welcome';
import ScheduleConfirmation from '@/pages/ScheduleConfirmation';
import IACoding from '@/pages/IACoding';
import KnowledgeBase from '@/pages/KnowledgeBase';
import RefundPolicy from '@/pages/RefundPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import VideoTranscription from '@/pages/VideoTranscription';
import './App.css';
import ContactCenter from '@/pages/services/ContactCenter';
import { useLanguage } from '@/contexts/LanguageContext';

const PageWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => {
  // Force reload if session storage indicates a refresh is needed
  useEffect(() => {
    const needsRefresh = sessionStorage.getItem('purge-cache');
    if (needsRefresh === 'true') {
      sessionStorage.removeItem('purge-cache');
      window.location.reload();
    }
  }, []);
  
  return (
    <div id={id}>
      {children}
    </div>
  );
};

function App() {
  const { language } = useLanguage();

  // Global cache purging mechanism
  useEffect(() => {
    // Clear application cache on initial load
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    // Set flag to handle hard reload when needed
    const handleBeforeUnload = () => {
      sessionStorage.setItem('last-page', window.location.pathname);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Routes mapping for language support
  const routeMappings = {
    es: {
      services: 'servicios',
      pricing: 'precios',
      contact: 'contacto',
      schedule: 'agenda',
      welcome: 'bienvenido',
      knowledge: 'conocimiento',
      refundPolicy: 'politica-reembolso',
      terms: 'terminos-condiciones',
      transcription: 'transcripcion',
      aiAgents: 'agentes-ia',
      contentGeneration: 'contenido',
      development: 'desarrollo',
      mobileApps: 'apps',
      contactCenter: 'contact-center'
    },
    en: {
      services: 'services',
      pricing: 'pricing',
      contact: 'contact',
      schedule: 'schedule',
      welcome: 'welcome',
      knowledge: 'knowledge',
      refundPolicy: 'refund-policy',
      terms: 'terms-conditions',
      transcription: 'transcription',
      aiAgents: 'ai-agents',
      contentGeneration: 'content-generation',
      development: 'development',
      mobileApps: 'mobile-apps',
      contactCenter: 'contact-center'
    }
  };

  const r = routeMappings[language];

  return (
    <AdminAuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PageWrapper id="page-id-home"><Layout><Home /></Layout></PageWrapper>} />
        {/* Spanish Routes */}
        <Route path="/servicios" element={<PageWrapper id="page-id-services"><Layout><Services /></Layout></PageWrapper>} />
        <Route path="/servicios/agentes-ia" element={<PageWrapper id="page-id-ai-agents"><Layout><AIAgents /></Layout></PageWrapper>} />
        <Route path="/servicios/contenido" element={<PageWrapper id="page-id-content"><Layout><ContentGeneration /></Layout></PageWrapper>} />
        <Route path="/servicios/desarrollo" element={<Navigate to="/iacoding" replace />} />
        <Route path="/servicios/desarrollo-ia" element={<Navigate to="/servicios/desarrollo" replace />} />
        <Route path="/servicios/apps" element={<PageWrapper id="page-id-mobile-apps"><Layout><MobileAppDevelopment /></Layout></PageWrapper>} />
        <Route path="/servicios/novachannel" element={<Navigate to="/novachannel" replace />} />
        <Route path="/precios" element={<PageWrapper id="page-id-pricing"><Layout><Pricing /></Layout></PageWrapper>} />
        <Route path="/contacto" element={<PageWrapper id="page-id-contact"><Layout><Contact /></Layout></PageWrapper>} />
        <Route path="/novachannel" element={<PageWrapper id="page-id-novachannel"><Layout><NovaChannel /></Layout></PageWrapper>} />
        <Route path="/bienvenido" element={<PageWrapper id="page-id-welcome"><Layout><Welcome /></Layout></PageWrapper>} />
        <Route path="/agenda" element={<Navigate to="https://tidycal.com/novativa/demo-gratis" replace />} />
        <Route path="/agenda/confirmacion" element={<PageWrapper id="page-id-schedule-confirmation"><ScheduleConfirmation /></PageWrapper>} />
        <Route path="/conocimiento" element={<PageWrapper id="page-id-knowledge"><Layout><KnowledgeBase /></Layout></PageWrapper>} />
        <Route path="/servicios/contact-center" element={<PageWrapper id="page-id-contact-center"><Layout><ContactCenter /></Layout></PageWrapper>} />
        <Route path="/politica-reembolso" element={<PageWrapper id="page-id-refund-policy"><Layout><RefundPolicy /></Layout></PageWrapper>} />
        <Route path="/terminos-condiciones" element={<PageWrapper id="page-id-terms"><Layout><TermsAndConditions /></Layout></PageWrapper>} />
        <Route path="/transcripcion" element={<PageWrapper id="page-id-transcription"><VideoTranscription /></PageWrapper>} />
        
        {/* English Routes */}
        <Route path="/services" element={<PageWrapper id="page-id-services"><Layout><Services /></Layout></PageWrapper>} />
        <Route path="/services/ai-agents" element={<PageWrapper id="page-id-ai-agents"><Layout><AIAgents /></Layout></PageWrapper>} />
        <Route path="/services/content-generation" element={<PageWrapper id="page-id-content"><Layout><ContentGeneration /></Layout></PageWrapper>} />
        <Route path="/services/development" element={<Navigate to="/iacoding" replace />} />
        <Route path="/services/mobile-apps" element={<PageWrapper id="page-id-mobile-apps"><Layout><MobileAppDevelopment /></Layout></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper id="page-id-pricing"><Layout><Pricing /></Layout></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper id="page-id-contact"><Layout><Contact /></Layout></PageWrapper>} />
        <Route path="/welcome" element={<PageWrapper id="page-id-welcome"><Layout><Welcome /></Layout></PageWrapper>} />
        <Route path="/schedule" element={<Navigate to="https://tidycal.com/novativa/free-demo" replace />} />
        <Route path="/schedule/confirmation" element={<PageWrapper id="page-id-schedule-confirmation"><ScheduleConfirmation /></PageWrapper>} />
        <Route path="/services/contact-center" element={<PageWrapper id="page-id-contact-center"><Layout><ContactCenter /></Layout></PageWrapper>} />
        <Route path="/refund-policy" element={<PageWrapper id="page-id-refund-policy"><Layout><RefundPolicy /></Layout></PageWrapper>} />
        <Route path="/terms-conditions" element={<PageWrapper id="page-id-terms"><Layout><TermsAndConditions /></Layout></PageWrapper>} />
        <Route path="/transcription" element={<PageWrapper id="page-id-transcription"><VideoTranscription /></PageWrapper>} />
        
        <Route path="/iacoding" element={<PageWrapper id="page-id-iacoding"><IACoding /></PageWrapper>} />
        
        <Route path="/admin/login" element={<PageWrapper id="page-id-admin-login"><AdminLogin /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper id="page-id-admin"><AdminLayout /></PageWrapper>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<PageWrapper id="page-id-admin-dashboard"><AdminDashboard /></PageWrapper>} />
          <Route path="scripts" element={<PageWrapper id="page-id-admin-scripts"><AdminScripts /></PageWrapper>} />
          <Route path="custom-css" element={<PageWrapper id="page-id-admin-custom-css"><AdminCustomCSS /></PageWrapper>} />
        </Route>
        
        <Route path="*" element={<PageWrapper id="page-id-not-found"><NotFound /></PageWrapper>} />
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;
