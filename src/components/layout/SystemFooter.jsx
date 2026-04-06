"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Shield, Hash, Globe } from "lucide-react";

export default function SystemFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().split(' ')[4]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-[#020202] pt-24 pb-12 px-4 sm:px-6 lg:px-12 border-t border-white/10 w-full overflow-hidden">
      {/* Background Pulse Signal */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10 pointer-events-none">
        <svg  width="100%" height="100%" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            d="M0 100 Q 360 0 720 100 T 1440 100" 
            stroke="white" 
            strokeWidth="0.5" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 w-full relative z-10">
        
        <div className="flex flex-col gap-6">
           <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-indigo-500" />
              <span className="font-black text-xl tracking-tighter uppercase">ClearEcho</span>
           </div>
           <p className="font-light text-white/40 text-sm leading-relaxed max-w-xs">
              The only community-authority engine designed for high-stakes brand infiltration. Community trust, at scale.
           </p>
        </div>

        <div className="space-y-6">
           <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase border-b border-white/5 pb-2">Command_Center</div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Active_Nodes</div>
                 <div className="text-white text-sm font-bold">12,408</div>
              </div>
              <div className="space-y-1">
                 <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Operatives</div>
                 <div className="text-white text-sm font-bold">428</div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase border-b border-white/5 pb-2">System_Clock</div>
           <div className="space-y-1">
              <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Standard_UTC</div>
              <div className="text-white text-2xl font-black tracking-tighter">{time}</div>
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase border-b border-white/5 pb-2">Contact</div>
           <a href="mailto:contact@clearecho.in" className="text-white hover:text-indigo-500 transition-colors uppercase font-bold text-sm tracking-widest">
              transmit@clearecho.in
           </a>
           <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">X</div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">in</div>
           </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 w-full opacity-30 relative z-10">
         <div className="font-mono text-[8px] tracking-[0.3em] uppercase">© 2026 ClearEcho // Authority Engine // ALL_RIGHTS_RESERVED</div>
         <div className="flex gap-12 font-mono text-[8px] tracking-[0.2em] uppercase">
            <span className="hover:text-white cursor-pointer">Security_Manual</span>
            <span className="hover:text-white cursor-pointer">Mission_Protocols</span>
         </div>
      </div>
    </footer>
  );
}
