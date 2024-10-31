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

export const data: Record<string, PromptItem[]> = {
  common,
  programming,
};
