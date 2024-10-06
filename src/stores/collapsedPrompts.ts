import { atom } from 'nanostores';
import { $currentPromptSet } from './currentPromptSet';

export const $collapsedPromptsCreatedAt = atom<number[]>([]);

export const collapseAllPrompts = () =>
  $collapsedPromptsCreatedAt.set(
    $currentPromptSet.get().prompts.map((p) => p.createdAt)
  );
