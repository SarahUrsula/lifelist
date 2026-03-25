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
      items: {
        Row: {
          category: string
          completed_at: string | null
          created_at: string | null
          id: string
          image_url: string | null
          latitude: number | null
          location_name: string | null
          longitude: number | null
          memory_note: string | null
          notes: string | null
          rating: number | null
          status: string
          title: string
          updated_at: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          category?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          memory_note?: string | null
          notes?: string | null
          rating?: number | null
          status?: string
          title: string
          updated_at?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          category?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          memory_note?: string | null
          notes?: string | null
          rating?: number | null
          status?: string
          title?: string
          updated_at?: string | null
          url?: string | null
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
