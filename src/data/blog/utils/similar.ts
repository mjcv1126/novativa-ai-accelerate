
import { blogPosts } from '../posts/data';
import { BlogPost } from '../types';

/**
 * Get similar posts based on a post and its category/tags
 */
export const getSimilarPosts = (currentPost: BlogPost, limit = 3) => {
  let similarPosts = blogPosts.filter(post => 
    post.id !== currentPost.id && post.category === currentPost.category
  );
  
  if (similarPosts.length < limit && currentPost.tags && currentPost.tags.length > 0) {
    const tagMatches = blogPosts.filter(post => 
      post.id !== currentPost.id && 
      post.category !== currentPost.category && 
      post.tags?.some(tag => currentPost.tags?.includes(tag))
    );
    
    for (const post of tagMatches) {
      if (similarPosts.length >= limit) break;
      if (!similarPosts.some(p => p.id === post.id)) {
        similarPosts.push(post);
      }
    }
  }
  
  return similarPosts.slice(0, limit);
};
