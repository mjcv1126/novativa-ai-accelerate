
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';

interface SimilarPostsProps {
  posts: BlogPost[];
}

const SimilarPosts: React.FC<SimilarPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden h-full flex flex-col">
          <CardHeader className="p-0">
            <Link to={`/blog/${post.id}`}>
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-36 object-cover hover:opacity-90 transition-opacity"
              />
            </Link>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <Link 
              to={`/blog/${post.id}`} 
              className="font-bold text-lg mb-2 hover:text-novativa-teal transition-colors line-clamp-2"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button 
              asChild 
              variant="link" 
              className="text-novativa-teal p-0 flex items-center hover:text-novativa-lightTeal"
            >
              <Link to={`/blog/${post.id}`}>
                Leer más <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SimilarPosts;
