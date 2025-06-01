import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de datos
export interface User {
  id: string
  email: string
  full_name: string
  user_type: "freelancer" | "client"
  phone?: string
  location?: string
  avatar_url?: string
  verified: boolean
  rating: number
  total_reviews: number
  created_at: string
  updated_at: string
}

export interface FreelancerProfile {
  id: string
  user_id: string
  title?: string
  description?: string
  hourly_rate?: number
  skills: string[]
  experience_years?: number
  portfolio_url?: string
  availability: "available" | "busy" | "unavailable"
  languages: string[]
  education?: string
  certifications: string[]
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  client_id: string
  title: string
  description: string
  category?: string
  budget_min?: number
  budget_max?: number
  deadline?: string
  status: "open" | "in_progress" | "completed" | "cancelled"
  required_skills: string[]
  location?: string
  remote_allowed: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  message_type: "text" | "image" | "file" | "system"
  read_at?: string
  created_at: string
}

export interface Conversation {
  id: string
  project_id: string
  client_id: string
  freelancer_id: string
  status: "active" | "archived"
  created_at: string
  updated_at: string
}
