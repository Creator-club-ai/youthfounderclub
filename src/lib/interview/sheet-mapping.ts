import type { InterviewSubmission } from "./types";

export const SHEET_COLUMNS = [
  "제출일시", "이름", "직함/소속", "아이템", "이메일", "링크", "사진", "공개동의",
  "자기소개", "한줄소개", "창업배경", "가장힘들었던순간", "터닝포인트", "비전", "인생목표", "메시지",
] as const;

export function buildSheetRow(data: InterviewSubmission, submittedAtISO: string): string[] {
  return [
    submittedAtISO,
    data.name,
    data.role,
    data.item,
    data.email,
    data.link,
    data.photoUrl,
    data.consent ? "동의" : "",
    data.q_intro,
    data.q_oneliner,
    data.q_background,
    data.q_hardest,
    data.q_turningpoint,
    data.q_vision,
    data.q_lifegoal,
    data.q_message,
  ];
}
