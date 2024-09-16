import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTopBtn() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000 && isButtonVisible === false) {
        setIsButtonVisible(true);
      } else if (window.scrollY < 1000 && isButtonVisible === true) {
        setIsButtonVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isButtonVisible]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-screen-2xl justify-end opacity-0 transition-opacity duration-300',
        isButtonVisible ? 'opacity-100' : 'pointer-events-none'
      )}
    >
      <Button
        variant="secondary"
        size="icon"
        className="pointer-events-auto m-4 rounded-full"
        onClick={handleClick}
      >
        <ArrowUpIcon className="w-4" />
      </Button>
    </div>
  );
}
