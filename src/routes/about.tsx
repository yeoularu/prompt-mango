import { $locale } from '@/stores/locale';
import { useStore } from '@nanostores/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const locale = useStore($locale);

  const getContent = () => {
    if (locale === 'ko') {
      return ko;
    }

    return en;
  };

  return (
    <div className="flex flex-col gap-8 p-2">
      <h1 className="m-4 text-2xl">About</h1>
      <p className="whitespace-pre-wrap">{getContent()}</p>
    </div>
  );
}

const ko = `"Prompt Mango"는 LLM 프롬프트를 구성하고 관리하는 웹 애플리케이션입니다.

빠르게 프롬프트를 구성하고 복사해 사용하세요. 모든 변경사항이 자동으로 로컬 기기에 저장되며 오프라인에서도 사용할 수 있습니다.

자주 쓰는 프롬프트를 클릭 또는 키보드로 접근해 프롬프트를 구성할 수 있습니다. 
키보드 단축키: 
- 프롬프트 검색 창 열기/닫기: Ctrl/Cmd + K
- (검색 창에서)해당 프롬프트를 블록으로 편집기에 추가: Ctrl/Cmd + Enter

편집기로 가져올 때 필요한 위치에 커서가 자동으로 이동*합니다.

구성된 프롬프트는 복사 또는 저장할 수 있습니다. 이때 상단에서 프롬프트의 제목을 입력할 수 있습니다.
복사 또는 저장한 프롬프트는 하단에서 보관되며 복사 혹은 편집기로 가져와 수정할 수 있습니다.

PWA로 모바일 앱처럼 설치하여 편리하게 사용할 수 있습니다. 

* 자동 커서 이동 기능은 iOS, iPadOS에서 지원되지 않습니다.`;

const en = `"Prompt Mango" is a web application for configuring and managing LLM prompts.

Quickly configure, copy and use prompts. All changes are automatically saved to your local device and can be used offline.

You can configure prompts by clicking or keyboard access to your favorite prompts.
Keyboard shortcuts:
- Ctrl/Cmd + K Open/close the prompt search bar: Ctrl/Cmd + K
- Add that prompt (from the search bar) to the editor as a block: Ctrl/Cmd + Enter

The cursor will automatically move* to the required location when imported into the editor.

Once configured, the prompt can be copied or saved. When doing so, you can enter a title for the prompt at the top.
Copied or saved prompts are archived at the bottom and can be copied or imported into the editor for editing.

As a PWA, you can install and use it like a mobile app for convenience.

* Automatic cursor movement is not supported on iOS, iPadOS.`;
