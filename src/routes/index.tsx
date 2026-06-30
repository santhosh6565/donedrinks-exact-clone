import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Lenis from "lenis";
import heroBowl from "@/assets/hero-section-image.png";
import makhanaImg from "@/assets/Makhana-img1.png";
import { useIsMobile } from "@/hooks/use-mobile";
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 md:justify-between">
        <div className="absolute left-6 hidden gap-2 md:static md:flex">
          {["✦", "◐", "✿"].map((s) => (
            <span
              key={s}
              className={`grid h-10 w-10 place-items-center rounded-full border border-[#f3c943]/15 bg-black/55 text-[#d2b48c] shadow-[0_12px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-[#f3c943]/35 hover:text-[#f3c943] ${scrolled ? "scale-90" : ""}`}
            >
              {s}
            </span>
          ))}
        </div>
        <div
          className={`rounded-full border border-[#f3c943]/18 bg-black/65 px-7 py-3 font-display text-xl font-black tracking-tight text-[#f8ead1] shadow-[0_16px_45px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all ${scrolled ? "scale-90" : ""}`}
        >
          MAKHANA
        </div>
        <nav className="hidden gap-2 md:flex">
          {links.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-full border border-[#f3c943]/12 bg-black/55 px-5 py-3 text-sm font-medium text-[#f8ead1] shadow-[0_12px_35px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#f3c943]/35 hover:bg-[#f3c943] hover:text-black"
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
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const wordRows = ["MAKHANA", "MAKHANA", "MAKHANA", "MAKHANA", "MAKHANA"];

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[var(--cream)] pt-24 pb-16 text-[#f3c943] md:pt-28"
    >
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 opacity-95"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(122,74,38,0.48),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(243,201,67,0.2),transparent_34%),linear-gradient(180deg,#050505_0%,#050505_54%,#110905_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.85)_1px,transparent_1px)] [background-size:3px_3px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62),transparent_24%,transparent_76%,rgba(0,0,0,0.62))]" />
      </motion.div>

      <motion.div
        style={{ opacity, y: titleY }}
        className="absolute inset-x-0 top-[8vh] z-0 select-none overflow-hidden text-center font-display text-[clamp(5.4rem,16vw,17.5rem)] font-black uppercase leading-[0.72]"
        aria-hidden
      >
        {wordRows.map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="bg-gradient-to-b from-[#7a4a26] via-[#4a2c17] to-[#d2b48c]/10 bg-clip-text text-transparent opacity-[0.48]"
            style={{ opacity: Math.max(0.13, 0.48 - index * 0.08) }}
          >
            {word}
          </div>
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] max-w-7xl flex-col items-center justify-center px-5 text-center">
      <motion.img
          src={heroBowl}
          alt="Bowl filled with roasted makhana"
          width={500}
          height={500}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-10 w-[min(84vw,700px)] object-contain drop-shadow-[0_48px_58px_rgba(0,0,0,0.72)] md:mt-16"
        />
        <motion.div style={{ opacity, y: titleY }} className="-mt-8 max-w-3xl md:-mt-12">
          <p className="text-balance text-base font-semibold uppercase tracking-[0.42em] text-[#f3c943]/82 md:text-lg">
            Premium Roasted Fox Nuts
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#flavors"
              className="rounded-full bg-[#f3c943] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black shadow-[0_18px_58px_rgba(243,201,67,0.28)] transition-all hover:-translate-y-1 hover:scale-105 hover:bg-[#ffe17a]"
            >
              Explore flavours
            </a>
            <a
              href="#process"
              className="rounded-full border border-[#f3c943]/38 bg-white/[0.035] px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#f3c943] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-[#f3c943]/12"
            >
              See process
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-center text-[10px] uppercase tracking-[0.34em] text-[#d2b48c]/70">
        <span>Scroll into flavour</span>
        <motion.span
          className="block h-9 w-px bg-gradient-to-b from-[#f3c943] to-transparent"
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent via-[#050505]/80 to-[var(--cream)]"
      />
    </section>
  );
}

function Marquee() {
  const items = [
    "No added sugar",
    "Real ingredients",
    "Gluten free",
    "20g protein",
    "High fiber",
    "Slow roasted",
  ];
  return (
    <div className="relative overflow-hidden bg-[var(--cream)] text-black">
      {/* Top wave */}
      <svg
        viewBox="0 0 1440 92"
        preserveAspectRatio="none"
        className="-mb-px block h-12 w-full md:h-20"
        aria-hidden
      >
        <path
          d="M0,58 C180,12 360,92 540,48 C720,4 900,88 1080,48 C1260,8 1360,42 1440,18 L1440,92 L0,92 Z"
          fill="#f7f7f2"
        />
      </svg>

      {/* Marquee section */}
      <div className="relative overflow-hidden bg-[#f7f7f2] py-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f7f7f2] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f7f7f2] to-transparent" />

        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl font-black uppercase leading-none md:text-5xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12">
              {items.map((t, i) => (
                <span
                  key={`${t}-${k}-${i}`}
                  className="marquee-wave inline-block italic"
                  style={{
                    animationDelay: `${(i + k * items.length) * -0.22}s`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <svg
        viewBox="0 0 1440 92"
        preserveAspectRatio="none"
        className="-mt-px block h-12 w-full bg-[var(--cream)] md:h-20"
        aria-hidden
      >
        <path
          d="M0,34 C190,76 360,-2 540,42 C720,86 900,10 1080,46 C1260,82 1360,50 1440,72 L1440,0 L0,0 Z"
          fill="#f7f7f2"
        />
      </svg>
    </div>
  );
}

function ScrollMakhanaLayer({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.45 });
  const topDrop = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["0vh", "19vh", "19vh", "30vh"] : ["0vh", "25vh", "25vh", "48vh"],
  );
  const topLeftDrop = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["2vh", "21vh", "21vh", "24vh"] : ["2vh", "28vh", "28vh", "30vh"],
  );
  const bottomLift = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["0vh", "-4vh", "-4vh", "0vh"] : ["0vh", "-8vh", "-8vh", "0vh"],
  );
  const topLeftX = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["-10vw", "-38vw", "-38vw", "-30vw"] : ["-7vw", "-46vw", "-46vw", "-35vw"],
  );
  const topRightX = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["4vw", "28vw", "28vw", "24vw"] : ["2vw", "37vw", "37vw", "40vw"],
  );
  const pull = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["0vw", "2vw", "2vw", "0vw"] : ["0vw", "4vw", "4vw", "0vw"],
  );
  const pullReverse = useTransform(pull, (value) => `-${value}`);
  const bottomRightDrop = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["0vh", "6vh", "6vh", "12vh"] : ["0vh", "10vh", "10vh", "20vh"],
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? [0.68, 0.88, 0.88, 0.72] : [0.78, 1.08, 1.08, 0.82],
  );
  const topLeftScale = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? [0.78, 1.02, 1.02, 0.95] : [1.1, 1.4, 1.4, 1.25],
  );

  const items = [
    { className: "img1 left-1/2 top-28 md:top-28", x: topLeftX, y: topLeftDrop, scale: topLeftScale, rotate: [-10, 9, -10] },
    { className: "img2 left-1/2 top-28 md:top-28", x: topRightX, y: topDrop, scale, rotate: [11, -8, 11] },
    { className: "img3 left-3 bottom-10 md:left-10 md:bottom-14", x: pull, y: bottomLift, scale, rotate: [10, -10, 10] },
    { className: "img4 right-3 bottom-10 md:right-10 md:bottom-14", x: pullReverse, y: bottomRightDrop, scale, rotate: [-11, 8, -11] },
  ];

  return (
    <div className="pointer-events-none sticky top-0 z-30 -mb-[100vh] h-screen overflow-hidden" aria-hidden>
      {items.map((item, index) => (
        <motion.div
          key={item.className}
          className={`absolute ${item.className}`}
          style={{ y: item.y, x: item.x, scale: item.scale }}
        >
          <motion.img
            src={makhanaImg}
            alt=""
            width={250}
            height={250}
            className="relative h-12 w-12 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] sm:h-14 sm:w-14 md:h-24 md:w-24 lg:h-28 lg:w-28"
            animate={{ y: [10, -22, 10], rotate: item.rotate, scale: [1, 1.06, 1] }}
            transition={{
              duration: 2.9 + index * 0.32,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function HeroFlavorsShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative bg-[#050505]">
      <ScrollMakhanaLayer targetRef={ref} />
      <Hero />
      <Marquee />
      <FlavorsSection />
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
      <HeroFlavorsShowcase />
      <BenefitsSection />
      <ProcessSection />
      <Story />
      <Wave from="var(--cream)" to="var(--coral-deep)" />
      <CTA />
      <Footer />
    </div>
  );
}
