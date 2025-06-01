import { supabase } from "./supabase"

// ==================== TIPOS ====================
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  read_at?: string
  action_url?: string
  metadata?: any
  expires_at?: string
  created_at: string
}

export interface NotificationSettings {
  id: string
  user_id: string
  email_enabled: boolean
  push_enabled: boolean
  sms_enabled: boolean
  categories: {
    payments: boolean
    projects: boolean
    messages: boolean
    system: boolean
  }
  quiet_hours_start?: string
  quiet_hours_end?: string
  timezone: string
  created_at: string
  updated_at: string
}

export interface NotificationTemplate {
  id: string
  name: string
  category: string
  title_template: string
  message_template: string
  action_url_template?: string
  priority: string
  enabled: boolean
  created_at: string
}

// ==================== API DE NOTIFICACIONES ====================
export const notificationsAPI = {
  // Crear notificación desde plantilla
  async createFromTemplate(templateName: string, userId: string, variables: Record<string, any>, metadata?: any) {
    // Obtener plantilla
    const { data: template, error: templateError } = await supabase
      .from("notification_templates")
      .select("*")
      .eq("name", templateName)
      .eq("enabled", true)
      .single()

    if (templateError) throw templateError

    // Reemplazar variables en plantilla
    let title = template.title_template
    let message = template.message_template
    let actionUrl = template.action_url_template

    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      title = title.replace(new RegExp(placeholder, "g"), String(value))
      message = message.replace(new RegExp(placeholder, "g"), String(value))
      if (actionUrl) {
        actionUrl = actionUrl.replace(new RegExp(placeholder, "g"), String(value))
      }
    })

    const notificationData = {
      user_id: userId,
      title,
      message,
      type: templateName,
      category: template.category,
      priority: template.priority,
      action_url: actionUrl,
      metadata,
    }

    const { data, error } = await supabase.from("notifications").insert([notificationData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener notificaciones del usuario
  async getByUserId(userId: string, limit = 50, unreadOnly = false) {
    let query = supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (unreadOnly) {
      query = query.is("read_at", null)
    }

    const { data, error } = await query
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

  // Obtener configuraciones del usuario
  async getSettings(userId: string) {
    const { data, error } = await supabase.from("notification_settings").select("*").eq("user_id", userId).single()

    if (error && error.code !== "PGRST116") throw error
    return data
  },

  // Actualizar configuraciones
  async updateSettings(userId: string, settings: Partial<NotificationSettings>) {
    const { data, error } = await supabase
      .from("notification_settings")
      .update(settings)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Suscribirse a notificaciones en tiempo real
  subscribeToNotifications(userId: string, callback: (notification: any) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe()
  },

  // Obtener estadísticas de notificaciones
  async getStats(userId: string) {
    const { data: total, error: totalError } = await supabase
      .from("notifications")
      .select("id", { count: "exact" })
      .eq("user_id", userId)

    const { data: unread, error: unreadError } = await supabase
      .from("notifications")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .is("read_at", null)

    if (totalError || unreadError) throw totalError || unreadError

    return {
      total: total?.length || 0,
      unread: unread?.length || 0,
      read: (total?.length || 0) - (unread?.length || 0),
    }
  },
}

// ==================== EVENTOS DE NOTIFICACIÓN ====================
export const notificationEvents = {
  // Pago recibido
  async paymentReceived(userId: string, amount: number, projectTitle: string) {
    return notificationsAPI.createFromTemplate("payment_received", userId, {
      amount: new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount),
      project_title: projectTitle,
    })
  },

  // Pago enviado
  async paymentSent(userId: string, amount: number) {
    return notificationsAPI.createFromTemplate("payment_sent", userId, {
      amount: new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount),
    })
  },

  // Fondos liberados del escrow
  async escrowReleased(userId: string, amount: number) {
    return notificationsAPI.createFromTemplate("escrow_released", userId, {
      amount: new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount),
    })
  },

  // Nueva propuesta recibida
  async newProposal(userId: string, freelancerName: string, projectTitle: string, projectId: string) {
    return notificationsAPI.createFromTemplate("new_proposal", userId, {
      freelancer_name: freelancerName,
      project_title: projectTitle,
      project_id: projectId,
    })
  },

  // Propuesta aceptada
  async proposalAccepted(userId: string, projectTitle: string, projectId: string) {
    return notificationsAPI.createFromTemplate("proposal_accepted", userId, {
      project_title: projectTitle,
      project_id: projectId,
    })
  },

  // Nuevo mensaje
  async newMessage(userId: string, senderName: string) {
    return notificationsAPI.createFromTemplate("new_message", userId, {
      sender_name: senderName,
    })
  },

  // Contrato creado
  async contractCreated(userId: string, projectTitle: string) {
    return notificationsAPI.createFromTemplate("contract_created", userId, {
      project_title: projectTitle,
    })
  },

  // Perfil verificado
  async profileVerified(userId: string) {
    return notificationsAPI.createFromTemplate("profile_verified", userId, {})
  },
}
