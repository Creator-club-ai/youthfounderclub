import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function About() {
    return (
        <div className="page">
            <Navbar />

            <main>
                {/* About Hero */}
                <section className="hero">
                    <div className="container">
                        <div className="hero-grid">
                            <div className="hero-copy">
                                <span className="eyebrow">About Us</span>
                                <h1>
                                    We build with <span className="accent">Audacity</span>.<br />
                                    We grow with <span className="accent">Solidarity</span>.
                                </h1>
                                <p className="lead">
                                    Youth Founder Club is a peer-led community where ambitious young
                                    builders come together to turn ideas into reality. We believe in
                                    learning by doing and growing together.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="section">
                    <div className="container">
                        <div className="section-head">
                            <h2>Our Story</h2>
                            <p className="sublead">
                                Started by a group of friends who wanted more than just school projects.
                                We wanted to build real products, solve real problems, and support each
                                other along the way.
                            </p>
                        </div>

                        <div className="grid-2">
                            <div className="card">
                                <div className="card-visual" style={{ background: 'var(--muted)', minHeight: '300px' }}>
                                    {/* Placeholder for an image */}
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', opacity: 0.5 }}>
                                        Create Image Here
                                    </div>
                                </div>
                                <h3>The Beginning</h3>
                                <p>
                                    It all started with a simple idea: what if we could learn faster by
                                    building together? We gathered, we coded, we failed, and we
                                    learned.
                                </p>
                            </div>
                            <div className="card">
                                <div className="card-visual" style={{ background: 'var(--muted)', minHeight: '300px' }}>
                                    {/* Placeholder for an image */}
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', opacity: 0.5 }}>
                                        Create Image Here
                                    </div>
                                </div>
                                <h3>The Vision</h3>
                                <p>
                                    Today, we are a thriving community of designers, developers, and
                                    entrepreneurs. Our vision is to empower every young person to
                                    become a creator.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="section bg-light">
                    <div className="container">
                        <div className="section-head">
                            <h2>Our Values</h2>
                        </div>
                        <div className="grid-3">
                            <div className="glass-card">
                                <h4>Boldness</h4>
                                <p>We are not afraid to take risks and challenge the status quo.</p>
                            </div>
                            <div className="glass-card">
                                <h4>Community</h4>
                                <p>We support each other. Your success is our success.</p>
                            </div>
                            <div className="glass-card">
                                <h4>Growth</h4>
                                <p>We are constantly learning and improving our craft.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join CTA */}
                <section className="section join">
                    <div className="container">
                        <div className="join-panel-glass">
                            <div className="section-head" style={{ marginBottom: '40px' }}>
                                <h2 style={{ color: 'white' }}>Ready to join us?</h2>
                                <p className="sublead" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Become a part of the movement.
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link href="/#join" className="btn btn-outline" style={{ background: 'white', color: 'black', border: 'none' }}>
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

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
