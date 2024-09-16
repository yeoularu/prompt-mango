import { Button } from '../ui/button';
import { $promptListCollapsed } from '@/stores/promptListCollapsed';
import { useStore } from '@nanostores/react';
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';

export default function CollapsePromptListBtn() {
  const isCollapsed = useStore($promptListCollapsed);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => $promptListCollapsed.set(!isCollapsed)}
    >
      {isCollapsed ? (
        <ChevronsUpDownIcon className="w-4" />
      ) : (
        <ChevronsDownUpIcon className="w-4" />
      )}
    </Button>
  );
}
