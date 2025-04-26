
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
import { blogPosts, getPostsByCategory, getCategories, categoryToUrl } from '@/data/blogPosts';
import { useAdminData } from '@/contexts/AdminDataContext';

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category.replace(/-+/g, ' ')) : '';
  const { posts: adminPosts, categories: adminCategories } = useAdminData();
  
  // Combine admin and default posts
  const allPosts = [...adminPosts, ...blogPosts].filter(
    (post, index, self) => index === self.findIndex(p => p.id === post.id)
  );
  
  // Filter posts by category
  const categoryPosts = allPosts.filter(post => 
    post.category.toLowerCase() === decodedCategory.toLowerCase()
  );
  
  // Get categories from admin data
  const categories = adminCategories.map(cat => cat.name);
  
  if (categoryPosts.length === 0) {
    return (
      <>
        <LouisebotWidget />
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Categoría no encontrada
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                No se encontraron artículos para la categoría seleccionada.
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
                {categories.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Categorías disponibles:</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {categories.map((cat, index) => (
                        <Button
                          key={index}
                          asChild
                          variant="outline"
                          className="border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10"
                        >
                          <Link to={`/blog/categoria/${categoryToUrl(cat)}`}>
                            {cat}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
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
              Categoría: <span className="text-novativa-orange">{decodedCategory}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Artículos relacionados con {decodedCategory}
            </p>
          </div>
        </div>
      </section>
      
      {/* Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
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
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div>
            <h2 className="text-2xl font-bold mb-6">Otras Categorías</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((cat, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className={`border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10 justify-start ${cat === decodedCategory ? 'bg-novativa-teal/20' : ''}`}
                >
                  <Link to={`/blog/categoria/${categoryToUrl(cat)}`}>
                    {cat}
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

export default BlogCategory;
