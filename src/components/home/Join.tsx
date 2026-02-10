export default function Join() {
    return (
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
                <div className="join-panel-minimal">
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
                        <div style={{ marginTop: '32px' }}>
                            <button className="btn btn-outline btn-wide" style={{ borderColor: '#fff', color: '#fff' }}>
                                Request Invite
                            </button>
                        </div>
                    </form>
                    <div className="join-meta">
                        * 멤버십은 간단한 인터뷰를 거쳐 승인됩니다.
                    </div>
                </div>
            </div>
        </section>
    );
}
