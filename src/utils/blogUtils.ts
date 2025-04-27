
import { setAntiCacheHeaders } from "./antiCacheHeaders";
import { blogPosts } from "@/data/blogPostsData";

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
 * @param idOrSlug - Post ID or slug string
 */
export const postExists = (idOrSlug: string): boolean => {
  // Check if it's a numeric ID
  const id = Number(idOrSlug);
  if (!isNaN(id)) {
    return blogPosts.some(post => post.id === id);
  }
  
  // If not numeric, treat as slug (although our current implementation uses IDs)
  return false;
};

/**
 * Get the correct URL for a blog post
 */
export const getBlogPostUrl = (id: number): string => {
  if (postExists(id.toString())) {
    return `/blog/${id}`;
  }
  // Fallback to blog index if post doesn't exist
  return '/blog';
};
