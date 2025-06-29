export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      contacts: {
        Row: {
          additional_phones: string[] | null
          company: string | null
          country_code: string
          country_name: string
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_contact_date: string | null
          last_name: string
          notes: string | null
          phone: string
          service_of_interest: string | null
          stage_id: string | null
          updated_at: string | null
        }
        Insert: {
          additional_phones?: string[] | null
          company?: string | null
          country_code: string
          country_name: string
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_contact_date?: string | null
          last_name: string
          notes?: string | null
          phone: string
          service_of_interest?: string | null
          stage_id?: string | null
          updated_at?: string | null
        }
        Update: {
          additional_phones?: string[] | null
          company?: string | null
          country_code?: string
          country_name?: string
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_contact_date?: string | null
          last_name?: string
          notes?: string | null
          phone?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
