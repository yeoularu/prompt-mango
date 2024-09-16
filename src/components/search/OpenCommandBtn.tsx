import { Button } from '../ui/button';
import { $commandOpen } from '@/stores/commandOpen';
import { SearchIcon } from 'lucide-react';

export default function OpenCommandBtn() {
  return (
    <Button
      className="h-20 w-20 rounded-full text-background"
      onClick={() => $commandOpen.set(true)}
    >
      <SearchIcon className="h-8 w-8" />
    </Button>
  );
}
