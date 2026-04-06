"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function IntelligenceFlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById("radar-section")?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="radar-section" className="relative py-24 md:py-32 bg-[#020202] border-y border-white/5 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative z-10">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
             Network Intelligence
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
            Interception. <br/><span className="text-white/20">Live Stream.</span>
          </h2>
          <p className="text-lg sm:text-xl font-light text-white/50 leading-relaxed max-w-md mb-12">
            The radar scans 50,000+ niche subreddits in real-time. We catch conversations before they trend, giving you the first-mover advantage.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
             <div className="space-y-1">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Active Pings</div>
                <div className="text-2xl font-black text-white">12,408</div>
             </div>
             <div className="space-y-1">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Trust Score</div>
                <div className="text-2xl font-black text-indigo-500">98.2%</div>
             </div>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center border border-white/10 bg-black/40 overflow-hidden rounded-full aspect-square max-w-[500px] mx-auto lg:ml-auto">
           {/* Radar Pulse Background */}
           <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
              {[...Array(144)].map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/10" />
              ))}
           </div>
           
           {/* Radial Pulse */}
           {[0, 1, 2].map((i) => (
             <motion.div
               key={i}
               initial={{ scale: 0, opacity: 0.5 }}
               animate={{ scale: 1.5, opacity: 0 }}
               transition={{ duration: 4, repeat: Infinity, delay: i * 1.5, ease: "linear" }}
               className="absolute w-full h-full border border-white/20 rounded-full"
             />
           ))}

           {/* Central Core */}
           <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <div className="w-2 h-2 bg-black rounded-full animate-ping" />
           </div>

           {/* Floating Data Nodes that orbit the mouse cursor */}
           {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-indigo-500 rounded-full"
                animate={{
                   x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                   y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                }}
                transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                style={{
                  left: springX,
                  top: springY,
                  translateX: (i - 6) * 20,
                  translateY: (i - 6) * 15,
                  opacity: 0.4,
                }}
              />
           ))}
           
           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-widest text-white/40 uppercase">
              SCANNING_VECTORS_...
           </div>
        </div>

      </div>
    </section>
  );
}
