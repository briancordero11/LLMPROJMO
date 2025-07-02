"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { MessageType } from "@/types/chat"
import { useModels } from "@/context/models-context"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { executePythonCode } from "@/lib/python-executor"
import { retrieveRelevantDocuments } from "@/lib/rag"
import { v4 as uuidv4 } from "uuid"

export interface ConversationType {
  id: string
  title: string
  createdAt: Date
  messages: MessageType[]
  type?: "Standard" | "MotoPilot"
}

interface ChatContextType {
  messages: MessageType[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  conversations: ConversationType[]
  currentConversationId: string | null
  createNewConversation: (type?: "Standard" | "MotoPilot") => string
  switchConversation: (id: string) => void
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  isLoading: false,
  sendMessage: async () => {},
  conversations: [],
  currentConversationId: null,
  createNewConversation: () => "",
  switchConversation: () => {},
})

export const useChat = () => useContext(ChatContext)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { selectedModel } = useModels()
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      // Add user message
      const userMessage: MessageType = {
        role: "user",
        content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        // Check if this is a request for a 21-day lookahead report
        const isReportRequest = content.toLowerCase().includes("lookahead") || content.toLowerCase().includes("report")

        // Get current conversation type
        const currentConversation = conversations.find((c) => c.id === currentConversationId)
        const isMotoPilot = currentConversation?.type === "MotoPilot"

        // Retrieve relevant documents using RAG
        const relevantDocs = await retrieveRelevantDocuments([...messages, userMessage], { projectId: "all-projects" })

        // Generate context from relevant documents
        const context =
          relevantDocs.length > 0 ? `Relevant information: ${relevantDocs.map((doc) => doc.content).join("\n\n")}` : ""

        // Generate response from AI
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: content,
          system: `You are an AI assistant for a business that helps generate reports and answer questions about projects.
                ${isMotoPilot ? "You are in MotoPilot mode, which means you should be more proactive and suggest actions." : ""}
                ${context}`,
        })

        // If this is a report request, execute Python code to generate the report
        let report = null
        if (isReportRequest) {
          // Extract project name from the request if available
          const projectMatch = content.match(/project\s+(\w+)/i)
          const projectId = projectMatch ? projectMatch[1].toLowerCase() : "alpha"

          // Execute Python code to generate report
          report = await executePythonCode(`generate_21day_lookahead("project-${projectId}")`, { projectId })
        }

        // Add assistant message
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: text,
            report: report,
            timestamp: new Date(),
          },
        ])
      } catch (error) {
        console.error("Error generating response:", error)

        // Add error message
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, I encountered an error while processing your request. Please try again.",
            timestamp: new Date(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, selectedModel, conversations, currentConversationId],
  )

  const createNewConversation = useCallback((type: "Standard" | "MotoPilot" = "Standard") => {
    const id = uuidv4()
    const newConversation: ConversationType = {
      id,
      title: type === "MotoPilot" ? "MotoPilot Session" : "New Conversation",
      createdAt: new Date(),
      messages: [],
      type,
    }

    setConversations((prev) => [newConversation, ...prev])
    setCurrentConversationId(id)
    setMessages([])

    return id
  }, [])

  const switchConversation = useCallback(
    (id: string) => {
      const conversation = conversations.find((c) => c.id === id)
      if (conversation) {
        setCurrentConversationId(id)
        setMessages(conversation.messages)
      }
    },
    [conversations],
  )

  // Initialize with a default conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation()
    }
  }, [conversations.length, createNewConversation])

  // Update conversation when messages change
  useEffect(() => {
    if (currentConversationId && messages.length > 0) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages,
                // Update title based on first user message if it's still the default
                title:
                  (conv.title === "New Conversation" || conv.title === "MotoPilot Session") &&
                  messages.length > 0 &&
                  messages[0].role === "user"
                    ? messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? "..." : "")
                    : conv.title,
              }
            : conv,
        ),
      )
    }
  }, [messages, currentConversationId])

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        conversations,
        currentConversationId,
        createNewConversation,
        switchConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

