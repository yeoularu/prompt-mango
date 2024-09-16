import { Button } from '../ui/button';
import { $currentPromptSet } from '@/stores/currentPromptSet';
import { Trash2Icon } from 'lucide-react';

export default function RemovePromptBtn({
  createdAt,
}: Readonly<{ createdAt: number }>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const currentPromptSet = $currentPromptSet.get();
        $currentPromptSet.set({
          ...currentPromptSet,
          prompts: currentPromptSet.prompts.filter(
            (p) => p.createdAt !== createdAt
          ),
        });
      }}
    >
      <Trash2Icon className="w-4 text-destructive" />
    </Button>
  );
}
