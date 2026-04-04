import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black relative overtflow-hidden flex flex-col w-full h-auto">
      {/* Massive Typographic Header */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-[16vw] md:text-[14vw] leading-[0.8] font-black uppercase tracking-tighter w-full mb-4 md:mb-6">
          Ready To
          <span className="block font-serif italic font-light tracking-tight mt-1 md:mt-2 text-black/80 lowercase">
            dominate?
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-3xl font-light max-w-2xl text-black/60 mt-6 md:mt-8 mb-8 md:mb-12 leading-relaxed px-2 text-wrap">
          Stop renting attention. Start building permanent community authority. Let's hijack the AI consensus.
        </p>
        <button className="group flex items-center gap-4 bg-black text-white px-8 md:px-10 py-4 md:py-5 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors cursor-pointer w-full sm:w-auto justify-center">
           Book Strategy Call
        </button>
      </div>

      {/* Grid Links Layer */}
      <div className="border-y border-black/10 w-full">
         <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/10 w-full">
            <div className="p-6 md:p-8 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 text-black mb-4 group cursor-pointer inline-flex">
                <Activity className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                <span className="font-black text-xl md:text-2xl tracking-tighter uppercase">ClearEcho</span>
              </Link>
              <p className="font-mono text-[10px] md:text-xs text-black/50 uppercase max-w-sm leading-relaxed">
                The leading clandestine Reddit authority engine. Forging consensus across the social web since 2024.
              </p>
            </div>
            
            <div className="p-6 md:p-8 hover:bg-black/5 transition-colors cursor-pointer border-t sm:border-t-0 sm:border-l border-black/10">
               <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mb-6 w-full text-left">Socials</h4>
               <ul className="space-y-4 font-bold uppercase tracking-widest text-xs md:text-sm">
                 <li><a href="#" className="hover:text-black/50 transition-colors">X (Twitter)</a></li>
                 <li><a href="#" className="hover:text-black/50 transition-colors">LinkedIn</a></li>
                 <li><a href="#" className="hover:text-black/50 transition-colors">Instagram</a></li>
               </ul>
            </div>

            <div className="p-6 md:p-8 hover:bg-black/5 transition-colors cursor-pointer border-t lg:border-t-0 border-black/10">
               <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mb-6 w-full text-left">Legal</h4>
               <ul className="space-y-4 font-bold uppercase tracking-widest text-xs md:text-sm">
                 <li><a href="#" className="hover:text-black/50 transition-colors">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-black/50 transition-colors">Terms of Service</a></li>
                 <li><a href="#" className="hover:text-black/50 transition-colors">Contact</a></li>
               </ul>
            </div>
         </div>
      </div>

      {/* Final Copyright */}
      <div className="p-4 md:p-6 text-center font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-black/40 w-full text-wrap">
        © {new Date().getFullYear()} CLEARECHO. ALL RIGHTS RESERVED. OPERATIONAL AT CAPACITY.
      </div>
    </footer>
  );
}
