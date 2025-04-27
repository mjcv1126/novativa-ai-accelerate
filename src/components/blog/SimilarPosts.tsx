
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tag } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';
import { formatBlogDate } from '@/utils/blogUtils';

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
        <Card key={post.id} className="overflow-hidden h-full flex flex-col border-t-4 border-t-novativa-teal transition-all hover:shadow-lg">
          <CardHeader className="p-0">
            <Link to={`/blog/${post.id}`}>
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
                <div className="absolute top-0 right-0 bg-novativa-teal text-white px-3 py-1 text-xs font-medium">
                  {post.category}
                </div>
              </div>
            </Link>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <div className="text-sm text-gray-500 mb-2">{formatBlogDate(post.date)}</div>
            <Link 
              to={`/blog/${post.id}`} 
              className="font-bold text-lg mb-3 hover:text-novativa-teal transition-colors line-clamp-2 block"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Tag size={12} className="mr-1" /> {tag}
                  </Badge>
                ))}
              </div>
            )}
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
