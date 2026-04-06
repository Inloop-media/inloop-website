"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AtmosphericTypo() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-black overflow-hidden relative border-b border-white/5 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
         <div className="flex flex-col items-center justify-center text-center py-20 pointer-events-none">
            <div className="font-mono text-[10px] md:text-[12px] tracking-[0.4em] text-white/40 uppercase mb-8">
               Core System Protocols
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none">
              The Engine. <br/><span className="text-white/20">The Authority.</span>
            </h2>
         </div>
      </div>

      {/* Massive Background Parallax Text */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-5 flex flex-col justify-center">
         <motion.div 
           style={{ x: x1 }}
           className="text-[200px] md:text-[300px] font-black uppercase tracking-tighter whitespace-nowrap leading-none"
         >
           INFILTRATION_MISSION_SUCCESS_
         </motion.div>
         <motion.div 
           className="text-[200px] md:text-[300px] font-black uppercase tracking-tighter whitespace-nowrap leading-none text-outline"
           style={{ WebkitTextStroke: "1px white", color: "transparent", x: x2 }}
         >
           AUTHORITY_ESTABLISHED_24/7_
         </motion.div>
         <motion.div 
           style={{ x: x1 }}
           className="text-[200px] md:text-[300px] font-black uppercase tracking-tighter whitespace-nowrap leading-none"
         >
           RELIABILITY_PROTOCOL_ACTIVE_
         </motion.div>
      </div>
    </section>
  );
}
