"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export default function LenisProvider({ children }) {
  // Setup Lenis core wrapper
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}
