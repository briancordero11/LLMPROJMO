import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { code, data } = await req.json()

    // In a real implementation, you would execute the Python code
    // For demo purposes, we'll return mock data

    if (code.includes("generate_21day_lookahead")) {
      const projectId = data.projectId || "project-alpha"

      // Generate mock data based on project ID
      const mockData = generateMockLookaheadReport(projectId)

      return NextResponse.json(mockData)
    }

    // Default response for other Python code
    return NextResponse.json({
      result: "Python code executed successfully",
      data: { mockOutput: "Sample output from Python execution" },
    })
  } catch (error) {
    console.error("Error executing Python code:", error)
    return NextResponse.json({ error: "Failed to execute Python code" }, { status: 500 })
  }
}

// Mock function to generate sample report data
function generateMockLookaheadReport(projectId: string) {
  const today = new Date()
  const data = []
  const milestones = []

  // Generate resource allocation data
  for (let i = 0; i < 21; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`

    // Different patterns based on project ID
    let dev, design, qa

    if (projectId === "project-alpha") {
      dev = Math.floor(Math.random() * 3) + 4 // 4-6
      design = Math.floor(Math.random() * 2) + 2 // 2-3
      qa = Math.floor(Math.random() * 2) + 1 // 1-2
    } else if (projectId === "project-beta") {
      dev = Math.floor(Math.random() * 3) + 2 // 2-4
      design = Math.floor(Math.random() * 2) + 3 // 3-4
      qa = Math.floor(Math.random() * 3) + 2 // 2-4
    } else {
      dev = Math.floor(Math.random() * 5) + 3 // 3-7
      design = Math.floor(Math.random() * 3) + 1 // 1-3
      qa = Math.floor(Math.random() * 2) + 1 // 1-2
    }

    data.push({
      date: dateStr,
      dev,
      design,
      qa,
    })
  }

  // Generate milestones based on project
  if (projectId === "project-alpha") {
    milestones.push(
      {
        title: "Design Review",
        date: "April 10, 2025",
        description: "Final review of UI/UX designs with stakeholders",
        priority: "medium",
      },
      {
        title: "Beta Release",
        date: "April 15, 2025",
        description: "Release beta version to test group",
        priority: "high",
      },
      {
        title: "QA Testing Cycle",
        date: "April 18, 2025",
        description: "Begin comprehensive QA testing",
        priority: "medium",
      },
    )
  } else if (projectId === "project-beta") {
    milestones.push(
      {
        title: "Architecture Review",
        date: "April 12, 2025",
        description: "Review system architecture with tech leads",
        priority: "high",
      },
      {
        title: "Integration Testing",
        date: "April 19, 2025",
        description: "Begin integration testing with external systems",
        priority: "medium",
      },
      {
        title: "Performance Testing",
        date: "April 24, 2025",
        description: "Conduct performance and load testing",
        priority: "low",
      },
    )
  } else {
    milestones.push(
      {
        title: "Requirements Gathering",
        date: "April 8, 2025",
        description: "Finalize requirements with stakeholders",
        priority: "high",
      },
      {
        title: "Initial Prototype",
        date: "April 16, 2025",
        description: "Complete initial prototype for review",
        priority: "medium",
      },
      {
        title: "Stakeholder Demo",
        date: "April 22, 2025",
        description: "Present progress to key stakeholders",
        priority: "high",
      },
    )
  }

  return {
    data,
    milestones,
    summary: `This 21-day lookahead report for ${projectId.replace("-", " ")} shows resource allocation across development, design, and QA teams. There are ${milestones.length} key milestones in the upcoming period, with the most critical being the ${milestones.find((m) => m.priority === "high")?.title || "upcoming release"}.`,
    metrics: {
      resourceUtilization: Math.floor(Math.random() * 20) + 75, // 75-95%
      riskLevel: Math.random() > 0.7 ? "High" : Math.random() > 0.4 ? "Medium" : "Low",
      onSchedule: Math.random() > 0.3,
      openIssues: Math.floor(Math.random() * 5) + 1, // 1-5 issues
    },
  }
}

