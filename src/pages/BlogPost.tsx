import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '@/data/blogPostsData';
import { setupBlogPage, postExists } from '@/utils/blogUtils';
import BlogHeader from '@/components/blog/BlogHeader';
import CommentsSection from '@/components/blog/CommentsSection';
import Newsletter from '@/components/blog/Newsletter';
import SimilarPosts from '@/components/blog/SimilarPosts';
import { getSimilarPosts } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Apply anti-cache measures
    setupBlogPage();
    
    // Check if post exists, redirect to blog if not
    if (slug && !postExists(slug)) {
      navigate('/blog', { replace: true });
    }
  }, [slug, navigate]);

  // Find the post data
  const post = blogPosts.find(post => post.slug === slug);
  
  // Handle loading or not found state
  if (!post) {
    return <div className="container mx-auto px-4 py-20 text-center">Cargando artículo...</div>;
  }

  const similarPosts = getSimilarPosts(post);

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-12">
      <BlogHeader />
      <div className="container mx-auto px-4 mt-10">
        <article className="mb-16">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="text-gray-600 flex items-center space-x-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </header>
          <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg shadow-md mb-8" />
          <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Artículos Similares</h2>
          <SimilarPosts posts={similarPosts} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comentarios</h2>
          <CommentsSection />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscríbete al Newsletter</h2>
          <Newsletter />
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
