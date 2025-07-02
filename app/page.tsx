"use client"

import { useState } from "react"
import { MessageComposer } from "@/components/chat/message-composer"
import { MessageList } from "@/components/chat/message-list"
import { ChatProvider } from "@/context/chat-context"
import { ModelsProvider } from "@/context/models-context"
import { ProjectSelector } from "@/components/projects/project-selector"
import { Sidebar } from "@/components/layout/sidebar"
import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <ModelsProvider>
      <ChatProvider>
        <div className="flex h-screen bg-neutral-950">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="border-b border-neutral-800 p-4">
              <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="text-white hover:bg-neutral-800"
                  >
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                  <h1 className="text-xl font-semibold text-white">Business LLM Platform</h1>
                </div>
                <ProjectSelector />
              </div>
            </header>

            <main className="flex-1 overflow-hidden container mx-auto flex flex-col">
              <div className="flex-1 overflow-y-auto py-6">
                <MessageList />
              </div>
              <div className="py-4">
                <MessageComposer />
              </div>
            </main>
          </div>
        </div>
      </ChatProvider>
    </ModelsProvider>
  )
}

