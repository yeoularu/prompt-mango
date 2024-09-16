import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function usePWAUpdate() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.error('Service worker registration error:', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      toast('A new update is available!', {
        action: {
          label: 'Reload',
          onClick: () => {
            updateServiceWorker(true);
            setNeedRefresh(false);
          },
        },
        duration: Infinity,
      });
    }
  }, [needRefresh, updateServiceWorker, setNeedRefresh]);
}
