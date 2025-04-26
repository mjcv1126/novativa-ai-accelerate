
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogPosts';

interface FeaturedPostsProps {
  filteredPosts: BlogPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ filteredPosts }) => {
  // Get the two most recent posts
  const recentPosts = getSortedRecentPosts(filteredPosts, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {recentPosts.map((post) => (
        <FeaturedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

// Helper function to sort posts by date
const getSortedRecentPosts = (posts: BlogPost[], count: number): BlogPost[] => {
  return [...posts]
    .sort((a, b) => {
      // Parse dates from various formats
      const dateA = parsePostDate(a.date);
      const dateB = parsePostDate(b.date);
      
      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, count);
};

// Parse post date from different formats
const parsePostDate = (dateString: string): Date => {
  // Try DD/MM/YYYY format
  let parsedDate = new Date(dateString.split('/').reverse().join('-'));
  
  // If invalid, try MM/DD/YYYY format
  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date(dateString);
  }
  
  // Return the date or fallback to current date if still invalid
  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

// Featured post card component
interface FeaturedPostCardProps {
  post: BlogPost;
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`} className="group relative h-[400px] overflow-hidden rounded-xl">
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
  );
};

export default FeaturedPosts;
