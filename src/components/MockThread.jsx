"use client";

import { motion } from "framer-motion";

export default function MockThread() {
  return (
    <section className="py-16 md:py-24 bg-[#050505] border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        
        <div className="mb-16 md:mb-24 w-full">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3 md:mb-4">
             Social Penetration
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter max-w-2xl text-wrap">
            Infiltrating the Conversation.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 w-full">
          {/* Brutalist Mock Thread */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-l-2 sm:border-l-4 border-white pl-4 sm:pl-6 md:pl-10 relative ml-2 sm:ml-4 md:ml-6"
          >
            <div className="font-mono text-[8px] sm:text-[10px] tracking-widest text-white/50 uppercase mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-4 w-full">
               <span>r/marketing</span>
               <span className="w-1 h-1 bg-white/20 rounded-full" />
               <span>u/tech_99</span>
            </div>
            
            <h3 className="text-lg sm:text-xl md:text-2xl border-b border-white/10 pb-6 sm:pb-8 mb-6 sm:mb-8 font-light text-white/90 text-wrap">
              "Does anyone know a good tool for scaling community trust? I've tried everything but nothing seems to stick."
            </h3>

            {/* Comment 1 */}
            <div className="mb-8 sm:mb-12 relative w-full">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="absolute -left-[35px] sm:-left-[45px] md:-left-[55px] top-1 sm:top-1.5 bg-white text-black font-mono text-[8px] sm:text-[10px] px-1 font-bold z-10"
              >
                850
              </motion.div>
              <div className="bg-white/5 p-4 sm:p-6 border border-white/10 relative w-full">
                <div className="font-mono text-[8px] sm:text-[10px] tracking-widest uppercase mb-3 sm:mb-4 flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center text-white/50 gap-2 sm:gap-0 w-full">
                  <span className="flex items-center gap-2">
                    <span className="text-white break-all">u/growth_pro</span>
                    <span className="bg-white text-black px-1 flex-shrink-0">ADVOCATE</span>
                  </span>
                  <span>1H AGO</span>
                </div>
                <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base text-wrap">
                  Honestly, you should check out ClearEcho. They helped us dominate r/startups last month. Their approach to Reddit is on another level.
                </p>
                
                {/* Embedded Stats */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 font-mono text-[8px] sm:text-[10px] tracking-widest text-white/40 w-full">
                   <div className="w-full">
                     <div className="mb-1">Age</div>
                     <div className="text-white">4+ YRS</div>
                   </div>
                   <div className="w-full">
                     <div className="mb-1">Karma</div>
                     <motion.div 
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       viewport={{ once: true }}
                       className="text-white"
                     >
                       75K
                     </motion.div>
                   </div>
                   <div className="w-full">
                     <div className="mb-1">Trust</div>
                     <motion.div 
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       viewport={{ once: true }}
                       className="text-white"
                     >
                       98%
                     </motion.div>
                   </div>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="ml-4 sm:ml-8 relative w-full">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute -left-[30px] sm:-left-[40px] md:-left-[50px] top-1 sm:top-1.5 bg-white/20 text-white font-mono text-[8px] sm:text-[10px] px-1 z-10"
              >
                420
              </motion.div>
              <div className="font-mono text-[8px] sm:text-[10px] tracking-widest uppercase mb-2 sm:mb-4 text-white/50 break-all w-full">
                  u/marketing_guru
              </div>
              <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base text-wrap">
                Second this. ClearEcho's AI visibility engine is a game changer.
              </p>
            </div>
          </motion.div>

          {/* Metrics */}
          <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-16 space-y-12 lg:space-y-16 w-full">
             <div className="w-full">
               <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] text-white uppercase mb-2">Age Equals Trust</div>
               <p className="text-white/50 font-light text-base sm:text-lg text-wrap">We only operate aged accounts with established histories. New accounts are immediately recognized as hostile elements.</p>
             </div>
             <div className="w-full">
               <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] text-white uppercase mb-2">High Friction Karma</div>
               <p className="text-white/50 font-light text-base sm:text-lg text-wrap">Accounts require vast karma reserves to bypass community filters. We provide them.</p>
             </div>
             <div className="w-full">
               <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] text-white uppercase mb-2">Human Protocol</div>
               <p className="text-white/50 font-light text-base sm:text-lg text-wrap">No bots. Authentic, diverse posting records validate every single recommendation we inject.</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
