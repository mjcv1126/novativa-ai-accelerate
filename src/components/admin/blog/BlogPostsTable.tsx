import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/data/blogPosts';
import { Link } from 'react-router-dom';
import { Edit, Eye, Trash, ChevronDown, ChevronUp } from 'lucide-react';

interface BlogPostsTableProps {
  currentPosts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: number) => void;
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  handleSort: (key: string) => void;
}

const BlogPostsTable: React.FC<BlogPostsTableProps> = ({
  currentPosts,
  onEdit,
  onDelete,
  sortConfig,
  handleSort,
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="w-[400px] cursor-pointer"
                onClick={() => handleSort('title')}
              >
                Post
                {sortConfig.key === 'title' && (
                  sortConfig.direction === 'asc' 
                    ? <ChevronUp className="inline ml-1 h-4 w-4" /> 
                    : <ChevronDown className="inline ml-1 h-4 w-4" />
                )}
              </TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Fecha
                {sortConfig.key === 'date' && (
                  sortConfig.direction === 'asc' 
                    ? <ChevronUp className="inline ml-1 h-4 w-4" /> 
                    : <ChevronDown className="inline ml-1 h-4 w-4" />
                )}
              </TableHead>
              <TableHead>Estado</TableHead>
              <TableHead 
                className="text-right cursor-pointer"
                onClick={() => handleSort('views')}
              >
                Vistas
                {sortConfig.key === 'views' && (
                  sortConfig.direction === 'asc' 
                    ? <ChevronUp className="inline ml-1 h-4 w-4" /> 
                    : <ChevronDown className="inline ml-1 h-4 w-4" />
                )}
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {post.excerpt}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'Publicado' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{post.views}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/blog/${post.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(post.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No se encontraron posts
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogPostsTable;
