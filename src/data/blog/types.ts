export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  status: "Publicado" | "Borrador";
  views: number;
  image: string;
  seoDescription?: string;
  tags?: string[];
  content?: string;
  slug?: string;
}
