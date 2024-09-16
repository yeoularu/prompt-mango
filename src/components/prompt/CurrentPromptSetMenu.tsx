import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { $currentPromptSet } from '@/stores/currentPromptSet';
import { EllipsisVerticalIcon, Trash2Icon } from 'lucide-react';

export default function CurrentPromptSetMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon className="w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-fit pr-2">
        <DropdownMenuItem
          className="gap-2 text-destructive focus:text-destructive"
          onClick={() =>
            $currentPromptSet.set({
              ...$currentPromptSet.get(),
              lastSavedAt: 0,
              title: '',
              prompts: [],
            })
          }
        >
          <Trash2Icon className="w-4" />
          Clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
