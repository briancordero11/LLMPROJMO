"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReportProps {
  report: any
}

export function ReportVisualization({ report }: ReportProps) {
  const [activeTab, setActiveTab] = useState("chart")

  // Sample data for visualization
  const data = report?.data || generateSampleData()

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">21-Day Lookahead Report</CardTitle>
        <CardDescription>Resource allocation and key milestones for the next 21 days</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-800">
            <TabsTrigger value="chart">Resource Chart</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="mt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#222", borderColor: "#444" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="dev" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="design" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="qa" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="mt-4">
            <div className="space-y-4">
              {(report?.milestones || generateSampleMilestones()).map((milestone: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-md bg-neutral-800">
                  <div className={`w-3 h-3 rounded-full mt-1 ${getPriorityColor(milestone.priority)}`} />
                  <div>
                    <h4 className="text-sm font-medium text-white">{milestone.title}</h4>
                    <p className="text-xs text-neutral-400">{milestone.date}</p>
                    <p className="text-xs text-neutral-300 mt-1">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="mt-4">
            <div className="space-y-4 text-sm text-neutral-300">
              <p>
                {report?.summary ||
                  "This 21-day lookahead report shows resource allocation across development, design, and QA teams. There are 5 key milestones in the upcoming period, with the most critical being the Beta Release scheduled for April 15th."}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-neutral-800 p-3 rounded-md">
                  <h4 className="text-xs font-medium text-neutral-400">Resource Utilization</h4>
                  <p className="text-lg font-bold text-white">87%</p>
                </div>
                <div className="bg-neutral-800 p-3 rounded-md">
                  <h4 className="text-xs font-medium text-neutral-400">Risk Level</h4>
                  <p className="text-lg font-bold text-yellow-500">Medium</p>
                </div>
                <div className="bg-neutral-800 p-3 rounded-md">
                  <h4 className="text-xs font-medium text-neutral-400">On Schedule</h4>
                  <p className="text-lg font-bold text-green-500">Yes</p>
                </div>
                <div className="bg-neutral-800 p-3 rounded-md">
                  <h4 className="text-xs font-medium text-neutral-400">Open Issues</h4>
                  <p className="text-lg font-bold text-white">3</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Helper functions
function generateSampleData() {
  const data = []
  const today = new Date()

  for (let i = 0; i < 21; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      dev: Math.floor(Math.random() * 5) + 3,
      design: Math.floor(Math.random() * 3) + 1,
      qa: Math.floor(Math.random() * 2) + 1,
    })
  }

  return data
}

function generateSampleMilestones() {
  return [
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
    {
      title: "Performance Optimization",
      date: "April 22, 2025",
      description: "Optimize application performance",
      priority: "low",
    },
    {
      title: "Stakeholder Demo",
      date: "April 25, 2025",
      description: "Present progress to key stakeholders",
      priority: "high",
    },
  ]
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-blue-500"
  }
}

