import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
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
      className="group relative flex flex-col items-center gap-6 overflow-hidden rounded-[30px] p-8 pb-10 shadow-[var(--flavor-card-shadow)] transition-shadow hover:shadow-[var(--flavor-card-shadow-hover)]"
      style={{ background: flavor.bg, color: flavor.text }}
    >
      <div className="flex w-full items-center justify-between text-[11px] uppercase tracking-[0.3em] opacity-70">
        <span>0{index + 1}</span>
        <span>25 gm</span>
      </div>

      <h3 className="font-display text-center text-[clamp(2rem,3vw,2.75rem)] font-bold leading-none">
        {flavor.name}
      </h3>

      <div className="relative grid h-[280px] w-full place-items-center">
        <motion.img
          src={flavor.image}
          alt={`${flavor.name} makhana pouch`}
          loading="lazy"
          width={1080}
          height={1350}
          className="relative z-10 max-h-[290px] w-auto object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]"
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
        className="group mt-2 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[color:var(--flavor-button-border)] bg-[var(--flavor-button-bg)] py-2 pl-6 pr-2 text-sm font-black uppercase tracking-[0.12em] text-[color:var(--flavor-button-text)] shadow-[var(--flavor-button-shadow)] backdrop-blur-xl transition-all hover:border-[color:var(--flavor-button-border-hover)] hover:text-[color:var(--flavor-button-text-hover)] hover:shadow-[var(--flavor-button-shadow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--flavor-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--flavor-ring-offset)]"
      >
        <span>Shop now</span>
        <span
          className="grid h-8 w-8 place-items-center rounded-full text-[color:var(--flavor-button-icon-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform group-hover:translate-x-0.5"
          style={{ background: flavor.accent }}
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </motion.button>
    </motion.article>
  );
}

export function FlavorsSection() {
  return (
    <section
      id="flavors"
      className="relative py-20 md:py-28"
      style={{ background: "var(--cream)" }}
    >
      <div className="mx-auto max-w-7xl px-6 text-cocoa">
        <div className="flex justify-center">
          <SectionHeading
            badge="Product Flavours"
            title={
              <>
                Six roasted makhana flavours,{" "}
                <em className="italic text-coral-deep">all snack-smart.</em>
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
