import type { InterviewSubmission } from "./types";
import { validateSubmission } from "./validate";
import { buildSheetRow } from "./sheet-mapping";

export type SubmissionDeps = {
  appendRow: (row: string[]) => Promise<void>;
  now: () => string;
};

export type SubmissionResult = {
  status: number;
  body: Record<string, unknown>;
};

export async function handleSubmission(
  data: InterviewSubmission,
  deps: SubmissionDeps,
): Promise<SubmissionResult> {
  // 허니팟: 봇이 숨김 필드를 채우면 성공한 척하고 저장하지 않음
  if (data.website) return { status: 200, body: { ok: true } };

  const { ok, errors } = validateSubmission(data);
  if (!ok) return { status: 400, body: { ok: false, errors } };

  try {
    await deps.appendRow(buildSheetRow(data, deps.now()));
  } catch {
    return { status: 500, body: { ok: false, error: "저장 중 오류가 발생했어요." } };
  }
  return { status: 200, body: { ok: true } };
}
