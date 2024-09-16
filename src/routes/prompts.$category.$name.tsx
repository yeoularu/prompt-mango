import { createFileRoute } from '@tanstack/react-router';
import { data, exceptionStr } from '@/data/data';
import { LanguagePrompt } from '@/components/prompt-detail/LanguagePrompt';
import { useEffect } from 'react';

export const Route = createFileRoute('/prompts/$category/$name')({
  component: PromptDetail,
});

function PromptDetail() {
  const { category, name } = Route.useParams();

  const prompts = data[category];
  const promptItem = prompts?.find((item) => item.name === name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!promptItem) {
    return <div>Prompt not found</div>;
  }

  return (
    <div className="w-full p-4">
      <h1 className="mb-4 text-2xl font-bold">{promptItem.name}</h1>
      {promptItem.keywords && (
        <div className="my-8">
          <ul className="list-inside list-disc">
            {promptItem.keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
      {Object.entries(promptItem.prompt).map(([lang, promptText]) => (
        <LanguagePrompt
          key={lang}
          lang={lang}
          promptText={promptText}
          exceptionStr={exceptionStr}
        />
      ))}
    </div>
  );
}
