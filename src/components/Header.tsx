import { LocaleDropdownMenu } from '@/components/LocaleDropdownMenu';
import { ModeToggle } from '@/components/ModeToggle';
import HeaderOpenCommandBtn from './search/HeaderOpenCommandBtn';
import logo from '/favicon.svg';
import { Link, useMatches } from '@tanstack/react-router';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const matches = useMatches();
  const isPrompts = matches.some((match) =>
    match.pathname.includes('/prompts')
  );

  return (
    <header
      className={cn(
        'container z-50 flex h-14 max-w-screen-2xl items-center justify-between bg-background px-2 sm:px-8',
        isPrompts && 'sticky top-0'
      )}
    >
      <div className="mr-4 flex items-center gap-2">
        <Link
          to="/"
          className="ml-1 flex items-center gap-2 leading-none sm:ml-0"
        >
          <img src={logo} alt="Logo (Mango!)" className="w-8" />
          <h1 className="hidden min-[420px]:block">Prompt Mango</h1>
        </Link>
        <nav>
          <Link to="/prompts">
            <Button
              variant="link"
              className={cn(
                'text-base font-light text-foreground/60 hover:text-foreground/80 hover:no-underline',
                isPrompts && 'text-foreground'
              )}
            >
              Prompts
            </Button>
          </Link>
        </nav>
      </div>
      <div className="ml-auto mr-4 mt-0.5">
        <HeaderOpenCommandBtn />
      </div>
      <div className="flex shrink-0 gap-2">
        <LocaleDropdownMenu />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
