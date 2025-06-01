import { supabase } from "./supabase"

// Funciones de utilidad para trabajar con la base de datos existente de GoWork
export class GoWorkDatabase {
  // Usuarios
  static async createUser(userData: {
    email: string
    full_name: string
    phone?: string
    user_type?: "freelancer" | "client" | "both"
    location?: string
  }) {
    const { data, error } = await supabase.from("users").insert(userData).select().single()
    if (error) throw error
    return data
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()
    if (error) throw error
    return data
  }

  static async updateUserProfile(id: string, updates: any) {
    const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single()
    if (error) throw error
    return data
  }

  // Proyectos
  static async getOpenProjects(filters?: {
    category?: string
    location?: string
    budget_min?: number
    budget_max?: number
  }) {
    let query = supabase.from("projects").select("*, users(full_name, avatar_url)").eq("status", "open")

    if (filters?.category) query = query.eq("category", filters.category)
    if (filters?.location) query = query.ilike("location", `%${filters.location}%`)
    if (filters?.budget_min) query = query.gte("budget_min", filters.budget_min)
    if (filters?.budget_max) query = query.lte("budget_max", filters.budget_max)

    const { data, error } = await query.order("created_at", { ascending: false })
    if (error) throw error
    return data
  }

  static async createProject(projectData: {
    client_id: string
    title: string
    description: string
    category: string
    budget_type: "fixed" | "hourly"
    budget_min?: number
    budget_max?: number
    deadline?: string
    required_skills: string[]
    location?: string
    remote_allowed: boolean
  }) {
    const { data, error } = await supabase.from("projects").insert(projectData).select().single()
    if (error) throw error
    return data
  }

  // Propuestas
  static async createProposal(proposalData: {
    project_id: string
    freelancer_id: string
    message: string
    proposed_price: number
    estimated_duration: string
  }) {
    const { data, error } = await supabase.from("proposals").insert(proposalData).select().single()
    if (error) throw error

    // Incrementar contador de propuestas en el proyecto
    await supabase.rpc("increment_proposals_count", { project_id: proposalData.project_id })

    return data
  }

  static async getProjectProposals(projectId: string) {
    const { data, error } = await supabase
      .from("proposals")
      .select("*, users(full_name, avatar_url, rating)")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Conversaciones y mensajes
  static async createConversation(participants: string[], projectId?: string) {
    const { data, error } = await supabase
      .from("conversations")
      .insert({
        participants,
        project_id: projectId,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async sendMessage(conversationId: string, senderId: string, content: string) {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
      })
      .select()
      .single()

    if (error) throw error

    // Actualizar última actividad de la conversación
    await supabase
      .from("conversations")
      .update({
        last_message: content,
        last_message_at: new Date().toISOString(),
      })
      .eq("id", conversationId)

    return data
  }

  static async getUserConversations(userId: string) {
    const { data, error } = await supabase
      .from("conversations")
      .select("*, messages(content, created_at)")
      .contains("participants", [userId])
      .order("last_message_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Notificaciones
  static async createNotification(notificationData: {
    user_id: string
    type: "message" | "proposal" | "review" | "system"
    title: string
    content: string
    action_url?: string
  }) {
    const { data, error } = await supabase.from("notifications").insert(notificationData).select().single()
    if (error) throw error
    return data
  }

  static async getUserNotifications(userId: string, unreadOnly = false) {
    let query = supabase.from("notifications").select("*").eq("user_id", userId)

    if (unreadOnly) query = query.eq("read", false)

    const { data, error } = await query.order("created_at", { ascending: false }).limit(50)
    if (error) throw error
    return data
  }

  static async markNotificationAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Reseñas
  static async createReview(reviewData: {
    reviewer_id: string
    reviewee_id: string
    project_id?: string
    rating: number
    comment?: string
  }) {
    const { data, error } = await supabase.from("reviews").insert(reviewData).select().single()
    if (error) throw error

    // Actualizar rating promedio del usuario
    await this.updateUserRating(reviewData.reviewee_id)

    return data
  }

  static async getUserReviews(userId: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, reviewer:users!reviewer_id(full_name, avatar_url)")
      .eq("reviewee_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Funciones auxiliares
  static async updateUserRating(userId: string) {
    const { data: reviews } = await supabase.from("reviews").select("rating").eq("reviewee_id", userId)

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      const totalReviews = reviews.length

      await supabase
        .from("users")
        .update({
          rating: Math.round(avgRating * 100) / 100,
          total_reviews: totalReviews,
        })
        .eq("id", userId)
    }
  }

  // Búsqueda inteligente
  static async searchProjects(query: string, filters?: any) {
    let dbQuery = supabase
      .from("projects")
      .select("*, users(full_name, avatar_url)")
      .eq("status", "open")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)

    if (filters?.category) dbQuery = dbQuery.eq("category", filters.category)
    if (filters?.location) dbQuery = dbQuery.ilike("location", `%${filters.location}%`)

    const { data, error } = await dbQuery.order("created_at", { ascending: false })
    if (error) throw error
    return data
  }

  // Estadísticas del usuario
  static async getUserStats(userId: string) {
    const [projectsData, proposalsData, reviewsData] = await Promise.all([
      supabase.from("projects").select("id").eq("client_id", userId),
      supabase.from("proposals").select("id").eq("freelancer_id", userId),
      supabase.from("reviews").select("rating").eq("reviewee_id", userId),
    ])

    return {
      total_projects: projectsData.data?.length || 0,
      total_proposals: proposalsData.data?.length || 0,
      total_reviews: reviewsData.data?.length || 0,
      average_rating:
        reviewsData.data && reviewsData.data.length > 0
          ? reviewsData.data.reduce((sum, r) => sum + r.rating, 0) / reviewsData.data.length
          : 0,
    }
  }
}

// Función para verificar la conexión
export async function testGoWorkConnection() {
  try {
    const { data, error } = await supabase.from("users").select("count").limit(1)
    if (error) throw error
    console.log("✅ Conexión a GoWork Supabase exitosa")
    return true
  } catch (error) {
    console.error("❌ Error de conexión:", error)
    return false
  }
}
