
import { setAntiCacheHeaders } from "./antiCacheHeaders";
import { blogPosts } from "@/data/blog/posts/data";
import { BlogPost } from "@/data/blog/types";

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
 * Get all available posts, combining blog posts data with admin posts
 */
export const getAllPosts = (): BlogPost[] => {
  // For now, just return the static blogPosts array
  // Admin posts integration will be handled later
  return [...blogPosts];
};

/**
 * Check if a blog post exists in the available data
 * @param idOrSlug - Post ID or slug string
 */
export const postExists = (idOrSlug: string): boolean => {
  // Get all available posts
  const allPosts = getAllPosts();
  
  // Check if it's a numeric ID
  const id = Number(idOrSlug);
  if (!isNaN(id)) {
    const exists = allPosts.some(post => post.id === id);
    console.log(`Checking if post ${id} exists:`, exists);
    return exists;
  }
  
  // If not numeric, try to find by post title (as a basic slug)
  const exists = allPosts.some(post => 
    post.title.toLowerCase().replace(/\s+/g, '-') === idOrSlug.toLowerCase()
  );
  console.log(`Checking if post with slug ${idOrSlug} exists:`, exists);
  return exists;
};

/**
 * Get the correct URL for a blog post
 */
export const getBlogPostUrl = (id: number): string => {
  const allPosts = getAllPosts();
  const post = allPosts.find(post => post.id === id);
  
  if (post) {
    return `/blog/${id}`;
  }
  // Fallback to blog index if post doesn't exist
  return '/blog';
};

/**
 * Get post by ID
 * @param id - Post ID
 */
export const getPostById = (id: number): BlogPost | undefined => {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.id === id);
};

/**
 * Format a date string into a more readable format
 */
export const formatBlogDate = (dateString: string): string => {
  // Handle DD/MM/YYYY format
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthIndex = parseInt(month, 10) - 1;
    return `${day} de ${months[monthIndex]} de ${year}`;
  }
  
  // Return original if format doesn't match
  return dateString;
};
