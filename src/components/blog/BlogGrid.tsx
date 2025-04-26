
import React from 'react';
import { BlogPost } from '@/data/blogPosts';
import PostCards from './grid/PostCards';
import PaginationControls from './grid/PaginationControls';
import EmptyResults from './grid/EmptyResults';

interface BlogGridProps {
  currentPosts: BlogPost[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
  selectedCategory: string;
  filteredPosts: BlogPost[];
  setSidebarSearchResults: (posts: BlogPost[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  currentPosts,
  currentPage,
  totalPages,
  setCurrentPage,
  searchQuery,
  selectedCategory,
  filteredPosts,
  setSidebarSearchResults,
  setSearchQuery,
  setSelectedCategory,
}) => {
  return (
    <>
      {filteredPosts.length > 0 ? (
        <>
          <PostCards posts={currentPosts} />
          
          {totalPages > 1 && (
            <PaginationControls 
              currentPage={currentPage} 
              totalPages={totalPages} 
              setCurrentPage={setCurrentPage} 
            />
          )}
        </>
      ) : (
        <EmptyResults 
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
          setSidebarSearchResults={setSidebarSearchResults}
        />
      )}
    </>
  );
};

export default BlogGrid;

