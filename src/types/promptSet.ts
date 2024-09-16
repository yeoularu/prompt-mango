export type PromptSet = {
  createdAt: number
  lastSavedAt: number
  title: string
  prompts: { createdAt: number; prompt: string }[]
}
