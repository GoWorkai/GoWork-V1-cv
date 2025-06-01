import type { Conversation, CreateConversationRequest, CreateMessageRequest, Message } from "@/types/message"

export class MessagingService {
  // Obtener todas las conversaciones del usuario actual
  static async getConversations(): Promise<Conversation[]> {
    try {
      // En un entorno real, esto se conectaría a Supabase
      // Simulamos datos para la demo
      return [
        {
          id: "conv-1",
          participants: [
            {
              id: "user-2",
              name: "María González",
              avatar: "/placeholder.svg?height=40&width=40&text=MG",
              lastSeen: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
              isOnline: false,
            },
          ],
          lastMessage: {
            content: "¿Cuándo podrías venir a revisar la instalación?",
            senderId: "user-2",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          },
          unreadCount: 2,
          serviceId: "serv-1",
          serviceName: "Instalación eléctrica",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: "conv-2",
          participants: [
            {
              id: "user-3",
              name: "Carlos Pérez",
              avatar: "/placeholder.svg?height=40&width=40&text=CP",
              lastSeen: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
              isOnline: true,
            },
          ],
          lastMessage: {
            content: "Gracias por tu servicio, fue excelente",
            senderId: "user-3",
            createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
            readAt: new Date(Date.now() - 1000 * 60 * 115).toISOString(),
          },
          unreadCount: 0,
          serviceId: "serv-2",
          serviceName: "Diseño de logo",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
        {
          id: "conv-3",
          participants: [
            {
              id: "user-4",
              name: "Ana Silva",
              avatar: "/placeholder.svg?height=40&width=40&text=AS",
              lastSeen: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
              isOnline: true,
            },
          ],
          lastMessage: {
            content: "¿Podrías enviarme un presupuesto para el proyecto?",
            senderId: "current-user",
            createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
          },
          unreadCount: 0,
          serviceId: "serv-3",
          serviceName: "Desarrollo web",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        },
      ]
    } catch (error) {
      console.error("Error al obtener conversaciones:", error)
      throw error
    }
  }

  // Obtener mensajes de una conversación
  static async getMessages(conversationId: string): Promise<Message[]> {
    try {
      // En un entorno real, esto se conectaría a Supabase
      // Simulamos datos para la demo
      const currentTime = Date.now()
      const day = 24 * 60 * 60 * 1000

      if (conversationId === "conv-1") {
        return [
          {
            id: "msg-1",
            conversationId,
            senderId: "current-user",
            content: "Hola, estoy interesado en tu servicio de instalación eléctrica",
            createdAt: new Date(currentTime - day).toISOString(),
          },
          {
            id: "msg-2",
            conversationId,
            senderId: "user-2",
            content: "¡Hola! Claro, puedo ayudarte con eso. ¿Qué tipo de instalación necesitas?",
            createdAt: new Date(currentTime - day + 1000 * 60 * 5).toISOString(),
          },
          {
            id: "msg-3",
            conversationId,
            senderId: "current-user",
            content: "Necesito instalar luces en mi jardín y revisar el sistema eléctrico de mi casa",
            createdAt: new Date(currentTime - day + 1000 * 60 * 10).toISOString(),
          },
          {
            id: "msg-4",
            conversationId,
            senderId: "user-2",
            content: "Perfecto, puedo hacer ambas cosas. ¿Cuándo te gustaría que fuera a ver el trabajo?",
            createdAt: new Date(currentTime - day + 1000 * 60 * 15).toISOString(),
          },
          {
            id: "msg-5",
            conversationId,
            senderId: "current-user",
            content: "¿Podrías este fin de semana?",
            createdAt: new Date(currentTime - day + 1000 * 60 * 20).toISOString(),
          },
          {
            id: "msg-6",
            conversationId,
            senderId: "user-2",
            content: "Sí, tengo disponibilidad el sábado por la mañana. ¿Te parece bien a las 10?",
            createdAt: new Date(currentTime - 1000 * 60 * 60).toISOString(),
          },
          {
            id: "msg-7",
            conversationId,
            senderId: "user-2",
            content: "¿Cuándo podrías venir a revisar la instalación?",
            createdAt: new Date(currentTime - 1000 * 60 * 30).toISOString(),
          },
        ]
      } else if (conversationId === "conv-2") {
        return [
          {
            id: "msg-8",
            conversationId,
            senderId: "user-3",
            content: "Hola, acabo de ver tu perfil y me interesa tu servicio de diseño",
            createdAt: new Date(currentTime - 3 * day).toISOString(),
          },
          {
            id: "msg-9",
            conversationId,
            senderId: "current-user",
            content: "¡Hola Carlos! Gracias por contactarme. ¿Qué tipo de diseño necesitas?",
            createdAt: new Date(currentTime - 3 * day + 1000 * 60 * 10).toISOString(),
          },
          {
            id: "msg-10",
            conversationId,
            senderId: "user-3",
            content: "Necesito un logo para mi nueva empresa de productos orgánicos",
            createdAt: new Date(currentTime - 3 * day + 1000 * 60 * 20).toISOString(),
          },
          {
            id: "msg-11",
            conversationId,
            senderId: "current-user",
            content: "Perfecto, puedo ayudarte con eso. ¿Tienes alguna idea o referencia de lo que buscas?",
            createdAt: new Date(currentTime - 2 * day).toISOString(),
          },
          {
            id: "msg-12",
            conversationId,
            senderId: "user-3",
            content: "Me gustaría algo minimalista y que represente la naturaleza",
            createdAt: new Date(currentTime - 2 * day + 1000 * 60 * 30).toISOString(),
          },
          {
            id: "msg-13",
            conversationId,
            senderId: "current-user",
            content: "Entiendo, trabajaré en algunas propuestas y te las enviaré en unos días",
            createdAt: new Date(currentTime - 2 * day + 1000 * 60 * 40).toISOString(),
          },
          {
            id: "msg-14",
            conversationId,
            senderId: "user-3",
            content: "Gracias por tu servicio, fue excelente",
            createdAt: new Date(currentTime - 1000 * 60 * 120).toISOString(),
            readAt: new Date(currentTime - 1000 * 60 * 115).toISOString(),
          },
        ]
      } else {
        return [
          {
            id: "msg-15",
            conversationId,
            senderId: "user-4",
            content: "Hola, vi que ofreces servicios de desarrollo web",
            createdAt: new Date(currentTime - 2 * day).toISOString(),
          },
          {
            id: "msg-16",
            conversationId,
            senderId: "current-user",
            content: "¡Hola Ana! Sí, ofrezco desarrollo web completo. ¿En qué puedo ayudarte?",
            createdAt: new Date(currentTime - 2 * day + 1000 * 60 * 5).toISOString(),
          },
          {
            id: "msg-17",
            conversationId,
            senderId: "user-4",
            content: "Necesito una página web para mi negocio de consultoría",
            createdAt: new Date(currentTime - 2 * day + 1000 * 60 * 15).toISOString(),
          },
          {
            id: "msg-18",
            conversationId,
            senderId: "current-user",
            content: "Claro, puedo ayudarte con eso. ¿Tienes alguna idea de las secciones que necesitas?",
            createdAt: new Date(currentTime - 2 * day + 1000 * 60 * 25).toISOString(),
          },
          {
            id: "msg-19",
            conversationId,
            senderId: "user-4",
            content: "Sí, necesito una página de inicio, servicios, sobre mí y contacto",
            createdAt: new Date(currentTime - 1 * day).toISOString(),
          },
          {
            id: "msg-20",
            conversationId,
            senderId: "current-user",
            content: "¿Podrías enviarme un presupuesto para el proyecto?",
            createdAt: new Date(currentTime - 1000 * 60 * 10).toISOString(),
          },
        ]
      }
    } catch (error) {
      console.error("Error al obtener mensajes:", error)
      throw error
    }
  }

  // Enviar un mensaje
  static async sendMessage(messageData: CreateMessageRequest): Promise<Message> {
    try {
      // En un entorno real, esto se conectaría a Supabase
      // Simulamos el envío para la demo
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId: messageData.conversationId,
        senderId: "current-user",
        content: messageData.content,
        createdAt: new Date().toISOString(),
      }

      // Aquí se enviaría a la base de datos
      console.log("Mensaje enviado:", newMessage)

      return newMessage
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
      throw error
    }
  }

  // Crear una nueva conversación
  static async createConversation(data: CreateConversationRequest): Promise<Conversation> {
    try {
      // En un entorno real, esto se conectaría a Supabase
      // Simulamos la creación para la demo
      const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        participants: [
          {
            id: data.participantId,
            name: "Nuevo Contacto",
            avatar: "/placeholder.svg?height=40&width=40&text=NC",
            isOnline: false,
          },
        ],
        lastMessage: {
          content: data.initialMessage,
          senderId: "current-user",
          createdAt: new Date().toISOString(),
        },
        unreadCount: 0,
        serviceId: data.serviceId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Aquí se enviaría a la base de datos
      console.log("Conversación creada:", newConversation)

      return newConversation
    } catch (error) {
      console.error("Error al crear conversación:", error)
      throw error
    }
  }

  // Marcar mensajes como leídos
  static async markAsRead(conversationId: string): Promise<void> {
    try {
      // En un entorno real, esto se conectaría a Supabase
      console.log(`Marcando mensajes como leídos para la conversación: ${conversationId}`)
    } catch (error) {
      console.error("Error al marcar mensajes como leídos:", error)
      throw error
    }
  }

  // Eliminar una conversación
  static async deleteConversation(conversationId: string): Promise<void> {
    try {
      // En un entorno real, esto se conectaría a Supabase
      console.log(`Eliminando conversación: ${conversationId}`)
    } catch (error) {
      console.error("Error al eliminar conversación:", error)
      throw error
    }
  }
}
