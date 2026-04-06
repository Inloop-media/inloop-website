"use client";

import { motion } from "framer-motion";

export default function AnimatedText({ text, className }) {
  // Split the text into lines if there are breaklines, then words, to preserve the structure if needed.
  // We'll keep it simple: split by spaces and preserve HTML linebreaks when used as separate nodes.
  const words = text.split(" ");
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {}
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.25em] align-bottom">
          <motion.span 
             variants={{
               hidden: { y: "120%", rotate: 5, opacity: 0 },
               visible: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
             }}
             className="inline-block origin-bottom-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
