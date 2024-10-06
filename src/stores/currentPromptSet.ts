import type { PromptSet } from '@/types/promptSet';
import { persistentAtom } from '@nanostores/persistent';
import dayjs from 'dayjs';
import { computed } from 'nanostores';

export const $currentPromptSet = persistentAtom<PromptSet>(
  '$currentPromptSet',
  {
    createdAt: dayjs().valueOf(),
    lastSavedAt: 0,
    title: '',
    prompts: [{ createdAt: dayjs().valueOf(), prompt: '' }],
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const $currentPromptSetTitle = computed(
  $currentPromptSet,
  ({ title }) => title
);

export const $currentPromptsCreatedAt = computed(
  $currentPromptSet,
  ({ prompts }) => prompts.map(({ createdAt }) => createdAt)
);

export const $currentPromptSetCreatedAt = computed(
  $currentPromptSet,
  ({ createdAt }) => createdAt
);
