import { supabase } from "./supabase"
import type { Project, FreelancerProfile } from "./supabase"

// ==================== PROYECTOS ====================
export const projectsAPI = {
  // Crear nuevo proyecto
  async create(projectData: Omit<Project, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("projects").insert([projectData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener todos los proyectos
  async getAll(filters?: { category?: string; status?: string; remote_allowed?: boolean }) {
    let query = supabase
      .from("projects")
      .select(`
        *,
        client:users!projects_client_id_fkey(full_name, avatar_url, rating)
      `)
      .order("created_at", { ascending: false })

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }
    if (filters?.status) {
      query = query.eq("status", filters.status)
    }
    if (filters?.remote_allowed !== undefined) {
      query = query.eq("remote_allowed", filters.remote_allowed)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Obtener proyecto por ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        client:users!projects_client_id_fkey(full_name, avatar_url, rating, location),
        proposals:proposals(
          *,
          freelancer:users!proposals_freelancer_id_fkey(full_name, avatar_url, rating)
        )
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  // Obtener proyectos del cliente
  async getByClientId(clientId: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Actualizar proyecto
  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  // Eliminar proyecto
  async delete(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error
  },
}

// ==================== PROPUESTAS ====================
export const proposalsAPI = {
  // Crear propuesta
  async create(proposalData: {
    project_id: string
    freelancer_id: string
    cover_letter: string
    proposed_rate: number
    estimated_duration: string
  }) {
    const { data, error } = await supabase.from("proposals").insert([proposalData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener propuestas por proyecto
  async getByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from("proposals")
      .select(`
        *,
        freelancer:users!proposals_freelancer_id_fkey(
          full_name, 
          avatar_url, 
          rating,
          freelancer_profiles(title, skills, experience_years)
        )
      `)
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Obtener propuestas del freelancer
  async getByFreelancerId(freelancerId: string) {
    const { data, error } = await supabase
      .from("proposals")
      .select(`
        *,
        project:projects(title, description, budget_min, budget_max, status)
      `)
      .eq("freelancer_id", freelancerId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Actualizar estado de propuesta
  async updateStatus(id: string, status: "pending" | "accepted" | "rejected" | "withdrawn") {
    const { data, error } = await supabase.from("proposals").update({ status }).eq("id", id).select().single()

    if (error) throw error
    return data
  },
}

// ==================== CONVERSACIONES ====================
export const conversationsAPI = {
  // Crear conversación
  async create(conversationData: {
    project_id: string
    client_id: string
    freelancer_id: string
  }) {
    // Verificar si ya existe una conversación
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("project_id", conversationData.project_id)
      .eq("client_id", conversationData.client_id)
      .eq("freelancer_id", conversationData.freelancer_id)
      .single()

    if (existing) {
      return existing
    }

    const { data, error } = await supabase.from("conversations").insert([conversationData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener conversaciones del usuario
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        project:projects(title, status),
        client:users!conversations_client_id_fkey(full_name, avatar_url),
        freelancer:users!conversations_freelancer_id_fkey(full_name, avatar_url),
        messages(content, created_at, sender_id, read_at)
      `)
      .or(`client_id.eq.${userId},freelancer_id.eq.${userId}`)
      .eq("status", "active")
      .order("updated_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Obtener conversación por ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        project:projects(title, description, status),
        client:users!conversations_client_id_fkey(full_name, avatar_url, user_type),
        freelancer:users!conversations_freelancer_id_fkey(full_name, avatar_url, user_type)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },
}

// ==================== MENSAJES ====================
export const messagesAPI = {
  // Enviar mensaje
  async send(messageData: {
    conversation_id: string
    sender_id: string
    content: string
    message_type?: "text" | "image" | "file" | "system"
  }) {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ ...messageData, message_type: messageData.message_type || "text" }])
      .select()
      .single()

    if (error) throw error

    // Actualizar timestamp de la conversación
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", messageData.conversation_id)

    return data
  },

  // Obtener mensajes de una conversación
  async getByConversationId(conversationId: string) {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:users!messages_sender_id_fkey(full_name, avatar_url)
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return data
  },

  // Marcar mensajes como leídos
  async markAsRead(conversationId: string, userId: string) {
    const { error } = await supabase
      .from("messages")
      .update({ read_at: new Date().toISOString() })
      .eq("conversation_id", conversationId)
      .neq("sender_id", userId)
      .is("read_at", null)

    if (error) throw error
  },

  // Suscribirse a nuevos mensajes
  subscribeToMessages(conversationId: string, callback: (message: any) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        callback,
      )
      .subscribe()
  },
}

// ==================== FREELANCER PROFILES ====================
export const freelancerProfilesAPI = {
  // Crear perfil de freelancer
  async create(profileData: Omit<FreelancerProfile, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("freelancer_profiles").insert([profileData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener perfil por user_id
  async getByUserId(userId: string) {
    const { data, error } = await supabase.from("freelancer_profiles").select("*").eq("user_id", userId).single()

    if (error && error.code !== "PGRST116") throw error
    return data
  },

  // Actualizar perfil
  async update(userId: string, updates: Partial<FreelancerProfile>) {
    const { data, error } = await supabase
      .from("freelancer_profiles")
      .update(updates)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Buscar freelancers
  async search(filters: {
    skills?: string[]
    availability?: string
    min_rate?: number
    max_rate?: number
    location?: string
  }) {
    let query = supabase.from("freelancer_profiles").select(`
        *,
        user:users!freelancer_profiles_user_id_fkey(
          full_name, 
          avatar_url, 
          rating, 
          total_reviews, 
          location,
          verified
        )
      `)

    if (filters.skills && filters.skills.length > 0) {
      query = query.overlaps("skills", filters.skills)
    }
    if (filters.availability) {
      query = query.eq("availability", filters.availability)
    }
    if (filters.min_rate) {
      query = query.gte("hourly_rate", filters.min_rate)
    }
    if (filters.max_rate) {
      query = query.lte("hourly_rate", filters.max_rate)
    }

    const { data, error } = await query.order("created_at", { ascending: false })
    if (error) throw error
    return data
  },
}

// ==================== NOTIFICACIONES ====================
export const notificationsAPI = {
  // Crear notificación
  async create(notificationData: {
    user_id: string
    title: string
    message: string
    type: string
    action_url?: string
  }) {
    const { data, error } = await supabase.from("notifications").insert([notificationData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener notificaciones del usuario
  async getByUserId(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Marcar como leída
  async markAsRead(id: string) {
    const { data, error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Marcar todas como leídas
  async markAllAsRead(userId: string) {
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("user_id", userId)
      .is("read_at", null)

    if (error) throw error
  },
}
