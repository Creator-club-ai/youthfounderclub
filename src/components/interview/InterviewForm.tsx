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
    // 사용자가 다시 입력하면 직전 제출 에러 배너를 걷어낸다
    setStatus((s) => (s === "error" ? "idle" : s));
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
        if (body.errors) {
          // 서버 검증 반려: 인라인 에러만 보여주고 일반 에러 배너는 띄우지 않는다
          setErrors(body.errors);
          setStatus("idle");
          document
            .querySelector('[data-error="true"]')
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
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
