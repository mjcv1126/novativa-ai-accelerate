
/**
 * Handle navigation with forced refresh for specific routes
 * @param path The path to navigate to
 */
export const navigateWithRefresh = (path: string): void => {
  if (path === '/contacto') {
    // Force page refresh for these specific routes
    window.location.href = path;
  } else if (path === '/agenda') {
    // Redirect /agenda to TidyCal
    window.location.href = 'https://tidycal.com/novativa/demo-gratis';
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
