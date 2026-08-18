"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollMarquee() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Moves right to left as you scroll down
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // Moves left to right as you scroll down
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-white overflow-hidden relative border-y border-black/10 flex flex-col gap-8 md:gap-12 w-full">

      {/* Decorative center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 pointer-events-none" />

      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap w-max">
        {[...Array(4)].map((_, i) => (
          <h2 key={i} className="text-5xl sm:text-7xl md:text-[9vw] font-black uppercase text-black tracking-tighter leading-none inline-block pe-8 sm:pe-16 md:pe-24 cursor-default">
            ENTERPRISE INFRASTRUCTURE • HYBRID CLOUD •
          </h2>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap w-max ml-[-20%]">
        {[...Array(4)].map((_, i) => (
          <h2
            key={i}
            className="text-5xl sm:text-7xl md:text-[9vw] font-black uppercase text-black tracking-tighter leading-none inline-block pe-8 sm:pe-16 md:pe-24 cursor-default"
          >
            NOC MONITORING • ZERO-TRUST SECURITY •
          </h2>
        ))}
      </motion.div>

    </section>
  );
}
