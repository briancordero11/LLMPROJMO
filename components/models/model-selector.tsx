"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useModels } from "@/context/models-context"

export function ModelSelector() {
  const { models, selectedModel, selectModel } = useModels()

  return (
    <Select value={selectedModel.id} onValueChange={selectModel}>
      <SelectTrigger className="w-[180px] bg-transparent border-neutral-700 text-neutral-300">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <div className="flex items-center">
              {model.icon && <span className="mr-2">{model.icon}</span>}
              <span>{model.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

