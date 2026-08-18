"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Activity } from "lucide-react";
import Magnetic from "@/components/Magnetic";

const links = [
  { name: "Services", path: "/services" },
  { name: "Solutions", path: "#solutions" },
  { name: "Industries", path: "/industries" },
  { name: "FAQ", path: "#faq" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-[100] px-4 sm:px-6 lg:px-12 py-6 mix-blend-difference pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 text-white group cursor-pointer relative">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
               <span className="font-black text-lg sm:text-xl tracking-tighter uppercase whitespace-nowrap group-hover:skew-x-12 transition-transform duration-75">INNOWORQ</span>
               <div className="absolute inset-0 bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </Link>

          {/* Menu Toggle with Magnetic Effect */}
          <Magnetic size={0.3}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 group px-4 py-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white font-bold hidden sm:block">
                {isOpen ? "Close" : "Menu"}
              </span>
              <div className="w-5 sm:w-6 flex flex-col gap-1 sm:gap-1.5 relative z-[101]">
                 <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="w-full h-px bg-white" />
                 <motion.div animate={{ opacity: isOpen ? 0 : 1 }} className="w-full h-px bg-white" />
                 <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} className="w-full h-px bg-white" />
              </div>
            </button>
          </Magnetic>
        </div>
      </header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-center px-6 lg:px-24 border-b border-white/10"
          >
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E')` }}></div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10 mt-16 md:mt-0">
               {/* Nav Links */}
               <nav className="flex flex-col gap-4">
                 <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4 md:mb-8 border-b border-white/10 pb-4">
                   Navigation
                 </div>
                 {links.map((link, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: -40 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 + (idx * 0.1), duration: 0.8, ease: "easeOut" }}
                   >
                     <Link 
                       href={link.path}
                       onClick={() => setIsOpen(false)}
                       className="group flex flex-col cursor-pointer"
                     >
                       <span className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white group-hover:pl-4 md:group-hover:pl-8 transition-all duration-500">
                         {link.name}
                       </span>
                     </Link>
                   </motion.div>
                 ))}
               </nav>

               {/* Meta Data */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="flex flex-col justify-end"
               >
                 <div className="flex flex-col gap-6 md:gap-8 md:pl-24">
                   <div>
                     <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1 md:mb-2">Location</div>
                     <div className="text-lg md:text-xl font-light text-white">Distributed // Earth</div>
                   </div>
                   <div>
                     <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1 md:mb-2">Transmission</div>
                     <a href="mailto:hello@innoworq.com" className="text-[16px] sm:text-lg md:text-xl font-light text-white hover:italic hover:font-serif transition-all break-all">hello@innoworq.com</a>
                   </div>
                   <div className="mt-4 md:mt-8 border-t border-white/10 pt-6 md:pt-8 flex gap-4">
                     <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full font-bold">X</a>
                     <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full font-bold">in</a>
                   </div>
                 </div>
               </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
