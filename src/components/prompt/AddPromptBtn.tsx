import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { $currentPromptSet } from '@/stores/currentPromptSet';
import { $promptListCollapsed } from '@/stores/promptListCollapsed';
import dayjs from 'dayjs';
import { PlusIcon } from 'lucide-react';

type AddPromptBtnProps = {
  id?: string;
  className?: string;
  prompt?: string;
  cursorStart?: number;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function AddPromptBtn({
  id,
  className,
  prompt = '',
  cursorStart = -1,
  children,
  onClick,
}: Readonly<AddPromptBtnProps>) {
  const handleClick = () => {
    const { createdAt, lastSavedAt, title, prompts } = $currentPromptSet.get();
    $currentPromptSet.set({
      createdAt: createdAt || dayjs().valueOf(),
      lastSavedAt: lastSavedAt || 0,
      title,
      prompts: [...prompts, { createdAt: dayjs().valueOf(), prompt }],
    });

    onClick && onClick();

    if (cursorStart !== -1) {
      $promptListCollapsed.set(false);
      const id = $currentPromptSet.get().prompts.at(-1)?.createdAt.toString();
      if (!id) return;

      setTimeout(() => {
        const textarea = document.getElementById(id) as HTMLTextAreaElement;
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(cursorStart, cursorStart);
          textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <Button
      id={id}
      className={cn('h-9 w-9', className)}
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
    >
      {children || <PlusIcon className="w-4" />}
    </Button>
  );
}
