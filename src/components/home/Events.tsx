import Image from "next/image";
import Link from "next/link";
import { EVENT_ARCHIVE } from "@/data/events";

const showcaseEvents = EVENT_ARCHIVE.slice(0, 3);

export default function Events() {
  return (
    <section id="events" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Always happening.</h2>
          <p className="sublead ko">우리가 함께 만들어가는 멈추지 않는 모멘텀의 기록들입니다.</p>
        </div>

        <div className="grid-3 ko" style={{ gap: "32px" }}>
          {showcaseEvents.map((event) => (
            <div className="card-visual" key={event.id}>
              <Image
                src={event.imageSrc}
                alt={event.imageAlt}
                fill
                sizes="(max-width: 960px) 90vw, 30vw"
                className="visual-image"
                style={{
                  objectFit: "cover",
                  objectPosition: event.imagePosition,
                  transform: `scale(${event.imageScale})`,
                }}
              />
              <h3>{event.title}</h3>
              <p>{event.summary}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
          <Link href="/events" className="btn btn-outline" style={{ padding: "12px 32px", fontSize: "1rem" }}>
            이벤트 아카이브 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
