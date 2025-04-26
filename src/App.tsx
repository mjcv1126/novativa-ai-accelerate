
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
import './App.css';

// Wrapper component to add page IDs to each route
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
        <Route path="/servicios/desarrollo" element={<PageWrapper id="page-id-development"><Layout><IADevelopment /></Layout></PageWrapper>} />
        <Route path="/servicios/desarrollo-ia" element={<Navigate to="/servicios/desarrollo" replace />} />
        <Route path="/servicios/novachannel" element={<Navigate to="/novachannel" replace />} />
        <Route path="/precios" element={<PageWrapper id="page-id-pricing"><Layout><Pricing /></Layout></PageWrapper>} />
        <Route path="/contacto" element={<PageWrapper id="page-id-contact"><Layout><Contact /></Layout></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper id="page-id-blog"><Layout><Blog /></Layout></PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper id="page-id-blog-post"><Layout><BlogPost /></Layout></PageWrapper>} />
        <Route path="/blog/tag/:tag" element={<PageWrapper id="page-id-blog-tag"><Layout><BlogTag /></Layout></PageWrapper>} />
        <Route path="/blog/categoria/:category" element={<PageWrapper id="page-id-blog-category"><Layout><BlogCategory /></Layout></PageWrapper>} />
        <Route path="/novachannel" element={<PageWrapper id="page-id-novachannel"><Layout><NovaChannel /></Layout></PageWrapper>} />
        
        {/* Redirect /agenda to TidyCal */}
        <Route path="/agenda" element={<Navigate to="https://tidycal.com/novativa/demo-gratis" replace />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<PageWrapper id="page-id-admin-login"><AdminLogin /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper id="page-id-admin"><AdminLayout /></PageWrapper>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<PageWrapper id="page-id-admin-dashboard"><AdminDashboard /></PageWrapper>} />
          <Route path="blog/posts" element={<PageWrapper id="page-id-admin-blog-posts"><AdminBlogPosts /></PageWrapper>} />
          <Route path="blog/categories" element={<PageWrapper id="page-id-admin-categories"><AdminCategories /></PageWrapper>} />
          <Route path="scripts" element={<PageWrapper id="page-id-admin-scripts"><AdminScripts /></PageWrapper>} />
          <Route path="custom-css" element={<PageWrapper id="page-id-admin-custom-css"><AdminCustomCSS /></PageWrapper>} />
        </Route>
        
        <Route path="*" element={<PageWrapper id="page-id-not-found"><Layout><NotFound /></Layout></PageWrapper>} />
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;
