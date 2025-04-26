
import React, { lazy, Suspense } from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import CTA from '@/components/home/CTA';
import HomeLoading from '@/components/home/HomeLoading';

// Lazy load components with higher loading priority
const Testimonials = lazy(() => import('@/components/home/Testimonials'));
const RecentArticles = lazy(() => 
  Promise.all([
    import('@/components/home/RecentArticles'),
    // Add artificial delay to ensure Hero and Features load first
    new Promise(resolve => setTimeout(resolve, 100))
  ]).then(([moduleExport]) => moduleExport)
);

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
      <Suspense fallback={<HomeLoading />}>
        <Testimonials />
        <RecentArticles />
      </Suspense>
    </>
  );
};

export default Home;
