"use client"

import { SunMedium, LogOut, Settings, BarChart3, Code, Users, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChat } from "@/context/chat-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { conversations, currentConversationId, createNewConversation, switchConversation } = useChat()
  const router = useRouter()

  const handleMotoPilot = () => {
    createNewConversation("MotoPilot")
  }

  const handleLogout = () => {
    router.push("/logout")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  return (
    <div
      className={cn(
        "h-screen bg-indigo-950/90 backdrop-blur-sm border-r border-indigo-900 transition-all duration-300 ease-in-out flex flex-col",
        isOpen ? "w-72" : "w-0",
      )}
    >
      {isOpen && (
        <>
          <div className="p-4 border-b border-indigo-900">
            <h2 className="text-lg font-semibold text-white">Chat History</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-3 space-y-2">
              <button
                onClick={handleMotoPilot}
                className="w-full flex items-center gap-2 p-2 rounded-md bg-amber-600 hover:bg-amber-700 text-white transition-colors"
              >
                <SunMedium className="h-4 w-4" />
                <span>MotoPilot</span>
              </button>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-indigo-900/50 border-indigo-800 text-white hover:bg-indigo-800"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Generate Graph</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-indigo-900/50 border-indigo-800 text-white hover:bg-indigo-800"
                >
                  <Code className="h-4 w-4" />
                  <span>Implement</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-indigo-900/50 border-indigo-800 text-white hover:bg-indigo-800"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Assign</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-indigo-900/50 border-indigo-800 text-white hover:bg-indigo-800"
                >
                  <Users className="h-4 w-4" />
                  <span>Group</span>
                </Button>
              </div>
            </div>

            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-indigo-300 uppercase tracking-wider mb-2">
                Recent Conversations
              </h3>
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg mb-1 flex items-start group hover:bg-indigo-900/50 transition-colors",
                      currentConversationId === conversation.id ? "bg-indigo-900/70" : "",
                    )}
                    onClick={() => switchConversation(conversation.id)}
                  >
                    <SunMedium className="h-4 w-4 mt-1 mr-3 flex-shrink-0 text-amber-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{conversation.title}</p>
                      <p className="text-xs text-indigo-300">
                        {new Date(conversation.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="p-4 border-t border-indigo-900">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-indigo-900/50 transition-colors">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-indigo-300">john.doe@example.com</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-indigo-950 border-indigo-900 text-white">
                <DropdownMenuItem className="hover:bg-indigo-900 cursor-pointer" onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-indigo-900" />
                <DropdownMenuItem className="hover:bg-indigo-900 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  )
}

