import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Lenis from "lenis";
import bottle1 from "@/assets/bottle-1.png";
import bottle2 from "@/assets/bottle-2.png";
import bottle3 from "@/assets/bottle-3.png";
import {
  ProcessSection,
  FlavorsSection,
  BenefitsSection,
} from "@/components/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Makhana — A Snack Worth Finishing" },
      {
        name: "description",
        content:
          "Premium roasted makhana in signature flavours. Crunchy, light, protein-rich and crafted from harvest to pouch.",
      },
    ],
  }),
  component: Home,
});

function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className="relative w-full leading-[0]" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="block w-full h-[80px] md:h-[140px]"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          d="M0,80 C240,140 480,20 720,60 C960,100 1200,140 1440,60 L1440,140 L0,140 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Process", href: "#process" },
    { label: "Flavours", href: "#flavors" },
    { label: "Benefits", href: "#benefits" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex gap-2">
          {["✦", "◐", "✿"].map((s) => (
            <span
              key={s}
              className={`grid h-10 w-10 place-items-center rounded-full bg-cream text-cocoa transition-all ${scrolled ? "scale-90" : ""}`}
            >
              {s}
            </span>
          ))}
        </div>
        <div
          className={`rounded-full bg-cream px-6 py-3 font-display text-xl font-bold tracking-tight text-cocoa transition-all ${scrolled ? "scale-90" : ""}`}
        >
          MAKHANA
        </div>
        <nav className="flex gap-2">
          {links.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-full bg-cream px-5 py-3 text-sm font-medium text-cocoa hover:bg-blush transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [-8, -20]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [4, 18]);
  const rot3 = useTransform(scrollYProgress, [0, 1], [12, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const bottles = [
    { img: bottle1, y: y1, rot: rot1, x: "10%", scale: 1 },
    { img: bottle2, y: y2, rot: rot2, x: "38%", scale: 1.1 },
    { img: bottle3, y: y3, rot: rot3, x: "66%", scale: 0.95 },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-32 pb-24"
      style={{ background: "var(--coral)" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:items-center">
        <motion.div style={{ opacity }} className="relative z-10">
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-cocoa">
            A snack
            <br />
            worth
            <br />
            <em className="italic text-cream">finishing.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg text-cocoa/80">
            Crunchy, light, and quietly powerful. Makhana built to be the one you reach for, again
            and again.
          </p>
          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-coral-deep px-7 py-4 text-cream font-medium hover:scale-105 transition-transform">
            Shop now <span>→</span>
          </button>
        </motion.div>

        <div className="relative h-[520px] md:h-[640px]">
          {bottles.map((b, i) => (
            <motion.img
              key={i}
              src={b.img}
              alt=""
              style={{ y: b.y, rotate: b.rot, left: b.x, scale: b.scale }}
              className="absolute top-0 h-full w-[34%] object-contain drop-shadow-[0_30px_40px_rgba(80,20,10,0.3)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "No added sugar",
    "✦",
    "Real ingredients",
    "◐",
    "Gluten free",
    "✿",
    "20g protein",
    "✦",
    "High fiber",
    "◐",
  ];
  return (
    <div className="overflow-hidden bg-cocoa py-6 text-cream">
      <div className="flex w-max animate-marquee gap-12 font-display text-3xl md:text-5xl whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex gap-12">
            {items.map((t, i) => (
              <span key={i} className="italic">
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden py-32"
      style={{ background: "var(--cream)" }}
    >
      <motion.div style={{ y }} className="absolute -right-20 top-10 h-64 w-64 rounded-full opacity-30" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="inline-block rounded-full bg-coral/20 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-coral-deep">
          Our story
        </span>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-cocoa">
          We made the snack
          <br />
          we wished existed.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-cocoa/70">
          Most of what's on the shelf tastes like a compromise. We started with a small batch, a
          notebook, and a stubborn idea: crunch shouldn't be optional.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-32" style={{ background: "var(--coral-deep)" }}>
      <div className="mx-auto max-w-5xl px-6 text-center text-cream">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] italic">
          Ready?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg opacity-80">
          Three signature flavours. One crunchy obsession. Free shipping over $40.
        </p>
        <button className="mt-10 rounded-full bg-cream px-8 py-4 text-cocoa font-medium hover:scale-105 transition-transform">
          Shop the set →
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-cocoa py-16 text-cream/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="font-display text-2xl font-bold text-cream">MAKHANA</div>
        <div className="text-sm">
          © {new Date().getFullYear()} — Crafted with crunch.
        </div>
        <div className="flex gap-4">
          {["TT", "IG", "FB"].map((s) => (
            <span key={s} className="grid h-9 w-9 place-items-center rounded-full bg-cream/10">
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative">
      <StickyNav />
      <Hero />
      <Wave from="var(--coral)" to="var(--cocoa)" />
      <Marquee />
      <Wave from="var(--cocoa)" to="var(--cream)" />
      <ProcessSection />
      <FlavorsSection />
      <BenefitsSection />
      <Wave from="var(--cream)" to="var(--cream)" />
      <Story />
      <Wave from="var(--cream)" to="var(--coral-deep)" />
      <CTA />
      <Footer />
    </div>
  );
}
