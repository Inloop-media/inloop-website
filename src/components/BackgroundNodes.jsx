"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function BackgroundNodes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Create parallax values for drifting elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.2]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Node 1: Top Right Dot Cluster */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-[10%] right-[15%] w-64 h-64 border border-black/10 rounded-full flex items-center justify-center"
      >
        <div className="w-1 h-1 bg-black/30 rounded-full" />
      </motion.div>

      {/* Node 2: Background Grid Lines (Drifting) */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-[40%] left-[10%] w-[40vw] h-px bg-gradient-to-r from-transparent via-black/15 to-transparent"
      />

      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-[70%] right-[5%] w-[30vw] h-px bg-gradient-to-r from-transparent via-black/15 to-transparent"
      />

      {/* Node 3: Tiny Floating Dots */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-[25%] left-[25%] w-0.5 h-0.5 bg-black/40 rounded-full"
      />

      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-[60%] right-[30%] w-0.5 h-0.5 bg-black/40 rounded-full"
      />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
}
