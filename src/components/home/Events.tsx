import Link from "next/link";
import Image from "next/image";

export default function Events() {
    return (
        <section id="events" className="section">
            <div className="container">
                <div className="section-head">
                    <h2>
                        Always happening.
                    </h2>
                    <p className="sublead ko">
                        정기 세션 외에도, 창업가들을 위한 다양한 이벤트가 계속됩니다.
                    </p>
                </div>

                <div className="grid-3 ko">
                    <div className="card">
                        <div className="card-visual" style={{ minHeight: '240px', position: 'relative', overflow: 'hidden' }}>
                            <Image
                                src="/E1_05628.JPG"
                                alt="Founder Talk"
                                fill
                                style={{ objectFit: 'cover', objectPosition: '20% center', transform: 'scale(2.0)' }}
                            />
                        </div>
                        <h3>Founder Talk</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>선배 창업가들의 생생한 경험담과 인사이트를 나누는 시간.</p>
                    </div>

                    <div className="card">
                        <div className="card-visual" style={{ minHeight: '240px', position: 'relative', overflow: 'hidden' }}>
                            <Image
                                src="/videoframe_3417.png"
                                alt="Networking Party"
                                fill
                                style={{ objectFit: 'cover', objectPosition: '70% center', transform: 'scale(1.5)' }}
                            />
                        </div>
                        <h3>Networking Party</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>캐주얼한 분위기에서 서로를 알아가고 새로운 기회를 발견합니다.</p>
                    </div>

                    <div className="card">
                        <div className="card-visual" style={{ minHeight: '240px', position: 'relative', overflow: 'hidden' }}>
                            <Image
                                src="/P20260101_093613000_8B8FAF6B-8412-4887-A666-5956E166A896.PNG"
                                alt="Theme Workshop"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.1)' }}
                            />
                        </div>
                        <h3>Theme Workshop</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>브랜딩, 마케팅 등 창업의 지속 가능한 성장을 돕는 핵심 주제들을 깊이 있게 다룹니다.</p>
                    </div>
                </div>


            </div>
        </section>
    );
}
