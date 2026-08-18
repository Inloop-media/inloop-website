"use client";

import { motion } from "framer-motion";

const mentions = [
  "Uptime: 99.999% SLA Guarantee across all managed nodes...",
  "Incident Response: <15 minutes MTTR for critical alerts...",
  "Security: Zero-Trust Framework deployed and active...",
  "Compliance: ISO/IEC 27001:2022 Certified...",
  "Support: 24/7/365 Global NOC Operations...",
  "Cloud: AWS / Azure / GCP Infrastructure Management...",
  "Hardware: Multi-Vendor OEM SLA Support...",
  "Infrastructure: 100+ Enterprise Data Centers Managed..."
];

export default function TrustTicker() {
  return (
    <section className="py-12 border-y border-black/10 bg-black/[0.03] overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="flex text-nowrap whitespace-nowrap overflow-hidden">
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ ease: "linear", duration: 30, repeat: Infinity }}
           className="flex gap-12 px-6"
        >
          {/* Double the array for seamless scrolling */}
          {[...mentions, ...mentions].map((mention, i) => (
            <div key={i} className="flex items-center gap-4 text-black font-medium font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              {mention}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
