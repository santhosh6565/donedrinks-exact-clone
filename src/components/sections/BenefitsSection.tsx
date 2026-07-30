import { motion } from "motion/react";
import { Check, Flame } from "lucide-react";
import lotferoxLogo from "@/assets/brand/lotferox-nuts-logo.webp";
import { benefits, type BenefitItem } from "./data";
import { SectionHeading } from "./SectionHeading";

interface BenefitCardProps {
  item: BenefitItem;
  index: number;
}

function BenefitCard({ item, index }: BenefitCardProps) {
  const heightClass = item.tall ? "row-span-2 min-h-[420px]" : "min-h-[260px]";
  const isRoastedCard = item.kind === "text" && item.title.startsWith("Roasted");
  const isFlavourCard = item.kind === "text" && item.title.startsWith("Seven");
  const flavourDots = ["#5fbf72", "#f0b389", "#b673c2", "#f0a13a", "#ff6b6b", "#ffd166", "#7a3aa0"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 4) * 0.08,
      }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[30px] shadow-[0_20px_40px_-25px_rgba(60,20,10,0.3)] transition-shadow hover:shadow-[0_30px_50px_-25px_rgba(60,20,10,0.45)] ${heightClass}`}
    >
      {item.kind === "text" ? (
        <div
          className="relative flex h-full flex-col justify-between p-8 md:p-10"
          style={{ background: item.bg, color: item.text }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-current" />
            <div className="absolute -bottom-20 left-6 h-56 w-56 rounded-full bg-current opacity-10 blur-2xl" />
            <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] [background-size:18px_18px] opacity-20" />
          </div>

          {isRoastedCard && (
            <div className="pointer-events-none absolute right-6 top-6 grid h-20 w-20 place-items-center rounded-full border border-current/25 bg-white/10 backdrop-blur-sm md:right-8 md:top-8 md:h-24 md:w-24">
              <Flame className="h-8 w-8" aria-hidden />
            </div>
          )}

          {isFlavourCard && (
            <div className="pointer-events-none absolute right-7 top-7 grid grid-cols-3 gap-2">
              {flavourDots.map((dot) => (
                <span
                  key={dot}
                  className="h-4 w-4 rounded-full border border-white/45 shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                  style={{ background: dot }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 flex items-start justify-between gap-5">
            <span className="text-[11px] uppercase tracking-[0.3em] opacity-60">
              0{index + 1}
            </span>
            {(isRoastedCard || isFlavourCard) && (
              <span className="rounded-full border border-current/20 bg-white/12 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] backdrop-blur-sm">
                {isRoastedCard ? "Dry roast" : "7 packs"}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {(isRoastedCard || isFlavourCard) && (
              <div className="relative z-10 flex flex-wrap gap-2">
                {(isRoastedCard ? ["Low oil", "Crisp bite"] : ["7 products", "Raw + roasted"]).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-current/18 bg-white/12 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] backdrop-blur-sm"
                  >
                    <Check className="h-3 w-3" aria-hidden />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h3 className="relative z-10 font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-bold leading-[1.05]">
              {item.title}
            </h3>
            <p className="relative z-10 max-w-sm text-sm leading-relaxed opacity-80">
              {item.description}
            </p>
          </div>

          {isFlavourCard && (
            <div className="pointer-events-none absolute bottom-5 right-5 font-display text-[8rem] font-black leading-none opacity-10">
              7
            </div>
          )}
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
    </motion.div>
  );
}

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative isolate overflow-hidden py-20 md:py-28"
      style={{ background: "var(--cream)" }}
    >
      <img
        src={lotferoxLogo}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        width={760}
        height={428}
        className="pointer-events-none absolute left-[75%] top-[80%] z-0 hidden w-[min(30vw,400px)] -translate-x-1/2 -translate-y-1/2 opacity-80 drop-shadow-[0_18px_28px_rgba(76,38,18,0.12)] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-cocoa">
        <div className="flex justify-center">
          <SectionHeading
            badge="Benefits"
            title={
              <>
                Snack smarter, <em className="italic text-coral-deep">live softer.</em>
              </>
            }
          />
        </div>

        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => (
            <BenefitCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
