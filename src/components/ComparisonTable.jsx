"use client";

import { motion } from "framer-motion";

const comparisons = [
  {
    feature: "Trust Level",
    echo: "EXTREMELY HIGH",
    ads: "LOW",
  },
  {
    feature: "Longevity",
    echo: "PERMANENT",
    ads: "EPHEMERAL",
  },
  {
    feature: "Engagement",
    echo: "DEEP DISCUSSIONS",
    ads: "PASSIVE IMPRESSIONS",
  },
  {
    feature: "Cost Efficiency",
    echo: "STRATEGIC ROI",
    ads: "EXPENSIVE PPC",
  }
];

export default function ComparisonTable() {
  return (
    <section className="py-16 md:py-24 bg-black border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 border-b border-white/10 pb-8 md:pb-16 w-full">
          <div className="max-w-xl">
            <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2 md:mb-4">
              Structural Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">
              The Edge.
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl font-light text-white/60 max-w-sm mt-4 md:mt-0 leading-relaxed text-wrap">
            Why the world's smartest brands abandon traditional ad networks.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          {/* Header row - Hidden on small mobile to rely on stacked layout, visible on sm and up */}
          <div className="hidden sm:grid sm:grid-cols-3 font-mono text-[10px] uppercase tracking-widest text-white/40 border-b border-white/20 pb-4 w-full">
             <div>Metric</div>
             <div>ClearEcho System</div>
             <div>Traditional Ads</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/10 w-full">
            {comparisons.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:grid sm:grid-cols-3 py-6 md:py-8 group transition-colors hover:bg-white/5 w-full gap-2 sm:gap-0">
                 {/* Mobile label visible only below sm */}
                 <div className="sm:hidden font-mono text-[8px] uppercase tracking-widest text-white/40 mb-1">Metric</div>
                 <div className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-tight mb-4 sm:mb-0">{item.feature}</div>
                 
                 <div>
                   <div className="sm:hidden font-mono text-[8px] uppercase tracking-widest text-white/40 mb-1">ClearEcho System</div>
                   <div className="text-white font-bold tracking-widest text-xs sm:text-sm md:text-base flex items-center mb-4 sm:mb-0">
                     {item.echo}
                   </div>
                 </div>

                 <div>
                   <div className="sm:hidden font-mono text-[8px] uppercase tracking-widest text-white/40 mb-1">Traditional Ads</div>
                   <div className="text-white/30 font-medium tracking-widest text-xs sm:text-sm md:text-base flex items-center">
                     {item.ads}
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
