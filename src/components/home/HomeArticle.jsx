"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { POSTS } from "@/data/posts";

const EASE = [0.16, 1, 0.3, 1];

// GreySpace closes the homepage with a long-form article teaser; Inloop uses its featured insight
export default function HomeArticle() {
  const post = POSTS.find((p) => p.featured) || POSTS[0];
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-[#000000] pt-[100px] pb-[60px]">
      <div className="gs-wrap">
        <h2 className="gs-h2">{post.title}</h2>
        <p className="mt-5 text-[18px] font-light leading-[1.5] text-white">{post.excerpt}</p>
        {!open && (
          <button type="button" onClick={() => setOpen(true)} className="mt-2 text-[18px] font-light text-[#aaa] hover:text-white transition-colors cursor-pointer">
            Read More
          </button>
        )}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pt-5 flex flex-col gap-5">
                {post.body.map((b, i) =>
                  b.h ? (
                    <h3 key={i} className="mt-4 text-[28px] md:text-[36px] leading-[1.5] text-white">{b.h}</h3>
                  ) : b.ul ? (
                    <ul key={i} className="list-disc pl-7 flex flex-col gap-1">
                      {b.ul.map((li) => <li key={li} className="text-[18px] leading-[1.5] text-white">{li}</li>)}
                    </ul>
                  ) : b.quote ? (
                    <p key={i} className="text-[18px] leading-[1.5] text-white border-l-2 border-[var(--brand)] pl-5">{b.quote}</p>
                  ) : (
                    <p key={i} className="text-[18px] leading-[1.5] text-white">{b.p}</p>
                  )
                )}
                <div className="flex items-center gap-8 mt-2">
                  <button type="button" onClick={() => setOpen(false)} className="text-[18px] font-light text-[#aaa] hover:text-white transition-colors cursor-pointer">
                    Read Less
                  </button>
                  <Link href={`/blog/${post.slug}`} className="arrow-link">Open article <span>→</span></Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
