
import { blogPosts } from '../posts/data';

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
 * Format tag for URL
 */
export const tagToUrl = (tag: string): string => {
  return tag.toLowerCase()
           .normalize('NFD')
           .replace(/[\u0300-\u036f]/g, '')
           .replace(/[^a-z0-9]+/g, '-')
           .replace(/^-+|-+$/g, '');
};
