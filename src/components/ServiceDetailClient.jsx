"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import CTA from "@/components/CTA";
import Media from "@/components/gs/Media";
import CaseVisual from "@/components/gs/CaseVisual";
import { Kicker } from "@/components/gs/Type";
import { FadeUp, RevealLines } from "@/components/home/SectionHead";
import { getService } from "@/data/services";
import { CASE_STUDIES } from "@/data/caseStudies";
import { PACKAGES } from "@/data/packages";
import { FAQS } from "@/data/faq";

const EASE = [0.16, 1, 0.3, 1];
const range = (from, to, a, b) => (v) => a + (b - a) * Math.min(1, Math.max(0, (v - from) / (to - from)));

const PLATFORMS = ["Meta", "Google", "Shopify", "TikTok", "YouTube", "Instagram", "LinkedIn", "Taboola", "Microsoft Ads", "Jio Ads"];

const PHASES = [
  {
    label: "Phase 01 // Foundation",
    title: "Discovery and Alignment",
    input: "Brand, numbers & audience audit",
    output: "Growth brief",
    media: "/videos/ai-services.mp4",
    cols: [
      { t: "Vision", d: "We start by understanding your ambitions and defining success on your terms, not the market's." },
      { t: "Audience", d: "We study who actually buys, what they need to believe and where they spend their attention." },
      { t: "Landscape", d: "We map competitors, channels and the gaps where your brand can win fastest." },
    ],
  },
  {
    label: "Phase 02 // Strategy",
    title: "Channel and Creative Strategy",
    input: "Growth brief",
    output: "Channel plan",
    media: "/images/ad-2.webp",
    cols: [
      { t: "Targets", d: "Clear goals for revenue, leads, ROAS and reach — agreed before anything ships." },
      { t: "Angles", d: "The hooks, offers and stories worth testing first, ranked by expected impact." },
      { t: "Budgets", d: "Spend split across channels, with the guardrails that keep return healthy." },
    ],
  },
  {
    label: "Phase 03 // Launch",
    title: "Build and Launch",
    input: "Channel plan",
    output: "Live campaigns",
    media: "/videos/ai-fashion.mp4",
    cols: [
      { t: "Creative", d: "Content, video and design produced at AI speed and held to the brand." },
      { t: "Pages", d: "Landing pages and storefront fixes built around how people actually buy." },
      { t: "Tracking", d: "Analytics and attribution wired in, so every result traces back to its cause." },
    ],
  },
  {
    label: "Phase 04 // Scale",
    title: "Optimise and Scale",
    input: "Live performance data",
    output: "Compounding growth",
    media: "/images/ad-4.webp",
    cols: [
      { t: "Testing", d: "Weekly creative and audience tests, with losers cut fast and winners rotated in." },
      { t: "Reporting", d: "Transparent reports with results, insights and the next moves." },
      { t: "Scaling", d: "Budgets raised in steady steps on proven winners, so return holds as spend grows." },
    ],
  },
];

/* Soft brand glow + grain, standing in for GreySpace's texture photography */
function Texture({ variant = 0 }) {
  const spots = [
    "radial-gradient(60% 50% at 80% 30%, rgba(129,140,248,0.22), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(129,140,248,0.10), transparent 70%)",
    "radial-gradient(50% 60% at 20% 20%, rgba(129,140,248,0.18), transparent 70%), radial-gradient(50% 40% at 90% 80%, rgba(129,140,248,0.12), transparent 70%)",
    "radial-gradient(70% 50% at 50% 100%, rgba(129,140,248,0.2), transparent 70%)",
  ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: spots[variant % spots.length] }} />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)"/%3E%3C/svg%3E')` }}
      />
    </div>
  );
}

function Hero({ s }) {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#000000]">
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: EASE }} className="absolute inset-0">
        <Media src={s.media} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
      <div className="relative h-full flex items-center">
        <div className="gs-wrap-64">
          <Kicker size="sm">{s.tag} agency in India</Kicker>
          <RevealLines as="h1" lines={[s.headline]} className="mt-5 max-w-[800px] text-[52px] md:text-[100px] font-medium leading-none text-white" />
          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-[560px] text-[18px] font-light leading-[1.5] text-white/85">{s.description}</p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function PlatformStrip() {
  return (
    <section className="bg-[#000000] pt-[120px] pb-[40px]">
      <h2 className="text-center text-[22px] md:text-[28px] font-medium leading-[1.2] uppercase text-white">Platforms we grow brands on</h2>
      <div className="relative mt-[50px] overflow-hidden gs-marquee-mask">
        <div className="gs-marquee flex w-max">
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <div key={i} className="w-[312px] h-[168px] grid place-items-center text-[28px] font-bold tracking-tight text-white/80">{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Statements({ s }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2));

  const items = [
    { h: "Most brands don't have a marketing problem.", p: "From the outside, marketing looks like creatives, ads and campaigns. But sustainable growth doesn't come from isolated efforts — it comes from systems: how content, distribution, data and execution work together." },
    { h: "Great ideas built on weak systems fade fast.", p: `Every ${s.title.toLowerCase()} engagement at Inloop begins with a growth conversation. Brands with average ideas and strong systems consistently outgrow brands with brilliant ideas and no structure. The work only holds up when the system underneath is sound.` },
    { h: "Human thinking. AI speed.", p: "Strategy, taste and judgement come from our team. Scale, speed and optimisation come from AI working quietly in the background — so the work is sharper, faster and built to compound." },
  ];

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#000000]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Texture variant={0} />
        <div className="relative h-full gs-wrap-64 flex flex-col">
          <div className="pt-[18vh] md:pl-[283px]">
            <div className="gs-kicker-sm md:text-right">Systems first. Growth always.</div>
            <div className="mt-6 h-px bg-white/25" />
          </div>
          <div className="relative flex-1 grid grid-cols-1 md:grid-cols-[318px_1fr_366px] items-center gap-8 md:gap-0 pb-[10vh]">
            <div className="relative h-[200px] md:h-[344px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute left-0 md:left-7 top-0 text-[200px] md:text-[340px] font-thin leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--brand)] select-none"
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="relative md:pl-[96px] min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={active}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="max-w-[420px] text-[36px] md:text-[60px] font-medium leading-[1.1] text-white"
                >
                  {items[active].h}
                </motion.h2>
              </AnimatePresence>
            </div>
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
                  className="text-[18px] font-light leading-[1.5] text-white"
                >
                  {items[active].p}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars({ s }) {
  const four = s.what.slice(0, 4);
  const layout = [
    { pos: "md:ml-[5%]", size: "text-[44px] md:text-[72px]", w: "md:w-[529px]" },
    { pos: "md:ml-[59%] md:-mt-[90px]", size: "text-[40px] md:text-[64px]", w: "md:w-[480px]" },
    { pos: "md:ml-[20.5%] md:-mt-[10px]", size: "text-[34px] md:text-[48px]", w: "md:w-[480px]" },
    { pos: "md:ml-[60%] md:-mt-[90px]", size: "text-[34px] md:text-[48px]", w: "md:w-[420px]" },
  ];
  return (
    <section className="relative bg-[#000000] py-20 overflow-hidden">
      <Texture variant={1} />
      <div className="relative gs-wrap-64">
        <Kicker size="sm">Four pillars of {s.title}</Kicker>
        <div className="mt-6 flex flex-col gap-14 md:gap-0">
          {four.map((w, i) => (
            <motion.div
              key={w.t}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
              className={`${layout[i].pos} ${layout[i].w}`}
            >
              <div className="text-[20px] font-light leading-[1.5] text-[var(--brand)]">{String(i + 1).padStart(2, "0")}</div>
              <h3 className={`${layout[i].size} font-medium leading-[0.95] uppercase text-white`}>{w.t}</h3>
              <p className="mt-3 max-w-[424px] text-[18px] font-light leading-[1.5] text-white">{w.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InAction({ s }) {
  const [tab, setTab] = useState(0);
  const c = CASE_STUDIES[tab];
  return (
    <section className="bg-[#000000] py-20">
      <div className="gs-wrap-64">
        <Kicker size="sm">{s.title} in action</Kicker>
        <RevealLines lines={["Every engagement we run", "starts with a real business problem"]} className="mt-5 max-w-[1000px] text-[36px] md:text-[72px] font-medium leading-[1.1] text-white" />

        <div className="mt-[60px] flex flex-wrap border-b border-white/15">
          {CASE_STUDIES.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              onClick={() => setTab(i)}
              className={`relative px-0 mr-10 pb-5 text-[16px] md:text-[18px] font-medium tracking-[1.08px] uppercase transition-colors cursor-pointer ${tab === i ? "text-white" : "text-white/45 hover:text-white"}`}
            >
              {x.name}
              {tab === i && <motion.span layoutId="action-tab" className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--brand)]" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="relative mt-7 h-[196px] overflow-hidden">
              <CaseVisual c={c} />
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-[386px_1fr] gap-12">
              <div>
                <h3 className="text-[28px] md:text-[36px] font-medium leading-[1.3] uppercase text-white">{c.name}</h3>
                <div className="mt-7 inline-block px-3 py-2.5 bg-white text-black text-[10px] font-medium tracking-[1.6px] uppercase">{c.category}</div>
                <p className="mt-7 text-[13px] font-light text-white">{c.headline}</p>
                {[
                  ["Industry", c.meta.split(" · ")[0]],
                  ["Scope", c.scope],
                  ["Timeline", c.timeline],
                ].map(([k, v], i) => (
                  <div key={k} className={i === 0 ? "mt-20" : "mt-[60px]"}>
                    <h4 className="text-[20px] md:text-[24px] font-medium leading-[1.3] uppercase text-[var(--brand)]">{k}</h4>
                    <div className="mt-3 text-[16px] font-medium uppercase text-white">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[84px]">
                {[
                  ["Problem", c.problem],
                  ["Goal", c.goal],
                  ["Solution", c.solution],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-1 md:grid-cols-[248px_1fr] gap-4">
                    <h4 className="text-[20px] md:text-[24px] font-medium leading-[1.3] uppercase text-[var(--brand)]">{k}</h4>
                    <p className="text-[18px] font-light leading-[1.5] text-white">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function HowWeWork() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, range(0.05, 0.95, 0, -distance));

  // Measure how far the track must travel (resize observer callback, not render-time state)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 64)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative h-[420vh] bg-[#000000]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-x-0 top-[18%] bottom-[10%] opacity-60">
          <Texture variant={2} />
        </div>
        <div className="relative gs-wrap-64 pt-[20vh]">
          <h2 className="gs-kicker-sm">How we work</h2>
        </div>
        <motion.div ref={trackRef} style={{ x }} className="relative mt-[70px] flex w-max pl-[64px]">
          {PHASES.map((p) => (
            <div key={p.label} className="flex w-[90vw] md:w-[1231px] shrink-0 pr-10 md:pr-[160px]">
              <div className="relative hidden md:block w-[288px] h-[464px] shrink-0 overflow-hidden mt-[21px]">
                <Media src={p.media} position="top" />
              </div>
              <div className="md:w-[727px] md:ml-14">
                <div>
                  <div className="text-[16px] md:text-[18px] font-light leading-[1.5] tracking-[3px] uppercase text-[var(--brand)]">{p.label}</div>
                  <h3 className="mt-4 max-w-[260px] text-[28px] md:text-[32px] font-medium leading-none text-white">{p.title}</h3>
                  <div className="mt-4 text-[16px] md:text-[18px] font-light leading-[1.5] tracking-[3px] text-[var(--brand)]">Input: {p.input}</div>
                  <div className="text-[16px] md:text-[18px] font-light leading-[1.5] tracking-[3px] text-[var(--brand)]">Output: {p.output}</div>
                </div>
                <div className="mt-[100px] grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {p.cols.map((c) => (
                    <div key={c.t}>
                      <h4 className="text-[18px] leading-[1.5] tracking-[3px] text-white">{c.t}</h4>
                      <p className="mt-10 text-[16px] md:text-[18px] font-light leading-[1.5] text-white">{c.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ForYouIf({ s }) {
  const items = [
    { h: "Your brand has outgrown itself", p: "The business has grown, but the brand and its channels have not kept up. Content looks inconsistent and messaging says different things in different places. You are not starting from scratch — you are catching up." },
    { h: `You need ${s.title.toLowerCase()} that ties to revenue`, p: "You want work that is measured against business outcomes, not vanity metrics — with clear reporting on what moved and why." },
    { h: "You are preparing for a significant moment", p: "A launch, a new market, a fundraise or a big season. You need one team that can move fast across strategy, creative and performance." },
  ];
  return (
    <section className="relative bg-[#000000] py-20 overflow-hidden">
      <Texture variant={1} />
      <div className="relative gs-wrap-64">
        <h2 className="gs-kicker-sm">This work is for you if</h2>
        <div className="mt-[58px] flex flex-col gap-14 md:gap-0">
          {items.map((it, i) => (
            <motion.div
              key={it.h}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              className={`md:w-[484px] ${i % 2 ? "md:ml-[56%] md:-mt-[40px]" : "md:ml-[11.7%]"} ${i === 2 ? "md:-mt-[40px]" : ""}`}
            >
              <h3 className="text-[26px] md:text-[32px] font-medium leading-none text-white">{it.h}</h3>
              <p className="mt-2 text-[18px] font-light leading-[1.5] text-white">{it.p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Investment() {
  return (
    <section className="relative bg-[#000000] py-20 overflow-hidden">
      <Texture variant={0} />
      <div className="relative gs-wrap-64">
        <div className="gs-kicker-sm">What to expect on investment</div>
        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-[540px_1fr] gap-14 md:gap-[150px] md:pl-[115px]">
          <div>
            <RevealLines lines={["Scoped to your business,", "not a fixed package"]} className="text-[36px] md:text-[60px] font-medium leading-[1.1] text-white" />
            <div className="mt-[136px] flex flex-col gap-8">
              {PACKAGES.map((p) => (
                <FadeUp key={p.num}>
                  <div className="text-[18px] font-light leading-[1.5] text-white">
                    <span className="text-[var(--brand)]">{p.title}</span> — {p.tag.replace("Most Popular · ", "")}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
          <div className="max-w-[380px]">
            <h3 className="text-[28px] md:text-[32px] font-medium leading-none text-white">A custom scope for every engagement</h3>
            {[
              ["Size & Scale", "Aligned with your stage, channels, markets and the number of brands or accounts we manage."],
              ["Velocity", "Determined by launch timelines, season and how fast the plan needs to move."],
              ["Depth", "From focused single-channel work to a full growth system across creative, performance and tech."],
            ].map(([k, v]) => (
              <FadeUp key={k} className="mt-[68px]">
                <h4 className="text-[22px] md:text-[26px] font-semibold leading-none uppercase text-white">{k}</h4>
                <p className="mt-2 text-[18px] font-light leading-[1.5] text-white">{v}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ({ s }) {
  const [open, setOpen] = useState(0);
  const items = [
    { q: `What does Inloop's ${s.title.toLowerCase()} service include?`, a: `${s.description} It covers ${s.what.map((w) => w.t.toLowerCase()).join(", ")}.` },
    ...FAQS,
  ];
  return (
    <section className="bg-[#000000] py-20">
      <div className="gs-wrap-64 grid grid-cols-1 md:grid-cols-[412px_1fr] gap-12 md:gap-[181px]">
        <div>
          <div className="gs-kicker-sm">Faq</div>
          <RevealLines lines={["Frequently", "asked", "questions"]} className="mt-6 text-[48px] md:text-[68px] font-medium leading-[0.9] text-white" />
          <p className="mt-6 text-[18px] font-light leading-[1.5] text-white">
            Everything you need to know before starting a {s.title.toLowerCase()} engagement with Inloop.
          </p>
        </div>
        <div>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="border-b border-white/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start gap-5 py-7 text-left cursor-pointer"
                >
                  <span className="text-[20px] font-light leading-[1.5] text-white">{String(i + 1).padStart(2, "0")}.</span>
                  <span className={`flex-1 text-[20px] font-light leading-[1.5] transition-colors ${isOpen ? "text-[var(--brand)]" : "text-white"}`}>{it.q}</span>
                  <span className={`text-[24px] leading-none text-[var(--brand)] transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-[18px] font-light leading-[1.5] text-white">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetailClient({ slug }) {
  const s = getService(slug);
  return (
    <>
      <Hero s={s} />
      <PlatformStrip />
      <Statements s={s} />
      <Pillars s={s} />
      <InAction s={s} />
      <HowWeWork />
      <ForYouIf s={s} />
      <Investment />
      <FAQ s={s} />
      <CTA />
    </>
  );
}
