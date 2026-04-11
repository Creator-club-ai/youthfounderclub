import Image from "next/image";
import Link from "next/link";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/membership", label: "Membership" },
];

const policyLinks = [
  { href: "/code-of-conduct", label: "Code of Conduct" },
  { href: "/privacy", label: "Privacy" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
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
          <p className="footer-note">© {year} Youth Founder Club.</p>
        </div>
        <div className="footer-links">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-meta">
          {policyLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
