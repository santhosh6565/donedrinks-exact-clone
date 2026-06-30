import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import benefitBowl from "@/assets/benefit-bowl.jpg";
import benefitCollection from "@/assets/benefit-collection.jpg";
import benefitHarvest from "@/assets/benefit-harvest.jpg";
import flavorCaramel from "@/assets/flavor-caramel.png";
import flavorChocolate from "@/assets/flavor-chocolate.png";
import flavorStrawberry from "@/assets/flavor-strawberry.png";
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
    note: "Chocolate, caramel, and strawberry seasonings coat every piece evenly.",
    products: [flavorChocolate, flavorCaramel, flavorStrawberry],
    chips: ["cocoa", "caramel", "berry"],
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
      className={`pointer-events-none absolute hidden h-20 w-44 text-[#f3c943] md:block ${
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
      <div className="relative min-h-[250px] overflow-hidden rounded-[1.5rem] p-3 md:rounded-[2.25rem] md:p-4 lg:min-h-[320px] xl:min-h-[340px]">
        <div className="absolute" />

        {/* <CurvedArrowDoodle flip /> */}

        <div className="relative z-10 grid min-h-[220px] grid-cols-[0.78fr_1.22fr] gap-2 md:min-h-[260px] md:grid-cols-[0.86fr_1.14fr] md:gap-3 lg:min-h-[280px] xl:min-h-[320px]">
          <motion.div
            className="relative overflow-hidden rounded-[1.1rem] border border-white/10 bg-black/30 shadow-[0_24px_55px_rgba(0,0,0,0.32)] md:rounded-[1.75rem]"
            animate={{ y: active ? [0, -6, 0] : 0 }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={visual.image}
              alt={visual.imageAlt}
              width={620}
              height={620}
              className="h-full min-h-[220px] w-full object-cover lg:min-h-[200px] xl:min-h-[220px]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />

            <div className="absolute bottom-2 left-2 right-2 rounded-xl border border-white/10 bg-black/55 p-2 backdrop-blur-xl md:bottom-3 md:left-3 md:right-3 md:rounded-2xl md:p-3 lg:p-4">
              <div className="text-[9px] font-black uppercase tracking-[0.16em] text-[#ffe6a3] md:text-xs md:tracking-[0.22em]">
                Gentle dry heat
              </div>

              <p className="mt-1 hidden text-sm leading-relaxed text-white/72 sm:block">
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
                className="rounded-[1rem] border border-[#f3c943]/18 bg-black/38 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:rounded-[1.4rem] md:p-4"
                animate={{ x: active ? [0, i % 2 ? -6 : 6, 0] : 0 }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-between gap-2 md:gap-3">
                  <div className="font-display text-lg font-black text-[#f8ead1] md:text-2xl lg:text-3xl">
                    {title}
                  </div>

                  <span className="rounded-full bg-[#f3c943] px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-[#120d05] md:px-3 md:text-[10px] md:tracking-[0.16em]">
                    {meta}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#f8ead1]/68 md:mt-2 md:text-sm md:leading-relaxed">
                  {copy}
                </p>

                <div className="mt-2 flex items-end gap-1.5 md:mt-3 md:gap-2">
                  {[18, 28, 36, 24].map((height, barIndex) => (
                    <motion.span
                      key={`${title}-${height}`}
                      className="w-3 rounded-full bg-[#f3c943]/80 md:w-4"
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
      <div className="relative min-h-[360px] p-7">
        <CurvedArrowDoodle />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_55%,rgba(243,201,67,0.16),transparent_36%)]" />
        <div className="relative z-10 grid min-h-[300px] place-items-center text-center">
          <motion.div
            className="absolute font-display text-[clamp(8rem,19vw,15rem)] font-black leading-none text-[#f3c943]/12"
            animate={{ scale: active ? [0.96, 1.04, 0.96] : 1 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            POP
          </motion.div>
          <div className="relative h-56 w-56">
            {visual.chips.map((chip, i) => (
              <motion.span
                key={chip}
                className="absolute grid h-16 w-16 place-items-center rounded-[45%] border border-[#f3c943]/25 bg-[#f8ead1] text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-[#161006] shadow-[0_18px_35px_rgba(0,0,0,0.28)]"
                style={{
                  left: `${42 + Math.cos((i / visual.chips.length) * Math.PI * 2) * 34}%`,
                  top: `${42 + Math.sin((i / visual.chips.length) * Math.PI * 2) * 34}%`,
                }}
                animate={{
                  y: active ? [0, -18 - i * 3, 0] : 0,
                  rotate: active ? [-8 + i * 5, 8 - i * 3, -8 + i * 5] : 0,
                }}
                transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {chip}
              </motion.span>
            ))}
            <div className="absolute inset-12 grid place-items-center rounded-full border border-[#f3c943]/30 bg-[#f3c943] text-[#120d05] shadow-[0_0_45px_rgba(243,201,67,0.24)]">
              <span className="text-xs font-black uppercase tracking-[0.22em]">crisp</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual.frame === "flavors") {
    return (
      <div className="relative min-h-[260px] overflow-hidden rounded-[1.5rem] p-3 md:min-h-[380px] md:rounded-[2.25rem] md:p-5">
        {/* <CurvedArrowDoodle flip /> */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(243,201,67,0.18),transparent_42%)]" /> */}
        {/* <div className="absolute left-4 top-4 h-20 w-20 rounded-full border border-[#f3c943]/20 md:left-5 md:top-5 md:h-28 md:w-28" /> */}
        {/* <div className="absolute bottom-4 right-5 h-16 w-28 rounded-full bg-[#f3c943]/10 blur-xl md:bottom-5 md:right-8 md:h-20 md:w-40" /> */}

        <div className="relative z-10 grid min-h-[235px] grid-cols-3 gap-2 md:min-h-[340px] md:gap-4">
          {[
            ["Chocolate", "Cocoa dust", flavorChocolate, "from-[#2a1711] to-[#5b351e]"],
            ["Caramel", "Golden glaze", flavorCaramel, "from-[#35210b] to-[#b8860b]"],
            ["Strawberry", "Berry finish", flavorStrawberry, "from-[#33141f] to-[#b73a62]"],
          ].map(([name, note, src, gradient], productIndex) => (
            <motion.div
              key={name}
              className={`group relative flex min-h-[225px] flex-col justify-between overflow-hidden rounded-[1.05rem] border border-white/10 bg-gradient-to-br ${gradient} p-3 shadow-[0_24px_55px_rgba(0,0,0,0.32)] md:min-h-[310px] md:rounded-[1.6rem] md:p-5`}
              animate={{
                y: active ? [0, productIndex === 1 ? -16 : -8, 0] : 0,
                rotate: active ? [-1 + productIndex, 1 - productIndex * 0.5, -1 + productIndex] : 0,
              }}
              transition={{
                duration: 3.2 + productIndex * 0.22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div>
                <div className="text-[8px] font-black uppercase tracking-[0.12em] text-white/62 md:text-[10px] md:tracking-[0.22em]">
                  {note}
                </div>
                <div className="mt-1 font-display text-base font-black leading-none text-white md:mt-2 md:text-3xl">
                  {name}
                </div>
              </div>

              <img
                src={src}
                alt=""
                width={220}
                height={300}
                className="mx-auto max-h-32 object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-2 md:max-h-52"
              />

              <div className="rounded-full border border-white/12 bg-black/35 px-2 py-1.5 text-center text-[8px] font-black uppercase tracking-[0.1em] text-[#fff2c4] backdrop-blur-xl md:px-4 md:py-2 md:text-[10px] md:tracking-[0.18em]">
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
      <div className="relative min-h-[360px] p-7">
        <div className="absolute left-0 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-[#f3c943]/10 blur-2xl" />
        <div className="relative z-10 grid min-h-[300px] grid-cols-1 gap-5 md:grid-cols-[1fr_0.86fr]">
          <div className="flex flex-col justify-center">
            <div className="font-display text-[clamp(3.4rem,8vw,6.8rem)] font-black leading-none text-[#f3c943]">
              Fresh lock
            </div>
            <div className="mt-6 space-y-3">
              {visual.chips.map((chip) => (
                <div
                  key={chip}
                  className="flex items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#fff2c4]"
                >
                  <span>{chip}</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#f3c943] text-[#120d05]">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <motion.img
            src={visual.image}
            alt={visual.imageAlt}
            width={620}
            height={620}
            className="self-center rounded-[2rem_0.75rem_2.75rem_0.75rem] border border-white/12 object-cover shadow-[0_24px_45px_rgba(0,0,0,0.35)]"
            animate={{ rotate: active ? [2, -2, 2] : 2, y: active ? [0, -10, 0] : 0 }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[360px]">
      <CurvedArrowDoodle />
      <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full border border-[#f3c943]/20" />
      <motion.img
        src={visual.image}
        alt={visual.imageAlt}
        width={900}
        height={640}
        className="absolute inset-0 h-full w-full rounded-[0.75rem_3.5rem_0.75rem_3.5rem] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.36)]"
        animate={{ scale: active ? 1.05 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 rounded-[0.75rem_3.5rem_0.75rem_3.5rem] bg-[linear-gradient(180deg,rgba(5,5,5,0.04),rgba(5,5,5,0.74))]" />
      <div className="absolute bottom-5 left-5 max-w-sm rounded-[1.25rem] border border-white/12 bg-black/55 p-5 text-[#fff2c4] shadow-[0_16px_36px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="text-xs font-black uppercase tracking-[0.22em]">
          <span>{visual.eyebrow}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/78">{visual.note}</p>
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
      copy: "md:order-2 md:self-end md:pb-12",
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
      className="flex h-full w-screen shrink-0 items-start px-4 pb-4 pt-2 md:items-center md:px-16 md:pb-8 md:pt-4"
      aria-label={`Stage ${stage.number}`}
    >
      <div
        className={`mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-3 md:gap-12 ${layout.grid}`}
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
            className="inline-flex items-center gap-2 rounded-full border border-[#f3c943]/28 bg-[#f3c943]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffe6a3] md:gap-3 md:px-4 md:py-2 md:text-xs md:tracking-[0.24em]"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {visual.eyebrow}
          </motion.div>

          <motion.h3
            initial={false}
            animate={{ opacity: active ? 1 : 0.24, y: active ? 0 : 34 }}
            transition={{ duration: 0.7, delay: 0.04 }}
            className={`mt-3 max-w-xl font-display font-bold leading-[0.95] text-[#f8ead1] md:mt-6 ${layout.heading}`}
          >
            {stage.title}
          </motion.h3>

          <motion.p
            initial={false}
            animate={{ opacity: active ? 0.82 : 0.2, y: active ? 0 : 24 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-3 line-clamp-2 max-w-xl text-sm leading-snug text-[#f8ead1]/78 md:mt-6 md:line-clamp-none md:text-lg md:leading-relaxed"
          >
            {stage.description}
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0.22, y: active ? 0 : 22 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-3 flex flex-wrap gap-1.5 md:mt-7 md:gap-2"
          >
            {visual.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#f3c943]/22 bg-black/35 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#fff2c4] backdrop-blur-xl md:px-4 md:py-2 md:text-[11px] md:tracking-[0.18em]"
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
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const x = `-${progress * (processStages.length - 1) * (100 / processStages.length)}%`;

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      const nextActive = Math.min(
        processStages.length - 1,
        Math.floor(nextProgress * processStages.length + 0.0001),
      );

      setProgress(nextProgress);
      setActive(nextActive);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      className="relative"
      style={{ height: `${processStages.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-screen flex-col overflow-hidden bg-[#050505] text-[#f8ead1]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(243,201,67,0.14),transparent_28%),radial-gradient(circle_at_80%_88%,rgba(184,134,11,0.2),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.85)_1px,transparent_1px)] [background-size:3px_3px]" />

        <div className="relative z-10 shrink-0 pt-6 md:pt-14">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionHeading
              badge="Product Making"
              title={
                <>
                  From Harvest to <em className="italic text-coral-deep">Your Favourite Flavour</em>
                </>
              }
              align="left"
              className="max-w-3xl gap-3 md:gap-6 [&>h2]:text-[clamp(1.85rem,8vw,2.6rem)] md:[&>h2]:text-[clamp(2.25rem,5.5vw,4.5rem)] [&>span]:px-3 [&>span]:py-1 md:[&>span]:px-4 md:[&>span]:py-1.5"
            />
            <div className="mt-3 flex items-center gap-2 md:mt-6 md:gap-3">
              <div className="whitespace-nowrap rounded-full border border-[#f3c943]/22 bg-black/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffe6a3] backdrop-blur-xl md:px-4 md:py-2 md:text-xs md:tracking-[0.24em]">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(processStages.length).padStart(2, "0")}
              </div>
              <div className="flex flex-1 gap-1.5 md:gap-2">
                {processStages.map((s, i) => (
                  <div
                    key={s.number}
                    className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/12"
                  >
                    <div
                      className="h-full rounded-full bg-[#f3c943] transition-all duration-500"
                      style={{ width: i <= active ? "100%" : "0%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 overflow-hidden">
          <motion.div
            style={{ x, width: `${processStages.length * 100}vw` }}
            className="flex h-full"
          >
            {processStages.map((stage, i) => (
              <StagePanel
                key={stage.number}
                stage={stage}
                visual={processVisuals[i]}
                index={i}
                active={active === i}
              />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-3 rounded-full border border-[#f3c943]/22 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#ffe6a3] backdrop-blur-xl md:flex">
            Continue <ArrowRight className="h-4 w-4" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
