import { createClient } from "@supabase/supabase-js"

// Usar las variables de entorno proporcionadas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Verificar que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Faltan variables de entorno de Supabase. Verifica tu configuración.")
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos de GoWork
export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  user_type: "freelancer" | "client" | "both"
  location?: string
  avatar_url?: string
  verified: boolean
  rating: number
  total_reviews: number
  skills?: string[]
  bio?: string
  hourly_rate?: number
  availability?: "available" | "busy" | "unavailable"
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  client_id: string
  title: string
  description: string
  category: string
  budget_type: "fixed" | "hourly"
  budget_min?: number
  budget_max?: number
  deadline?: string
  status: "open" | "in_progress" | "completed" | "cancelled"
  required_skills: string[]
  location?: string
  remote_allowed: boolean
  proposals_count: number
  created_at: string
  updated_at: string
}

export interface Proposal {
  id: string
  project_id: string
  freelancer_id: string
  message: string
  proposed_price: number
  estimated_duration: string
  status: "pending" | "accepted" | "rejected"
  created_at: string
}

export interface Conversation {
  id: string
  project_id?: string
  participants: string[]
  last_message?: string
  last_message_at?: string
  status: "active" | "archived"
  created_at: string
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

export interface Notification {
  id: string
  user_id: string
  type: "message" | "proposal" | "review" | "system"
  title: string
  content: string
  read: boolean
  action_url?: string
  created_at: string
}

export interface Review {
  id: string
  reviewer_id: string
  reviewee_id: string
  project_id?: string
  rating: number
  comment?: string
  created_at: string
}
