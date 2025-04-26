
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
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
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

const posts = [
  {
    id: 1,
    title: "Cómo la IA está transformando el servicio al cliente en 2025",
    author: "Marlon Caballero",
    date: "15/04/2025",
    category: "Inteligencia Artificial",
    status: "Publicado",
    views: 0,
  },
  {
    id: 2,
    title: "Automatización de procesos: La clave para la eficiencia empresarial",
    author: "Marlon Caballero",
    date: "10/04/2025",
    category: "Automatización",
    status: "Publicado",
    views: 0,
  },
  {
    id: 3,
    title: "Agentes IA: El futuro de la interacción digital",
    author: "Marlon Caballero",
    date: "05/04/2025",
    category: "Agentes IA",
    status: "Publicado",
    views: 0,
  },
  {
    id: 4,
    title: "Estrategias de marketing digital para 2025",
    author: "Marlon Caballero",
    date: "01/04/2025",
    category: "Marketing Digital",
    status: "Publicado",
    views: 0,
  },
  {
    id: 5,
    title: "Clonación de voz: Aplicaciones prácticas para tu negocio",
    author: "Marlon Caballero",
    date: "20/03/2025",
    category: "Tecnología de Voz",
    status: "Publicado",
    views: 0,
  }
];

const RecentPostsTable = () => {
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
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>
                <Badge 
                  variant="default"
                  className="bg-green-500"
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
                    <DropdownMenuItem asChild>
                      <Link to={`/blog/${post.id}`} className="flex items-center" target="_blank" rel="noopener noreferrer">
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Ver</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 focus:text-red-500">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPostsTable;
