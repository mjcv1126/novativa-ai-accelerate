import { supabase } from '@/integrations/supabase/client';
import type { Invoice, InvoiceProduct, InvoiceSettings, InvoiceFormData, InvoiceFilters } from '@/types/invoice';

export const invoiceService = {
  // Productos/Servicios
  async getProducts() {
    const { data, error } = await supabase
      .from('invoice_products')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) throw error;
    return data as InvoiceProduct[];
  },

  async createProduct(product: Omit<InvoiceProduct, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('invoice_products')
      .insert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data as InvoiceProduct;
  },

  async updateProduct(id: string, product: Partial<InvoiceProduct>) {
    const { data, error } = await supabase
      .from('invoice_products')
      .update(product)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as InvoiceProduct;
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('invoice_products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Configuraciones
  async getSettings() {
    const { data, error } = await supabase
      .from('invoice_settings')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) throw error;
    
    // Si no hay configuración, crear una por defecto
    if (!data) {
      const defaultSettings = {
        company_name: 'Novativa',
        company_email: 'soporte@novativa.org',
        isv_rate: 0.15,
        default_currency: 'HNL',
        default_country: 'Honduras',
        invoice_prefix: 'INV',
        proforma_prefix: 'PRF',
        next_invoice_number: 1,
        next_proforma_number: 1,
        org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
      };
      
      const { data: newData, error: insertError } = await supabase
        .from('invoice_settings')
        .insert(defaultSettings)
        .select()
        .single();
      
      if (insertError) throw insertError;
      return newData as InvoiceSettings;
    }
    
    return data as InvoiceSettings;
  },

  async updateSettings(settings: Partial<InvoiceSettings>) {
    try {
      // Primero obtener el ID de configuración existente
      const existingSettings = await this.getSettings();
      
      const { data, error } = await supabase
        .from('invoice_settings')
        .update(settings)
        .eq('id', existingSettings.id)
        .select()
        .single();
      
      if (error) throw error;
      return data as InvoiceSettings;
    } catch (error: any) {
      // Si no existe configuración, crear una nueva
      if (error.message?.includes('No rows')) {
        const { data, error: insertError } = await supabase
          .from('invoice_settings')
          .insert({
            ...settings,
            org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
          })
          .select()
          .single();
        
        if (insertError) throw insertError;
        return data as InvoiceSettings;
      }
      throw error;
    }
  },

  // Facturas
  async getInvoices(filters?: InvoiceFilters) {
    let query = supabase
      .from('invoices')
      .select(`
        *,
        items:invoice_items(*)
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.type) {
      query = query.eq('invoice_type', filters.type);
    }
    
    if (filters?.contact_name) {
      query = query.ilike('contact_name', `%${filters.contact_name}%`);
    }
    
    if (filters?.invoice_number) {
      query = query.ilike('invoice_number', `%${filters.invoice_number}%`);
    }
    
    if (filters?.date_from) {
      query = query.gte('invoice_date', filters.date_from);
    }
    
    if (filters?.date_to) {
      query = query.lte('invoice_date', filters.date_to);
    }

    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    if (error) throw error;
    return data as Invoice[];
  },

  async getInvoice(id: string) {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        items:invoice_items(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Invoice;
  },

  async generateInvoiceNumber(type: 'invoice' | 'proforma' = 'invoice') {
    const { data, error } = await supabase.rpc('generate_invoice_number', { 
      invoice_type: type 
    });
    
    if (error) throw error;
    return data as string;
  },

  async createInvoice(invoiceData: InvoiceFormData) {
    try {
      // Generar número de factura
      const invoice_number = await this.generateInvoiceNumber(invoiceData.invoice_type);
      
      // Calcular totales
      const settings = await this.getSettings();
      let subtotal = 0;
      let isv_amount = 0;

      const processedItems = invoiceData.items.map(item => {
        const itemSubtotal = item.quantity * item.unit_price;
        const itemIsv = item.has_isv ? itemSubtotal * settings.isv_rate : 0;
        const itemTotal = itemSubtotal + itemIsv;

        subtotal += itemSubtotal;
        isv_amount += itemIsv;

        return {
          product_id: item.product_id,
          product_name: item.product_name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          has_isv: item.has_isv,
          subtotal: itemSubtotal,
          isv_amount: itemIsv,
          total: itemTotal
        };
      });

      const total = subtotal + isv_amount;

      // Crear factura
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          invoice_number,
          contact_id: invoiceData.contact_id,
          contact_name: invoiceData.contact_name,
          contact_rtn: invoiceData.contact_rtn,
          contact_email: invoiceData.contact_email,
          contact_phone: invoiceData.contact_phone,
          contact_address: invoiceData.contact_address,
          invoice_date: invoiceData.invoice_date,
          due_date: invoiceData.due_date,
          invoice_type: invoiceData.invoice_type,
          currency: invoiceData.currency,
          country: invoiceData.country,
          notes: invoiceData.notes,
          status: 'pending',
          subtotal,
          isv_amount,
          total,
          org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc', // Org ID fijo temporal
          company_settings: {
            company_name: settings.company_name,
            company_rtn: settings.company_rtn,
            company_address: settings.company_address,
            company_phone: settings.company_phone,
            company_email: settings.company_email
          }
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Crear items
      const itemsWithInvoiceId = processedItems.map(item => ({
        ...item,
        invoice_id: invoice.id,
        org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsWithInvoiceId);

      if (itemsError) throw itemsError;

      return invoice as Invoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  async updateInvoice(id: string, invoiceData: Partial<InvoiceFormData>) {
    try {
      // Separar items del resto de datos
      const { items, ...restData } = invoiceData;
      
      // Crear objeto de actualización con los campos de la base de datos
      let invoiceUpdateData: any = { ...restData };
      
      // Si hay items, calcular totales
      if (items && items.length > 0) {
        const settings = await this.getSettings();
        let subtotal = 0;
        let isv_amount = 0;

        const processedItems = items.map(item => {
          const itemSubtotal = item.quantity * item.unit_price;
          const itemIsv = item.has_isv ? itemSubtotal * settings.isv_rate : 0;
          const itemTotal = itemSubtotal + itemIsv;

          subtotal += itemSubtotal;
          isv_amount += itemIsv;

          return {
            product_id: item.product_id,
            product_name: item.product_name,
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
            has_isv: item.has_isv,
            subtotal: itemSubtotal,
            isv_amount: itemIsv,
            total: itemTotal
          };
        });

        const total = subtotal + isv_amount;

        // Actualizar totales en los datos de la factura
        invoiceUpdateData.subtotal = subtotal;
        invoiceUpdateData.isv_amount = isv_amount;
        invoiceUpdateData.total = total;

        // Eliminar items existentes
        await supabase
          .from('invoice_items')
          .delete()
          .eq('invoice_id', id);

        // Insertar nuevos items
        const itemsWithInvoiceId = processedItems.map(item => ({
          ...item,
          invoice_id: id,
          org_id: 'a7b8c9d0-e1f2-3456-7890-123456789abc' // Org ID fijo temporal
        }));

        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(itemsWithInvoiceId);

        if (itemsError) throw itemsError;
      }

      // Actualizar la factura
      const { data, error } = await supabase
        .from('invoices')
        .update(invoiceUpdateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Invoice;
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  async deleteInvoice(id: string) {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async updateInvoiceStatus(id: string, status: Invoice['status']) {
    const { data, error } = await supabase
      .from('invoices')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Invoice;
  },

  async duplicateInvoice(originalInvoiceId: string) {
    try {
      // Obtener la factura original con sus items
      const originalInvoice = await this.getInvoice(originalInvoiceId);
      
      // Crear nueva factura duplicada (createInvoice generará el número automáticamente)
      const duplicatedInvoiceData = {
        contact_id: originalInvoice.contact_id,
        contact_name: originalInvoice.contact_name,
        contact_rtn: originalInvoice.contact_rtn,
        contact_email: originalInvoice.contact_email,
        contact_phone: originalInvoice.contact_phone,
        contact_address: originalInvoice.contact_address,
        invoice_date: new Date().toISOString().split('T')[0], // Fecha actual
        due_date: originalInvoice.due_date,
        invoice_type: originalInvoice.invoice_type as 'invoice' | 'proforma',
        currency: originalInvoice.currency,
        country: originalInvoice.country,
        notes: originalInvoice.notes,
        items: originalInvoice.items?.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          has_isv: item.has_isv
        })) || []
      };

      return await this.createInvoice(duplicatedInvoiceData);
    } catch (error) {
      console.error('Error duplicating invoice:', error);
      throw error;
    }
  },

  async changeInvoiceType(invoiceId: string, newType: 'invoice' | 'proforma') {
    try {
      const { data, error } = await supabase.rpc('change_invoice_type', {
        p_invoice_id: invoiceId,
        p_new_type: newType
      });

      if (error) throw error;
      return data as Invoice;
    } catch (error) {
      console.error('Error changing invoice type:', error);
      throw error;
    }
  }
};