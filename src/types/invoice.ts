export interface InvoiceProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  has_isv: boolean;
  type: 'product' | 'service';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  product_id?: string;
  product_name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  has_isv: boolean;
  subtotal: number;
  isv_amount: number;
  total: number;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  contact_id?: string;
  contact_name: string;
  contact_rtn?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  invoice_date: string;
  due_date?: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  invoice_type: 'invoice' | 'proforma';
  subtotal: number;
  isv_amount: number;
  total: number;
  currency: string;
  country: string;
  notes?: string;
  company_settings: Record<string, any>;
  created_at: string;
  updated_at: string;
  items?: InvoiceItem[];
}

export interface InvoiceSettings {
  id: string;
  company_name: string;
  company_rtn?: string;
  company_address?: string;
  company_phone?: string;
  company_email?: string;
  company_logo_url?: string;
  company_settings?: Record<string, any>;
  isv_rate: number;
  default_currency: string;
  default_country: string;
  invoice_prefix: string;
  proforma_prefix: string;
  next_invoice_number: number;
  next_proforma_number: number;
  created_at: string;
  updated_at: string;
}

export interface InvoiceFilters {
  status?: string;
  type?: 'invoice' | 'proforma';
  contact_name?: string;
  date_from?: string;
  date_to?: string;
  invoice_number?: string;
}

export interface InvoiceFormData {
  contact_id?: string;
  contact_name: string;
  contact_rtn?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  invoice_date: string;
  due_date?: string;
  invoice_type: 'invoice' | 'proforma';
  currency: string;
  country: string;
  notes?: string;
  items: {
    product_id?: string;
    product_name: string;
    description?: string;
    quantity: number;
    unit_price: number;
    has_isv: boolean;
  }[];
}