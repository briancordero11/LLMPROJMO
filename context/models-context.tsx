"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { Sparkles, Zap, Brain } from "lucide-react"

export interface Model {
  id: string
  name: string
  description: string
  icon?: React.ReactNode
}

interface ModelsContextType {
  models: Model[]
  selectedModel: Model
  selectModel: (id: string) => void
}

const AVAILABLE_MODELS: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Most capable model for complex tasks",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5",
    description: "Fast model for general tasks",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3",
    description: "Specialized for business analysis",
    icon: <Brain className="w-4 h-4" />,
  },
]

const ModelsContext = createContext<ModelsContextType>({
  models: AVAILABLE_MODELS,
  selectedModel: AVAILABLE_MODELS[0],
  selectModel: () => {},
})

export const useModels = () => useContext(ModelsContext)

export function ModelsProvider({ children }: { children: React.ReactNode }) {
  const [selectedModelId, setSelectedModelId] = useState(AVAILABLE_MODELS[0].id)

  const selectModel = (id: string) => {
    setSelectedModelId(id)
  }

  const selectedModel = AVAILABLE_MODELS.find((model) => model.id === selectedModelId) || AVAILABLE_MODELS[0]

  return (
    <ModelsContext.Provider
      value={{
        models: AVAILABLE_MODELS,
        selectedModel,
        selectModel,
      }}
    >
      {children}
    </ModelsContext.Provider>
  )
}

