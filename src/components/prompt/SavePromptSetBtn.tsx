import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { $currentPromptSet } from '@/stores/currentPromptSet';
import { $promptSetStorage } from '@/stores/promptSetStorage';
import dayjs from 'dayjs';
import { SquareArrowDownIcon } from 'lucide-react';
import { useState } from 'react';

export default function SavePromptSetBtn() {
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = () => {
    const cur = $currentPromptSet.get();

    $promptSetStorage.set([
      { ...$currentPromptSet.get(), lastSavedAt: dayjs().valueOf() },
      ...$promptSetStorage.get().filter(({ title, prompts }) => {
        const stringifiedPrompts = prompts
          .map(({ prompt }) => prompt)
          .join('\n\n');
        return (
          title + stringifiedPrompts !==
          cur.title + cur.prompts.map(({ prompt }) => prompt).join('\n\n')
        );
      }),
    ]);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('h-12 w-12 rounded-full', isSaved && 'pointer-events-none')}
      onClick={handleClick}
    >
      <SquareArrowDownIcon className={cn('w-6', isSaved && 'text-green-500')} />
    </Button>
  );
}
