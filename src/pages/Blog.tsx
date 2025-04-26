
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, Filter, Search, User } from 'lucide-react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { blogPosts, getCategories } from '@/data/blogPosts';
import { Input } from "@/components/ui/input";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { useAdminData } from '@/contexts/AdminDataContext';

const Blog = () => {
  // Get data from both default data and admin data
  const { posts: adminPosts, categories: adminCategories } = useAdminData();
  const allPosts = [...adminPosts, ...blogPosts].filter(
    (post, index, self) => index === self.findIndex(p => p.id === post.id)
  );
  
  // Categories from admin data
  const availableCategories = adminCategories.map(cat => cat.name);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  
  // Filter posts based on search and category
  useEffect(() => {
    let result = allPosts;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) || 
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(result);
    // Reset to first page when filters change
    setCurrentPage(1); 
  }, [searchQuery, selectedCategory, allPosts]);
  
  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Helper function to render pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-1" />);
      }
      
      // Pages around current page
      const startVisible = Math.max(2, currentPage - 1);
      const endVisible = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startVisible; i <= endVisible; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-2" />);
      }
      
      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  return (
    <>
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
      
      {/* Featured Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="relative rounded-xl overflow-hidden h-[400px] shadow-lg">
              {filteredPosts[0] && (
                <>
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <span className="text-novativa-orange bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm inline-block mb-3 font-medium">
                      {filteredPosts[0].category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-white/80 mb-4 line-clamp-2">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-white/80 text-sm mb-4">
                      <User size={14} className="mr-1" />
                      <span>{filteredPosts[0].author}</span>
                      <span className="mx-2">•</span>
                      <Calendar size={14} className="mr-1" />
                      <span>{filteredPosts[0].date}</span>
                    </div>
                    <Button
                      asChild
                      className="bg-novativa-teal hover:bg-novativa-lightTeal w-fit"
                    >
                      <Link to={`/blog/${filteredPosts[0].id}`}>
                        Leer artículo
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.slice(1, 5).map((post) => (
                <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="text-novativa-orange font-medium">{post.category}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      asChild
                      variant="link"
                      className="text-novativa-teal p-0 h-auto flex items-center hover:text-novativa-lightTeal"
                    >
                      <Link to={`/blog/${post.id}`}>
                        Leer más <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar artículos por título, contenido o palabras clave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="text-gray-500 h-4 w-4" />
                <select
                  className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-novativa-teal"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {availableCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* More Articles Section */}
          <div className="border-t pt-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                {searchQuery || selectedCategory 
                  ? `Resultados (${filteredPosts.length})` 
                  : "Artículos Recientes"}
              </h2>
            </div>
            
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <span className="text-novativa-orange font-medium">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <User size={14} className="mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <Button
                          asChild
                          variant="link"
                          className="text-novativa-teal flex items-center hover:text-novativa-lightTeal"
                        >
                          <Link to={`/blog/${post.id}`}>
                            Leer más <ArrowRight size={14} className="ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {renderPaginationItems()}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No se encontraron artículos que coincidan con tu búsqueda.</p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                  }}
                  className="mt-4 bg-novativa-teal hover:bg-novativa-lightTeal"
                >
                  Ver todos los artículos
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Categories and Subscribe Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Categorías</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableCategories.map((category, index) => (
                  <Button
                    key={index}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`border-novativa-teal justify-start ${
                      selectedCategory === category 
                        ? "bg-novativa-teal text-white" 
                        : "text-novativa-teal hover:bg-novativa-teal/10"
                    }`}
                    onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
              <p className="text-gray-600 mb-6">
                Recibe las últimas noticias, artículos y recursos sobre IA y automatización directamente en tu bandeja de entrada.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para transformar tu negocio con IA?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones de inteligencia artificial y automatización pueden impulsar el crecimiento de tu empresa.
          </p>
          <Button
            asChild
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6"
            size="lg"
          >
            <Link to="/contacto">
              Solicitar una consulta gratuita
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Blog;
