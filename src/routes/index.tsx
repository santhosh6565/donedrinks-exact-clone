import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, RefObject, SVGProps } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Lenis from "lenis";
import { ArrowRight, Facebook, Instagram, MapPin, MessageCircle, Moon, Phone, Sun } from "lucide-react";
import heroBowl from "@/assets/hero-section-image.png";
import makhanaImg from "@/assets/Makhana-img1.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProcessSection, FlavorsSection, BenefitsSection } from "@/components/sections";
import lotferoxLogo from "@/assets/Lotferox_logo.png";

//TODO: Add WhatsApp number and message
const WHATSAPP_NUMBER = "919884471751";
const WHATSAPP_MESSAGE =
  "Hi LoTFerox, I would like to order your 25 gm roasted makhana flavours. Please share available flavours, prices, and delivery details.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const FACEBOOK_HREF = "https://www.facebook.com/";
const INSTAGRAM_HREF = "https://www.instagram.com/";
const THEME_STORAGE_KEY = "lotferox-theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoTFerox Nuts Roasted Makhana | 25 gm Fox Nuts Snacks" },
      {
        name: "description",
        content:
          "Shop LoTFerox Nuts roasted makhana fox nuts in 25 gm packs. Vegan, gluten free, roasted not fried and available in Mint Pudina, Himalayan Salt & Pepper, Cream & Onion, Mix Masala, Tomato Tango and Tangy Cheese.",
      },
      {
        name: "keywords",
        content:
          "LoTFerox, LoTFerox Nuts, roasted makhana, fox nuts, makhana snacks, 25 gm makhana, vegan snacks, gluten free snacks, roasted not fried makhana",
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

function BrandButton({
  href,
  children,
  icon: Icon,
  external = false,
  compact = false,
  tone = "light",
}: {
  href: string;
  children: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border font-black uppercase tracking-[0.13em] text-[#24180b] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe17a] focus-visible:ring-offset-2 ${
        isDark
          ? "border-[#fff2a8]/75 bg-[linear-gradient(135deg,#fff8c7_0%,#ffd95a_48%,#f0b93d_100%)] shadow-[0_22px_52px_rgba(0,0,0,0.36),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.82)] hover:border-white hover:shadow-[0_28px_68px_rgba(255,217,90,0.2),0_24px_58px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.88)] focus-visible:ring-offset-[var(--coral-deep)]"
          : "border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,235,168,0.84)_48%,rgba(255,255,255,0.74))] shadow-[0_20px_48px_rgba(43,33,27,0.16),inset_0_1px_0_rgba(255,255,255,0.86)] hover:border-white hover:shadow-[0_28px_62px_rgba(43,33,27,0.22),inset_0_1px_0_rgba(255,255,255,0.9)] focus-visible:ring-offset-[color:var(--hero-ring-offset)]"
      } ${
        compact ? "min-h-12 gap-3 py-1.5 pl-5 pr-1.5 text-xs" : "min-h-14 gap-4 py-1.5 pl-6 pr-1.5 text-sm"
      }`}
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/55 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-1 rounded-full border border-white/45" />
      <span className="relative whitespace-nowrap">{children}</span>
      <span
        className={`relative grid place-items-center rounded-full bg-[#2b211b] text-[#fff4c2] shadow-[0_10px_22px_rgba(43,33,27,0.28),inset_0_1px_0_rgba(255,255,255,0.16)] transition-transform group-hover:translate-x-1 ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
      >
        <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
      </span>
    </a>
  );
}

function ThemeToggle({ scrolled }: { scrolled: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isDark = theme === "dark";

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : prefersDark
        ? "dark"
        : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={`group grid h-10 w-10 place-items-center rounded-full border border-[#f3c943]/20 bg-black/55 text-[#ffe17a] shadow-[0_12px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#f3c943]/45 hover:bg-[#f3c943] hover:text-black md:h-10 md:w-10 ${scrolled ? "scale-90" : ""}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden />
      ) : (
        <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12" aria-hidden />
      )}
    </button>
  );
}

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const upwardScrollDistance = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < 4) return;

      setScrolled(currentY > 40);

      if (delta > 0) {
        upwardScrollDistance.current = 0;
        setHidden(currentY > 120);
      } else {
        upwardScrollDistance.current += Math.abs(delta);
        if (upwardScrollDistance.current > 90 || currentY < 80) {
          setHidden(false);
        }
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Flavours", href: "#flavors" },
    { label: "Benefits", href: "#benefits" },
    { label: "Process", href: "#process" },
  ];
  const socialLinks = [
    { label: "Facebook", href: FACEBOOK_HREF, icon: Facebook },
    { label: "WhatsApp", href: WHATSAPP_HREF, icon: MessageCircle },
    { label: "Instagram", href: INSTAGRAM_HREF, icon: Instagram },
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "py-3" : "py-6"
      } ${hidden ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
    >
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-center px-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:justify-between ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
       <div
          className={`absolute right-6 h-16 w-36 overflow-hidden md:static md:h-16 md:w-36 ${
            scrolled
              ? "scale-90"
              : "scale-100"
          }`}
        >
          <img
            src={lotferoxLogo}
            alt="Lotferox"
            className="h-full w-full object-contain"
          />
        </div>
        <nav className="hidden gap-2 md:flex">
          {links.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-full border border-[#f3c943]/12 bg-black/55 px-5 py-2 text-sm font-medium text-[#f8ead1] shadow-[0_12px_35px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#f3c943]/35 hover:bg-[#f3c943] hover:text-black hover:shadow-[0_18px_42px_rgba(243,201,67,0.18)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="absolute left-6 flex gap-2 md:static">
          <ThemeToggle scrolled={scrolled} />
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`hidden h-10 w-10 place-items-center rounded-full border border-[#f3c943]/15 bg-black/55 text-[#d2b48c] shadow-[0_12px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#f3c943]/35 hover:text-[#f3c943] md:grid ${scrolled ? "scale-90" : ""}`}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </a>
          ))}
        </div>
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
      className="relative min-h-screen overflow-hidden bg-[var(--cream)] pt-24 pb-16 text-[var(--hero-accent)] md:pt-28"
    >
      <motion.div style={{ y: glowY }} className="absolute inset-0 opacity-95" aria-hidden>
        <div className="absolute inset-0 bg-[var(--cream)]" />
        {/* <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,var(--hero-speckle)_1px,transparent_1px)] [background-size:3px_3px]" /> */}
        <div className="absolute inset-0" />
      </motion.div>

      <motion.div
        style={{ opacity, y: titleY }}
        className="absolute inset-x-0 top-[8vh] z-0 select-none overflow-hidden text-center font-display text-[clamp(5.4rem,16vw,17.5rem)] font-black uppercase leading-[0.72]"
        aria-hidden
      >
        {wordRows.map((word, index) => (
          <div
            key={`${word}-${index}`}
            className="bg-[image:var(--hero-word-gradient)] bg-clip-text text-transparent opacity-[0.48]"
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
          width={300}
          height={300}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-10 w-[min(84vw,650px)] object-contain drop-shadow-[var(--hero-image-shadow)] md:mt-16"
        />
        <motion.div
          style={{ opacity, y: titleY }}
          className="-mt-8 mb-8 md:mb-8 max-w-3xl md:-mt-12"
        >
          <p className="text-balance text-base font-semibold uppercase tracking-[0.42em] text-[color:var(--hero-kicker)] md:text-lg">
            Smart Snacking For Smart People
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BrandButton href="#flavors" icon={ArrowRight}>
              Explore 25 gm flavours
            </BrandButton>
            <a
              href="#process"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[color:var(--hero-secondary-border)] bg-[var(--hero-secondary-bg)] px-7 py-4 text-sm font-black uppercase tracking-[0.13em] text-[color:var(--hero-secondary-text)] shadow-[var(--hero-secondary-shadow)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[color:var(--hero-secondary-border-hover)] hover:bg-[var(--hero-secondary-bg-hover)] hover:text-[color:var(--hero-secondary-text-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--hero-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--hero-ring-offset)]"
            >
              See process
            </a>
          </div>
        </motion.div>
      </div>

      {/* <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-center text-[10px] uppercase tracking-[0.34em] text-[color:var(--hero-scroll-text)]">
        <motion.span
          className="block h-9 w-px bg-[image:var(--hero-scroll-line)]"
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div> */}
    </section>
  );
}

function Marquee() {
  const items = [
    "Vegan",
    "Roasted not fried",
    "Gluten free",
    "Light . Crunchy . Delicious",
    "25 gm packs",
    "Snack smart",
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
    isMobile ? ["0vh", "7vh", "7vh", "14vh"] : ["0vh", "25vh", "25vh", "48vh"],
  );
  const topLeftDrop = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["1vh", "8vh", "8vh", "12vh"] : ["2vh", "28vh", "28vh", "30vh"],
  );
  const bottomLift = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["0vh", "-4vh", "-4vh", "0vh"] : ["0vh", "-8vh", "-8vh", "0vh"],
  );
  const topLeftX = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["-12vw", "-46vw", "-46vw", "-58vw"] : ["-7vw", "-46vw", "-46vw", "-56vw"],
  );
  const topRightX = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["8vw", "40vw", "40vw", "54vw"] : ["2vw", "37vw", "37vw", "40vw"],
  );
  const topCornerOpacity = useTransform(smoothProgress, [0, 0.82, 0.94, 1], [1, 1, 0.35, 0]);
  const bottomLeftOpacity = useTransform(smoothProgress, [0, 0.76, 0.9, 1], [1, 1, 0, 0]);
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
    isMobile ? [0.86, 1.08, 1.08, 0.9] : [0.78, 1.08, 1.08, 0.82],
  );
  const topLeftScale = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? [0.98, 1.22, 1.22, 1.08] : [1.1, 1.4, 1.4, 1.25],
  );

  const items = [
    {
      className: "img1 left-1/2 top-28 md:top-28",
      x: topLeftX,
      y: topLeftDrop,
      scale: topLeftScale,
      opacity: topCornerOpacity,
      rotate: [-10, 9, -10],
    },
    {
      className: "img2 left-1/2 top-28 md:top-28",
      x: topRightX,
      y: topDrop,
      scale,
      opacity: topCornerOpacity,
      rotate: [11, -8, 11],
    },
    {
      className: "img3 left-3 bottom-10 md:left-10 md:bottom-14",
      x: pull,
      y: bottomLift,
      scale,
      opacity: bottomLeftOpacity,
      rotate: [10, -10, 10],
    },
    {
      className: "img4 right-3 bottom-10 md:right-10 md:bottom-14",
      x: pullReverse,
      y: bottomRightDrop,
      scale,
      opacity: 1,
      rotate: [-11, 8, -11],
    },
  ];

  return (
    <div
      className="pointer-events-none sticky top-0 z-30 -mb-[100vh] h-screen overflow-hidden"
      aria-hidden
    >
      {items.map((item, index) => (
        <motion.div
          key={item.className}
          className={`absolute ${item.className}`}
          style={{ y: item.y, x: item.x, scale: item.scale, opacity: item.opacity }}
        >
          <motion.img
            src={makhanaImg}
            alt=""
            width={250}
            height={250}
            className="relative h-16 w-16 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
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
    <div ref={ref} className="relative bg-var(--cream)">
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
      <motion.div
        style={{ y }}
        className="absolute -right-20 top-10 h-64 w-64 rounded-full opacity-30"
      />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="inline-block rounded-full bg-coral/20 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-coral-deep">
          Our story
        </span>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-cocoa">
          We made makhana
          <br />
          snack-smart.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-cocoa/70">
          LoTFerox Nuts turns roasted fox nuts into light, crunchy and delicious everyday snacks
          across six bold 25 gm flavours.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "var(--coral-deep)" }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center text-cream">
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] italic">
          Ready?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg opacity-80">
          Want LoTFerox roasted makhana? Message us on WhatsApp and we'll help you pick from Mint
          Pudina, Himalayan Salt & Pepper, Cream & Onion, Mix Masala, Tomato Tango and Tangy Cheese.
        </p>
        <div className="mt-10">
          <BrandButton href={WHATSAPP_HREF} icon={MessageCircle} external tone="dark">
            Order on WhatsApp
          </BrandButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: "Process", href: "#process" },
    { label: "Flavours", href: "#flavors" },
    { label: "Benefits", href: "#benefits" },
    { label: "Story", href: "#story" },
  ];
  const footerSocialLinks = [
    { label: "Facebook", href: FACEBOOK_HREF, icon: Facebook },
    { label: "WhatsApp", href: WHATSAPP_HREF, icon: MessageCircle },
    { label: "Instagram", href: INSTAGRAM_HREF, icon: Instagram },
  ];

  return (
    <footer
      className="relative overflow-hidden py-14 text-cream"
      style={{ background: "var(--coral-deep)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.22))]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="font-display text-3xl font-black text-cream">LoTFerox Nuts</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
            Roasted makhana fox nuts made for smart snacking: vegan, gluten free, roasted not fried,
            light, crunchy and delicious.
          </p>
          <div className="mt-6 flex gap-3">
            {footerSocialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#fff2a8]/35 bg-white/10 text-[#ffe17a] shadow-[0_14px_32px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[#ffe17a] hover:bg-[#ffe17a] hover:text-[#24180b]"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav className="grid content-start gap-3">
          <div className="text-xs font-black uppercase tracking-[0.24em] text-[#ffe17a]">
            Explore
          </div>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-cream/75 transition-colors hover:text-[#ffe17a]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="grid content-start gap-4 text-sm text-cream/75">
          <div className="text-xs font-black uppercase tracking-[0.24em] text-[#ffe17a]">
            Contact
          </div>
          <BrandButton href={WHATSAPP_HREF} icon={MessageCircle} external compact tone="dark">
            WhatsApp orders
          </BrandButton>
          <div className="flex gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#ffe17a]" aria-hidden />
            Customer care details coming soon
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffe17a]" aria-hidden />
            25 gm roasted makhana packs available in six flavours.
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-[#fff2a8]/16 px-6 pt-6 text-xs text-cream/55 md:flex-row">
        <span>© {new Date().getFullYear()} LoTFerox Nuts. Smart snacking for smart people.</span>
        <span>Vegan · Gluten free · Roasted not fried</span>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noreferrer"
      aria-label="Order Makhana on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-[#25D366] text-white shadow-[0_18px_44px_rgba(0,0,0,0.34),0_0_0_8px_rgba(37,211,102,0.12)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_22px_54px_rgba(37,211,102,0.36),0_0_0_10px_rgba(37,211,102,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-7 md:right-7 md:h-16 md:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
      <MessageCircle className="relative h-7 w-7 md:h-8 md:w-8" aria-hidden />
      <span className="absolute -left-2 top-1/2 hidden -translate-x-full -translate-y-1/2 rounded-full border border-[#25D366]/35 bg-black/78 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.32)] backdrop-blur-xl opacity-0 transition-all duration-300 group-hover:-translate-x-[calc(100%+0.25rem)] group-hover:opacity-100 lg:block">
        WhatsApp
      </span>
    </a>
  );
}

function Home() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let animationFrameId = 0;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
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
      {/* TODO: Add WhatsApp button */}
      <FloatingWhatsApp />
    </div>
  );
}
