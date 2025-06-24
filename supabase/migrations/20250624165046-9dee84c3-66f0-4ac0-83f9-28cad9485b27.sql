
-- Crear tabla para los posts del blog
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_name TEXT NOT NULL DEFAULT 'Admin',
  author_avatar TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  views INTEGER NOT NULL DEFAULT 0,
  reading_time INTEGER, -- tiempo estimado de lectura en minutos
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[], -- array de tags
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Crear tabla para categorías del blog
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear tabla para comentarios (opcional para futuro)
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Políticas para blog_posts (lectura pública para posts publicados)
CREATE POLICY "Anyone can view published posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Admin can manage all posts" 
  ON public.blog_posts 
  FOR ALL 
  USING (true);

-- Políticas para categorías (lectura pública)
CREATE POLICY "Anyone can view categories" 
  ON public.blog_categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin can manage categories" 
  ON public.blog_categories 
  FOR ALL 
  USING (true);

-- Políticas para comentarios
CREATE POLICY "Anyone can view approved comments" 
  ON public.blog_comments 
  FOR SELECT 
  USING (approved = true);

CREATE POLICY "Anyone can create comments" 
  ON public.blog_comments 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin can manage all comments" 
  ON public.blog_comments 
  FOR ALL 
  USING (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en blog_posts
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON public.blog_posts 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para mejor rendimiento
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(post_id);
CREATE INDEX idx_blog_comments_approved ON public.blog_comments(approved);

-- Insertar algunas categorías por defecto
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
('Inteligencia Artificial', 'inteligencia-artificial', 'Posts sobre IA y automatización', '#3B82F6'),
('Desarrollo Web', 'desarrollo-web', 'Artículos sobre desarrollo web y programación', '#10B981'),
('Negocios Digitales', 'negocios-digitales', 'Estrategias para negocios digitales', '#F59E0B'),
('Tutoriales', 'tutoriales', 'Guías paso a paso', '#8B5CF6'),
('Noticias', 'noticias', 'Últimas noticias del sector', '#EF4444');
