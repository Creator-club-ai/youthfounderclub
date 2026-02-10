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
        <Link href="/" className="brand">
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
          <Link href="/about">About</Link>
        </div>


      </div>
    </nav>
  );
}
