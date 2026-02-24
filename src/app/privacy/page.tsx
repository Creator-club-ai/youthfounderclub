import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function PrivacyPage() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h1>Privacy</h1>
              <p className="sublead ko">
                Youth Founder Club는 신청 과정에서 최소한의 정보만 수집하며, 커뮤니티 운영
                목적 외에는 사용하지 않습니다.
              </p>
            </div>
            <div className="grid-2 ko">
              <div className="glass-card">
                <h4>수집 항목</h4>
                <p>이름, 이메일, 현재 만들고 있는 프로젝트 설명</p>
              </div>
              <div className="glass-card">
                <h4>이용 목적</h4>
                <p>멤버십 심사, 커뮤니티 안내, 운영 공지 전달</p>
              </div>
              <div className="glass-card">
                <h4>보관 기간</h4>
                <p>신청 결과 안내 후 1년 또는 삭제 요청 시 즉시 파기</p>
              </div>
              <div className="glass-card">
                <h4>문의</h4>
                <p>정정/삭제 요청은 운영진에게 문의해 주세요.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
