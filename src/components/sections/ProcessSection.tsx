import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { processStages, type ProcessStage } from "./data";
import { SectionHeading } from "./SectionHeading";

interface StagePanelProps {
  stage: ProcessStage;
  index: number;
  active: boolean;
}

function StagePanel({ stage, index, active }: StagePanelProps) {
  return (
    <article
      className="flex h-full w-screen shrink-0 items-center px-6 md:px-16"
      aria-label={`Stage ${stage.number}`}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-5 flex justify-center">
          <motion.div
            initial={false}
            animate={{
              scale: active ? 1 : 0.85,
              opacity: active ? 1 : 0.35,
              rotate: active ? 0 : -4,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid aspect-square w-full max-w-[340px] place-items-center rounded-[40%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]"
            style={{ background: stage.accent }}
          >
            <span className="font-display text-[clamp(4.5rem,10vw,8rem)] font-bold leading-none">
              {stage.number}
            </span>
            <motion.div
              initial={false}
              animate={{ rotate: active ? 360 : 0 }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
              className="absolute inset-4 rounded-[40%] border border-current/20"
              aria-hidden
            />
          </motion.div>
        </div>

        <div className="md:col-span-7 space-y-5">
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0.25, y: active ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] opacity-70"
          >
            Stage {stage.number} · {String(index + 1)} of {processStages.length}
          </motion.div>
          <motion.h3
            initial={false}
            animate={{ opacity: active ? 1 : 0.2, y: active ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.02]"
          >
            {stage.title}
          </motion.h3>
          <motion.p
            initial={false}
            animate={{ opacity: active ? 0.85 : 0.2, y: active ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xl text-base md:text-lg leading-relaxed"
          >
            {stage.description}
          </motion.p>
        </div>
      </div>
    </article>
  );
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(processStages.length - 1) * (100 / processStages.length)}%`],
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        processStages.length - 1,
        Math.floor(v * processStages.length + 0.0001),
      );
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative"
      style={{ height: `${processStages.length * 100}vh` }}
    >
      <div
        className="sticky top-0 flex h-screen w-screen flex-col overflow-hidden"
        style={{ background: "var(--cream)", color: "var(--cocoa)" }}
      >
        {/* Header */}
        <div className="shrink-0 pt-24 md:pt-28 pb-6">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              badge="Product Making"
              title={
                <>
                  From Harvest to{" "}
                  <em className="italic text-coral-deep">Your Favourite Flavour</em>
                </>
              }
              align="left"
              className="max-w-3xl"
            />
            <div className="mt-6 flex items-center gap-3">
              <div className="text-xs uppercase tracking-[0.3em] opacity-70 whitespace-nowrap">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(processStages.length).padStart(2, "0")}
              </div>
              <div className="flex flex-1 gap-2">
                {processStages.map((s, i) => (
                  <div
                    key={s.number}
                    className="h-[2px] flex-1 overflow-hidden bg-current/20"
                  >
                    <div
                      className="h-full bg-current transition-all duration-500"
                      style={{ width: i <= active ? "100%" : "0%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal track fills remaining space */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            style={{ x, width: `${processStages.length * 100}vw` }}
            className="flex h-full"
          >
            {processStages.map((stage, i) => (
              <StagePanel
                key={stage.number}
                stage={stage}
                index={i}
                active={active === i}
              />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] opacity-60">
            Scroll <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
