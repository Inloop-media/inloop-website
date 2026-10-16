"use client";

import { motion } from "framer-motion";
import CTA from "@/components/CTA";
import Media from "@/components/gs/Media";
import { Kicker } from "@/components/gs/Type";
import { RevealLines, FadeUp } from "@/components/home/SectionHead";
import { EMAIL, INSTAGRAM, COMPANY_LINKEDIN } from "@/data/team";

const EASE = [0.16, 1, 0.3, 1];

const WAYS = [
  { h: "Email", v: EMAIL, cta: "Write to Us", href: `mailto:${EMAIL}` },
  { h: "Instagram", v: "@inloop.media", cta: "Message Us", href: INSTAGRAM },
  { h: "LinkedIn", v: "Inloop Media", cta: "Connect", href: COMPANY_LINKEDIN },
];

export default function ContactClient() {
  return (
    <>
      <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#000000]">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: EASE }} className="absolute inset-0">
          <Media src="/videos/ams-team-film.mp4" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/20 to-black/30" />
      </section>

      <section className="bg-[#000000] pt-20 pb-10">
        <div className="gs-wrap-64">
          <Kicker size="sm">Contact Us</Kicker>
          <RevealLines
            as="h1"
            lines={["You do not need all the answers", "before you begin."]}
            className="mt-5 max-w-[1100px] text-[40px] md:text-[72px] font-semibold leading-[1.1] text-white"
          />
          <FadeUp delay={0.2}>
            <p className="mt-10 max-w-[820px] text-[18px] font-light leading-[1.5] text-white">
              Early conversations create stronger growth plans. Tell us about your brand and we&apos;ll tell you exactly how we&apos;d grow it — most engagements begin within a week of enquiry.
            </p>
          </FadeUp>
        </div>
      </section>

      <CTA id="form" />

      <section className="bg-[#000000] pt-20 pb-[100px]">
        <div className="gs-wrap-64">
          <Kicker size="sm">Other ways To reach Us</Kicker>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {WAYS.map((w, i) => (
              <motion.a
                key={w.h}
                href={w.href}
                target={w.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="group block h-[180px] rounded-[12px] border border-[#5b5b5b] px-[25px] pt-[33px] hover:border-[var(--brand)] transition-colors"
              >
                <h3 className="text-[24px] font-medium leading-[1.5] text-white">{w.h}</h3>
                <p className="mt-3 text-[18px] font-light leading-[1.5] text-[#cecece]">{w.v}</p>
                <div className="mt-3 text-[18px] font-light text-white group-hover:text-[var(--brand)] transition-colors">{w.cta} →</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
