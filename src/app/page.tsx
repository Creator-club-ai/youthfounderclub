import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Rhythm from "@/components/home/Rhythm";
import Events from "@/components/home/Events";
import Circle from "@/components/home/Circle";
import Join from "@/components/home/Join";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <Navbar />

      <main id="top">
        <Hero />
        <Mission />
        <Rhythm />
        <Events />
        <Circle />
        {/* <Join /> */}
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
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
            <p className="footer-note">© 2024 Youth Founder Club.</p>
          </div>
          <div className="footer-links">
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
            <Link href="#">Discord</Link>
          </div>
          <div className="footer-meta">
            <Link href="#">Code of Conduct</Link>
            <Link href="#">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
