import { Button } from '../ui/button';
import Prompt from './Prompt';
import {
  $currentPromptsCreateAt,
  $currentPromptSetCreatedAt,
} from '@/stores/currentPromptSet';
import { $isPromptListInView } from '@/stores/observers';
import { $promptListCollapsed } from '@/stores/promptListCollapsed';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useStore } from '@nanostores/react';
import { useImpressionRef } from '@toss/impression-area';

export default function PromptList() {
  const ca = useStore($currentPromptSetCreatedAt);
  const createdAtArr = useStore($currentPromptsCreateAt);
  const isCollapsed = useStore($promptListCollapsed);

  const [parent] = useAutoAnimate();

  const impressionRef = useImpressionRef({
    onImpressionStart: () => {
      $isPromptListInView.set(true);
    },
    onImpressionEnd: () => {
      $isPromptListInView.set(false);
    },
  });

  const MAX = 3;

  const visiblePrompts = isCollapsed
    ? createdAtArr.slice(0, MAX)
    : createdAtArr;

  return (
    <div ref={impressionRef}>
      <section key={ca} ref={parent} className="flex w-full flex-col gap-2">
        {visiblePrompts.map((c) => (
          <Prompt key={c} createdAt={c} />
        ))}

        {isCollapsed && createdAtArr.length > MAX && (
          <Button
            className="w-full text-primary hover:text-primary"
            onClick={() => $promptListCollapsed.set(false)}
            variant="ghost"
          >
            Show {createdAtArr.length - MAX} more
          </Button>
        )}
      </section>
    </div>
  );
}
