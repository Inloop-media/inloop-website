"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

// Runs once per full page load (the root layout never remounts on client navigation)
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setDone(true), 200),
    });
    // Safety net: never let the loader block the site
    const fallback = setTimeout(() => setDone(true), 3500);
    return () => {
      controls.stop();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
          className="fixed inset-0 z-[300] bg-[#050505] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-logo.webp" alt="" className="w-24 md:w-28 h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.35)]" />
            <div className="text-2xl md:text-3xl font-semibold tracking-tight">
              <span className="text-white">inloop</span> <span className="text-white/55">media</span>
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-5 right-5 md:left-12 md:right-12 flex items-end justify-between">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/45">AI-First Marketing Agency</span>
            <span className="text-5xl md:text-7xl font-light tracking-[-0.04em] text-white tabular-nums">{count}</span>
          </div>
          <div className="absolute bottom-0 left-0 h-[2px] bg-[var(--brand)]" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
