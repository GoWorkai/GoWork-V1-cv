import { GoogleGenerativeAI } from "@google/generative-ai"

// Usamos la clave API proporcionada
const API_KEY = "AIzaSyAChwfahZWZJLRnqIu82qUXrQuMW9-CoyQ"
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
  // Actualizamos para usar gemini-1.5-pro en lugar de gemini-1.5-flash
  // ya que puede tener diferentes permisos
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

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

      console.log("Enviando solicitud a Gemini...")
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text().trim()
      console.log("Respuesta recibida:", text)

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
Eres Gow, el asistente IA de GoWork - la red social del talento en Chile.

## PERSONALIDAD CORE:
- **Visionario y minimalista** (estilo Steve Jobs): claro, directo, apasionado por la excelencia
- **Empático y cercano** (estilo Zuckerberg): coloquial, optimista, accesible
- **Tono:** Motivador, seguro, con toques de humor sutil chileno

## MISIÓN:
Empoderar al usuario para que encuentre o ofrezca servicios de forma ágil, segura y confiable.

## ESTILO DE COMUNICACIÓN:
- **Brevedad:** máximo 2-3 líneas por respuesta
- **Estructura:** saludo, propuesta de acción, cierre con pregunta
- **Lenguaje:** "Tú" cercano, evita tecnicismos

## CHILENISMOS CONTEXTUALES:
Usa expresiones chilenas cuando detectes informalidad o cercanía:

**Saludos:** "¡Buena hermano!", "¿Cachai cómo funciona?", "¿Cómo vai?"
**Ayuda:** "Te echo una mano al tiro", "Dime no más", "¿En qué te puedo ayudar po?"
**Servicios:** "pega" (trabajo), "choro" (bueno), "pulento" (excelente)
**Feedback:** "¡Bacán!", "la media pega", "estay dejando la escoba"
**Errores:** "te mandaste un condoro", "no te achunchís"

## FUNCIONALIDADES:
1. Onboarding guiado
2. Clasificación automática de servicios
3. Cotización instantánea
4. Matching geoespacial
5. Coordinación de agendas
6. Seguimiento post-servicio

## REGLAS:
- Evita chilenismos en procesos críticos (pagos, verificación)
- Si el usuario responde informal, usa más modismos
- Siempre mantén respeto y empatía
- Precios en pesos chilenos cuando corresponda
- Máximo 80 palabras por respuesta

Ejemplo de respuesta:
"¡Hola hermano! He encontrado 3 gasfiteros bacanes a menos de 2 km. ¿Querís ver sus perfiles o ajustar el radio de búsqueda?"

Responde como Gow, usando chilenismos apropiados según el contexto.
`

      // Crear el prompt completo con el historial
      const fullMessages = [
        {
          role: "user" as const,
          parts: [{ text: systemPrompt }],
        },
        ...messages,
      ]

      console.log("Enviando chat a Gemini...")
      const result = await this.model.generateContent({
        contents: fullMessages,
      })

      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("Error en chat Gemini:", error)
      return "Ups, parece que me mandé un condoro técnico. Intentémoslo de nuevo al tiro, ¿ya? 😅"
    }
  }

  async generateServiceSuggestions(category: string): Promise<string[]> {
    try {
      const prompt = `
      Como Gow, genera exactamente 5 sugerencias de búsqueda populares para la categoría "${category}" en Chile.
      Usa lenguaje chileno casual cuando sea apropiado.
      Responde SOLO con un array JSON de strings.
      
      Ejemplo: ["Reparación de grifería al tiro", "Gasfiter choro cerca mío", "Destape de cañerías urgente", "Plomero 24 horas bacán", "Cambio de llaves pulento"]
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
        `Presupuesto para ${category} al tiro`,
        `${category} urgente y bacán`,
        `Mejor ${category} en mi zona`,
      ]
    }
  }

  async optimizeProfile(profileData: any): Promise<string[]> {
    try {
      const prompt = `
        Como Gow, analiza este perfil de GoWork y sugiere 5 mejoras específicas usando lenguaje chileno casual:
        
        Datos del perfil:
        - Servicios: ${profileData.services || "No especificado"}
        - Experiencia: ${profileData.experience || "No especificado"}
        - Ubicación: ${profileData.location || "No especificado"}
        - Descripción: ${profileData.description || "No especificado"}
        
        Proporciona sugerencias prácticas para mejorar el perfil y atraer más clientes.
        Usa expresiones como "bacán", "pulento", "al tiro", etc.
        Responde con un array JSON de strings.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        return JSON.parse(text)
      } catch {
        return [
          "Añade más detalles bacanes sobre tu experiencia",
          "Sube fotos pulentes de trabajos anteriores",
          "Mejora la descripción de tus servicios al tiro",
          "Agrega certificaciones o estudios que tengas",
          "Actualiza tu foto de perfil con una más chora",
        ]
      }
    } catch (error) {
      console.error("Error optimizando perfil:", error)
      return ["Ups, me mandé un condoro generando sugerencias. Inténtalo de nuevo po."]
    }
  }

  // Método para probar la conexión con Gemini
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.model.generateContent("Responde solo con la palabra 'OK' para verificar la conexión")
      const response = await result.response
      const text = response.text().trim()
      console.log("Test de conexión Gemini:", text)
      return text.includes("OK")
    } catch (error) {
      console.error("Error en test de conexión Gemini:", error)
      return false
    }
  }
}

export const geminiService = new GeminiService()
