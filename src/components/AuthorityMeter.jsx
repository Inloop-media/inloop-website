"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AuthorityMeter() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  
  // Update labels based on scroll percentage
  const label = useTransform(scrollYProgress, 
    [0, 0.3, 0.6, 0.9], 
    ["RECONNAISSANCE", "INFILTRATION", "SCALE", "DOMINANCE"]
  );

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed top-20 left-0 right-0 h-1 z-[100] bg-white/5 backdrop-blur-sm px-4 md:px-12 pointer-events-none"
    >
      <div className="relative w-full h-full">
         <motion.div 
           className="absolute top-0 left-0 h-full bg-indigo-500 origin-left"
           style={{ scaleX }}
         />
         
         <div className="absolute top-4 right-0 flex items-center gap-2">
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase">System Status</span>
            <motion.span className="font-mono text-[8px] tracking-[0.2em] text-white font-bold uppercase min-w-[100px] text-right">
               {label}
            </motion.span>
         </div>
      </div>
    </motion.div>
  );
}
