"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

export default function DashboardPreview() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50 border-t border-black/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 w-full">

        <div className="flex flex-col justify-end w-full">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black/40 uppercase mb-2 md:mb-4">
             Operations Module
          </div>
          <AnimatedText
            text="Infrastructure Without Downtime"
            className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 text-wrap text-black"
          />
          <p className="text-lg sm:text-xl font-light text-black/60 leading-relaxed max-w-lg mb-6 md:mb-8 text-wrap">
            We monitor your global IT infrastructure to resolve incidents before they escalate. Precision engineering is the difference between seamless operations and catastrophic downtime.
          </p>
          <div className="border-l border-black pl-4 sm:pl-6 w-full">
            <p className="text-black font-mono text-xs sm:text-sm leading-relaxed uppercase tracking-widest text-wrap">
              "INNOWORQ's 24/7 Global NOC ensures your business stays online, secure, and compliant at all times."
            </p>
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="w-full mt-8 lg:mt-0"
        >
           <div className="grid grid-cols-2 gap-px bg-black/10 border border-black/10 w-full">
              <div className="bg-white p-8 md:p-12 flex flex-col items-center justify-center text-center hover:bg-black/[0.03] transition-colors group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black mb-2 group-hover:scale-105 transition-transform">24/7</div>
                <div className="font-mono text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Global Monitoring</div>
              </div>
              <div className="bg-white p-8 md:p-12 flex flex-col items-center justify-center text-center hover:bg-black/[0.03] transition-colors group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black mb-2 group-hover:scale-105 transition-transform">99.9%</div>
                <div className="font-mono text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Uptime SLA</div>
              </div>
              <div className="bg-white p-8 md:p-12 flex flex-col items-center justify-center text-center hover:bg-black/[0.03] transition-colors group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black mb-2 group-hover:scale-105 transition-transform">15<span className="text-2xl md:text-3xl text-black/50">m</span></div>
                <div className="font-mono text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Response Time</div>
              </div>
              <div className="bg-white p-8 md:p-12 flex flex-col items-center justify-center text-center hover:bg-black/[0.03] transition-colors group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black mb-2 group-hover:scale-105 transition-transform">100+</div>
                <div className="font-mono text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Certified Experts</div>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
