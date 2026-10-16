"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// "We don't just consult. We build." — the Inloop pinned flip-card section

const PILLARS = [
  { num: "01", icon: "◆", label: "Strategy", href: "/services/branding", items: ["AI Growth Strategy", "Brand Positioning", "Creative Direction", "Market Discovery", "Competitive Research"] },
  { num: "02", icon: "✦", label: "Creative", href: "/services/content", items: ["Art Direction", "UX / UI Design", "Motion & Animation", "Interactive Design", "Visual Identity"] },
  { num: "03", icon: "⬡", label: "Tech", href: "/services/website", items: ["Next.js & React Apps", "AI Automation & Agents", "WebGL / Three.js", "API Integrations", "Full-Stack Engineering"] },
  { num: "04", icon: "▲", label: "Growth", href: "/services/performance", items: ["SEO & Content Systems", "Paid Ads & Funnels", "Email Automation", "Analytics & Tracking", "Conversion Optimisation"] },
];

// Final fanned-out layout for each card (horizontal offset in vw, tilt in deg)
const SPREAD = [
  { x: -36, rotate: -18 },
  { x: -12, rotate: -7 },
  { x: 12, rotate: 7 },
  { x: 36, rotate: 18 },
];

// Scroll choreography: 0 → 0.45 fan out, 0.5 → 1 flip one after another
const FAN_END = 0.45;
const FLIP_START = 0.5;
const FLIP_STAGGER = 0.07;
const FLIP_DURATION = 0.28;

const range = (from, to, a, b) => (v) => a + (b - a) * Math.min(1, Math.max(0, (v - from) / (to - from)));

function CardFront() {
  return (
    <div
      className="absolute inset-0 rounded-[22px] overflow-hidden grid place-items-center border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] [backface-visibility:hidden]"
      style={{ background: "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.14), transparent 60%), linear-gradient(160deg, #1a1a1c, #0a0a0b 70%)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-logo.webp"
        alt="Inloop"
        className="w-[68%] max-w-[190px] h-auto object-contain drop-shadow-[0_0_34px_rgba(255,255,255,0.5)] select-none"
        draggable={false}
      />
    </div>
  );
}

function CardBack({ pillar }) {
  return (
    <div className="absolute inset-0 rounded-[22px] overflow-hidden bg-white border border-black/5 shadow-[0_24px_70px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 0), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(120% 90% at 50% 0, #000 40%, transparent 90%)",
        }}
      />
      <span className="absolute top-2.5 right-[18px] font-extrabold text-[88px] leading-none text-black/[0.045] select-none pointer-events-none">
        {pillar.num}
      </span>

      <div className="absolute inset-0 z-[1] flex flex-col justify-between px-6 pt-7 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-[34px] h-[34px] rounded-[10px] text-[15px] text-[#111] bg-black/[0.045] border border-black/[0.08]">
            {pillar.icon}
          </span>
          <span className="font-extrabold text-base tracking-[0.16em] uppercase text-[#111]">{pillar.label}</span>
        </div>

        <ul className="flex-1 pt-5">
          {pillar.items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 py-2.5 text-[13.5px] font-medium text-[#3a3a3c] border-b border-black/[0.06] last:border-b-0">
              <span className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div>
          <Link
            href={pillar.href}
            className="group/cta inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#111] px-3.5 py-2 mb-3.5 border border-black/15 rounded-full bg-black/[0.03] hover:bg-[#111] hover:text-white hover:-translate-y-px transition-all"
          >
            Explore {pillar.label}
            <span className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5">↗</span>
          </Link>
          <div className="text-[8px] tracking-[0.35em] text-black/20 uppercase font-bold">Inloop Media</div>
        </div>
      </div>
    </div>
  );
}

function FloatWrapper({ index, children }) {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  );
}

// Desktop: pinned, scroll-driven fan-out + sequential flip
function ScrollCard({ pillar, index, progress }) {
  const { x: spreadX, rotate: spreadRotate } = SPREAD[index];
  const flipStart = FLIP_START + index * FLIP_STAGGER;
  const flipEnd = flipStart + FLIP_DURATION;

  const x = useTransform(progress, (v) => `${range(0, FAN_END, 0, spreadX)(v)}vw`);
  const rotate = useTransform(progress, (v) =>
    v < FAN_END ? range(0, FAN_END, 0, spreadRotate)(v) : range(flipStart, flipEnd, spreadRotate, 0)(v)
  );
  const rotateY = useTransform(progress, range(flipStart, flipEnd, 0, 180));

  return (
    <motion.div
      style={{ x, rotate, zIndex: index + 1 }}
      className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[min(300px,22vw)] h-[min(440px,calc(86vh-190px))] [perspective:1200px] will-change-transform"
    >
      <FloatWrapper index={index}>
        <motion.div style={{ rotateY }} className="relative w-full h-full [transform-style:preserve-3d]">
          <CardFront />
          <CardBack pillar={pillar} />
        </motion.div>
      </FloatWrapper>
    </motion.div>
  );
}

// Mobile / tablet: each card flips as it scrolls into view
function InViewCard({ pillar, index }) {
  return (
    <div className="w-full max-w-[325px] aspect-[325/480] [perspective:1200px]">
      <FloatWrapper index={index}>
        <motion.div
          initial={{ rotateY: 0 }}
          whileInView={{ rotateY: 180 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
          className="relative w-full h-full [transform-style:preserve-3d]"
        >
          <CardFront />
          <CardBack pillar={pillar} />
        </motion.div>
      </FloatWrapper>
    </div>
  );
}

function Heading() {
  return (
    <>
      <div className="text-[12px] font-bold tracking-[0.26em] uppercase text-white/90">What we do</div>
      <h2 className="mt-3.5 text-[30px] md:text-[52px] font-bold tracking-[-0.02em] leading-[1.04] text-white">
        We don&apos;t just consult.{" "}
        <span className="bg-gradient-to-r from-white via-[#d8d9db] to-[#9aa1aa] bg-clip-text text-transparent">We build.</span>
      </h2>
    </>
  );
}

export default function HomeFlipCards() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const cueOpacity = useTransform(scrollYProgress, range(0.85, 1, 1, 0));

  return (
    <>
      {/* Desktop */}
      <section ref={targetRef} className="relative hidden lg:block h-[350vh] bg-[#000000]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.05)_0,transparent_70%)]" />

          <div className="absolute top-[12vh] left-0 right-0 px-5 flex flex-col items-center text-center z-10">
            <Heading />
          </div>

          {PILLARS.map((pillar, i) => (
            <ScrollCard key={pillar.num} pillar={pillar} index={i} progress={scrollYProgress} />
          ))}

          <motion.div
            style={{ opacity: cueOpacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] font-semibold tracking-[0.3em] text-white/45 uppercase whitespace-nowrap"
          >
            ↓ Scroll to fan &amp; flip
          </motion.div>
        </div>
      </section>

      {/* Mobile / tablet */}
      <section className="lg:hidden bg-[#000000] px-5 py-20">
        <div className="text-center mb-12">
          <Heading />
          <p className="text-white/50 font-light mt-4">Scroll to reveal each service.</p>
        </div>
        <div className="flex flex-col items-center gap-7 sm:grid sm:grid-cols-2 sm:justify-items-center sm:max-w-[700px] sm:mx-auto">
          {PILLARS.map((pillar, i) => (
            <InViewCard key={pillar.num} pillar={pillar} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
