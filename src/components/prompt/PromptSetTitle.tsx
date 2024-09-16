import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import {
  $currentPromptSet,
  $currentPromptSetCreatedAt,
  $currentPromptSetTitle,
} from '@/stores/currentPromptSet';
import { useStore } from '@nanostores/react';
import { useState } from 'react';

export default function PromptSetTitle() {
  const ca = useStore($currentPromptSetCreatedAt);
  const title = useStore($currentPromptSetTitle);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div key={ca} className="relative mx-4 h-9 w-full text-center">
      <Input
        className="w-full border-none text-center shadow-none placeholder:text-foreground/30 focus-visible:ring-0 focus-visible:placeholder:text-transparent"
        placeholder="Untitled"
        value={title}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          const newTitle = e.target.value;
          $currentPromptSet.set({
            ...$currentPromptSet.get(),
            title: newTitle,
          });
        }}
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-0 mx-auto h-9 w-fit min-w-24 max-w-full overflow-hidden rounded-md px-3 py-1 text-center text-sm text-transparent',
          isFocused && 'bg-primary/10'
        )}
      >
        {title}
      </span>
    </div>
  );
}
