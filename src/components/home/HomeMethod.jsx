"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Kicker } from "@/components/gs/Type";
import { RevealLines } from "@/components/home/SectionHead";

const EASE = [0.16, 1, 0.3, 1];

const COLS = [
  {
    title: "Systems over Guesswork",
    body: "Every engagement begins with a 48-hour deep dive into your brand, numbers, audience and competitors. We dig into the real business challenge before we talk about creative. Clarity first; clarity drives every decision that follows.",
  },
  {
    title: "Human first, AI always",
    body: "Creativity and strategy lead; AI gives them speed and scale. Our strategists read the data and set direction, our creators produce and test at a scale humans alone can't match, and our optimisers watch performance live — so every touchpoint stays sharp and on-brand.",
  },
  {
    title: "Built to Scale",
    body: "Great growth goes beyond one good campaign. One team, one plan, one dashboard — with weekly optimisation and reporting we double down on what converts, so results compound instead of spiking and the brand stays in every loop that matters.",
  },
];

export default function HomeMethod() {
  return (
    <section className="bg-[#000000] pt-[100px] pb-[100px]">
      <div className="gs-wrap">
        <Kicker>Our methodology</Kicker>
        <RevealLines lines={["First Systems", "Second Scale", "In that order always"]} className="gs-h2 mt-4" />

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
          className="mt-20 h-[0.5px] bg-[var(--brand)] origin-left"
        />

        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-[161px]">
          {COLS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            >
              <h3 className="text-[28px] font-normal leading-[1.2] text-white">{c.title}</h3>
              <p className="mt-2 text-[16px] leading-6 text-white">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-end gap-4">
          <Link href="/contact" className="liquid-btn liquid-btn-white"><span>Share a brief with us →</span></Link>
          <Link href="/about" className="liquid-btn liquid-btn-ghost"><span>Know more →</span></Link>
        </div>
      </div>
    </section>
  );
}
