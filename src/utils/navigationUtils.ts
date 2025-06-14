
/**
 * Handle navigation with forced refresh for specific routes
 * @param path The path to navigate to
 */
export const navigateWithRefresh = (path: string): void => {
  if (path === '/contacto') {
    // Open contact page in new tab with forced refresh
    window.open(path, '_blank');
  } else if (path === '/agenda') {
    // Redirect /agenda to formulario page instead of TidyCal
    window.location.href = '/formulario';
  } else {
    // For other routes, use normal navigation
    window.history.pushState({}, '', path);
  }
};

/**
 * Create a navigation handler that forces refresh for certain routes
 */
export const createNavigationHandler = (path: string) => () => {
  navigateWithRefresh(path);
};
