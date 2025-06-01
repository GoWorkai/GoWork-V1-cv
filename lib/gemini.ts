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
  private model = genAI.getGenerativeModel({ model: "gemini-pro" })

  async searchServices(query: string, location = "Santiago, Chile"): Promise<SearchResult> {
    try {
      const prompt = `
        Eres Gow, el asistente de IA de GoWork, una plataforma de servicios freelance en Chile.
        
        Usuario busca: "${query}"
        Ubicación: ${location}
        
        Analiza esta consulta y proporciona una respuesta estructurada con:
        1. Número estimado de profesionales disponibles (entre 5-50)
        2. Rango de precios en pesos chilenos
        3. Disponibilidad típica
        4. 3 recomendaciones específicas
        
        Responde en formato JSON:
        {
          "professionals": número,
          "priceRange": {"min": número, "max": número},
          "availability": "texto",
          "recommendations": ["rec1", "rec2", "rec3"],
          "location": "${location}"
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        return JSON.parse(text)
      } catch {
        // Fallback si la respuesta no es JSON válido
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
    } catch (error) {
      console.error("Error en búsqueda Gemini:", error)
      throw new Error("Error al procesar la búsqueda")
    }
  }

  async chatWithGow(messages: ChatMessage[]): Promise<string> {
    try {
      const systemPrompt = `
        Eres Gow, el asistente de IA de GoWork, una plataforma que conecta talentos con oportunidades en Chile.
        
        Características de GoWork:
        - Red social del talento y oportunidades humanas
        - Conecta proveedores de servicios con clientes
        - Servicios desde reparaciones hasta consultoría profesional
        - Sistema de reputación y pagos seguros
        - Geolocalización inteligente
        - Perfil dual (cliente y proveedor)
        
        Tu personalidad:
        - Amigable y profesional
        - Conoces bien el mercado chileno
        - Ayudas con precios, recomendaciones y procesos
        - Usas emojis ocasionalmente
        - Respondes en español chileno
        
        Siempre trata de ser útil y específico en tus respuestas.
      `

      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          {
            role: "model",
            parts: [
              {
                text: "¡Hola! Soy Gow, tu asistente de IA en GoWork. Estoy aquí para ayudarte con todo lo relacionado con servicios, precios, y conectar tu talento con oportunidades. ¿En qué puedo ayudarte?",
              },
            ],
          },
          ...messages,
        ],
      })

      const result = await chat.sendMessage(messages[messages.length - 1].parts[0].text)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("Error en chat Gemini:", error)
      throw new Error("Error al procesar el mensaje")
    }
  }

  async generateServiceSuggestions(category: string): Promise<string[]> {
    try {
      const prompt = `
        Genera 5 sugerencias de búsqueda populares para la categoría "${category}" en GoWork Chile.
        Responde solo con un array JSON de strings, sin explicaciones adicionales.
        Ejemplo: ["Reparación de grifería", "Instalación de lavamanos", "Destape de cañerías"]
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        return JSON.parse(text)
      } catch {
        // Fallback con sugerencias genéricas
        return [
          `Servicios de ${category} a domicilio`,
          `Profesional de ${category} cerca de mí`,
          `Presupuesto para ${category}`,
          `${category} urgente`,
          `Mejor ${category} en mi zona`,
        ]
      }
    } catch (error) {
      console.error("Error generando sugerencias:", error)
      return [`Buscar servicios de ${category}`]
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
