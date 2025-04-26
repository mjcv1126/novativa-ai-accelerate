
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, User } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';

interface FeaturedPostsProps {
  filteredPosts: BlogPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ filteredPosts }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <div className="relative rounded-xl overflow-hidden h-[400px] shadow-lg">
        {filteredPosts[0] && (
          <>
            <img 
              src={filteredPosts[0].image} 
              alt={filteredPosts[0].title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="text-novativa-orange bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm inline-block mb-3 font-medium">
                {filteredPosts[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {filteredPosts[0].title}
              </h2>
              <p className="text-white/80 mb-4 line-clamp-2">
                {filteredPosts[0].excerpt}
              </p>
              <div className="flex items-center text-white/80 text-sm mb-4">
                <User size={14} className="mr-1" />
                <span>{filteredPosts[0].author}</span>
                <span className="mx-2">•</span>
                <Calendar size={14} className="mr-1" />
                <span>{filteredPosts[0].date}</span>
              </div>
              <Button
                asChild
                className="bg-novativa-teal hover:bg-novativa-lightTeal w-fit"
              >
                <Link to={`/blog/${filteredPosts[0].id}`}>
                  Leer artículo
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.slice(1, 5).map((post) => (
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
  );
};

export default FeaturedPosts;
