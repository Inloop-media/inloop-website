"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Kicker } from "@/components/gs/Type";
import { RevealLines } from "@/components/home/SectionHead";
import Media from "@/components/gs/Media";
import CaseVisual from "@/components/gs/CaseVisual";
import { CASE_STUDIES } from "@/data/caseStudies";

const EASE = [0.16, 1, 0.3, 1];
const [apploft, luxe, fmcg] = CASE_STUDIES;

// Rows mirror GreySpace: full (1280x775), half pair, full, half pair, full
const TILES = [
  { span: "full", href: `/work/${apploft.slug}`, cat: apploft.tag, title: apploft.name, desc: apploft.headline, visual: { case: apploft } },
  { span: "half", h: "md:aspect-[630/392]", href: `/work/${luxe.slug}`, cat: luxe.tag, title: luxe.name, desc: luxe.headline, visual: { case: luxe } },
  { span: "half", h: "md:aspect-[630/392]", href: `/work/${fmcg.slug}`, cat: fmcg.tag, title: fmcg.name, desc: fmcg.headline, visual: { case: fmcg } },
  { span: "full", href: "/work", cat: "AI Video Creative", title: "Fashion & Apparel", desc: "Lookbooks and AI try-on hooks — one jacket, five outfits, every body type. New drop, sizes XS to 3XL.", visual: { src: "/videos/ai-fashion.mp4" } },
  { span: "half", h: "md:aspect-[630/319]", href: "/work", cat: "AI Video Creative", title: "Beauty & Wellness", desc: "UGC unboxings and routines — texture close-ups from day 1 to day 7.", visual: { src: "/videos/ai-beauty.mp4" } },
  { span: "half", h: "md:aspect-[630/319]", href: "/work", cat: "AI Video Creative", title: "High-Tech & SaaS", desc: "Explainer and demo ads — still exporting reports by hand? Live in 10 minutes.", visual: { src: "/videos/ai-saas.mp4" } },
  { span: "full", href: "/work", cat: "Paid Media", title: "Every Major Ad Platform", desc: "Google, Meta, Microsoft, Taboola, TikTok and Jio Ads — planned, launched and optimised as one growth engine.", visual: { src: "/images/ad-1.webp", position: "top" } },
];

function Tile({ t, index }) {
  const full = t.span === "full";
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: full ? 0 : (index % 2) * 0.12, ease: EASE }}
      className={full ? "md:col-span-2" : ""}
    >
      <Link
        href={t.href}
        data-cursor="View"
        className={`group relative block overflow-hidden bg-[#111] ${full ? "aspect-[4/5] md:aspect-[1280/775]" : `aspect-[4/5] ${t.h}`}`}
      >
        <div className="absolute inset-0 scale-[1.01] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
          {t.visual.case ? <CaseVisual c={t.visual.case} big={full} /> : <Media src={t.visual.src} position={t.visual.position} />}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className={`absolute left-6 md:left-10 right-6 bottom-6 md:bottom-10 ${full ? "md:max-w-[648px]" : "md:max-w-[550px]"}`}>
          <div className={`${full ? "text-[16px] md:text-[18px]" : "text-[14px]"} font-medium leading-[1.5] text-[var(--brand)]`}>{t.cat}</div>
          <h3 className={`${full ? "text-[30px] md:text-[42px]" : "text-[24px] md:text-[28px]"} font-semibold leading-[1.5] text-white`}>{t.title}</h3>
          <p className={`${full ? "text-[16px] md:text-[18px]" : "text-[15px]"} leading-[1.5] tracking-[0.36px] text-white`}>{t.desc}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomeWork() {
  return (
    <section id="work" className="bg-[#050505] pt-[100px] pb-[100px]">
      <div className="gs-wrap">
        <Kicker>Our client work</Kicker>
        <RevealLines lines={["Work that did the job,", "It was supposed to do"]} className="gs-h2 mt-4" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {TILES.map((t, i) => (
            <Tile key={t.title} t={t} index={i} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/work" className="liquid-btn liquid-btn-white"><span>View all projects →</span></Link>
        </div>
      </div>
    </section>
  );
}
