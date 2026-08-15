import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, RefObject, SVGProps } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "motion/react";
import Lenis from "lenis";
import {
  ArrowUp,
  ArrowRight,
  Facebook,
  Globe2,
  Handshake,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import heroBowl from "@/assets/hero/lotferox-roasted-makhana-bowl.webp";
import makhanaImg from "@/assets/hero/makhana-floating-piece.webp";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProcessSection, FlavorsSection, BenefitsSection } from "@/components/sections";
import { companyInfo } from "@/components/sections/data";
import lotferoxLogo from "@/assets/brand/lotferox-nuts-logo.webp";

const WHATSAPP_NUMBER = companyInfo.whatsappNumber;
const WHATSAPP_MESSAGE =
  "Hi LoTFerox, I would like to order your makhana products. Please share all 8 products, prices, and delivery details.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const FACEBOOK_HREF = "https://www.facebook.com/";
const INSTAGRAM_HREF = "https://www.instagram.com/";
const THEME_STORAGE_KEY = "lotferox-theme";

function scrollToSection(href: string, closeMenu?: () => void) {
  if (!href.startsWith("#")) return;

  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;

  closeMenu?.();

  const navOffset = window.matchMedia("(max-width: 767px)").matches ? 86 : 104;
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset;

  window.history.pushState(null, "", href);
  window.scrollTo({
    top: Math.max(0, top),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoTFerox Nuts 8 Makhana Products | Fox Nuts Snacks" },
      {
        name: "description",
        content:
          "Shop LoTFerox Nuts makhana fox nuts. Explore 8 products including Mint Pudina, Himalayan Salt & Pepper, Cream & Onion, Mix Masala, Tomato Tango, Tangy Cheese, Raw Makhana and Peri Peri.",
      },
      {
        name: "keywords",
        content:
          "LoTFerox, LoTFerox Nuts, roasted makhana, raw makhana, Bihar makhana, fox nuts, makhana snacks, Chennai healthy snacks, vegan snacks, gluten free snacks",
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
      onClick={
        !external && href.startsWith("#")
          ? (event) => {
              event.preventDefault();
              scrollToSection(href);
            }
          : undefined
      }
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border font-black uppercase tracking-[0.13em] text-[#24180b] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe17a] focus-visible:ring-offset-2 ${
        isDark
          ? "border-[#fff2a8]/75 bg-[linear-gradient(135deg,#fff8c7_0%,#ffd95a_48%,#f0b93d_100%)] shadow-[0_22px_52px_rgba(0,0,0,0.36),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.82)] hover:border-white hover:shadow-[0_28px_68px_rgba(255,217,90,0.2),0_24px_58px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.88)] focus-visible:ring-offset-[var(--coral-deep)]"
          : "border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,235,168,0.84)_48%,rgba(255,255,255,0.74))] shadow-[0_20px_48px_rgba(43,33,27,0.16),inset_0_1px_0_rgba(255,255,255,0.86)] hover:border-white hover:shadow-[0_28px_62px_rgba(43,33,27,0.22),inset_0_1px_0_rgba(255,255,255,0.9)] focus-visible:ring-offset-[color:var(--hero-ring-offset)]"
      } ${
        compact
          ? "min-h-12 gap-3 py-1.5 pl-5 pr-1.5 text-xs"
          : "min-h-14 gap-4 py-1.5 pl-6 pr-1.5 text-sm"
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
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
  const isDark = theme === "dark";

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      storedTheme === "dark" || storedTheme === "light"
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
  const [mobileOpen, setMobileOpen] = useState(false);
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
    { label: "Purpose", href: "#purpose" },
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
      } ${hidden && !mobileOpen ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
    >
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-center px-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:justify-between ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        <a
          href="#hero"
          aria-label="Back to hero section"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("#hero");
          }}
          className={`absolute left-1/2 h-14 w-32 -translate-x-1/2 overflow-hidden md:static md:h-16 md:w-36 md:translate-x-0 ${
            scrolled ? "scale-90" : "scale-100"
          }`}
        >
          <img
            src={lotferoxLogo}
            alt="Lotferox"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </a>
        <nav className="hidden gap-2 md:flex">
          {links.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(n.href);
              }}
              className="rounded-full border border-[#f3c943]/12 bg-black/55 px-5 py-2 text-sm font-medium text-[#f8ead1] shadow-[0_12px_35px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#f3c943]/35 hover:bg-[#f3c943] hover:text-black hover:shadow-[0_18px_42px_rgba(243,201,67,0.18)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="absolute left-6 flex items-center gap-2 md:static">
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
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className={`absolute right-6 grid h-10 w-10 place-items-center rounded-full border border-[#f3c943]/20 bg-black/55 text-[#ffe17a] shadow-[0_12px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-[#f3c943]/45 hover:bg-[#f3c943] hover:text-black md:hidden ${
            scrolled ? "scale-90" : ""
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden />
              ) : (
                <Menu className="h-4 w-4" aria-hidden />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98, height: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
            exit={{ opacity: 0, y: -14, scale: 0.98, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mt-3 overflow-hidden rounded-3xl border border-[#f3c943]/20 bg-black/78 p-3 text-[#f8ead1] shadow-[0_24px_65px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:hidden"
          >
            <nav className="grid gap-2">
              {links.map((n, index) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(n.href, () => setMobileOpen(false));
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.24 }}
                  className="rounded-2xl border border-white/8 bg-white/8 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] transition-colors hover:border-[#f3c943]/45 hover:bg-[#f3c943] hover:text-black"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {socialLinks.map(({ label, href, icon: Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.04, duration: 0.24 }}
                  className="grid h-11 place-items-center rounded-2xl border border-[#f3c943]/18 bg-white/8 text-[#ffe17a] transition-colors hover:border-[#f3c943]/45 hover:bg-[#f3c943] hover:text-black"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </motion.a>
              ))}
            </div>

            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.24 }}
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#25D366]/35 bg-[#25D366] px-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(37,211,102,0.24)]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Order on WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const wordRows = ["LoTFerox", "LoTFerox", "LoTFerox", "LoTFerox", "LoTFerox"];

  return (
    <section
      id="hero"
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
          width={900}
          height={721}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-10 w-[min(84vw,730px)] object-contain drop-shadow-[var(--hero-image-shadow)] md:mt-16"
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
              Explore flavours
            </BrandButton>
            <a
              href="#process"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#process");
              }}
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
    "8 products",
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
    isMobile ? ["-22vw", "-46vw", "-46vw", "-58vw"] : ["-7vw", "-46vw", "-46vw", "-56vw"],
  );
  const topRightX = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["6vw", "22vw", "22vw", "28vw"] : ["2vw", "37vw", "37vw", "40vw"],
  );
  const topCornerOpacity = useTransform(smoothProgress, [0, 0.82, 0.94, 1], [1, 1, 0.35, 0]);
  const bottomLeftOpacity = useTransform(smoothProgress, [0, 0.76, 0.9, 1], [1, 1, 0, 0]);
  const pull = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["0vw", "1.5vw", "1.5vw", "0vw"] : ["0vw", "4vw", "4vw", "0vw"],
  );
  const pullReverse = useTransform(pull, (value) => `-${value}`);
  const bottomRightDrop = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? ["0vh", "4vh", "4vh", "8vh"] : ["0vh", "10vh", "10vh", "20vh"],
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? [0.82, 0.98, 0.98, 0.86] : [0.78, 1.08, 1.08, 0.82],
  );
  const topLeftScale = useTransform(
    smoothProgress,
    [0, 0.52, 0.8, 1],
    isMobile ? [0.9, 1.05, 1.05, 0.95] : [1.1, 1.4, 1.4, 1.25],
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
    <div ref={ref} className="relative bg-[var(--cream)]">
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
          across eight smart products, from bold roasted flavours to premium Raw Makhana.
        </p>
      </div>
    </section>
  );
}

function PurposeSection() {
  const pillars = [
    {
      label: "Vision",
      title: "Premium Bihar Makhana for every home.",
      text: "To make nutritious, delicious and guilt-free makhana a daily snack choice for families around the world.",
      icon: Globe2,
    },
    {
      label: "Mission",
      title: "Farm-fresh quality with real crunch.",
      text: "We source premium makhana from Bihar, preserve its natural value and create fresh flavours for modern snacking.",
      icon: Leaf,
    },
    {
      label: "Promise",
      title: "Freshness, trust and value in every pack.",
      text: "Hand-selected makhana, natural produce, reliable processing, competitive pricing and export-ready quality.",
      icon: Handshake,
    },
  ];

  return (
    <section id="purpose" className="bg-[var(--cream)] pb-5 pt-14 md:pb-8 md:pt-20">
      <div className="mx-auto max-w-7xl px-6 text-cocoa">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-coral/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-coral-deep dark:border-[#d4af37]/28 dark:text-[#f4d675]">
            Purpose
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.5rem,5.2vw,5rem)] font-bold leading-[0.98] text-cocoa">
            From Bihar farms to homes around the world.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-cocoa/70 md:text-lg dark:text-[#f5f2ea]/72">
            We are building LoTFerox Nuts as a trusted makhana brand: natural, crunchy, accessible
            and made for everyday wellness.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[22px] border border-cocoa/10 bg-white/20 p-6 transition-colors hover:border-coral/22 dark:border-[#d4af37]/14 dark:bg-white/[0.035] dark:hover:border-[#d4af37]/28"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-coral/16 text-coral-deep dark:border-[#d4af37]/22 dark:text-[#f4d675]">
                  <pillar.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-coral-deep dark:text-[#f4d675]">
                    {pillar.label}
                  </div>
                  <div className="mt-1 h-px w-14 bg-coral/25 dark:bg-[#d4af37]/28" />
                </div>
              </div>

              <h3 className="mt-7 font-display text-2xl font-bold leading-tight text-cocoa">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-cocoa/68 dark:text-[#f5f2ea]/66">
                {pillar.text}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-3 border-y border-cocoa/10 py-4 text-sm font-semibold text-cocoa/78 dark:border-[#d4af37]/16 dark:text-[#f5f2ea]/78 md:grid-cols-3">
          {[
            { icon: ShieldCheck, label: "FSSAI", value: companyInfo.fssai },
            { icon: MapPin, label: "Company", value: companyInfo.address },
            { icon: Mail, label: "Email", value: companyInfo.email },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 px-1 py-2 md:justify-center">
              <item.icon
                className="h-4 w-4 shrink-0 text-coral-deep dark:text-[#f4d675]"
                aria-hidden
              />
              <div className="min-w-0">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-cocoa/70 dark:text-[#f4d675]/78">
                  {item.label}
                </div>
                <div className="truncate text-sm text-cocoa/78 dark:text-[#f5f2ea]/78">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
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
        <p className="mx-auto mt-6 max-w-lg text-lg text-cream/90">
          Want LoTFerox makhana? Message us on WhatsApp and we'll help you pick from all 8 products,
          including roasted flavours and premium Raw Makhana.
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
    { label: "Purpose", href: "#purpose" },
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
          <div className="font-display text-3xl font-black text-cream">{companyInfo.name}</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
            Premium makhana fox nuts made for smart snacking: vegan, gluten free, roasted not fried,
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
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(link.href);
              }}
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
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#ffe17a]" aria-hidden />
            <a
              href={`mailto:${companyInfo.email}`}
              className="transition-colors hover:text-[#ffe17a]"
            >
              {companyInfo.email}
            </a>
          </div>
          <div className="flex gap-3">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ffe17a]" aria-hidden />
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="transition-colors hover:text-[#ffe17a]"
            >
              {companyInfo.phone}
            </a>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffe17a]" aria-hidden />
            {companyInfo.address}
          </div>
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#ffe17a]" aria-hidden />
            FSSAI Licence No. {companyInfo.fssai}
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-[#fff2a8]/16 px-6 pt-6 text-xs text-cream/55 md:flex-row">
        <span>
          © {new Date().getFullYear()} {companyInfo.name}. Smart snacking for smart people.
        </span>
        <span>8 products · Vegan · Gluten free · Roasted not fried</span>
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

function BackToHeroButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const purpose = document.getElementById("purpose");
    if (!purpose) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting || window.scrollY >= purpose.offsetTop);
      },
      { threshold: 0.2 },
    );

    observer.observe(purpose);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#hero"
      aria-label="Back to hero section"
      onClick={(event) => {
        event.preventDefault();
        scrollToSection("#hero");
      }}
      className={`group fixed bottom-24 right-5 z-[60] grid h-12 w-12 place-items-center rounded-full border border-[#f3c943]/30 bg-black/70 text-[#ffe17a] shadow-[0_16px_38px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#f3c943]/70 hover:bg-[#f3c943] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3c943] focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-28 md:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
      <span className="absolute -left-2 top-1/2 hidden -translate-x-full -translate-y-1/2 rounded-full border border-[#f3c943]/35 bg-black/78 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.32)] backdrop-blur-xl opacity-0 transition-all duration-300 group-hover:-translate-x-[calc(100%+0.25rem)] group-hover:opacity-100 lg:block">
        Top
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
      <PurposeSection />
      <Story />
      <Wave from="var(--cream)" to="var(--coral-deep)" />
      <CTA />
      <Footer />
      {/* TODO: Add WhatsApp button */}
      <BackToHeroButton />
      <FloatingWhatsApp />
    </div>
  );
}
