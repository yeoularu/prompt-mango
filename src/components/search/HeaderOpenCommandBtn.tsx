import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { $commandOpen } from '@/stores/commandOpen';
import { SearchIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function HeaderOpenCommandBtn() {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        $commandOpen.set(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'relative rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:h-8 sm:w-full sm:justify-start sm:px-4 sm:pr-12 md:w-64'
      )}
      onClick={() => $commandOpen.set(true)}
    >
      <SearchIcon className="w-4 sm:mr-2" />
      <span className="hidden md:inline-flex">Search prompts...</span>
      <span className="hidden sm:inline-flex md:hidden">Search...</span>
      <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
