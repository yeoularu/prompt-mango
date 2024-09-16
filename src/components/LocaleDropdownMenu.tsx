import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { $locale, type Locale } from '@/stores/locale';
import { LanguagesIcon } from 'lucide-react';

export function LocaleDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <MenuItem locale="en" name="English" />
        <MenuItem locale="ko" name="한국어" />
        {/* <MenuItem locale='es' name='Español' /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuItem({
  locale,
  name,
}: Readonly<{ locale: Locale; name: string }>) {
  const setLocale = () => $locale.set(locale);
  return <DropdownMenuItem onClick={setLocale}>{name}</DropdownMenuItem>;
}
