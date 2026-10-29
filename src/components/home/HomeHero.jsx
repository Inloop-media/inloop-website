"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// Function-form transforms keep scroll-linked values on the JS path
const range = (from, to, a, b) => (v) => a + (b - a) * Math.min(1, Math.max(0, (v - from) / (to - from)));

const LOGOS = ["Meta", "Google", "Shopify", "TikTok", "YouTube", "Instagram", "LinkedIn", "Taboola", "Microsoft Ads", "Jio Ads"];

export function LogoStrip() {
  return (
    <div className="relative h-[160px] flex items-center overflow-hidden gs-marquee-mask">
      <div className="gs-marquee flex items-center w-max">
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <span key={i} className="px-12 text-[30px] font-bold tracking-tight text-white/80 whitespace-nowrap">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// Inloop Media brand film with sound. Browsers only allow audible autoplay after a user
// gesture, so it starts muted if blocked and unmutes on the visitor's first tap/click/key.
function IntroFilm({ volume, controlsOpacity }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const userChoice = useRef(null); // "on" | "off" once the visitor uses the button

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });

    const unlock = () => {
      if (userChoice.current === "off" || !ref.current) return;
      ref.current.muted = false;
      ref.current.play().catch(() => {});
      setMuted(false);
      remove();
    };
    const remove = () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock);
    return remove;
  }, []);

  // Sound fades out as the rest of the page slides up over the film
  useMotionValueEvent(volume, "change", (o) => {
    if (ref.current) ref.current.volume = Math.max(0, Math.min(1, o));
  });

  const toggle = (e) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    userChoice.current = next ? "off" : "on";
    setMuted(next);
  };

  return (
    <>
      <div className="absolute inset-0">
        <video
          ref={ref}
          loop
          playsInline
          preload="auto"
          poster="/images/inloop-hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/inloop-hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/videos/inloop-hero.mp4" type="video/mp4" />
        </video>
      </div>

      <motion.button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        style={{ opacity: controlsOpacity }}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className="absolute z-20 right-5 md:right-20 bottom-8 md:bottom-12 flex items-center gap-3 h-10 px-4 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-[11px] font-light tracking-[1.5px] uppercase text-white hover:border-[var(--brand)] transition-colors cursor-pointer"
      >
        <span className="flex items-end gap-[3px] h-3" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[2px] bg-white rounded-full"
              style={{
                height: muted ? "3px" : "100%",
                animation: muted ? "none" : `sound-bar 0.9s ${i * 0.15}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </span>
        {muted ? "Sound on" : "Sound off"}
      </motion.button>
    </>
  );
}

export default function HomeHero() {
  const { scrollY } = useScroll();
  // The film stays pinned while the rest of the page slides up over it
  const volume = useTransform(scrollY, range(700, 1500, 1, 0));
  const controlsOp = useTransform(scrollY, range(900, 1300, 1, 0));

  return (
    <>
      <section className="relative h-[2200px] bg-[#000000]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Inloop Media brand film — the only visual in the hero */}
          <IntroFilm volume={volume} controlsOpacity={controlsOp} />
          <h1 className="sr-only">Inloop Media — we don&apos;t just market brands, we engineer their growth</h1>
        </div>
      </section>
    </>
  );
}
