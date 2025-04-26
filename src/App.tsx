
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast';

// Import pages
import Home from '@/pages/Home';
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
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminBlogPosts from '@/pages/admin/AdminBlogPosts';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminScripts from '@/pages/admin/AdminScripts';
import AdminLogin from '@/pages/admin/AdminLogin';

// Components
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { HelmetProvider } from 'react-helmet-async';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';

function App() {
  return (
    <Router>
      <HelmetProvider>
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
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="blog" element={<AdminBlogPosts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="scripts" element={<AdminScripts />} />
            </Route>
            
            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/categoria/:category" element={<BlogCategory />} />
              <Route path="/blog/tag/:tag" element={<BlogTag />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/precios" element={<Pricing />} />
              <Route path="/agenda" element={<Schedule />} />
              <Route path="/novachannel" element={<NovaChannel />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/servicios/novachannel" element={<NovaChannel />} />
              <Route path="/servicios/agentes-ia" element={<AIAgents />} />
              <Route path="/servicios/generacion-contenido" element={<ContentGeneration />} />
              <Route path="/servicios/desarrollo-ia" element={<IADevelopment />} />
              <Route path="*" element={<NotFound />} />
            </Route>
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
      </HelmetProvider>
    </Router>
  )
}

export default App
