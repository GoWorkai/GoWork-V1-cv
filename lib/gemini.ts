import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyBqVQ0ONMO0U9lHJ7nBRGmCwoojFxuqwZw"
const genAI = new GoogleGenerativeAI(API_KEY)

export interface SearchResult {
  professionals: number
  priceRange: { min: number; max: number }
  availability: string
  recommendations: string[]
  location: string
}

export interface ChatMessage {
  role: "user" | "model"
  parts: { text: string }[]
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  async searchServices(query: string, location = "Santiago, Chile"): Promise<SearchResult> {
    try {
      const prompt = `
    Actúa como Gow, el asistente de IA de GoWork, una plataforma de servicios freelance en Chile.
    
    Consulta del usuario: "${query}"
    Ubicación: ${location}
    
    Analiza esta consulta y responde SOLO con un objeto JSON válido con esta estructura exacta:
    {
      "professionals": [número entre 5-50],
      "priceRange": {"min": [número], "max": [número]},
      "availability": "[texto descriptivo]",
      "recommendations": ["recomendación 1", "recomendación 2", "recomendación 3"],
      "location": "${location}"
    }
    
    No incluyas texto adicional, solo el JSON.
  `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text().trim()

      // Limpiar el texto para extraer solo el JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      // Si no se pudo extraer JSON, usar datos simulados
      console.log("No se pudo extraer JSON de la respuesta, usando datos simulados")
      return this.getFallbackSearchResult(location)
    } catch (error) {
      console.error("Error en búsqueda Gemini:", error)
      // Fallback con datos simulados
      return this.getFallbackSearchResult(location)
    }
  }

  // Método para generar datos simulados consistentes
  private getFallbackSearchResult(location: string): SearchResult {
    return {
      professionals: Math.floor(Math.random() * 45) + 5,
      priceRange: { min: 15000, max: 80000 },
      availability: "Disponible en 24-48 horas",
      recommendations: [
        "Verifica las calificaciones antes de contratar",
        "Compara al menos 3 presupuestos",
        "Define claramente el alcance del trabajo",
      ],
      location,
    }
  }

  async chatWithGow(messages: ChatMessage[]): Promise<string> {
    try {
      const systemPrompt = `
      Eres Gow, el asistente de IA más avanzado de GoWork, una plataforma que conecta talentos con oportunidades en Chile.
      
      Tu personalidad:
      - Extremadamente amigable, empático y profesional
      - Experto en todos los aspectos de servicios y trabajo freelance
      - Conoces materiales, herramientas, precios del mercado chileno
      - Siempre ofreces soluciones prácticas y específicas
      - Haces preguntas inteligentes para conocer mejor al usuario
      
      Características de GoWork:
      - Red social del talento y oportunidades humanas
      - Conecta proveedores de servicios con clientes
      - Servicios desde reparaciones hasta consultoría profesional
      - Sistema de reputación y pagos seguros
      - Geolocalización inteligente
      - Perfil dual (cliente y proveedor)
      
      Instrucciones específicas:
      1. SIEMPRE responde de manera conversacional y natural
      2. Si detectas que es CLIENTE: ayúdalo a encontrar servicios, recomienda proveedores específicos, sugiere precios justos, materiales necesarios
      3. Si detectas que es PROVEEDOR: ayúdalo a optimizar perfil, mejorar servicios, conseguir clientes, estrategias de pricing, herramientas profesionales
      4. Haz preguntas específicas para conocer mejor sus necesidades
      5. Recomienda materiales, herramientas o recursos específicos cuando sea apropiado
      6. Si menciona problemas, ofrece soluciones paso a paso
      7. Usa emojis ocasionalmente para ser más cercano
      8. Menciona precios en pesos chilenos cuando sea relevante
      9. Conoces proveedores, tiendas y recursos en Chile
      10. Siempre busca extraer información útil del usuario de manera natural
      
      Responde en español chileno, máximo 200 palabras, de manera conversacional.
    `

      // Crear el prompt completo con el historial
      const fullMessages = [
        {
          role: "user" as const,
          parts: [{ text: systemPrompt }],
        },
        ...messages,
      ]

      const result = await this.model.generateContent({
        contents: fullMessages,
      })

      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("Error en chat Gemini:", error)
      return "Lo siento, tengo problemas técnicos en este momento. Por favor intenta nuevamente en unos segundos. 😔"
    }
  }

  async generateServiceSuggestions(category: string): Promise<string[]> {
    try {
      const prompt = `
      Genera exactamente 5 sugerencias de búsqueda populares para la categoría "${category}" en Chile.
      Responde SOLO con un array JSON de strings.
      Ejemplo: ["Reparación de grifería", "Instalación de lavamanos", "Destape de cañerías", "Plomero 24 horas", "Cambio de llaves"]
    `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text().trim()

      // Intentar parsear como JSON
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      throw new Error("No se pudo parsear las sugerencias")
    } catch (error) {
      console.error("Error generando sugerencias:", error)
      return [
        `Servicios de ${category} a domicilio`,
        `Profesional de ${category} cerca de mí`,
        `Presupuesto para ${category}`,
        `${category} urgente`,
        `Mejor ${category} en mi zona`,
      ]
    }
  }

  async optimizeProfile(profileData: any): Promise<string[]> {
    try {
      const prompt = `
        Analiza este perfil de GoWork y sugiere 5 mejoras específicas:
        
        Datos del perfil:
        - Servicios: ${profileData.services || "No especificado"}
        - Experiencia: ${profileData.experience || "No especificado"}
        - Ubicación: ${profileData.location || "No especificado"}
        - Descripción: ${profileData.description || "No especificado"}
        
        Proporciona sugerencias prácticas para mejorar el perfil y atraer más clientes.
        Responde con un array JSON de strings.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        return JSON.parse(text)
      } catch {
        return [
          "Añade más detalles sobre tu experiencia",
          "Incluye ejemplos de trabajos anteriores",
          "Mejora la descripción de tus servicios",
          "Agrega certificaciones o estudios",
          "Actualiza tu foto de perfil",
        ]
      }
    } catch (error) {
      console.error("Error optimizando perfil:", error)
      return ["Error al generar sugerencias de perfil"]
    }
  }
}

export const geminiService = new GeminiService()
