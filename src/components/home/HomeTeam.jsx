"use client";

import { motion } from "framer-motion";
import { TEAM, COMPANY_LINKEDIN } from "@/data/team";

const EASE = [0.16, 1, 0.3, 1];

export default function HomeTeam() {
  return (
    <section className="relative bg-[#050505] pt-[100px] pb-[100px] overflow-hidden">
      <div className="gs-wrap">
        <div className="relative">
          {/* Giant outlined display type behind the team */}
          <div className="pointer-events-none select-none absolute inset-x-0 top-[117px] z-20 text-center leading-[0.9] mix-blend-difference">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              className="text-outline-display text-[16vw] lg:text-[172.8px] font-light uppercase whitespace-nowrap"
            >
              The People
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
              className="text-outline-display text-[16vw] lg:text-[172.8px] font-light uppercase whitespace-nowrap"
            >
              In The Loop
            </motion.div>
          </div>

          {/* Group strip */}
          <div className="relative z-10 grid grid-cols-3 gap-0 md:h-[546px] pt-[38vw] md:pt-0">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
                className="relative h-[46vw] md:h-full overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 -mt-10 grid grid-cols-1 md:grid-cols-[repeat(3,310px)] md:justify-center gap-10 md:gap-[60px]">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE }}
            >
              <div className="text-[18px] leading-[1.5] tracking-[0.36px] uppercase text-white">{m.name}</div>
              <div className="mt-2 text-[11px] font-semibold tracking-[0.55px] text-[var(--brand)]">{m.role}</div>
              <p className="mt-6 text-[14px] font-light leading-[1.6] text-white">{m.bio}</p>
              <a href={m.linkedin || COMPANY_LINKEDIN} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-[13px] text-white hover:text-[var(--brand)] transition-colors">
                LinkedIn <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
