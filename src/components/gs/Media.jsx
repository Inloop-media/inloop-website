"use client";

import { useEffect, useRef } from "react";

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

// Image or muted looping video; videos only play while on screen
export default function Media({ src, alt = "", className = "", position = "center" }) {
  const ref = useRef(null);
  const video = isVideo(src);

  useEffect(() => {
    if (!video || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  if (video) {
    return (
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{ objectPosition: position }}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" style={{ objectPosition: position }} className={`w-full h-full object-cover ${className}`} />;
}
