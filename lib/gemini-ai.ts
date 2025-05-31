import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDBRyQ0TwOBhqjN5sFv0f3jSHp322jlNs4")

export interface GeminiResponse {
  text: string
  confidence: number
  suggestions?: string[]
  actions?: Array<{
    id: string
    label: string
    type: "link" | "action"
    url?: string
  }>
}

export class GeminiAI {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  async generateResponse(
    userMessage: string,
    context: {
      userType?: "client" | "provider"
      currentPage?: string
      userLocation?: string
      previousMessages?: string[]
    } = {},
  ): Promise<GeminiResponse> {
    try {
      // Construir el prompt contextual para GoWork
      const systemPrompt = `
Eres el asistente de IA de GoWork, una plataforma que conecta talentos con clientes para servicios profesionales.

CONTEXTO DE GOWORK:
- Plataforma de servicios bajo demanda
- Conecta freelancers/proveedores con clientes
- Servicios: desarrollo web, diseño, marketing, consultoría, oficios, etc.
- Ubicación: Principalmente Chile y Latinoamérica
- Misión: "Conectar talentos con necesidades reales"

INFORMACIÓN DEL USUARIO:
- Tipo: ${context.userType || "no especificado"}
- Página actual: ${context.currentPage || "no especificada"}
- Ubicación: ${context.userLocation || "no especificada"}

INSTRUCCIONES:
1. Responde de manera amigable y profesional
2. Usa información específica de GoWork
3. Ofrece acciones concretas cuando sea posible
4. Mantén respuestas concisas pero útiles (máximo 150 palabras)
5. Incluye emojis apropiados para hacer la conversación más amigable
6. Si preguntan por precios, da rangos realistas para el mercado chileno/latinoamericano

TIPOS DE CONSULTAS COMUNES:
- Cómo encontrar servicios/proveedores
- Precios y presupuestos
- Proceso de contratación
- Dudas sobre la plataforma
- Problemas técnicos
- Recomendaciones personalizadas

Responde al siguiente mensaje del usuario de manera útil y contextual:
`

      const fullPrompt = `${systemPrompt}\n\nUsuario: ${userMessage}`

      const result = await this.model.generateContent(fullPrompt)
      const response = await result.response
      const text = response.text()

      // Analizar la respuesta para extraer acciones sugeridas
      const actions = this.extractActions(text, userMessage, context)
      const suggestions = this.generateSuggestions(userMessage, context)

      return {
        text: text.trim(),
        confidence: this.calculateConfidence(text, userMessage),
        suggestions,
        actions,
      }
    } catch (error) {
      console.error("Error calling Gemini AI:", error)

      // Fallback response más específico según el tipo de error
      let fallbackMessage = "Disculpa, estoy teniendo problemas técnicos en este momento. 🤖"

      if (error instanceof Error) {
        if (error.message.includes("quota")) {
          fallbackMessage = "He alcanzado mi límite de consultas por el momento. ¿Puedes intentar en unos minutos? 🕐"
        } else if (error.message.includes("network")) {
          fallbackMessage = "Problemas de conexión. ¿Puedes verificar tu internet e intentar de nuevo? 🌐"
        }
      }

      return {
        text: `${fallbackMessage} Mientras tanto, puedes explorar nuestros servicios en el mapa o contactar directamente con proveedores.`,
        confidence: 50,
        actions: [
          { id: "map", label: "🗺️ Ver mapa de servicios", type: "link", url: "/map" },
          { id: "services", label: "🔍 Explorar servicios", type: "link", url: "/servicios" },
          { id: "dashboard", label: "👤 Mi dashboard", type: "link", url: "/dashboard" },
        ],
      }
    }
  }

  private extractActions(
    response: string,
    userMessage: string,
    context: any,
  ): Array<{ id: string; label: string; type: "link" | "action"; url?: string }> {
    const actions = []
    const lowerResponse = response.toLowerCase()
    const lowerMessage = userMessage.toLowerCase()

    // Acciones basadas en el contenido de la respuesta y mensaje
    if (lowerMessage.includes("servicio") || lowerMessage.includes("trabajo") || lowerMessage.includes("proveedor")) {
      actions.push(
        { id: "services", label: "🔍 Ver servicios", type: "link", url: "/servicios" },
        { id: "map", label: "🗺️ Buscar en mapa", type: "link", url: "/map" },
      )
    }

    if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("presupuesto")) {
      actions.push(
        { id: "calculator", label: "💰 Calculadora de precios", type: "link", url: "/ai-dashboard" },
        { id: "compare", label: "📊 Comparar precios", type: "link", url: "/servicios" },
      )
    }

    if (lowerMessage.includes("como") || lowerMessage.includes("cómo") || lowerMessage.includes("ayuda")) {
      actions.push(
        { id: "guide", label: "📚 Guía completa", type: "link", url: "/onboarding" },
        { id: "ai-help", label: "🤖 Centro de IA", type: "link", url: "/ai-dashboard" },
      )
    }

    if (lowerMessage.includes("chat") || lowerMessage.includes("contactar") || lowerMessage.includes("hablar")) {
      actions.push({ id: "chat", label: "💬 Ir al chat", type: "link", url: "/chat" })
    }

    if (lowerMessage.includes("perfil") || lowerMessage.includes("cuenta") || lowerMessage.includes("registro")) {
      actions.push(
        { id: "profile", label: "👤 Mi perfil", type: "link", url: "/dashboard" },
        { id: "onboarding", label: "🚀 Completar perfil", type: "link", url: "/onboarding" },
      )
    }

    // Acciones por defecto si no hay específicas
    if (actions.length === 0) {
      actions.push(
        { id: "explore", label: "🌟 Explorar GoWork", type: "link", url: "/servicios" },
        { id: "ai-center", label: "🧠 Centro de IA", type: "link", url: "/ai-dashboard" },
      )
    }

    return actions.slice(0, 3) // Máximo 3 acciones
  }

  private generateSuggestions(userMessage: string, context: any): string[] {
    const suggestions = []
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("desarrollador") || lowerMessage.includes("programador")) {
      suggestions.push(
        "¿Buscas desarrollo web o móvil?",
        "¿Qué tecnologías necesitas?",
        "¿Cuál es tu presupuesto aproximado?",
      )
    } else if (lowerMessage.includes("diseño") || lowerMessage.includes("diseñador")) {
      suggestions.push(
        "¿Necesitas diseño web o gráfico?",
        "¿Tienes referencias visuales?",
        "¿Para qué tipo de proyecto?",
      )
    } else if (lowerMessage.includes("marketing")) {
      suggestions.push(
        "¿Marketing digital o tradicional?",
        "¿Qué redes sociales usas?",
        "¿Cuál es tu público objetivo?",
      )
    } else {
      suggestions.push(
        "¿Qué tipo de servicio necesitas?",
        "¿En qué ciudad te encuentras?",
        "¿Cuándo necesitas el servicio?",
      )
    }

    return suggestions.slice(0, 3)
  }

  private calculateConfidence(response: string, userMessage: string): number {
    // Calcular confianza basada en la longitud y relevancia de la respuesta
    let confidence = 85

    if (response.length > 100) confidence += 5
    if (response.length > 200) confidence += 5
    if (response.includes("GoWork")) confidence += 5
    if (response.includes("servicio") || response.includes("proveedor")) confidence += 5

    return Math.min(confidence, 98)
  }

  async generateSearchSuggestions(query: string): Promise<{
    suggestions: Array<{
      id: string
      type: "service" | "provider" | "action" | "help"
      title: string
      description: string
      confidence: number
      category: string
    }>
    insights: Array<{
      id: string
      message: string
      type: "tip" | "recommendation" | "trend"
      confidence: number
    }>
  }> {
    try {
      const prompt = `
Analiza esta búsqueda de GoWork: "${query}"

Responde SOLO con un JSON válido (sin markdown ni explicaciones) con esta estructura exacta:
{
  "suggestions": [
    {
      "id": "unique-id",
      "type": "service",
      "title": "Título corto",
      "description": "Descripción útil",
      "confidence": 90,
      "category": "Categoría"
    }
  ],
  "insights": [
    {
      "id": "insight-id", 
      "message": "Insight útil con emoji",
      "type": "tip",
      "confidence": 85
    }
  ]
}

Genera 4 sugerencias y 2 insights relevantes para servicios de GoWork.
`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        // Limpiar la respuesta de posibles caracteres de markdown
        const cleanText = text.replace(/```json\n?|\n?```/g, "").trim()
        const parsed = JSON.parse(cleanText)
        return parsed
      } catch (parseError) {
        console.error("Error parsing Gemini JSON response:", parseError)
        return this.getFallbackSearchSuggestions(query)
      }
    } catch (error) {
      console.error("Error generating search suggestions:", error)
      return this.getFallbackSearchSuggestions(query)
    }
  }

  private getFallbackSearchSuggestions(query: string) {
    const lowerQuery = query.toLowerCase()

    const suggestions = [
      {
        id: "dev-web",
        type: "service" as const,
        title: "Desarrollo Web",
        description: "Encuentra desarrolladores web especializados",
        confidence: 92,
        category: "Tecnología",
      },
      {
        id: "design-ui",
        type: "service" as const,
        title: "Diseño UI/UX",
        description: "Diseñadores expertos en experiencia de usuario",
        confidence: 89,
        category: "Diseño",
      },
      {
        id: "marketing",
        type: "service" as const,
        title: "Marketing Digital",
        description: "Especialistas en marketing y publicidad",
        confidence: 87,
        category: "Marketing",
      },
      {
        id: "consulting",
        type: "service" as const,
        title: "Consultoría",
        description: "Expertos en estrategia y optimización",
        confidence: 85,
        category: "Negocios",
      },
    ]

    // Personalizar sugerencias según la consulta
    if (lowerQuery.includes("desarrollo") || lowerQuery.includes("programar")) {
      suggestions[0].confidence = 95
      suggestions[0].title = "Desarrollo de Software"
      suggestions[0].description = "Desarrolladores especializados en tu tecnología"
    }

    if (lowerQuery.includes("diseño")) {
      suggestions[1].confidence = 95
      suggestions[1].title = "Diseño Profesional"
      suggestions[1].description = "Diseñadores creativos para tu proyecto"
    }

    return {
      suggestions: suggestions.slice(0, 4),
      insights: [
        {
          id: "trend-1",
          message: "🔥 Los servicios de IA están en alta demanda esta semana",
          type: "trend" as const,
          confidence: 91,
        },
        {
          id: "tip-1",
          message: "💡 Tip: Revisa las reseñas antes de contratar un servicio",
          type: "tip" as const,
          confidence: 88,
        },
      ],
    }
  }

  // Método para verificar si la API está funcionando
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.model.generateContent("Hola, ¿funciona la conexión?")
      const response = await result.response
      return response.text().length > 0
    } catch (error) {
      console.error("Gemini connection test failed:", error)
      return false
    }
  }
}

export const geminiAI = new GeminiAI()
