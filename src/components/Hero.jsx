"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import Magnetic from "@/components/Magnetic";
import AnimatedText from "@/components/AnimatedText";
import BackgroundNodes from "@/components/BackgroundNodes";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={ref} className="relative min-h-[100svh] md:min-h-[120vh] flex flex-col items-center justify-start pt-32 lg:pt-40 bg-white overflow-x-hidden">
      <BackgroundNodes />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: y1, opacity: opacity1 }}
        className="w-full px-4 sm:px-6 lg:px-12 flex flex-col items-center z-10"
      >
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">

          <motion.div style={{ scale: scaleTitle }} className="w-full flex flex-col items-center justify-center">
            <AnimatedText
              text="INNOWORQ"
              className="text-[14.5vw] sm:text-[13.5vw] md:text-[11vw] lg:text-[140px] xl:text-[150px] leading-[0.85] font-black tracking-tighter text-black uppercase text-center"
            />
            <AnimatedText
              text="Infotech"
              className="block text-[14.5vw] sm:text-[13.5vw] md:text-[11vw] lg:text-[140px] xl:text-[150px] leading-[0.8] tracking-tighter font-serif italic text-black lowercase mt-2 md:mt-4 text-center"
            />
          </motion.div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 w-full mt-24 md:mt-48 relative z-10">
             <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black font-light tracking-tight max-w-lg leading-snug">
               <i className="font-serif italic text-black">Strong partnerships. Smarter solutions. Greater impact.</i> Global IT infrastructure, cloud, and cybersecurity support partner.
             </div>
             <div className="flex flex-col gap-4 md:gap-6 justify-end items-start md:items-end w-full">
               <Magnetic>
                 <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-64 group flex items-center justify-center gap-4 bg-black text-white px-6 sm:px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors pointer-events-auto cursor-pointer"
                 >
                    View Services
                    <span className="block overflow-hidden relative w-4 h-4 sm:w-5 sm:h-5">
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute group-hover:translate-x-full transition-transform duration-300" />
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                 </motion.button>
               </Magnetic>
               <Magnetic>
                 <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-64 group flex items-center justify-center gap-4 bg-transparent border border-black/20 text-black px-6 sm:px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest hover:border-black transition-colors cursor-pointer"
                 >
                    Contact Us
                    <span className="block overflow-hidden relative w-4 h-4 sm:w-5 sm:h-5">
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute group-hover:translate-x-full transition-transform duration-300" />
                       <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                 </motion.button>
               </Magnetic>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Minimalist Dashboard Stats - Pinned at bottom of hero */}
      <div className="md:absolute static bottom-0 left-0 w-full bg-white z-20 border-t border-black/10 mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/10">
           <div className="py-8 md:py-12 sm:pr-6 md:pr-12 group flex flex-col items-center text-center">
             <h3 className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black uppercase mb-4 md:mb-8 w-full text-center">
               Senior IT Experts
             </h3>
             <div className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-2 tracking-tighter">350<span className="text-xl md:text-2xl text-black">+</span></div>
             <div className="text-[8px] md:text-[10px] font-mono tracking-widest text-black uppercase">PROFESSIONALS</div>
           </div>

           <div className="py-8 md:py-12 sm:px-6 md:px-12 group flex flex-col items-center text-center">
             <h3 className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black uppercase mb-4 md:mb-8 w-full text-center">
               Global Scale
             </h3>
             <div className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-2 tracking-tighter">100<span className="text-xl md:text-2xl text-black">+</span></div>
             <div className="text-[8px] md:text-[10px] font-mono tracking-widest text-black uppercase">ENTERPRISE CLIENTS</div>
           </div>

           <div className="py-8 md:py-12 sm:pl-6 md:pl-12 group flex flex-col items-center text-center">
             <h3 className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black uppercase mb-4 md:mb-8 w-full text-center">
               Track Record
             </h3>
             <div className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-2 tracking-tighter">100<span className="text-xl md:text-2xl text-black">+</span></div>
             <div className="text-[8px] md:text-[10px] font-mono tracking-widest text-black uppercase">PROJECTS DELIVERED</div>
           </div>
        </div>
      </div>
    </section>
  );
}
