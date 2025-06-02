import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Inicializar Gemini con la nueva API key
const genAI = new GoogleGenerativeAI("AIzaSyBjFUyd4Ds6MWtn8r8NOy_cgENiSNZ7MnI")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, role, message, context } = body

    // Validar datos requeridos
    if (!message) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 })
    }

    // Usar Gemini AI real
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    const prompt = `
Eres Gow, el asistente IA de GoWork en Chile. Tu personalidad es:
- Cálido y empático
- Directo y eficiente  
- Usa expresiones chilenas naturales ("al tiro", "pega", "cachai", "bro")
- Siempre positivo y motivador

CONTEXTO DE GOWORK:
GoWork es la red social del talento y las oportunidades humanas en Chile. Es una plataforma que conecta clientes con proveedores de servicios freelance.

INFORMACIÓN CLAVE:
- Ubicación principal: Santiago, Chile
- Servicios populares: Diseño, Desarrollo, Marketing, Redacción, Consultoría
- Precios promedio: $15.000 - $200.000 CLP según servicio
- Enfoque: Economía independiente y colaborativa

CONTEXTO DEL USUARIO:
- Rol: ${role || "cliente"}
- Ubicación: ${context?.location || "Santiago, Chile"}
- Historial: ${context?.chatHistory?.map((h: any) => `${h.role}: ${h.content}`).join("\n") || "Primera conversación"}

MENSAJE DEL USUARIO: "${message}"

INSTRUCCIONES CRÍTICAS:
1. Responde de manera EXTREMADAMENTE BREVE y concisa
2. Máximo 2-3 oraciones cortas
3. Máximo 50 palabras en total
4. Sé directo y ve al grano inmediatamente
5. Evita introducciones largas o explicaciones detalladas
6. Usa lenguaje conversacional chileno
7. Incluye solo la información más esencial

Responde como Gow:
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      data: {
        text: text.trim(),
        confidence: 90,
        suggestions: generateSuggestions(message),
      },
      context: {
        sessionId: Date.now().toString(),
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error with Gemini AI:", error)

    // Fallback inteligente si Gemini falla
    const fallbackResponse = getFallbackResponse(request?.body?.message || "")

    return NextResponse.json({
      success: true,
      data: {
        text: fallbackResponse.text,
        confidence: fallbackResponse.confidence,
        suggestions: fallbackResponse.suggestions,
      },
      context: {
        sessionId: Date.now().toString(),
        timestamp: new Date().toISOString(),
        fallback: true,
      },
    })
  }
}

function generateSuggestions(message: string): string[] {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("servicio") || lowerMessage.includes("buscar")) {
    return ["¿Qué tipo de servicio específico?", "¿Cuál es tu presupuesto?", "¿En qué comuna?"]
  }

  if (lowerMessage.includes("perfil") || lowerMessage.includes("optimizar")) {
    return ["Mejorar descripción", "Subir portfolio", "Ajustar precios"]
  }

  if (lowerMessage.includes("precio") || lowerMessage.includes("costo")) {
    return ["Ver precios por categoría", "Calcular presupuesto", "Comparar tarifas"]
  }

  return ["¿Cómo funciona GoWork?", "Buscar servicios", "Optimizar perfil"]
}

function getFallbackResponse(message: string) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hola") || lowerMessage.includes("hi")) {
    return {
      text: "¡Hola! Soy Gow, tu asistente de GoWork. ¿En qué te puedo ayudar al tiro?",
      confidence: 85,
      suggestions: ["¿Cómo funciona GoWork?", "Buscar servicios", "Crear mi perfil"],
    }
  }

  if (lowerMessage.includes("servicio") || lowerMessage.includes("buscar")) {
    return {
      text: "¡Bacán! Tenemos servicios de diseño, desarrollo, marketing y más. ¿Qué tipo necesitas?",
      confidence: 80,
      suggestions: ["Servicios de diseño", "Desarrollo web", "Marketing digital"],
    }
  }

  return {
    text: "¡Hola! Soy Gow. ¿Necesitas ayuda con servicios, perfiles o precios en GoWork?",
    confidence: 75,
    suggestions: ["¿Cómo empezar?", "Buscar servicios", "Optimizar perfil"],
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Gow AI Assistant con Gemini está funcionando",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  })
}
