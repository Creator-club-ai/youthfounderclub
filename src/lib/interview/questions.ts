import type { QuestionKey } from "./types";

export type Question = {
  key: QuestionKey;
  emoji: string;
  label: string;
  required: boolean;
  placeholder: string;
};

export const QUESTIONS: Question[] = [
  { key: "q_intro", emoji: "🙋", label: "자기소개", required: true, placeholder: "어떤 사람인지, 무엇을 만들고 있는지 편하게 소개해 주세요." },
  { key: "q_oneliner", emoji: "📌", label: "아이템 한 줄 소개", required: true, placeholder: "당신의 제품/서비스를 한 문장으로." },
  { key: "q_background", emoji: "🔍", label: "창업 배경 (문제 발견)", required: false, placeholder: "어떤 문제를 발견했고, 왜 시작하게 됐나요?" },
  { key: "q_hardest", emoji: "🔥", label: "가장 힘들었던 순간", required: false, placeholder: "가장 힘들었던 순간과 그때의 감정을 들려주세요." },
  { key: "q_turningpoint", emoji: "💡", label: "결정적 터닝 포인트", required: false, placeholder: "흐름을 바꾼 결정적인 순간이 있었나요?" },
  { key: "q_vision", emoji: "🚀", label: "제품에 대한 비전", required: false, placeholder: "이 제품으로 만들고 싶은 미래는?" },
  { key: "q_lifegoal", emoji: "🎯", label: "인생 목표", required: false, placeholder: "궁극적으로 이루고 싶은 것은?" },
  { key: "q_message", emoji: "💬", label: "같은 길을 걷고 싶은 사람들에게", required: false, placeholder: "같은 길을 걷는 사람들에게 한마디." },
];
