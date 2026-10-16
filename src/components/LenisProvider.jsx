"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

const HEADER_OFFSET = -90;

// On every route change: jump to the top, or to the #hash target once it has rendered
function RouteScroll() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    lenis.start();
    const hash = window.location.hash;
    if (!hash) {
      lenis.scrollTo(0, { immediate: true, force: true });
      return;
    }
    let tries = 0;
    let timer;
    const seek = () => {
      const el = document.querySelector(hash);
      if (el) {
        lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.4, force: true });
      } else if (tries++ < 20) {
        timer = setTimeout(seek, 50);
      }
    };
    lenis.scrollTo(0, { immediate: true, force: true });
    timer = setTimeout(seek, 120);
    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smoothWheel: true,
        anchors: { offset: HEADER_OFFSET, duration: 1.4 },
        stopInertiaOnNavigate: true,
      }}
    >
      <RouteScroll />
      {children}
    </ReactLenis>
  );
}
