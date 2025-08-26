-- Create uploaded_files table for file management
CREATE TABLE public.uploaded_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view all uploaded files" 
ON public.uploaded_files 
FOR SELECT 
USING (is_current_user_admin());

CREATE POLICY "Admins can create uploaded files" 
ON public.uploaded_files 
FOR INSERT 
WITH CHECK (is_current_user_admin());

CREATE POLICY "Admins can update uploaded files" 
ON public.uploaded_files 
FOR UPDATE 
USING (is_current_user_admin());

CREATE POLICY "Admins can delete uploaded files" 
ON public.uploaded_files 
FOR DELETE 
USING (is_current_user_admin());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_uploaded_files_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_uploaded_files_updated_at
  BEFORE UPDATE ON public.uploaded_files
  FOR EACH ROW
  EXECUTE FUNCTION public.update_uploaded_files_updated_at();