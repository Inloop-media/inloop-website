"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Shield, Hash, Globe } from "lucide-react";

const QUICK_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Blogs", href: "/blogs" },
];

const CERTIFICATIONS = [
  "ISO 9001:2015",
  "ISO/IEC 27001:2022",
  "ISO 20000-1:2018",
  "ISO 45001:2018",
];

export default function SystemFooter() {
  const [region, setRegion] = useState("India");

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
              <Activity className="w-6 h-6 text-indigo-500" />
              <span className="font-black text-2xl tracking-tighter uppercase">INNOWORQ</span>
           </div>
           <p className="font-light text-white/40 text-base leading-relaxed max-w-xs">
              IT infrastructure, cloud, and cybersecurity services delivering scalable, secure environments under solid SLA models.
           </p>
           <div className="flex gap-6 font-mono text-sm tracking-widest uppercase">
              <button
                type="button"
                onClick={() => setRegion("India")}
                className={region === "India" ? "text-white border-b border-white pb-1" : "text-white/40 hover:text-white transition-colors pb-1"}
              >
                India
              </button>
              <button
                type="button"
                onClick={() => setRegion("UAE")}
                className={region === "UAE" ? "text-white border-b border-white pb-1" : "text-white/40 hover:text-white transition-colors pb-1"}
              >
                UAE
              </button>
           </div>
           <div className="flex flex-col gap-3">
              <div className="font-mono text-xs tracking-widest text-white/30 uppercase border-b border-white/5 pb-2">Social</div>
              <div className="flex gap-4">
                 <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer text-sm">X</div>
                 <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer text-sm">in</div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="font-mono text-xs tracking-widest text-white/30 uppercase border-b border-white/5 pb-2">Quick Links</div>
           <ul className="space-y-3 text-base font-medium">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
           </ul>
        </div>

        <div className="space-y-6">
           <div className="font-mono text-xs tracking-widest text-white/30 uppercase border-b border-white/5 pb-2">Certifications</div>
           <ul className="space-y-3 font-mono text-sm text-white/60">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
           </ul>
        </div>

        <div className="space-y-6">
           <div className="font-mono text-xs tracking-widest text-white/30 uppercase border-b border-white/5 pb-2">Contact & Support</div>

           <div className="space-y-1">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Registered Address (Noida)</div>
              <div className="text-white/60 text-sm leading-relaxed">H-49, 4th Floor, Sector-63, Noida, Uttar Pradesh-201309</div>
           </div>

           <div className="space-y-1">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Dubai Regional Hub</div>
              <div className="text-white/60 text-sm leading-relaxed">Office No. 2-75, Smark 2 Building, Ras Al Khor Industrial Area 2, Dubai, United Arab Emirates</div>
           </div>

           <div className="space-y-1">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Sales Toll-Free</div>
              <a href="tel:18001235671" className="text-white hover:text-indigo-500 transition-colors font-bold text-base tracking-widest block">1800 123 5671</a>
           </div>

           <div className="space-y-1">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">General & Sales Email</div>
              <a href="mailto:support@innoworq.com" className="text-white hover:text-indigo-500 transition-colors font-bold text-base tracking-widest block break-all">support@innoworq.com</a>
              <a href="mailto:sales@innoworq.com" className="text-white hover:text-indigo-500 transition-colors font-bold text-base tracking-widest block break-all">sales@innoworq.com</a>
           </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full relative z-10 opacity-60">
         <div className="text-xs md:text-sm font-medium whitespace-nowrap">
           © 2026 INNOWORQ Infotech Pvt. Ltd. All rights reserved.
         </div>
         <div className="text-xs max-w-3xl leading-relaxed text-left lg:text-right">
           Disclaimer: Support coverage, vendor labels, and logo marks (Dell, Microsoft, RedHat, Cisco, VMware, etc.) represent technical capability and do not imply formal endorsement by the respective OEMs.
         </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-end items-center gap-8 w-full opacity-40 relative z-10">
         <div className="flex gap-12 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="hover:text-white cursor-pointer">Privacy_Policy</span>
            <span className="hover:text-white cursor-pointer">Terms_of_Service</span>
         </div>
      </div>
    </footer>
  );
}
