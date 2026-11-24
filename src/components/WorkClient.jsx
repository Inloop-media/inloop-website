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
import { PRODUCT, WEBSITES, domainOf } from "@/data/websites";
import CrmShowcase from "@/components/CrmShowcase";

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

/** A browser window around a screenshot: three dots and the site's address. */
function BrowserFrame({ src, full, delay = 0, alt, url, className = "aspect-[16/10]", position = "object-top" }) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-[#0d0d0f] ring-1 ring-white/12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-[box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:ring-white/30 group-hover:shadow-[0_40px_100px_-30px_rgba(129,140,248,0.35)]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#161618] px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.06] px-3 py-1 text-center text-[11px] tracking-wide text-white/55">{domainOf(url)}</span>
        <span className="w-[42px]" />
      </div>
      <div className={`relative overflow-hidden ${className}`}>
        {full ? (
          // The whole page scrolls slowly inside the window; hovering pauses it
          // eslint-disable-next-line @next/next/no-img-element
          <img src={full} alt={alt} loading="lazy" className="site-scroll absolute inset-0 h-full w-full object-cover" style={{ animationDelay: `${-delay}s` }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${position} transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`} />
        )}
      </div>
    </div>
  );
}

function WebsiteCard({ w, index }) {
  return (
    <motion.a
      href={w.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: EASE }}
      data-cursor="Visit"
      className="group block"
    >
      <BrowserFrame src={w.img} full={w.full} delay={index * 5} alt={`${w.name} website`} url={w.url} />
      <div className="px-1 pt-5 pb-2">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[20px] md:text-[24px] font-medium leading-[1.25] text-white">{w.name}</div>
            <div className="mt-1 text-[15px] font-light leading-[1.5] text-white/70">{w.category}</div>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-[13px] uppercase tracking-[0.12em] text-white/80 group-hover:text-white">
            Visit <Arrow />
          </span>
        </div>
        {w.did?.length > 0 && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">What we did</div>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {w.did.map((d) => (
                <li key={d} className="rounded-full border border-white/15 px-3 py-1 text-[12.5px] text-white/80">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.a>
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
      <section className="bg-[#000000] pt-[160px] pb-20 text-center">
        <div className="gs-wrap-64 flex flex-col items-center">
          <Kicker size="sm">Our Portfolio</Kicker>
          <RevealLines
            as="h1"
            lines={["Bringing brands to life with growth,", "clarity, and imagination"]}
            className="mt-4 max-w-[1020px] text-[40px] md:text-[68px] font-medium leading-[1.1] text-white"
          />
          <FadeUp delay={0.3}>
            <p className="mt-4 max-w-[664px] text-[18px] font-light leading-[1.5] text-white">
              The work you see here is the result of strategy, creative, production and performance coming together to solve real business challenges.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#000000] pb-[40px]">
        <div className="gs-wrap-64 grid grid-cols-1 md:grid-cols-2 gap-5">
          <FeaturedCard c={full} full index={0} />
          {halves.map((c, i) => (
            <FeaturedCard key={c.slug} c={c} index={i} />
          ))}
        </div>
      </section>

      <section id="websites" className="bg-[#000000] pt-20 pb-[40px]">
        <div className="gs-wrap-64">
          <Kicker size="sm">Websites We&apos;ve Built</Kicker>
          <RevealLines lines={["Websites and stores", "built to look good and sell"]} className="mt-5 max-w-[1212px] text-[36px] md:text-[60px] font-semibold leading-[1.1] text-white" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 lg:gap-x-10 lg:gap-y-16">
            {WEBSITES.map((w, i) => (
              <WebsiteCard key={w.url} w={w} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CrmShowcase p={PRODUCT} />

      <section id="video-work" className="bg-[#000000] pt-20 pb-[100px]">
        <div className="gs-wrap-64">
          <Kicker size="sm">Our Past Projects</Kicker>
          <RevealLines
            lines={["At Inloop, every service overlaps to build", "cohesive, future-ready brands"]}
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
