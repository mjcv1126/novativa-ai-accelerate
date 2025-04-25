import React from 'react';
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
import { ArrowRight, Calendar, User } from 'lucide-react';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { blogPosts, getCategories } from '@/data/blogPosts';

const Blog = () => {
  const categories = getCategories();
  
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
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <span className="text-novativa-orange bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm inline-block mb-3 font-medium">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {blogPosts[0].title}
                </h2>
                <p className="text-white/80 mb-4 line-clamp-2">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center text-white/80 text-sm mb-4">
                  <User size={14} className="mr-1" />
                  <span>{blogPosts[0].author}</span>
                  <span className="mx-2">•</span>
                  <Calendar size={14} className="mr-1" />
                  <span>{blogPosts[0].date}</span>
                </div>
                <Button
                  asChild
                  className="bg-novativa-teal hover:bg-novativa-lightTeal w-fit"
                >
                  <Link to={`/blog/${blogPosts[0].id}`}>
                    Leer artículo
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.slice(1, 5).map((post) => (
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
          
          {/* More Articles Section */}
          <div className="border-t pt-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Artículos Recientes</h2>
              <Button 
                variant="outline" 
                className="border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10"
              >
                Ver todos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
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
        </div>
      </section>
      
      {/* Categories and Subscribe Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Categorías</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="outline"
                    className="border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10 justify-start"
                  >
                    <Link to={`/blog/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {category}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
              <p className="text-gray-600 mb-6">
                Recibe las últimas noticias, artículos y recursos sobre IA y automatización directamente en tu bandeja de entrada.
              </p>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-novativa-teal focus:border-novativa-teal"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-novativa-teal focus:border-novativa-teal"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-novativa-orange hover:bg-novativa-lightOrange"
                >
                  Suscribirse
                </Button>
                <p className="text-xs text-gray-500">
                  Al suscribirte, aceptas nuestra política de privacidad. No compartiremos tu información con terceros.
                </p>
              </form>
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
