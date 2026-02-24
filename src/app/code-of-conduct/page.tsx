import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function CodeOfConductPage() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h1>Code of Conduct</h1>
              <p className="sublead ko">
                Youth Founder Club는 서로의 실행을 존중하는 커뮤니티입니다. 모든 멤버는
                아래 원칙을 지킵니다.
              </p>
            </div>
            <div className="grid-2 ko">
              <div className="glass-card">
                <h4>존중</h4>
                <p>배경과 수준이 달라도 서로를 존중하고, 공격적인 표현을 피합니다.</p>
              </div>
              <div className="glass-card">
                <h4>실행 중심</h4>
                <p>비난보다 피드백을, 관찰보다 실행을 우선합니다.</p>
              </div>
              <div className="glass-card">
                <h4>신뢰</h4>
                <p>커뮤니티 내 공유된 민감한 정보는 외부에 무단 공유하지 않습니다.</p>
              </div>
              <div className="glass-card">
                <h4>안전</h4>
                <p>차별, 괴롭힘, 불쾌한 언행이 확인되면 운영진이 즉시 조치합니다.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
