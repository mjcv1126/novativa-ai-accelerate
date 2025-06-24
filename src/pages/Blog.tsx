
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Search, Clock, User, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author_name: string;
  category: string;
  tags: string[];
  views: number;
  reading_time: number;
  published_at: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchFeaturedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching featured posts:', error);
        return;
      }

      setFeaturedPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPosts(),
        fetchFeaturedPosts(),
        fetchCategories()
      ]);
      setLoading(false);
    };

    loadData();
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Cargando blog...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | Novativa - Artículos sobre IA y Automatización</title>
        <meta name="description" content="Descubre los últimos artículos sobre inteligencia artificial, automatización y desarrollo web en el blog de Novativa." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-novativa-teal to-novativa-lightTeal text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog de Novativa
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Artículos sobre IA, automatización y desarrollo web
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white text-gray-900"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Posts Destacados</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    {post.featured_image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                        <Badge variant="outline">Destacado</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.reading_time} min</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(new Date(post.published_at), 'dd MMM yyyy', { locale: es })}
                          </span>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-novativa-teal hover:text-novativa-lightTeal font-medium"
                        >
                          Leer más →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-6">
                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Categorías</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant={selectedCategory === '' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory('')}
                      >
                        Todas
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.slug ? 'default' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.slug)}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <div className="space-y-8">
                {posts.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-gray-500">
                        <p>No se encontraron artículos.</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <div className={`grid gap-6 ${post.featured_image ? 'md:grid-cols-3' : ''}`}>
                        {post.featured_image && (
                          <div className="md:col-span-1">
                            <div className="aspect-video md:aspect-square overflow-hidden rounded-lg">
                              <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div className={post.featured_image ? 'md:col-span-2' : ''}>
                          <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                              {post.category && (
                                <Badge variant="secondary">{post.category}</Badge>
                              )}
                              {post.tags && post.tags.map((tag) => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                              ))}
                            </div>
                            <CardTitle className="text-2xl line-clamp-2">
                              <Link
                                to={`/blog/${post.slug}`}
                                className="hover:text-novativa-teal transition-colors"
                              >
                                {post.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="line-clamp-3">
                              {post.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  <span>{post.author_name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{post.reading_time} min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {format(new Date(post.published_at), 'dd MMM yyyy', { locale: es })}
                                  </span>
                                </div>
                              </div>
                              <Link
                                to={`/blog/${post.slug}`}
                                className="text-novativa-teal hover:text-novativa-lightTeal font-medium"
                              >
                                Leer más →
                              </Link>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
