"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function PerceptionShift() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  
  // Percentage for the clip-path
  const clipPercent = useTransform(springX, (val) => {
    if (!containerRef.current) return 50;
    const width = containerRef.current.offsetWidth;
    return (val / width) * 100;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        mouseX.set(x);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  return (
    <section className="py-24 md:py-32 bg-black border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full text-center mb-16">
        <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
           The Infrastructure Optimization
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter">
          Legacy vs <span className="text-white/20">Innoworq</span>
        </h2>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full h-[400px] md:h-[600px] bg-[#050505] cursor-none group select-none overflow-hidden"
      >
        {/* Layer 1: The "Before" State (Dull, Low trust) */}
        <div className="absolute inset-0 flex items-center justify-center grayscale opacity-30 px-4">
           <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center w-full">
              <div className="space-y-2">
                 <div className="text-4xl font-black tracking-tighter">85.4%</div>
                 <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Uptime Ratio</div>
              </div>
              <div className="space-y-2">
                 <div className="text-4xl font-black tracking-tighter">VULNERABLE</div>
                 <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Security Posture</div>
              </div>
              <div className="space-y-2">
                 <div className="text-4xl font-black tracking-tighter">4+ HOURS</div>
                 <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Incident MTTR</div>
              </div>
           </div>
        </div>

        {/* Layer 2: The "After" State (Glow, High Authority - Revealed by clip-path) */}
        <motion.div 
          style={{ clipPath: useTransform(clipPercent, p => `inset(0 ${100 - p}% 0 0)`) }}
          className="absolute inset-0 z-10 bg-indigo-500/10 backdrop-blur-sm flex items-center justify-center px-4 border-r border-white"
        >
           <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center w-full">
              <div className="space-y-2">
                 <div className="text-5xl sm:text-6xl font-black tracking-tighter text-white">99.999%</div>
                 <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest">SLA Compliance</div>
              </div>
              <div className="space-y-2">
                 <div className="text-5xl sm:text-6xl font-black tracking-tighter text-white">SECURE</div>
                 <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Zero-Trust Verified</div>
              </div>
              <div className="space-y-2">
                 <div className="text-5xl sm:text-6xl font-black tracking-tighter text-white">&lt; 15 MINS</div>
                 <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Incident MTTR</div>
              </div>
           </div>
        </motion.div>

        {/* Vertical Scan Line */}
        <motion.div 
          style={{ left: springX }}
          className="absolute top-0 bottom-0 w-px bg-white z-20 shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none"
        >
           <div className="absolute top-1/2 -translate-y-1/2 left-4 whitespace-nowrap font-mono text-[10px] text-white uppercase tracking-widest bg-black px-2 py-1 border border-white/20">
              [SYSTEM_REVEAL]
           </div>
        </motion.div>

        {/* Floating Instruction */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase z-30">
          Move cursor to scan infrastructure upgrade
        </div>
      </div>
    </section>
  );
}
