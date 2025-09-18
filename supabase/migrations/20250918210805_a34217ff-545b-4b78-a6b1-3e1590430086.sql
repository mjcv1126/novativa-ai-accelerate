-- Enable RLS on all remaining tables that need it based on linter errors
-- First, let's check what tables exist that might need RLS

-- These are likely the tables that still need RLS enabled:
ALTER TABLE public.icom_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversational_form_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Also check if there are any other public tables without RLS
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND NOT EXISTS (
            SELECT 1 FROM pg_class c
            JOIN pg_namespace n ON c.relnamespace = n.oid
            WHERE n.nspname = 'public' 
            AND c.relname = tablename
            AND c.relrowsecurity = true
        )
        AND tablename NOT IN ('icom_leads', 'conversational_form_leads', 'uploaded_files', 'blog_posts', 'blog_categories', 'contacts', 'crm_stages', 'contact_activities', 'contact_attachments', 'lead_assignments')
    LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' ENABLE ROW LEVEL SECURITY';
        RAISE NOTICE 'Enabled RLS on table: %', r.tablename;
    END LOOP;
END $$;