"use client";
// Inloop CRM — our own SaaS product, shown as a full showcase on the Work page:
// a headline with the big dashboard, the line of everything it tracks, three modules
// (screenshot + what it does) and a grid of the rest.
import { motion } from "framer-motion";
import { Kicker } from "@/components/gs/Type";
import { RevealLines, FadeUp } from "@/components/home/SectionHead";
import { domainOf } from "@/data/websites";

const EASE = [0.16, 1, 0.3, 1];

function Window({ src, alt, url, eager = false }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-white/15 bg-[#0d0d0f] shadow-[0_40px_120px_-40px_rgba(239,68,68,0.35)]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#161618] px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.06] px-3 py-1 text-center text-[11px] tracking-wide text-white/55">{domainOf(url)}</span>
        <span className="w-[42px]" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} className="block w-full" />
    </div>
  );
}

function Flow({ steps }) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
      {steps.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
          className="flex items-center gap-2"
        >
          <span className="crm-flow-step rounded-full border border-white/20 px-4 py-2 text-[13px] md:text-[14px] text-white/85" style={{ animationDelay: `${i * 0.55}s` }}>
            <span className="mr-2 text-white/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {s}
          </span>
          {i < steps.length - 1 && (
            <svg viewBox="0 0 16 8" className="h-2 w-4 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M0 4h14M11 1l3 3-3 3" />
            </svg>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

function Module({ m, index, url }) {
  const flip = index % 2 === 1;
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE }}
        className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}
      >
        <div className="gs-kicker-sm">{String(index + 1).padStart(2, "0")} — {m.tag}</div>
        <h3 className="mt-4 text-[30px] md:text-[42px] font-semibold leading-[1.1] text-white">{m.title}</h3>
        <p className="mt-5 text-[17px] md:text-[19px] font-light leading-[1.6] text-[#cecece]">{m.text}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {m.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[15px] md:text-[16px] text-white/85">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand)]/15 text-[var(--brand)]">
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M2.5 6.2 5 8.5 9.5 3.5" />
                </svg>
              </span>
              {p}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
      >
        <Window src={m.img} alt={`Inloop CRM — ${m.tag}`} url={url} />
      </motion.div>
    </div>
  );
}

export default function CrmShowcase({ p }) {
  return (
    <section id="product" className="relative overflow-hidden bg-[#000000] pt-[120px] pb-[60px]">
      {/* soft brand glow behind the dashboard */}
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[var(--brand)]/20 blur-[140px]" />
      <div className="gs-wrap-64 relative">
        <div className="flex flex-col items-center text-center">
          <Kicker size="sm">{p.kicker}</Kicker>
          <RevealLines as="h2" lines={[p.name]} className="mt-4 text-[56px] md:text-[104px] font-semibold leading-[1] tracking-[-0.03em] text-white" />
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-[820px] text-[20px] md:text-[26px] font-medium leading-[1.4] text-white">{p.headline}</p>
            <p className="mx-auto mt-4 max-w-[720px] text-[16px] md:text-[18px] font-light leading-[1.6] text-[#cecece]">{p.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="liquid-btn liquid-btn-white" data-cursor="Open">
                <span>View product ↗</span>
              </a>
              <a href="/contact" className="liquid-btn liquid-btn-ghost">
                <span>Get a demo</span>
              </a>
            </div>
          </FadeUp>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mx-auto mt-16 max-w-[1200px]"
        >
          <Window src={p.img} alt="Inloop CRM dashboard" url={p.url} eager />
        </motion.div>

        <div className="mt-24 text-center">
          <div className="gs-kicker-sm">Tracks every step</div>
          <p className="mx-auto mt-3 max-w-[640px] text-[16px] md:text-[18px] font-light leading-[1.6] text-white/70">From the first enquiry to the post the client signs off — nothing lives in WhatsApp threads or spreadsheets.</p>
          <div className="mt-8">
            <Flow steps={p.flow} />
          </div>
        </div>

        <div className="mt-28 flex flex-col gap-24 md:gap-32">
          {p.modules.map((m, i) => (
            <Module key={m.tag} m={m} index={i} url={p.url} />
          ))}
        </div>

        <div className="mt-28 grid grid-cols-1 gap-px overflow-hidden border border-[#5b5b5b] bg-[#5b5b5b] sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE }}
              className="bg-[#000000] p-7 md:p-9"
            >
              <div className="text-[13px] tabular-nums text-[var(--brand)]">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-3 text-[20px] md:text-[22px] font-medium text-white">{f.t}</div>
              <p className="mt-2 text-[15px] md:text-[16px] font-light leading-[1.6] text-[#cecece]">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
