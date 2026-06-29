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
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 md:justify-between">
        <div className="absolute left-6 hidden gap-2 md:static md:flex">
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
        <nav className="hidden gap-2 md:flex">
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
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const seedsY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const pouchY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [-14, -26]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [11, 24]);
  const rot3 = useTransform(scrollYProgress, [0, 1], [7, 18]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const pouches = [
    { img: bottle1, rot: rot1, className: "left-[3%] top-[31%] h-[30vh] md:left-[9%] md:top-[28%] md:h-[44vh]" },
    { img: bottle2, rot: rot2, className: "right-[4%] top-[26%] h-[32vh] md:right-[11%] md:top-[22%] md:h-[48vh]" },
    { img: bottle3, rot: rot3, className: "left-1/2 top-[62%] h-[26vh] -translate-x-1/2 md:top-[58%] md:h-[38vh]" },
  ];

  const seeds = [
    { left: "8%", top: "19%", size: 32, delay: 0, duration: 8 },
    { left: "21%", top: "68%", size: 21, delay: 1.2, duration: 9 },
    { left: "34%", top: "18%", size: 17, delay: 0.4, duration: 7 },
    { left: "48%", top: "78%", size: 27, delay: 2.1, duration: 10 },
    { left: "63%", top: "16%", size: 24, delay: 1.7, duration: 8.5 },
    { left: "76%", top: "65%", size: 18, delay: 0.8, duration: 7.5 },
    { left: "89%", top: "28%", size: 30, delay: 2.5, duration: 9.5 },
    { left: "12%", top: "47%", size: 15, delay: 3.1, duration: 8.8 },
    { left: "84%", top: "48%", size: 16, delay: 1.4, duration: 7.8 },
  ];

  return (
    <section
  ref={ref}
  className="relative min-h-screen overflow-hidden bg-[#050505] pt-28 pb-20"
>
<div
  className="absolute inset-0"
  style={{
    background: `
      radial-gradient(circle at 20% 20%, rgba(255,215,0,.15), transparent 30%),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,.05), transparent 35%),
      radial-gradient(circle at center, rgba(255,255,255,.02), transparent 60%)
    `,
  }}
/>

<div className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,transparent_0%,rgba(255,255,255,.08)_50%,transparent_100%)]" />

<div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:18px_18px]" />
      <motion.div style={{ y: seedsY }} className="pointer-events-none absolute inset-0">
        {seeds.map((seed, i) => (
          <motion.span
            key={i}
            className="absolute block rounded-[52%_48%_47%_53%] border border-[#B67A35]/35 bg-[#FCF8F3] shadow-[inset_-6px_-7px_10px_rgba(182,122,53,0.18),0_14px_30px_rgba(107,80,53,0.13)]"
            style={{
              left: seed.left,
              top: seed.top,
              width: seed.size,
              height: seed.size * 0.82,
            }}
            animate={{
              y: [-12, 16, -12],
              x: [-4, 6, -4],
              rotate: [-8, 12, -8],
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: seed.duration,
              delay: seed.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ opacity, y: pouchY }} className="pointer-events-none absolute inset-0 z-[1]">
        {pouches.map((pouch, i) => (
          <motion.img
            key={i}
            src={pouch.img}
            alt=""
            style={{ rotate: pouch.rot }}
            animate={{ y: [-12, 14, -12] }}
            transition={{ repeat: Infinity, duration: 7 + i, ease: "easeInOut" }}
            className={`absolute hidden w-auto object-contain drop-shadow-[0_32px_45px_rgba(80,42,20,0.2)] md:block ${pouch.className}`}
          />
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl items-center justify-center px-6 text-center">
        <motion.div style={{ opacity, y: titleY }} className="mx-auto max-w-5xl">
          <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-[#708238]/25 bg-[#FCF8F3]/70 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#445126] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#708238]" />
            Premium Fox Nuts
          </div>
          <h1 className="font-display text-[clamp(4rem,15vw,12rem)] font-black uppercase leading-[0.78] tracking-normal text-[#445126]">
            Makhana
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-8 text-[#6B5035] md:text-xl">
            Air-popped lotus seeds, roasted for a feather-light crunch and finished with layered
            flavours that feel quietly indulgent.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="inline-flex items-center gap-3 rounded-full bg-[#445126] px-7 py-4 font-medium text-[#FFF9F1] transition-transform hover:scale-105">
              Shop now <span>→</span>
            </button>
            <a
              href="#process"
              className="inline-flex items-center gap-3 rounded-full border border-[#708238]/35 bg-[#FCF8F3]/65 px-7 py-4 font-medium text-[#445126] backdrop-blur transition-colors hover:bg-[#F7EAD7]"
            >
              See the journey
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center text-[11px] uppercase tracking-[0.32em] text-[#445126]/60">
        Float into flavour
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
      className="relative overflow-hidden py-20 md:py-28"
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
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--coral-deep)" }}>
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
      <Wave from="var(--makhana-cream)" to="var(--cocoa)" />
      <Marquee />
      <Wave from="var(--cocoa)" to="var(--cream)" />
      <FlavorsSection />
      <BenefitsSection />
      <ProcessSection />
      <Story />
      <Wave from="var(--cream)" to="var(--coral-deep)" />
      <CTA />
      <Footer />
    </div>
  );
}
