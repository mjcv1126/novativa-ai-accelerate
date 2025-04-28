
// This file is used to re-export blog-related data and utilities
export * from './blog';
export { getSimilarPosts, getPostsByCategory } from './blog/utils/similar';
export { getAllTags, getPostsByTagName, tagToUrl } from './blog/utils/tags'; 
export { getCategories, getTags, categoryToUrl } from './blog/utils/categories';
