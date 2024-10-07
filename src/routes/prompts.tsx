import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
} from '@tanstack/react-router';
import { ScrollArea } from '@/components/ui/scroll-area';
import { data } from '@/data/data';
import { Fragment } from 'react/jsx-runtime';
import { Button } from '@/components/ui/button';
import { ArrowRightFromLineIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/prompts')({
  component: () => (
    <>
      <Sheet>
        <SheetTrigger className="mr-auto md:hidden">
          <Button variant="ghost" className="gap-2">
            <ArrowRightFromLineIcon className="w-4" />
            All Prompts
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Prompts</SheetTitle>
          </SheetHeader>
          <PromptsNavList isSheet />
        </SheetContent>
      </Sheet>
      <section className="flex">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] shrink-0 md:block">
          <PromptsNavList />
        </aside>

        <Outlet />
      </section>
    </>
  ),
});

function PromptsNavList({ isSheet = false }) {
  return (
    <ScrollArea className="h-full w-80 py-4 pr-4">
      <div className="flex flex-col gap-2">
        {Object.keys(data).map((key) => (
          <Fragment key={key}>
            <p className="mt-2 text-sm text-muted-foreground">{key}</p>
            {data[key].map((p) => (
              <Link
                key={p.name}
                to={'/prompts/$category/$name'}
                params={{ category: key, name: p.name }}
              >
                {isSheet ? (
                  <SheetClose>
                    <PromptLinkButton category={key} name={p.name} />
                  </SheetClose>
                ) : (
                  <PromptLinkButton category={key} name={p.name} />
                )}
              </Link>
            ))}
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

const PromptLinkButton = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => {
  const params = useParams({
    strict: false,
  });

  const isCurrentRoute = params.category === category && params.name === name;

  return (
    <Button
      variant="link"
      className={cn(
        'w-full justify-start text-foreground/60',
        isCurrentRoute && 'text-foreground'
      )}
    >
      {name}
    </Button>
  );
};
