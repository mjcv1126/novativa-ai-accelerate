import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag, Eye } from 'lucide-react';
import { blogPosts, BlogPost as BlogPostType, getPostsByCategory } from '@/data/blogPosts';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { trackFacebookConversion } from '@/utils/trackFacebookConversion';
import { useAdminData } from '@/contexts/AdminDataContext';
import { useToast } from '@/hooks/use-toast';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
const BlogPost = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const {
    posts: adminPosts,
    categories: adminCategories
  } = useAdminData();
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Add anti-cache meta tags
    const metaTags = [{
      httpEquiv: 'Cache-Control',
      content: 'no-cache, no-store, must-revalidate'
    }, {
      httpEquiv: 'Pragma',
      content: 'no-cache'
    }, {
      httpEquiv: 'Expires',
      content: '0'
    }];
    metaTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[http-equiv="${tag.httpEquiv}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('http-equiv', tag.httpEquiv);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
  }, []);
  useEffect(() => {
    if (!slug) return;

    // Try to find the post in adminPosts first (for most up-to-date data)
    // First try to find by ID, else by slug
    const idFromSlug = parseInt(slug || '0', 10);
    const foundPost = !isNaN(idFromSlug) ? adminPosts.find(post => post.id === idFromSlug) || blogPosts.find(post => post.id === idFromSlug) : blogPosts.find(post => String(post.id) === slug);
    if (foundPost) {
      setPost(foundPost);

      // Track ViewContent event with enhanced data
      trackFacebookConversion('ViewContent', {
        customData: {
          content_name: foundPost.title,
          content_category: foundPost.category,
          content_type: 'article',
          content_ids: [foundPost.id.toString()],
          currency: 'USD',
          value: 0.00 // Set appropriate value if applicable
        }
      });

      // Get related posts from the same category
      const allPosts = [...adminPosts, ...blogPosts].filter((post, index, self) => index === self.findIndex(p => p.id === post.id));
      const related = allPosts.filter(p => p.category === foundPost.category && p.id !== foundPost.id).slice(0, 3);
      setRelatedPosts(related);
    }
  }, [slug, adminPosts]);

  // If post not found
  if (!post) {
    return <div className="flex flex-col items-center justify-center min-h-[60vh] py-16">
        <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
        <p className="text-gray-600 mb-6">El artículo que estás buscando no existe o ha sido movido.</p>
        <Button asChild className="bg-novativa-teal hover:bg-novativa-lightTeal">
          <Link to="/blog">Volver al Blog</Link>
        </Button>
      </div>;
  }

  // Get all available categories from admin data
  const availableCategories = adminCategories.map(cat => cat.name);
  return <>
      <LouisebotWidget />
      <Helmet>
        <title>{post.title} | Novativa Blog</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        {post.tags && <meta name="keywords" content={post.tags.join(', ')} />}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button asChild variant="outline" className="mb-6">
              <Link to="/blog" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" /> Volver al blog
              </Link>
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-novativa-teal/10 text-novativa-teal px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              {post.tags && post.tags.map((tag, index) => <Link key={index} to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                  {tag}
                </Link>)}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-8">
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Eye size={18} className="mr-2" />
                {post.views} lecturas
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="mb-8 rounded-xl overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl font-medium mb-6">
                  {post.excerpt}
                </p>
                
                <h2>Transformando Negocios con Tecnología Avanzada</h2>
                <p>
                  En la era digital actual, la implementación de tecnologías avanzadas como la inteligencia artificial y la automatización se ha vuelto esencial para las empresas que buscan mantenerse competitivas. {post.title} representa una oportunidad significativa para revolucionar procesos y optimizar resultados.
                </p>
                
                <p>
                  Los beneficios de implementar soluciones de {post.category.toLowerCase()} incluyen:
                </p>
                
                <ul>
                  <li>Aumento de la eficiencia operativa en hasta un 40%</li>
                  <li>Reducción de costos operativos</li>
                  <li>Mejora en la experiencia del cliente</li>
                  <li>Toma de decisiones basada en datos</li>
                  <li>Escalabilidad mejorada para crecimiento futuro</li>
                </ul>
                
                <h2>Casos de Éxito y Aplicaciones Prácticas</h2>
                <p>
                  Numerosas empresas ya están experimentando los beneficios de estas tecnologías. Por ejemplo, una empresa del sector {post.category === "Salud" ? "de la salud" : post.category === "Finanzas" ? "financiero" : "retail"} implementó recientemente soluciones avanzadas de {post.category.toLowerCase()} y logró un aumento del 35% en la satisfacción del cliente mientras redució los tiempos de respuesta en un 60%.
                </p>
                
                <blockquote>
                  "La implementación de tecnologías de {post.category.toLowerCase()} ha transformado completamente nuestra forma de operar, permitiéndonos enfocarnos en lo que realmente importa: servir mejor a nuestros clientes."
                </blockquote>
                
                <h2>El Futuro de la Tecnología en los Negocios</h2>
                <p>
                  Mirando hacia el futuro, podemos esperar una integración aún mayor de tecnologías avanzadas en todos los aspectos de los negocios. Las empresas que adopten estas soluciones tempranamente estarán mejor posicionadas para liderar sus industrias en los próximos años.
                </p>
                
                <p>
                  Es fundamental que las organizaciones comiencen a explorar cómo estas tecnologías pueden aplicarse a sus operaciones específicas y desarrollen estrategias para implementarlas de manera efectiva.
                </p>
              </div>
              
              {/* Tags Section */}
              {post.tags && post.tags.length > 0 && <div className="border-t border-b py-6 my-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag size={18} className="text-gray-500 mr-2" />
                    {post.tags.map((tag, index) => <Link key={index} to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </Link>)}
                  </div>
                </div>}
              
              {/* Author Section */}
              <div className="bg-gray-50 rounded-xl p-6 mt-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-4 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=0D9488&color=fff`} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{post.author}</h3>
                    <p className="text-gray-600">Especialista en {post.category}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  Experto en soluciones de {post.category.toLowerCase()} con amplia experiencia en implementación de tecnologías avanzadas para empresas de diversos sectores.
                </p>
              </div>
              
              {/* Newsletter Form */}
              <div className="bg-gray-50 rounded-xl p-6 mt-8">
                
                
                <NewsletterForm />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Related Posts */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Artículos Relacionados</h3>
                {relatedPosts.length > 0 ? <div className="space-y-4">
                    {relatedPosts.map(relatedPost => <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="block group">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                            <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-novativa-teal transition duration-300 line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {relatedPost.date}
                            </p>
                          </div>
                        </div>
                      </Link>)}
                  </div> : <p className="text-gray-600">No hay artículos relacionados disponibles.</p>}
              </div>
              
              {/* Categories */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Categorías</h3>
                <div className="space-y-2">
                  {availableCategories.map((category, index) => <Link key={index} to={`/blog/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded-md transition duration-200">
                      <span>{category}</span>
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {adminPosts.filter(p => p.category === category).length}
                      </span>
                    </Link>)}
                </div>
              </div>
              
              {/* Subscribe Form */}
              <div className="bg-novativa-teal rounded-xl p-6 text-white">
                
                
                <NewsletterForm light />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      
    </>;
};
export default BlogPost;