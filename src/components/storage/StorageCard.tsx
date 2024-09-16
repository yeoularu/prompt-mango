import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { $currentPromptSet } from '@/stores/currentPromptSet';
import { $promptSetStorage } from '@/stores/promptSetStorage';
import { $storageDeleteEnable } from '@/stores/storageDeleteEnable';
import type { PromptSet } from '@/types/promptSet';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useStore } from '@nanostores/react';
import { clipboard } from '@toss/utils';
import dayjs from 'dayjs';
import {
  CheckIcon,
  ChevronUpIcon,
  CopyIcon,
  SquareArrowUpIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function StorageCard({
  title,
  prompts,
  lastSavedAt,
}: Readonly<PromptSet>) {
  const isDeleteEnable = useStore($storageDeleteEnable);
  const [open, setOpen] = useState(false);
  const promptText = prompts.map(({ prompt }) => prompt);
  const lastSavedTime = dayjs(lastSavedAt);

  const [parent] = useAutoAnimate();

  const [copied, setCopied] = useState(false);
  const handleCopyBtnClick = () => {
    if (copied) return;

    const promptsArr = prompts.map(({ prompt }) => prompt);
    const isEmpty = promptsArr.map((p) => p.trim()).join('').length === 0;

    if (isEmpty) {
      toast.error('Nothing to copy (ᵕ—ᴗ—)');
      return;
    }

    clipboard.writeText(promptsArr.join('\n\n')).then((isSuccess) => {
      if (!isSuccess) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleEditBtnClick = () => {
    const cur = { ...$currentPromptSet.get() };
    const promptsArr = cur.prompts.map(({ prompt }) => prompt);
    const isEmpty = promptsArr.map((p) => p.trim()).join('').length === 0;

    $currentPromptSet.set({
      createdAt: dayjs().valueOf(),
      lastSavedAt: 0,
      title,
      prompts,
    });

    const filteredPrompts = $promptSetStorage
      .get()
      .filter(({ title, prompts }) => {
        const stringifiedPrompts = prompts
          .map(({ prompt }) => prompt)
          .join('\n\n');
        return (
          title + stringifiedPrompts !==
          cur.title + cur.prompts.map(({ prompt }) => prompt).join('\n\n')
        );
      });

    $promptSetStorage.set(
      isEmpty && !cur.title
        ? filteredPrompts
        : [{ ...cur, lastSavedAt: dayjs().valueOf() }, ...filteredPrompts]
    );

    setTimeout(
      () =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }),
      300
    );
  };

  const handleDeleteBtnClick = () => {
    $promptSetStorage.set(
      $promptSetStorage.get().filter((ps) => ps.lastSavedAt !== lastSavedAt)
    );
  };

  return (
    <div className="relative">
      <div className="absolute right-1 top-1 flex justify-end gap-2 text-muted-foreground">
        {open && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <ChevronUpIcon className="w-4" />
          </Button>
        )}
        {(!isDeleteEnable || open) && (
          <div className="group flex items-center gap-2 rounded-md hover:bg-background">
            <Button
              variant="ghost"
              size="icon"
              className={cn('invisible group-hover:visible', open && 'visible')}
              onClick={(e) => {
                e.stopPropagation();
                handleEditBtnClick();
              }}
            >
              <SquareArrowUpIcon className="w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyBtnClick();
              }}
            >
              {copied ? (
                <CheckIcon className="w-4 text-green-500" />
              ) : (
                <CopyIcon className="w-4" />
              )}
            </Button>
          </div>
        )}
        {isDeleteEnable && (
          <Button variant="ghost" size="icon" onClick={handleDeleteBtnClick}>
            <Trash2Icon className="w-4 text-destructive" />
          </Button>
        )}
      </div>

      <Card
        className={cn(
          'shadow-none transition-all duration-300',
          open ? 'py-2.5' : 'cursor-pointer hover:bg-accent'
        )}
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <div
            className={cn(
              'flex flex-col gap-1 leading-none tracking-tight text-muted-foreground/60',
              open && 'gap-2 text-muted-foreground/80'
            )}
          >
            {title ? (
              <CardTitle
                className={cn(
                  'line-clamp-1 whitespace-pre-wrap break-words text-card-foreground',
                  open && 'line-clamp-none leading-tight'
                )}
              >
                {title}
              </CardTitle>
            ) : (
              <CardTitle>Untitled</CardTitle>
            )}

            <span
              className={cn(
                'text-nowrap',
                open && 'duration-500 animate-in fade-in'
              )}
            >
              {open
                ? lastSavedTime.format('h:mm A • MMM D, YYYY')
                : lastSavedTime.format('• MMM D')}
            </span>
          </div>
        </CardHeader>
        <CardContent
          ref={parent}
          className={cn(
            'whitespace-pre-wrap break-words text-muted-foreground',
            open && 'text-card-foreground/80 duration-500 animate-in fade-in'
          )}
        >
          {!open && (
            <p className="line-clamp-2 h-full">{promptText.join(' • ')}</p>
          )}
          {open && promptText.join('\n\n')}
        </CardContent>
      </Card>
    </div>
  );
}
