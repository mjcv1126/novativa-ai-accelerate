
import React, { useEffect } from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { setupBlogPage } from '@/utils/blogUtils';

const Blog = () => {
  useEffect(() => {
    // Apply anti-cache measures
    setupBlogPage();
    
    // Force refresh if cached data is detected
    const cachedIndicator = sessionStorage.getItem('blog_cache_busted');
    if (!cachedIndicator) {
      sessionStorage.setItem('blog_cache_busted', new Date().toISOString());
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-32">
      <BlogHeader />
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <BlogGrid />
          </div>
          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
