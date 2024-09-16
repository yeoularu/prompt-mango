import { useState, Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon, PlusIcon } from 'lucide-react';
import AddPromptBtn from '@/components/prompt/AddPromptBtn';
import { localeNames, Locale } from '@/stores/locale';
import { cn } from '@/lib/utils';
import { useRouter } from '@tanstack/react-router';

export function LanguagePrompt({
  lang,
  promptText,
  exceptionStr,
}: {
  lang: string;
  promptText: string;
  exceptionStr: string;
}) {
  const [copied, setCopied] = useState(false);
  const parts = promptText.split(new RegExp(`(${exceptionStr})`, 'g'));
  const finalPrompt = promptText.replace(new RegExp(exceptionStr, 'g'), '');
  const cursorStart = promptText.indexOf(exceptionStr);

  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">
        {localeNames[lang as Locale] || lang}
      </h2>
      <p className="mb-2 whitespace-pre-wrap rounded-md p-4">
        {parts.map((part, index) => (
          <Fragment key={index}>
            {part === exceptionStr ? (
              <span className="text-primary">│</span>
            ) : (
              part
            )}
          </Fragment>
        ))}
      </p>
      <div className="flex flex-col items-end justify-end gap-2 sm:flex-row">
        <AddPromptBtn
          prompt={finalPrompt}
          cursorStart={cursorStart}
          className="w-fit px-4 py-2"
          onClick={() =>
            router.navigate({ from: '/prompts/$category/$name', to: '/' })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add to Editor
        </AddPromptBtn>
        <Button
          variant="outline"
          onClick={handleCopy}
          className={cn('w-44', copied && 'pointer-events-none')}
        >
          {copied ? (
            <>
              <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
