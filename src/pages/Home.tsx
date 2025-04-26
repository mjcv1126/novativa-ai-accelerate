
import React, { lazy, Suspense } from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CTA from '@/components/home/CTA';

// Lazy load components that are lower in the page
const Testimonials = lazy(() => import('@/components/home/Testimonials'));
const RecentArticles = lazy(() => import('@/components/home/RecentArticles'));

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
      <Suspense fallback={<div className="py-20 bg-white"></div>}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="py-20 bg-gray-50"></div>}>
        <RecentArticles />
      </Suspense>
    </>
  );
};

export default Home;
