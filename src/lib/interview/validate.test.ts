import { describe, it, expect } from "vitest";
import { validateSubmission } from "./validate";
import type { InterviewSubmission } from "./types";

const base: InterviewSubmission = {
  name: "이찬서", role: "", item: "", email: "lee@example.com",
  link: "", photoUrl: "", consent: true, website: "",
  q_intro: "안녕하세요", q_oneliner: "AI 코파일럿", q_background: "",
  q_hardest: "", q_turningpoint: "", q_vision: "", q_lifegoal: "", q_message: "",
};

describe("validateSubmission", () => {
  it("accepts a fully valid submission", () => {
    const r = validateSubmission(base);
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual({});
  });

  it("requires a name", () => {
    const r = validateSubmission({ ...base, name: "  " });
    expect(r.ok).toBe(false);
    expect(r.errors.name).toBeTruthy();
  });

  it("rejects a malformed email", () => {
    const r = validateSubmission({ ...base, email: "not-an-email" });
    expect(r.ok).toBe(false);
    expect(r.errors.email).toBeTruthy();
  });

  it("requires consent", () => {
    const r = validateSubmission({ ...base, consent: false });
    expect(r.ok).toBe(false);
    expect(r.errors.consent).toBeTruthy();
  });

  it("requires intro and oneliner", () => {
    const r = validateSubmission({ ...base, q_intro: "", q_oneliner: "" });
    expect(r.errors.q_intro).toBeTruthy();
    expect(r.errors.q_oneliner).toBeTruthy();
  });
});
