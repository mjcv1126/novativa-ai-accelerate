
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { blogPosts } from "@/data/blogPosts";
import { Calendar } from "lucide-react";

const RecentArticles = () => {
  // Get the 6 most recent posts
  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.date.split('/').reverse().join('-')).getTime() - 
                    new Date(a.date.split('/').reverse().join('-')).getTime())
    .slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Últimos Artículos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantente al día con las últimas tendencias y novedades en IA y automatización
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {recentPosts.map((post) => (
                <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span className="text-novativa-teal font-medium">{post.category}</span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {post.date}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <Button
                        asChild
                        variant="link"
                        className="text-novativa-teal p-0 h-auto hover:text-novativa-lightTeal"
                      >
                        <Link to={`/blog/${post.id}`}>
                          Leer más
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10"
          >
            <Link to="/blog">
              Ver todos los artículos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
