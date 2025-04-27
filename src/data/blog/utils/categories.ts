
import { blogPosts } from '../posts/data';

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
 * Format category for URL
 */
export const categoryToUrl = (category: string): string => {
  return category.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
};
