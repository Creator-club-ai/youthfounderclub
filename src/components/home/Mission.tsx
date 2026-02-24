import Image from "next/image";

export default function Mission() {
    return (
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
                    <div className="card-visual">
                        <Image
                            src="/E1_05647.JPG"
                            alt="Solidarity"
                            fill
                            sizes="(max-width: 960px) 90vw, 30vw"
                            className="visual-image"
                            style={{ objectFit: "cover", transform: "scale(1.1)" }}
                        />
                        <h3>Solidarity</h3>
                        <p>
                            고민을 기꺼이 나누고 함께 버티는 힘을 얻습니다.
                        </p>
                    </div>
                    <div className="card-visual">
                        <Image
                            src="/E1_05706.JPG"
                            alt="Clarity"
                            fill
                            sizes="(max-width: 960px) 90vw, 30vw"
                            className="visual-image"
                            style={{ objectFit: "cover", objectPosition: "70% center" }}
                        />
                        <h3>Clarity</h3>
                        <p>
                            공유와 회고를 통해 성장의 방향을 계속해서 점검합니다.
                        </p>
                    </div>
                    <div className="card-visual">
                        <Image
                            src="/E1_05784.JPG"
                            alt="Rhythm"
                            fill
                            sizes="(max-width: 960px) 90vw, 30vw"
                            className="visual-image"
                            style={{ objectFit: "cover" }}
                        />
                        <h3>Rhythm</h3>
                        <p>
                            매주 반복되는 작은 성공이 모여 압도적인 성장을 만듭니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
