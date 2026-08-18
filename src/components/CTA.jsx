"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-white text-black relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        
        {/* Growth & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end w-full">
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full"
          >
             <div className="font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-8 text-black/50">
              Partner
             </div>
             <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 md:mb-12 text-black text-wrap">
              Engage <br className="hidden sm:block" /> Support
             </h2>
             <p className="text-lg sm:text-xl md:text-2xl font-light max-w-md text-black/70 mb-12 md:mb-16 leading-relaxed">
               Book a strategic technical review. We architect your enterprise IT roadmap.
             </p>
             
             <div className="space-y-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-black border-y border-black/10 py-6 md:py-8 w-full">
                <div className="flex justify-between w-full">
                  <span>PHASE 1</span>
                  <span className="text-black/50">DISCOVERY</span>
                </div>
                <div className="flex justify-between w-full">
                  <span>PHASE 2</span>
                  <span className="text-black/50">ARCHITECTURE</span>
                </div>
                <div className="flex justify-between w-full">
                  <span>PHASE 3</span>
                  <span className="text-black/50">DEPLOYMENT</span>
                </div>
             </div>
             
             <div className="pt-8 md:pt-12 w-full">
                <a href="mailto:hello@innoworq.com" className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-widest hover:text-black/50 transition-colors break-all">hello@innoworq.com</a>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-black text-white p-6 sm:p-8 md:p-12 w-full"
          >
             <form className="space-y-6 md:space-y-8 w-full">
                <div className="space-y-2 md:space-y-3 w-full">
                  <label className="text-[8px] md:text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">Company Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-white focus:outline-none focus:border-white transition-colors text-base sm:text-lg md:text-xl font-light placeholder:text-white/20 rounded-none appearance-none" placeholder="COMPANY INC." />
                </div>
                
                <div className="space-y-2 md:space-y-3 w-full">
                  <label className="text-[8px] md:text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-white focus:outline-none focus:border-white transition-colors text-base sm:text-lg md:text-xl font-light placeholder:text-white/20 rounded-none appearance-none" placeholder="EMAIL" />
                </div>
                
                <div className="space-y-2 md:space-y-3 w-full">
                  <label className="text-[8px] md:text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">Requirements</label>
                  <textarea className="w-full bg-transparent border-b border-white/20 px-0 py-2 sm:py-3 text-white focus:outline-none focus:border-white transition-colors min-h-[80px] md:min-h-[100px] text-base sm:text-lg md:text-xl font-light placeholder:text-white/20 resize-none rounded-none appearance-none" placeholder="DETAILS..."></textarea>
                </div>
                
                <Magnetic strength={0.4}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button" 
                    className="w-full group bg-white text-black font-bold uppercase tracking-widest py-5 sm:py-6 flex items-center justify-center gap-4 hover:bg-gray-200 transition-colors mt-8 md:mt-12 cursor-pointer text-sm sm:text-base border-none outline-none"
                  >
                    CONTACT SALES
                    <div className="overflow-hidden relative w-4 h-4 sm:w-5 sm:h-5">
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute group-hover:translate-x-full transition-transform duration-300" />
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </div>
                  </motion.button>
                </Magnetic>
             </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
