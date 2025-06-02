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

INSTRUCCIONES:
1. Responde de manera natural y útil
2. Usa información específica de GoWork cuando sea relevante
3. Incluye precios en pesos chilenos cuando corresponda
4. Sé específico sobre servicios disponibles en la plataforma
5. Máximo 200 palabras
6. Si no sabes algo específico, sé honesto pero útil

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
    const fallbackResponse = getFallbackResponse(body)

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

function getFallbackResponse(body: any) {
  const lowerMessage = body.message.toLowerCase()

  if (lowerMessage.includes("hola") || lowerMessage.includes("hi")) {
    return {
      text: "¡Hola! 👋 Soy Gow, tu asistente de GoWork. Estoy aquí para ayudarte a navegar por nuestra plataforma, encontrar servicios increíbles y optimizar tu experiencia. ¿En qué puedo echarte una mano al tiro?",
      confidence: 85,
      suggestions: ["¿Cómo funciona GoWork?", "Buscar servicios", "Crear mi perfil"],
    }
  }

  if (lowerMessage.includes("servicio") || lowerMessage.includes("buscar")) {
    return {
      text: "¡Bacán! Te ayudo a encontrar servicios en GoWork. Tenemos proveedores top en:\n\n🎨 Diseño y creatividad\n💻 Desarrollo y tecnología\n📱 Marketing digital\n✍️ Redacción y contenido\n💼 Consultoría\n\nLos precios van desde $15.000 CLP. ¿Qué tipo de servicio necesitas, bro?",
      confidence: 80,
      suggestions: ["Servicios de diseño", "Desarrollo web", "Marketing digital"],
    }
  }

  return {
    text: "¡Hola! Soy Gow, tu asistente de GoWork. Puedo ayudarte con todo lo relacionado a nuestra plataforma: buscar servicios, optimizar tu perfil, entender precios del mercado chileno, y encontrar las mejores oportunidades. ¿En qué te puedo ayudar al tiro?",
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
