
import { setAntiCacheHeaders } from "./antiCacheHeaders";

/**
 * Apply anti-cache measures specifically for blog pages
 */
export const setupBlogPage = () => {
  // Set anti-cache headers to prevent caching
  setAntiCacheHeaders();
  
  // Add a cache-busting query parameter to all blog links
  const addCacheBustingToLinks = () => {
    const links = document.querySelectorAll('a[href^="/blog"]');
    const timestamp = new Date().getTime();
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.includes('?')) {
        link.setAttribute('href', `${href}?t=${timestamp}`);
      }
    });
  };
  
  // Apply when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCacheBustingToLinks);
  } else {
    addCacheBustingToLinks();
  }
};

/**
 * Check if a blog post exists in the available data
 */
export const postExists = (slug: string): boolean => {
  // Import blogPosts directly to ensure we get the latest data
  const { blogPosts } = require('../data/blogPostsData');
  return blogPosts.some(post => post.slug === slug);
};

/**
 * Get the correct URL for a blog post
 */
export const getBlogPostUrl = (slug: string): string => {
  if (postExists(slug)) {
    return `/blog/${slug}`;
  }
  // Fallback to blog index if post doesn't exist
  return '/blog';
};
