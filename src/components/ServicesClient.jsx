"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CTA from "@/components/CTA";
import Media from "@/components/gs/Media";
import { Kicker } from "@/components/gs/Type";
import { RevealLines, FadeUp } from "@/components/home/SectionHead";
import { SERVICES } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1];

export default function ServicesClient() {
  return (
    <>
      <section className="bg-[#000000] pt-[160px] pb-20 text-center">
        <div className="gs-wrap-64 flex flex-col items-center">
          <Kicker size="sm">Our Services</Kicker>
          <RevealLines
            as="h1"
            lines={["One roof.", "Every lever of growth."]}
            className="mt-4 max-w-[1020px] text-[40px] md:text-[68px] font-medium leading-[1.1] text-white"
          />
          <FadeUp delay={0.3}>
            <p className="mt-4 max-w-[664px] text-[18px] font-light leading-[1.5] text-white">
              From the first pixel of your identity to the last touch of a qualified lead — we build, run, and scale all of it.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#000000] pb-[100px]">
        <div className="gs-wrap-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE }}
            >
              <Link href={`/services/${s.slug}`} data-cursor="View" className="group block border border-[#5b5b5b] hover:border-white/60 transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]">
                    <Media src={s.media} />
                  </div>
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute left-5 top-5 text-[14px] font-light text-white/80">{s.num}</span>
                </div>
                <div className="p-6">
                  <div className="gs-kicker-sm !text-[13px]">{s.tag}</div>
                  <h2 className="mt-2 text-[24px] font-medium leading-[1.25] text-white group-hover:text-[var(--brand)] transition-colors">{s.headline}</h2>
                  <p className="mt-2 text-[15px] font-light leading-[1.5] text-[#cecece]">{s.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
