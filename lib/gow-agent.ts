import { GoogleGenerativeAI } from "@google/generative-ai"
import { supabase } from "./supabase"

const genAI = new GoogleGenerativeAI("AIzaSyDBRyQ0TwOBhqjN5sFv0f3jSHp322jlNs4")

export interface GowResponse {
  text: string
  confidence: number
  suggestions?: string[]
  actions?: Array<{
    id: string
    label: string
    type: "link" | "action" | "template"
    url?: string
    template?: string
  }>
  profileOptimizations?: Array<{
    field: string
    suggestion: string
    priority: "high" | "medium" | "low"
  }>
  proposalTemplate?: string
  recommendations?: Array<{
    id: string
    title: string
    type: "project" | "freelancer"
    match: number
    reason: string
  }>
}

export interface UserContext {
  userType: "client" | "freelancer" | "both" | "new"
  userId?: string
  currentPage: string
  profileCompleteness?: number
  skills?: string[]
  experience?: string
  location?: string
  previousInteractions?: string[]
  currentProject?: {
    title: string
    category: string
    budget: string
    description: string
  }
}

export class GowAgent {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  private agentName = "Gow"

  async processUserInteraction(userMessage: string, context: UserContext): Promise<GowResponse> {
    try {
      // Enriquecer el contexto con datos reales si hay un userId
      if (context.userId) {
        await this.enrichContextWithUserData(context)
      }

      const systemPrompt = this.buildSystemPrompt(context)
      const fullPrompt = `${systemPrompt}\n\nUsuario: ${userMessage}`

      const result = await this.model.generateContent(fullPrompt)
      const response = await result.response
      const text = response.text()

      // Procesar respuesta según el tipo de interacción
      const interactionType = this.detectInteractionType(userMessage, context)

      // Guardar la interacción en la base de datos si hay un userId
      if (context.userId) {
        await this.saveInteraction(context.userId, userMessage, text, interactionType)
      }

      return {
        text: text.trim(),
        confidence: this.calculateConfidence(text, userMessage, context),
        suggestions: await this.generateContextualSuggestions(userMessage, context, interactionType),
        actions: await this.generateSmartActions(userMessage, context, interactionType),
        profileOptimizations:
          interactionType === "profile" ? await this.generateProfileOptimizations(context) : undefined,
        proposalTemplate:
          interactionType === "proposal" ? await this.generateProposalTemplate(userMessage, context) : undefined,
        recommendations:
          interactionType === "recommendations" ? await this.generateRecommendations(context) : undefined,
      }
    } catch (error) {
      console.error("Error with Gow Agent:", error)
      return this.getFallbackResponse(userMessage, context)
    }
  }

  private async enrichContextWithUserData(context: UserContext) {
    try {
      // Obtener datos del usuario
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", context.userId)
        .single()

      if (userError) throw userError

      // Actualizar el contexto con datos reales
      context.userType = userData.user_type || context.userType
      context.location = userData.location || context.location
      context.skills = userData.skills || []

      // Calcular completitud del perfil
      const requiredFields = ["full_name", "email", "phone", "location", "bio", "skills"]
      const completedFields = requiredFields.filter((field) => userData[field] && userData[field].length > 0)
      context.profileCompleteness = Math.round((completedFields.length / requiredFields.length) * 100)

      // Obtener interacciones previas
      const { data: interactions } = await supabase
        .from("ai_interactions")
        .select("user_message, ai_response")
        .eq("user_id", context.userId)
        .order("created_at", { ascending: false })
        .limit(5)

      if (interactions && interactions.length > 0) {
        context.previousInteractions = interactions.map((i) => `Usuario: ${i.user_message}\nGow: ${i.ai_response}`)
      }

      // Si el usuario es cliente, obtener su proyecto actual
      if (context.userType === "client") {
        const { data: projectData } = await supabase
          .from("projects")
          .select("*")
          .eq("client_id", context.userId)
          .eq("status", "open")
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (projectData) {
          context.currentProject = {
            title: projectData.title,
            category: projectData.category,
            budget: `${projectData.budget_min || 0} - ${projectData.budget_max || "sin límite"}`,
            description: projectData.description,
          }
        }
      }
    } catch (error) {
      console.error("Error enriching context:", error)
    }
  }

  private async saveInteraction(userId: string, userMessage: string, aiResponse: string, interactionType: string) {
    try {
      await supabase.from("ai_interactions").insert({
        user_id: userId,
        user_message: userMessage,
        ai_response: aiResponse,
        interaction_type: interactionType,
      })
    } catch (error) {
      console.error("Error saving interaction:", error)
    }
  }

  private buildSystemPrompt(context: UserContext): string {
    return `
IDENTIDAD DEL AGENTE:
Nombre: Gow
Rol: Asistente virtual especializado de GoWork
Personalidad: Profesional, empático, proactivo y orientado a soluciones

MISIÓN:
Facilitar la interacción entre freelancers y clientes en GoWork, optimizando perfiles, asistiendo en propuestas y proporcionando recomendaciones inteligentes.

CONTEXTO DEL USUARIO:
- Tipo: ${context.userType}
- Página actual: ${context.currentPage}
- Completitud del perfil: ${context.profileCompleteness || 0}%
- Habilidades: ${context.skills?.join(", ") || "No especificadas"}
- Experiencia: ${context.experience || "No especificada"}
- Ubicación: ${context.location || "No especificada"}
${
  context.currentProject
    ? `- Proyecto actual: ${context.currentProject.title} (${context.currentProject.category})`
    : ""
}

INTERACCIONES PREVIAS:
${context.previousInteractions?.join("\n\n") || "No hay interacciones previas"}

OBJETIVOS PRINCIPALES:
1. Guiar en la creación y optimización de perfiles profesionales
2. Asistir en la redacción de propuestas personalizadas
3. Recomendar proyectos o freelancers basándose en habilidades
4. Proporcionar soporte sobre el uso de la plataforma

FUNCIONALIDADES CLAVE:
- Optimización de Perfiles: Analizar y sugerir mejoras específicas
- Asistencia en Propuestas: Plantillas y consejos personalizados
- Recomendaciones Inteligentes: Proyectos/freelancers alineados con preferencias
- Soporte Continuo: Respuestas a consultas y navegación

TONO Y ESTILO:
- Lenguaje claro, directo y profesional
- Actitud amigable y accesible
- Adaptar detalle según conocimiento del usuario
- Usar emojis apropiados para humanizar la interacción

INSTRUCCIONES ESPECÍFICAS:
1. Siempre identifícate como "Gow" al inicio de conversaciones nuevas
2. Personaliza respuestas según el contexto del usuario
3. Ofrece acciones concretas y específicas
4. Mantén respuestas concisas pero completas (máximo 200 palabras)
5. Prioriza soluciones prácticas sobre explicaciones teóricas

RESPUESTAS SEGÚN TIPO DE USUARIO:

NUEVO USUARIO:
"¡Hola! Soy Gow, tu asistente personal en GoWork 👋 Estoy aquí para ayudarte a crear un perfil que destaque tus habilidades únicas. ¿Te gustaría comenzar ahora?"

FREELANCER BUSCANDO PROYECTOS:
"He analizado tu perfil y encontré algunos proyectos que coinciden perfectamente con tus habilidades en [área]. ¿Te gustaría revisarlos?"

CLIENTE BUSCANDO FREELANCERS:
"Basándome en tu proyecto de [categoría], he identificado freelancers especializados que podrían ser ideales. ¿Quieres ver mis recomendaciones?"

USUARIO REDACTANDO PROPUESTA:
"Aquí tienes una plantilla personalizada para tu propuesta. Recuerda resaltar cómo tu experiencia específica se alinea con los requisitos del proyecto."

Responde al siguiente mensaje considerando todo el contexto:
`
  }

  private detectInteractionType(userMessage: string, context: UserContext): string {
    const lowerMessage = userMessage.toLowerCase()

    if (
      lowerMessage.includes("perfil") ||
      lowerMessage.includes("optimizar") ||
      lowerMessage.includes("mejorar perfil")
    ) {
      return "profile"
    }
    if (lowerMessage.includes("propuesta") || lowerMessage.includes("plantilla") || lowerMessage.includes("redactar")) {
      return "proposal"
    }
    if (
      lowerMessage.includes("proyecto") ||
      lowerMessage.includes("freelancer") ||
      lowerMessage.includes("recomendar")
    ) {
      return "recommendations"
    }
    if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("presupuesto")) {
      return "pricing"
    }
    if (lowerMessage.includes("ayuda") || lowerMessage.includes("como") || lowerMessage.includes("cómo")) {
      return "support"
    }

    return "general"
  }

  private async generateContextualSuggestions(
    userMessage: string,
    context: UserContext,
    interactionType: string,
  ): Promise<string[]> {
    const suggestions = []

    // Si tenemos un userId, intentar obtener sugerencias personalizadas de la base de datos
    if (context.userId) {
      try {
        const { data } = await supabase
          .rpc("get_personalized_suggestions", {
            user_id: context.userId,
            interaction_type: interactionType,
          })
          .limit(3)

        if (data && data.length > 0) {
          return data.map((item: any) => item.suggestion)
        }
      } catch (error) {
        console.error("Error getting personalized suggestions:", error)
      }
    }

    // Sugerencias predeterminadas si no hay personalizadas
    switch (interactionType) {
      case "profile":
        suggestions.push(
          "¿Quieres que analice tu perfil actual?",
          "¿Te ayudo a destacar tus mejores habilidades?",
          "¿Necesitas consejos para tu descripción profesional?",
        )
        break
      case "proposal":
        suggestions.push(
          "¿Para qué tipo de proyecto es la propuesta?",
          "¿Quieres una plantilla personalizada?",
          "¿Te ayudo con el presupuesto y timeline?",
        )
        break
      case "recommendations":
        if (context.userType === "freelancer") {
          suggestions.push(
            "¿Qué tipo de proyectos te interesan más?",
            "¿Prefieres proyectos locales o remotos?",
            "¿Cuál es tu rango de presupuesto ideal?",
          )
        } else {
          suggestions.push(
            "¿Qué habilidades específicas necesitas?",
            "¿Cuál es tu presupuesto para el proyecto?",
            "¿Tienes preferencia de ubicación?",
          )
        }
        break
      case "pricing":
        suggestions.push(
          "¿Para qué tipo de servicio necesitas precios?",
          "¿Quieres comparar diferentes opciones?",
          "¿Te ayudo a calcular un presupuesto realista?",
        )
        break
      default:
        suggestions.push(
          "¿En qué puedo ayudarte específicamente?",
          "¿Quieres optimizar tu perfil?",
          "¿Necesitas encontrar proyectos o freelancers?",
        )
    }

    return suggestions.slice(0, 3)
  }

  private async generateSmartActions(
    userMessage: string,
    context: UserContext,
    interactionType: string,
  ): Promise<
    Array<{
      id: string
      label: string
      type: "link" | "action" | "template"
      url?: string
      template?: string
    }>
  > {
    const actions = []

    // Si tenemos un userId, intentar obtener acciones personalizadas
    if (context.userId) {
      try {
        const { data } = await supabase
          .rpc("get_personalized_actions", {
            user_id: context.userId,
            interaction_type: interactionType,
          })
          .limit(3)

        if (data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.action_id,
            label: item.label,
            type: item.action_type,
            url: item.url,
            template: item.template,
          }))
        }
      } catch (error) {
        console.error("Error getting personalized actions:", error)
      }
    }

    // Acciones predeterminadas si no hay personalizadas
    switch (interactionType) {
      case "profile":
        actions.push(
          { id: "optimize-profile", label: "🚀 Optimizar mi perfil", type: "action" },
          { id: "profile-tips", label: "💡 Ver consejos de perfil", type: "link", url: "/onboarding" },
          { id: "examples", label: "👀 Ver ejemplos exitosos", type: "action" },
        )
        break
      case "proposal":
        actions.push(
          { id: "proposal-template", label: "📝 Generar plantilla", type: "template" },
          { id: "proposal-tips", label: "💡 Consejos para propuestas", type: "action" },
          { id: "pricing-guide", label: "💰 Guía de precios", type: "link", url: "/ai-dashboard" },
        )
        break
      case "recommendations":
        actions.push(
          { id: "find-projects", label: "🔍 Buscar proyectos", type: "link", url: "/servicios" },
          { id: "find-freelancers", label: "👥 Buscar freelancers", type: "link", url: "/map" },
          { id: "ai-matching", label: "🤖 Matching con IA", type: "link", url: "/ai-dashboard" },
        )
        break
      case "pricing":
        actions.push(
          { id: "price-calculator", label: "🧮 Calculadora de precios", type: "link", url: "/ai-dashboard" },
          { id: "market-rates", label: "📊 Tarifas del mercado", type: "action" },
          { id: "budget-planner", label: "📋 Planificador de presupuesto", type: "action" },
        )
        break
      default:
        actions.push(
          { id: "explore-services", label: "🌟 Explorar servicios", type: "link", url: "/servicios" },
          { id: "ai-center", label: "🧠 Centro de IA", type: "link", url: "/ai-dashboard" },
          { id: "help-center", label: "❓ Centro de ayuda", type: "action" },
        )
    }

    return actions.slice(0, 3)
  }

  private async generateProfileOptimizations(context: UserContext): Promise<
    Array<{
      field: string
      suggestion: string
      priority: "high" | "medium" | "low"
    }>
  > {
    // Si tenemos un userId, obtener optimizaciones reales basadas en el perfil
    if (context.userId) {
      try {
        const { data: userData } = await supabase.from("users").select("*").eq("id", context.userId).single()

        if (userData) {
          const optimizations = []

          if (!userData.skills || userData.skills.length < 3) {
            optimizations.push({
              field: "Habilidades",
              suggestion: "Agrega al menos 5 habilidades específicas para aumentar tu visibilidad en búsquedas",
              priority: "high" as const,
            })
          }

          if (!userData.bio || userData.bio.length < 100) {
            optimizations.push({
              field: "Descripción profesional",
              suggestion: "Expande tu descripción con ejemplos específicos de proyectos exitosos",
              priority: "high" as const,
            })
          }

          if (!userData.avatar_url) {
            optimizations.push({
              field: "Foto de perfil",
              suggestion: "Añade una foto profesional para generar más confianza con los clientes",
              priority: "high" as const,
            })
          }

          if (!userData.hourly_rate && context.userType === "freelancer") {
            optimizations.push({
              field: "Tarifa por hora",
              suggestion: "Establece tu tarifa por hora para atraer proyectos adecuados a tu nivel",
              priority: "medium" as const,
            })
          }

          return optimizations
        }
      } catch (error) {
        console.error("Error generating profile optimizations:", error)
      }
    }

    // Optimizaciones predeterminadas si no hay datos reales
    const optimizations = []

    if (!context.skills || context.skills.length < 3) {
      optimizations.push({
        field: "Habilidades",
        suggestion: "Agrega al menos 5 habilidades específicas para aumentar tu visibilidad en búsquedas",
        priority: "high" as const,
      })
    }

    if (!context.experience || context.experience.length < 50) {
      optimizations.push({
        field: "Descripción profesional",
        suggestion: "Expande tu descripción con ejemplos específicos de proyectos exitosos",
        priority: "high" as const,
      })
    }

    if (context.profileCompleteness && context.profileCompleteness < 80) {
      optimizations.push({
        field: "Completitud del perfil",
        suggestion: "Completa tu portafolio con al menos 3 proyectos destacados",
        priority: "medium" as const,
      })
    }

    optimizations.push({
      field: "Foto de perfil",
      suggestion: "Usa una foto profesional para generar más confianza con los clientes",
      priority: "medium" as const,
    })

    return optimizations.slice(0, 4)
  }

  private async generateProposalTemplate(userMessage: string, context: UserContext): Promise<string> {
    // Si tenemos datos reales del proyecto, personalizar la plantilla
    if (context.userId && context.currentProject) {
      const templatePrompt = `
Genera una plantilla de propuesta profesional para GoWork basada en:
- Tipo de usuario: ${context.userType}
- Habilidades: ${context.skills?.join(", ") || "generales"}
- Proyecto actual: ${context.currentProject.title} (${context.currentProject.category})
- Descripción del proyecto: ${context.currentProject.description}
- Presupuesto: ${context.currentProject.budget}
- Mensaje del usuario: ${userMessage}

La plantilla debe incluir:
1. Saludo personalizado
2. Comprensión del proyecto
3. Propuesta de solución
4. Experiencia relevante
5. Timeline y entregables
6. Presupuesto (placeholder)
7. Llamada a la acción

Formato: Texto directo, sin markdown, máximo 300 palabras.
`

      try {
        const result = await this.model.generateContent(templatePrompt)
        const response = await result.response
        return response.text().trim()
      } catch (error) {
        console.error("Error generating proposal template:", error)
      }
    }

    // Plantilla genérica si no hay datos reales
    const templatePrompt = `
Genera una plantilla de propuesta profesional para GoWork basada en:
- Tipo de usuario: ${context.userType}
- Habilidades: ${context.skills?.join(", ") || "generales"}
- Mensaje del usuario: ${userMessage}

La plantilla debe incluir:
1. Saludo personalizado
2. Comprensión del proyecto
3. Propuesta de solución
4. Experiencia relevante
5. Timeline y entregables
6. Presupuesto (placeholder)
7. Llamada a la acción

Formato: Texto directo, sin markdown, máximo 300 palabras.
`

    try {
      const result = await this.model.generateContent(templatePrompt)
      const response = await result.response
      return response.text().trim()
    } catch (error) {
      return `
Hola [Nombre del Cliente],

He revisado tu proyecto de [Tipo de Proyecto] y me parece muy interesante. Con mi experiencia en ${context.skills?.join(", ") || "desarrollo de proyectos"}, puedo ayudarte a lograr exactamente lo que necesitas.

Mi propuesta incluye:
• Análisis detallado de tus requerimientos
• Desarrollo/implementación usando las mejores prácticas
• Revisiones y ajustes según tu feedback
• Entrega completa con documentación

Timeline estimado: [X semanas]
Presupuesto: $[Monto] CLP

¿Te gustaría que conversemos más detalles? Estoy disponible para una llamada cuando te convenga.

Saludos,
[Tu nombre]
`
    }
  }

  private async generateRecommendations(context: UserContext): Promise<
    Array<{
      id: string
      title: string
      type: "project" | "freelancer"
      match: number
      reason: string
    }>
  > {
    // Si tenemos un userId, obtener recomendaciones reales de la base de datos
    if (context.userId) {
      try {
        if (context.userType === "freelancer") {
          // Proyectos recomendados para freelancers basados en habilidades
          const { data: projects } = await supabase.rpc("get_matching_projects", {
            freelancer_id: context.userId,
            limit_count: 3,
          })

          if (projects && projects.length > 0) {
            return projects.map((project: any) => ({
              id: project.id,
              title: project.title,
              type: "project" as const,
              match: project.match_score,
              reason: project.match_reason || "Coincide con tus habilidades y preferencias",
            }))
          }
        } else if (context.userType === "client" && context.currentProject) {
          // Freelancers recomendados para clientes basados en el proyecto actual
          const { data: freelancers } = await supabase.rpc("get_matching_freelancers", {
            project_id: context.currentProject.id,
            limit_count: 3,
          })

          if (freelancers && freelancers.length > 0) {
            return freelancers.map((freelancer: any) => ({
              id: freelancer.id,
              title: `${freelancer.full_name} - ${freelancer.primary_skill || "Profesional"}`,
              type: "freelancer" as const,
              match: freelancer.match_score,
              reason: freelancer.match_reason || "Especialista con experiencia en proyectos similares",
            }))
          }
        }
      } catch (error) {
        console.error("Error generating recommendations:", error)
      }
    }

    // Recomendaciones predeterminadas si no hay datos reales
    const recommendations = []

    if (context.userType === "freelancer") {
      // Proyectos recomendados para freelancers
      const projects = [
        {
          id: "proj-1",
          title: "Desarrollo de E-commerce con React",
          type: "project" as const,
          match: 95,
          reason: "Coincide perfectamente con tus habilidades en React y desarrollo web",
        },
        {
          id: "proj-2",
          title: "Diseño de identidad corporativa",
          type: "project" as const,
          match: 88,
          reason: "Tu experiencia en diseño gráfico es ideal para este proyecto",
        },
        {
          id: "proj-3",
          title: "Consultoría en marketing digital",
          type: "project" as const,
          match: 82,
          reason: "Tu ubicación y experiencia en marketing son perfectas",
        },
      ]
      recommendations.push(...projects)
    } else {
      // Freelancers recomendados para clientes
      const freelancers = [
        {
          id: "free-1",
          title: "María González - Desarrolladora Full Stack",
          type: "freelancer" as const,
          match: 96,
          reason: "Especialista en tu stack tecnológico con excelentes reseñas",
        },
        {
          id: "free-2",
          title: "Carlos Ruiz - Diseñador UX/UI",
          type: "freelancer" as const,
          match: 91,
          reason: "Experto en diseño de interfaces con portafolio impresionante",
        },
        {
          id: "free-3",
          title: "Ana Martínez - Especialista en Marketing",
          type: "freelancer" as const,
          match: 87,
          reason: "Experiencia comprobada en tu industria y presupuesto",
        },
      ]
      recommendations.push(...freelancers)
    }

    return recommendations.slice(0, 3)
  }

  private calculateConfidence(response: string, userMessage: string, context: UserContext): number {
    let confidence = 90 // Base alta para Gow

    // Ajustar según contexto
    if (context.profileCompleteness && context.profileCompleteness > 70) confidence += 5
    if (context.skills && context.skills.length > 3) confidence += 3
    if (response.length > 100) confidence += 2

    return Math.min(confidence, 98)
  }

  private getFallbackResponse(userMessage: string, context: UserContext): GowResponse {
    return {
      text: "¡Hola! Soy Gow, tu asistente personal en GoWork 👋 Estoy teniendo algunos problemas técnicos, pero puedo ayudarte de otras formas. ¿Qué necesitas específicamente?",
      confidence: 75,
      suggestions: [
        "¿Quieres optimizar tu perfil?",
        "¿Necesitas ayuda con una propuesta?",
        "¿Buscas proyectos o freelancers?",
      ],
      actions: [
        { id: "profile", label: "👤 Mi perfil", type: "link", url: "/dashboard" },
        { id: "services", label: "🔍 Explorar servicios", type: "link", url: "/servicios" },
        { id: "ai-center", label: "🧠 Centro de IA", type: "link", url: "/ai-dashboard" },
      ],
    }
  }

  // Método para análisis de perfil completo
  async analyzeProfile(userId: string): Promise<{
    score: number
    optimizations: Array<{
      field: string
      suggestion: string
      priority: "high" | "medium" | "low"
      impact: string
    }>
    strengths: string[]
    recommendations: string[]
  }> {
    try {
      // Obtener datos reales del perfil
      const { data: profileData, error } = await supabase.from("users").select("*").eq("id", userId).single()

      if (error) throw error

      const prompt = `
Como Gow, analiza este perfil de GoWork y proporciona optimizaciones específicas:

Nombre: ${profileData.full_name}
Habilidades: ${profileData.skills?.join(", ") || "No especificadas"}
Experiencia: ${profileData.bio || "No especificada"}
Ubicación: ${profileData.location || "No especificada"}
Tipo de usuario: ${profileData.user_type}
Calificación: ${profileData.rating || 0}/5 (${profileData.total_reviews || 0} reseñas)

Responde en JSON con:
{
  "score": número del 1-100,
  "optimizations": [{"field": "", "suggestion": "", "priority": "", "impact": ""}],
  "strengths": ["fortaleza1", "fortaleza2"],
  "recommendations": ["recomendación1", "recomendación2"]
}
`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response
        .text()
        .replace(/```json\n?|\n?```/g, "")
        .trim()
      return JSON.parse(text)
    } catch (error) {
      console.error("Error analyzing profile:", error)
      return {
        score: 75,
        optimizations: [
          {
            field: "Habilidades",
            suggestion: "Agrega más habilidades específicas",
            priority: "high",
            impact: "Aumentará tu visibilidad en búsquedas",
          },
        ],
        strengths: ["Perfil activo", "Experiencia relevante"],
        recommendations: ["Completa tu portafolio", "Agrega más detalles a tu experiencia"],
      }
    }
  }
}

export const gowAgent = new GowAgent()
