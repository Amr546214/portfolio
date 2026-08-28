export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      education: {
        Row: {
          created_at: string
          degree: string
          description: string
          display_order: number
          end_date: string
          field: string
          gpa: string
          id: string
          institution: string
          is_visible: boolean
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          description?: string
          display_order?: number
          end_date?: string
          field?: string
          gpa?: string
          id?: string
          institution: string
          is_visible?: boolean
          start_date?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          description?: string
          display_order?: number
          end_date?: string
          field?: string
          gpa?: string
          id?: string
          institution?: string
          is_visible?: boolean
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          description: string
          display_order: number
          end_date: string
          id: string
          is_current: boolean
          is_visible: boolean
          location: string
          position: string
          start_date: string
          technologies: string[]
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string
          display_order?: number
          end_date?: string
          id?: string
          is_current?: boolean
          is_visible?: boolean
          location?: string
          position: string
          start_date?: string
          technologies?: string[]
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          display_order?: number
          end_date?: string
          id?: string
          is_current?: boolean
          is_visible?: boolean
          location?: string
          position?: string
          start_date?: string
          technologies?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          availability: string
          created_at: string
          email: string
          headline: string
          id: string
          location: string
          long_bio: string
          name: string
          phone: string
          profile_image: string | null
          resume_url: string | null
          short_bio: string
          short_name: string
          updated_at: string
        }
        Insert: {
          availability?: string
          created_at?: string
          email?: string
          headline?: string
          id?: string
          location?: string
          long_bio?: string
          name: string
          phone?: string
          profile_image?: string | null
          resume_url?: string | null
          short_bio?: string
          short_name?: string
          updated_at?: string
        }
        Update: {
          availability?: string
          created_at?: string
          email?: string
          headline?: string
          id?: string
          location?: string
          long_bio?: string
          name?: string
          phone?: string
          profile_image?: string | null
          resume_url?: string | null
          short_bio?: string
          short_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          alt_text: string
          created_at: string
          display_order: number
          id: string
          image_url: string
          project_id: string
        }
        Insert: {
          alt_text?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          project_id: string
        }
        Update: {
          alt_text?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_technologies: {
        Row: {
          created_at: string
          display_order: number
          id: string
          project_id: string
          technology: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          project_id: string
          technology: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          project_id?: string
          technology?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string
          display_order: number
          featured: boolean
          github_url: string | null
          id: string
          is_visible: boolean
          live_url: string | null
          short_description: string
          slug: string
          tags: string[]
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          display_order?: number
          featured?: boolean
          github_url?: string | null
          id?: string
          is_visible?: boolean
          live_url?: string | null
          short_description?: string
          slug: string
          tags?: string[]
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          featured?: boolean
          github_url?: string | null
          id?: string
          is_visible?: boolean
          live_url?: string | null
          short_description?: string
          slug?: string
          tags?: string[]
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          description: string
          display_order: number
          icon: string
          id: string
          is_featured: boolean
          is_visible: boolean
          name: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_featured?: boolean
          is_visible?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_featured?: boolean
          is_visible?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          display_order: number
          icon: string
          id: string
          is_visible: boolean
          label: string
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          is_visible?: boolean
          label?: string
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          is_visible?: boolean
          label?: string
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

export const Constants = {
  public: {
    Enums: {},
  },
} as const
