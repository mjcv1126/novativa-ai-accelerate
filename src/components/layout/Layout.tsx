
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AdminDataProvider } from '@/contexts/AdminDataContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <AdminDataProvider>
        <main className="min-h-screen">
          {children}
        </main>
      </AdminDataProvider>
      <Footer />
    </>
  );
};

export default Layout;
