
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { Toaster } from '@/components/ui/toaster';
import { CustomCSSProvider } from '@/contexts/CustomCSSContext';
import { useLocation } from 'react-router-dom';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Determine if we're on the contact page
  const isSpecialPage = location.pathname === '/contacto';

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <AdminDataProvider>
        <CustomCSSProvider>
          <main className="flex-grow w-full">
            {children}
          </main>
        </CustomCSSProvider>
      </AdminDataProvider>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
