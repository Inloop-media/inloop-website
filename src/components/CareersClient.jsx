"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Media from "@/components/gs/Media";
import { Kicker } from "@/components/gs/Type";
import { RevealLines, FadeUp } from "@/components/home/SectionHead";
import { ROLES, HIRING_STEPS } from "@/data/careers";
import { FOUNDERS, TEAM, EMAIL, COMPANY_LINKEDIN } from "@/data/team";

const EASE = [0.16, 1, 0.3, 1];

function Role({ r, open, onToggle }) {
  const subject = encodeURIComponent(`Application — ${r.title}`);
  return (
    <div className="border-b border-white/20">
      <button type="button" onClick={onToggle} aria-expanded={open} className="w-full flex items-center justify-between gap-6 px-0 md:px-[50px] py-10 text-left cursor-pointer group">
        <div>
          <h4 className={`text-[22px] md:text-[26px] leading-[1.5] transition-colors ${open ? "text-[var(--brand)]" : "text-white group-hover:text-white/80"}`}>{r.title}</h4>
          <div className="mt-2 text-[13px] font-light text-white/60">{r.team} · {r.mode}</div>
        </div>
        <span className={`text-[28px] leading-none text-[var(--brand)] transition-transform duration-500 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="overflow-hidden">
            <div className="px-0 md:px-[50px] pb-12">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex h-5 items-center px-2.5 rounded-[3px] bg-white text-[#151515] text-[11px] font-medium tracking-[3px] uppercase">{r.mode.split(" · ")[1]}</span>
                <span className="text-[18px] md:text-[20.8px] leading-[1.5] text-white">{r.experience}</span>
              </div>
              <p className="mt-4 text-[16px] leading-6 text-white">{r.summary}</p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
                {[["Responsibilities", r.responsibilities], ["Requirements", r.requirements]].map(([h, list]) => (
                  <div key={h}>
                    <div className="text-[20.8px] leading-[1.5] text-white">{h}</div>
                    <ul className="mt-4 list-disc pl-7 flex flex-col gap-1">
                      {list.map((li) => <li key={li} className="text-[16px] leading-6 text-white">{li}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {r.skills.map((sk) => <span key={sk} className="px-3 py-1 border border-white/20 text-[12px] text-white/80">{sk}</span>)}
              </div>
              <a href={`mailto:${EMAIL}?subject=${subject}`} className="mt-10 inline-flex items-center h-[47px] px-[26px] border-[0.5px] border-[#d1d1d1] text-[11.2px] tracking-[0.8px] uppercase text-white hover:bg-white hover:text-black transition-colors">
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CareersClient() {
  const [open, setOpen] = useState(0);
  const people = [...FOUNDERS.map((f) => ({ ...f, photo: null })), ...TEAM];

  return (
    <>
      <section className="relative h-[85svh] min-h-[520px] overflow-hidden bg-[#050505]">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: EASE }} className="absolute inset-0">
          <Media src="/videos/ai-fashion.mp4" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-black/40" />
        <div className="absolute left-0 right-0 bottom-14">
          <div className="gs-wrap-48">
            <Kicker size="ab">Careers · Inloop Media</Kicker>
            <RevealLines as="h1" lines={["Do the best work of your career.", "In the loop."]} className="mt-3 text-[36px] md:text-[64px] font-normal leading-[1.1] text-white" />
          </div>
        </div>
      </section>

      <section className="bg-[#050505] pt-24 pb-24">
        <div className="gs-wrap-48">
          <Kicker size="ab">We&apos;re hiring</Kicker>
          <RevealLines lines={["open positions"]} className="mt-4 text-[34px] md:text-[54px] font-normal leading-[1.5] uppercase text-white" />
          <p className="mt-2 max-w-2xl text-[15px] leading-[1.5] text-white/80">
            A lean, senior-led team building growth for ambitious brands, with AI in every workflow and taste in every decision. Based in Noida, remote-friendly.
          </p>
          <div className="mt-12 border-t-[1.5px] border-white">
            {ROLES.map((r, i) => (
              <Role key={r.title} r={r} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>
          <FadeUp className="mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-[20px] text-white">Don&apos;t see your role? <span className="text-white/60">Pitch yourself anyway — we read every message.</span></p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Pitch — Inloop Media")}`} className="liquid-btn liquid-btn-white"><span>Pitch yourself →</span></a>
              <a href={COMPANY_LINKEDIN} target="_blank" rel="noopener noreferrer" className="liquid-btn liquid-btn-ghost"><span>Openings on LinkedIn ↗</span></a>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#050505] pb-24">
        <div className="gs-wrap-48">
          <Kicker size="ab">Hiring process</Kicker>
          <RevealLines lines={["Four steps. No black holes."]} className="mt-4 text-[30px] md:text-[44px] font-normal leading-[1.3] uppercase text-white" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#383838] border border-[#383838]">
            {HIRING_STEPS.map((st, i) => (
              <FadeUp key={st.t} delay={i * 0.08} className="bg-[#050505] p-8 min-h-[220px]">
                <div className="text-[60px] leading-[0.8] text-white">{i + 1}</div>
                <div className="mt-8 text-[22px] uppercase text-white">{st.t}</div>
                <p className="mt-2 text-[15px] leading-[1.5] text-white/80">{st.d}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] pb-24">
        <div className="gs-wrap-48">
          <RevealLines lines={["Who we are"]} className="text-[34px] md:text-[44px] font-normal leading-[1.5] uppercase text-white" />
          <div className="mt-10 flex flex-col">
            {people.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
                className="grid grid-cols-1 md:grid-cols-[376px_1fr] gap-4 py-10 border-t border-[#383838] last:border-b"
              >
                <div>
                  <div className="text-[18px] uppercase tracking-[0.36px] text-white">{p.name}</div>
                  <div className="mt-1 text-[12.8px] tracking-[2px] uppercase text-[var(--brand)]">{p.role}</div>
                </div>
                <p className="max-w-[860px] text-[15px] leading-[1.6] text-white">{p.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
