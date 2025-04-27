
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BlogPostsSearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  postsPerPage: number;
  setPostsPerPage: (value: number) => void;
}

const BlogPostsSearch: React.FC<BlogPostsSearchProps> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  setFilterStatus,
  postsPerPage,
  setPostsPerPage,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="w-full md:w-1/3 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por título, autor, categoría o tag..."
          className="pl-10"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex gap-2 self-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filtrar
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setFilterStatus('all')}>
              Todos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('Publicado')}>
              Publicados
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('Borrador')}>
              Borradores
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <select
          className="border border-gray-300 rounded p-2 text-sm bg-white"
          value={postsPerPage}
          onChange={(e) => setPostsPerPage(Number(e.target.value))}
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
      </div>
    </div>
  );
};

export default BlogPostsSearch;
