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
