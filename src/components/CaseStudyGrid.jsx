"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const caseStudies = [
  {
    target: "Smart City",
    metric: "100%",
    label: "UPTIME_SLA",
    description: "Deployed edge-computing and redundant NOC tracking for critical municipal services."
  },
  {
    target: "FinTech Hub",
    metric: "0",
    label: "BREACHES",
    description: "Implemented Zero-Trust architecture and ISO 27001 compliant SOC monitoring."
  },
  {
    target: "Manufacturing",
    metric: "60%",
    label: "COST_REDUCTION",
    description: "Migrated legacy on-premise hardware to a scalable hybrid-cloud environment."
  }
];

export default function CaseStudyGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleMetric = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.2]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-white border-y border-black/5 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-24 relative">

        {/* Left Side: Sticky Success Summary */}
        <div className="md:sticky md:top-40 md:h-fit z-10">
           <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black/40 uppercase mb-4">
              IT Success Stories
           </div>
           <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-12 text-black">
              Our <br/><span className="text-indigo-500 underline decoration-indigo-500/50 underline-offset-8">Impact</span>
           </h2>

           <motion.div
             style={{ scale: scaleMetric }}
             className="bg-black/[0.03] border border-black/10 p-12 md:p-16 flex flex-col items-center justify-center text-center"
           >
              <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-black mb-2">99.9%</div>
              <div className="font-mono text-[10px] tracking-widest text-black/40 uppercase">SLA Adherence across 100+ Clients</div>
           </motion.div>
        </div>

        {/* Right Side: Scrolling Case Study Details */}
        <div className="space-y-32 py-12">
           {caseStudies.map((study, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: idx * 0.1 }}
               className="group relative"
             >
                <div className="font-mono text-[10px] text-indigo-500 mb-6 flex items-center gap-4">
                   <span>{study.target}</span>
                   <span className="w-8 h-px bg-indigo-500/30" />
                   <span>{study.label}</span>
                </div>
                <div className="text-5xl sm:text-6xl font-black tracking-tighter mb-6 text-black group-hover:text-indigo-500 transition-colors">
                   {study.metric}
                </div>
                <p className="text-xl font-light text-black/50 leading-relaxed max-w-sm">
                   {study.description}
                </p>
                <div className="absolute -left-12 top-0 text-[60px] font-black text-black/[0.04] pointer-events-none select-none">
                  0{idx + 1}
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
