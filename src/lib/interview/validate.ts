import type { InterviewSubmission } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult = {
  ok: boolean;
  errors: Partial<Record<keyof InterviewSubmission, string>>;
};

export function validateSubmission(data: InterviewSubmission): ValidationResult {
  const errors: Partial<Record<keyof InterviewSubmission, string>> = {};

  if (!data.name?.trim()) errors.name = "이름을 입력해 주세요.";
  if (!data.email?.trim()) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "올바른 이메일 형식이 아니에요.";
  if (!data.q_intro?.trim()) errors.q_intro = "자기소개를 입력해 주세요.";
  if (!data.q_oneliner?.trim()) errors.q_oneliner = "아이템 한 줄 소개를 입력해 주세요.";
  if (!data.consent) errors.consent = "콘텐츠 사용 동의가 필요해요.";

  return { ok: Object.keys(errors).length === 0, errors };
}
