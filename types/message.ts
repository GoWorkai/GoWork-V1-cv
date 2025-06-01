export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  attachments?: {
    url: string
    type: "image" | "document" | "audio"
    name: string
    size?: number
  }[]
  readAt?: string
  createdAt: string
}

export interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    avatar?: string
    lastSeen?: string
    isOnline?: boolean
  }[]
  lastMessage?: {
    content: string
    senderId: string
    createdAt: string
    readAt?: string
  }
  unreadCount: number
  serviceId?: string
  serviceName?: string
  createdAt: string
  updatedAt: string
}

export interface CreateMessageRequest {
  conversationId: string
  content: string
  attachments?: File[]
}

export interface CreateConversationRequest {
  participantId: string
  serviceId?: string
  initialMessage: string
}
