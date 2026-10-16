"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Media from "@/components/gs/Media";
import { FadeUp } from "@/components/home/SectionHead";
import { POSTS, getPost } from "@/data/posts";

const EASE = [0.16, 1, 0.3, 1];

export default function PostClient({ slug }) {
  const p = getPost(slug);
  const more = POSTS.filter((x) => x.slug !== slug).slice(0, 4);

  return (
    <>
      <section className="relative h-[70svh] min-h-[460px] overflow-hidden bg-[#000000]">
        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: EASE }} className="absolute inset-0">
          <Media src={p.media} position="top" />
        </motion.div>
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="max-w-3xl text-[22px] md:text-[34px] leading-[1.4] uppercase text-white"
          >
            {p.title}
          </motion.h1>
          <div className="mt-5 flex items-center gap-2 text-[11px] uppercase">
            <span className="tracking-[4px] text-white">Post by</span>
            <span className="text-[var(--brand)]">Inloop Media Team</span>
          </div>
        </div>
      </section>

      <section className="bg-[#000000] pt-10 pb-[100px]">
        <div className="gs-wrap-48">
          <div className="flex flex-wrap items-center gap-3 text-[12px] tracking-[2px] uppercase text-[#5a5a5a]">
            <span className="text-[30px] leading-[40px] tracking-[4px] text-[#383838]">{"//"}</span>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[24px] text-[#383838]">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">{p.category}</Link>
            <span className="text-[24px] text-[#383838]">/</span>
            <span className="text-white/70">{p.title}</span>
          </div>
          <div className="mt-14 flex items-center gap-2 text-[11px] tracking-[1px]">
            <span className="text-[#888]">Published</span>
            <span className="text-white">{p.date}</span>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-16">
            <article className="max-w-[1003px] flex flex-col gap-6">
              <FadeUp className="border border-[#383838] p-6 md:p-8">
                <div className="text-[12px] tracking-[3px] uppercase text-[var(--brand)]">Key takeaways</div>
                <ul className="mt-4 list-disc pl-6 flex flex-col gap-2">
                  {p.takeaways.map((t) => <li key={t} className="text-[16px] leading-[1.6] text-white">{t}</li>)}
                </ul>
              </FadeUp>
              {p.body.map((b, i) =>
                b.h ? (
                  <h2 key={i} className="mt-6 text-[26px] md:text-[32px] leading-[1.3] text-white">{b.h}</h2>
                ) : b.ul ? (
                  <ul key={i} className="list-disc pl-7 flex flex-col gap-2">
                    {b.ul.map((li) => <li key={li} className="text-[16px] leading-[1.6] text-white">{li}</li>)}
                  </ul>
                ) : b.quote ? (
                  <blockquote key={i} className="my-4 border-l-2 border-[var(--brand)] pl-6 text-[20px] md:text-[24px] font-light leading-[1.4] text-white">
                    {b.quote}
                  </blockquote>
                ) : (
                  <p key={i} className="text-[16px] leading-[1.6] text-white/90">{b.p}</p>
                )
              )}
              <div className="mt-10 pt-8 border-t border-[#383838] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <div className="text-[16px] text-white">Written by the Inloop Media team</div>
                  <div className="text-[14px] text-white/60">An AI-first marketing agency in Noida, building brands, content and performance systems that grow.</div>
                </div>
                <Link href="/contact" className="liquid-btn liquid-btn-white"><span>Talk to us →</span></Link>
              </div>
            </article>

            <aside className="lg:sticky lg:top-28 h-fit border border-[#383838] p-[15px]">
              <div className="flex items-center gap-3 pb-4">
                <span className="text-[30px] leading-[40px] tracking-[4px] text-[var(--brand)]">{"//"}</span>
                <span className="text-[13px] tracking-[3px] uppercase text-white">More insights</span>
              </div>
              {more.map((m) => (
                <Link key={m.slug} href={`/blog/${m.slug}`} className="group py-4 border-t border-[#383838] flex gap-4 items-center">
                  <div className="relative w-[72px] h-[72px] shrink-0 overflow-hidden bg-[#111]">
                    <Media src={m.media} position="top" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[1px] text-[#888]">{m.date}</div>
                    <div className="mt-1 text-[14px] leading-[1.4] uppercase text-white group-hover:text-[var(--brand)] transition-colors">{m.title}</div>
                  </div>
                </Link>
              ))}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
