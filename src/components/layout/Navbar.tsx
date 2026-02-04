"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="#top" className="brand" onClick={closeMenu}>
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

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${isOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation Content */}
        <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
          <div className="mobile-nav-links">
            <Link href="#mission" onClick={closeMenu}>
              Manifesto
            </Link>
            <Link href="#rhythm" onClick={closeMenu}>
              Rhythm
            </Link>
            <Link href="#circle" onClick={closeMenu}>
              Circle
            </Link>
            <Link href="#join" onClick={closeMenu}>
              Join
            </Link>
          </div>
          <div className="mobile-nav-cta">
            <Link href="#join" className="btn btn-solid btn-wide" onClick={closeMenu}>
              Join the Club
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
