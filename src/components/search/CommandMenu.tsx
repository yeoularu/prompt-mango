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
import { $commandOpen } from '@/stores/commandOpen';
import { $locale } from '@/stores/locale';
import { useStore } from '@nanostores/react';
import { Link, useRouter } from '@tanstack/react-router';
import { Fragment, useEffect } from 'react';

export function CommandMenu() {
  const open = useStore($commandOpen);
  const toggleOpen = () => {
    $commandOpen.set(!open);
  };

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
                <Link to="/prompts/$category/$name" params={{ category, name }}>
                  <CommandItem
                    key={prompt.en}
                    keywords={keywords}
                    onSelect={() => {
                      router.navigate({
                        to: '/prompts/$category/$name',
                        params: { category, name },
                      });
                      toggleOpen();
                    }}
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
                      prompt={joined}
                      cursorStart={cursorStart}
                      onClick={toggleOpen}
                      className="absolute right-0 top-0 m-1 border-none bg-transparent hover:bg-foreground/10"
                    />
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
