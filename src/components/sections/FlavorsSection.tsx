import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { flavors, type Flavor } from "./data";
import { SectionHeading } from "./SectionHeading";

const WHATSAPP_NUMBER = "919884471751";
const INITIAL_PRODUCT_COUNT = 6;

function getProductInquiryHref(flavor: Flavor) {
  const message = `Hi LoTFerox, I would like to inquire about ${flavor.name} Makhana 25 gm pack. Please share price, availability, and delivery details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface FlavorCardProps {
  flavor: Flavor;
  index: number;
}

function FlavorCard({ flavor, index }: FlavorCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28, scale: 0.96 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
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

      <motion.a
        href={getProductInquiryHref(flavor)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Inquire about ${flavor.name} on WhatsApp`}
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
      </motion.a>
    </motion.article>
  );
}

export function FlavorsSection() {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const visibleFlavors = showAllProducts ? flavors : flavors.slice(0, INITIAL_PRODUCT_COUNT);
  const hiddenProductCount = Math.max(0, flavors.length - INITIAL_PRODUCT_COUNT);

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
                Six favourites first,{" "}
                <em className="italic text-coral-deep">show more for Raw Makhana.</em>
              </>
            }
          />
        </div>

        <motion.div layout className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleFlavors.map((flavor, i) => (
              <FlavorCard key={flavor.name} flavor={flavor} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {hiddenProductCount > 0 && (
          <div className="mt-12 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowAllProducts((show) => !show)}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-[color:var(--hero-secondary-border)] bg-[var(--hero-secondary-bg)] py-2 pl-6 pr-2 text-sm font-black uppercase tracking-[0.13em] text-[color:var(--hero-secondary-text)] shadow-[var(--hero-secondary-shadow)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[color:var(--hero-secondary-border-hover)] hover:bg-[var(--hero-secondary-bg-hover)] hover:text-[color:var(--hero-secondary-text-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--hero-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--hero-ring-offset)]"
            >
              <span>{showAllProducts ? "Show less" : `Show ${hiddenProductCount} more product`}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--hero-accent)] text-[color:var(--hero-icon-text)] transition-transform group-hover:translate-x-0.5">
                <motion.span
                  animate={{ rotate: showAllProducts ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
