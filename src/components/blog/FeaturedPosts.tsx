
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogPosts';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

interface FeaturedPostsProps {
  filteredPosts: BlogPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ filteredPosts }) => {
  const recentPosts = filteredPosts
    .sort((a, b) => {
      // Parse the date strings (format: DD/MM/YYYY) into Date objects
      const dateA = parse(a.date, 'dd/MM/yyyy', new Date());
      const dateB = parse(b.date, 'dd/MM/yyyy', new Date());
      
      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {recentPosts.map((post) => (
        <Link to={`/blog/${post.id}`} key={post.id} className="group relative h-[400px] overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
            <div className="text-white">
              <span className="text-novativa-orange font-medium mb-2 block">
                {post.category}
              </span>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-novativa-teal transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-200 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center mt-4 text-sm text-gray-300">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedPosts;
