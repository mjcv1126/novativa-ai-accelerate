
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, User } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';
import { useNavigate } from 'react-router-dom';

interface PostCardsProps {
  posts: BlogPost[];
}

const PostCards: React.FC<PostCardsProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handleReadMore = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
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
              variant="link"
              className="text-novativa-teal flex items-center hover:text-novativa-lightTeal"
              onClick={() => handleReadMore(post.id)}
            >
              Leer más <ArrowRight size={14} className="ml-1" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostCards;
