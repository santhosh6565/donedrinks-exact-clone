import { motion } from "motion/react";
import { benefits, type BenefitItem } from "./data";
import { SectionHeading } from "./SectionHeading";

interface BenefitCardProps {
  item: BenefitItem;
  index: number;
}

function BenefitCard({ item, index }: BenefitCardProps) {
  const heightClass = item.tall ? "row-span-2 min-h-[420px]" : "min-h-[260px]";
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
          className="flex h-full flex-col justify-between p-8 md:p-10"
          style={{ background: item.bg, color: item.text }}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] opacity-60">
            0{index + 1}
          </span>
          <div className="space-y-4">
            <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-bold leading-[1.05]">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed opacity-80 max-w-sm">
              {item.description}
            </p>
          </div>
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
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
      className="relative py-20 md:py-28"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-7xl px-6 text-cocoa">
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
