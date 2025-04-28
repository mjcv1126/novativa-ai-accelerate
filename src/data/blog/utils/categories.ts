
import { blogPosts } from '../posts/data';

/**
 * Get all unique categories from blog posts
 */
export const getCategories = (): string[] => {
  const categories = blogPosts.map(post => post.category);
  // Return unique categories
  return Array.from(new Set(categories));
};

/**
 * Get all unique tags from blog posts
 */
export const getTags = (): string[] => {
  const allTags: string[] = [];
  
  blogPosts.forEach(post => {
    if (post.tags && post.tags.length > 0) {
      allTags.push(...post.tags);
    }
  });
  
  // Return unique tags
  return Array.from(new Set(allTags));
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
