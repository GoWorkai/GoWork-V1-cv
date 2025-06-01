"use client"

import { useState } from "react"
import { Inbox } from "@/components/messaging/inbox"
import { Chat } from "@/components/messaging/chat"
import { EmptyState } from "@/components/messaging/empty-state"
import type { Conversation } from "@/types/message"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)

  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
        <div className="md:col-span-1">
          <Inbox onSelectConversation={setSelectedConversation} selectedConversationId={selectedConversation?.id} />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          {selectedConversation ? <Chat conversation={selectedConversation} /> : <EmptyState />}
        </div>
      </div>
    </div>
  )
}
