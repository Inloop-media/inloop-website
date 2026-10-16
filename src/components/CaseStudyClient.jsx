"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Media from "@/components/gs/Media";
import CaseVisual from "@/components/gs/CaseVisual";
import CountUp from "@/components/CountUp";
import { Kicker } from "@/components/gs/Type";
import { FadeUp } from "@/components/home/SectionHead";
import { CASE_STUDIES, PAST_PROJECTS, getCaseStudy } from "@/data/caseStudies";

const EASE = [0.16, 1, 0.3, 1];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center h-[29px] px-3 rounded-full bg-white text-black text-[10px] font-light tracking-[0.4px] uppercase">
      {children}
    </span>
  );
}

function Row({ label, children }) {
  return (
    <FadeUp className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-4 md:gap-0">
      <div className="text-[16px] md:text-[18px] font-light leading-[1.5] tracking-[3px] uppercase text-white">{label}</div>
      <div className="max-w-[648px] text-[18px] font-light leading-[1.5] text-white">{children}</div>
    </FadeUp>
  );
}

export default function CaseStudyClient({ slug }) {
  const c = getCaseStudy(slug);
  const others = [...CASE_STUDIES.filter((x) => x.slug !== slug), null];
  const extra = PAST_PROJECTS[0];

  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative h-[100svh] overflow-hidden bg-[#000000]">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: EASE }} className="absolute inset-0">
          <CaseVisual c={c} big />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-black/40" />
        <div className="absolute left-0 right-0 bottom-12">
          <div className="gs-wrap-64">
            <Kicker size="sm">{c.category}</Kicker>
            <h1 className="mt-2 text-[48px] md:text-[96px] font-medium leading-none text-white">{c.name}</h1>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-[#000000] pt-[135px] pb-[100px]">
        <div className="gs-wrap-64 grid grid-cols-1 md:grid-cols-[1fr_700px] gap-8 md:gap-[68px]">
          <FadeUp className="md:text-right flex md:flex-col md:items-end gap-4">
            <div className="text-[24px] font-medium leading-[1.5] text-white">Overview</div>
            <Pill>{c.tag}</Pill>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[18px] font-light leading-[1.5] text-[#d1d1d1]">{c.overview}</p>
          </FadeUp>
        </div>
      </section>

      {/* Tag + banner */}
      <section className="bg-[#000000]">
        <div className="gs-wrap-64">
          <Pill>{c.tag}</Pill>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative mt-6 aspect-[16/9] md:aspect-[1312/600] overflow-hidden bg-[#111]"
          >
            <Media src={c.media} />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </section>

      {/* Problem / Goal / Solution */}
      <section className="bg-[#000000] py-[100px]">
        <div className="gs-wrap-64 md:pl-[196px] flex flex-col gap-24">
          <Row label="The Problem">{c.problem}</Row>
          <Row label="The Goal">{c.goal}</Row>
          <Row label="The Solution">{c.solution}</Row>
        </div>
      </section>

      {/* Results gallery */}
      <section className="bg-[#000000] pb-[100px]">
        <div className="gs-wrap-64 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[4/3] md:aspect-auto md:h-[560px] overflow-hidden"
          >
            <CaseVisual c={c} big />
          </motion.div>
          <div className="grid grid-rows-3 gap-5">
            {[
              { k: "Result", v: <>{c.metric.prefix}<CountUp to={c.metric.value} decimals={c.metric.decimals || 0} />{c.metric.suffix}</>, s: c.metric.label },
              { k: "Scope", v: null, s: c.scope },
              { k: "Timeline", v: null, s: c.timeline },
            ].map((b, i) => (
              <FadeUp key={b.k} delay={i * 0.1} className="border border-[#5b5b5b] p-6 md:p-8 flex flex-col justify-center">
                <div className="text-[16px] md:text-[18px] font-light tracking-[3px] uppercase text-[var(--brand)]">{b.k}</div>
                {b.v && <div className="mt-2 text-[44px] font-light tracking-[-0.03em] leading-none text-white">{b.v}</div>}
                <div className="mt-2 text-[18px] font-light text-white">{b.s}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Explore other works */}
      <section className="bg-[#000000] pt-20 pb-[100px]">
        <div className="gs-wrap-64">
          <Kicker size="sm">There&apos;s More</Kicker>
          <h2 className="mt-3 text-[28px] md:text-[36px] leading-[1.5] uppercase text-white">Explore Other Works</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {others.map((o, i) => {
              const href = o ? `/work/${o.slug}` : "/work#ai-work";
              return (
                <motion.div
                  key={o ? o.slug : "ai"}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                >
                  <Link href={href} data-cursor="View" className="group block">
                    <div className="relative aspect-square overflow-hidden bg-[#111]">
                      <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-[1.05]">
                        {o ? <CaseVisual c={o} /> : <Media src={extra.media.src} />}
                      </div>
                    </div>
                    <div className="mt-3 text-[22px] font-light leading-[1.3] text-white group-hover:text-[var(--brand)] transition-colors">{o ? o.name : "AI Video Creative"}</div>
                    <div className="text-[18px] font-light leading-[1.5] text-white">{o ? o.headline : "Scroll-stopping AI video ads, tuned for every feed."}</div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
