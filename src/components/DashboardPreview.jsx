"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <section className="py-16 md:py-24 bg-black border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 w-full">
        
        <div className="flex flex-col justify-end w-full">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2 md:mb-4">
             Intelligence Module
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 text-wrap">
            Data. <br className="hidden sm:block"/> Without Noise.
          </h2>
          <p className="text-lg sm:text-xl font-light text-white/60 leading-relaxed max-w-lg mb-6 md:mb-8 text-wrap">
            We track thousands of subreddits to intercept conversations the second they begin. Precision timing is the difference between a top post and being ignored.
          </p>
          <div className="border-l border-white pl-4 sm:pl-6 w-full">
            <p className="text-white font-mono text-xs sm:text-sm leading-relaxed uppercase tracking-widest text-wrap">
              "Reddit is the only place where you can find 100,000 people talking about your specific niche right now."
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
           <div className="w-full border border-white/20 font-mono text-[8px] sm:text-[10px] md:text-xs">
              
              <div className="grid grid-cols-4 bg-white text-black p-3 sm:p-4 uppercase tracking-widest font-bold border-b border-white/20 w-full">
                 <div className="col-span-2 overflow-hidden text-ellipsis whitespace-nowrap">Target Interface</div>
                 <div className="text-right overflow-hidden text-ellipsis whitespace-nowrap">Volume</div>
                 <div className="text-right overflow-hidden text-ellipsis whitespace-nowrap">Delta</div>
              </div>

              <div className="divide-y divide-white/10 text-white/70 w-full">
                 <div className="grid grid-cols-4 p-3 sm:p-4 items-center hover:bg-white/5 transition-colors w-full">
                    <div className="col-span-2 flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis">
                       <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                       //r/tech
                    </div>
                    <div className="text-right">14.2M</div>
                    <div className="text-right">+18.4%</div>
                 </div>
                 
                 <div className="grid grid-cols-4 p-3 sm:p-4 items-center hover:bg-white/5 transition-colors w-full">
                    <div className="col-span-2 flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis">
                       <span className="w-1.5 h-1.5 bg-white/50 rounded-full flex-shrink-0"></span>
                       //r/startups
                    </div>
                    <div className="text-right">1.2M</div>
                    <div className="text-right">+11.2%</div>
                 </div>

                 <div className="grid grid-cols-4 p-3 sm:p-4 items-center hover:bg-white/5 transition-colors w-full">
                    <div className="col-span-2 flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis">
                       <span className="w-1.5 h-1.5 bg-white/50 rounded-full flex-shrink-0"></span>
                       //r/biz
                    </div>
                    <div className="text-right">2.4M</div>
                    <div className="text-right">+9.8%</div>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 p-4 sm:p-6 border-t border-white/20 uppercase tracking-widest w-full">
                 <div className="w-full">
                    <div className="text-white/40 mb-1 sm:mb-2 text-[8px] sm:text-[10px]">System Status</div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping flex-shrink-0" /> Active
                    </div>
                 </div>
                 <div className="text-right w-full">
                    <div className="text-white/40 mb-1 sm:mb-2 text-[8px] sm:text-[10px]">Vis-Score</div>
                    <div className="text-xl sm:text-2xl text-white font-black tracking-tighter">98.4%</div>
                 </div>
              </div>

           </div>
        </motion.div>

      </div>
    </section>
  );
}
