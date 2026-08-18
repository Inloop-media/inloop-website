"use client";

import { OEM_LOGOS_ROW_1, OEM_LOGOS_ROW_2 } from "@/data/oemLogos";

function LogoTrack({ logos, direction }) {
  return (
    <div
      className={`flex items-center gap-5 w-max ${direction === "right" ? "oem-track-right" : "oem-track-left"}`}
    >
      {[...logos, ...logos].map((logo, i) => (
        <div
          key={`${logo.alt}-${i}`}
          className="flex-shrink-0 flex items-center justify-center h-16 w-[150px] px-4 py-3 bg-white rounded-lg border border-black/10 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <img
            src={logo.src}
            alt={`${logo.alt} OEM Partner Logo`}
            className="max-w-[110px] max-h-8 w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default function OEMLogos() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50 border-t border-black/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center mb-10 md:mb-12">
        <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black uppercase mb-3 md:mb-4">
          OEM Coverage & Alliances
        </div>
        <p className="text-black text-sm sm:text-base font-light max-w-xl mx-auto">
          Supporting enterprise hardware & software ecosystems from leading global technology vendors
        </p>
      </div>

      <div className="oem-marquee-mask relative overflow-hidden">
        <div className="mb-5">
          <LogoTrack logos={OEM_LOGOS_ROW_1} direction="left" />
        </div>
        <div>
          <LogoTrack logos={OEM_LOGOS_ROW_2} direction="right" />
        </div>
      </div>
    </section>
  );
}
