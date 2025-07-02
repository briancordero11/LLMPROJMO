"use client"

import { useState } from "react"
import type { MessageType } from "@/types/chat"
import { User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReportVisualization } from "@/components/reports/report-visualization"

interface MessageProps {
  message: MessageType
}

export function Message({ message }: MessageProps) {
  const [showRawData, setShowRawData] = useState(false)

  const isUser = message.role === "user"
  const hasReport = message.role === "assistant" && message.report

  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-neutral-700" : "bg-blue-600"
        }`}
      >
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>

      <div className="space-y-2 flex-1">
        <div className="prose prose-invert max-w-none">
          <p className="text-sm text-neutral-200 whitespace-pre-wrap">{message.content}</p>
        </div>

        {hasReport && (
          <div className="mt-4">
            <ReportVisualization report={message.report} />
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowRawData(!showRawData)}>
                {showRawData ? "Hide Raw Data" : "Show Raw Data"}
              </Button>
              <Button variant="outline" size="sm">
                Export Report
              </Button>
            </div>

            {showRawData && (
              <pre className="mt-4 p-4 bg-neutral-900 rounded-md text-xs overflow-x-auto">
                {JSON.stringify(message.report, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

