
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LouisebotWidget from "./components/shared/LouisebotWidget";
import Index from "./pages/Index";
import Services from "./pages/Services";
import NovaChannel from "./pages/NovaChannel";
import AIAgents from "./pages/services/AIAgents";
import ContentGeneration from "./pages/services/ContentGeneration";
import IADevelopment from "./pages/services/IADevelopment";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ScrollToTop } from "./hooks/useScrollToTop";
import Schedule from "./pages/Schedule";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogPosts from "./pages/admin/AdminBlogPosts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminScripts from "./pages/admin/AdminScripts";
import AdminLogin from "./pages/admin/AdminLogin";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LouisebotWidget />
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col relative">
                <Routes>
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="posts" element={<AdminBlogPosts />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="scripts" element={<AdminScripts />} />
                  </Route>
                  <Route path="/" element={
                    <>
                      <Navbar />
                      <main className="flex-grow">
                        <Index />
                      </main>
                      <Footer />
                    </>
                  } />
                  <Route path="*" element={
                    <>
                      <Navbar />
                      <main className="flex-grow">
                        <Routes>
                          <Route path="/servicios" element={<Services />} />
                          <Route path="/servicios/novachannel" element={<NovaChannel />} />
                          <Route path="/servicios/agentes-ia" element={<AIAgents />} />
                          <Route path="/servicios/generacion-contenido" element={<ContentGeneration />} />
                          <Route path="/servicios/desarrollo-ia" element={<IADevelopment />} />
                          <Route path="/precios" element={<Pricing />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/contacto" element={<Contact />} />
                          <Route path="/agenda" element={<Schedule />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  } />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
