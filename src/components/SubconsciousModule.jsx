"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const keywords = [
  { initial: "WHISPER", final: "STRATEGIC_WHISPER", x: "10%", y: "20%" },
  { initial: "TRUST", final: "COMMUNITY_TRUST", x: "60%", y: "15%" },
  { initial: "REACH", final: "GLOBAL_AUTHORITY", x: "30%", y: "50%" },
  { initial: "SIGNAL", final: "UNCANNY_RELIABILITY", x: "70%", y: "60%" },
  { initial: "ECHO", final: "RESONANT_DOMINANCE", x: "15%", y: "75%" },
  { initial: "PULSE", final: "REALTIME_INTERCEPTION", x: "50%", y: "85%" },
];

export default function SubconsciousModule() {
  return (
    <section className="relative h-[600px] md:h-[800px] bg-black overflow-hidden flex items-center justify-center border-t border-white/5 w-full">
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6">
         <div className="font-mono text-[8px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase mb-6">
            Module 09 // Subconscious
         </div>
         <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Influence. <br/><span className="text-white/20">Without Detection.</span>
          </h2>
      </div>

      {/* Floating Ethereal Keywords */}
      <div className="absolute inset-0 z-0">
        {keywords.map((word, idx) => (
          <FloatingWord key={idx} word={word} />
        ))}
      </div>
    </section>
  );
}

function FloatingWord({ word }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ x: word.x, y: word.y }}
      animate={{
        x: [word.x, `${parseInt(word.x) + 5}%`, word.x],
        y: [word.y, `${parseInt(word.y) - 5}%`, word.y],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute cursor-pointer group"
      style={{ left: word.x, top: word.y }}
    >
      <motion.div
        animate={{
          filter: isHovered ? "blur(0px)" : "blur(8px)",
          opacity: isHovered ? 1 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        className="font-mono text-xs md:text-sm tracking-[0.3em] text-white uppercase whitespace-nowrap bg-black/40 backdrop-blur-md px-4 py-2 border border-white/5"
      >
        {isHovered ? word.final : word.initial}
      </motion.div>
    </motion.div>
  );
}
