import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { $currentPromptSet } from '@/stores/currentPromptSet';
import { $promptSetStorage } from '@/stores/promptSetStorage';
import { clipboard } from '@toss/utils';
import dayjs from 'dayjs';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CopyCurrentPromptsBtn() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    const cur = $currentPromptSet.get();
    const promptsArr = cur.prompts.map(({ prompt }) => prompt);
    const isEmpty = promptsArr.map((p) => p.trim()).join('').length === 0;

    if (isEmpty) {
      toast.error('Nothing to copy (ᵕ—ᴗ—)');
      return;
    }

    clipboard.writeText(promptsArr.join('\n\n')).then((isSuccess) => {
      if (!isSuccess) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });

    $promptSetStorage.set([
      { ...$currentPromptSet.get(), lastSavedAt: dayjs().valueOf() },
      ...$promptSetStorage.get().filter(({ title, prompts }) => {
        const stringifiedPrompts = prompts.map(({ prompt }) => prompt).join('');
        return (
          title + stringifiedPrompts !==
          cur.title + cur.prompts.map(({ prompt }) => prompt).join('')
        );
      }),
    ]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('h-12 w-12 rounded-full', copied && 'pointer-events-none')}
      onClick={handleClick}
    >
      {copied ? (
        <CheckIcon className="w-6 text-green-500" />
      ) : (
        <CopyIcon className="w-6" />
      )}
    </Button>
  );
}
