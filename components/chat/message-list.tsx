"use client"

import { useEffect, useRef } from "react"
import { useChat } from "@/context/chat-context"
import { Message } from "@/components/chat/message"
import { Skeleton } from "@/components/ui/skeleton"

export function MessageList() {
  const { messages, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="space-y-6 px-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Business LLM Platform</h2>
          <p className="text-neutral-400 max-w-md">
            Ask questions about your projects or generate reports like "Create a 21-day lookahead report for Project
            Alpha"
          </p>
        </div>
      ) : (
        messages.map((message, index) => <Message key={index} message={message} />)
      )}

      {isLoading && (
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-white">AI</span>
          </div>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/4 bg-neutral-800" />
            <Skeleton className="h-4 w-3/4 bg-neutral-800" />
            <Skeleton className="h-4 w-2/4 bg-neutral-800" />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

