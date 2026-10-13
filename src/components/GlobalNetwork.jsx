"use client";

import React from "react";
import { motion } from "framer-motion";

const nodes = [
  { id: 1, x: "25%", y: "35%", label: "US_EAST_01" },
  { id: 2, x: "15%", y: "45%", label: "US_WEST_02" },
  { id: 3, x: "48%", y: "30%", label: "EU_WEST_01" },
  { id: 4, x: "55%", y: "40%", label: "EU_CENTRAL_02" },
  { id: 5, x: "75%", y: "35%", label: "ASIA_EAST_01" },
  { id: 6, x: "82%", y: "55%", label: "ASIA_SE_01" },
  { id: 7, x: "35%", y: "70%", label: "LATAM_01" }
];

export default function GlobalNetwork() {
  return (
    <section className="py-24 md:py-32 bg-[#020202] border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          
          <div className="lg:col-span-1">
             <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
                Global Reach
             </div>
             <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                Data Center <br/><span className="text-indigo-500">Footprint.</span>
             </h2>
             <p className="text-lg font-light text-white/50 leading-relaxed max-w-sm">
                Our network operations span the globe, providing seamless 24/7 support and ensuring your enterprise data remains resilient and compliant across borders.
             </p>
             
             <div className="mt-12 space-y-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
                <div className="flex justify-between items-center bg-white/5 p-3 border-l-2 border-indigo-500">
                   <span>NOC Availability</span>
                   <span className="text-white">OPTIMAL</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 border-l-2 border-white/20">
                   <span>Zero-Trust Protocol</span>
                   <span className="text-white">ENFORCED</span>
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 relative h-[300px] md:h-[500px] border border-white/10 bg-black overflow-hidden flex items-center justify-center">
             {/* Simple World Map Path (Minimalist placeholder aesthetic) */}
             <svg width="100%" height="100%" viewBox="0 0 1000 500" className="opacity-20">
                <path 
                  fill="white" 
                  d="M150,200 L250,200 L270,250 L200,280 L140,250 Z M450,150 L550,150 L580,220 L500,250 L430,220 Z M700,180 L850,180 L880,280 L750,350 L680,280 Z M300,350 L400,350 L420,450 L320,480 L280,420 Z" 
                />
             </svg>
             
             {/* Data Nodes */}
             {nodes.map((node) => (
                <div 
                  key={node.id} 
                  className="absolute"
                  style={{ left: node.x, top: node.y }}
                >
                   <motion.div 
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true }}
                     className="relative flex items-center justify-center"
                   >
                      {/* Pulse effect */}
                      <motion.div
                        animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                        className="absolute w-8 h-8 md:w-12 md:h-12 bg-indigo-500 rounded-full"
                      />
                      {/* Central point */}
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full relative z-10" />
                      
                      {/* Node Label */}
                      <div className="absolute top-4 left-4 font-mono text-[8px] text-white/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                         {node.label}_ACTIVE
                      </div>
                   </motion.div>
                </div>
             ))}

             {/* Moving Data Lines simulation (abstract CSS lines) */}
             <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <div className="absolute top-[35%] left-[25%] w-[25%] h-px bg-white rotate-[15deg] origin-left animate-pulse" />
                <div className="absolute top-[40%] left-[55%] w-[25%] h-px bg-white rotate-[-15deg] origin-left animate-pulse" style={{ animationDelay: '1s' }} />
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}
