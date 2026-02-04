import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="#top" className="brand">
            <Image
              src="/logo-black.webp"
              alt="Youth Founder Club Logo"
              width={82}
              height={22}
              className="brand-logo"
              style={{ objectFit: "contain", objectPosition: "left" }}
            />
          </Link>
          <div className="nav-links">
            <Link href="#mission">Manifesto</Link>
            <Link href="#rhythm">Rhythm</Link>
            <Link href="#circle">Circle</Link>
            <Link href="#join">Join</Link>
          </div>
          <div className="nav-cta">
            <Link href="#join" className="btn btn-solid">
              Join the Club
            </Link>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow en animate-fade-up">Youth Founders Club</div>
              <h1 className="animate-fade-up delay-100">
                Momentum is
                <br />
                <span className="accent">everything.</span>
              </h1>
              <p className="lead ko animate-fade-up delay-200">
                서로의 가능성을 믿고 끝까지 지지하는 곳.<br />
                20대 창업가들이 모여 가장 힙하고 자유로운 연대를 만듭니다.
              </p>
              <div className="hero-cta animate-fade-up delay-300">
                <Link href="#join" className="btn btn-solid">
                  Request Invite
                </Link>
                <Link href="#mission" className="btn btn-outline">
                  Manifesto
                </Link>
              </div>
              <div className="hero-meta animate-fade-up delay-300">
                <div className="meta-item">
                  <span className="meta-label">Style</span>
                  <span className="meta-value">Member-led</span>
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

        <section id="mission" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                Solidarity over lectures.
              </h2>
              <p className="sublead ko">
                우리는 가르치지 않습니다. 서로의 실행을 지지하고 함께 전진할 뿐입니다.
              </p>
            </div>
            <div className="grid-3 ko">
              <div className="card">
                <h3>Solidarity</h3>
                <p>
                  고민을 기꺼이 나누고 함께 버티는 힘을 얻습니다.
                </p>
              </div>
              <div className="card">
                <h3>Clarity</h3>
                <p>
                  공유와 회고를 통해 성장의 방향을 계속해서 점검합니다.
                </p>
              </div>
              <div className="card">
                <h3>Rhythm</h3>
                <p>
                  매주 반복되는 작은 성공이 모여 압도적인 성장을 만듭니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="rhythm" className="section rhythm">
          <div className="container">
            <div className="split">
              <div className="section-head" style={{ marginBottom: 0 }}>
                <h2>
                  A simple cadence.
                </h2>
                <p className="sublead ko">
                  단순하지만 강력한 세 가지 리추얼을 반복합니다.
                </p>
              </div>
              <div className="rhythm-steps ko">
                <div className="step">
                  <div className="step-num">Weekly</div>
                  <h4>매주 체크인</h4>
                  <p>한 주의 성과를 공유하고 피어 피드백을 주고받습니다.</p>
                </div>
                <div className="step">
                  <div className="step-num">Biweekly</div>
                  <h4>몰입의 밤</h4>
                  <p>함께 모여 집중하고 실행하며 실질적인 결과를 만듭니다.</p>
                </div>
                <div className="step">
                  <div className="step-num">Monthly</div>
                  <h4>쇼케이스</h4>
                  <p>한 달간의 결과물을 나누고 새로운 시각을 더합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="circle" className="section">
          <div className="container">
            <div className="section-head">
              <h2>
                Built for each other.
              </h2>
              <p className="sublead ko">
                동료의 존재가 당신의 성장을 증명하게 하세요.
              </p>
            </div>
            <div className="grid-2 ko">
              <div className="quote">
                <p>“정체되어 있을 때, 이곳의 동료들이 다시 나를 움직이게 합니다.”</p>
                <span>— 멤버 D</span>
              </div>
              <div className="quote">
                <p>“멘토보다 동료. 지금 내 길을 가장 잘 이해하는 사람들입니다.”</p>
                <span>— 멤버 Y</span>
              </div>
              <div className="quote">
                <p>“함께 모이는 것만으로도 나의 성장을 증명해야 할 책임감을 느껴요.”</p>
                <span>— 멤버 S</span>
              </div>
              <div className="quote">
                <p>“작은 성취가 축하받을 때, 다시 도전할 힘을 얻습니다.”</p>
                <span>— 멤버 H</span>
              </div>
            </div>
          </div>
        </section>

        <section id="join" className="section join">
          <div className="container join-grid">
            <div className="join-copy">
              <h2>
                Join the circle.
              </h2>
              <p className="sublead ko" style={{ marginTop: "16px", marginBottom: "32px" }}>
                지금 무언가를 빌딩하고 있다면, 이미 이곳의 일원입니다.
              </p>
              <div className="quote">
                “각자의 노력, 우리 모두의 속도.”
                <span>— YFC</span>
              </div>
            </div>
            <div className="join-panel">
              <div className="panel-top">
                <span className="panel-tag" style={{ color: "var(--accent)" }}>
                  Membership
                </span>
              </div>
              <form className="join-form" action="#">
                <div className="field">
                  <label>Name</label>
                  <input type="text" placeholder="이름을 입력하세요" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="you@email.com" />
                </div>
                <div className="field">
                  <label>Building what?</label>
                  <input type="text" placeholder="현재 빌딩 중인 것 한 문장" />
                </div>
                <button className="btn btn-solid btn-wide">제출하기</button>
              </form>
              <div className="join-meta">
                <span className="meta-label" style={{ fontSize: "0.7rem" }}>
                  * 멤버십은 간단한 인터뷰를 거쳐 승인됩니다.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="brand">
              <Image
                src="/logo-black.webp"
                alt="Youth Founder Club Logo"
                width={82}
                height={22}
                className="brand-logo"
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </div>
            <p className="footer-note">© 2024 Youth Founder Club.</p>
          </div>
          <div className="footer-links">
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
            <Link href="#">Discord</Link>
          </div>
          <div className="footer-meta">
            <Link href="#">Code of Conduct</Link>
            <Link href="#">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
