"use client";

import { motion } from "framer-motion";

export default function SlantedMarquee() {
  return (
    <section className="relative overflow-hidden bg-black text-black py-24 md:py-32 flex items-center justify-center">
      {/* Black background filler to blend properly */}
      <div className="absolute inset-0 bg-[#050505] z-0" />
      
      <div className="absolute w-[110%] transform -rotate-3 scale-105 bg-indigo-500 py-4 sm:py-6 border-y border-white shadow-[0_0_50px_rgba(99,102,241,0.2)] z-20">
        <motion.div
           animate={{ x: ["-50%", "0%"] }}
           transition={{ ease: "linear", duration: 12, repeat: Infinity }}
           className="flex gap-4 sm:gap-8 px-4 w-max"
        >
          {/* We use a large array to ensure seamless infinite scrolling of this slanted band */}
          {[...Array(16)].map((_, i) => (
             <div key={i} className="flex items-center gap-3 sm:gap-6 text-black font-black uppercase text-2xl sm:text-4xl tracking-tighter whitespace-nowrap">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black shrink-0" />
                ZERO-TRUST DEPLOYMENT
             </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
