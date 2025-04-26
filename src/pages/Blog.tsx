import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { BlogPost, blogPosts } from '@/data/blogPosts';
import { useAdminData } from '@/contexts/AdminDataContext';
import BlogSidebar from '@/components/blog/BlogSidebar';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogHeader from '@/components/blog/BlogHeader';
const Blog = () => {
  const {
    posts: adminPosts,
    categories: adminCategories
  } = useAdminData();
  const allPosts = [...adminPosts, ...blogPosts].filter((post, index, self) => index === self.findIndex(p => p.id === post.id));
  const availableCategories = adminCategories.map(cat => cat.name);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarSearchResults, setSidebarSearchResults] = useState<BlogPost[]>([]);
  const postsPerPage = 9;
  useEffect(() => {
    let result = allPosts;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query) || post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)));
    }
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    setFilteredPosts(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, allPosts]);
  useEffect(() => {
    if (sidebarSearchResults.length > 0) {
      setFilteredPosts(sidebarSearchResults);
      setCurrentPage(1);
    } else if (sidebarSearchResults.length === 0 && searchQuery === '') {
      let result = allPosts;
      if (selectedCategory) {
        result = result.filter(post => post.category === selectedCategory);
      }
      setFilteredPosts(result);
    }
  }, [sidebarSearchResults, allPosts, selectedCategory, searchQuery]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  return <>
      <LouisebotWidget />
      
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog de <span className="text-novativa-teal">Novativa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ideas, tendencias y análisis sobre inteligencia artificial y automatización para impulsar tu negocio.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FeaturedPosts filteredPosts={filteredPosts} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <BlogSidebar onSearch={setSidebarSearchResults} currentQuery={searchQuery} />
            </div>
            
            <div className="lg:col-span-3 order-1 lg:order-2">
              <BlogHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} availableCategories={availableCategories} />
              
              <div className="border-t pt-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {searchQuery || selectedCategory || sidebarSearchResults.length > 0 ? `Resultados (${filteredPosts.length})` : "Artículos Recientes"}
                  </h2>
                </div>
                
                <BlogGrid currentPosts={currentPosts} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} searchQuery={searchQuery} selectedCategory={selectedCategory} filteredPosts={filteredPosts} setSidebarSearchResults={setSidebarSearchResults} setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
    </>;
};
export default Blog;