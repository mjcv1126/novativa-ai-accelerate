
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PreFooterCTA from './PreFooterCTA';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { Toaster } from '@/components/ui/toaster';
import { CustomCSSProvider } from '@/contexts/CustomCSSContext';
import { useLocation } from 'react-router-dom';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contacto';
  const isIACodingPage = location.pathname === '/iacoding';
  const isTranscriptionPage = location.pathname === '/transcripcion';
  const isBlogPostPage = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  // Exclude blog post pages from main layout
  if (isBlogPostPage) {
    return (
      <AdminDataProvider>
        <CustomCSSProvider>
          {children}
          <Toaster />
        </CustomCSSProvider>
      </AdminDataProvider>
    );
  }

  // Include NavBar on transcription page
  return (
    <div className="flex flex-col min-h-screen w-full">
      {!isIACodingPage && <Navbar />}
      <AdminDataProvider>
        <CustomCSSProvider>
          <main className="flex-grow w-full">
            {children}
          </main>
          {!isContactPage && <PreFooterCTA />}
        </CustomCSSProvider>
      </AdminDataProvider>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
