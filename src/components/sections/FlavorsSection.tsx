import { motion } from "motion/react";
import { flavors, type Flavor } from "./data";
import { SectionHeading } from "./SectionHeading";

interface FlavorCardProps {
  flavor: Flavor;
  index: number;
}

function FlavorCard({ flavor, index }: FlavorCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="group relative flex flex-col items-center gap-6 overflow-hidden rounded-[30px] p-8 pb-10 shadow-[0_30px_60px_-30px_rgba(60,20,10,0.35)] transition-shadow hover:shadow-[0_40px_70px_-30px_rgba(60,20,10,0.45)]"
      style={{ background: flavor.bg, color: flavor.text }}
    >
      <div className="flex w-full items-center justify-between text-[11px] uppercase tracking-[0.3em] opacity-70">
        <span>0{index + 1}</span>
        <span>Makhana</span>
      </div>

      <h3 className="font-display text-[clamp(2rem,3vw,2.75rem)] font-bold leading-none">
        {flavor.name}
      </h3>

      <div className="relative grid h-[280px] w-full place-items-center">
        <motion.img
          src={flavor.image}
          alt={`${flavor.name} makhana pouch`}
          loading="lazy"
          width={768}
          height={1024}
          className="relative z-10 max-h-[340px] w-auto object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          className="absolute bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full opacity-30 blur-2xl"
          style={{ background: flavor.accent }}
          aria-hidden
        />
      </div>

      <p className="text-center text-base leading-relaxed opacity-80 max-w-xs">
        {flavor.description}
      </p>

      <ul className="flex flex-wrap justify-center gap-2">
        {flavor.ingredients.map((ing) => (
          <li
            key={ing}
            className="rounded-full border border-current/30 px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
          >
            {ing}
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm font-medium shadow-md"
        style={{ background: flavor.accent, color: flavor.bg }}
      >
        Shop now <span aria-hidden>→</span>
      </motion.button>
    </motion.article>
  );
}

export function FlavorsSection() {
  return (
    <section id="flavors" className="relative py-20 md:py-28" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl px-6 text-cocoa">
        <div className="flex justify-center">
          <SectionHeading
            badge="Product Flavours"
            title={
              <>
                Three signatures, <em className="italic text-coral-deep">all crave-worthy.</em>
              </>
            }
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {flavors.map((flavor, i) => (
            <FlavorCard key={flavor.name} flavor={flavor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
