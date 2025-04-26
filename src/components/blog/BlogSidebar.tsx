
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { blogPosts, BlogPost, categoryToUrl } from '@/data/blogPosts';
import { useAdminData } from '@/contexts/AdminDataContext';

interface BlogSidebarProps {
  onSearch?: (results: BlogPost[]) => void;
  currentQuery?: string;
}

const BlogSidebar = ({ onSearch, currentQuery = '' }: BlogSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const { posts: adminPosts, categories: adminCategories } = useAdminData();
  
  // Combine admin and default posts
  const allPosts = [...adminPosts, ...blogPosts].filter(
    (post, index, self) => index === self.findIndex(p => p.id === post.id)
  );
  
  // Sort by date (newest first) for recent posts
  const recentPosts = [...allPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 3);

  // Get categories with count
  const categoriesWithCount = adminCategories.map(category => {
    const count = allPosts.filter(post => post.category === category.name).length;
    return { 
      name: category.name, 
      count
    };
  });

  // Live search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      if (onSearch) onSearch([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) || 
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );

    setSearchResults(results);
    if (onSearch) onSearch(results);
  }, [searchQuery, allPosts, onSearch]);

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold mb-3">Buscar artículos</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por título, contenido o tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Live search results */}
        {searchResults.length > 0 && searchQuery.trim() !== '' && (
          <div className="mt-3 max-h-60 overflow-y-auto border rounded-md p-2">
            <p className="text-sm font-medium text-gray-500 mb-2">
              {searchResults.length} resultado(s) encontrado(s):
            </p>
            <ul className="space-y-2">
              {searchResults.map(post => (
                <li key={post.id} className="text-sm hover:bg-gray-50 p-1 rounded">
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-novativa-teal block"
                    onClick={() => setSearchQuery('')}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold mb-2">Suscríbete al newsletter</h3>
        <p className="text-sm opacity-90 mb-4">
          Recibe los últimos artículos y recursos directamente en tu bandeja de entrada.
        </p>
        <NewsletterForm />
      </div>

      {/* Categories List */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold mb-4">Categorías</h3>
        <ul className="space-y-2">
          {categoriesWithCount.map((category, index) => (
            <li key={index}>
              <Link 
                to={`/blog/categoria/${categoryToUrl(category.name)}`}
                className="flex justify-between items-center text-gray-700 hover:text-novativa-teal transition-colors py-1.5 px-2 rounded hover:bg-gray-50"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold mb-3">Artículos recientes</h3>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-2 space-y-0">
                <Link to={`/blog/${post.id}`} className="block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-24 object-cover rounded"
                  />
                </Link>
              </CardHeader>
              <CardContent className="pt-2 pb-2 space-y-1">
                <CardTitle className="text-base line-clamp-2">
                  <Link to={`/blog/${post.id}`} className="hover:text-novativa-teal transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{post.date}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  variant="link"
                  className="text-novativa-teal p-0 h-auto text-sm"
                >
                  <Link to={`/blog/${post.id}`}>Leer más</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
