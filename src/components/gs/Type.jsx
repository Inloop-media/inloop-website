"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Home-style kicker (22px) or the smaller inner-page kicker (16px)
export function Kicker({ children, size = "lg", className = "" }) {
  const cls = size === "sm" ? "gs-kicker-sm" : size === "ab" ? "gs-kicker-ab" : "gs-kicker";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`${cls} ${className}`}
    >
      {children}
    </motion.div>
  );
}
