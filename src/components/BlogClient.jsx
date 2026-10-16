"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Media from "@/components/gs/Media";
import { POSTS, POST_CATEGORIES } from "@/data/posts";

const EASE = [0.16, 1, 0.3, 1];

export default function BlogClient() {
  const [cat, setCat] = useState("All Post");
  const list = cat === "All Post" ? POSTS : POSTS.filter((p) => p.category === cat);
  const featured = POSTS.filter((p) => p.featured).concat(POSTS.slice(1, 4));

  return (
    <section className="bg-[#000000] pt-[160px] pb-[100px]">
      <div className="gs-wrap-48">
        <div className="flex flex-wrap border-b border-white/10">
          {POST_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`relative px-5 pt-8 pb-8 text-[14px] md:text-[16px] uppercase transition-colors cursor-pointer ${cat === c ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              {c}
              {cat === c && <motion.span layoutId="blog-tab" className="absolute left-0 right-0 -bottom-px h-[3px] bg-[var(--brand)]" />}
            </button>
          ))}
        </div>

        <div className="mt-[110px] grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
          <div className="flex flex-col gap-10">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.06, ease: EASE }}
                >
                  <Link href={`/blog/${p.slug}`} data-cursor="Read" className="group grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6 sm:gap-10 items-center">
                    <div className="relative aspect-square overflow-hidden bg-[#111]">
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]">
                        <Media src={p.media} position="top" />
                      </div>
                    </div>
                    <div className="max-w-[486px]">
                      <div className="text-[12px] tracking-[2px] uppercase text-[var(--brand)]">{p.category} · {p.date}</div>
                      <div className="mt-3 text-[17.6px] leading-[1.5] uppercase text-white group-hover:text-[var(--brand)] transition-colors">{p.title}</div>
                      <p className="mt-1 text-[16px] leading-6 text-white/85">{p.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[2px] text-white">Read article <span className="transition-transform group-hover:translate-x-1">→</span></span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="lg:sticky lg:top-28 h-fit border border-[#383838] p-[15px]">
            <div className="flex items-center gap-3 pb-4">
              <span className="text-[30px] leading-[40px] tracking-[4px] text-[var(--brand)]">{"//"}</span>
              <span className="text-[13px] tracking-[3px] uppercase text-white">Featured</span>
            </div>
            <div className="flex flex-col">
              {featured.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group py-4 border-t border-[#383838] flex gap-4 items-center">
                  <div className="relative w-[72px] h-[72px] shrink-0 overflow-hidden bg-[#111]">
                    <Media src={p.media} position="top" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[1px] text-[#888]">{p.date}</div>
                    <div className="mt-1 text-[14px] leading-[1.4] uppercase text-white group-hover:text-[var(--brand)] transition-colors">{p.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
