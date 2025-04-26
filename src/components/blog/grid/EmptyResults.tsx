
import React from 'react';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/data/blogPosts';

interface EmptyResultsProps {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSidebarSearchResults: (posts: BlogPost[]) => void;
}

const EmptyResults: React.FC<EmptyResultsProps> = ({
  setSearchQuery,
  setSelectedCategory,
  setSidebarSearchResults
}) => {
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSidebarSearchResults([]);
  };

  return (
    <div className="text-center py-12">
      <p className="text-xl text-gray-600">No se encontraron artículos que coincidan con tu búsqueda.</p>
      <Button 
        onClick={handleResetFilters}
        className="mt-4 bg-novativa-teal hover:bg-novativa-lightTeal"
      >
        Ver todos los artículos
      </Button>
    </div>
  );
};

export default EmptyResults;
