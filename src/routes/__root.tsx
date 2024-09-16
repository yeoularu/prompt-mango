import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';
import ScrollToTopBtn from '@/components/ScrollToTopBtn';
import { CommandMenu } from '@/components/search/CommandMenu';
import { usePWAUpdate } from '@/hooks/usePWAUpdate';
import React from 'react';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  usePWAUpdate();

  return (
    <>
      <Header />

      <main className="container flex flex-col gap-8 px-3 pb-20 sm:px-8">
        <Outlet />
      </main>

      <footer
        className={cn(
          'container absolute inset-x-0 bottom-0 flex min-h-16 flex-col items-center justify-center text-balance text-sm leading-loose text-muted-foreground/50',
          'sm:flex-row sm:justify-between',
          '[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-muted-foreground'
        )}
      >
        <p>
          Made by <a href="https://github.com/yeoularu">yeoularu</a> 2024.
          <Link to="/about" className="ml-4">
            About
          </Link>
          <a href="https://github.com/yeoularu/prompt-mango" className="ml-4">
            GitHub
          </a>
        </p>

        <p>
          <span>
            App built at {dayjs(BUILD_DATE).format('MM.DD.YYYY HH:mm')}
          </span>
        </p>
      </footer>

      <ScrollToTopBtn />
      <CommandMenu />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
