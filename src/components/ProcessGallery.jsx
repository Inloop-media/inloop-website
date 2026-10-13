"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const phases = [
  {
    num: "PHASE 01",
    title: "Discovery & Audit",
    desc: "We comprehensively audit your existing infrastructure to identify vulnerabilities, performance bottlenecks, and legacy hardware constraints.",
    metrics: "Infrastructure Assessed"
  },
  {
    num: "PHASE 02",
    title: "Architecture Design",
    desc: "Our architects design an SLA-backed, highly resilient network topology tailored to your enterprise requirements and scale.",
    metrics: "High Availability Setup"
  },
  {
    num: "PHASE 03",
    title: "Migration & Deployment",
    desc: "Seamless transition of critical workloads to hybrid-cloud or software-defined datacenter environments with zero downtime.",
    metrics: "Zero-Downtime Migration"
  },
  {
    num: "PHASE 04",
    title: "24x7 NOC/SOC Operations",
    desc: "Continuous monitoring, proactive threat hunting, and sub-15 minute incident response for sustained infrastructure resilience.",
    metrics: "99.999% SLA Guaranteed"
  }
];

export default function ProcessGallery() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Measure actual track width so the horizontal scroll ends exactly when
  // the last card is in view, instead of an estimated percentage that
  // overshoots and forces extra scrolling past Phase 04.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const distance = trackRef.current.scrollWidth - window.innerWidth;
        setMaxTranslate(distance > 0 ? distance : 0);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.1], [1, 0.2]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#030303] border-t border-white/10">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
         <div className="absolute top-16 md:top-24 left-4 sm:left-6 md:left-12 z-10 w-full overflow-hidden">
             <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2 md:mb-4">
                Operational Pipeline
             </div>
             <motion.h2 
               style={{ opacity: opacityTitle }}
               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter"
             >
               The Methodology.<br/>
               <span className="font-serif italic text-white/80 lowercase">step by step.</span>
             </motion.h2>
         </div>

         <motion.div ref={trackRef} style={{ x }} className="flex h-[60vh] md:h-[70vh] gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 lg:px-24 items-center w-max">
            {/* Intro Spacing pad */}
            <div className="w-[5vw] md:w-[10vw] flex-shrink-0" />
            
            {phases.map((phase, idx) => (
              <div key={idx} className="group relative h-[380px] sm:h-[450px] w-[280px] sm:w-[350px] md:w-[450px] flex-shrink-0 bg-black border border-white/10 p-6 md:p-8 flex flex-col justify-between hover:border-white/30 transition-colors">
                {/* Grain Background */}
                <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E')` }}></div>

                <div className="relative z-10">
                  <div className="font-mono text-[8px] md:text-[10px] tracking-widest uppercase text-white/50 mb-6 md:mb-8 border-b border-white/10 pb-3 md:pb-4 flex justify-between">
                    <span>{phase.num}</span>
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full hidden group-hover:block" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-4 md:mb-6 uppercase">
                    {phase.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
                
                <div className="relative z-10 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                  <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/80">
                    STATUS // {phase.metrics}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Outro Spacing pad */}
            <div className="w-[5vw] md:w-[8vw] flex-shrink-0" />
         </motion.div>
      </div>
    </section>
  );
}
