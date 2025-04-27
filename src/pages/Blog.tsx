
import React, { useState, useEffect } from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { setupBlogPage } from '@/utils/blogUtils';
import { blogPosts, getCategories } from '@/data/blogPosts';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [sidebarSearchResults, setSidebarSearchResults] = useState([]);

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get all available categories
  const availableCategories = getCategories();

  useEffect(() => {
    // Apply anti-cache measures
    setupBlogPage();
    
    // Force refresh if cached data is detected
    const cachedIndicator = sessionStorage.getItem('blog_cache_busted');
    if (!cachedIndicator) {
      sessionStorage.setItem('blog_cache_busted', new Date().toISOString());
    }
    
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-32">
      <BlogHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        availableCategories={availableCategories}
      />
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <BlogGrid 
              currentPosts={currentPosts}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              filteredPosts={filteredPosts}
              setSidebarSearchResults={setSidebarSearchResults}
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <BlogSidebar 
              onSearch={setSidebarSearchResults}
              currentQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
