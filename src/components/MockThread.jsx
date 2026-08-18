"use client";

import { motion } from "framer-motion";

export default function MockThread() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50 border-t border-black/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">

        <div className="mb-16 md:mb-24 w-full">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black uppercase mb-3 md:mb-4">
             Rapid Response
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter max-w-2xl text-wrap text-black">
            Resolving the Incident
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 w-full">
          {/* SLA / Speed Typography Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center pr-0 lg:pr-12"
          >
             <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black mb-6 md:mb-8 leading-[0.9]">
               Zero <br/><span className="text-black">Excuses</span>
             </h3>
             <p className="text-xl md:text-2xl font-light text-black leading-relaxed max-w-md mb-12">
               Our incident response framework is engineered for speed. We don't just alert you—we fix it.
             </p>

             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 border-l-4 border-black pl-6 md:pl-8 py-2">
                <div>
                   <div className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-1">&lt; 5<span className="text-black text-xl md:text-2xl">m</span></div>
                   <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-black">Time To Detect</div>
                </div>
                <div>
                   <div className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-1">&lt; 15<span className="text-black text-xl md:text-2xl">m</span></div>
                   <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-black">Time To Resolve</div>
                </div>
             </div>
          </motion.div>

          {/* Metrics */}
          <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-black/10 pt-12 lg:pt-0 lg:pl-16 space-y-12 lg:space-y-16 w-full">
             <div className="w-full">
               <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] text-black uppercase mb-2">Proactive Monitoring</div>
               <p className="text-black font-light text-base sm:text-lg text-wrap">We deploy intelligent monitoring systems that detect anomalies before they impact your end users.</p>
             </div>
             <div className="w-full">
               <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] text-black uppercase mb-2">Rapid Triage</div>
               <p className="text-black font-light text-base sm:text-lg text-wrap">Automated runbooks and expert NOC engineers ensure immediate action on critical infrastructure alerts.</p>
             </div>
             <div className="w-full">
               <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] text-black uppercase mb-2">Transparent Reporting</div>
               <p className="text-black font-light text-base sm:text-lg text-wrap">Real-time communication and detailed post-incident reviews keep your team informed and confident.</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
