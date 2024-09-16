import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { data, exceptionStr, PromptItem } from '@/data/data';
import { useStore } from '@nanostores/react';
import { $locale } from '@/stores/locale';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';

export const Route = createFileRoute('/prompts/')({
  component: () => (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Prompts</h2>
      <PromptCardGrid />
    </div>
  ),
});

export function PromptCardGrid() {
  return (
    <div className="space-y-8">
      {Object.entries(data).map(([category, prompts]) => (
        <div key={category}>
          <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            {category}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {prompts.map((prompt) => (
              <PromptCard
                key={`${category}-${prompt.name}`}
                category={category}
                prompt={prompt}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PromptCard({
  category,
  prompt,
}: {
  category: string;
  prompt: PromptItem;
}) {
  const locale = useStore($locale);
  const promptText =
    prompt.prompt[locale] ||
    prompt.prompt.en ||
    Object.values(prompt.prompt)[0];

  const parts = promptText.split(new RegExp(`(${exceptionStr})`, 'g'));

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    const textToCopy = promptText.replace(new RegExp(exceptionStr, 'g'), '');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleCardClick = () => {
    navigate({
      to: '/prompts/$category/$name',
      params: { category, name: prompt.name },
    });
  };

  return (
    <div className="relative">
      <Button
        className="absolute right-1 top-1 text-muted-foreground hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
        variant="ghost"
        size="icon"
        aria-label="Copy prompt"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green-500" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </Button>

      <Card
        className="h-full cursor-pointer shadow-none hover:bg-accent"
        onClick={handleCardClick}
      >
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="mx-4">{prompt.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-6 text-sm text-muted-foreground">
            {parts.map((part, index) =>
              part === exceptionStr ? (
                <span key={index} className="text-primary">
                  │
                </span>
              ) : (
                part
              )
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
