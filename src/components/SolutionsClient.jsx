"use client";

import { useState, useMemo } from "react";
import AnimatedText from "@/components/AnimatedText";
import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import { SOLUTIONS, SOLUTION_CATEGORIES } from "@/data/solutions";

export default function SolutionsClient() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSolutions = useMemo(() => {
    if (activeCategory === "all") return SOLUTIONS;
    return SOLUTIONS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <section className="relative bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-12 border-b border-black/10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] text-black uppercase mb-4 md:mb-6">
            Architectural Solutions Portfolio
          </div>
          <AnimatedText
            text="Enterprise Technology Solutions"
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl mx-auto justify-center flex flex-wrap text-black"
          />
          <p className="text-base sm:text-lg md:text-xl font-light text-black leading-relaxed max-w-2xl mx-auto mt-6 md:mt-8">
            Architectural solution blueprints for hybrid IT, multi-cloud operations, 24x7 NOC monitoring, zero-trust cybersecurity, and enterprise resource management.
          </p>
        </div>
      </section>

      <section className="bg-white py-8 md:py-10 px-4 sm:px-6 lg:px-12 border-b border-black/10 w-full sticky top-0 z-20 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {SOLUTION_CATEGORIES.map((cat) => (
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
                Complete Blueprint Catalog
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black">
                {filteredSolutions.length} {filteredSolutions.length === 1 ? "Solution" : "Solutions"} Available
              </h2>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-black uppercase">
              Click any card for full architecture details
            </div>
          </div>

          <div className="flex flex-col w-full">
            {filteredSolutions.map((solution) => (
              <motion.div
                key={solution.num}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center border-t border-black/10 py-10 sm:py-14 last:border-b"
              >
                <div className="lg:col-span-4 flex items-center justify-center lg:justify-start">
                  <span className="font-black text-[4.5rem] sm:text-[6rem] lg:text-[6.5rem] leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.15)] group-hover:[-webkit-text-stroke:1px_rgba(99,102,241,0.6)] transition-all select-none">
                    {solution.num}
                  </span>
                </div>

                <div className="lg:col-span-8">
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-indigo-500 uppercase mb-3">
                    {solution.tag}
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 sm:mb-5 group-hover:pl-2 transition-all text-black">
                    {solution.title}
                  </h3>

                  <p className="text-black leading-relaxed font-light text-sm sm:text-base max-w-2xl mb-5 sm:mb-6">
                    {solution.description}
                  </p>

                  <ul className="space-y-2 mb-6 sm:mb-8">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-light">
                        <span className="w-1 h-1 mt-2 bg-indigo-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-block font-mono text-[9px] sm:text-[10px] tracking-widest text-black uppercase border-b border-black/20 pb-1 group-hover:text-indigo-500 group-hover:border-indigo-500 transition-colors cursor-pointer">
                    Explore Architecture & Specs →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
