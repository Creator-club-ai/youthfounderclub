import { describe, it, expect } from "vitest";
import { buildSheetRow, SHEET_COLUMNS } from "./sheet-mapping";
import type { InterviewSubmission } from "./types";

const data: InterviewSubmission = {
  name: "이찬서", role: "카라멜랩 대표", item: "카라멜랩",
  email: "lee@example.com", link: "https://insta.com/x", photoUrl: "",
  consent: true, website: "",
  q_intro: "안녕하세요", q_oneliner: "AI 코파일럿",
  q_background: "", q_hardest: "", q_turningpoint: "",
  q_vision: "", q_lifegoal: "", q_message: "",
};

describe("buildSheetRow", () => {
  it("produces a row matching the column order and length", () => {
    const row = buildSheetRow(data, "2026-06-20T00:00:00.000Z");
    expect(row).toHaveLength(SHEET_COLUMNS.length);
    expect(row[0]).toBe("2026-06-20T00:00:00.000Z"); // 제출일시
    expect(row[1]).toBe("이찬서"); // 이름
    expect(row[4]).toBe("lee@example.com"); // 이메일
    expect(row[8]).toBe("안녕하세요"); // 자기소개
  });

  it("writes 동의 for consent true and empty string for false", () => {
    expect(buildSheetRow({ ...data, consent: true }, "t")[7]).toBe("동의");
    expect(buildSheetRow({ ...data, consent: false }, "t")[7]).toBe("");
  });

  it("keeps empty answers as empty strings", () => {
    const row = buildSheetRow(data, "t");
    expect(row[10]).toBe(""); // 창업배경 (q_background, 미작성)
  });
});
