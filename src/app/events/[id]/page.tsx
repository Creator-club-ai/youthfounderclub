import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import { EVENT_ARCHIVE } from "@/data/events";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = EVENT_ARCHIVE.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="page" style={{ background: "#fff" }}>
      <Navbar />

      <main style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "120px" }}>
        <article className="container" style={{ maxWidth: "1000px" }}>

          {/* Header Section */}
          <header style={{ marginBottom: "64px", textAlign: "center", marginTop: "40px" }}>
            <Link
              href="/events"
              className="ko"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.95rem",
                fontWeight: "500",
                color: "var(--muted)",
                transition: "color 0.2s ease",
                marginBottom: "40px",
                textDecoration: "none"
              }}
            >
              <span>&larr;</span> 돌아가기
            </Link>

            <div className="en flex items-center justify-center gap-3 mb-6 text-sm font-semibold tracking-widest text-zinc-400 uppercase" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "0.08em", color: "#999", textTransform: "uppercase"
            }}>
              <span>{event.dateLabel}</span>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ccc" }}></span>
              <span>{event.location}</span>
            </div>

            <h1 className="en" style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "700",
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              marginBottom: "24px",
              lineHeight: 1.1
            }}>
              {event.title}
            </h1>

            <p className="ko" style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "var(--muted)",
              fontWeight: "500",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6
            }}>
              {event.summary}
            </p>
          </header>

          {/* Main Visual */}
          <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "80px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)"
          }}>
            <Image
              src={event.imageSrc}
              alt={event.imageAlt}
              fill
              priority
              style={{ objectFit: "cover", objectPosition: event.imagePosition || "center" }}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "64px" }}>

            {/* Left Column: Description & Quotes */}
            <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "64px" }}>

              {/* Description */}
              {event.fullDescription && (
                <section>
                  <h2 className="en" style={{ fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: "24px", borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
                    About the Event
                  </h2>
                  <p className="ko" style={{ fontSize: "1.1rem", color: "var(--ink)", lineHeight: 1.8 }}>
                    {event.fullDescription}
                  </p>
                </section>
              )}

              {/* Quotes */}
              {event.quotes && event.quotes.length > 0 && (
                <section>
                  <h2 className="en" style={{ fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: "24px", borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
                    Voices
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    {event.quotes.map((quote, idx) => (
                      <blockquote key={idx} style={{ paddingLeft: "24px", borderLeft: "3px solid #ddd" }}>
                        <p className="ko" style={{ fontSize: "1.2rem", fontWeight: "500", color: "var(--ink)", lineHeight: 1.6, marginBottom: "16px" }}>
                          "{quote.text}"
                        </p>
                        <footer className="ko" style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--muted)" }}>
                          — {quote.author}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column: Agenda */}
            <div style={{ flex: "0 1 340px" }}>
              {event.agenda && event.agenda.length > 0 && (
                <div style={{ background: "#fafafa", borderRadius: "16px", padding: "32px", position: "sticky", top: "120px", border: "1px solid var(--line)" }}>
                  <h2 className="en" style={{ fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: "24px", borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
                    Agenda
                  </h2>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "24px" }}>
                    {event.agenda.map((item, idx) => (
                      <li key={idx}>
                        <div className="en" style={{ fontSize: "0.8rem", fontWeight: "700", color: "#999", marginBottom: "4px", letterSpacing: "0.05em" }}>
                          {item.time}
                        </div>
                        <div className="ko" style={{ color: "var(--ink)", fontWeight: "500", fontSize: "1rem" }}>
                          {item.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <section style={{ marginTop: "120px" }}>
              <h2 className="en" style={{ fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: "32px", borderBottom: "1px solid var(--line)", paddingBottom: "16px", textAlign: "center" }}>
                Gallery
              </h2>
              <div className="event-gallery-grid">
                {event.gallery.map((imgSrc, idx) => (
                  <div key={idx} className="event-gallery-item">
                    <Image
                      src={imgSrc}
                      alt={`Gallery image ${idx + 1}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ width: "100%", height: "auto" }}
                      className="event-gallery-image"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
