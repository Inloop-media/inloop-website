"use client";

import { useState, useMemo } from "react";
import AnimatedText from "@/components/AnimatedText";
import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";

export default function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return SERVICES;
    return SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <section className="relative bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-12 border-b border-black/10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] text-black uppercase mb-4 md:mb-6">
            Service Portfolio Catalog
          </div>
          <AnimatedText
            text="Enterprise IT & Managed Services"
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl mx-auto justify-center flex flex-wrap text-black"
          />
          <p className="text-base sm:text-lg md:text-xl font-light text-black leading-relaxed max-w-2xl mx-auto mt-6 md:mt-8">
            High-availability SLA-bound infrastructure maintenance, cloud operations, 24x7 NOC triage, and digital transformation capabilities across {SERVICES.length} core domains.
          </p>
        </div>
      </section>

      <section className="bg-white py-8 md:py-10 px-4 sm:px-6 lg:px-12 border-b border-black/10 w-full sticky top-0 z-20 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 border transition-colors cursor-pointer ${
                activeCategory === cat.slug
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black border-black/15 hover:text-black hover:border-black/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 py-16 md:py-24 px-4 sm:px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16 border-b border-black/10 pb-6 md:pb-8">
            <div>
              <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black uppercase mb-2">
                Complete Portfolio
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black">
                {filteredServices.length} {filteredServices.length === 1 ? "Service" : "Services"} Available
              </h2>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-black uppercase">
              Click any card to view full specs
            </div>
          </div>

          <div className="flex flex-col w-full">
            {filteredServices.map((service) => {
              return (
                <motion.div
                  key={service.num}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center border-t border-black/10 py-10 sm:py-14 last:border-b"
                >
                  <div className="lg:col-span-4 flex items-center justify-center lg:justify-start">
                    <span className="font-black text-[7rem] sm:text-[9rem] lg:text-[10rem] leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.15)] group-hover:[-webkit-text-stroke:1px_rgba(99,102,241,0.6)] transition-all select-none">
                      {service.num}
                    </span>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-indigo-500 uppercase mb-3">
                      {service.tag}
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 sm:mb-5 group-hover:pl-2 transition-all text-black">
                      {service.title}
                    </h3>

                    <p className="text-black leading-relaxed font-light text-sm sm:text-base max-w-2xl mb-5 sm:mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6 sm:mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-light">
                          <span className="w-1 h-1 mt-2 bg-indigo-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="inline-block font-mono text-[9px] sm:text-[10px] tracking-widest text-black uppercase border-b border-black/20 pb-1 group-hover:text-indigo-500 group-hover:border-indigo-500 transition-colors cursor-pointer">
                      Explore Specs & SLAs →
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
