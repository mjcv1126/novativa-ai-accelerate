
import { BlogPost } from '../types';
import { blogPosts } from '../posts/data';

/**
 * Get similar posts based on category and tags
 */
export const getSimilarPosts = (post: BlogPost, limit: number = 3): BlogPost[] => {
  if (!post) return [];
  
  // Get all available posts except the current one
  const availablePosts = blogPosts.filter(p => p.id !== post.id);
  
  // If no posts available or no current post, return empty array
  if (availablePosts.length === 0) {
    return [];
  }

  // Calculate similarity score based on matching category and tags
  const scoredPosts = availablePosts.map(candidate => {
    let score = 0;
    
    // Higher score for same category
    if (candidate.category === post.category) {
      score += 5;
    }
    
    // Score for matching tags
    if (post.tags && candidate.tags) {
      const matchingTags = post.tags.filter(tag => 
        candidate.tags?.includes(tag)
      );
      score += matchingTags.length * 2;
    }
    
    return { post: candidate, score };
  });
  
  // Sort by score (highest first)
  scoredPosts.sort((a, b) => b.score - a.score);
  
  // Return the top N posts
  return scoredPosts
    .slice(0, limit)
    .map(item => item.post);
};

/**
 * Get posts by category
 */
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Get posts by tag
 */
export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};
