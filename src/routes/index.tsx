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
  {
    name: "Vanilla Cloud",
    tag: "Smooth · Mellow",
    bg: "var(--cream)",
    text: "var(--cocoa)",
    accent: "var(--coral-deep)",
    img: bottle1,
    note: "Soft, mellow, lightly sweet — like a quiet morning.",
    facts: [
      { k: "Calories", v: "120" },
      { k: "Protein", v: "20g" },
      { k: "Sugar", v: "2g" },
      { k: "Caffeine", v: "0mg" },
    ],
    ingredients: ["Madagascar vanilla", "Oat milk", "Whey isolate", "Sea salt"],
  },
  {
    name: "Deep Cocoa",
    tag: "Rich · Roasted",
    bg: "var(--cocoa)",
    text: "var(--cream)",
    accent: "var(--coral)",
    img: bottle2,
    note: "Rich, roasted, unapologetic. The dessert that isn't one.",
    facts: [
      { k: "Calories", v: "140" },
      { k: "Protein", v: "22g" },
      { k: "Sugar", v: "3g" },
      { k: "Caffeine", v: "45mg" },
    ],
    ingredients: ["Dutch cocoa", "Cold-brew espresso", "Whey isolate", "Cane sugar"],
  },
  {
    name: "Wild Berry",
    tag: "Bright · Tart",
    bg: "var(--blush)",
    text: "var(--coral-deep)",
    accent: "var(--cocoa)",
    img: bottle3,
    note: "Bright, tart, a little wild — picked at the right time.",
    facts: [
      { k: "Calories", v: "110" },
      { k: "Protein", v: "18g" },
      { k: "Sugar", v: "4g" },
      { k: "Caffeine", v: "0mg" },
    ],
    ingredients: ["Wild blueberry", "Raspberry", "Whey isolate", "Lemon zest"],
  },
  {
    name: "Golden Spice",
    tag: "Warm · Toasted",
    bg: "var(--coral)",
    text: "var(--cocoa)",
    accent: "var(--cream)",
    img: bottle1,
    note: "Toasted turmeric and a whisper of cardamom. Warm without the heat.",
    facts: [
      { k: "Calories", v: "130" },
      { k: "Protein", v: "20g" },
      { k: "Sugar", v: "3g" },
      { k: "Caffeine", v: "0mg" },
    ],
    ingredients: ["Turmeric", "Cardamom", "Coconut cream", "Whey isolate"],
  },
  {
    name: "Mint Grove",
    tag: "Crisp · Cool",
    bg: "var(--sage)",
    text: "var(--cocoa)",
    accent: "var(--coral-deep)",
    img: bottle2,
    note: "Fresh-cut mint and a clean finish. The reset button.",
    facts: [
      { k: "Calories", v: "115" },
      { k: "Protein", v: "19g" },
      { k: "Sugar", v: "2g" },
      { k: "Caffeine", v: "30mg" },
    ],
    ingredients: ["Peppermint leaf", "Spearmint", "Whey isolate", "Matcha"],
  },
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

function HorizontalFlavors() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Move horizontally: travel = (n-1)/n of total width since each panel = 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(FLAVORS.length - 1) * (100 / FLAVORS.length)}%`]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(FLAVORS.length - 1, Math.floor(v * FLAVORS.length + 0.0001));
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section
      id="flavors"
      ref={ref}
      className="relative"
      style={{ height: `${FLAVORS.length * 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-screen overflow-hidden transition-colors duration-700"
        style={{ background: FLAVORS[active].bg, color: FLAVORS[active].text }}
      >
        {/* progress strip */}
        <div className="absolute top-24 left-0 right-0 z-20 mx-auto flex max-w-7xl items-center gap-3 px-6">
          <div className="text-xs uppercase tracking-[0.3em] opacity-70">
            {String(active + 1).padStart(2, "0")} / {String(FLAVORS.length).padStart(2, "0")}
          </div>
          <div className="flex flex-1 gap-2">
            {FLAVORS.map((_, i) => (
              <div key={i} className="h-[2px] flex-1 overflow-hidden" style={{ background: "currentColor", opacity: 0.2 }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{ background: "currentColor", width: i < active ? "100%" : i === active ? "100%" : "0%", opacity: i <= active ? 1 : 0 }}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div style={{ x, width: `${FLAVORS.length * 100}vw` }} className="flex h-full">
          {FLAVORS.map((f, i) => (
            <div key={f.name} className="flex h-full w-screen shrink-0 items-center px-6 md:px-16">
              <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: active === i ? 1 : 0.3, y: active === i ? 0 : 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-xs uppercase tracking-[0.3em] opacity-70"
                  >
                    {f.tag}
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: active === i ? 1 : 0.2, y: active === i ? 0 : 40 }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95]"
                  >
                    {f.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: active === i ? 0.85 : 0.2, y: active === i ? 0 : 30 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="max-w-md text-lg"
                  >
                    {f.note}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: active === i ? 1 : 0.2, y: active === i ? 0 : 30 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="grid grid-cols-4 gap-3 pt-2"
                  >
                    {f.facts.map((fact) => (
                      <div key={fact.k} className="rounded-2xl border px-3 py-3" style={{ borderColor: "currentColor", opacity: 0.95 }}>
                        <div className="font-display text-xl font-bold leading-none">{fact.v}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-60">{fact.k}</div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.ul
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: active === i ? 1 : 0.2, y: active === i ? 0 : 30 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    {f.ingredients.map((ing) => (
                      <li key={ing} className="rounded-full px-3 py-1 text-xs" style={{ background: f.accent, color: f.bg }}>
                        {ing}
                      </li>
                    ))}
                  </motion.ul>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="mt-4 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium"
                    style={{ background: f.accent, color: f.bg }}
                  >
                    Add to box →
                  </motion.button>
                </div>

                <div className="relative h-[60vh]">
                  <motion.img
                    src={f.img}
                    alt={f.name}
                    initial={false}
                    animate={{
                      scale: active === i ? 1 : 0.85,
                      rotate: active === i ? -6 : 8,
                      opacity: active === i ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 m-auto h-full w-auto object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.3)]"
                  />
                  <motion.div
                    initial={false}
                    animate={{ rotate: active === i ? 360 : 0 }}
                    transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                    className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-full border-2 md:block"
                    style={{ borderColor: "currentColor", opacity: 0.4 }}
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-display text-[10rem] font-bold leading-none opacity-10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* hint */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 text-xs uppercase tracking-[0.3em] opacity-60">
          Scroll <span className="inline-block">→</span>
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
        <p className="mx-auto mt-6 max-w-lg text-lg opacity-80">Five flavors. One smooth ride. Free shipping over $40.</p>
        <button className="mt-10 rounded-full bg-cream px-8 py-4 text-cocoa font-medium hover:scale-105 transition-transform">Shop the set →</button>
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
      <HorizontalFlavors />
      <Wave from="var(--sage)" to="var(--cream)" />
      <Story />
      <Wave from="var(--cream)" to="var(--coral-deep)" />
      <CTA />
      <Footer />
    </div>
  );
}
