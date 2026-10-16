"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Lines slide up from behind a mask, one after another.
// The in-view trigger sits on the (unclipped) wrapper: each line starts fully clipped by its
// mask, so observing the line itself would never fire.
export function RevealLines({ lines, className = "", lineClassName = "", delay = 0, as: Tag = "h2" }) {
  const MotionTag = motion[Tag] || motion.h2;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: "110%" }, shown: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function Kicker({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`text-xs md:text-[13px] tracking-[0.12em] uppercase text-[var(--brand)] mb-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function SectionHead({ kicker, lines, className = "", children }) {
  return (
    <div className={className}>
      <Kicker>{kicker}</Kicker>
      <RevealLines
        lines={lines}
        className="text-[34px] sm:text-5xl md:text-[56px] font-light tracking-[-0.02em] leading-[1.08] text-white"
      />
      {children}
    </div>
  );
}

export function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
