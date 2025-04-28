
import { blogPosts } from '../posts/data';
import { BlogPost } from '../types';

/**
 * Get similar posts based on category and tags
 */
export const getSimilarPosts = (post: BlogPost, limit: number = 3): BlogPost[] => {
  // If there are no blog posts or post is undefined, return an empty array
  if (!post || blogPosts.length === 0) {
    return [];
  }
  
  // Filter posts with the same category, excluding the current post
  const sameCategoryPosts = blogPosts.filter(p => 
    p.id !== post.id && p.category === post.category
  );
  
  // If we have enough posts with the same category, return them
  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts.slice(0, limit);
  }
  
  // If not enough posts with same category, look for posts with matching tags
  let similarPosts = [...sameCategoryPosts];
  
  if (post.tags && post.tags.length > 0) {
    const postsWithMatchingTags = blogPosts.filter(p => {
      // Skip if it's the current post or already in similarPosts
      if (p.id === post.id || similarPosts.some(sp => sp.id === p.id)) {
        return false;
      }
      
      // Check if it has any matching tag
      return p.tags?.some(tag => post.tags?.includes(tag));
    });
    
    // Add posts with matching tags
    similarPosts = [...similarPosts, ...postsWithMatchingTags];
  }
  
  // If still not enough, add random posts
  if (similarPosts.length < limit) {
    const remainingPosts = blogPosts.filter(p => 
      p.id !== post.id && !similarPosts.some(sp => sp.id === p.id)
    );
    
    similarPosts = [...similarPosts, ...remainingPosts];
  }
  
  return similarPosts.slice(0, limit);
};

/**
 * Get posts by specific category
 */
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};
