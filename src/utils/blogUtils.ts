import { setAntiCacheHeaders } from "./antiCacheHeaders";
import { blogPosts } from "@/data/blog/posts/data";
import { useAdminData } from "@/contexts/AdminDataContext";

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
export const getAllPosts = () => {
  const allPosts = [...blogPosts];
  
  try {
    // Get admin context using hook if available
    const adminData = useAdminData();
    if (adminData && adminData.posts) {
      // Only add admin posts that aren't in blogPosts
      adminData.posts.forEach(adminPost => {
        if (!allPosts.some(post => post.id === adminPost.id)) {
          allPosts.push(adminPost);
        }
      });
    }
  } catch (error) {
    console.log('Admin context not available:', error);
  }
  
  return allPosts;
};

/**
 * Check if a post exists
 * @param id - Post ID
 */
export const postExists = (id: number | string): boolean => {
  const allPosts = getAllPosts();
  const postId = typeof id === 'string' ? Number(id) : id;
  return !isNaN(postId) && allPosts.some(post => post.id === postId);
};

/**
 * Get the correct URL for a blog post
 */
export const getBlogPostUrl = (id: number | string): string => {
  const allPosts = getAllPosts();
  const postId = typeof id === 'string' ? Number(id) : id;
  
  if (!isNaN(postId)) {
    const post = allPosts.find(post => post.id === postId);
    if (post) {
      return `/blog/${post.id}`;
    }
  }
  
  // Fallback to blog index if post doesn't exist
  return '/blog';
};

/**
 * Get post by ID
 * @param id - Post ID
 */
export const getPostById = (id: number) => {
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
