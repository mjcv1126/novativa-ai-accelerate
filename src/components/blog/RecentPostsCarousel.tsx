
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/data/blog/types";

interface RecentPostsCarouselProps {
  recentPosts: BlogPost[];
}

const RecentPostsCarousel = ({ recentPosts }: RecentPostsCarouselProps) => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Artículos Destacados</h2>
          <p className="text-gray-600">Los últimos artículos sobre IA y automatización</p>
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
      </div>
    </section>
  );
};

export default RecentPostsCarousel;

