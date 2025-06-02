import { GoogleGenerativeAI } from "@google/generative-ai"

// Nueva API Key proporcionada
const genAI = new GoogleGenerativeAI("AIzaSyBjFUyd4Ds6MWtn8r8NOy_cgENiSNZ7MnI")

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

export interface SearchAnalysis {
  categoria: string
  subcategoria: string
  urgencia: "alta" | "media" | "baja"
  resumen: string
  sugerencias_IA: string[]
  ubicacion_sugerida?: string
  precio_estimado?: {
    min: number
    max: number
    moneda: string
  }
}

export class GeminiAI {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
  private visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro-vision" })

  // 🟦 Buscador Inteligente - Análisis de solicitudes de servicio
  async analyzeServiceRequest(
    userMessage: string,
    userContext: {
      role: "client" | "provider"
      location?: string
      previousServices?: string[]
    },
  ): Promise<SearchAnalysis> {
    try {
      const prompt = `
Eres Gow, el asistente IA de GoWork en Chile. Analiza este mensaje de un usuario y clasifícalo como solicitud de servicio.

CONTEXTO DEL USUARIO:
- Rol: ${userContext.role}
- Ubicación: ${userContext.location || "Santiago, Chile"}
- Servicios anteriores: ${userContext.previousServices?.join(", ") || "Ninguno"}

MENSAJE DEL USUARIO: "${userMessage}"

INSTRUCCIONES:
1. Usa lenguaje chileno natural ("al tiro", "pega", "cachai")
2. Sé empático y directo
3. Considera el contexto local chileno

Responde SOLO con un JSON válido con esta estructura exacta:
{
  "categoria": "Categoría principal del servicio",
  "subcategoria": "Subcategoría específica",
  "urgencia": "alta|media|baja",
  "resumen": "Resumen claro del servicio solicitado",
  "sugerencias_IA": ["pregunta1", "pregunta2", "pregunta3"],
  "ubicacion_sugerida": "Comuna o zona sugerida",
  "precio_estimado": {
    "min": 15000,
    "max": 45000,
    "moneda": "CLP"
  }
}

CATEGORÍAS DISPONIBLES EN GOWORK:
- Limpieza y Hogar
- Reparaciones y Mantención
- Tecnología y Desarrollo
- Diseño y Creatividad
- Educación y Tutorías
- Cuidado Personal y Salud
- Mascotas
- Transporte y Delivery
- Eventos y Entretenimiento
- Consultoría y Negocios
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
        return this.getFallbackSearchAnalysis(userMessage)
      }
    } catch (error) {
      console.error("Error analyzing service request:", error)
      return this.getFallbackSearchAnalysis(userMessage)
    }
  }

  // 🟢 Agente Conversacional Gow - Respuestas contextuales
  async generateGowResponse(
    userMessage: string,
    context: {
      userId: string
      role: "client" | "provider" | "admin"
      location?: string
      currentPage?: string
      chatHistory?: Array<{ role: string; message: string }>
      userProfile?: {
        name?: string
        skills?: string[]
        completeness?: number
      }
    },
  ): Promise<GeminiResponse> {
    try {
      const historyContext =
        context.chatHistory
          ?.slice(-5) // Últimos 5 mensajes para contexto
          .map((h) => `${h.role}: ${h.message}`)
          .join("\n") || ""

      const prompt = `
Eres Gow, el asistente IA de GoWork en Chile. Tu personalidad es:
- Cálido y empático
- Directo y eficiente  
- Usa expresiones chilenas naturales ("al tiro", "pega", "cachai", "bro")
- Siempre positivo y motivador

CONTEXTO DEL USUARIO:
- ID: ${context.userId}
- Rol: ${context.role}
- Ubicación: ${context.location || "Chile"}
- Página actual: ${context.currentPage || "dashboard"}
- Perfil completado: ${context.userProfile?.completeness || 0}%
- Habilidades: ${context.userProfile?.skills?.join(", ") || "No especificadas"}

HISTORIAL RECIENTE:
${historyContext}

MENSAJE ACTUAL: "${userMessage}"

FUNCIONES QUE PUEDES AYUDAR:
- Crear y optimizar perfiles
- Armar cotizaciones y presupuestos
- Recordar plazos de entrega
- Ayudar en respuestas a clientes
- Sugerir servicios según ubicación
- Estimar precios del mercado chileno

Responde de manera natural y útil. Si necesitas hacer una acción específica, inclúyela en tu respuesta.
Máximo 200 palabras.
`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Analizar la respuesta para extraer acciones sugeridas
      const actions = this.extractActionsFromResponse(text, context)
      const suggestions = this.generateContextualSuggestions(userMessage, context)

      return {
        text: text.trim(),
        confidence: this.calculateConfidence(text, userMessage, context),
        suggestions,
        actions,
      }
    } catch (error) {
      console.error("Error generating Gow response:", error)
      return this.getFallbackGowResponse(userMessage, context)
    }
  }

  // 🧩 Asistencia contextual por módulo
  async generateModuleAssistance(
    module: "registro" | "perfil" | "servicios" | "chat" | "calendario" | "pagos",
    userContext: {
      role: "client" | "provider"
      location?: string
      currentData?: any
    },
  ): Promise<{
    suggestions: string[]
    autoText?: string
    tips: string[]
  }> {
    try {
      const modulePrompts = {
        registro: `Ayuda al usuario a completar su registro en GoWork. Sugiere información relevante para su perfil según su ubicación en ${userContext.location || "Chile"}.`,
        perfil: `Analiza el perfil actual y sugiere mejoras. Recomienda habilidades populares en ${userContext.location || "Chile"} para un ${userContext.role}.`,
        servicios: `Ayuda a crear descripciones de servicios atractivas y estimar precios competitivos para el mercado chileno.`,
        chat: `Sugiere respuestas profesionales y amigables para la comunicación entre cliente y proveedor.`,
        calendario: `Recomienda horarios óptimos según la demanda local y tipo de servicio.`,
        pagos: `Estima tarifas justas según el mercado local y experiencia del proveedor.`,
      }

      const prompt = `
Eres Gow, asistente de GoWork. El usuario está en el módulo "${module}".
${modulePrompts[module]}

Usuario: ${userContext.role} en ${userContext.location || "Chile"}
Datos actuales: ${JSON.stringify(userContext.currentData || {})}

Responde con JSON:
{
  "suggestions": ["sugerencia1", "sugerencia2", "sugerencia3"],
  "autoText": "Texto generado automáticamente si aplica",
  "tips": ["tip1", "tip2", "tip3"]
}

Usa lenguaje chileno natural y sé específico para el contexto local.
`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        const cleanText = text.replace(/```json\n?|\n?```/g, "").trim()
        return JSON.parse(cleanText)
      } catch (parseError) {
        return this.getFallbackModuleAssistance(module)
      }
    } catch (error) {
      console.error("Error generating module assistance:", error)
      return this.getFallbackModuleAssistance(module)
    }
  }

  // Métodos auxiliares privados
  private getFallbackSearchAnalysis(userMessage: string): SearchAnalysis {
    return {
      categoria: "Servicios Generales",
      subcategoria: "Consulta general",
      urgencia: "media",
      resumen: `Solicitud de servicio: ${userMessage.slice(0, 100)}...`,
      sugerencias_IA: [
        "¿Podrías ser más específico sobre lo que necesitas?",
        "¿En qué comuna te encuentras?",
        "¿Cuándo necesitas el servicio?",
      ],
      ubicacion_sugerida: "Santiago Centro",
      precio_estimado: {
        min: 20000,
        max: 50000,
        moneda: "CLP",
      },
    }
  }

  private getFallbackGowResponse(userMessage: string, context: any): GeminiResponse {
    const responses = [
      "¡Hola! Soy Gow, tu asistente en GoWork. ¿En qué te puedo ayudar al tiro?",
      "¡Qué tal! Estoy aquí para echarte una mano con lo que necesites en GoWork.",
      "¡Hola, bro! Cuéntame qué necesitas y te ayudo al tiro.",
    ]

    return {
      text: responses[Math.floor(Math.random() * responses.length)],
      confidence: 75,
      suggestions: ["¿Cómo optimizo mi perfil?", "¿Qué servicios puedo ofrecer?", "¿Cómo encuentro buenos proyectos?"],
      actions: [
        { id: "profile", label: "👤 Optimizar perfil", type: "link", url: "/dashboard" },
        { id: "services", label: "🔍 Buscar servicios", type: "link", url: "/servicios" },
      ],
    }
  }

  private getFallbackModuleAssistance(module: string) {
    return {
      suggestions: [
        "Completa toda la información requerida",
        "Usa palabras clave relevantes",
        "Mantén tu información actualizada",
      ],
      autoText: "Texto de ejemplo para el módulo " + module,
      tips: [
        "Tip 1: Sé específico en tus descripciones",
        "Tip 2: Usa fotos de calidad",
        "Tip 3: Responde rápido a los mensajes",
      ],
    }
  }

  private extractActionsFromResponse(
    text: string,
    context: any,
  ): Array<{
    id: string
    label: string
    type: "link" | "action"
    url?: string
  }> {
    const actions = []
    const lowerText = text.toLowerCase()

    if (lowerText.includes("perfil") || lowerText.includes("optimizar")) {
      actions.push({ id: "optimize-profile", label: "🚀 Optimizar perfil", type: "link", url: "/dashboard" })
    }
    if (lowerText.includes("servicio") || lowerText.includes("buscar")) {
      actions.push({ id: "find-services", label: "🔍 Buscar servicios", type: "link", url: "/servicios" })
    }
    if (lowerText.includes("precio") || lowerText.includes("cotizar")) {
      actions.push({ id: "estimate-price", label: "💰 Estimar precios", type: "action" })
    }

    return actions.slice(0, 3)
  }

  private generateContextualSuggestions(userMessage: string, context: any): string[] {
    const suggestions = []
    const role = context.role

    if (role === "provider") {
      suggestions.push(
        "¿Cómo optimizo mi perfil para más clientes?",
        "¿Qué precios debo cobrar?",
        "¿Cómo respondo a una propuesta?",
      )
    } else {
      suggestions.push(
        "¿Cómo encuentro el mejor proveedor?",
        "¿Qué debo preguntar antes de contratar?",
        "¿Cómo funciona el pago?",
      )
    }

    return suggestions.slice(0, 3)
  }

  private calculateConfidence(text: string, userMessage: string, context: any): number {
    let confidence = 85

    if (text.length > 50) confidence += 5
    if (text.includes("GoWork")) confidence += 5
    if (context.userProfile?.completeness > 70) confidence += 5

    return Math.min(confidence, 98)
  }

  // Método para verificar conexión
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
