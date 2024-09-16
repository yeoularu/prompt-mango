import { persistentAtom } from '@nanostores/persistent'

export const $promptListCollapsed = persistentAtom<boolean>(
  '$promptListCollapsed',
  false,
  {
    encode: (v) => v.toString(),
    decode: (v) => v === 'true'
  }
)
