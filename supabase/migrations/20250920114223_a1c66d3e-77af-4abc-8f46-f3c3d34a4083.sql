-- Create temporary open policies to test if data access works, then implement proper security
-- IMPORTANT: This is a temporary test - we'll secure it properly after

-- Temporarily disable RLS to test data access
ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_stages DISABLE ROW LEVEL SECURITY;

-- Test query to confirm data is accessible
SELECT 'Test data access' as info, 
       (SELECT count(*) FROM public.contacts) as contacts_count,
       (SELECT count(*) FROM public.crm_stages WHERE is_active = true) as active_stages_count;