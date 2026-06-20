import { describe, it, expect, vi } from "vitest";
import { handleSubmission } from "./handle-submission";
import type { InterviewSubmission } from "./types";

const valid: InterviewSubmission = {
  name: "이찬서", role: "", item: "카라멜랩", email: "lee@example.com",
  link: "", photoUrl: "", consent: true, website: "",
  q_intro: "안녕하세요", q_oneliner: "AI 코파일럿", q_background: "",
  q_hardest: "", q_turningpoint: "", q_vision: "", q_lifegoal: "", q_message: "",
};

const now = () => "2026-06-20T00:00:00.000Z";

describe("handleSubmission", () => {
  it("stores a valid submission and returns 200", async () => {
    const appendRow = vi.fn().mockResolvedValue(undefined);
    const res = await handleSubmission(valid, { appendRow, now });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(appendRow).toHaveBeenCalledOnce();
  });

  it("returns 400 and skips storage on validation error", async () => {
    const appendRow = vi.fn();
    const res = await handleSubmission({ ...valid, email: "bad" }, { appendRow, now });
    expect(res.status).toBe(400);
    expect(appendRow).not.toHaveBeenCalled();
  });

  it("silently ignores honeypot submissions", async () => {
    const appendRow = vi.fn();
    const res = await handleSubmission({ ...valid, website: "spam" }, { appendRow, now });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(appendRow).not.toHaveBeenCalled();
  });

  it("returns 500 when storage throws", async () => {
    const appendRow = vi.fn().mockRejectedValue(new Error("sheets down"));
    const res = await handleSubmission(valid, { appendRow, now });
    expect(res.status).toBe(500);
    expect(res.body.ok).toBe(false);
  });
});
