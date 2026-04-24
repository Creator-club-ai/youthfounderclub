import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Reveal from "@/components/ui/Reveal";
import PartnerCard from "@/components/membership/PartnerCard";
import type { ServiceItem } from "@/components/membership/PartnerCard";

const PAYMENT_URL =
  "https://www.latpeed.com/memberships/69d5f735a61d79c1debe4202/pay/AO07Z";

const PARTNERS: {
  logo: string;
  logoAlt: string;
  invertLogo?: boolean;
  logoScale?: number;
  category: string;
  headline: string;
  headlineAccent: string;
  items: ServiceItem[];
  previewCount?: number;
}[] = [
  {
    logo: "/partner_milestone.png",
    logoAlt: "Milestone 세무회계",
    invertLogo: true,
    logoScale: 0.7,
    category: "회계 · 세무",
    headline: "재무 설계 패키지",
    headlineAccent: "무료 제공",
    previewCount: 2,
    items: [
      {
        name: "창업 초기 재무 설계 패키지",
        note: "개인·법인 구조, 세금 흐름, 인건비 설계 등 1:1 맞춤",
        original: "100만원",
        member: "무료",
        accent: true,
      },
      {
        name: "초기 사업자 세무 신고 대행",
        note: "부가세·종합소득세 신고, 무·저실적 사업자 한정",
        member: "50% 할인",
      },
    ],
  },
  {
    logo: "/partner_mission.png",
    logoAlt: "Mission 법무",
    invertLogo: true,
    logoScale: 0.7,
    category: "법무",
    headline: "법인 설립부터 계약서까지",
    headlineAccent: "최대 35% 할인",
    previewCount: 1,
    items: [
      {
        name: "법인 설립 패키지",
        note: "법인 설립 + 주주간 계약서 + 정관 세팅",
        original: "200만원",
        member: "140만원",
      },
      {
        name: "초기 팀 셋팅 패키지",
        note: "법인 전 동업계약서 + 용역계약서 + IP 귀속 구조",
        original: "150만원",
        member: "90만원대",
      },
      {
        name: "계약서 단품 검토",
        note: "표준 양식 제공 + 1:1 기초 상담 1회",
        original: "50만원",
        member: "35만원",
      },
    ],
  },
  {
    logo: "/partner_daein.png",
    logoAlt: "대인국제특허법률사무소",
    invertLogo: false,
    category: "IP · 변리",
    headline: "출원 전 과정 약 30% 할인, IP 상담",
    headlineAccent: "80% 할인",
    previewCount: 2,
    items: [
      {
        name: "단품 IP 상담",
        note: "특허·상표·디자인 관련 1:1 기초 상담 1회",
        original: "5만원",
        member: "1만원",
        accent: true,
      },
      {
        name: "상표 출원 패키지",
        note: "선행상표 조사 + 출원 1건(1류) + 출원~등록 전 과정",
        original: "40만원",
        member: "28만원",
      },
      {
        name: "특허 출원 패키지",
        note: "선행기술 조사 + 명세서 작성 + 출원~등록 전 과정",
        original: "420만원",
        member: "294만원",
      },
      {
        name: "디자인권 출원 패키지",
        note: "선행디자인 조사 + 출원~등록 전 과정 + 도면 검토",
        original: "90만원",
        member: "63만원",
      },
      {
        name: "IP 창업 기초 패키지",
        note: "상표 1건 + 특허 1건 + IP 전략 상담 1회 묶음",
        original: "500만원",
        member: "350만원",
      },
    ],
  },
];

export default function MembershipPage() {
  return (
    <div className="page">
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="ms-hero">
          <div className="container ms-hero-inner">
            <div className="eyebrow en animate-fade-up">Membership</div>

            <h1 className="ms-hero-title animate-fade-up delay-100">
              Built for founders
              <br />
              <span className="ms-hero-title-accent">who don't stop.</span>
            </h1>

            <p className="ms-hero-lead ko animate-fade-up delay-200">
              창업은 아이디어 하나로만 굴러가지 않습니다.
              <br />
              더 넓은 시야, 더 빠른 실행, 더 단단한 구조,
              <br />
              그리고 비슷한 결의 사람들이 필요합니다.
            </p>

            <div className="ms-hero-cta animate-fade-up delay-300">
              <a href={PAYMENT_URL} target="_blank" rel="noreferrer" className="btn ms-cta-primary">
                지금 가입하기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#benefits" className="btn btn-outline ms-btn-lg" style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                혜택 살펴보기
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </a>
            </div>

          </div>

          {/* Decorative line */}
          <div className="ms-hero-line" />
        </section>

        {/* ── Why YFC ── */}
        <section className="section" id="why">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div className="eyebrow en">Why YFC</div>
                <h2>What you actually need.</h2>
                <p className="sublead ko">
                  단순한 모임도, 정보만 흘려보내는 커뮤니티도 아닙니다.
                  <br />
                  초기 창업가에게 실제로 작동하는 네 가지.
                </p>
              </div>
            </Reveal>

            <div className="ms-why-grid">
              {[
                {
                  num: "01",
                  title: "Insight",
                  desc: "흐름을 읽게 해주는 선별된 비즈니스 인사이트",
                },
                {
                  num: "02",
                  title: "Support",
                  desc: "막막함을 줄여주는 실질적인 전문가 지원",
                },
                {
                  num: "03",
                  title: "Community",
                  desc: "비슷한 결의 창업가들과 매주 함께 실행하고 성장하는 동료 네트워크",
                },
                {
                  num: "04",
                  title: "Expert Access",
                  desc: "회계·법률·IP 전문 파트너와 연결되는 실무 지원 네트워크",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="ms-why-card">
                    <div className="ms-why-num en">{item.num}</div>
                    <h3 className="en">{item.title}</h3>
                    <p className="ko">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Who (compact, inline) ── */}
        <section className="ms-forwho-compact">
          <div className="container">
            <Reveal>
              <div className="ms-forwho-compact-inner">
                <p className="ms-forwho-compact-label en">This fits if you —</p>
                <div className="ms-forwho-compact-list ko">
                  {[
                    "창업을 막 시작했거나 준비 중이다",
                    "혼자 하다 보니 방향이 흔들린다",
                    "실행하고 있지만 더 넓은 시야가 필요하다",
                    "실무적인 부분이 막막하다",
                    "비슷한 결의 사람들과 성장하고 싶다",
                  ].map((item, i) => (
                    <span key={i} className="ms-forwho-compact-tag">
                      <span className="ms-forwho-compact-check">✓</span> {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="section ms-benefits-section" id="benefits">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div className="eyebrow en">Membership Benefits</div>
                <h2>Three pillars.</h2>
              </div>
            </Reveal>

            <div className="ms-benefits-list">

              <Reveal>
                <div className="ms-benefit-row">
                  <div className="ms-benefit-label">
                    <span className="ms-benefit-num en">1</span>
                    <span className="ms-benefit-tag en">INSIGHT</span>
                  </div>
                  <div className="ms-benefit-body">
                    <h3 className="ms-benefit-title ko">
                      비즈니스 뉴스레터 &amp; 데일리 뉴스
                    </h3>
                    <p className="ms-benefit-desc ko">
                      좋은 창업가는 열심히만 하는 사람이 아니라, 무엇을 봐야 하는지 아는 사람입니다.
                      YFC 멤버에게는 비즈니스, 시장, 트렌드에 대한 인사이트를 더 빠르고 더 선별된 방식으로 제공합니다.
                    </p>
                    <ul className="ms-benefit-list ko">
                      <li>비즈니스 뉴스 큐레이션</li>
                      <li>트렌드 요약</li>
                      <li>창업가 관점의 인사이트</li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              <div className="ms-benefit-divider" />

              <div className="ms-benefit-row ms-benefit-row-support">
                <Reveal direction="left">
                  <div className="ms-benefit-label">
                    <span className="ms-benefit-num en">2</span>
                    <span className="ms-benefit-tag en">SUPPORT</span>
                  </div>
                </Reveal>
                <div className="ms-benefit-body">
                  <Reveal>
                    <h3 className="ms-benefit-title ko">전문 파트너 멤버 전용 혜택</h3>
                    <p className="ms-benefit-desc ko">
                      창업 초기에는 회계, 세무, 법률, IP 같은 것들을 자꾸 뒤로 미루게 됩니다.
                      하지만 중요한 문제는 나중이 아니라 초기에 만들어집니다.
                      YFC 멤버들이 필요한 순간 조금 더 빠르고, 조금 더 좋은 선택을 할 수 있도록
                      전문 파트너사와 멤버 전용 혜택을 제공합니다.
                    </p>
                  </Reveal>

                  <div className="ms-partner-grid">
                    {PARTNERS.map((p, i) => (
                      <Reveal key={i} delay={i * 80}>
                        <PartnerCard {...p} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ms-benefit-divider" />

              <Reveal>
                <div className="ms-benefit-row">
                  <div className="ms-benefit-label">
                    <span className="ms-benefit-num en">3</span>
                    <span className="ms-benefit-tag en">COMMUNITY</span>
                  </div>
                  <div className="ms-benefit-body">
                    <h3 className="ms-benefit-title ko">
                      청년 창업가 네트워크
                    </h3>
                    <p className="ms-benefit-desc ko">
                      비슷한 시기에, 비슷한 압박과 가능성을 안고 있는 청년 창업가들이 모이는 곳입니다.
                      혼자 버티는 창업보다, 서로 연결되고 자극받는 창업이 더 오래 갑니다.
                    </p>
                    <ul className="ms-benefit-list ko">
                      <li>멤버십 전용 네트워킹</li>
                      <li>YFC 행사 <strong>20% 할인</strong></li>
                      <li>실전 정보 공유</li>
                      <li>멤버 간 연결과 교류</li>
                    </ul>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="section ms-pricing-section" id="pricing">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div className="eyebrow en">Pricing</div>
                <h2>
                  Simple,
                  <br />
                  clear pricing.
                </h2>
              </div>
            </Reveal>

            <div className="ms-pricing-grid ms-pricing-grid-single">
              <Reveal delay={0}>
                <div className="ms-pricing-card ms-pricing-earlybird">
                  <div className="ms-pricing-tag en" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Membership
                  </div>
                  <div className="ms-pricing-price">
                    <span className="ms-price-amount en">49,000</span>
                    <span className="ms-price-unit ko" style={{ color: "rgba(255,255,255,0.5)" }}>원 / 월</span>
                  </div>
                  <ul className="ms-pricing-features ko ms-pricing-features-dark">
                    <li>인사이트 뉴스레터</li>
                    <li>전문 파트너 혜택</li>
                    <li>커뮤니티 네트워크</li>
                    <li>YFC 행사 20% 할인</li>
                  </ul>
                  <a
                    href={PAYMENT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="ms-pricing-cta"
                  >
                    지금 가입하기
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="join ms-final-cta">
          <div className="container">
            <Reveal>
              <div className="ms-final-inner">
                <div
                  className="eyebrow en"
                  style={{ color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}
                >
                  In One Line
                </div>
                <h2 className="ms-final-title en">
                  YFC is an action-first
                  <br />
                  <span style={{ color: "var(--accent)" }}>membership for founders.</span>
                </h2>
                <p className="ms-final-desc ko">
                  더 많이 아는 것보다,
                  <br />
                  더 잘 보고 더 멀리 가는 사람들을 위한 클럽.
                </p>
                <div className="ms-final-actions">
                  <a
                    href={PAYMENT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="ms-final-btn"
                  >
                    지금 가입하기
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                  <p className="ms-final-meta ko">
                    월 49,000원
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
