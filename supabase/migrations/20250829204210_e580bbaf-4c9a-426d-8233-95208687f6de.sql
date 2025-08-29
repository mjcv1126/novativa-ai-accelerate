-- Disable RLS on invoice-related tables to allow unrestricted access
-- This removes all RLS restrictions since admin access is already protected by login

ALTER TABLE invoices DISABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items DISABLE ROW LEVEL SECURITY; 
ALTER TABLE invoice_products DISABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_settings DISABLE ROW LEVEL SECURITY;