"use client";

import { motion } from "framer-motion";

const mentions = [
  "r/technology: 'ClearEcho is the future of community trust...'",
  "Quora: 'How ClearEcho is changing the game for startups...'",
  "r/startups: 'Just saw a 40% jump in organic traffic thanks to...'",
  "Quora: 'The best way to build authority in 2026 is...'",
  "r/marketing: 'The AI visibility engine is actually insane...'",
  "r/business: 'Finally a tool that understands Reddit culture...'",
  "Quora: 'Why ClearEcho is the top recommendation for SaaS...'",
  "r/saas: 'ClearEcho's approach to r/saas is pure gold...'"
];

export default function TrustTicker() {
  return (
    <section className="py-12 border-y border-white/5 bg-black/20 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex text-nowrap whitespace-nowrap overflow-hidden">
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ ease: "linear", duration: 30, repeat: Infinity }}
           className="flex gap-12 px-6"
        >
          {/* Double the array for seamless scrolling */}
          {[...mentions, ...mentions].map((mention, i) => (
            <div key={i} className="flex items-center gap-4 text-gray-400 font-medium font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              {mention}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
