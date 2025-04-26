
import { BlogPost, blogPosts } from './blogPostsData';

export type { BlogPost };
export { blogPosts };

/**
 * Get all available categories from blog posts
 */
export const getCategories = () => {
  return [...new Set(blogPosts.map(post => post.category))];
};

/**
 * Get posts by category
 */
export const getPostsByCategory = (category: string) => {
  return blogPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Get all available tags from blog posts
 */
export const getAllTags = () => {
  const allTags = blogPosts.reduce((tags: string[], post) => {
    if (post.tags) {
      tags.push(...post.tags);
    }
    return tags;
  }, []);
  return [...new Set(allTags)];
};

/**
 * Get posts by tag
 */
export const getPostsByTag = (tag: string) => {
  return blogPosts.filter(post => 
    post.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

/**
 * Get similar posts based on a post and its category/tags
 */
export const getSimilarPosts = (currentPost: BlogPost, limit = 3) => {
  let similarPosts = blogPosts.filter(post => 
    post.id !== currentPost.id && post.category === currentPost.category
  );
  
  if (similarPosts.length < limit && currentPost.tags && currentPost.tags.length > 0) {
    // If we don't have enough by category, find by tags as well
    const tagMatches = blogPosts.filter(post => 
      post.id !== currentPost.id && 
      post.category !== currentPost.category && 
      post.tags?.some(tag => currentPost.tags?.includes(tag))
    );
    
    // Add tag matches without duplicates
    for (const post of tagMatches) {
      if (similarPosts.length >= limit) break;
      if (!similarPosts.some(p => p.id === post.id)) {
        similarPosts.push(post);
      }
    }
  }
  
  return similarPosts.slice(0, limit);
};

/**
 * Format tag for URL
 */
export const tagToUrl = (tag: string): string => {
  return tag.toLowerCase()
           .normalize('NFD')
           .replace(/[\u0300-\u036f]/g, '')
           .replace(/[^a-z0-9]+/g, '-')
           .replace(/^-+|-+$/g, '');
};

/**
 * Format category for URL
 */
export const categoryToUrl = (category: string): string => {
  return category.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
};
