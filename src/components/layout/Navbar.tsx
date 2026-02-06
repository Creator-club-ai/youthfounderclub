"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="#top" className="brand">
          <Image
            src="/logo-black.webp"
            alt="Youth Founder Club Logo"
            width={82}
            height={22}
            className="brand-logo"
            style={{ objectFit: "contain", objectPosition: "left" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link href="#mission">Manifesto</Link>
          <Link href="#rhythm">Rhythm</Link>
          <Link href="#circle">Circle</Link>
          <Link href="#join">Join</Link>
        </div>

        <div className="nav-cta">
          <Link href="#join" className="btn btn-solid">
            Join the Club
          </Link>
        </div>
      </div>
    </nav>
  );
}
