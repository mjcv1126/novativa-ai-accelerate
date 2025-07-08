export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
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
          created_at: string | null
          description: string | null
          file_id: string
          id: string
          uploaded_by_email: string
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          description?: string | null
          file_id: string
          id?: string
          uploaded_by_email: string
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          description?: string | null
          file_id?: string
          id?: string
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
      crm_stages: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
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
          position?: number
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
      lead_assignments: {
        Row: {
          assigned_at: string
          assigned_by_email: string
          assigned_user_email: string
          contact_id: string
          id: string
          notes: string | null
        }
        Insert: {
          assigned_at?: string
          assigned_by_email: string
          assigned_user_email: string
          contact_id: string
          id?: string
          notes?: string | null
        }
        Update: {
          assigned_at?: string
          assigned_by_email?: string
          assigned_user_email?: string
          contact_id?: string
          id?: string
          notes?: string | null
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
          rule_id: string | null
          tidycal_booking_id: number
        }
        Insert: {
          contact_id?: string | null
          error_message?: string | null
          executed_at?: string | null
          execution_result?: string | null
          id?: string
          rule_id?: string | null
          tidycal_booking_id: number
        }
        Update: {
          contact_id?: string | null
          error_message?: string | null
          executed_at?: string | null
          execution_result?: string | null
          id?: string
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
          status?: string | null
          sync_completed_at?: string | null
          sync_started_at?: string
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invoice_number: {
        Args: { invoice_type?: string }
        Returns: string
      }
      get_latest_assignment: {
        Args: { contact_uuid: string }
        Returns: {
          assigned_user_email: string
          assigned_at: string
        }[]
      }
      store_contact: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_first_name: string
              p_last_name: string
              p_country_code: string
              p_country_name: string
              p_phone: string
            }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
