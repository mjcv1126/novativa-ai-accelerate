export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      alert_events: {
        Row: {
          created_at: string
          ended_at: string | null
          id: string
          insight_text: string | null
          metrics: Json | null
          org_id: string
          rule_id: string | null
          started_at: string | null
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          id?: string
          insight_text?: string | null
          metrics?: Json | null
          org_id: string
          rule_id?: string | null
          started_at?: string | null
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          id?: string
          insight_text?: string | null
          metrics?: Json | null
          org_id?: string
          rule_id?: string | null
          started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_events_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_events_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "alert_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_rules: {
        Row: {
          created_at: string
          destinations: Json | null
          id: string
          include_sources: string[] | null
          is_active: boolean
          keyword_set_id: string | null
          min_count: number | null
          name: string
          negative_ratio: number | null
          org_id: string
          spike_zscore: number | null
          window_minutes: number | null
        }
        Insert: {
          created_at?: string
          destinations?: Json | null
          id?: string
          include_sources?: string[] | null
          is_active?: boolean
          keyword_set_id?: string | null
          min_count?: number | null
          name: string
          negative_ratio?: number | null
          org_id: string
          spike_zscore?: number | null
          window_minutes?: number | null
        }
        Update: {
          created_at?: string
          destinations?: Json | null
          id?: string
          include_sources?: string[] | null
          is_active?: boolean
          keyword_set_id?: string | null
          min_count?: number | null
          name?: string
          negative_ratio?: number | null
          org_id?: string
          spike_zscore?: number | null
          window_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_rules_keyword_set_id_fkey"
            columns: ["keyword_set_id"]
            isOneToOne: false
            referencedRelation: "keyword_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_rules_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string
          data: Json
          id: string
          org_id: string
          provider: Database["public"]["Enums"]["provider"]
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          org_id: string
          provider: Database["public"]["Enums"]["provider"]
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          org_id?: string
          provider?: Database["public"]["Enums"]["provider"]
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      app_users: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          last_login_at: string | null
          last_name: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          last_name?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          last_name?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          external_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_internal: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          external_url?: string | null
          id: string
          image_url?: string | null
          is_active?: boolean
          is_internal?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_internal?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      automation_api_keys: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          org_id: string
          scopes: string[]
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          org_id: string
          scopes?: string[]
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          org_id?: string
          scopes?: string[]
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          approved: boolean
          author_email: string
          author_name: string
          content: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          approved?: boolean
          author_email: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          approved?: boolean
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_avatar: string | null
          author_name: string
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured: boolean
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean
          published_at: string | null
          reading_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_avatar?: string | null
          author_name?: string
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          reading_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_avatar?: string | null
          author_name?: string
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      contact_activities: {
        Row: {
          activity_type: string
          completed_at: string | null
          contact_id: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          is_completed: boolean | null
          org_id: string
          scheduled_date: string | null
          scheduled_time: string | null
          status: string | null
          tidycal_booking_id: number | null
          tidycal_booking_reference: string | null
          title: string
          updated_at: string
        }
        Insert: {
          activity_type: string
          completed_at?: string | null
          contact_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          org_id: string
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string | null
          tidycal_booking_id?: number | null
          tidycal_booking_reference?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          activity_type?: string
          completed_at?: string | null
          contact_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          org_id?: string
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string | null
          tidycal_booking_id?: number | null
          tidycal_booking_reference?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_attachments: {
        Row: {
          contact_id: string
          created_at: string
          description: string | null
          file_id: string
          id: string
          org_id: string
          updated_at: string
          uploaded_by_email: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          description?: string | null
          file_id: string
          id?: string
          org_id: string
          updated_at?: string
          uploaded_by_email: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          description?: string | null
          file_id?: string
          id?: string
          org_id?: string
          updated_at?: string
          uploaded_by_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_attachments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_attachments_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "uploaded_files"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          additional_emails: string[] | null
          additional_phones: string[] | null
          address: string | null
          company: string | null
          country_code: string
          country_name: string
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_contact_date: string | null
          last_name: string
          lead_value: number | null
          lead_value_currency: string | null
          loss_reason: string | null
          notes: string | null
          org_id: string
          payment_type: string | null
          phone: string
          rtn: string | null
          service_of_interest: string | null
          stage_id: string | null
          updated_at: string | null
        }
        Insert: {
          additional_emails?: string[] | null
          additional_phones?: string[] | null
          address?: string | null
          company?: string | null
          country_code: string
          country_name: string
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_contact_date?: string | null
          last_name: string
          lead_value?: number | null
          lead_value_currency?: string | null
          loss_reason?: string | null
          notes?: string | null
          org_id: string
          payment_type?: string | null
          phone: string
          rtn?: string | null
          service_of_interest?: string | null
          stage_id?: string | null
          updated_at?: string | null
        }
        Update: {
          additional_emails?: string[] | null
          additional_phones?: string[] | null
          address?: string | null
          company?: string | null
          country_code?: string
          country_name?: string
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_contact_date?: string | null
          last_name?: string
          lead_value?: number | null
          lead_value_currency?: string | null
          loss_reason?: string | null
          notes?: string | null
          org_id?: string
          payment_type?: string | null
          phone?: string
          rtn?: string | null
          service_of_interest?: string | null
          stage_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "crm_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      conversational_form_leads: {
        Row: {
          country_code: string
          country_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          investment_budget: string
          last_name: string
          phone: string
          services_of_interest: string
          submission_date: string
          submission_datetime: string
          submission_time: string
          updated_at: string
        }
        Insert: {
          country_code: string
          country_name: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          investment_budget: string
          last_name: string
          phone: string
          services_of_interest: string
          submission_date?: string
          submission_datetime?: string
          submission_time?: string
          updated_at?: string
        }
        Update: {
          country_code?: string
          country_name?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          investment_budget?: string
          last_name?: string
          phone?: string
          services_of_interest?: string
          submission_date?: string
          submission_datetime?: string
          submission_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_stages: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          org_id: string
          position: number
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          org_id: string
          position: number
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          org_id?: string
          position?: number
          updated_at?: string
        }
        Relationships: []
      }
      icom_leads: {
        Row: {
          country_code: string
          country_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          updated_at: string
          will_attend: boolean
        }
        Insert: {
          country_code: string
          country_name: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          updated_at?: string
          will_attend?: boolean
        }
        Update: {
          country_code?: string
          country_name?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          updated_at?: string
          will_attend?: boolean
        }
        Relationships: []
      }
      integrations: {
        Row: {
          config: Json
          created_at: string
          id: string
          is_active: boolean
          last_tested_at: string | null
          name: string
          org_id: string
          test_status: string | null
          type: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          last_tested_at?: string | null
          name: string
          org_id: string
          test_status?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          last_tested_at?: string | null
          name?: string
          org_id?: string
          test_status?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          created_at: string
          description: string | null
          has_isv: boolean
          id: string
          invoice_id: string
          isv_amount: number
          org_id: string
          product_id: string | null
          product_name: string
          quantity: number
          subtotal: number
          total: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          has_isv?: boolean
          id?: string
          invoice_id: string
          isv_amount?: number
          org_id: string
          product_id?: string | null
          product_name: string
          quantity?: number
          subtotal?: number
          total?: number
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          has_isv?: boolean
          id?: string
          invoice_id?: string
          isv_amount?: number
          org_id?: string
          product_id?: string | null
          product_name?: string
          quantity?: number
          subtotal?: number
          total?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "invoice_products"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_products: {
        Row: {
          created_at: string
          description: string | null
          has_isv: boolean
          id: string
          is_active: boolean
          name: string
          price: number
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          has_isv?: boolean
          id?: string
          is_active?: boolean
          name: string
          price?: number
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          has_isv?: boolean
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoice_settings: {
        Row: {
          company_address: string | null
          company_email: string | null
          company_logo_url: string | null
          company_name: string
          company_phone: string | null
          company_rtn: string | null
          created_at: string
          default_country: string
          default_currency: string
          id: string
          invoice_prefix: string
          isv_rate: number
          next_invoice_number: number
          next_proforma_number: number
          org_id: string
          proforma_prefix: string
          updated_at: string
        }
        Insert: {
          company_address?: string | null
          company_email?: string | null
          company_logo_url?: string | null
          company_name?: string
          company_phone?: string | null
          company_rtn?: string | null
          created_at?: string
          default_country?: string
          default_currency?: string
          id?: string
          invoice_prefix?: string
          isv_rate?: number
          next_invoice_number?: number
          next_proforma_number?: number
          org_id: string
          proforma_prefix?: string
          updated_at?: string
        }
        Update: {
          company_address?: string | null
          company_email?: string | null
          company_logo_url?: string | null
          company_name?: string
          company_phone?: string | null
          company_rtn?: string | null
          created_at?: string
          default_country?: string
          default_currency?: string
          id?: string
          invoice_prefix?: string
          isv_rate?: number
          next_invoice_number?: number
          next_proforma_number?: number
          org_id?: string
          proforma_prefix?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          company_settings: Json | null
          contact_address: string | null
          contact_email: string | null
          contact_id: string | null
          contact_name: string
          contact_phone: string | null
          contact_rtn: string | null
          country: string
          created_at: string
          currency: string
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          invoice_type: string
          isv_amount: number
          notes: string | null
          org_id: string
          status: string
          subtotal: number
          total: number
          updated_at: string
        }
        Insert: {
          company_settings?: Json | null
          contact_address?: string | null
          contact_email?: string | null
          contact_id?: string | null
          contact_name: string
          contact_phone?: string | null
          contact_rtn?: string | null
          country?: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          invoice_type?: string
          isv_amount?: number
          notes?: string | null
          org_id: string
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Update: {
          company_settings?: Json | null
          contact_address?: string | null
          contact_email?: string | null
          contact_id?: string | null
          contact_name?: string
          contact_phone?: string | null
          contact_rtn?: string | null
          country?: string
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          invoice_type?: string
          isv_amount?: number
          notes?: string | null
          org_id?: string
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      job_logs: {
        Row: {
          id: string
          job_name: string
          meta: Json | null
          org_id: string | null
          ran_at: string
          status: Database["public"]["Enums"]["job_status"]
        }
        Insert: {
          id?: string
          job_name: string
          meta?: Json | null
          org_id?: string | null
          ran_at?: string
          status: Database["public"]["Enums"]["job_status"]
        }
        Update: {
          id?: string
          job_name?: string
          meta?: Json | null
          org_id?: string | null
          ran_at?: string
          status?: Database["public"]["Enums"]["job_status"]
        }
        Relationships: []
      }
      keyword_sets: {
        Row: {
          boolean_query: string
          countries: string[] | null
          created_at: string
          id: string
          languages: string[] | null
          name: string
          org_id: string
        }
        Insert: {
          boolean_query: string
          countries?: string[] | null
          created_at?: string
          id?: string
          languages?: string[] | null
          name: string
          org_id: string
        }
        Update: {
          boolean_query?: string
          countries?: string[] | null
          created_at?: string
          id?: string
          languages?: string[] | null
          name?: string
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "keyword_sets_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_assignments: {
        Row: {
          assigned_at: string
          assigned_by_email: string
          assigned_user_email: string
          contact_id: string
          id: string
          notes: string | null
          org_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by_email: string
          assigned_user_email: string
          contact_id: string
          id?: string
          notes?: string | null
          org_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by_email?: string
          assigned_user_email?: string
          contact_id?: string
          id?: string
          notes?: string | null
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_assignments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      mentions: {
        Row: {
          author: string | null
          author_id: string | null
          captured_at: string | null
          channel: string | null
          domain: string | null
          embedding: string | null
          emotion: Json | null
          entities: Json | null
          id: string
          intent: Database["public"]["Enums"]["intent"] | null
          lang: string | null
          org_id: string
          published_at: string | null
          relevance_score: number | null
          sentiment: Database["public"]["Enums"]["sentiment"] | null
          source: Database["public"]["Enums"]["source_type"]
          source_id: string | null
          source_ref_id: string | null
          summary: string | null
          text: string | null
          title: string | null
          topics: Json | null
          url: string | null
        }
        Insert: {
          author?: string | null
          author_id?: string | null
          captured_at?: string | null
          channel?: string | null
          domain?: string | null
          embedding?: string | null
          emotion?: Json | null
          entities?: Json | null
          id?: string
          intent?: Database["public"]["Enums"]["intent"] | null
          lang?: string | null
          org_id: string
          published_at?: string | null
          relevance_score?: number | null
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          source: Database["public"]["Enums"]["source_type"]
          source_id?: string | null
          source_ref_id?: string | null
          summary?: string | null
          text?: string | null
          title?: string | null
          topics?: Json | null
          url?: string | null
        }
        Update: {
          author?: string | null
          author_id?: string | null
          captured_at?: string | null
          channel?: string | null
          domain?: string | null
          embedding?: string | null
          emotion?: Json | null
          entities?: Json | null
          id?: string
          intent?: Database["public"]["Enums"]["intent"] | null
          lang?: string | null
          org_id?: string
          published_at?: string | null
          relevance_score?: number | null
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          source?: Database["public"]["Enums"]["source_type"]
          source_id?: string | null
          source_ref_id?: string | null
          summary?: string | null
          text?: string | null
          title?: string | null
          topics?: Json | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      org_members: {
        Row: {
          created_at: string
          id: string
          org_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          org_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      orgs: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          lang: string | null
          org_id: string
          place_id: string | null
          platform: Database["public"]["Enums"]["platform"]
          published_at: string | null
          rating: number | null
          replied: boolean | null
          reply_published_at: string | null
          reply_text: string | null
          text: string | null
        }
        Insert: {
          id?: string
          lang?: string | null
          org_id: string
          place_id?: string | null
          platform: Database["public"]["Enums"]["platform"]
          published_at?: string | null
          rating?: number | null
          replied?: boolean | null
          reply_published_at?: string | null
          reply_text?: string | null
          text?: string | null
        }
        Update: {
          id?: string
          lang?: string | null
          org_id?: string
          place_id?: string | null
          platform?: Database["public"]["Enums"]["platform"]
          published_at?: string | null
          rating?: number | null
          replied?: boolean | null
          reply_published_at?: string | null
          reply_text?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sources: {
        Row: {
          created_at: string
          id: string
          org_id: string
          type: Database["public"]["Enums"]["source_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          org_id: string
          type: Database["public"]["Enums"]["source_type"]
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string
          type?: Database["public"]["Enums"]["source_type"]
        }
        Relationships: [
          {
            foreignKeyName: "sources_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "orgs"
            referencedColumns: ["id"]
          },
        ]
      }
      step_executions: {
        Row: {
          completed_at: string | null
          duration_ms: number | null
          error_message: string | null
          execution_id: string
          id: string
          input_data: Json | null
          org_id: string
          output_data: Json | null
          started_at: string
          status: Database["public"]["Enums"]["execution_status"]
          step_id: string
        }
        Insert: {
          completed_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          execution_id: string
          id?: string
          input_data?: Json | null
          org_id: string
          output_data?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["execution_status"]
          step_id: string
        }
        Update: {
          completed_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          execution_id?: string
          id?: string
          input_data?: Json | null
          org_id?: string
          output_data?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["execution_status"]
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_executions_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "workflow_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "step_executions_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "workflow_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      tidycal_automation_rules: {
        Row: {
          activity_description: string | null
          activity_title: string | null
          cancel_previous_activity: boolean | null
          contact_action: string | null
          contact_action_data: string | null
          create_activity: boolean | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          org_id: string
          target_stage_id: string | null
          trigger_condition: string
          updated_at: string | null
        }
        Insert: {
          activity_description?: string | null
          activity_title?: string | null
          cancel_previous_activity?: boolean | null
          contact_action?: string | null
          contact_action_data?: string | null
          create_activity?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          org_id: string
          target_stage_id?: string | null
          trigger_condition: string
          updated_at?: string | null
        }
        Update: {
          activity_description?: string | null
          activity_title?: string | null
          cancel_previous_activity?: boolean | null
          contact_action?: string | null
          contact_action_data?: string | null
          create_activity?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          org_id?: string
          target_stage_id?: string | null
          trigger_condition?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tidycal_automation_rules_target_stage_id_fkey"
            columns: ["target_stage_id"]
            isOneToOne: false
            referencedRelation: "crm_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      tidycal_processed_bookings: {
        Row: {
          booking_ends_at: string
          booking_starts_at: string
          contact_email: string
          contact_id: string | null
          contact_name: string
          created_at: string
          error_message: string | null
          id: string
          org_id: string
          processed_at: string
          sync_status: string | null
          tidycal_booking_id: number
        }
        Insert: {
          booking_ends_at: string
          booking_starts_at: string
          contact_email: string
          contact_id?: string | null
          contact_name: string
          created_at?: string
          error_message?: string | null
          id?: string
          org_id: string
          processed_at?: string
          sync_status?: string | null
          tidycal_booking_id: number
        }
        Update: {
          booking_ends_at?: string
          booking_starts_at?: string
          contact_email?: string
          contact_id?: string | null
          contact_name?: string
          created_at?: string
          error_message?: string | null
          id?: string
          org_id?: string
          processed_at?: string
          sync_status?: string | null
          tidycal_booking_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tidycal_processed_bookings_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      tidycal_rule_executions: {
        Row: {
          contact_id: string | null
          error_message: string | null
          executed_at: string | null
          execution_result: string | null
          id: string
          org_id: string
          rule_id: string | null
          tidycal_booking_id: number
        }
        Insert: {
          contact_id?: string | null
          error_message?: string | null
          executed_at?: string | null
          execution_result?: string | null
          id?: string
          org_id: string
          rule_id?: string | null
          tidycal_booking_id: number
        }
        Update: {
          contact_id?: string | null
          error_message?: string | null
          executed_at?: string | null
          execution_result?: string | null
          id?: string
          org_id?: string
          rule_id?: string | null
          tidycal_booking_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tidycal_rule_executions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tidycal_rule_executions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "tidycal_automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      tidycal_sync_logs: {
        Row: {
          bookings_failed: number | null
          bookings_found: number | null
          bookings_processed: number | null
          bookings_skipped: number | null
          error_message: string | null
          id: string
          last_booking_date: string | null
          org_id: string
          status: string | null
          sync_completed_at: string | null
          sync_started_at: string
        }
        Insert: {
          bookings_failed?: number | null
          bookings_found?: number | null
          bookings_processed?: number | null
          bookings_skipped?: number | null
          error_message?: string | null
          id?: string
          last_booking_date?: string | null
          org_id: string
          status?: string | null
          sync_completed_at?: string | null
          sync_started_at?: string
        }
        Update: {
          bookings_failed?: number | null
          bookings_found?: number | null
          bookings_processed?: number | null
          bookings_skipped?: number | null
          error_message?: string | null
          id?: string
          last_booking_date?: string | null
          org_id?: string
          status?: string | null
          sync_completed_at?: string | null
          sync_started_at?: string
        }
        Relationships: []
      }
      triggers: {
        Row: {
          config: Json
          created_at: string
          endpoint_path: string | null
          id: string
          is_active: boolean
          org_id: string
          type: Database["public"]["Enums"]["trigger_type"]
          webhook_secret: string | null
          workflow_id: string
        }
        Insert: {
          config?: Json
          created_at?: string
          endpoint_path?: string | null
          id?: string
          is_active?: boolean
          org_id: string
          type: Database["public"]["Enums"]["trigger_type"]
          webhook_secret?: string | null
          workflow_id: string
        }
        Update: {
          config?: Json
          created_at?: string
          endpoint_path?: string | null
          id?: string
          is_active?: boolean
          org_id?: string
          type?: Database["public"]["Enums"]["trigger_type"]
          webhook_secret?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "triggers_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      uploaded_files: {
        Row: {
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_app_permissions: {
        Row: {
          app_id: string
          can_access: boolean
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          app_id: string
          can_access?: boolean
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          app_id?: string
          can_access?: boolean
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_app_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_executions: {
        Row: {
          completed_at: string | null
          context: Json
          error_message: string | null
          id: string
          logs: Json
          org_id: string
          started_at: string
          status: Database["public"]["Enums"]["execution_status"]
          trigger_data: Json | null
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          context?: Json
          error_message?: string | null
          id?: string
          logs?: Json
          org_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["execution_status"]
          trigger_data?: Json | null
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          context?: Json
          error_message?: string | null
          id?: string
          logs?: Json
          org_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["execution_status"]
          trigger_data?: Json | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_steps: {
        Row: {
          action_type: Database["public"]["Enums"]["action_type"] | null
          condition: string | null
          config: Json
          created_at: string
          id: string
          name: string
          next_step: string | null
          org_id: string
          parent_step_id: string | null
          position: number
          save_as: string | null
          scenario_id: string | null
          step_number: number | null
          type: Database["public"]["Enums"]["step_type"]
          workflow_id: string
        }
        Insert: {
          action_type?: Database["public"]["Enums"]["action_type"] | null
          condition?: string | null
          config?: Json
          created_at?: string
          id?: string
          name: string
          next_step?: string | null
          org_id: string
          parent_step_id?: string | null
          position: number
          save_as?: string | null
          scenario_id?: string | null
          step_number?: number | null
          type: Database["public"]["Enums"]["step_type"]
          workflow_id: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["action_type"] | null
          condition?: string | null
          config?: Json
          created_at?: string
          id?: string
          name?: string
          next_step?: string | null
          org_id?: string
          parent_step_id?: string | null
          position?: number
          save_as?: string | null
          scenario_id?: string | null
          step_number?: number | null
          type?: Database["public"]["Enums"]["step_type"]
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_steps_parent_step_id_fkey"
            columns: ["parent_step_id"]
            isOneToOne: false
            referencedRelation: "workflow_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_steps_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          connections: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          org_id: string
          policies: Json | null
          scenarios: Json | null
          status: Database["public"]["Enums"]["workflow_status"]
          trigger_config: Json
          updated_at: string
          variables: Json | null
          version: number
        }
        Insert: {
          connections?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          org_id: string
          policies?: Json | null
          scenarios?: Json | null
          status?: Database["public"]["Enums"]["workflow_status"]
          trigger_config?: Json
          updated_at?: string
          variables?: Json | null
          version?: number
        }
        Update: {
          connections?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          org_id?: string
          policies?: Json | null
          scenarios?: Json | null
          status?: Database["public"]["Enums"]["workflow_status"]
          trigger_config?: Json
          updated_at?: string
          variables?: Json | null
          version?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      change_invoice_type: {
        Args: { p_invoice_id: string; p_new_type: string }
        Returns: {
          company_settings: Json | null
          contact_address: string | null
          contact_email: string | null
          contact_id: string | null
          contact_name: string
          contact_phone: string | null
          contact_rtn: string | null
          country: string
          created_at: string
          currency: string
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          invoice_type: string
          isv_amount: number
          notes: string | null
          org_id: string
          status: string
          subtotal: number
          total: number
          updated_at: string
        }
      }
      create_org_and_join: {
        Args: { p_name: string; p_slug: string }
        Returns: string
      }
      generate_invoice_number: {
        Args: { invoice_type?: string }
        Returns: string
      }
      get_current_user_email: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_icom_leads: {
        Args: Record<PropertyKey, never>
        Returns: {
          country_code: string
          country_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          updated_at: string
          will_attend: boolean
        }[]
      }
      get_latest_assignment: {
        Args: { contact_uuid: string }
        Returns: {
          assigned_at: string
          assigned_user_email: string
        }[]
      }
      get_user_email: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role_and_permissions: {
        Args: Record<PropertyKey, never>
        Returns: {
          can_write: boolean
          is_admin: boolean
          is_viewer: boolean
          role: string
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_by_email: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_current_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      list_my_orgs: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          slug: string
        }[]
      }
      log_security_event: {
        Args: {
          p_action: string
          p_details?: Json
          p_resource_id?: string
          p_resource_type: string
        }
        Returns: undefined
      }
      seed_demo_data: {
        Args: { p_org_id: string }
        Returns: undefined
      }
      set_admin_org_context: {
        Args: { p_org_id: string }
        Returns: undefined
      }
      set_client_org: {
        Args: { p_org_id: string }
        Returns: undefined
      }
      set_session_email: {
        Args: { email_value: string }
        Returns: undefined
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      store_contact: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_country_code: string
              p_country_name: string
              p_first_name: string
              p_last_name: string
              p_phone: string
            }
        Returns: string
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      action_type:
        | "ocr"
        | "http_request"
        | "transform_data"
        | "send_email"
        | "delay"
        | "condition"
        | "HTTP_GET"
        | "OCR_GOOGLE_VISION"
        | "RULES_APPLY"
        | "IF"
        | "SWITCH"
        | "MUTATE"
        | "PLAN_ENQUEUE"
        | "DELAY"
        | "SCRIPT"
      app_role: "owner" | "admin" | "analyst"
      execution_status:
        | "pending"
        | "running"
        | "completed"
        | "failed"
        | "cancelled"
      intent:
        | "complaint"
        | "praise"
        | "question"
        | "news"
        | "rumor"
        | "crisis"
        | "spam"
      job_status: "ok" | "fail"
      platform: "google" | "yelp"
      provider: "reddit" | "youtube" | "google_reviews" | "yelp"
      sentiment: "neg" | "neu" | "pos"
      source_type:
        | "gdelt"
        | "reddit"
        | "youtube"
        | "google_reviews"
        | "yelp"
        | "manual"
      step_type: "trigger" | "action" | "condition" | "integration"
      trigger_type: "webhook" | "schedule" | "manual"
      workflow_status: "active" | "inactive" | "draft"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      action_type: [
        "ocr",
        "http_request",
        "transform_data",
        "send_email",
        "delay",
        "condition",
        "HTTP_GET",
        "OCR_GOOGLE_VISION",
        "RULES_APPLY",
        "IF",
        "SWITCH",
        "MUTATE",
        "PLAN_ENQUEUE",
        "DELAY",
        "SCRIPT",
      ],
      app_role: ["owner", "admin", "analyst"],
      execution_status: [
        "pending",
        "running",
        "completed",
        "failed",
        "cancelled",
      ],
      intent: [
        "complaint",
        "praise",
        "question",
        "news",
        "rumor",
        "crisis",
        "spam",
      ],
      job_status: ["ok", "fail"],
      platform: ["google", "yelp"],
      provider: ["reddit", "youtube", "google_reviews", "yelp"],
      sentiment: ["neg", "neu", "pos"],
      source_type: [
        "gdelt",
        "reddit",
        "youtube",
        "google_reviews",
        "yelp",
        "manual",
      ],
      step_type: ["trigger", "action", "condition", "integration"],
      trigger_type: ["webhook", "schedule", "manual"],
      workflow_status: ["active", "inactive", "draft"],
    },
  },
} as const
