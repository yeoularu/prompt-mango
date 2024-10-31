import AddPromptBtn from '../prompt/AddPromptBtn';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { data, exceptionStr } from '@/data/data';
import { cn } from '@/lib/utils';
import { $commandOpen } from '@/stores/commandOpen';
import { $locale } from '@/stores/locale';
import { useStore } from '@nanostores/react';
import { Link, useRouter } from '@tanstack/react-router';
import { debounce } from 'es-toolkit';
import { PlusIcon } from 'lucide-react';
import { Fragment, useEffect } from 'react';

export function CommandMenu() {
  const open = useStore($commandOpen);
  const toggleOpen = () => {
    $commandOpen.set(!open);
  };

  const debouncedToggleOpen = debounce(toggleOpen, 100);

  const router = useRouter();

  const locale = useStore($locale);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        $commandOpen.set(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={toggleOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        className="caret-primary"
      />
      <CommandList className="max-h-[75dvh]">
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.keys(data).map((category) => (
          <CommandGroup key={category} heading={category}>
            {data[category].map(({ name, prompt, keywords }) => {
              const split = prompt[locale].split(exceptionStr);
              const joined = split.join('');
              const cursorStart = split[0].length;

              return (
                <Link to="/prompts/$category/$name" params={{ name, category }}>
                  <CommandItem
                    key={prompt.en}
                    keywords={keywords}
                    onSelect={() => {
                      const handleKeyDown = (e: KeyboardEvent) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                          document.getElementById(name)?.click();
                          router.navigate({ to: '/' });
                        } else if (e.key === 'Enter') {
                          router.navigate({
                            to: `/prompts/${category}/${name}`,
                            params: { category, name },
                          });
                        }

                        removeListeners();
                      };

                      const handleClickEnd = () => {
                        router.navigate({
                          to: `/prompts/${category}/${name}`,
                          params: { category, name },
                        });

                        removeListeners();
                      };

                      const removeListeners = () => {
                        document.removeEventListener('mouseup', handleClickEnd);
                        document.removeEventListener(
                          'touchend',
                          handleClickEnd
                        );
                        document.removeEventListener('keydown', handleKeyDown);
                      };

                      document.addEventListener('mouseup', handleClickEnd);
                      document.addEventListener('touchend', handleClickEnd);
                      document.addEventListener('keydown', handleKeyDown);

                      debouncedToggleOpen();
                    }}
                    className="group"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-mono">{name}</h3>
                      <p className="line-clamp-3 text-accent-foreground">
                        {split.map((part, i) => (
                          <Fragment key={part + i}>
                            {part}
                            {i % 2 === 0 && (
                              <span className="text-primary">│</span>
                            )}
                          </Fragment>
                        ))}
                      </p>
                    </div>
                    <AddPromptBtn
                      id={name}
                      prompt={joined}
                      cursorStart={cursorStart}
                      onClick={() => {
                        debouncedToggleOpen();
                        router.navigate({ to: '/' });
                      }}
                      className="absolute right-0 top-0 m-1 w-fit border-none bg-transparent px-2 hover:bg-foreground/10"
                    >
                      <kbd
                        className={cn(
                          'pointer-events-none hidden h-5 select-none items-center gap-1 px-1.5 font-mono',
                          'group-data-[selected="true"]:sm:flex'
                        )}
                      >
                        <span>⌘</span>
                        <span>⏎</span>
                      </kbd>
                      <PlusIcon className="w-4" />
                    </AddPromptBtn>
                  </CommandItem>
                </Link>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
