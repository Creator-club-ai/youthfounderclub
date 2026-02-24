import { KAKAO_INVITE_URL } from "@/constants/links";

export default function Join() {
    return (
        <section id="join" className="section join">
            <div className="container">
                <div className="join-grid" style={{ alignItems: 'center' }}>

                    {/* Left Copy Area */}
                    <div className="join-copy">
                        <div className="eyebrow en" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Last Step</div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1.1', marginBottom: '24px' }}>
                            Join the circle.
                        </h2>
                        <div className="quote-minimal" style={{ borderColor: 'rgba(255,255,255,0.2)', marginTop: '40px' }}>
                            <p style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '16px', lineHeight: '1.5', fontWeight: '500' }}>
                                “각자의 점들이 모여 선이 되고,<br />그 선은 멈추지 않는 모멘텀이 됩니다.”
                            </p>
                            <span style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em' }}>— Youth Founder Club</span>
                        </div>
                    </div>

                    {/* Right Action Area */}
                    <div className="join-panel-minimal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '40px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="join-form" style={{ width: '100%', maxWidth: '400px' }}>
                            <p className="ko" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', lineHeight: '1.6' }}>
                                아래 버튼을 눌러 카카오톡 오픈채팅방에 참여하세요. 간단한 자기소개 후 바로 활동을 시작할 수 있습니다.
                            </p>

                            <a
                                href={KAKAO_INVITE_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-wide"
                                style={{
                                    background: '#fff',
                                    color: '#000',
                                    padding: '16px 24px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                초대 요청
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>

                            <div className="join-meta" style={{ marginTop: '24px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                                * 카카오톡 프로필로 참여 가능합니다.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
