import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"
import { retrieveRelevantDocuments } from "@/lib/rag"
import { executePythonCode } from "@/lib/python-executor"

export async function POST(req: NextRequest) {
  try {
    const { messages, projectId } = await req.json()

    // Get the latest message
    const latestMessage = messages[messages.length - 1].content

    // Retrieve relevant documents using RAG
    const relevantDocs = await retrieveRelevantDocuments(messages, { projectId: projectId || "all-projects" })

    // Generate context from relevant documents
    const context =
      relevantDocs.length > 0 ? `Relevant information: ${relevantDocs.map((doc: any) => doc.content).join("\n\n")}` : ""

    // Check if this is a request for a 21-day lookahead report
    const isReportRequest =
      latestMessage.toLowerCase().includes("lookahead") || latestMessage.toLowerCase().includes("report")

    // Generate response from AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: latestMessage,
      system: `You are an AI assistant for a business that helps generate reports and answer questions about projects.
              ${context}`,
    })

    // If this is a report request, execute Python code to generate the report
    let report = null
    if (isReportRequest) {
      // Extract project name from the request if available
      const projectMatch = latestMessage.match(/project\s+(\w+)/i)
      const projectId = projectMatch ? projectMatch[1].toLowerCase() : "alpha"

      // Execute Python code to generate report
      report = await executePythonCode(`generate_21day_lookahead("project-${projectId}")`, { projectId })
    }

    return NextResponse.json({
      role: "assistant",
      content: text,
      report,
    })
  } catch (error) {
    console.error("Error in chat route:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

