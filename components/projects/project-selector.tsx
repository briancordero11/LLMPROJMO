"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PROJECTS = [
  { id: "project-alpha", name: "Project Alpha" },
  { id: "project-beta", name: "Project Beta" },
  { id: "project-gamma", name: "Project Gamma" },
  { id: "all-projects", name: "All Projects" },
]

export function ProjectSelector() {
  const [selectedProject, setSelectedProject] = React.useState("all-projects")

  return (
    <Select value={selectedProject} onValueChange={setSelectedProject}>
      <SelectTrigger className="w-[180px] bg-transparent border-neutral-800 text-white">
        <SelectValue placeholder="Select Project" />
      </SelectTrigger>
      <SelectContent>
        {PROJECTS.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

