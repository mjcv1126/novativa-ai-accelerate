
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast';

// Import pages
import Index from '@/pages/Index';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import Pricing from '@/pages/Pricing';
import Schedule from '@/pages/Schedule';
import NovaChannel from '@/pages/NovaChannel';
import Services from '@/pages/Services';
import BlogCategory from '@/pages/BlogCategory';
import BlogTag from '@/pages/BlogTag';

// Services pages
import AIAgents from '@/pages/services/AIAgents';
import ContentGeneration from '@/pages/services/ContentGeneration';
import IADevelopment from '@/pages/services/IADevelopment';

// Admin imports
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminBlogPosts from '@/pages/admin/AdminBlogPosts';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminScripts from '@/pages/admin/AdminScripts';
import AdminLogin from '@/pages/admin/AdminLogin';

// Components
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <ScrollToTop />
        <Helmet>
          <title>Novativa IA - Soluciones de Inteligencia Artificial</title>
          <meta name="description" content="Novativa IA ofrece soluciones de inteligencia artificial y automatización para empresas. Optimiza tus procesos y mejora la experiencia de tus clientes con nuestras tecnologías innovadoras." />
        </Helmet>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlogPosts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="scripts" element={<AdminScripts />} />
          </Route>
          
          {/* Public Routes */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
          <Route path="/blog/categoria/:category" element={<Layout><BlogCategory /></Layout>} />
          <Route path="/blog/tag/:tag" element={<Layout><BlogTag /></Layout>} />
          <Route path="/contacto" element={<Layout><Contact /></Layout>} />
          <Route path="/precios" element={<Layout><Pricing /></Layout>} />
          <Route path="/agenda" element={<Layout><Schedule /></Layout>} />
          <Route path="/novachannel" element={<Layout><NovaChannel /></Layout>} />
          <Route path="/servicios" element={<Layout><Services /></Layout>} />
          <Route path="/servicios/novachannel" element={<Layout><NovaChannel /></Layout>} />
          <Route path="/servicios/agentes-ia" element={<Layout><AIAgents /></Layout>} />
          <Route path="/servicios/generacion-contenido" element={<Layout><ContentGeneration /></Layout>} />
          <Route path="/servicios/desarrollo-ia" element={<Layout><IADevelopment /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#00B37E',
                secondary: '#FFFFFF',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#F55',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </AdminAuthProvider>
    </Router>
  )
}

export default App
