"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CTA from "@/components/CTA";
import Media from "@/components/gs/Media";
import CaseVisual from "@/components/gs/CaseVisual";
import { Kicker } from "@/components/gs/Type";
import { RevealLines, FadeUp } from "@/components/home/SectionHead";
import { CASE_STUDIES, PAST_PROJECTS } from "@/data/caseStudies";

const EASE = [0.16, 1, 0.3, 1];

function Arrow() {
  return (
    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 11 11 3M4.5 3H11v6.5" />
    </svg>
  );
}

function FeaturedCard({ c, full, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: full ? 0 : (index % 2) * 0.12, ease: EASE }}
      className={full ? "md:col-span-2" : ""}
    >
      <Link href={`/work/${c.slug}`} data-cursor="View" className="group block border border-[#5b5b5b] hover:border-white/60 transition-colors">
        <div className={`relative overflow-hidden ${full ? "aspect-[4/3] md:aspect-[1310/548]" : "aspect-[4/3] md:aspect-[644/430]"}`}>
          <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <CaseVisual c={c} big={full} />
          </div>
          <span className="absolute right-[30px] top-[30px] text-white"><Arrow /></span>
        </div>
        <div className="p-6 md:p-10">
          <div className="gs-kicker-sm">{c.name}</div>
          <p className="mt-2 max-w-[564px] text-[20px] md:text-[24px] font-medium leading-[1.5] text-white">{c.headline}</p>
          <div className="mt-2 text-[16px] md:text-[18px] font-light leading-[1.5] text-[#cecece]">{c.meta}</div>
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectCard({ p, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(p)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: EASE }}
      data-cursor={p.media.kind === "video" ? "Play" : "View"}
      className="group text-left border border-[#5b5b5b] hover:border-white/60 transition-colors cursor-pointer"
    >
      <div className="relative aspect-[342/216] overflow-hidden bg-[#111]">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]">
          <Media src={p.media.src} position="top" />
        </div>
      </div>
      <div className="px-4 pt-4 pb-5">
        <div className="text-[20px] md:text-[24px] font-medium leading-[1.25] text-white">{p.title}</div>
        <div className="mt-1 text-[16px] font-light leading-[1.5] text-white">{p.type}</div>
      </div>
    </motion.button>
  );
}

function Lightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-md flex items-center justify-center p-5 md:p-16 cursor-pointer"
          data-lenis-prevent
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full cursor-default"
          >
            {item.media.kind === "video" ? (
              <video src={item.media.src} autoPlay controls playsInline className="w-full max-h-[80vh] object-contain bg-black" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.media.src} alt={item.title} className="w-full max-h-[80vh] object-contain" />
            )}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[20px] font-medium text-white">{item.title}</div>
                <div className="text-[14px] text-[var(--brand)]">{item.type}</div>
              </div>
              <button type="button" onClick={onClose} className="liquid-btn liquid-btn-ghost"><span>Close</span></button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WorkClient() {
  const [lightbox, setLightbox] = useState(null);
  const [full, ...halves] = CASE_STUDIES;

  return (
    <>
      <section className="bg-[#050505] pt-[160px] pb-20 text-center">
        <div className="gs-wrap-64 flex flex-col items-center">
          <Kicker size="sm">Our Portfolio</Kicker>
          <RevealLines
            as="h1"
            lines={["Bringing brands to life with growth,", "clarity, and imagination."]}
            className="mt-4 max-w-[1020px] text-[40px] md:text-[68px] font-medium leading-[1.1] text-white"
          />
          <FadeUp delay={0.3}>
            <p className="mt-4 max-w-[664px] text-[18px] font-light leading-[1.5] text-white">
              The work you see here is the result of strategy, creative, performance and AI coming together to solve real business challenges.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#050505] pb-[40px]">
        <div className="gs-wrap-64 grid grid-cols-1 md:grid-cols-2 gap-5">
          <FeaturedCard c={full} full index={0} />
          {halves.map((c, i) => (
            <FeaturedCard key={c.slug} c={c} index={i} />
          ))}
        </div>
      </section>

      <section id="ai-work" className="bg-[#050505] pt-20 pb-[100px]">
        <div className="gs-wrap-64">
          <Kicker size="sm">Our Past Projects</Kicker>
          <RevealLines
            lines={["At Inloop, every service overlaps to build", "cohesive, future-ready brands."]}
            className="mt-5 max-w-[1212px] text-[36px] md:text-[60px] font-semibold leading-[1.1] text-white"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAST_PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} p={p} index={i} onOpen={setLightbox} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
