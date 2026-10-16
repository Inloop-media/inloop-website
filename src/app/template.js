"use client";

import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

// Remounts on every navigation: a brand curtain wipes away and the new page rises in
export default function Template({ children }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
        className="fixed inset-0 z-[150] origin-top bg-[#000000] pointer-events-none flex items-center justify-center"
      >
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold tracking-tight"
        >
          <span className="text-white">inloop</span> <span className="text-white/55">media</span>
        </motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
