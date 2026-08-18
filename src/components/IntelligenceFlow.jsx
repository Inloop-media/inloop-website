"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IntelligenceFlow() {
  const nodes = [
    { region: "US-EAST (N. VIRGINIA)", status: "OPTIMAL", load: "34%", ping: "12ms" },
    { region: "EU-CENTRAL (FRANKFURT)", status: "OPTIMAL", load: "42%", ping: "18ms" },
    { region: "AP-SOUTH (MUMBAI)", status: "OPTIMAL", load: "28%", ping: "14ms" },
    { region: "AP-EAST (HONG KONG)", status: "OPTIMAL", load: "51%", ping: "16ms" },
  ];

  return (
    <section id="radar-section" className="relative py-24 md:py-32 bg-[#020202] border-y border-white/5 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="relative z-10">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
             Proactive Operations
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
            NOC/SOC <br/><span className="text-white/20">Live Monitoring</span>
          </h2>
          <p className="text-lg sm:text-xl font-light text-white/50 leading-relaxed max-w-md mb-12">
            Our Global Network Operations Center monitors your critical infrastructure 24/7/365, detecting anomalies before they impact your business.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
             <div className="space-y-1">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Active Nodes</div>
                <div className="text-2xl font-black text-white">12,408</div>
             </div>
             <div className="space-y-1">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Uptime SLA</div>
                <div className="text-2xl font-black text-indigo-500">99.999%</div>
             </div>
          </div>
        </div>

        {/* Clean Typographic Capabilities List */}
        <div className="w-full flex flex-col mt-12 lg:mt-0">
           {[
             "24/7/365 Monitoring", 
             "Proactive Threat Hunting", 
             "Rapid Incident Response", 
             "Compliance & Auditing"
           ].map((title, i) => (
             <div key={i} className="group flex items-center gap-6 md:gap-8 py-6 md:py-8 border-b border-white/10 hover:border-white/40 transition-colors cursor-default">
               <span className="font-mono text-sm md:text-base text-white/30 group-hover:text-white transition-colors mt-1">0{i+1}</span>
               <h4 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white/60 group-hover:text-white transition-colors">
                 {title}
               </h4>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}

