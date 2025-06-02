import { type NextRequest, NextResponse } from "next/server"
import { geminiAI } from "@/lib/gemini-ai"
import { gowSessionManager } from "@/lib/gow-sessions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, role, message, context, module } = body

    // Validar datos requeridos
    if (!userId || !role || !message) {
      return NextResponse.json({ error: "Faltan datos requeridos: userId, role, message" }, { status: 400 })
    }

    // Obtener historial del usuario para contexto
    const chatHistory = await gowSessionManager.getUserChatHistory(userId, 5)
    const userContext = await gowSessionManager.getUserContext(userId)

    // Preparar contexto completo
    const fullContext = {
      userId,
      role,
      location: context?.location || "Santiago, Chile",
      currentPage: context?.currentPage || "dashboard",
      chatHistory: chatHistory.map((h) => ({
        role: h.role === "user" ? "user" : "assistant",
        message: h.role === "user" ? h.message : h.response,
      })),
      userProfile: context?.userProfile || {},
      ...userContext,
    }

    // Determinar tipo de consulta
    let response
    if (context?.type === "search") {
      // Análisis de búsqueda de servicios
      response = await geminiAI.analyzeServiceRequest(message, {
        role: role as "client" | "provider",
        location: context?.location,
        previousServices: userContext.preferredCategories,
      })
    } else if (module) {
      // Asistencia contextual por módulo
      response = await geminiAI.generateModuleAssistance(module as any, {
        role: role as "client" | "provider",
        location: context?.location,
        currentData: context?.currentData,
      })
    } else {
      // Conversación general con Gow
      response = await geminiAI.generateGowResponse(message, fullContext)
    }

    // Guardar la interacción
    await gowSessionManager.saveInteraction({
      user_id: userId,
      role: role as "client" | "provider" | "admin",
      message,
      response: JSON.stringify(response),
      context: fullContext,
      action_suggested: response.actions?.[0]?.id,
      module,
      confidence_score: response.confidence || 85,
    })

    return NextResponse.json({
      success: true,
      data: response,
      context: {
        sessionId: Date.now().toString(),
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error in Gow query:", error)

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        fallback: {
          text: "¡Hola! Soy Gow, pero estoy teniendo problemas técnicos. ¿Puedes intentar de nuevo en un momento?",
          confidence: 50,
          suggestions: ["¿Cómo optimizo mi perfil?", "¿Qué servicios puedo ofrecer?", "¿Cómo encuentro proyectos?"],
        },
      },
      { status: 500 },
    )
  }
}

// Endpoint para analytics (solo admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from") || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const to = searchParams.get("to") || new Date().toISOString()

    const analytics = await gowSessionManager.getGowAnalytics({ from, to })

    return NextResponse.json({
      success: true,
      data: analytics,
    })
  } catch (error) {
    console.error("Error fetching Gow analytics:", error)
    return NextResponse.json({ error: "Error al obtener analytics" }, { status: 500 })
  }
}
