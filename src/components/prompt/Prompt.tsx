import { Button } from '../ui/button';
import RemovePromptBtn from './RemovePromptBtn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { $currentPromptSet } from '@/stores/currentPromptSet';
import { $promptListCollapsed } from '@/stores/promptListCollapsed';
import { useStore } from '@nanostores/react';
import { debounce } from 'es-toolkit';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function Prompt({ createdAt }: Readonly<{ createdAt: number }>) {
  const isPromptListCollapsed = useStore($promptListCollapsed);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const isOverflown = textareaHeight > 64;

  useEffect(() => {
    if (isPromptListCollapsed) setCollapsed(true);
  }, [isPromptListCollapsed]);

  const debouncedSetCurrentPrompt = useMemo(
    () =>
      debounce((newPrompt: string) => {
        const cur = $currentPromptSet.get();
        $currentPromptSet.set({
          ...cur,
          prompts: cur.prompts.map((old) => ({
            ...old,
            prompt: old.createdAt === createdAt ? newPrompt : old.prompt,
          })),
        });
      }, 100),
    [createdAt]
  );

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;

    debouncedSetCurrentPrompt(v);
  };

  const getCurrentPrompts = () => $currentPromptSet.get().prompts;

  return (
    <div className="relative flex items-stretch">
      <div>
        <Button
          variant="ghost"
          disabled={!isOverflown}
          className="z-50 h-full w-5 items-start rounded-l-none p-0.5 text-primary hover:text-primary"
          onClick={() => setCollapsed((c) => !c)}
        >
          <div
            className={cn(
              'sticky top-[5.25rem]',
              (open || !isOverflown) && 'text-muted'
            )}
          >
            {collapsed ? (
              <ChevronsUpDownIcon className="w-4" />
            ) : (
              <ChevronsDownUpIcon className="w-4" />
            )}
          </div>
        </Button>
      </div>

      <TextareaAutosize
        id={createdAt.toString()}
        defaultValue={
          getCurrentPrompts().find(({ createdAt: c }) => c === createdAt)
            ?.prompt
        }
        onClick={() => {
          if (collapsed) setCollapsed(false);
        }}
        onChange={handleTextareaChange}
        onHeightChange={(height) => setTextareaHeight(height)}
        placeholder={
          getCurrentPrompts().findIndex(({ createdAt: c }) => c === createdAt)
            ? undefined
            : 'You are Socrates.'
        }
        className={cn(
          'peer mx-1 w-full resize-none self-center overflow-hidden rounded-lg border-none bg-background px-4 py-3 text-base caret-primary outline-none',
          'hover:bg-accent focus:bg-primary/[0.02] focus:outline-1 focus:outline-primary hover:dark:bg-accent/50 focus:dark:bg-accent/25',
          open && 'bg-destructive/5 dark:bg-destructive/10',
          collapsed && 'max-h-[4.25rem]'
        )}
      />

      <DropdownMenu open={open} onOpenChange={(o) => setOpen(o)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="sticky top-16 h-16 w-5 p-0.5">
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="left"
          className="z-10 ml-4 h-fit w-fit min-w-0 border-none bg-background p-0 shadow-none"
          onClick={() => setOpen((o) => !o)}
        >
          <RemovePromptBtn createdAt={createdAt} />
        </DropdownMenuContent>
      </DropdownMenu>

      <div
        className={cn(
          'absolute inset-y-0 w-px bg-primary peer-focus-visible:bg-muted',
          open && 'bg-muted'
        )}
      />

      {collapsed && isOverflown && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-8 items-end bg-gradient-to-b from-transparent to-background">
          <ChevronDownIcon className="mx-auto mt-auto h-4 w-4 rounded-full bg-background text-primary dark:bg-transparent" />
        </div>
      )}
    </div>
  );
}
