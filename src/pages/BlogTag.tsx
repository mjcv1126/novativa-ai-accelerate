
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, User } from 'lucide-react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { blogPosts, getPostsByTag } from '@/data/blogPosts';
import { useAdminData } from '@/contexts/AdminDataContext';

const BlogTag = () => {
  const { tag } = useParams<{ tag: string }>();
  const decodedTag = tag ? decodeURIComponent(tag.replace(/-+/g, ' ')) : '';
  const { posts: adminPosts } = useAdminData();
  
  // Combine admin posts and static blog posts
  const allPosts = [...adminPosts, ...blogPosts];
  
  // Get all unique tags from the combined posts
  const getAllTags = () => {
    const allTags = allPosts.reduce((tags: string[], post) => {
      if (post.tags) {
        tags.push(...post.tags);
      }
      return tags;
    }, []);
    return [...new Set(allTags)];
  };
  
  // Get posts by tag
  const getFilteredPostsByTag = (tagToFilter: string) => {
    return allPosts.filter(post => 
      post.tags?.some(postTag => 
        postTag.toLowerCase() === tagToFilter.toLowerCase()
      )
    );
  };
  
  const tagPosts = getFilteredPostsByTag(decodedTag);
  const allTags = getAllTags();
  
  const tagToUrl = (tag: string) => {
    return tag.toLowerCase()
             .normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '')
             .replace(/[^a-z0-9]+/g, '-')
             .replace(/^-+|-+$/g, '');
  };

  if (tagPosts.length === 0) {
    return (
      <>
        <LouisebotWidget />
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tag no encontrado
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                No se encontraron artículos para el tag seleccionado.
              </p>
              <div className="mt-8 space-y-4">
                <Button
                  asChild
                  className="bg-novativa-teal hover:bg-novativa-lightTeal"
                >
                  <Link to="/blog">
                    Volver al blog
                  </Link>
                </Button>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Tags disponibles:</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {allTags.map((t, index) => (
                      <Button
                        key={index}
                        asChild
                        variant="outline"
                        className="border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10"
                      >
                        <Link to={`/blog/tag/${tagToUrl(t)}`}>
                          {t}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  
  return (
    <>
      <LouisebotWidget />
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tag: <span className="text-novativa-orange">{decodedTag}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Artículos relacionados con {decodedTag}
            </p>
          </div>
        </div>
      </section>
      
      {/* Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tagPosts.map((post) => (
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
        </div>
      </section>
      
      {/* Tags Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-2xl font-bold mb-6">Otros Tags</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allTags.map((t, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className={`border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10 justify-start ${t === decodedTag ? 'bg-novativa-teal/20' : ''}`}
                >
                  <Link to={`/blog/tag/${tagToUrl(t)}`}>
                    {t}
                  </Link>
                </Button>
              ))}
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

export default BlogTag;
