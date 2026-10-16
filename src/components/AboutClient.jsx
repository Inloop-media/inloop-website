"use client";

import { motion } from "framer-motion";
import Media from "@/components/gs/Media";
import { Kicker } from "@/components/gs/Type";
import { FadeUp, RevealLines } from "@/components/home/SectionHead";
import { FOUNDERS, TEAM, COMPANY_LINKEDIN } from "@/data/team";

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
  { t: "Discover", d: "Before we start working together, we want to know your vision, numbers, audience and competitors. A 48-hour deep dive shows us what's working today and where the biggest opportunity sits." },
  { t: "Strategy", d: "Our strategists read the data, find the opportunity and set the direction — a channel plan with clear targets, budgets and the creative angles to test." },
  { t: "Create", d: "Our creators produce and test creative at a scale humans alone can't match — content, video, design and AI ads, all held to the brand." },
  { t: "Launch", d: "Creative, campaigns, pages and tracking are shipped by one team, fast. No hand-offs, no gaps between agencies." },
  { t: "Optimise", d: "Our optimisers watch performance live — targeting, budgets and creatives are refined every week, with transparent reporting." },
  { t: "Scale", d: "We double down on what converts, so growth compounds instead of spiking — and we stay in every loop that matters." },
];

// The founders share one photo; each card frames one person from it
const FOUNDER_CROPS = [
  { scale: "w-[190%] max-w-none", pos: "left-[-26%] top-[-54%]" },
  { scale: "w-[190%] max-w-none", pos: "left-[-82%] top-[-2%]" },
];

function PersonCard({ name, role, linkedin, children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      className="group w-[320px] max-w-full text-center"
    >
      <a href={linkedin || COMPANY_LINKEDIN} target="_blank" rel="noopener noreferrer" data-cursor="LinkedIn" className="block">
        <div className="relative w-full aspect-square overflow-hidden bg-[#111]">{children}</div>
        <h3 className="mt-6 text-[16px] leading-6 text-white">{name}</h3>
        <div className="mt-2 text-[12.8px] tracking-[2px] uppercase text-[var(--brand)]">{role}</div>
      </a>
    </motion.div>
  );
}

export default function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="h-[100svh] min-h-[600px] bg-[#000000] flex items-center justify-center px-5">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="max-w-[1111px] text-center text-[34px] md:text-[54px] font-normal leading-[1.5] uppercase text-white"
        >
          AI-First <span className="text-[var(--brand)]">brand &amp; Growth Partner.</span>
        </motion.h1>
      </section>

      {/* Who we are */}
      <section className="bg-[#000000] pt-24 pb-24">
        <div className="gs-wrap-48">
          <Kicker size="ab">who we are</Kicker>
          <RevealLines lines={["About Us"]} className="mt-4 text-[34px] md:text-[44px] font-normal leading-[1.5] uppercase text-white" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp className="flex flex-col gap-5 text-[15px] leading-[1.5] text-white">
              <p>Inloop Media is a full-service brand growth company for brands where marketing is treated as a strategic lever. Human creativity leads and AI accelerates, helping brands scale with clarity, consistency and measurable results.</p>
              <p>As part of AMS Group, Inloop brings the heritage of a diversified business group to every brand it grows. Every engagement is led by senior operators across strategy, creative, performance and technology. There are no unnecessary layers between thinking and execution.</p>
              <p>Our work begins with systems. From the outside, marketing looks like creatives, ads and campaigns — but sustainable growth comes from how content, distribution, data and execution work together.</p>
              <p>We believe growth compounds when it is engineered, not improvised. When strategy, creative and performance align, the brand compounds. When they do not, even strong campaigns fragment.</p>
              <p>Today we work with 25+ brands across India and global markets — apps, fashion, FMCG health, SaaS, D2C, professional services and real estate — at the stages where clarity matters most before scaling.</p>
            </FadeUp>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative aspect-[656/492] overflow-hidden bg-[#111] md:sticky md:top-28"
            >
              <Media src="/videos/ai-services.mp4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-[#000000] pb-24">
        <div className="gs-wrap-48">
          <div className="text-center">
            <Kicker size="ab">Our Process</Kicker>
            <RevealLines lines={["How We Work"]} className="mt-4 text-[34px] md:text-[44px] font-normal leading-[1.5] uppercase text-white" />
          </div>
          <div className="mt-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="group grid grid-cols-[90px_1fr] md:grid-cols-[376px_1fr] items-center min-h-[196px] py-10 border-t border-[#383838] last:border-b"
              >
                <div className="text-center text-[40px] md:text-[60px] leading-[0.8] text-white group-hover:text-[var(--brand)] transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="md:pl-12 max-w-[908px]">
                  <h4 className="text-[22px] md:text-[30px] leading-[1.5] uppercase text-white">{s.t}</h4>
                  <p className="mt-3 text-[15px] leading-[1.5] text-white">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders + team */}
      <section className="bg-[#000000] pb-24">
        <div className="gs-wrap-48 text-center">
          <RevealLines lines={["our founders"]} className="text-[34px] md:text-[44px] font-normal leading-[1.5] uppercase text-white" />
          <div className="mt-10 flex flex-wrap justify-center gap-[92px] gap-y-14">
            {FOUNDERS.map((f, i) => (
              <PersonCard key={f.name} name={f.name} role="Founder, AMS Group" linkedin={f.linkedin} delay={i * 0.12}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/team/founders.webp" alt={f.name} className={`absolute ${FOUNDER_CROPS[i].scale} ${FOUNDER_CROPS[i].pos} transition-transform duration-[1.2s] group-hover:scale-[1.04]`} />
              </PersonCard>
            ))}
          </div>

          <RevealLines lines={["our team"]} className="mt-28 text-[34px] md:text-[44px] font-normal leading-[1.5] uppercase text-white" />
          <div className="mt-10 flex flex-wrap justify-center gap-[92px] gap-y-14">
            {TEAM.map((m, i) => (
              <PersonCard key={m.name} name={m.name} role={m.role} linkedin={m.linkedin} delay={i * 0.12}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.photo} alt={m.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
              </PersonCard>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed image */}
      <motion.section
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative h-[100svh] min-h-[500px] overflow-hidden"
      >
        <Media src="/videos/ams-team-film.mp4" />
      </motion.section>
    </>
  );
}
