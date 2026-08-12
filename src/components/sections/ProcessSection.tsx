import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import benefitBowl from "@/assets/sections/benefit-makhana-bowl.jpg";
import benefitCollection from "@/assets/products/lotferox-makhana-product-collection.webp";
import benefitHarvest from "@/assets/sections/benefit-makhana-harvest.jpg";
import mintPudina from "@/assets/products/lotferox-mint-pudina-makhana-25gm.webp";
import mixMasala from "@/assets/products/lotferox-mix-masala-makhana-25gm.webp";
import tangyCheese from "@/assets/products/lotferox-tangy-cheese-makhana-25gm.webp";
import tomatoTango from "@/assets/products/lotferox-tomato-tango-makhana-25gm.webp";
import { processStages, type ProcessStage } from "./data";
import { SectionHeading } from "./SectionHeading";

type ProcessVisual = {
  eyebrow: string;
  note: string;
  image?: string;
  imageAlt?: string;
  products?: string[];
  chips: string[];
  frame: "harvest" | "heat" | "pop" | "flavors" | "seal";
};

const processVisuals: ProcessVisual[] = [
  {
    eyebrow: "Field selected",
    note: "Lotus seeds are sourced from trusted farms before they enter the roasting line.",
    image: benefitHarvest,
    imageAlt: "Makhana harvest close-up",
    chips: ["farm checked", "fresh batch", "clean source"],
    frame: "harvest",
  },
  {
    eyebrow: "Slow heat",
    note: "Dry heat builds the nutty aroma without weighing down the natural crunch.",
    image: benefitBowl,
    imageAlt: "Roasted makhana in a bowl",
    chips: ["low oil", "even roast", "light crunch"],
    frame: "heat",
  },
  {
    eyebrow: "Air popped",
    note: "Each kernel opens into a crisp bite with the airy texture makhana is known for.",
    chips: ["crisp shell", "airy center", "small batch"],
    frame: "pop",
  },
  {
    eyebrow: "Flavour tumble",
    note: "Mint, pepper, onion, masala, tomato and tangy cheese seasonings coat every crunchy bite.",
    products: [mintPudina, mixMasala, tomatoTango, tangyCheese],
    chips: ["mint", "masala", "tomato", "cheese"],
    frame: "flavors",
  },
  {
    eyebrow: "Fresh seal",
    note: "Finished pouches are packed for shelf-ready crunch and easy snacking.",
    image: benefitCollection,
    imageAlt: "Finished makhana product collection",
    chips: ["sealed pouch", "fresh lock", "ready to ship"],
    frame: "seal",
  },
];

interface StagePanelProps {
  stage: ProcessStage;
  visual: ProcessVisual;
  index: number;
  active: boolean;
}

function CurvedArrowDoodle({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 180 78"
      className={`pointer-events-none absolute hidden h-20 w-44 text-[var(--process-accent)] md:block ${
        flip ? "left-4 top-8 -scale-x-100 rotate-[-8deg]" : "right-4 top-10 rotate-6"
      }`}
      fill="none"
      aria-hidden
    >
      <path
        d="M10 48C42 8 92 7 124 27C145 40 151 59 135 68C117 77 88 58 111 35C126 20 153 17 170 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="8 9"
      />
      <path
        d="M158 9L173 20L158 31"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StageVisual({ visual, active }: Pick<StagePanelProps, "visual" | "active">) {
  if (visual.frame === "heat") {
    return (
      <div className="relative overflow-hidden rounded-[1.5rem] p-2 md:rounded-[2.25rem] md:p-4 lg:min-h-[300px] xl:min-h-[320px]">
        <div className="absolute" />

        {/* <CurvedArrowDoodle flip /> */}

        <div className="relative z-10 grid grid-cols-[0.78fr_1.22fr] gap-2 md:min-h-[250px] md:grid-cols-[0.86fr_1.14fr] md:gap-3 lg:min-h-[270px] xl:min-h-[310px]">
          <motion.div
            className="relative min-h-[168px] overflow-hidden rounded-[1.1rem] border border-[color:var(--process-border)] bg-[var(--process-surface)] shadow-[var(--process-panel-shadow)] sm:min-h-[190px] md:min-h-0 md:rounded-[1.75rem]"
            animate={{ y: active ? [0, -3, 0] : 0 }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={visual.image}
              alt={visual.imageAlt}
              width={620}
              height={620}
              className="h-full min-h-[168px] w-full object-cover sm:min-h-[190px] lg:min-h-[200px] xl:min-h-[220px]"
            />

            <div className="absolute inset-0 bg-[image:var(--process-image-overlay)]" />

            <div className="absolute bottom-2 left-2 right-2 rounded-xl border border-[color:var(--process-border)] bg-[var(--process-surface-strong)] p-2 backdrop-blur-xl md:bottom-3 md:left-3 md:right-3 md:rounded-2xl md:p-3 lg:p-4">
              <div className="text-[9px] font-black uppercase tracking-[0.16em] text-[color:var(--process-accent-soft)] md:text-xs md:tracking-[0.22em]">
                Gentle dry heat
              </div>

              <p className="mt-1 hidden text-sm leading-relaxed text-[color:var(--process-text-muted)] sm:block">
                {visual.note}
              </p>
            </div>
          </motion.div>

          <div className="grid gap-2 md:gap-3">
            {[
              ["Dry", "Moisture is drawn out slowly for a lighter bite.", "42 min"],
              ["Roast", "Even heat builds a warm, nutty aroma.", "low oil"],
              ["Rest", "Crunch settles before seasoning begins.", "crisp"],
            ].map(([title, copy, meta], i) => (
              <motion.div
                key={title}
                className="rounded-[1rem] border border-[color:var(--process-accent-border)] bg-[var(--process-surface)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-3 md:rounded-[1.4rem] md:p-4"
                animate={{ x: active ? [0, i % 2 ? -3 : 3, 0] : 0 }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-between gap-2 md:gap-3">
                  <div className="font-display text-base font-black text-[color:var(--process-text)] sm:text-lg md:text-2xl lg:text-3xl">
                    {title}
                  </div>

                  <span className="rounded-full bg-[var(--process-accent)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-[color:var(--process-icon-text)] md:px-3 md:text-[10px] md:tracking-[0.16em]">
                    {meta}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[color:var(--process-text-muted)] md:mt-2 md:text-sm md:leading-relaxed">
                  {copy}
                </p>

                <div className="mt-1.5 flex items-end gap-1.5 sm:mt-2 md:mt-3 md:gap-2">
                  {[14, 22, 28, 18].map((height, barIndex) => (
                    <motion.span
                      key={`${title}-${height}`}
                      className="w-2.5 rounded-full bg-[var(--process-accent)] opacity-80 sm:w-3 md:w-4"
                      animate={{
                        height: active ? [height, height + 8, height] : height,
                      }}
                      transition={{
                        duration: 2,
                        delay: (i + barIndex) * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (visual.frame === "pop") {
    return (
      <div className="relative p-2 sm:p-5 md:min-h-[340px] md:p-7">
        <CurvedArrowDoodle />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_55%,var(--process-accent-muted),transparent_36%)]" />
        <div className="relative z-10 grid place-items-center py-4 text-center sm:py-6 md:min-h-[300px] md:py-0">
          <motion.div
            className="absolute font-display text-[clamp(5.8rem,18vw,15rem)] font-black leading-none text-[color:var(--process-accent)] opacity-15"
            animate={{ scale: active ? [0.98, 1.02, 0.98] : 1 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            POP
          </motion.div>
          <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56">
            {visual.chips.map((chip, i) => (
              <motion.span
                key={chip}
                className="absolute grid h-12 w-12 place-items-center rounded-[45%] border border-[color:var(--process-accent-border)] bg-[var(--process-chip-bg)] text-[8px] font-black uppercase leading-tight tracking-[0.08em] text-[color:var(--process-chip-text)] shadow-[var(--process-card-shadow)] sm:h-14 sm:w-14 md:h-16 md:w-16 md:text-[10px] md:tracking-[0.12em]"
                style={{
                  left: `${42 + Math.cos((i / visual.chips.length) * Math.PI * 2) * 34}%`,
                  top: `${42 + Math.sin((i / visual.chips.length) * Math.PI * 2) * 34}%`,
                }}
                animate={{
                  y: active ? [0, -8 - i * 2, 0] : 0,
                  rotate: active ? [-4 + i * 3, 4 - i * 2, -4 + i * 3] : 0,
                }}
                transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {chip}
              </motion.span>
            ))}
            <div className="absolute inset-12 grid place-items-center rounded-full border border-[color:var(--process-accent-border)] bg-[var(--process-accent)] text-[color:var(--process-icon-text)] shadow-[0_0_45px_var(--process-accent-muted)]">
              <span className="text-xs font-black uppercase tracking-[0.22em]">crisp</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.frame === "flavors") {
    return (
      <div className="relative md:min-h-[320px] lg:min-h-[340px]">
        {/* <CurvedArrowDoodle flip /> */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(243,201,67,0.18),transparent_42%)]" /> */}
        {/* <div className="absolute left-4 top-4 h-20 w-20 rounded-full border border-[#f3c943]/20 md:left-5 md:top-5 md:h-28 md:w-28" /> */}
        {/* <div className="absolute bottom-4 right-5 h-16 w-28 rounded-full bg-[#f3c943]/10 blur-xl md:bottom-5 md:right-8 md:h-20 md:w-40" /> */}

        <div className="relative z-10 grid grid-cols-2 gap-2 md:min-h-[320px] md:grid-cols-4 md:gap-4 lg:min-h-[340px]">
          {[
            ["Mint Pudina", "Cool herb", mintPudina, "from-[#123c24] to-[#5fbf72]"],
            ["Mix Masala", "Warm spice", mixMasala, "from-[#3d1f10] to-[#c46b1f]"],
            ["Tomato Tango", "Tangy bite", tomatoTango, "from-[#233f8f] to-[#d9364d]"],
            ["Tangy Cheese", "Cheesy tang", tangyCheese, "from-[#4b2608] to-[#d47b18]"],
          ].map(([name, note, src, gradient], productIndex) => (
            <motion.div
              key={name}
              className={`group relative flex min-h-[148px] flex-col overflow-hidden rounded-[1.05rem] border border-white/10 bg-gradient-to-br ${gradient} p-2.5 shadow-[0_24px_55px_rgba(0,0,0,0.32)] sm:min-h-[160px] md:min-h-[300px] md:rounded-[1.6rem] md:p-5 lg:min-h-[310px]`}
              animate={{
                y: active ? [0, productIndex === 1 ? -6 : -4, 0] : 0,
                rotate: active ? [0, productIndex % 2 === 0 ? 0.35 : -0.35, 0] : 0,
              }}
              transition={{
                duration: 3.2 + productIndex * 0.22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="shrink-0">
                <div className="text-[7px] font-black uppercase tracking-[0.08em] text-white/62 sm:text-[8px] md:text-[10px] md:tracking-[0.22em]">
                  {note}
                </div>
                <div className="mt-1 font-display text-sm font-black leading-none text-white sm:text-base md:mt-2 md:text-3xl">
                  {name}
                </div>
              </div>

              <div className="relative mx-auto flex min-h-0 w-full flex-1 items-center justify-center py-1.5 md:py-3">
                <img
                  src={src}
                  alt=""
                  width={220}
                  height={300}
                  className="mx-auto h-auto max-h-[4.75rem] w-auto max-w-[78%] object-contain object-center drop-shadow-[0_18px_22px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-1 sm:max-h-[5.5rem] md:max-h-48 md:max-w-[85%] lg:max-h-52"
                />
              </div>

              <div className="shrink-0 rounded-full border border-[color:var(--process-border)] bg-[var(--process-surface)] px-2 py-1 text-center text-[7px] font-black uppercase tracking-[0.08em] text-[color:var(--process-accent-soft)] backdrop-blur-xl sm:text-[8px] md:px-4 md:py-2 md:text-[10px] md:tracking-[0.18em]">
                Even coating
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.frame === "seal") {
    return (
      <div className="relative p-2 sm:p-5 md:min-h-[340px] md:p-7">
        <div className="absolute left-0 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-[var(--process-accent)] opacity-10 blur-2xl" />
        <div className="relative z-10 grid grid-cols-1 gap-3 md:min-h-[300px] md:grid-cols-[0.92fr_1.08fr] md:gap-5">
          <div className="flex flex-col justify-center">
            <div className="font-display text-[clamp(2.25rem,9vw,6.8rem)] font-black leading-none text-[color:var(--process-accent)]">
              Fresh lock
            </div>
            <div className="mt-3 space-y-2 sm:mt-4 md:mt-6 md:space-y-3">
              {visual.chips.map((chip) => (
                <div
                  key={chip}
                  className="flex items-center justify-between rounded-full border border-[color:var(--process-border)] bg-[var(--process-surface)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[color:var(--process-accent-soft)] md:px-5 md:py-3 md:text-xs md:tracking-[0.2em]"
                >
                  <span>{chip}</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--process-accent)] text-[color:var(--process-icon-text)]">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <motion.img
            src={visual.image}
            alt={visual.imageAlt}
            width={900}
            height={700}
            className="mx-auto w-full max-w-[280px] self-center justify-self-center rounded-[2rem_0.75rem_2.75rem_0.75rem] border border-[color:var(--process-border)] object-contain p-2 shadow-[var(--process-panel-shadow)] sm:max-w-[360px] sm:p-3 md:max-w-[560px] md:scale-110"
            animate={{ rotate: active ? [1, -1, 1] : 1, y: active ? [0, -4, 0] : 0 }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative ml-0 aspect-[5/4] w-full sm:aspect-[16/11] md:ml-8 md:aspect-auto md:min-h-[340px] lg:ml-12 lg:min-h-[360px]">
      <CurvedArrowDoodle />
      <div className="absolute -left-5 -top-5 hidden h-32 w-32 rounded-full border border-[color:var(--process-accent-border)] md:block" />
      <motion.img
        src={visual.image}
        alt={visual.imageAlt}
        width={900}
        height={640}
        className="absolute inset-0 h-full w-full rounded-[0.75rem_2.25rem_0.75rem_2.25rem] object-cover shadow-[var(--process-panel-shadow)] md:rounded-[0.75rem_3.5rem_0.75rem_3.5rem]"
        animate={{ scale: active ? 1.02 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 rounded-[0.75rem_2.25rem_0.75rem_2.25rem] bg-[image:var(--process-image-overlay)] md:rounded-[0.75rem_3.5rem_0.75rem_3.5rem]" />
      <div className="absolute bottom-3 left-3 right-3 max-w-sm rounded-xl border border-[color:var(--process-border)] bg-[var(--process-surface-strong)] p-3 text-[color:var(--process-accent-soft)] shadow-[var(--process-card-shadow)] backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-auto sm:p-4 md:bottom-5 md:left-5 md:rounded-[1.25rem] md:p-5">
        <div className="text-[10px] font-black uppercase tracking-[0.16em] md:text-xs md:tracking-[0.22em]">
          <span>{visual.eyebrow}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-[color:var(--process-text-muted)] sm:mt-2 md:mt-3 md:line-clamp-none md:text-sm md:leading-relaxed">
          {visual.note}
        </p>
      </div>
    </div>
  );
}

function StagePanel({ stage, visual, index, active }: StagePanelProps) {
  const layout = {
    harvest: {
      grid: "md:grid-cols-[0.92fr_1.08fr]",
      visual: "md:order-1",
      copy: "md:order-2",
      heading: "text-[clamp(2.4rem,5.5vw,5.4rem)]",
    },
    heat: {
      grid: "md:grid-cols-[0.82fr_1.18fr]",
      visual: "order-2 md:order-2",
      copy: "order-1 md:order-1",
      heading: "text-[clamp(1.65rem,8vw,2.35rem)] md:text-[clamp(2rem,4.4vw,4.5rem)]",
    },
    pop: {
      grid: "md:grid-cols-[1.1fr_0.9fr]",
      visual: "md:order-1",
      copy: "md:order-2 md:self-end",
      heading: "text-[clamp(2.6rem,6vw,6rem)]",
    },
    flavors: {
      grid: "md:grid-cols-[0.9fr_1.1fr]",
      visual: "order-2 md:order-2",
      copy: "order-1 md:order-1",
      heading: "text-[clamp(1.65rem,8vw,2.35rem)] md:text-[clamp(2.2rem,5vw,5rem)]",
    },
    seal: {
      grid: "md:grid-cols-[1.15fr_0.85fr]",
      visual: "md:order-1",
      copy: "md:order-2 md:self-center",
      heading: "text-[clamp(2rem,4.6vw,4.8rem)]",
    },
  }[visual.frame];

  return (
    <article
      className="flex h-auto w-[min(88vw,1180px)] shrink-0 snap-center items-start self-start px-3 pb-5 pt-1 sm:px-4 sm:pb-6 md:w-[min(88vw,1240px)] md:items-center md:px-10 md:pb-8 lg:h-auto lg:min-h-[calc(100dvh-16rem)] lg:w-screen lg:self-stretch lg:px-8 lg:pb-8 xl:px-10"
      aria-label={`Stage ${stage.number}`}
    >
      <div
        className={`mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-3 sm:gap-4 md:items-center md:gap-8 lg:gap-12 ${layout.grid}`}
      >
        <motion.div
          initial={false}
          animate={{
            opacity: active ? 1 : 0.32,
            y: active ? 0 : 30,
            rotate: active ? 0 : index % 2 ? 2 : -2,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={layout.visual}
        >
          <StageVisual visual={visual} active={active} />
        </motion.div>

        <div className={layout.copy}>
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0.22, y: active ? 0 : 24 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--process-accent-border)] bg-[var(--process-accent-muted)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[color:var(--process-accent-soft)] md:gap-3 md:px-4 md:py-2 md:text-xs md:tracking-[0.24em]"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {visual.eyebrow}
          </motion.div>

          <motion.h3
            initial={false}
            animate={{ opacity: active ? 1 : 0.24, y: active ? 0 : 34 }}
            transition={{ duration: 0.7, delay: 0.04 }}
            className={`mt-2 max-w-xl font-display font-bold leading-[0.95] text-[color:var(--process-text)] md:mt-5 lg:mt-6 ${layout.heading}`}
          >
            {stage.title}
          </motion.h3>

          <motion.p
            initial={false}
            animate={{ opacity: active ? 0.82 : 0.2, y: active ? 0 : 24 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-2 line-clamp-2 max-w-xl text-xs leading-snug text-[color:var(--process-text-muted)] sm:text-sm md:mt-4 md:line-clamp-3 md:text-base md:leading-relaxed lg:mt-6 lg:line-clamp-none lg:text-lg"
          >
            {stage.description}
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0.22, y: active ? 0 : 22 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-2 flex flex-wrap gap-1.5 md:mt-5 md:gap-2 lg:mt-7"
          >
            {visual.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[color:var(--process-accent-border)] bg-[var(--process-surface)] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[color:var(--process-accent-soft)] backdrop-blur-xl md:px-4 md:py-2 md:text-[11px] md:tracking-[0.18em]"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </article>
  );
}

export function ProcessSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const autoSwipeResumeTimerRef = useRef<number | null>(null);
  const lockedStageRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<number | null>(null);

  const [active, setActive] = useState(0);
  const [autoSwipePaused, setAutoSwipePaused] = useState(false);
  const [autoSwipeEnabled, setAutoSwipeEnabled] = useState(false);

  const totalStages = processStages.length;

  const scrollToStage = (index: number) => {
    const scroller = scrollerRef.current;
    const panel = scroller?.children[index] as HTMLElement | undefined;

    if (!scroller || !panel) return;

    const left = panel.offsetLeft - (scroller.clientWidth - panel.clientWidth) / 2;

    scroller.scrollTo({
      left,
      behavior: "smooth",
    });
  };

  const syncActiveScrollerHeight = (stageIndex = active) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      if (scroller.style.height) {
        scroller.style.height = "";
      }
      return;
    }

    const panel = scroller.children[stageIndex] as HTMLElement | undefined;
    if (!panel) return;

    const nextHeight = Math.ceil(panel.offsetHeight);
    if (nextHeight > 0) {
      scroller.style.height = `${nextHeight}px`;
    }
  };

  const pauseAutoSwipeTemporarily = () => {
    setAutoSwipePaused(true);

    if (autoSwipeResumeTimerRef.current) {
      window.clearTimeout(autoSwipeResumeTimerRef.current);
    }

    autoSwipeResumeTimerRef.current = window.setTimeout(() => {
      setAutoSwipePaused(false);
      autoSwipeResumeTimerRef.current = null;
    }, 9000);
  };

  const goToStage = (index: number, { pauseAutoSwipe = true }: { pauseAutoSwipe?: boolean } = {}) => {
    if (pauseAutoSwipe) {
      pauseAutoSwipeTemporarily();
    }

    lockedStageRef.current = index;
    setActive(index);

    if (unlockTimerRef.current) {
      window.clearTimeout(unlockTimerRef.current);
    }

    // Keep height locked to the destination stage while smooth-scroll settles.
    unlockTimerRef.current = window.setTimeout(() => {
      lockedStageRef.current = null;
      unlockTimerRef.current = null;
      syncActiveScrollerHeight(index);
    }, 700);

    scrollToStage(index);

    window.requestAnimationFrame(() => {
      syncActiveScrollerHeight(index);
      window.requestAnimationFrame(() => syncActiveScrollerHeight(index));
    });
  };

  const handleManualStageChange = (index: number) => {
    goToStage(index);
  };

  useEffect(() => {
    let animationFrame = 0;

    const updateSection = () => {
      animationFrame = 0;

      const scroller = scrollerRef.current;
      if (!scroller) return;

      const targetX = scroller.scrollLeft + scroller.clientWidth / 2;
      let nextActive = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(scroller.children).forEach((panel, index) => {
        const element = panel as HTMLElement;
        const rect = panel.getBoundingClientRect();
        const panelCenter = element.offsetLeft + rect.width / 2;
        const distance = Math.abs(panelCenter - targetX);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActive = index;
        }
      });

      if (lockedStageRef.current != null) {
        syncActiveScrollerHeight(lockedStageRef.current);

        if (nextActive === lockedStageRef.current) {
          lockedStageRef.current = null;
          if (unlockTimerRef.current) {
            window.clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = null;
          }
          setActive(nextActive);
        }
        return;
      }

      setActive(nextActive);
      syncActiveScrollerHeight(nextActive);
    };

    const requestUpdate = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(updateSection);
    };

    updateSection();

    const scroller = scrollerRef.current;
    scroller?.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      scroller?.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [totalStages]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    let cancelled = false;

    const requestSync = () => {
      if (frame || cancelled) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!cancelled) {
          syncActiveScrollerHeight(active);
        }
      });
    };

    requestSync();
    // Re-measure after layout/fonts settle for the newly active panel.
    const settleTimer = window.setTimeout(requestSync, 120);

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(requestSync) : null;
    const activePanel = scroller.children[active] as HTMLElement | undefined;

    if (activePanel) {
      resizeObserver?.observe(activePanel);
    }

    window.addEventListener("resize", requestSync);

    return () => {
      cancelled = true;
      window.clearTimeout(settleTimer);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      resizeObserver?.disconnect();
      window.removeEventListener("resize", requestSync);
    };
  }, [active, totalStages]);

  useEffect(() => {
    const updateAutoSwipePreference = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

      setAutoSwipeEnabled(!prefersReducedMotion && !isTouchDevice);
    };

    updateAutoSwipePreference();

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    reducedMotionQuery.addEventListener("change", updateAutoSwipePreference);
    pointerQuery.addEventListener("change", updateAutoSwipePreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", updateAutoSwipePreference);
      pointerQuery.removeEventListener("change", updateAutoSwipePreference);
    };
  }, []);

  useEffect(() => {
    if (!autoSwipeEnabled || autoSwipePaused || totalStages < 2) return;

    const interval = window.setInterval(() => {
      goToStage((active + 1) % totalStages, { pauseAutoSwipe: false });
    }, 4200);

    return () => window.clearInterval(interval);
  }, [active, autoSwipeEnabled, autoSwipePaused, totalStages]);

  useEffect(() => {
    return () => {
      if (autoSwipeResumeTimerRef.current) {
        window.clearTimeout(autoSwipeResumeTimerRef.current);
      }
      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="process"
      className="relative w-full overflow-x-clip bg-[var(--process-bg)] pb-8 pt-0 text-[color:var(--process-text)] sm:pb-10 md:pb-12 lg:pb-14"
    >
      <div className="relative z-10">
        <div className="pb-3 pt-0 sm:pb-4 md:pb-5">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8">
            <div className="grid gap-3 md:grid-cols-[1fr_0.95fr] md:items-end md:gap-3">
              <SectionHeading
                badge="Product Making"
                title={
                  <>
                    From Harvest to{" "}
                    <em className="italic text-coral-deep">
                      Your Favourite Flavour
                    </em>
                  </>
                }
                align="left"
                className="
                  max-w-4xl
                  mt-6 md:mt-8 lg:mt-10
                  gap-2
                  sm:gap-3
                  md:gap-4
                  [&>h2]:text-[clamp(1.65rem,7vw,2.5rem)]
                  [&>h2]:leading-[1.05]
                  sm:[&>h2]:text-[clamp(1.9rem,6vw,3rem)]
                  md:[&>h2]:text-[clamp(2.1rem,4.6vw,3.6rem)]
                  lg:[&>h2]:text-[clamp(2.5rem,4vw,4.2rem)]
                  [&>span]:px-3
                  [&>span]:py-1
                  [&>span]:text-[9px]
                  sm:[&>span]:text-[10px]
                  md:[&>span]:px-4
                  md:[&>span]:py-1.5
                  md:[&>span]:text-xs
                "
              />

              <div className="grid gap-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="shrink-0 whitespace-nowrap rounded-full border border-[color:var(--process-accent-border)] bg-[var(--process-surface-strong)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[color:var(--process-accent-soft)] backdrop-blur-xl sm:px-3 sm:text-[10px] md:px-4 md:py-2 md:text-xs md:tracking-[0.24em]">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(totalStages).padStart(2, "0")}
                  </div>

                  <div className="flex min-w-0 flex-1 gap-1 sm:gap-1.5 md:gap-2">
                    {processStages.map((stage, index) => (
                      <button
                        key={stage.number}
                        type="button"
                        aria-label={`Go to process stage ${index + 1}`}
                        onClick={() => handleManualStageChange(index)}
                        className="h-[5px] flex-1 overflow-hidden rounded-full bg-[var(--process-progress-track)] transition-opacity hover:opacity-80"
                      >
                        <span
                          className="block h-full rounded-full bg-[var(--process-accent)] transition-[width] duration-300 ease-out"
                          style={{
                            width: index <= active ? "100%" : "0%",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    aria-label="Previous process stage"
                    onClick={() => handleManualStageChange(Math.max(0, active - 1))}
                    disabled={active === 0}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--process-accent-border)] bg-[var(--process-surface-strong)] text-[color:var(--process-accent-soft)] transition-all hover:-translate-y-0.5 hover:bg-[var(--process-accent)] hover:text-[color:var(--process-icon-text)] disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Next process stage"
                    onClick={() => handleManualStageChange(Math.min(totalStages - 1, active + 1))}
                    disabled={active === totalStages - 1}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--process-accent-border)] bg-[var(--process-surface-strong)] text-[color:var(--process-accent-soft)] transition-all hover:-translate-y-0.5 hover:bg-[var(--process-accent)] hover:text-[color:var(--process-icon-text)] disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="relative z-10 flex items-start snap-x snap-proximity gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth touch-pan-x px-[6vw] pb-1 transition-[height] duration-300 ease-out [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:px-[5vw] md:snap-mandatory md:gap-6 md:px-[6vw] lg:!h-auto lg:items-stretch lg:overflow-y-visible lg:gap-0 lg:px-0 lg:transition-none"
          aria-label="Product making process stages"
          onMouseEnter={() => setAutoSwipePaused(true)}
          onMouseLeave={() => setAutoSwipePaused(false)}
          onFocus={() => setAutoSwipePaused(true)}
          onBlur={() => setAutoSwipePaused(false)}
          onPointerDown={pauseAutoSwipeTemporarily}
          onTouchStart={pauseAutoSwipeTemporarily}
        >
          {processStages.map((stage, index) => (
            <StagePanel
              key={stage.number}
              stage={stage}
              visual={processVisuals[index]}
              index={index}
              active={active === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
