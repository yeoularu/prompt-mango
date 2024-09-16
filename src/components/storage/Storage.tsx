import { Label } from '../ui/label';
import StorageCard from './StorageCard';
import { Switch } from '@/components/ui/switch';
import { $promptSetStorage } from '@/stores/promptSetStorage';
import { $storageDeleteEnable } from '@/stores/storageDeleteEnable';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useStore } from '@nanostores/react';
import { Trash2Icon } from 'lucide-react';

export default function Storage() {
  const [parent] = useAutoAnimate();
  const storage = useStore($promptSetStorage);

  return (
    <div ref={parent} className="flex flex-col gap-2">
      <div className="sticky inset-x-0 top-4 z-50 flex items-center justify-end gap-1 bg-background/90 p-2">
        <Switch
          id="storage-delete-mode"
          className="peer data-[state=checked]:bg-destructive"
          defaultChecked={$storageDeleteEnable.get()}
          onCheckedChange={(v) => $storageDeleteEnable.set(v)}
        />
        <Label
          htmlFor="storage-delete-mode"
          className="text-muted-foreground transition-colors peer-data-[state=checked]:text-destructive"
        >
          <Trash2Icon className="w-4" />
        </Label>
      </div>
      {storage.map((ps) => (
        <StorageCard key={ps.lastSavedAt} {...ps} />
      ))}
    </div>
  );
}
