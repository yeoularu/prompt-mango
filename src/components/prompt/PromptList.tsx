import { Button } from '../ui/button';
import Prompt from './Prompt';
import {
  $currentPromptsCreatedAt,
  $currentPromptSetCreatedAt,
} from '@/stores/currentPromptSet';
import { $isPromptListInView } from '@/stores/observers';
import { $promptListCollapsed } from '@/stores/promptListCollapsed';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useStore } from '@nanostores/react';
import { useImpressionRef } from '@toss/impression-area';

import { $currentPromptSet } from '@/stores/currentPromptSet';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

export default function PromptList() {
  const ca = useStore($currentPromptSetCreatedAt);
  const createdAtArr = useStore($currentPromptsCreatedAt);
  const isCollapsed = useStore($promptListCollapsed);

  const [parent, enableAnimations] = useAutoAnimate();

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    enableAnimations(false);
    setTimeout(() => {
      enableAnimations(true);
    });

    const promptSet = $currentPromptSet.get();
    const prompts = promptSet.prompts;

    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = prompts.findIndex((p) => p.createdAt === active.id);
      const newIndex = prompts.findIndex((p) => p.createdAt === over?.id);

      const newPrompts = arrayMove(prompts, oldIndex, newIndex);

      $currentPromptSet.set({
        ...promptSet,
        prompts: newPrompts,
      });
    }
  };

  return (
    <div ref={impressionRef}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={createdAtArr}
          strategy={verticalListSortingStrategy}
        >
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
        </SortableContext>
      </DndContext>
    </div>
  );
}
