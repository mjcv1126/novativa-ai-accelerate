import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import NotFound from '@/pages/NotFound';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import BlogTag from '@/pages/BlogTag';
import BlogCategory from '@/pages/BlogCategory';
import AIAgents from '@/pages/services/AIAgents';
import ContentGeneration from '@/pages/services/ContentGeneration';
import IADevelopment from '@/pages/services/IADevelopment';
import MobileAppDevelopment from '@/pages/services/MobileAppDevelopment';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminBlogPosts from '@/pages/admin/AdminBlogPosts';
import AdminCategories from '@/pages/admin/AdminCategories';
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
import './App.css';
import ContactCenter from '@/pages/services/ContactCenter';

const PageWrapper = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div id={id}>
    {children}
  </div>
);

function App() {
  return (
    <AdminAuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PageWrapper id="page-id-home"><Layout><Home /></Layout></PageWrapper>} />
        <Route path="/servicios" element={<PageWrapper id="page-id-services"><Layout><Services /></Layout></PageWrapper>} />
        <Route path="/servicios/agentes-ia" element={<PageWrapper id="page-id-ai-agents"><Layout><AIAgents /></Layout></PageWrapper>} />
        <Route path="/servicios/contenido" element={<PageWrapper id="page-id-content"><Layout><ContentGeneration /></Layout></PageWrapper>} />
        <Route path="/servicios/desarrollo" element={<Navigate to="/iacoding" replace />} />
        <Route path="/servicios/desarrollo-ia" element={<Navigate to="/servicios/desarrollo" replace />} />
        <Route path="/servicios/apps" element={<PageWrapper id="page-id-mobile-apps"><Layout><MobileAppDevelopment /></Layout></PageWrapper>} />
        <Route path="/servicios/novachannel" element={<Navigate to="/novachannel" replace />} />
        <Route path="/precios" element={<PageWrapper id="page-id-pricing"><Layout><Pricing /></Layout></PageWrapper>} />
        <Route path="/contacto" element={<PageWrapper id="page-id-contact"><Layout><Contact /></Layout></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper id="page-id-blog"><Layout><Blog /></Layout></PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper id="page-id-blog-post"><Layout><BlogPost /></Layout></PageWrapper>} />
        <Route path="/blog/tag/:tag" element={<PageWrapper id="page-id-blog-tag"><Layout><BlogTag /></Layout></PageWrapper>} />
        <Route path="/blog/categoria/:category" element={<PageWrapper id="page-id-blog-category"><Layout><BlogCategory /></Layout></PageWrapper>} />
        <Route path="/novachannel" element={<PageWrapper id="page-id-novachannel"><Layout><NovaChannel /></Layout></PageWrapper>} />
        <Route path="/welcome" element={<PageWrapper id="page-id-welcome"><Layout><Welcome /></Layout></PageWrapper>} />
        
        <Route path="/agenda" element={<Navigate to="https://tidycal.com/novativa/demo-gratis" replace />} />
        
        <Route path="/agenda/confirmacion" element={
          <PageWrapper id="page-id-schedule-confirmation">
            <ScheduleConfirmation />
          </PageWrapper>
        } />
        
        <Route path="/admin/login" element={<PageWrapper id="page-id-admin-login"><AdminLogin /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper id="page-id-admin"><AdminLayout /></PageWrapper>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<PageWrapper id="page-id-admin-dashboard"><AdminDashboard /></PageWrapper>} />
          <Route path="blog/posts" element={<PageWrapper id="page-id-admin-blog-posts"><AdminBlogPosts /></PageWrapper>} />
          <Route path="blog/categories" element={<PageWrapper id="page-id-admin-categories"><AdminCategories /></PageWrapper>} />
          <Route path="scripts" element={
            <PageWrapper id="page-id-admin-scripts">
              <AdminScripts />
            </PageWrapper>
          } />
          <Route path="custom-css" element={<PageWrapper id="page-id-admin-custom-css"><AdminCustomCSS /></PageWrapper>} />
        </Route>
        
        <Route path="/iacoding" element={
          <PageWrapper id="page-id-iacoding">
            <IACoding />
          </PageWrapper>
        } />
        
        <Route path="/knowledge" element={
          <PageWrapper id="page-id-knowledge">
            <Layout><KnowledgeBase /></Layout>
          </PageWrapper>
        } />
        
        <Route path="/servicios/contact-center" element={
          <PageWrapper id="page-id-contact-center">
            <Layout><ContactCenter /></Layout>
          </PageWrapper>
        } />
        
        <Route path="*" element={<PageWrapper id="page-id-not-found"><Layout><NotFound /></Layout></PageWrapper>} />
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;
