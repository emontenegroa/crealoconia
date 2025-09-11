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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_temp_keys: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          ip_address: unknown | null
          location_info: Json | null
          temp_key: string
          used: boolean
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          location_info?: Json | null
          temp_key: string
          used?: boolean
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          location_info?: Json | null
          temp_key?: string
          used?: boolean
          user_agent?: string | null
        }
        Relationships: []
      }
      ai_usage_tracking: {
        Row: {
          created_at: string
          field_name: string
          id: string
          session_id: string
          updated_at: string
          usage_count: number
        }
        Insert: {
          created_at?: string
          field_name: string
          id?: string
          session_id: string
          updated_at?: string
          usage_count?: number
        }
        Update: {
          created_at?: string
          field_name?: string
          id?: string
          session_id?: string
          updated_at?: string
          usage_count?: number
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          created_at: string
          event_id: string
          event_source_url: string
          event_type: string
          facebook_response: Json | null
          id: string
          user_email: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          event_source_url: string
          event_type: string
          facebook_response?: Json | null
          id?: string
          user_email?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          event_source_url?: string
          event_type?: string
          facebook_response?: Json | null
          id?: string
          user_email?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          attempt_number: number
          completed: boolean
          created_at: string
          email: string
          form_data: Json
          id: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          attempt_number?: number
          completed?: boolean
          created_at?: string
          email: string
          form_data?: Json
          id?: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          attempt_number?: number
          completed?: boolean
          created_at?: string
          email?: string
          form_data?: Json
          id?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string | null
          email: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_rate_limit: {
        Args: { check_email: string }
        Returns: boolean
      }
      cleanup_expired_temp_keys: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      detect_suspicious_activity: {
        Args: { check_email: string; time_window_minutes?: number }
        Returns: boolean
      }
      get_user_submission: {
        Args: { user_email: string }
        Returns: {
          completed: boolean
          created_at: string
          form_data: Json
          id: string
          updated_at: string
        }[]
      }
      is_admin_authenticated: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_admin_access: {
        Args: { admin_email: string }
        Returns: undefined
      }
      log_security_event: {
        Args: {
          email?: string
          event_data?: Json
          event_type: string
          ip_address?: unknown
          user_agent?: string
          user_id?: string
        }
        Returns: string
      }
      store_admin_code: {
        Args: {
          admin_email: string
          code: string
          user_agent_string?: string
          user_ip?: unknown
        }
        Returns: string
      }
      upsert_form_submission: {
        Args: {
          p_attempt_number?: number
          p_completed?: boolean
          p_email: string
          p_form_data: Json
        }
        Returns: string
      }
      verify_admin_code: {
        Args: { check_code: string; check_email: string }
        Returns: boolean
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
