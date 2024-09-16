import type { PromptSet } from '@/types/promptSet'
import { persistentAtom } from '@nanostores/persistent'

export const $promptSetStorage = persistentAtom<PromptSet[]>(
  '$promptSetStorage',
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
)
