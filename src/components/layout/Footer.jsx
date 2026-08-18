import Link from "next/link";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black relative overtflow-hidden flex flex-col w-full h-auto">
      {/* Massive Typographic Header */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-[16vw] md:text-[14vw] leading-[0.8] font-black uppercase tracking-tighter w-full mb-4 md:mb-6">
          Ready To
          <span className="block font-serif italic font-light tracking-tight mt-1 md:mt-2 text-black lowercase">
            transform?
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-3xl font-light max-w-2xl text-black mt-6 md:mt-8 mb-8 md:mb-12 leading-relaxed px-2 text-wrap">
          Modernize your IT infrastructure. Secure your enterprise. Scale your cloud operations.
        </p>
        <button className="group flex items-center gap-4 bg-black text-white px-8 md:px-10 py-4 md:py-5 text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors cursor-pointer w-full sm:w-auto justify-center">
           Contact Sales
        </button>
      </div>

      {/* Comprehensive Footer Content */}
      <div className="border-t border-black/10 w-full bg-gray-50">
         <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Column 1: Logo & Info (Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <Link href="/" className="flex items-center gap-2 text-black mb-6 group cursor-pointer inline-flex">
                <Activity className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-black text-2xl tracking-tighter uppercase">INNOWORQ</span>
              </Link>
              <p className="text-sm text-black leading-relaxed max-w-sm mb-8 pr-4">
                IT infrastructure, cloud, and cybersecurity services delivering scalable, secure environments under solid SLA models.
              </p>
              <div className="flex gap-6 font-bold text-sm tracking-widest uppercase mb-8">
                 <span className="border-b-2 border-black pb-1">India</span>
                 <span className="text-black hover:text-black cursor-pointer transition-colors pb-1">UAE</span>
              </div>
              <div className="flex flex-col gap-3">
                 <h4 className="font-bold text-[10px] tracking-widest uppercase text-black">Social</h4>
                 <div className="flex gap-4 font-bold uppercase tracking-widest text-xs">
                   <a href="#" className="hover:text-black transition-colors">Twitter</a>
                   <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                   <a href="#" className="hover:text-black transition-colors">Instagram</a>
                 </div>
              </div>
            </div>

            {/* Column 2: Quick Links (Span 2) */}
            <div className="lg:col-span-2 flex flex-col">
               <h4 className="font-bold text-xs tracking-widest uppercase text-black mb-6">Quick Links</h4>
               <ul className="space-y-3 text-sm text-black font-medium">
                 <li><Link href="#" className="hover:text-black transition-colors">About us</Link></li>
                 <li><Link href="#" className="hover:text-black transition-colors">Services</Link></li>
                 <li><Link href="#" className="hover:text-black transition-colors">Solutions</Link></li>
                 <li><Link href="#" className="hover:text-black transition-colors">Industries</Link></li>
                 <li><Link href="#" className="hover:text-black transition-colors">Blogs</Link></li>
               </ul>
            </div>

            {/* Column 3: Certifications (Span 3) */}
            <div className="lg:col-span-3 flex flex-col">
               <h4 className="font-bold text-xs tracking-widest uppercase text-black mb-6">Certifications</h4>
               <ul className="space-y-3 text-sm text-black font-mono text-xs">
                 <li>ISO 9001:2015</li>
                 <li>ISO/IEC 27001:2022</li>
                 <li>ISO 20000-1:2018</li>
                 <li>ISO 45001:2018</li>
               </ul>
            </div>

            {/* Column 4: Contact & Support (Span 3) */}
            <div className="lg:col-span-3 flex flex-col">
               <h4 className="font-bold text-xs tracking-widest uppercase text-black mb-6">Contact & Support</h4>
               
               <div className="mb-5">
                  <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1.5">Registered Address (Noida)</div>
                  <div className="text-xs text-black leading-relaxed pr-4">H-49, 4th Floor, Sector-63, Noida, Uttar Pradesh-201309</div>
               </div>

               <div className="mb-5">
                  <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1.5">Dubai Regional Hub</div>
                  <div className="text-xs text-black leading-relaxed pr-4">Office No. 2-75, Smark 2 Building, Ras Al Khor Industrial Area 2, Dubai, United Arab Emirates</div>
               </div>

               <div className="mb-5">
                  <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1.5">Sales Toll-Free</div>
                  <div className="text-sm font-bold text-black">1800 123 5671</div>
               </div>

               <div>
                  <div className="text-[10px] font-bold text-black uppercase tracking-widest mb-1.5">General & Sales Email</div>
                  <a href="mailto:support@innoworq.com" className="block text-xs font-medium text-black hover:underline mb-1">support@innoworq.com</a>
                  <a href="mailto:sales@innoworq.com" className="block text-xs font-medium text-black hover:underline">sales@innoworq.com</a>
               </div>
            </div>

         </div>
         
         {/* Bottom Bar / Legal */}
         <div className="border-t border-black/10 px-6 lg:px-12 py-6 md:py-8 bg-white">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
               <div className="text-[10px] md:text-xs text-black font-medium whitespace-nowrap">
                 © 2026 INNOWORQ Infotech Pvt. Ltd. All rights reserved.
               </div>
               <div className="text-[9px] md:text-[10px] text-black max-w-3xl leading-relaxed text-left lg:text-right">
                 Disclaimer: Support coverage, vendor labels, and logo marks (Dell, Microsoft, RedHat, Cisco, VMware, etc.) represent technical capability and do not imply formal endorsement by the respective OEMs.
               </div>
            </div>
         </div>
      </div>
    </footer>
  );
}
