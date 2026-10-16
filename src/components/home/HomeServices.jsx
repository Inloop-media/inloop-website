"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Kicker } from "@/components/gs/Type";
import { RevealLines } from "@/components/home/SectionHead";
import Media from "@/components/gs/Media";
import { PILLARS } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1];

export default function HomeServices() {
  const [open, setOpen] = useState(null);

  return (
    <section id="our-services" className="bg-[#000000] pt-[100px] pb-[100px]">
      <div className="gs-wrap">
        <Kicker>Our services</Kicker>
        <RevealLines lines={["What we can do for you"]} className="gs-h2 mt-4" />

        <div className="mt-20">
          {PILLARS.map((p, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
                className="border-t border-white/10 last:border-b"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full grid grid-cols-[50px_1fr_auto] md:grid-cols-[80px_1fr_260px_100px] items-center min-h-[141px] py-6 text-left cursor-pointer"
                >
                  <span className="pl-0 md:pl-[30px] flex items-center gap-1.5 text-[16px] md:text-[20px] font-medium text-white">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isOpen ? "bg-[var(--brand)]" : "bg-white"}`} />
                    {p.num}
                  </span>
                  <h3 className={`text-[22px] md:text-[32px] font-medium leading-[1.5] transition-all duration-500 group-hover:translate-x-2 ${isOpen ? "text-[var(--brand)]" : "text-white"}`}>
                    {p.title}
                  </h3>
                  <p className="hidden md:block text-[14px] leading-[1.4] text-white">{p.short}</p>
                  <span className="justify-self-end mr-0 md:mr-[40px] relative w-5 h-5" aria-hidden="true">
                    <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-[var(--brand)]" />
                    <span className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-[var(--brand)] transition-transform duration-500 ${isOpen ? "scale-y-0" : ""}`} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="md:pl-[80px] pb-12">
                        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-start">
                          <div className="text-[18px] font-medium text-white">Services</div>
                          <div className="flex flex-wrap gap-x-[46px] gap-y-2">
                            {p.services.map((s) => (
                              <span key={s} className="text-[14px] text-white">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-[150px_350px_1fr] gap-6 md:gap-0 items-start">
                          <div className="text-[18px] font-medium text-white">Approach</div>
                          <div>
                            <p className="text-[15px] leading-6 text-white">{p.approach}</p>
                            <Link href={`/services/${p.slug}`} className="liquid-btn liquid-btn-white mt-8"><span>Learn more</span></Link>
                          </div>
                          <div className="grid grid-cols-2 gap-5 md:pl-10">
                            {p.media.map((m) => (
                              <div key={m} className="relative aspect-[270/261] overflow-hidden bg-[#111]">
                                <Media src={m} position="top" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
