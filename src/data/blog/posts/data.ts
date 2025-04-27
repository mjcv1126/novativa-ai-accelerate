import { BlogPost } from '../types';
import { blogPosts as staticPosts } from '@/data/blogPostsData';

export const blogPosts: BlogPost[] = [...staticPosts];

