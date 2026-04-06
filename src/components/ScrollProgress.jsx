"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 h-32 w-px bg-white/10 z-[100] group">
      {/* Background track */}
      <div className="absolute inset-0 bg-white/20" />
      
      {/* Animated progress handle */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-white origin-top"
        style={{ scaleY }}
      />
      
      {/* Scroll indicator text */}
      <div className="absolute -left-12 top-0 text-[8px] font-mono uppercase tracking-widest text-white/40 rotate-90 origin-bottom-right translate-x-2 translate-y-[-24px]">
        INFILTRATION
      </div>
    </div>
  );
}
