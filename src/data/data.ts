import type { Locale } from '@/stores/locale';

export const exceptionStr = '{{USER_INPUT}}';

export type PromptItem = {
  name: string;
  keywords?: string[];
  prompt: Record<Locale, string>;
};

const common = [
  {
    name: 'Role',
    prompt: {
      en: `You are ${exceptionStr}`,
      ko: `당신은 ${exceptionStr}입니다`,
    },
  },
  {
    name: 'Task',
    keywords: ['job'],
    prompt: {
      en: `Your task is ${exceptionStr}`,
      ko: `당신의 임무는 ${exceptionStr}입니다`,
    },
  },
  {
    name: 'Audience',
    keywords: ['target'],
    prompt: {
      en: `Please respond assuming your audience is ${exceptionStr}`,
      ko: `${exceptionStr}를 독자로 상정하고 답변하세요`,
    },
  },
  {
    name: 'CoT',
    keywords: ['Chain of Thought'],
    prompt: {
      en: `Think step-by-step.`,
      ko: `단계별로 생각하세요.`,
    },
  },
  {
    name: 'Example',
    prompt: {
      en: `Here is an example:
<example>
Input: ${exceptionStr}
Output: 
</example>`,
      ko: `여기에 예시가 있습니다:
<example>
입력: ${exceptionStr}
출력: 
</example>`,
    },
  },
  {
    name: 'Limitations-Only',
    prompt: {
      en: `Do not talk about anything but ${exceptionStr}, ever.`,
      ko: `${exceptionStr} 외에는 절대 언급하지 마세요.`,
    },
  },
  {
    name: 'Limitations-Characters',
    prompt: {
      en: `Limit your response to 200${exceptionStr} characters or less.`,
      ko: `200${exceptionStr}자 이내로 응답하세요.`,
    },
  },
  {
    name: 'Output_formatting-JSON',
    prompt: {
      en: `Output the results in JSON format.${exceptionStr}`,
      ko: `결과를 JSON 형식으로 출력해주세요.${exceptionStr}`,
    },
  },
  {
    name: 'Output_formatting-Separated',
    prompt: {
      en: `Output only the processed messages, separated by "---${exceptionStr}".`,
      ko: `처리된 메시지들만 "---${exceptionStr}"로 구분하여 출력하세요.`,
    },
  },
  {
    name: 'Output_formatting-Bare_bones',
    prompt: {
      en: `Skip the preamble. Keep your response terse and write only the bare bones necessary information. List only:
1) ${exceptionStr}`,
      ko: `서론을 생략하세요. 간결하게 응답하고 필요한 최소한의 정보만 작성하세요. 다음을 나열하세요:
1) ${exceptionStr}`,
    },
  },
];

const programming = [
  {
    name: 'Code_consultant',
    prompt: {
      en: `Analyze the provided ${exceptionStr}code snippet and suggest improvements to optimize its performance. Identify areas where the code can be made more efficient, faster, or less resource-intensive. Provide specific suggestions for optimization, along with explanations of how these changes can enhance the code's performance. The optimized code should maintain the same functionality as the original code while demonstrating improved efficiency.`,
      ko: `제공된 ${exceptionStr}코드 스니펫을 분석하고 성능을 최적화할 수 있는 개선 사항을 제안하세요. 코드가 더 효율적이고, 더 빠르며, 자원 소모를 줄일 수 있는 부분을 식별하세요. 최적화를 위한 구체적인 제안과 이 변경 사항이 코드 성능을 어떻게 향상시킬 수 있는지에 대한 설명을 제공하세요. 최적화된 코드는 원래 코드와 동일한 기능을 유지하면서도 더 나은 효율성을 보여야 합니다.`,
    },
  },
  {
    name: 'Code_clarifier',
    prompt: {
      en: `Take the code snippet provided and explain it in simple, easy-to-understand language. Break down the code's functionality, purpose, and key components. Use analogies, examples, and plain terms to make the explanation accessible to someone with minimal coding knowledge. Avoid using technical jargon unless absolutely necessary, and provide clear explanations for any jargon used. Help the reader understand what the code does and how it works at a high level.`,
      ko: `제공된 코드 스니펫을 간단하고 이해하기 쉬운 언어로 설명하세요. 코드의 기능, 목적, 주요 구성 요소를 분해하여 설명하세요. 유추, 예시, 간단한 용어를 사용하여 최소한의 코딩 지식만 가진 사람도 이해할 수 있도록 하세요. 반드시 필요한 경우를 제외하고는 기술 용어 사용을 피하고, 사용된 용어에 대해서는 명확한 설명을 제공하세요. 독자가 코드가 무엇을 하고 어떻게 작동하는지 높은 수준에서 이해할 수 있도록 도우세요.`,
    },
  },
  {
    name: 'Function_fabricator',
    prompt: {
      en: `Create functions based on the provided natural language requests. The requests will describe the desired functionality, including input parameters and expected return value. Implement the functions according to the given specifications, ensuring they handle edge cases, perform necessary validations, and follow programming best practices for the target language. Include appropriate comments to explain the logic and assist other developers in understanding the implementation.`,
      ko: `제공된 자연어 요청을 기반으로 함수를 생성하세요. 요청에는 입력 매개변수와 예상 반환 값을 포함하여 함수의 원하는 기능이 설명될 것입니다. 주어진 명세에 따라 함수를 구현하고, 에지 케이스를 처리하고 필요한 유효성 검사를 수행하며 대상 언어의 프로그래밍 모범 사례를 따르세요. 적절한 주석을 포함하여 로직을 설명하고 다른 개발자가 구현 내용을 이해하는 데 도움을 주세요.`,
    },
  },
];

const unity = [
  {
    name: 'Unity_script_optimizer',
    prompt: {
      en: `As an expert Unity C# developer, analyze the provided script and suggest optimizations to improve performance, scalability, and maintainability. Focus on reducing CPU and memory usage without altering functionality. Leverage Unity's built-in features, implement robust error handling, and ensure cross-platform compatibility.`,
      ko: `전문적인 Unity C# 개발자로서 제공된 스크립트를 분석하고 성능, 확장성, 유지 보수성을 향상시킬 수 있는 최적화 방안을 제안하세요. 기능을 변경하지 않고 CPU와 메모리 사용량을 줄이는 데 집중하세요. Unity의 내장 기능을 활용하고, 견고한 에러 처리를 구현하며, 크로스 플랫폼 호환성을 보장하세요.`,
    },
  },
  {
    name: 'Unity_bug_finder',
    prompt: {
      en: `Identify potential bugs or issues in the given Unity C# code. Provide detailed explanations for each problem and suggest fixes that adhere to Unity best practices. Ensure error handling, logging, and debugging practices are implemented effectively.`,
      ko: `주어진 Unity C# 코드에서 발생할 수 있는 버그나 문제점을 찾아보세요. 각 문제에 대한 자세한 설명을 제공하고 Unity 모범 사례를 따르는 수정사항을 제안하세요. 효과적인 에러 처리, 로깅, 디버깅 방안이 구현되었는지 확인하세요.`,
    },
  },
  {
    name: 'Unity_feature_implementer',
    prompt: {
      en: `Implement the specified feature in Unity using C#. Write clear, concise, and well-documented code following Unity best practices. Prioritize performance, scalability, and maintainability. Utilize Unity's component-based architecture and built-in features for modularity and efficiency.`,
      ko: `C#을 사용하여 Unity에서 지정된 기능을 구현하세요. Unity 모범 사례를 따라 명확하고 간결하며 잘 문서화된 코드를 작성하세요. 성능, 확장성, 유지 보수성을 우선시하세요. 모듈성과 효율성을 위해 Unity의 컴포넌트 기반 아키텍처와 내장 기능을 활용하세요.`,
    },
  },
  {
    name: 'Unity_code_reviewer',
    prompt: {
      en: `Review the provided Unity C# code for adherence to best practices in game development. Assess code style, naming conventions, architecture decisions, and performance optimizations. Suggest improvements that enhance readability, maintainability, and performance.`,
      ko: `제공된 Unity C# 코드가 게임 개발 모범 사례를 따르고 있는지 검토하세요. 코드 스타일, 명명 규칙, 아키텍처 결정, 성능 최적화를 평가하세요. 가독성, 유지 보수성, 성능을 향상시킬 수 있는 개선 사항을 제안하세요.`,
    },
  },
  {
    name: 'Unity_performance_analyzer',
    prompt: {
      en: `Analyze the performance of the given Unity project. Identify bottlenecks in CPU, memory, and GPU usage. Provide actionable recommendations to optimize rendering, physics calculations, and resource management, considering cross-platform deployment and various hardware capabilities.`,
      ko: `주어진 Unity 프로젝트의 성능을 분석하세요. CPU, 메모리, GPU 사용에서의 병목 현상을 식별하세요. 크로스 플랫폼 배포와 다양한 하드웨어 기능을 고려하여 렌더링, 물리 계산, 리소스 관리 최적화를 위한 실행 가능한 권장 사항을 제공하세요.`,
    },
  },
  {
    name: 'Unity_code_documenter',
    prompt: {
      en: `Generate comprehensive documentation for the provided Unity C# code. Include descriptions of classes, methods, properties, and their purposes. Use consistent formatting and adhere to the established code conventions and commenting standards.`,
      ko: `제공된 Unity C# 코드에 대한 포괄적인 문서를 작성하세요. 클래스, 메서드, 속성 및 그 목적에 대한 설명을 포함하세요. 일관된 서식을 사용하고 확립된 코드 규칙과 주석 표준을 준수하세요.`,
    },
  },
  {
    name: 'Unity_best_practices_advisor',
    prompt: {
      en: `Advise on best practices for structuring a Unity project aimed at scalability and maintainability. Discuss code organization, naming conventions, component usage, and performance optimization strategies. Provide examples where appropriate.`,
      ko: `확장성과 유지 보수성을 목표로 하는 Unity 프로젝트의 구조에 대한 모범 사례를 조언하세요. 코드 조직, 명명 규칙, 컴포넌트 사용, 성능 최적화 전략에 대해 논의하세요. 적절한 경우 예제를 제공하세요.`,
    },
  },
  {
    name: 'Unity_cross_platform_consultant',
    prompt: {
      en: `Provide guidance on making the Unity game compatible across multiple platforms. Discuss considerations for input handling, screen resolutions, performance optimization, and platform-specific APIs. Ensure that the game runs smoothly on different devices.`,
      ko: `Unity 게임을 여러 플랫폼에서 호환되도록 만드는 방법에 대한 지침을 제공하세요. 입력 처리, 화면 해상도, 성능 최적화, 플랫폼별 API에 대한 고려 사항을 논의하세요. 게임이 다양한 장치에서 원활하게 실행되도록 보장하세요.`,
    },
  },
];

export const data: Record<string, PromptItem[]> = {
  common,
  programming,
  unity,
};
