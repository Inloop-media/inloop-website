"use client";

import Link from "next/link";
import { RevealLines, FadeUp } from "@/components/home/SectionHead";

export default function HomeIntro() {
  return (
    <section className="bg-[#000000] pt-[100px] pb-[100px]">
      <div className="gs-wrap">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          <RevealLines
            as="p"
            lines={["For founders,", "teams,", "and businesses", "building for", "the long term"]}
            className="lg:w-[300px] shrink-0 text-[18px] md:text-[22px] font-medium leading-[1.5] tracking-[1.1px] uppercase text-white"
          />
          <div className="max-w-[712px]">
            <RevealLines lines={["Built for Growth", "Powered by AI"]} className="gs-h2" />
            <FadeUp delay={0.15}>
              <p className="mt-10 text-[20px] md:text-[26px] font-light leading-[1.5] text-white/80">
                We work with founders, CMOs and growing brands to build growth that holds up under real business decisions. Strategy-led, creatively expressed and powered by AI across every touchpoint. Our job is to look at the challenge from every angle and deliver strategy and execution rich with ideas and perspective.
              </p>
            </FadeUp>
          </div>
        </div>

        <FadeUp className="mt-20 flex flex-col md:flex-row md:items-start justify-between gap-10">
          <h3 className="max-w-[354px] text-[24px] md:text-[28px] font-semibold leading-[1.2] text-white">
            A growth partner, not an agency type engagement
          </h3>
          <div className="flex flex-col gap-4 w-full md:w-[240px]">
            <Link href="/contact" className="liquid-btn liquid-btn-white !w-full"><span>Share a brief with us →</span></Link>
            <Link href="/about" className="liquid-btn liquid-btn-ghost !w-full"><span>Know more →</span></Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
