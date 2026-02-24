"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KAKAO_INVITE_URL } from "@/constants/links";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Youth Founder Club home">
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
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "is-active" : ""}`.trim()}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={`nav-link ${pathname === "/events" ? "is-active" : ""}`.trim()}
          >
            Events
          </Link>
        </div>

        <div className="nav-cta">
          <a
            href={KAKAO_INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-solid"
          >
            커뮤니티 참여하기
          </a>
        </div>
      </div>
    </nav>
  );
}
