import BottomRiseUpSection from './BottomRiseUpSection';
import CollapsePromptListBtn from './prompt/CollapsePromptListBtn';
import CurrentPromptSetMenu from './prompt/CurrentPromptSetMenu';
import SavePromptSetBtn from './prompt/SavePromptSetBtn';
import AddPromptBtn from '@/components/prompt/AddPromptBtn';
import CopyCurrentPromptsBtn from '@/components/prompt/CopyCurrentPromptsBtn';
import PromptList from '@/components/prompt/PromptList';
import PromptSetTitle from '@/components/prompt/PromptSetTitle';
import OpenCommandBtn from '@/components/search/OpenCommandBtn';
import Storage from '@/components/storage/Storage';
import { cn } from '@/lib/utils';
import { $isCenterSearchBtnInView } from '@/stores/observers';
import { useImpressionRef } from '@toss/impression-area';
import { useEffect, useState } from 'react';

export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const impressionRef = useImpressionRef({
    onImpressionStart: () => {
      $isCenterSearchBtnInView.set(true);
    },
    onImpressionEnd: () => {
      $isCenterSearchBtnInView.set(false);
    },
    rootMargin: '100px 0px',
  });

  return (
    <>
      <section
        className={cn(
          'mt-4 flex transform flex-col gap-2 opacity-0 transition-all duration-300',
          isMounted && '-translate-y-4 opacity-100'
        )}
      >
        <div className="sticky top-3 z-50 flex w-full justify-between border-border/40 bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="absolute -left-2 z-50">
            <CollapsePromptListBtn />
          </div>

          <PromptSetTitle />

          <div className="absolute -right-2">
            <CurrentPromptSetMenu />
          </div>
        </div>

        <PromptList />
        <AddPromptBtn className="w-full" />
      </section>

      <section
        ref={impressionRef}
        className={cn(
          'flex transform items-center justify-center gap-12 opacity-0 transition-all delay-100 duration-300',
          isMounted && '-translate-y-4 opacity-100'
        )}
      >
        <SavePromptSetBtn />
        <OpenCommandBtn />
        <CopyCurrentPromptsBtn />
      </section>

      <BottomRiseUpSection />

      <div
        className={cn(
          'transform opacity-0 transition-all delay-200 duration-300',
          isMounted && '-translate-y-4 opacity-100'
        )}
      >
        <Storage />
      </div>
    </>
  );
}
