"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { PaperclipIcon, ArrowUpIcon } from "lucide-react"
import { ModelSelector } from "@/components/models/model-selector"
import { useChat } from "@/context/chat-context"
import { useModels } from "@/context/models-context"

export function MessageComposer() {
  const [message, setMessage] = useState("")
  const { sendMessage, isLoading } = useChat()
  const { selectedModel } = useModels()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    sendMessage(message)
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
      <form onSubmit={handleSubmit}>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your projects or generate a 21-day lookahead report..."
          className="w-full px-4 py-3 resize-none bg-transparent border-none text-white text-sm focus:outline-none min-h-[60px]"
          style={{ overflow: "hidden" }}
          disabled={isLoading}
        />

        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <button type="button" className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <PaperclipIcon className="w-4 h-4 text-white" />
            </button>
            <ModelSelector />
          </div>
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className={`px-3 py-2 rounded-lg text-sm transition-colors border flex items-center justify-between gap-1 ${
              message.trim() && !isLoading
                ? "bg-white text-black border-white hover:bg-gray-200"
                : "text-zinc-400 border-zinc-700"
            }`}
          >
            <ArrowUpIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

