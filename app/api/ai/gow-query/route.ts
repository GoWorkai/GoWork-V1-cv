import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, role, message, context } = body

    // Validar datos requeridos
    if (!message) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 })
    }

    // Respuestas inteligentes basadas en GoWork
    const responses = getGowResponse(message, context)

    return NextResponse.json({
      success: true,
      data: {
        text: responses.text,
        confidence: responses.confidence,
        suggestions: responses.suggestions,
      },
      context: {
        sessionId: Date.now().toString(),
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error in Gow query:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        fallback: {
          text: "¡Hola! Soy Gow, tu asistente de GoWork. Estoy aquí para ayudarte con cualquier consulta sobre nuestra plataforma. ¿En qué puedo asistirte?",
          confidence: 75,
        },
      },
      { status: 200 }, // Cambiar a 200 para que no se trate como error
    )
  }
}

function getGowResponse(message: string, context: any) {
  const lowerMessage = message.toLowerCase()

  // Respuestas específicas basadas en palabras clave
  if (lowerMessage.includes("hola") || lowerMessage.includes("hi") || lowerMessage.includes("buenos")) {
    return {
      text: "¡Hola! 👋 Soy Gow, tu asistente personal de GoWork. Estoy aquí para ayudarte a navegar por nuestra plataforma, encontrar servicios, optimizar tu perfil y descubrir nuevas oportunidades. ¿En qué puedo ayudarte hoy?",
      confidence: 95,
      suggestions: ["¿Cómo funciona GoWork?", "Buscar servicios", "Optimizar mi perfil"],
    }
  }

  if (lowerMessage.includes("servicio") || lowerMessage.includes("buscar") || lowerMessage.includes("encontrar")) {
    return {
      text: "¡Perfecto! Te ayudo a encontrar servicios en GoWork. Puedes buscar por:\n\n🔍 **Categorías populares:**\n• Diseño y creatividad\n• Desarrollo y tecnología\n• Marketing digital\n• Redacción y traducción\n• Consultoría\n\n📍 **Por ubicación:** Especialmente en Santiago y regiones de Chile\n\n💰 **Por presupuesto:** Desde $15.000 CLP\n\n¿Qué tipo de servicio específico necesitas?",
      confidence: 90,
      suggestions: ["Servicios de diseño", "Desarrollo web", "Marketing digital"],
    }
  }

  if (lowerMessage.includes("perfil") || lowerMessage.includes("optimizar") || lowerMessage.includes("mejorar")) {
    return {
      text: "¡Excelente! Optimizar tu perfil es clave para el éxito en GoWork. Te recomiendo:\n\n✨ **Elementos esenciales:**\n• Foto profesional y atractiva\n• Descripción clara de tus habilidades\n• Portfolio con trabajos anteriores\n• Certificaciones y experiencia\n\n🎯 **Tips para destacar:**\n• Usa palabras clave relevantes\n• Incluye testimonios de clientes\n• Mantén precios competitivos\n• Responde rápido a mensajes\n\n¿En qué área específica te gustaría mejorar tu perfil?",
      confidence: 88,
      suggestions: ["Mejorar descripción", "Subir portfolio", "Ajustar precios"],
    }
  }

  if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("tarifa")) {
    return {
      text: "💰 **Análisis de precios en GoWork Chile:**\n\n📊 **Rangos promedio por categoría:**\n• Diseño gráfico: $25.000 - $80.000 CLP\n• Desarrollo web: $50.000 - $200.000 CLP\n• Marketing digital: $30.000 - $100.000 CLP\n• Redacción: $15.000 - $50.000 CLP\n• Consultoría: $40.000 - $150.000 CLP\n\n🎯 **Factores que influyen:**\n• Experiencia y portfolio\n• Complejidad del proyecto\n• Plazos de entrega\n• Ubicación geográfica\n\n¿Para qué servicio específico necesitas información de precios?",
      confidence: 85,
      suggestions: ["Precios de diseño", "Tarifas de desarrollo", "Costos de marketing"],
    }
  }

  if (lowerMessage.includes("trabajo") || lowerMessage.includes("freelance") || lowerMessage.includes("oportunidad")) {
    return {
      text: "🚀 **Oportunidades de trabajo en GoWork:**\n\n🔥 **Sectores con mayor demanda:**\n• Tecnología y desarrollo\n• Marketing digital\n• Diseño y creatividad\n• Educación online\n• Servicios profesionales\n\n📈 **Cómo aumentar tus oportunidades:**\n• Completa tu perfil al 100%\n• Mantente activo en la plataforma\n• Responde rápido a propuestas\n• Construye una buena reputación\n• Especialízate en nichos específicos\n\n¿En qué área te gustaría encontrar más trabajo?",
      confidence: 87,
      suggestions: ["Trabajos de tecnología", "Proyectos de diseño", "Servicios de marketing"],
    }
  }

  if (lowerMessage.includes("gowork") || lowerMessage.includes("plataforma") || lowerMessage.includes("funciona")) {
    return {
      text: "🌟 **GoWork: La Red Social del Talento**\n\nSomos una plataforma chilena que conecta talento con oportunidades:\n\n🎯 **Para Clientes:**\n• Encuentra proveedores verificados\n• Compara precios y portfolios\n• Gestiona proyectos fácilmente\n• Pagos seguros y protegidos\n\n💼 **Para Proveedores:**\n• Crea tu perfil profesional\n• Recibe propuestas de trabajo\n• Construye tu reputación\n• Accede a herramientas de IA\n\n🤖 **Con Gow (yo), tienes:**\n• Asistencia 24/7\n• Recomendaciones personalizadas\n• Análisis de mercado\n• Optimización automática\n\n¿Te gustaría saber más sobre algún aspecto específico?",
      confidence: 92,
      suggestions: ["Crear mi perfil", "Buscar mi primer proyecto", "Conocer las tarifas"],
    }
  }

  // Respuesta general para otras consultas
  return {
    text: `Entiendo tu consulta sobre "${message}". Como asistente de GoWork, puedo ayudarte con:\n\n🔍 **Búsqueda de servicios** - Encuentra el talento perfecto\n👤 **Optimización de perfil** - Mejora tu presencia\n💰 **Análisis de precios** - Conoce el mercado\n🚀 **Oportunidades** - Descubre nuevos proyectos\n📊 **Estadísticas** - Analiza tu rendimiento\n\n¿Podrías ser más específico sobre lo que necesitas? Estoy aquí para ayudarte a tener éxito en GoWork.`,
    confidence: 75,
    suggestions: ["¿Cómo empezar?", "Buscar servicios", "Crear mi perfil"],
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Gow AI Assistant está funcionando correctamente",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  })
}
