
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import NovaChannel from '@/pages/NovaChannel';
import Schedule from '@/pages/Schedule';
import AdminScripts from '@/pages/admin/AdminScripts';
import AdminCustomCSS from '@/pages/admin/AdminCustomCSS';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <AdminAuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/servicios" element={<Layout><Services /></Layout>} />
          <Route path="/servicios/agentes-ia" element={<Layout><AIAgents /></Layout>} />
          <Route path="/servicios/contenido" element={<Layout><ContentGeneration /></Layout>} />
          <Route path="/servicios/desarrollo" element={<Layout><IADevelopment /></Layout>} />
          <Route path="/precios" element={<Layout><Pricing /></Layout>} />
          <Route path="/contacto" element={<Layout><Contact /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
          <Route path="/blog/tag/:tag" element={<Layout><BlogTag /></Layout>} />
          <Route path="/blog/categoria/:category" element={<Layout><BlogCategory /></Layout>} />
          <Route path="/novachannel" element={<Layout><NovaChannel /></Layout>} />
          <Route path="/agenda" element={<Layout><Schedule /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blog/posts" element={<AdminBlogPosts />} />
            <Route path="blog/categories" element={<AdminCategories />} />
            <Route path="scripts" element={<AdminScripts />} />
            <Route path="custom-css" element={<AdminCustomCSS />} />
          </Route>
          
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AdminAuthProvider>
    </HelmetProvider>
  );
}

export default App;
