import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Lenis from "lenis";
import bottle1 from "@/assets/bottle-1.png";
import bottle2 from "@/assets/bottle-2.png";
import bottle3 from "@/assets/bottle-3.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wave — A Drink Worth Finishing" },
      { name: "description", content: "Smooth, scroll-driven product showcase with wave transitions." },
    ],
  }),
  component: Home,
});

const FLAVORS = [
  { name: "Vanilla Cloud", color: "var(--cream)", text: "var(--cocoa)", img: bottle1, note: "Soft, mellow, lightly sweet." },
  { name: "Deep Cocoa", color: "var(--cocoa)", text: "var(--cream)", img: bottle2, note: "Rich, roasted, unapologetic." },
  { name: "Wild Berry", color: "var(--blush)", text: "var(--coral-deep)", img: bottle3, note: "Bright, tart, a little wild." },
];

function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className="relative w-full leading-[0]" style={{ background: from }}>
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block w-full h-[80px] md:h-[140px]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
        <path d="M0,80 C240,140 480,20 720,60 C960,100 1200,140 1440,60 L1440,140 L0,140 Z" fill={to} />
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
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex gap-2">
          {["✦", "◐", "✿"].map((s) => (
            <span key={s} className={`grid h-10 w-10 place-items-center rounded-full bg-cream text-cocoa transition-all ${scrolled ? "scale-90" : ""}`}>{s}</span>
          ))}
        </div>
        <div className={`rounded-full bg-cream px-6 py-3 font-display text-xl font-bold tracking-tight text-cocoa transition-all ${scrolled ? "scale-90" : ""}`}>WAVE</div>
        <nav className="flex gap-2">
          {["Story", "Flavors"].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="rounded-full bg-cream px-5 py-3 text-sm font-medium text-cocoa hover:bg-blush transition-colors">{n}</a>
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

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-32 pb-24" style={{ background: "var(--coral)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2 md:items-center">
        <motion.div style={{ opacity }} className="relative z-10">
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-cocoa">
            A drink<br />worth<br /><em className="italic text-cream">finishing.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg text-cocoa/80">Smooth on the way down. Lingers in the best way. Built to be the one you reach for, again and again.</p>
          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-coral-deep px-7 py-4 text-cream font-medium hover:scale-105 transition-transform">
            Shop now <span>→</span>
          </button>
        </motion.div>

        <div className="relative h-[520px] md:h-[640px]">
          {[
            { img: bottle1, y: y1, rot: rot1, x: "10%", scale: 1 },
            { img: bottle2, y: y2, rot: rot2, x: "38%", scale: 1.1 },
            { img: bottle3, y: y3, rot: rot3, x: "66%", scale: 0.95 },
          ].map((b, i) => (
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

      {/* spinning play badge */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
            <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text className="fill-cocoa text-[10px] tracking-[0.3em] font-medium">
              <textPath href="#circ">• WATCH • TASTE • REPEAT </textPath>
            </text>
          </svg>
          <div className="absolute inset-3 grid place-items-center rounded-full bg-cream text-cocoa">▶</div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden bg-cocoa py-6 text-cream">
      <div className="flex w-max animate-marquee gap-12 font-display text-3xl md:text-5xl whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex gap-12">
            {["No added sugar", "✦", "Real ingredients", "◐", "Lactose free", "✿", "20g protein", "✦", "High fiber", "◐"].map((t, i) => (
              <span key={i} className="italic">{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PinnedFlavors() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(FLAVORS.length - 1, Math.floor(v * FLAVORS.length));
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section ref={ref} id="flavors" className="relative" style={{ height: `${FLAVORS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden transition-colors duration-700" style={{ background: FLAVORS[active].color, color: FLAVORS[active].text }}>
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2">
          <div>
            <div className="mb-4 text-sm uppercase tracking-[0.3em] opacity-60">Flavor {active + 1} / {FLAVORS.length}</div>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95]">{FLAVORS[active].name}</h2>
            <p className="mt-6 max-w-md text-xl opacity-80">{FLAVORS[active].note}</p>
            <div className="mt-10 flex gap-2">
              {FLAVORS.map((_, i) => (
                <div key={i} className="h-1 w-12 rounded-full" style={{ background: "currentColor", opacity: i === active ? 1 : 0.25 }} />
              ))}
            </div>
          </div>
          <div className="relative h-[70vh]">
            {FLAVORS.map((f, i) => (
              <motion.img
                key={i}
                src={f.img}
                alt={f.name}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : 0.85,
                  rotate: i === active ? -6 : 12,
                  y: i === active ? 0 : 60,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 m-auto h-full w-auto object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.3)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 80, damping: 20 });

  return (
    <section id="story" ref={ref} className="relative overflow-hidden py-32" style={{ background: "var(--cream)" }}>
      <motion.div style={{ y }} className="absolute -right-20 top-10 h-64 w-64 rounded-full opacity-30" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="inline-block rounded-full bg-coral/20 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-coral-deep">Our story</span>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-cocoa">
          We made the drink<br />we wished existed.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-cocoa/70">
          Most of what's on the shelf tastes like a compromise. We started in a kitchen with a blender, a notebook, and a stubborn idea: smoothness shouldn't be optional.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-32" style={{ background: "var(--coral-deep)" }}>
      <div className="mx-auto max-w-5xl px-6 text-center text-cream">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] italic">Ready?</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg opacity-80">Three flavors. One smooth ride. Free shipping over $40.</p>
        <button className="mt-10 rounded-full bg-cream px-8 py-4 text-cocoa font-medium hover:scale-105 transition-transform">Shop the trio →</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-cocoa py-16 text-cream/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="font-display text-2xl font-bold text-cream">WAVE</div>
        <div className="text-sm">© {new Date().getFullYear()} — A demo of scroll & wave UI.</div>
        <div className="flex gap-4">{["TT", "IG", "FB"].map((s) => <span key={s} className="grid h-9 w-9 place-items-center rounded-full bg-cream/10">{s}</span>)}</div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
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
      <PinnedFlavors />
      <Wave from="var(--blush)" to="var(--cream)" />
      <Story />
      <Wave from="var(--cream)" to="var(--coral-deep)" />
      <CTA />
      <Footer />
    </div>
  );
}
