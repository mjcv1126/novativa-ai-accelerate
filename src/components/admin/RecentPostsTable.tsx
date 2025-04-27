
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAdminData } from '@/contexts/AdminDataContext';
import { getBlogPostUrl, postExists, getPostById } from '@/utils/blogUtils';

const RecentPostsTable = () => {
  const { posts } = useAdminData();
  
  // Ordenar posts por fecha (más recientes primero) y tomar los 5 primeros
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableCell className="text-right">Acciones</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPosts.map((post) => {
            // Check if the post exists in the actual blog data
            const postExistsInBlog = postExists(post.id.toString());
            
            return (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant="default"
                    className={post.status === 'Publicado' ? "bg-green-500" : "bg-gray-500"}
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {postExistsInBlog ? (
                        <DropdownMenuItem asChild>
                          <Link to={`/blog/${post.id}`} className="flex items-center" target="_blank" rel="noopener noreferrer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver</span>
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem disabled className="flex items-center opacity-50">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>No disponible</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/blog`} state={{ editPostId: post.id }} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPostsTable;
