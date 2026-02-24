import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Rhythm from "@/components/home/Rhythm";
import Events from "@/components/home/Events";
import Circle from "@/components/home/Circle";
import Join from "@/components/home/Join";

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
        <Join />
      </main>

      <SiteFooter />
    </div>
  );
}
