import type { ReactNode } from "react";
import { motion } from "motion/react";

export interface SectionHeadingProps {
  badge: string;
  title: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-6 ${alignment} ${className}`}
    >
      <span className="inline-block rounded-full border border-current/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em]">
        {badge}
      </span>
      <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tight max-w-4xl">
        {title}
      </h2>
    </motion.div>
  );
}
