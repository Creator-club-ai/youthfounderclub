import Link from "next/link";
import { KAKAO_INVITE_URL } from "@/constants/links";

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-grid">
                <div className="hero-copy">
                    <div className="eyebrow en animate-fade-up">Youth Founders Club</div>
                    <h1 className="animate-fade-up delay-100">
                        For Youth Founders.
                        <br />
                        <span className="accent">Build Together.</span>
                    </h1>
                    <p className="lead ko animate-fade-up delay-200">
                        서로의 가능성을 믿고 끝까지 지지하는 곳.<br />
                        청년 창업가들이 모여 가장 힙하고 자유로운 연대를 만듭니다.
                    </p>
                    <div className="hero-cta animate-fade-up delay-300">
                        <a
                            href={KAKAO_INVITE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-solid"
                        >
                            커뮤니티 참여하기
                        </a>
                        <Link href="/events" className="btn btn-outline">
                            이벤트 보기
                        </Link>
                    </div>

                    <div className="hero-meta animate-fade-up delay-300">
                        <div className="meta-item">
                            <span className="meta-label">Members</span>
                            <span className="meta-value">200+</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Base</span>
                            <span className="meta-value">Seoul</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Always</span>
                            <span className="meta-value">Open Momentum</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
