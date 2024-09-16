import CopyCurrentPromptsBtn from './prompt/CopyCurrentPromptsBtn';
import SavePromptSetBtn from './prompt/SavePromptSetBtn';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { $commandOpen } from '@/stores/commandOpen';
import {
  $isCenterSearchBtnInView,
  $isPromptListInView,
} from '@/stores/observers';
import { useStore } from '@nanostores/react';
import { SearchIcon } from 'lucide-react';

export default function BottomRiseUpSection() {
  const isPromptListInView = useStore($isPromptListInView);
  const isCenterSearchBtnInView = useStore($isCenterSearchBtnInView);

  const isVisible = isPromptListInView && !isCenterSearchBtnInView;

  return (
    <section
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto flex w-fit translate-y-24 justify-center gap-4 rounded-full border bg-background p-2 transition-transform duration-300',
        isVisible && 'pointer-events-auto -translate-y-2'
      )}
    >
      <SavePromptSetBtn />

      <Button
        className="h-12 w-12 rounded-full p-0 text-background"
        onClick={() => $commandOpen.set(true)}
      >
        <SearchIcon className="w-5" />
      </Button>

      <CopyCurrentPromptsBtn />
    </section>
  );
}
