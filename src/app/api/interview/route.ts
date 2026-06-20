import { NextResponse } from "next/server";
import { handleSubmission } from "@/lib/interview/handle-submission";
import { appendSubmissionRow } from "@/lib/interview/sheets-client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청이에요." }, { status: 400 });
  }
  const { status, body } = await handleSubmission(data, {
    appendRow: appendSubmissionRow,
    now: () => new Date().toISOString(),
  });
  return NextResponse.json(body, { status });
}
