"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { REELS } from "@/data/reels";
import { Kicker } from "@/components/gs/Type";
import { RevealLines, FadeUp } from "@/components/home/SectionHead";

const EASE = [0.16, 1, 0.3, 1];
const STEPS = ["Hook", "Demo", "CTA"];

function PlayIcon() {
  return <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
}
function PauseIcon() {
  return <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>;
}
function SoundIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
      {muted ? <path d="m17 9 4 6m0-6-4 6" strokeLinecap="round" /> : <path d="M16 9a4 4 0 0 1 0 6" strokeLinecap="round" />}
    </svg>
  );
}

function Reel({ reel, index }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Autoplay (muted) only while the card is on screen
  useEffect(() => {
    const el = cardRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().then(() => setPlaying(true)).catch(() => {});
        else {
          vid.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) vid.play().then(() => setPlaying(true)).catch(() => {});
    else {
      vid.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: EASE }}
      onClick={togglePlay}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), togglePlay())}
      role="button"
      tabIndex={0}
      aria-label={`${playing ? "Pause" : "Play"} ${reel.industry} reel`}
      data-cursor={playing ? "Pause" : "Play"}
      style={{ "--i": index }}
      className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-[#0e0e0f] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25"
    >
      <div className="relative aspect-[4/5] flex flex-col p-4 overflow-hidden">
        <video
          ref={videoRef}
          src={reel.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(6,6,7,0.55),rgba(6,6,7,0.05)_30%,rgba(6,6,7,0.15)_55%,rgba(6,6,7,0.88))]" />

        {/* Story segments + meta */}
        <div className="relative z-[2]">
          <div className="flex gap-[5px]">
            {STEPS.map((s) => (
              <i key={s} className="aiv-seg relative flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden" />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-[12px] font-semibold text-white/75">
            <span className="px-[7px] py-[3px] rounded-md text-[11px] font-extrabold tracking-[0.08em] text-black bg-gradient-to-b from-white to-[#c7c8ca]">AI</span>
            <span>Sponsored</span>
            <span className="ml-auto px-2 py-[3px] rounded-md text-[11.5px] tabular-nums text-white bg-black/45">{reel.length}</span>
          </div>
        </div>

        {/* Hook / Demo / CTA captions */}
        <ol className="relative z-[2] mt-auto mb-3 min-h-[64px] list-none p-0">
          {reel.scenes.map((line, i) => (
            <li key={STEPS[i]} className="aiv-scene absolute inset-x-0 bottom-0">
              <span className="block text-[11px] tracking-[0.25em] uppercase text-white/60 mb-1">{STEPS[i]}</span>
              <span className="block text-[18px] font-medium leading-tight text-white">{line}</span>
            </li>
          ))}
        </ol>

        {/* Player bar */}
        <div className="relative z-[2] flex items-center gap-3 text-white">
          {playing ? <PauseIcon /> : <PlayIcon />}
          <span className="relative flex-1 h-[2px] rounded-full bg-white/25 overflow-hidden">
            <i className="aiv-scrub absolute inset-0 bg-white origin-left" />
          </span>
          <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute reel" : "Mute reel"} className="p-1 -m-1 hover:scale-110 transition-transform cursor-pointer">
            <SoundIcon muted={muted} />
          </button>
        </div>
      </div>

      <div className="px-5 py-4 bg-[#16161a] border-t border-white/10">
        <div className="text-[17px] font-semibold text-white">{reel.industry}</div>
        <div className="mt-0.5 text-[13px] text-white/55">{reel.format}</div>
      </div>
    </motion.article>
  );
}

export default function HomeReels() {
  return (
    <section id="reels" className="bg-[#000000] pt-[100px] pb-[100px]">
      <div className="gs-wrap">
        <Kicker>AI Video</Kicker>
        <RevealLines lines={["Scroll-stopping", "AI video creative"]} className="gs-h2 mt-4" />
        <FadeUp delay={0.15}>
          <p className="mt-6 max-w-[712px] text-[18px] font-light leading-[1.5] text-white/80">
            UGC hooks, product demos and story ads — generated and edited with AI, then tuned for performance on every feed.
          </p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REELS.slice(0, 9).map((reel, i) => (
            <Reel key={reel.src + i} reel={reel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
