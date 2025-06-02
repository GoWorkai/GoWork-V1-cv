import { supabase } from "./supabase"

export interface GowSession {
  id: string
  user_id: string
  role: "client" | "provider" | "admin"
  message: string
  response: string
  context: any
  action_suggested?: string
  timestamp: string
  module?: string
  confidence_score?: number
}

export interface GowAnalytics {
  total_interactions: number
  avg_confidence: number
  popular_queries: Array<{
    query: string
    count: number
  }>
  user_satisfaction: number
}

export class GowSessionManager {
  // Guardar interacción con Gow
  async saveInteraction(interaction: Omit<GowSession, "id" | "timestamp">): Promise<string> {
    try {
      const { data, error } = await supabase
        .from("gow_sessions")
        .insert([
          {
            ...interaction,
            timestamp: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error
      return data.id
    } catch (error) {
      console.error("Error saving Gow interaction:", error)
      throw error
    }
  }

  // Obtener historial de chat del usuario
  async getUserChatHistory(userId: string, limit = 10): Promise<GowSession[]> {
    try {
      const { data, error } = await supabase
        .from("gow_sessions")
        .select("*")
        .eq("user_id", userId)
        .order("timestamp", { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching chat history:", error)
      return []
    }
  }

  // Obtener contexto del usuario para personalización
  async getUserContext(userId: string): Promise<{
    recentQueries: string[]
    preferredCategories: string[]
    avgResponseTime: number
    satisfactionScore: number
  }> {
    try {
      const { data, error } = await supabase
        .from("gow_sessions")
        .select("message, context, confidence_score")
        .eq("user_id", userId)
        .order("timestamp", { ascending: false })
        .limit(20)

      if (error) throw error

      const sessions = data || []
      const recentQueries = sessions.slice(0, 5).map((s) => s.message)

      // Extraer categorías más consultadas
      const categories = sessions
        .map((s) => s.context?.categoria)
        .filter(Boolean)
        .reduce((acc: any, cat: string) => {
          acc[cat] = (acc[cat] || 0) + 1
          return acc
        }, {})

      const preferredCategories = Object.entries(categories)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 3)
        .map(([cat]) => cat)

      const avgConfidence = sessions.reduce((sum, s) => sum + (s.confidence_score || 0), 0) / sessions.length

      return {
        recentQueries,
        preferredCategories,
        avgResponseTime: 2.5, // Placeholder
        satisfactionScore: avgConfidence || 85,
      }
    } catch (error) {
      console.error("Error fetching user context:", error)
      return {
        recentQueries: [],
        preferredCategories: [],
        avgResponseTime: 3.0,
        satisfactionScore: 80,
      }
    }
  }

  // Analytics para administradores
  async getGowAnalytics(dateRange: { from: string; to: string }): Promise<GowAnalytics> {
    try {
      const { data, error } = await supabase
        .from("gow_sessions")
        .select("message, confidence_score")
        .gte("timestamp", dateRange.from)
        .lte("timestamp", dateRange.to)

      if (error) throw error

      const sessions = data || []
      const totalInteractions = sessions.length
      const avgConfidence = sessions.reduce((sum, s) => sum + (s.confidence_score || 0), 0) / totalInteractions

      // Queries más populares
      const queryCount = sessions.reduce((acc: any, s) => {
        const query = s.message.toLowerCase().slice(0, 50)
        acc[query] = (acc[query] || 0) + 1
        return acc
      }, {})

      const popularQueries = Object.entries(queryCount)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 10)
        .map(([query, count]) => ({ query, count: count as number }))

      return {
        total_interactions: totalInteractions,
        avg_confidence: avgConfidence || 0,
        popular_queries: popularQueries,
        user_satisfaction: avgConfidence || 0,
      }
    } catch (error) {
      console.error("Error fetching Gow analytics:", error)
      return {
        total_interactions: 0,
        avg_confidence: 0,
        popular_queries: [],
        user_satisfaction: 0,
      }
    }
  }

  // Limpiar sesiones antiguas (más de 30 días)
  async cleanOldSessions(): Promise<void> {
    try {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { error } = await supabase.from("gow_sessions").delete().lt("timestamp", thirtyDaysAgo.toISOString())

      if (error) throw error
    } catch (error) {
      console.error("Error cleaning old sessions:", error)
    }
  }
}

export const gowSessionManager = new GowSessionManager()
