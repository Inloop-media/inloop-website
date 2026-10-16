"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

const EASE = [0.16, 1, 0.3, 1];

// Typographic result visual used where client imagery isn't available
export default function CaseVisual({ c, big = false }) {
  const m = c.metric;
  return (
    <div className="absolute inset-0 bg-[#000000] overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 0), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at 70% 35%, #000, transparent 80%)",
        }}
      />
      <div className="absolute -top-1/3 -right-1/4 w-[80%] h-[130%] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.32),transparent_60%)] blur-2xl transition-transform duration-[1.4s] group-hover:scale-110" />
      <div className="absolute right-[6%] top-[12%] flex items-end gap-1.5 md:gap-2 h-[44%] w-[38%]">
        {c.bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: EASE }}
            style={{ height: `${h}%` }}
            className={`flex-1 origin-bottom rounded-t-[3px] ${i === c.bars.length - 1 ? "bg-[var(--brand)]" : "bg-white/15"}`}
          />
        ))}
      </div>
      <div className="absolute left-[5%] top-[10%]">
        <div className={`${big ? "text-[80px] md:text-[150px]" : "text-[64px] md:text-[96px]"} font-light tracking-[-0.05em] leading-none text-white`}>
          {m.prefix}
          <CountUp to={m.value} decimals={m.decimals || 0} />
          {m.suffix}
        </div>
        <div className="mt-3 text-[12px] tracking-[0.2em] uppercase text-white/55">{m.label}</div>
      </div>
    </div>
  );
}
