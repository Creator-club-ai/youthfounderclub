# 창업가 인터뷰 수집 폼 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `youthfounder.club/interview`에 기존 브랜드 톤의 커스텀 인터뷰 수집 폼을 만들고, 제출을 Google Sheet에 한 행씩 저장한다.

**Architecture:** 클라이언트 폼(`/interview`)이 입력을 모아 `POST /api/interview`로 보낸다. 라우트는 얇은 글루이고, 실제 검증·행 매핑·저장 흐름은 의존성 주입형 순수 함수 `handleSubmission(data, deps)`에 모아 `next/server`·외부 네트워크 없이 단위 테스트한다. 저장은 Google Sheet에 연결된 Apps Script 웹앱으로 POST해 한 행씩 append한다.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Vitest. 외부 저장은 Google Apps Script 웹앱 + `fetch`(추가 런타임 의존성 없음). 경로 alias `@/*` → `./src/*`. 디자인 토큰은 `src/app/globals.css`의 `:root` 변수 재사용.

---

## 파일 구조

| 파일 | 책임 |
|---|---|
| `src/lib/interview/types.ts` | `InterviewSubmission`, `QuestionKey` 타입 |
| `src/lib/interview/questions.ts` | 8개 문항 정의(이모지·라벨·필수·placeholder) |
| `src/lib/interview/validate.ts` | 폼 검증 (순수 함수) |
| `src/lib/interview/sheet-mapping.ts` | formData → 시트 행(ordered `string[]`) 매핑 (순수) |
| `src/lib/interview/handle-submission.ts` | 허니팟·검증·저장 흐름 (의존성 주입, 순수) |
| `src/lib/interview/sheets-client.ts` | Apps Script 웹앱 POST 래퍼 (env, 사이드이펙트 격리) |
| `src/app/api/interview/route.ts` | 얇은 POST 글루 |
| `src/app/interview/page.tsx` | 페이지 + 메타데이터 (서버 컴포넌트) |
| `src/components/interview/InterviewForm.tsx` | 클라이언트 폼 UI |
| `src/components/interview/interview.module.css` | 폼 스타일 (토큰 재사용) |
| `vitest.config.ts` | 테스트 설정 (`@` alias, node env) |

테스트: 각 순수 모듈 옆에 `*.test.ts`. `route.ts`/`sheets-client.ts`/UI는 수동 e2e로 검증.

---

## Task 1: 툴링 셋업 (Vitest)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: 의존성 설치**

Run:
```bash
npm install -D vitest
```
Expected: 설치 성공, `package.json`에 vitest devDependency 추가됨. (외부 저장은 Apps Script 웹앱이라 런타임 의존성 불필요.)

- [ ] **Step 2: `package.json`에 test 스크립트 추가**

`"scripts"` 블록을 아래처럼 수정 (`test` 추가):
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  },
```

- [ ] **Step 3: `vitest.config.ts` 생성**

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: 커밋**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest for interview form tests"
```

---

## Task 2: 타입 & 문항 정의

**Files:**
- Create: `src/lib/interview/types.ts`
- Create: `src/lib/interview/questions.ts`

- [ ] **Step 1: `types.ts` 작성**

```ts
export type QuestionKey =
  | "q_intro"
  | "q_oneliner"
  | "q_background"
  | "q_hardest"
  | "q_turningpoint"
  | "q_vision"
  | "q_lifegoal"
  | "q_message";

export type InterviewSubmission = {
  name: string;
  role: string;
  item: string;
  email: string;
  link: string;
  photoUrl: string;
  consent: boolean;
  website: string; // honeypot (봇 차단용, 사람은 비워둠)
} & Record<QuestionKey, string>;
```

- [ ] **Step 2: `questions.ts` 작성**

```ts
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
```

- [ ] **Step 3: 타입체크 통과 확인**

Run: `npx tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/lib/interview/types.ts src/lib/interview/questions.ts
git commit -m "feat: add interview submission types and questions config"
```

---

## Task 3: 검증 로직 (TDD)

**Files:**
- Create: `src/lib/interview/validate.ts`
- Test: `src/lib/interview/validate.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/interview/validate.test.ts`:
```ts
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/lib/interview/validate.test.ts`
Expected: FAIL ("validate" 모듈 없음 / `validateSubmission` 미정의).

- [ ] **Step 3: `validate.ts` 구현**

```ts
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
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/interview/validate.test.ts`
Expected: PASS (5 passed).

- [ ] **Step 5: 커밋**

```bash
git add src/lib/interview/validate.ts src/lib/interview/validate.test.ts
git commit -m "feat: add interview form validation"
```

---

## Task 4: 시트 행 매핑 로직 (TDD)

**Files:**
- Create: `src/lib/interview/sheet-mapping.ts`
- Test: `src/lib/interview/sheet-mapping.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/interview/sheet-mapping.test.ts`:
```ts
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/lib/interview/sheet-mapping.test.ts`
Expected: FAIL (모듈/함수 미정의).

- [ ] **Step 3: `sheet-mapping.ts` 구현**

> 컬럼 순서는 시트 헤더 행(Task 9)과 정확히 일치해야 함.

```ts
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
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/interview/sheet-mapping.test.ts`
Expected: PASS (3 passed).

- [ ] **Step 5: 커밋**

```bash
git add src/lib/interview/sheet-mapping.ts src/lib/interview/sheet-mapping.test.ts
git commit -m "feat: add sheet row mapping for interview submissions"
```

---

## Task 5: 제출 처리 흐름 (TDD, 의존성 주입)

**Files:**
- Create: `src/lib/interview/handle-submission.ts`
- Test: `src/lib/interview/handle-submission.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/interview/handle-submission.test.ts`:
```ts
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npx vitest run src/lib/interview/handle-submission.test.ts`
Expected: FAIL (모듈/함수 미정의).

- [ ] **Step 3: `handle-submission.ts` 구현**

```ts
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
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/interview/handle-submission.test.ts`
Expected: PASS (4 passed).

- [ ] **Step 5: 전체 테스트 통과 확인**

Run: `npm test`
Expected: PASS (validate 5 + sheet-mapping 3 + handle-submission 4, 총 12 passed).

- [ ] **Step 6: 커밋**

```bash
git add src/lib/interview/handle-submission.ts src/lib/interview/handle-submission.test.ts
git commit -m "feat: add interview submission flow with honeypot and error handling"
```

---

## Task 6: Sheets 클라이언트 + API 라우트

**Files:**
- Create: `src/lib/interview/sheets-client.ts`
- Create: `src/app/api/interview/route.ts`

- [ ] **Step 1: `sheets-client.ts` 작성**

```ts
export async function appendSubmissionRow(row: string[]): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    throw new Error("SHEETS_WEBHOOK_URL 환경변수가 설정되지 않았습니다.");
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ row }),
  });
  if (!res.ok) {
    throw new Error(`Sheets webhook 실패: ${res.status}`);
  }
}
```

- [ ] **Step 2: `route.ts` 작성**

```ts
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
```

- [ ] **Step 3: 타입체크 확인**

Run: `npx tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/lib/interview/sheets-client.ts src/app/api/interview/route.ts
git commit -m "feat: add sheets webhook client and interview api route"
```

---

## Task 7: 폼 UI 컴포넌트 + 스타일

**Files:**
- Create: `src/components/interview/InterviewForm.tsx`
- Create: `src/components/interview/interview.module.css`

- [ ] **Step 1: `interview.module.css` 작성**

```css
.wrap {
  width: min(720px, 92vw);
  margin: 0 auto;
  padding: 64px 0 96px;
}
.header {
  text-align: center;
  margin-bottom: 40px;
}
.eyebrow {
  font-family: var(--font-en);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}
.title {
  font-size: clamp(28px, 6vw, 44px);
  letter-spacing: var(--letter-spacing-tight);
  line-height: 1.15;
  margin: 12px 0;
}
.subtitle {
  color: var(--muted);
  font-size: 16px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.section {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 28px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.sectionTitle {
  font-size: 18px;
  letter-spacing: var(--letter-spacing-base);
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.label {
  font-size: 15px;
  font-weight: 600;
}
.req {
  color: var(--accent);
  margin-left: 4px;
}
.hint {
  font-size: 13px;
  color: var(--muted);
}
.input,
.textarea {
  width: 100%;
  font: inherit;
  color: var(--ink);
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.textarea {
  resize: vertical;
  line-height: 1.6;
}
.input:focus,
.textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 79, 0, 0.12);
}
.field[data-error="true"] .input,
.field[data-error="true"] .textarea {
  border-color: #e0245e;
}
.error {
  color: #e0245e;
  font-size: 13px;
}
.consent {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  cursor: pointer;
}
.consent input {
  margin-top: 3px;
}
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.submit {
  font: inherit;
  font-weight: 600;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 16px 24px;
  border-radius: var(--radius-md);
  background: var(--gradient-energy);
  box-shadow: var(--shadow);
  transition: transform 0.15s, box-shadow 0.15s;
}
.submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-hover);
}
.submit:disabled {
  opacity: 0.6;
  cursor: default;
}
.success {
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.successEmoji {
  font-size: 48px;
}
.success h2 {
  font-size: 28px;
  letter-spacing: var(--letter-spacing-tight);
}
.success p {
  color: var(--muted);
  max-width: 420px;
}
```

- [ ] **Step 2: `InterviewForm.tsx` 작성**

```tsx
"use client";

import { useEffect, useState } from "react";
import { QUESTIONS } from "@/lib/interview/questions";
import type { InterviewSubmission } from "@/lib/interview/types";
import { validateSubmission } from "@/lib/interview/validate";
import styles from "./interview.module.css";

const DRAFT_KEY = "yfc-interview-draft";

const EMPTY: InterviewSubmission = {
  name: "", role: "", item: "", email: "", link: "", photoUrl: "",
  consent: false, website: "",
  q_intro: "", q_oneliner: "", q_background: "", q_hardest: "",
  q_turningpoint: "", q_vision: "", q_lifegoal: "", q_message: "",
};

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof InterviewSubmission, string>>;

export default function InterviewForm() {
  const [data, setData] = useState<InterviewSubmission>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  // 임시저장 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setData({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      // 무시
    }
  }, []);

  // 임시저장 (debounce)
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      } catch {
        // 무시
      }
    }, 400);
    return () => clearTimeout(id);
  }, [data]);

  function update<K extends keyof InterviewSubmission>(key: K, value: InterviewSubmission[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateSubmission(data);
    setErrors(result.errors);
    if (!result.ok) {
      document
        .querySelector('[data-error="true"]')
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        if (body.errors) setErrors(body.errors);
        setStatus("error");
        return;
      }
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // 무시
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success}>
        <div className={styles.successEmoji}>🙌</div>
        <h2>제출 완료!</h2>
        <p>소중한 이야기 들려줘서 고마워요. 멋진 콘텐츠로 만들어 곧 연락드릴게요.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>기본 정보</h2>

        <Field label="이름" required error={errors.name}>
          <input className={styles.input} value={data.name}
            onChange={(e) => update("name", e.target.value)} placeholder="이찬서" />
        </Field>

        <Field label="직함 / 소속" error={errors.role}>
          <input className={styles.input} value={data.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="카라멜랩 대표, 중앙대 화공 휴학" />
        </Field>

        <Field label="아이템 / 회사명" error={errors.item}>
          <input className={styles.input} value={data.item}
            onChange={(e) => update("item", e.target.value)} placeholder="카라멜랩" />
        </Field>

        <Field label="이메일" required hint="후속 연락용 · 공개되지 않아요" error={errors.email}>
          <input className={styles.input} type="email" value={data.email}
            onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
        </Field>

        <Field label="인스타 / 링크" error={errors.link}>
          <input className={styles.input} value={data.link}
            onChange={(e) => update("link", e.target.value)}
            placeholder="https://instagram.com/..." />
        </Field>

        <Field label="프로필 사진 링크" hint="구글드라이브·이미지 URL 등 (선택)" error={errors.photoUrl}>
          <input className={styles.input} value={data.photoUrl}
            onChange={(e) => update("photoUrl", e.target.value)} placeholder="https://..." />
        </Field>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>인터뷰</h2>
        {QUESTIONS.map((q) => (
          <Field key={q.key} label={`${q.emoji} ${q.label}`} required={q.required} error={errors[q.key]}>
            <textarea className={styles.textarea} rows={5} value={data[q.key]}
              onChange={(e) => update(q.key, e.target.value)} placeholder={q.placeholder} />
          </Field>
        ))}
      </section>

      <section className={styles.section}>
        <label className={styles.consent} data-error={errors.consent ? "true" : undefined}>
          <input type="checkbox" checked={data.consent}
            onChange={(e) => update("consent", e.target.checked)} />
          <span>작성한 내용을 YouthFounderClub 콘텐츠 제작·공개에 사용하는 것에 동의합니다.</span>
        </label>
        {errors.consent && <p className={styles.error}>{errors.consent}</p>}
      </section>

      <input className={styles.honeypot} tabIndex={-1} autoComplete="off"
        aria-hidden="true" value={data.website}
        onChange={(e) => update("website", e.target.value)} />

      {status === "error" && (
        <p className={styles.error}>제출 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.</p>
      )}

      <button className={styles.submit} type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "제출 중…" : "인터뷰 제출하기"}
      </button>
    </form>
  );
}

function Field({ label, required, hint, error, children }: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field} data-error={error ? "true" : undefined}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.req}>*</span>}
      </label>
      {hint && <p className={styles.hint}>{hint}</p>}
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: 타입체크 확인**

Run: `npx tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 4: 커밋**

```bash
git add src/components/interview/InterviewForm.tsx src/components/interview/interview.module.css
git commit -m "feat: add interview form UI with draft autosave"
```

---

## Task 8: 페이지 라우트 (`/interview`)

**Files:**
- Create: `src/app/interview/page.tsx`

- [ ] **Step 1: `page.tsx` 작성**

```tsx
import type { Metadata } from "next";
import InterviewForm from "@/components/interview/InterviewForm";
import styles from "@/components/interview/interview.module.css";

export const metadata: Metadata = {
  title: "창업가 인터뷰 | Youth Founder Club",
  description: "당신의 창업 이야기를 들려주세요. YouthFounderClub 창업가 인터뷰.",
};

export default function InterviewPage() {
  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.eyebrow}>Founder Interview</div>
        <h1 className={styles.title}>
          당신의 창업 이야기를
          <br />
          들려주세요
        </h1>
        <p className={styles.subtitle}>
          편하게 적어주세요. 멋진 콘텐츠로 만들어 더 많은 사람에게 닿게 할게요.
        </p>
      </header>
      <InterviewForm />
    </main>
  );
}
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공, `/interview` 라우트가 출력 목록에 포함됨.

- [ ] **Step 3: 커밋**

```bash
git add src/app/interview/page.tsx
git commit -m "feat: add /interview page"
```

---

## Task 9: Google Sheet 연동 + 로컬 e2e + 배포

> 이 태스크는 운영자(사용자)의 Google 계정 작업이 필요합니다. 막히면 사용자에게 시트 생성/Apps Script 배포를 요청하세요.

- [ ] **Step 1: Google Sheet + 헤더 행 준비 (운영자)**

1. 새 Google Sheet 생성, 첫 시트 이름을 `응답`으로 변경
2. 1행(헤더)에 아래 순서 그대로 입력 (`sheet-mapping.ts`의 `SHEET_COLUMNS`와 일치해야 함):
   `제출일시 | 이름 | 직함/소속 | 아이템 | 이메일 | 링크 | 사진 | 공개동의 | 자기소개 | 한줄소개 | 창업배경 | 가장힘들었던순간 | 터닝포인트 | 비전 | 인생목표 | 메시지`

- [ ] **Step 2: Apps Script 웹앱 배포 (운영자)**

1. 시트에서 `확장 프로그램 → Apps Script`
2. 아래 코드 붙여넣기:
```js
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("응답") || ss.getSheets()[0];
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow(data.row);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```
3. `배포 → 새 배포 → 유형: 웹 앱` / 실행: `나` / 액세스 권한: `모든 사용자` → 배포
4. 발급된 **웹 앱 URL**(`https://script.google.com/macros/s/.../exec`) 복사

- [ ] **Step 3: 로컬 환경변수 설정**

`.env.local` 생성 (이미 `.gitignore`의 `.env*`로 제외됨):
```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

- [ ] **Step 4: 로컬 e2e 수동 테스트**

Run: `npm run dev`
브라우저에서 `http://localhost:3000/interview` 열고 확인:
- [ ] 필수 미입력 제출 → 인라인 에러 + 첫 에러로 스크롤
- [ ] 작성 중 새로고침 → 입력 내용 복원(임시저장)
- [ ] 유효 입력 제출 → 성공 화면, Google Sheet에 새 행이 헤더 순서대로 추가됨
- [ ] 모바일 뷰(devtools)에서 레이아웃 정상

- [ ] **Step 5: 프로덕션 환경변수 등록 & 배포**

- Vercel 프로젝트 Settings → Environment Variables에 `SHEETS_WEBHOOK_URL` 추가
- 배포 후 `youthfounder.club/interview` 접속해 실제 제출 1건으로 최종 확인

- [ ] **Step 6: 최종 커밋 (변경 있을 시)**

```bash
git add -A
git commit -m "chore: finalize interview form integration"
```

---

## 완료 기준 (Definition of Done)

- `npm test` 전부 통과 (validate / sheet-mapping / handle-submission, 총 12)
- `npm run build` 성공, `/interview` 라우트 생성
- 로컬에서 유효 제출 시 Google Sheet에 새 행 추가 확인
- 프로덕션 `youthfounder.club/interview`에서 제출 동작 확인
