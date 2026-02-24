import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import { EVENT_ARCHIVE } from "@/data/events";

const archivedEvents = EVENT_ARCHIVE.filter((event) => event.status === "completed");

export default function EventsPage() {
  return (
    <div className="page">
      <Navbar />
      <main style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <header
            style={{
              marginBottom: "40px",
              paddingBottom: "24px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h1
              className="en"
              style={{
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: "1",
                margin: 0,
              }}
            >
              Archive
            </h1>
            <p className="ko" style={{ color: "var(--muted)", marginTop: "20px", fontSize: "1.05rem" }}>
              지난 행사 기록만 모아두는 아카이브 페이지입니다.
            </p>
          </header>

          {archivedEvents.length === 0 ? (
            <div className="glass-card ko">
              <h3>아직 아카이브가 없습니다.</h3>
              <p>행사가 끝난 뒤 `src/data/events.ts`에서 status를 `completed`로 바꾸면 여기에 표시됩니다.</p>
            </div>
          ) : (
            <div className="grid-3 ko" style={{ gap: "32px" }}>
              {archivedEvents.map((event) => (
                <Link
                  href={`/events/${event.id}`}
                  key={event.id}
                  className="aesthetic-card"
                >
                  <div className="aesthetic-card-image-wrap">
                    <Image
                      src={event.imageSrc}
                      alt={event.imageAlt}
                      fill
                      sizes="(max-width: 960px) 90vw, 30vw"
                      className="aesthetic-card-image"
                      style={{ objectPosition: event.imagePosition, objectFit: "cover" }}
                    />
                  </div>

                  <div className="aesthetic-card-content">
                    <h3 className="aesthetic-card-title">{event.title}</h3>
                    <p className="aesthetic-card-summary">{event.summary}</p>
                  </div>

                  <div className="aesthetic-card-footer">
                    <p className="aesthetic-card-meta">
                      {event.dateLabel} · {event.location}
                    </p>
                    <span className="aesthetic-card-action">
                      사진 보기 <span className="arrow" aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

