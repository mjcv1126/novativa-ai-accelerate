
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts, getCategories, getSimilarPosts } from '@/data/blogPosts';
import { setupBlogPage, postExists, formatBlogDate } from '@/utils/blogUtils';
import BlogHeader from '@/components/blog/BlogHeader';
import CommentsSection from '@/components/blog/CommentsSection';
import Newsletter from '@/components/blog/Newsletter';
import SimilarPosts from '@/components/blog/SimilarPosts';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Tag } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get all available categories
  const availableCategories = getCategories();
  
  useEffect(() => {
    // Apply anti-cache measures
    setupBlogPage();
    
    // Check if post exists, redirect to blog if not
    if (slug && !postExists(slug)) {
      navigate('/blog', { replace: true });
    }
  }, [slug, navigate]);

  // Find the post data - blogPosts uses id, not slug
  const postId = Number(slug);
  const post = blogPosts.find(post => post.id === postId);
  
  // Handle loading or not found state
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
          <p className="text-gray-600 mb-6">El artículo que estás buscando no existe o ha sido eliminado.</p>
          <button 
            onClick={() => navigate('/blog')}
            className="bg-novativa-teal hover:bg-novativa-darkTeal text-white px-6 py-2 rounded-lg transition-colors"
          >
            Ver todos los artículos
          </button>
        </div>
      </div>
    );
  }

  const similarPosts = getSimilarPosts(post);

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-12">
      <BlogHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        availableCategories={availableCategories}
      />
      <div className="container mx-auto px-4 mt-10">
        <article className="mb-16 bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="relative h-80 md:h-96">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 md:p-10 text-white w-full">
                <Badge className="bg-novativa-teal mb-4">{post.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatBlogDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-10">
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg font-medium mb-6">{post.excerpt}</p>
              <p>Este es un artículo sobre {post.category}.</p>
              
              {/* Content would go here */}
              <div className="my-8">
                <h2 className="text-2xl font-bold mb-4">Contenido del artículo</h2>
                <p>El contenido detallado de este artículo estará disponible pronto.</p>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-3">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                      <Tag size={14} className="mr-1" /> {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-novativa-teal h-5 w-1 mr-3 rounded-full inline-block"></span>
            Artículos Similares
          </h2>
          <SimilarPosts posts={similarPosts} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-novativa-teal h-5 w-1 mr-3 rounded-full inline-block"></span>
            Comentarios
          </h2>
          <CommentsSection />
        </section>

        <section className="mb-16 bg-white shadow-sm rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-novativa-teal h-5 w-1 mr-3 rounded-full inline-block"></span>
            Subscríbete al Newsletter
          </h2>
          <Newsletter />
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
